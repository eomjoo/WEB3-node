import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import hashlib
import pymysql
from concurrent.futures import ThreadPoolExecutor, as_completed

# 크롤링할 키워드와 페이지 수 설정
KEYWORD = "자바"
PAGES = 5
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

# 채용 정보 저장 리스트
job_data = []
unique_jobs = set()

# MySQL 연결 함수


def connect_db():
    return pymysql.connect(
        host='localhost',         # MySQL 호스트 (로컬호스트)
        user='root',              # MySQL 사용자 이름
        password='djaqndl5795',   # MySQL 비밀번호
        database='job_portal',    # 사용할 데이터베이스 이름
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# 페이지 요청 함수


def fetch_page(page):
    url = f"https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword={KEYWORD}&recruitPage={page}"
    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"페이지 요청 중 에러 발생 (페이지 {page}): {e}")
        return None

# 채용 정보 파싱 함수


def parse_jobs(html):
    soup = BeautifulSoup(html, "html.parser")
    job_listings = soup.find_all("div", class_="item_recruit")
    for job in job_listings:
        try:
            company = job.find(
                "strong", class_="corp_name").get_text(strip=True)
            title = job.find("h2", class_="job_tit").get_text(strip=True)
            link = "https://www.saramin.co.kr" + \
                job.find("h2", class_="job_tit").a["href"]
            conditions = job.find(
                "div", class_="job_condition").find_all("span")
            location = conditions[0].get_text(
                strip=True) if len(conditions) > 0 else ""
            experience = conditions[1].get_text(
                strip=True) if len(conditions) > 1 else ""
            education = conditions[2].get_text(
                strip=True) if len(conditions) > 2 else ""
            employment_type = conditions[3].get_text(
                strip=True) if len(conditions) > 3 else ""
            deadline = job.find("span", class_="date").get_text(strip=True)
            sector = job.find("div", class_="job_sector").get_text(
                strip=True) if job.find("div", class_="job_sector") else ""
            salary = conditions[4].get_text(
                strip=True) if len(conditions) > 4 else ""

            # 중복 확인을 위한 해시 생성
            job_hash = hashlib.sha256(
                f"{company}{title}{link}".encode()).hexdigest()
            if job_hash not in unique_jobs:
                unique_jobs.add(job_hash)
                job_data.append({
                    "company": company,
                    "title": title,
                    "link": link,
                    "location": location,
                    "experience": experience,
                    "education": education,
                    "employment_type": employment_type,
                    "deadline": deadline,
                    "sector": sector,
                    "salary": salary
                })
        except Exception as e:
            print(f"Error parsing job: {e}")

# 데이터베이스에 데이터 삽입 함수


def insert_into_db(data):
    connection = connect_db()
    try:
        with connection.cursor() as cursor:
            for job in data:
                # 회사 정보 삽입 (중복 방지)
                cursor.execute("""
                    INSERT INTO Companies (company_name, location)
                    VALUES (%s, %s) ON DUPLICATE KEY UPDATE company_name=company_name
                """, (job['company'], job['location']))

                # 회사 ID 가져오기
                cursor.execute(
                    "SELECT company_id FROM Companies WHERE company_name = %s", (job['company'],))
                company_id = cursor.fetchone()['company_id']

                # 채용 공고 정보 삽입
                sql = """
                    INSERT INTO Jobs (company_id, title, link,  experience, education, employment_type, deadline, sector, salary,location)
                    VALUES (%s, %s, %s, %s, %s,  %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    company_id, job['title'], job['link'],
                    job['experience'], job['education'], job['employment_type'],
                    job['deadline'], job['sector'], job['salary'], job['location']
                ))
        connection.commit()
        print("데이터 삽입 완료")
    except Exception as e:
        print(f"DB 오류: {e}")
    finally:
        connection.close()


# 병렬 처리로 여러 페이지 동시에 크롤링
with ThreadPoolExecutor(max_workers=5) as executor:
    futures = [executor.submit(fetch_page, page)
               for page in range(1, PAGES + 1)]
    for future in as_completed(futures):
        html = future.result()
        if html:
            parse_jobs(html)
        time.sleep(1)  # 서버 부하 방지를 위한 딜레이

# 데이터베이스에 데이터 삽입
insert_into_db(job_data)

# 데이터프레임 생성 및 CSV 저장
df = pd.DataFrame(job_data)
df.to_csv("saramin_jobs.csv", index=False, encoding="utf-8-sig")

print("크롤링 및 데이터베이스 저장 완료. 데이터가 saramin_jobs.csv 파일에 저장되었습니다.")

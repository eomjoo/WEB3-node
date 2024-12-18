# SARAMIN REST API

사람인 사이트를 크롤링해 채용 공고, 북마크, 지원, 리뷰 등을 관리하는 REST API를 개발하였습니다

## 사용 기술

- **런타임 환경:** Node.js
- **프레임워크:** Express.js
- **데이터베이스:** MYSQL
- **문서화:** Swagger
- **인증:** JWT

### 참고사항

- **Node.js:** Node.js를 이용해서 개발하였습니다.
- **MYSQL:** mysql을 이용하여 데이터를 관리합니다
- **pm2:** pm2를 이용하여 백그라운드에서 실행이 가능하게 했습니다

## 설치 및 사용 방법

### 설치

**1. 깃 클론하기:**

```
git clone https://github.com/eomjoo/WEB3-node.git
```

**npm 설치:**

```
npm install
```

### 사용 방법

**실행:**

```
npm run dev
```

**크롤링 실행:**

```
 crawling2.py를 실행하여 사람인 사이트에서 데이터를 뽑아올 수 있습니다.
```

## DB

- 8080 포트포워딩

## API 문서

    - 다음 사이트에서 swagger를 통해 api 기능을 확인해 볼 수 있습니다.

[Link](http://113.198.66.75:10165/api-docs/#/)

### **Applications**

**지원 및 관심 등록 관련 엔드포인트:**

```
POST /api/applications/apply/{jobId}         # 채용 공고에 지원합니다.
DELETE /api/applications/cancel/{applicationId}  # 채용 지원을 취소합니다.
GET /api/applications                          # 지원 내역을 조회합니다.
POST /api/applications/bookmark/{jobId}        # 채용 공고를 관심 목록에 추가합니다.
DELETE /api/applications/bookmark/{jobId}      # 채용 공고를 관심 목록에서 제거합니다.
GET /api/applications/bookmarks                # 관심 목록을 조회합니다.
```

### **Auth**

**인증 관련 엔드포인트:**

```
POST /api/auth/register      # 회원가입을 진행합니다.
POST /api/auth/login         # 로그인을 진행합니다.
POST /api/auth/logout        # 로그아웃을 진행합니다.
POST /api/auth/refresh-token # 인증 토큰을 갱신합니다.
```

### **Bookmark**

**관심 목록 관리 :**

### **Job**

**채용 공고 관리 :**

### **Review**

**채용 리뷰 관리 :**

### **User**

**지원자 관리:**

### **Company**

**회사 정보 관리:**

### **Application**

**지원 정보 관리:**

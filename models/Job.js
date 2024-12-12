const db = require('../config/db');

class Job {
  // 경력별 공고 조회
  static findByExperience(experience, offset, limit, callback) {
    const query = 'SELECT * FROM Jobs WHERE experience = ? LIMIT ?, ?';
    db.query(query, [experience, offset, limit], callback);
  }

  // 급여별 채용 공고 조회
  static getJobsBySalary(salary, callback) {
    const query = 'SELECT * FROM Jobs WHERE salary >= ?';
    db.query(query, [salary], callback);
  }

  // 기술 스택별 채용 공고 조회
  static getJobsBySector(sector, callback) {
    const query = 'SELECT * FROM Jobs WHERE sector LIKE ?';
    db.query(query, [`%${sector}%`], callback);
  }

  // 특정 공고 상세 조회
  static getJobById(id, callback) {
    const query = 'SELECT * FROM Jobs WHERE job_id = ?';
    db.query(query, [id], callback);
  }
}



module.exports = Job;

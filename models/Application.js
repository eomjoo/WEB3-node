// models/Application.js
const db = require('../config/db');

class Application {
  // 지원 정보 저장
  static create(userId, jobId, callback) {
    const sql = 'INSERT INTO Applications (user_id, job_id) VALUES (?, ?)';
    db.query(sql, [userId, jobId], callback);
  }

  // 사용자별 지원 목록 조회
  static getUserApplications(userId, status, callback) {
    let sql = 'SELECT * FROM Applications WHERE user_id = ?';
    const params = [userId];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY applied_at DESC';

    db.query(sql, params, callback);
  }

  // 지원 정보 삭제 (취소)
  static deleteById(applicationId, callback) {
    const sql = 'DELETE FROM Applications WHERE application_id = ?';
    db.query(sql, [applicationId], callback);
  }

  // 특정 지원 정보 조회
  static findById(applicationId, callback) {
    const sql = 'SELECT * FROM Applications WHERE application_id = ?';
    db.query(sql, [applicationId], callback);
  }
}

module.exports = Application;

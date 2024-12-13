const db = require('../config/db');

class Company {
  // 모든 회사 조회
  static getAll(callback) {
    const sql = 'SELECT * FROM companies';
    db.query(sql, callback);
  }

  // company_id로 회사 정보 조회
  static getById(companyId, callback) {
    const sql = 'SELECT company_name, location FROM companies WHERE company_id = ?';
    db.query(sql, [companyId], callback);
  }

  static getByLocation(location, callback) {
    const sql = 'SELECT company_name FROM companies WHERE TRIM(location) = ?';
    db.query(sql, [location.trim()], callback);
  }

}

module.exports = Company;

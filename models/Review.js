const db = require('../config/db');

class Review {
  // 리뷰 작성
  static create(userId, companyId, rating, comment, callback) {
    const sql = 'INSERT INTO reviews (user_id, company_id, rating, comment) VALUES (?, ?, ?, ?)';
    db.query(sql, [userId, companyId, rating, comment], callback);
  }

  // 회사별 리뷰 조회
  static getByCompanyId(companyId, callback) {
    const sql = 'SELECT * FROM reviews WHERE company_id = ? ORDER BY review_id DESC';
    db.query(sql, [companyId], callback);
  }

  // 리뷰 삭제
  static deleteById(reviewId, callback) {
    const sql = 'DELETE FROM reviews WHERE review_id = ?';
    db.query(sql, [reviewId], callback);
  }
}

module.exports = Review;

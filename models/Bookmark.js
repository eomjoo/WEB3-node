const db = require('../config/db');

class Bookmark {
  // 북마크 추가
  static add(userId, jobId, callback) {
    const sql = 'INSERT INTO bookmarks (user_id, job_id) VALUES (?, ?)';
    db.query(sql, [userId, jobId], callback);
  }

  // 북마크 제거
  static remove(userId, jobId, callback) {
    const sql = 'DELETE FROM bookmarks WHERE user_id = ? AND job_id = ?';
    db.query(sql, [userId, jobId], callback);
  }

  // 북마크 존재 여부 확인
  static exists(userId, jobId, callback) {
    const sql = 'SELECT * FROM bookmarks WHERE user_id = ? AND job_id = ?';
    db.query(sql, [userId, jobId], callback);
  }

  // 사용자별 북마크 목록 조회 (페이지네이션 및 최신순 정렬)
  static getUserBookmarks(userId, limit, offset, callback) {
    const sql = 'SELECT * FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
    db.query(sql, [userId, limit, offset], callback);
  }
}

module.exports = Bookmark;

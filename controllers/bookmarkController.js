const Bookmark = require('../models/Bookmark');

// 북마크 추가/제거 (토글 처리)
exports.toggleBookmark = (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.body;

  Bookmark.exists(userId, jobId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      // 북마크가 존재하면 제거
      Bookmark.remove(userId, jobId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: '북마크가 제거되었습니다.' });
      });
    } else {
      // 북마크가 없으면 추가
      Bookmark.add(userId, jobId, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: '북마크가 추가되었습니다.' });
      });
    }
  });
};

// 사용자별 북마크 목록 조회
exports.getUserBookmarks = (req, res) => {
  const userId = req.user.userId;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  Bookmark.getUserBookmarks(userId, parseInt(limit), parseInt(offset), (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ bookmarks: results });
  });
};

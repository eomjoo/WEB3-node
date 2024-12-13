const Review = require('../models/Review');

// 리뷰 작성
exports.createReview = (req, res) => {
  const userId = req.user.userId; // 인증된 사용자
  const { companyId, rating, comment } = req.body;

  if (!companyId || !rating || !comment) {
    return res.status(400).json({ message: '회사 ID, 평점, 댓글은 필수 입력 항목입니다.' });
  }

  Review.create(userId, companyId, rating, comment, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: '리뷰가 작성되었습니다.' });
  });
};

// 회사별 리뷰 조회
exports.getReviewsByCompany = (req, res) => {
  const { companyId } = req.params;

  Review.getByCompanyId(companyId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: '리뷰가 없습니다.' });
    res.json({ reviews: results });
  });
};

// 리뷰 삭제
exports.deleteReview = (req, res) => {
  const { reviewId } = req.params;

  Review.deleteById(reviewId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '리뷰가 삭제되었습니다.' });
  });
};

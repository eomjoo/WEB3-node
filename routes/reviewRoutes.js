const express = require('express');
const router = express.Router();
const { createReview, getReviewsByCompany, deleteReview } = require('../controllers/reviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: 리뷰 관리 API
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: 리뷰 작성
 *     description: 인증된 사용자가 회사에 리뷰를 작성합니다.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyId:
 *                 type: integer
 *                 description: 리뷰를 작성할 회사 ID
 *               rating:
 *                 type: integer
 *                 description: 평점 (1-5)
 *               comment:
 *                 type: string
 *                 description: 리뷰 내용
 *     responses:
 *       201:
 *         description: 리뷰가 작성되었습니다.
 *       400:
 *         description: 필수 입력 항목이 누락되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.post('/', authenticateToken, createReview);

/**
 * @swagger
 * /reviews/company/{companyId}:
 *   get:
 *     summary: 회사별 리뷰 조회
 *     description: 회사 ID를 기준으로 해당 회사에 작성된 리뷰 목록을 조회합니다.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 리뷰를 조회할 회사 ID
 *     responses:
 *       200:
 *         description: 리뷰 목록을 반환합니다.
 *       404:
 *         description: 리뷰가 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/company/:companyId', getReviewsByCompany);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: 리뷰 삭제
 *     description: 리뷰 ID를 기준으로 리뷰를 삭제합니다.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 리뷰 ID
 *     responses:
 *       200:
 *         description: 리뷰가 삭제되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.delete('/:reviewId', authenticateToken, deleteReview);

module.exports = router;

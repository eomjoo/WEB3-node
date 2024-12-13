const express = require('express');
const router = express.Router();
const { toggleBookmark, getUserBookmarks } = require('../controllers/bookmarkController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Bookmarks
 *     description: 북마크 관리 API
 */

/**
 * @swagger
 * /bookmarks:
 *   post:
 *     summary: 북마크 추가/제거 (토글)
 *     description: 사용자가 채용 공고를 북마크에 추가하거나 제거합니다.
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobId:
 *                 type: integer
 *                 description: 북마크할 채용 공고의 ID
 *     responses:
 *       201:
 *         description: 북마크가 추가되었습니다.
 *       200:
 *         description: 북마크가 제거되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.post('/', authenticateToken, toggleBookmark);

/**
 * @swagger
 * /bookmarks:
 *   get:
 *     summary: 사용자별 북마크 목록 조회
 *     description: 인증된 사용자의 북마크 목록을 최신순으로 반환합니다.
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 북마크 목록을 반환합니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/', authenticateToken, getUserBookmarks);

module.exports = router;

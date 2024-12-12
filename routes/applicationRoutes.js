// routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const { applyForJob,  cancelApplication, getUserApplicationsById  } = require('../controllers/applicationController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Applications
 *     description: 지원 관리 API
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: 지원하기
 *     description: 사용자가 채용 공고에 지원합니다.
 *     tags: [Applications]
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
 *                 description: 지원할 채용 공고의 ID
 *     responses:
 *       201:
 *         description: 지원이 완료되었습니다.
 *       400:
 *         description: 이미 지원한 공고입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.post('/', authenticateToken, applyForJob);

/**
 * @swagger
 * /applications/user/{userId}:
 *   get:
 *     summary: 사용자별 지원한 공고 목록 조회
 *     description: 입력된 사용자 ID에 해당하는 사용자가 지원한 job_id 목록을 반환합니다.
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 사용자의 ID
 *     responses:
 *       200:
 *         description: 지원한 공고 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jobIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                     example: 1
 *       404:
 *         description: 지원 내역이 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/user/:userId', getUserApplicationsById);

/**
 * @swagger
 * /applications/{id}:
 *   delete:
 *     summary: 지원 취소
 *     description: 사용자가 특정 지원을 취소합니다.
 *     tags: [Applications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 취소할 지원의 application ID
 *     responses:
 *       200:
 *         description: 지원이 취소되었습니다.
 *       403:
 *         description: 권한이 없습니다.
 *       404:
 *         description: 지원 정보를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.delete('/:id', authenticateToken, cancelApplication);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  searchJobsByExperience,
  searchJobsBySalary,
  searchJobsBySector,
  getJobById,
} = require('../controllers/jobController');

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: 채용 공고 관련 API
 */

/**
 * @swagger
 * /jobs/search:
 *   get:
 *     tags: [Jobs]
 *     summary: 경력별 채용 공고 검색
 *     description: 경력을 기준으로 채용 공고를 검색합니다.
 *     parameters:
 *       - in: query
 *         name: experience
 *         schema:
 *           type: string
 *         description: "경력 조건 (예:'경력 6~20년')"
 *     responses:
 *       200:
 *         description: 성공적으로 채용 공고를 반환합니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/search', searchJobsByExperience);

/**
 * @swagger
 * /jobs/search/salary:
 *   get:
 *     tags: [Jobs]
 *     summary: 급여별 채용 공고 검색
 *     description: 입력된 급여 이상에 해당하는 채용 공고를 검색합니다.
 *     parameters:
 *       - in: query
 *         name: salary
 *         schema:
 *           type: string
 *         required: true
 *         description: "급여 조건 (예: '8000' 또는 '700')"
 *     responses:
 *       200:
 *         description: 성공적으로 채용 공고를 반환합니다.
 *       400:
 *         description: 잘못된 요청입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/search/salary', searchJobsBySalary);

/**
 * @swagger
 * /jobs/search/sector:
 *   get:
 *     tags: [Jobs]
 *     summary: 기술 스택별 채용 공고 검색
 *     description: 입력된 기술 스택에 해당하는 채용 공고를 검색합니다.
 *     parameters:
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         required: true
 *         description: "기술 스택 조건 (예: Java, Spring)"
 *     responses:
 *       200:
 *         description: 성공적으로 채용 공고를 반환합니다.
 *       400:
 *         description: 잘못된 요청입니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/search/sector', searchJobsBySector);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     tags: [Jobs]
 *     summary: 채용 공고 상세 조회
 *     description: 주어진 ID에 해당하는 채용 공고의 상세 정보를 제공합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "채용 공고의 ID"
 *     responses:
 *       200:
 *         description: 성공적으로 채용 공고를 반환합니다.
 *       404:
 *         description: 채용 공고를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/:id', getJobById);

module.exports = router;

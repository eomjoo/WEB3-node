const express = require('express');
const router = express.Router();
const { getAllCompanies, getCompanyById, getCompaniesByLocation } = require('../controllers/companyController');

/**
 * @swagger
 * tags:
 *   - name: Companies
 *     description: 회사 정보 관리 API
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: 모든 회사 정보 조회
 *     description: 등록된 모든 회사의 정보를 조회합니다.
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: 회사 목록을 반환합니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/', getAllCompanies);

/**
 * @swagger
 * /companies/{companyId}:
 *   get:
 *     summary: 회사 정보 조회
 *     description: company_id를 기준으로 회사 이름과 위치를 조회합니다. ** job_id와 company_id 는 2의 차이가 있습니다 ex) job_id = 1 과 company_id = 3 은 동치 **
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 회사의 ID
 *     responses:
 *       200:
 *         description: 회사 이름과 위치를 반환합니다.
 *       404:
 *         description: 회사를 찾을 수 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/:companyId', getCompanyById);

/**
 * @swagger
 * /companies/search:
 *   get:
 *     summary: 위치별 회사 목록 조회
 *     description: 입력된 위치에 있는 회사 이름 목록을 반환합니다.
 *     tags: [Companies]
 *     parameters:
 *       - in: query
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 회사의 위치
 *     responses:
 *       200:
 *         description: 해당 위치에 있는 회사 목록을 반환합니다.
 *       400:
 *         description: 위치가 입력되지 않았습니다.
 *       404:
 *         description: 해당 위치에 회사가 없습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.get('/search', getCompaniesByLocation);


module.exports = router;

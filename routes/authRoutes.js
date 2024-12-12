const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { deleteAccount } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 사용자 인증 및 관리 API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원 가입
 *     description: 새로운 사용자를 등록합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: 회원 가입 성공
 *       400:
 *         description: 요청 데이터 오류
 *       500:
 *         description: 서버 오류
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     description: 사용자가 이메일과 비밀번호로 로그인합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 로그인 성공 및 JWT 토큰 반환
 *       401:
 *         description: 인증 실패 (이메일 또는 비밀번호 불일치)
 *       500:
 *         description: 서버 오류
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/profile:
 *   put:
 *     summary: 회원 정보 수정
 *     description: 사용자의 프로필 정보를 수정합니다. (인증 필요)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "new_username"
 *     responses:
 *       200:
 *         description: 회원 정보 수정 성공
 *       400:
 *         description: 요청 데이터 오류
 *       401:
 *         description: 인증 실패 (토큰 필요)
 *       500:
 *         description: 서버 오류
 */
router.put('/profile', authenticateToken, updateProfile);

/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     summary: 회원 탈퇴
 *     description: 쿼리 파라미터로 토큰을 받아 인증된 사용자가 자신의 계정을 삭제합니다.
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT 인증 토큰
 *     responses:
 *       200:
 *         description: 회원 탈퇴가 완료되었습니다.
 *       401:
 *         description: 토큰이 없거나 유효하지 않습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다.
 */
router.delete('/delete', (req, res) => {
    const token = req.query.token;
  
    if (!token) {
      return res.status(401).json({ message: '토큰이 없습니다.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
      }
  
      req.user = decoded;
      deleteAccount(req, res);
    });
  });


module.exports = router;

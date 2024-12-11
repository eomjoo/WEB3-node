const jwt = require('jsonwebtoken');
require('dotenv').config();

// Access 토큰 생성 함수
const generateAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET,                 // 비밀 키
    { expiresIn: process.env.TOKEN_EXPIRES_IN } // 만료 시간 (예: '7d')
  );
};

// Refresh 토큰 생성 함수
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.REFRESH_SECRET,
    { expiresIn: '30d' } // Refresh 토큰 만료 시간 (예: 30일)
  );
};

module.exports = { generateAccessToken, generateRefreshToken };

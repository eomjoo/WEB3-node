const jwt = require('jsonwebtoken');
const base64url = require('base64url');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

// 회원 가입
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = base64url.encode(password);

  User.create(username, email, hashedPassword, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: '회원 가입 성공!' });
  });
};

// 로그인
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(401).json({ message: '이메일이 존재하지 않습니다.' });

    const user = results[0];
    const decodedPassword = base64url.decode(user.password);

    if (password !== decodedPassword) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
    res.json({ message: '로그인 성공!', token });
  });
};

// 회원 정보 수정
exports.updateProfile = (req, res) => {
  const userId = req.user.userId;
  const { username } = req.body;

  User.updateProfile(userId, username, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '회원 정보 수정 성공!' });
  });
};

exports.deleteAccount = (req, res) => {
    const userId = req.user.userId;
  
    User.deleteUser(userId, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      res.json({ message: '회원 탈퇴가 완료되었습니다.' });
    });
  };

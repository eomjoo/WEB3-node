const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) return res.status(401).json({ message: '토큰이 없습니다.' });

  // Bearer 토큰에서 실제 토큰 값만 추출
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
    req.user = decoded;
    next();
  });
};

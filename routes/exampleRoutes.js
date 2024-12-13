const express = require('express');
const router = express.Router();
const CustomError = require('../utils/CustomError');

router.get('/', (req, res, next) => {
  try {
    // 예제 에러 발생
    throw new CustomError(400, '잘못된 요청입니다.');
  } catch (error) {
    next(error); // 글로벌 에러 핸들러로 전달
  }
});

module.exports = router;

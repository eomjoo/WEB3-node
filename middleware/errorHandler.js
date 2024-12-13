// middleware/errorHandler.js
const CustomError = require('../utils/CustomError');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || '서버 오류가 발생했습니다.';

  // 에러 로깅
  logger.error(`${err.name}: ${message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      name: err.name,
      message: message,
    },
  });
};

module.exports = errorHandler;

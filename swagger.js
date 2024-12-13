const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: '채용 공고 관리 시스템을 위한 API 문서',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // 라우트 파일 경로
};

// swaggerSpec을 생성
const swaggerSpec = swaggerJsdoc(options);

fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
console.log('swagger.json 파일이 생성되었습니다.');

module.exports = { swaggerUi, specs };

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // 라우트 파일 가져오기

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

//기보 라우터 설정
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다!');
});

// 라우트 설정
app.use('/auth', authRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

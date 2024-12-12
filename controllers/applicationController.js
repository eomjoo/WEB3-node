// controllers/applicationController.js
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');

// 지원하기
exports.applyForJob = (req, res) => {
  const userId = req.user.userId;
  const { jobId } = req.body;

  // 중복 지원 체크
  Application.getUserApplicationsById(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.some(app => app.job_id === jobId)) {
      return res.status(400).json({ message: '이미 지원한 공고입니다.' });
    }

    // 지원 정보 저장
    Application.create(userId, jobId, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: '지원이 완료되었습니다.' });
    });
  });
};

// 사용자별 지원한 공고 목록 조회 (userId를 파라미터로 받음)
exports.getUserApplicationsById = (req, res) => {
    const { userId } = req.params; // URL 파라미터에서 userId를 추출
  
    Application.getUserApplicationsById(userId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: '지원 내역이 없습니다.' });
      
      // job_id만 추출하여 반환
      const jobIds = results.map(app => app.job_id);
      res.json({ jobIds });
    });
  };

// 지원 취소
exports.cancelApplication = (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;

  Application.findById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: '지원 정보를 찾을 수 없습니다.' });
    if (results[0].user_id !== userId) return res.status(403).json({ message: '권한이 없습니다.' });

    Application.deleteById(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: '지원이 취소되었습니다.' });
    });
  });
};

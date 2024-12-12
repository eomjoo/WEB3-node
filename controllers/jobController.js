const Job = require('../models/Job');

// 경력별 채용 공고 검색
exports.searchJobsByExperience = (req, res) => {
  const { experience, page = 1 } = req.query;
  const limit = 20;
  const offset = (parseInt(page) - 1) * limit;

  Job.findByExperience(experience, offset, limit, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ jobs: results });
  });
};

// 급여별 채용 공고 검색
exports.searchJobsBySalary = (req, res) => {
    const { salary } = req.query;
  
    if (!salary) {
      return res.status(400).json({ message: '급여를 입력해주세요.' });
    }
  
    Job.getJobsBySalary(salary, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ jobs: results });
    });
  };

  // 기술 스택별 채용 공고 검색
exports.searchJobsBySector = (req, res) => {
    const { sector } = req.query;
  
    if (!sector) {
      return res.status(400).json({ message: '기술 스택을 입력해주세요.' });
    }
  
    Job.getJobsBySector(sector, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ jobs: results });
    });
  };

  // 공고 상세 조회
exports.getJobById = (req, res) => {
    const { id } = req.params;
  
    Job.getJobById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: '공고를 찾을 수 없습니다.' });
      res.json({ job: results[0] });
    });
  };

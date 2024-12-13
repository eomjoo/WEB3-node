const Company = require('../models/Company');

// 모든 회사 정보 조회
exports.getAllCompanies = (req, res) => {
  Company.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ companies: results });
  });
};

// company_id로 회사 정보 조회
exports.getCompanyById = (req, res) => {
  const { companyId } = req.params;

  Company.getById(companyId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: '회사를 찾을 수 없습니다.' });
    res.json({ company: results[0] });
  });
};

exports.getCompaniesByLocation = (req, res) => {
    let { location } = req.query;
  
    if (!location) {
      return res.status(400).json({ message: '위치를 입력해주세요.' });
    }
  
    // URL 디코딩 적용
    location = decodeURIComponent(location.trim());
    console.log(`Decoded location: ${location}`); // 디버그 로그 확인
  
    Company.getByLocation(location, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: '해당 위치에 회사가 없습니다.' });
      res.json({ companies: results });
    });
  };
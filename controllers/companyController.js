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

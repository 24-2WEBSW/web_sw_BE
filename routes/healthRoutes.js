const express = require('express');
const router = express.Router();

// 상태 확인 엔드포인트
router.get('/', (req, res) => {
  res.status(200).send('OK');
});

module.exports = router;
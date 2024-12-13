const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

// 업로드 요청 처리
router.post('/upload-materials', dataController.uploadMaterials);

module.exports = router;
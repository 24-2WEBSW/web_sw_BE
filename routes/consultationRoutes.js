const express = require('express');
const multer = require('multer');
const consultationController = require('../controllers/consultationController');

const router = express.Router();
const upload = multer();

router.post('/', upload.array('images'), consultationController.createConsultation); // 여러 이미지 처리

// 비밀번호 확인
router.post('/:id/verify-password', consultationController.verifyPassword);

// 관리자: 모든 문의 내역 확인
router.get('/', consultationController.getAllConsultations);

router.get('/:id', consultationController.getConsultationById);

router.delete('/:id', consultationController.deleteConsultation);

router.put('/:id', consultationController.updateConsultation);

module.exports = router;

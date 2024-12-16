const express = require('express');
const multer = require('multer');
const portfolioController = require('../controllers/portfolioController');

const router = express.Router();
const upload = multer();

router.post('/', upload.array('images'), portfolioController.createPortfolio); // 여러 이미지 처리

router.get('/', portfolioController.getPortfolios);
router.get('/:id', portfolioController.getPortfolioById);

module.exports = router;

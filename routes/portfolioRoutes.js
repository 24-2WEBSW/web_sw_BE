const express = require('express');
const multer = require('multer');
const portfolioController = require('../controllers/portfolioController');
const { verifyAdminToken } = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer();

router.post('/', upload.array('images'), verifyAdminToken, portfolioController.createPortfolio); // 여러 이미지 처리

router.get('/', portfolioController.getPortfolios);
router.get('/:id', portfolioController.getPortfolioById);

router.delete('/:id', verifyAdminToken, portfolioController.deletePortfolio);

router.put('/:id', upload.array('images'), verifyAdminToken, portfolioController.updatePortfolio);

module.exports = router;

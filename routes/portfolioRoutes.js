const express = require('express');
const portfolioController = require('../controllers/portfolioController');

const router = express.Router();

router.get('/', portfolioController.getPortfolios);
router.get('/:id', portfolioController.getPortfolioById);

module.exports = router;

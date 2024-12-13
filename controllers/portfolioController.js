const portfolioService = require('../services/portfolioService');

exports.getPortfolios = async (req, res) => {
    try {
        const portfolios = await portfolioService.fetchAll();
        res.status(200).json(portfolios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch portfolios' });
    }
};

exports.getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioService.fetchById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'portfolios not found' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch portfolio', error: error.message });
    }
};
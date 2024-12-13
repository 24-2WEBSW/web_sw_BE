const portfolioModel = require('../models/portfolioModel');

exports.fetchAll = async () => {
    const [rows] = await portfolioModel.findAll();
    return rows;
};

exports.fetchById = async (id) => {
    return portfolioModel.findById(id);
};


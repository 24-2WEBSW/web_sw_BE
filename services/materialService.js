const materialModel = require('../models/materialModel');

exports.fetchMaterialsByCompany = async (company) => {
    const [rows] = await materialModel.findByCompany(company);
    return rows;
};

exports.fetchMaterialDetails = async (company, productName) => {
    return materialModel.findDetails(company, productName);
};

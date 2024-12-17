const portfolioModel = require('../models/portfolioModel');
const db = require('../config/dbConfig');

exports.fetchAll = async () => {
    const [rows] = await portfolioModel.findAll();
    return rows;
};

exports.fetchById = async (id) => {
    return portfolioModel.findById(id);
};

exports.create = async (data) => {
    const query = `
        INSERT INTO portfolios (title, content, blog_link, main_image, images)
        VALUES (?, ?, ?, ?, ?)
    `;
    await db.query(query, [
        data.title,
        data.contact,
        data.blog_link,
        data.main_image,
        data.images,
    ]);
};

exports.delete = async (id) => {
    await portfolioModel.deleteById(id);
};

exports.update = async (id, data) => {
    await portfolioModel.updateById(id, data);
};
const db = require('../config/dbConfig');

exports.findAll = async () => {
    return db.query('SELECT id, title, main_image, blog_link FROM portfolios');
};

exports.findById = async (id) => {
    const [result] = await db.query('SELECT * FROM portfolios WHERE id = ?', [id]);
    return result[0];
};
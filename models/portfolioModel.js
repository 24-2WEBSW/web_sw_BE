const db = require('../config/dbConfig');

exports.findAll = async () => {
    return db.query('SELECT id, title, main_image, blog_link FROM portfolios');
};

exports.findById = async (id) => {
    const [result] = await db.query('SELECT * FROM portfolios WHERE id = ?', [id]);
    return result[0];
};

exports.deleteById = async (id) => {
    const query = 'DELETE FROM portfolios WHERE id = ?';
    await db.query(query, [id]);
};

exports.updateById = async (id, data) => {
    const query = `
        UPDATE portfolios
        SET title = ?, main_image = ?, content = ?, images = ?, blog_link = ?
        WHERE id = ?
    `;
    await db.query(query, [
        data.title,
        data.main_image,
        data.content,
        data.images,
        data.blog_link,
        id,
    ]);
};
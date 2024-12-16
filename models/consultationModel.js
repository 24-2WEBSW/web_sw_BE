const db = require('../config/dbConfig');

exports.insert = async (data) => {
    const query = `INSERT INTO consultations
    (name, title, contact, content, email, startDate, endDate, password, address, area, budget, images, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(query, [
        data.name,
        data.title,
        data.contact,
        data.content,
        data.email,
        data.startDate,
        data.endDate,
        data.password,
        data.address,
        data.area,
        data.budget,
        data.images,
        data.created_at,
    ]);
};

// 모든 문의 데이터 가져오기
exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM consultations');
    return rows;
};

exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM consultations WHERE id = ?', [id]);
    return rows[0];
};

exports.deleteById = async (id) => {
    const query = 'DELETE FROM consultations WHERE id = ?';
    await db.query(query, [id]);
};

exports.updateById = async (id, data) => {
    const query = `
        UPDATE consultations
        SET name = ?, startDate = ?, address = ?, area = ?, budget = ?, password = ?, images = ?, title = ?, content = ?, contact = ?, email = ?, endDate = ?
        WHERE id = ?
    `;
    await db.query(query, [
        data.name,
        data.startDate,
        data.address,
        data.area,
        data.budget,
        data.password,
        data.images,
        data.title,
        data.content,
        data.contact,
        data.email,
        data.endDate,
        id,
    ]);
};
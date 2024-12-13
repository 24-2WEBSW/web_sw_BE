const db = require('../config/dbConfig');

exports.insert = async (data) => {
    const query = `INSERT INTO consultations
    (title, contact, email, startDate, endDate, password, address, area, budget, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(query, [
        data.title,
        data.contact,
        data.email,
        data.startDate,
        data.endDate,
        data.password,
        data.address,
        data.area,
        data.budget,
        data.images,
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
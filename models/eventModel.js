const db = require('../config/dbConfig');

exports.findAll = async () => {
    return db.query('SELECT id, title, event_date FROM events');
};

exports.insert = async (data) => {
    const query = 'INSERT INTO events (title, event_date, content) VALUES (?, ?, ?)';
    await db.query(query, [data.title, data.event_date, data.content]);
};

exports.findById = async (id) => {
    const query = 'SELECT * FROM events WHERE id = ?';
    const [rows] = await db.query(query, [id]); // rows가 배열이어야 함
    return rows[0]; // 배열에서 첫 번째 객체를 반환
};
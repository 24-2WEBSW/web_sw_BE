const db = require('../config/dbConfig');

exports.findAll = async () => {
    return db.query('SELECT id, title, event_date FROM events ORDER BY event_date DESC');
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

exports.deleteById = async (id) => {
    const query = 'DELETE FROM events WHERE id = ?';
    await db.query(query, [id]);
};

exports.updateById = async (id, data) => {
    const query = `
        UPDATE events
        SET title = ?, event_date = ?, content = ?
        WHERE id = ?
    `;
    await db.query(query, [
        data.title,
        data.event_date,
        data.content,
        id,
    ]);
};
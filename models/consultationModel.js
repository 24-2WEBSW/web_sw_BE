const db = require('../config/dbConfig');

const query = `INSERT INTO consultations 
    (name, phone_number, email, consultation_date, password, possible_start_date, address, project_details, estimated_budget, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
await db.query(query, [
    data.name,
    data.phone_number,
    data.email,
    data.consultation_date,
    data.password,
    data.possible_start_date,
    data.address,
    data.project_details,
    data.estimated_budget,
    data.images,
]);

// 모든 문의 데이터 가져오기
exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM consultations');
    return rows; // 첫 번째 배열만 반환
};

exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM consultations WHERE id = ?', [id]);
    return rows[0]; // 첫 번째 배열에서 첫 번째 객체 반환
};
const db = require('../config/dbConfig');

// 관리자 생성
exports.createAdmin = async (username, password) => {
    const query = 'INSERT INTO admin_users (username, password) VALUES (?, ?)';
    await db.query(query, [username, password]);
};

// 관리자 검색 (유저네임 기준)
exports.findAdminByUsername = async (username) => {
    const query = 'SELECT * FROM admin_users WHERE username = ?';
    const [rows] = await db.query(query, [username]);
    return rows[0]; // 관리자 정보 반환
};

const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');

// 관리자 생성 (암호화 포함)
exports.registerAdmin = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.createAdmin(username, hashedPassword);
};

// 관리자 인증
exports.authenticateAdmin = async (username, password) => {
    const admin = await adminModel.findAdminByUsername(username);
    if (!admin) return null;

    const isValid = await bcrypt.compare(password, admin.password);
    return isValid ? admin : null;
};

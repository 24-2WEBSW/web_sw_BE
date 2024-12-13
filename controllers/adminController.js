const adminService = require('../services/adminService');
const jwt = require('jsonwebtoken');

// 관리자 등록
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        await adminService.registerAdmin(username, password);
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register admin' });
    }
};

// 관리자 로그인
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminService.authenticateAdmin(username, password);

        if (!admin) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // JWT 생성
        const token = jwt.sign({ id: admin.id, role: 'admin' }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to login' });
    }
};

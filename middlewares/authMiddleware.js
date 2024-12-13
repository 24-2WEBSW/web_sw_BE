const jwt = require('jsonwebtoken');

exports.verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        req.user = decoded; // 사용자 정보 추가
        next(); // 다음 미들웨어 또는 컨트롤러로 이동
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

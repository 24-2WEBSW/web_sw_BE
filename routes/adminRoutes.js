const express = require('express');
const adminController = require('../controllers/adminController');
const { body } = require('express-validator');

const router = express.Router();

// 관리자 등록 (초기 관리자만 실행 가능)
router.post(
    '/register',
    [
        body('username').isString().notEmpty(),
        body('password').isString().isLength({ min: 6 }),
    ],
    adminController.registerAdmin
);

// 관리자 로그인
router.post(
    '/login',
    [
        body('username').isString().notEmpty(),
        body('password').isString().notEmpty(),
    ],
    adminController.loginAdmin
);

module.exports = router;

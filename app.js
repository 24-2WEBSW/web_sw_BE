const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// 새로 작성된 라우트들
const portfolioRoutes = require('./routes/portfolioRoutes');
const materialRoutes = require('./routes/materialRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// CORS 설정 - 모든 출처 허용
app.use(cors());

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// 새 라우트 적용
app.use('/admin', adminRoutes);
app.use('/portfolio', portfolioRoutes);       // 포트폴리오 관련 라우트
app.use('/material', materialRoutes);         // 자재 확인 라우트
app.use('/consultation', consultationRoutes); // 상담 문의 라우트
app.use('/event', eventRoutes);               // 공지사항 및 이벤트 라우트

module.exports = app;

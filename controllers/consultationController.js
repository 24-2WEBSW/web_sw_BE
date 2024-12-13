const consultationService = require('../services/consultationService');
const bcrypt = require('bcrypt');
const uploadImageToS3 = require('../utils/s3Uploader');

exports.createConsultation = async (req, res) => {
    try {
        const {
            title, contact, email, startDate, endDate,
            password, address, area, budget
        } = req.body;

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        let imageUrls = [];
        if (req.files) {
            for (const file of req.files) {
                const imageUrl = await uploadImageToS3(file);
                imageUrls.push(imageUrl);
            }
        }

        await consultationService.create({
            title,
            contact,
            email,
            startDate,
            endDate,
            password: hashedPassword,
            address,
            area,
            budget,
            images: JSON.stringify(imageUrls),
        });

        res.status(201).json({ message: 'Consultation created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create consultation', error: error.message });
    }
};

// 관리자: 모든 문의 내역 확인
exports.getAllConsultations = async (req, res) => {
    try {
        const consultations = await consultationService.fetchAll();
        res.status(200).json(consultations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch consultations' });
    }
};

exports.getConsultationById = async (req, res) => {
    try {
        const { id } = req.params; // URL에서 ID 가져오기
        const consultation = await consultationService.fetchById(id);

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        res.status(200).json(consultation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch consultation details', error: error.message });
    }
};

exports.verifyPassword = async (req, res) => {
    try {
        const { id } = req.params; // URL에서 상담문의 ID 가져오기
        const { password } = req.body; // 요청 본문에서 비밀번호 가져오기

        // 상담문의 데이터를 ID로 조회
        const consultation = await consultationService.fetchById(id);

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, consultation.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Password verified successfully' });
    } catch (error) {
        console.error('Error verifying password:', error);
        res.status(500).json({ message: 'Failed to verify password', error: error.message });
    }
};
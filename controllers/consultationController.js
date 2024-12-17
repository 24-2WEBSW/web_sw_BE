const consultationService = require('../services/consultationService');
const bcrypt = require('bcrypt');
const uploadImageToS3 = require('../utils/s3Uploader');

exports.createConsultation = async (req, res) => {
    try {
        const {
            name, title, contact, content, email, startDate, endDate,
            password, address, area, budget, created_at
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
            name,
            title,
            contact,
            content,
            email,
            startDate,
            endDate,
            password: hashedPassword,
            address,
            area,
            budget,
            images: JSON.stringify(imageUrls),
            created_at,
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

exports.deleteConsultation = async (req, res) => {
    try {
        const { id } = req.params;

        // 삭제 실행
        await consultationService.delete(id);

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete', error: error.message });
    }
};

exports.updateConsultation = async (req, res) => {
    try {
        const { id } = req.params; // 수정할 데이터의 ID
        const {
            name, title, contact, content, email, startDate, endDate,
            password, address, area, budget, created_at
        } = req.body;

        // 비밀번호 암호화
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        // 이미지 업로드 처리
        let imageUrls = [];
        if (req.files) {
            for (const file of req.files) {
                const imageUrl = await uploadImageToS3(file);
                imageUrls.push(imageUrl);
            }
        }

        // 새 데이터를 생성과 동일하게 구성
        const updatedData = {
            name,
            title,
            contact,
            content,
            email,
            startDate,
            endDate,
            password: hashedPassword,
            address,
            area,
            budget,
            images: JSON.stringify(imageUrls),
            created_at,
        };

        // 업데이트 실행
        await consultationService.update(id, updatedData);

        res.status(200).json({ message: 'Consultation updated successfully' });
    } catch (error) {
        console.error('Error updating consultation:', error);
        res.status(500).json({ message: 'Failed to update consultation', error: error.message });
    }
};
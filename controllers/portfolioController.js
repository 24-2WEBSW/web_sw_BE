const portfolioService = require('../services/portfolioService');
const uploadImageToS3 = require('../utils/s3Uploader2');

exports.getPortfolios = async (req, res) => {
    try {
        const portfolios = await portfolioService.fetchAll();
        res.status(200).json(portfolios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch portfolios' });
    }
};

exports.getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioService.fetchById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'portfolios not found' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch portfolio', error: error.message });
    }
};


exports.createPortfolio = async (req, res) => {
    try {
        const {
            title, content, blog_link
        } = req.body;

        let imageUrls = [];
        let mainImage = null;

        if (req.files) {
            for (const [index, file] of req.files.entries()) {
                const imageUrl = await uploadImageToS3(file);
                imageUrls.push(imageUrl);

                // 첫 번째 이미지를 메인 이미지로 설정
                if (index === 0) {
                    mainImage = imageUrl;
                }
            }
        }

        // 포트폴리오 저장
        await portfolioService.create({
            title,
            content,
            blog_link,
            main_image: mainImage,
            images: JSON.stringify(imageUrls),
        });

        res.status(201).json({ message: 'Portfolio created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create portfolio', error: error.message });
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;

        // 삭제 실행
        await portfolioService.delete(id);

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete', error: error.message });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const { id } = req.params; // 수정할 포트폴리오의 ID
        const { title, content, blog_link } = req.body;

        let imageUrls = [];
        let mainImage = null;

        // 이미지 업로드 처리
        if (req.files) {
            for (const [index, file] of req.files.entries()) {
                const imageUrl = await uploadImageToS3(file);
                imageUrls.push(imageUrl);

                // 첫 번째 이미지를 메인 이미지로 설정
                if (index === 0) {
                    mainImage = imageUrl;
                }
            }
        }

        // 기존 이미지 덮어쓰기 - 생성과 동일하게 새 데이터로 대체
        const updatedData = {
            title,
            content,
            blog_link,
            main_image: mainImage,
            images: JSON.stringify(imageUrls),
        };

        // 업데이트 실행
        await portfolioService.update(id, updatedData);

        res.status(200).json({ message: 'Portfolio updated successfully' });
    } catch (error) {
        console.error('Error updating portfolio:', error);
        res.status(500).json({ message: 'Failed to update portfolio', error: error.message });
    }
};
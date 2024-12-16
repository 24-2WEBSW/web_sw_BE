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
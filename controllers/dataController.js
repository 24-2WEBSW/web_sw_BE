const dataService = require('../services/dataService');
const path = require('path');

exports.uploadMaterials = async (req, res) => {
    try {
        const bucketName = 'webswimg'; // S3 버킷 이름

        // HD 데이터 처리
        console.log('Processing Hyundai data...');
        const hdJsonFilePath = path.resolve(__dirname, '../uploads/hd_products.json');
        const hdImageFolder = path.resolve(__dirname, '../images/hd_images');
        await dataService.processJsonAndUpload(hdJsonFilePath, hdImageFolder, bucketName, 'hyundai_materials', '제품이름');

        // LX 데이터 처리
        console.log('Processing LX data...');
        const lxJsonFilePath = path.resolve(__dirname, '../uploads/lx_products.json');
        const lxImageFolder = path.resolve(__dirname, '../images/lx_images');
        await dataService.processJsonAndUpload(lxJsonFilePath, lxImageFolder, bucketName, 'lx_materials', '제품명');

        res.status(200).json({ message: 'HD and LX data uploaded and stored successfully' });
    } catch (error) {
        console.error('Upload failed:', error.message);
        res.status(500).json({ message: 'Data upload failed', error: error.message });
    }
};

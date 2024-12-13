const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const db = require('../config/dbConfig'); // RDS 연결 설정

// S3 설정
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});
const s3 = new AWS.S3();

// S3에 이미지 업로드
const uploadToS3 = async (filePath, bucketName, key) => {
    const fileContent = fs.readFileSync(filePath);
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent,
        ContentType: 'image/jpeg',
    };
    return s3.upload(params).promise();
};

// JSON 데이터를 처리하고 S3와 RDS에 저장
const processJsonAndUpload = async (jsonFilePath, imageFolder, bucketName, tableName, keyName) => {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    for (const item of jsonData) {
        const imagePath = path.resolve(imageFolder, `${item[keyName]}.jpg`);

        if (!fs.existsSync(imagePath)) {
            console.error(`Image not found: ${imagePath}`);
            continue;
        }

        const s3Key = `products/${item[keyName]}.jpg`;

        try {
            // S3에 업로드
            const result = await uploadToS3(imagePath, bucketName, s3Key);
            console.log(`Uploaded to S3: ${result.Location}`);
            item.S3_URL = result.Location;

            // RDS에 저장
            if (tableName === 'hyundai_materials') {
                await db.query(
                    `INSERT INTO hyundai_materials (product_name, pattern, coating, size, image_url) VALUES (?, ?, ?, ?, ?)`,
                    [item.제품이름, item.패턴, item.코팅, item.사이즈, result.Location]
                );
            } else if (tableName === 'lx_materials') {
                await db.query(
                    `INSERT INTO lx_materials (category, product_name, size, image_url) VALUES (?, ?, ?, ?)`,
                    [item.카테고리, item.제품명, item['Repeat Size'], result.Location]
                );
            }
        } catch (error) {
            console.error(`Failed to process ${imagePath}: ${error.message}`);
        }
    }
};

module.exports = { processJsonAndUpload };

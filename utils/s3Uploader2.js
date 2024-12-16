const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadImageToS3 = async (file) => {
    const key = `portfolio/${uuidv4()}-${file.originalname}`;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    const data = await s3.upload(params).promise();
    return data.Location; // 업로드된 이미지 URL 반환
};

module.exports = uploadImageToS3;

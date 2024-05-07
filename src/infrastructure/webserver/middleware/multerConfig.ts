import dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESSKEY_ID || ''
    }
});

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'home-service-bucket',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

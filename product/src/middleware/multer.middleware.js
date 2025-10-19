import multer from 'multer';
import { v4 as uuid } from 'uuid';
import fs from 'node:fs';

const uploadDir = 'public/uploads/';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
            'online-shop' +
            '-' +
            uuid() +
            '-' +
            Date.now() +
            '-' +
            'susovan-das';
        console.log(uniqueSuffix);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
});

export { upload };

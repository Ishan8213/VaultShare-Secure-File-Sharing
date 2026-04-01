const express = require('express');
const router = express.Router();
const auth = require('../middleware/AuthMiddleware');
const admin = require('../middleware/adminMiddleware');
const upload = require('../utils/upload');

// allow file optional
const {
    uploadFile,
    downloadFile,
    getAllFiles,
    getMyFiles
} = require('../controllers/FileController');

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/download/:id', auth, downloadFile);
router.get('/my', auth, getMyFiles);
router.get('/all', auth, admin, getAllFiles);

module.exports = router;
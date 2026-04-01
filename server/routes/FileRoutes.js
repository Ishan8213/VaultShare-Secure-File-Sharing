const express = require('express');
const router = express.Router();
const auth = require('../middleware/AuthMiddleware');
const admin = require('../middleware/adminMiddleware');

const {
    uploadFile,
    downloadFile,
    getAllFiles,
    getMyFiles
} = require('../controllers/FileController');

router.post('/upload', auth, uploadFile);
router.get('/download/:id', auth, downloadFile);
router.get('/my', auth, getMyFiles);
router.get('/all', auth, admin, getAllFiles);

module.exports = router;
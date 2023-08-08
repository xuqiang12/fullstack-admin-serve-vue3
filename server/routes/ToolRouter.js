var express = require('express')
const multer = require("multer");
const {storage} = require('../config/app.config');
const { UploadController } = require('../controllers/ToolController')
var router = express.Router()

router.post('/upload', multer({ storage: storage }).single("file"), UploadController.upload)


module.exports = router

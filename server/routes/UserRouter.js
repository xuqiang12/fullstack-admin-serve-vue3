var express = require('express');
const UserController = require('../controllers/UserController');
const userRequest = require('../request/userRequest');
var router = express.Router();


router.post('/login',userRequest.login, UserController.login);
router.post('/register',userRequest.register, UserController.register);
router.get('/userInfo', UserController.userInfo);


module.exports = router;

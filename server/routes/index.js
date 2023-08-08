var express = require('express');
var router = express.Router();
const { validationResult, body } = require('express-validator');
const requestVerify = require('../utils/validate');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send({mes:'1111'})
//   // res.render('index', { title: 'Express' });
// });
router.post('/', requestVerify([
  body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({ min: 3 }).withMessage('用户名长度不能小于3').bail(),
  body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
]), () => {
  console.log('最后的逻辑处理')
});

module.exports = router;

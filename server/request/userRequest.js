const validate = require('../utils/validate')
const { body } = require('express-validator')
module.exports.login = validate([
  body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isMobilePhone('zh-CN').withMessage('手机号格式不正确').bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail()
])
module.exports.register = validate([
  body('name').notEmpty().withMessage('姓名不能为空').bail(),
  body('phone')
    .notEmpty()
    .withMessage('手机号不能为空')
    .bail()
    .isMobilePhone('zh-CN')
    .withMessage('手机号格式不正确')
    .bail(),
  body('password').notEmpty().withMessage('密码不能为空').bail(),
  body('email').notEmpty().withMessage('密码不能为空').bail(),
])

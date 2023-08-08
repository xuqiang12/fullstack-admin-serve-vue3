const validate = require('../utils/validate')
const { body } = require('express-validator')
module.exports.add_menu = validate([
  body('menuName').notEmpty().withMessage('菜单名称不能为空').bail(),
  body('route').notEmpty().withMessage('路由地址不能为空').bail(),
  body('routeName').notEmpty().withMessage('路由名称不能为空').bail(),
  body('hidden').notEmpty().withMessage('路由类型不能为空').bail(),
])
module.exports.del_menu = validate([
  body('id').notEmpty().withMessage('id不能为空').bail()
])
module.exports.register = validate([
  body('name')
    .notEmpty().withMessage('姓名不能为空').bail(),
  body('phone')
    .notEmpty().withMessage('手机号不能为空').bail()
    .isMobilePhone('zh-CN').withMessage('手机号格式不正确').bail(),
  body('password')
    .notEmpty().withMessage('密码不能为空').bail(),
  body('email')
    .notEmpty().withMessage('密码不能为空').bail()
])

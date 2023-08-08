const crypto = require('crypto') //密码加密存储
const response = require('../utils/response')
const JWT = require('../utils/JWT')
const { formatTree } = require('../utils/format')
const { UserEntity, RoleEntity, MenuEntity, UserRoleEntity } = require('../entity/index')
const UserController = {
  login: async (req, res, next) => {
    /**
     * @api {post} /api/user/login 登录
     * @apiName 登录
     * @apiGroup 用户管理
     * @apiBody  {String} username 用户手机号
     * @apiBody  {String} password  密码
     * @apiSuccess {Number} code 200
     * @apiSuccess {Object} data 用户信息
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE4NTY3NTI2Nzg2IiwicGFzc3dvcmQiOiJ4cTE5OTgwMjEyNTIxIiwiaWF0IjoxNjg5OTI3MjAwLCJleHAiOjE2ODk5NjMyMDB9.dbuuTmKXpnrA5q2LtgW2Z6YKTzpZ1u2AWldirSAt3I4"
      },
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/user/login
     */
    try {
      const { username = '', password } = req.body
      const md5pwd = crypto.createHash('md5').update(password).digest('hex')
      const result = await UserEntity.findOne({ where: { phone: username, password: md5pwd } })
      if (result) {
        const token = JWT.generate({ userId: result.id, phone: result.phone, password: result.password }, '10h')
        response(res, { data: { token: token } })
      } else {
        response(res, { message: "账号或密码错误", status: -1 })
      }
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
  register: async (req, res) => {
    /**
     * @api {post} /api/user/register 注册
     * @apiName 注册
     * @apiGroup 用户管理
     * @apiBody  {String} name   姓名
     * @apiBody  {String} phone  用户手机号（后面作为登录账号）
     * @apiBody  {String} password  用户密码
     * @apiBody  {String} email  联系邮箱
     * @apiSuccess {Number} code 200
     * @apiSuccess {Object} data
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": {
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjE4NTY3NTI2Nzg2IiwicGFzc3dvcmQiOiJ4cTE5OTgwMjEyNTIxIiwiaWF0IjoxNjg5OTI3MjAwLCJleHAiOjE2ODk5NjMyMDB9.dbuuTmKXpnrA5q2LtgW2Z6YKTzpZ1u2AWldirSAt3I4"
      },
      "message": "成功"
    }
    * @apiSampleRequest http://localhost:3000/api/user/login
    */
    try {
      const { name, phone, password, email } = req.body
      const md5pwd = crypto.createHash('md5').update(password).digest('hex')
      const verifyResult = await UserEntity.findAll({ where: { phone: phone } })
      if (verifyResult.length > 0) {
        response(res, { message: "当前账号已存在", status: -1 })
      }
      await UserEntity.create({ name, phone, password: md5pwd, email });
      response(res)
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
  userInfo: async (req, res) => {
    try {
      const info = JWT.verify(req.headers.token)
      if (info) {
        const user = await UserEntity.findOne({ where: { id: info.userId } })
        const userRole = await UserRoleEntity.findOne({ where: { userId: info.userId } })
        let menus = {}
        if (userRole.roleId === 1) {//超级管理员
          menus = await MenuEntity.findAll({ raw: true })
        } else {
          const result = await RoleEntity.findOne({ include: [{ model: MenuEntity, through: { attributes: [] }, }], attributes: [], where: { id: userRole.roleId } })
          menus = JSON.parse(JSON.stringify(result)).menus
        }
        response(res, { message: "成功", status: 200, data: { ...JSON.parse(JSON.stringify(user)), menu: formatTree(menus) } })
      }
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }

  },
}
module.exports = UserController

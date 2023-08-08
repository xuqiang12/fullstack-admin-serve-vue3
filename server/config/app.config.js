const multer = require("multer");
const moment = require('moment');
const os = require('os');
const fs = require('fs');
const { URL_WHITE_LIST } = require("./constant.config")
const JWT = require('../utils/JWT')
const { UserEntity } = require('../entity/index')

const AppConfig = {
  // 请求拦截 token验证
  intercept: async (req, res, next) => {
    // // 不需要进行验证的api，白名单
    if (URL_WHITE_LIST.some(item => item === req._parsedUrl.pathname)) {
      next()
      return false
    }
    try {
      const token = req.headers['token']
      if (token && JWT.verify(token)) {
        const { userId } = JWT.verify(token)
        const user = await UserEntity.findOne({ where: { id: userId } })
        if (user) {
          next()
        }else{
          res.send({ status: -401, msg: '当前用户不存在' })
        }
      } else {
        res.send({ status: -401, msg: 'token信息错误，不存在，过期1' })
      }
    } catch (error) {
      res.send({ status: -500, msg: error.message })
    }

  },
  //上传文件配置
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      let time = moment().format("YYYY-MM-DD")
      const folderPath = 'public/upload/' + time; // 根据请求体中的 folderName 创建文件夹
      fs.mkdirSync(folderPath, { recursive: true }); // 使用 fs.mkdirSync 创建文件夹（递归创建）
      cb(null, folderPath) //上传目录
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);//文件名
    }
  }),
  //获取当前主机的ip地址
  getIpAddress: () => {
    let ifaces = os.networkInterfaces()
    for (let dev in ifaces) {
      let iface = ifaces[dev]
      for (let i = 0; i < iface.length; i++) {
        let { family, address, internal } = iface[i]
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
  }
}
module.exports = AppConfig;

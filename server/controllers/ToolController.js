
const AppConfig = require('../config/app.config')
const { CONFIG_PORT } = require('../config/constant.config')
const response = require('../utils/response')
const UploadController = {
  upload: async (req, res, next) => {
    try {
      console.log(req.file)
      response(res, { data: { url: `http://${AppConfig.getIpAddress()}:${CONFIG_PORT}/${req.file.destination}/${req.file.filename}` } })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  }
}
module.exports = { UploadController }

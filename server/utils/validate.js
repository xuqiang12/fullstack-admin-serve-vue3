const { validationResult } = require('express-validator')
const response = require('../utils/response')

module.exports = (validator) => {
  return async (req, res, next) => {
    await Promise.all(validator.map(validate => validate.run(req)))
    const errors = validationResult(req).array()
    if (errors.length > 0) {
      return response(res, { status: -401, data: {}, message: errors[0].msg })
    }
    next()
  }
}

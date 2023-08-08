const jsonwebtoken = require('jsonwebtoken');
const secret = "test"
const JWT = {
  generate(value, expires) {
    return jsonwebtoken.sign(value, secret, { expiresIn:  expires })
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch (error) {
      // console.log(error)
      return false
    }
  }
}

module.exports = JWT

// module.exports = {
//   error(res, message, status = 203) { // 返回报错
//     res.send({ status, message: message instanceof Error ? message.message : message, data: {} })
//   },
//   success(res, data = {}, message = "成功", status = 200) { // 返回成功
//     res.send({ status, data: data, message })
//   },

// }
const response = (res, { data = {}, message = "成功", status = 200 }) => {
  res.send({ status, data: data, message:message })
}
module.exports = response

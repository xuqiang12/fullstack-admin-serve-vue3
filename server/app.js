//
/**
 * 安装服务依赖 npm install mysql express body-parser --save
 * 安装热加载 npm install -g nodemon
 * 运行项目 nodemon index.js
 */
// node 后端服务器
const bodyParser = require('body-parser')
const express = require('express');
const { CONFIG_PORT } = require('./config/constant.config');
const app = express()
const AppConfig = require('./config/app.config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/UserRouter.js');
var systemRouter = require('./routes/SystemRouter.js');
var ToolRouter = require('./routes/ToolRouter.js');
// 采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  // 跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options') {
    res.send(200) // 让options尝试请求快速结束
  } else { next(); }
})
app.use('/public', express.static('public'));
app.use(AppConfig.intercept)//token验证
app.use(bodyParser.json()) // 以json格式返回出去
app.use(bodyParser.urlencoded({ extended: false }))
//请求头拦截
// 监听端口

app.listen(CONFIG_PORT, () => { console.log(`服务器已经启动:http://${AppConfig.getIpAddress()}:${CONFIG_PORT}`) })
// 后端api路由

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/system', systemRouter);
app.use('/api/tool', ToolRouter);
// app.all('*', (request, response) =>
//     response.status(404).send('Invalid route (not found).')
// )

// app.use('/menu', menuRouter);
app.use((err, req, res, next) => {
  // err 接收路由中传递的错误信息
  console.log(err);
  // 响应给客户端的错误信息
  res.send({ code: 500, msg: '服务器内部错误' })
})
// module.exports = app;

// 监听端口
// app.listen(3000)
// console.log('success listen at port......:http://localhost:3000')

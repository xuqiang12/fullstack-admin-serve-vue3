//1.导入Sequelize模块
const Sequelize = require('sequelize');

//new Sequelize('数据库名','用户名','密码',{配置信息})
//2.使用sequelize模块配置和数据库的连接信息：创建连接数据库的对象
const sequelize = new Sequelize('xuqiang', 'xuqiang', 'c7f5a86fcc7d688d', {
  host: 'mysql.sqlpub.com', //数据库服务器的IP地址或域名
  port: 3306, //数据库使用的端口号。MySQL数据库的默认端口号是3306
  dialect: 'mysql',//数据库的类型
  pool: { //数据库连接池：放若干个数据库的连接对象，提高数据库的访问效率
    max: 20, //数据库连接池中连接对象的最大个数
    min: 3, //数据库连接池中连接对象的最少个数
    idle: 20000 //等待延迟的时间，单位是毫秒
  },
  define: {
    'charset': 'utf8', //处理Mysql中中文字符问题
    freezeTableName: true, //不使用sequelize给模型自定义的表名（自定义表名的命名规则：模型名后加s）
    timestamps: true, //若为true，在获取数据时，会自动添加两列数据（createTime、updateTime）
    createdAt: 'created_time',//修改默认的创建时间列名
    updatedAt: 'updated_time'//修改默认的更新时间列名
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  }
  // query: { raw: true }//查询语句只查询dataValues
})
// mysql_Sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
  // mysql_Sequelize.sync()
//3.导出数据库的连接对象
module.exports ={sequelize,Sequelize} ;

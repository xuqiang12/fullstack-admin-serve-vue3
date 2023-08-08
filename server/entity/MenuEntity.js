
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('menu', {
    id: {
      type: Sequelize.INTEGER, //表示id的数据类型为int型（整数型）
      autoIncrement: true, //表示id的值在表中是自增的
      allowNull: false, //表示id对应列的值不能为空
      primaryKey: true,//设置为主键
      field: 'id' //实现模型的属性名和表的列名之间映射关系（对应关系）
    },
    menuName: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'menuName'
    },
    menuIcon: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'menuIcon'
    },
    route: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'route'
    },
    routeName: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'routeName'
    },
    hidden: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'hidden'
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'status'
    },
    pid: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'pid'
    },
  })
}

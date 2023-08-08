module.exports = (sequelize,Sequelize)=>{
  return sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER, //表示id的数据类型为int型（整数型）
      autoIncrement: true, //表示id的值在表中是自增的
      allowNull: false, //表示id对应列的值不能为空
      primaryKey: true,//设置为主键
      field: 'id' //实现模型的属性名和表的列名之间映射关系（对应关系）
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'name'
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'phone'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'password'
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'email'
    },
  })
}

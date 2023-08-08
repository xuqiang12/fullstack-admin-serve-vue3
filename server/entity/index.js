const config = require('../config/db.config');
const path = require("path")
const Sequelize = config.Sequelize;
// const user = require("./UserEntity.js")(config.sequelize, Sequelize); // 新版本写法
// const menu = require("./MenuEntity.js")(config.sequelize, Sequelize); // 新版本写法
// const role = require("./RoleEntity.js")(config.sequelize, Sequelize); // 新版本写法
// const UserRoleOpt = require("./UserRoleOptEntity")(config.sequelize, Sequelize); // 新版本写法

// role.belongsToMany(menu, { through: UserRoleOpt, foreignKey: 'roleId', otherKey: 'menuOrOptId', })
// menu.belongsToMany(role, { through: UserRoleOpt, foreignKey: 'menuOrOptId', otherKey: 'roleId' })

// module.exports = { user,menu,role,UserRoleOpt }

const fs = require('fs');
let files = fs.readdirSync(__dirname + '/');
let js_files = files.filter((f) => {
  return f.endsWith('.js');
}, files);
const modelEntity = {}
for (let f of js_files) {
  let name = f.substring(0, f.length - 3);
  if (name == "index") continue
  //Sequelize的Model模型统一管理
  modelEntity[name] = require(path.join(__dirname, f))(config.sequelize, Sequelize);
}

//角色菜单权限多对多
modelEntity.RoleEntity.belongsToMany(modelEntity.MenuEntity, { through: modelEntity.UserRoleOptEntity, foreignKey: 'roleId', otherKey: 'menuOrOptId', })
modelEntity.MenuEntity.belongsToMany(modelEntity.RoleEntity, { through: modelEntity.UserRoleOptEntity, foreignKey: 'menuOrOptId', otherKey: 'roleId' })
console.log(modelEntity)

module.exports = modelEntity



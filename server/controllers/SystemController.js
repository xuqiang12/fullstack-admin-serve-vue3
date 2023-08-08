const response = require('../utils/response')
const {MenuEntity,RoleEntity} = require('../entity/index')
const { formatTree } = require('../utils/format')
const MenuController = {
  get_menu_list: async (req, res, next) => {
    /**
     * @api {get} /api/system/menu/list 菜单列表
     * @apiGroup 系统管理
     * @apiHeader {token} headers 请求头
     * @apiSuccess {Number} status 200
     * @apiSuccess {Object} data 菜单信息
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": [
        {
            "id": 2,
            "menuName": "系统管理",
            "menuIcon": "1",
            "route": "/system",
            "routeName": "System",
            "hidden": 0,
            "status": 1,
            "pid": 0
        },
      ],
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/system/menu/list
     */
    try {
      const result = await MenuEntity.findAll({ raw: true,})
      response(res, { data: formatTree(result) })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
  add_menu: async (req, res, next) => {
    /**
     * @api {post} /api/system/menu/add 菜单新增
     * @apiGroup 系统管理
     * @apiHeader {token} headers 请求头
     * @apiBody  {String} menuName 菜单名称
     * @apiBody  {String} menuIcon  菜单图标
     * @apiBody  {String} route  路由地址
     * @apiBody  {String} routeName  路由名称
     * @apiBody  {String} hidden  是否是菜单路由
     * @apiBody  {String} status  是否启用
     * @apiBody  {String} pid  父id
     * @apiSuccess {Number} code 200
     * @apiSuccess {Object} data
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": {},
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/system/menu/add
     */
    try {
      const { menuName, menuIcon = '', route, routeName, hidden, status = 1, pid = 0 } = req.body
      const result = await MenuEntity.create({ menuName, menuIcon, route, routeName, hidden, status, pid })
      response(res, { data: '' })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
  del_menu: async (req, res, next) => {
    /**
     * @api {post} /api/system/menu/add 删除菜单
     * @apiGroup 系统管理
     * @apiHeader {token} headers 请求头
     * @apiBody  {String} id 菜单id
     * @apiSuccess {Number} code 200
     * @apiSuccess {Object} data
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": {},
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/system/menu/del
     */
    try {
      const { id } = req.body
      const result = await MenuEntity.destroy({ where: { id: id } })
      if(result === 0) throw new Error('暂无此id对应的菜单，删除失败')
      response(res, { data: '' })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
  get_menu_item: async (req, res, next) => {
    /**
     * @api {post} /api/system/menu/detail 获取菜单详情
     * @apiGroup 系统管理
     * @apiHeader {token} headers 请求头
     * @apiBody  {String} id 菜单id
     * @apiSuccess {Number} code 200
     * @apiSuccess {Object} data
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": {},
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/system/menu/detail
     */
    try {
      const { id } = req.body
      const result = await MenuEntity.findOne({ where: { id: id } })
      if(!result) throw new Error('暂无此id对应的菜单')
      response(res, { data: result })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
  update_menu_item: async (req, res, next) => {
    /**
     * @api {post} /api/system/menu/upadte 获取菜单详情
     * @apiGroup 系统管理
     * @apiHeader {token} headers 请求头
     * @apiBody  {String} id 菜单id
     * @apiBody  {String} menuName 菜单名称
     * @apiBody  {String} menuIcon  菜单图标
     * @apiBody  {String} route  路由地址
     * @apiBody  {String} routeName  路由名称
     * @apiBody  {String} hidden  是否是菜单路由
     * @apiBody  {String} status  是否启用
     * @apiBody  {String} pid  父id
     * @apiSuccess {Number} code 200
     * @apiSuccess {Object} data
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": {},
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/system/menu/upadte
     */
    try {
      const { menuName, menuIcon = '', route, routeName, hidden, status = 1, pid = 0,id } = req.body
      console.log(id)
      if(!id) throw new Error('暂无此id对应的菜单')
      const result = await MenuEntity.update({ menuName, menuIcon, route, routeName, hidden, status, pid},{ where: { id: id } })
      response(res, { data: '' })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
}
const RoleController = {
  get_role_list: async (req, res, next) => {
    /**
     * @api {get} /api/system/role/list 菜单列表
     * @apiGroup 系统管理
     * @apiHeader {token} headers 请求头
     * @apiSuccess {Number} status 200
     * @apiSuccess {Object} data 菜单信息
     * @apiSuccessExample {type} Response-Example:
     {
      "status": 200,
      "data": [
        {
            "id": 2,
            "menuName": "系统管理",
            "menuIcon": "1",
            "route": "/system",
            "routeName": "System",
            "hidden": 0,
            "status": 1,
            "pid": 0
        },
      ],
      "message": "成功"
     }
     *@apiSampleRequest http://localhost:3000/api/system/role/list
     */
    try {
      const result = await RoleEntity.findAll({ raw: true,})
      response(res, { data: result })
    } catch (error) {
      response(res, { message: error.message, status: -500 })
    }
  },
}
module.exports = { MenuController,RoleController }

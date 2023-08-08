var express = require('express')
const { MenuController,RoleController } = require('../controllers/SystemController')
const systemRequest = require('../request/systemRequest')
var router = express.Router()

router.get('/menu/list', MenuController.get_menu_list)
router.post('/menu/add', systemRequest.add_menu, MenuController.add_menu)
router.post('/menu/del', systemRequest.del_menu, MenuController.del_menu)
router.post('/menu/detail', systemRequest.del_menu, MenuController.get_menu_item)
router.post('/menu/update', systemRequest.add_menu, MenuController.update_menu_item)
router.get('/role/list', RoleController.get_role_list)


module.exports = router

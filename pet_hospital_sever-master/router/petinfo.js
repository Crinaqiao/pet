// 导入express服务器
const express = require('express')
// 导入路由
const router = express.Router()

const pet_handle = require('../router_handle/petinfo')

const expressJoi = require('@escook/express-joi')

// const { reg_login_schema } = require('../schema/user')



// 获取宠物信息
router.get('/getinfo', pet_handle.getpetinfo)
// 添加宠物信息
router.post('/addinfo', pet_handle.addpetinfo)
module.exports = router
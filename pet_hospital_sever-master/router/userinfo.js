const express = require('express')
const router = express.Router()
const userinfo = require('../router_handle/userinfo')
// 导入验证数据的中间件 
const expressJoi = require('@escook/express-joi')
const { updata_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 获取z指定用户信息
router.post('/userinfo', userinfo.getUserinfo)
router.get('/userinfo', userinfo.allgetUserinfo)
// 获取所有用户的信息
router.get('/userinfo', userinfo.getUserinfo)
// 更新用户基本信息
router.post('/upuserinfo', expressJoi(updata_userinfo_schema), userinfo.upataUserinfo)
// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo.updatePassword)
// 删除指定成员
router.post('/deleteuser', userinfo.deleteUserById)
// 根据id删除列表

module.exports = router
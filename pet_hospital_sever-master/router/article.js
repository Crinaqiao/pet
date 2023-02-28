const express = require('express')
const router = express.Router()

// 导入需要的处理函数模块
const article_handler = require('../router_handle/article')

// 导入 multer 和 path
// const multer = require('multer')
// const path = require('path')

// 创建 multer 的实例
// const uploads = multer({ dest: path.join(__dirname, '../uploads') })
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     // 不用写成../uploads，不是路径，而是文件夹名称
//       cb(null, 'uploads')
//     },
//     // 存到uploads的命名
//     filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       // cb(null, file.fieldname + '-' +Date.now() +path.extname(file.originalname))
//       cb(null,file.originalname)
//     }
//   }) 
//   const uploads = multer({ storage})
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { add_article_schema ,articleid_schema} = require('../schema/article')

// 发布文章的路由
router.post('/add', expressJoi(add_article_schema), article_handler.addArticle)
// // 获取文章
router.get('/articlesList',article_handler.getArticle)
//根据id获取文章
router.post('/articleid',expressJoi(articleid_schema),article_handler.getArticleid)
//根据id删除文章
router.post('/deletearticle',article_handler.deletearticle)
//发布文章
router.post('/pubarticle',article_handler.pubarticle)
module.exports = router

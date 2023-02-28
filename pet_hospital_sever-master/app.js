const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('joi')
const config = require('./cofig')
// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
const bodyParser = require('body-parser')
// // 解析 token 的中间件
// const expressJWT = require('express-jwt')
app.use(cors())
app.use(express.urlencoded({ extended: false }))
// json请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({ extended: false }))
// 一定要在路由之前放封装函数
// 优化res,send代码
app.use(function (req, res, next) {
    // status=0成功，status=1失败,默认失败
    res.cc = function (err, status = 1) {
        res.send({
            // 状态
            status,
            // 判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})
// 验证身份
app.use(function (err, req, res, next) {
    if (err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
    // 捕获身份认证的错误
    if (err.name === 'UnaythorizedError') return res.cc('身份认证失败！')

})
// .unless指定哪些接口不需要身份认证
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// 挂载用户路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 挂载用户信息路由
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
// 挂载文章路由
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

// 挂载宠物信息路由
const petinfoRouter = require('./router/petinfo')
app.use('/pet', petinfoRouter)

//图片接口
const imgRouter=require('./router/img')
app.use(imgRouter)

// 使用 express.static() 中间件，将 uploads 目录中的图片托管为静态资源： F
app.use('/uploads', express.static('./uploads'))

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})



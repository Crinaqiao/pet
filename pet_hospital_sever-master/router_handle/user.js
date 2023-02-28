const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../cofig')
// const app = require('../app')
// 注册
exports.regUser = (req, res) => {
    // 获取客=客户端提交到服务器的用户信息
    const userinfo = req.body
    console.log(userinfo)
    // 检查账户非法性
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('账号密码非法')
    //     // res.send({ stauts: 1, message: '账号密码非法' })
    // }
    // 判断账号是否重名
    const sql = 'select * from ev_users where username=?'
    // sql语句，参数，返回函数：执行成功或者失败都可以写函数
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
            // res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        }
        // TODO: 用户名可用，继续后续流程...
        // 密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        console.log(userinfo)
        // 插入账号到数据库
        const sqlInsert = 'insert into ev_users set ?'
        db.query(sqlInsert, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 执行语句失败
            if (err)
                return res.cc(err)
            // res.send({ status: 1, message: err.message })
            //    判断影响行数是否为1
            if (results.affectedRows !== 1) {
                // return res.send({ stauts: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }
            // res.send({ stauts: 0, message: '注册成功！' })
            return res.cc('注册成功！', 0)
        })

    })
}

// 登录
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username, userinfo.password], function (err, results) {
        if (err) {
            return res.cc()
        }
        if (results.length !== 1) {
            return res.cc('登陆失败1！')
        }
        // 对比提交的密码和数据库的密码
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult)
            return res.cc('密码或账号有误！')
        const user = { ...results[0], password: '', user_pic: '' }
        console.log(user)
        // 身份码
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h',})
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
            id:user.id
        })
    })
}

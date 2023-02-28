const joi = require('joi')
// 注册用户名的验证规则
// const username = joi.string().alphanum().min(1).max(10).required()
const username = joi.string().min(1).max(10).required()
// ^是开始，&是结束，\s是字符串的意思
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
    body: {
        username,
        password,
    },
}

// 定义更换信息id,nickname,email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string()
const email = joi.string().email()
const user_pic = joi.string()

// 定义id,nickname,email的对象
exports.updata_userinfo_schema = {
    body: {
        id, nickname, email,user_pic
    },
}

// 定义重置密码的验证对象规则
exports.update_password_schema = {
    body: {
        id,
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}

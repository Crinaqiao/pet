// 导入数据库
const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 获取Id用户基本信息
exports.getUserinfo = (req, res) => {
    // 根据用户Id查询用户基本信息
    // const sql = `select * id,username,nickname,email,user_pic from ev_users where id=?`
    const sql = `select * from ev_users where id=?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('获取用户信息失败')

        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results[0],
        })
    })
 
}
// 获取全部用户基本信息
// exports.allgetUserinfo = (req, res) => {
//     // 根据用户Id查询用户基本信息
//     // const sql = `select * id,username,nickname,email,user_pic from ev_users where id=?`
//     const sql = `select * from ev_users`
//     db.query(sql,  (err, results) => {
//         if (err) return res.cc(err)
//     })
// }


// 获取所有用户基本信息
exports.allgetUserinfo = (req, res) => {
    // 根据用户Id查询用户基本信息
    // const sql = `select * id,username,nickname,email,user_pic from ev_users where id=?`
    const sql = `select * from ev_users where is_delete=0`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
// >>>>>>> 74a0281 (完成删除指定用户功能)
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: results,
        })
    })
 
}

// 更新用户信息
exports.upataUserinfo = (req, res) => {
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)

        // if (results.affectRows !== 1) return res.cc(err)

         res.send({
            status:0,
            message:'修改成功'
         })
    })
}
// 重置密码
exports.updatePassword = (req, res) => {
    // 查询用户id
    const sql = `select * from ev_users where id=?`
    //req.body=>req.user
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1)
            return res.cc("用户不存在！")
        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        // 漏了res.cc
        if (!compareResult) return res.cc('原密码错误')
        // 新密码加密，更新到数据库,漏了set
        const sql = `update ev_users set password=? where id=?`
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('密码重置失败！')
            return res.cc('密码重置成功！',0)
        })
    })

}
// 更新头像
exports.updateAvatar = (req, res) => {
    // const sql = `update ev_users set user_pic=? where id=?`
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        // if (results.affectRows !== 1) return res.cc('更新头像失败！')
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
        return res.cc('更新头像成功')
    })
}
//删除指定用户
exports.deleteUserById = (req, res) => {
    const sql = `update ev_users set is_delete=1 where id=?`
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败')
        return res.cc('删除成功', 0)
    })
}

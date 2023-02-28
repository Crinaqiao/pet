const db = require('../db/index')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('../cofig')


// 日期模板
getNowFormatDate = () => { 
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  };
// 获取全部宠物信息的处理函数
exports.getpetinfo = (req, res) => {
    const sql = `select * from petInfo `
    db.query(sql, (err, results) => {
      if (err) { return res.cc(err) }
      res.send({
        status: 0,
        message: '获取宠物信息成功！',
        data: results,
      })
      console.log(results)
    })
}
// 添加宠物信息的处理函数
exports.addpetinfo = (req, res) => {
    const addpetinfo={
        ...req.body,
        date: getNowFormatDate(),
    }
    const sql = `insert into petInfo set ?`
    db.query(sql, addpetinfo, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('发布宠物信息失败！')
      // res.cc('发布文章成功！', 0)
      res.send({
        data: addpetinfo,
        message: '添加宠物信息成功',
        status: 0
      })
    })
}
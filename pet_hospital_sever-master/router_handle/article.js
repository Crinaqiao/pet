// 文章的处理函数模块
const path = require('path')
const db = require('../db/index')
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
// 发布文章的处理函数
exports.addArticle = (req, res) => {

  // console.log(req)
  console.log(req.file)
  // if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数！')

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象
  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    // cover_img: path.join('/uploads', req.file.filename+path.parse(req.file.originalname).ext),
    // cover_img: "http://127.0.0.1:3007/uploads/" + req.file.filename,
    // 文章的发布时间
    pub_date: getNowFormatDate(),
    // 文章作者的Id
    // author_id: '',
  }

  const sql = `insert into ev_articles set ?`
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布新文章失败！')
    // res.cc('发布文章成功！', 0)
    res.send({
      data: articleInfo,
      message: '添加成功',
      status: 0
    })
  })
}
// 获取文章
exports.getArticle = (req, res) => {
  // res.send('ok1')
  // 根据分类的状态，获取所有未被删除的分类列表数据
  // is_delete 为 0 表示没有被 标记为删除 的数据
  const sql = `select * from ev_articles where is_delete=0 and state=1`
  db.query(sql, (err, results) => {
    if (err) { return res.cc(err) }
    res.send({
      status: 0,
      message: '获取文章成功！',
      data: results,
    })
    console.log(results)
  })
}
//根据id获取已发布文章信息
exports.getArticleid = (req, res) => {
  const sql = `select * from ev_articles where author_id=? and state=? and is_delete=0`
  db.query(sql,[ req.body.author_id,req.body.state], (err, results) => {
    // console.log(results)
    if (err) { return res.cc(err) }
    // if (results.affectedRows !== 1) return res.cc('查询失败！')
    res.send({
      data:results,
      status:0,
      message:'获取用户动态成功'
    })
  })
}

//根据id删除已发布文章信息
exports.deletearticle = (req, res) => {
  const sql = `update ev_articles set is_delete=1 where id=?`
  db.query(sql,req.body.id, (err, results) => {
    // console.log(results)
    if (err) { return res.cc(err) }
    // if (results.affectedRows !== 1) return res.cc('查询失败！')
    res.send({
      data:results,
      status:0,
      message:'删除文章成功'
    })
  })
}
//发布文章
exports.pubarticle = (req, res) => {
  const sql = `update ev_articles set state=1 where id=?`
  db.query(sql,req.body.id, (err, results) => {
    // console.log(results)
    if (err) { return res.cc(err) }
    // if (results.affectedRows !== 1) return res.cc('查询失败！')
    res.send({
      data:results,
      status:0,
      message:'发布文章成功'
    })
  })
}


const joi = require('joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
// const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('0', '1').required()
const author_id=joi.string().required()
const cover_img=joi.string().required()
// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    // cate_id,
    content,
    state,
    author_id,
    cover_img
  },
}
//查询用户动态文章
exports.articleid_schema = {
  body: {
    state,
    author_id,
  },
}

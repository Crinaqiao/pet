const joi = require('joi')
const { addArticleCates, deleteArticleCates } = require('../router_handle/artcate')
// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
//定义校验对象
exports.addArticleCates = {
    body: {
        name,
        alias,
    }
}

//定义被删除的对象
const id = joi.number().integer().min(1).required()
exports.deleteArticleCates = {
    params: {
        id,
    }
}
exports.getArticleById = {
    params: {
        id,
    }
}

// 更新列表验证对象
exports.updateArticleCates = {
    body: {
        Id:id,
        name,
        alias,
    }
}
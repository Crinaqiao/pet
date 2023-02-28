//上传图片
let express = require('express')
let router = express.Router()
const fileCtrl = require('../router_handle/img')


router.post('/czj-server/upload/v1', fileCtrl.upload)

router.get('/czj-server/public/images', fileCtrl.getImg)


module.exports = router
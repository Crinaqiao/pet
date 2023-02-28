const path = require('path')
const Busboy = require('busboy')
const fs = require('fs')

// 获取图片的后缀
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

//文件上传
exports.upload = async (req, res, next) => {
  const busboy = Busboy({ headers: req.headers });
  // 解析请求文件事件
  busboy.on('file', (fieldname, file, filename) => {
    let fileNames = ''
    let _uploadFilePath = '' //存放的完整路径
    // console.log(file, filename)
    fileNames = Date.now() + '.' + getSuffixName(filename)
    let url = 'http://localhost:3007/czj-server/public/images?id=' + fileNames
    // 文件保存到制定路径
    _uploadFilePath = path.join('public', '/images', fileNames)
    file.pipe(fs.createWriteStream(_uploadFilePath));
    //文件写入事件结束
    file.on('end', function () {
      let datas = {
        message: '文件上传成功',
        url: url
      }
      res.json(datas)
    })
  });

  busboy.on('finish', function () {
    console.log('文件上传结束！',)
  });
  // 解析错误事件
  busboy.on('error', function (err) {
    console.log('文件上出错')

  })
  return req.pipe(busboy);
};

/*
*  "css": "text/css",
 "gif": "image/gif",
 "html": "text/html",
 "ico": "image/x-icon",
 "jpeg": "image/jpeg",
 "jpg": "image/jpeg",
 "js": "text/javascript",
 "json": "application/json",
 "pdf": "application/pdf",
 "png": "image/png",
 "svg": "image/svg+xml",
 "txt": "text/plain",
*/
//查看图片
exports.getImg = async (req, res, next) => {
  let id = req.query.id
  const filePath = path.resolve(__dirname, `../public/images/${id}`);
  //设置请求的返回头type,content的type类型列表见上面
  res.setHeader("Content-Type", 'image/jpeg');
  //格式必须为 binary 否则会出错
  var content = fs.readFileSync(filePath, "binary");
  if (!content) {
    res.json({ msg: '无' })
  }
  res.writeHead(200, "Ok");
  res.write(content, "binary"); //格式必须为 binary，否则会出错
  res.end();
};

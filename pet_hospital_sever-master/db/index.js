// 连接数据库
const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'pethospital',
    // port:3306
})
module.exports = db
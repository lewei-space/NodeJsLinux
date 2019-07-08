const mysql=require('mysql')
const { DATABASE_CONFIG }= require('./db')
//创建链接对象
const con = mysql.createConnection(DATABASE_CONFIG)
// 开始链接
con.connect()
// 统一执行sql 函数
function mysqlExec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result)
    })
  })
  return promise
}
module.exports = {
  mysqlExec,
  escape:mysql.escape
}

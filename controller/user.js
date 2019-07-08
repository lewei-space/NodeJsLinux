const {mysqlExec,escape} = require('../dataBases/mysql')

const  {genPassword}=require('../utils/cryp')

const loginLe = (username, password) => {

  console.log(username,password)
  // 生成加密密码
  password=genPassword(password)

  username=escape(username)
  password=escape(password)

  // 这里用了escape函数 就要把引号给取消
  const sql = `select username,realname from users where username=${username} and password=${password}; `
  return mysqlExec(sql).then(rows => {
    console.log('sql:'+JSON.stringify(rows))

    return rows[0] || {}

  })
}

module.exports = {
  loginLe
}

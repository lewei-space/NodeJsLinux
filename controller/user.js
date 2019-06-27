const {mysqlExec} = require('../dataBases/mysql')

const loginLe = (username, password) => {

  console.log(username,password)

  const sql = `select username,realname from users where username='${username}' and password='${password}'; `
  return mysqlExec(sql).then(rows => {
    console.log('sql:'+JSON.stringify(rows))

    return rows[0] || {}

  })
}

module.exports = {
  loginLe
}

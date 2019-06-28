const {loginLe} = require('../controller/user')
const {SucceccModel, ErrorModel} = require('../model/resModule')

const HandleUserRouter = (req, res) => {

  const method = req.method;
  if (method === 'POST' && req.path === '/api/user/login') {
    // const {username, password} = req.body
    const username = req.body.username
    const password = req.body.password
    const result = loginLe(username, password)
    return result.then(loginData => {
      console.log('loginData22'+JSON.stringify(loginData))
      if (loginData.username) {
        return new SucceccModel('登陆成功')
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
}

module.exports = HandleUserRouter

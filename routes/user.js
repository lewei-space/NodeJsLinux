const {loginLe} = require('../controller/user')
const {SucceccModel, ErrorModel} = require('../model/resModule')

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  // console.log(d.toGMTString())
  return d.toGMTString()
}

const HandleUserRouter = (req, res) => {
  const method = req.method;
  if (method === 'POST' && req.path === '/api/user/login') {
    const username = req.body.username
    const password = req.body.password
    const result = loginLe(username, password)

    return result.then(loginData => {
      console.log('loginData22' + JSON.stringify(loginData))
      if (loginData.username) {
        // 操作session
        req.session.username = loginData.username
        req.session.realname = loginData.realname

        console.log('session is' + JSON.stringify(req.session))

        return new SucceccModel('登陆成功')
      } else {
        return new ErrorModel('登陆失败')
      }
    })
  }
}

module.exports = HandleUserRouter

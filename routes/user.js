const {
  loginLe
} = require('../controller/user')

const HandleUserRouter = (req, res) => {
  const method = req.method;
  if (method === 'POST' && req.path === '/api/user/login') {

    console.log(req)

    const {username, password} = req.body

    const result = loginLe(req.body.username, req.body.password)
    if (result) {
      return true
    } else {
      return false
    }
  }
}

module.exports = HandleUserRouter

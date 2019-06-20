const HandleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '这是登陆接口'
    }
  }
}

module.exports = HandleUserRouter

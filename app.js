const handleBlogRouter = require('./routes/blog')
const handleUserRouter = require('./routes/user')


const serverhanDle = (req, res) => {
  // 获取path
  req.path=req.url.split('?')[0]

  // 设置返回格式

  res.setHeader('content-type', 'application/json')
  //
  // const resData = {
  //   name: 'muke',
  //   site: 'wwwImooc',
  //   env: process.env.NODE_ENV
  // }

  // 处理blog路由
  const handBlogData = handleBlogRouter(req, res)
  if (handBlogData) {
    res.end(
      JSON.stringify(handBlogData)
    )
    return
  }
  // 处理用户路由
  const handUserData = handleUserRouter(req, res)
  if (handUserData) {
    res.end(
      JSON.stringify(handUserData)
    )
    return
  }
  // 404
  res.writeHead(404, {
    "Content-type": "text/plain"
  })
  res.write("404 not found\n")
  res.end()
}

module.exports = serverhanDle

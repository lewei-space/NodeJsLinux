const handleBlogRouter = require('./routes/blog')
const handleUserRouter = require('./routes/user')
const QueryString = require('querystring')

// 处理 postData
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    // 没有数据的时候
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverhanDle = (req, res) => {
  // 获取path
  req.path = req.url.split('?')[0]
  // 设置返回格式
  res.setHeader('content-type', 'application/json')
  // 解析 query
  req.query = QueryString.parse(req.url.split('?')[1])
  // 处理postdata
  getPostData(req).then(postData => {
    req.body = postData

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理用户路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }


    // 404
    res.writeHead(404, {
      "Content-type": "text/plain"
    })

    res.write("404 not found\n")
    res.end()
  })
}

module.exports = serverhanDle

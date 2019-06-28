const handleBlogRouter = require('./routes/blog')
const handleUserRouter = require('./routes/user')
const QueryString = require('querystring')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  // console.log(d.toGMTString())
  return d.toGMTString()
}

const SESSION_DATA={}

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

  //解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val
  })

  console.log(req.cookie)

  // 解析session
  let needSetCookie=false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie=true
    userId=`${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]


  // 处理postdata
  getPostData(req).then(postData => {
    req.body = postData

    // 处理blog路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {

      if (needSetCookie){
        res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
      }

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
      if (needSetCookie){
        res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
      }
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

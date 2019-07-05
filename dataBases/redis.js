const redis = require('redis')

const {RADIS_CONFIG} = require('./db')

//创建客户端
const redisClient = redis.createClient(RADIS_CONFIG)
redisClient.on('error', err => {
  console.log(err)
})

// 设置session
function setSession(key, val) {

  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }

  redisClient.set(key, val, redis.print)
}

//获取session
function getSession(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      // 传过来的值是错误的值
      if (err) {
        reject(err)
        return
      }

      // 传过来空值的时候
      if (val == null) {
        resolve(null)
        return
      }

      // 为了返回JSON格式的数据
      try {
        resolve(JSON.parse(val))
      }
      catch (e) {
        resolve(val)
      }
    })
  })
  return promise
}


module.exports = {
  setSession, getSession
}

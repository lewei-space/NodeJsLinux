const crypto = require('crypto')

// 密匙
const SECURITY = 'wjiol_8779#'

//MD5加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECURITY}`
  return md5(str)
}

// 导出函数
module.exports = {
  genPassword
}

class BaseModel {
  constructor(data, message) {
    // data 对象 message 字符串 兼容两者
    if (typeof data === 'string') {
      // 解决只接受字符串的时候
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SucceccModel extends BaseModel {
  // super 继承父类
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 1
  }
}

module.exports = {
  SucceccModel,
  ErrorModel
}

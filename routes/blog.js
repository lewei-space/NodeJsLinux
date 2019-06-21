const {getList, getDetail} = require('../controller/blog')
const {SucceccModel, ErrorModel} = require('../model/resModule')

const handBlogRouter = (req, res) => {
  const method = req.method

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyWord = req.query.keyWord || ''
    const listData = getList(author, keyWord)

    return new SucceccModel(listData)

  }


  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id || ''
    const detailData = getDetail(id)

    return new SucceccModel(detailData)

  }
  // 新建一偏博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是一偏博客'
    }
  }
}

module.exports = handBlogRouter


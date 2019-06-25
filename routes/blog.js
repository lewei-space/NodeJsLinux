const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')



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

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body
    const data = newBlog(blogData)
    return new SucceccModel(data)
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(req.id, req.body)
    if (result) {
      return new SucceccModel('更新成功')
    } else {
      return new ErrorModel('更新失败')
    }
  }
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    console.log('reqBody'+req.body)
    const result = deleteBlog(req.id, req.body)
    if (result) {
      return new SucceccModel('删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  }
}

module.exports = handBlogRouter


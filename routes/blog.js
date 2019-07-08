const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')

const {SucceccModel, ErrorModel} = require('../model/resModule')

// 统一登陆验证

const loginInCheck=(req)=>{
  console.log('req.session.username'+JSON.stringify(req.session))
  if (!req.session.username){
    return Promise.resolve(
      new ErrorModel('尚未登陆')
    )
  }
}

const handBlogRouter = (req, res) => {
  const method = req.method

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {

    const loginCheckResult=loginInCheck(req)
    if (loginCheckResult){
      // 未登陆
      return loginInCheck
    }

    const author = req.query.author || ''
    const keyWord = req.query.keyWord || ''
    const result = getList(author, keyWord)
    return result.then(listData => {
      return new SucceccModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {

    const loginCheckResult=loginInCheck(req)
    if (loginCheckResult){
      // 未登陆
      return loginInCheck
    }

    const id = req.query.id || ''
    const result = getDetail(id)
    return result.then(detailData => {
      return new SucceccModel(detailData)
    })
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {

    const loginCheckResult=loginInCheck(req)

    if (loginCheckResult){
      // 未登陆
      return loginInCheck
    }

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SucceccModel(data)
    })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {

    const loginCheckResult=loginInCheck(req)
    if (loginCheckResult){
      // 未登陆
      return loginInCheck
    }

    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
      if (val) {
        return new SucceccModel('更新成功')
      } else {
        return new ErrorModel('更新失败')
      }
    })

  }

  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {

    const loginCheckResult=loginInCheck(req)
    if (loginCheckResult){
      // 未登陆
      return loginInCheck
    }

    const author=req.session.username
    const result = deleteBlog(req.query.id, author)
     return result.then(val=>{
      if (val) {
        return new SucceccModel('删除成功')
      } else {
        return new ErrorModel('删除失败')
      }
    })

  }
}

module.exports = handBlogRouter


const handBlogRouter = (req, res) => {
  const method = req.method

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: '这是博客列表'
    }
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '这是博客详情'
    }
  }
  // 新建一偏博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是一偏博客'
    }
  }
}

module.exports=handBlogRouter


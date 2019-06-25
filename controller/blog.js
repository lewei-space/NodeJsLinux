const mysqlExec =require('../dataBases/mysql')

const getList = (author, keyWord) => {
  // 数据 假数据
  return [
    {
      id: 1,
      title: 'biaoti1',
      content: 'content1',
      createTime: '2018-09-20',
      author: 'lele1'
    },
    {
      id: 2,
      title: 'biaoti2',
      content: 'content2',
      createTime: '2018-09-20',
      author: 'lele2'
    },
    {
      id: 3,
      title: 'biaoti3',
      content: 'content1',
      createTime: '2018-09-20',
      author: 'lele3'
    },
    {
      id: 4,
      title: 'biaoti4',
      content: 'content4',
      createTime: '2018-09-20',
      author: 'lele1'
    }
  ]
}

const getDetail = (id) => {
  return [
    {
      id: 5,
      title: 'biaoti4',
      content: 'content4',
      createTime: '2018-09-20',
      author: 'lele1'
    }
  ]
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性
  console.log(blogData)
  return {
    id: 3 //新建插入到博客里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 博客id
  // blogData 是一个博客对象，包含title和blogdata
  console.log(id, blogData)
  return true
}

const deleteBlog = (id) => {
  // id 博客id
  // blogData 是一个博客对象，包含title 和 blogdata
  console.log('id'+id)
  return {id}
}

module.exports = {
  getList, getDetail,
  newBlog, updateBlog,
  deleteBlog
}

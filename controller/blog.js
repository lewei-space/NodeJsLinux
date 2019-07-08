const xss = require('xss')

const {mysqlExec} = require('../dataBases/mysql')

const getList = (author, keyWord) => {
  // 1=1 永远成立 它的意义在于 解决防止他两个（author、keyword）
  //  没有值的时候报错

  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyWord) {
    sql += `and title like '%${keyWord}%' `
  }

  sql += `order by createtime desc ; `
  console.log('sql' + sql)

  // 返回的是一个promise
  return mysqlExec(sql)
}

const getDetail = (id) => {

  const sql = `select * from blogs where id='${id}' `

  return mysqlExec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {

  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = xss(blogData.author)
  const createtime = xss(blogData.createtime)

  const sql = `
  insert into blogs (title,content,author,createtime) 
  values('${title}','${content}','${author}',${createtime}); `

  // blogData 是一个博客对象，包含title content 属性
  console.log(blogData)
  return mysqlExec(sql).then(insertData => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {

  const title = blogData.title
  const content = blogData.content
  const sql = `update blogs set title='${title}' , content='${content}' where id='${id}';`

  return mysqlExec(sql).then(updateData => {
    console.log(updateData)
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })

}

const deleteBlog = (id, author) => {
  // 加上author 保证删除的安全
  const sql = `delete from blogs where id='${id}' and author='${author}'; `
  return mysqlExec(sql).then(deleteData => {

      if (deleteData.affectedRows > 0) {
        return true
      }
      return false
    }
  )
}

module.exports = {
  getList, getDetail,
  newBlog, updateBlog,
  deleteBlog
}

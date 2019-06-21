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
      id: 4,
      title: 'biaoti4',
      content: 'content4',
      createTime: '2018-09-20',
      author: 'lele1'
    }
  ]

}

module.exports = {
  getList, getDetail
}

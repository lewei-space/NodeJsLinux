const fs = require('fs')
const path = require('path')

const readline=require('readline')

// 文件名字
const fileName=path.join(__dirname,'../','logs','access.log')

// 创建read stream

 const readStream=fs.createReadStream(fileName)

//创建readline对象

const rl=readline.createInterface({
  input:readStream
})

let chromeNum=0;
let num=0;

// 顺序读取

rl.on('line',(lineData)=>{
  if (!lineData){
    return
  }
  // 记录总行书
  num++

  const  arr=lineData.split('--')
  if (arr[2]&&arr[2].indexOf('Chrome')>0){
    //勒紧chrome数量
    chromeNum++
  }
})

//监听读取完毕
rl.on('close',()=>{
  console.log('chrome占比：'+chromeNum)
})

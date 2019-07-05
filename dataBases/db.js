const env = process.env.NODE_ENV // process 就是环境进程 在进程里面得到环境

let DATABASE_CONFIG
let RADIS_CONFIG
if (env === 'dev') {
  //mysql
  DATABASE_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'Llw07205...',
    port: '3306',
    database: 'myblog'
  }

  //redis
  RADIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  //mysql
  DATABASE_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'Llw07205...',
    port: '3306',
    database: 'myblog'
  }

  //redis
  RADIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  DATABASE_CONFIG, RADIS_CONFIG
}

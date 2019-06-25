const env = process.env.NODE_ENV // process 就是环境进程 在进程里面得到环境

let DATABASE_CONFIG

if (env === 'dev') {
  DATABASE_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'Llw07205...',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'prod') {
  DATABASE_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: 'Llw07205...',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  DATABASE_CONFIG
}

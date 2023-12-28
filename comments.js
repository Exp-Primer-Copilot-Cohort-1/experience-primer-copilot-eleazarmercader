// create web server
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()
// 3. 注册一个路由
app.get('/index', (req, res) => {
  // res.send('欢迎来到首页')
  // res.end('欢迎来到首页')
  res.send({
    name: 'zs',
    age: 20
  })
})
// 4. 启动服务器
app.listen(3000, () => {
  console.log('server running at http://
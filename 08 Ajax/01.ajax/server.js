/**
 * @description 主模块
 */

const express = require('express');
const cityRouter = require('./routers/city');
const app = express();

// 静态资源中间件
app.use(express.static('public'));
// 应用路由器
app.use(cityRouter);

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功：http://localhost:3000');
  else console.log(err);
});

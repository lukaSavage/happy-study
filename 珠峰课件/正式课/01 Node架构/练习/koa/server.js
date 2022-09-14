const Koa = require('koa');

const app = new Koa();


app.use(ctx => {
    console.log(ctx.req.query); // 原生的
    console.log(ctx.request.req.query); // 原生的，koa自己封装的request上是有req属性的
    console.log(ctx.request.query); // koa封装的
    console.log(ctx.query); // koa封装的
    ctx.body = '服务器返回响应啦~'
})




app.listen(3000, err => {
    console.log(err, '服务器启动成功！');
})

app.on('error', (err) => {
    console.log('夭寿啊------', err)
})
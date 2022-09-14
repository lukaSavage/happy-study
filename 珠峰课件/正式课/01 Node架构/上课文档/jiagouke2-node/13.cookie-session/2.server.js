const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const crypto = require('crypto'); // sha256(express)  sha1(koa)  比md5 多个盐值 
const app = new Koa();

const secret = 'zfsecret'
app.keys = [secret]; // 提供cookie用于签名的秘钥
const router = new Router();
router.get('/write', async function(ctx) {
    ctx.cookies.set('name', 'zf', {
        domain: '.zf.cn',
        httpOnly: true,
    })
    ctx.cookies.set('age', '12', { signed: true })
    // 我们需要给cookie 加盐
    ctx.body = 'write ok';
})
router.get('/read', async function(ctx) {
    ctx.body = ctx.cookies.get('age',{signed:true}) || 'empty' // name=zf; age=12
})
app.use(router.routes()).use(router.allowedMethods()); // 405

app.listen(3000, function() {
    console.log(`server start 3000`)
})
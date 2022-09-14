const Koa = require('koa');
const Router = require('@koa/router');
const querystring = require('querystring');
const crypto = require('crypto'); // sha256(express)  sha1(koa)  比md5 多个盐值 
const app = new Koa();

const secret = 'zfsecret'

const toBase64URL = (str)=>{
    return str.replace(/\=/g,'').replace(/\+/g,'-').replace(/\//,'_');
}

// cookie的签名只是防止用户去篡改数据，如果用户篡改过了，我就丢弃掉，并不是为了安全
app.use(async (ctx, next) => {
    const cookies = [];
    ctx.my = {
        set(key, value, options = {}) {
            let optsArr = [];
            if (options.domain) {
                optsArr.push(`domain=${options.domain}`)
            }
            if (options.httpOnly) {
                optsArr.push(`httpOnly=${options.httpOnly}`)
            }
            if (options.maxAge) {
                optsArr.push(`max-age=${options.maxAge}`)
            }
            if (options.signed) { // 说明 为了安全 需要给数据签名
                // base64 在传输的时候 会 把 + / = 做特殊处理
                let sign = toBase64URL(crypto.createHmac('sha1',secret).update([key, value].join('=')).digest('base64'));
                cookies.push(`agesign=${sign}`)
            }
            cookies.push(`${key}=${value}; ${optsArr.join('; ')}`)
            ctx.res.setHeader('Set-Cookie', cookies);
        },
        get(key,options) {
            let cookieObj = querystring.parse(ctx.req.headers['cookie'], '; '); // a=1; b=2 {a:1,b:2}
            if(options.signed){
                // 上一次的签名 
                if(cookieObj[`${key}sign`]  == toBase64URL(crypto.createHmac('sha1',secret).update(`${key}=${cookieObj[key]}`).digest('base64'))){
                    return cookieObj[key]
                }else{
                    return 'error';
                }
            }
            return cookieObj[key] || '';
        }
    }
    return next()
})
const router = new Router();
// (为什么用cdn， cdn是一个特殊域名，不会发送cookie)
// document.cookie
// key cookie的key
// value cookie的值
// domain 域名
// path 路径
// exipres/max-age存活时间
// httpOnly
// xsrf 诱导用户点击一个图片，发请求通过url把你本地cookie传递给他自己的服务器 document.cookie
router.get('/write', async function(ctx) {
    // ctx.res.setHeader('Set-Cookie', ['name=zf', 'age=12; domain=.zf.cn; httpOnly=true']);
    ctx.my.set('name', 'zf', {
        domain: '.zf.cn',
        httpOnly: true,
    })
    ctx.my.set('age', '12', { signed: true })

    // 我们需要给cookie 加盐
    ctx.body = 'write ok';
})
router.get('/read', async function(ctx) {
    ctx.body = ctx.my.get('age',{signed:true}) // name=zf; age=12
})
app.use(router.routes()).use(router.allowedMethods()); // 405

app.listen(3000, function() {
    console.log(`server start 3000`)
})
const moduleRegexp = /^\/@modules\//;
const {resolveVue} = require('./utils');
const fs = require('fs').promises;
//在此中间件我们要能够正确返回vue模块的内容
function moduleResolvePlugin({projectRoot,app}){
  app.use(async (ctx,next)=>{
    //vueResolved是对象 key模块名，值此模块的真实的绝对路径
    const vueResolved = resolveVue(projectRoot);
    //如果当前的请求路径不是我们改写后的模路径
    if(!moduleRegexp.test(ctx.path)){
        return await next();
    }
    const id = ctx.path.replace(moduleRegexp,'');// 把 /@modules/vue替换成vue
    ctx.type  = 'js';//响应的内容类型是 application/javascript
    //读取真正的模块内容直接返回给浏览器了
    const content = await fs.readFile(vueResolved[id],'utf8');
    //把模块内容返回给响应体，就结束响应了
    ctx.body = content;
  });
}
exports.moduleResolvePlugin = moduleResolvePlugin;
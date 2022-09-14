const Koa = require('koa');
const {serveStaticPlugin} = require('./serverPluginServeStatic');
const {moduleRewritePlugin} = require('./serverPluginModuleRewrite');
const {moduleResolvePlugin} = require('./serverPluginModuleResolve');
const {injectProcessPlugin} = require('./serverPluginInjectProcess');
const {vuePlugin} = require('./serverPluginVue');
/**
 * 1.实现一个http服务器，并客户端访问index.html能返回index.html
 * 当访问/src/main.js的时候，返回main.js的内容
 */
function createServer(){debugger
    const app = new Koa();//koa的实例
    const projectRoot = process.cwd();//当前的工作路径 current working directory
    console.log('projectRoot',projectRoot);
    const context = {app,projectRoot};
    app.use((ctx,next)=>{
        Object.assign(ctx,context);//把context上的app和projectRoot属性赋给ctx
        return next();
    });
    //KOA中是所谓洋葱模型 是有顺序的
    const resovledPlugins = [
        injectProcessPlugin,
        moduleRewritePlugin,
        moduleResolvePlugin,
        vuePlugin,
        serveStaticPlugin
    ];
    resovledPlugins.forEach(plugin=>plugin(context));
    return app;
}
createServer().listen(8080,()=>{
    console.log('vite服务器已经在8080端口启动');
});

/**
 * 3001是原版的vite
 * 8080是自己实现的
 */
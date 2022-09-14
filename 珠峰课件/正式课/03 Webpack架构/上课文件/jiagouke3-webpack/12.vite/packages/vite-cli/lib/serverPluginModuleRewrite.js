
let {readBody} = require('./utils');
let MagicString = require('magic-string');
let {parse} = require('es-module-lexer');
async function rewriteImports(content){
    var magicString = new MagicString(content);
    let imports = await parse(content);
    if(imports && imports.length>0){
        for(let i=0;i<imports[0].length;i++){
            const {n,s,e} = imports[0][i];
            //如果开头既不是/也不是.的话才会需要替换
            if(/^[^\/\.]/.test(n)){
                const rewriteModuleId = `/@modules/${n}`;
                magicString.overwrite(s,e,rewriteModuleId);
            }
        }
    }
    return magicString.toString();
}
function moduleRewritePlugin({projectRoot,app}){
    app.use(async (ctx,next)=>{
        await next();//一上来就next了 next之前神马都没有
        //如果有响应体，并且此响应体的内容类型是js  mime-type=application/javascript
        if(ctx.body && ctx.response.is('js')){
            const content = await readBody(ctx.body);
            console.log('ctx.path',ctx.path);//自己这个文件的路径
            const result = await rewriteImports(content);
            ctx.body = result;
        }

    });
}
exports.moduleRewritePlugin = moduleRewritePlugin;
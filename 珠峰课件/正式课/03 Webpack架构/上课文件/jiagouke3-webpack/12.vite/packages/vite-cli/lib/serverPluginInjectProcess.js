const { readBody } = require("./utils");
function injectProcessPlugin({projectRoot,app}){
    const injection = `
    <script>
        window.process = {env:{NODE_ENV:'development'}};
    </script>
    `;
    app.use(async (ctx,next)=>{
        await next();
        if(ctx.response.is('html')){
            const html = await readBody(ctx.body);
            ctx.body = html.replace(/<head>/,`$&${injection}`);
        }
    });
}
exports.injectProcessPlugin = injectProcessPlugin;

const fs = require('fs').promises;
const path = require('path');
const defaultExportRegexp = /export default/;
function vuePlugin({ projectRoot, app }) {
  app.use(async (ctx, next) => {
    if (!ctx.path.endsWith('.vue')) {
      return await next();
    }
    const filePath = path.join(projectRoot,ctx.path);
    const content =await fs.readFile(filePath,'utf8');
    const {parse,compileTemplate} = require('@vue/compiler-sfc');
    const {descriptor} = parse(content);
    let targetCode = ``;
    if(descriptor.script){
      let scriptContent = descriptor.script.content;
      scriptContent=scriptContent.replace(defaultExportRegexp,'const _sfc_main=');
      targetCode+=scriptContent;
    }
    if(descriptor.template){
      let templateContent = descriptor.template.content;
      const {code} = compileTemplate({source:templateContent});
      targetCode+=code;
    }
    targetCode+= `\n_sfc_main.render=render`;
    targetCode+= `\nexport default _sfc_main`;
    ctx.type = 'js';
    ctx.body = targetCode;
  });
}
exports.vuePlugin = vuePlugin;
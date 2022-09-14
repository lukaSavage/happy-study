let appVue = `
<template>
 <h1>App</h1>
</template>
<script>
export default {
    name:'App'
}
</script>
`;
const defaultExportRegexp = /export default/;
const { parse, compileTemplate } = require('@vue/compiler-sfc');
let { descriptor } = parse(appVue);
let targetCode = ``;
if (descriptor.script) {
    let scriptContent = descriptor.script.content;
    scriptContent = scriptContent.replace(defaultExportRegexp, 'const _sfc_main=');
    targetCode += scriptContent;
}
if (descriptor.template) {
    let templateContent = descriptor.template.content;
    const { code } = compileTemplate({ source: templateContent });
    targetCode += code;
    targetCode += `\n_sfc_main.render=render`;
    targetCode += `\nexport default _sfc_main`;
}

console.log(targetCode);

/**
const _sfc_main= {
    name:'App'
}
import { openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("h1", null, "App"))
}
_sfc_main.render=render
export default _sfc_main
 */
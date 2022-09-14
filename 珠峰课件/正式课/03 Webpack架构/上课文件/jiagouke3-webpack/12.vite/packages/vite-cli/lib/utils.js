const { Readable } = require('stream');
const Module = require('module')
async function readBody(stream) {
    if(stream instanceof Readable){
        return new Promise((resolve) => {
            let buffers = [];
            //当我们从流中读取到数据后
            stream
            .on('data',chunk=>buffers.push(chunk))
            .on('end',()=>resolve(Buffer.concat(buffers).toString('utf8')))
        });
    }else{
        return Promise.resolve(stream.toString('utf8'));
    }
}
exports.readBody = readBody;

function resolveVue(projectRoot){
    let require = Module.createRequire(projectRoot);
    const resolvePath = (moduleName)=>require.resolve(`@vue/${moduleName}/dist/${moduleName}.esm-bundler.js`);
    return {
        '@vue/shared':resolvePath('shared'),
        '@vue/reactivity':resolvePath('reactivity'),
        '@vue/runtime-core':resolvePath('runtime-core'),
        'vue':resolvePath('runtime-dom'),
    }
}
exports.resolveVue = resolveVue;
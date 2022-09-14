let core = require('@babel/core');
const { getOptions } = require("loader-utils");
function loader(source,inputSourceMap,inputast){
    //loader 中的this 代表的谁 loaderContext//
    //后面会手定loader-runner
    //callback是this上的内置方法
    //callback从哪来的￼
    //个 return code 和 callback 什么区别啊￼
    //return只能返回一个值，callback可以返回多值，还支持异步
    //webpack 里就是 loader-runner 吗￼
    let options = getOptions(this)||{};
    options = {
        presets:['@babel/preset-env'],
        inputSourceMap,
        sourceMaps:true,//生成sourcemap
        filename:this.resourcePath,
        ...options
    }
    let {code,map,ast} = core.transform(source,options);
    //return code;//如果返回的是一值
    //如果返回的是多个值
    return this.callback(null,code,map,ast);
}

module.exports = loader
/**
 * devtool 
 * source-map 包含loader的sourcemap
 * index.js 可能会经过好几个loader的处理，每个loader都有可能进行编译代码
 * 0 =>loader 1 +1   =>loader2 2 +1
 */
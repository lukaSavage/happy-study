const loaderUtils = require("loader-utils");
function loader(source){
    console.log(this.data);
   /*  let script = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
        module.exports = "";
    `;
    return script; */
}
loader.pitch = function(remainingRequest,previousRequest,data){
    data.age = 100;
    console.log('remainingRequest',remainingRequest);
    console.log('previousRequest',previousRequest);
    /**
     * remainingRequest  less-loader.js!index.less
     * !! 表示只要行内，不要pre post normal
     * 执行的时候先读取index.less内容，然后把内容给less-loader.js，获得到模块的导出对象module.exports
     * loader-runner执行了几次?
     */
    let script = `
        debugger
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(this,"!!"+remainingRequest)});
        document.head.appendChild(style);
        module.exports = "";
    `;
    return script;
}
module.exports = loader;
/**
 * import './index.less'
index.js './index.less'
style-loader less-loader index.less
开执行loaderrunner

style-loader有pitch方法，并且pitch方法有返回值，后面的loader不走了，文件也不读了
直接 把返回值给webpack了，第一轮的loaderrunner就结束了

然后webpack拿 到代码后会进行AST解析，找出里面的require
发现了一个依赖
然后又要编译 一次模块
又走一次loader-runner
less-loader.js!index.less
先读index.less源文件
然后结果给less-loader.js的normal
会回JS脚本，JS脚本会导出一个CSS字符串

那么第二轮loaderrunner还是走 style-loader 和 less-loader 么￼
如果你加了!!不走了


如果我想在我的源代码里写上 log(name)，
编译后变成 console.log('name', name)，
我是需要在 babel-loader 之前再加个自己的 loader，自己的 loader 通过正则把这个转换掉吗￼
可以的

 */
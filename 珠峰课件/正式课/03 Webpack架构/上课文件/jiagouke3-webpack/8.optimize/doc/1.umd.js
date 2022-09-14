(function webpackUniversalModuleDefinition(root, factory) {
    //说明当是在处于commonjs2的规范
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    //说明当前处于amd的运行环境    
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    //说明当前处于commonjs运行环境    
    else if (typeof exports === 'object')
        exports["calculator"] = factory();
    else
    //全局变量
        root["calculator"] = factory();
})(window, function () {
        return {add,minus};
});
//amd require.js的模块化规范 现在已经 废弃了
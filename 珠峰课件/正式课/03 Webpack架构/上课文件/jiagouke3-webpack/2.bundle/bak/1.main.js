//模块定义
var modules = ({
  //key 模块ID=此模块相对于项目根目录的相对路径 
  //值是一个函数定义 其实就是一个commonjs风格的函数 module exports
  "./src/title.js":
    ((module,exports,require) => {
      module.exports = 'title';
    })
});
//模块的缓存
var cache = {};
//加载一个模块，并且返回模块的导出结果，并且把结果 放到缓存中，下次加载就直接取缓存结果就可以了
function require(moduleId) {
  var cachedModule = cache[moduleId];//获取缓存的模块
  if (cachedModule !== undefined) {
    return cachedModule.exports;//缓存里有，直接返回
  }
  var module = cache[moduleId] = {
    exports: {}
  };
  modules[moduleId](module, module.exports, require);
  return module.exports;
}
debugger
let title = require("./src/title.js");
console.log(title);

//1.webpack打包后的文件长什么样子?
//2.打包后代码里模块是如何定义的？如何加载的？
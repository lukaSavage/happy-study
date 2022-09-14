const path  = require('path');
const rollup = require('./lib/rollup');
//获取入口文件的绝对路径
//let entry = path.resolve(__dirname,'src/main.js');
//执行打包，并且把打包后的结果写入bundle.js中
debugger
rollup('./src/main.js','bundle.js');
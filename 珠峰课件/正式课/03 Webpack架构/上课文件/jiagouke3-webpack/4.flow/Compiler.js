let { SyncHook } = require("tapable");
let fs = require("fs");
let path = require("path");
let Complication = require("./Complication");
/**
 * Compiler就是编译大管家
 * 负责整个编译过程，里面保存整个编译所有的信息
 */
class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(), //会在开始编译的时候触发
      done: new SyncHook(), //会在结束编译的时候触发
    };
  }
  //4.执行Compiler对象的run方法开始执行编译
  run(callback) {
    this.hooks.run.call();
    //5.根据配置中的entry找出入口文件
    this.compile((err, stats) => {
      //10在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
      for(let filename in stats.assets){
        let filePath = path.join(this.options.output.path,filename);
        fs.writeFileSync(filePath,stats.assets[filename],'utf8');
      }
      callback(err, {
        toJson:()=>stats
      });
    });
    this.hooks.done.call();
    //获取每个入口文件，当入口文件发生变化的时候，执行新的编译
    //["./src/entry1.js","./src/entry2.js"]
    /* Object.values(this.options.entry).forEach((entry) => {
      fs.watchFile(entry, () => this.compile(callback));
    }); */
    //其实应该是监听当前目录下面的所有的文件/ watch:true, watchOptions:{ignorePattens:/node_modules/}
   /*  if(this.options.watch){
        fs.watchFile('.', () => this.compile(callback));
    } */
    
   
  }
  compile(callback) {
    //每次编译都会创建一个新的Compilcation
    let complication = new Complication(this.options);
    complication.build(callback);
  }
}
module.exports = Compiler;


class DonePlugin{
  constructor(options){
    this.options = options;
  }
  apply(compiler){
      //同步
    compiler.hooks.done.tap('DonePlugin',(stats)=>{
        console.log('DonePlugin');
    });
    //异步
   /*  compiler.hooks.done.tapAsync('DonePlugin',(stats,callback)=>{
        console.log(stats);
        callback();
    });
    //promise
    compiler.hooks.done.tapPromise('DonePlugin',(stats)=>{
        return new Promise((resolve)=>{
            console.log(stats);
            resolve();
        })
    }); */
  }
}
module.exports = DonePlugin;
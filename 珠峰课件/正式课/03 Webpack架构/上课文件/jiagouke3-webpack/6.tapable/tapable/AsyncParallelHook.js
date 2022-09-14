
const Hook = require('./Hook');
//创建函数的代码工具，动态创建函数的
const HookCodeFactory = require('./HookCodeFactory');
class AsyncParallelHookCodeFactory extends HookCodeFactory{
    content({onDone}){
       return this.callTapParallel({onDone});//以并行的方式调用tap函数
    }
}
const factory = new AsyncParallelHookCodeFactory();
class AsyncParallelHook extends Hook {
    compile(options) {
        factory.setup(this,options);//先把Hook实例和配置对象传进去
        return factory.create(options);//创建一个新的函数并返回
    }
}
module.exports = AsyncParallelHook;
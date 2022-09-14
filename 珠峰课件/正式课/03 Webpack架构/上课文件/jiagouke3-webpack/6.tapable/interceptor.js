let {SyncHook} = require('./tapable');
const syncHook = new SyncHook(['name','age']);
syncHook.intercept({
    register(tapInfo){//每当你添加一个新的事件函数就会触发
        console.log(`拦截器1 register`,tapInfo.name);
        return tapInfo;
    },
    tap(tapInfo){//每当一个事件函数执行了就会触发
        console.log(`拦截器1 tap`,tapInfo.name);
    },
    call(name,age){//每次调用call会触发一次
        console.log(`拦截器1 call`,name,age);
    }
});
syncHook.intercept({
    register(tapInfo){
        console.log(`拦截器2 register`,tapInfo.name);
        return tapInfo;
    },
    tap(tapInfo){
        console.log(`拦截器2 tap`,tapInfo.name);
    },
    call(name,age){
        console.log(`拦截器2 call`,name,age);
    }
});
syncHook.tap('事件函数A',(name,age)=>{
  console.log('事件函数A',name,age);
})
syncHook.tap('事件函数B',(name,age)=>{
    console.log('事件函数B',name,age);
})
debugger
syncHook.call('zhufeng',12);
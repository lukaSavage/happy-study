//UMI3源码里
let {SyncHook} = require('./tapable');
let hook = new SyncHook(["name"]);
hook.tap({name:'tap1'},(name)=>{
    console.log(1,name);
});
hook.tap({name:'tap3'},(name)=>{
    console.log(3,name);
});
hook.tap({name:'tap5'},(name)=>{
    console.log(5,name);
});
hook.tap({name:'tap2',before:['tap5']},(name)=>{
    console.log(2,name);
});
hook.call('zhufeng');
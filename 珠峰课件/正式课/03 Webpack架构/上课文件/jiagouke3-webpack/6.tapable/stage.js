//UMI3源码里
let {SyncHook} = require('tapable');
let hook = new SyncHook(["name"]);
hook.tap({name:'tap1',stage:1},(name)=>{
    console.log(1,name);
});
hook.tap({name:'tap3',stage:3},(name)=>{
    console.log(3,name);
});
hook.tap({name:'tap5',stage:5},(name)=>{
    console.log(5,name);
});
hook.tap({name:'tap2',stage:2},(name)=>{
    console.log(2,name);
});
hook.tap({name:'tap4'},(name)=>{
    console.log(4,name);
});
//按以前写法，是按注册的顺序顺序执行 4 1 2 3 5
hook.call('zhufeng');
//讲过多上脚手架 
//create-react-app 模板处理 子进程处理 依赖安装和启动
//vue-cli2.0  支持加载github gitee模板 动态渲染模板的功能
//@vue/ci4.0 插件 状态管理库 mobx redux  postcss stylus sass less router
//lerna 多仓库 对命令封装非常优雅
//create-vite 

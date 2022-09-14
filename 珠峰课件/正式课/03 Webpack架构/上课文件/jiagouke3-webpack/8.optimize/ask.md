20:12
嘻哈
moment day.js

是的。 我就是用 dayjs￼
Hedgehog
28行 注释 ？￼
daywang
不解析指的是 没有 import 和 require 的引用￼
不解析
不去分析 它依赖的其它模板

hiyongla
干掉还能用吗￼
梧桐
没打包 local ，用不会报错吗？￼
Hedgehog
如果moment用到中文语言包呢？￼
daywang
好像moment 不维护了￼



20:34
Mr楊
可以多种方式同时导出吗￼ umd
daywang
a-b￼
Mr楊
不用户多种方式可以使用的那种￼
daywang
通常直接设置umd就行了吧￼


commonjs  exports.calculator = exports;
commonjs2 module.exports.calculator = exports;



21:00
daywang
能直接清除css源文件么，不是打包后的￼
eslint pretter
if(true){

}

daywang
我们现在就是有个样式太大，但是不知道怎么删除没用的
21:13
daywang
类似 修改时间，文件内容 生成的hash￼
node 时间

hash 代表整个项目 整个项目 只要有任意一个文件发生变化，它就会变化
chunkhash 计算的是每个代码块 只要此代码块中的模块发生变化，它才会变化 
contentHash 计算是的生成文件内容，只要文件内容不变，它就不变
从下往 下计算的范围越来载小，值越来越稳定 ，计算的难度越来越大


21:17
daywang
是类似 fs 读取内容么￼
daywang
一个 chunk 的 chunkhash 是一样的￼
daywang
那都用 contentHash 就好了￼


1.没有导入
2.没有使用
3.如果计算的结果没有使用，也会被删除掉
4.代码永远不会到达 ，也会被干掉
5.代码中只写不读的变量也会被删除掉


代码分割的三种方式
1.根据entry入口点分割
2.动态导入


21:32
梧桐
tree shaking 只针对 js 文件吗？￼
daywang
怎么识别的 那个用到了那个没用到￼
AST语法树分析 

21:49
daywang
preload 插件原理也是 script 标签么￼

preload 告诉 浏览器，未来一定会用到某个资源，浏览器会提升优先级，尽快加载这个资源
prefetch 告诉浏览器未来可能会用到某个资源，浏览器不一定会加载这个资源
结论 如果资源很重要可以用preload 如果不是很重要可以用prefetch

preload要慎 用，可以会阻塞浏览器渲染。因为它优先
//https://github.com/vuejs/preload-webpack-plugin


"@babel/preset-env",{"modules":false} 老师这个不转成es5，那是不是就兼容性就不好啊￼
其实没有关系
因为虽然babel不帮助转译
但是webpack还是能转译的
最终还是es5


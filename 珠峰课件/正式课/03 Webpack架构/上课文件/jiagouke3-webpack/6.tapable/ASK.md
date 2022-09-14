
并行和串行是什么￼
21:43
daywang
这个主要用在plugin 中么￼
插件机制就是基于tapable来实现的
dl
那串行和同步不是一样么￼
类似
daywang
发布订阅￼



嘻哈
webpack 里的东西真多，也很复杂的￼
dl
loader 可以改变自己的源文件吗，比如执行 webpack，把 src/index.js 里的代码给改了￼


eslint --fix
debugger
写一个自动删除debugger laoder
console
自动删除


老师, 请教个问题, 就是我们的umi,dva项目, 在ie下直接报错,说语法不支持怎么回事儿? 怎么解决￼
我想着应该是编译没编译成IE认识的语法, 但是不知道怎么解决
类似中间件从上到下执行，￼
其实更像管道的



就是说里面各种的hook的逻辑，都是通过整理对应的逻辑，然后new Function来生成对应的逻辑函数去执行 是的
09:53
daywang
这为什么是来加载 短路执行



10:02
bjj
父类中createCall方法中的this.compile是直接调用的是子类的.compile的吗
是的
Hedgehog
从子类new出来的实例调用的就是子类的，￼
是的
10:11
张仁阳
https://img.zhufengpeixun.com/1608282448504￼
dl
这 tap 应该放到 SyncHook 把￼
tap
tapAsync
tapPromise
都是放Hook父类上的


调用都是hook调的￼


为什么要字符串配合 new Funcion,而不是直接写呢

function a(){
    xxx
}


webpack
这部分用不熟悉，所以写源码也没啥疑问￼
123
content 需要子类实现是为了 不同的子类不同的实现￼是的
liu
content得从函数列表中遍历生成吧 是的

Hedgehog
方便扩展，可以任意创建自己的逻辑hook￼
daywang
事先通过 tap，注册 name 和函数到栈中。然后call 的执行，取出 拼接 Function 执行￼
梧桐
提一下代码吧￼
张仁阳
看看有没有问题￼
怎么看它导出支持的是 cjs 还是 esm 啊￼
export import ESM
require module.exports cjs

11:30
liu
onDone 拼接不用加（）括号了￼



11:52
daywang
都是以堆栈形式存储￼
12:01
daywang
字符串拼接好处就是可以动态改￼



14:15
紫珏
二分查找插入吗？￼不是
插入排序类似
daywang
我想的是先收集再排序在输出。。。￼

14:22
艾瑞
这里存的时候能不能直接存到对应的位置￼
14:28
123
if elseif  这种代码没有闭合  ￼
liu
before优先级比statge高是吧???

通用的规则 
你有几个规则
判断谁的优先级高应该如何判断？


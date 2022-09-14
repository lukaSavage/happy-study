keyedHookMap.for('key1').tap('xxxx',(name)=>{console.log(1,name);});   

这个key1 在插件里面表示什么呢？  标识我们的key1 能拿到好几个注册的插件￼

给hook起了个名字
hook我理解的就是 钩子 map格式的钩子存放了好多tap 注册的事件￼
不是这样的
map= {

    key:value
    字符串:钩子hook
}

钩子hook.tap 放置很多事件函数


我们大都配置webpa?ck是导出对象的时候用的多还是导出函数的时候用的多啊￼

如果需要拿到env参数就可以导出函数，如果不需要参数就导出对象



vue.config.js 里的链式调用 webpack 是 webpack 本来就有的还是 vue 封装的啊￼
vue基于webpack扩展的
daywang
compiler 有一个，compilation 有多个￼
Mr楊
done是内置的完成的钩子吗￼
daywang
tap(name)  name一定是插件的类名是么￼



15:04
daywang
apply 是每次webpack 重新执行会执行一次的方法￼
apply只会在初始化的执行一次，以后每次编译不会再执行了
Mr楊
tap是固定的事件吗, 它是干啥用的啊?￼
tap类似于eventemitter on
上用来注册事件回调
tap  
button.onclick 
button.tap
button.addEventlistener();
daywang
tap 是 tapable 的￼
tap是hook钩子的注册事件的方法



123
就一个资源index￼
daywang
chunk entry的key _拼接吧￼
@
早上讲的￼

main.js￼
daywang
为什么不是 main_js￼

懒加载的的时候代码的名字是这样来的
import('模块名')
会自动分割出去一个代码块
模块ID ./src/index.js
代码块名src_index_js

main main.js
src_title_js src_title_js.js

艾瑞
output filename默认就是main.js [name].js
daywang
记得 有个 用下划线拼接  代码块的名￼
紫珏
你说的那个是异步加载的时候，jsonp￼
15:17
daywang
entry里面自己写的就是正常的。来加载的是拼接的￼



不是要打包成一个吗￼
daywang
操作的是代码块的代码是吧￼
添加到压缩包里的是本次编译 产出的文件

老师 assets key文件是entry注册的吧。代码内容只对应的代码块所有的代码￼


1.我手工操作比较麻烦 
2.手工引入CDN脚本
3.不管到后项目中有没有用jquery.都得引


16:07
daywang
javascript/auto 是固定的么￼
js文件 类型是javascript/auto
16:12
123
31行的source呢￼
daywang
下面两个是 可能 import 也可能是 require 引入的￼

callbac（null,第二个参数）￼
123
第二个参数是undefined￼

callback();


16:21
Hedgehog
要吃透了才写得出吧[表情]￼
不需要吃透源码 1不需要也不可能

daywang
需要业务驱动￼
有实际需求，才去看对应的源码。改造

vue react webpack


代码内容？js￼
daywang
script虚拟节点￼
16:38
123
reflect.ownKeys === Object.keys
daywang
hooks.comilation  和 参数传的 compilation 是一样的么￼
123
变量名是小写 为啥这里是大写￼
123
赋值的时候这接用变量名大写￼

tap 的第一个参数作用是什么￼ 没有用

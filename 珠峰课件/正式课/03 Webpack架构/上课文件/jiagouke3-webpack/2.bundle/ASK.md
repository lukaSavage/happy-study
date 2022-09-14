

其实我们的webpack不但可以打包项目，还可以打包库
lodash



21:13
了weback
和vite啥区别￼
lukaSavage
dll￼
daywang
类似引用 cdn ，可以直接 new Vue

daywang
window.Vue￼
21:18
daywang
import  export 最后要转成 require￼ 
是的
commonjs es module最后都要转成require commonjs
21:28
666
require函数还可以有其他属性方法？￼
可以
require就是一个函数，也是一个普通的JS对象，所以可以有任意的属性和方法



这样的话我在index.js里面延迟1秒能不能拿到最新title的age￼
daywang
兼容性的本质就行转成 浏览器识别的 require￼
转成能在浏览器里面执行的，webpack自己实现的require polyfill

Hedgehog
终于明白require 图片 modules时，要加个default获取了￼


图片
css-loader
都可以包装成es module
所以以说要想取值，必须以exports.default


title里面延迟1秒给age赋值， index.js里面延迟2秒能不能拿到age最新的值￼

这个问题好
commonjs导出
export导出本质差异

能取到



一个拷贝一个引用￼
lukaSavage
es6是值的引用￼
daywang
不能￼
lukaSavage
es6和commonJs的区别----经常考~￼
嘻哈
不能￼
艾瑞
esmodule理论上是不能的￼
@
不能￼
小哈
不能￼
艾瑞
但是转成commonjs了￼



CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

不能￼
艾瑞
exports.age是取不到的￼
艾瑞
所以webpack为什么需要转成使用get来取值￼
嘻哈
1￼
daywang！拷贝是改值了互不影响。引用是改值了互相影响￼ 对


编译时 先于 运行时么？￼
先编译 再运行
daywang
执行时机￼
艾瑞
还有tree-shaking 的时候怎么处理， export default {a,b}，这种情况就不能 tree-shaking了吗￼
export default a
export {
    a,b
}



何先生
也不是浅拷贝￼
就是一个赋值

let a = {age:1};
let b = a;
//赋值 基本类型的话直接拷贝值  引用类型的话拷贝引用地址
Hedgehog
就赋值￼
22:04
wutong
ok￼

嘻哈
老师上次视频上传了吗￼
dl
之前没有 ,n 的时候，.r 没用吧￼


之前 ~@ 的路径别名，在 vue 的 <template> 里有个 <img src="~@/img.png"/> ，这样可以解析么￼￼
在 css 里 @ 和 ~@ 是一样的么，来的比较晚没听到

以老版本里~@，现在新版里~可以不加了@



之前一直加班，没时间上课，想问老师一个问题，style-loader为什么不直接将css代码引入，而是采用pitch搞出一个require，再走一轮run-loader进入加载一次这种方式呢？




页面可以直接用么 import￼



- require.e 加载一个额外的代码块 require.ensure 保证/加载
- require.f.j   require.f.jsonp 使用JSONP加载额外的代码
- require.l  require.load 加载JSON脚本

chunkid 就是模块id么￼
daywang
一个文件是一个模块？￼


在webpack里一切皆模块，每一个文件都是一个模块 js css ts jpg png
相互依赖的模块组合在一起就是一个代码块chunk

默认情况来说 一个入口会对应或者说生成一个代码块

有些时候 代码可以合并和分割
分割。
import

webpack如何实现懒加载 异步加载
讲哪了￼
daywang
import 赖加载￼
Je
谢谢￼
20:29
dl
runtime 的判断是什么￼



这里的import 跟 ， export 然后 import 的不是一个 import 吧
不一样

模块里的import  是导入模块的意思 关键字
import只是一个普通的方法名或者说函数名

异步加载的基本流程
- 1.点击按钮
- 2.加载包含额外代码块的模块定义的JS文件
- 3.JS文件加载回来后JS脚本会执行
- 4.把新的模块定义合并到老的模块定义上
- 5.走正常的加载逻辑了，加载新的模块，让 Promise resolve,然后走then


aywang
jsonp￼
W
jsonp是懒加载的理论基础吗￼
20:42
daywang
chunk 指的是代码块么￼

main.js定义的require.r .d 方法, src_video_js.main.js 模块可以直接用????


21:08
liu
56行push等于是做什么￼
666
最后两个。then没听懂￼
今天你学习了么
先jsop请求拿到模块定义合并模块定义返回module.exports￼




60行为什么要合并到老的上面，不合并会有什么影响？￼
因为require加载的时候 ，模块定义就只能从老的上面取，只有放进去才能取出来
Hedgehog
为啥是放 [resolve, reject, 自己] ￼
5k
我能吸收到啥思想？￼
W
懒加载思想￼
666
数组￼
今天你学习了么
undifined￼
dl
promises 的结果数组？￼
今天你学习了么
反正第一次then主要是为模块定义服务的￼

e是为了得到模块定义
第一次then的回调是为了去加载模块数据
把模块的数据返回了
第二次then参数就是模块的数据module。exports
今天你学习了么
第二次then才返回module。exports￼


不明白为啥要这样写，是因为webpack要求这样的格式吗？￼
今天你学习了么
all方法是返回数组里面放的每一个成功的返回值￼ 是的



pitch 也是loader 中的么￼


20:14
daywang
老师 行内为什么不写在 config 中
行内
daywang
不加 enforce 是不是正常从上到下执行￼
加不加enforce对上下顺序没有影响 
20:23
紫珏
应该是从下到上￼

20:30
Ww
compose 组合,从右到左￼


20:44
daywang
突然想问 ast 后面会不会再多讲讲了￼
后面还会讲
20:48
peak
module.exports = xxx common.js
export default xxx 区别在哪￼ es module
二种不同的模块规范

peak
了解了 一个commonjs规范 一个es6￼


21:32
wutong
最后一句返回的 module.export = ${json.stringfy(...)} 有什么用啊？￼
daywang
1￼
dl
这个 file-loader 用自己的会出问题么￼
dl
这样写导入的是自己的 file-loader 还是别人的￼




cnpm  i less postcss css-selector-tokenizer -D


撤回了一条消息
daywang
导出的脚本是在哪里执行的￼
daywang
貌似从没写过脚本拼接￼

loader 返回的东西不是 Buffer 就是 string 么￼

可以这么认为
loader还可以分成二种
1.最左则的必须要返回JS，因为最左则的loader结果 给webpack了，而webpack会把这个结果用AST parser按JS解析
2. 如果不最在最左侧，只是流水线的一环。肯定都是buffer和字符串


老师这种拼接的脚本也算是代码块么￼
老师这种拼接的


有些时候我们希望级联两个最左侧的loader





22:13
dl
走了两次 loaderrunner￼
dl
两次 babel-loader 和一次 less-loader￼
Hedgehog
就是 两个连续的  返回js脚本的 loader，前面的loader需要有pitch￼
dl
是这样吗￼




20:13
daywang
先执行 pitch 在执行normal

daywang
async 内部自带的是么￼自己实现的

20:24
daywang
为什么webpack 里面一些定义属性都是 defineproperty 定义，而不是直接 obj.a = xx这种，有什么优势么￼
何先生
因为要加getter吧￼
不同的时间点，不同的loader里获得数据是不一样的


函数能获取到最新的￼
不完美
可扩展的原因？￼
daywang
如果直接写死就是固定的了，
￼
daywang
老师 runloaders 中的 context 为什么是从 options 中取的￼


在哪里绑定 context 就是 this 了么￼
实现原理是 当你执行normal函数的时候 ，绑定this为loaderContext



webpack编译流程中loader不是从右往左执行的吗，runner这里怎么是从左往右走的？￼
紫珏
那个是pitch￼


从左往右执行pitch, 遇到返回值索引--执行上个nomarl￼
peak
runCallback 第一个参数为啥传null￼
只要是callback,第一个参数永远是错误对象 后面才是要传递的值



国际化啥时间讲￼
webpack
是的￼
daywang
ast 处理国际化吧￼
嘻哈
国际化自己写一个字典库就可以了。但是具体的内容，你还得手动翻译的。比如定制开发的的那种内容￼
webpack
只有这种方案吗？我还以为穿个不同的编码就可以了呢￼
webpack
原来要手动翻译￼
嘻哈
比如你公司的信息，你翻译标准的话，就得这么做，如果用那种网页翻译的那种就不标准的。￼



最后一个loader￼
dl
pre-loader2￼
dl
iteratepitching =》越界 => processResource =》iterateNormalLoader => 越界 =》 pitchingCb =》 finalCb￼
dl
是这样么￼

完美 

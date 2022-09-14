面试问的多吗 ￼
as
前端的第二语言适合学哪个？node java go rust python
php
21:40
今天你学习了么
洋葱没有兄弟 ￼
liu
上面的里面如果有 2 个节点，是不是两个都遍历完才出来 ￼
daywang
语法的节点 指的是什么 就是指有 type 的属性
。 函数里面包裹？ 还是以分号结束，一行算一个节点 ￼
今天你学习了么
是的啊 ￼
daywang
是不是 ast 解析树只有 body 有点用 ￼

抽象语法树和 DOM 树的本质区别是什么呢
AST 是描述语法的
DOM 描述页面对象的结构 的
lukaSavage
golang、php￼
as
rust 是做啥的？￼
daywang
c++学有意义 me￼ 没有意义

php 不火了 ￼
紫珏
我是 python 转的 ~￼
peak
首选 node￼
W
前端人首选 node￼
peak
[表情]￼
bjj
定义的 padding 是做什么的 ￼
@
本质区别就是描述的东西不一样，都是对象

实现 babel 插件的时候有一些原则 1.尽可以复用老节点 2.尽可以少操作

a b c d
b c d a

国际化插件

09:41
daywang
visit key 表示的 ast 中的 type 么。
是的
老师 node 对应的谁 ￼
语法树上的每一个节点
自定义的那个插件怎么执行的 ￼
节点是跟 type 同级的所有么
type 是节点的一个属性

node= {
type:'FunctionExpression'
}

这个 findParent 其实是把所有的父级做了个列表么 ￼

09:51
daywang
循环套循环 遍历树，操作不同节点 ￼
青衣
types 哪来的呢 ￼
嘻哈
types 是上面的引用的 types 包的一个方法 ￼
青衣
ok￼
daywang
type.identify 就是把字符串变成 ast 中能识别的节点类型么 ￼
是的

isFunction isArrowFuncitonExpress 不用定义?￼
daywang
有个 parentPath 属性 ￼
青衣
递归遍历 ￼
rename
nodepath 从哪里来的 ￼
rename
是判断类型 传入参数是创建类型？￼
rename
￼￼
嘻哈
这个 babel 所有的功能都具备了 ￼
青衣
ast 语法树是 js 引擎转换的吗 ￼

JS 转换的原理是转换 AST 语法树

types.TYPES=['FunctionExpression','ThisExpress']
for (const type of types.TYPES) {
const typeKey = `is${type}`;//isFunctionExpression
const fn = t[typeKey];//获取 对应的工厂函数

NodePath.prototype[typeKey] = function (opts) {
return fn(this.node, opts);
};

NodePath.prototype[`assert${type}`] = function (opts) {
if (!fn(this.node, opts)) {
throw new TypeError(`Expected node path of type ${type}`);
}
};
}

nodepath 从哪里来的 ￼
rename
是判断类型 传入参数是创建类型？￼
rename
￼￼
嘻哈
这个 babel 所有的功能都具备了 ￼
青衣
ast 语法树是 js 引擎转换的吗 ￼
rename
var \_this 是变量声明 用 thisExpression() 感觉像 this 表达式 ￼
var \_this = this;

10:38
rename
为啥没看到 key 呢 ￼
青衣
类转成构造函数都是这种写法吗 ￼

repalceWithMultiple 是起什么作用 ￼
把一个路径上的老节点替换成新节点

rename
ast 上没有看到 key￼

repalceWith

repalceWithMultiple 都是老节点替换新节点?￼

不过如果你说你写过 bable 插件 肯定是比较加分的 ￼
@
恩恩了解 ￼

daywang
这么像按需加载 ￼
W
按需打包 ￼
按需打包
按需加载不一样的
打包的时候 没打包，肯定 没法加载

daywang
组件库按需 ￼
rename
原理就是转换成路径查找的 方式实现按需加载（模块 tree-shaking）￼
lodash/lib/flatten

webpack
jquery
什么包才可以
antd
lodash
underscore

不可以对所有的包进行 tree shakeing？还要配置具体要对哪些引用的包进行 tree shaking?￼
嘻哈
这方面对性能优化有极大的好处。￼
艾瑞
lodash 好像要 loadsh-es
rollup
所有的包都可以实现 tree shakeing
tree shakeing 方法很多
daywang
默认读取路径 ￼
rename
这个链接有问题了 ￼
rename
￼￼
11:23
dl
ref\*3 是什么意思 ￼
daywang
老师 ast 里面的 scope 表示什么 ￼
peak
作用域 ￼
11:28
daywang
所有信息都在 作用域中么。网站解析没有 scope 字段 ￼

11:37
rename
element ui 也可以把 ￼ 组件库都可以
webpack
要是用 element-ui 就 tree shakeing 不了？￼ 可以
rename
lodash-es 是 es2015+的 lodash￼ 高版本
dl
之前打印 node 的时候有 ref\* 1 这样的东西 ￼
webpack
功底不深，开发不出来 ￼
daywang
最近 github 总上不去 ￼
d

babel 内部核心 库就是 babylon
babylon 的作用是什么啊 ￼
daywang
好像类似 parser ，也是解析的 ￼

webpack
console.dir(xx, {deep: 100})这样就可以看到 ref 里面的东西了 ￼

何先生
babylon 不是一个 3D 库吗？￼
webpack
我记得是的可以试试 ￼
ecmascript
es5 es6 es7
ecmas2015 ecma2016 ecma2017

是 babel/core 里包含了 babylon 么 ￼
嘻哈
今年就是 ecma2021￼
peak
bable-plugin-import 主要功能就是把 import {} 导入 转成普通的导入吗 没有其它作用了?￼
没有了

最高支持es7，es8就不支持了￼
rename
babylon   默认支持2017？￼
W
后续就会支持了吧￼

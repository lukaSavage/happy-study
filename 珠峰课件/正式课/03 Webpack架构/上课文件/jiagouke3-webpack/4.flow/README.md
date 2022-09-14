1.初始化参数：从配置文件和Shell语句中读取并合并参数,得出最终的配置对象
2.用上一步得到的参数初始化Compiler对象
3.加载所有配置的插件
4.执行Compiler对象的run方法开始执行编译
5.根据配置中的entry找出入口文件
6.从入口文件出发,调用所有配置的Loader对模块进行编译
7.再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
8.根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk
9.再把每个Chunk转换成一个单独的文件加入到输出列表
10在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
> 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果


webpack-merge 专门用来合并配置文件
options 1
rule {/.js/,use:[loader1]}
options 2
rule {/.js/,use:[loader2]}

rule {/.js/,use:[loader2,loader2]}



14:21
daywang
还是获取的 node 的 命令行参数￼
今天你学习了么
querystring可以吗￼
@
options 和shellOptions合并，传入c0mplier￼
daywang
第一步就是获取 options 和 命令行参数￼
strive
1￼
@
shelloptions优先级高于配置文件的￼


webpack watch
开始编译 ，并且监听源文件的变化，当监听到源文件发生变化后会重新编译 
Compiler 饭店 只有一个，认为它是单例的
Compilcation 每次方能都会创建新的



需要回去独自顺一顺￼
Hedgehog
监听是监听入口文件，里面还包括它引入的其他文件吧￼
说对
@
webpack --watch命令 是通过文件变化来监控的，--watch这个命令是怎么判断我监听变化的呢￼
daywang
shell 有api 监听文件改变。回调￼
watch:true watch:false 编译 完成之后wepback就退出了
--watch 这块是怎么告诉run去监听变化的，我感觉不开watch也可以监听，因为run的时候代码都走了￼
@
需要加判断吧，比如options中有watch了才去走￼


测试证明
先编译一次，然后记录本次编译依赖的模块
监听这些依赖模块的变化，依赖模块发生变化后才重新编译 
如果模块没有依赖发生变化，不会重新编译


他的意思应该是在run里面，要加 watch参数的判断，才去走 watchFile￼
webpack
.fs能识别到￼

1. 是第一次编译 之后获取到本次编译 依赖的文件和目录，然后fs.watch监听这些文件和目录


loader如何 工作的
1.读取源代码
let name= 'entry1';
2.把源代码传递给最后一个loader


extensions.unshift("") 往数组第一项添加一个空字符串 是啥原因￼




/* WebpackChunkName=xxx*/ 这种算一个 chunk 吗￼
/* WebpackChunkName=xxx*/ 只能修改chunk的名字，没有其它作用

import(/* WebpackChunkName=xxx*/'./video.js')
只要遇到import方法调用，就会创建一个新的chunk
17:08
webpack
构建依赖图，其实就是深度查找模块中是否有require或者import关键字，有的话就添加到对应module的一个属性中￼

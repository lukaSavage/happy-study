The 'mode' option has not been set, 
webpack will fallback to 'production' for this value.

Set 'mode' option to 'development' or 'production' to enable defaults for each environment.


You can also set it to 'none' to disable any default behavior. 
Learn more: https://webpack.js.org/configuration/mode/



Module parse failed: Unexpected token (1:4)
You may need an appropriate loader to handle this file type,
 currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> body{
|     background-color: green;
| }


Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

Warning



这个是全程 webpack 5 么￼ 是的
一咻
script 命令 是咋执行的？￼
  "scripts": {
    "build": "webpack"
  },
npm run build
执行shell脚本 webpack
因为在执行命令前，会把node_modules\.bin添加到环境变量的PATH里
node_modules\.bin\webpack.cmd
如果找不到，会找全局的命令
C:\Users\zhangrenyang\AppData\Roaming\npm
如果还找不到，找其它PATH路径

核心一句话就是找环境变量中PATH变量指定的路径的集合

daywang
babel￼
09:44
rename
mode 对应的是NODE_ENV  吗？ 是不是这两个是一样的￼
rename
。wasm 是啥文件￼
daywang
webassibily
Mr楊
张佬来给我们秀英文了￼
Mr楊
￼￼
webpack
英文功底不得了￼
今天你学习了么
老师英文跟我差不多啊￼
一咻
英文太差了￼
aaa
还有css-loader￼
rename
应该用css-loader 就可以吧￼
rename
因为是。css 文件里面的￼
aaa
经典面试题：loader模块和plugin模块的区别￼
Mr楊
关键这个经典面试题还总是回答不清楚￼
艾瑞
plugin能做为啥不都用plugin做loader的事情那￼
rename
defer 以前没有呢￼


bundle 文件是指啥￼
@
shell 命令￼
rename
style-loader 也是-D￼
一咻
专业。￼
09:59



这些不是node里面的变量么, 为什么在浏览器里会获取到￼
aaa
要自定义set一下￼
艾瑞
有时候要根据脚本区分不同环境￼
嘻哈
那即要在当前配置文件里获取，又要在业务代码里获取呢￼
艾瑞
cross-env来做￼
艾瑞
—env 这个就是纯粹的函数的参数了￼
10:13
Mr楊
那配置文件参数取不到 env了, 还怎么配置￼
艾瑞
webpack可以配置环境变量￼
艾瑞
没有￼
aaa
没有￼
10:20
艾瑞
NODE_ENV会自动注入进去， definePlugin可以注入额外的环境变量￼
peak
bundle文件是指webpack打包后生成的文件吗￼ 是的

打包后的文件就是bundle


webpack-dev-server配置文件改了
contentBase->static

 - options has an unknown property 'contentBase'. These properties are valid:
   object { 
     allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, setupExitSignals?, static?, watchFiles?, webSocketServer? }


10:37
Mr楊
static在 src 外面吗?￼
static 可以放在任意目录里

peak
未知属性￼
@
那之前配置的contentbase还能用吗？￼
嘻哈
官网还没更新过来￼
rename
文档上还有￼
https://webpack.js.org/configuration/dev-server/#directory

插句话我们要学什么
1.学原理 js 一定要掌握 
2.这些库 只需要知道 这些库能解决的问题，能力边界，应用场景。具体到用的时候 再看文档 也不迟







嘻哈
Css怎么支持module的方式使用呢？如:import styles form “./index.css”;￼
Mr楊
预处理器less用的多还是sass用的多一般￼
less安装简单
sass功能强大 安装麻烦一点
一咻
随便用￼
一咻
开心就好￼
rename
style-loader 日常开发用不到吧  因为都是打包到单独的css文件中￼
开发的时候 style-loader
上线的时候 会提供单独的css文件 后面讲
一咻
单独打包的link也要插入到dom里面把￼ 是的
aaa
one-of原理是怎样的？￼ 后面讲优化

一咻
那也太爽了、、、￼
11:00
1024赫兹
webpack-chain讲吗￼  安排
11:04
rename
postcss-loader和 css-loader 有先后顺序吗 感觉没有先后顺序￼
有的

小辣椒撤回了一条消息
11:09
rename
是个最新的5个浏览器加点缀吗？￼


rules的use里的loader书写顺序有要求吗￼
当然有了
loader写的是时候顺序和执行的顺序相反的
写的顺序就是执行的顺序，所以说是严格确定的好
/数组倒序执行
strive
安装得node-scss是做什么得￼
把sass编译 成css
嘻哈
Html页面出现多个style的样式文件可以优化成一个吗￼
开发的时候 用提style-loader 每个CSS文件生成一个style标签
但是在上线的时候 会进行合并



生动形象￼
peak
这个比喻 记忆深刻￼
189****8903
但是 最新的5个版本一般都支持  加前缀的意义不大￼，同感，感觉应该是浏览器的老版本需要加前缀吧
￼
peak
就是兼容低版本的浏览器￼

file-loader 可以把src目录里依赖的源图片文件拷贝到目标目录里去，文件名一般为新的hash值


~@  这种路径的处理是 file-loader 处理的￼
11:24
rename
build的时候的hash 没有看到 直接引的是原文件 ./src/kf.jpg   应该是has。kf.jpg￼
11:27
不完美
vue项目，当时老大让换一个图片，谁知道图片使用base64打包到文件中了￼



base64确实大不少，现在还需要节省请求吗？静态资源可以放独立域名上吗￼
大图片肯定 是要放CDN
strive
新生成得图片不能直接替换老得图片么， 每次都需要手动删除么￼
1.如果文件名不一样，不会直接覆盖，一样的话就会覆盖，想删除老的就需要手工清除
2.不想手工清除


看看  打包的文件的引入方式是不是  ./src/kf.jpg. limit 改回8￼
不管是拷贝文件还是BASE64. 引入方式是一样的
模块ID跟源文件的路径有关
模块ID其实就是源文件相对于根目录的相对路径
跟打包后的文件没有一毛关系
嘻哈
他的意思就是文件名带hash如:kf.01845.jpg￼


Experimental support for decorators is a feature that is subject to change in a future release.
 Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.



```json
 {
                loader:'babel-loader',
                options:{
                    presets:["@babel/preset-env","@babel/preset-react"],
                    plugins:[
                        ["@babel/pugin-proposal-decorators",{legacy:true}],
                        ["@babel/plugin-proposal-class-properties",{loose:true}]
                    ]
                }
            }
```

- 有些代码webpack是不认识的，比如react jsx 有些代码 浏览器不兼容的 es6 es7。
- 把ES6 ES7编译 成ES5
- React编译 成ES5

- 靠babel-loader
- babel-loader只是一个转换函数，并不能识别JS的语法，也不知道如何转换
- 得认识JS代码  知道如何把老代码转换成新代码
- @babel/core 它是babel核心模块，它认识JS代码，能够识别JS代码 不知道如何转换写法
- babel插件知道如何把老语法转成新的语法，每个插件会对应一个语法 比如说箭头函数
- plugin-transform-arrow-functions 可以把箭头函数转成普通函数
- ES6/ES7语法很多
- 把插件打包成preset预设。预设就是插件的集佤
es6->es5的所有的插件打包一个包 @babel/preset-env
豪华午餐=(汉堡 薯条 可乐)
一种 肯德基  (汉堡 薯条 可乐) 鸡腿
一种 肯德基  豪华午餐+鸡腿



webpack 本身只认识 es5 么￼
aaa
babel只能编译到ES7吗？￼
daywang
ast 处理￼
11:49
今天你学习了么
一般会所的套餐满足不了我啊￼
W
可以套餐加普通单点￼
rename
core-js 是babael polyfill？￼
今天你学习了么
我要额外的特殊服务￼
rename
配置一个预设就行了啊 就是全部了  不需要配置插件了￼
今天你学习了么
看需求￼

https://babeljs.io/docs/en/babel-plugin-proposal-class-properties



预设 + plugin的场景？￼
11:54
rename
是的
class-properties 是和dectorator 是用在 刚才的装饰器的代码 才需要这两个插件 这两个插件是需要单独暗转的 不在@babel 里面￼
daywang
跨端很多是ast的￼
rename
@babel 里面所有插件都有了 dectorator 有的￼
rename
plugin-proposal-decorators￼
rename
preset-env里是没有plugin-proposal-decorators 插件
疑问就是  @babel 里面有这个plugin-proposal-decorators   预设就好了 为啥还要配置插件   场景就是有 装饰器的 情况￼
daywang
插件内部有的对当前项目不起作用吧。项目读取的是自己的 config.js 。插件的应该对项目不起作用￼
aaa
写react项目一直用老的写法写装饰器...￼


https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy


legacy stage1
@decorator
class Person{

}
新的呢？

class @decorator Person{

}


14:11
rename
parser  能配置数组吗？￼
嘻哈
多端兼容￼
rename
extends？￼
rename
root：true 表示根元素  不加 有什么问题吗？￼
配置是可以继承的，
有根，有继承别的人
root:true
extends:'airbnb'
rename
eslintrc.js 文件也是node 环境吧￼
monkey
这个和vscode的插件eslint有什么区别,我不安装vscode的eslint的插件就不生效￼
搭配使用
rename
这是编译的时候的 报错检查 也就是控制台的 vscode 是写代码的时候 在编辑器里面的￼
rename
off￼
rename
一般 vscode  的eslint 配置的好  eslintrc。js 里面是不是就可以不配置了￼
一咻
都要配的。￼
今天你学习了么
写代码的时候提示配vscode插件吗￼
嘻哈
不运行 npm run build , 可以在代码里直接看eslint 语法检查吗?￼
rename
eslint --fix  也能修复￼
rename
怎么没有修复呢￼
bjj
webpack会自动解析eslintrc.js文件的￼



Expected linebreaks to be 'LF' but found 'CRLF'.eslint linebreak-style

carriage 换行
linefolder 回车
cr
lf
windows 换行符 \r\n  \r回车 \n换行
linux里换行符\n 没有\r
来自于老式打印机



rename
eslint --fix  也能修复￼
rename
怎么没有修复呢￼
bjj
webpack会自动解析eslintrc.js文件的￼
webpack调用eslint
eslint这个包会读配置文件
14:24
成成
后面这个 规则 是 aribnb 提示的还是 eslint 提示的呢￼
eslint提示的
airbnb是规则的集 合
plugin preset
preset是plugin的集合
airbnb是规则的集合，最终都是给eslint读取这些规则 的

今天你学习了么
这文件夹必须.vscode吗￼
今天你学习了么
里面必须叫setting,json啊￼
一咻
gg￼
Mr楊
换行￼
一咻
右下角换一下？￼
Mr楊
正常我们用什么格式? 是 CRLF 还是 LF? 我们一般怎么统一￼
嘻哈
像那种针式打印机一样的￼
今天你学习了么
尊重前辈￼



```js
{
    "eslint.validate":[
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint":true
    }
}
```


airbnb 是 extends rules￼

eslint editorConfig  prettier这几个东西好乱￼
rename

source-map
包含什么?


怎么那么多, 一个也没用过￼
14:46
rename
css 中的 这个啥时候讲~@  ￼


14:51
strive
开发环境和生产环境一般都使用那个source-map￼
最佳实践
今天你学习了么
npm run dev会先默认执行npm run build啊￼
不会的
daywang
webpack 是当前文件依赖的所有都要打包进去么￼
找到入口模块，打包入口模块像这种模块，
是的
rename
开发环境是不能加cheap 的不然 不好找错误￼



eval("var a = 1;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8xLmJhc2ljLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwibmFtZXMiOlsiYSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsQ0FBQyxHQUFHLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgYSA9IDE7Il0sImZpbGUiOiIuL3NyYy9pbmRleC5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.js\n");

sourcemap信息分开发了
eval(  "var a = 1  //# sourceURL=[module]\n)
使用sourcemap的缓存，可以提升重复构建的速度
如果你生成的是一个单独的map文件，所有的模块的map信息耦合在一起的。
如果一个模块发生变化，整表map文件都要重新计算生成

每个模块的map文件单独存放，可以单独缓存。
有一个模块发生变更 ，只需要重新计算这一个模块的map信息就可以了
紫珏撤回了一条消息
rename
sourceURL=webpack-internal ？￼
Mr楊
配置项真多, 每一项的规则也真多￼

只要学会5个关键字，所有的选项都可以自己推理出来


今天你学习了么
那npm run dev启动的服务默认访问的是哪个文件啊￼、￼
dist\index.html

今天你学习了么
内存在哪里啊￼
rename
查看了配置文件的alias 里面~@别名 但是css的url中还是可以用￼
dl
eval 缓存的 sourcemap 看得到么￼
rename
意思是新增了这么多提案￼
15:12
嘻哈
老师放的抒情类型歌曲，蛮动听的￼
daywang
1￼




老师打包加密怎么弄呢￼
今天你学习了么
我的意思是你本地开发服务没有npm run build但你改了index,js就自己更新了￼
npm run dev
webpack-dev-server
内部会监听源文件的改动，源文件改动后会自动重新在内存里编译 并重新刷 新
今天你学习了么
访问的是dist下index.html 你没build他自己更新？￼
肯定要重新 build才会更新
15:27
dl
改成这种写法了之后，那些 eval cheap module 怎么用啊￼不需要了
艾瑞
等于生产环境吧sourcemap放到内部服务器，这样外部就不能访问了￼


这样加hidden-sourcemap的话不如前面一种， 把source-map文件放到内部服务器上￼
如果要发布到线上的话，不希望暴露任何一丁点信息

紫珏
学到了￼
dl
测试环境是本地起的么
http-server -p 8081


这些是编译顺序 ￼
rename撤回了一条消息
rename
在浏览器的runtime 环境没有关系￼


第三方的包我都不希望放到我项目中,那一个个配好麻烦￼

monkey
例如antd￼
薛世洋1993
不放项目中咋用￼ 取CDN中的全局变量使用
rename
再看看那个sourcemap add   输入怎么调出来的￼
dl
cdn 都是这样在html里写一个吗￼


没有添加项目中的三方包，放哪里了￼
CDN
liu
CDN引入了，为啥还需要require,不用require不就不需要配置不打包了￼
weboack
CDN￼
嘻哈
现在应该没有人用jQuery.js类库了吧￼
90%网站都在使用jquery

rename
看看老师的 浏览器的设置 里面都勾选了哪些？￼
weboack
访问软链，与访问服务器资源，同等网速下，那个更快？￼

有些静态文件没有依赖，也需要打包，但需要上线后能访问


张老师我 服￼
Onereedtosail
张老师全能￼
rename
哎呀 优秀  yyds￼
紫珏
秀￼
W
问题是已经不年轻了￼
今天你学习了么
我代表bat请你代言￼
rename撤回了一条消息
rename
暴露年龄￼
艾瑞
人都说35有道坎￼
今天你学习了么
没发财一生就这样￼
今天你学习了么
大学老师告诉我的￼
艾瑞
所以好好存钱搞第一桶金吧￼
rename
300ms 是个什么配置呢 算是 频繁吗？￼
防抖
300ms之内没有新的变更的话才会真正新的编译 
嘻哈
有点像局部热更新￼
rename
张老师居然用拼音输入法了￼
W
防抖呀￼
W撤回了一条消息
dl
轮询和防抖冲突么￼
rename
1ms 问一次￼


轮询
每隔一段时间问一次
1ms问一次
问问有没有更新
1 有 开启计划任务300ms后编译 
1 有 取消上一个任务，开启新的计划任务300ms后编译 
1 有
1 有
1 有
1 有
1 有
1 没有
1 没有
300个没有话才会去执行新的编译

webpack-dev-server
一个http服务器，用express实现的
如果你什么都没有，建议webpack-dev-server

webpack-dev-middleware
如果你已经 有一个现成的express项目了
想集成webpack进行，就可以使用webpack-dev-middleware，它是一个中间件

function middleware(req,res,next){

}
app.use(middleware);



我也同问￼
monkey
我要是遇到报错了,肯定先有道,然后百度,然后google,然后发呆￼
小辣椒撤回了一条消息
rename
可以next的￼
daywang
koa￼
16:51
rename
喝水老师￼
rename
其实就是解决跨域￼
rename
没有跨域 好像都是3000￼

现在没有跨域问题了











17:01
rename
【name】能随便写吗？【file】￼
凡是放在[]都是变量，只能使用固定的几个变量name  ext hash
daywang
多文件时候。文件名命名￼
dl
合并css后不压缩吗￼
改压缩压缩
rename
filename 的值写死就合并了￼
rename
mode：development￼
嘻哈
现在是混为一个目录了￼
17:08
rename
''不写 感觉不习惯￼
rename
怎么这么卡￼
17:15
dl
5.0.0￼
peak
url-loader之前版本就是4￼
嘻哈



没有limti的时候 就把当前的文件copy到dist目录  这个是file-loader 做的￼


raw-loader
file-loader
url-loader 经废弃了


asset/resource 
   emits a separate file and exports the URL. 
   Previously achievable by using file-loader.
asset/inline 
  exports a data URI of the asset. 
  Previously achievable by using url-loader.
asset/source
 exports the source code of the asset. 
 Previously achievable by using raw-loader.
asset
automatically chooses between exporting a data URI and emitting a separate file.
 Previously achievable by using url-loader with asset size limit.




 20:06
Mr楊
启动css模块化有啥好处?￼
今天你学习了么
如果写id也是styles，id吗￼
嘻哈
好处，就是相同的类名样式 不会相互影响￼
W
这样样式不会冲突了吗￼
daywang
前缀都不一样￼
Mr楊
一般也不会写重名的类名啊￼
daywang
老师 scoped 也是类似这种实现么￼
艾瑞
比如有antd的某个class,这样就不能用.antd.xxx来改了￼
lukaSavage
react中的.module.less的原理是什么？
react中
vue里也一样
xxx.module.less
默认用css-modules



刚刚css module的时候，如果用antd的时候需要改antd某个class的属性咋整￼


 url(images/kf.jpg);路径解析规则 

 ./ ../ 相对路径
images/kf.jpg

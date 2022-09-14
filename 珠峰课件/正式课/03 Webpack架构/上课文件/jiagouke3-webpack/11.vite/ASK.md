20:11
lukaSavage
加个ts￼
何先生
用的不是vue2.x吗？￼
123
ESM 文件  是es module 吗？ .mjs?￼
ESM

123
setup￼
123
是vue3 中的语法￼
123
怎么安装的？￼



123
是vue3 中的语法￼ 自带的，不需要安装
123
怎么安装的？￼
123撤回了一条消息
lukaSavage
vue3怎么还要根节点？￼


静态资源处理
1.在模板中通过相对路径直接引入 /src/assets/kf.jpg



</div》￼
123
￼￼
123
上图的报错 安装了啥？￼
C:\aproject\zhufengwebpack202108\11.vite\node_modules\esbuild\esbuild.exe
node  C:\aproject\zhufengwebpack202108\11.vite\node_modules\esbuild\install.js
Kzuo
</div>￼
何先生
不应该是h1的内容吗？怎么只变成了属性￼
123
setup 不用注册 不用注册
20:26
222
图片名称错 了￼


一般来说，如果配置了别名
如果级别低于二级，一般用相对路径 ../ ./
如果级别高于二级，可以使用别我  @store/xxx

如何处理样式
1. 全局样式
2. 局部样式


css modules
任何以.modules.css为后缀的css 文件都会被 当成css module文件来处理





么有装插件 默认支持 css module？ 是的
peak
css module这种用法是vue3支持的?￼
123
可以解构吗？￼
123
import {a,b,c} from 'a.module.css'￼
lukaSavage
样式去解构效果肯定不好￼
123
不解构就一大堆style.a    style.b.  …￼
123
这种css module 是vite 支持的   ￼
123
vite 的官网 样式是不是错乱了￼
123
我的中间好大一条缝￼
123
这会要装了吧￼


classic
node

c:/a/b/c.js
import('d')
classic
c:/a/b/d
c:/a/d
c:/d
再找不到就报错了

node
走node模块的查找规则 
当前目录/node_modules
父目录/node_modules

jsx react preserve

react jsx=> React.createElement
<div></div> React.createElement('div')


123
ESNext  和esnext 没有区别吧？￼
123
classic 使用的场景呢



有vite/client  是vite 下的client这个库吗的类型声明？￼


node install.js
安装得到一个esbuild.exe 文件


extends  这些需要安装吧？￼ 需要
123
是不是写了那么多推荐配置 rules 可以不写了￼
一般是不写了，除非默认配置你不接受，你想重写







123
有些模板需要编译吗？ 安装的过程中？ 就像执行执行node  + 路径 生成.exec文件￼
v_shiyongla
哈撒开￼
v_shiyongla
哈赛￼
123
这是最新版的husky 的用法￼ 7.0的写法
跟以前大不一样
daywang
这个是在提交之前 做些判断操作是吧 是的
￼
v_shiyongla
是压缩的用法￼
peak
git 的钩子配置 如: commit要求feat fix之类 和这个是类似的吧￼
123
-m 后面为啥不加 空格￼
peak
可以不加￼
daywang
不用加￼
123
npx  lint-stage 是本地有缓存会link吗￼
先判断有没有本地安装，如果装了会执行，如果没装会马上安装并执行，执行完了以后再删除
123
npx  还是使用安装   ？￼
v_shiyongla
@daywang  道友￼
daywang
￼￼
123
conventional提交注释的信息的规范￼
W
提代码的检查吗￼
123
npx 是装完用完就删了  ￼
123
没有找到说明没有安装 使用npm 应该也行吧￼
123
只是npx 更高级￼
daywang
npx 临时使用￼
123
平时用的都是直接feat￼
123
npx 里面有node 执行命令的作用 为啥执行npx 一句命令能生成sh文件

npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。
上面代码运行时，npx 将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app。
如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install参数。如果本地不存在该模块，就会报错。
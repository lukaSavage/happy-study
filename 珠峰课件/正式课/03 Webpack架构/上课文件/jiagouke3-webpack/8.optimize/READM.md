Webpack will automatically split chunks based on these conditions:
## 默认情况下以下的代码块将被分割
- New chunk can be shared OR modules are from the node_modules folder
代码可以被多个入口进行共享，或来自于node_modules
- New chunk would be bigger than 20kb (before min+gz)
在压缩前大小或者说体积如果大于20Kb
Maximum number of parallel requests when loading chunks on demand would be lower or equal to 30
当按需加载代码块的时候  并发请求的最大数量 将会低于或等于30
Maximum number of parallel requests at initial page load would be lower or equal to 30
入口中加载代码块的时候  并发请求的最大数量 将会低于或等于30

并发请求的数量不能高于30个

When trying to fulfill the last two conditions, bigger chunks are preferred
当尝试去满足最后两个条件，更大的代码块将会被 选择
page1.js
module1 1
module2 2
...
module35 35 

module30~module35会分割出去  module1~module5会留在入口代码块中


module 在webpack中每个文件都是一个模块
chunk 
1 入口点分割，每个入口点都会分割出一个chunk chunk里包含入口模块和入口模块依赖的模块
2. import()动态导入 也会产出一个单独的代码块
3. splitChunks代码块分割分割出额外的代码 共享模块可以分割出代码块 node_modules里的模块也可以分割出代码块
bundle asset webpack打包后生成的文件。一般来说一个chunk会对应一个文件

20:18
Morninggirl
动态导入的么？是的
daywang
拆出去就都变成赖加载了吧￼ 可以这么认为
拆出去模块和懒加载的模块加载方式是一样的
daywang
enter的key是chunk
entry的key是chunk的名字


page1 page1
page2 page2
cacheGroup
cacheGroup是用来分割和合并代码块的一个工具

把多个代码块合成到一个cacheGroup中。变成一个代码块
也可以一个代码块拆到多个cacheGroup中，拆分

webpack4以前只有代码块，没有缓存组
为了代码块分割与合并，webpack4中添加了缓存组的概念
会有一个条件，会把符合条件的模块放到一个缓存中组
每个缓存组会成一个单独代码块

20:34
Morninggirl
cacheGroup意思就是可以将第三方包和最小共享文件个数的公共包拆分出来￼

这三个是入口代码
page1.js   module1 module2 jquery asyncModule1
page2.js   module1 module2 jquery
page3.js   module1 module3 jquery
按缓存组的设置进行代码块分割


default-src_module1_js.js default
default-src_module2_js.js  default

asyncModule1.js 动态导入，也会分割 import async 

defaultVendors-node_modules_jquery_dist_jquery_js.js defaultVendor分割出来的


page1折成几个代码块？
page1.js
default-src_module1_js.js 
default-src_module2_js.js
defaultVendors-node_modules_jquery_dist_jquery_js.js
asyncModule1.js



acheGroups 的 key 名，可以自己定义么。还是固定的￼
Morninggirl
你说的是包（chunk）名么？￼
Morninggirl
可以随意写￼
Morninggirl
实际工作项目中不会拆分出很多包吧？要不index.html中要引入所有~￼

把第三方包拆出来加上hash实现长期CDN级别的缓存
dist目录下的index.html  会自动引入所有打出来的包~￼
daywang
不是chunk ，缓存组的key￼
Morninggirl
￼￼
Morninggirl
这个么？￼
Morninggirl
可以的￼
daywang
对￼
Morninggirl
可以￼
Morninggirl
你在splitChunks中设置：name:true,你的chunk名就是这个key值￼
daywang
webpack 高手￼
20:57
Morninggirl
5￼
艾瑞
4个￼
daywang
拆的多了，js文件体积小了，但是请求就会多。性能也不一定吧￼
Morninggirl
老师，实际工作项目中不会拆分出很多包吧？要不index.html中要引入所有~￼
dist目录下的index.html  会自动引入所有打出来的包~￼
黑豹
minChunks必须是入口文件引用嘛？如果是其它js模块引用也算吧？￼￼
page1=>m1=>m3
page2=>m2=>m3

第三方类库
cdn  extenral 从CDN脚本加载   lodash jquery vue react 都可以通过CDN的方式加载
访问一个CDN的脚本，然后它会把React这个变量挂到window.React.直接使用就可以了
以下三种也是真正把代码获取到打包到输出文件里
加快查找模块的速度 
resolve 加快查找模块的速度
modules 加快查找模块的查找速度或者添加额外查找模块路径
加快解析的速度，不走依赖分析
noParse 不解析模块里面的依赖 lodash jquery可以，vue react 不行，需要加载别的模块
哪些属于第三方模块?

vuex vue vue-router算吗？算
只要是你用npm install yarn add 安装的模块，安装到了node_modules里的话都是第三方模块



缓存是在内存里的
HardSourceWebpackPlugin
DllWebpackPlugin现在都废弃了。因为webpack5内置了这些功能了

所谓的运行时就是webpack打包后的文件要在浏览器里运行的一些必要函数或者变量
require
cache
modules
为什么需要把它抽取出来呢？
为了缓存


daywang
加快编译，减小体积￼
Morninggirl
像vue react ui库 采用cdn 一般用官网的cdn引入么？还是放到公司的cdn服务器上呢？￼
Morninggirl
引入时需要指定版本号么？可以指定 
不指定的就是最新的，也可以指定某些版本

Morninggirl
老师 我用的webpack4  哈哈



HardSourceWebpackPlugin 可以把编译 的结果缓存在硬盘上，可以提高重复编译 的速度 



21:47
daywang
没太理解 这个作用于提升。是合并了么￼
艾瑞
esModule可以用吗￼
Morninggirl
开发环境启用压缩 会增加编译时间吧~~￼ 肯定会的

daywang
有计算应该会变慢￼
Morninggirl
比如 babel-loader￼
21:55
Morninggirl
缓存：如果项目使用rm先删除之前的包，再重新打包，缓存都会失效的吧？￼
不会的
并不会

Morninggirl
内存和硬盘有什么区别呢?￼
紫珏
内存数据读取不用走磁盘io￼
内存读写速度是硬盘好几千倍


数据读取不用走磁盘io￼
Morninggirl
那就是 内存优先级大于硬盘了么￼
默认是内存

薛世洋1993
缓存路径随便填写吧￼是的

Morninggirl
1￼
Morninggirl
那还是有必要做缓存的~~￼




node modules 一段时间后 cache会越来越大  需要设置什么吗￼
Morninggirl
cache 是webpack5内置的功能吧？webapck4内置了么？￼
4 没有，只有5有
W
每次都要手动删除cache太麻烦了￼
不需要删除
peak
老师 又提pr了￼
Morninggirl
持久化缓存的是不变的文件内容么？还是？￼
快照
一个广播的修改时间戳

嘻哈
直接 不用 cnpm￼

daywang
突然想问下 svg 为什么需要单独处理￼
19:14
liu
这个如果生产环境编译就不生效了￼
生产环境建议用 deterministic
Mr楊
开课多久了￼
Mr楊
￼￼
daywang
这个就是为了缓存是吧￼ 是



生产环境能知道模块没改变吗？ 这个就是生产环境的默认配置
19:25
ABCD
polyfill是啥 腻子，是用来抹平浏览器的差异
抹平环境的差异
环境里缺啥补啥
daywang
就是向下兼容浏览器
￼
g
类似 postcss，加前缀￼
autopprefixer



多入口项目,webpack4能实现只打包改变的模块吗？￼
liu
生产环境中￼
daywang
这个是不是有缓存，文件没变会不重新打包￼
19:34
艾瑞
但是打包还是打包进来了￼

19:44
艾瑞
mfsu好像问题还不少￼
Mr楊
要不断一下,￼
daywang
理解是加载远程组件￼
daywang
感觉很像微服务的特点￼
是的

张仁阳

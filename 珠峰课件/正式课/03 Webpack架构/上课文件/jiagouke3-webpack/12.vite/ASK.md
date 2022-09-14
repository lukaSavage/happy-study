
- 依赖管理和安装包和链接包用yarn命令
- 初始化和发布包用lerna管理 




vite 项目现在有啥风险不￼
123
多仓库  是哪个 多个git 仓库￼

vite-cli
vite-project

建一个git仓库 ，放二个package
也可以建2个git仓库，每个仓库放一个package

lerna是一个简化monorepo操作的工具

123
一直没有明白lerna 和monorepo￼
123
区别￼
daywang
monorepo 是个概念，lerna 是具体怎么实现这个￼
daywang
是个工具￼
123
leran 是packages 目录   npx 是workspace￼
daywang
虽然听完 lerna 公开课，也不是太理解，￼
a
来晚了，这是干啥的￼
123
relese tag 是打个relase tag？￼
Hedgehog
 ￼
123
在lerna里面   用useWorkspace  true￼
123
再在package，json中用workspace  目录￼
123撤回了一条消息
20:49
123
link. 到全局的环境变量里面￼


20:49
123
link. 到全局的环境变量里面￼
123撤回了一条消息
123
2个 package  2个node——modules￼

2个package.共享 项目根目录下面的node_modules
daywang
lerna 是适合写多个包是吧。npm 是每次只能写一个包￼
123
刚才publish了  没发吗￼
123
组织在npm 上面是不能重复的？￼
当然不能重复
"license": "MIT",   是不是就不用配置 哪个access￼


文艺复兴？￼
daywang
connect 最原始，不受一些限制可能
￼
123
不是为了 尽量少的封装  更原始￼
123
connect￼
123
这个应该不是它快的原因吧￼
daywang
快的原因是不用打包编译了吧￼
123
看到esbuild了￼
W
是koa包大吗￼
123
讲讲这个到底是个啥￼
123
快的原因是esbuild？￼
vite为什么快，最大的原因是不需要打包
daywang
esbuild 是打包使用用吧￼ 编译的时候用的，现在用不上
W
这就是大家只记得 0到1 的开拓者的原因吧￼
21:51
123
1.0 的包里面有esbuild  为啥2.0 里面没有了￼


vite服务器需要在返回main.js文件内容的时候，把内容进行替换
import {createApp} from 'vue';
import {createApp} from '/node_modules/.vite/vue.js?v=a911a6b5';

把vue替换成/node_modules/.vite/vue.js


Uncaught TypeError: Failed to resolve module specifier "vue". 
Relative references must start with either "/", "./", or "../".
相对路径只能以/ ./ ../开头
不能是模块名

2.返回main.js内容的时候
重写
import {createApp} from 'vue';
import {createApp} from '@modules/vue';


Request URL: http://localhost:8080/@modules/vue
能够拦截到@modules/vue的请求，返回真正应该返回的内容

1.能够 返回静态文件
静态里有 import 'vue'
浏览器不认识，不能发请求，浏览器规定只能 / ./ ../
vue  /@modules/vue
浏览器就能发请求了
我们在服务器端还要处理解析这种请求
 /@modules/vue
 把这一种路径变成一个硬盘的文件的绝对路径，然后读出来给浏览器
 


 Failed to load module script: 
 Expected a JavaScript module script 
 but the server responded with a MIME type of "application/octet-stream". 
 Strict MIME type checking is enforced for module scripts per HTML spec.
App.vue需要返回的是一段脚本
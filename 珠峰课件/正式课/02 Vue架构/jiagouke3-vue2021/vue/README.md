## 源码分析
- 看package.json文件， 找到运行命令 内部使用的rollup
- 打包的文件在scripts/config.js 找到入口
- 入口在src/platform/web/ (entry-runtime-with-compiler / entry-runtime)
- platform下有两个平台 web/weex/mpvue (vue2里面想基于源码扩展，需要在vue的源码中改写代码) 相比vue3 vue3采用了monorepo可以实现基于vue的某个模块，可以直接安装对应的包来进行扩展
- 1.如果是带compiler的重写了$mount方法，最终还是调用了runtime/index
- 2.runtime/index 定义了一个$mount方法 还增加了平台的指令和全局的组件 patch方法
- 3.core/index  给Vue增加了全局方法(静态方法)
- 4.instance/index 定义了Vue的构造函数，给Vue的原型进行方法的扩展




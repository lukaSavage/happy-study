# 谈谈你对MVVM的理解？
- 比较早期的是mvc针对后端来说的 在页面中进行操作 -> 后端的路由 -> 控制器 -> 数据获取 -> 控制器 -> 回传给页面
- backbone （控制器的概念） + underscore + jquery的方式  （前端项目的复杂性） 分层
- 如果使用传统的mvc 大量的逻辑会耦合在c一层 （导致维护困难）
- MVVM模式  model， view 视图 (viewModel 简化controller这一层) 传统的mvvm要求不能手动操作视图更新 vue中有一个ref属性 可以去手动操作  v-model  （响应式是单向的 只能数据影响视图 ， 视图变化后还要影响数据）
- vue 和 react（v层）  库和框架的区别？库我们用户主动调用库中的方法，框架的特点我们被动的被别人调用 （渐进式的概念就是可以自由组合功能）


# 请说一下Vue2及Vue3响应式数据的理解
- 响应式数据的核心就是数据变化了我能知道，对象在vue2中采用了defineProperty （Vue.util.defineReactive）将数据定义成了响应式的数据 （拦截所有的属性增加了getter和setter）缺陷就是要递归构建，不存在的属性无法被监控到。 vue3采用了proxy直接可以对对象拦截，不用重写get和set方法，性能高，不需要直接递归。 对数组并没有采用defineProperty 因为数组中可能数组很长但是用户不会操作索引更改数据  
- Vue2中减少层级数据嵌套不要过深
- 如果不需要响应式的数据就不要放在data中, 合理使用Object.freeze
- 我们尽量缓存使用过的变量 


# Vue中如何检测数组变化?
- vue2中并没有使用defineProperty来检测我们的数组（性能差），vue2里面就采用重写数组的方法来实现 （7个变异的方法 能改变原数组的方法） 通过原型链 + 函数劫持的方式实现的 （缺陷是不能检测到索引更改和数组长度的更改） 数组中的元素也会被再次观测

# Vue中如何进行依赖收集？ （观察者模式）
- 依赖收集的目的是，等会数据变化了可以更新视图， 如何收集的 每个属性都有一个dep属性、每个对象也都有一个dep属性。 每个组件在渲染的过程中都会创建一个渲染watcher （watcher有三种，渲染watcher，计算属性watcher，用户watcher） ， 一个属性可能会有多个watcher， 反过来一个watcher有多个dep。
- 当调用取值方法的时候如果有watcher就会将watcher收集起来， 等会数据变化后会通知自己对应的dep触发更新调用watcher.update方法。


# 如何理解Vue中模板编译原理  （模板编译原理的核心就是 ast -> 生成代码）
- 会将模板变成ast语法树
- 对ast语法树进行优化 标记静态节点  （vue3中模板编译做了哪些优化 patchFlag, blockTree，事件缓存，节点缓存。。。）
- 代码生成 拼接render函数字符串 + new Function + with 


# Vue生命周期钩子是如何实现的
- 生命周期钩子在内部会被vue维护成一个数组 （vue内部有一个方法 mergeOptions） 和全局的生命周期合并最终转换成数组，当执行到具体流程时会执行钩子 （发布订阅模式） callHook 来实现调用


# Vue的生命周期方法有哪些？一般在哪一步发送请求及原因?
- 在哪发请求都可以，主要看你做什么事情。 我再created中和mounted中 有区别吗？ 区别不大，但是如果同步操作created中是无法获取dom的
- 在服务端渲染的时候 我们无法使用浏览器的钩子（服务端渲染是吧结果渲染成一个字符串，返回给浏览器 渲染过程是在服务器做的， 会把功能写在created里） vue3 中我们发请求可以全部在mounted中
- ajax肯定会等待你的同步代码都执行完毕，才能拿到结果 
- 异步操作不会阻塞主线程


# Vue组件data为什么必须是个函数？
因为内部会调用Vue.extend 会将组件的定义传入，此时会将用户的参数进行合并检测data属性，如果data不是函数会报警告
会将当前定义的data合并到组件的内部，如果data是一个对象就存在数据被共享的可能

const Sub = Vue.extend({
    data(){
        return {a:1}
    }
})
new Sub({props,slot});
new Sub({props,slot});

# Vue.mixin的使用场景和原理
- Vue.mixin 价值在哪里主要解决的问题就是公共逻辑，抽离可用采用mixin （比较常见的 react高阶函数， hooks，compositionApi）
- 缺陷数据来源不明确，命名冲突问题  》 vue3 采用了组合式api更加方便
- 内部实现原理 主要采用的就是mergeOptions 把数据合并到全局的options中，每个组件初始化的时候会将选项进行合并


# nextTick在哪里使用？原理是? *
- nextTick功能是批处理，多次调用默认会将逻辑暂存到队列中，稍后同步代码执行完毕后会采用，同步的方式依次刷新队列 （nextTick本身内部采用了异步方法，但是执行逻辑的时候采用的是同步）
- 内部实现原理（异步的实现原理 先采用promise.then 不行在采用 mutationObserver  不行在采用 setImmediate 不行在采用 setTimeout  优雅降级

# computed和watch区别 *
- 先说这两个东西内部都是基于watcher的，区别是computed数据可以用于页面渲染，watch不行，computed只有在取值时才会执行对应的回调（lazy为true所以不会立即执行），watch默认会执行一次（拿到老的值）。 computed用了一个dirty属性实现了缓存机制，多次取值如果依赖的值不发生变化不会更改dirty的结果，拿到的就是老的值


# Vue.set方法是如何实现的？ * 
为了实现给以前不存在的对象添加属性可以实现更新页面，对象采用的是defineProperty不存在的属性检测不到，数组没有检测索引所以也监控不到
- Vue.set({},'name',1); 对象本身得是响应式的，如果对象是响应式的那么对象本身就会有一个dep属性,我新增属性后触发dep对应的watcher不就ok了
- 针对数组内部会调用splice方法，针对对象会调用defineReactive方法并且手动notify


# Vue为什么需要虚拟DOM
- 最核心的是跨端，不同的平台实现方案不同。 内部实现可以不局限于针对浏览器平台
- 如果开发者频繁操作dom可能会浪费性能，虚拟dom你可以认为增加了一层缓存，我们会先更新虚拟dom，在更新到页面上
- 因为dom diff比较的是前后的虚拟dom 比较差异更新页面 （也可以真实domdiff性能差）
- 多次dom操作浏览器会进行合并的 


# Vue中diff算法原理 (大O表示法)
- diff算法是O(n)级别的，采用的是同级比较， 内部是深度优先遍历的方式遍历节点
- 节点判断是否是同一个元素，如果是同一个元素，则比对属性比对孩子，如果不是则直接删除老的换成新的
- Vue2中采用了双指针对一些场景做了优化策略 (如果是静态节点可以跳过diff算法)
- 头头，尾尾，尾头，头尾进行优化
- 最后乱序比较就是根据老节点创造一个映射表，用新的去里边找能复用的就复用节点 （乱序的时候可能中间的顺序是固定的但是都会做一次移动）

> vue3 里面还有一个blockTree概念，如果是通过模板编译的，会把dymanicChildren组成数组直接数组比对，性能更好，如果不能使用这种方式才采用全量比对 (v-for)
> vue3优化移动节点的时候采用了最长递增子序列来实现 贪心+二分查找+前驱节点实现的 O(nlogn)


# 请说明Vue中key的作用和原理，谈谈你对它的理解
- key的作用是为了标识唯一性， 在diff算的时候可以进行复用。 判断是否是相同节点 （tag，key）。 key尽量在动态列表中不要使用索引(如果使用的是索引,相当于就没有写key)， 可能会导致更新出问题。（如果是死的列表可以使用索引作为key）


# 谈一谈对Vue组件化的理解
组件化最早出现在webComponent浏览器可以实现自定义标签兼容性差。 组件化的好处就是 （为了能实现组件级更新，合理规划代码，复用性强， 单向数据流）
组件化会常用到一些技术 属性、事件、插槽  （我封装过哪些组件，自己是怎样封装组件的，如何基于原有组件进行二次开发）


# Vue的组件渲染流程
编写的组件（用的时候都是标签的方式来使用 ） -> AST语法树，识别的时候会根据组件创建一个虚拟节点 -> 组件变成真实节点 -> 插入到页面中

- 注册组件，在当前实例中可以获取到组件
- Vue.extend 根据组件对象创造一个组件类 Sub
- 创建一个组件的虚拟节点， 虚拟节点上组件会增加生命周期钩子 init方法
- 组件的虚拟节点上会包含一个componentOptions(Sub,children...)
- 组件的初始化， 就会调用组件的init钩子   ( new Sub ($mount) )
- 根据组件的内容生成一个虚拟节点，创建节点， 插入到页面上

# Vue组件更新流程
什么情况会导致组件更新？ 1） 组件自己的状态发生了变化  2） props变化也会导致更新 父组件更新了同时导致了子组件更新
- 组件属性发生变化会执行patchVnode （比对属性，用新的属性覆盖掉来的属性）vm.$options.propsData = propsData  如果响应式数据变化了 那么页面会更新


# Vue中异步组件原理
对标图片的懒加载，流程就是先渲染一个空节点， 之后组件加载完毕了，需要重新强制渲染 重新进行组件的加载

# 函数组件的优势及原理
缺点就是无状态、无生命周期，无this 没有自己的数据源，可以接受props ，单纯的页面渲染可以采用函数组件 （正常组件是一个类 _init()，但是函数组件就是一个普通的函数） 函数式组件 没watcher ， 父亲重新渲染，那么函数式组件就重新渲染了


# Vue组件间传值的方式及之间区别
交互方式有多少种 “好多”
- props,emit 典型的父子通信
- 兄弟之间用什么传值？ 可以借助共同的父级来通信， 或者采用eventBus
- 跨组件通信 eventBus，vuex可以实现  vue.observable

- inject provide 开发组件库可以使用其他场景不建议使用，因为导致数据来源不明确
- $parent $children 获取父子组件的实例
- $refs 父拿到子的实例
- $attrs $listeners 也可以通信 父组件传递给子组件的所有属性和方法

# props和emit实现
- props 在创建虚拟节点的时候 会被抽离到componentOptions中的propsData中 ,就是在初始化的时候将propsData定义在了组件的 _props上，最后代理到实例上
- emit  默认给组件绑定的事件 会定义在组件的实例上  核心就是发布订阅   $on $emit  解析时会将事件全部放在vm.$options._parentListeners


# $parent $children
在组件初始化的时候可以拿到父组件，构造父子关系

# inject provide如何实现跨级通信  父 {a:1}-》 孙子-》 曾孙 -》 玄孙
- 父组件将数据定义在vm._provide上
- 子组件通过vm.$parent 向上找，最后将找到的属性定义在自己的上

# $attrs $listeners
- 获取所有的事件和属性直接定义在实例上即可
-  defineReactive(vm, '$attrs', parentData && parentData.attrs)
-  defineReactive(vm, '$listeners', options._parentListeners)

# refs
- 给组件添加后可以获取组件实例
- $refs =  vnode.componentInstance || vnode.elm;

# $attrs是为了解决什么问题出现的，provide和inject不能解决它能解决的问题吗？
 - v-bind="$attrs" v-on="$listeners" 可以直接快速的将属性和事件向下传递。 一层层的传递，不能实现跨级传递
 - provide和inject 主要是跨级通信，不用在进行传递了 可以在父组件中提供出来，子组件直接消费

# v-if和v-for哪个优先级更高？
- v-if和v-for能写在同一个标签上吗？ 解析的结果会有一些问题
- v-for的优先级庚高一些 v-if的优先级低， 所以如果写在同一个标签上 会导致每次循环都要进行判断。 如果就是希望边遍历边判断，可以先做成计算属性，再在页面中使用


# v-if，v-model，v-for的实现原理
- v-for 原理就是拼接一个循环函数 内部用了一个方法 _l
- v-if 自动会被转义成三元表达式  （v-for和v-if） 并不会编译出directive来，在生成代码的时候就将这两个东西进行了转义
- v-model 可以用在组件（可以实现组件数据的同步） (还可以用在元素上)添加指令 
- v-model在组件中就是value + input的语法糖  
- 如果放到表单元素上v-model是有一些差异的 会被解析成一个指令  (在编译的时候会将v-model解析成一个指令) 默认会给input事件拼接一个处理中文输入法的问题。 在运行的时候需要调用指令（会对不同的类型做不同的处理）  指令执行的时候还会去处理修饰符  v-model.lazy


# Vue中slot是如何实现的？什么时候使用它？
- 具名插槽  构建一个映射表
- 普通插槽 是在父组件中渲染vnode的 （只能用父组件的数据，渲染后传递给儿子）
- 作用域插槽 在子组件中渲染vnode的 （可以使用子组件的数据来继续渲染） 表格组件 自定义列中的内容  (如果更新的话 插槽也会被更新 前后插槽不一致会强制重新渲染的)


# Vue.use是干什么的？原理是什么？
- 使用VUE的插件 都会 通过Vue.use(plugin) , 用户在使用这个插件的时候将VueRouter传入，从而解决版本依赖的问题
- VueRouter库 依赖于vue的  我的vue版本是 2.6 , 分离插件和Vue的强依赖￼


# 组件中写name选项有哪些好处及作用？
- 好处1： 就是可以在自己组件中，循环使用自己的组件
- 好处2： 有了名字以后可以定位到具体的组件 不停的向上找到某个组件，给这个组件派发事件

# Vue事件修饰符有哪些？其实现原理是什么？
stop、.prevent、.self、.once~、.passive& .capture！
- 组件在编译的时候会对一些修饰符做处理 （根据不同的修饰符 生成不同的代码）
- 真正运行的时候 也要去处理一些修饰符
- once,passive,capture 得在绑定事件的时候在进行特殊处理。 再创建的时候会依次调用对应的属性钩子来实现创建对应的功能 [create,update,destroy]


# Vue中.sync修饰符的作用，用法及实现原理
- .sync 在vue3中被删除掉了， 类似于v-model的语法糖 可以解析出对应的结果 
- :xxx.sync="abc"  :xxx="abc"  :update:xxx="v=>abc=v"  可以实现.sync
- v-model 默认传递的值叫value和input除非用户改写 如果传递多个数据 


# 如何理解自定义指令
- 1.在生成ast语法树时，遇到指令会给当前元素添加directives属性 '{directive:'v-for',name:for}'
- 2.通过genDirectives生成指令代码  
```
directives: [{
    name: "model",
    rawName: "v-model",
    value: (xxx),
    expression: "xxx"
    }]
```
- 3.在patch前将指令的钩子提取到cbs中，在patch过程中调用对应的钩子  
- 4.当执行cbs对应的钩子时，调用对应指令定义的方法  （create/update/destroy) ， 调用用户自定义指令的钩子函数 (inserted,bind,unbind, componentUpdate)


# keep-alive平时在哪里使用？原理是？
- 缓存是什么？ 缓存组件的实例，组件的实例上 vm.$el (缓存了实例就是缓存了dom元素)。 组件在切换的时候如果有缓存，直接可以复用上次渲染出的vm.$el结果
- keep-alive 不用做任何渲染操作 ， 内部使用了一个LRU算法来管理缓存（ 抽象组件）
- keep-alive中组件切换的时候 插槽会触发更新，如果插槽的内容变化了 会重新渲染$forceupdate, 重新进行渲染




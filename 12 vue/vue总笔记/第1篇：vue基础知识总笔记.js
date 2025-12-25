/*
★★★★★★★★★★★★★ 01、Vue基础 ★★★★★★★★★★★★★★★★★★★
一、vue的介绍
    ·初步认识
        1.什么是vue？
            vue全程visual user environment,是一个渐进式的JavaScript框架
        2.什么叫渐进式？
            本身实现的功能非常有限，但只要引入相关的包或者插件，就可以实现更多的功能
    ·特点
        1)遵循MVVM模式
        2)编码简洁, 体积小, 运行效率高, 适合移动/PC端开发
        3)它本身只关注UI, 可以轻松引入vue插件或其它第三库开发项目
    ·兼容性
        IE9+
    ·与其他框架的联系
        1)借鉴angular的模板和数据绑定技术
        2)借鉴react的组件化和虚拟DOM技术
    ·什么是库？什么是框架？
        库是将代码集合成一个产品,库是我们调用库中的方法实现自己的功能。
        框架则是为解决一类问题而开发的产品,框架是我们在指定的位置编写好代码，框架帮我们调用
    ·拓展知识
        ·MVC和MVVM
            M：表示model 业务逻辑层  作用：进行业务逻辑的判断、数据库的存取 (相当于vue中的data)
            V：表示view  视图层   作用：根据业务逻辑选择不同的视图   (相当于html代码)
            C：表示control 控制层   作用：将用户输入的指令和数据传递给业务逻辑层
            VM：表示view-model 表示view和model的调度者  （相当于整个var vm=new vue()对象）
            总的概括：用户首先在界面中进行人机交互，然后将请求发送到控制器，控制器根据请求类型和请求的指令发送到相应的模型，
                    模型可以与数据库进行交互，进行增删改查操作，完成之后，根据业务的逻辑选择相应的视图进行显示，
                    此时用户获得此次交互的反馈信息，用户可以进行下一步交互，如此循环。
                优点：1.可维护成本低
                    2.可维护性高
                缺点：1.m层和v层直接打交道，导致这两层耦合度高
                    2.因为所有逻辑都写在c层，导致c层特别臃肿
            MVVM概括：实现了View和Model的自动同步，也就是当Model的属性改变时，我们不用再自己手动操作Dom元素，来改变View的显示，而是改变属性后该属性对应View层显示会自动改变。
                优点：1.双向绑定
                    2.可重用性
                    3.可测试
                缺点：1.不易释放内存
                    2.复杂度增加
二、Vue开发(编写代码)
    ·步骤(安装流程):
        安装三种方式:
            1)在线方式直接通过BootCDN引入
                <script src="https://cdn.bootcss.com/vue/2.6.10/vue.js"></script>
            2)直接下载Vue的相关文件,引入vue.js文件
                在www.github.com中搜索Vue,然后找到对应的相关的文件,找master分支,直接下载压缩包
                在该压缩包中找dist目录,里面找vue.js文件,直接在自己的开发的html文件中引入即可
            3)下载脚手架的方式,直接可以在内部进行Vue的相关的开发(2的版本和3的版本)
    ·代码分析
        {{msg}}                              {{}}为插值语法，内部的msg为表达式
        const vm = new Vue()                 vm代表Vue实例
        el                                   代表要挂载的标签
        data                                 代表数据对象
        data:{
            msg: '今天天气真好'                 msg代表属性
        }
三、vue中的指令
    ·v-model
        介绍：用于数据的双向绑定。有两种用法↓
        1）用于表单元素中(input,textarea,checkbox...)
        基本使用：v-model="表达式"
            <input type="text" v-model='msg'>
            <h1>{{msg}}</h1>
        2）用于组件中
            <CustomInput v-model="searchText" />
            其实相当于如下写法
            <CustomInput
                :modelValue="searchText"
                @update:modelValue="newValue => searchText = newValue"
            />
            -----------------------
            在customInput.vue文件中

            <!-- CustomInput.vue -->
            <script setup>
            defineProps(['modelValue'])
            defineEmits(['update:modelValue'])
            </script>

            <template>
            <input
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            </template>
            默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，并以 update:modelValue 作为对应的事件。我们可以通过给 v-model 指定一个参数来更改这些名字：
            <MyComponent v-model:title="bookTitle" />
    ·v-bind
        介绍：强制数据绑定，用来绑定data中的一些数据，简写为：:href="http"
        基本使用：v-bind:属性名="表达式";
            <a v-bind:href="http">百度一下</a>
    ·v-on
        介绍：绑定一些事件如click...    简写使用“@”
        基本使用：v-on:事件名="表达式";
            <button v-on:click="clk">按钮</button>
    ·v-if、v-else、v-else-if
        介绍：通常用于数据的显示或隐藏
        基本使用：v-if="表达式"
    ·v-show
        介绍：和v-if很相似，同样用于数据的显示或者隐藏，
        基本用法： v-show="布尔值";
    ·v-for
        介绍:用于遍历data当中的相关数组或者对象(在 2.2.0+ 版本，当对组件使用 v-for 时，必须设置 key 属性。)
        注意：v-for和v-if一起使用时，v-for的优先级更高
        基本使用：
            数组遍历：v-for="(item,index) in 数组 ";
            对象遍历：v-for="(val,key,index) in 对象";
    ·v-text
        介绍：相当于DOM中的innerText
        基本使用：v-text="data数据"
    ·v-html
        基本使用：v-HTML="data数据"
        介绍：相当于DOM中的innerHTML
    ★拓展：v-if、v-show的区别？
        ①、v-if和v-show的用法一样，区别在于v-show如果条件语句为false，该元素依旧存在，只是加上display: none。
            而v-if指令如果为false，则该元素不存在，即直接注释掉
        ②、频繁切换用v-show,渲染一次后永远不会被显示用v-if

四、vue中操作DOM
    1.vue中如果获取DOM元素并进行DOM操作？
        ①、通过ref进行修改
            先给要改动的标签设置ref属性，ref="refValue",再在methods中通过this.$refs.xxx.innerHTML='改了';
        ②、通过插值表达式{{}}进行修改
            略...
        ★★★★★★ 详情参考03模块练习  ★★★★★★
五、vue中的计算属性和监视属性
    1.计算属性computed
        介绍：计算属性包含两个操作，一个get，和一个set，通常用于数据的双向绑定
        适用场景：某个数据的值改变，相关联的数据会自动变化
        使用规则：
            ·单向操作
                computed:{
                    //如果操作只有单向操作，那么fullname1的值可以直接写成一个function
                    //★get操作必须要有个返回值return
                    fullname1(){
                        return this.firstname+'_'+this.lastname;
                    },
                }
            ·双向操作
                computed:{
                    fullname2:{
                        get(){
                            return this.firstname + '_' + this.lastname;
                        },
                        set(val){
                            // val相当于fullname2得到的数据
                            const arr = val.split('_');
                            this.firstname=arr[0];
                            this.lastname=arr[1];
                        }
                    }
                }                                
    2.监视属性watch
        适用场景：某个数据变化，其他属性想要做相关的事情
        使用规则：
            ·单向操作
                data:{
                    firstname: '上官',
                    lastname: '婉儿',               
                    fullname3: '',
                }
                watch:{
                    //监视firstname的变化,如果发生改变，那么fullname3也要做出相关的事情来
                    firstname(newVal,oldval){
                        // 这里newVal就代表firstname的新值,oldval代表firstname改变之前的值
                        this.fullname3 = newVal + '_' + this.lastname;
                    }
                    //lastname也是同样的道理
                    lastname(newVal,oldval){
                        this.fullname3 = newVal + '_' + this.firstname;
                    }
                }
            *watch的第二种写法：变化的数据写成对象的方式，有两个固定属性，deep：true，handler：function(){}
                //该回调会在被监听的对象属性改变时调用，不论其嵌套多深(也就是说该方法适合监视的是一个嵌套多层的对象)
                watch: {
                    firstname: {
                        // 第一个参数：deep！deep属性代表如果监视的firstname嵌套的比较深，那么设置deep后就可以深度监视了
                        deep: true,
                        // 第二个参数：handler！这里的handler是一个固定的方法,代表监视的时候做相关的操作
                        handler: function(val,oldVal){
                            //改变在这里写
                        },
                        // 第三个参数：immediate！其值是true或false；确认是否以当前的初始值执行handler的函数。
                    }
                }
            *watch的第三种写法：通过vm实例的$watch方法来实现，如下(在vm实例外面写,记住函数不要用箭头函数,如果非要用，请把this改为vm)
                参数详情：
                    参数1：代表要监视的属性名字
                    参数2：代表想要做的相关事情，形参为val,即lastname
                const vm = new Vue({
                    ...
                })
                vm.$watch('lastname',function(val,oldVal){
                        this.fullname3 = this.firstname + '_' + val;
                    },
                    // 下面的immediate表示该回调将会在侦听开始之后被立即调用，可以不写
                    {immediate: true}
                )
    ★★★★★★ 详情参考04vue的计算属性 ★★★★★★
    拓展：
        计算属性computed和watch的区别？(面试题)
            1)当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，
                都要重新计算；
            2)当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，
                限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
            3)简单的说：computed具有缓存特性，只能执行同步，而watch是可以执行异步操作的
        computed 、watch、created 、mounted 的先后顺序？
            ①、在watch设置immediate为 true 的时候, watch =>created=> computed => mounted
            ②、在watch设置immediate为 false的时候, created => computed => mounted => watch
六、vue中的样式操作
    ·class操作
        1.直接定义(★项目用的最多)
            <p :class='cls1'></p>
        2.通过对象的方式定义(意思是是否让p标签应用这个‘cls’这个class类名)
            <p :class="{cls:isTrue}">呵呵</p>
        3.使用数组的方式定义(把claA,claB,claC定义在data中，值为class类名)
            <p :class="[claA,claB,claC]">呵呵</p>
        4.使用数组和静态值(不在定义在data中，而是直接从style中读取)
            <p :class="['cla1','cla2','cla3']">呵呵</p>
        5.两种class共同使用
            <p class="cls1" :class="cls2"></p>
    ·style操作
        1.书写多个样式时，采用对象方式
            <p :style="{color:myColor,xxx:xxx}">呵呵</p>
        2.动态操作设置键值，采用数组的方式(在data中设置myColor时，应该myColor:{color:'cyan'})
            <p :style="[myColor]">呵呵</p>
七、vue的事件的处理
    ·简单事件
        如果@click的事件很简单，可直接定义在@click的表达式中，如
            @click="num+=1;"
    ·复杂事件
        由于许多事件处理器的逻辑很复杂，所以把 JavaScript 代码都保存在 v-on 属性的值中是不可行的做法。
        这就是为什么 v-on 还可以接收要调用的方法名。
    ·复杂事件的传参
        1.只传必要的参数
            @click="clk(必要参数)"
            data中:
                clk(data){
                    console.log(data);
                }
        2.既要必要参数又要事件参数event
            @click="clk(必要参数,$event)"
            data中:
                clk(data,event){
                    console.log(data,event);
                }
        3.只传$event
            @click="clk($event)"
            data中:
                clk(event){
                    console.log(event);
                }
        4.不传参
            @click="clk"
            data中:
                clk(event){
                    console.log(event);
                }
    ·事件修饰符(修饰符可以链式调用)
        .prevent     阻止默认跳转行为                           (★很重要)
        .stop        阻止事件冒泡(阻止父亲，爷爷，曾爷爷的事件)   (★很重要)
        .capture     添加事件监听器时使用事件捕获模式(不是给要点击的元素添加，而是给其他父辈元素添加)
        .self        和stop的区别是：它只会阻止本身的冒泡，即父元素的事件，其他的它不管
        .once        事件只触发一次
        .passive     用于滚动事件中，注意的是该行为是立即发生的
    ·按键修饰符(更多查看文档)
        .enter or .13 代表键盘事件中当用户按下enter键执行的回调
        这里列出所有vue提供的按键修饰符
        .enter
        .tab
        .delete (捕获“删除”和“退格”按键)
        .esc
        .space
        .up
        .down
        .left
        .right
        还可以自定义按键修饰符别名，通过全局 config.keyCodes 对象设置：
            // 可以使用 `v-on:keyup.f1`
            Vue.config.keyCodes.f1 = 112
    ·内置修饰符(表单修饰符)
        ·lazy   默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：
                    eg: <input v-model.lazy="msg" />
        ·number 用户输入自动转换为数字
                    eg: <input v-model.number="age" />
        ·trim   如果你想要默认自动去除用户输入内容中两端的空格，你可以在 v-model 后添加 .trim 修饰符
                    eg: <input v-model.trim="msg" />
十、vue中的生命周期
    介绍：
        vm实例在创建的时候就会产生自己的生命周期(一共有11个回调函数(也叫作钩子),)
    1.初始化状态阶段
        ·beforeCreate()
            data:     没有(undefined)
            事件:     没有(undefined)
            $el:      没有(undefined)
            DOM:      无法访问
            说明：
                在实例创建以前调用
        ·created()
            data:     有(能修改数据，但不会触发updated beforeUpdate钩子函数)
            事件:     有
            $el:      没有
            DOM:      无法访问
            此阶段可以发送ajax请求了！！！
            说明：
                实例被创建完成后调用
        ·beforeMount()
            data:     有(能修改数据，但不会触发updated beforeUpdate钩子函数)
            事件:     有
            $el:      没有
            DOM:      无法访问(虚拟dom已经存在)
            render函数首次被调用！！！
            说明：
                页面将要被渲染，相关的render函数首次被调用，该钩子在服务器端渲染期间不被调用。
        ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        ★    注意：在beforeMount和mounted之间隐藏了一个render函数，千万不能写，会覆盖系统函数    ★
        ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        ·mounted()
            data:     有(能修改数据，且会触发updated beforeUpdate钩子函数)
            事件:    有
            $el:      有
            DOM:      可以访问
            说明：
                页面渲染完毕时触发(★非常常用，相当于react的componentDidMount)
                用处：发送ajax请求, 启动定时器等异步任务
    2.更新状态阶段(多次触发)
        ·beforeUpdate()
        ·updated()
            当data的数据被修改时触发，会重新渲染页面

    3.销毁vue实例阶段
        通过vm.$destory()方法可以干掉vm实例，此时在vm销毁之前会自动触发beforeDestory函数，销毁之后触发destoryed函数
        ·beforeDestory()
            (★非常常用，相当于react的componentwillUnmount)
            用途：收尾工作,如清除定时器
        ·destoryed()           -->解除绑定，销毁子组件及事件监听器
    拓展：vm.$distory()
        ★调用该方法，将要干掉vm实例对象★
    4.activate和deactivate
        分别用于keepalive组件激活和停用的时候调用
    面试题：异步请求在哪个生命周期钩子发请求最好？
        异步请求在哪个阶段都可以调用，因为会先执行完生命周期的钩子函数之后，才会执行异步函数，但如果考虑用户体验方面的话，
        在created中调用异步请求最佳，用户就越早感知页面的已加载，毕竟越早获取数据，在mounted实例挂载的时候就越及时。
    5.errorCaptured
        当捕获一个来自子孙组件的错误时被调用。(很少用)
十一、vue中的过渡和动画
    ·介绍(以下的xxx代表transition标签的name属性)
        1.从无到有、从隐藏到显示的三个阶段(即三个选择器)
            .xxx-enter{}
            .xxx-enter-active{}
            .xxx-enter-to{}
        2.从有到无，从显示到隐藏的三个过程(即三个选择器)
            .xxx-leave{}
            .xxx-leave-active{}
            .xxx-leave-to{}
    ·具体操作
        1)将需要过度的元素用transition包裹起来，并自定义一个name属性，值为xxx
        2)在style样式中用上上面的6个选择器，如下
            .xxx-enter-active,
            .xxx-leave-active{
                transition: opacity 1s;
            }
            .xxx-enter,
            .xxx-leave-to{
                opacity: 0;
            }
十二、vue中的过滤器
    ·介绍：
        在vue1.0版本中有自己的过滤器：filter
        但在vue2.0版本中所有的过滤器都干掉了，如果要用则需要自己定义
    ·过滤器的作用
        主要对要显示的数据进行特定格式化后再显示。如日期进行格式化
    ·注意事项：
        并没有改变原本的数据, 只是产生新的对应的数据(相当于生成一个副本并修改这个副本)
    食用方法：
        ·全局过滤器
            1)定义filter方法(-->★写在vm实例的上面，不然报错)
                Vue.filter('过滤器名字',value=>{
                    //这里需要结合其他事件库进行操作，如monoent.js
                    return monent(value).format('YY-MM-DD hh-mm-ss');
                })
            2)将过滤器与数据进行相关联
                {{time|过滤器名字}}
        ·局部过滤器
            1)在data同级下定义一个filters
                filters: {
                    filterTime(val){
                        if (val === null || val === '') {
                            return '暂无时间'
                        } else {
                            // val 为表格内取到的后台时间
                            const d = new Date(val)
                            const month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
                            const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
                            const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
                            const min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
                            const sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
                            const times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec
                            return times
                        }
                    }
                }
            2)然后再在使用的地方
                <div>{{ time | filterTime }}</div>
十三、vue中的自定义指令(custom instruct)(了解！！！)
    1.全局指令(跟vue过滤器一样，同样写在vm外面)
        Vue.directive('指令名字如uppercase',function(el,binding){
            // 参数说明↓
            // el代表那个被自定义指令绑定的标签
            // binding是一个对象(无法console.log)，里面有很多属性，binding.value代表向指令传入的值(data中的msg)
            el.innerHTML = binding.value.toUpperCase();
        })
    2.局部指令(在vm实例中写)
        data:{
            el: "#app",
            data:{
                msg: 'i love you'
            },
            directives:{
                //★注意加s
                'uppercase': function(el,binding){
                    el.textContent = binding.value.toUpperCase();
                }
            }
        }
十四、vue中的自定义插件(了解)
    使用步骤：
        1.自己定义好插件并引入
        2.声明使用插件
            Vue.use(myPlugin);
十五、vue脚手架(★具体可在印记中文网中搜vue-cli★)
    ·老版本2.x
        1.全局安装
            npm i vue-cli -g
        2.在你的项目根目录下使用命令(测试的以及紧跟下面的一条问题选n，其他都是yes)
            vue init webpack myItem
        -----这个时候就下载好了可以用了，可通过以下命令使用----------
            npm run dev       运行项目命令(npm下载的)   ==>但不会自动打开浏览器
            npm run build     打包，产生dist目录
            serve dist        运行打包文件
        3.自动打开浏览器
            找到config-->index.js-->18行的autoOpenBrowser改为true
    ·新版本3.x
        前提：
            关于旧版本
            Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，
            你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。
        1.全局安装
            npm install -g @vue/cli   或者   yarn global add @vue/cli
        2.在指定文件夹打开cmd
            vue create xxx


    ★★★注意事项★★★★
    父组件引入了子组件，必须在exprot default 里面注册
        export default {
            name: '父组件名字',
            components: {
                子组件名称
            }
        }
十六、组件之间的通信方式
    ·方法有哪些？
        ①、props --------------------------->用于父子组件(父传子)
            介绍：
                用于父组件给子组件传递数据
            使用：
                父组件中：
                    给子组件添加一个自定义属性，如↓
                        <Son :xxx="xx"></Son>
                子组件中：
                    在export default对象中添加props属性(相当于声明)，如↓
                        export default {
                            name: 'Son', 
                            props: ['defined']
                        }
                拓展：props验证写法：
                    1)数组的方式
                        props: ['dataBase']
                    2)对象的方式
                        props: { dataBase: Array }
                    3)嵌套对象的方式
                        props: {
                            dataBase: {
                                type: Array,
                                required: true,
                                default: ()=>({})    // 默认值如果是数组或者对象，默认值必须是一个函数来返回
                            }
                        }
            ★注意：props适用于父传子，如果子传父则应该在父组件中定义方法，子组件调用父组件传递的方法从而通信
        ②、自定义事件的方式------------------>用于父子组件(父传子)
            介绍：
                即自己定义的事件，也有事件绑定，也有对应的回调函数，但是，这个事件想要让回调函数的代码执行，必须要手动触发。
                订阅方自定义是按，派发方使用vm.$emit('clk',xxx)
            如何在vue中手动触发自定义事件并执行回调函数？
                this.$emit('事件名字',参数),通过该方法把参数带上，父组件得到子组件带的参数从而更新数据
            使用：
                父组件中:
                    ①、在父组件添加@xxx="definedFunc"
                    ②、像以前一样把definedFunc方法定义在父组件methods中,该处为形参
                子组件中：
                    ①、直接在要用该方法的代码里添加@click="this.$emit('xxx',要用到的实参)"

                        ★注意：其中的this指的是vueComponent,即该组件对象
            总结：
                .native说明：
                    如果组件的自定义事件中加了native,那么就和子组件没什么关系了,如果@xxx,这个xxx不是原生DOM事件，那么就没意义
                ·原生事件(直接触发)
                    1.针对于普通标签(满足条件：原生DOM中有)                       @click="clk"
                    2.针对于组件标签(满足条件：原生DOM中有，并且有native修饰的)    @click.native="clk"
                ·自定义事件(需要手动触发)
                    1.针对于普通标签：该事件原生DOM中没有，是程序员自己定义的，该事件的回调函数肯定应该是手动分发的
                    2.针对于组件标签：不管该事件在原生DOM中有没有，没有使用.native进行修改

        ③、pubSub消息订阅---------------------->任意组件
            安装：npm i pubsub-js
            使用：
                想要数据的那一方(订阅方):
                    ①、引入import PubSub from 'pubsub-js'
                    ②、像以前一样把defined方法定义在methods中
                    ②、在组件渲染完就要订阅消息，即在mounted方法中订阅
                        mounted(){
                            //第一个参数可以随意取，但接受方需要这个名字才能拿到这里订阅的数据
                            //msg代表 '发送数据名',data代表要传递给xxx方法的数据(这个data后面的派发方会传给你)
                            var token = PubSub.subscribe('发送数据名',(msg,data)=>{
                                //这里写要做的事情
                                this.xxx(data)
                            })
                        }
                传数据的那一方(发送方)：
                    ①、引入import PubSub from 'pubsub-js'
                    ②、在对应的methods中派发消息
                        //第一个参数要和订阅方保持一致，第二个参数是给订阅方的this.xxx要的数据
                        //这样一来，就实现了孙子组件使用了爷爷组件的this.xxx方法了
                        PubSub.publish('发送数据名',给订阅方传的数据)

        ④、事件总线------------------------------->任意组件(vue3已移除)
            简单介绍：在任意的一个组件中绑定事件，其他任意组件都可以触发这个事件
            方法汇总：
                *vm.$on()       -------事件总线的绑定
                *vm.$off()      --------解绑事件总线，如果不传参，则销毁所有通过事件绑定的方法，传参，则销毁那个方法
                *vm.$emit()      -------分发事件总线
            使用：
                ①、在main.js中定义一个事件总线,这样一来，其他任意组件都可以通过事件总线使用vm实例对象了(为什么要这样做？因为其他组件无法拿到这个new Vue实例)
                    Vue.prototype.$bus = new Vue()     // 注意$bus是自定义的属性，说白了就是把这个实例对象保存起来
                ②、把方法定义在methods中
                ③、事件总线的分发(发送方,在mounted或者method中发送)
                    this.$bus.$emit('自定义名字',给$on方法传递的参数)
                ③、想要数据的那一方(订阅方,在mounted中定义并触发methods中的方法)：
                    this.$bus.$on('自定义名字',(data)=>{
                            //想要做的事情，比如调用那个methods的方法
                            this.xxx(data)
                        })
        ⑤、插槽----------------------------------->父子组件(暂且学的是具名插槽，也称命名插槽)
            作用：便于对结构的管理进行组装(详情见插槽的拓展)
            使用：
                1.子组件
                    <slot name="left"/>
                    <slot name="center"/>
                    <slot name="right"/>
                2.父组件
                    ①、给相对应的html添加slot属性，slot="left"
                        注意：2.6.0版本已废弃，新版本是 v-slot="left" ,简写是 #left
                        ★★★
                        ★注意 v-slot 只能添加在 <template> 上 (只有一种例外情况)，这一点和已经废弃的 slot attribute 不同。
                        ★  例外情况是：当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用
                        ★
                        ★
                    ②、再将子组件的computed属性拿过来定义在父组件中
        ⑥、vuex----------------------------------->任意组件
            ★后面详细介绍...
        ⑦、Vue.observable()----------------------------------->任意组件   // Vue 2.6新增
            介绍：相当于一个迷你版的vuex
            使用：
                ①、在src目录下创建一个store.js文件，包含一个 store和一个 mutations，分别用来指向数据和处理方法。
                    import Vue from 'vue';

                    export const store =Vue.observable({count:0,name:'李四'});
                    export const mutations = {
                        setCount(data){
                            store.count = data;
                        },
                        changeName(data){
                            store.name = name;
                        }
                    }
                ②、在组件中：
                    // 引入迷你版的vuex
                    import {store,mutations} from '@/store'
                    // 使用
                    methods: {
                        setCount: mutations.setCount
                    }
                    // 在事件中：
                    @click="setCount(1)"
        ⑧、provide和inject----------------------------------->祖孙组件(包括父子)(父传子孙)
            介绍：简单的来说就是在父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量
                需要注意的是这里不论子组件有多深，只要调用了inject那么就可以注入provider中的数据。
                而不是局限于只能从当前父组件的prop属性来获取数据。
            使用：
                祖辈组件中：
                    export default {
                        name: 'YeYe',
                        components: {
                            Child
                        },
                        provide: {
                            foo: 'demo'      // 向子孙传递了一个字符串'demo'
                        }
                    }
                孙子组件中：
                    <template>
                        <div>{{ sth }}</div>
                    </template>
                    export default {
                        name: 'YeYe',
                        components: {
                            Child
                        },
                        inject: ['foo'],
                        data(){
                            return {
                                sth: this.foo
                            }
                        }
                    }
        ⑨、$parent和$children----------------------------------->父子组件(父传子)(Vue3中移除了$listeners)
        ⑩、$attrs和$listeners------------------------------------>父子组件(父传子)(vue3中移除了$listeners)

十七、各种通信的原理代码
    略...

十八、Mint-UI
    ·什么是mint ui?
        基于vue的移动端组件库
    ·安装
        npm i mint-ui
    ·使用
        ①、在main.js中引入如下内容
            import Vue from 'vue'
            import MintUI from 'mint-ui'
            import 'mint-ui/lib/style.css'
            import App from './App.vue'

            Vue.use(MintUI)

            new Vue({
            el: '#app',
            components: { App }
            })

十九、vue-Resource技术
    ·简单介绍：
        vue插件, 非官方库, vue1.x使用广泛(原来的方式)
    ·下载
        npm install vue-resource --save
    ·使用
        // 在main.js中引入模块并声明式插件
        import VueResource from 'vue-resource'
        Vue.use(VueResource)

        // 在需要用的组件的mounted函数中发送ajax请求
        this.$http.get('/someUrl')
            .then((response) => {
                console.log(response) //返回结果数据
            }
            .catch(err=>{
                console.log(err)
            })
二十、axios在vue中的使用
    ·下载
        npm install axios --save
    ·使用
        // 在需要用的组件的组件中引入
        import axios from 'axios'
        axios.get(url)
            .then(response=>{
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })

        //以下是简化版
        async mounted() {
            try {
                const response = await axios.get(https://api.github.com/search/repositories?q=v&sort=stars`)
                const result = response.data.items[0]
                // 更新状态数据
                this.repUrl = result.html_url
                this.repName = result.name
            } catch (error) {
                console.log(error)
                }
        }
二十一、Vue Router 的使用
    ·什么是Vue Router?
        Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用(SPA)变得易如反掌
    ·安装
        npm i vue-router
    ·基本配置
        ①、创建一个router目录，里面有个index.js文件
        ②、在index.js文件中写入如下内容
            import Vue from 'vue'
            import VueRouter from 'vue-router'
            // 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
            Vue.use(VueRouter)
            //并向外暴露一个路由器对象
            export default new VueRouter({
                //在这里进行路由的配置
                routes: [
                    {
                        path: '/About',
                        component: About
                    }
                ]
            })
        ③、暴露出去的路由器对象,还需要在main.js中进行注册
            //先引入router
            import router from './router'
            //在注册
            new Vue({
                router,
            })
    ·说明：
        ①、防止跳转问题
            <router-link to="/about"></router-link>标签是为了取代a标签跳转问题,它有一个to属性，表示要跳转到那里
        ②、去除url地址栏的/#/
            mode: 'history',默认是hash模式，为了没有那个#改成history模式
        ③、router-link标签一般配合router-view标签来使用,使用router-view说明进入下一级路由
        ④、重定向
            在router的路径中额外添加一条,之后便可重定向到那里
                {
                    path: '/',
                    redirect: '/about'
                }
    ·命名视图
        有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，
        这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有
        设置名字，那么默认为 default。如下例子：(注意component要加s)
            {
                path: '/category/cateList',
                components: {
                    default: Category,
                    Item
                },
            },
            <router-view name="Item"></router-view>
    ·路由的分类：
        1.声明式路由，直接写router-link标签来实现跳转
        2.编程式路由，通过$router.push、$router.back、$router.replace
    ·二级路由的写法：
        二级路由必须写在它的父级的里面，如下写法：
            {
                path: '/home',
                component: Home,
                children: [
                    {
                        path: '/home/msg',  // 二级路由的path也可以直接写成path: 'msg'
                        component: Message
                    },
                    ...
                ]
            }
    .路由样式：
        
    ·路由传参：
        1.通过params传值 (不显示在url上的方式页面刷新数据会丢失)
            params传参：分为两种情况：
                一种是值在url中显示，另外一种是值不显示在url中。
            ①、显示在url上的
                路由配置：
                    {
                        path: '/detail/:id/',
                        name: "detail",            // 可以不加，但传参用到name时(params第二种传参)，需要加上name值
                        component: detail
                    }
                传参：
                    声明式：<router-link to="/detail/123"></router-link>
                    编程式：this.$router.push(`/detail/${id}`)
                获取：
                    声明式：$route.params.id
                    编程式：this.$route.params.id
            ②、不显示在url上
                路由配置：
                    {
                        path: '/detail',
                        name: "detail",
                        component: detail
                    }
                传参：
                    声明式：<router-link :to="{name:'detail',params:{id: 123}}">page2</router-link>
                    编程式：this.$router.push({name:'details',params:{id: 123}})
                获取：
                    声明式：$route.params.id
                    编程式：this.$route.params.id
                注意:
                    1）传参是this.$router,接收参数是this.$route,这里千万要看清了！！！
                    2）使用params传参只能用name来引入路由，即push里面只能是name:’xxxx’,
                        不能是path:'/xxx',因为params只能用name来引入路由，如果这里写成了path，
                        接收参数页面会是undefined！！！
                    3) params是路由的一部分,必须要在路由后面添加参数名。
        2.通过query传值(页面刷新不会丢失数据)
            query传参，相当于get请求
                地址栏会显示?xxx=xxx
            路由配置：
                {
                    path: '/detail',//这里不需要参入参数，参见上面的params写法
                    name: "detail",
                    component: detail//这个details是传进来的组件名称
                }
            传参：
                声明式：
                    写法一、<router-link :to="{ path: '/details', query: { id: 123 }}">点击按钮</router-link>
                    写法二、<router-link :to="{ name: 'details', query: { id: 123 }}">点击按钮</router-link>
                    注意：path中的‘/’可写可不写
                编程式：
                    写法一、this.$router.push({path:'details',query:{id:123}})
                    写法二、this.$router.push({name:'details',query:{id:123}})
            获取：
                声明式：$route.query.id
                编程式：this.$route.query.id
        3.通过meta传值
            路由配置：
                {
                    path: '/detail',
                    component: detail,
                    meta: {
                        id: 123
                    }
                }
            获取：
                声明式：$route.meta.id
                编程式：this.$route.meta.id
        4.通过props传值
            说明：
                props传参方式，解耦组件，不适用$route对象方式来获取参数，直接在组件内部使用参数，它会把params参数存入到props对象
                中，然后就可以使用props一样的方式如props: ['id']拿到传的参数了
            ①、布尔写法
                路由配置：
                    {
                        path: '/detail/:id',
                        component: detail,
                        props: true
                    }
                    父组件中：
                        <router-Link to="/login/123"></router-Link>
                    子组件中：
                        export default {
                            props: ['id']
                        }
                获取：
                    声明式：id
                    编程式：this.id
            ②、对象写法：
                路由配置：
                    {
                        path: '/detail',
                        component: detail,
                        props: {
                            id: 123
                        }
                    }
                    父组件中：
                        <router-Link to="/login"></router-Link>
                    子组件中：
                        export default {
                            props: ['id']
                        }
                获取：
                    声明式：id
                    编程式：this.id
            ③、函数写法：
                路由配置：
                    {
                        path: '/detail',
                        component: detail,
                        props: ()=>({id: 123})
                    }
                    子组件中：
                        export default {
                            props: ['id']
                        }
                获取：
                    声明式：id
                    编程式：this.id
        拓展：
            query和params路由传参的区别：
                1.刷新问题。params传参在url没有显示时刷新会丢失数据，而query不会丢失数据。
                2.引入问题。params传参要用name引入，而query传参可以用name,也可以用path。
                3.传参问题。params是路由的一部分,写了就必须得传。query是拼接在url后面的参数，写了不传也没关系。
二十二、vuex的基本使用
    ·什么是vuex?
        对vue应用中多个组件的共享状态进行集中式的管理(读/写)
    ·应用场景
        多个组件要用到公共的状态数据的时候
    ·安装并初始化
        ①、下载：npm i vuex
        ②、创建一个vuex文件夹，里面创建一个store文件,书写如下初始化代码
            import Vue from 'vue'
            import Vuex from 'vuex'
            //声明使用
            Vue.use(Vuex)
            //实例化Vuex对象，并暴露
            export default new Vuex.Store({
                state:{},                      //包含了多个状态数据的对象
                mutations:{},                 //包含了多个直接修改状态数据的方法的对象
                actions:{},                  //包含了多个间接修改状态数据的方法的对象
                getters:{}                  //包含了多个状态数据的计算属性的getter方法的对象
            })
        ③、main.js中引入store对象并挂载
            import store from './vuex/store.js'
            new Vue({
                store
            })
    ·详细介绍
        1.state模块
            1)主要用来管理状态数据(data里面的数据)的对象
            2)外部通过{{$store.state.xxx}}来获取状态数据
        2.mutations模块
            1)更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
                Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
                这个回调函数就是我们实际进行状态更改的地方，★★--并且它会接受 state 作为第一个参数--★★
            2)mutation 必须是同步函数。为什么？因为我们在用debug调试的时候，devtools 不知道什么时候回调函数实际上被调用
            3)外部通过this.$store.commit('定义在mutation里面的方法名')
        3.actions模块
            1)actions提交的是 mutation，而不是直接变更状态。
            2)actions可以包含任意异步操作以及同步操作
            3)官方建议我们不应该直接通过mutation去修改数据，而是把所有方法都写在actions上，因为actions不受条件约束
            4)actions函数接受一个与 store 实例具有相同方法和属性的 context 对象，但并不意味着context===store本身！
                通过context.commit('mutation里面的方法名')来调用mutation的方法
            5)外面通过this.$store.dispatch('定义在actions里面的方法名')来触发更新
        4.getters模块
            1)包含了多个状态数据的计算属性的getter方法的对象
            2)外部通过{{$store.state.xxx}}方法来获取计算属性的值
        5.modules模块
            通常由于后期可能状态数据比较多，我们需要对这些数据进行分类，可以按照组件、功能等方式分类
    ·vuex中的简化
        ·简化1:
            ①、mapState     --->为组件创建计算属性以返回 Vuex store 中的状态
                mapState如何简化？
                    import { mapState } from 'vuex'
                    computed: {
                        ...mapState['data里面的状态名如count']
                    }
            ②、mapGetters    --->为组件创建计算属性以返回 getter 的返回值
                用法同上
            ③、mapMutations  --->创建组件方法提交 mutation
                methods: {
                    ...mapMutations(['INCREMENT'])
                }
            ④、mapActions    --->创建组件方法分发 action
                用法同上，但是值得注意的是：如果methods里面的回调函数的方法名如果与action里面定义的方法名(字符串的那个方法名)不一致，
                则需要写成对象模式，如下
                ...mapActions({
                    increse: 'increment',
                })
            拓展：当你用上modules模块后，那么mapState方式也需要改写了，如下：
                computed: {
                    // 其中shops是你存在vuex的state中的数据
                    ...mapState({
                        shops: state=>state.msite.shops
                    })
                }
        ·简化2：
            需要将那些字符串的方法定义在一个mutation-types.js中
            具体操作：
                import { INCREMENT } from './mutation-types.js'
                const mutations = {
                    [INCREMENT](state){
                        state.count++
                    }
                }
    ·vuex的核心思想：
        ①、首先，vuex总共有4大核心模块(module模块另外讲),state模块主要存放初始化的状态(此时的状态基本上是自己定义出来的),
        我们通常在组件的mounted钩子中通过this.$store.dispatch触发actions里面的方法,而一般情况下我们会在该模块调用封装好的
        ajax请求的方法，从而得到数据，再通过commit方法(这个时候把刚刚得到的ajax数据传过去)触发mutations的方法，这个时候，
        mutations就会直接通过state.自己定义的状态 = ajax数据，这样一来，state的状态就改成我们想要的状态了。
        ②、这个时候状态改好之后，



★★★★★★★★★★★★★ 02、剖析vue源代码 ★★★★★★★★★★★★★★★★★★★
前提：主要介绍gitHub上的一位博主MVVM的源码
一、数据代理
    ·什么是数据代理？
        某个对象下的属性，可以通过另一个对象直接访问
    ·具体原理
        创建Vue的实例的时候，获取到配置对象中的data对象，遍历data对象中的所有的属性，
        通过Object.defineproperty()为vm实例对象添加data中的所有的属性，代理者：vm,
        被代理者data
    .模板解析之表达式：(模板解析之指令(事件指令和一般指令))
        创建Vue的实例的时候，通过Compile的对象，保存data中的数据，然后通过配置对象中的el
        获取到页面的容器对象，如果没有el则把body作为模板容器，创建文档碎片对象，遍历容器对象
        中所有的子节点，把所有的子节点全部添加到文档碎片对象中，初始化，把文档碎片对象中所有
        子节点全部进行遍历，分别判断当前的节点是标签还是文本,有如下几种情况：
        ·文本的情况：
            如果是文本(还需要判断当前的文本是否和差值的正则匹配)，如果匹配则最终调用bind方法，
            内部需要调用updater对象中的相关方法，进行标签中相关的内容的替换(需要获取vm实例对象
            及当前这个要替换的表达式的属性的值)
        ·标签的情况：
            如果是标签，则遍历该标签所有的属性，判断该属性是不是指令，再判断指令是事件指令还是普通指令
            如果是事件指令，干掉v-开头，再干掉：,剩下的是事件的名字及表达式(该事件对应的回调函数)，通过
            这个表达式去vm中的methods中这个方法的代码，然后通过addEventListener方法，为当前的节点绑定事件
            如果是普通指令，找对应的CompileUtil中的相关的方法，最终执行的是updater对象中相关的方法，然后
            进行替换操作。
            **无论是普通指令还是事件指令，最终都要把标签上的相关属性删除！


★★★★★★★★★★★★★ 03.stylus的使用 ★★★★★★★★★★★★★★★★★★★
1.下载
    npm i stylus -g
2.使用
    分为两种情况：
        ①、index.styl和css属于同一级目录
            在css同级的目录下创建一个index.styl后缀名的文件，在根目录下打开终端，输入 stylus -w index.stylus -o css 即可转化css
        ②、index.styl和index.css属于同一级目录
            在css文件夹中打开终端，输入 stylus -w index.stylus css目录的绝对路劲
3.脚手架的使用
    ★需要额外安装两个插件
    yarn add stylus stylus-loader


★★★★★★★★★★★★★ 04.新版vue脚手架 ★★★★★★★★★★★★★★★★★★★
1.关于老版本换新本版
    Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，
    你需要先通过如下命令之一卸载它！
        npm uninstall vue-cli -g 或 yarn global remove vue-cli
2.可以使用下列任一命令安装这个新的包：
    npm install -g @vue/cli
    # OR
    yarn global add @vue/cli
3.如果两个版本都想用，你可以全局安装一个桥接工具
    npm install -g @vue/cli-init
4.总结创建脚手架命令
    老版本 vue init webpack myItem
    新版本 vue create myItem
5.下载完后相关命令(新版脚手架)


★★★★★★★★★★★★★ 05.vue的拓展知识 ★★★★★★★★★★★★★★★★★★★
一、插槽的拓展
    ·普通插槽
        子组件中：
            <slot>我是子组件插槽的内容</slot>
        父组件中：
            import Son form './son'
            在template中↓
                <Son>如果我在这里写，我将取代子组件slot里面的内容</Son>
        情况：
            ①、如果父组件Son不写内容，则当做普通组件展示
            ②、如果父组件Son写内容，则会把slot的内容替换掉
        总结：
            使用普通插槽(没有名字的)，直接传值即可，以实现父组件向子组件传递数据
        适用场景：
            开发中很少使用slot来通信，一般用于公共组件并且只修改一个地方的场景
    ·具名插槽
        子组件中：
            <slot name="top">我是上面</slot>
            <p>分割线</p>
            <slot name="bottom">我是下面</slot>
            <slot></slot>     // 不带name，默认为：<slot name="default"></slot>
        父组件中
            import Son form './son'
            在template中↓
            ①、情况1，和子组件显示一样的内容
                原先写法：(已经废弃)
                <Son>
                    <p slot="top"></p>
                    <p slot="bottom"></p>
                </Son>
                现在写法：
                <Son>
                    <template #top>     // v-slot:top 的缩写为#top
                        <p></p>
                    </template>
                    <template #bottom>
                        <p></p>
                    </template>
                </Son>
            ②、情况2，还是和子组件一样的内容，h1不生效
                原先写法：(已经废弃)
                <Son>
                    <p slot="top"></p>
                    <h1>呵呵呵哒</h1>              // 任何没有带slot的属性的标签会被视为默认插槽的内容。但如果子组件没有<slot></slot>标签，则不生效
                    <p slot="bottom"></p>
                </Son>
                现在写法：
                <Son>
                    <template #top>
                        <p></p>
                    </template>
                    <h1>呵呵呵哒</h1>              // 没有默认插槽不生效
                    <template #bottom>
                        <p></p>
                    </template>
                </Son>
            ③、情况3,父组件向子组件传值了,h1依然不生效
                原先写法：(已经废弃)
                <Son>
                    <p slot="top">修改了</p>
                    <h1>呵呵呵哒</h1>
                    <p slot="bottom">处安置了</p>
                </Son>
                现在写法：
                <Son>
                    <template #top>
                        <p>修改了</p>
                    </template>
                    <h1>呵呵呵哒</h1>
                    <template #bottom>
                        <p>处安置了</p>
                    </template>
                </Son>
        总结：具名插槽传值，只能使用名字，其他内容是不会传值的(标签名字,标签位置这些都没有关系,只要有slot="插槽名字"即可传值)
        适用场景：
            一般适用于公共组件并且只修改两处或者多处地方的场景 
    ·作用域插槽 
        子组件中：子组件会通过:data="data"向父组件传递数据
            <slot :suibian="datas">{{datas}}</slot>     // 注意：suibian是自定义的
        父组件中：父组件通过template的模板下的slot-scope='xxx'得到子组件的数据，数据就存在xxx中，通过xxx.data获得
            <Son>
                <template slot-scope="xxx">      
                    <p>{{xxx.suibian.datas}}</p>
                </template>
            </Son>
        !!!注意：slot-scope即将废弃，推荐用新语法v-slot代替slot-scope
        父组件中：
            <Son>
                <template v-slot:default="xxx">          // default可以省略，此时xxx === { suibian: { datas: [...] } }         
                    <p>{{xxx.suibian.datas}}</p>
                </template>
            </Son>
        总结：
            主要作用是子组件向父组件传递数据，但一般开发中也是很少用，主要出现在面试中
二、mixin 混合
    ·介绍
        Vue中的混合，会把兄弟组件的公共部分抽离出来，放在一个js文件中，在组件中引入，并注册混合就可以使用了(不是很常用)
    ·规则
        1.同名★钩子★函数时，两个都会被调用，只是mixins的钩子会优先于组件自身的钩子调用
        2.数据对象(data)在内部会进行递归合并，并在发生冲突时以组件数据优先。
        3.值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。
    ·使用
        mixin.js中：
            export default {
                data () {
                    return {
                        name1:'小明'
                    }
                },
                computed: {
                    length(){
                        return this.name2.length
                    }
                }
            }
        子组件中：
            import mixin from './mixin.js'
            export default {
                mixins:[mixin],
            }
三、组件的分类
    ·动态组件
        1.介绍
            和路由组件很相似，都是用于切换组件的，但不同的是url不会发生改变,我们将这样的子组件称之为动态组件
        2.具体用法
            ①、父组件的template模板上
                <div>
                    <button @click="click">切换组件</button>
                    <component :is="RouterName"></component>   // component是一个内置组件，有一个is属性
                </div>
            ②、父组件的script模板中
                export default new Vue({
                    data(){
                        return{
                            RouterName: 'Son1'               // 这里的current就是上面is的绑定值，它的属性值为子组件的名字
                        }
                    }
                })
            ③、添加一个click方法，改变RouterName的值即可实现动态组件
    ·缓存组件
        1.介绍
            keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，
            由于是一个抽象组件，所以在v页面渲染完毕后不会被渲染成一个DOM元素
        2.使用
            在动态组件的具体用法下把<component :is="current"></component>通过<keep-alive></keep-alive>标签包裹即可
            <keep-alive>
                <component :is="current"></component>
            </keep-alive>
        3.区别
            动态组件都显示一个组件，不同的是keep-live会把已经显示过的组件缓存起来，这样性能会得到优化
        4.属性
            ·include 值为组件的name值。只有匹配的组件的会被缓存。
            .exclude 值为组件的name值。只有除写的组件以外的组件会被缓存。相当于include的取反
            ·max     要缓存组件的最大数量，如果缓存的实例数量即将超过指定的那个最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。
        注意：！！！
            如果想让include和exclude生效，必须给组件设置name属性
    ·异步组件
        介绍：
            一般的，我们引入组件都是通过静态的方式直接引入组件的，这种引入方法叫做静态引入，
            在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。
            这个时候我们可以用异步组件来解决此问题
        特点：异步组件会单独打包
            ·总共有三种方法：
                -----具体看vue.js官方文档-----
                其中，通过import from 打包的方式我们称之为静态打包，通过异步组件的require\import方式来打包的称之为动态打包
    --------------------华丽分割线-----------------
    除此之外还有之前学的：
    ·普通组件
    ·路由组件
    ·公共组件
四、vue中的原生事件和自定义事件
    ·原生事件
        1.针对于标签:@click="clk"  DOM中的原生事件，即系统自带的事件(不需要手动分发该事件)
        2.针对于组件：@click.native="clk" 指的是在组件上使用事件的时候，有.native修饰的(不需要手动分发该事件)
    ·自定义事件
        1.该事件系统中没有，是程序员自己定义的，该事件的回调函数肯定应该是手动分发的
        2.该事件中系统中有，但是在组件上绑定事件的时候，没有使用.native进行修改
五、双向绑定数据的实现
六、响应式数据和非响应式数据
    ·介绍
        响应式数据：vue中有一些数据，如果这些数据的值发生变化了，那么此时的界面会重新渲染(属性值修改了，浏览器界面也发生改变)
        非响应式数据：说白了就是界面不会重新渲染(修改了属性的值，但浏览器界面不会发生变化)
    ·非响应式数据的典型案例
        1.在data里面return 的外面
            data(){
                //在此处写的属性都为非响应式数据
                return(){
                    //数据
                    car: {
                        name: '奔驰'
                    }
                }
            }
        2.在methods中直接改变data中没有的数据
            data(){
                return(){
                    car: {
                        name: '奔驰'
                    }
                }
            },
            methods(){
                // 此时data中的car没有color属性，这个时候color就是一个非响应式的数据
                click(){
                    this.car.color = 'red'
                }
            }
    ·如果将非响应式数据变为响应式的(通过Vue.set()来实现)
        methods(){
            // 此时data中的car没有color属性，这个时候color就是一个非响应式的数据
            click(){
                // this.car.color = 'red'
                Vue.set(this.car,'color','blue')
            }
        }
七、vue脚手架中data为什么是一个函数，而不是一个对象？
    这样设计的目的是为了多个组件同时可以去使用，函数可以多次调用，返回的对象不会是同一个对象
八、vue-LazyLoad
    1.介绍
        一个用于vue项目中懒加载技术的插件
    2.安装
        npm i vue-lazyload
    3.使用
        在main.js中
            import VueLazyload from 'vue-lazyload'
            // 接下来注册，你可以直接写也可以写一些配置项
            Vue.use(VueLazyload,{
                preLoad: 1.3,
                error: 'dist/error.png',
                loading: 'dist/loading.gif',
                attempt: 1,
                ...
            })
        在需要使用的地方添加一个v-lazy指令
            v-lazy="food.img"   // food.img指的是原图片的地址
九、动态打包方式(用于路由组件的引入)
    1.介绍
        原先我们都是通过import from 语法一次性打包的，这样如果没有用到的文件(路由文件)也会打包，显然对性能不好，因此，我们需要优化它。
    2.具体操作
        const 组件名 =()=>import('../Site.vue')
十、路由守卫
    1.全局路由守卫
        1)全局前置路由守卫
            ·介绍
                即在在访问该路由之前所做的一些操作
            ·案例：
                比如我如果没有登录,则点击按钮时跳转到登录界面，如果登录了就跳转到那个页面
            ·使用
                const router = new VueRouter({...})
                router.beforeEach((to,from,next)=>{
                    // to -------- 代表要进入的路由
                    // from -------- 导航要离开的路由
                    // next --------- 一定要调用该方法来resolve这个钩子
                    next();
                })
        2)全局后置路由守卫
            ·不再接受next函数也不会改变导航本身
            router.afterEach((to,from)=>{
                ...
            })
    2.组件内的路由守卫
        1）beforeRouteEnter
            beforeRouteEnter (to, from, next) {
                // 在渲染该组件的对应路由被 confirm 前调用
                // 不！能！获取组件实例 `this`
                // 因为当守卫执行前，组件实例还没被创建
            },
        2）beforeRouteUpdate
            beforeRouteUpdate (to, from, next) {
                // 在当前路由改变，但是该组件被复用时调用
                // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
                // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
                // 可以访问组件实例 `this`
            },
        3）beforeRouteLeave
            beforeRouteLeave (to, from, next) {
                // 导航离开该组件的对应路由时调用
                // 可以访问组件实例 `this`
            }
        案例：
            比如我如果登录了，我再点去登陆这个按钮，那个则无效，只有你没登录才有效
            ·使用
                在组件内和methods同级书写：
                beforeRouteEnter(to, from, next){
                    // 注意这里不能获取this,因为当守卫执行前组件实例还没被创建
                    next(vm=>{
                        if(vm.$store.state.user.user._id){
                            next('/profile')
                        }
                    })
                }
                beforeRouteLeave(to,from){
                    // 做一些清除定时器操作
                    next();
                }
十一、正想代理和反向代理
十二、禅道
十三、vm.$nextTick方法
    ·介绍
        将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
    ·使用场景：经常发生在使用swiper、better-scroll的时候会出现他的身影
        场景1：结合watch使用
            watch: {
                sth(){
                    this.$nextTick(()=>{
                        new Swiper('.swiper',{
                            xxx:xxx
                        })
                    })
                }
            }
        场景2：结合vuex使用
            在触发action方法的时候，给第二个参数为一个回调函数如下
            this.$store.dispatch('xxx',()=>{
                this.$nextTick(()=>{
                    new Swiper('.swiper',{
                        xxx:xxx
                    })
                })
            })
            当然了，你需要在action模块加上callback这个参数，如下
            sth({commit},cb){
                xxx
                commit(xxx)
                typeof cb === 'function' && cb()
            }
        场景3：Promise的简化方法await + async  ====>(推荐)
            async mounted(){
                await this.$store.dispatch('xxx')
                this.$nextTick(()=>{
                    new Swiper('.swiper',{
                        xxx:xxx
                    })
                })
            }

    ·应用场景
        swiper和better-scroll在vue中使用时，创建实例对象就会在this.$nextTick里面写
十四、Mock拦截器
    ·介绍：
        拦截ajax请求，生成随机数据反馈给浏览器，此时和服务器无关,即可以不用让后端提供接口拿数据了
    ·安装
        npm i mockjs
    ·使用
        ①、在src目录下新建一个mock文件，里面放置你的 data.json 作为模板数据以及一个mock-server.js文件
        ②、在mock-server.js中：
            // 引入mockjs
            import Mock from 'mockjs'
            // 引入json数据
            import datas from 'data.json'
            // 拦截ajax请求，返回生成随机数据
            // 第一个参数：拦截的url，第二个参数，要返回的数据，类型是一个对象
            Mock.mock('/xxx1',{
                code: 0,
                data: datas.goods
            })
            Mock.mock('/xxx2',{
                code: 0,
                data: datas.foods
            })
            ...
        ③、写完后再从main.js中引入刚刚写好的mock-server.js
            import './mock/mock-server.js'
十五、@符号智能配置
    1.配置
        1)在根路径下创建一个jsconfig.json文件
        2)复制下面代码
            {
                "compilerOptions": {
                    "baseUrl": "./",
                    "paths": {
                        "@/*": ["src/*"]
                    }
                },
                "exclude": ["node_modules", "dist"]
            }
十六、显示请求进度条
    1)安装相关插件
        yarn add nprogress
    2)在请求拦截器中：
        ajax.interceptors.request.use({
            config=>{
                Nprogress.start()
                return config
            }
        })
    3)在响应拦截器中：
        ajax.interceptors.response.use({
            response=>{
                Nprogress.done()
                if(response.status === 200){
                    return response.data
                }else{
                    return promise.reject(response.data.message)
                }
            },
            err=>{
                if(err.response){
                    Nprogress.done()
                    ...
                }
            }
        })
十七、组件之间的通信(高级)
    1.$attrs和$listeners(主要用于封装组件)
        $attrs: 是一个对象，该对象包含标签(组件)上传递的所有属性(不包括prop(在子组件注册过的),emits(在子组件注册过的)class,style)
            例子：通常我们写v-bind:a="xxx"  ===  :a="xxx"   ===   v-bind="{ a: "xxx" }"
                父组件中：
                    <Son type="primary" size="small"></Son>
                    <Son type="danguage" size="medium"></Son>
                子组件中：
                    <el-button v-bind="$attrs"></el-button>
                    这样一来子组件就能获取父组件所有传递过来的属性了,即$attr => {type:'xxx',size='xxx'}           (不包括prop,class,style)
        $listeners: 也是一个对象，该对象包含标签(组件)上传递的所有自定义事件监听
            例子：同$attr,不同的是$listeners表示所有方法(即自定义事件)，$attr表示所有属性
            注意：
                1)和$attr不同的是$attr用到的是v-bind ,而$listeners用到的是v-on
                    <el-button v-on="$listeners"></el-button>
                2)click自定义事件可行，但dblclick双击事件需要加一个.native才能生效
        两者的作用：
            在封装可复用组件时，可能会接收不定数量名称的属性或者事件监听，并传递给内部子组件。
    2.$children和$parent
        $children: 获取当前父组件的所有子组件(是一个数组，里面是所有子组件VueComponent)
        $parent: 获取父组件(VueComponent)
十八、$options
    介绍：vue的实例属性$options是用来获取定义在data外的数据和方法的。
    例子：
        <script>
            export default {
            name: "Test",
            data() {
                return {
                };
            },
            //在data外面定义的属性和方法通过$options可以获取和调用
            name: "zs",
            age: 12,
            haha() {
                console.log("haha");
            },
            created() {
                console.log(this.$options.name);  // zs
                console.log(this.$options.age);  //12
                this.$options.haha();  // haha
            },
            </script>
十九、.sync(vue3中已移除)
    ·介绍
        在父子组件中，通常子级组件直接修改父级组件的数据会报警告($parent除外)，这时如果我们需要更急简便的修改父级组建的数据，
        我们可以使用.sync+prop的方式解决。
    .使用
        父组件中：
            <Son :isShow.sync="isShow"></Son>    // 给子组件传递了一个属性isShow
        子组件中：
            <template>
                <h1 v-show="isShow">我是子组件</h1>
            </template>
            export default {
                prop: ['isShow'],
                method: {
                    goBack(){
                        this.$emit('update:isShow',false)
                    }
                }
            }
二十、render函数
    ·介绍
        在vue中我们使用模板HTML语法组建页面的，使用render函数我们可以用js语言来构建DOM。因为vue是虚拟DOM，所以在拿到template模板时也要转译成VNode的函数，
        而用render函数构建DOM，vue就免去了转译的过程。当使用render函数描述虚拟DOM时，vue提供一个函数，这个函数是就构建虚拟DOM所需要的
        工具。官网上给他起了个名字叫createElement。还有约定的简写叫h。
    ·使用
        new Vue({
            el: '#app',
            ...,
            render(h) {
                return h('div', {id: 'a'}, 'hello, vue')
            },
            template: `<div>xxx</div>`,     // 无效，因为render函数优先执行
        })
    注意：
        渲染的时候，vue默认先找render中的内容进行渲染，不过没有render,则默认找template的内容，如果两者都没有，默认找el
        
二十一、vue源码解读
    ·rollup环境搭建
        安装
            npm i rollup
            npm i rollup-plugin-babel      // 相当于一个桥梁，让rollup在打包的过程的同时使得babel编译es6
            npm i @babel/core
            npm i @babel/preset-env         // 内部包含了大量的es6转es5的插件
            npm i rollup-plugin-serve -D   // 搭建本地临时服务
            npm i rollup-plugin-commonjs  // 用于自动查找文件夹下的index文件
        根目录文件创建rollup.config.js
            import serve from 'rollup-plugin-serve';
            import babel from 'rollup-plugin-babel';

            export default {
                input: './src/index.js',
                output: {
                    format: 'umd', // 模块化类型，有esModule、commonjs、amd、cmd、umd等等，其主要作用是让window上有一个window.Vue
                    name: 'Vue', // 全局变量的名字
                    file: 'dist/umd/vue.js', // 打包输出后的文件名
                    sourcemap: true, // 开启调试
                },
                plugins: [
                    babel({      // 告诉rollup用babel来转译
                        exclude: 'node_modules/**', // node_modules下的所有文件都不需要转译
                        
                    }),
                    serve({
                        open: true,   // 自动打开浏览器
                        port: 3001,   // 默认端口号
                        contentBase: '',   // 表示路径以当前目录为标准
                        openPage: '/index.html',    // 默认打开的页面
                    })
                ]
            };
        根目录创建.babelrc文件
            {
                "presets": [
                    "@babel/preset-env" // 告诉babel编译的时候具体使用哪个插件
                ]
            }










二十二、SSR技术
    ·什么是服务端渲染？
        简单来说就是将vue组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序
    ·为什么使用服务器端渲染 (SSR)？
        与传统 SPA (单页应用程序 (Single-Page Application)) 相比，服务器端渲染 (SSR) 的优势主要在于：
            ·更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
            ·更快的内容到达时间 
    ·vue ssr的简单示例
        1）安装vue-server-render
            npm i vue vue-server-renderer --save 以及
            npm i express
        2)渲染一个 Vue 实例
            // 第 1 步：创建一个 Vue 实例
            const Vue = require('vue')
            const app = new Vue({
                template: `<div>Hello World</div>`
            })

            // 第 2 步：创建一个 renderer
            const renderer = require('vue-server-renderer').createRenderer()

            // 第 3 步：将 Vue 实例渲染为 HTML
            renderer.renderToString(app, (err, html) => {
                if (err) throw err
                console.log(html)
                // => <div data-server-rendered="true">Hello World</div>
            })

            // 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
            renderer.renderToString(app).then(html => {
                console.log(html)
            }).catch(err => {
                console.error(err)
            })
        3)详情请看https://ssr.vuejs.org/zh/guide/#%E4%BD%BF%E7%94%A8%E4%B8%80%E4%B8%AA%E9%A1%B5%E9%9D%A2%E6%A8%A1%E6%9D%BF
    ············★★★★★为了快速上手，我们使用Nuxt.js来做教程★★★★··············
    ·安装
        yarn create nuxt-app <project-name> 或者 npx create-nuxt-app <project-name>
    ·语法基本解读
        1）路由
            Nuxt.js依据pages目录自动生成路由模块的配置目录。
            ·基本规则
                ①、layouts.vue默认是根组件入口
                ②、在page目录下创建vue文件就是一个路由
                ③、<nuxt/>相当于<router-view></router-view>
                ④、<nuxt-link />标签相当于<router-link></router-link>
            ·嵌套路由
                创建内嵌子路由，你需要添加一个与父组件同级目录的文件夹用来存放子组件，嵌套图例如下↓↓↓
                +page
                    -father.vue
                    ☴father
                        -children1.vue
                        -children2.vue
                
                ------------
                ★★最后别忘了挂载到父组件中去
                    <nuxt-child></nuxt-child>
            ·路由重定向
                两种方式：
                a: nuxt.config.js配置
                    router: {
                        extendRoutes(routes) {
                            routes.push({
                                path: '/',
                                redirect: '/home'
                            })
                        }
                    }
                b: 利用中间件来处理(在middleware文件夹下创建一个redirect文件)
                    export default function({ isHMR, app, store, route, params, error, redirect }) {
                        if (isHMR) return;
                        if (route.fullpath == "/") {
                            return redirect("/home");
                        }
                    }
                    
                    然后在nuxt.config.js文件夹中编写
                        router: {
                            middleware: 'redirect',
                            // 如果middleware有多个，则使用数组的方式
                            // middleware: ['redirect', 'xxx']
                        }
            ·动态路由
                在一个文件夹下创建一个带下划线的vue文件
                ☴detail
                    - _id.vue
                
                     
            
        
        
二十、较难面试题
    1).vue中双向数据绑定的原理
        vue.js 采用数据劫持的方式，结合发布者-订阅者模式，通过Object.defineProperty()来劫持各个属性
        的setter，getter以监听属性的变动，在数据变动时发布消息给订阅者，触发相应的监听回调
    2).keep-alive的原理
        将需要缓存的VNode节点保存在this.cache中，在render时，如果VNode的name符合在缓存条件（可以用include以及exclude控制），
        则会从this.cache中取出之前缓存的VNode实例进行渲染。
    3）你是如何理解单行数据流双向数据绑定的？
        1）所谓单向数据流，指的是父组件总是通过 Props 向子组件传递数据。prop 的更新会向下流动到子组件中，但是反过来则不行。
            这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
        2）额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。
            如果你这样做了，Vue 会在浏览器的控制台中发出警告。
        3）双向数据流指的是视图与数据的更新保持一致。
    4) vue项目优化手段
        1.v-if、v-show的合理化使用
        2.使用图片懒加载、路由懒加载方式
        3.第三方插件按需加载
        4.ssr服务端渲染
        5.合理使用动态组件以及缓存组件
        6.使用字体图片替代图片
        7.将vue项目配置多入口
        8.开启gizp压缩
    5)vue中的虚拟DOM diff算法和react中的有啥区别？
        vue会跟踪每一个组件的依赖关系, 不需要重新渲染整个组件树。
        react而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染
    6)vue中的scoped的实现原理（详情请看：https://juejin.cn/post/6991354556349153293#heading-13）
        ①、每个 Vue 文件都将对应一个唯一的 id，该 id 根据文件路径名和内容 hash 生成，通过组合形成scopeId。
        ②、编译 template 标签时，会为每个标签添加了当前组件的scopeId，如 
            <div class="demo">test</div>
            // 会被编译成:
            <div class="demo" data-v-12e4e11e>test</div>
        ③、编译 style 标签时，会根据当前组件的 scopeId 通过属性选择器和组合选择器输出样式，
            .demo{color: red;}
            // 会被编译成:
            .demo[data-v-12e4e11e]{color: red;}












































































































        ★★★★★★★★★★★★★ 04. vue3.0版本 ★★★★★★★★★★★★★★★★★★★
零、vue3.0新特性速查
    ·组合式 API
    ·Teleport
    ·片段
    ·触发组件选项
    ·createRenderer API 来自 @vue/runtime-core 创建自定义渲染器
    ·单文件组件组合式 API 语法糖 (<script setup>) 实验性
    ·单文件组件状态驱动的 CSS 变量 (<style vars>) 实验性
    ·单文件组件 <style scoped> 现在可以包含全局规则或只针对插槽内容的规则
一、Vue3.0的亮点
    *性能比vue2.x快1.2~2倍
    *支持组合API(类似react中的hooks)
    *更好的支持TS
    *暴露了自定义渲染API
    拓展：vue3.0是怎样变快的？
        1)diff算法的优化
            vue2的虚拟DOM是进行全量的对比的，而vue3新增了静态标记。在与上次虚拟节点进行对比的时候，只对比带有patch flag的节点
            并且可以通过flag的信息得知当前节点要对比的具体内容
        2)标签元素静态提升
            vue2中无论元素是否参与更新，每次都会重新创建
            vue3中对于不参与更新的元素，会定义一个变量保存起来，在用的时候直接赋值即可
        3）事件侦听器缓存
            默认情况下onClick会被视为动态绑定，所以每次会去追踪它的变化。
            但是因为同一函数，所以没有追踪它的变化，直接缓存起来复用
        4）ssr渲染
            当有大量的静态内容时，这些内容会被当做纯字符串推进一个buffer里面，即使存在动态的绑定，会通过模板插值嵌入进去，
            这样会比虚拟DOM来渲染的快上很多很多
    拓展：下载脚手架
        ①、vue-lic(略，)
        ②、使用vite创建
            npm init @vitejs/app hello-vue3 
            或者 yarn create @vitejs/app hello-vue3
        
二、响应式原理
    ·Object.defineProperty()
        介绍：
            使用的数据劫持：直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
            Vue 2.x 利用 Object.defineProperty()，并且把内部解耦为 Observer, Dep, 并使用 Watcher 相连
        特点：
            1）只能监听对象(Object)，不能监听数组的变化，无法触发push, pop, shift, unshift,splice, sort, reverse。
                (数组的响应式采用函数拦截方式，覆盖数组原型方法，额外增加通知逻辑)
            2）无法发现对象中新增和被删除的属性，必须遍历对象的每个属性
            3）只能劫持当前对象属性，如果想深度劫持，必须深层遍历嵌套的对象，但这样开销会非常大
        拓展：
            vue2.X 是如何实现响应式系统的？
                当你把一个普通的 JavaScript 对象传入 vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 
                Object.defineProperty() 把这些 property 全部转为 getter/setter。在 getter 方法中收集数据依赖，在 setter 
                中监听数据变化。一旦数据发生变化，再通知订阅者。每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中
                把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。 
    ·new Proxy()
        介绍：
            Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，
            可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。
        特点：
            1）可以对任意数据类型进行拦截。
            2）可以监听属性的新增删除操作
            3) 深层遍历嵌套的对象
        const p = new Proxy(target，handler);
            target: Proxy 会对 target 对象进行包装。它可以是任何类型的对象，包括内置的数组，函数甚至是另一个代理对象。
            handler: 它是一个对象，它的属性提供了某些操作发生时所对应的处理函数。里面有13个操作方法
        应用：
            // obj代表要拦截的对象，handler用来定制拦截行为
            const p = new Proxy(target, {
                // get方法的两个参数分别是目标对象(即obj)和所要访问的属性。
                get(target, prop) {
                    return Reflect.get(target, key)
                },
                set(target, prop, value) {
                    return Reflect.set(target, key, value)
                },
                deleteProperty(target, prop) {
                    return Reflect.deleteProperty(target, key)
                }
            })

        拓展：vue3.0的响应式原理？
            通过new Proxy(target, handler)创建代理对象,handler也是一个对象，里面有get、set、deleteProperty等方法
            以及配合reflect反射，动态对比代理的对象进行特定的操作
            -------------------
            Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。
            这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，
            不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。
            
            面试题：Reflect的作用是什么？（参考：https://blog.csdn.net/weixin_42045006/article/details/148400989）
                保证this的指向，避免抛出异常，达到依赖收集的效果。
            
三、composition API
    ·setup()函数详解
        1.执行时机
            ·setup是在props解析之后，beforeCreate执行之前进行调用
            ·在setup函数中我们不能使用data、methods、以及this(vue把this改成undefined)   
            ·setup函数只能是同步的不能是异步的
        2.setup返回值
            ·一般返回一个对象，为模板提供数据
            ·返回对象的属性和方法之后会和data、methods合并
            ·如果有重名，setup优先
            注意：
                1.一般不要混合使用。methods可以访问setup提供的属性和方法。但setup中不能访问data和methods
            拓展：setup的返回值还可以是一个render函数，具体用法如下：
                1）定义一个jsx文件(vue3默认是支持jsx的)
                2）写法如下：
                    import { h, ref, reactive } from 'vue'

                    export default defineComponent({
                        setup() {
                            const readersNumber = ref(0)
                            const book = reactive({ title: 'Vue 3 Guide' })
                            // 请注意这里我们需要显式调用 ref 的 value
                            return () => h('div', [readersNumber.value, book.title])
                        }
                    })
        3.setup参数
            ·setup(props, context) / setup(props, { attrs, slots, emit })
                props:包含props配置声明且传入了的所有的属性的对象
                attrs：包含没有在props配置声明的属性的对象，相当于this.$attrs
                slots: 包含所有传入的插槽内容的对象，相当于this.$slots
                emit: 用来分发自定义事件的函数，相当于this.$emit
            注意：
                因为 props 是响应式的，你不能使用 ES6 解构，因为它会消除 prop 的响应性。
                如果需要解构 prop，可以通过使用 setup 函数中的 toRefs 来安全地完成此操作。(如果传递过来的prop是可选的，则用toRef代替toRefs)
        4.setup的其他规则
            ·执行时间： 在beforecreate之前
            ·setup返回的属性或者方法最终会和data、methods中的属性、方法合并，冲突时，以setup为准。
            ·一般不要混合使用：methods中的方法可以访问setup中的提供的属性和方法，但在setup中不能访问methods的
            ·setup不能是一个async异步函数(即不能使用ES7的async、await,)，因为异步拿到的数据无法赋值到return汇总，
                如果需要异步转同步，则需要配合<suspense>来使用
            
    ·reactive()函数详解
        1.什么是reactive？
            reactive是vue3中实现响应式数据的方法
        2.使用说明
            ①、reactive参数必须是对象(json/arr也行)
            ②、如果给reactive传递了基本类型，默认情况下修改对象，界面不会自动更新，如果想要自动更新，则通过重新赋值的方式
        3.shallowReactive
            只能监视第一层,数据能更新，但视图不更新
            setup() {
                const obj = shallowReactive({name: '张三', like: {eat: '梨子',drink: '水'}})
                function change(){
                    obj.name = '李四';            // 数据会更新，视图也会变化
                    obj.like.eat += '2222';      // 数据会更新，但视图不更新
                    console.log(obj);
                    
                }
                return {
                    obj,
                    change
                }
            }
    ·effect
        副作用函数，其特点是：
            1）一开始会执行一次
            2）内部收集的依赖更新时，会执行一次
            3）返回值是内部ReactiveEffect 的run方法，调用effect的返回值，会执行一次(相当于组件的this.forceUpdate方法)
                const runner = effect(()=>{})
                runner(); // 通过调用返回值，重新强制调用一下effect
        ·用法：
            effect(()=>{
                document.getElementById('app').innerHTML = state.flag;
            }, {
                scheduler() {
                    console.log('这是一个回调')
                }
            })
        ·我们来看看effect最外层原理是如何处理的？
            export function effect(fn, options: any = {}) {
                const _effect = new ReactiveEffect(fn, options.scheduler);
                _effect.run(); // 默认让响应式的effect执行一次

                const runner = _effect.run.bind(_effect); // 保证_effect执行的时候this是当前的effect
                runner.effect = _effect;  
                return runner;
            }

        ·如何将effect变成失活状态？
            const runner = effect(()=>{})
            // 通过调用runner.effect.stop方法让其失去西响应式
            runner.effect.stop();

    ·ref()函数的详解
        1.什么是ref?
            ref和reactive一样，也是用来实现响应式数据的方法
            由于reactive必须传递一个对象，所以导致在企业开发中，如果我们只想让某个变量来实现响应式的时候会非常麻烦，
            所以vue3就给我们提供了ref方法，实现简单值的监听
        2.ref的本质？
            ref底层还是reactive的底层原理，系统会根据我们给ref传入的值将它转换成ref(xxx) -> reactive({value:xx})
            拓展：reactive和ref这两种定义响应式数据的区别？
                ·reactive本质上是一个proxy对象，而ref则是一个RefImpl对象，它有一个value属性，该属性指向的是一个proxy对象
                ·通常情况下ref用来处理基本数据类型，reactive用来处理对象类型(深度响应式)
                ·如果用ref来定义数组或者对象，内部会自定将对象或者数组转化成ref(xxx) -> reactive({value:xx})
                ·ref内部式通过给value属性添加getter和setter方法来实现对数据的劫持的，而reactive是通过Proxy来实现的
        3.ref家族
            ①、ref
                介绍：ref接受一个原始值，返回一个具有响应式的对象，对象有一个value属性，其值就是所传递的原始值

                用途一、利用ref函数将某个对象中的属性变成响应式数据，修改响应式数据是不会影响到原始数据。
                    setup(){
                        let msg = { name: '张三', age: 16 }
                        let msg1 = ref(msg.name)       
                        console.log(msg1.value)       // 张三
                        function change1() {
                        msg1.value = '呵呵'
                        console.log(msg, msg1.value)   // {name: "张三", age: 16}  呵呵
                        }
                        change1()
                        return { msg1,change1 }
                    }

                    // 总结： ref是做的一个拷贝关系，修改对象msg1的值，不会影响对象msg，视图会发生变化
                用途二、用于获取HTML element
                    <h1 ref="h1Ref">我是h1</h1>
                    <h2 ref="h2Ref">我是h2</h2>

                    setup() {
                        const h1Ref = ref<HTMLElement | null>(null);     // 注意定义名字要和上面的保持一致，不然为null
                        const h2Ref = ref<HTMLElement | null>(null);     // 注意定义名字要和上面的保持一致，不然为null
                        onMounted(() => {
                            console.log(h1Ref.value)
                            console.log(h2Ref.value)
                        })
                        return {
                            h1Ref,
                            h2Ref
                        }
                    }
            ②、toRef
                介绍：toRef用来给抽离对象中的某一个属性，并把该属性包裹成ref对象，使其和原对象产生链接，也可以说成是
                    为源响应式对象上的某个属性创建一个ref对象，二者内部操作是同一个值，同时更新二者是同步的
                  setup(){
                    let obj = {name : 'alice', age : 12};
                    let newObj= toRef(obj, 'name');
                    function change(){
                      newObj.value = 'Tom';
                      console.log(obj,newObj.value)        // {name : 'Tom', age : 12}    Tom
                    }
                    return {newObj,change}
                  }
                // 总结: toRef是做的一种引用关系，修改msg2的值，会影响对象msg，但视图不会发生变化
                --------------
                小结：ref和toRef的区别
                    (1). ref本质是拷贝，修改响应式数据不会影响原始数据；toRef的本质是引用关系，修改响应式数据会影响原始数据
                    (2). ref数据发生改变，界面会自动更新；toRef当数据发生改变时，界面不会更新
                    (3). toRef传参与ref不同；toRef接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性

            ③、toRefs
                用途1：有的时候，我们希望将对象的多个属性都变成响应式数据，并且要求响应式数据和原始数据关联，并且更新响应式数据的时候
                    不更新界面，就可以使用toRefs，用于批量设置多个数据为响应式数据。(toRef一次仅能设置一个数据)toRefs接收一个对象作为参数，
                    它会遍历对象身上的所有属性，然后挨个调用toRef执行
                      setup(){
                        let obj = {name : 'alice', age : 12};
                        let newObj= toRefs(obj);
                        function change(){
                          newObj.name.value = 'Tom';
                          newObj.age.value = 18;
                          console.log(obj,newObj)
                        }
                        return {newObj,change}
                      }

                用途2：将reactive对象转换成多个ref对象
                export default {
                    setup() {
                        // 可以在不失去响应性的情况下破坏结构
                        const { foo, bar } = useFeatureX()

                        return {
                        ...toRefs(state),
                            age,
                            handleClick,
                        };
                    }
                }
            ④、shallowRef
                类似于shallowReactive，相当shallowReactive({value:{name: '张三', like: {eat: '梨子',drink: '水'}}}),
                也是只能监视第一层(即value值的变化，无法监视深层次的对象变化)
                setup() {
                    const obj = shallowRef({name: '张三', like: {eat: '梨子',drink: '水'}})
                    function change(){
                        obj.value.name = '李四';           // 数据会更新，但是图不更新
                        obj.value.like.eat += '2222';      // 数据会更新，但视图不更新
                        console.log(obj);
                        
                    }
                    return {
                        obj,
                        change
                    }
                }
            ⑤、customRef(了解即可)
                创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数
                作为参数，并应返回一个带有 get 和 set 的对象。
            ⑤、triggerRef
                手动执行与 shallowRef](#shallowref) 关联的任何效果。
                const shallow = shallowRef({
                    greet: 'Hello, world'
                })

                // 第一次运行时记录一次 "Hello, world"
                watchEffect(() => {
                    console.log(shallow.value.greet)
                })

                // 这不会触发作用，因为 ref 很浅层
                shallow.value.greet = 'Hello, universe'

                // 记录 "Hello, universe"
                triggerRef(shallow)
            ⑥、unref(了解)
                如果参数为 ref，则返回内部值，否则返回参数本身。相当于 val = isRef(val) ? val.value : val。
            ⑦、isRef
                判断一个值是不是ref对象
        5.readonly家族
            ①、基本用法
                获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。只读代理是深层的：访问的任何嵌套 property 也是只读的。
                const original = reactive({ count: 0 })
                const copy = readonly(original)
                // 变更副本将失败并导致警告
                copy.count++ // 警告!
            ②、shallowReadonly
                因为外层没有收集依赖，虽然里层能改，但是不会更新视图
                const state = shallowReadonly({
                    foo: 1,
                    nested: {
                        bar: 2
                    }
                })

                // 改变状态本身的property将失败
                state.foo++
                // ...但适用于嵌套对象
                isReadonly(state.nested) // false
                state.nested.bar++ // 适用
    ·toRaw()和markRaw()
        *toRaw()
            让代理对象变成普通对象
            也可用于写入而不会触发更改。不建议保留对原始对象的持久引用。请谨慎使用。
            setup() {
                const obj = {name: '张三', age: 18};
                let obj2 = reactive(obj);
                const obj3 = toRaw(obj2);
                function changeStr(val: any): void {
                    
                    obj3.name = '哈哈===';
                    console.log(obj, obj2, obj3);       // obj === {name: "哈哈===", age: 18}  obj2 === proxy{name: "哈哈===", age: 18} 
                                                        // obj3 ==={name: "哈哈===", age: 18}
                }
                return {
                    obj2,
                    changeStr,
                }
            }
        *markRaw()
            标记一个对象，使其永远不会转换为代理对象。返回对象本身.
            const foo = markRaw({})
            console.log(isReactive(reactive(foo))) // false

            // 嵌套在其他响应式对象中时也可以使用
            const bar = reactive({ foo })
            console.log(isReactive(bar.foo)) // false
        
    ·组合API中的计算属性和监视
        ·computed()
            ·介绍
                接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。
                该方法默认不执行，只有当内部依赖属性改变时才会触发。(这点和effect副作用函数有所不同)
            ·用法：
                和vue2.0一样，有两种写法：函数形式和对象形式
                ·函数形式
                    使用 getter 函数，并为从 getter 返回的值返回一个不变的响应式 ref 对象。
                    const count = ref(1)
                    const plusOne = computed(() => count.value + 1)
                    // 返回值是一个ref,通过.value获取
                    console.log(plusOne.value)         // 2
                    plusOne.value++                    // error
                ·对象形式
                    具有 get 和 set 函数的对象来创建可写的 ref 对象。
                    const count = ref(1)
                    const plusOne = computed({
                        get: () => count.value + 1,
                        set: val => {
                            count.value = val - 1
                        }
                    })
                    plusOne.value = 1
                    console.log(count.value) // 0
        ·watchEffect()
            在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。返回值是一个函数，可以停止侦听
            参数说明：
                第一个参数代表要运行的副作用函数。
                第二个参数代表可选项，用来调整副作用的刷新时机或调试副作用的依赖。
            const count = ref(0)

            // 当count.value变动时，立即打印count.value的值
            const stop = watchEffect(
                () => console.log(count.value), 
                {
                    flush: 'post', // 可选post、sync、pre(默认)，具体看 https://cn.vuejs.org/api/reactivity-core.html#watcheffect
                    onTrack(e) {
                        debugger
                    },
                    onTrigger(e) {
                        debugger
                    }
                })       
            // 当不再需要此侦听器时：
            stop()

            ----------
            注意事项：watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。
        ·watch()
            watch API 与选项式 API this.$watch (以及相应的 watch 选项) 完全等效。watch 需要侦听特定的 data 源，
            并在单独的回调函数中副作用。默认情况下，它也是惰性的——即，回调是仅在侦听源发生更改时调用。
            与 watchEffect 比较，watch 允许我们：
                惰性地执行副作用；
                更具体地说明应触发侦听器重新运行的状态；
                访问侦听状态的先前值和当前值。 
            简单的说：
                watch: 
                    既要指明监视的属性，也要指明监视的回调
                watchEffect:
                    就是effect副作用函数！！！不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性
                eg:
                    //  watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调
                    watchEffect(()=>{
                        const a=num;
                        const b=person.age
                        console.log("watchEffect配置回调执行了")
                    })

            // 侦听一个getter
            const state = reactive({ count: 0 })
            watch(() => state.count,(count, prevCount) => {
                ···
            },{immediate: true, deep: true})
            
            // 直接侦听一个ref
            const count = ref(0)
            watch(count, (count, prevCount) => {
                ···
            })
            
            // 使用watch监视多个数据
            watch([data1, data2], ()=>{
                console.log('=====')
            })
                // 如果data1是非响应式数据，则需要变更为：
                watch([()=>data1, data2], ()=>{
                    console.log('121212')
                })
    ·effectScope
        介绍：
            创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。
        示例:
            const scope = effectScope()

            scope.run(() => {
            const doubled = computed(() => counter.value * 2)

            watch(doubled, () => console.log(doubled.value))

            watchEffect(() => console.log('Count: ', doubled.value))
            })

            // 处理掉当前作用域内的所有 effect
            scope.stop()
四、vue3.0中的生命周期
    在options API中，前面6个API没有变化，后边两个beforeDestory和destoryed换成beforeUnmount、Unmounted
    在composition API中，只有6个常用生命周期钩子，分别是变化二提到的6个钩子，并且是以函数形式在setup中出现，如onBeforeMount(()=>{})
    变化一、setup() 替代
        beforecreate -> use setup()
        created -> use setup()
    变化二、前面加on
        beforeMount -> onBeforeMount
        mounted -> onMounted
        beforeUpdate -> onbeforeUpdate
        updated -> onUpdated
        activated -> onActivated
        deactivated -> onDeactivated
        errorCaptured -> onErrorCaptured
    变化三、更改名称
        beforeDestroy -> onBeforeUnmount
        destroyed -> onUnmounted
    变化四、新加入
        onRenderTracked    
            跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。
        onRenderTriggered
            当虚拟 DOM 重新渲染被触发时调用。和 renderTracked 类似，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键
        主要用于开发阶段调试使用
五、自定义hook
    什么是hook？
        在不适用class的情况下管理状态数据，并把一些逻辑性的东西抽离出来放在一个可复用的功能函数中。
    特点：
        使用vue3的组合API封装可复用的功能函数
        自定义hook的作用类似于vue2的mixin混合
        自定义hook的优势：很清楚复用功能代码的由来更清楚易懂
    例子：
        略。。。
六、
四、teleport传送门组件
    介绍：
        传送门组件类似于react中的reactDOM.createPortals,用于将节点渲染到节点以外的地方去。
    用法：
        teleport标签有一个to属性,它的值为一个选择器(任意选择器都可以)
        <teleport to="#xxx">
            <div v-if="isShow">
                <h1>我是一个model对话框</h1>
            </div>
        </teleport>
五、emits选项
    介绍：
        vue3中组件发送的自定义事件需要定义在emits中，以防止以下bug触发：
            ·原生事件会触发两次，比如click
            ·更好的指示组件的工作方式
            ·对象形式事件校验
    用法：
        <my-component @my-event="doSomething"></my-component>
        export default {
            components: 'App',
            emits: ['my-event']
        }
六、新版provide/inject的使用(祖孙组件通信)
        ①、基本用法
            祖辈组件：
                import { provide } from 'vue'

                setup() {
                    let str = ref('传递给孙子组件')

                    provide('getStr', str)   // provide传递两个参数，一个是name值，一个是value值
                    return {
                        str
                    }
                }
            孙子组件：
                <h1>{{str}}</h1>

                setup() {
                    const str = inject('getStr', '无法获取到~')         // inject同样传递两个参数，一个是provide传递过来的name,一个是默认值
                    return {
                        str
                    }
                }
        ②、当需要传递一个方法给孙子组件改变数据时：
            祖辈组件：
                <h1>{{str}}</h1>

                setup() {
                    let str = ref('传递给孙子组件')
                    function changeStr(val: any): void {
                        str.value = val
                    }

                    provide('getStr', str)
                    provide('changeStrFunc', changeStr)
                    return {
                        str,
                        changeStr
                    }
                }
            孙子组件：
                <button @click="click">try click me</button>
                <h1>{{str}}</h1>

                setup() {
                    const str = inject('getStr', '无法获取到~')
                    const changeStrFunc: Function = inject('changeStrFunc')
                    function click() {
                        
                        // console.log(changeStrFunc);
                        changeStrFunc('传递过去了===')
                        console.log(str)
                    }
                    return {
                        str,
                        click
                    }
                }
七、自定义渲染器(createRenderer)
    介绍：
        用来自定义渲染逻辑，比如我们可以把数据渲染到canvas上
    用法：
        (详情请看文档)
八、全局API
    ·createApp()
        介绍：
            Vue 2.x 有许多全局 API 和配置，这些 API 和配置可以全局改变 Vue 的行为。例如，要创建全局组件，可以使用 Vue.component 这样的 API。
            但是通常会带来一些问题，比如
                1）在测试期间，全局配置很容易意外地污染其他测试用例
                2）全局配置使得在同一页面上的多个“app”之间共享同一个 Vue 副本非常困难，但全局配置不同
            所以我们在vue3中引入了一个崭新的api createApp
        用法：
            import MyComp from './mycomp'
            createApp(App).component('MyComp', MyComp).mount('#app')
    ·defineComponent
        作用：
            ①、只是对setup函数进行封装，返回option对象
            ②、更好的支持typeScript，给予了组件正确的类型推断
九、全局 API Treeshaking
    介绍：
        把Vue实例对象的一些API抽离出来作为独立函数，这样打包工具在摇树优化上可以把那些dead code排除掉
    用法：
        比如在我们使用nextTick的时候，我们可以这样：
            import { nextTick } from 'vue'

            nextTick(() => {
            // 一些和DOM有关的东西
            })
    除此之外，还有一些受影响的API：
        Vue.nextTick
        Vue.observable (用 Vue.reactive 替换)
        Vue.version
        Vue.compile (仅全构建)
        Vue.set (仅兼容构建)
        Vue.delete (仅兼容构建)
十、组件懒加载(defineAsyncComponent)
    在vue3中函数式组件必须定义为纯函数，异步组件(组件懒加载)定义有如下变化
        1)必须明确使用defineAsyncComponent包裹
        2)component选项重命名为loader
        3)loader函数不再接收resolve and reject且必须返回一个promise
    写法：
        import { definAsyncComponent } from 'vue
        
        ①、const Xxx =  defineAsyncComponent(()=>import('./Xxx.vue'));
            
        ②、const asyncPageWithOptions = defineAsyncComponent({
            loader: () => import('./NextPage.vue'),
                delay: 200,
                timeout: 3000,
                errorComponent: ErrorComponent,
                loadingComponent: LoadingComponent
            })
十一、vue-router 4快速上手
    ·下载安装
        npm install vue-router@4
    ·基本用法
        ·创建路由对象
            import { createRouter, createWebHashHistory } from 'vue-router
            const router = createRouter({
                history: createWebHashHistory(),
                routes: [
                    {path: '/', component: Xxx}
                ]
            })
        ·在main.js 中引入
            import router from '../router'

            createApp(App)
                .use(router)
                .mounted('#root');
        主要变化：
            1.history选项取代了mode选项，并且history模式总共有以下几种：
                "history"：  createWebHistory()           ---设置history模式
                "hash"：     createWebHashHistory()       ---设置hash模式
                "abstract"： createMemoryHistory()        ---主要用以服务端渲染
            2.base选项已经移入到createWebHistory中了，用法为createWebHistory('/xxx/'),就可以给所有的路径带一个xxx的url前缀了
            3.删除*（加注星标或捕获全部）路线
                捕获所有路由（*，/*）现在必须使用带有自定义正则表达式的参数进行定义：
                 { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound },
十二、vuex 4快速上手
    ·下载安装
        yarn add vuex@next --save
    ·
    import { createStore } from 'vuex
    ...
十三、pinia 快速上手
    ·介绍
        Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。可以算是vuex的替代品
    ·优势
        ·dev-tools 支持
            跟踪动作、突变的时间线
            Store 出现在使用它们的组件中
            time travel 和 更容易的调试
        ·热模块更换
            在不重新加载页面的情况下修改您的 Store
            在开发时保持任何现有状态
        ·插件：使用插件扩展 Pinia 功能
        ·为 JS 用户提供适当的 TypeScript 支持或 autocompletion
        ·服务器端渲染支持
    ·对比vuex 4
        1) mutations 不再存在。他们经常被认为是 非常 冗长。他们最初带来了 devtools 集成，但这不再是问题。
        2) 无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断。
        3) 不再需要注入、导入函数、调用函数、享受自动完成功能！
        4) 无需动态添加 Store，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手动使用 Store 进行注册，但因为它是自动的，您无需担心。
        5) 不再有 modules 的嵌套结构。您仍然可以通过在另一个 Store 中导入和 使用 来隐式嵌套 Store，但 Pinia 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 您甚至可以拥有 Store 的循环依赖关系。
        6) 没有 命名空间模块。鉴于 Store 的扁平架构，“命名空间” Store 是其定义方式所固有的，您可以说所有 Store 都是命名空间的。
    ·安装
        yarn add pinia
    ·代码演示
        1) 定义一个store
            import { defineStore } from 'pinia'

            // useStore 可以是 useUser、useCart 之类的任何东西
            // defineStore参数说明：
            //    第一个参数是应用程序中 store 的唯一 id
            //    第二个参数可以是一个对象(代表optionsAPI)，也可以是一个函数(setup)
            ---------------------------------
            第一种写法↓
            export const useStore = defineStore('main', {
                // 当defineStore只传一个对象的时候，id为
                id: 'main',
                state: () => {  // 注意：state必须是一个函数
                    return {
                        count: 0,
                    }
                },
                getters: {
                    double() {
                        return this.count * 2
                    }
                },
                actions: {
                    increment(payload) {
                        this.count += payload
                    }
                }
            })
            -----------------------------------
            第二种写法↓
            //  函数形式必定有两个参数(store名，setup)，不能把id名放入函数内部
            export const useCounterStore = defineStore('counter', () => {
                const count = ref(0)
                const doubleCount = computed(() => count.value * 2)
                function increment() {
                    count.value++
                }

                return { count, doubleCount, increment }
            })
        2) 在main.ts 中引入pinia插件并使用
            import { createApp } from 'vue'
            import { createPinia } from 'pinia'
            import App from './App.vue'

            const app = createApp(App)
            app.use(createPinia()) // 插件要求得有一个install方法
            app.mount('#app')
    ·原理概述
        createPinia(), 默认是一个插件具备一个install方法,通常有以下核心属性
        _s: 一个new Map,用来存储 id => store
        state: 用来存储所有状态的
        _e: 用来停止所有状态的

    
十四、vue面试题
    ·vue3有哪些变化？
        可以从两个方面讲：
            1.性能优化方面：
                ·对虚拟DOM算法的优化
                ·对不需要重新加载的DOM通过变量缓存起来
            2.语法方面的变化
                ·增
                    ①、增加了teleport
                    ②、增加了组合api
                    ③、增加了两个新的生命周期renderTracked、renderTriggered
                    ④、增加了emits选项
                    ⑤、增加了createApp、defineComponent等api
                ·删
                    ①、删除事件总线的$on、$off、$once
                    ②、删除$children
                    ③、删除$listeners
                    ④、删除过滤器
                    ⑤、删除.native修饰符
                ·改
                    ①、生命周期setup的更改
                    ②、响应式原理更改
                    ③、v-model的默认值更改
                    ④、v-if和v-for优先级的修改
                    ⑤、组件懒加载的语法更改
                    ⑥、provide/inject的用法更改
                    ⑦、组件可以不用一个根标签包裹了
    ·vue3和vue2有什么区别？
        
        1）从架构上讲：vue3采用了monorepo的方式可以让我们一个项目下管理多个项目，每个包可以单独发布和使用（依赖关系）
        2）vue3采用函数式 + ts编程，最大的好处就是支持tree-shaking
        3）vue3中采用了compositionAPI实现了方便代码的复用（解决了mixin的问题，明明冲突数据来源不明确）
        4）vue3中针对于ast语法树的优化，会对变化的属性进行标记，这样可以明确的指导哪些是变化哪些没变化，这样做diff之前可以筛选出只比较变化了的属性，进行靶向更新
        5）vue3中使用到了静态提升，属性提升、字符串haul，事件缓存

    ·vue3中模板编译优化
        1）静态提升
        2）动态标记
        3）缓存事件
        4）Block Tree
        5) 预字符串化
        


    
            
    
         
    
    









 */

/*
★★★★★★★★★★★★★★★ 1.微信小程序开发总笔记   ★★★★★★★★★★★★★★★★★★★★★
一、微信小程序
    ·介绍
        ①、2017年度百度百科十大热词之一
        ②、微信小程序（wei xin xiaocheng xu），简称小程序，英文名Mini Program，
            是一种不需要下载安装即可使用的应用 ( 张小龙对其的定义是无需安装，用完即走，实际上是需要安装的，
            只不过小程序的体积特别小， 下载速度很快，用户感觉不到下载的过程 )
        ③、小程序刚发布的时候要求压缩包的体积不能大于1M,，否则无法通过，在2017年4月做了改进，由原来的1M提升到2M；
            2017年1月9日0点，万众瞩目的微信第一批小程序正式低调上线。
    ·用途
        ①、同App进行互补，提供同app类似的功能，比app操作更加简洁的轻应用
        ②、通过扫一扫或者在微信搜索即可下载
        ③、用户使用频率不高，但又不得不用的功能软件，目前看来小程序是首选
        ④、连接线上线下
        ⑤、开发门槛低， 成本低  
    ·开发资料
        ·官网
            https://mp.weixin.qq.com/
二、开发小程
    1.小程序没有DOM对象,一切基于组件化
    2.小程序的四个重要文件
        1. *.js------功能文件
        2. *.wxml---->view结构---->html文件
        3. *.wxss---->view样式---->css文件
        4. *.json---->view数据----->json文件
    3.小程序适配方案
        1rpx = 1物理像素 =0.5px
        注意：注意此时底层已经做了viewport适配的处理，即实现了理想视
三、程序入门介绍
    ·小程序的加载顺序
        1) 启动小程序之后，首先会加载app.json文件，然后注册并执行app.js文件中的生命周期
        2) 开始加载app.json中的page对象
        3) 首先执行page页面的json文件，再执行wxml和wxss,最后执行xxx.js文件
    ·初始化文件
        app.js文件:
            输入app+tab自动获得App对象，另外可通过const app = getApp()得到App对象
        app.json文件：
            app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。
            {
                "pages": [
                    "pages/index/index"
                ],
                // 通过下面的配置可以改变窗口的颜色样式(快捷键是window+tab)
                "window": {
                    "navigationBarBackgroundColor": "#08e",       // 导航的背景颜色
                    "navigationBarTextStyle": "black",            // 导航的标题颜色，仅支持black/white
                    "navigationBarTitleText": "第一次玩小程序",    // 导航栏标题文字内容
                    "backgroundColor": "#f90",                    // 窗口的背景色 
                    "backgroundTextStyle": "light",               // 下拉刷新的样式，仅支持dark/light
                    "enablePullDownRefresh": false                // 是否开启全局的下拉刷新
                }
            }
        project.config.json文件：
            相当于项目配置文件，即如果你要换电脑时，你只要载入同一个项目的代码包，开发者工具就自动会帮你恢复到当时你开发项目时的个性化配置，
            (如需要修改在开发者工具的详情中改即可)
        sitmap.json文件：
            小程序根目录下的 sitemap.json 文件用来配置小程序及其页面是否允许被微信索引。
    ·小程序组件化
        使用步骤：
            ①、新建一个components文件夹(和pages同级)，创建
            ②、在需要用到组件的地方(xxx.json)文件中，配置如下：
                {
                    "usingComponents": {
                        "myComp1": "/components/comp1/comp1"   // myComp1代表组件的名字，后面的代表路径
                    }
                }
            ③、在xxx.wxml文件中
                <myComp1></myComp1>
    ·小程序配置
        1.分类
            1)项目开发配置
                所对应的文件：project.config.json文件，可在右上角的详情按钮中设置
            2)小程序收录配置
                所对应文件：sitemap.json文件
            3)小程序的全局配置
                所对应的文件：app.json文件
                如window、tabBar、pages
            4)页面配置
                所对应的文件：pages目录下各个组件的xxx.json文件
        2.扩展：
            如果全局和页面都有相同的文件配置,则页面的文件配置优先级更高
四、WXML精讲
    ·绑定数据
        1.数据绑定
            {{}}
                数据绑定使用 Mustache 语法（双大括号）将变量包起来，可以作用于：
                应用场景①： <view>{{ demo }}</view>
                应用场景②、 <view class="demo {{ isYellow }}"></view>
                应用场景③、 ...(wx:for="xxx"、wx:if="xxx")
            (更多场景请移步微信小程序官网)
        2.列表渲染
            ·wx:for
                在组件上使用 wx:for 控制属性绑定一个数组，即可使用数组中各项的数据重复渲染该组件。
                默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item
                    <view wx:for="{{array}}">
                        {{index}}: {{item.message}}
                    </view>
                如果需要修改item、index这两个名字，或者data数据中有同名的item、index,则需如下修改：
                    <view wx:for="{{array}}" wx:for-item="itm" wx:for-index="idx">
                        {{idx}}: {{itm.message}}
                    </view>
            ·wx:key
                如果列表中项目的位置会动态改变或者有新的项目添加到列表中，并且希望列表中的项目保持自己的特征和状态
                （如 input 中的输入内容，switch 的选中状态），需要使用 wx:key 来指定列表中项目的唯一的标识符。
                <switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;"> {{item.id}} </switch>
                拓展：wx:key 的值以两种形式提供：
                    1.<view wx:for="{{data}}" wx:key="id"></view>
                        字符串，代表在 for 循环的 array 中 item 的某个 property，该 property 的值需要是列表中唯一的字符串或数字，且不能动态改变。
                    2.<view wx:for="{{data}}" wx:key="*this"></view>
                        保留关键字 *this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字。例如data = [1, 2, 3] 或者 ['fd', 'ewf', 322]只能用这种方式
        3.条件渲染
            ①、wx:if
            相当于vue中的v-if,在框架中，使用 wx:if="" 来判断是否需要渲染该代码块：
                <view wx:if="{{length > 5}}"> 1 </view>
                <view wx:elif="{{length > 2}}"> 2 </view> 
                <view wx:else> 3 </view>
                注意：如果需要包裹多个标签属性，请用block标签
                    <block wx:if="{{true}}">
                        <view> view1 </view>
                        <view> view2 </view>
                    </block>
                block标签的拓展：<block/> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。
            ②、hidden="true"
                相当于vue中的v-show，可以直接写个属性即可，也可以双大括号语法写表达式
                <view hidden>我通过hidden隐藏了...</view>
                <view hidden="{{ isShow }}">我通过hidden隐藏了...</view>
        4.双向绑定(v2.9.3版本支持，兼容请看小程序官网)
            <input model:value="{{value}}" />
            ！！！注意：微信小程序的双向绑定技术有如下限制：
                ①、只能是一个单一字段的绑定，不能是表达式，如以下都不行：
                    <input model:value="值为 {{value}}" />
                    <input model:value="{{ a + b }}" />
                ②、不能使用点语法绑定对象内部的值，如下 
                    <input model:value="{{ a.b }}" />
    ·绑定事件
        事件关键字：
            bind: 冒泡事件
            catch：绑定并阻止事件冒泡事件(阻止父辈所有的冒泡事件)
            capture-bind: 捕获事件(注意：该事件需要用冒号隔开，如capture-bind:tap)
            mut-bind: 互斥事件(说白了，只会触发一个)，了解即可
        微信小程序常用的事件：
            tap: 手指触摸后马上离开
            longpress: 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
            touchstart: 手指触摸动作开始
            touchmove: 手指触摸后移动
            touchcancel: 手指触摸动作被打断，如来电提醒，弹窗
            touchend: 手指触摸动作结束
        事件中的event属性：
            type: 触发的事件类型
            timeStamp：事件生成时的时间戳
            detail：鼠标所点的位置(距离所点元素的位置)
            target: 触发事件的组件的一些属性值集合(冒泡事件源)
            currentTarget：当前组件的一些属性值集合(触发该事件的元素)
                dataset: 标签自定义的属性集合
                    如：<view data-name="sz" data-age="18"></view>,则dataset值为{name: "sz", age: "18"}
                id：自己所给的id值
                    如：<view id="1"></view>,则dataset值为{name: "sz", age: "18"}
                offsetLeft、offsetTop: 元素距离视图的距离
            mark：事件标记数据
        自定义属性：
            微信小程序中事件传参不能像vue那样通过@click="handleClick(1)"这样传，不然会报错，在小程序中是通过自定义属性传递的，具体如下：
            <button catchTap="handleCatch" data-xxx="{{1}}"></button>
            js文件中：
                handleCatch(e){
                    const { xxx } = e.currentTarget.dataset
                    this.setData({
                        num: xxx  
                    })
                }
        表单输入框值得获取:
            在我们对于表单组件获取值得时候，我们可以通过 e.detail.xxx 来获取
            <input bindinput="hanldeInput" />
            js文件中，
                handleInput(e) {
                    console.log(e.detail.xxx)
                }
    ·模板的用法
        ①、第一种写法：只在wxml中实现模板的定义和使用
            1)定义模板 
                <template name="temp1">
                    <view>通过data拿到的值是{{ title }}</view>
                </template>
            2)使用模板
                可以使用data属性给模板传值
                <template is="temp1" data="{{title: '我是一个标题'}}"></template>
        第二种写法：把template抽离成一个文件，通过import的src引入
            1)在page文件同目录下创建一个templates的文件夹，再创建一个demo1的文件夹
                <template name="temp1">
                    <text>{{ desc }}</text>
                </template>
            2)在需要用到的地方的wxml文件中
                <import src="templates/temp1/"></import>
                <template is="xxx" data="{{ desc: '必须得定义为data才有效' }}"></template>
        拓展：include
            include 可以将目标文件除了 <template/> <wxs/> 外的整个代码引入，相当于是拷贝到 include 位置，如：
                ①、可以在对应组件的文件夹下创建一个wxml文件夹，并定义多个wxml文件，如header.wxml,footer.wxml文件
                ②、在组件的wxml文件中引入使用
                    <include src="./wxml/header.wxml"></include>
                    <view>这是组件内容</view>
                    <include src="./wxml/footer.wxml"></include>
            template和组件component有什么区别？
                这两者之间的区别是，template主要是展示，方法则需要在调用的页面中定义。而component组件则有自己的业务逻辑，
                可以看做一个独立的page页面。简单来说，如果只是展示，使用template就足够了，如果涉及到的业务逻辑交互比较多，
                那就最好使用component组件了。
                
    ·WXS
        介绍：wxs(wx script)是小程序的一套脚本语言，结合wxml，可以构建出页面的结构
        意义：mustache语法(双大括号)也能实现调用方法了
        使用：
            ①、第一种写法:只在wxml文件中实现WXS
                <view>{{ wxs1.testFunc(1) }}</view>

                <wxs module="wxs1">
                    function test(num){
                        // 注意：在wxs中不能使用let、const等es6的语法
                        console.log('测试...')
                        return num
                    }
                    module.exports = {
                        testFunc: test 
                    }
                </wxs>
            ②、第二种写法：在wxml同级目录下创建WXS文件，通过src引入
                1）在组件同xxx.wxml目录下创建一个xxx.wxs文件
                    function sum(a,b){
                        console.log('测试...')
                        return a+b
                    }
                    module.exports = {
                        testFunc: sum 
                    }
                2)在xxx.wxml中引入并使用
                    <view>
                        {{ wxs2.testFunc(1,2) }}
                    </view>

                    <wxs module="wxs2" src="./xxx.wxs" />
        拓展：require函数
            在.wxs模块中引用其他 wxs 文件模块，可以使用 require 函数。
            具体做法：
                ①、先定义好一个wxs文件
                ②、再定义一个wxs文件，并在第二个文件中引入第一个文件暴露的内容
                    var tools = require("./tools.wxs");

                    console.log(tools.FOO);
                    console.log(tools.bar("logic.wxs"));
                    console.log(tools.msg);
                ③、只把第二个文件写在wxml中
                    <wxs src="./../logic.wxs" module="logic" />

五、WXSS精讲
    介绍：WXSS (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式。
    尺寸单位：rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，
        屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
    ·wxss变量的使用
        wxss中使用变量(自定义主题颜色)
        1) 在App.wxss文件中
            page{
                // 定义主题颜色
                --xxx: #f00
            }
        2) 在需要用到的page中的wxss中
            .test{
                color: var(--xxx);
            }
    ·less中使用calc
        在我们书写.less文件使用calc的时候，我们需要对使用calc的样式做特殊处理。如
        width: ~'(calc(100vw - 100rpx))'
    ·样式导入
        微信小程序中可以直接通过@import导入样式文件
        @import './text.wxss'
        ------------
        注意：使用@import语句可以导入外联样式表，只支持相对路径
    ·动态类名写法
        微信小程序单条件class=“{{ xxx1 ? 'active': '' }}”
        微信小程序多条件class="{{ xxx1 ? 'active': '' }} {{ xxx2 ? 'activeT': '' }} {{ index3 ? 'activeH': '' }}"(以空格分隔)

六、WeUI的介绍
    ·简介
        WeUI是一套微信原生视觉体验一致的基础样式库，是微信小程序官方团队量身定做的库
七、常用标签(组件)精讲
    ·view
        属性：
            hover-class：指定按下去的样式类。默认值为none.当 hover-class="none" 时，没有点击态效果
            hover-stop-propagation： 指定是否阻止祖先节点的hover-class
            hover-start-time：按住后多久出现点击态，单位毫秒
            hover-stay-time：手指松开后点击态保留时间，单位毫秒
    ·text
        注意：text标签只能嵌套text
        属性：
            user-select：  默认值：false,文本是否可选，该属性会使文本节点显示为 inline-block
            space:        显示空格，分为三种：
                ensp      中文字符空格一半大小
                emsp      中文字符空格大小
                nbsp      根据字体设置的空格大小
            decode：       是否解码，很少用，了解即可
    ·image
        由于微信官网2M的限制，在我们使用图片的时候最好使用网络图片
        注意：
            image标签的默认尺寸是320*240
        属性：
            src：图片资源地址
            mode：共14中模式，4中缩放模式，9中裁剪模式
                scaleToFill     默认值，表示图片按照所给大小铺满，会变形
                aspectFit       相当于background-size：contain
                aspectFill      相当于background-size：cover
                widthFix        制定一个宽度，它会根据当前指定的宽度自动设置高度，原高度失效   ★★常用★★
                heightFix       和widthFix一样的意思
                --------------
                top             裁剪模式，不缩放图片，只显示图片的顶部区域
                bottom          裁剪模式，不缩放图片，只显示图片的底部区域
                center          裁剪模式，不缩放图片，只显示图片的中间区域
                left            裁剪模式，不缩放图片，只显示图片的左边区域
                right           裁剪模式，不缩放图片，只显示图片的右边区域
                top left        裁剪模式，不缩放图片，只显示图片的左上边区域
                top right       裁剪模式，不缩放图片，只显示图片的右上边区域
                bottom left     裁剪模式，不缩放图片，只显示图片的左下边区域
                bottom right    裁剪模式，不缩放图片，只显示图片的右下边区域	
            webp：默认不解析 webP 格式，只支持网络资源
            lazy-load：图片懒加载，在即将进入一定范围（上下三屏）时才开始加载(直接给image标签添加该属性即可使用)
            show-menu-by-longpress：开启长按图片显示识别小程序码菜单
            binderror：当错误发生时触发，event.detail = {errMsg}
            bindload：当图片载入完毕时触发，event.detail = {height, width}
    ·swiper
        介绍：
            滑块视图容器。其中只可放置swiper-item组件，否则会导致未定义的行为。默认大小是100% * 150
        简单使用：
            <swiper>
                <swiper-item class="one" item-id=""></swiper-item>
                <swiper-item class="two" item-id=""></swiper-item>
                <swiper-item class="three" item-id=""></swiper-item>
            </swiper>
        属性：
            大多数是一些跟轮播图的一些属性，详情请看文档
    ·navigator
        介绍：
            用于声明式的页面跳转
        属性：
            url:             要跳转的路径
            target：  
                self             默认值，在当前小程序中跳转
                miniProgram      向其他小程序中跳转
            open-type:        表示跳转方式
                navigate          默认值，具有返回的效果，对应wx.navigateTo
                redirect          对应 wx.redirectTo 的功能   
                switchTab         对应 wx.switchTab 的功能
                reLaunch          对应 wx.reLaunch 的功能
                navigateBack      对应 wx.navigateBack 的功能
                exit              退出小程序，target="miniProgram"时生效
    ·rich-text
        介绍：
            富文本编辑标签，相当于vue中的v-html
        属性：
            nodes     默认值是一个[],值可以是节点列表或者html字符串
        如下案例：
            <rich-text nodes="{{value}}"></rich-text>
            js文件中：
                data: {
                    // 第一种写法: 以html字符串的形式出现
                    value: '<div class="test">测试标签</div>'
                    // 第二种写法：以对象数组的形式出现
                    value: [
                        // 1.div标签，用name属性来制定是什么
                        name: 'div',
                        // 2.标签上有哪些属性
                        attrs：{
                            // 标签上的属性
                            class: 'my-class',
                            style: 'color:red;'
                        },
                        // 3.子节点children要接收的数据累心和nodes第二种渲染方式的数据类型一致
                        children: [
                            {
                                name: 'p',
                                children: [
                                    {
                                        type: 'text',
                                        text: 'hello'
                                    }
                                ]
                                
                            }
                        ]
                    ]
                }
            
    ·icon
        (略，详情请参考文档）
    ·radio  
        介绍：单选标签，必须要和父元素radio-gorup来一起使用
        属性：
            value        当该radio 选中时，radio-group 的 change 事件会携带radio的value
            checked      当前是否选中,用该属性可以设置默认值
            disabled	 是否禁用
            color        radio的颜色，同css的color
        使用：
            <radio-group bind:change="radioChange">
                <radio value="male" checked>男</radio>
                <radio value="female">女</radio>
            </radio-group>
            js文件中：
                // 使用bindchange事件来拿到当前所选的值
                radioChange(e){
                    const data = e.detail.value
                }
    ·checkbox
        介绍：多选框标签，必须和父元素checkbox-group一起使用
        属性：
            value        checkbox标识，选中时触发checkbox-group的 change 事件，并携带 checkbox 的 value
            disabled	 是否禁用
            checked      当前是否选中，可用来设置默认选中
            color        checkbox的颜色，同css的color
    ·button
        size: 按钮的大小,默认自：
            default： 默认值,默认居中对齐，块级元素
            mini：    小尺寸,设置后变为行内块元素
        type: 按钮的样式类型
            default   默认值，白色
            primary   绿色
            warn      红色
        plain: 默认值为false,按钮是否镂空，背景色透明
        disabled: 是否禁用
        loading: 名称前是否带 loading 图标
        form-type: 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件
        open-type: 微信开放能力(★★非常重要！★★)，值如下↓↓↓
            1.contact                   直接打开客服对话功能， 需要在微信小程序的后台配置(只能通过真机来调试)
            2.share                     转发当前的小程序到微信朋友中 不能把小程序分享到朋友圈
            3.getPhoneNumber            获取当前用户的手机号码信息 结合一个事件getpnonenumber 来使用 不是企业的小程序账号 没有权限来获取用户的手机号码
                注意：
                    1.获取的数据是加密过的，需要用户自己搭建小程序的后台服务器才能看到信息
            4.getUserInfo               获取当前用户的个人信息
            5.launchApp                 在小程序中直接开打app
            6.openSetting               打开小程序内置的授权页面
            7.feedback                   打开小程序的内置的意见反馈页面 (只能通过真机来调试)
    ·movable-area 和 movable-view
        效果：在指定范围内随意移动
    ·scroll-view
        可滚动视图区域。使用竖向滚动时，需要给scroll-view一个固定高度，通过 WXSS 设置 height。
        组件属性的长度单位默认为px，2.4.0起支持传入单位(rpx/px)。
        示例如下：
        <scroll-view scroll-y class="right-scroll" scroll-top="{{scrollTop}}">
            <view wx:for="{{rightArr}}" wx:key="cat_id"></view>
        </scroll-view>
        
八、自定义组件
    ·介绍
        自定义组件类似于页面，自定义组件拥有自己的 wxml 模板和 wxss 样式。
    ·创建自定义组件
        1)创建一个components文件夹，里面存放你的component(同page一样)
        2)创建完后在page的一个页面中的js文件中注册
            {
                "usingComponents": {
                    "comp": "/components/comp1/comp1"
                },
            }
        3)在page页面的wxxml文件中使用
            <comp></comp>
    ·父页面向子组件传值
        父页面中：
            // 随便定义一个属性xxx
            <myCom1 xxx="{{myValue}}"/>
        子组件中：
            wxjs文件：
                properties: {
                    // 在这里声明父组件(页面传过来的变量)
                    // 第一种写啊
                    xxx: String,
                    // 第二种写法
                    xxx: {
                        type: String,
                        value: [],   // 给传过来的属性给个默认值
                        observer: function (newVal, oldVal, changedPath) {
                          // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串
                          // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                        }
                    }
                },
            wxml文件：
                <view>{{xxx}}</view>
    ·子组件向父页面传值
        父页面中：
            <view bind:myClick="handleClick">我是一个组件</view>    
            js文件中：
                handleClick(e){
                    // 通过事件e可拿到子组件传来的数据
                    console.log(e.detail.aaa)
                }
        子组件中：
            1)在js文件的methods对象中的xxx函数：
                // 使用triggerEvent方法触发父页面的函数并传值
                this.triggerEvent('myClick',{ id: 1  },{})
                // 第一个参数代表事件名，第二个参数代表需要传递的数据，第三个参数代表配置项(详情搜索‘组件间通信’)，比如阻止事件冒泡等,如下
                    bubbles    默认值：false       事件是否冒泡
                    composed   默认值：false       事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
                    capturePhase  默认值：false    事件是否拥有捕获阶段
    ·小程序slot插槽的用法
        注意：原理和vue的普通插槽基本一样的用法，如下
        父组件中：
            <Son>
                <view>嘤嘤嘤~~</view>
            </Son>
        子组件中：
            <view>
                这是子组件,给子组件添加一个slot标签进行插槽的使用
                <slot></slot>
            </view>
    ·外部拓展类样式
        父页面中：
            <Father "my-class"="xxx"></Father>

            *wxss文件中
                .xxx{
                    height: 28rpx;
                }
        子组件中：
            1)在js文件中，定义一个externalClasses属性，值为类的名字
            Component({
                externalClasses: ['my-class']
            })
    拓展：小程序组件通信的方式汇总：
        ①、properties (父传子，详情见上)
        ②、triggerEvent(子传父，详情见上)
        ③、selectComponent (子传父)
            介绍：
                使用选择器选择组件实例节点，返回匹配到的第一个组件实例对象，类似 Vue 的 ref
            使用：
                父组件中：
                    <Child class="hehe"></Child>
                    js文件：
                        onload(){
                            console.log(this.selectComponent('.hehe'))
                        }
        ④、selectOwnerComponent (父传子) 
            介绍：
                选取当前组件节点所在的组件实例（即组件的引用者），返回它的组件实例对象，类似 Vue 的 $parent
            使用：
                this.selectOwnerComponent().data
        ⑤、globalData (全局通信)
            介绍：
                将数据挂载到 app.js，这种方式在开发中很常用。通过getApp()，我们能够在任何一个页面内访问到app实例。
            使用：
                app.js文件中：
                    App({
                        globalData:{
                            list: [1,2,3]
                        }
                    })
                任意组件、pages文件的js中：
                    onload: function(){
                        const app = getApp()
                        console.log(app.globalData.list)
                    }
        ⑥、storage (全局通信)
            介绍：
                storage并不是作为通信的主要方式。storage 主要是为了缓存数据，并且最多只能存储10M的数据，我们应该合理使用storage、
            使用：
                wx.setStorageSync('timestamp', Date.now())
                wx.getStorageSync('timestamp')
                wx.removeStorageSync('timestamp')
        ⑦、eventBus (全局通信，了解)
        ⑧、getCurrentPages (全局通信)
            介绍：
                getCurrentPages() 获取当前页面栈，数组中第一个元素为首页，最后一个元素为当前页面
                元素为一个对象，里面存放着页面的信息，包括route（页面路径）、options（onLoad拿到的参数）、method、data等
            注意：
                * 不要尝试修改页面栈，会导致路由以及页面状态错误。
                * 不要在 App.onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
            使用：
                let pages = getCurrentPages();  // 获取当前页面栈
                let prevPage = pages[pages.length - 2]; // -2 就是你上一页的数据 你上上页的数据就是-3 了以此类推！
                // 直接操作上一个页面的 index数据 之后返回 
                prevPage.setData({
                    index:index
                },function(){
                    wx.navigateBack()
                })
            
九、小程序的生命周期
    ·App对象的生命周期
        1.onLaunch
            当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
        2.onShow
            当小程序启动，或从后台进入前台显示，会触发 onShow
        3.onHide
            当小程序从前台进入后台，会触发 onHide
        4.onError
            当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
        5.onPageNotFound
            当该页面不存在时触发的钩子函数
    ·page对象的生命周期
        1.onLoad
            监听页面加载(第一个触发，在这里可以发送请求)
        2.onShow
            监听页面初次渲染完成
        3.onReady
            监听页面显示
        4.onHide
            监听页面隐藏(如切换后台会隐藏)
        5.onUnload
            监听页面卸载(即组件卸载时触发，条件是页面关闭)
        -------
        6.onPullDownRefresh
            监听用户下拉动作
            如何配置下拉刷新？
                需要在 pages.json 里，找到的当前页面的pages节点，并在 style 选项中开启 "enablePullDownRefresh": true
            如何关闭下拉刷新？
                wx.stopPullDownRefresh();
        7.onReachBottom
            页面上拉触底事件的处理函数

        8.onShareAppMessage
            用户点击右上角分享
        9.onPageScroll
            页面滚动触发事件的处理函数
        10.onResze
            页面尺寸改变时触发
        11.onTabItemTap
            当前是tab页时，点击tab时触发
    ·组件的生命周期
        1.created
            组件实例刚刚被创建好时， created 生命周期被触发。此时，组件数据 this.data 就是在 Component 
            构造器中定义的数据 data 。 此时还不能调用 setData 。 通常情况下，这个生命周期只应该用于给组件 this 
            添加一些自定义属性字段。
        2.attached
            在组件完全初始化完毕、进入页面节点树后， attached 生命周期被触发。此时， this.data 已被初始化为组件的
            当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
        3.detached
            在组件离开页面节点树后， detached 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 detached 会被触发
        4.ready
            在组件在视图层布局完成后执行
        5.moved
            在组件实例被移动到节点树另一个位置时执行
        6.error
            每当组件方法抛出错误时执行
        拓展：
            自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）。
            Component({
                lifetimes: {
                    created(){
                        console.log(在组件实例刚刚被创建时执行)
                    }
                    attached: function() {
                        console.log(在组件实例进入页面节点树时执行)
                    },
                    detached: function() {
                        console.log(在组件实例被从页面节点树移除时执行)
                    },
                    ready(){
                        在组件在视图层布局完成后执行
                    },
                    moved(){
                        在组件实例被移动到节点树另一个位置时执行
                    },
                    error(){
                        每当组件方法抛出错误时执行
                    }
                },
                pageLifetimes: {
                    show(){
                        console.log('页面展示时加载')
                    },
                    hide(){
                        cnosole.log('页面隐藏时被加载~')
                    },
                    resize(){
                        console.log('页面尺寸变化时加载~')
                    }
                }
                // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容(已经废弃，请扎起lifetimes中写)
                attached: function() {
                    // 在组件实例进入页面节点树时执行
                },
            })
            // 注意：如果同时写lifetimes的created和同级的created，如下：
                lifetimes: {
                    created(){
                        console.log(1)
                    }
                },
                created(){
                    console.log(2)
                }
                结果是： 1,   说明只会触发1个
十、页面的跳转(小程序路由)和传值    
    ·wx.navigateTo({})
        保留当前页面(不会销毁组件)，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
        注意：使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。在小程序插件中使用时，只能在当前插件的页面中调用
        属性：
            url：需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 ? 分隔，、
                参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2'
                拓展：微信小程序如何获取url传递过来的参数？
                    在对应的page页面的js文件里面的onload有个options选项，可以拿到参数
                    onLoad(options){
                        console.log(options.xxx)
                    }
            success：  接口调用成功的回调函数
            fail：     接口调用失败的回调函数
            complete： 接口调用结束的回调函数（调用成功、失败都会执行）
            events：   页面间通信接口，用于监听被打开页面发送到当前页面的数据。
    ·wx.navigateBack({})
        关闭当前页面(即销毁页面)，返回上一页面或多级页面。
        注意：可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
        属性：
            delta：默认值为1。返回的页面数，如果 delta 大于现有页面数，则返回到首页
            success：  接口调用成功的回调函数
            fail：     接口调用失败的回调函数
            complete： 接口调用结束的回调函数（调用成功、失败都会执行）
    ·wx.redirectTo({})
        关闭当前页面(即销毁页面)，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
        属性：
            url：需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 ? 分隔，、
                参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2'
            success：  接口调用成功的回调函数
            fail：     接口调用失败的回调函数
            complete： 接口调用结束的回调函数（调用成功、失败都会执行）
    ·wx.switchTab({})
        关闭所有页面(即销毁页面)，跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
    ·wx.reLaunch({})
        关闭所有页面(即销毁页面)，打开到应用内的某个页面
        属性：
            同wx.redirectTo
十一、拓展知识   
    ·数据缓存
        *同步缓存
            wx.setStorageSync(string key, any data)
        *异步缓存
            wx.setStorage({})
        *同步读取
            wx.getStorageSync({})    从本地缓存中同步获取指定 key 的内容
        *异步读取
            wx.getStorage({})       从本地缓存中异步获取指定 key 的内容
        *清除缓存
            wx.clearStorage({})      清理本地数据缓存
    ·背景音频
        wx.playBackgroundAudio({})
十二、wx.request()请求的封装
    1.在api(或者说request)文件夹下，创建一个index.js文件，之后将封装好的request暴露出去使用
        ·api -->  index.js
            let ajaxCount = 0;
            const ajax = (params)=>{
                // 设置loading
                ajaxCount++;
                wx.showLoading({
                    title: '加载中...',
                    mask: true
                });
                
                // 配置公共的请求路径
                const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
                return new Promise((resolve, reject)=>{
                    wx.request({
                        ...params,
                        url: baseUrl + params.url,
                        success: (res)=>{
                            console.log(res);
                            resolve(res.data);
                        },
                        fail: (err)=> {
                            reject(err)
                            throw Error(err)
                        },
                        complete: ()=>{
                            ajaxCount--;
                            if(ajaxCount === 0) {
                                wx.hideLoading();
                            }
                        }
                    })
                })
            }
            export default ajax;
十三、微信小程序中一些常用的API
    ·wx.showLoading   显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
        参数：
            title：       提示的内容
            mask：        是否显示透明蒙层，防止触摸穿透
            success：     接口调用成功的回调函数
            fail：        接口调用失败的回调函数
            complete：    接口调用结束的回调函数（调用成功、失败都会执行）
        适用场景：通常用于封装好的wx.request请求中
            详情见--------------> 十二
    ·wx.previewMedia  预览图片和视频。
        主要参数：
            current：     当前显示的资源序号
            sources：     需要预览的资源列表
    ·wx.showToast  显示消息提示框
        主要参数：
            title:        提示的内容
            icon:         图标
            mask:         是否显示透明蒙层，防止触摸穿透
            success:      接口调用成功的回调函数
    ·wx.chooseAddress  获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
        参数：
            success：     接口调用成功的回调函数
            fail：        接口调用失败的回调函数
            complete：    接口调用结束的回调函数（调用成功、失败都会执行）
        注意：这个要配合ex.getSetting来使用，以防止用户点击取消后再次点击无效的问题。
    ·wx.getSetting   获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
    ·getCurrentPages  获取当前的页面栈


拓展：小程序性能优化方案：
    1）.清理无用代码
　　2）.采用分包策略
　　3）.压缩图片，使用适当图片格式
　　4）.精简代码，去掉不必要的WXML结构和未使用的WXSS定义
    5）.减少setData次数
    6) .合理使用wx:if和hidden


    ------------------------
    
            














        


*/


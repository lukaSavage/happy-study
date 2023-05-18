/* 
★★★★★★★★★★★★★★   1.uniApp基础   ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★ 
一、uniapp介绍
    uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、H5、
    以及各种小程序（微信/支付宝/百度/头条/QQ/钉钉/淘宝）、快应用等多个平台。
二、全局外观配置(globalStyle,pages.json文件中配置)
    "globalStyle": {
		"navigationBarTextStyle": "black",            // 导航栏标题颜色及状态栏前景颜色，仅支持 black/white
		"navigationBarTitleText": "uni-app",          // 导航栏标题文字内容
		"navigationBarBackgroundColor": "#08e",       // 导航栏背景颜色（同状态栏背景色）
		"backgroundColor": "#F8F8F8"                  // 下拉显示出来的窗口的背景色
    }
三、pages.json
    介绍：pages.json是整个项目的page配置，包括页面路由、tabBar等功能
    ·page
        通过 pages 节点配置应用由哪些页面组成，pages 节点接收一个数组，数组每个项都是一个对象，其属性值如下
            *path: 配置页面路径
            *style: 配置页面窗口表现
            详情如下：
                "pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
                    {
                        "path": "pages/index/index",
                        "style": {
                            "navigationBarTitleText": "uni-app"
                        }
                    },
                    {
                        "path": "pages/Message/index",
                        "style": {
                            "navigationBarTitleText": "msg组件"
                        }
                    },
                    ...
                ],
    ·tabBar的设置
        (详情请看官方文档)
        "tabBar": {
            "color": "#7A7E83",                 // tab文字的默认颜色
            "selectedColor": "#3cc51f",         // tab选中时的颜色
            "borderStyle": "black",             // tab的背景色
            "backgroundColor": "#ffffff",
            "list": [{
                "pagePath": "pages/index/index",                           // tab的页面路由地址
                "iconPath": "static/images/tabs/home.png",                 // 每个tab的图标
                "selectedIconPath": "static/images/tabs/home-active.png",  // 每个tab被选中的图标
                "text": "组件"                                             // tab的文字说明
            }, {
                "pagePath": "pages/Message/index",
                "iconPath": "static/images/tabs/message.png",
                "selectedIconPath": "static/images/tabs/message-active.png",
                "text": "消息"
            }]
        }
    ·condition (了解，其实可以直接在微信开发者工具中配置)
        启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。
        属性：
            *current 当前激活的模式，list节点的索引值
            *list    启动模式列表
        配置示例：在pages.json文件中
            "condition":{
                "current": 0,
                "list": [
                    {
                        "name": "详情页",
                        "path": "pages/detail/detail",
                        "query": "id=80"
                    }
                ]
            }
四、基础组件
    ·text(相当于span行内标签)
        属性：
            selectable：     文本是否可选，默认值：false
            space:           显示连续空格
                ensp:中文字符空格一半大小
                emsp:中文字符空格大小
                nbsp:根据字体设置的空格大小   
            decode:          是否解码 默认值：false
    ·view(相当于div块级标签)
        属性：  
            hover-class：指定按下去的样式类。当 hover-class="none" 时，没有点击态效果
            hover-stop-propagation：指定是否阻止本节点的祖先节点出现点击态
            hover-start-time：按住后多久出现点击态，单位毫秒
            hover-stay-time：手指松开后点击态保留时间，单位毫秒
    ·button
        属性：
            size:            按钮的大小
                default：默认值
                mini：行内块元素
            type:            button组件的样式
                default：默认值
                primary：浅蓝色背景
                warn: 红色背景
            ...(属性太多，详情请看官网文档)
    ·image
        注意：<image> 组件默认宽度 300px、高度 225px
        属性：
            src：            图片资源地址
            mode：           图片裁剪、缩放的模式
                mode 有 13 种模式，其中 4 种是缩放模式，9 种是裁剪模式。(详情请看官网文档)
            ...(属性太多，详情请看官网文档)
五、uni中的样式说明
    ·rpx
        * rpx 即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750rpx恰好为屏幕宽度。屏幕变宽，
            rpx 实际显示效果会等比放大。
        * 使用@import语句可以导入外联样式表，@import后跟需要导入的外联样式表的相对路径，用;表示语句结束
        * 支持基本常用的选择器class、id、element等
        * 在 uni-app 中不能使用 * 选择器。
        * page 相当于 body 节点
        * 定义在 App.vue 中的样式为全局样式，作用于每一个页面。在 pages 目录下 的 vue 文件中定义的样式为局部样式，
            只作用在对应的页面，并会覆盖 App.vue 中相同的选择器。
        * uni-app 支持使用字体图标，使用方式与普通 web 项目相同，需要注意以下几点：
            ·字体文件小于 40kb，uni-app 会自动将其转化为 base64 格式；
            ·字体文件大于等于 40kb， 需开发者自己转换，否则使用将不生效；
            ·字体文件的引用路径推荐使用以 ~@ 开头的绝对路径。
六、uni中的数据绑定、事件
    在页面中需要定义数据，和我们之前的vue一摸一样，直接在data中定义数据即可
    export default {
        data () {
            return {
                msg: 'hello-uni'
            }
        }
    }
    ·v-for、v-bind
        和我们之前的vue一模一样！！！
    ·uni中的事件
        和我们之前的vue一模一样！！！
七、uni中的生命周期
    ·app对象的生命周期(主要是App.vue, 和小程序的生命周期一模一样)
        onLaunch         初始化完成时触发(全局只触发一次)
        onShow           后台进入前台时显示
        onHide           前台进入后台是显示
        onError          报错时触发
    ·page对象的生命周期(写入到page.json的vue文件，和小程序的生命周期一模一样)
        onLoad           监听页面加载，其参数为三个页面传递的数据，参数类型为Object(用于页面传参)
        onShow           监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面。
        onReady          监听页面初次渲染完成
        onHide           监听页面隐藏
        onUnload         监听页面卸载
        ...(详情请见官网)
    ·组件的生命周期(和vue的生命周期的前8个一模一样)
八、page对象生命周期的一个下拉钩子---onPullDownRefresh
    ·onPullDownRefresh：监听用户下拉动作，一般用于下拉刷新
        如何配置下拉刷新？
            需要在 pages.json 里，找到的当前页面的pages节点，并在 style 选项中开启 "enablePullDownRefresh": true
九、page对下你给生命周期一个监听滚动的钩子 ----onReachBottom
    ·onReachBottom：页面滚动到底部的事件。常用于下拉下一页数据
十、uniapp发送请求
    和原生微信小程序开发发送请求很像
        原生：wx.request({
            method: 'GET',
            url: '',
            success(){
                ...
            }
        })
        uni: uni.request({
            method: 'GET',
            url: '',
            success(){
                ...
            }
        })
十一、uni中的数据缓存
    * uni.setStorage({xxx:xxx})/unigetStorage()
        ·缓存：将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口
        ·读取：从本地缓存中异步获取指定 key 对应的内容
        用法如下：
            缓存：
                uni.setStorage({
                    key: 'xxx',
                    data: '呵呵',
                    success(){
                        console.log('缓存成功')
                    }
                })  
            读取：
                uni.setStorage({
                    key: 'xxx',
                    success(res){
                        console.log('res.data)
                    }
                })  
    * uni.setStorageSync(key,data)/uni.getStorageSync
        ·缓存：将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
        ·读取：从本地缓存中同步获取指定 key 对应的内容。
        用法和上面一样
            略...
    * uni.removeStorage/uni.removeStorageSync
        从本地缓存中异步/同步移除指定 key。
十一、图片上传和预览(小程序最多上传5张)
    uni.chooseImage(OBJECT)
        从本地相册选择图片或使用相机拍照。
        用法:
            uni.chooseImage({
                count: 5,
                success(res){
                    console.log(res)
                }
            })
十二、条件编译
    1.概念
        条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。
    2.写法：
        以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。
            #ifdef：if defined        指仅在某平台存在
            #ifndef：if not defined   指除了某平台均存在
            %PLATFORM%：              平台名称
    
        ·平台标识(https://uniapp.dcloud.net.cn/tutorial/platform.html#%E8%B7%A8%E7%AB%AF%E5%85%BC%E5%AE%B9)
            值：                       平台
            ---------------------------------
            APP-ANDROID                App Android 平台 仅限 uts文件
            APP-IOS                    App iOS 平台 仅限 uts文件
            APP-PLUS                   5+App
            H5                         h5
            MP-WEIXIN                  微信小程序
            MP-ALIPAY                  支付宝小程序
            MP-BAIDU                   百度小程序
            MP-TOUTIAO                 头条小程序
            MP-QQ                      QQ小程序
            MP                         微信小程序/支付宝小程序/百度小程序、头条小程序/QQ小程序
            ----------------------------------

        ·代码演示
            <!-- #ifdef H5 -->
            <view>我吸完在h5页面中展示</view>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <view>我希望只在微信小程序页面中看见</view>
            <!-- #endif -->
            
            同样，在js脚本中我们也可以进行条件编译区分，如下
            onLoad() {
                // #ifdef H5
                console.log('我只出现在h5中打印')
                // #endif
                // #ifdef MP-WEIXIN
                console.log('我希望微信小程序中打印')
                // #endif
            }
十三、uni中的导航跳转与传参
    ·导航跳转
        1.声明式：(和小程序跳转一样，使用navigator内置组件)
            ★★★注意：该组件类似HTML中的<a>组件，但只能跳转本地页面。目标页面必须在pages.json中注册。★★
            // 跳转普通页面
            <navigator url="/pages/detail/index"></navigator>
            // 跳转tabBar页面,需要价格open-type属性
            <navigator url="/pages/detail/index" open-type="switchTab"></navigator>
        2.编程式：
            uni.navigateTo({
                url: '/pages/detail/index'
            })
    ·传参
        通常以params的方式进行传参，如下
        <navigator url="navigate/navigate?title=navigate" hover-class="navigator-hover">

        // navigate.vue页面接受参数
        export default {
            onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
                console.log(option.id); //打印出上个页面传递的参数。
                console.log(option.name); //打印出上个页面传递的参数。
            }
        }
        // 关于其他传参方式可以参考如下文章
        链接：https://uniapp.dcloud.net.cn/component/navigator.html#navigator
十四、uni组件通信
    提示：
        ①、需要在pages目录同级的地方创建一个components文件夹，把创建好的组件放到里面即可
        ②、uni组件的生命周期和vue生命周期的前8个完全一样
    uni组件之间的通信
        1.父传子  -----------------props
            同vue的props传值
        2.子传父  -----------------自定义事件($emit)
            同vue的自定义事件
        3.任意组件传值  ------------事件总线(uni.$on、uni.$emit)



拓展：uniapp中常见面试题？
    说说uniapp常见的坑有哪些？
        1.v-show无效问题(在支付宝小程序中也无效)
            在自定义组件的时候，如果直接写在自定义标签上，app上面是无效的，需要嵌套一层view标签才行
            -----这样写无效------
            <videoPage v-show="page===1"></videoPage>
            ------------------
            -------改正---------
            <view>
                <videoPage v-show="page===1"></videoPage>
            </view>
        2.dom操作
            在uni-app中基本可以说是没有dom这个概念的，只有节点这个概念，如果你想通过js的方式去创建添加dom，建议不要这么做，
            uni中可操作的dom功能只有更改获取它的宽高坐标等。
        3.scroll-view设定样式无效
            需要在scroll-wrap上设置才行
        4.直接写固定样式，没问题，当使用动态绑定style时，使用upx单位在微信小程序端会位置错乱，使用rpx之后正常
 
 
 




























 */
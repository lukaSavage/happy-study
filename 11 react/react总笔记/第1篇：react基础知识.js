/* 
★★★★★★★★★★★★★★★ 1、react基本知识 ★★★★★★★★★★★★★★★★★★★★★★★★★
一、React的基本介绍
    1.react是什么？
        由Facebook开源的、用于构建用户界面的 JavaScript 库(只关注于View)
    2.react特点
        1)	Declarative(声明式编码)
        2)	Component-Based(组件化编码)
        3)	Learn Once, Write Anywhere(一次学习，随处编写)
        4)	支持客户端与服务器渲染
        5)	高效
    3.高效的原因
        1)	虚拟(virtual)DOM, 不总是直接操作DOM
        2)	DOM Diff算法, 最小化页面重绘, 减少重排重绘的次数
    4.包文件说明
        1) react.develepment.js             react的核心包
        2) react-dom.develepment.js         主要将虚拟DOM变为真实的DOM
        3) babel.js                         编译包
        4) prop-types.js                    对props做类型限制和必要性限制,向外暴露的是PropTypes这个变量
二、JSX的基本介绍
    1.什么是JSX？
        1)	全称:  JavaScript XML
        2)	react定义的一种类似于XML的JS扩展语法: XML+JS
        3)	作用: 用来创建react虚拟DOM(元素)对象
            a.	var ele = <h1>Hello JSX!</h1>
            b.	注意1: 它不是字符串, 也不是HTML/XML标签
            c.	注意2: 它最终产生的就是一个JS对象
        4)	标签名任意: HTML标签或其它标签
        5)	标签属性任意: HTML标签属性或其它
        6)	基本语法规则
            a.	遇到 <开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析
            b.	遇到以 { 开头的代码，以JS语法解析: 标签中的js代码必须用{ }包含
二、创建虚拟对象的两种方式
    1.React自带的方案      React.createElement
        *React.createElement介绍
            方法有三个参数，第一个代表需要创建的标签名，第二个代表标签的一些属性，第三个代表往div添加的虚拟DOM
        *具体用法如下：
            const small = React.createElement('h1',null,'我是虚拟DOM')
            const vDom=React.createElement('div',{id: 'title', className: 'titel1'},small)
            ReactDOM.render(vDom,document.getElementById('test1'));
    2.JSX方案
        const str = '我是一个字符串';          //注意：数据可以是数组，但不能是对象或者函数，不然会报错
        const vDom2 = <div id="one">
                <h1>我是vDOM2的内容<br/>{str}</h1>
            </div>        
        ReactDOM.render(vDom2,document.querySelector('#test2'));
    ----------------------高级部分--------------------
    1.React.createElement渲染出来的数据是怎样的？
        import { jsx as _jax } from 'react/jsx-runtime'; 
        const _jsx = {                          // 17.0版本之前是React.createElement,但因为要引入React，索引改成_jsx
            $$typeof: Symbol(react.element)
            key: null
            props: {children: "111"}
            ref: null
            type: "div"
            _owner: null
            _store: {validated: false}
            _self: null
            _source: {fileName: "E:\\study\\11 react\\exercise\\src\\index.js", lineNumber: 11}
            __proto__: Object
        }
        拓展：如何使用原来渲染的React.createElement方式？
            在scripts
    2.React渲染DOM的流程？
        自己写的代码   --->  经过webpack打包、经过babel转义编译成_jsx，进而形成虚拟DOM   -->放入到reactDOM.render,通过该方法生成真实DOM

三、模块与组件和模块化与组件化的理解
    1.模块
        理解:        向外提供特定功能的js程序, 一般就是一个js文件
        为什么使用:   js代码更多更复杂
        作用:        复用js, 简化js的编写, 提高js运行效率
    2.组件
        理解: 用来实现特定(局部)功能效果的代码集合(html/css/js)
        为什么: 一个界面的功能更复杂
        作用: 复用编码, 简化项目编码, 提高运行效率
    3.模块化
        当应用的js都以模块来编写的, 这个应用就是一个模块化的应用
    4.组件化
        当应用是以多组件的方式实现, 这个应用就是一个组件化的应用
四、React创建组件的两种方式
    1.工厂函数组件(简单组件)
        function FnComponent(){
            return <h1>这是通过工厂函数创建的组件</h1>
        }
        ReactDOM.render(<FnComponent/>,document.querySelector('#app'));
    2.ES6类组件(复杂组件)
        class ClassComponent extends React.Component {
            render() {
                return <h1>这是通过ES6类的方式创建的组件</h1>
            }
        }
        ReactDOM.render(<ClassComponent />, document.querySelector('#app2'));
    -----------------------------------------------------------
    ★★注意事项：★★
        1)	组件名必须首字母大写(不然会当做html同名标签解析,如果没有该标签，则报错)
        2)	虚拟DOM元素只能有一个根元素
        3)	虚拟DOM元素必须有结束标签

    *两者的区别：
        1.this指向问题
            ·工厂函数的this指向undefined(原因是严格模式)
            ·ES6类的this指向的是这个类的实例对象(即该类的名字)
        2.调用问题
            ·工厂函数是通过普通调用，得到返回的虚拟DOM对象，在渲染到页面的指定容器中，且不能使用state、生命周期、ref，功能较少
            ·ES6类是通过new调用类，得到实例对象。调用实例对象的render方法，得到返回的虚拟DOM对象，在渲染到页面的指定容器中
        3.使用场景
            当组件没有使用到state、生命周期、ref的时候，可以使用工厂函数，反之，只能使用ES6类
五、组件的三大属性
    ·state
        1.理解
            1)	state是组件对象最重要的属性, 值是对象(可以包含多个数据)
            2)	组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
        2.重要操作
            1)初始化状态
                旧版：(需要使用constructor函数，需要手动改变this指向。麻烦)
                    constructor(){
                        super();
                        this.state = {
                            isLikeMe : true
                        }
                        this.click = this.click.bind(this);
                    }
                新版：(解决了旧版的问题，方便)
                    state = {
                        isLikeMe : true
                    }
            2)更新state的值(需要用到setState()方法,在事件中使用)
                this.setState({
                    isLikeMe : !isLikeMe
                })    
        3.setState详解
            ·介绍
                setState() 并不总是立即更新组件。它会批量推迟更新。这使得在调用 setState() 后立即读取 this.state 成为了隐患。
                为了消除隐患，请使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)），这两种方式
                都可以保证在应用更新后触发。
            ·写法
                ①、只传入一个对象
                    this.setState({xxx: xxx});
                ②、第一个参数传入函数，第二个参数传入函数(可选)
                    this.setState(state => ({count: state.count + 1}), () => { 
                        在状态更新且界面更新之后回调
                        console.log('test3 setState callback()', this.state.count)
                    })
                ③、第一个参数传入对象
                    this.setState({count: this.state.count + 1}), () => {
                        // 在状态更新且界面更新之后回调
                        console.log('test3 setState callback()', this.state.count)
                    })
            ·同步和异步问题
                #同步：非react控制的异步回调函数中: 定时器回调 / 原生事件监听回调 / promise回调 /...
                #异步：在react控制的回调函数中: 生命周期勾子 / react事件监听回调

    ·props
        1.理解
            1)	每个组件实例对象都会有props(properties的简写)属性
            2)	组件标签的所有属性都保存在props中
        2.作用
            1)	通过标签属性从组件外向组件内传递变化的数据
            2)	注意: 组件内部不要修改props数据
        3.重要操作(★记得引入prop-types文件,才能做类型限制★)
            1)对传入的props进行类型限制和必要性限制，如果不符合限制，就报错
                旧版：
                    Person.propTypes = {
                        // PropTypes这个变量其实是prop-types.js这个文件暴露出来的
                        name: PropTypes.string.isRequired,
                        age: PropTypes.number,
                        sex: PropTypes.string,
                    }
                新版：
                    static propTypes = {
                        // name的值为字符串类型，且必须填
                        name: PropTypes.string.isRequired,
                        age: PropTypes.number,
                        sex: PropTypes.string,
                    }
            2)设置默认值
                旧版：
                    Person.defaultProps = {
                        name: 'LukaSavage',
                        age : 18,
                        sex : '女'
                    } 
                新版：
                    static defaultProps = {
                        name: 'LukaSavage',
                        age : 18,
                        sex : '女'
                    }
            3)在constructor中无法获得props的问题
                解决方法：将props作为参数传进去即可
                constructor(props) {
                super(props);
                // super(props); 就是为了能在 constructor 中获取props（如果不传就获取不到）
                console.log(this.props);
            }


    ·refs
        1.理解
            组件内的标签都可以定义ref属性来标识自己，说白了refs属性是为了获取真实的DOM元素的
        2.通过refs获取真实DOM元素的三种方法
            a.	<input type="text" ref="xxx" /> (有性能上的问题，即将废弃)
                    //这样一来实例对象(this)就有个refs这个属性，这个属性的值是一个对象{xxx:input},通过xxx.value获取输入的值
                    console.log(this.refs.xxx.value)

            b.	<input type="text" ref={xxx => this.suibian = xxx}/> (占用了内存，不好)
                    //通过如下获取input输入的值
                    console.log(this.suibian)
            c.	<input type="text" ref={this.xxx}/> (推荐使用)
                    具体做法：(旧)
                        constructor(){
                            super();
                            this.xxx = React.createRef();     //this.xxx获得的是一个对象，{current: null},当把this.xxx传入到input中就有值了
                        }
                        (新) xxx = React.createRef();         //用此方法取代上面的constructor
                        <input type="text" ref={this.xxx}/> 
                    //通过如下获取input输入的值
                    console.log(this.xxx.current.value)
            d.	回调函数在组件初始化渲染完或卸载时自动调用
        注意：如果触发事件的目标元素就是要获取的元素，请使用event.target
            反之则用ref
    --------------------------------------------------------
    react的事件处理
        1)通过onXxx属性指定组件的事件处理函数(注意大小写)
            a.	React使用的是自定义(合成)事件, 而不是使用的原生DOM事件
            b.	React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)
        2)通过event.target得到发生事件的DOM元素对象
            <input onFocus={this.handleClick}/>
六、受控组件和非受控组件
    1.概念？
        非受控组件：通过ref收集表单数据
            特点是：需要操作DOM元素，性能不好，react不建议操作DOM元素
            使用场景：单个input表单提交数据
        受控组件：
            通过state和onChange的方式自动收集表单数据
            使用场景：多个input表单一键提交数据
七、组件编码流程（无比重要）
    1. 拆分组件
        按照js功能或用户界面的变化来拆。 默认情况下，最外面是App组件
    2. 实现静态组件
        将组件全部定义好，样式/结构写完   
    3. 实现动态组件
        1. 要不要定义state? 因为用户界面发生了变化，所以要
        2. state值的类型是什么? 
            如果是两种变化，用布尔值
            如果N种，用对象/数组。使用数组方便遍历展示
        3. state定义在哪里（哪个组件）?
            如果state只有一个组件使用，就定义在这个组件中
            如果state有多个组件使用，就定义在它们公共的父组件中
        4. 完成js功能
            数据展示
            添加数据  
            先实现数据动态展示，在实现其他功能。
        5. 更新state的方法定义在哪？
            state在哪里，更新的方法就在那里
八、组件的生命周期
    1)	组件对象从创建到死亡它会经历特定的生命周期阶段
    2)	React组件对象包含一系列的勾子函数(生命周期回调函数), 在生命周期特定时刻回调
    3)	我们在定义组件时, 可以重写特定的生命周期回调函数, 做特定的工作
    旧版：
        初始化渲染阶段：(创建时)
            ·constructor:（只会执行一次）
                过去：1. 初始化state 2. 绑定函数this 3. 初始化ref
                现在：没啥用了,因为state、ref等都写在constructor的外面了
            ·componentWillMount
                没啥用，所以即将被废弃（新react版本不能使用）
            ·render
                返回要渲染的虚拟DOM对象
            ·componentDidMount:（只会执行一次）
                在组件渲染完毕触发的。
            作用：
                1. 用来发送ajax请求
                2. 设置定时器
                3. 绑定事件
                4. ...
            面试题：为什么请求在  componentDidMount 发送？而不在 constructor componentWillMount？
                1. 请求只要发送一次。 所以这个函数只能执行一次。而在新版本React，componentWillMount可能会执行多次，所以排除。
                2. 请求完数据后可能要操作DOM。而 constructor componentWillMount 因为还没有渲染，不能操作DOM，所以排除。
                3. componentDidMount能让渲染速度更快。如果在 constructor componentWillMount 干活，会影响渲染速度
        组件更新阶段：
            更新方式：
                ①、父组件渲染导致子组件更新
                    componentWillReceiveProps
                        在此阶段，可以获取父组件传递的props
                        如果子组件state的变化和父组件传递的props有关系。更新state
                        作用： 如果子组件state由父组件传递的props来生成，就要使用当前生命周期函数
                        问题：在新版本中，可能会调用多次。所以被废弃了
                    shouldComponentUpdate(nextProps, nextState) {
                        return true; // 返回值是一个布尔值，true则更新，false则不更新
                    }
                        性能优化：决定组件是否需要重新渲染
                    componentWillUpdate
                        没啥用。即将被废弃
                    render
                    componentDidUpdate
                        同上,每次更新时需要做一些事。
                ②、组件调用setState更新
                    shouldComponentUpdate
                    componentWillUpdate
                    render
                    componentDidUpdate
                ③、组件调用forceUpdate更新
                    componentWillUpdate
                    render
                    componentDidUpdate
        卸载阶段：
            componentWillUnmount 组件将要卸载
                做一些收尾工作：
                    1. 清除定时器
                    2. 取消没有结果的ajax请求  xhr.abort()
                    3. 解绑事件(React事件不用解绑。自定义事件)
                    4. ...
        总结：
            重要生命周期函数：
                componentDidMount
                componentWillUnmount
                shouldComponentUpdate
            即将废弃：
                componentWillMount
                componentWillReceiveProps
                componentWillUpdate
    新版：
        初始化渲染阶段：(创建时)
            constructor
            getDerivedStateFromProps (该方法必须定义成一个静态方法)
                作用：在渲染之前更新state
                根据props来生成state
                static getDerivedStateFromProps(nextProps, nextState) {
                    ...
                    // 用来替代componentWillReceiveProps,它的返回值会和state合并
                    return { number: count * 2 }
                }
                ★★注意：此生命周期返回的任何值都讲作为参数传递给componentDidUpdate
            render
            componentDidMount
        组件更新阶段：
            ①、父组件渲染导致子组件更新、组件调用setState更新
                (static) getDerivedStateFromProps
                shouldComponentUpdate
                render
                getSnapshotBeforeUpdate
                    可以提前操作DOM。操作完后再更新（一般用的很少）
                componentDidUpdate 
            ②、组件调用forceUpdate更新
                (static) getDerivedStateFromProps
                render
                getSnapshotBeforeUpdate() {
                    可以提前操作DOM。操作完后再更新（一般用的很少）
                    它的返回值将作为componentDidUpdata的第三个参数传进去
                    return { xxx: xxx }
                }
                componentDidUpdate(prevProps, prevState, {xxx: xxx}){}
        卸载阶段：
            componentWillUnmount
    拓展：如何卸载一个组件？
        需要借助方法：ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
        shouldComponentUpdate主要解决了什么问题？
            解决了重复渲染的问题，而PureComonent正是利用了这个钩子来实现重复渲染的问题的。
        getDerivedStateFromProps为什么定义成一个静态方法？
            将某些生命周期设为静态，以防止不安全地访问实例属性。
    面试题：
        react为什么要废除旧的生命周期的一些钩子？
            ①、被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现而打断现有任务导致它们会被执行多次。
            ②、React想约束使用者，防止造成内存泄漏。
            ③、componentWillReceiveProps可能会破坏 state 数据的单一数据源这一规则，导致组件状态变得不可预测，同时也会调用多次
        react父子组件生命周期执行顺序？
            ①、老版本
                1)组件渲染阶段
                    father-------------------constructor
                    father-----------------componentwillmount
                    father-----------------render
                    son-------------------constructor
                    son-----------------componentwillmount
                    son----------------render
                    son-----------------componentDidmount
                    father-----------------componentDidmount
                2)组件更新阶段
                    1）shouldComponentUpdate为true时↓
                        father-----------------shouldComponentUpdate
                        father-----------------componentWillUpdate
                        father-----------------render
                        son-----------------componentWillReceiveProps
                        son-----------------shouldComponentUpdate
                        son-----------------componentWillUpdate
                        son----------------render
                        son-----------------componentDidUpdate
                        father-----------------componentDidUpdate
                    2）shouldComponentUpdate为false时↓
                        father-----------------shouldComponentUpdate
                        father-----------------componentWillUpdate
                        father-----------------render
                        son-----------------componentWillReceiveProps
                        son-----------------shouldComponentUpdate
                        father-----------------componentDidUpdate
                3)组件卸载阶段
                    father----------------componentWillUnmount
                    son-----------------componentWillUnmount
            ②、新版本
                1)组件渲染阶段
                    father-------------------constructor
                    father-------------------getDerivedStateFromProps
                    father-----------------render
                    son-------------------constructor
                    son-------------------getDerivedStateFromProps
                    son----------------render
                    son-----------------componentDidmount
                    father-----------------componentDidmount
                2)组件更新阶段
                    father-------------------getDerivedStateFromProps
                    father-----------------shouldComponentUpdate
                    father-----------------render
                    son-------------------getDerivedStateFromProps
                    son-----------------shouldComponentUpdate
                    son----------------render
                    son-----------------getSnapshotBeforeUpdate
                    father-----------------getSnapshotBeforeUpdate
                    son-----------------componentDidUpdate
                    father-----------------componentDidUpdate
                3)组件卸载阶段
                    father----------------componentWillUnmount
                    son----------------componentWillUnmount

九、传统的虚拟DOM算法
    传统的 diff 算法性能开销大，无法满足大规模 DOM 操作需求。 React 通过制定大胆的策略，将性能开销降到最低。
    ### diff 策略
        1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
        2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
        3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。
    优化：
        基于以上三个前提策略，React 分别对 tree diff、component diff 以及 element diff 进行算法优化，
        事实也证明这三个前提策略是合理且准确的，它保证了整体界面构建的性能。
    ·tree diff
        既然 DOM 节点跨层级的移动操作少到可以忽略不计，针对这一现象，只会对相同层级内的 DOM 节点进行比较，
        即同一个父节点下的所有子节点。当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。
        这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。
    ·component diff 
        React 是基于组件构建应用的，对于组件间的比较所采取的策略也是简洁高效。
        * 如果是同一类型的组件，子节点按照原策略继续tree diff。
        * 如果不是，则将该组件判断为 dirty component，把原来的组件完全删除，从而用新组建替换整个组件。
        * 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，
            因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。
    element diff
        现象：老集合中包含节点：A、B、C、D，更新后的新集合中包含节点：B、A、D、C，此时新老集合进行 diff 差异化对比，
            发现 B != A，则创建并插入 B 至新集合，删除老集合 A；以此类推，创建并插入 A、D 和 C，删除 B、C 和 D。
            React 发现这类操作繁琐冗余，因为这些都是相同的节点，但由于位置发生变化，导致需要进行繁杂低效的删除、创建操作，
            其实只要对这些节点进行位置移动即可。

        -----------------------------------------------------------
            针对这一现象，React 提出优化策略：**允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，虽然只是小小的改动，
            性能上却发生了翻天覆地的变化！**
        ------------------------------------------------------------------
    总结：
        * React 通过分层求异的策略，对 tree diff 进行算法优化；
        * React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 component diff 进行算法优化；
        * React 通过设置唯一 key的策略，对 element diff 进行算法优化；
        * 建议，在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
        * 建议，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，
            在一定程度上会影响 React 的渲染性能。
    面试题：改变组件的key，会导致重新render吗？
        会，因为更改了key之后触发了element diff，react会删除旧的节点，将新的节点拼接上去，这个时候constructor、componentWillUnmount都会触发
十、react脚手架
    1.什么是react脚手架？
        1)	xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
            a.	包含了所有需要的配置
            b.	指定好了所有的依赖
            c.	可以直接安装/编译/运行一个简单效果
        2)	react提供了一个用于创建react项目的脚手架库: create-react-app
        3)	项目的整体技术架构为:  react + webpack4 + es6 + eslint + babel
        4)	使用脚手架开发的项目的特点: 模块化, 组件化, 工程化
    2.安装
        npm i create-react-app -g
    3.创建项目
        create-react-app 项目名
    拓展：
        ·class、style在组件中的书写？
            ①、必须将class改成className
            ②、必须将style写成JSX语法，如style={{ displace: 'none' }}
十一、React ajax
    ·常用的ajax库
        1)jQuery: 比较重, 如果需要另外引入不建议使用
        2)axios: 轻量级, 建议使用
            a.	封装XmlHttpRequest对象的ajax
            b.	 promise风格
            c.	可以用在浏览器端和node服务器端
        3)fetch: 原生函数, 但老版本浏览器不支持,所以不怎么用
            a.	不再使用XmlHttpRequest对象提交ajax请求
            b.	为了兼容低版本的浏览器, 可以引入兼容库fetch.js
十二、几个重要的技术总结
    ·组件间间的通信
        方式一、通过props通信(只适用于父子组件)
            1)	共同的数据放在父组件上, 特有的数据放在自己组件内部(state)
            2)	通过props可以传递一般数据和函数数据, 只能一层一层传递
            3)	一般数据-->父组件传递数据给子组件-->子组件读取数据
            4)	函数数据-->子组件传递数据给父组件-->子组件调用函数
        方式二、使用消息订阅(subscribe)-发布(publish)机制       (适用兄弟、祖孙组件)
            1)工具库: PubSubJS
            2)下载: npm install pubsub-js --save
            3)使用: 
                *在要被订阅的地方写入如下代码
                    ·引入
                        import PubSub from 'pubsub-js' //引入
                    使用：
                        componentDidMoun(){
                            //订阅消息
                            PubSub.subscribe('SEARCHNAME', (msg,data)=>{
                                //内容(msg===SEARCHNAME, data===input的输入的value值)
                            })
                        }
                PubSub.subscribe('delete', function(data){ }); //订阅
                PubSub.publish('delete', data) //发布消息
        方式三、redux(后续详细讲解)
        方式四、context

十三、react路由
    1.SPA的理解？   
        1)、单页Web应用（single page web application，SPA）
        2)、整个应用只有一个完整的页面
        3)、点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
        4)、当点击路由链接时, 只会做页面的局部更新，网址也会对应的改变
        5)、数据都需要通过ajax请求获取, 并在前端异步展现
        拓展：单页面应用SPA有什么优缺点？
            优点：
                1）前后端责任分离，良好的交互体验
                2）减轻服务端的压力，提高性能。
            缺点：
                1）对SEO优化不好
                2）首次加载页面时间过长
    2.路由的理解？
        a.	一个路由就是一个映射关系(key:value)
        b.	key为路由路径, value可能是function/component
    3.路由分类
        什么是前台路由？
            浏览器端路由, value是component, 当请求的是路由path时, 浏览器端前没有发送http请求, 但界面会更新显示对应的组件
            说白了前端路由特点就是不会刷新页面、不会向服务器发请求、只会做页面的局部更新、网址也会对应的改变
        什么是后台路由？
            node服务器端路由, value是function, 用来处理客户端提交的请求并返回一个响应数据       
        a.后台路由写法: 
            ·注册路由: router.get(path, function(req, res))    路由名、路由路径、路由函数组成。
            ·当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
        b.前台路由写法: 
            ·注册路由: <Route path="/about" component={About} />
            ·当浏览器的hash变为#/about时, 当前路由组件就会变为About组件
    4.前端路由原理(详情请见js中的BOM一章)
        ·分类
            1.HashRouter:利用hash实现路由切换
                window.addEventListener('hashchange', () => {
                    console.log(window.location.hash);
                    let pathname = window.location.hash.slice(1);//把最前面的那个#删除 
                    root.innerHTML = pathname;
                });             
            ·BrowserRouter:实现h5 Api实现路由的切换
                ★★react-router-dom里面的history对象和h5中的history对象不是同一个，而是react-router-dom自己封装的，但location是一样的★★
                HTML5 History API包括2个方法：
                    history.pushState()和history.replaceState()，
                和1个事件window.onpopstate
        1)history库
            a.网址: https://github.com/ReactTraining/history
            b.管理浏览器会话历史(history)的工具库
            c.包装的是原生BOM中window.history和window.location.hash
        2)history API
            a.	History.createBrowserHistory(): 得到封装window.history的管理对象
            b.	History.createHashHistory(): 得到封装window.location.hash的管理对象
            c.	history.push(): 添加一个新的历史记录
            d.	history.replace(): 用一个新的历史记录替换当前的记录
            e.	history.goBack(): 回退到上一个历史记录
            f.	history.goForword(): 前进到下一个历史记录
            g.	history.listen(function(location){}): 监视历史记录的变化
        3)使用
            先引入 < SCRIPT src="https://cdn.bootcss.com/history/4.7.2/history.js">
            后选择模式开发：
                history模式： let history = History.createBrowserHistory()    // 方式一
                hash模式：    let history = History.createHashHistory()       // 方式二
                    两者区别：
                        1.兼容性
                            hash模式兼容性好，history差
                        2.美观
                            hash多了个#，不好，并且不能使用锚点功能                   
    5.react-router-dom的使用
        该库是基于react-router库的，除此之外，基于react-router的库还有react-router-native、react-router-canvas,
        可以理解为react-router-dom = react-router库 + history库;
        1.下载
            1) npm install react-router-dom
        2.引入
            import { BrowserRouter, HashRouter } from 'react-router-dom'
        3.在App组件的最外面包裹<BrowserRouter></BrowserRouter>,这样一来，就能得到history对象
        4.react-router提供的东西(★★注意：只有Link、NavLink属于react-router-dom,其他的都属于react-router的★★)
            - <BrowserRouter>       通常用于app组件包裹，得到history对象
            - <HashRouter>          基本上不用hash模式
            - <Route>               用于路由跳转(根据地址加载对应的组件)，有两个属性path和component,默认半匹配，添加一个exact为全匹配
            - <Redirect>            能匹配所有路径，如果没有找到route里面的地址就会重定向,里面有to属性。如<Redirect to='/home'/>,
                                    一般放在最后，如果前面的Route都没有命中，它才会执行，反之，则不执行
            - <Link>                只能切换历史记录，用来取代a标签，让其不默认跳转，有个to属性，用法为<Link to='/about' ></Link>      
            - <NavLink>             和<Link>相比，多了一个active的class样式或者设置activeStyle,设置该样式：activeClassName="my-active"或者activeStyle={{xxx: xxx}}
            - <Switch>              用于包裹Route和redirect,被包裹的内容只有一个能被显示(匹配规则为默认从上到下) 
            - <withRouter>          给组件注入三大属性，通常在暴露App对象的时候使用，如 export default withRouter(App)
            - exact                 <Route>的一个属性，代表全匹配
            - <Prompt>              离开页面是否触发,有两个属性，when属性=>布尔值，代表是否展示该组件，message=>组件展开时显示的文本
    6.路由的分类
        ·声明式路由
            <link to="/home" />
            ---------路由视图↓↓↓↓↓↓↓
            <Route path="/home" component={Home}>
        ·编程式路由
            this.props.history.push('/home')
            -------- 路由视图↓↓↓↓↓↓↓
            <Route path="/home" component={Home}>
    7.路由的三大属性
        介绍：
            凡是通过Route加载的组件，就叫做路由组件
        具体属性：
            history 用来控制浏览器历史记录
                push 添加历史记录
                replace 替换历史记录
                goBack 回退
                goForward 前进
                listen 监听历史记录的变化
            location
                pathname 路径
                state 路由传参
            match
                params: {id: 1}
        用法：
            这些属性都存储在this.props里面
    8.路由传参
        ①、params传参
            ·声明式：
                使用：
                    <Link to="/a/1">这是一个路由链接</Link>
                    // 或者<Link to={{ pathname: '/a/1' }} ></Link>
                    <Route path="/a/:id" component={A} />
                读取：
                    this.props.match.params.id
            ·编程式：
                使用：
                    this.props.history.push({ pathname: `/a/${id}` })
                    或者 this.props.history.push(`/a/${id}`)
                读取：
                    同声明式
            优缺点：
                优点是刷新地址栏，参数依然存在
                缺点是只能传字符串，并且如果传的值太多，url会变得长而且丑
        ②、search传参(不好用,拿到的值通常为?id=111)
            ·声明式：
                使用：
                    <Link to="/a?id=111">这是一个路由链接</Link>
                    // 或者<Link to={{ pathname: '/a', search: 'id=111' }}></Link>
                    <Route path="/a/:id" component={A} />
                读取：
                    this.props.location.search
            ·编程式：
                使用：
                    this.props.history.push('/a?id=111')
                    或者this.props.history.push({ pathname: '/a`, search: 'id=111' })
                读取：
                    同声明式
            -------------总结↓-----------
            优缺点：
                同①中的params
        ③、xxx传参(不好用，刷新消失)
            ·声明式：
                使用：
                    <Link to={{ pathname: '/a', xxx: 111 }}
                    <Route path="/a" component={A}></Route>
                读取：
                    this.props.location.xxx
            ·编程式
                使用：
                    this.props.history.push({ pathname: '/a', xxx: 111 })
                读取：
                    同声明式
            -------------总结↓-----------
            优缺点：
                优点是：传参优雅，传递参数可以传递对象
                缺点：刷新地址栏，参数丢失
        ④、state传参(推荐，但只能用于history模式)
            ·声明式：
                使用：
                    <Link to={{ pathname: '/a', state: 111 }}
                    <Route path="/a" component={A}></Route>
                读取：
                    this.props.location.state
            ·编程式
                使用：
                    this.props.history.push({ pathname: '/a', state: 111 })
                    ==> 简写：this.props.history.push('/a', 111);
                读取：
                    同声明式
            -------------总结↓-----------
            优缺点：
                优点是：传参优雅，传递参数可以传递对象，并且刷新数据不会丢失数据
                缺点是：hash模式没有这个功能
    9.路由hooks
        1)、useHistory
            可直接获取路由三大属性中的history对象
        2)、useLocation
            可直接获取路由三大属性中的location对象
        3)、useRarams
            可直接获取路由三大属性中的match.params对象
        4)、useRouteMatch
            改useRouteMatch钩子执行时，两种情况
            ·不带参数，返回当前<Route />对象的match对象
            ·接受一个参数时，该参数与matchPath的props参数相同。他可以是字符串的路径名，也可以是一个match对象如下，其最终返回值是一个布尔值
                const match1 = useRouteMatch('/detail/:id')
                const match2 = useRouteMatch({
                    path: "/BLOG/:slug/",
                    strict: true,
                    sensitive: true
                });
    10.实现HashRouter
        ★★思路讲解：
            传递路线：<HashRouter /> (传递history) --> <Router> (Router内部会包一层RouterContext.Provider,用于给路由组件传递路由三大属性)
                --> <Route /> (此时Route有对应的component，并将三大属性传递给component)

            1)、使用路由的第一步就是需要引入import { BrowserRouter, HashRouter } from 'react-router-dom'
                向子组件传递history对象
                目标：实现BrowserRouter、HashRouter
                -------------------分割线(react-router-dom/HashRouter.js 文件↓↓↓)-----------------------

                import React, { Component } from 'react'
                import { createHashHistory } from 'history'

                import { Router } from '../react-router'

                export default class HashRouter extends Component {
                    history = createHashHistory()
                    render() {
                        return (
                            <Router history={this.history}>
                                {this.props.children}
                            </Router>
                        )
                    }
                }
                ------------------------------------------------------------------------------------------
                -------------------分割线(react-router-dom/HashRouter.js 文件↓↓↓)-------------------------

                import React, { Component } from 'react'
                import { createBrowserHistory } from 'history'

                import { Router } from '../react-router'

                export default class BrowserRouter extends Component {
                    history = createBrowserHistory();
                    render() {
                        return (
                            <Router history={this.history}>
                                {this.props.children}
                            </Router>
                        )
                    }
                }
                -------------------------------------------------------------------------------------------
            2)、此时Router组件已经有history对象了，再从history中解构出location当做三大属性的第二大属性传递下去(使用context传递)
                目标：实现Router.js

                -------------------分割线(react-router/Router.js 文件↓↓↓)-------------------------
                class Router extends React.Component {
                    constructor(props) {
                        super(props);
                        this.state = {
                            location: props.history.location  // 这里的history是HashRouter.js传递过来的
                        }
        
                    }
                    render() {
                        let value =  {
                            history: this.props.history,
                            location: this.state.location  
                        }
                        return (
                            <RouterContext.Provider value={value}>
                                {this.porops.children}
                            </RouterContext.Provider>
                        )
                    }
                }
                export default Router;
                ------------------------------------------------------------------------------------------
            3)、这个时候Route组件已经有Router通过context传递下来的history、location这两大属性了，同时用户会<Route path={xxx} component={xxx}>
                传递两个属性path、和component，此时判断用户传递过来的path和location.pathname对比渲染那个组件，顺便把路由的两大属性给传递到最终的路由component下
                目标：实现Route.js

                -------------------分割线(react-router/Router.js 文件↓↓↓)-------------------------
                import React, { Component } from 'react';
                import RouterContext from './RouterContext';
                export default class Route extends Component {
                    static contextType = RouterContext;
                    render() {
                        const { history, location } = this.context;
                        const { path, component: RouteComponent } = this.props;
                        const match = location.pathname === path;         // 这里用来判断渲染哪个组件
                        const routeProps = { history, location };
                        let element = null;
                        if(match) {
                            element = <RouteComponent {...routeProps} />;
                        }
                        return element;
                    }
                }
                ---------------------------------------------------------------------------------
            4)、此时整体的路由架构搭建好了，但视图没有更新，这个时候需要调用this.setState来更新Router.js
                目标：更新Router.js文件，监听到路由变化时触发页面更新

                -------------------分割线(react-router/Router.js 文件↓↓↓)-------------------------
                import React from 'react';
                import RouterContext from './RouterContext';

                class Router extends React.Component {
                    constructor(props) {
                        super(props);
                        this.state = {
                            location: props.history.location  // 这里的history是HashRouter.js传递过来的
                        }
                        // 当监听到路由发生变化后悔执行回调 
                    +   props.history.listen((item)=>{
                    +       this.setState({ location: item });
                    +   })
                    }
                    render() {
                        let value =  {
                            history: this.props.history,
                            location: this.state.location  
                        }
                        return (
                            <RouterContext.Provider value={value}>
                                {this.porops.children}
                            </RouterContext.Provider>
                        )
                    }
                }
                export default Router;
            --------------------------------------------------------------------------------- 
    10、实现history库(createBrowserHistory、createHashHistory)
        reateBrowserHistory原理是改写window.history里面的go、forward、pushState等等方法
        
        -------------------分割线(history/createBrowserHistory.js库 文件↓↓↓)-------------------------
        function createBrowserHistory(){
            const globalHistory = window.history;
            let listeners = [];//存放所有的监听函数
            let state;

            function notify(newState){
                //把newState上的属性赋值到history对象上
                Object.assign(history,newState);
                history.length = globalHistory.length;//路由历史栈中历史条目的长度
                listeners.forEach(listener=>listener(history.location));//通知监听函数执行,参数是新的location
            }
            function push(pathname,nextState){
                
                // 注意：push传参有两种方式
                // push('/user', { id: 1, name: '张三' });
                // push({pathname: '/user', state: {id: 1, name: '张三'}})
        
                const action = 'PUSH';                                 //action表示是由于什么样的动作引起了路径的变更
                // ①、先判断push传参里面的类型
                if(typeof pathname === 'object'){
                    state = pathname.state;
                    pathname = pathname.pathname;
                }else{
                    state=nextState;//TODO 
                }
                globalHistory.pushState(state,null,pathname);         // ②、调用原生的pushState方法进行跳转
                let location = {state,pathname};
                notify({action,location});                            // ③、forEach执行收集的listenrs函数，进行视图页面的更新(点击页面中的按钮等操作)
            }
            // 这个方法的功能是监听路由的变化执行回调
            function listen(listener){
                listeners.push(listener);
                return ()=>{
                    // 监听 方法会返回一个取消此监听函数的方法        
                    listeners = listeners.filter(item=>item!=listener);   
                }
            }
            function go(n){
                globalHistory.go(n);
            }
            window.addEventListener('popstate',()=>{//TODO
                let location = {state:globalHistory.state,pathname:window.location.pathname};
                // 当直接修改URL路径改变之后应该让history的监听函数执行，重新刷新组件
                notify({action:"POP",location});
            });
            function goBack(){
                go(-1);
            }
            function goForward(){
                go(1);
            }

            const history = {
                action:'POP',
                go,
                goBack,
                goForward,
                push,
                listen,
                location:{pathname:window.location.pathname,state:window.location.state}
            }
            return history;
        }
        export default createBrowserHistory;

        /*
            以下是通过createBrowserHistory创建的history
            {
                action: "POP"
                block: ƒ block(prompt)
                createHref: ƒ createHref(location)
                go: ƒ go(n)
                goBack: ƒ goBack()
                goForward: ƒ goForward()
                length: 4
                listen: ƒ listen(listener)
                location: {pathname: '/other', search: '', hash: '', state: null, key: 'b0cghj'}
                push: ƒ push(path, state)
                replace: ƒ replace(path, state)
            }

        *
        -------------------------------------------------------------------------------------

        -------------------分割线(history/createBrowserHistory.js库 文件↓↓↓)-------------------
        function createHashHistory(){
            let stack = [];//类似于历史栈 里面存放都是路径
            let index = -1;//栈的指针，默认是-1
            let action = 'POP';//动作
            let state ;//最新的状态 
            let listeners = [];//监听函数的数组
            function listen(listener){
                listeners.push(listener);
                return ()=>{
                    listeners = listeners.filter(item=>item!=listener);
                }
            }
            function go(n){
                action = 'POP';
                index+=n;//更改栈顶的指针
                let nextLocation = stack[index];//取出指定索引对应的路径对象
                state= nextLocation.state;//取出此location对应的状态 
                window.location.hash = nextLocation.pathname;//修改hash值 ，从而修改当前的路径
            }
            let hashChangeHandler = ()=>{
                let pathname = window.location.hash.slice(1);//取出最新的hash值对应的路径  #/user
                Object.assign(history,{action,location:{pathname,state}});
                if(action === 'PUSH'){//说明是调用push方法，需要往历史栈中添加新的条目 
                    stack[++index]=history.location;
                }
                listeners.forEach(listener=>listener(history.location));
            }
            function push(pathname,nextState){
                action = 'PUSH';
                if(typeof pathname ==='object'){
                    state = pathname.state;
                    pathname = pathname.pathname
                }else{
                    state = nextState;
                }
                window.location.hash = pathname;
            }
            //当hash发生变化的话，会执行回调
            window.addEventListener('hashchange',hashChangeHandler);
            function goBack(){
                go(-1);
            }
            function goForward(){
                go(1);
            }
            const history = {
                action:'POP',
                go,
                goBack,
                goForward,
                push,
                listen,
                location:{},
                location:{pathname:'/',state:undefined}
            }
            if(window.location.hash){//如果初始的情况下，如果hash是有值的
                action = 'PUSH';
                hashChangeHandler();
            }else{
                window.location.hash = '/';
            }
            return history;
        }
        export default createHashHistory;

        -------------------------------------------------------------------------------
    11、正则相关知识补充
        ·path-to-regexp
            ·相关链接
                https://www.npmjs.com/package/path-to-regexp
            ·使用
                let regxp = pathToRegExp('/home',[],{end:true});           // 结果是 /^\/home\/?$/i
                参数说明(第三个采纳数配置项)：
                    sensitive 是否大小写敏感 (默认值: false)
                    strict 是否允许结尾有一个可选的/ (默认值: false)
                    end 是否匹配整个字符串 (默认值: true)
        ·正则匹配
            (?=pattern)	正向肯定查找(前瞻),后面必须跟着什么
            (?!pattern)	正向否定查找(前瞻)，后面不能跟着什么
            (?<=pattern)	反向肯定条件查找(后顾),不捕获
            (?<!pattern)	反向否定条件查找（后顾）
            例子：
                //会消耗掉字符的
                //console.log('1a'.match(/\d[a-z][a-z]/));
                //?= 正向肯定查找 不消费字符 正向前瞻
                //console.log('1a'.match(/\d(?=[a-z])[a-z]/));

                //正向肯定前瞻
                console.log('1a'.match(/\d(?=[a-z])[a-z]/));
                //正向否定前瞻
                console.log('1a'.match(/\d(?![A-Z])[a-z]/));
                //反向肯定前瞻
                console.log('1a'.match(/(?<=[a-z])\d[a-z]/));
                //反向否定前瞻
                console.log('1a'.match(/(?<![A-Z])\d[a-z]/));
        
    12、实现三大属性之一 ————— match


        -------------------分割线(react-router/Router.js库 文件↓↓↓)-------------------
        import React from 'react'
        import RouterContext from './RouterContext';
        class Router extends React.Component{
        +    static computeRootMatch(pathname) {
        +        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
        +    }
            constructor(props){
                super(props);
                this.state = {
                    location:props.history.location
                }
                //当路径发生的变化的时候执行回调
                this.unlisten = props.history.listen((location)=>{
                    this.setState({location});
                });
            }
            componentWillUnmount(){
                this.unlisten&&this.unlisten();
            }
            render(){
                let value = {//通过value向下层传递数据
                    location:this.state.location,
                    history:this.props.history,
        +            match: Router.computeRootMatch(this.state.location.pathname)
                }
                return (
                    <RouterContext.Provider value={value}>
                        {this.props.children}
                    </RouterContext.Provider>
                )
            }
        }

        export default Router;
        -------------------分割线(react-router/Route.js库 文件↓↓↓)-------------------
        import React, { Component } from 'react';
        import RouterContext from './RouterContext';
        + import matchPath from './matchPath'
        export default class Route extends Component {
            static contextType = RouterContext;
            render() {
                const { history, location } = this.context;
                const { path, component: RouteComponent } = this.props;
                // const match = location.pathname === path;        // 需要对match进行改造
                + const match = matchPath(location.pathname, this.props)
                const routeProps = { history, location };
                let element = null;
                if(match) {
                    routeProps.natch = match;
                    element = <RouteComponent {...routeProps} />;
                }
                return element;
            }
        }
        ---------------------------------------------------------------------------------
        -------------------分割线(react-router/matchPath.js库 文件↓↓↓)-------------------
        import pathToRegexp from 'path-to-regexp';
        function compilePath(path,options){
            const keys = [];
            const regexp = pathToRegexp(path,keys,options);
            return {keys,regexp};
        }
        /**
         * @param {*} pathname 浏览器栏中的真实路径
         * @param {*} options 匹配的参数 path exact strict sensitive
         *
        function matchPath(pathname,options = {}){
            let {path='/',exact=false,strict=false,sensitive=false}=options;
            let {keys,regexp} = compilePath(path,{
                end:exact,
                strict,
                sensitive
            }); // /post/:id  keys=["id"] regexp= /\/post\/([^\/]+?)/
            const match = regexp.exec(pathname);
            if(!match) return null;
            const [url,...values] = match;//['/post/1','1'] url=/post/1 values=['1']
            // pathname /post/1/name !== /post/1
            const isExact = pathname === url;
            //需要精确匹配，但是匹配的不精确，没有完全相等，也相当于没匹配上
            if(exact && !isExact) return null;
            return { //路由组件中props.match
                path,//Route原始path
                url,//正则匹配到的浏览器的pathname的部分
                isExact,
                params:keys.reduce((memo,key,index)=>{
                    memo[key.name] = values[index];
                    return memo;
                },{})
            }
        }
        export default matchPath;
        ---------------------------------------------------------------------------------

    13、实现Switch和redirect组件
        -------------------分割线(react-router/Switch.js库 文件↓↓↓)-------------------
        import React from 'react'
        import RouterContext from './RouterContext';
        import matchPath from './matchPath';
        class Switch extends React.Component {
            static contextType = RouterContext
            render() {
                const { location } = this.context;
                let element, match;
                // 使用React.Children而不使用this.props.children的原因在于确认子组件是一个Route，如果不是则报错，而this.props.children并没有这样的功能
                React.Children.forEach(this.props.children, child => {
                    if (!match && React.isValidElement(child)) {
                        element = child;
                        match = matchPath(location.pathname, child.props);
                    }
                });
                return match ? React.cloneElement(element, {computedMatch: match }) : null
            }
        }
        export default Switch;
        -----------------------------------------------------------------------------
        -------------------分割线(react-router/Redirect.js库 文件↓↓↓)-------------------
        import React from 'react'
        import RouterContext from './RouterContext';
        import Lifecycle from './Lifecycle';

        function Redirect({to}){
            return (
                <RouterContext.Consumer>
                    {
                        contextValue=>{
                            const {history}= contextValue;
                            return (
                                <Lifecycle
                                onMount={()=>history.push(to)}
                                />
                            );
                        }
                    }
                </RouterContext.Consumer>
            );
        }
        export default Redirect;

        -------------------分割线(react-router/Redirect.js库 文件↓↓↓)-------------------
        
        import React from 'react';
        class Lifecycle extends React.Component{
            componentDidMount(){
                if(this.props.onMount)
                    this.props.onMount(this);
            }
            componentWillUnmount(){
                if(this.props.onUnmount)
                    this.props.onUnmount(this);
            }
            render(){
                return null;
            }
        }
        export default Lifecycle;
        -----------------------------------------------------------------------------
    14、实现Link
        -------------------分割线(react-router-dom/Link.js库 文件↓↓↓)-------------------
        import React from 'react';
        import {__RouterContext as RouterContext} from '../react-router';
        export default function Link(props){
            return (
                <RouterContext.Consumer>
                    {
                        contextValue=>{
                            return (
                                <a
                                {...props}
                                onClick={(event)=>{
                                    event.preventDefault();
                                    contextValue.history.push(props.to);
                                }}
                                >{props.children}</a>
                            )
                        }
                    }
                </RouterContext.Consumer>
            )
        }
        ----------------------------------------------------------------------------
    15、实现NavLIink
        -------------------分割线(react-router-dom/Link.js库 文件↓↓↓)-----------------
        import React from 'react';
        import {Route} from '../react-router';
        import matchPath from '../react-router/matchPath';
        import Link from './Link';
        function NavLink(props){
            const {
                to:path,//Link指向的路径
                className:classNameProp='',//基本的类名
                style:styleProp={},//基本的行内样式
                activeClassName='active',//激活的类名
                activeStyle={},//激活的行内样式
                children,//儿子
                exact//是否要精确匹配
            }= props;
            return (
                <Route path={path} exact={exact}>
                    {
                        ({match})=>{
                            let className = match?joinClassNames(classNameProp,activeClassName):classNameProp;
                            let style =match?{...styleProp,...activeStyle}:styleProp;
                            let linkProps = {
                                className,
                                style,
                                to:path,
                                children
                            }
                            return <Link {...linkProps}/>
                        }
                    }
                </Route>
            )   
        }
        // 第二种写法
        function NavLink(props){
            let context = React.useContext(RouterContext);
            let {location:{pathname}}= context;
            const {
                to:path,//Link指向的路径
                className:classNameProp='',//基本的类名
                style:styleProp={},//基本的行内样式
                activeClassName='active',//激活的类名
                activeStyle={},//激活的行内样式
                children,//儿子
                exact//是否要精确匹配
            }= props;
            //pathname浏览器的路径 path来自于NavLink的配置
            let isActive = matchPath(pathname,{path,exact});
            let className = isActive?joinClassNames(classNameProp,activeClassName):classNameProp;
            let style = isActive?{...styleProp,...activeStyle}:styleProp;
            let linkProps = {
                className,
                style,
                to:path,
                children
            }
            return <Link {...linkProps}/>;
        }

        function joinClassNames(...classnames){
        return classnames.filter(c=>c).join(' ');
        }
        export default NavLink;
        ---------------------------------------------------------------------
    16、实现withRouter
        -------------------分割线(react-router/withRouter.js库 文件↓↓↓)-----------------
         import React from 'react';
        import RouterContext from './RouterContext';
        function withRouter(OldComponent){
            return props => {
                return (
                    <RouterContext.Consumer>
                        {
                            contextValue =>{
                                return <OldComponent {...props} {...contextValue}/>
                            }
                        }
                    </RouterContext.Consumer>
                )
            }
        }

        export default withRouter;
        ---------------------------------------------------------------------
    17、实现Prompt组件
        为了方便对比，下面列出了3中Prompt组件的写法以供对比
        -------------------分割线(react-router/Prompt.js库 文件↓↓↓)-----------------
        import React from 'react';
        import RouterContext from './RouterContext';
        import LifeCycle from './LifeCycle';
        //函数组件
        function Prompt(props){
            let value = React.useContext(RouterContext);
            React.useEffect(()=>{
                return  value.history.block(props.message)
            });
            return null;
        }
        //类组件
        class Prompt extends React.Component{
            static contextType = RouterContext;
            componentDidMount(){
                const block = this.context.history.block;
                this.release = block(this.props.message)
            }
            componentWillUnmount(){
                this.release()
            }
            render(){
                return  null;
            }
        }
        //源码
        function Prompt({when,message}){
            return (
                <RouterContext.Consumer>
                    {
                        (value)=>{
                            //如果不需要阻止跳转，则可以直接返回null,什么都不做
                            if(!when)return null;
                            //需要给history对象上添加一个block方法
                            const block = value.history.block;
                            return (
                                <LifeCycle
                                onMount={lifeCycleInstance=>lifeCycleInstance.release = block(message)}
                                onUnMount={lifeCycleInstance=>lifeCycleInstance.release()}
                                />
                            )

                        }
                    }
                </RouterContext.Consumer>
            )
        }
        export default Prompt;
        ---------------------------------------------------------------------
    18、路由hooks(useHistory、useLocation、useParams、useRouteMatch)
        -------------------分割线(react-router/hooks.js库 文件↓↓↓)-----------------
        import React from 'react';
        import RouterContext from './RouterContext';
        import matchPath from './matchPath';
        export function useParams(){
            let match = React.useContext(RouterContext).match;
            return match?match.params:{};
        }
        export function useLocation(){
            return React.useContext(RouterContext).location;
        }
        export function useHistory(){
            return React.useContext(RouterContext).history;
        }
        export function useRouteMatch(path){
        const location = useLocation();//获取当前的路径pathname代表当前的路径名
        let match = React.useContext(RouterContext).match;//获得匹配结果
            return path?matchPath(location.pathname,path):match;
        }
        --------------------------------------------------------------------
19、路由懒加载实现(拓展)
    import React, { Suspense } from 'react';
    import ReactDOM from 'react-dom';
    import {
    BrowserRouter as Router, Route,Link
    } from 'react-router-dom';

    function lazy(load) {
    return class extends React.Component {
        state = { InnerComponent: null }
        componentDidMount() {
        load().then(result => {
            this.setState({ InnerComponent: result.default || result });
        });
        }
        render() {
        let { InnerComponent } = this.state;
        return InnerComponent ? <InnerComponent /> : null;
        }
    }
    }
    const LazyHome = React.lazy(() => import(/* webpackChunkName: "Home" *\/'./components/Home'));
    const LazyLogin = React.lazy(() => import(/* webpackChunkName: "Login" *\/'./components/Login'));
    function Loading() {
    return <div>加载中......</div>
    }
    function SuspenseHome() {
    return (
        <Suspense fallback={<Loading />}>
        <LazyHome />
        </Suspense>
    )
    }
    function SuspenseLogin() {
    return (
        <Suspense fallback={<Loading />}>
        <LazyLogin />
        </Suspense>
    )
    }
    //webpack chunkFilename
    ReactDOM.render(
    <Router>
        <div>
        <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">User</Link></li>
        </ul>
        <Route exact path="/" component={SuspenseHome} />
        <Route path="/login" component={SuspenseLogin} />
        </div>
    </Router>,
    document.getElementById('root')
    );
    --------------------------------------------
十三、react-router-config
    就上面而言，所有的路由定义都是直接使用 Route 组件，并且添加属性来完成的；这样的方式会让路由变得非常混乱，
    理想的状态是所有的路由配置放到一个地方进行集中管理，这个时候可以使用 react-router-config 来完成
    安装：
        yarn add react-router-config
    使用：
        // 在router配置中：
        const routes = [
            {
                path: '/',
                exact: true,
                component: Index
            },
            {
                path: '/about',
                component: About,
                routes: [
                    {
                        path: '/about/culture',
                        exact: true,
                        component: Culture
                    }
                ]
            },
            {
                path: '/detail',
                component: Detail
            },
        ]
        export default routes

        // 在具体页面中
        export default function About(props) {
            return (
                <div>
                <NavLink exact to="/about">理念</NavLink>
                <NavLink exact to="/about/culture">文化</NavLink>

                {renderRoutes(props.route.routes)}
                </div>
            )
        }
        但是需要注意的是，子路由，不是直接使用一整个路由表，而是当前路由配置下的 routes，可以通过 props.route.routes 获取
        ☆ props.route：是只有使用了 react-router-config 这个库的 renderRoutes，才会添加这么一个属性 ☆

    
十四、react-ui
    ·最受欢迎的UI组件库介绍
        1.material-ui(国外)
            1)、官网: http://www.material-ui.com/#/
            2)、github: https://github.com/callemall/material-ui
        2.ant-design(国内蚂蚁金服)
            1)、PC官网: https://ant.design/index-cn
            2)、移动官网: https://mobile.ant.design/index-cn
            3)、Github: https://github.com/ant-design/ant-design/
            4)、Github: https://github.com/ant-design/ant-design-mobile/
    ·ant-design使用入门(在根目录下创建craco.config.js)
    -------------------------- ↓↓↓直接复制粘贴↓↓↓--------------------------------------


        const CracoLessPlugin = require('craco-less');
        const path = require('path');

        /**
         * 总共需要下载的包
         * yarn add antd                                         // 必备
         * yarn add @craco/craco                                 //（一个对 create-react-app 进行自定义配置的社区解决方案）
         * yarn add craco-less                                   // 主要配置less( 内部自动安装 less less-loader 相关依赖 )
         * yarn add @babel/plugin-proposal-decorators --dev      // 用来支持装饰器
         * yarn add babel-plugin-import                          // 用来配置antd的less按需加载
         *
        module.exports = {
            plugins: [
                {
                    plugin: CracoLessPlugin,
                    options: {
                        // 1.配置自定义主题
                        lessLoaderOptions: {
                            lessOptions: {
                                modifyVars: { '@primary-color': '#f90' },
                                javascriptEnabled: true,
                            },
                        },
                    },
                },
            ],
            // 2.配置装饰器语法和按需加载
            babel: {
                plugins: [
                    ["@babel/plugin-proposal-decorators", { legacy: true }],  //装饰器
                    [
                        "import",
                        {
                            "libraryName": "antd",
                            "libraryDirectory": "es",
                            "style": true //设置为true即是less
                        }
                    ]
                ]
            },
            // 3.配置代理解决跨域
            devServer: {
                proxy: {
                    "/api": {
                        target: "http://baidu.com",
                        //target: 'http://192.168.9.19:8080',
                        changeOrigin: true,
                        pathRewrite: {
                            "^/api": ""
                        }
                    }
                }
            },
            // 4.配置路径别名
            webpack: {
                // 别名
                alias: {
                    "@": path.resolve("src"),
                }
            },
        };

    -------------------------------------------------

十五、redux
    ·redux的基本介绍
        1.redux是什么？
            1)redux是一个独立专门用于做状态管理的JS库(不是react插件库)
            2)它可以用在react, angular, vue等项目中, 但基本与react配合使用
            3)作用: 一种用于react中组件间通信、状态数据共享的一种技术
        2.设计理念
            redux是将整个应用状态存储到一个地方上成为store,里面保存着一个状态数store tree,组件可以派发(dispatch)行为(action)给store,
            而不是直接通知其他组件，组件内部通过订阅store中的状态state来刷新自己的视图
        3.redux三大原则
            1.单一数据源
                整个应用的state都被存到一个状态树里，并且这个状态树，只存在唯一的store中
                疑问：createStore方法使用后能否保证store是唯一的？
                    redux不能保证用户创建一个或者多个store,这只能由用户自己去保证，使state便于追踪和修改 
            2.数据是只读的
                state是只读的，唯一改变state的方法是触发action,action是一个用于描述已发生时间的普通对象
            3.数据改变只能通过纯函数来改变
                相当于你要编写reducers
            拓展：什么是纯函数？
                确定的输入，一定会产生确定的输出
                函数在执行过程中，不能产生副作用
                ==如下案例↓
                // sum 是一个纯函数；因为输入输出确定，并且返回的值一定是 num1 与 num2 这两个参数的和
                function sum(num1, num2) {
                    return num1 + num2;
                }

                // add 不是一个纯函数；因为输入相同，但是输出受到 flag 的影响，并不能保证确定输出
                let flag = 10;
                function add(num) {
                    return num + flag;
                }
                // 将 add 改成纯函数：只需要将 let flag 改为 const flag，因为 const 决定了 flag 不可重新赋值，那么 flag 永远都是 10，那么输入输出可以确定

                // changeInfo 不是一个纯函数；因为这个函数存在副作用
                function changeInfo(info) {
                    info.name = 'jack';
                }
        3.redux的核心API
            ·createStore(reducer, preloadedState?, enhancer?)
                1)作用: 
                    redux库最核心的管理对象
                4)编码:
                    store.getState()
                    store.dispatch({type:'INCREMENT', number}) 
                    store.subscribe(render)
            .bindActionCreators(actionCreators, dispatch)
                1)作用：
                    简化redux写法
                2)编码：
                    import store form '../store'

                    const dispatch = store.dispatch;
                    const actionCreators = {
                        add() {
                            return { type: ADD };
                        }
                        del() {
                            return { type: DEL };
                        }
                    }
                    const bindActions = bindActionCreators(actionCreators, dispatch)
                    // bindActionCreators的返回值如下↓
                    const bindActions = {
                        add() {
                            return dispatch(add());
                        }
                        del() {
                            return dispatch(del());
                        }
                    }

                    // 使用如下
                    <button onClick={bindActions.add}></button>
                    <button onClick={bindActions.del}></button>

            ·combineReducers(reducers)
                1)作用:
                    接受一个reducer聚合对象，返回一个聚合后的新的reducer
                2)编码:
                    export default combineReducers({
                        user,
                        chatUser,
                        chat
                    })
            · applyMiddleware()
                1)作用:
                    应用上基于redux的中间件(插件库)
                2)编码:
                    import {createStore, applyMiddleware} from 'redux'
                    import thunk from 'redux-thunk'  // redux异步中间件
                    const store = createStore(
                        counter,
                        applyMiddleware(thunk) // 应用上异步中间件
                    )
    ·源码解读(详细请移步react-demo这个仓库：https://github.com/lukaSavage/react-demo)
        function createStore(reducer, preloadedState, enhancer) {
            let state = preloadedState,
                listeners = [];

            function getState() {
                return state;
            }

            function subscribe(listener) {
                listeners.push(listener);
                return () => {
                    listeners = listeners.filter(item => item !== listener);
                }
            }

            function dispatch(action) {
                state = reducer(state, action);
                listeners.forEach(listener => listener());
            }

            dispatch({ type: '@@redux/init' });
            if (typeof enhancer !== 'undefined') {
                if (typeof enhancer !== 'function') {
                    throw new Error('Expected the enhancer to be a function.')
                }

                return enhancer(createStore)(reducer, preloadedState)
            }

            return {
                getState,
                subscribe,
                dispatch
            }
        }
        export default createStore;
十六、react-redux插件
    1.什么是react-redux？
        ·一个react插件库
        ·专门用来简化react应用中使用redux
    2.React-Redux将所有组件分成两大类
        1)UI组件
            a.只负责 UI 的呈现，不带有任何业务逻辑
            b.通过props接收数据(一般数据和函数)
            c.不使用任何 Redux 的 API
            d.一般保存在components文件夹下
        2)容器组件
            a.负责管理数据和业务逻辑，不负责UI的呈现
            b.使用 Redux 的 API
            c.一般保存在containers文件夹下
    3.相关API
        1)、Provider
            让所有组件都可以得到state数据
            <Provider store={store}>
                <App />
            </Provider>
        2)、connect()
            用于包装 UI 组件生成容器组件
            import { connect } from 'react-redux'
            connect(
                mapStateToprops,
                mapDispatchToProps
            )(Counter)
        3)、mapStateToprops()
            将外部的数据（即state对象）转换为UI组件的标签属性
            const mapStateToprops = function (state) {
                // 这里的state相当于是store.getState的返回值
                return {
                    value: state
                }
            }
        4)、mapDispatchToProps()
            将分发action的函数转换为UI组件的标签属性
            简洁语法可以直接指定为actions对象或包含多个action方法的对象
            const mapDispatch = function(dispatch){
                // 这里的dispatch就是store.dispatch方法
                return {
                    // 这里的xxx让使用者传递过来
                    increase(xxx){
                        dispatch(increase(xxx))
                    }
                }
            }
    4.使用react-redux
        ·下载：
            npm install --save react-redux
        · index.js文件中需要做的事情：
            ①、引入
                import { Provider } from 'react-redux'
                import store from './redux/store'     
            ②、用Provider包裹app，把它当做子组件(由此可以给所有子组件提供store对象)
                ReactDOM.render(<Provider store={store}><App /><Provider/>,document.querySelector("#app"));
        · App.js文件中需要做的事情(简写)、
            步骤一、
                const Appcontainer = connect(
                    (state)=>({num: state}),{
                    increment,
                    decrement
                })(App);
            步骤二、
                将export default App改为export default Appcontainer即可
    5.react-redux源码
        ·Provider组件
            -------------------分割线(react-redux/Provider.js库 文件↓↓↓)-------------------
                    import React from 'react'

                    import reactReduxContext from './reactReduxContext'

                    /**
                     * 接受属性中的store，然后通过context传递给下层组件
                     * @param {object} props 用户传递过来的store对象
                     * @returns 
                     *
                    export default function Provider(props) {
                        return (
                            <reactReduxContext.Provider value={{ store: props.store }}>
                                { props.children }
                            </reactReduxContext.Provider>
                        )
                    }

            ---------------------------------------------------------------------------------
        ·connect高阶组件
            -------------------分割线(react-router/connect.js库 文件↓↓↓)-------------------
            import React from 'react'
            import reactReduxContext from './reactReduxContext'
            import { bindActionCreators } from '../redux'

            /**
             * 
             * @param {function} mapStateToProps 一个函数,会将仓库中的状态经过映射后以props的形式传递给UI组件
             * @param {object} mapDispatchToProps 一个对象，会把store.dispathc方法和actionCreators绑定后变成老组件的属性
             * @returns 
             *
            export default function connect(mapStateToProps, mapDispatchToProps) {
                return function (OldComponent) {
                    return class extends React.Component {
                        static contextType = reactReduxContext;
                        constructor(props, context) {
                            super(props);
                            const { store } = context;
                            const { getState, subscribe, dispatch } = store;
                            this.state = mapStateToProps(getState());
                            this.unsubscribe = subscribe(() => {
                                this.setState(mapStateToProps(getState()));
                            });
                            let dispatchProps;
                            if (typeof mapDispatchToProps === 'function') {
                                dispatchProps = mapDispatchToProps(dispatch);
                            } else if (typeof mapDispatchToProps === 'object') {
                                dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
                            } else {
                                dispatchProps = { dispatch };
                            }
                            this.dispatchProps = dispatchProps;
                        }
                        componentWillUnmount() {
                            this.unsubscribe();
                        }
                        render() {
                            return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />
                        }
                    }
                }
            }
            ---------------------------------------------------------------------------------------
        ·hooks(useSelector)
            -------------------分割线(react-router/useSelector.js库 文件↓↓↓)-------------------
            import React from 'react';
            import ReactReduxContext from '../reactReduxContext';

            /**
             * 用于获取redux的总状态
             * @param {function} selector mapStateToProps的映射函数
             * @returns 返回当前redux的总状态
             *
            function useSelector(selector) {
                const { store } = React.useContext(ReactReduxContext);    // ReactReduxContext里面包含的是{ store: {xxx} }
                const state = store.getState();                           // {counter1: {number: 0},}
                const selectedState = selector(state);
                return selectedState;
            }
            export default useSelector;
            -------------------------------------------------------------------------------------
        ·hooks(useDispatch)
            -------------------分割线(react-router/useDispatch.js库 文件↓↓↓)-------------------
            import React from 'react';
            import ReactReduxContext from '../reactReduxContext';

            /**
             * 
             * @returns 用于返回store.dispatch  方法
             *
            function useDispatch() {
                const { store } = React.useContext(ReactReduxContext);    // ReactReduxContext里面包含的是{ store: {xxx} }
                return store.dispatch;
            }
            export default useDispatch;
            --------------------------------------------------------------
十七、级联中间件(applyMiddleware)
    ·中间件的原理：改写dispatch方法
    ·applyMiddleware
        -------------------分割线(redux/applyuMiddleware.js库 文件↓↓↓)-------------------
        function applyMiddleware(middlewares) {
            return function (createStore) {
                return function (reducer, preloadedState) {
                    let store = createStore(reducer, preloadedState);
                    let dispatch;
                    let middlewareAPI = {
                        getState: store.getState,
                        dispatch: (action) => dispatch(action)     // 注意这里会指向改造后的disaptch
                    }
                    dispatch = middlewares(middlewareAPI)(store.dispatch);
                    return {
                        ...store,
                        dispatch
                    };
                }
            }
        }
        export default applyMiddleware;
        --------------------------------------------------------------------------------
十七-1、redux异步编程(redux-thunk)
    1.下载异步中间件
        npm i redux-thunk
    2.什么是副作用函数？
        我们通常把需要做请求的函数或者是异步操作 称之为副作用函数
    3.redux-thunk用于什么场景？
        将来我们的状态需要异步更新时使用。
            同步action creators：返回值action对象
            异步action creators：返回值是函数，函数接受dispatch作为参数
    3.使用
        ①、在store.js文件中
            import {createStore, applyMiddleware} from 'redux'
            import thunk from 'redux-thunk'
            // 根据counter函数创建store对象
            const store = createStore(reducers,applyMiddleware(thunk));    // 应用上异步中间件
        ②、在action文件中
            export const incrementAsync = data => {
                return dispatch => {
                        setTimeout(() => {
                            const action = increment(data);
                            dispatch(action);
                    }, 1000)
                }
            }
        ③、在App.js文件中
            import { increment, decrement, incrementAsync } from './redux/action'

            const Appcontainer = connect(
                    (state)=>({num: state}),{
                    increment,
                    decrement,
                    incrementAsync
                })(App);
        ④、应用
            异步发送请求按钮：
                click =()=>{
                    const { value } = this.state;
                    this.props.incrementAsync(value);
                }
    4.源码
        function thunk({ getState, dispatch }) {
            return function (next) {
                return function(action) {
                    if(typeof action === 'function') {
                        // 执行函数，并且传入dispatch和getState
                        return action(dispatch, getState);
                    }
                    // 执行原始的store.dispatch方法
                    return next(action);
                }
            }
        }

        export default thunk;
十七-2、异步中间件(redux-promise)
    一个和redux-thunk类似的中间件，只不过是promise风格
    -------------------分割线(redux-thunk/index.js库 文件↓↓↓)-------------------
    function promise({ getState, dispatch }) {
        return function (next) {
            return function (action) {
                if(action.then && typeof action.then === 'function') {
                    return action.then(dispatch);
                }
                return next(action);
            }
        }
    }

    export default promise;
    --------------------------------------------------------------------------------
十七-3、异步中间件(redux-logger)
    -------------------分割线(redux-logger/index.js库 文件↓↓↓)-------------------
    function logger({ getState, dispatch }) {
        return function (next) {//为了实现中间件的级联，调用下一个中间件
            return function (action) {//这才就是我们改造后的dispatch方法了
                console.log('prev state', getState());
                next(action);//如果你只有一个中间件的话，next就是原始的store.dispatch(action)
                console.log('next state', getState());
                return action;
            }
        }
    }
    export default logger;
    --------------------------------------------------------------------------------
十八、connected-react-router
    ·介绍
        一个用于将react-router和redux结合的一个库，这就意味着跳转路径的时候，redux实时都有当前路径的一些参数信息
    ·使用
        ①、<ConnectedRouter history={history}/>           
            相比于Router多了一个功能：可以监听路径的变化，并派发动作给redux，将最新的路径信息保存在redux中
            // 一个路由组件，必须要传history属性，用于代替BrowerRouter或者hashRouter
            react.createElement(
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        ...
                    </ConnectedRouter>
                </Provider>
            , document.getElementById('root'));
            -------------------------------------
            源码：
                import React, { Component } from 'react';
                import { reactReduxContext } from '../react-redux'
                import { onLocationChange } from './actions'
                import { Router } from '../react-router'

                export default class ConnectedRouter extends Component {
                    static contextType = reactReduxContext;
                    constructor(props, context) {
                        super(props);
                        // 当路径发生变化后，会地哦啊哟好难过回调函数，传入最新的location和action
                        this.unlisten = this.props.history.listen((location, action) => { 
                            context.store.dispatch(onLocationChange(location, action));
                        })
                    }
                    componentWillUnmount() {
                        this.unlisten();
                    }
                    render() {
                        return (
                            <Router history={ this.props.history }>
                                { this.props.children }
                            </Router>
                        )
                    }
                }

        ②、connectRouter
            将路由映射到redux中
            -----------
            export default combineReducers({
                router: connectRouter(history),
                ...otherReducer
            })
            -------------
            源码：
                import { LOCATION_CHANGE } from './actions'
                /**
                 * 
                 * @param {*} history history对象
                 * @returns 返回一个路由reducer纯函数
                 *
                function connectRouter(history) {
                    const initialState = { action: history.action, location: history.location }
                    return function (preState = initialState, { type, payload }) {
                        if(type === LOCATION_CHANGE) {
                            return { ...StaticRange, action: payload.action, location: payload.location }
                        }
                    }
                }

                export default connectRouter;
        ③、routerMiddle
            一个中间件
            源码：
                import { CALL_HISTORY_METHOD } from './actions';
                function routerMiddleware(history) {
                    return function ({ getState, dispatch }) {
                        return function (next) {
                            return function (action) {
                                const { type, payload } = action
                                if (type === CALL_HISTORY_METHOD) {
                                    history[payload.method](payload.path);
                                } else {
                                    return next(action);
                                }
                            }
                        }
                    }
                }

                export default routerMiddleware;
        ④、push
            一个方法，调用传入要跳转的路径
            export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD';
            export const push = (path) => ({
                type: CALL_HISTORY_METHOD,
                payload: {
                    method: 'push',
                    path
                }
            })
十九、异步中间件(redux-saga)
    ·使用redux-thunk的缺点
        # 具有副作用的action中，我们可以看出，函数内部极为复杂。如果需要为每一个异步操作都如此定义一个action，显然action不易维护。
        # action的形式不统一
        # 异步操作太为分散，分散在了各个action中
    ·redux-saga的介绍
        redux-thunk,redux-saga是控制执行的generator，在redux-saga中action是原始的js对象，把所有的异步副作用操作放在了saga函数里面。
        这样既统一了action的形式，又使得异步操作集中可以被集中处理。
        redux-saga是通过genetator实现的，如果不支持generator需要通过插件babel-polyfill转义。
    ·redux-saga中的几个核心saga
        1)、root saga        入口saga，启动saga的唯一入口，通过createSagaMiddle().run(rootSaga)使用，会将rootSaga生成器全部执行完
        2)、watcher saga     监听saga,监听被dispatch的actions,当接受到action或者知道其被触发时，调用worker执行任务
        3)、work saga        做左右的工作，如调用API，进行异步请求，获取异步封装结果
    ·redux中的几个关键字fork，call， put，takeEvery，takeLatest，all
        1、take(action类型)
            说明：
                创建一个 Effect 描述信息，用来命令 middleware 在 Store 上等待指定的 action。
                简单的来说，只要action type匹配到了，则会继续执行下一个yield，否则一直暂停在这里
                在发起与 pattern 匹配的 action 之前，Generator 将暂停
            使用：
                function * watcherSaga() {
                    yield take(types.ASYNC_ADD);

                    // 这里如果仅仅用 yield workerSaga() 这样，后面的console并不会打印，所以我们需要使用fork这样的api才行
                    yield fork(workerSaga)
                    // yield workerSaga();
                    console.log('我执行了~')
                }
            ★注意：take只会监听一次!!!如果监听到了，执行后续代码，以后再派发，就不会再响应了
        2、fork(fn,m ...args)
            说明：
                创建一个新的进程或者线程，运行workerSaga
                fork还可以并发发送请求( fork 是无阻塞型调用)，fork 类似于 call，可以用来调用普通函数和 Generator 函数。不过，fork 的调用是非阻塞的，
                Generator 不会在等待 fn 返回结果的时候被 middleware 暂停；恰恰相反地，它在 fn 被调用时便会立即恢复执行。
            参数说明：
                fn: Function - 一个 Generator 函数，或返回 Promise 的普通函数
                args: Array<any> - 传递给 fn 的参数数组。
            使用：
                function * watcherSaga() {
                    yield fork(workerSaga)
                    console.log('我执行了~')
                }
            ★注意：fork只会监听一次!!!如果监听到了，执行后续代码，以后再派发，就不会再相应了
        3.put(action)
            发送对应的 dispatch，触发对应的 action(非阻塞的)
        4.takeEvery(action动作传string, workerSaga)
            说明：
                循环rootSaga,使得可以监听多次take或者fork。
            注意：
                每一次 dispatch 都会触发；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，每一次点击，都是有效的。
        5.call(fn, ...args)
            说明：
                发送api(和fork用法大致相同，只是传参不同，并且fork是非阻塞的，而call 是阻塞型调用。)
            参数说明：
                fn: Function - 一个 Generator 函数, 也可以是一个返回 Promise 或任意其它值的普通函数。
                args: Array<any> - 传递给 fn 的参数数组。
        6.all([...watcherSaga])
            说明：
                类似于promise.all方法,提供多个saga,需要等这个saga全部完成才会向下执行当前的saga
        7.takeLatest((action类型, 监听的generate))
            ·监听对应的 action；（和takeEvery相比，相当于做了一次防抖）
            ·只会触发最后一次 dispatch；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，只有最后一次点击是有效的
        8.throttle(time, action类型， 监听的generate)
            ·监听对应的 action；（和takeEvery相比，相当于做了一次节流）
            ·只会触发最后一次 dispatch；例如：点击一个新增的按钮，2s 后触发新增动作，在2s内不断点击按钮，这时候，只有最后一次点击是有效的
        9.select(state=>state.xxx);
            用于获取combineReducers暴露出的redux状态管理对象(如果不传参数则获取整个管理对象，如果传了可以指定某个状态)
            例子：
                function* getData() {
                    const obj = select();
                    console.log(obj)
                }
    ·使用
        1）在store文件目录下创建一个rootSaga.js文件
            function * workerSaga() {
                yield delay(1000);
                // put方法会触发dispatch改变reducer中的数据
                yield put({ type: types.ADD })
            } 
                
            function * watcherSaga() {
                // 如果没有监听到ASYNC_ADD这个动作，则watcherSaga会一直卡在这里，不会执行workerSaga
                // 值得注意的是take只能监听一次，如果执行完整的watcherSaga后，ASYNC_ADD就不会触发了，需要使用takeEvery 这样的api才行
                yield take(types.ASYNC_ADD);

                // 这里如果仅仅用 yield workerSaga() 这样，后面的console并不会打印，所以我们需要使用fork这样的api才行
                yield fork(workerSaga)
                // yield workerSaga();
                console.log('我执行了~')
            }

            function * rootSaga() {
                yield watcherSaga()
            }
        2）在store文件夹下创建createStore对象
            import { createStore, applyMiddleware } from 'redux'
            import createSagaMiddleware from 'redux-saga'
            import { rootSaga } from './sagas'

            const sagaMiddleware = createSagaMiddleware();
            const store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
            // redux-saga需要run以下才能使用
            sagaMiddleware.run(rootSaga);
            
            export default store;

二十、dva 
    1、基本使用
        ·介绍
            dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。
            官网地址：(https://dvajs.com/guide/concepts.html#subscription)
        ·特点
            ·易学易用，仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
            ·elm 概念，通过 reducers, effects 和 subscriptions 组织 model
            ·插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
            ·支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR
        安装：
            可以单独安装，
                npm i dva
            也可以通过安装脚手架进行下载
                npm install dva-cli -g
                dva new my-dva
        使用：
            -------- index.jsx-------
            import React from 'react';
            import dva, { connect } from 'dva';
            
            const app = dva();
            // 通过app.model定义模型
            app.model({
                namespace: 'counter', // 因为一个dvaApp里面可以定义很多的模型
                state: { number: 0 }, // 每个model里可以定义一个状态
                reducers: {
                    add(state) {
                        return { number: state.number + 1 };
                    }
                }
            })

            const App = (props: any):ReactElement => {
                return (
                    <>
                        <div>{props.number}</div>
                        <button onClick={() => props.dispatch({ type: 'counter/add' }) }>+</button>
                    </>
                )
            }

            const ConnectApp = connect(state=>state.counter, null)(App);
            // 指定要渲染的内容
            app.router(() => <ConnectApp />);
            // 开始渲染
            app.start('#root');
    2、支持异步effect
        介绍：
            dva 为了控制副作用的操作，底层引入了redux-sagas做异步流程控制，由于采用了generator的相关概念，所以将异步转成同步写法，从而将effects转为纯函数。
        使用：
            app.model({
                namespace: 'counter',
                ...,
                reducers: {
                    asyncAdd(state) {
                        console.log('这里也执行了~')
                        return state;
                    }
                }
                effects: {
                    // 这里的effects就是redux-saga中的effects
                    *asyncAdd(action, effects) {
                        yield call(delay, 1000);
                        // 向仓库派发动作{type: 'counter/add'},这里也可以不带前缀，如 yield put({type: 'add'})
                        // 如果不写前缀，就指向自己命名空间下发送动作，等同于{type: 'counter/add'}
                        yield put({type: 'counter/add'}) 
                        
                    }
                }
            })

            // 注意：如果reducers和effects里面有相同的异步函数，则两者都会执行(先reducer，后effects)。

    3.支持路由
        介绍：
            这里的路由通常指的是前端路由，由于我们的应用现在通常是单页应用，所以需要前端代码来控制路由逻辑，通过浏览器提供的 History API 可以监听浏览器url的变化，从而控制路由相关操作。
            （dva内部使用的是react-router）
        使用：
           import { Router, Route } from 'dva/router';
            app.router(({history}) =>
            <Router history={history}>
                <Route path="/" component={HomePage} />
            </Router>
            ); 

二十一、UmiJs
    

二十、redux Toolkit
    ·介绍
        Redux Toolkit是我们官方的，有观点的，开箱即用的高效 Redux 开发工具集
    ·redux Toolkit能解决的问题
        1)配置 Redux store 过于复杂
        2)我必须添加很多软件包才能开始使用 Redux 做事情
        3)Redux 有太多样板代码
        4)action creator增加代码量
        5)const ADD = 'ADD'冗余
        6)switch结构不清晰
    ·常用API
        ·configureStore  
            介绍：
                用于替代createStore方法，configureStore() 函数 提供简化的配置选项。它可以自动组合切片 slice 的 reducer，
                添加你提供的任何 Redux 中间件，默认 情况下包含 redux-thunk，并启用Redux DevTools 扩展
            用法：
                // let store = createStore(counter)
                const store = configureStore({
                  reducer: counter,
                  middleware: [thunk, logger],
                  preloadedState: {xxx}
                })
            源码：
                该函数主要是对createStore方法进行封装
            ------------------分割线（src\toolkit\configureStore.js）-------------------
                import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
                import thunk from 'redux-thunk';


                // 这个方法是toolkit必须的，没有的话会报错
                function isPlainObject(value) {
                    if (typeof value !== "object" || value === null)
                        return false;
                    return Object.getPrototypeOf(value) === Object.prototype;
                }
                function configureStore(options = {}) {
                    // redux-toolkit内置thunk中间件
                    let { reducer, middleware = [thunk], preloadedState } = options;
                    let rootReducer;
                    if (typeof reducer === "function") {
                        rootReducer = reducer;
                    } else if (isPlainObject(reducer)) {          // 有可能传递过来一个对象，我们只需要将它用combineReducers包裹起来就好
                        rootReducer = combineReducers(reducer);
                    }
                    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
                    return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)));
                }
                export default configureStore;

            ---------------------------------------------------------------------------
        ·createAction
            ·介绍
                createAction 接受一个action类型字符串作为参数，并返回一个使用该类型字符串的action creator函数，用药用于简化创建
                action的工厂函数
            ·参数说明：
                type: 一个字符串，代表action中的type
                prepareAction: 一个函数，可以用于改写第二次调用传递的参数
            ·用法
                // 原先写法
                export const INCREMENT = 'INCREMENT';
                export default const xxx = ()=>({type: INCREMENT})

                // 使用toolkit的写法
                const increase = createAction('INCREMENT',(xxx)=>{
                    return xxx + 1;   // 注意：这里的xxx代表下面传递的'aaa'
                });  
                increase('aaa');     // { type: 'INCREAMENT', payload: 'aaa1' };   第二次调用可以传递参数生成工厂函数    
            ·源码
                ------------------分割线（src\toolkit\createAction.js）-------------------
                    function createAction(type, prepareAction) {
                        function actionCreator(args) {
                            if (prepareAction) {
                                let prepared = prepareAction(args);
                                return {
                                    type,
                                    ...prepared,
                                }
                            }
                            return {
                                type,
                                payload: args
                            }
                        }
                        actionCreator.type = type;
                        return actionCreator;
                    }

                    export default createAction;

                ---------------------------------------------------------------------------
        ·createReducer
            ·介绍
                Redux工具包 包含了一个 createReducer 函数 ，它让使用"查找表"对象的方式编写 reducer
                其中对象的每一个 key 都是一个 Redux action type 字符串，value 是 reducer 函数
            ·用法
                主要用于简化reducer函数
                // createAction创建的工厂函数
                const add = createAction('ADD')
                const minus = createAction('MINUS', (amount) => ({ payload: amount }));
                // 使用createReducer
                `````某个页面``````
                store.dispatch(add())
                ````````

                
                const counter = createReducer({number:0}, {
                  // 有两种写法(由于计算属性语法将在其中任何变量上调用 toString() ，我们可以只是直接使用 action creator 函数而不用 .type 字段)
                  // [add.type]: state => ({number: state.number + 1})
                  // ↓↓↓推荐写法
                  [add]: state => ({number:state.number+1}),
                  [minus]: state => ({number:state.number-1})
                })
                const store = configureStore({
                    reducer: counter,
                    middleware: [thunk, logger],

                })
            ·源码
                ------------------分割线（src\toolkit\createAction.js）-------------------
                    function createReducer(initialState, actionMap = {}) {
                        return function (state = initialState, action) {
                            let reducer = actionMap[action.type];
                            // 如果在createReducer中匹配到了，则返回调用reducer后的新的状态
                            if (reducer) return reducer(state, action);
                            // 没有返回默认值
                            return state;
                        }
                    }
                    export default createReducer;

                ---------------------------------------------------------------------------
        ·createSlice
            ·介绍
                createSlice和dva里面的modal有点类似，都是把一个reducer看成一个模块来使用，相比于createReducer更加简洁
            ·使用
                const counterSlice = createSlice({
                    name: 'counter',  // 有点像命名空间
                    initialState: 0,  // 初始状态
                    reducers: {
                        increment: state => state + 1,
                        decrement: state => state - 1
                    }
                })

                const store = configureStore({
                    reducer: counterSlice.reducer
                })

                document.getElementById('increment').addEventListener('click', () => {
                    store.dispatch(counterSlice.actions.increment())
                })
                ★★★★★★★ 当然你可以像以下一样解构★★★★★★
                const { actions, reducer } = counterSlice
                const { increment, decrement } = actions
            ·源码
                ------------------分割线（src\toolkit\createSlice.js）------------
                    import { createReducer, createAction } from './'
                    function createSlice(options) {
                        let { name, initialState = {}, reducers = {} } = options;
                        let actions = {};
                        const prefixReducers = {};
                        Object.keys(reducers).forEach(function (key) {
                            var type = getType(name, key);
                            actions[key] = createAction(type);
                            prefixReducers[type] = reducers[key];
                        })
                        let reducer = createReducer(initialState, prefixReducers);
                        return {
                            name,
                            reducer,
                            actions
                        };
                    }
                    function getType(slice, actionKey) {
                        return slice + "/" + actionKey;
                    }
                    export default createSlice;
                -----------------------------------------------------------------
        ·immer(非API,内置的)
            ·介绍
                immer是 mobx 的作者写的一个 immutable 库
                核心实现是利用 ES6 的 proxy,几乎以最小的成本实现了 js 的不可变数据结构
            ·用法
                let produce = require('immer').default;
                let baseState = {
                    ids: [1],
                    pos: {
                    x: 1,
                    y: 1 
                    }
                }

                let nextState = produce(baseState, (draft) => {
                    draft.ids.push(2);
                })
                console.log(baseState.ids === nextState.ids);//false
                console.log(baseState.pos === nextState.pos);//true
            ·源码
                ------------------分割线（src\toolkit\createAction.js）-------------------
                    (后期有专题...)

                ---------------------------------------------------------------------------
        ·reselect & createSelector
            ·介绍
                # reselect可以缓存运算结果，提升性能
                # reselect的原理是，只要相关状态不变，即直接使用上一次的缓存结果
            ·用法
            ·原理
        ·createAsyncThunk
            ·介绍
                入参：
                    ①、redux动作类型(string 类型)
                    ②、返回值是promise回调函数(Function 类型)

                它会基于你传递的动作类型前缀生成promise生命周期的动作类型
                并且返回一个thunk动作创建者，这个thunk动作创建者会运行promise回调并且派发生命周期动作
                它抽象了处理异步请求生命周期的标准推荐方法
            ·用法
                import { configureStore, createSlice, createAsyncThunk } from './toolkit';
                export const getTodosList = createAsyncThunk(
                    "todos/list",  async () =>  await axios.get(`http://localhost:8080/todos/list`)
                );
                const initialState = {
                    todos: [],
                    loading: false,
                    error: null,
                };
                const todoSlice = createSlice({
                    name: 'todo',
                    initialState,
                    reducers: {},
                    extraReducers: {
                        [getTodosList.pending]: (state) => {
                        state.loading = true;
                        },
                        [getTodosList.fulfilled]: (state, action) => {
                        state.todos = action.payload.data;
                        state.loading = false;
                        },
                        [getTodosList.rejected]: (state, action) => {
                        state.todos = [];
                        state.error = action.error.message;
                        state.loading = false;
                        }
                    }
                })
                const { reducer } = todoSlice;
                const store = configureStore({
                    reducer
                });
                let promise = store.dispatch(getTodosList());
                console.log('请求开始',store.getState());
                //promise.abort();
                promise.then((response)=>{
                    console.log('成功',response);
                    setTimeout(()=>{
                        console.log('请求结束',store.getState());
                    },);
                },error=>{
                    console.log('失败',error);
                    setTimeout(()=>{
                        console.log('请求结束',store.getState());
                    },);
                });

十八、开发者调试工具
    1.下载工具包npm i redux-devtools-extension -D
    2.在store的index.ts文件中引用
        import { createStore, applyMiddleware } from 'redux'
        import reducers from './reducers'
        import { composeWithDevTools } from 'redux-devtools-extension'
        import thunk from 'redux-thunk'

        const store = createStore(reducers,
            process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
        );


        export default store;
十九、高阶组件的用法(HOC  high order component)   ==>解决组件代码的复用问题
    ·基本用法
        通常有许多组件的功能可能相似，这就会导致会有重复的代码，这是我们可以使用高阶函数的方法解决
        作用：复用多个组件的代码(提取公共代码去复用)，本质上是一个函数，执行函数时接收一个组件作为参数，返回值是一个新数组
        具体做法：
            1.在components文件夹下添加一个新文件with-xxx    (xxx代表名字)
            2.使用工厂函数定义组件，返回值是一个新组件,通过props将方法传入到旧(包装)组件中
                export default function withForm(Wrap){
                    click = ()=>{}
                    sub = ()=>{}
                    return class extends Component{
                        render(){
                            return <Wrap sub={this.sub} click={this.click}/>
                        }
                    }
                }
            3.旧组件模块先引入withForm
                import withForm from '../with-form'
            4.调用withForm方法，传入旧组件,并暴露出去
                const newComp = withForm(Login);
                export default newComp;
            5.旧组件内部通过this.props接收方法
                const { sub, click } = this.props;
            6.命名(为了让开发者辨识高阶组件)
                static displayName = `Form(${wrap.displayName || wrap.name || 'Component'})`
    ·函数柯里化
        概念：fn(a,b,c) ===>转换为 fn(a)(b)(c);
        应用场景：需要给旧组件传值的时候
            eg： export default function withForm(sth){
                return function(Wrap){
                    return class extends Component{
                        render(){
                            return <Wrap/>
                        }
                    }
                }
            }
        ·如果要调用三次以上，一般将a写成对象形式
        ·如果要在app传属性给旧组件，则需要先传给newComp(通过{...this.props}传),在传给旧组件
        ·ES7装饰器语法(浏览器默认不解析，并且只能修饰类组件，不能修饰工厂函数组件)
            作用：简写了高阶函数，不在调用两次(因为他自己会调用一次旧组件)
            1.安装
                yarn add babel-plugin-import customize-cra react-app-rewired @babel/plugin-proposal-decorators --dev
            2.配置config-overrides.js
                const { override, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra');
                const { resolve } = require('path');

                module.exports = override(
                    // 添加 ES7 装饰器语法支持  @babel/plugin-proposal-decorators
                    addDecoratorsLegacy(),
                    addWebpackAlias({
                        '$comp': resolve(__dirname, 'src/components'),
                    })
                );
                //注意：addWebpackAlias只是添加路劲别名的意思，可以不配置
            3.修改package.json的指令
                "scripts": {
                    "start": "react-app-rewired start",
                    "build": "react-app-rewired build",
                    "test": "react-app-rewired test",
                    "eject": "react-scripts eject"
                },
二十、组件间通信的另一种方案context (react内置，不需要下载任何插件)
    ★开发中一般还是用redux
    ·组件通信总结
        props  ==> 适用于父子组件
        pubsub ==> 适用于祖孙组件
        redux  ==> 适用于祖孙、兄弟组件
        context ==> 适用于祖孙
    ·使用
        1.初始化context   (创建一个context文件夹，里面放user.js)
            import { createContext } from 'react';
            const one = createContext();
            export default one;
        2.祖辈组件
            //先引入
            import one from '../context/user'
            //将子组件用context.Provider包裹起来，并传入一个value属性
            <context.Provider value={this.state.xxx}>
                <A/>
            <context.Provider/>
        3.要订阅的组件
            写法一、(适用于context的数量有一个或者多个、或者工厂函数组件)
                //先引入
                import context from '../context/user'
                //将用到消息的地方用函数包起来,里面是一个函数，内部会自动调用，并将Provider传进来的数据作为参数传入
                //返回值就是要渲染的内容
                <context.Consumer>
                    {
                        xxx=>{
                            // 这里的xxx就是父组件传递过来的数据
                            return(
                                <div>
                                    <h1>传进来的名字是{xxx.name}</h1>
                                    <h1>传进来的年龄是{xxx.age}</h1>
                                </div>
                            )
                        }
                    }
                <context.Consumer/>
            写法二、(适用于context的数量只有一个情况，如果出现多个，外面的provider会覆盖内部的)
                //先引入
                import one from '../context/user'
                //在组件内部调用static
                    static contextType = one;
                //内部Provider提供的值就会挂载到this.context上
                    class A extends Component {
                        render(){
                            return(
                                <h1>{this.context}</h1>
                            )
                        }
                    }
    ·当需要定义多个context的时候：
        1.创建文件
            // 在context文件夹下再创建一个和user.js的类似的文件(文件名可以随便，文件内容基本一样)  
            import { createContext } from 'react';
            const foo = createContext();
            export default foo;
        2.祖辈组件
            //先引入
            import foo from '../context/foo'
            //将子组件用context.Provider包裹起来，并传入一个value属性
            <foo.Provider>
                <context.Provider value={this.state.xxx2}>
                    <A/>
                <context.Provider/>
            </foo.Provider>
        3.孙子组件
            //先引入
            import foo from '../context/foo'
            <context.Consumer>
                {
                    value2=>(
                        console.log(value2)
                    )
                }
            <context.Consumer>
            <foo.Consumer>
                {
                    xxx2=><h1>xxx2</h1>
                }
            <foo.Consumer/>
            ！！！注意：
                当定义多个consumer的时候，xxx.Consumer不能嵌套，只能并齐
    ·传默认值
        在定义context的时候可以传递一个默认值如
            const context = createContext('aaa');
        ★★★★★注意：
            前提是在父辈组件不写<xxx.Provider></Privider>这个标签，才能生效
二十一、Fragments
    ·介绍
        React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。
    ·作用
        能够作为多个虚拟DOM的根节点，且不会生成真实的DOM元素(类似于vue中的template标签)
    ·用法
        写法一、将根节点替换成<React.Fragment>即可
            class Columns extends React.Component {
                render() {
                    return (
                    <React.Fragment>
                        <td>Hello</td>
                        <td>World</td>
                    </React.Fragment>
                    );
                }
            }
        写法二、fragment的短语法，你可以使用一种新的，且更简短的语法来声明 Fragments。它看起来像空标签
            class Columns extends React.Component {
                render() {
                    return (
                        <>
                            <td>Hello</td>
                            <td>World</td>
                        </>
                    );
                }
            }
            注意：使用短语法将不支持key或属性
二十二、React.lazy =>代码分割(组件懒加载技术)
    ·介绍
        为了避免搞出大体积的代码包，在前期就思考该问题并对代码包进行分割是个不错的选择。
        React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。
    ·使用
        使用之前
            import OtherComponent from './OtherComponent';
        使用之后
            const OtherComponent = React.lazy(() => import('./OtherComponent'));
    -----------
        注意：React.lazy必须和suspense联用才行，不然会报错！
        例：
            import React, { Suspense } from 'react';
            const OtherComponent = React.lazy(() => import('./OtherComponent'));
            function MyComponent() {
                return (
                    <div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <OtherComponent />
                        </Suspense>
                    </div>
                );
            }
        *fallback：
            fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 Suspense 组件置于懒加载组件之上的任何位置。
            你甚至可以用一个 Suspense 组件包裹多个懒加载组件。(必填！！！不然会报错)
二十三、错误边界
    ·介绍
        错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，
        并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。
    ·适用范围
        错误边界无法捕获以下场景中产生的错误(只能捕获子组件生命周期函数中的错误)
        -事件处理onClick
        -异步代码setTimeout
        -服务端渲染
        -它自身抛出的错误
    ·使用
        如果组件中定义以下两个专门处理错误的生命周期函数，就是错误边界
        -static getDerviedStateFromError(error)
        -componentDidCatch(error,info)
    ·具体用法
        1.定义一个Error错误边界组件
            class ErrorBoundary extends React.Component {
                state = {
                    hasError: false
                }
                static getDerivedStateFromError(error) {
                    // 更新 state 使下一次渲染能够显示降级后的 UI
                    return { hasError: true };
                }
                componentDidCatch(error, errorInfo) {
                    // 你同样可以将错误日志上报给服务器
                    logErrorToMyService(error, errorInfo);
                }
                render() {
                    if (this.state.hasError) {
                    // 你可以自定义降级后的 UI 并渲染
                    return <h1>该处的页面错误了！</h1>;
                    }
                    return this.props.children; 
                }
            }
        2.给需要设置错误边界的组件设置
            <Error>
                <A></A>
            </Error>
二十四、性能优化(pureComponent、React.memo)
    ·shouldComponentUpdate
        由于父组件渲染会导致子组件更新，因此当同级子组件有一个触发父组件更新的方法时，其他子组件也会更新，
        这是我们不想看到的。
        解决方案
            shouldComponentUpdate(nextProps,nextState){
                // nextProps和nextState代表新的值
                // this.props和this.state代表旧的值
                console.log(nextProps,nextState)
                const keys = Object.keys(nextProps)
                for(let i = 0; i<kkeys.length;i++){
                    const key = keys[i]
                    if(!Object.hasOwnProperty.call(this.props,key) || nextProps[key]!==this.props[key]){
                        // 或者使用this.props.hasOwnProperty(key)

                        // 说明发生了变化，要更新
                        return true
                    }
                    // 否则不更新
                    return false
                }
            }
    ·pureComponent
        react自带的pureComponent内部实现了类似于shouldComponentUpdate里面props和state的浅比较(只对比第一层属性)，
        相当于是上面shouldComponentUpdate的简写
        用法：
            在定义类组件的时候，将Component替换成pureComponent，如下
            原先写法：
                import React, { Component } from 'react'
                class Son extends Component {
                    ...
                }
            优化写法：
                import React, { PureComponent } from 'react'
                class Son extends PureComponent {
                    ...
                }
    ·memo
        1.React.memo 为高阶组件。它与 React.PureComponent 非常相似，但只适用于函数组件，而不适用 class 组件。
        2.React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 
            的 Hook，当 context 发生变化时，它仍会重新渲染。
        3.React.memo接收两个参数，第一个参数是要对比的组价，第二个参数是一个自定义函数
            function MyComponent(props) {
            }
            // 相当于shouldComponentUpdate
            function areEqual(prevProps, nextProps) {
                /*
                如果把 nextProps 传入 render 方法的返回结果与
                将 prevProps 传入 render 方法的返回结果一致则返回 true，
                否则返回 false
                *
            }
            export default React.memo(MyComponent, areEqual);
二十五、forwardRef
    ·介绍
        由于工程函数没有state、生命周期、ref，但通过forwardRef能够让工厂函数也能够拥有ref属性，从而使父组件能够获取
        工厂函数(子组件)指定额标签元素这种技术并不常见，forwardRef以下两种场景中非常有用
        ·转发refs到DOM组件
        ·在高阶组件中转发refs
    ·用法
        父组件：
            // ★★注意引入子组件不要懒加载引入★★
            import D from './D'

            class App extends Component {
                xxx = React.createRef()
                componentDidMount(){
                    console.log(this.xxx)
                }
                render(){
                    
                    return(
                        <D ref={this.xxx}></D>
                    )
                }
            }
        子组件：
            export default React.forwardRef((props, ref)=>{
                // 第一个参数代表附表父组件传递过来的属性
                // 第二个参数ref代表父组件想要拿到的ref
                return(
                    <div ref={ref}>
                        dd...
                    </div>
                )
            })
二十六、portals
    portals提供了一种将子节点渲染到存在于根组件以外的DOM节点的优秀方案。最典型的案例是modal对话框。
    ReactDOM.createPortals(child, container)
        ·第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
        ·第二个参数（container）是一个 DOM 元素。
    使用：
        父组件中：
            class Index extends Component<any, State> {
                state = {
                    isShowModel: false
                }
                click = () => {
                    const { isShowModel } = this.state;
                    this.setState({
                        isShowModel: !isShowModel
                    })
                }
                render() {
                    const { isShowModel } = this.state;
                    return (
                        <div>
                            <Button type="primary" onClick={this.click}>测试portals</Button>
                            {isShowModel ? <Modal /> : ''}
                        </div>
                    );
                }
            }
        子组件中：
            import { createPortal } from 'react-dom'

            export default function Modal(props: Props): ReactElement {
                return (
                    createPortal((
                        <div className="modal">
                            我是一个modal。。。
                        </div>
                    ), document.body)
                )
            }
二十七、render props
    ·什么是render props？
        术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，通俗讲就是把一个B组件
        渲染到A组件的内部，A组件可以传入相应的属性给B组件(往往是属性，而不是方法)，这样优点是当你需要将B组件更换成C组件时，
        只需要在A组件中将B改成C即可
    ·使用
        在父组件中：
            import A from './A'
            import B from './B'
            class Father extends Component {
                render(){
                    return (
                        <>
                            <A xxx={(props)=>{
                                return <B {...props} />
                            }} />
                        </>
                    )
                }
            }
        在A组件中：
            import PropType from 'prop-types'
            class A extends Comoponent {
                state = {
                    name: 'jack'
                }
                static propTypes = {
                    xxx: PropTypes.func.isRequired
                }
                render(){
                    return(
                        A....
                        { this.props.xxx(this.state.name) }
                    )
                }
            }
    
二十八、React Hooks   
    ·useState
        ·介绍
            1)useState 就是一个 Hook
            2)通过在函数组件里调用它来给组件添加一些内部 state,React 会在重复渲染时保留这个 state
            3)useState 会返回一对值：当前状态和一个让你更新它的函数，你可以在事件处理函数中或其他一些地方调用这个函数。
                它类似 class 组件的 this.setState，但是它不会把新的 state 和旧的 state 进行合并
            4)useState 唯一的参数就是初始 state
            5)返回一个 state，以及更新 state 的函数
                在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同
                setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列
        ·使用
            import React from './react';
            import ReactDOM from './react-dom';

            function App(){
            const[number,setNumber]=React.useState(0);
            let handleClick = ()=> setNumber(number+1)
            return (
                <div>
                <p>{number}</p>
                <button onClick={handleClick}>+</button>
                </div>
            )
            }

            ReactDOM.render(
            <App />,
            document.getElementById('root')
            );
        ·原理
            let hookStates = [];                     // 设定一个全局变量，用来记录hook的值
            let hookIndex = 0;                       // 用来记录当前的hook的指针
            let scheduleUpdate;
            function render(vdom, container) {
                mount(vdom,contain er);
                scheduleUpdate = ()=>{
                hookIndex = 0;
                compareTwoVdom(container,vdom,vdom);
                }
            }
            export function useState(initialState){
                hookStates[hookIndex] = hookStates[hookIndex]||initialState;           // 第一次调用hookIndex为0，后面hookIndex的值依次累计
                let currentIndex = hookIndex;                                          // 定义一个局部变量，防止hookIndex更改
                function setState(newState){
                if(typeof newState === 'function') newState=newState(hookStates[currentIndex]); 
                hookStates[currentIndex]=newState;
                scheduleUpdate();
                }
                return [hookStates[hookIndex++],setState];
            }
    
    ·useMemo
        ·介绍
            主要用于缓存数据的，同React.memo一样的功能。
            第一个参数是一个返回对象的工厂函数
            第二个参数是一个依赖变量的数组，如果依赖数组中的任何一个变量发生改变，就会重新调用工厂方法。
            ★★★★★★★★★★★★★★★★★★★★注意事项：★★★★★★★★★★★★★★★★★★★★★
            ★  传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，      ★
            ★  诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。                    ★
            ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        ·使用
            父组件App：
                import React, { useMemo, useState, useCallback } from 'react'
                import Child from './A'

                export default function App() {
                    const [num, setNum] = useState(0);
                    const [name, setName] = useState('陆小凤');
                    const handleClick = useCallback(() => setNum(num + 1),[num])

                    // ---------------------------
                    // const data = {num};                          // 由于memo是浅对比，如果通过传递一个对象给子组件，则子组件依然会被渲染
                    const data = useMemo(() => ({ num }), [num])    // 此时需要使用useMemo再对对象进行缓存才行
                    // ---------------------------


                    console.log('App render');
                    return (
                        <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <Child data={data}></Child>
                        </div>
                    )
                }
            子组件A
                import React, { memo } from 'react'

                // 注意这里需要将A组件用memo包裹起来
                export default memo(function A({data}) {
                    console.log('children render');
                    return (
                        <div>
                            <h1>{ data.num }</h1>
                        </div>
                    )
                })
        ·原理
            export  function useMemo(factory,deps){
                if(hookStates[hookIndex]){
                let [lastMemo,lastDeps] = hookStates[hookIndex];
                let same = deps.every((item,index)=>item === lastDeps[index]);
                if(same){
                    hookIndex++;
                    return lastMemo;
                }else{
                    let newMemo = factory();
                    hookStates[hookIndex++]=[newMemo,deps];
                    return newMemo;
                }
                }else{
                let newMemo = factory();
                hookStates[hookIndex++]=[newMemo,deps];
                return newMemo;
                }
            }
    ·useCallback
        ·介绍
            和useMemo类似，主要用于缓存函数的
        ·使用
            父组件App:
                import React, { useMemo, useState, useCallback } from 'react'
                import Child from './A'

                export default function App() {
                    const [num, setNum] = useState(0);
                    const [name, setName] = useState('陆小凤');
                    // const handleClick = useCallback(
                    //     () => {
                    //         setNum(num + 1)
                    //     },
                    //     []
                    // )
                    const handleClick = () => {
                            setNum(num + 1)
                        }
                    
                    // const data = {num};
                    const data = useMemo(() => ({ num }), [num])
                    console.log('App render');
                    return (
                        <div>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <Child data={data} handleClick={handleClick}></Child>
                        </div>
                    )
                }
            子组件App
                import React, { useEffect, memo } from 'react'

                export default memo(function A({data, handleClick}) {
                    console.log('children render');
                    return (
                        <div>
                            <h1>{ data.num }</h1>
                            <button onClick={handleClick}>点我+1</button>
                        </div>
                    )
                })
        ·原理
            export function useCallback(callback,deps){
                if(hookStates[hookIndex]){
                    let [lastCallback,lastDeps] = hookStates[hookIndex];
                    let same = deps.every((item,index)=>item === lastDeps[index]);
                    if(same){
                    hookIndex++;
                    return lastCallback;
                    }else{
                    hookStates[hookIndex++]=[callback,deps];
                    return callback;
                    }
                }else{
                    hookStates[hookIndex++]=[callback,deps];
                    return callback;
                }
            }
    ·useReducer
        ·介绍
            useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法，
            在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等
        ·使用
            import React from './react';
            import ReactDOM from './react-dom';
            function reducer(state={number:0}, action) {
            switch (action.type) {
                case 'ADD':
                return {number: state.number + 1};
                case 'MINUS':
                return {number: state.number - 1};
                default:
                return state;
            }
            }

            export default function Counter(){
                const [state, dispatch] = React.useReducer(reducer,{number:0});
                return (
                    <div>
                    Count: {state.number}
                    <button onClick={() => dispatch({type: 'ADD'})}>+</button>
                    <button onClick={() => dispatch({type: 'MINUS'})}>-</button>
                    </div>
                )
            }
        ·原理
            export function useReducer(reducer, initialState) {
                hookStates[hookIndex]=hookStates[hookIndex]||initialState;
                let currentIndex = hookIndex;
                function dispatch(action) {
                hookStates[currentIndex]=reducer?reducer(hookStates[currentIndex],action):action;
                scheduleUpdate();
                }
                return [hookStates[hookIndex++], dispatch];
            }
    ·useContext
        ·介绍
            1)接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值
            2)当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定
            3)当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值
            4)useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 <MyContext.Consumer>
            5)useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider>
                来为下层组件提供 context
            6)相当于class类组件中的static contextType = context
        ·使用
            // useContext接收一个context对象(通过React.createContext()获得)，ct就代表父组件provider过来的数据
                const ct = useContext(context)
                console.log(ct)
        ·原理
            function useContext(context){
                return context._currentValue;
            }
    ·useEffect
        ·介绍
            1)在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，
                因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性
            2)使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会在组件渲染到屏幕之后执行。你可以把 effect 看作从 React 的纯函数式世界
                通往命令式世界的逃生通道
            3)useEffect 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API
                该 Hook 接收一个包含命令式、且可能有副作用代码的函数
        ·使用：
            import React,{ useState } from 'react'
            export default function App() {
                const [count, setCount] = useState(0)
                ocnst click = ()=>{
                    setCount(count+1)
                }

                //这里用到useEffect
                useEffect(()=>{
                    // 这里相当于componentDidMount / componentDidUpdate
                    // 如果只触发componentDidMount，第二个参数传递一个空数组 []
                    // 如果既触发componentDidMount又触发componentDidUpdate，第二个参数需要传递变量进入,或者第二个参数不写也可以 

                    return ()=>{
                        // useEffect的返回值类似于componentWillUnMounted这个钩子，但有些不同点，他只有更新时或者组件卸载才会触发
                        // 并且在组件更新的时候优先级高于上面写的代码
                    }
                },[])

                return(
                    <>
                        <h1>{ count }</h1>
                        <button onClick={click}>点我加1</button>
                    </>
                )
            }
        ·原理
            export function useEffect(callback,dependencies){
                let currentIndex = hookIndex;
                if(hookStates[hookIndex]){
                    let [destroy,lastDeps] = hookStates[hookIndex];
                    let same = dependencies&&dependencies.every((item,index)=>item === lastDeps[index]);
                    if(same){
                        hookIndex++;
                    }else{
                        destroy&&destroy();
                        setTimeout(()=>{
                            hookStates[currentIndex]=[callback(),dependencies];
                        });
                        hookIndex++;
                    }
                } else {
                    setTimeout(()=>{
                        hookStates[currentIndex]=[callback(),dependencies];
                    });
                    hookIndex++;
                }
            }


    ·useLayoutEffect
        ·介绍
            1)其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect
            2)useEffect不会阻塞浏览器渲染，而 useLayoutEffect 会浏览器渲染
            3)useEffect会在浏览器渲染结束后执行,useLayoutEffect 则是在 DOM 更新完成后,浏览器绘制之前执行
            4)useEffect是异步的，而useLayoutEffect是同步的
        ·使用
            import React from './react';
            import ReactDOM from './react-dom';

            const Animate = ()=>{
                const ref = React.useRef();
                React.useLayoutEffect(() => {
                ref.current.style.transform = `translate(500px)`;//TODO
                ref.current.style.transition = `all 500ms`;
                });
                let style = {
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'red'
                }
                return (
                <div style={style} ref={ref}></div>
                )
            }
            ReactDOM.render(<Animate/>,document.getElementById('root'));
        ·原理
            export function useLayoutEffect(callback,dependencies){
                let currentIndex = hookIndex;
                if(hookStates[hookIndex]){
                    let [destroy,lastDeps] = hookStates[hookIndex];
                    let same = dependencies&&dependencies.every((item,index)=>item === lastDeps[index]);
                    if(same){
                    hookIndex++;
                    }else{
                    destroy&&destroy();
                    queueMicrotask(()=>{
                        hookStates[currentIndex]=[callback(),dependencies];
                    });
                    hookIndex++
                    }
                }else{
                queueMicrotask(()=>{
                    hookStates[currentIndex]=[callback(),dependencies];
                });
                hookIndex++;
                }
            }
    ·useRef
        ·介绍
            *作用是让工程函数组件也能够使用ref
            *本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。
        ·使用
            function A() {
                const el = useRef(null)
                useEffect(()=>{ 
                    console.log(el);
                },[])
                return (
                    <div ref={el}>
                        <input type="text"/>
                        a...
                    </div>
                )
            }
        ·原理
            export function useRef(initialState) {
                hookStates[hookIndex] =  hookStates[hookIndex] || { current: initialState };
                return hookStates[hookIndex++];
            }
    ·useImperativeHandle
        ·介绍
            可以让你在使用 ref 时自定义暴露给父组件的实例值,和forwardRef相比，forwardRef可以随意更改子组件ref真是DOM的属性，
                而useImperativeHandle相当于限制开发者无法更改，相对更加安全
        ·使用
            import React from './react';
            import ReactDOM from './react-dom';

            function Child(props, ref) {
                const inputRef = React.useRef();
                React.useImperativeHandle(ref, () => (
                    {
                        focus() {
                            inputRef.current.focus();
                        }
                    }
                ));
                return (
                    <input type="text" ref={inputRef} />
                )
            }
            const ForwardChild = React.forwardRef(Child);
            function Parent() {
                let [number, setNumber] = React.useState(0);
                const inputRef = React.useRef();
                function getFocus() {
                    console.log(inputRef.current);
                    inputRef.current.value = 'focus';
                    inputRef.current.focus();
                }
                return (
                    <div>
                        <ForwardChild ref={inputRef} />
                        <button onClick={getFocus}>获得焦点</button>
                        <p>{number}</p>
                        <button onClick={() => {
                            debugger
                            setNumber( number + 1)
                        }}>+</button>
                    </div>
                )
            }
            ReactDOM.render(<Parent/>,document.getElementById('root'));
        ·原理
            function mountClassComponent(vdom){
            +    const {type, props,ref} = vdom;
                const classInstance = new type(props);
            +   if(ref){
            +       ref.current = classInstance;
            +       classInstance.ref = ref;
            +   }
                vdom.classInstance=classInstance;
                if(type.contextType){
                    classInstance.context = type.contextType.Provider._value;
                }
                if(classInstance.componentWillMount)
                classInstance.componentWillMount();
                classInstance.state = getDerivedStateFromProps(classInstance,classInstance.props,classInstance.state)   
                const renderVdom = classInstance.render();
                classInstance.oldRenderVdom=vdom.oldRenderVdom=renderVdom;
                const dom = createDOM(renderVdom);
                if(classInstance.componentDidMount)
                dom.componentDidMount=classInstance.componentDidMount.bind(classInstance);
                return dom;
            }

            +export function useImperativeHandle(ref,handler){
            +    ref.current = handler();
            +}
            const ReactDOM =  {
                render
            };
            export default ReactDOM;
    ·useDebugValue(略~~)
        ·介绍
        ·使用
        ·原理
二十九、在react中使用typescript
    1.定义class组件的时候
        class index extends Component<Prop, State>
        第一个Prop代表要传递过来的属性，第二个代表自身的staate
    2.使用ref的时候
        input: React.RefObject<HTMLInputElement> = createRef();
三十、react中使用计算属性
    在 react 中主要有三种使用 “计算属性” 的方法。
    1)对于类组件，直接使用 get 方法即可达成计算属性：
        public get bbb(): string {
            const { aaa } = this.props;
            const isOdd = aaa % 2 === 1? '奇数': '偶数';
            return `我是${isOdd},我的值是${aaa}`;
        }
    2)在函数组件中，一般使用 useMemo 进行计算属性的计算（当依赖列表变化时重新计算）
        const computed = useMemo(() => handler(value), [value])
        例子如下：
            const [baseComputed, setBaseComputed] = useState('TEWDFS')
            // 定义计算属性handle和add
            const handle = baseComputed.toUpperCase();
            const add = baseComputed + '~~~~';
            useEffect(() => {
                console.log(handle);
                console.log(add);
            }, [baseComputed, add, handle])
    3)当处理 props 的方法为异步时，useMemo 将不再适用，需要借用 useEffect 内部支持执行 async 函数的特性转化一步：
        详情请见浏览器收藏，嘤嘤嘤~
三十一、react中的监视watch



        
★★附件、常见react面试题★★
    1）你是如何理解react单向数据流的？vue的单向数据流双向数据绑定的？
        1.数据的流向只能通过props由外层到内层 一层一层往里传递。这样有利于让我们找到数据的根源。
        2.双向数据绑定指的是单纯的数据与视图之间的关系
    2)react中getderivedstatefromprops为什么是一个静态方法?
        将某些生命周期设为静态，以防止不安全地访问实例属性。


    
    
        
        
            



    
    


            


    



    


            
    

                    




        




    








    


            

        


















 */

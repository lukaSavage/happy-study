/*
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
            mount(vdom,container);
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
    ·使用
        import React from './react';
        import ReactDOM from './react-dom';
        function Counter() {
            const [number, setNumber] = React.useState(0);
            React.useEffect(() => {
                console.log('开启一个新的定时器')
                const $timer = setInterval(() => {
                    setNumber(number => number + 1);
                }, 1000);
                return () => {
                    console.log('销毁老的定时器');
                    clearInterval($timer);
                }
            });
            return (
                <p>{number}</p>
            )
        }
        ReactDOM.render(<Counter />, document.getElementById('root'));
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
          }else{
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
        主要用于获取DOM
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












*/
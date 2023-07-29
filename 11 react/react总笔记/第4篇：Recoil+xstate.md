# 一、Recoil

## 1.1 介绍

> [recoil](https://recoiljs.org/docs/introduction/motivation)解决`React`全局数据流管理的问题，由`META`公司创建，采用分散管理原子状态的设计模式，支持派生数据。

与Redux的区别：

​	redux是集中管理状态的库，而recoil是分散的。

## 1.2安装

```bash
npm install recoil --save
```

## 1.3 核心概念介绍

### 1.3.1 示例演示

Atom 是状态的单位。它们可更新也可订阅：当 atom 被更新，每个被订阅的组件都将使用新值进行重渲染。它们也可以在运行时创建。可以使用 atom 替代组件内部的 state。<font color="#f00">如果多个组件使用相同的 atom，则这些组件共享 atom 的状态。</font>

```tsx
const fontSizeState = atom({
  key: 'fontSizeState', // key必须在RecoilRoot作用域内唯一！！！
  default: 14,
});
```

Atom 需要一个唯一的 key 值<font color="#08e">(如果不一样，则后者key会覆盖前者，即便atom返回的变量名不一样)</font>，该 key 可用于调试、持久化以及使用某些高级的 API，这些 API 可让你查看所有 atom 的图。两个 atom 不应拥有相同的 key 值，因此请确保它们在全局上的唯一性。和 React 组件中的 state 一致，它们也拥有默认值。

要从组件中读取和写入 atom，我们需使用一个名为 `useRecoilState` 的 hook。和 React 的 `useState` 用法一致，但是这里的 state 可以在组件间共享使用：

```tsx
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return (
    <button onClick={() => setFontSize((size) => size + 1)} style={{fontSize}}>
      Click to Enlarge
    </button>
  );
}
```

单击此按钮将使按钮的字体大小加 1。此时其他组件也可以使用相同的字体大小：

```tsx
function Text() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  return <p style={{fontSize}}>This text will increase in size too.</p>;
}
```

最后使用`RecoilRoot`

```tsx
ReactDOM.render(
<RecoilRoot>
  <TodoApp />
</RecoilRoot>,document.getElementById('root'));
```

完整示例如下

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { atom, RecoilRoot, useRecoilState } from 'recoil'

const counter = atom({
    key: 'demo',
    default: 0
})

const App = () => {
    let [count, setCount] = useRecoilState(counter)
    return <div>
        <h1>{count}</h1>
        <button onClick={()=> setCount(++count)}>点我加1</button>
    </div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>
)
```

### 1.3.2 实现atom、RecoilRoot、useRecoilState

#### 1.3.2.1 RecoilRoot

```tsx
import React,{useRef} from 'react';
import AppContext from './AppContext';

function RecoilRoot({ children }) {
    const state={};
    const store = {getState:()=>state};
    const storeRef = useRef(store);
    return (
        <AppContext.Provider value= {storeRef}>
            {children}
        </AppContext.Provider>
    )
}

export default RecoilRoot;
```

#### 1.3.2.2 atom

```tsx
const nodes = new Map();

function atom(options) {
  let value = options.default;
  let node =  {
    key:options.key,
    get:()=>{
      return value;
    },
    set:(newValue)=>{
      value = newValue;
    }
  }
  nodes.set(node.key, node);
  return node;
}

function getNode(key) {
  return nodes.get(key);
}

export default atom;

export {
  getNode
}
```

#### 1.3.2.3 useRecoilState

```tsx
import {useState} from 'react';
import {getNode} from './atom';
function useRecoilState(recoilState){
   return [recoilState.get(),useSetRecoilState(recoilState)];
}

function useSetRecoilState(recoilState){
   let [,forceUpdate] = useState(0);
   return newValue=> {
      getNode(recoilState.key).set(newValue);
      forceUpdate(x=>x+1);
  }
}
export default useRecoilState;
```

## 1.4 useRecoilValue的用法

很多时候我们只想获取数据而不想修改，或者反之，此时可以用语法糖 `useRecoilValue` 和 `useSetRecoilState`

```text
function UserProfile() {
  const firstName = useRecoilValue(firstNameAtom);

  return (
    <div> { firstName } </div>
  );
}
```

`Recoil` 会根据哪里用到了这些状态自动建立一种依赖关系，当发生变更时 `Recoil` 只会通知对应的组件进行更新。


# 一、Recoil

## 1.1 介绍

> [recoil\]](https://recoiljs.org/docs/introduction/motivation)解决`React`全局数据流管理的问题，由`META`公司创建，采用分散管理原子状态的设计模式，支持派生数据。

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

Atom 需要一个唯一的 key 值，该 key 可用于调试、持久化以及使用某些高级的 API，这些 API 可让你查看所有 atom 的图。两个 atom 不应拥有相同的 key 值，因此请确保它们在全局上的唯一性。和 React 组件中的 state 一致，它们也拥有默认值。

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


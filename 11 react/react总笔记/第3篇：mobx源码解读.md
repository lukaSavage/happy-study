# 一、mobx6实战篇

## 1.1 介绍

> MobX 是一个经过战火洗礼的库，它通过透明的函数响应式编程(transparently applying functional reactive programming - TFRP)使得状态管理变得简单和可扩展。
>
> mobx讲究：*任何源自应用状态的东西都应该自动地获得。*
>
> 附：[mobx中文文档](https://zh.mobx.js.org/README.html)、[另一个参考文档](https://cn.mobx.js.org/)

![](imgs/07、mobx事件流.png)

**让我们来简单体验一下mobx**

```tsx
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

// 对应用状态进行建模。
class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increase() {
        this.secondsPassed += 1
    }

    reset() {
        this.secondsPassed = 0
    }
}

const myTimer = new Timer()

// 构建一个使用 observable 状态的“用户界面”。
const TimerView = observer(({ timer }) => (
    <button onClick={() => timer.reset()}>已过秒数：{timer.secondsPassed}</button>
))

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

// 每秒更新一次‘已过秒数：X’中的文本。
setInterval(() => {
    myTimer.increase()
}, 1000)
```



## 1.2 安装

```bash
npm i mobx mobx-react
```

## 1.3 mobx核心API介绍

### 1.3.1 创建可观察状态

属性，完整的对象，数组，Maps 和 Sets 都可以被转化为可观察对象。 使得对象可观察的基本方法是使用 `makeObservable` 为每个属性指定一个注解。 最重要的注解如下：

- `observable` 定义一个存储 state 的可追踪字段。
- `action` 将一个方法标记为可以修改 state 的 action。
- `computed` 标记一个可以由 state 派生出新的值并且缓存其输出的 getter。

像数组，Maps 和 Sets 这样的集合都将被自动转化为可观察对象。

### 1.3.2 observable

> 用法: `observable(source, overrides?, options?)`

- [observable](https://zh.mobx.js.org/observable-state.html#observable)注解可以作为一个函数进行调用，从而一次性将整个对象变成可观察的。 `source`对象将会被克隆并且所有的成员都将会成为可观察的
- 由 `observable` 返回的对象将会使用 Proxy 包装，这意味着之后被添加到这个对象中的属性也将被侦测并使其转化为可观察对象
- 有点类似于`vue`中的`reactive`,同样也是用到了`Proxy`

```tsx
import {observable,reaction} from 'mobx';
let obj = {name:'1'}
let proxyObj = observable(obj);
console.log(proxyObj);

/*
打印结果
1
*/
```

### 1.3.3 reactions（概念）

> reactions 是需要理解的重要概念，因为他可以将 MobX 中所有的特性有机地融合在一起。 reactions 的目的是对自动发生的副作用进行建模。 它们的意义在于为你的可观察状态创建消费者，以及每当*关联*的值发生变化时，*自动*运行副作用。
>
> 但是，为了理解 MobX，让我们看一下如何创建 reactions。 最简单的方式是使用 [`autorun`](https://zh.mobx.js.org/reactions.html#autorun) 工具函数。 除此之外，还有 [`reaction`](https://zh.mobx.js.org/reactions.html#reaction) 和 [`when`](https://zh.mobx.js.org/reactions.html#when)。

### 1.3.4 autorun

> 用法：autorun(effect: (reaction) => void)

- [Autorun](https://zh.mobx.js.org/reactions.html#autorun) 函数接受一个函数作为参数，每当该函数所观察的值发生变化时，它都应该运行。 当你自己创建 autorun 时，它也会运行一次。它仅仅对可观察状态的变化做出响应，比如那些你用 `observable` 或者 `computed` 注解的
- `Autorun`通过在响应式上下文运行 `effect`来工作。在给定的函数执行期间，MobX 会持续跟踪被 effect 直接或间接读取过的所有可观察对象和计算值。 一旦函数执行完毕，MobX 将收集并订阅所有被读取过的可观察对象，并等待其中任意一个再次发生改变。 一旦有改变发生，autorun 将会再次触发，重复整个过程

```tsx
import {observable,autorun} from 'mobx';
let obj = {name:'1'}
let proxyObj = observable(obj);
autorun(()=>{
    console.log(proxyObj.name);
})
proxyObj.name = '2';

/*
打印结果
1
2
*/
```

但此时会有警告，原因是需要使用方法并在`makeObservable`中添加`action`来更改值才行。

### 1.3.5 makeObservable

<font color="#f00">**（该API属于v6版本新特性）** </font>

> 用法：makeObservable(target, annotations?, options?)

- 属性、整个对象、数组、Maps 和 Sets 都可以被转化成 observable。
- [makeObservable](https://zh.mobx.js.org/observable-state.html#makeobservable)函数可以捕获已经存在的对象属性并且使得它们可观察。任何 JavaScript 对象（包括类的实例）都可以作为 target 被传递给这个函数。 一般情况下，makeObservable 是在类的构造函数中调用的，并且它的第一个参数是 this

```tsx
import {observable,makeObservable,autorun} from 'mobx';
class Doubler {
    value
    constructor(public value) {
        makeObservable(this, {
            value: observable,
        })
    }
}
const doubler = new Doubler(1);
autorun(()=>{
    console.log(doubler.value);
});
doubler.value = 2;

/*
打印结果
1
2
*/
```

### 1.3.6 computed

- 计算值可以用来从其他可观察对象中派生信息。 计算值采用惰性求值，会缓存其输出，并且只有当其依赖的可观察对象被改变时才会重新计算。 它们在不被任何值观察时会被暂时停用
- 计算值可以通过在 `JavaScript getters` 上添加 `computed` 注解来创建。 使用 `makeObservable` 将 getter 声明为 `computed`。或者如果你希望所有的 getters 被自动声明为 computed，可以使用 `makeAutoObservable`

```tsx
+import {observable,makeObservable,autorun,computed} from 'mobx';
class Doubler {
    value
    constructor(value) {
        makeObservable(this, {
            value: observable,
+           double: computed,
        })
        this.value = value
    }
+   get double() {
+       return this.value * 2
+   }
}
const doubler = new Doubler(1);
autorun(()=>{
    console.log(doubler.value);
+   console.log(doubler.double);
});
doubler.value = 2;

/*
打印结果
1
2

2
4
*/
```

### 1.3.7 action

- 1

```tsx
class Doubler {
    constructor(public value: any) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action // 增加action,此时控制台不警告了
        })
        this.value = value
    }
    get double() {
        return this.value * 2
    }
    // 在makeObservable设定action后，action内部会使用事务的机制，即只有最后的时候才更新,只走一次
    increment() {
        this.value++
        this.value++
    }
}
const doubler = new Doubler(1)
autorun(() => {
    console.log(doubler.value)
})

doubler.increment()
/*
打印结果
（在makeObservable没写action之前）
1
2
3
（在makeObservable写了action之后）
1
3
*/
```


# React源码解读

## 一、React编译流程

### 1.1 图文介绍

![](imgs/01、react渲染过程.png)

### 1.2 部分核心代码

```js
/**
 * 将虚拟DOM转化成真实DOM
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function createDOM(vdom) {
	const { type, props } = vdom;
	let dom; // 真实dom
	if (type === REACT_TEXT) {
		// 说明是元素节点
		dom = document.createTextNode(props);
	} else {
		dom = document.createElement(type);
	}
	if (props) {
		updateProps(dom, null, props);
		const children = props.children;
		if (typeof props === 'object' && children.type) {
			mount(children, dom);
		} else if (Array.isArray(children)) {
            // 循环递归
			reconcileChildren(children, dom);
		}
	}
    // 做一个标识，后面用
    vdom.dom = dom;
    return dom;
}
```

## 二、函数组件与类组件

- 函数组件与类组件的类型同为 `function`，那么它们是如何区分的？

  ```js
  // React.Component类中有一个静态属性isReactComponent,专门用于区分这两种组件的
  export class Component {
  	static isReactComponent = true;
  	constructor(props) {
  		this.props = props;
  		this.state = {};
  		this.updater = new Updater(this);
  	}
  }


  function createDOM(vdom) {
  	if (type === REACT_TEXT) {
          ...
  	} else if (typeof type === 'function') {
  		// 通过isReactComponent判断是类组件还是函数组件
  		if (type.isReactComponent) { 
  			return mountClassComponent(vdom);
  		}
  		return mountFunctionComponent(vdom);
  	} else {
          ...
  	}
  	...
  	return dom;
  }
  ```
- 组件更新原理？

  1. 初次挂载的时候，已经在页面上放置了一个div容器，我们可以称之为‘父容器’。
  2. 更新的时候，拿到新的state状态，重新调用render方法返回新的虚拟DOM，进而生成新的真实DOM
  3. 用新的真实DOM替换掉老的div就实现更新了

  `<font color="#f00">`代码示例如下↓`</font>`

  ```js
  forceUpdate() {
      // 获取此组件上一次render渲染出来的虚拟DOM
      const oldRenderVdom = this.oldRenderVdom;
      const oldDOM = findDOM(oldRenderVdom);
      const newVdom = this.render();
      compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newVdom);
      this.oldRenderVdom = newVdom;
  }

  /**
   * 进行DOM-DIFF对比
   * @param {*} parentDOM 父真实DOM节点
   * @param {*} oldVdom 老的虚拟DOM
   * @param {*} newVdom 新的虚拟DOM
   */
  export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  	// 获取老的真实DOM
  	let oldDOM = findDOM(oldVdom);
  	let newDOM = createDOM(newVdom);
  	parentDOM.replaceChild(newDOM, oldDOM);
  }
  ```

## 三、事件和更新原理

### 1.1  setState异步机制

> 我们都知道，setState在类组件中，即是同步的也是异步的，分为两种情况
>
> `<font color="#08e">`①、setState在自定义合成事件和钩子函数中是`<font color='#f00'>异步``</font>`的`</font>`
>
> `<font color="#08e">`①、在原生DOM事件和定时器中是`<font color='#f00'>同步``</font>`的`</font>`

同时，我们也发现，setState是批量更新的，这主要是为了解决render函数频繁被调用导致的性能浪费而考虑的。

### 1.2 setState批量更新机制

1. React.Component类中有一个更新器，名为 `updateQueue`,大致有 `isBatchingUpdate`、`updates`、`batchUpdate`函数
2. `<font color='#f00'>isBatchingUpdate``</font>`用于判断是否批量，如果是则把要更新的属性存入到updates中，如果不是，立马调用 `batchUpdate`函数
3. `updates`用于收集setstate传递过来的对象或者函数
4. `batchUpdate`做的事情主要是区分setState传递来的是函数还是对象，然后通过三点运算符将原state合并一起，并进行强制更新视图

```js
export let updateQueue = {
	isBatchingUpdate: false, // 更新队列中有个标识，表示是否执行批量更新
	updaters: new Set(), // updater实例的集合
	batchUpdate() {
		// 批量更新update实例的方法
		for (const iterator of this.updaters) {
			iterator.updateComponent();
		}
		// 更新完之后将isBatchingUpdate改回来
		this.isBatchingUpdate = false;
		this.updaters.clear();
	},
};
```

### 1.3 自定义合成事件

![](imgs/02、合成事件原理.png)

## 四、虚拟DOM diff算法

> 虚拟dom diff的对比，总共有三种diff，即`<font color='#f00'>Tree Diff``</font>`、`<font color='#f00'>Component Diff``</font>`、`<font color='#f00'>Element Diff``</font>`,其中最为核心的当属第三种。

对比步骤如下↓

1. 如果新、旧vdom都没有，什么都不做，直接 `return`
2. 如果老的有，新的没有，删除老的vdom
3. 如果老的没有，新的有，插入即可
4. 如果新旧vdom都有，但是类型不一样，删除老的，插入新的
5. 如果新旧vdom都有，并且类型一样，开始走 `Element-Diff`

```js
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
	// 前面的代码废弃，开始新的DOM-DIFF
	// let oldDOM = findDOM(oldVdom);
	// let newDOM = createDOM(newVdom);
	// parentDOM.replaceChild(newDOM, oldDOM);

	// 如果新老vdom都为null, 什么都不做
	if (!oldVdom && !newVdom) {
		return;
	} else if (oldVdom && !newVdom) {
		// 如果老的有，新的没有，干掉老的
		unMountVdom(oldVdom);
	} else if (!oldVdom && newVdom) {
		// 如果老的没有，新的有，插入即可(同时判断下componentDidMount)
		const newDOM = createDOM(newVdom);
		if (nextDOM) {
			parentDOM.insertBefore(newDOM, nextDOM);
		} else {
			parentDOM.appendChild(newDOM);
		}
		if (newDOM.componentDidMount) newDOM.componentDidMount();
	} else if (oldVdom && newVdom && oldVdom.type !== newVdom.type) {
		// 如果新老都有，但是类型不同，则把老的删掉，新的插入进来
		unMountVdom(oldVdom);
		const newDOM = createDOM(newVdom);
		if (nextDOM) {
			parentDOM.insertBefore(newDOM, nextDOM);
		} else {
			parentDOM.appendChild(newDOM);
		}
		if (newDOM.componentDidMount) newDOM.componentDidMount();
	} else {
		// 如果新老都有，并且还一样，就可以深度dom-diff并且可以复用当前的DOM节点
		updateElement(oldVdom, newVdom);
	}
}
```

### 4.1 Element-Diff详细流程

![](imgs/03、element-diff原理.png)

### 4.2 代码参考

```js
function updateChildren(parentDOM, oldVChildren, newVChildren) {
	oldVChildren = (
		Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]
	).filter(i => i);
	newVChildren = (
		Array.isArray(newVChildren) ? newVChildren : [newVChildren]
	).filter(i => i);
	// 开始使用element-diff
	// ①、把老节点存放到一个以key为属性，以节点为值得数组中
	let keyedOldMap = {};
	// ②、定义一个索引值，代表上一次老节点匹配到的索引值
	let lastPlacedIndex = 0;
	oldVChildren.forEach((item, index) => {
		keyedOldMap[item.key | index] = oldVChildren;
	});

	// ③、遍历newVChildren并map上面的keyedOldMap,把没有找到的、找到了但需要移动的插入到patch数组中
	let patch = [];
	newVChildren.forEach((newVChild, index) => {
		let newKey = newVChild.key || index;
		let oldVChild = keyedOldMap[newKey];
		// 匹配到了，存起来
		if (oldVChild) {
			updateElement(oldVChild, newVChild);
			if (oldVChild.mountIndex < lastPlacedIndex) {
				patch.push({
					type: MOVE,
					oldVChild,
					newVChild,
					mountIndex: index,
				});
			}
			// 从Map中删除已经复用好的节点
			delete keyedOldMap[newKey];
			lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild.mountIndex);
		} else {
			// 找不到代表新属性，插入进去
			patch.push({
				type: PLACEMENT,
				newVChild,
				mountIndex: index,
			});
		}
	});
	// 先把需要移动和需要删除的全部干掉
	let moveChild = patch
		.filter(item => item.type === MOVE)
		.map(i => i.oldVChild);
	// 此时keyedOldMap只剩下newVdom里面没有匹配到的老节点了，之后把对应的真实oldDom以及需要移动的真实moveDom全部从老的真实dom中干掉
	// 这个时候老的dom书里面只剩下匹配到的并且没有移动的节点了
	Object.values(keyedOldMap)
		.concat(moveChild)
		.forEach(oldVChild => {
			let currentDOM = findDOM(oldVChild);
			parentDOM.removeChild(currentDOM);
		});
	// patch此时存放了需要移动的、oldVdom里面没有的节点
	patch.forEach(action => {
		let { type, oldVChild, newVChild, mountIndex } = action;
		let childNodes = parentDOM.childNodes;  // 此时的childNodes中只剩下匹配到了但没有移动的节点了
		let currentDOM;
		if (type === PLACEMENT) {
			currentDOM = createDOM(newVChild);
		} else if (type === MOVE) {
			currentDOM = findDOM(oldVChild);
		}
		let childNode = childNodes[mountIndex];
		if (childNode) {
			parentDOM.insertBefore(currentDOM, childNode);
		} else {
			parentDOM.appendChild(currentDOM);
		}
	});
}
```

### 4.3流程说明

## 五、React生命周期

> 所谓生命周期，其原理就是在编译过程中在合适的地方判断并插入某些函数。

### 5.1 旧版生命周期

![](imgs/04、旧生命周期.png)

### 5.2 新版生命周期

![](imgs/05、新生命周期.png)

## 六、context实现原理

context的实现原理，简单的来说就是创建了一个全局变量，在最顶级父级将需要共享的变量传递，在后续的子组件中消费即可。

```js

function createContext() {
	const context = { $$typeof: REACT_CONTEXT, _currentValue: undefined };
	// 这里给context塞属性
	context.Provider = {
		$$typeof: REACT_PROVIDER,
		_context: context,
	};
	context.Consumer = {
		$$typeof: REACT_CONTEXT,
		_context: context,
	};

	return context;
}

/*
let context = {
    $$typeof: Symbol(react.context),
    Consumer: {$$typeof: Symbol(react.context), _context: context},    // ☆ 注意这里循环引用
    Provider: {$$typeof: Symbol(react.provider), _context: context},
    _currentValue: {xxx: xxx}
}
*/

const react = {
	createElement,
	Component,
	createRef,
	forwardRef,
    createContext
};

export default react;
```

具体实现步骤如下↓

1. 首先createContext本省是一个函数，它返回一个变量作为全局变量，方便子组件读取属性
2. 返回的context是一个循环引用变量，其中有两个特殊的组件，即`<font color='#f00'>Prrovider``</font>`、`<font color='#f00'>Consumer``</font>`。我们需要针对于这两个组件进行特殊处理
3. 通过 `<xxxContext.provide />`组件获取用户传递过来的value,赋值给 `context._currentValue`
4. 在渲染 `<xxxContext.Customer>`组件时，`<font color='#f00'>`它会将你的children当做函数调用，并传递 `context._currentValue</font>`值，所以这也是为什么需要写成一个函数的原因。

```js
function createDOM(vdom) {
	const { type, props, ref } = vdom;
	let dom; // 真实dom
	if (type && type.$$typeof === REACT_PROVIDER) {
		return mountProviderComponent(vdom);
	} else if (type && type.$$typeof === REACT_CONTEXT) {
		return mountContextComponent(vdom);
	}
    ...
}
  
function mountProviderComponent(vdom) {
	const { type, props } = vdom; // type = {$$typeof: Symbol(react.provider), _context: context}
	const context = type._context; // { $$typeof: Symbol(react.context), _context: context }
	context._currentValue = props.value; // 把用户传递过来的value值赋给context._currentValue
	const renderVdom = props.children; // Provider而言他要渲染的其实是它的儿子
	vdom.oldRenderVdom = renderVdom; // 这一步是为了后面更新用的
	return createDOM(renderVdom);
}
 
/* 下面的函数主要是为了渲染<xxxContext.Customer /> */
function mountContextComponent(vdom) {
	const { type, props } = vdom;
	const context = type._context;
	const renderVdom = props.children(context._currentValue);
	vdom.oldRenderVdom = renderVdom;
	return createDOM(renderVdom);
}
```

## 七、PureComponent和memo原理

### 7.1 React.PureComponent

`React.PureComponent` 继承于[`React.Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 。两者的区别在于 [`React.Component`](https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent) 并未实现 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，而 `React.PureComponent` 中`<font color='#f00'>`以浅层对比 prop 和 state 的方式来实现了该函数。即改写了 `shouldComponentUpdate`方法。`</font>`以下为浅比较函数↓

```js
export function shallowEqual(obj1, obj2) {
  // 如果地址是一样的，就认为是相等的
  if (obj1 === obj2) {
    return true;
  }
   
  // 只要任何一个不是对象或者说是一个null,那就不相等
  if (typeof obj1 != "object" || obj1 === null || typeof obj2 != "object" || obj2 === null) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  
  // 如果属性的数量不相等
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  // 遍历属性的值是否相等
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

/* 核心原理 */
class PureComponent extends Component {
  shouldComponentUpdate(newProps, nextState) {
    return !shallowEqual(this.props, newProps) || !shallowEqual(this.state, nextState);
  }
}
```

### 7.2 React.memo()

- 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。
- `React.memo` `<font color='#f90'>`仅检查 props 变更`</font>`。如果函数组件被 `React.memo` 包裹，且其实现中拥有 [`useState`](https://zh-hans.reactjs.org/docs/hooks-state.html)，[`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 或 [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

> `<font color='#f00'>`注意：`</font>React.memo` 仅检查 props 变更。如果函数组件被 `React.memo` 包裹，且其实现中拥有 [`useState`](https://zh-hans.reactjs.org/docs/hooks-state.html)，[`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 或 [`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。
>
> 与 class 组件中 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate) 方法不同的是，如果 props 相等，`areEqual` 会返回 `true`；如果 props 不相等，则返回 `false`。这与 `shouldComponentUpdate` 方法的返回值相反。

具体实现方法如下↓

```js
/**
参数说明：
    type: FunctionComponent类型，代表我们需要优化的组件
    compare：Function类型，代表对比的函数，默认使用PureComponent的shallowEqual对比函数
*/
function memo(type, compare = shallowEqual) {
  return {
    $$typeof: REACT_MEMO,
    type,
    compare
  }
}

function mountMemoComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type.type(props);
  vdom.prevProps = props; // 记录下老的属性对象，方便更新的时候进行对比！！！
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

// 更新的时候
function updateMemoComponent(oldVdom, newVdom) {
    let { type, prevProps } = oldVdom;
    // 如果新老属性比较后是不相等的，进入更新逻辑
    if(!type.compare(prevProps, newVdom.props)) {
        let oldDOM = findDOM(oldVdom); // 老的真实DOM
        let parentDOM = oldDOM.parentNode; // 真实父DOM
        let { type, props } = newVdom;
        let renderVdom = type.type(props);
        compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
        newVdom.prevPorps = props;
        newVdom.oldRenderVdom = oldVdom.renderVdom;
    } else { // 如果新老属性比较后是相等的，跳过更新，直接赋值
        newVdom.prevPorps = prevProps;
        newVdom.oldRenderVdom = oldVdom.oldRenderVdom;
    }
}
```

**总结一下memo原理：在渲染memo的时候，它会收集你的老的属性对象，同时在更新的时候进行新旧属性的判断,相等则跳过更新，不相等则进入更新逻辑**

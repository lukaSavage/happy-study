### 一、高阶函数

> 概念

一个函数的参数是函数或一个函数的返回值是一个函数，我们称之为高阶函数

```js
/**
 ★手写before方法
	即：在主函数额外添加一些装饰语法
*/


Function.prototype.before = function (callback) {
    return (...args) => {     // 注意：这里的箭头函数(不能使用普通函数，不然this指向不对)代表下面的newFn
        callback();    // 这里的callback代表下面传入的回调
        this(args);        // this指向coreFn
    }
}


function coreFn(args) {
    console.log(args);
    console.log('我是coreFn函数');
}

let newFn = coreFn.before(() => {
    console.log('我是before函数');
});
newFn(1,2,3);
```

###  二、函数柯里化(高阶函数的应用

> 概念

1. 柯里化: 如果一个函数有多个参数，我们可以根据参数的个数转化成n个函数，即参数是一个一个传递的
2. 偏函数：根据参数的个数分解成函数，每次调用的函数可以是多个。

> 练习： 实现一个after要求不用promise实现两个宏任务完成之后做些事情

```js
const fs = require('fs');


function after(count, callback) {
    let items = {};
    return (key, value) => {
        items[key] = value;
        if (Reflect.ownKeys(items).length >= count) {
            callback(items);
        }
    }
}

let finish = after(2, (data) => {
    console.log(data);
})

fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    setTimeout(() => {
        finish('张三', '我爱你');
    }, 4000);
})
fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    finish('老王', '我恨你');
})
```

### 三、设计者模式

#### 1.发布-订阅者模式

> 概念

​		发布订阅者模式就是一种<font color="#f00">一对多</font>的依赖关系。多个订阅者（一般是注册的函数）同时监听同一个数据对象，当这个数据对象发生变化的时候会执行一个发布事件，通过这个发布事件会通知到所有的订阅者，使它们能够自己改变对数据对象依赖的部分状态。
这样看来，一个完整的订阅发布模式，由发布者、订阅者、消息管理器三部分组成。

> 练习：使用发布-订阅者模式实现上面案例

```js
// 需求: 实现一个after要求不用promise实现两个宏任务完成之后做些事情(使用发布-订阅模式)
const fs = require('fs');

const event = {
    _arr: [],
    data: {},
    on(fn) {
        this._arr.push(fn);
    },
    emit(key, value) {
        this.data[key] = value;
        this._arr.forEach(item=>item(this.data));
    }
}
// 定义发布者
event.on((data)=>{
    console.log('发布者收到消息啦:', data);
    if(Reflect.ownKeys(data).length>=2) {
        console.log('收到全部消息了，', data);
    }
})

fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    setTimeout(() => {
        event.emit('张三', '我爱你');
    }, 4000);
})
fs.readFile('./01before函数的使用.js', 'utf8', (err, data) => {
    event.emit('老王', '我恨你');
})
```

#### 2.观察者模式

> 概念

​		观察者模式，属于行为型模式的一种，它定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个主题对象。这个主题对象在状态变化时，会通知所有的观察者对象，使他们能够自动更新自己。有些人认为观察者模式就是发布订阅模式，但实际上观察者模式和发布订阅模式是有区别的：如下↓↓↓

- 观察者模式只有两个，一个是观察者一个是被观察者。发布订阅模式不一样，发布订阅模式还有一个中间层，发布订阅模式的实现是，发布者通知给中间层 => 中层接受并通知订阅者 => 订阅者收到通知并发生变化
- 观察者模式是基于发布订阅模式的，观察者模式是基于类来实现的。
- 发布订阅模式是解耦的，而观察者模式不是
- 观察者模式必须包含一个update方法(设计模式的要求

```js
class Dispatch {
    constructor(name) {      // 被观察者
        this.name = name;
        this.observers = [];
        this.state = '开心'
    }
    attach(who) {
        // 把father和mother放入到observers中
        this.observers.push(who);   // 订阅

    }

    setState(status) {
        this.state = status;
        this.observers.forEach(item=>item.update(this.state));
    }
}


class Watcher {
    constructor(name) {            // 观察者
        this.name = name;
    }
    update(state) {      // 观察者必须包含update方法
        console.log(this.name,':触发了watcher，宝宝的state是：', state);
    }
}

const child = new Dispatch('宝宝');
const father = new Watcher('爸爸');
const mother = new Watcher('妈妈');

child.attach(father);
child.attach(mother);
child.setState('不开心了');
```

### 四、Promise原理

> 练习：手写promise：<a href="https://promisesaplus.com/">promise A+规范</a>

#### 思路整理：

  - 先实现promise的基本架构

    1.抛错处理                                                  ---------------------->       给executor包裹一个try catch

    2.多次调用resolve、reject只生效第一次     ----------------------->     使用if大法来解决

    3.异步和多个then问题处理                         ------------------------>     将需要延迟调用的onFulfilledCallbacks、onRejectedCallbacks存起来

- 实现then方法的链式调用

  1. then能链式调用需要返回一个新的promise
2. 根据状态不同调用onFulfilled、onRejected(同时需要try catch)
  3. 通过定义一个resolvePromise函数单独判断onFulfilled、onRejected返回值的情况
4. 这个时候需要包裹一层settimeout，不然拿不到promise2

- 实现resolvePromise

  1.先判断循环引用

  2.判断x.then是否为一个promise

  3.别让了判断别人的promise中的resolve、reject多次调用的问题以及y还是一个promise的情况

完整写法如下↓↓↓：



```js
/* 1.定义promise的三个状态 */
const PENDING = 'PENDING'; // 默认等待态
const FULFILLED = 'FULFILLED'; // 成功态
const REJECTED = 'REJECTED'; // 失败态

function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) { // 1.先判断是否循环引用
        return reject(new TypeError('循环引用'));
    }
    if ((typeof x === 'object' && x !== null) || (typeof x == 'function')) { // 2.继续判断x是不是一个promise
        // 才有可能是一个promise，继续判断x是否有then
        let called = false;
        try {
            let then = x.then;
            if (typeof then == 'function') { // 说明是promise
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    resolvePromise(y, promise2, resolve, reject); // 可能这个y还是一个promise，需要递归判断
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r)
                })
            } else { // {then: xxx},当做普通值
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // x是普通值
        resolve(x);
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING; // promise的默认装填为pending状态
        this.value = undefined; // 必须把value和reason保存起来，以供then方法使用
        this.reason = undefined;

        // 用来存放成功和失败的回调
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];




        // 用户调用resolve或者reject的时候，改变status状态并把响应的值赋值
        const resolve = (value) => {
            // 这里是为了判断value是一个promise的情况
            if (value instanceof Promise) { // 这个方法并不属于 规范中的，只是为了和原生的promise表现形式一样
                return value.then(resolve, reject); // === resolvePromise
            }
            if (this.status === PENDING) { // 这里防止用户多次调用resolve或者reject
                this.value = value; // 当一调用resolve时候，将value赋值过去
                this.status = FULFILLED; // 调用后立马改变状态
                this.onFulfilledCallbacks.forEach(item => item());
            }

        }
        const reject = (reason) => {
            if (this.status === PENDING) { // 这里防止用户多次调用resolve或者reject
                this.reason = reason; // 当一调用reject时候，将value赋值过去
                this.status = REJECTED; // 调用后立马改变状态
                this.onRejectedCallbacks.forEach(item => item());

            }
        }

        // 如果报错，将状态变成REJECTED状态
        try {
            executor(resolve, reject); // executor上来会先执行一下,接收resolve、reject两个方法
        } catch (error) {
            reject(error);
        }
    }

    // 给实例对象上添加一个静态方法,then方法接收两个函数作为参数，onFulfilled、onRejected-
    then(onFulfilled, onRejected) {
        // 解决onFulfilled、onRejected值传递的问题
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : e => {
            throw e
        };

        // ★每次调用then方法，都要返回一个全新的then(需要用到递归)
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);

            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            // 如果是pending状态，则把相应的回调存起来，延迟调用
            if (this.status === PENDING) {
                // 发布-订阅模式
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);

                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            resolvePromise(x, promise2, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);

                });
            }
        })
        return promise2;
    }
    /* catch方法的实现 */
    catch (onError) {
        return this.then(null, onError);
    };
    /* finally方法的实现 */
    finally(cb) {
        return this.then(y => {
            return Promise.resolve(cb()).then(() => y);
        }, r => {
            return Promise.resolve(cb()).then(() => {
                throw r
            })
        })
    };



    /* resolve方法的实现 */
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    /* reject方法的实现 */
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }
    /* all方法的实现 */
    static all(promises) { // promises代表传入的数组
        return new Promise((resolve, reject) => {
            let result = []; // 定义一个变量用来盛放结果
            let index = 0;

            function process(data, key) {
                result[key] = data;
                if (++index === promises.length) { // 解决多个并发问题只能靠计数
                    resolve(result);
                }
            }


            for (let i = 0; i < promises.length; i++) { // 1.将数组中的值依次执行
                const item = promises[i]; // 2.这里要判断item是不是一个promise
                if (item && typeof item.then === 'function') { // 说明是一个promise
                    item.then(data => {
                        process(data, i);
                    }, reject);
                } else {
                    process(item, i);
                }

            }
        })
    }
    
    /* race方法的实现 */
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (const item of promises) {
                if(item && typeof item.then === 'function') {
                    item.then(resolve, reject);
                } else {
                    // 说明是一个值类型
                    resolve(item);
                }
            }
        })
    }
    
    /* allSettled方法的实现  */
    static allSettled(promises) {
        return new Promise((resolve, reject) => {
            let result = [];
            let index = 0;

            function process(item, i) {
                result[i] = item;
                if (++index === promises.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < promises.length; i++) {
                const item = promises[i];
                if (item && typeof item.then === 'function') {
                    item.then(y => {
                        const obj = {
                            status: 'fulfilled',
                            value: y
                        }
                        process(obj, i);
                    }, r => {
                        const obj = {
                            status: 'rejected',
                            reason: r
                        }
                        process(obj, i);
                    })
                } else {
                    const obj = {
                        status: 'fulfilled',
                        value: item
                    }
                    process(obj, i);
                }
            }
        })
    }
    /* any方法的实现  */
}
Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}
module.exports = Promise;
```

### 五、generator生成器

#### 					1.基本语法

#### 		2.实现generator	

### 六、async await原理

#### 1.实现co库

```js
function co(generator) {
    return new Promise((resolve, reject)=>{
        function next(data) {
            let { value, done } = generator.next(data);
            if(done) {
                resolve(value);
            }
            Promise.resolve(value).then((val)=>{
                next(val);
            }, reject)
        }
    })
}
```

#### 					2.实现async await

### 七、浏览器事件环

#### 		1.宏任务与微任务分类

> - 宏任务：
>
>   script标签、settimeout、setInterval、setimmediate(IE专属)、DOM事件、ajax请求、MessageChannel、I/O操作(node环境)、GUI渲染、      requestAnimationFrame(有争议)、requestIdleCallback(有争议)
>
> - 微任务
>
>   Promise、MutationObserver、object.observe(已废弃)、process.nextTick(Node环境)、queueMicroTask

#### 		2.运行机制

​				①、先执行最大的宏任务script标签，执行完同步代码后，将宏任务和微任务进行分类，如果调用的是浏览器API，浏览器会开一个线程，等时间到了自动放入到宏任务队列汇总。微任务放入到微任务队列中。

​				②、js执行完后，会清空所有的微任务，如果微任务有微任务/宏任务，则会把该微任务/宏任务放到当前队列尾部，等当前微任务全部清空后，开始GUI渲染。取出下一个宏任务放入到队列中，继续执行1、2步骤。以此循环

> 		1. 宏任务每次调用一个，微任务是清空所有
> 		2. 微任务每次执行宏任务，都会创建一个新的队列，宏任务队列只有一个

### 3.恶趣味面试题

```js
Promise.resolve().then(()=>{
    console.log(1);
    return Promise.resolve(2);    // 相当于queueMicroTask(Promise.resolve(2))
}).then((res)=>{
    console.log(res);
})

Promise.resolve().then(()=>{
    console.log(3);
}).then(()=>{
    console.log(4);
}).then(()=>{
    console.log(5);
}).then(()=>{
    console.log(6);
})

// 先说答案：1 3 4 5 2 6
/*
	正常思路：
	 微任务队列：[then1, then3, 空2(没有打印暂时称为空), then4, then2, then5, then6]
	 // 按道理结果应该是 1, 3, 4, 2, 5, 6
	
	 ★坑★：
	 	在ECMAscript规范中有描述：如果你返回了一个promise，他不会立刻处理这个promise,会将这个promise包裹一层queueMicroTask去执行（也就是说会再生成一个微任务）。
	 	即微任务队列：[then1, then3, 空2(queueMircoTask), then4, 空2(Promise), then5, then2, then6]
	 	结果就是 1 3 4 5 2 6
*/
```



### 八、node中的事件环

#### 1.阶段概述

> 1. <font color="#f00">定时器（times）：</font><font color="#08e">存放所有的定时器回调</font>
> 2. <font color="#f00">待定回调（pending callback）：</font><font color="#08e">执行延迟到下一个循环迭代的I/O操作</font>
> 3. <font color="#f00">idle，prepar：</font><font color="#08e">仅系统内部使用</font>
> 4. <font color="#f00">轮询（poll）：</font><font color="#08e">轮询阶段，用于等待还未返回的 I/O 事件，比如服务器的回应、用户移动鼠标等等</font>
> 5. <font color="#f00">检测（check）：</font><font color="#08e">setImmediate在这里执行</font>
> 6. <font color="#f00">关闭回调（close callback）：</font><font color="#08e">一些关闭的回调函数，如socket.on('close', ...)</font>

2.执行规则

> 1. 检测定时器有没有到点，有就执行，(一次清空，并且是<font color="#f00">清空所有</font>times下到点的宏任务)，进入下一阶段。
> 2. 当执行到poll阶段时候，也依然和timer阶段一样，此时看check中的setImmediate里面，有就清空check队列，如果没有了，则阻塞
> 3. 此时不停的看timers阶段有没有定时器到点，如果有则回去继续执行1、2步骤
> 4. 如果node.js检查到没有任何异步I/O或者计时器，则完全关闭。

3.图解说明

```
    本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
   ┌───────────────────────────┐
┌─>│           timers          │ 
│  └─────────────┬─────────────┘
|   执行延迟到下一个循环迭代的 I/O 回调。
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
|   仅系统内部使用。
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      
|  检索新的I/O事件;执行与 I/O相关的回调  ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  setImmediate() 回调函数在这里执行。  └───────────────┘
│  ┌─────────────┴─────────────┐      
│  │           check           │
│  └─────────────┬─────────────┘
|  一些关闭的回调函数
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  
   └───────────────────────────┘
```

### 九、Node中的基本概念

#### 1.Node组成及基本概念

- Node可以理解成<font color="#f00">ECMAscript + 内置模块</font>组成的，有一个全球最大的开源库生态系统npm(node package manager).
- Node中没有锁的概念，它的应用场景是处理I/O密集型（文件读写），不适合处理cpu密集型（压缩加密、计算）。

### 2.node中常用的api

#### ①、this指向

> 服务端全局变量默认是global,但是node执行的时候为了实现模块化，会在执行代码时在外面包裹一层函数，函数执行的时候会通过call方法改变this指向，其指向<font color="#08e">空对象</font>。

#### ②、global.process

​			process下常用的api如下↓↓↓

| name                                  | desc                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| <font color="#f00">platform</font>    | 在window下拿到的值为win32, 在mac拿到的值为darwin             |
| <font color="#f00">cwd</font>         | （cross word direction）表示当前你所执行的<font color="#f90">文件夹</font>的完整绝对路径(_filename是<font color="#f90">文件</font>的完整绝对路径,__dirname表示被执行的js文件的<font color="#f90">文件夹</font>绝对路径) |
| <font color="#f00">process.env</font> | 代表当前的环境变量(通过set a = 1 && node xxx.js)来设置env，读取则用process.env.a来读取(a随便取的) |
| <font color="#f00">argv</font>        | 代表执行命令时所带的参数                                     |
| <font color="#f00">nextTick</font>    | 是一个不在node事件环中的优先级最高的一个微任务。             |

### 3.node的中的模块组成

#### 			①、node中的模块分为三大类

​     	   1.<font color="#08e">内置模块</font>                            node.js自带的模块       

​			2.<font color="#08e">文件模块</font>                            即用户自定义的模块，通常方式通常为require('./xxx.js');

​			3.<font color="#08e">第三方模块 </font>                        社区内程序员设计的模块，一般需要通过npm下载

#### 			②、核心模块

   1. <font color="#fbc">path模块</font>	
+ path.join( 'a', '//b', '../c');                 // 拿到的结果是一个相对路径, a/b,<font color="#f90">注意：path.join碰到//会默认处理成 ‘./’</font>
  
+ path.resolve( 'a', 'b', 'c');           // 拿到的结果是一个绝对路径，c:xxx/a/b/c, path.resolve遇到<font color="#f90">/</font>或者<font color="#f90">//</font>会回到根目录，<font color="#f90">比如：path.resolve( 'a', '//b', 'c');拿到的结果是：c:/b/c</font>默认以当前路径（process.cwd()）解析成绝对路径
  
+ path.basename('a.txt', '.txt');                  //第一个采纳数代表文件名，第二个参数代表后缀名，最终拿到的结果是a
  
+ path.extname('a.txt');                              // 取后缀名，拿到的结果是.js
  
+ path.relative('a/b/c', 'c')                          // 获取相对路径
  
+ path.dirname(__filename);                     // 略，基本上用不到
      
2. <font color="#fbc">vm模块</font>（该模块开发中基本用不到，它可以让一个字符串执行，类似new Function

#### 4.exports和module.exports

> 在vscode断点调试方法:
>
> ​		1.通过命令 <font color="#f00">node --inspect-brk  .\xxx.js</font>
>
> ​		2.通过vscode创建launch.json来debugger（点击小臭虫调式，同时需要把skipFiles去掉才行！）

```js
// 手写module.exports

```

#### 5.<font color="#fbc">events模块</font>

```js
// events模块通过new方法创建
const EventEmitter = require('events');
const event = new EventEmitter();
```

 - 内置方法

   + event.on                 用于订阅消息
   + event.emit              用于发布消息
   + event.once            只订阅一次消息
   + event.off                取消订阅

- 手写events

  ```js
  // 手写events
  function EventEmitter() {
      this._events = {}; // 用于存放事件,{ sth: [cb1, cb2, ...] }
  }
  
  EventEmitter.prototype.on = function (eventName, cb) {
      if (!this._events) this._events = {}; // 这里是判断继承的情况，this可能指向Son，而不是EventEmitter
      const callbacks = this._events[eventName] || []; // 这里代表原有的callbacks
      callbacks.push(cb); // 将原有的callbacks队列尾加新的cb
      this._events[eventName] = callbacks; // 重新覆盖掉原有的callbacks
  }
  EventEmitter.prototype.emit = function (eventName, ...args) {
      if (!this._events) this._events = {};
      const callbacks = this._events[eventName];
      if (callbacks) {
          callbacks.forEach(item => item(...args));
      }
  }
  EventEmitter.prototype.off = function (eventName, cb) {
      if (!this._events) this._events = {};
      const callbacks = this._events[eventName];
      if (callbacks) {
          this._events[eventName] = callbacks.filter(item => item !== cb && item.l !== cb);
      }
  }
  EventEmitter.prototype.once = function (eventName, cb) {
      // 思路是：先绑定，调用后才删除
      const oneFn = (...args) => {
          // ②、调用
          cb(...args);
          // ③、删除
          this.off(eventName);
      }
      oneFn.l = cb; // 这里是为了防止once方法创建之后立马使用off销毁的情况时无法销毁该cb
      // ①、先绑定
      this.on(eventName, oneFn);
  }
  
  
  
  // 最后暴露出去
  module.exports = EventEmitter;
  ```

#### 6.npm的基本使用

 - npm中一些常用的命令

   	- npm config list               查看配置
      	- npm root -g                    查看全局安装的目录

 - 配置全局命令

   ```
   1.先npm init -y 初始化一个包。
   2.在一级目录下添加一个bin字段：值为需要通过全局创建的命令要执行的文件(需要配置多个命令写成对象的形式)
   3.npm link一下可以将包暂时放到npm全局目录下
   4.此时运行一下包的name，可以将某个bin下面的那个xxx.js打开
   5.但如果我们需要执行那个xxx.js而不是打开，我们需要在那个文件的首行配置  #! /usr/bin/env node
   ```

- 扩展

  ·删除node_modules 包的命令           <font color="#f00">rm -rf node_modules </font>

- npm版本号说明
  - ^2.3.0                 固定第一个版本号2，其他的只能往高的涨
  - ~2.3.0                固定两个版本号2和3，其他的只能往高的涨
  - '>=2.3.0'            比2.3版本高就行，其他的没限制

#### 7.node中的编码（只支持utf8）

​	一个汉字通常由3个字节组成，一个字节通常由8个位(二进制)组成

#### 8.base64编码规范

​	略~~~

### 九、文件的可读流与可写流

###  十、链表

  1. 介绍

     链表一种线性的数据结构，通过指针将一个个零散的内存块连接起来，链表的每个内存块称为结点。

### 十一、OSI七层模型（open System Interconnection）

#### 1.概念

> OSI七层模型，是理想化的模型。将复杂的流程分解成几个功能实现复杂问题的简单化。

​        	7.<font color="#f00">应用层</font>(用户最终的接口)、微信、QQ、HTTP\DNS\FTPSMTP\DHCP

​			6.<font color="#f00">表示层</font>(数据的表示、安全、压缩)

​			5.<font color="#f00">会话层</font>(建立和管理会话)

​			4.<font color="#f00">传输层</font>(TCP、UDP协议)

​			3.<font color="#f00">网络层</font>（路由器）

​			2.<font color="#f00">数据链路层</font>（交换机、网卡）

​			1.<font color="#f00">物理层</font>(物理设备、网线、光纤)

> 七层模型倒着看的，下层是为了上层服务的。可以简单记忆为<font color="#08e">物数网传会表应</font>

### 十二、TCP/IP参考模型（五层模型）

### 十三、koa的实现

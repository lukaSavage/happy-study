// const Promise = require('./10promise的race、allSettled方法实现');

// let p = new Promise((resolve, reject) => {

//     // 一、基本架构问题有四：
//     /**
//      * 1.抛错如何处理(try catch解决)
//      * 2.resolve、reject多次调用，只生效第一次(用if大法)
//      * 3.如何处理异步      // 将成功和失败回调存起来，触发的时候再遍历调用
//      * 4.如何处理多个then   // 同上
//      *
//      */
//     // 二、链式调用
//     /**
//      * 1.要链式调用必须返回一个全新的promise，而不是this(如果是this无效，因为不是pengding状态)
//      * 2.onFulfilled或者onRejected回调的返回值x的问题
//      * 3.抛错处理和填入resolvePromise里面的promise2异步处理
//      * 4.判断resolvePromise函数返回的状态值
//      */
//     // 三、链式调用处理resolvePromise函数
//     /**
//      *
//      * 1.如果x===promise2，说明循环调用(不合法，返回reject状态，抛出一个typeError错误)
//      *
//      *
//      *
//      */
//     setTimeout(() => {
//         resolve(1111);
//         reject(22222);
//     }, 2000);
// })

// p.then((value) => {
//     console.log(value);
// }, (reason) => {
//     console.log(reason);
// })
// p.then((value) => {
//     console.log('第二次', value);
// }, (reason) => {
//     console.log('第二次', reason);
// })

// console.log(Promise);

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 500, 'one');
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 100, 'two');
// });

// Promise.race([promise1, promise2]).then((value) => {
//     console.log(value);
//     // Both resolve, but promise2 is faster
// });

// const pErr = new Promise((resolve, reject) => {
//     reject("总是失败");
// });

// const pSlow = new Promise((resolve, reject) => {
//     setTimeout(resolve, 5000, "最终完成");
// });

// const pFast = new Promise((resolve, reject) => {
//     setTimeout(resolve, 1000, "很快完成");
// });

// Promise.allSettled([pErr, pSlow, pFast]).then((value) => {
//     console.log(value);
//     // pFast fulfils first
// }).catch(err => {
//     console.log('err', err);
// })

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(x, promise2, resolve, reject) {
    if (x === promise2) return reject(new TypeError('循环引用'))
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called = false
        try {
            const then = x.then
            if (typeof then === 'function') {
                then.call(
                    x,
                    (y) => {
                        if (called) return
                        called = true
                        resolvePromise(y, promise2, resolve, reject)
                    },
                    (r) => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        // 说明是一个值类型
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.fulfilledCallbacks = []
        this.rejectedCallbacks = []
        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
                this.fulfilledCallbacks.forEach((fn) => fn())
            }
        }
        const reject = (reason) => {
            if ((this.state = PENDING)) {
                this.state = REJECTED
                this.reason = reason
                this.rejectedCallbacks.forEach((fn) => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (e) => {
                      throw e
                  }

        let promise2 = new Promise((resolve, reject) => {
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.state === PENDING) {
                this.fulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.rejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })
        return promise2
    }
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
        console.log(22222)
    }, 1111)
})

p.then((res) => {
    console.log(111111)
})

Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise

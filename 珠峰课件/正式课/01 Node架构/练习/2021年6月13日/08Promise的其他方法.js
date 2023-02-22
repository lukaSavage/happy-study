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
        // onFulfilled、onRejected是可选的
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
    catch (onError) {
        return this.then(null, onError);
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }


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
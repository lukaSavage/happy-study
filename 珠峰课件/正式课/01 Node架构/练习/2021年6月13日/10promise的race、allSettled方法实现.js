/* 1.定义promise的三个状态 */
const PENDING = 'PENDING' // 默认等待态
const FULFILLED = 'FULFILLED' // 成功态
const REJECTED = 'REJECTED' // 失败态

function resolvePromise(x, promise2, resolve, reject) {
  if (x === promise2) {
    // 1.先判断是否循环引用
    return reject(new TypeError('循环引用'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x == 'function') {
    // 2.继续判断x是不是一个promise
    // 才有可能是一个promise，继续判断x是否有then
    let called = false
    try {
      let then = x.then
      if (typeof then == 'function') {
        // 说明是promise
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(y, promise2, resolve, reject) // 可能这个y还是一个promise，需要递归判断
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        // {then: xxx},当做普通值
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    // x是普通值
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING // promise的默认装填为pending状态
    this.value = undefined // 必须把value和reason保存起来，以供then方法使用
    this.reason = undefined

    // 用来存放成功和失败的回调
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    // 用户调用resolve或者reject的时候，改变status状态并把响应的值赋值
    const resolve = value => {
      // 这里是为了判断value是一个promise的情况(实现Promise.resolve方法时加的)
      if (value instanceof Promise) {
        // 这个方法并不属于 规范中的，只是为了和原生的promise表现形式一样
        return value.then(resolve, reject) // === resolvePromise
      }
      if (this.status === PENDING) {
        // 这里防止用户多次调用resolve或者reject
        this.value = value // 当一调用resolve时候，将value赋值过去
        this.status = FULFILLED // 调用后立马改变状态
        this.onFulfilledCallbacks.forEach(item => item())
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        // 这里防止用户多次调用resolve或者reject
        this.reason = reason // 当一调用reject时候，将value赋值过去
        this.status = REJECTED // 调用后立马改变状态
        this.onRejectedCallbacks.forEach(item => item())
      }
    }

    // 如果报错，将状态变成REJECTED状态
    try {
      executor(resolve, reject) // executor上来会先执行一下,接收resolve、reject两个方法
    } catch (error) {
      reject(error)
    }
  }

  // 给实例对象上添加一个静态方法,then方法接收两个函数作为参数，onFulfilled、onRejected-
  then(onFulfilled, onRejected) {
    // onFulfilled、onRejected是可选的
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e
          }

    // ★每次调用then方法，都要返回一个全新的then(需要用到递归)
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }
      // 如果是pending状态，则把相应的回调存起来，延迟调用
      if (this.status === PENDING) {
        // 发布-订阅模式
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(x, promise2, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
  /* catch方法的实现 */
  catch(onError) {
    return this.then(null, onError)
  }
  finally(cb) {
    return this.then(
      y => {
        return Promise.resolve(cb()).then(() => y)
      },
      r => {
        return Promise.resolve(cb()).then(() => {
          throw r
        })
      }
    )
  }

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
  static all(promises) {
    // promises代表传入的数组
    return new Promise((resolve, reject) => {
      let result = [] // 定义一个变量用来盛放结果
      let index = 0

      function process(data, key) {
        result[key] = data
        if (++index === promises.length) {
          // 解决多个并发问题只能靠计数
          resolve(result)
        }
      }

      for (let i = 0; i < promises.length; i++) {
        // 1.将数组中的值依次执行
        const item = promises[i] // 2.这里要判断item是不是一个promise
        if (item && typeof item.then === 'function') {
          // 说明是一个promise
          item.then(data => {
            process(data, i)
          }, reject)
        } else {
          process(item, i)
        }
      }
    })
  }

  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      let result = []
      let index = 0

      function process(item, i) {
        result[i] = item
        if (++index === promises.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        const item = promises[i]
        if (item && typeof item.then === 'function') {
          item.then(
            y => {
              const obj = {
                status: 'fulfilled',
                value: y
              }
              process(obj, i)
            },
            r => {
              const obj = {
                status: 'rejected',
                reason: r
              }
              process(obj, i)
            }
          )
        } else {
          const obj = {
            status: 'fulfilled',
            value: item
          }
          process(obj, i)
        }
      }
    })
  }

  /**
   * rece是赛跑机制，要看最先的promise子实例是成功还是失败。
   * @param {*} promises promises数组
   * @returns 
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (const item of promises) {
        Promise.resolve(item).then(resolve, reject);
      }
    })
  }
  /**
   * any方法是有一个子实例成功就算成功，全部子实例失败才算失败。
   * @param {*} promises promises数组
   * @returns 
   */
  static any(promises) {
    return new Promise((resolve, reject) => {
      let result = [],
        curr = 0
      function process(x, i) {
        result[i] = x
        if (++curr === promises) {
          reject(result)
        }
      }
      for (const item of promises) {
        if (item && typeof item.then === 'function') {
          item.then(resolve, r => {
            process(r, i)
          })
        } else {
          // 说明是一个值类型
          resolve(item)
        }
      }
    })
  }
}
Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise

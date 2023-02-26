/*
 * @Descripttion:
 * @Author: lukasavage
 * @Date: 2022-09-14 22:45:45
 * @LastEditors: lukasavage
 * @LastEditTime: 2023-01-08 16:31:47
 * @FilePath: \happy-study\珠峰课件\正式课\01 Node架构\练习\2021年6月13日\草稿.js
 */

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

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise(x, promise2, resolve, reject) {
  if (x === promise2) return reject(new TypeError('循环引用'))
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false
    try {
      let then = x.then
      if (typeof then === 'function') {
        // 说明x确实是一个promise
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(y, promise2, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } else {
        resolve(x) // { then: xxx }
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
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbakcs = []

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if ((this.status = PENDING)) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbakcs.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : r => {
            throw r
          }
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === PENDING) {
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
        this.onRejectedCallbakcs.push(() => {
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

  static all(promises) {
    return new Promise((resolve, reject) => {
      let temp = [],
        curr = 0
      function process(item, i) {
        temp[i] = item
        if (++curr === promises.length) {
          resolve(temp)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        const current = promises[i]
        if (current && typeof current.then === 'function') {
          current.then(y => {
            process(y, i)
          }, reject)
        } else {
          process(current, i)
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

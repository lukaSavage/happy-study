const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

function resolvePromise(x, promise2, resolve, reject) {
  if (x === promise2) return reject(new TypeError('循环引用'));
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 说明x确实是一个promise
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(y, promise2, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x); // { then: xxx }
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 说明是一个值类型
    resolve(x);
  }
}
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(item => item());
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(item => item());
      }
    }
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => {
      throw e;
    };
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(x, promise2, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    })
    return promise2;
  }
  catch(failCallback) {
    return this.then(null, failCallback);
  };
  finally(cb) {
    return this.then(y => {
      return Promise.resolve(cb()).then(() => y);
    }, r => {
      return Promise.resolve(cb()).then(() => {
        throw r
      })
    })
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  };
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      function process(item, i) {
        let temp = [],
          index = 0;
        temp[i] = item;
        if (++index === temp.length) {
          resolve();
        }
      }

      for (let i = 0; i < promises.length; i++) {
        const item = promises[i];
        if (item && typeof item === 'function') {
          item.then(y => {
            process(y, i);
          }, reject);

        } else {
          process(item, i);
        }

      }
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



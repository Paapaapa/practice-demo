const PENDING = 'PENDING';// 进行中
const FULFILLED = 'FULFILLED';// 已成功
const REJECTED = 'REJECTED';// 已失败

class MyPromise {
  constructor(exector) {
    // 初始状态为 进行中
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;
    // 成功回调任务队列
    this.onFulfilledCallbacks = [];
    // 失败回调任务队列
    this.onRejectedCallbacks = [];

    const resolve = value => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    };

    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason));
      }
    };

    // 立即执行exector
    // 把内部的resolve和reject传入executor，用户可调用resolve和reject
    try {
      exector(resolve, reject);
    } catch (e) {
      // executor执行出错，将错误内容reject抛出去
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected :
      reason => { throw new Error(reason instanceof Error ? reason.message : reason) }

    const _self = this;

    return new MyPromise((resolve, reject) => {
      if (_self.status === PENDING) {
        _self.onFulfilledCallbacks.push(() => {
          // 模拟微任务
          setTimeout(() => {
            try {
              const result = onFulfilled(_self.value);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
            } catch (err) {
              reject(err);
            }
          });
        });
        _self.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const result = onRejected(_self.reason);
              result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
            } catch (err) {
              reject(err);
            }
          });
        });
      } else if (_self.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFulfilled(_self.value);
            result instanceof MyPromise ? result.then(resolve, reject) : resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      } else if (_self.status === REJECTED) {
        setTimeout(() => {
          try {
            const result = onRejected(_self.reason);
            result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
          } catch (err) {
            reject(err);
          }
        });
      }
    });
    // then是微任务，使用setTimeout模拟
    // setTimeout(() => {
    //   if (this.status === PENDING) {
    //     // 状态是PENDING下执行
    //     // 说明promise内部有异步代码执行，
    //     // 还未改变状态，添加到成功/失败回调任务队列即可
    //     this.onFulfilledCallbacks.push(onFulfilled);
    //     this.onRejectedCallbacks.push(onRejected);
    //   }
    //   if (this.status === FULFILLED) {
    //     onFulfilled(this.value);
    //   } else if (this.status === REJECTED) {
    //     onRejected(this.reason);
    //   }
    // });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    // 暂不考虑value是thenable对象
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolve, reject) => resolve(value));
    }
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promiseArr) {
    const len = promiseArr.length;
    const values = [];
    // 记录已经成功执行的promise个数
    let count = 0;

    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        // Promise.resolve()处理，确保每一个都是promise实例
        MyPromise.resolve(promiseArr[i]).then(val => {
          values[i] = val;
          count++;

          // 如果全部执行完，返回promise的状态就可以改变了
          count === len && resolve(values);
        }, err => reject(err));
      }
    });
  }

  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach(promise => {
        MyPromise.resolve(promise).then(val => resolve(val), err => reject(err));
      });
    });
  }
}
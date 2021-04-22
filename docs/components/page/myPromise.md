## promise 核心逻辑

1. Promise 就是一个类，在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
2. Promise 中有三种状态 分别为 fulfilled 失败 rejected 等待 pending
    pending --> fulfilled
    pending --> rejected
3. resolve 和 reject 函数是用来更改状态的
   resolve：fulfilled
    reject： rejected
4. then 方法内部做的事情就判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败的回调函数
  then方法是被定义的原型对象上的方法
5. then 成功回掉有一个参数 表示成功之后的值 then 失败回调有一个参数 表示失败后原因

```js
  const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'reject'; // 失败

class MyPromise {
  // new promise 时候传递了一个函数，这个函数就是执行器
  constructor (executor) {
    executor(this.resolve, this.reject)  // 执行器立即执行
  }
  // promise 状态
  status = PENDING;
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined
  resolve = value => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
  }
  reject = reason => {
    // 如果状态不是等待 组织程序向下执行
    if (this.status !== PENDING) return;
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
  }
  then (successCallback, failCallback) {
    // 判断状态
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      failCallback(this.reason)
    }
  }
}

module.exports = MyPromise
```
一个简易版的promise就成功了，我们来验证一下
```js
  const MyPromise = require('./myPromise')
 
  let promise = new MyPromise((resolve, reject) => {
    resolve('成功')
    // reject('失败')
  })

  promise.then(value => {
    console.log(value)
  }, reason => {
    console.log(reason)
  })

```
  切换到命令行中，运行上面js，控制台成功输出 成功 或者 失败

## 加入异步逻辑
  上面的代码只是核心逻辑，还没有异步逻辑，下面我们给它添加一下异步逻辑
  + 在then方法中添加对PENDING的判断，将成功回调函数或者失败回调函数，存储起来，
  + 然后在resolve或者reject中判断成功回调函数或者失败回调函数中是否存在，存在就调用

  ```js
    const PENDING = 'pending'; // 等待
    const FULFILLED = 'fulfilled'; // 成功
    const REJECTED = 'reject'; // 失败

    class MyPromise {
      // new promise 时候传递了一个函数，这个函数就是执行器
      constructor (executor) {
        executor(this.resolve, this.reject)  // 执行器立即执行
      }
      // promise 状态
      status = PENDING;
      // 成功之后的值
      value = undefined
      // 失败之后的原因
      reason = undefined
      // 成功回调
      successCallback = undefined
      // 失败回调
      failCallback = undefined

      resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在 如果存在 调用
        this.successCallback && this.successCallback(this.value)
      }
      reject = reason => {
        // 如果状态不是等待 组织程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reason = reason
        // 判断失败回调是否存在 如果存在 调用
        this.failCallback && this.failCallback(this.reason)
      }
      then (successCallback, failCallback) {
        // 判断状态
        if (this.status === FULFILLED) {
          successCallback(this.value)
        } else if (this.status === REJECTED) {
          failCallback(this.reason)
        } else {
          // 等待
          // 将成功回调和失败回调存储起来
          this.successCallback = successCallback
          this.failCallback = failCallback

        }
      }
    }

  ```

## then 多次调用
  同一个promise下的then方法是可以被多次调用的，将successCallBack换成数组，每次的then方法存储在数组中
  采用while 循环，只要successCallback 中存有回调函数，就去调用，调用完以后并从数组中删除这个函数

  ```js
     // 成功回调
    successCallback = []
    // 失败回调
    failCallback = []
    resolve = value => {
      if (this.status !== PENDING) return;
      ...
      while(this.successCallback.length) {
        this.successCallback.shift()(this.value)
      }
    }
    reject = reason => {
      ...
      while(this.failCallback.length) this.failCallback.shift()(this.reason)
    }
    then (successCallback, failCallback) {
      // 判断状态
      if (this.status === FULFILLED) {
        successCallback(this.value)
      } else if (this.status === REJECTED) {
        failCallback(this.reason)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)

      }
    }
  ```
## 链式调用
  then方法是可以被链式调用的，后面then方法的回调函数拿到的值是上一个then方法的回调函数的返回值
  then方法是promise对象下的，如果要实现链式调用，那么每一个then方法都应该返回promise对象。
  ```js
  then (successCallback, failCallback) {
    // 立即执行，将then里的代码放入到 执行器里面
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        let x = successCallback(this.value)
        // 将x传递给下一个promise
        resolve(x)
      } else if (this.status === REJECTED) {
        failCallback(this.reason)
      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })
  ```

  then方法不仅可以返回一个普通值，也可以返回一个promise对象，所以这里要做判断
  ```js
     then (successCallback, failCallback) {
      // 立即执行，将then里的代码放入到 执行器里面
      let promise2 = new MyPromise((resolve, reject) => {
        // 判断状态
        if (this.status === FULFILLED) {
          let x = successCallback(this.value)
          // 将x传递给下一个promise
          // 判断 x 的值是普通值还是promise对象
          // 如果是普通值 直接调用resolve
          // 如果是promise对象 查看promise对象返回的结果
          // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
          // resolve(x)
          resolvePromise(x, resolve, reject)
        } else if (this.status === REJECTED) {
          failCallback(this.reason)
        } else {
          // 等待
          // 将成功回调和失败回调存储起来
          this.successCallback.push(successCallback)
          this.failCallback.push(failCallback)
        }
      })
      ...
      ...
    function resolvePromise (x, resolve, reject) {
      if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value), reason => reject(reason)
        x.then(resolve, reject)
      } else {
        // 普通值
        resolve(x)
      }
    }
  ```

## then 方法链式调用识别 Promise 对象自己返回

  当promise返回自身的时候，会报错 例如：
  ```js
    var promise = new Promise(function (resolve, reject) {
      resolve(100)
    });

    var p1 = promise.then(function (value) {
      console.log(value)
      return p1; 
    })

    p1.then(function () {}, function(err) {
      console.log(err)
    })
  ```
  promise是不允许返回自身的，这个时候会报错

  > TypeError: Chaining cycle detected for promise 

  那我们在自己写promise时，怎么处理呢：
  在函数resolve执行时，做一次判断，返回值等于自身的时候抛出错误 
  ```js
    const PENDING = 'pending'; // 等待
    const FULFILLED = 'fulfilled'; // 成功
    const REJECTED = 'reject'; // 失败

    class MyPromise {
      // new promise 时候传递了一个函数，这个函数就是执行器
      constructor (executor) {
        executor(this.resolve, this.reject)  // 执行器立即执行
      }
      // promise 状态
      status = PENDING;
      // 成功之后的值
      value = undefined
      // 失败之后的原因
      reason = undefined
      // 成功回调
      successCallback = []
      // 失败回调
      failCallback = []

      resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在 如果存在 调用
        while(this.successCallback.length) {
          this.successCallback.shift()(this.value)
        }
      }
      reject = reason => {
        // 如果状态不是等待 组织程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reason = reason
        // 判断失败回调是否存在 如果存在 调用
        while(this.failCallback.length) this.failCallback.shift()(this.reason)
      }
      then (successCallback, failCallback) {
        // 立即执行，将then里的代码放入到 执行器里面
        let promise2 = new MyPromise((resolve, reject) => {
          // 判断状态
          if (this.status === FULFILLED) {
            // 将方法放入settimeout中将同步代码编程异步代码，否则会拿不到promise2
            setTimeout(() => {
              let x = successCallback(this.value)
              // 将x传递给下一个promise
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve
              // 如果是promise对象 查看promise对象返回的结果
              // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
              // resolve(x)
              resolvePromise(promise2, x, resolve, reject)
            }, 0);
          } else if (this.status === REJECTED) {
            failCallback(this.reason)
          } else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallback.push(successCallback)
            this.failCallback.push(failCallback)
          }
        })
        return promise2;
      }
    }

    function resolvePromise (promise2, x, resolve, reject) {
      // 判断是不是自身 如果是自身 抛出错误 阻止程序往下执行
      if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 判断x是否是promise对象
      if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value), reason => reject(reason)
        x.then(resolve, reject)
      } else {
        // 普通值
        resolve(x)
      }
    }

    module.exports = MyPromise
  ```
## 捕获错误 处理错误

  1. 执行器错误处理
    添加try catch来处理执行器错误
  ```js
    // executor(this.resolve, this.reject)
    try {
      executor(this.resolve, this.reject)  // 执行器立即执行
    } catch (e) {
      this.reject(e)
    }
  ```

  我们测试一下
  ```js
    let promise = new MyPromise((resolve, reject) => {
      throw new Error(' executor error')
      resolve('成功')
    })

    promise.then(value => {
      console.log(value)
    },reason => {
      console.log(reason)
    })

  ```
  这个时候控制台 就会抛出错误 'excutor error'
  2. then 回调函数的错误处理
  在then方法中对successCallback做错误处理
  ```js
    setTimeout(() => {
      let x = successCallback(this.value)
      try  {
        // 将x传递给下一个promise
        // 判断 x 的值是普通值还是promise对象
        // 如果是普通值 直接调用resolve
        // 如果是promise对象 查看promise对象返回的结果
        // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
        // resolve(x)
        resolvePromise(promise2, x, resolve, reject)
      } catch (e) {
        reject(e)
      }
      
    }, 0);
  ```

  同时需要对 PENDING 状态做处理,在添加数组的时候，不要push 方法，改成push箭头函数，在箭头函数里对resolve和reject进行错误处理，整理后代码如下：
  ```js
    const PENDING = 'pending'; // 等待
    const FULFILLED = 'fulfilled'; // 成功
    const REJECTED = 'reject'; // 失败

    class MyPromise {
      // new promise 时候传递了一个函数，这个函数就是执行器
      constructor (executor) {
        try {
          executor(this.resolve, this.reject)  // 执行器立即执行
        } catch (e) {
          this.reject(e)
        }
      }
      // promise 状态
      status = PENDING;
      // 成功之后的值
      value = undefined
      // 失败之后的原因
      reason = undefined
      // 成功回调
      successCallback = []
      // 失败回调
      failCallback = []

      resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在 如果存在 调用
        while(this.successCallback.length) {
          this.successCallback.shift()()
        }
      }
      reject = reason => {
        // 如果状态不是等待 组织程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reason = reason
        // 判断失败回调是否存在 如果存在 调用
        while(this.failCallback.length) this.failCallback.shift()()
      }
      then (successCallback, failCallback) {
        // 立即执行，将then里的代码放入到 执行器里面
        let promise2 = new MyPromise((resolve, reject) => {
          // 判断状态
          if (this.status === FULFILLED) {
            // 将方法放入settimeout中将同步代码编程异步代码，否则会拿不到promise2
            setTimeout(() => {
              try {
                let x = successCallback(this.value)
                // 将x传递给下一个promise
                // 判断 x 的值是普通值还是promise对象
                // 如果是普通值 直接调用resolve
                // 如果是promise对象 查看promise对象返回的结果
                // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                // resolve(x)
                resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            }, 0);
          } else if (this.status === REJECTED) {
            setTimeout(() => {
              try {
                let x = failCallback(this.reason)
                // 将x传递给下一个promise
                // 判断 x 的值是普通值还是promise对象
                // 如果是普通值 直接调用resolve
                // 如果是promise对象 查看promise对象返回的结果
                // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                // resolve(x)
                resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            }, 0);
          } else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallback.push(() => {
              setTimeout(() => {
                try {
                  let x = successCallback(this.value)
                  // 将x传递给下一个promise
                  // 判断 x 的值是普通值还是promise对象
                  // 如果是普通值 直接调用resolve
                  // 如果是promise对象 查看promise对象返回的结果
                  // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                  // resolve(x)
                  resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                  reject(e)
                }
              }, 0);
            })
            this.failCallback.push(() => {
              setTimeout(() => {
                try {
                  let x = failCallback(this.reason)
                  // 将x传递给下一个promise
                  // 判断 x 的值是普通值还是promise对象
                  // 如果是普通值 直接调用resolve
                  // 如果是promise对象 查看promise对象返回的结果
                  // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                  // resolve(x)
                  resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                  reject(e)
                }
              }, 0);
            })
          }
        })
        return promise2;
      }
    }

    function resolvePromise (promise2, x, resolve, reject) {
      // 判断是不是自身 如果是自身 抛出错误 阻止程序往下执行
      if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 判断x是否是promise对象
      if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value), reason => reject(reason)
        x.then(resolve, reject)
      } else {
        // 普通值
        resolve(x)
      }
    }

    module.exports = MyPromise
  ```
这个时候mypromise的核心功能都已经实现了
## then 方法的参数变成可选参数
当有参数时，直接用，没有时 直接添加value => value 这样一个方法，传递给下一层
 ```js
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => {throw reason}
 ```

## promise.all 方法的实现
+ promise.all 方法介绍
```js
    function p1 () {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('p1')
        }, 2000);
      })
    }
    function p2 () {
      return new Promise(function (resolve, reject) {
        resolve('p2')
      })
    }
    Promise.all(['a', 'b', p1(), p2(), 'c']).then(function(result) {
      console.log(result)
      // ['a', 'b', 'p1', 'p2', 'c']
    })
    // promise 会按数组的顺序依次打印出结果
```
+ 实现all方法 

```js
  // all 方法为静态方法
  static all (array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index ++
        // 等所有for方法 结束之后再去resolve 结束
        if (index === array.length) {
          resolve(result)
        }
      }
      // 循环进来的数组
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // promise对象 如果是promise 先去执行promise对象
          // 调用完promise对象后，如果是成功状态，调用addData将成功之后的值添加到result中，如果是失败 直接调用reject
          current.then((value) => addData(i, value), (reason)=> reject(reason))
        } else {
          // 普通值
          addData(i, array[i]) // 普通值放入 result数组中
        }
      }
    })
  }
```

## Promise.resolve()  将给定的值转换为promise对象

```js
  static resolve (value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
```

## finally 方法的实现
  无论promise方法是成功的还是失败的，finally里的方法都会被执行一次
  在finally后的方法后面可以链式调用，拿到当前promise对象

  ```js
    finally (callback) {
      return this.then((value) => {
        return MyPromise.resolve(callback()).then(() => value)
        // callback()
        // return value;
      }, reason => {
        return MyPromise.resolve(callback()).then(() => {throw reason})
        // callback()
        // throw reason;
      })
    }
  ```
## catch 
  在then方法可以不传失败回调，当不传失败回调的时候，错误会被catch捕获到
  ```js
    p1()
      .then(value => console.log(value))
      .then(reason => console.log(reason))
  ```
  成功回调传入undefined即可
  代码实现
  ```js
    catch (failCallback) {
      return this.then(undefined, failCallback)
    }
  ```

  到这里 promise 的所有功能就实现完了，整体的代码如下：
  ```js
    const PENDING = 'pending'; // 等待
    const FULFILLED = 'fulfilled'; // 成功
    const REJECTED = 'reject'; // 失败

    class MyPromise {
      // new promise 时候传递了一个函数，这个函数就是执行器
      constructor (executor) {
        try {
          executor(this.resolve, this.reject)  // 执行器立即执行
        } catch (e) {
          this.reject(e)
        }
      }
      // promise 状态
      status = PENDING;
      // 成功之后的值
      value = undefined
      // 失败之后的原因
      reason = undefined
      // 成功回调
      successCallback = []
      // 失败回调
      failCallback = []

      resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在 如果存在 调用
        while(this.successCallback.length) {
          this.successCallback.shift()()
        }
      }
      reject = reason => {
        // 如果状态不是等待 组织程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED
        // 保存失败后的原因
        this.reason = reason
        // 判断失败回调是否存在 如果存在 调用
        while(this.failCallback.length) this.failCallback.shift()()
      }
      then (successCallback, failCallback) {
        successCallback = successCallback ? successCallback : value => value
        failCallback = failCallback ? failCallback : reason => {throw reason}
        // 立即执行，将then里的代码放入到 执行器里面
        let promise2 = new MyPromise((resolve, reject) => {
          // 判断状态
          if (this.status === FULFILLED) {
            // 将方法放入settimeout中将同步代码编程异步代码，否则会拿不到promise2
            setTimeout(() => {
              try {
                let x = successCallback(this.value)
                // 将x传递给下一个promise
                // 判断 x 的值是普通值还是promise对象
                // 如果是普通值 直接调用resolve
                // 如果是promise对象 查看promise对象返回的结果
                // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                // resolve(x)
                resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            }, 0);
          } else if (this.status === REJECTED) {
            setTimeout(() => {
              try {
                let x = failCallback(this.reason)
                // 将x传递给下一个promise
                // 判断 x 的值是普通值还是promise对象
                // 如果是普通值 直接调用resolve
                // 如果是promise对象 查看promise对象返回的结果
                // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                // resolve(x)
                resolvePromise(promise2, x, resolve, reject)
              } catch (e) {
                reject(e)
              }
            }, 0);
          } else {
            // 等待
            // 将成功回调和失败回调存储起来
            this.successCallback.push(() => {
              setTimeout(() => {
                try {
                  let x = successCallback(this.value)
                  // 将x传递给下一个promise
                  // 判断 x 的值是普通值还是promise对象
                  // 如果是普通值 直接调用resolve
                  // 如果是promise对象 查看promise对象返回的结果
                  // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                  // resolve(x)
                  resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                  reject(e)
                }
              }, 0);
            })
            this.failCallback.push(() => {
              setTimeout(() => {
                try {
                  let x = failCallback(this.reason)
                  // 将x传递给下一个promise
                  // 判断 x 的值是普通值还是promise对象
                  // 如果是普通值 直接调用resolve
                  // 如果是promise对象 查看promise对象返回的结果
                  // 在根据promise对象返回的结果 决定调用resolve 还是调用reject
                  // resolve(x)
                  resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                  reject(e)
                }
              }, 0);
            })
          }
        })
        return promise2;
      }
      finally (callback) {
        return this.then((value) => {
          return MyPromise.resolve(callback()).then(() => value)
          // callback()
          // return value;
        }, reason => {
          return MyPromise.resolve(callback()).then(() => {throw reason})
          // callback()
          // throw reason;
        })
      }
      catch (failCallback) {
        return this.then(undefined, failCallback)
      }
      // all 方法为静态方法
      static all (array) {
        let result = []
        let index = 0
        return new MyPromise((resolve, reject) => {
          function addData (key, value) {
            result[key] = value
            index ++
            if (index === array.length) {
              resolve(result)
            }
          }
          for (let i = 0; i < array.length; i++) {
            let current = array[i];
            if (current instanceof MyPromise) {
              // promise对象
              current.then((value) => addData(i, value), (reason)=> reject(reason))
            } else {
              // 普通值
              addData(i, array[i])
            }
          }
        })
      }

      static resolve (value) {
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
      }
    }

    function resolvePromise (promise2, x, resolve, reject) {
      // 判断是不是自身 如果是自身 抛出错误 阻止程序往下执行
      if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
      }
      // 判断x是否是promise对象
      if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value), reason => reject(reason)
        x.then(resolve, reject)
      } else {
        // 普通值
        resolve(x)
      }
    }

    module.exports = MyPromise
  ```


## JavaScript异步编程

### 内容概要：

+ 同步模式与异步模式

+ 事件循环与消息队列

+ 异步编程的几种方式

+ Promise 异步方案、宏任务/微任务

+ Generator 异步方案、Async/ Await 语法糖

### promise 基本用法

```js

const promise = new Promise((resolve, reject) => {
// 这里用于“兑现承诺”
// resolve(100) // 承诺达成
    reject(new Error('promise rejected')) // 只能调用二者其一
})
// resolve 和 reject 只能调用其一

promise.then(value => {
    console.log(value)     // reslove 调用执行的方法
},error => {
    console.log('rejected error ', error)        // reject 调用执行的方法
})

console.log('end')

```

### promise常见误区 
```js
    ajax('..../xxx')
        .then(function(value) {
            console.log(1111)
            // return new Promise()
            return ajax('.../aaa')  // 这个执行完以后 自动执行下一个then 状态明确过后的回调
        })
        .then(function(value) {
            console.log(2222)
            return 'aaa'
        })
        .then(function(value) {
            console.log(3333)
            console.log(value) // aaa 如果上一个then没有 return 该值为 undefined
        })
        .then(function(value) {
            console.log(4444)
            
        })
        .then(function(value) {
            console.log(5555)
        })
```
> promise 的本质就是使用回调函数的定义异步任务结束后所需要执行的任务
> +每一个then方法为上一个then方法返回的promise添加状态明确的回调  
> then 方法中可以返回一个全新的promise 
> Promise 对象的 then 方法会返回一个全新的 Promise 注册回调

### 异常捕获
+ onreject 方法捕获
    ```js
        ajax('../aaa')
            .then(function onFulfilled(value) {
                console.log('onfulfilled')
            }, function onreject(error) {
                console.log('onreject')
            })
            // 给第一个promise指定的错误回调，只能捕获到上一个promise的错误

    <!-- catch 捕获  -->
        ajax('../aa')
            .then(function onFulfilled(value) {
                console.log('onfulfilled')
            })
            .catch(function onreject(error) {
                console.log('onreject')
            })
            // 之前的第一个promise返回的错误，通过链式传递给它，也就是说catch捕获到的 不一定是上一个then的promise
    ```

### Promise 静态方法
Promise.resolve() 将一个静态值转换为一个promise对象
```javascript
    Promise.resolve('foo') // 返回一个返回值为 foo 的promise对象

    Promise.resolve('foo')
        .then(function (value) {
            console.log(value)   //  foo 
        })

    new Promise(function (reslove, reject) {
        resolve('foo')
    })

    // 二者等价

    // 如果传入的是一个 Promise 对象， Promise.resolve 方法原样返回

    var promise = ajax('api/user.json')
    var promise2 = Promise.resolve(promise)

    console.log(promise === promise2)  // true

```

+ 如果传入的是带有一个跟 Promise 一样的 then 方法的对象,Promise.resolve会将这个对象作为 Promise 执行
  ```javascript
      Promise.resolve({
          then: function (onFullfilled, onRejected) {
              onFullfilled('foo')
          }
      })
      .then(function (value) {
          console.log(value)
      })
  ```

+ Promise.reject 传入任何值，都会作为这个 Promise 失败的理由
  ```javascript
  Promise.reject(new Error('rejected'))
    .catch(function (error) {
        console.log(error)
    })
  ```

### promise 并行执行
```javascript
    var promise = Promise.all([
        ajax('api/users.json'),
        ajax('api/users.json')
    ])
    promise.then(function(value) {
        console.log(value)  // value 是一个数组，数组中包含每个promise执行的结果 
    }).catch(function(error) {
        console.log(error)
    })

    ajax('/api/urls.json')
      .then(value => {
        const urls = Object.values(value)
        const tasks = urls.map(url => ajax(url))
        return Promise.all(tasks)
      })
      .then(values => {
        console.log(values)
      })



```
###   Promise.race 实现超时控制 以第一个异步结束为准
```javascript
    Promise.race([
    request,
    timeout
    ])
    .then(value => {
    console.log(value)
    })
    .catch(error => {
    console.log(error)
    })
```
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
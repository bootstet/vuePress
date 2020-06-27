#### 1 谈谈你是如何理解JS异步编程的？Eventloop，消息队列都是做什么的？什么是宏任务，什么是微任务？

答：js是单线程语言，在某个特性的时刻只有特定的代码能够被执行，并阻塞其他的代码，所以一些比较耗时的js执行代码会严重影响体验，这个时候就需要异步执行，所以js的代码执行就分两种模式，同步模式和异步模式。
+ 因为回调函数的地狱回调问题，异步模式从一开始的回调函数，发布订阅，到es5的promise、async也一直也在发展中
+ eventloop和消息队列： js中所有的同步任务都在主线程上执行，即在执行栈（call stack）上执行，执行栈外有一个消息队列，当所有执行栈上的任务执行完以后就会按顺序去执行消息队列中的方法。
+ 宏任务和微任务：当主线程的一些方法在从上往下执行的时候，碰到一些事件驱动型的方法，并不会立即执行，而是会把这些方法放到消息队列中，比如setTimeout,setIntercal,和一些dom操作元素上的事件。这些事件有些是宏任务，有些是微任务，会优先执行宏任务，在执行微任务。常见的宏任务如 宏任务和微任务：当主线程的一些方法在从上往下执行的时候，碰到一些事件驱动型的方法，并不会立即执行，而是会把这些方法放到消息队列中，比如setTimeout，setIntercal。
+ 等待执行栈上的函数执行完以后，就回去消息对列中把所有的任务都拿出来在一次执行。
### 代码题
#### 1  将下面异步代码使用Promise的方式改进
```js
setTimeout(function () {
  var a = 'hello '
  setTimeout(function () {
    var b = 'lagou'
    setTimeout(function () {
      var c = 'i love you'
      console.log(a + b + c)
    }, 10)
  }, 10)
}, 10)
```
答案：
```js
  var promise  = new Promise((resolve, reject) => {
  setTimeout(() => {
    var a = 'hello '
    resolve(a)
  }, 10)
})

promise.then(value => {
  // 这里b有是一个异步函数，所以需要在把异步之后的函数传给下一个then
  // 所以需要,在弄一个promise方法，通过resolve方法传递给下一个
  return new Promise(reslove => {
    setTimeout(() => {
      var b = 'lagou '
      reslove(value + b)
    }, 10)
  })

}).then(value => {
  setTimeout(() => {
    var c = 'i love you'
    console.log(value + c)
  }, 10)
})
```

#### 2 基于以下代码完成下面4个联系
```js
  const cars = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
]
```
 + 练习1 使用函数组合fp.flowRight()重新实现下面这个函数
    ```js
      let inLastInStock = function (cars) {
        // 获取最后一条数据
        let last_car = fp.last(cars)
        console.log(last_car)
        // 获取最后一条数据的 in_stock 属性值
        return fp.prop('in_stock', last_car)
      }
    // => 答案
    let inLastInStock1 = fp.flowRight(fp.prop('in_stock'), fp.last) 
    // flowRight 从右往左执行， 有参数传参数，没参数不传写方法体即可，要返回这个方法，而不是方法执行后的结构

    console.log(inLastInStock1(cars))
    ```
  +  练习2 使用fp.flowRight()、 fp.prop()、fp.first()、获取第一个car的name
  ```js
  let getFirstCarName = fp.flowRight(fp.prop('name'), fp.first)
  console.log(getFirstCarName(cars))
  ```
  + 练习3 使用帮助函数 _average 重构 averageDollarValue, 使用函数组合的方式实现
  ```js
    let _average = function (xs) {
      return fp.reduce(fp.add, 0, xs) / xs.length
    } // 无需改动

    let averageDollarValue = function (cars) {
      let dollar_values = fp.map(function(cars) {
        return cars.dollar_value
      }, cars)
      return _average(dollar_values)
    }
    console.log(averageDollarValue(cars))
    // 答案 =>
    // 过滤所有的dollar_vlaue 组成一个新的数组
    const filterName = arr => fp.map(cars => cars.dollar_value, arr)
    // 使用组合函数
    let averageDollarValue1 = fp.flowRight(_average, filterName)
    console.log(averageDollarValue1(cars))
  ```
  + 练习4 使用flowRight写一个sanitizeNames()函数，返回一个下划线
    链接的小写字符串，把数组中的name转换为这种形式：例如：
    sanitizeNames(['Hello World']) => ['hello_world']
  ```js
    let _underscore = fp.replace(/\W+/g, '_') // <-- 无须改动

    let strTrans = fp.flowRight(_.toLower, _underscore)

    let sanitizeNames = fp.flowRight( fp.map(item => strTrans(item.name)))
    console.log((sanitizeNames(cars)))
  ```

#### 3 基于下面提供的代码完成下列4个练习
```js
  // support.js
class Container {
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  map (fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (x) {
    return new Maybe(x)
  }
  isNothing () {
    return this._value === null || this._value === undefined
  }
  constructor (x) {
    this._value = x
  }
  map (fn) {
    return this.isNothing ? this : Maybe.of(fn(this._value))
  }
}

module.exports = {
  Maybe,
  Container
}
```
+ 练习1： 使用fp.add(x, y) 和 fp.map(f, x) 创建一个能让function 里的值增加的函数ex1
  ```js
    const fp = require('lodash/fp')
    const { Maybe, Container } = require('./app.js')

    let maybe = Maybe.of([5, 6, 1])
    let ex1 = num => {
      return fp.map(e => fp.add(e, num) , maybe._value)
    }
    console.log(ex1(1))
  ```
+ 练习2 实现一个函数ex2，能够使用fp.first获取列表的第一个元素
  ```js 
    let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
    let ex2 = () => {
      return fp.first(xs._value)
    }
  console.log(ex2())
  ```
+ 练习3 实现一个函数ex3, 能够使用safeProp 和 fp.first 找到user的名字的首字母
  ```js
    let safeProp = fp.curry(function(x, o) {
      return Maybe.of(o[x])
    })

    let user = { id: 2, name: 'Albert'}
    let ex3 = () => {
      // 获取user中的name
      const f = safeProp('name', user)
      // 获取name中的首字母
      return fp.first(f._value)
    }
    console.log(ex3())
  ```
+ 练习4 使用Maybe 重写ex4 ，不要用if语句
  ```js
    let ext = function (n) {
      if (n) {
        return parseInt(n)
      }
    }
    // 答：

    let ext1 = function (n) {
      let r = Maybe.of(n)
                .map( n => parseInt(n) )
      return r._value
    }
    console.log(ext(2))
    console.log(ext1(2))
  ```

#### 手写promise源码
  ```js
    const PENDING = 'pending';
    const FULFILLED = 'fufilled';
    const REJECTED = 'rejected';

    class myPromise {
      constructor (executor) {
        try {
          executor(this.resolve, this.reject)
        } catch (e) {
          this.reject(e)
        }
      }
      // promise 状态
      status = PENDING;
      // 成功之后的值
      value = undefined;
      // 失败之后的原因
      reason = undefined;
      // 成功之后的回调
      successCallback = []
      failCallback = []
      resolve = value => {
        // 如果状态不是等待，组织往下进行
        if(this.status !== PENDING) return 
        // 将状态改为成功
        this.status = FULFILLED
        // 保存成功之后的值
        this.value = value
        // 判断成功回调是否存在
        // this.successCallback && this.successCallback(this.value)
        while(this.successCallback.length) this.successCallback.shift()()
      }
      reject = reason => {
        // 如果状态不是等待，组织往下进行
        if(this.status !== PENDING) return 
        // 将状态改为失败 
        this.status = REJECTED
        // 保存失败的原因
        this.reason = reason
        // 判断失败回调是否存在 如果存在 调用
        // this.failCallback && this.failCallback(this.values)
        while(this.failCallback.length) this.failCallback.shift()()
      }
      then (successCallback, failCallback) {
        let promise2  = new myPromise((resolve, reject) => {
          // 判断状态
          if (this.status === FULFILLED) {
            setTimeout(() => {
              try {
                let x = successCallback(this.value)
                // 判断 x 的值是普通值还是promise对象
                // 如果是普通值  直接调用resolve
                // 如果是promise对象  查看promise对象返回的结果
                // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
                // resolve(x); 
                resolvePromise(promise2, x, resolve, reject)
              } catch {
                reject(e)
              }
              
            }, 0);
            
          } else if(this.status === REJECTED) {
            setTimeout(() => {
              try {
                let x = failCallback(this.reason)
                // 判断 x 的值是普通值还是promise对象
                // 如果是普通值  直接调用resolve
                // 如果是promise对象  查看promise对象返回的结果
                // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
                // resolve(x); 
                resolvePromise(promise2, x, resolve, reject)
              } catch {
                reject(e)
              }
              
            }, 0);
            
          } else {
            // 等待状态
            // 将成功状态和失败状态存储下来
            // this.successCallback = successCallback
            // this.failCallback = failCallback

            this.successCallback.push(()=>{
              // successCallback()
              setTimeout(() => {
                try {
                  let x = successCallback(this.value)
                  // 判断 x 的值是普通值还是promise对象
                  // 如果是普通值  直接调用resolve
                  // 如果是promise对象  查看promise对象返回的结果
                  // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
                  // resolve(x); 
                  resolvePromise(promise2, x, resolve, reject)
                } catch {
                  reject(e)
                }
                
              }, 0);
            } )
            this.failCallback.push(() => {
              // failCallback()
              setTimeout(() => {
                try {
                  let x = failCallback(this.reason)

                  console.log(aaa)
                  // 判断 x 的值是普通值还是promise对象
                  // 如果是普通值  直接调用resolve
                  // 如果是promise对象  查看promise对象返回的结果
                  // 在根据promise对象返回呢的结果 决定调用resolve 还是调用reject
                  // resolve(x); 
                  resolvePromise(promise2, x, resolve, reject)
                } catch {
                  reject(e)
                }
                
              }, 0);
            })
          }
        })
        return promise2
      }
    }

    function resolvePromise (promise2, x, resolve, reject) {
      if (promise2 === x) {
        console.log(new TypeError('charereo  dfasd '))
        return  reject(new TypeError('charereo  dfasd '))
        
      }
      if (x instanceof myPromise) {
        // promise
        // x.then((value) => resolve(value), (reason) => reject(reason))
        x.then(resolve, reject)
      } else {
        // 普通值
        resolve(x)
      }
    }

    module.exports = myPromise
  ```
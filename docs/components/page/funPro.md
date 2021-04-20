---
home: false
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
---

## 函数式编程

+ 什么是函数式编程为什么要了解函数式编程

+ 函数式编程的特性（纯函数、柯里化、函数组合等）

+ 函数式编程的应用场景

+ 函数式编程库 Lodash

 

#### 1 什么是函数式编程

    函数式编程是编程范式之一，我们常说的编程范式还有面向过程编程，面向对象编程

+ 面向对象编程的思维方法：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和多态来演示事物的联系

+ 函数式编程的思维方式： 把现实世界的事物和事物之间的联系抽象到程序世界（对运算进行抽象）

    - 程序的本质： 根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数

    -  x => f(联系、映射) => y ,y = f(x)

    -  函数式编程中的函数指的不是程序中的函数，而是数学中的映射关系

    - 相同的输入始终得到相同的输出

    -  函数式编程用来描述数据（函数）之间的映射

#### 2 函数是一等公民

+ 函数可以存储在变量中

+ 函数作为参数

+ 函数作为返回值

在javaScript中**函数就是一个普通的对象**,我们可以把函数存储到变量/数组中，它还可以作为另一个函数的参数和返回值，甚至可以在程序运行的时候通过 new Function（'alert(1)'）来构造一个新的函数。高阶函数、柯里化的基础。

#### 高阶函数

+ 可以把函数作为参数传递给另外一个函数，

```javascript

    // 面向过程的方式

let array = [2,3,4,6]

for(let i = 0;i<array.length; i++){

    console.log(array[i])

}

// 高阶函数

function forEach (array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}

let arr = [1, 3, 5, 6, 8]
// 高阶函数
forEach(arr, function(item) {
    console.log(item)
})

// filter
function filter (array, fn) {
    let results = []
    for(let i = 0; i< array.length; i++) {
        if(fn(array[i])) {
            results.push(array[i])
        }
    }
    return results
}

// let arr = [1, 3, 4, 5,6,7]
let r = filter(arr, function(item) {
    return item % 2 === 0
})
console.log(r) // [4 ,6]

function makeFn () {
    let msg = 'Hello function'
    return function () {
        console.log(msg)
    }
}

const fn = makeFn()
fn()
makeFn()()

```

+ 可以把函数作为另一个函数的返回结果

```javascript

// once
function once (fn) {
    let done = false
    return function () {
        if(!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}

let pay = once(function (money) {
    console.log(`支付了${money} RMB`)
})

pay(5)
pay(5)
pay(5)
pay(5)
//只执行一次
```

#### 3 高阶函数的意义

+ 抽象可以帮我屏蔽细节，只需要关注与我们的目标

+ 高阶函数是用来抽象通用的问题

#### 4 常见的高阶函数

    - forEach

    - map

    - filter

    - every

    - some

    - find/findIndex

    - reduce

    - sort

    -...

模拟常用的高阶函数

```javascript

// 模拟常用高阶函数： map ,every, some

// map
const map = (array, fn) => {
    let results = []
    for (let value of array) {
        results.push(fn(value))
    }
    return results
}

let arr = [1,2,3,4]
arr = map(arr, v => v * v)
console.log(arr) // [ 1, 4, 9, 16 ]

// every
const every = (array, fn) => {
    let results = true
    for (let value of array) {
        results = fn(value)
        if (!results) {
            break
        }
    }
    return results
}

// 测试
let arr = [11, 12, 14]
let r = every(arr, v => v > 10)
console.log(r)

// some
const some = (array, fn) => {
    let results = true
    for (let value of array) {
        results = fn(value)
        if(results) {
            break
        }
    }
    return results
}

// 测试
let arr = [1, 3, 9]
let r = some(arr, v => v % 2 === 0)
console.log(r)

```

#### 5闭包

+ 闭包： 函数和其周围的状态的引用捆绑在一起形成闭包。

    + 可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员
    > 和 makefn 相同作用域中的 fn 调用了 makefn 中的内部函数，访问了makefn函数作用域中的成员，函数中的msg调用完以后不会被释放，因为外部对它有引用 

```javascript
    function makeFn () {
        let msg = 'Hello function'
        return function () {
            console.log(msg)
        }
    }
    const fn = makeFn()
    fn()

```

```javascript

// once done变量在被调用以后，不会被释放，所以再次调用时可以用作来判断函数要不要在执行 
function once (fn) {
    let done = false
    return function () {
        if(!done) {
            done = true
            return fn.apply(this, arguments)
        }
    }
}

let pay = once(function (money) {
    console.log(`支付了${money} RMB`)
})

pay(5)
pay(5)
```

+ 闭包的本质： 函数在执行的时候会放到一直执行栈上当函数执行完毕之后会从执行栈上移除，**但是堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员
    once中的函数被调用完以后，外部对函数内部的变量有引用，所以不会被释放，因此下次在调用时依然可以访问到。
+ **闭包特点：**
      外部具有指向内部的引用
      在外部作用域访问内部作用域的数据
      闭包使用不当很容易出现内存泄漏，不要为了闭包而闭包

#### 6 纯函数

    + **纯函数： 相同的的输入永远会得到相同的输入**,而且没有任何可观察的副作用

        - 纯函数就类似数学中的函数（用来描述输入和输出之间的关系）, y = f(x)

    + lodash 是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法

    + 数组的slice和splice分别是纯函数和不纯的函数

        - slice 返回数组中的指定部分，不会改变原数组

        - splice 对数组进行操作返回改数组，会改变原数组

    + 函数式编程不会保留计算中间的结果，所以变量是不可变的

    + 可以把一个函数的执行结果交给另一个函数去处理    

#### 7 lodash

     first / last / toUpp / findIndex / find / each



#### 8 纯函数

+ 可缓存

        - 因为纯函数对相同的输入始终有相同的结果，所以可以把纯函数的结果缓存起来

```javascript

const _ = require('lodash')
function getArea (r) {
    return Math.PI * r * r
}

let getArearWithMomory = memoize(getArea)
console.log(getArearWithMomory(4))

```

+ 自己模拟一个 memoize 函数

```javascript

function memoize (f) {
    let cache = {}
    return function () {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || f.apply(f, arguments)
        return cache[key]
    }
}

```

+ 可测试

        - 纯函数让测试更方便

+ 并行处理

        - 在多线程环境 下并行操作共享的内存数据很可能会出现意外轻快

        - 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数

#### 9 副作用

+ 纯函数： 对于想用的输入永远会得到相同的输出，而且没有任何可观察的**副作用**

```javascript

// 不纯的

let mini = 18

function checkage (age) {

    return age >= mini

}

// 纯的（有硬编码，后续用柯里化解决）

function checkAge (age) {

    let mini = 18 

    return age >= mini

}

```

副作用让一个函数变的不纯，纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用

副作用来源：

    + 配置文件

    + 数据库

    + 用户的输入



#### 10 柯里化

    + 使用柯里化解决硬编码问题

```javascript

    functionn checkAge (age) {

        let min = 18

    }

     

    // 普通纯函数

    function checkAge (min, age) {

        return age >= min

    }

    checkAge(18, 24)

    checkAge(18, 20)

    checkAge(20, 20)

    

    // 柯里化

    function checkAge (min) {

        return function (age) {

            return age >= min

        }

    }

    // es6 写法

    let checkAge = min => (age => age >= min)

    let checkAge18 = checkAge(18)

    let checkAge20 = checkAge(20)



    checkAge18(24)

    checkAge18(20)

```

+ 柯里化

    + 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）

    + 然后返回一个新的函数接受剩余的参数，返回结果

        

        - 柯里化可以让我给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数

        - 这是一种对函数参数的'缓存'

        - 让函数变的更灵活，让函数的粒度跟小

        - 可以把多元函数转换为一元函数，可以组合使用函数产生强大的功能



#### 11 lodash 中的柯里化

```javascript

const _ = require('lodash')

const match = _.curry(function(reg, str) {
return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

const filter = _.curry(function (func, array) {
    return array.filter(func)
})
const filter1 = _.curry((func, array) => array.filter(func))
const findSpace = filter(haveSpace)

console.log(filter(haveSpace, ['Jogn Connor', 'Jogn_Fonne']))
console.log(filter1(haveSpace, ['Jogn Connor', 'Jogn_Fonne']))
console.log(findSpace(['John Connor', 'John_Donne']))

```

#### 模拟柯里化

```javascript

const getSum = (a, b, c) => a + b + c
const curried = curry(getSum)

console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1, 2)(3))

function curry (func) {
    return function curriedFn(...args) {
    // 判断实参和形参的个数
    if (args.length < func.length) {
        return function () {
            return curriedFn(...args.concat(Array.from(arguments))) // 将虚拟数组转为数组
        }
    }
    return func(...args)
    }
}

```



## 函数组合

+ flow从左到右执行

+ flowRight 从右到左执行

```javascript

 // 函数组合演示

function compose (f, g) {

    return function (value) {

        return f(g(value))

    }

}

function reverse (array) {

    return array.reverse()

}

function first (array) {

    return array[0]

}

const last = compost(first, reverse)

console.log(last([1, 2, 3 4]))

```

#### lodash 中的组合函数

```javascript

 // lodash 中的函数组合的方法 _.flowRight()

const _ = require('lodash')



const reverse = arr => arr.reverse()

const first = arr => arr[0]

const toUpper = s => s.toUpperCase()



const f = _.flowRight(toUpper, first, reverse)

console.log(f(['one', 'two', 'three'])

```

#### 模拟 ladash 中的 flowRight

```javascript

const reverse = arr => arr.reverse()

const first = arr => arr[0]

const toUpper = s => s.toUpperCase()



const f = _.flowRight(toUpper, first, reverse)

console.log(f(['one', 'two', 'three'])



function compose (...args) {
    return function (value) {
        return args.reverse().reduce(fucntion (acc, fn) {
            return fn(acc)
        }, value)
    }
}

const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)




```

#### 组合函数-结合律

```javascript

    // 函数组合要满足结合律

    const _ = require('lodash')

    // const f = _.flowRight(_.toUpper, _.first, _.reverse)

    // const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)    

```

#### lodash中的FP模块

+ lodash/fp

+ 提供了不可变 auto-curried iteratee-first  data-last 的方法

```javascript

// lodash 模块

const _ = require('lodash')



_.map(['a', 'b', 'c'], _.toUpper)

//  => ['A', 'B', 'C']

_.map(['a', 'b', 'c'])

//  => ['a', 'b', 'c']

_.split('Hello World', ' ')



// lodash/fp 模块

const fp = require('lodash/fp')

fp.map(fp.toUpper, ['a', 'b', 'c'])

fp.map(fp.toUpper)(['a', 'b' ,'c'])



fp.split(' ', 'Hello World')

fp.split(' ')('Hello World')

```

#### lodash map问题

```javascript

const _ = require('lodash')
console.log(_.map(['23', '8', '10'], parseInt))
const fp = require('lodash/fp')
console.log(fp.map(parseInt, ['23', '8', '10']))

```

## Point Free

**Point Free**: 我们可以把数据处理的过程定义与数据无关的合成运算，不需要用到代表互数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数

+ 不需要指明处理的数据

+ 只需要合成运算过程

+ 需要定义一些辅助的基本运算函数

```javascript

const f = fp.flowRight(fp.join('-'), fp.map(_.toLower), fp.split(' '))



const fp = require('lodash/fp')

const f1 = word => word.toLowerCase().replace(/\s+/g, '_')

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)
console.log(f('Hello World'))

```

+ Pointfree - 案例

```javascript

// 把一个字符串的首字母提取并转换成大写，使用. 作为分隔符

const fp = require('lodash/fp')
// const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.first), fp.map(fp.toUpper), fp.split(' '))
const firstLetterToUpper = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.first, fp.toUpper)), fp.split(' '))

console.log(firstLetterToUpper('world wild web'))

```



## 函子 Functor

+ 为什么要学函子

    把副作用控制控制在可控范围内、异常处理、异步操作等。

+ 什么是Functor

    - 容器： 包含值和值的变形关系（这个变形关系就是函数）

    - 函子： 是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）



```javascript

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

let r = new Container(5)
            .map(x => x + 1)
            .map(x => x * x)
console.log(r) // Container { _value: 36 }

let w = Container.of(5)
            .map(x => x + 2)
            .map(x => x * x)
console.log(w) // Container { _value: 49 }
// 有一个缺陷  当传入值为空的时候，可能会引起报错

```

+ 总结：

    - 函数式编程的运算不直接操作值，而是由函子完成

    - 函子就是一个实现了map契约的对象

    - 我们可以把函子想象成一个盒子，这个盒子里封装了一个值

    - 想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值的函数（纯函数），由这个函数来对值进行处理

    - 最终map方法返回一个包含新值的盒子（函子）



### MayBe 函子

+ 对编程中的错误进行处理

+ 对外部的空值做处理（控制副作用在允许的范围内）

```javascript
    

class Maybe {
    static of (value) {
        return new Maybe(value)
    }
    constructor (value) {
        this._value = value
    }

    map (fn) {
        return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
    }

    isNothing () {
        return this._value === null || this._value === undefined
    }
}

let r = Maybe.of(null)
            .map(x => x.toUpperCase())
            .map(x => null)
            .map(x => x.split(' '))
            console.log(r)
//    多次调用，又一次出问题，并不能具体的捕获到时那次出问题

```

### Either函子

+ Either 两者中的任何一个，类似于if...else...的处理

+ 异常会让函数变的不纯，Either 函子可以用来做异常处理

```javascript

class Left {
    static of (value) {
        return new Left(value)
    }
    constructor (value) {
        this._value = value
    }
    map(fn) {
        return this
    }
}

class Right {
    static of(value) {
        return new Right(value)
    }    
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Right.of(fn(this._value))
    }
}

function parseJSON (str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {
        return Left.of({error: e.message})
    }
}

let r = parseJSON('{ "name": "zs" }')
            .map(x => x.name.toUpperCase())
console.log(r)

```

### IO 函子

+ IO函子中的_value 是一个函数，这里是把函数作为值来处理

+ IO函子可以把不纯的动作存储到_value中，延迟执行这个不纯的操作

+ 把不纯的操作交给调用者来处理

```javascript

const fp = require('lodash/fp')
class IO {
    static of(value) {
        return new IO(function() {
            return value
        })
    }

    constructor (fn) {
        this._value = fn
    }

    map(fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
}

//调用io方法
let r = IO.of(process).map(p => p.execPath)

console.log(r._value())

```



### Tash 异步执行

+ 异步任务的实现过去复杂，我们使用folktale中的task来演示

+ folkale一个标准的函数式编程函数，只提供了一些函数处理的操作





    


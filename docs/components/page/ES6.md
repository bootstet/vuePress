## ECMAScrity 与 JavaScript 的区别

+ ECMAScript 语言层面，规范

+ javascript 实现了ecmaScript的语言的标准

+ JavaScript= dom + bom + ecmaScript

+ ECMAScript 2015（ES2015）

## 作用域： 代码中的某个成员能够起作用的范围

+ 全局作用域

+ 函数作用域 

+ 块级作用域



## 对象解构

```javascript

const obj =  { name: 'cyz', age: 18 }

const { name : objName = 'jack' } = obj  // 当有重名时，objName 为新的名字

console.log(objName)  ==> 'cyz'



const { log } = console

log(123)

```

## 带标签的模板字符串

```javascript

// 模板字符串 带标签的模板字符串
// console.log(123)
const name = 'tom'
const gender = true

function myTagFunc(strings, name, gender) {
  // console.log(strings, name, gender)
  const sex = gender ? 'man' : 'woman'
  return strings[0] + name + strings[1] + sex + strings[2]
}
const result = myTagFunc`hey,${name} is a ${gender}`
hey,tom is a man
```

## 字符串的扩展方法

```javascript

const message = 'Error: foo id not defined'

console.log(

    message.startWith('Error')  // true

    message.endsWith('defined')    // true

    message.includes('foo')        // true

)

```

## 参数默认值

```javascript

//  带参数默认值的参数在后面，避免使用短路运算来设置默认值

//（默认值应为参数为undefined的时候设置，规避false也使用参数默认值）

function foo (bar, enable = true) {

    console.log('foo invoked - enable: ')

    console.log(enable)

}

foo(false)

```

## 剩余参数

```javascript

//  ... 展开剩余参数 只能在形参的最后一位，只能使用一次

function foo(...args) {
  console.log(args) // [ 1, 2, 3, 4 ]
}
foo(1,2,3,4)

```



## 展开运算符

```javascript

    const arr = ['foo', 'bar', 'baz']

    console.log.apply(console, arr)
    console.log(...arr)  // 'foo' 'bar' 'baz'

```

## 箭头函数
    不会改变this执行,始终都是当前作用域的this
```javascript
  const inc = n => n + 1

  const person = {
    name: 'tom',
    say: function() {
      console.log(this.name)  // tom
    }
    ai: () => {
      console.log(this.this) // undefined
    }
  }
  
```
## 对象字面量
```javascript
const obj = {
  foo: 123,
  bar,
  method1() {
    console.log(22)
  },
  method1: function() {
    // 和上面的写法是等价的
  }，
  // 计算属性名   es6中可以动态的去屑计算属性名
  [bar]: 123,
  [a + b]: 222,
  [Math.random()]: 123,
}
obj[Math.random] = 123
 
```


## Object.assign()

```javascript

const source1 = {
  a: 123,
  b: 123,
}

const target = {
  a: 456,
  c: 456,
}

const result = Object.assign(target, source1) // target目标对象
console.log(target)             // {a: 123, b: 456, c: 343}
console.log(result === target)  // true
// 将source1对象覆盖前面target对象，并返回前面的那个对象
Object.is()
console.log(Object.is(NaN, NaN))
```

## proxy

```javascript

const person = {
    name: 'cuy',
    age: 10
}

const personProxy = new Proxy(person, {
    get(target, property){
        return property in target ? target[property] : 'default'
    },
    set(target, property, value){
        if(property === 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError(`${value} is not an int`)
            }
        }
    console.log(target, property, value)
    }
})
// get 取值时触发的方法 target: 设置的对象 property: 设置的属性值
// set 设置值时厨房的方法 target: 对象 property: 属性值 value: 设置的值
    
```



## Proxy vs  Object.defineProperty

+ defineProperty 只能监视属性的读写，特意的方式去监视对象
+ Proxy能够监视到更多的对象操作，非入侵的方式去监视对象

```javascript

const person = {
  name: 'cuy',
  age: 10
}

const personProxy = new Proxy(person, {
    deleteProperty(target, property) { // 代理对象，删除的属性名
        console.log('delete', property)
        delete target[property]
    },
})

```

  | handler方法     | 触发方式  |  
| --------   | --------  | 
| get     | 读取某个属性 |   
| set     |   写入某个属性  |   
| has       |    in操作符   |  
| deleteProperty | delete 操作符 |
| getProperty   |    Object.getPropertypeOf()|
| setProperty    |    Object.setPropertypeOf()|
| isExtensible    |   Object.isExtensible()     |
| preventExtensions | Object.preventExtensions() |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()|
|defineProperty | Object.defineProperty()|
|ownKeys | Object.keys()、 Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()|
|apply | 调用一个函数|
| construct| 用new调用一个函数|


+ 数组方面的监视

## reflect  静态类,内部封装了一些列对对象的底层操作，
        统一提供了一套用于操作对象的API
Reflect.get()
```javascript
const obj = {
    foo: '123',
    bar: '456',
}
const proxy = new Proxy(obj, {
    get( target, property){
        console.log('watch logic~')
        return Reflect.get(target, property)
    }
})

console.log("name' in obj)        ===   console.log(Reflect.has(obj, 'name'))

console.log(delete obj['age']     ===   console.log(Reflect.deleteProperty(obj, 'age'))

console.log(Object.keys(obj))    ===    console.log(Reflect.ownKeys(obj))
// 更多方法见mdn

```



## Promise  一种更优的异步编程解决方案，解决了异步编程回调函数嵌套过深的问题

## class 类

```javascript

function Person (name) {
    this.name = name
}

Person.prototype.say = function () {
    console.log(`hi my name id ${this.name}`)
}

class Person {
    constructor (name) {
        this.name = name
    }
    say() {
        console.log(`hi, my name is ${this.name}`)
    }
    static creat (name) {
      return new Person(name)
    }
}
const p = new Person('tom')
p.say()
```

## 静态方法 static
```javascript
    见上面代码块的static
```

## extends 继承

```javascript

class Person {
    constructor (name) {
        this.name = name
    }
    say () {
        console.log(`hi, my name is ${this.name}`)
    }
}

class Student extends Person {
  constructor (name, number) {
    super(name)
    this.number = number
  }
  hello () {
    super.say()
    console.log(`my school number is ${this.number}`)
  }
}

const s = new Student('jack', '100')
s.hello()
```

## set数据结构（集合）
    不允许重复，一种数据类型
  ```javascript
  const s = new Set()
  s.add(1).add(2).add(3)
  s.forEach(i => console.log(i))

  s.has()  // 是否包含某个值
  s.delete(2) // 删除某一项
  s.clear()  // 清空
  const = [...s] // 展开某个数组
  ```

## map (类似对象)  结构的键只能是 字符串类型
```javascript
const obj = {}
obj[true] = 'value'
obj[123] = 'value'
obj[{a:1}] = 'value'

console.log(Object.keys(obj)) // 打印对象中的键 都会转换为字符串 就会有问题

m.set(tom, 90)
console.log(m) // 不会转换

m.forEach((value, key) => {
  console.log(value, key)
})

```

## Symbol 符号 原始的数据类型
    + 独一无二的，为对象添加一个独一无二的数据类型
    + es2019  7种数据类型 number string boolean undefined  null array  NaN object  BigInt
  

## for---of 
  + for 循环 遍历数组
  + for ... in 遍历键值对
  + forEach  map
```javascript
  //for of 编辑任意一种结构
  const a = [1, 2, 3]
  for (const item of a) {
    if(item > 100){
      break // 终止循环
    }
  }
  // 伪数组 
  const s = new Set(['foo', 'bar'])
  for(const item if s) {
    console.log(item)
  }

  const m = new Map()
  m.set('foo', '123')
  m.set('var', '345')
  for (const [key, value] of m) {

  }

  const obj = {foo: 123, bar: 456}
  for (const item of obj) {
    console.log(item)
  }  // 无法遍历 报错

```

  + Iterable Iterator IteratorResult 接口 可迭代接口 
  ```javascript
  // 实现可迭代接口(Iterable)
  const obj = {
    [Symbol.iterator]: function () {
      return {
        next: function () {
          return {
            value: 'zce',
            done: true
          }
        }
      }
    }
  }
  // 给obj添加迭代方法 但是并不能循环
  const obj = {
    store: ['foo', 'bar', 'baz']

    [Symbol.iterator]: function () {
      let index = 0
      const self = this

      return {
        next: function () {
          return {
            value: self.store[index],
            done: index >= self.store.length
          }
          index ++ 
          return result
        } 
      }
    }
  }

  // 此时obj 可使用for of 循环

  ```
  + 迭代器模式 对外提供统一遍历接口 ，不用关心内部的数据结构是什么样的
  ```javascript
    const todos = {
      left: ['吃饭', '睡觉', '打豆豆'],
      learn: ['语文', '数学', '外语'],
      work: ['喝茶'],
      each: function (callback) {
        const all = [].concat(this.life, this.learn, this.work)
        for (const item of all) {
          callback(item)
        }
      },

      [Symbol.iterator]: function() {
        const all = [...this.life, ...this.learn, ...this.work]
        let index = 0
        return {
          next: function() {
            return {
              value: all[index],
              done: index++ >= all.length
            }
          }
        }
      }
    }

    todo.each(function(item) {
      console.log(item)
    })
    console.log('............')
    for(const item of todos) {
      console.log(item)
    }

  ```
  ## es2015 生成器 Generator
  + 作用： 避免异步编程中回调嵌套过深，提供更好的异步编程方案
    ```javascript
    function * foo () {
      console.log('zec')
      return 100
    }
    
    const result = foo()
    console.log(result) // object [Generator] {}
    console.log(result.next()) // zce {value : 100, done: true}
    // next() 后才开始执行 

    function * foo () {
      console.log('1111')
      yield 100
      console.log('2222')
      yield 200
      console.log('3333')
      yield 300
    }

    const generator = foo()
    // 惰性执行 yield会暂停函数的执行，并将yield后面的值返回给 generator方法 每执行一次next() 执行一次
    // 生成器方法
    console.log(genetator.next())
    console.log(genetator.next())
    console.log(genetator.next())
    console.log(genetator.next()) // value undefined 

    ```
  + 生成器应用
    ```javascript
      // 发号器
      function * creatIdMaker () {
        let id = 1
        while (true) {
          yield id++
        }
      }

      const idMaker = createIdMaker()

      console.log(idMaker.next().value)
      console.log(idMaker.next().value)
      console.log(idMaker.next().value)
      console.log(idMaker.next().value)

    ```
### ES 2016 概述
    includes 判断数组中的值是否存在 indexof 不能查找NaN
    Math.pow(2, 10)  2的指数 2的10次方
    console.log(2 ** 10)
### ES 2017
  + Object.values(obj)  // obj中值的数据   Object.keys() // obj中键的数组
  + Object.entries() // Obj中的键值以数据的形式遍历

    ```javascript
    for( const[key, value] of Object.entries(obj) {
      console.log(key, value)
    })
    ```
  + 字符串填充方法padEnd padStart 填充导零

    ```javascript
      // 用给定的字符串去填充目标字符串的开始或结束位置，知道字符串达到制定长度 为止
      const books = {
        html: 5,
        css: 15,
        javascript: 124
      }

      for(const [name, count] of Object.entries(books)) {
        console.log(name, count)
      }

      for (const [name, count] of Object.entries(books)) {
        console.log(`${name.pad(16, '_')|${count.toSring().padStart(3, '0')}}`)
      }

    ```
        html---------|005
        css----------|015
        javascript---|124

  + 伪逗号  函数参数添加伪逗号
  + Async / Await



## 1 ECMAScrity 与 JavaScript 的区别

+ ECMAScript 语言层面，规范

+ javascript 实现了ecmaScript的语言的标准

+ JavaScript= dom + bom + ecmaScript

+ ECMAScript 2015（ES2015）

## 2 作用域： 代码中的某个成员能够起作用的范围

+ 全局作用域

+ 函数作用域 

+ 块级作用域
es6中新增的块级作用域，一堆花括号之间形成的作用域
如：
```js
  if (true) {
    console.log('aaa')
  }

  for(var i = 0; i < 10; i++) {
    console.log('aaa')
  }
```
以前块是没有独立的作用域的，导致我们在块中定义的作用域，外面也能访问到
```js
  if (true) {
    var foo = 'aaa'
  }
  console.log(foo)
```
es6中可以使用 let const 建立块级作用域

```js
  for(var i = 0; i < 3; i++) {
    for(var i = 0; i < 3; i++) {
      console.log(i)
    }
    console.log('内层是i3') // 不满如循环条件
  }
```
只打印3次是因为用var声明的i，不是块级作用域，是全局变量，外层i声明完以后，内层在声明一次，
解决全局变量重名的问题

```js
  var elements = [{}, {}, {}]
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function() {
      console.log(i)
    }
  }
  elements[2].onclick() // 都会打印3
```
因为i是全局变量，所以自循环完以后是3，无论什么时候打印都是3

```js
  var elements = [{}, {}, {}]
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = (function(i) {
      console.log(i)
    })(i)
  }
  elements[2].onclick() // 都会打印3
```

可以使用闭包来解决这个问题，闭包借助函数作用域来摆脱全局作用域所产生的的影响

```js
  var elements = [{}, {}, {}]
  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = function() {
      console.log(i)
    }
  }
  elements[2].onclick() // 都会打印3
```
使用let 创建块级作用域

let 不会出现变量提升

### 1、 const对象的属性可以修改吗？
  const保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

  但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。
### 2、 如果new一个箭头函数的会怎么样
  箭头函数是ES6中的提出来的，它没有prototype，也没有自己的this指向，更不可以使用arguments参数，所以不能New一个箭头函数。

  new操作符的实现步骤如下：
  + 创建一个对象
  + 将构造函数的作用域赋给新对象（也就是将对象的__proto__属性指向构造函数的prototype属性）
  + 指向构造函数中的代码，构造函数中的this指向该对象（也就是为这个对象添加属性和方法）
  + 返回新的对象

  所以，上面的第二、三步，箭头函数都是没有办法执行的。
### 3、箭头函数与普通函数的区别
#### （1）、箭头函数比普通函数更加简洁
+ 如果没有参数，就直接写一个空括号即可
+ 如果只有一个参数，可以省去参数的括号
+ 如果有多个参数，用逗号分割
+ 如果函数体的返回值只有一句，可以省略大括号
+ 如果函数体不需要返回值，且只有一句话，可以给这个语句前面加一个void关键字。最常见的就是调用一个函数：
```js
  let fn = () => void doesNotReturn();
```
#### （2）、箭头函数没有自己的this
箭头函数不会创建自己的this， 所以它没有自己的this，它只会在自己作用域的上一层继承this。所以箭头函数中this的指向在它在定义时已经确定了，之后不会改变。
#### （3）、箭头函数继承来的this指向永远不会改变
```js
  var id = 'GLOBAL';
  var obj = {
    id: 'OBJ',
    a: function(){
      console.log(this.id);
    },
    b: () => {
      console.log(this.id);
    }
  };
  obj.a();    // 'OBJ'
  obj.b();    // 'GLOBAL'
  new obj.a()  // undefined
  new obj.b()  // Uncaught TypeError: obj.b is not a constructor
```
对象obj的方法b是使用箭头函数定义的，这个函数中的this就永远指向它定义时所处的全局执行环境中的this，即便这个函数是作为对象obj的方法调用，this依旧指向Window对象。需要注意，定义对象的大括号{}是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。
#### （4）call()、apply()、bind()等方法不能改变箭头函数中this的指向
```js
  var id = 'Global';
  let fun1 = () => {
      console.log(this.id)
  };
  fun1();                     // 'Global'
  fun1.call({id: 'Obj'});     // 'Global'
  fun1.apply({id: 'Obj'});    // 'Global'
  fun1.bind({id: 'Obj'})();   // 'Global'
```
#### (5) 箭头函数不能作为构造函数使用
  构造函数在new的步骤在上面已经说过了，实际上第二步就是将函数中的this指向该对象。 但是由于箭头函数时没有自己的this的，且this指向外层的执行环境，且不能改变指向，所以不能当做构造函数使用。
#### (6) 箭头函数没有自己的arguments
箭头函数没有自己的arguments对象。在箭头函数中访问arguments实际上获得的是它外层函数的arguments值。
#### (7)箭头函数没有prototype
#### (8) 箭头函数不能用作Generator函数，不能使用yeild关键字

### 4、箭头函数的this指向哪⾥？
箭头函数不同于传统JavaScript中的函数，箭头函数并没有属于⾃⼰的this，它所谓的this是捕获其所在上下⽂的 this 值，作为⾃⼰的 this 值，并且由于没有属于⾃⼰的this，所以是不会被new调⽤的，这个所谓的this也不会被改变。

可以⽤Babel理解⼀下箭头函数: 
```js
  // ES6 
  const obj = { 
    getArrow() { 
      return () => { 
        console.log(this === obj); 
      }; 
    } 
  }
```

转化后：
```js
  // ES5，由 Babel 转译
  var obj = { 
    getArrow: function getArrow() { 
      var _this = this; 
      return function () { 
          console.log(_this === obj); 
      }; 
    } 
  };
```

## 3  对象解构

```javascript

const obj =  { name: 'cyz', age: 18 }
const { name : objName = 'jack' } = obj  // 当有重名时，objName 为新的名字
console.log(objName)  ==> 'cyz'
const { log } = console

log(123)

```
如何提取高度嵌套的对象里的指定属性？
有时会遇到一些嵌套程度非常深的对象：
```js
  const school = {
    classes: {
        stu: {
          name: 'Bob',
          age: 24,
        }
    }
  }
```
像此处的 name 这个变量，嵌套了四层，此时如果仍然尝试老方法来提取它：
```js
  const { name } = school
```
显然是不奏效的，因为 school 这个对象本身是没有 name 这个属性的，name 位于 school 对象的“儿子的儿子”对象里面。要想把 name 提取出来，一种比较笨的方法是逐层解构：
```js
  const { classes } = school
  const { stu } = classes
  const { name } = stu
  name // 'Bob'
```
但是还有一种更标准的做法，可以用一行代码来解决这个问题：
```js
  const { classes: { stu: { name } }} = school
       
  console.log(name)  // 'Bob'

```
可以在解构出来的变量名右侧，通过冒号+{目标属性名}这种形式，进一步解构它，一直解构到拿到目标数据为止。

## 4 带标签的模板字符串

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

## 5 字符串的扩展方法

```javascript

const message = 'Error: foo id not defined'

console.log(
    message.startWith('Error')  // true
    message.endsWith('defined')    // true
    message.includes('foo')        // true
)

```

## 6 参数默认值

```javascript

//  带参数默认值的参数在后面，避免使用短路运算来设置默认值

//（默认值应为参数为undefined的时候设置，规避false也使用参数默认值）

function foo (bar, enable = true) {

    console.log('foo invoked - enable: ')

    console.log(enable)

}

foo(false)

```

## 7 剩余参数

```javascript

//  ... 展开剩余参数 只能在形参的最后一位，只能使用一次

function foo(...args) {
  console.log(args) // [ 1, 2, 3, 4 ]
}
foo(1,2,3,4)

```
扩展运算符被用在函数形参上时，它还可以把一个分离的参数序列整合成一个数组
```js
  function mutiple(...args) {
    let result = 1;
    for (var val of args) {
      result *= val;
    }
    return result;
  }
  mutiple(1, 2, 3, 4) // 24
```
这里，传入 mutiple 的是四个分离的参数，但是如果在 mutiple 函数里尝试输出 args 的值，会发现它是一个数组：
```js
  function mutiple(...args) {
    console.log(args)
  }
  mutiple(1, 2, 3, 4) // [1, 2, 3, 4]
```
这就是 … rest运算符的又一层威力了，它可以把函数的多个入参收敛进一个数组里。这一点**经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。**

## 8 展开运算符
### (1) 对象扩展运算符
对象的扩展运算符(...)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。
```js
  let bar = { a: 1, b: 2 };
  let baz = { ...bar }; // { a: 1, b: 2 }
```
上述方法实际上等价于:
```js
  let bar = { a: 1, b: 2 };
  let baz = Object.assign({}, bar); // { a: 1, b: 2 }
```
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。(如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性)。


同样，如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

```js
  let bar = {a: 1, b: 2};
  let baz = {...bar, ...{a:2, b: 4}};  // {a: 2, b: 4}
```


利用上述特性就可以很方便的修改对象的部分属性。在redux中的reducer函数规定必须是一个纯函数，reducer中的state对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回。

需要注意：扩展运算符对对象实例的拷贝属于浅拷贝。

### （1）数组扩展运算符
```javascript
    const arr = ['foo', 'bar', 'baz']
    console.log.apply(console, arr)
    console.log(...arr)  // 'foo' 'bar' 'baz'
```

下面是数组扩展运算符符的应用：
+ 将数组转换为参数序列
```js
  function add(x, y) {
    return x + y;
  }
  const numbers = [1, 2];
  add(...numbers) // 3
```
+ 复制数组
```js
  const arr1 = [1, 2];
  const arr2 = [...arr1];
``` 
要记住：扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中，这里参数对象是个数组，数组里面的所有对象都是基础数据类型，将所有基础数据类型重新拷贝到新的数组中。
+ 合并数组
如果想在数组内合并数组，可以这样：
```js
  const arr1 = ['two', 'three'];
  const arr2 = ['one', ...arr1, 'four', 'five'];
  // ["one", "two", "three", "four", "five"]
```
+ 扩展运算符与解构赋值结合起来，用于生成数组
```js
  const [first, ...rest] = [1, 2, 3, 4, 5];
  first // 1
  rest  // [2, 3, 4, 5]
```
需要注意：如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。
```js
  const [...rest, last] = [1, 2, 3, 4, 5];         // 报错
  const [first, ...rest, last] = [1, 2, 3, 4, 5];  // 报错
```
+ 将字符串转为真正的数组
```js
  [...'hello']    // [ "h", "e", "l", "l", "o" ]
```
+ 任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组
比较常见的应用是可以将某些数据结构转为数组：
```js
  // arguments对象
  function foo() {
    const args = [...arguments];
  }
```
用于替换es5中的Array.prototype.slice.call(arguments)写法。
+ 使用Math函数获取数组中特定的值
```js
  const numbers = [9, 4, 7, 1];
  Math.min(...numbers); // 1
  Math.max(...numbers); // 9
```


## 9 箭头函数
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
## 10 对象字面量
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


## 11 Object.assign()

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

## 12 proxy

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



## 13 Proxy vs  Object.defineProperty

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

## 14 reflect  静态类,内部封装了一些列对对象的底层操作，
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



## 15 Promise  一种更优的异步编程解决方案，解决了异步编程回调函数嵌套过深的问题

## 16 class 类

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

## 17 静态方法 static
```javascript
    见上面代码块的static
```

## 18 extends 继承

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

## 19 set数据结构（集合）
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

## 20 map (类似对象)  结构的键只能是 字符串类型
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



## 21 Symbol 符号 原始的数据类型
    + 独一无二的，为对象添加一个独一无二的数据类型
    + es2019  7种数据类型 number string boolean undefined  null array  NaN object  BigInt
  ```js
    const symbol1 = Symbol();
    const symbol2 = Symbol(42);
    const symbol3 = Symbol('foo');

    console.log(typeof symbol1);
    // expected output: "symbol"

    console.log(symbol2 === 42);
    // expected output: false

    console.log(symbol3.toString());
    // expected output: "Symbol(foo)"

    console.log(Symbol('foo') === Symbol('foo'));
    // expected output: false

  ```
  

## 22 for---of 
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
## 23 es2015 生成器 Generator
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



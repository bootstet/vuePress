<!-- ---
home: true
heroText: TypeScript
tagline: 持续更新
--- -->
## TypeScript 
+ 基于javascript语言之上的语言，解决了JavaScript类型系统的问题
+ 是JavaScript的超集（扩展集）
+ 在javaScript之上，多了一些类型系统和es6新特性的支持，最终会被编译为原始的javaScript
## 概述
+ 强类型与弱类型
  + 安全层面 
  + 强类型有更强的类型约束，而弱类型几乎没有什么约束
  + 强类型不允许有隐式转换，弱类型可以 
  + 语言语法层面就限制了数据类型
+ 静态类型与动态类型，什么是静态类型，什么是动态类型，有什么区别
  + 类型检查
  + 静态类型语言： 一个变量声明时它的类型就是明确的，声明过后类型不允许更改
  + 动态类型： 在运行阶段才能明确，语言类型可以更改，变量没有类型（javascript）
+ JavaScript自有类型系统的问题（弱类型的问题）
  + JavaScript类型系统特征（弱类型 且 动态类型），脚本语言不需要编译，没有编译环节，丢失了类型系统的可靠性
  + 在语法上就会报错，不会等到运行的时候才会报错
  + 强类型优势：
    + 错误更早暴露
    + 代码更智能，编码更准确
    + 重构更牢靠
    + 减少不必要的类型判断
+ Flow静态类型检查方案
  + javascript的类型的检查器
+ TypeScript语言规范与基本应用

## Flow 检测代码中的问题
  + 数组类型
    ```javascript
      //  全部由数组组成的数组
      const arr1: Array<number> = [1, 2, 3]
      const arr2: number[] = [1, 2, 3]
      // 固定长度的数组,称为元组
      const foo: [string, number] = ['foo', 100]

    ```
  + 对象类型
    ```javascript
      // 这个obj1 必须要有两个成员 一个foo （string类型）一个bar（一个number类型）
      const obj1 : { foo: string, bar: number } = { foo: 'string', bar: 100}
      // ？表示可选可不选，成员可有可无
      const obj2 : { foo？: string, bar: number } = {  bar: 100}
      // 限制键值对的类型  键和值的类型必须都是字符串
      const obj3: { [string]: string} = {}
    ```
  + 函数类型
    ```javascript
    // 指定函数必须要有两个参数，一个为string类型，一个为number类型
    function foo (callback: (string, number) => void) {
      callback('string', 100)
    }

    foo(function (str, n){
      // str => string
      // n => number
    })
    ```
  + 特殊类型，字面量额类型
    ```javascript
      const a : 'foo' = 'foo'
      const type: 'success' | 'warning' | 'danager' = 'success' // 值只能是这几种的一个

      const b: string | number = 'string' // 20 值为string或number都可以

      type StringOrNumber = string | number
      const c: stringOrNumber = 'string'

      const gender: ?number = null  // undefined  maybe类型

    ```
  + mixed  Any
    ```javascript
    function passMixed (value: mixed) {

    }
    passMixed('string')
    passMixed(100)

    function passAny(value: any) {
      if (typeof value === 'string') {
        value.substr(1)
      }
      if (typeof value === 'number') {
        value * value
      }
      <!-- value.substr(1) -->
      <!-- value * value -->
    }
    passAny('string')
    passAny(100)

    ```
## TypeScript JavaScript的超集(superset) 前端领域的第二语言，
    缺点：语言本身多了很多概念
    TypeScript 属于 渐进式
### TypeScript 原始数据类型
```javascript
  const a: string = 'foobar'
  const b: number = 100 // NaN Infinity
  const c: boolean = true // false
  const e: void = undefined
  const f: null = null
  const g: undefined = undefined
  const h: symbol = Symbol() 
  // 标准库就是内置对象所对应的声明
  // 作用域 添加
  export {}
``` 
### Object类型
```javascript
  export {} // 确保跟其他示例没有冲突

  const foo: object = function() {} // [] {}

  const obj: { foo: numnber, bar: string } = { foo: 123, bar: 'string' }
```

### 数组类型

```javascript
  const arr1: Array<number> = [1, 2, 3]
  const arr2: number[] = [1, 2, 3]

  function sum (...args: numberp[]) { // 只能传入数字的数组
    return args.reduce((prev, current) => prev + current, 0)
  }
  sum(1, 2, 3)
```

### 元组类型（明确元素数量，以及各个数组的类型的数组）
```javascript
  export {} // 确保跟其他代码块没有冲突

  const tuple: [number, string] = [18, 'zer']
  const age = typle[0]       // 下标去获取值

  const [age, name] = tuple  // 解构去取值
```
### 枚举类型
  实际开发中，会用到一些数值表示一些方法，比如常用的status 1 2 3 
  表示不同的状态，这是用枚举会方便记录，识别
  ```javascript
    const PostStatus = {
      Draft: 0,
      Up: 1,
      Pub: 2
    }
    enum PostStatus {
      Draft= 0,
      Up= 1,
      Pub= 2
    }
    const enum PostStatus {   // 常量枚举
      Draft,      // 默认为0
      Up,         // 依次累加1
      Pub          // 2
    }

    const post = {
      title: 'Hello ',
      content: 'XXX',
      status: PostStatus.Draft
    }
    // 入侵运行时的代码，编译后不会删除
  ```
  
### 函数类型 输入输出做限制

  ```javascript
  // 函数声明
    function func1 (a: number, b?: number, c=10, ...rest: number[]): string { // string为函数返回值的限制 ? 可选参数  c 参数默认值
    // reset 任意个数的参数
      return 'func1'
    }

    func1（100， 200）
    // 型参与传入的参数必须保持一致，设置参数默认值的参数，就是可以选的

  // 函数表达式
  const func2 = function(a: number, b: number): string {
    return 'func2'
  }
  // 可以用箭头函数来表示函数返回值的类型
  const func2: (a: number, b: number) => string = function (a: number, b: number): string {
    return 'func2'
  }
  ```

### 任意类型就(any Types)

  ```javascript
  // any接受任意类型
    function stringify (value: any) {
      return JSON.stringify(value)
    }
    let foo: any = 'string'

    foo = 100
    foo.bar()
    // any类型不是安全的
  ```

### 隐式类型推断
  ```javascript
    let age = 19 // 隐式推断为number
    age = 'string' // 会报错
    let foo  // 不赋值 就是任意类型的值
    // 建议为每个类型去添加类型
  ```

### 类型断言
  ```javascript
  // 嘉定这个nums来自一个明确的接口
    const nums = [112, 123, 342]
    const res = nums.find(i => i > 0)  // number || undefined
    // **const square = res * res** //报错 因为ts不知道res返回的是什么，需要断言，明确告诉typescript这里是个什么值
    const num1 = res as number // 这是一个number
    const num2 = <number>res   // 等价于上面的as写法  （jsx下不能使用）

  ```

### 接口 interfaces (契约)
  用来约束一个对象的结构，一个对象去实现一个接口，就必须拥有接口中所约束的所有成员
  ```ts
  interface Post {
    title: string  // 可加 ， ;
    content: string
    subtitle?: string     // 可用可无 可选成员
    readonly summary: string       // 只读属性 初始化 不能修改了
  }
  function printPost (post: Post) {
    console.log(post.title)
    console.log(post.content)
  }

  printPost({
    title: 'Hello, Typescript',
    content: 'A javascript superset'
  })

  // 动态定义接口

  interface Cache {
    [prop: string] : string     // 动态只能是string类型，动态属性的值只能是string
  }

  const cache: Cache = {}
  cache.foo = 'value'
  ```

### 类 
  + 用来描述一类事物的抽象特征
  ```ts
  class Person {
    public name: string = 'init name'
    private age: number // 类属性在使用前必须先声明
    protected readonly gender: boolean    //readonly 只读属性

    constructor (name: string, age: number) {
      this.name = name
      this.age = age
    }
    sayHi (msg: string): void {
      console.log(`I am ${this.name}, ${msg}`)
    }
  }

  // 访问修饰符
  // private 私有属性
  // public 共有属性
  // protected 受保护的不能访问 只允许子类成员访问
  class Student extends Person {
    constructor (name: string, age: number) {
      super(name, age)
      console.log(this.gender)
    }

    static create (name: string, age: number) {
      return new Student(name, age)
    }
  }
  const tom = new Person('tom', 18)
  console.log(tom.name) // 只云允许子类成员访问

  ```
  + 类与接口
  ```ts
    // interface EatAndRun {
    //  eat (food: string): void
    //  run (distance: number): void
    //}

    // 理想化 一个接口只抽象一个成员，一个类使用多个接口

    interface Eat {
      eat (food: string): void 
    }

    interface Eat {
      run (distance: number): void 
    }

    class Person implements Eat, Run {
      eat (food: string): void {
        console.log(`优雅的进餐，${food}`)
      }
      run (distance: number) {
        console.log(`直立行走${distance}`)
      }
    }

    class Animal implements EatAndRun {
      eat (food: string): void {
        console.log(`咕噜咕噜的值${food}`)
      }
      run (distance: number) {
        console.log(`爬行${distance}`)
      }
    }
  ```
  + 抽象类
  ```ts
    abstract class Animal {
      eat (food: string): void {
        console.log(`咕噜咕噜的值${food}`)
      }
      abstract run (distance: number): void
    }

    const d = new Dog()
    d.eat('enxima')
    d.run(100)
  ```

### 泛型 Generics
```ts
const hello = (name: string) => {
  console.log(`hello,${name}`)
}
hello('bar')


const nums = [110, 1]

function creatNumberArray (length: number, value: number): number[] {
  const arr = Array<number>(length).fill(value)
  return arr
}

function creatStringArray (length: number, value: string): string[] {
  const arr = Array<string>(length).fill(value)
  return arr
}
function creatArray<T> (length: number, value: T): T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}



const res = creatNumberArray(3, 100)

// res => [100, 100, 100]
 
```

### 类型声明 Type Declaration
  引入第三方模块，当不包含时，就尝试安装一个类型声明模块
```ts
  // 一个函数在使用的时候没有函数声明，我们在用的是偶在单独做一个函数声明
  import { camelCase } from 'lodash'

  declare function camelCase (input: string): string

  const res = camelCase('hello, typed')
```
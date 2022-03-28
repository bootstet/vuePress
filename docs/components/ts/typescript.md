
## 强类型语言和弱类型语言概述
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

## TypeScript 简介
  + JavaScript的超集(superset) 前端领域的第二语言，
  + 基于javascript之上的语言，解决了JavaScript类型系统的问题
  + 基于javascript基础之上的扩展语言，是JavaScript的超集（扩展集）
    在javascript基础之上多了一些扩展特性。多了一整套强大的类型系统，以及对ES6+的一些新特性的支持，最终会被编译为原始的javaScript
  ![](https://glzhealth.oss-cn-shenzhen.aliyuncs.com/organization/information/1646151883786612tsandjs.png)

    开发过程中用typescript的类型系统和es6+的新特性，在项目中将typescript编译成浏览器认识的javascipt代码。 
  + 任何一种 Javascript运行环境都支持
  + 优缺点： 
    - 优点：功能更为强大，生态也更为健全、更完善
    TypeScript 属于 渐进式，可按照javascipt标准立马开发
    小项目灵活自由，选择javascript本身，相反长周期开发大型项目，选择typescript
    - 缺点：
      语言本身多了很多概念，eg：接口、泛型、枚举
      项目初期，Typescript会增加一些成本，需要编写很多类型声明，
## 原始类型
  ```ts
    const a: string = 'dfsdf'
    const b: number = 100
    const c: boolean = null
    const d: string = null
    const e: void = null // 只能存放null和undefined，严格模式下只能是nudefined
    const f: null = null
    const g: undefined = undefined

    const h: symbol = Symbol()
  ```



## 数据类型
  ### Object类型
    typeacript中的object指非原始类型，对象、数组、函数
    对象的类型限制可以用对象字面量的方法，最好使用接口来限制
  ```ts
    const foo: object = function () {}
    const arr: object = []
    const obj: { foo: number} = { foo: 123 } 
  ```
  ### 数据类型
    两种定义数组类型的写法

  ```ts
      const arr1: Array<number> = [1, 3]
      const arr2: number[] = [1, 3] // 全部由数字组成的数组


      function sum(...args: Array<number>) {
        return args.reduce((prev, current) => prev + current, 0)
      }
  ```
  ### 元组类型 （tuple types）
    特殊的数据结构，明确元素数量以及每个元素类型的数组，各个元素类型不必相同，可以使用类似数组字面量的语法定于元组类型  
  ```ts 
    const tuple: [number, string] = [12, 'dfs']

    // const age = tuple[0]

    const [ age, name] = tuple
  ```
  ### 枚举类型 enum 
    给一组数值起上好理解的名字，一个枚举中只会存在几个固定值
    实际开发中，会用到一些数值表示一些方法，比如常用的status 1 2 3 
    表示不同的状态，这是用枚举会方便记录，识别
  ```ts
    const PostStatus = {
      start: 0,
      sending: 1,
      end: 2
    }

    enum PostStatus {
      start = 0,
      sending = 1,
      end = 2
    }

    const enum PostStatus1 {
      start,
      sending = "asa",
      end = 'dsf'
    }

    const post = {
      title: 'aa',
      content: 'dfsdfa',
      status: PostStatus.start // 2 3
    }
    PostStatus1[0]   // 可以通过索引器的方式获取值
    // 入侵运行时的代码，编译后不会删除
  ```
  常量枚举 在枚举前加一个const，此类枚举不可在使用索引器的方式获取值

## 函数类型 
  对函数的输入输出做限制，参数和返回值

  ```javascript
  // 函数声明
    function func1 (a: number, b?: number, c=10, ...rest: number[]): string { // string为函数返回值的限制 ? 可选参数  c 参数默认值 可传可不传，必须写在最后，参数是按照位置传递 
    // reset 任意个数的参数 es6的rest操作符
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

  ### 任意类型

  ```javascript
  // any接受任意类型 动态类型
    function stringify (value: any) {
      return JSON.stringify(value) // 任意类型参数
    }
    let foo: any = 'string'

    foo = 100
    foo.bar()
    // any类型不是安全的 typescript不会对它进行检查，语法上不会报错，轻易不要使用，兼容老代码会用，
  ```
  ### 函数重载
    TS没有办法运行之前根据传递的值来推导方法最终返回的数据的数据类型


## 隐式类型推断
  没有通过类型注解去标注这个数据的类型，typescript会根据变量的使用情况去推断这个变量的类型
  ```javascript
    let age = 19 // 隐式推断为number
    age = 'string' // 会报错
    let foo  // 不赋值 就是任意类型的值
    // 建议为每个类型去添加类型
  ```
## 类型断言
  ```javascript
  // 嘉定这个nums来自一个明确的接口
    const nums = [112, 123, 342]
    const res = nums.find(i => i > 0)  // number || undefined
    // **const square = res * res** //报错 因为ts不知道res返回的是什么，需要断言，明确告诉typescript这里是个什么值
    const num1 = res as number // 这是一个number
    const num2 = <number>res   // 等价于上面的as写法  （jsx下不能使用）

  ```
  ### 非空断言
  ```ts
    function myFunc(maybeString: string | undefined | null) {
      // Type 'string | null | undefined' is not assignable to type 'string'.
      // Type 'undefined' is not assignable to type 'string'. 
      const onlyString: string = maybeString; // Error
      const ignoreUndefinedAndNull: string = maybeString!; // Ok
    }
  ``` 

## 接口 interfaces (契约)
  一种规范，一种契约
  用来约约定一个对象的结构，一个对象去实现一个接口，就必须拥有接口中所约束的所有成员
  ```ts
  interface Post {
    title: string  // 可加 ， ; standard 规范不加
    content: string
    subtitle?: string     // 可用可无 可选成员
    readonly summary: string       // 只读属性 初始化以后就不能修改了
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
    [key: string] : string     // 动态只能是string类型，动态属性的值只能是string
    // key 可以是任意名称，代表了属性的名称， string成员名的类型即键的类型
    // 后面的string是它的值的类型
  }

  const cache: Cache = {}
  cache.foo = 'value'
  ```
## 类 
  + 用来描述一类具体事物的抽象特征 
    eg: 手机为一个类型，可以打电话发短信，类下会有细分的子类，子类一定会满足父类的所有特征。还会多出来一些额外的特征，如智能手机，处理满足打电话发短信，还可以玩游戏
  + 放在编码中，class用来描述一类具体对象的抽象成员
    在typescript中增强了class的相关语法
    eg： 类中成员有特殊访问修饰符，还有抽象类的概念
  ```ts
  class Person {
    public name: string = 'init name'
    private age: number // 类属性在使用前必须先声明,为了给属性做一些标注
    protected readonly gender: boolean    //readonly 只读属性
    // 构造函数 
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
      super(name, age) // 调用父类的构造函数
      console.log(this.gender)
    }

    static create (name: string, age: number) {
      return new Student(name, age)
    }
  }
  const tom = new Person('tom', 18)
  console.log(tom.name) // 只云允许子类成员访问

  const jack = Student.create('jack', 10)

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
    // implements 用接口对类进行抽象

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
    某种程度上来说跟接口有点类似，也是用来约束子类中必须拥有一些成员，不同的是抽象类可以包含一些具体的实现，而接口只能成员的抽象，不包含具体的实现
  ```ts
    // abstract 定义抽象类  只能继承，不能再用new 的方式去创建实例
    abstract class Animal {
      eat (food: string): void {
        console.log(`咕噜咕噜的值${food}`)
      }
      // 定义抽象方法
      abstract run (distance: number): void
    }

    class Dog extends Animal{
      // 子类必须有这个方法
      run(distance: number): void {
        console.log('四角爬行', distance)
      }
    } 

    const d = new Dog()
    d.eat('enxima')
    d.run(100)
  ```

## 泛型 Generics
### 定义 
指定义函数类型或者接口的时候没有定义具体的类型，等到使用的时候在去指定具体类型的特征
+ 定义时不明确使用时必须明确成某种具体数据类型的数据类型。【泛型的宽泛】
+ 编译期间进行数据类型安全检查的数据类型。【泛型的严谨】
eg： 以函数为例，声明函数的时候不去指定的类型，等到在调用的时候在传一个类型
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
  const arr = Array<T >(length).fill(value)
  return arr
}



const res = creatNumberArray(3, 100)
const res1 = createArray<string>(3, 100)

// res => [100, 100, 100]
 
```


## 类型声明 Type Declaration
  引入第三方模块，当不包含时，就尝试安装一个类型声明模块
```ts
  // 一个函数在使用的时候没有函数声明，我们在用的是偶在单独做一个函数声明
  // 一个成员因种种原因在定义的时候没有声明类型，那我们可以在用的时候通过declear来声明类型
  import { camelCase } from 'lodash'

  declare function camelCase (input: string): string

  const res = camelCase('hello, typed')
```

## 标准库声明  （内置对象类型）
  所谓标准库内置对象所对应的声明文件，我们在ts中要使用对应的内置对象就必须使用内置的标准库，否则就会报错
  在配置文件中的lib选项进行配置，
  eg： 浏览器中的console是bom对象，就必须在标准库中引入 bom库，typescript将bom和dom划归为一个标准库dom
      symbol、Promise为es2015中标准库对应的声明文件
      Array为es5标准库对应的声明文件
    
  小技巧：  yarn tsc --local zh-CN 展示中文错误消息

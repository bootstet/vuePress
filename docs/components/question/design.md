Javascript 设计模式

+ 开发效率
+ 可维护性

设计模式是一种思想，和语言无关。

## 资源推荐
+ 大话设计模式
  c# 语言描述的
+ 设计模式：可复用面向对象软件的基础
+ headfirst 设计模式
+ Javascript 设计模式

## uml 工具

## 设计模式
  以下代码示例均为了举例说明模式的设计思想，实现起来比正常逻辑代码看起来要复杂，但真正开发中，逻辑远比示例要复杂
### 1、工厂模式
  我们创建一个加减乘除简单的例子来讨论工厂模式,这里为了方便用vue来写代码
  ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="app">
        <form @submit.prevent="handleSubmit">
          <div>
            <label for="">数字A</label>
            <input type="number" v-model.number="num1">
          </div>
          <div>
            <label for="">操作符</label>
            <select name="" id="" v-model="oprate">
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">*</option>
              <option value="/">/</option>
            </select>
          </div>
          <div>
            <label for="">数字B</label>
            <input type="number" v-model.number="num2">
          </div>
          <div>
            <button>计算</button>
          </div>
          <div>
            结果： {{result}}
          </div>
        </form>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script src="./main.js" type="module"></script>
    </body>
    </html>
  ```
  main.js

  ```js
    new Vue({
      el: '#app',
      data: {
        num1: 0,
        num2: 0,
        result: 0,
        oprate: '+'
      },
      methods: {
        handleSubmit () {
          switch (this.oprate) {
            case '+':
              this.result = this.num1 + this.num2
              break;
            case '-':
              this.result = this.num1 - this.num2
              break;
            case '*':
              this.result = this.num1 * this.num2
              break;
            case '/':
              this.result = this.num1 / this.num2
              break;
          }
        }
      }
    })
  ```
  我们主要看js代码，上面是我们拿到需求后最简单直接的写法，直接来判断
  这里只有加减乘除，但是当计算判断比较复杂的时候，一直往里面写判断代码就会很复杂冗余，这个时候我们可以将判断放到一个类里面，用这里类提供一个公开的方法，然后直接去调用使用它会更好一些。改造 main.js 代码如下：
  ```js
    class Operation {
      constructor (num1, num2, oprate) {
        this.num1 = num1
        this.num2 = num2
        this.oprate = oprate
      }
      getResult () {
        let result 
        switch (this.oprate) {
          case '+':
            result = this.num1 + this.num2
            break;
          case '-':
            result = this.num1 - this.num2
            break;
          case '*':
            result = this.num1 * this.num2
            break;
          case '/':
            result = this.num1 / this.num2
            break;
        }
        return result
      }
    }

    new Vue({
      el: '#app',
      data: {
        num1: 0,
        num2: 0,
        result: 0,
        oprate: '+'
      },
      methods: {
        handleSubmit () {
          console.log(123)
          const cal = new Operation(this.num1, this.num2, this.oprate)
          this.result = cal.getResult()
        }
      }
    })
  ```
  Operation类不关心视图，只关注业务逻辑的处理，将逻辑处理解耦出来
  到现在为止还看不到所谓的工厂，当运算越来越多的时候，我们继续在 getResult 中添加逻辑，这是还是很麻烦，我们继续改造代码
  将 getResult 中的运算的每一个操作单独的封装到一个类中进行处理
  ```js
    class Operation {
      constructor (num1, num2) {
        this.num1 = num1
        this.num2 = num2
      }
      // 如果是传统的面向对象，这里要有一个抽象方法，然后又子类具体实现
    }

    class OperationAdd extends Operation {
      constructor (num1, num2) {
        super(num1, num2)
      }
      getResult () {
        return this.num1 + this.num2
      }
    }

    class OperationSub extends Operation {
      constructor (num1, num2) {
        super(num1, num2)
      }
      getResult () {
        return this.num1 - this.num2
      }
    }

    class OperationMul extends Operation {
      constructor (num1, num2) {
        super(num1, num2)
      }
      getResult () {
        return this.num1 * this.num2
      }
    }

    class OperationDiv extends Operation {
      constructor (num1, num2) {
        super(num1, num2)
      }
      getResult () {
        return this.num1 / this.num2
      }
    }

    // 工厂出来了

    class OprationFactory {
      static createOprate (oprate) {
        let ope = null // 存储具体的操作实例
        switch (oprate) {
          case '+':
            ope = new OperationAdd()
            break;
          case '-':
            ope = new OperationSub()
            break;
          case '*':
            ope = new OperationMul()
            break;
          case '/':
            ope = new OperationDiv()
            break;
        }
        return ope
      }
    }

    new Vue({
      el: '#app',
      data: {
        num1: 0,
        num2: 0,
        result: 0,
        oprate: '+'
      },
      methods: {
        handleSubmit () {
          const oper = OprationFactory.createOprate(this.oprate)
          oper.num1 = this.num1
          oper.num2 = this.num2
          this.result = oper.getResult()
        }
      }
    })
  ```
  将每一种运算都抽离出一个类，这样在每个类中处理自己的逻辑
  这个时候工厂就出来了
  OprationFactory 就是一个工厂类，造出不同的实例来处理不同的逻辑，OprationFactory中不涉及具体的业务逻辑

  哎，代码怎么还越来越多了呢，这是因为这只是实例代码，逻辑比较简单，当实际开发中，当业务比较复杂的时候，这个时候处理逻辑就会很清楚，代码可读性就会大大提高。平日的增删改查可能不会用到这些逻辑，只有在写一些公用方法，底层框架或sdk的时候会用到。

### 2、单例模式
  例如弹窗组件，只能被实例化一次，多次调用也只有一个实例
  使用实例内部成员来存储instance，判断实例有没有，有就直接返回已经存在的对象，没有则new一个新的
  ```js
    /**
     * 单例模式： 只能创建一个实例，多次调用也只有一个实例
     */

    class Singleton {
      constructor(name) {
        this.instance = null // 保存当前类的实例
        this.name = name
      }

      getName() {
        console.log(this.name)
      }

      static getInstance() {
        if (!this.instance) {
          this.instance = new Singleton()
        }
        return this.instance
      }
    }

    // const s1 = new Singleton()
    // const s2 = new Singleton()
    // const s3 = new Singleton()

    const s1 = Singleton.getInstance()
    const s2 = Singleton.getInstance()

    console.log(s1 === s2)  // true
  ```
  也可以结合高阶函数和闭包来存储，从而判断实例已经存不存在，我们可以改造一下上面的函数
  ```js
    /**
     * 单例模式： 只能创建一个实例，多次调用也只有一个实例
     */

    class Singleton {
      constructor(name) {
        this.name = name
      }

      getName() {
        console.log(this.name)
      }

      // 闭包和高阶函数，利用闭包存储实例
      // 函数内返回外部的成员 
      static getInstance = (function() {
        let instance = null
        return function () {
          if (!instance) {
            instance = new Singleton()
          }
          return instance
        }
      })()
    }

    // const s1 = new Singleton()
    // const s2 = new Singleton()
    // const s3 = new Singleton()

    const s1 = Singleton.getInstance()
    const s2 = Singleton.getInstance()

    console.log(s1 === s2)  // true
  ```

  如果我们有很多个实例，那么上面方法中，判断部分可不可以抽离出来呢？这样有很多个实例的时候我们只需要调用，判断实例存不存在方法即可，想让谁单例，把这个类传进来即可。

  ```js
    class LoginFrom{
      constructor () {}
      show () {}
      hide () {}
    }

    const creatGetSingle = function (fn) {
      let instance
      return function () {
        if (!instance) {
          instance = new fn()
        }
        return instance
      }
    }

    const createLoginForm = creatGetSingle(LoginFrom)

    const form1 = createLoginForm()
    const form2 = createLoginForm()

    console.log(form1 === form2) //  true
    class A {}
    const createA = createGetSingle(A)
    const a1 = createA()
    const a2 = createA()
    console.log(a1 === a2) // true

  ```

  当有多个实例需要单例时，调用createGetSingle 方法即可。
### 3.策略模式
  举个例子，我们写一个根据绩效来发工资的函数
  ```js
    /**
     * 策略模式
     * 发工资： 
     * S 4倍工资
     * A 3倍工资
     * B 2倍工资
     */

    // 使用类来计算工资, 传统方式

    const calculateBouns = function (level, salary) {
      if (level === 'S') {
        return salary * 4
      } else if (level === 'A') {
        return salary * 3
      } else if (level === 'B') {
        return salary * 2
      }
    }

    calculateBouns('S', 1000)
    calculateBouns('B', 2 000)

  ```
  上面只是根据职级和基本工资来结算工资，逻辑不复杂，但是当calculate中的换算逻辑复制的时候，这么写代码就有点不好看了，我们调整一下,将每个级别的计算过程提取出来
  ```js
    const calculateS = function (salry) {
      return salry * 4
    }

    const calculateA = function (salry) {
      return salry * 3
    }

    const calculateB = function (salry) {
      return salry * 2
    }

    const calculateBonus = function (level, salary) {
      if (level === 'S') {
        return calculateS(salary)
      } else if (level === 'A') {
        return calculateA(salary)
      } else if (level === 'B') {
        return calculateB(salary)
      }
    }

    calculateBonus('S', 1000)
  ```
  我们可以将判断级别的部分继续抽出来一个类，让它专门做判断

  ```js
    class CalculateS {
      calculate (salary) {
        return salary * 4
      }
    }

    class CalculateA {
      calculate (salary) {
        return salary * 3
      }
    }

    class CalculateB {
      calculate (salary) {
        return salary * 2
      }
    }

    class Bonus {
      constructor (salary, calculator) {
        this.salary = null
        this.calculator = null // 策略对象，具体的执行对象
      }

      setSalary (salary) {
        this.salary = salary
      }

      setCaculator (calculator) {
        this.calculator = calculator
      }

      getBonus () {
        return this.calculator.calculate(this.salary)
      }
    }

    const bouns = new Bonus()

    bonus.setSalary(1000)
    // 策略模式是在外部创建实例对象，工厂模式是在内部创建，是固定的
    bonus.setCaculator(new calculateS()) // 设置策略对象

    console.log(bouns.getBonus())

  ```
  将计算部分抽离出来，在外部去设置内部的具体的处理逻辑，处理逻辑又是一个类

  我们也可以简单一点的写法，创建一个对象，对象中有不同函数去处理每个职级工资的逻辑，如：
  ```js
    // 在对象中 有不同的策略类，有不同的处理函数
    const calculators = {
      S (salary) {
        return salary * 4
      }
      B (salary) {
        return salary * 3
      }
      S (salary) {
        return salary * 2
      }
    }


    // 函数中根据不同参数去访问对象中的函数，返回相应的结果 
    const calculateBonus = (level, salary) => calculators[level](salary)

    console.log(calculateBouns('S', 1000))
  ```

### 4.发布订阅模式

```js
  class EventEmit {
    constructor () {
      this.events = {

      }
    }
    on (eventName, handler) {
      const handlers = this.events[eventName]
      if(handlers) {
        handlers.push(handler)
      } else {
        this.events[eventName] = []
        this.events[eventName].push(handler)
      }
    }

    emit (eventName, ...args) {
      const handlers = this.events[eventName]
      if(handlers) {
        handlers.forEach(cb => {
          cb(...args)
        })
      }
    }
  }

  const em = new EventEmit()

  // 订阅事件
  em.on('haha', message => {
    console.log(message, 1)
  })
  
  // 订阅事件
  em.on('haha', message => {
    console.log(message, 2)
  })
  // 发布事件
  em.emit('haha', 'world') // world 1  world 2
```




  


### 5.代理模式
### 6.策略模式
### 7.状态模式
### 8.观察者模式

## 掘金修言 
   [设计模式](https://juejin.cn/book/6844733790204461070?scrollMenuIndex=1)
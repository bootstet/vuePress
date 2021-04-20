### this指向
this指向不取决于定义，不取决于函数的声明，取决于谁调用的
```javascript
  const obj1 = {
    foo: function () {
      console.log(this)
    }
  }
  // 不取决于定义，取决于谁调用的
  obj1.foo()  // this 指向 obj1
  const fn = obj1.foo
  fn()       // this 指向 全局对象 （浏览器环境下指向window，如果是 node 环境指向全局对象）
            // 如果在严格模式下 'use strict'  this为undefined，因为严格模式下全局对象为 undefined


  const obj2 = {
    foo: function () {
      function bar () {
        console.log(this)
      }
      bar()
    }
  } 
```
+ 1 沿着作用域向上找最近的一个 function，看这个 function 最终是怎样执行的；
+ 2 this的指向取决于所属 function 的调用方式，而不是定义；
+ 3 function 调用一般分一下几种情况：
  + 作为函数调用，即: foo()
    + 指向全局对象，注意严格模式问题
  + 作为方法调用，即：foo.bar() / foo.bar.baz()
    + 指向最终调用这个方法的对象
  + 作为构造函数调用，即： new Foo()
    + 指向一个新对象 Foo{}
  + 特殊调用， 即： foo.call() / foo.apply()
    + 参数指定成员
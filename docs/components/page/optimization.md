<!-- ---
home: true
heroText: TypeScript
# tagline: 持续更新
author: 小陈
time: 2020-06-23
category: JS
--- -->
# JavaScript 性能优化


-------


  **降低消耗，提高效率** 
  内容概要
>* 内存管理
>* 垃圾回收与常见GC算法
>* V8引擎的垃圾回收
>* Performance 工具
>* 代码优化操作

## 1.内存管理 (Memory Management)
  ### 内存管理介绍
  + 内存：由可读写单元组成，表示一片可曹勇空间
  + 管理：人为的去操作一片空间的申请、使用和释放
  + 内存管理：开发者主动申请空间、使用空间、释放空间
  + 管理流程：申请--使用--释放

```js
  function fn() {
    arrList = []
    arrList[100000] = 'lg id a coder'
  }
  fn()
```
内存泄漏，浏览器会展用很大内存

![avatar](/docs/.vuepress/public/image/内存泄漏.png)

   **管理流程**

  + 申请内存空间
  + 使用内存空间
  + 释放内存空间

  ```js
  // 申请
  let obj = {}
  // 使用
  obj.name = 'lg'
  // 释放
  obj = null
  ```
## 2.javascript 中的垃圾回收
  + javascript中内存管理是自动的
  + 对象不再被引用时是垃圾
  + 对象不能从根上访问到时是垃圾

  ### 可达对象  
  + 可以访问到的对象就是可达对象（引用、作用域链）
  + 可达的标准就是从跟出发是否能够被找到
  + JavaScript中的根就可以理解为是全局变量对象
  ### **GC**（垃圾回收）算法介绍
      GC可以找到内存中的垃圾、并释放和回收空间
  + GC中的垃圾是什么
    ```js
      // 程序中不在需要使用的对象
      function fun() {
        name = 'lg'
        return `${name} is a coder` 
      }
      fun()
      // name使用完以后不需要在使用了，从需求的角度考虑应该被回收

      // 程序中不能再访问到的对象
      function fun() {
        const name = 'lg'
        return `${name} is a coder`
      }
      fun()
      // 不能再访问到了，当找不到他的时候，应该也算是垃圾了
    ```
  + GC算法
    - GC是一种机制，垃圾回收器完成具体的工作
    - 工作的内容就是查找垃圾释放空间、回收空间
    - 算法就是工作时查找和回收所遵循的规则
  + 常见的GC算法名称
    - 引用计数
    - 标记清除  
    - 标记整理
    - 分代回收


## 认识V8
  + V8是一款主流的JavaScript 执行引擎
  + V8采用即时编译
  + 内存设限
## V8引擎的垃圾回收
  ......

## 代码优化介绍
  + 慎用全局变量
  + 缓存全局变量
  + 通过原型对象添加附加方法
    [测试网站](jsperf.com/lgcoder) jsperf.com/lgcoder
  + 避开闭包陷阱
    **闭包特点：**
      外部具有指向内部的引用
      在外部作用域访问内部作用域的数据
      闭包使用不当很容易出现内存泄漏，不要为了闭包而闭包
    ```js
    function foo() {
      var name = 'lg'
      function fn() {
        console.log(name)
      }
      return fn
    }

    var a = foo()
    a()
    ```
  + 避免属性访问方法使用
## For循环优化
```js
var aBtns = document.getElementsByClassName('btn')

  for (var = 0; i < aBtns.length; i++) {
    console.log(i)
  }
  for (var i = 0, len = aBtns.length; i< len; i++) {
    console.log(i)
  }
  // len提前保存 执行效率要高
```
## 选择最优的循环方式

```js
  var arrList = new Array(1, 2, 3, 4, 5)

  arrList.forEach(function(item){
    console.log(item)
  }) // 性能是最优的

  for (var i = arrList.length; i; i--) {
    console.log(arrList[i])
  } //  性能第二

  for (var i in arrList) {
    console.log(arrList[i])
  }   // 最低，最耗性能（相对）
```
## 节点添加优化
  节点的添加操作必然会有回流和重绘
```js
  for(var i = 0; i < 10; i++) {
    var oP = document.creatElement('p')
    document.body.appendChild(oP)
  }

  const fragEle = document.creatDocumentFragment()
  for( var i = 0; i < 10; i++) {
    var oP = document.creatElement('p')
    oP.innerHTML = i
    fragEle.appendChild(oP)
  }

  document.body.appendChild(fragEle)
```
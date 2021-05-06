前端模块化
  传统开发常见问题，难以维护和不方便使用
  + 命名冲突和污染
  + 代码冗余，无效请求多
  + 文件件的依赖关系复杂

## 常见模块化规范
+ Commonjs 规范 （require）语言层面上的规范，语言上的超集
+ AMD 规范 （浏览器下的异步加载规范，define require）
+ CMD 规范 （整合了commonjs和amd，专门用于浏览器下异步家在规范 ）
+ ES modules 规范 (import, export , as, ) es6将模块化纳入标准

## 一、CommonJS 规范
+ 模块引用  require
+ 模块定义 export
+ 模块标识 id

### 1、 Nodejs与CommonJS
+ 任意一个文件就是一模块，具有独立作用域
+ 使用 require 导入其他模块
+ 将模块 ID 传入 require 实现目标模块定位

### 2、 module 属性
+ 任意js文件就是一个模块, 可以直接使用 module 属性
+ id： 返回模块标识符，一般是一个绝对路径
+ filename: 返回文件模块的对决路径
+ loaded： 返回布尔值，表示模块是否完成加载
+ parent： 返回对象存放调用当前模块的模块
+ children： 返回数据，存放当前模块调用的其他模块
+ exports： 返回当前模块需要暴露的内容
  - module.exports 与 exports 区别： 
    exports 指向module.exports 的内存地址
+ paths： 返回数据，存放不同目录下的 node_modules 位置

### 3、require 属性
  + 基本功能是读入并且执行一个模块文件
  + resolve：返回模块文件绝对路径
  + extensions: 依据不用后缀名执行解析操作
  + main：返回主模块对象

## 二、Node.js 与 CommonJS 
  ### 1、代码示例
 
  #### 1、使用 module.exports 与 require 实现模块导入与导 出
  #### 2、module属性几期常见信息获取
  #### 3、exports 导出数据及其与 module.exports 区别
  #### 4、CommonJS 规范下的模块同步加载
    ```js
      // 一、导入
      let obj = require('./m')
      console.log(obj) 

      // 二、module
       let obj = require('./m')

      // 三、exports
       let obj = require('./m')
      console.log(obj) 

      // 四、同步加载
      let obj = require('./m')
      console.log('01.js代码执行了') 

      let obj = require('./m')
      console.log(require.main == module)

    ```
  ### 2、模块分类及加载流程
  + 模块分类
    - 内置模块
    - 文件模块

  + 模块加载速度
   - 核心模块： Node 源码编译时写入到二进制文件中
   - 文件模块： 代码运行时，动态加载

  + 加载流程
    - 路径分析： 依据标识符确定模块位置
        路径标识符 确定目标模块位置
        非路径
    - 文件定位： 确定目标模块中具体的文件及文件类型
      +  项目下存在m1.js模块，导入时使用require('mi')语法
      +  m1.js -> m1.json -> m1.node
      +  查找 package.json 文件，使用JSON.parse() 解析
      +  main.js -> main.json -> main.node
      +  将index作为目标模块中的具体文件名称
    - 编译执行： 采用对应的方式完成文件的编译执行 
      + 将某个具体类型的文件按照相应的方式进行编译和执行
      + 创建新对象，按路径载入，完成编译执行
  + 缓存优化原则
    - 提高模块加载速度
    - 当前模块不存在，则经理一次完成加载流程
    - 模块加载完成后，使用路径作为索引进行缓存


## 三、内置模块值 VM
  创建独立运行的沙箱环境
## 四、Events
  + 通过 EventEmitter 类实现事件统一管理 
  + EventEmitter 常见 API
    - on: 添加当事件被触发时调用的回调函数
    - emit：触发事件，按照注册的序同步调用每个事件监听器
    - once：添加当时间在注册之后首次被触发时调用的回调函数
    - off： 移除特定的监听器 
## 五、Eventloop
  + 浏览器中的事件环  
    - 从上至下执行所有的同步代码
    - 执行过程中将遇到的宏任务与微任务添加至相应的队列
    - 同步代码执行完毕后，执行满足条件的微任务回调
    - 微任务队列执行完毕后执行所有满足需求的宏任务回调
    - 循环时间环操作
    - 注意： 没执行一个宏任务之后就会立刻检查微任务队列
  + Node 中的事件环
    - 队列说明：
      + timers: 执行 setTimeout 与 setInterval 回调
      + pending callbacks: 习性系统操作的回调， 例如 tcp udp
      + idle，prepare： 只有系统内部进行使用
      + poll： 执行 I/O 相关的回调
      + check： 执行setImmediate 中的回调
      + close callbacks： 执行close事件的回调
    - Nodejs 完整事件环
      + 执行不同代码，将不同的任务添加至相应的队列
      + 所有同步代码执行后会去执行满足条件微任务
      + 所有微任务代码执行后会执行timer队列中满足的宏任务
      + timer中的所有宏任务执行完成后就会一次切换队列
      + 注意： 在完成队列切换之前会先清空微任务代码
## 六、文件可读流
  时间和空间上提升效率，提高IO密集型问题
  readFile存在的问题：
  + 同步读取资源文件，用户需要等待数据读取完成
  + 资源文件最终一次性加载至内存，开销较大
  流处理数据的有事
  + 时间效率： 流的分段处理可以同时操作多个数据chunk
  + 空间效率： 同一时间流无须占据大内存空间
  + 使用方便： 流配合管理，扩展程序变的简单

  流的分类：
  + Readable: 可读流，能够实现数据的读取
  + Writeable：可写流，能够实现数据的写操作
  + Duplex： 双工流，即可读又可写
  + Tranform: 装换流，可读可写，还能实现数据转换

  流的特点：
  + Stream 模块实现了四个具体的抽象
  + 所有流都继承自 EventEmitter

  ### 文件可读流创建和消费
  ```js
    const fs = require('fs')

    let rs = fs.createReadStream('text.txt', {
      flags: 'r',  // 可读模式
      encoding: null,
      fd: null, 
      mode: 438,
      aotoClose: true, // 是否可自动关闭
      start: 0,
      // end: 3,// 结束
      highWaterMark: 2,// 每次读几个字节
    })

    rs.on('data', (chunk) => {
      console.log(chunk.toString())
      rs.pause() // 暂停
      setTimeout(() => {
        rs.resume()  // 重新打开
      }, 1000);
    })

    rs.on('readable', () => {
      // let data = rs.read()
      // console.log(data)
      let data 
      while((data = rs.read(2)) !== null) {
        console.log(data.toString())
      }
    })

    rs.on('open', (fd) => {
      console.log(fd, '文件打开了')
    })

    rs.on('close', (fd) => {
      console.log(fd, '文件关闭了')
    })
    let bufferArr = []

    rs.on('data', (chunk) => {
      bufferArr.push(chunk)
    })

    rs.on('end', (chunk) => {
      console.log('当数据被清空以后')
    })

    rs.on('error', (err) => {
      console.log('出错了')
    })
  ```

## 七、 文件可写流

## 八、控制写入速度： drain与写入速度

## 九、链表结构
  + 为什么不采用数组存储数据？
    
  + 数组缺点：
    - 数组存储数据的长度具有上限
    - 数组存在塌陷问题
  + 链表是一系列节点的集合
    - 每个节点都具有指向下一个节点的属性
  + 链表分类
    - 双向链表
    - 单向链表
    - 循环链表 
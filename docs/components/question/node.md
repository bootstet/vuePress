### 
Node.js 高级编程（核心模块、模块加载机制） 作业地址：

###
请完成下面几道简答题。

## 简答题

### 1.简述 Node.js 的特点以及适用的场景。
- 特点： 
  + Reactor模式，单线程完成多线程工作（单线程）
  + Reactor模式下实现异步IO、事件驱动（事件驱动架构）
  + Nodejs适用IO密集型高并发并发请求 （异步IO）
- 适用场景：
  + IO 密集型高并发请求 （Node.js作为中间层）提高吞吐量，很方便的处理数据
  + 操作数据库提供 API 服务
  + 实时聊天应用程序
-  作用：
  + 实现轻量级、高性能可扩展的Web服务
  + 前后端JavaScript同构开发
  + 实现便捷高效的前端工程化



### 2.简述 Buffer 的使用。包括多种创建方式。实例方法，静态方法。
  + 创建Buffer实例
    - alloc: 创建指定字节大小的buffer
    - allocUnsafe：创建指定管大小的Buffer
    - from：接受数据，创建buffer
  + Buffer实例方法
    - fill： 使用数据填充 buffer
    ```js
      let buf = Buffer.alloc(6)
      buf.fill('123')
    ```
    - write: 向buffer中写入数据
    - toString: 从buffer中提取数据
    - slice： 截取buffer
    - indexOf： 在buffer中查找数据
    - copy：拷贝buffer中的数据
  + Buffer 静态方法
    - concat: 将多个buffer拼接成一个新的buffer
    - isBuffer： 判断当前诗句是否为 buffer

### 3.写出5个以上文件操作的API，并且用文字说明其功能。
  - readFile: 从指定文件中读取数据
  - writeFile： 向指定文件中写入数据
  - appendFile：追加的方式想指定的文件中写入数据
  - copyFile： 将某个文件中的数据拷贝至另一文件
  - watchFile： 对指定文件进行监控 

### 4.简述使用流操作的优势，以及Node中流的分类。
  + 我们在读取资源时，采用readFile的方式的时候开销较大，因此采用流操作的优势有：
    + 时间效率： 流的分段处理可以同事操作多个数据chunk
    + 空间效率： 同一时间流无须占据大内存空间
    + 使用方便： 流配合管理，扩展程序变得简单
  + 流的分类： 
    + Readble：可读流，能够实现数据的读取
    + Writeable： 可写流，能够实现数据的写操作
    + Duplex：双工流，即可读又可写
    + Tranform： 转换流，可读可写，还能实现数据转换
  

### 5.在数据封装与解封装过程中，针对应用层、传输层、网络层、数据链路层、物理层5层分别做了什么事情？
  + 数据封装
    - 应用层： 在应用层，产出需要运输的数据 
            data
    - 传输层： 端口的作用用于在主机上确定一个主机的进程，数据在这层会被包裹上目标应用端口和运用在当前主机上的源端口，之后数据在传向网络层  
            目标端口 + 源端口 + data
    - 网络层： 因为我们的主机都处于不同的网络里，所以我们需要通过ip协议来确定目标目标主机所存在的网络，因此数据在这层上会被包裹上目标主机的ip地址和源ip地址。
          现在可以确定某一个网络，并不蹦确定在这个网络里的那台机器使我们需要的
            目标ip + 源ip + 目标端口 + 源端口 + data
    - 数据链路层： 通过mac地址完成寻址操作，所以在这层上数据会被包裹上目标主机的mac地址与当前主机的mac地址，至此一个完整信息的数据就封装OK了
            目标Mac + 源mac + 目标ip + 源ip + 目标端口 + 源端口 + data
    - 物理层：数据最终会转换二进制数据，而网线是不能识别二进制的，经过网卡调试成高低电压。
  + 解封装
    - 物理层： 有了以上这些数据以后，通过路由器的网络分配和传输截止的运输，最终到目标主机的网卡
            这个时候目标主机网卡会进行数据解调，将电压先变为二进制，然后在向上层传递至链路层
    - 数据链路层：这个时候会分析一下目标的mac地址是不是当前主机的mac地址，如果是就继续向上传递至网络层
    - 网络层： 在这一层看目标ip是否是当前主机的ip，如果是继续向上传递至传输层
    - 传输层： 这个时候在确定目标端口是否是自己，如果是再次拆解数据，向上传递至应用层
    - 应用层： 至此，当前网络的一个目标的一个应用就已经拿到了由另外一个网络的一台主机的应用所传递过来的数据。
## 代码题

### 1.统计指定目录中文件总大小。要考虑目录中还有子目录的情况。可以同步编码，异步更好。
  见code目录中 01-filesize中代码
  ```js
    const fs = require('fs')

    function readFile(url) {
      fs.access(url, (err) => {
        // 先判断目录是否具有权限
        if (err) return console.error(err)
        fs.stat(url, (err, statObj) => {
          console.log(statObj.size)
        })
      })
    }

    readFile('b')
  ```


### 2.编写单向链表类并且实现队列的入列出列操作。
  代码如下也可在code 目录下02-oneway-link中查看
  ```js
    /**
     * 链表结构  用来存放数据
     * 01 node + head + null
     * 02 head --> null
     * 03 size
     * 04 next element
     * 
     * 05 增加 删除 修改 查询 清空节点
     */

    class Node {
      constructor(element, next) {
        this.element = element
        this.next = next
      }
    }

    class LinkedList {
      constructor(head, size) {
        this.head = null
        this.size = 0
      }
      // 私有方法
      _getNode(index) {
        if(index < 0 || index >= this.size) {
          throw new Error('越界了')
        }
        let currentNode = this.head
        for (let i = 0; i <  index; i++) {
          currentNode = currentNode.next
        }
        return currentNode
      }
      add(index, element) {
        if (arguments.length === 1) {
          element = index
          index = this.size
        }
        if (index < 0 || index > this.size) {
          throw new Error('cross the border')
        }
        if (index === 0) {
          let head = this.head // 保存原有head的指向
          this.head = new Node(element, head)
        } else {
          let prevNode = this._getNode(index - 1)
          prevNode.next = new Node(element, prevNode.next)
        }
        this.size++
      }
      // 删除
      remove(index) {
        let rmNode = null
        // 判断删除的是开头
        if (index === 0) {
          rmNode = this.head
          if (!rmNode) {
            return undefined
          }
          this.head = rmNode.next
        } else {
          let prevNode = this._getNode(index - 1)
          rmNode = prevNode.next
          prevNode.next = rmNode.next
        }
        this.size--
        return rmNode
      }
      // 设置
      set(index, element) {
        let node = this._getNode(index)
        node.element = element
      }
      // 查询
      get(index) {
        return this._getNode(index )
      }
      // 清空
      clear() {
        this.head = null
        this.size = 0
      }
    }


    class Queue{
      constructor() {
        this.LinkedList = new LinkedList()
      }
      // 列入
      enQueue(data) {
        this.LinkedList.add(data)
      }
      // 列出
      deQueue() {
        return this.LinkedList.remove(0)
      }
    }

    const q = new Queue()
    q.enQueue('node1')
    q.enQueue('node2')

    let a = q.deQueue()
    a = q.deQueue()
    a = q.deQueue()

    console.log(a)
  ```

### 3.基于Node写出一静态服务器。接受请求并且相应特定目录（服务器目录）中的html、css、js、图片等资源。
  + 作业代码地址 [代码见github仓库](https://github.com/bootstet/cyzserver)

  + cyzserver已在npm发布 [npm地址](https://www.npmjs.com/package/cyzserver)
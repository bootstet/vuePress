网络通信基本原理
  抛开数据封装，从表象上来分析两台主机之间如果想完成通信，需要需要的条件
## 通信必要条件
  + 主机之间需要有传输介质 网线 光纤  蓝牙 wifi
  + 主机上必须有网卡设备 去完成信号的调制与解调制，将二进制数据转为高低电压的过程
  + 主机之间需要协商网络速率 两台主机的网卡在速率上不一样的，因此在传输的速率也是不一样的，因此在传输之前两台主机需要协商一下传速率
  ![Alt text](./image/com.png 'dsf')
## 常见通讯方式
  + 交换机通讯
    通过mac地址来唯一标识主机
    交换机的接口又上限
    局域网存在大量主机会造成广播风暴
  + 路由器
    - 明确主机ip地址
## 网络层次模型
  网络通信是一个复杂的工程，需要很多的基础硬件设备，会有很多厂商在进行生产，为了方便网络
  的维护，会有组织推出相应的行业规范，如osi 七层模型 tcp ip 四层模型
  + OSI 七层模型
    - 应用层： 用户与网络的接口
    - 表示层： 数据加密、转换、压缩
    - 会话层： 控制网络连接建立与终止
    - 传输层： 耦控制数据传输可靠性
    - 网络层： 确定膜标网络
    - 数据链路层： 确定目标主机
    - 物理层： 各种物理设备和标准
    
  + 数据从A至B，先封装在解封的过程
    tcp、ip五层划分模式
    + 数据封装
      - 应用层  （http协议），产出需要运输的数据，data
      - 传输层  （tcp和udp协议 针对端口的协议），目标端口，源端口，data
              端口的作用用于在主机上确定一个主机的进程，数据在这层会被包裹上目标应用端口
              和运用在当前主机上的源端口，之后数据在传向网络层
      - 网络层  目标ip、源ip、目标端口、源端口、data
            因为我们的主机都处于不用的网络里的，所以我们需要通过ip协议来确定目标主机所存在的网络，因此数据在
            这层上会被包裹上目标主机的ip地址和源ip地址。可以确定某一个网络，并不能确定在这个网络里那台机器使我们想要的
      - 数据链路层  目标mac 源mac、目标ip、源ip、目标端口、源端口、data
            通过mac地址完成寻址操作，所以在这层上数据会被包裹上目标主机的mac地址与当前主机的mac地址，至此一个
            完整信息的数据就封装ok了
      - 物理层  二进制数据
            网线是不能识别二进制的，经过网卡调适成高低电压，这里还是用二进制来表示。
    + 解封装
      - 物理层  有了这些数据以后，通过路由器的网络分配和传输介质的运输，最终到目标主机的网卡
          这个时候目标主机网卡会进行数据解调，将电压先变为二进制，然后在向上层传递至链路层
      - 数据链路层  这个时候会分析一下目标的mac地址是不是当前主机的mac地址，如果是继续想上传递至网路层
      - 网络层 在这一层看目标ip是否是当前主机的ip，如果是继续向上传递至传输层
      - 传输层  这个时候在确定下目标端口是否是自己，如果是再次拆解数据，向是向上传递至应用层
      - 应用层  至此，当前网络的一个目标的一个应用就已经拿到了由另外一个网络的一台主机的应用所传递过来的数据
    以上就是数据在通信过程中的封装与解封装的步骤
    
    ```mermaid
    graph TB
    a --> b
    
    ```
  + TCP 的三次握手和四次挥手
  + TCP 协议
    - TCP 属于传输层协议
    - TCP 是面向链接的协议
    - TCP 用于处理实时通信
    - tcp完整报文信息
     <!-- ![Alt](../../.vuepress/dist/node/tcp.png) -->

    - 常见控制字段
      + SYN = 1 表示请求建立链接
      + FIN = 1 表示请求断开链接
      + ACK = 1 表示数据信息确认
## 创建TCP通信
  + Net 模块实现了底层通信接口
    - 创建服务端： 接受和回写客户端数据
    - 创建客户端： 发送和接受服务端数据
    - 数据传输： 内置服务事件和方法读写数据
  + net 模块为通信特殊时间准备的特殊事件
    - listening 事件： 调用serve.listen 方法之后调用
    - connection 事件： 新的连接建立时触发
    - close 事件： 当serve关闭时触发
    - error 事件： 当错误出现的时候触发
  + net通信件的方法
    - data事件： 当接受数据时触发该事件，从可读流中拿数据的方法
    - write方法： 在 scoket 上发送数据，默认是 UT8 编码，可读流和可写流的集合
    - end操作： 当scoket的一段发送FIN包是触发，结束可读流
    
    
## Http协议

## 静态服务
 ```js
  const http = require('http')
  const url = require('url')
  const path = require('path')
  const fs = require('fs')
  const mime = require('mime')

  const server = http.createServer((req, res) => {
    console.log('请求进来了')
    // 1 路径处理
    let { pathname, query } = url.parse(req.url)
    pathname = decodeURIComponent(pathname)
    let absPath = path.join(__dirname, pathname)
    // console.log(absPath)
    // 2 目标资源状态处理
    fs.stat(absPath, (err, statObj) => {
      if(err) {
        res.statusCode = 404
        res.end('Not Found')
        return 
      }
      if (statObj.isFile()) {
        // 此时说明路径对应的目标是一个文件，可以直接读取然后回写
        fs.readFile(absPath, (err, data) => {
          res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
          res.end(data)
        })
      } else {
        fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
          res.setHeader('Content-type', mime.getType(absPath) + ';charset=utf-8')
          res.end(data)
        })
      }
    })
  })

  server.listen(1234, () => {
    console.log('server is start ...')
  })
 ```

## 静态服务工具
 + 

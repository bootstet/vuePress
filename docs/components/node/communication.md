网络通信基本原理
## 通信必要条件
  + 主机之间需要有传输介质
  + 主机上必须有网卡设备
  + 主机之间需要协商网络速率
## 常见通讯方式
  + 交换机通讯
    通过mac地址来唯一标识主机
    交换机的接口又上限
    局域网存在大量主机会造成广播风暴
  + 路由器
    - 明确主机ip地址
## 网络层次模型
  + OSI 七层模型
    - 应用层： 用户与网络的接口
    - 表示层： 数据加密、转换、压缩
    - 会话层： 控制网络连接建立与终止
    - 传输层： 耦控制数据传输可靠性
    - 网络层： 确定膜标网络
    - 数据链路层： 确定目标主机
    - 物理层： 各种物理设备和标准
    
  + 数据从A至B，先封装在解封
    tcp、ip五层划分模式
    - 应用层  tcp
    - 传输层  http
    - 网络层
    - 数据链路层
    - 物理层
    
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
     ![Alt](../../.vuepress/dist/node/tcp.png)

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

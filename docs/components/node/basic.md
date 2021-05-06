## node 基础

#### 1 node 实现api服务
```ts
  // console.log(11)
  // 需求： 希望有一个服务，可以依据请求的接口内容返回相应的数据
  import express from 'express'
  import { DataStore } from './data'
  console.log(DataStore.list)

  const app = express()
  app.get('/', (req, res) => {
    // res.end('1122')
    res.json(DataStore.list)
  })

  app.listen(8081, () => {
    console.log('服务已经开启')
  })
```

#### 2、全局对象
  全局对象是Javascrip中的特殊对象，全局对象可以看做是全局变量的宿主
  + 与浏览器平台的window不完全相同
  + Nodejs 全局对象上挂载许多属性

  ##### 1、Nodejs常见全局变量
    + __filename: 返回正在执行脚本文件的绝对路径
    + __dirname: 返回正在执行脚本所在目录
    + timer类函数： 执行顺序与事件循环间的关系
    + process： 提供与当前进程互动的接口
    + require： 实现模块的加载
    + module、exports： 处理模块的导出
  ##### 2、全局变量值 process
  + 无须 require 可直接使用
  + 获取进程信息
  + 执行进程操作
  ``` js
    // 1 资源: cpu 内存
    const fs = require('fs')
    Buffer.alloc(1000)
    // console.log(process.memoryUsage())
    // rss 常驻内存
    // heapTotal:总的内存
    // heapUsed: 实际使用内存
    // external: 扩展内存
    // arrayBuffers: 一片独立的内存，不占据V8内存
    console.log(process.cpuUsage()) 
    // 2 运行环境：运行目录、node环境、cpu架构、用户环境、系统平台
    console.log(process.cwd())// 当前的工作目录
    console.log(process.version)// 当前node版本
    console.log(process.versions)// 多一点的信息版本
    console.log(process.arch)// 本机操作系统
    console.log(process.env.NODE_ENV)// 环境信息
    console.log(process.env.path)// 本机环境变量
    console.log(process.env.USERPOFILE)// 本机设置关机元目录
    console.log(process.env.HOME)// 本机设置关机元目录(mac)
    console.log(process.platform)// 平台

    // 3 运行状态： 启动参数、PID、运行时间、
    console.log(process.argv) // 启动参数
    console.log(process.argv0)// 第一个参数 execArgv -- 参数
    console.log(process.pid)// 当前js程序运行过程中占据的唯一id  ppid
    console.log(process.uptime())// 运行时间   

    // 4 事件
    process.on('exit', (code) => {
      console.log('exit' + code)
      setTimeout(() => {
        console.log(123) // 不支持异步代码
      }, 100);
    })
    process.on('beforeExit', (code) => {
      console.log('beforeExit' + code)
      // 支持异步代码
    })

    console.log('代码执行完了')
    // process.exit()

    // 05 标准 输出 输入 错误
    console.log = function (data) {
      process.stdout.write('---' + data + '\n') // 流
    }

    // console.log(11)

    // fs.createWriteStream('text.txt')
    //   .pipe(process.stdout) // pipe 管道

    // process.stdin.pipe(process.stdout) // 标准输出

    process.stdin.setEncoding('utf-8') // 设置了字符编码 防止乱码
    // 监听是否可读，如果可读  把东西取出来，拿出来读出来
    process.stdin.on('readable', () => {
      let chunk = process.stdin.read() // 代码块去拿输入的一些东西，拿完以后做判断
      if (chunk != null) {
        process.stdout.write('data ' + chunk) // 输出相应内容
      }
    })
  ```

#### 3 path模块
 用于处理文件/目录的路径
  ##### 1、 path模块常用API
  + basename() 获取路径中的基础名称
    ```js
      /**
       * path路径的最后一个部分 第二个参数 有返回不带后缀的名字 没有 返回全部
      * 第二个参数表示客栈明，如果没有设置则返回完整的文件名称带后缀
      * 第二个参数作为后缀时， 
      */ 
      path.basename(__filename)  // 06-path.js
      path.basename(__filename, 'js')  // 06-path
      path.basename(__filename, 'css')  // 06-path.js
      path.basename('/a/b/c')  // c
      path.basename('/a/b/c/')  // c
    ```
  + dirname() 获取路径中的目录名称
    ```js
      /**
       * 01 返回路径中最后一个部分的上一层目录所在路径
      *
      */
      console.log(path.dirname(__filename)) // 目录的路径
      path.dirname('/a/b/c') // /a/b
      path.dirname('/a/b/c/') // /a/b
    ```
  + extname() 获取路径中扩展名称
    ```js
      // 01 返回 path 路径中响应文件的后缀名
      // 02 如果path路径中有多个点，它匹配最后一个点，到结尾的内容
      path.extname(__filename)  // .js
      path.extname('/a/b')  // 
      path.extname('/a/b/index.html.js.css')  // .css
      path.extname('/a/b/index.html.js.')  // .
    ```
  + parse() 解析路径
    ```js

      /**
       * 01 接受一个路径，返回一个对象，包含不同的信息
      * 02 root dir base ext name 
      */
      const obj = path.parse('/a/b/c/index.html')
      console.log(obj) //{root: '/', dir: '/a/b/c', base: 'index.html', ext: '.html', name: 'index'}
    ```
  + isAbsolute() 判断路径中是否为绝对路径
    ```js
      console.log(path.isAbsolute('foo')) // false
      console.log(path.isAbsolute('/foo')) // true
      console.log(path.isAbsolute('///foo')) // true
      console.log(path.isAbsolute('')) // false
      console.log(path.isAbsolute('.')) // false
      console.log(path.isAbsolute('../bar')) // false
    ```
  + join() 拼接多个路径片段
    ```js
      console.log(path.json('a/b', 'c', 'index.html')) // a\b\c\index.hmtl
      console.log(path.json('/a/b', 'c', '../', 'index.html')) // \a\b\index.hmtl
      console.log(path.json('/a/b', 'c', './', 'index.html')) // \a\b\c\index.hmtl
      console.log(path.json('/a/b', 'c', '', 'index.html')) // \a\b\c\index.hmtl
      console.log(path.json('')) // .
    ```
  + resolve() 返回绝对路径
    ```js
      /**
       * resolve([from], to) // 把to变为绝对路径
      * 
      */
      path.resolve() // 绝对路径 /Desktop/node/code
      path.resolve('/a', '/b') //  /b
    ```
  + format() 序列化路径
    ```js
      const obj = path.parse('./a/b/c')
      console.log(path.format(obj))

    ```
  + mormalize() 规范化路径
    ```js
      path.normalize('') // .
      path.normalize('a/b/c/d') // a/b/c/d 
      path.normalize('a///b/c../d') // a/b/c../d 
      path.normalize('a//\\/b/c\\/d') // a/b/c/d 
      path.normalize('a//\\b/c\\/d') // a/c/d 
    ```

#### 4、Buffer 是 Nodejs 的内置类
  是除process外的另一个重要的全局变量，Buffer缓冲区
  Buffer 让 Javascript可以操作二进制
  Buffer是什么？在哪？做什么？
  Nodejs平台下Javascript可实现IO，IO行为操作的就是二进制数据
  Stream 流操作并非 Nodejs 独创
  流操作配合管道实现数据分段传输
  数据的端到端传输会有生产者和消费者

  nodejs 中 buffer 是一片内存空间
  + node下的一个全局变量
  + 实现Nodejs平台下的二进制数据操作
  + 不占据V8堆内存大小的内存空间
  + 内存的使用由Node来控制，由V8的GC回收
  + 一般配合 Stream 流只用，充当数据缓存区


  ##### 1、创建Bugger实例
  + alloc： 创建指定字节大小的buffer
  + allocUnsafe： 创建指定管大小的Buffer（不安全）
  + from： 接受数据，创建buffer

  ##### 2、 Buffer实例方法
  + fill： 使用数据填充 buffer
    ```JS
      let buf = Buffer.alloc(6)
      buf.fill('123') // 123123

    ```
  + write： 向buffer 中写入数据
  + toString： 从buffer中提取数据
  + slice: 截取buffer
  + indexOf： 在buffer 中查找数据
  + copy： 拷贝 buffer 中的数据

  ##### 3、Buffer 静态方法
  + concat: 将多个buffer拼接成一个新的buffer
  + isBuffer： 判断当前数据是否为 buffer 

  ##### 4、自定义 Buffer 值 split
    ```js
      ArrayBuffer.prototype.split = function (sep) {
        let len = Buffer.from(sep).length
        let ret = []
        let start = 0
        let offset = 0

        while(offset = this.indexOf(seq, start) !== -1) {
          ret.push(this.slice(start, offset))
          start = offset + len 
        }
        ret.push(this.slice(start))
        return ret
      }
    ```

#### 5、 FS模块
+ fs是Nodejs中内置核心模块
+ 代码层面上fs氛围基本操作类和常用API
+ 权限位、标识符、文件描述

<!-- ![Alt](../../.vuepress/dist/node/fs.png) -->
  ##### 1、Fs模块结构
  + FS 基本操作类
  + FS 常用 API

  ##### 2、权限位、标识符、文件描述符

  + 权限位： 用户对于文件所具备的操作权限
    r 4 读
    w 2 写
    x 1 执行
    <!-- ![Alt](../../.vuepress/dist/node/rwx.png) -->
    
    
    <!-- ![Alt](../../.vuepress/dist/node/drwx.png) -->

    + flag表示对文件操作方式
      - r:表示可读
      - w:表示可写
      - s:表示同步 
      - +:表示执行相反操作
      - x:表示排它操作
      - a:表示追加操作

    + fd 就是操作系统分配给被打开文件的标识 

  ##### 3 文件读写与拷贝操作

  + 文件操作API
  - readFile: 从指定文件中读取数据
  - writeFile： 向指定文件中写入数据
  - appendFile：追加的方式想指定的文件中写入数据
  - copyFile： 将某个文件中的数据拷贝至另一文件
  - watchFile： 对指定文件进行监控

    ```js
      const fs = require('fs')
      const path = require('path')

      // readFile
      fs.readFile(path.resolve('data.txt'), 'utf-8', (err, data) => {
        console.log(err)
        if (!null) {
          console.log(data)
        }
      })

      // writeFile 覆盖的写操作 路径不存在，会创建一个操作

      fs.writeFile('data.txt', 'dfasf', {
        mode: 438,
        flag: 'r+',// 可读可写
        encoding: 'utf-8'
      }, (err) => {
        if (!err) {
          fs.readFile('data.txt', 'utf-8', (err, data) => {
            console.log(data)
          })
        }
      })

      // apendFile

      fs.appendFile('data.txt', 'hello node.js', (err) => {
        console.log('写入成功')
      })

      // // copyFile
      fs.copyFile('data.txt', 'test.txt', () => {
        console.log('拷贝成功')
      })

      // watchFile
      fs.watchFile('data.txt', {
        interval: 20
      }, (curr, prev) => {
        // curr 修改之后的文件  prev 修改之前的文件
        if (curr.mtime != prev.time) {
          console.log('文件被修改了')
          fs.unwatchFile('data.txt')
        }
      })
    ```

  ##### 5、文件操作实现 md 转 html


  ```js
    const fs = require('fs')
    const path = require('path')
    const marked = require('marked')
    const browserSync = require('browser-sync')

    /**
     * 01 读取 md 和 css 内容
     * 02 将上述读取出来的内容替换占位符，生成一个最终需要展的 Html 字符串 
     * 03 将上述的 Html 字符写入到指定的 Html 文件中
     * 04 监听 md 文档内容的变经，然后更新 html 内容 
     * 05 使用 browser-sync 来实时显示 Html 内容
     */

    let mdPath = path.join(__dirname, process.argv[2])
    let cssPath = path.resolve('github.css')
    let htmlPath = mdPath.replace(path.extname(mdPath), '.html')

    fs.watchFile(mdPath, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        fs.readFile(mdPath, 'utf-8', (err, data) => {
          // 将 md--》html
          let htmlStr = marked(data)
          fs.readFile(cssPath, 'utf-8', (err, data) => {
            let retHtml = temp.replace('{{content}}', htmlStr).replace('{{style}}', data)
            // 将上述的内容写入到指定的 html 文件中，用于在浏览器里进行展示
            fs.writeFile(htmlPath, retHtml, (err) => {
              console.log('html 生成成功了')
            })
          })
        })
      }
    })

    browserSync.init({
      browser: '',
      server: __dirname,
      watch: true,
      index: path.basename(htmlPath)
    })

    const temp = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title></title>
            <style>
                .markdown-body {
                    box-sizing: border-box;
                    min-width: 200px;
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 45px;
                }
                @media (max-width: 750px) {
                    .markdown-body {
                        padding: 15px;
                    }
                }
                {{style}}
            </style>
        </head>
        <body>
            <div class="markdown-body">
                {{content}}
            </div>
        </body>
        </html>
    `
  ```

  ##### 6、文件打开与关闭
    ```js 
      fs.open(path.resolve('data.txt'), 'r', (err, fd) => {
        console.log(fd)
      })
      // close
      fs.open('data.txt', 'r', (err, fd) => {
        console.log(fd)
        fs.close(fd, err => {
          console.log('关闭成功' )
        })
      })
      fs.close()
    ```

  ##### 7、大文件读写操作
    ```js
      const fs = require('fs')

      // read ： 所谓的读操作就是将数据从磁盘文件中写入到 buffer 中
      let buf = Buffer.alloc(10)

      /**
       * fd 定位当前被打开的文件 
       * buf 用于表示当前缓冲区
       * offset 表示当前从 buf 的哪个位置开始执行写入
       * length 表示当前次写入的长度
       * position 表示当前从文件的哪个位置开始读取
       */
      /* fs.open('data.txt', 'r', (err, rfd) => {
        console.log(rfd)
        fs.read(rfd, buf, 1, 4, 3, (err, readBytes, data) => {
          console.log(readBytes)
          console.log(data)
          console.log(data.toString())
        })
      }) */

      // write 将缓冲区里的内容写入到磁盘文件中
      buf = Buffer.from('1234567890')
      fs.open('b.txt', 'w', (err, wfd) => {
        fs.write(wfd, buf, 2, 4, 0, (err, written, buffer) => {
          console.log(written, '----')
          fs.close(wfd)
        })
      })
    ```
  ##### 8、文件拷贝自定义实现
    ```js
      const fs = require('fs')

      /**
       * 01 打开a文件，利用read 将数据保存到 buffer 中暂存起来
       * 02 打开 b 文件，利用 write 将 buffer 中数据写入到 b 文件中
       * 
       */ 

      let buf = Buffer.alloc(10)

      // 01 打开指定文件
      fs.open('a.txt', 'r', (err, rfd) => {
        // 02 从打开的文件中读取数据
        fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
          // 03 打开 b 文件，用于执行数据写入操作
          fs.open('b.txt', 'w', (err, wfd) => {
            // 04 将 buffer 中的数据写入到 b.txt 中
            fs.write(wfd, buf, 0, 10, 0, (err, written) => {
              console.log('写入成功')
            })
          })
        })
      })

      fs.open('a.txt', 'r', (err, rfd) => {
        // 03 打开 b 文件，用于执行数据写入操作
        fs.open('b.txt', 'w', (err, wfd) => {
          // 02 从打开的文件中读取数据
          fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
            // 04 将 buffer 中的数据写入到 b.txt 中
            fs.write(wfd, buf, 0, 10, 0, (err, written) => {
              console.log('写入成功')
            })
          })
        })
      })

      // 02 数据的完全拷贝
      fs.open('a.txt', 'r', (err, rfd) => {
        fs.open('b.txt', 'a+', (err, wfd) => {
          fs.read(rfd, buf, 0, 10, 0, (err, readBytes) => {
            fs.write(wfd, buf, 0, 10, 0, (err, written) => {
              fs.read(rfd, buf, 0, 5, 10, (err, readBytes) => {
                fs.write(wfd, buf, 0, 5, 10, (err, written) => {
                console.log('写入成功')
              }) 
            })
            }) 
          })
        })
      })

      const BUFFER_SIZE = buf.length
      let readOffset = 0

        
      fs.open('a.txt', 'r', (err, rfd) => {
        fs.open('b.txt', 'w', (err, wfd) => {
          function next () {
            fs.read(rfd, buf, 0, BUFFER_SIZE, readOffset, (err, readBytes) => {
              if (!readBytes) {
                // 如果条件成立，说明内容已经读取完毕
                fs.close(rfd, ()=> {})
                fs.close(wfd, ()=> {})
                console.log('拷贝完成')
                return
              }
              readOffset += readBytes
              fs.write(wfd, buf, 0, readBytes, (err, written) => {
                next()
              })
            })
          }
          next()
        })
      })
    ```
  ##### 9、FS之目录操作 API
    + access：判断文件活目录是否具有操作权限
      ```js
        fs.access('a.txt', (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('有操作权限')
        }
      })
      ```
    + stat：获取目录及文件信息
      ```js
        fs.stat('a.txt', (err, statObj) => {
          console.log(statObj.size)
          console.log(statObj.isFile())
          console.log(statObj.isDirectory())
        })
      ```
    + mkdir： 创建目录
      ```js
        fs.mkdir('a/b/c', {recursive: true}, (err) => { // 父级目录是存在的  recursive 递归创建
        if (!err) {
          console.log('创建成功')
        } else {
          console.log(err)
        }
      })
      ```
    + rmdir：删除目录
      ```js
        // 4 rmdir // 默认删除空目录  basename recursive: 删除费空目录
        fs.rmdir('a', {recursive: true}, (err) => {
          if (!err) {
            console.log('删除成功')
          } else {
            console.log(err)
          }
        })
      ```
    + readdir： 读取目录中的内容
      ```js
        fs.readdir('a', (err, files) => {
          console.log(files)  // [ 'a.txt', 'b' ]
        })

      ```
    + unlink； 删除指定文件
      ```js
        fs.unlink('a/a.txt', (err) => {
          if (!err) {
            console.log('删除成功')
          }
        })
      ```
  ##### 10、创建目录之间同步实现
    ```js
      const fs = require('fs')
      const path = require('path')

      /**
      * 01 将来调用时需接受类似于 a/b/c, 这样的路径，它们时间是采用 / 去链接
      * 02 利用 / 分隔符将路径进行拆分，将每一项放入一个数组中进行管理 ['a', 'b', 'c']
      * 03 对上述的数组进行遍历，我们需要拿到每一项，然后与前一项进行拼接 / 
      * 04 判断一下当前对拼接之后的路径是否具有可操作性的权限，如果有则证明存在，否则的话就需要执行创建
      */
      function makeDirSync (dirPath) {
        let items = dirPath.split(path.sep)
        for (let i = 1; i <= items.length; i++) {
          let dir = items.slice(0, i).join(path.sep)
          try {
            fs.accessSync(dir)
          } catch (err) {
            fs.mkdirSync(dir)
          }
        }

      }

      makeDirSync('a/b/c')
    ```

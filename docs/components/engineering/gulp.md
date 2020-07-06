## gulp的基本使用
  在项目根目录文件下，新建gulpfile.js
  通过导出方法定义gulp方法
  ```
    # 初始化项目
    yarn init
    # 安装项目
    yarn add gulp --dev
    # 运行相关gulp命令
    yarn gulp foo
  ```

  > gulp 4.0 以前借助task模块来实现,4.0以后也可以这么用，不推荐
  ```js
    gulp.task('bar', done => {
      console.log('bar working~')
      done()
    })
    // 推荐这么写
    exports.default = done => {
      console.log('default task working~~')
      done()
    }
  ```
## gulp组合任务
+ series 串行
+ parallel 并行


## gulp异步任务

  ```js
    const fs = require('fs')
    // gulp 异步zhixing
    exports.callback = done => {
      console.log('callback task~~')
      done()
    }

    exports.callback_error = done => {
      console.log('callback task~~')
      done(new Error('task failes!'))
    }

    exports.promise = () => {
      console.log('promise task~~')
      return Promise.resolve()
    }

    exports.promise_error = () => {
      console.log('promise task~~')
      return Promise.reject(new Error('task failed~'))
    }

    const timeout = time => {
      return new Promise(resolve => {
        setTimeout(resolve, time)
      })
    }

    // promise的语法糖 gulp支持的异步处理的方式 
    exports.async = async () => {
      await timeout(1000)
      console.log('async task~')
    }

    // gulp中stream 处理文件方式
    exports.stream  = done => {
      // 读取文件流
      const readStream = fs.createReadStream('package.json')
      // 写入文件流
      const writeStream = fs.createWriteStream('temp.txt')
      // 把readStream注入到writeSteam中
      readStream.pipe(writeStream) // 文件复制的作用 结束的时机end时机
      // 复制文件结束的过程中监听end事件，在end的时候处理 done()函数
      readStream.on('end', () => {
        done()
      })
      return readStream
    }

  ```
## gulp 构建过程核心工作原理
  读取（读取文件） => 加工（压缩文件） => 输出(写入文件)
  ```js
    const fs = require('fs')
    const { Transform } = require('stream')

    exports.default = () => {
      // 文件读取流
      const read = fs.createReadStream('nomalllize.css')
      // 文件写入流
      const write = fs.createWriteStream('nomalllize.min.css')
      // 文件转换流
      const transform = new Transform({
        transform: (chunk, encoding, callback) => {
          // 核心转换过程实现
          // chunk => 读取流中读取到的内容(Buffer)
          const input = chunk.toString()
          const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g,'')
          callback(null, output)
        }
      })

      // 把读取出来的文件流导入写入文件流
      read
      .pipe(transform)
      .pipe(write)
      return read  
    }
  ```
## gulp 文件操作API + 插件的使用
  ```js
    // gulp 核心文件操作api
    const { src, dest } = require('gulp')
    const cleanCss = require('gulp-clean-css')
    const rename = require('gulp-rename')


    // src 创建读取流 dest 写入流
    exports.default = () => { 
      src('src/*.css')  // * 表示文件目下所有css文件
        .pipe(cleanCss()) // 转换流压缩css文件
        .pipe(rename({ extname: '.min.css' }))  // extname 重命名的扩展名
        .pipe(dest('dist'))
    }
  ```
## 具体项目建github地址 [gulp](https://github.com/bootstet/gulp-bootstet-awesome)
  > [笔记链接： 创建项目具体步骤及所用插件](../question/engineering.md)

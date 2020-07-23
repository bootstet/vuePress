## 一、 简答题

### 1 Webpack的构建流程主要有哪些环节？如果可以请尽可以详尽的描述Webpack打包的整个过程。
+ 1 在项目中安装webpack依赖，npm install webpack --dev
+ 2 创建webpack.config.js文件，并对其进行相关的配置
  ```js 
    module.exports = {
      mode: 'none',        // webpack工作模式
      entry: './src/index.js',   // 入口路径  相对路径 ./ 不能圣罗
      output: {                 // 输入文件位置
        filename: 'bundle.js',       // 输出文件名称
        path: path.join(__dirname, 'dist'),     // 输出文件目录 必须是一个绝对路径 __dirname 为当前文件所在路径
        publicPath: 'dist/',      // 打包的文件最终在网站的位置
      },
      devtool: 'source-map',    // eval
      devServer: {                  // dev 开发配置
        // contentBase: './public',   // 静态输出文件
        proxy: {                    // 代理配置
          '/api': {
            // http://localhost:8080/api/users  -> https://api.github.com/api/users
            target: 'https://api.github.com',      //代理的接口请求
            pathRewrite: {
              '^api': '',
            },
            // 不能使用localhost:8080 作为请求 Github 的主机名
            changeOrigin: true
          }
        },
        // hot: true
        hotOnly: true // 代码中出现错误时，不会覆盖错误
      },
      module: {             // 打包模块文件
        rules: [
          {
            test: /.(js)$/,         // js在加载器为babel-loader
            use: {
              loader: 'babel-loader' ,    // 打包的时候处理es新特性 
              options: {
                presets: ['@babel/preset-env/']
              }
            }  
          },
          {
            test: /.css$/,
            use: [
              'style-loader',   // 将ccss的loader加载到文件中
              'css-loader'
            ]
          },
          {
            test: /.(png|jpg)$/,
            // use: 'file-loader'      // 处理文件加载
            // use: 'url-loader'         // 把文件以代码的形式 图片=> base 64
            use: {
              loader: 'url-loader',               // >- 小文件使用Data Urls，减少请求次数
              options: {                          // 大文件单独提取存放，提高加载速度
                limit: 10 * 1024,   // 10kb      // urlloader 只会将10kb以下的文件转换为dataUrl 大于10kb的交给file-loader
                                                // 次方法需要配套安装file-loader
              }
            }
          },
          {
            test: /.html$/,             // 默认只会处理img标签的sec属性
            use: {
              loader: 'html-loader',
              options: {
                attributes: false
                // sttrs: ['img:src', 'a:href']   // html在加载的时候，对一些额外的属性做一些处理
              }
            }
          },
          {
            test: /.md$/,
            use: './markdown-loader'
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin({
          title: 'webpack Plugin Sample',
          meta: {
            viewport: 'width=decice-width'
          },
          template: './src/index.html'
        }),      // 每次打包前清除dist目录下的文件
        new HtmlWebpackPlugin({
          title: 'webpack Plugin Sample',
          meta: {
            viewport: 'width=decice-width'
          },
          template: './src/index.html',
          chunks: ['index']   // 每个打包独立生成自己独立的chunks文件
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    }
  }
  ```
+ 3 设置打包入口文件和打包生成的文件目录， input  output
  > webpack在启动后会从配置的input路径文件中开始解析依赖的所有module，根据module.rules里配置的Loader规则进行相应的转换处理，对module进行转换。转换后输出module。
  > 然后webpack会一次执行相应的生命周期，在相应钩子执行相应的插件函数

### 2 Loader和Plugin有哪些不同？请描述一下开发Loader和Plugin的思路。
+ Loader是实现资源模块加载，实现整体项目的打包
+ plugin 是增强Webpack自动化能力，解决项目中自动化工作
  + 自动清除dist目录
  + 拷贝静态we年至输出目录
  + 压缩打包输出的代码
+ 开发loader：导出一个函数，这个函数主要做的事情就是，对资源一个处理过程。这个函数在拿到资源加载内容（source）以后，然后经过这个函数加工以后返回值输出出去。导出的文件必须是javascript代码。一个类似管道的原理。然后在config配置里rules配置相关的loader。
+ 开发plugin思路： 在webpack钩子中去挂载相应的任务，插件一般是一个函数，或者是一个包含apply方法的对象，定义一个类型，在这个类型定义一个apply方法，然后在使用时定义一个这个类型的实例去使用。插件中通过compiler.hooks访问webpack中的钩子，找到相应的钩子在相应的方法中去做自己的事。
  ```js
    complier.hooks.emit.tap('MyPlugin', compilationn=> {    //第一个参数就是我们插件名称，第二个参数是我们挂载在这个钩子中的函数 参数是此次打包的上下门
      // compilation 是一个对象，
      for(const name in compilation.assets) {
        if (name.endWith('.js')) {

        }
      }

    })
  ```

## 二、 编程题
  见code/路径下代码[也可访问github](https://github.com/bootstet/vue-webpack-base) ，项目说明见readme
 


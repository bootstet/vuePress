## Webpack 打包 
  + 新特性代码编译
  + 模块化 JavaScript 打包
  + 支持不同类型的资源模块
## 前端打包工具
  + Webpack (前端整体的模块化)
    + 模块打包器（Modele bundler)   零散的打包到一起
    + 模块加载器（Loader）  转换有兼容问题的代码
    + 代码拆分（Code Splitting）  按照我们的需要去拆分打包
    + 资源模块（Asset Module)   
## Webpack 快速上手    
  + webpack 4.0 版本以后支持零配置快速打包
    >'src/index.js' -> 'dist/main.js'
  + webpack工作模式 [官方文档](https://webpack.js.org/configuration/mode/) 也可在配置文件中设置
    >- webpack --mode production   打包成压缩后的代码
    >- webpack --mode development  打包成带注释的兼容性强方便调试
    >- webpack --mode none     Opts out of any default optimization options
  + Webpack 导入资源模块文件资源加载器 设置 publicPath 打包文件所处的路径
  + Webpack URL 加载器，base64转换成二进制文件，不用再去http请求，
    >- 使用代码的形式表示任何形式的文件 url-loader
    >- 小文件使用Data Urls，减少请求次数
    >- 大文件单独提取存放，提高加载速度
  + Webpack 常用加载器分类 
    >- 编译转换类 css-loader  将css文件代码转换为bundle中的一个模块，然后通过javascript运行css代码
    >- 文件操作类 file-loader url-loader 将文件拷贝到输出的目录，同事将文件的访问路径向外导出
    >- 代码检查类 lint

  + babel-loader es5 转换为 es6
    >- webpack 只是打包工具 要用加载器来编译代码
    >- babel-loader  @babel-core  @babel/preset-env  模块\

  + webpack加载资源的方式
    >- 遵循ES Module是标准的import声明
    >- 遵循Common JS 标准的 require函数
    >- 遵循AMD标准的define函数和require函数
    >- 样式代码终中的@import 指令和url函数
    >- HTML 代码中图片标签的src属性
## webpack插件机制  Plugin解决其他自动化工作 loader负责资源模块加载
  - 清除dist目录
  - 拷贝静态文件到输出目录
  - 压缩输出代码
  
## 常用插件
  + clean-webpack-plugin  
  + html-webpack-plugin 自动生成使用bundle.js的html
  + copy-webpack-plugin 输出打包静态文件

## webpack 理想开发体验
  + 1、以HTTP服务运行   Webpack Dec Server    browser-sync dist --files '**/*'
    > 直接运行Webpack Dec Server命令，将自动打包编辑，并开启http服务去运行文件
  + 2、自动编译+自动刷新
    > webpack dev server --open 
    > 代理api
    > 主机名是HTTP协议中的相关概念
  + 3、以Source Map支持
    > webpack 配置 Source Map devtool: 'source-map'
    > eval模式下的Source Map  eval('console.log(123) //# sourceURL=./foo/bar.js')  

## Webpack 自动刷新的问题
    > 在页面不刷新的情况下，更新代码
  + Webpack HMR 模块热替换
    ```js
      devServer: {
        hot: true   // 打开hot配置
      },
      plugins: [
        // 添加hot插件 
        new webpack.HotModuleReplacementPlugin()
      ]
    ```
  + css热替换开箱即用，js需使用HMR API
    ```js
      // 在页面的打包入口文件 index.js 使用api
      hmr api 给moudele提供了一个hot api，accept对象
      // accept 依赖模块的路径，依赖模块处理的函数
      module.hot.accept('./heading.js', () => {
        console.log('heading模块更新了')
      })
    ```
  + 图片模块热替换
    ```js
      module.hot.accept('./qianqian.png', () => {
        img.src = background
        console.log('background')
      })
    ```
## wabpack不同环境下的配置
+ 配置文件根据管径不同导出不同的配置

+ 一个环境对应一个配置文件

## Tree Shaking  生产模式自动开启
 
 ```js
  optimization: {
    useExports: true,  // 只导出使用到的代码    标记枯树枝
    minimize: true，      // 未引用的代码都被移除到了  摇掉枯树枝
    concatenateModules: true  // 尽可能将所有模块合并输出到同一个模块中
  }
 ```
## 代码分割 Code Splitting
  + 多入口打包
  ``` js
  // 多入口，不是数组，数组说明多个文件打包成一个文件里 
    entry: {
      index: './src/index.js',
      ablum: 'src/ablum.js',
    },
    output: {
      filename: '[name].bundle.js'
    }

    // 避免一个文件引入多的js文件
    new HtmlWebpackPlugin({
      title: 'webpack Plugin Sample',
      meta: {
        viewport: 'width=decice-width'
      },
      template: './src/index.html',
      chunks: ['index']   // 每个打包独立生成自己独立的chunks文件
    }),
  ```
## 按需加载 需要用到某个模块时，在加载这个模块 （动态导入） 动态导入的模块会被自动分包
  ```js
    // esmodules   模块对象 webpackChunkName魔法注释
    import(/* webpackChunkName: 'posts' */'./posts/posts/') .then(({defatule： posts}) => {
        // do something
      })
  ```
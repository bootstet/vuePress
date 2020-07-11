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
    >- 编译转换类 css-loader  将css文件代码转换为bundle中的一个模块
    >- 文件操作类 file-loader 将文件拷贝到输出的目录

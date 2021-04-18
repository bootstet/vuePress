## cyzserver

使用node开发一个自己的node小工具，用于搭建静态服务 

+ [npm-link](https://www.npmjs.com/package/cyzserver)
+ [github-link](https://github.com/bootstet/cyzserver)
### 主要步骤
+ 使用 node http模块开启静态服务
+ 启动web服务
+ 处理文件文件资源
+ 处理目录资源：node fs模块
+ 模板数据渲染： 使用ejs包工具，渲染数据到模板html

### Installation
  You need node.js and npm, You should probable install this globally.
### Npm way
  ```
    npm install cyzserver -g
  ```
### Manual way
```
  git clone https://github.com/bootstet/cyzserver.git
  # cd [your directory]
  npm install # Local dependencies if you want to hack
  npm install -g # Install globally
```

### command line

+ -p port  端口号 example: -p 4000  (default port: 1234)
+ -d dirctory 启动文件目录 example: -d c/ : c盘


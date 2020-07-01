#### yeoman的基本使用
  ```
    # 全局安装yo模块
    yarn global add yo 
    # 安装genetator-node 模块
    yarn global add generator-node
    # 去相应文件夹建立相应生成器 生成什么模块  generator yo后面的名字
    yo node
  ```

#### sub generator
  ```
    yo node:cli
  ```
  重写packjson 文件 yes
  ```
    yarn link  // link到全局范围 全局可用

    yarn // 安装操作

    yeoman --help  // 运行模块
  ```

#### yeoman使用  步骤
  + 明确你的需求
  + 找到合适的Generator
  + 全局范围安装找到的Generator
  + 通过Yo运行对应的Generator
  + 通过命令行交互添加选项
  + 生成你所需要的项目结构

#### 创建Generator
  + generator需要在根目录下有一个generator文件夹
    ├── generators/       .......... 生成器目录
    │   └── app/      .............. 默认生成器目录
    │    └── index.js    ........... 默认生成器实现
    └── package.json  .............. 模块包配置文件 
  + generator-<name>
  + 具体演示
    ```
      mkdir genarator-sample
      
      cd generator-sample\

      yarn init

      yarn add yroman-generator // 基类

      // 打开目录 创建app/index.js
      // index.js

      

    ```
    ```js
      // 此文件作为 Generator 的核心入口
      // 需要导出一个继承自 Yeoman Generator 的类型
      // Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
      // 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入
      const Generator = require('yeoman-generator')

      module.exports = class extands Generator {
        writing() {
          // yeoman 自动在生成问价阶段调用次方法
          // 我们这里尝试往项目目录中写入文件
          this.fs.write(
            this.destinationPath('temp.txt'),
            Math.random().toString()
          )
        }
      }
    ```
#### 根据模板创建文件 

  通过this.fs.copyTpl(tmpl, output, context) 去生成和模板语法规定好的文件，详见github上demo代码[github](https://github.com/bootstet/generator-sample)

#### 接受用户输入
  通过prompting () 方法
  详细配置用法说明见[github](https://github.com/bootstet/generator-sample)
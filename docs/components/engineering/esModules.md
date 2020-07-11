## 模块化开发与规范化标准
  > node commonjs
  > 浏览器 ES modules

### ES-module 基本特性
  + ESM 自动采用严格模式，忽略'use strict'
  + 每个ESM模块都是单独的私有作用域
  + ESM是通过CORS去请求外部JS模块的
  + ESM的script标签会延迟执行脚本
### ES-module 导入
  导出 export 
  导入 import
  ```js
    export { 
      name as default, // 重命名，导入的时候需导入重命名之后的变量名
      foo as fooo, 
      Person
      }
    // 导出的时候 {} 是固定的用法，并不是导出一个对象
    export default name
    import {default as name} from ''
    import name from ''
    // from后必须是完整路径名，不能简写 import 项目路径 ./也不能省略  如果省略它会以为这是第三方的的模块  
    //  / 根目录文件下去找文件领
    // import {} from './module.js' 是指执行，不引用
    // import './mudile.js'
    // import * as mod from './module.js' // 模块内人成员很多时，一次性全部导入，并用mod.xx 方式与引用
    //  import('./modules.js')返回一个promise
    // export {foo, bar} from './module.js' 直接导出导入的成员 
    import('./module.js').then(function(module){
      console.log(module)
    })
    import {name, age, defult as rename} from './module.js'
    import rename, {name, age} from './module.js'
  ```

  导入注意事项；
  >+ rom后必须是完整路径名，不能简写 import 项目路径 ./也不能省略  如果省略它会以为这是第三方的的模块
  >+ import './module.js' 是指执行，不引用
  >+ import * as mod from './module.js' // 模块内人成员很多时，一次性全部导入，并用mod.xx 方式与引用
  >+ 导入路径是一个变量时，不能用import，需动态导入

### ES Module in node
  处于过度状态
  + ES Modules中可以导入CommonJS 模块
  + CommonJs 中不能导入ES Modules模块
  + CommonJS 始终只会导出一个默认成员
  + 注意import不是解构导出对象
  > node --experimental-modules [file]
  

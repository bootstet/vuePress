## 简答题

### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
   工程化是指按照一定的标准和规范，通过工具去提高效率降低成本的一种手段。随着前端的的业务逻辑日益复杂，前端开发人员的要求也在不断提高，使用工程化可以解决一下问题：
  + 系统的整齐的去构建项目目录结构，使用ES6新特性，通过babel解决es6兼容问题
  + 可以使用less/sass/postCss等，增强CSS编程性
  + 使用模块化、组件化提高项目的可维护性
  + 通过eslint、csslint等工具检查代码语法，提高代码可读性和维护性，规范代码写法，提高代码质量
  + 提前编写好部署文件，一键自动化部署、压缩、打包等多步步骤，避免手动的上传，重复的机械式工作
  + 开发阶段脱离对后端的依赖，通过本地服务器和mock功能，我们只需后端提前提供接口文档即可开发，缩短项目周期。
  
### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
  + 工程化项目，提高开发效率、降低成本、保证质量。
  + 节省项目开发搭建工程的成本，不必从良开始发件初始项目。
  + 和项目开发的学习成本，便于多人协作。
  + 更新同步方便，只需更新代码库中的项目模板，即可下载最新的项目。

## 编程题
  ### 1、概述脚手架实现的过程，并使用NodeJS完成一个自定义的小型脚手架工具

  ### 2、尝试使用Gulp完成项目的自动化构建

   [作业github项目地址](https://github.com/bootstet/gulp-bootstet-awesome)
  #### ****项目构建流程****
  + 1 样式编译 使用gulp-sass插件
    ```js
      // src 创建读取流 dest 写入流
      // _ 默认为依赖css 不会打包
      const style = () => {
        return src('src/assets/styles/*.scss', { base: 'src'}) // base src下文件打包
          // .pipe(sass())  
          .pipe(plugins.sass({ outputStyle: 'expanded' })) // sass 完全展开  
          .pipe(dest('dist'))
          .pipe(bs.reload({stream: true})) // 以流的方式向浏览器中推
      }
    ```
  + 2 js编译 gulp-babel 需安装@babel/core @babel/preset-env
      ```js
        const script = () => {
          return src('src/assets/scripts/*.js', { base: 'src'})
            // .pipe(babel())  // 唤起过程，需要安装转换模块 @babel
            .pipe(plugins.babel({ presets : ['@babel/preset-env']}))  // 唤起过程，需要安装转换模块 @babel
            .pipe(dest('dist'))
        }
      ```
  + 3 html编译 gulp-swig
    ```js
      const page = () => {
        return src('src/**/*.html', {base: 'src'})  // src下所有子目录中的html文件
          .pipe(plugins.swig({
            defaults: {
              cache: false  // 更改页面后，页面不缓存
            }
          }))
          .pipe(dest('dist'))
      }
    ```
  + 4 图片和文字编译 gulp-imagemin
    ```js
      const image = () => {
        return src('src/assets/images/**', {base: 'src'})  // src下所有文件
          .pipe(plugins.imagemin())
          .pipe(dest('dist'))
      }

      const font = () => {
        return src('src/assets/fonts/**', {base: 'src'})  // src下所有文件
          .pipe(plugins.imagemin())
          .pipe(dest('dist'))
      }
    ```
  + 5 其他额外文件编译
    ```js
      const extra = () => {
        return src('public/**', {base: 'public'})
          .pipe(dest('dist'))
      }
    ```
  + 6 文件清除 del 插件
    ```js
      const clean = () => {
        return del(['dist'])
      }
    ```
  + 7 自动加载插件 gulp-load-plugins
    ```js
      const loadPlugins = require('gulp-load-plugins')  // 插件替换

      const plugins = loadPlugins()
    ```
  + 8 本地开发服务器及开发环境下监听热更新，分别用到gulp-watch 和browser-sync 插件
    ```js
      const serve = () => {
        // 第一个参数通配符   第二个参数监听执行的任务
        watch('src/assets/styles/*.scss', style)
        watch('src/assets/scripts/*.js', script)
        watch('src/**/*.html', page)
        // watch('src/assets/fonts/**', font)
        // watch('src/assets/images/**', image)
        // watch('public/**', extra)

        // 这些文件变化后，执行bs.reload（browser） 刷新浏览器
        watch([
          'src/assets/fonts/**',
          'src/assets/images/**',
          'public/**'
        ], bs.reload)


        // watch 会自动监听相应通配符下路径的文件，一旦发生变化，就会执行相应的任务
        // 执行相应的任务以后，相应目录的文件夹的文件就会发生变化，
        // browser 就会监听并做出相应的热更新
        bs.init({
          notify: false,  // 页面提示（右上角）
          port: 2080,       // 启动的端口
          open: true,         // 自动打开浏览器
          files: 'dist/**',    // browder 启动监听的文件路径通配符  这里也可以不使用，可以用bs.reload()方式代替其功能，在具体的每个任务后用pipe的方式，把文件流推入浏览器中
          server: {
            // baseDir: 'dist',
            baseDir: ['dist', 'src', 'public'],  // 开发服务器的根目录，入口文件  先去数组中，第一个找不到一个依次往后找
            routes: {   // 先去routers看，先走routes的配置
              '/node_modules': 'node_modules'
            }
          }
        })
      }
    ```
  + 9 文件压缩  gulp-uglify gulp-cleanCss gulp-htmlmin
    ```js
      const useref = () => {
        return src('dist/*.html', {base: 'dist'})
          .pipe(plugins.useref({ searchPath: ['dist', '.'] })) // 将注释之内的引用安装到本地
          // 文件压缩 html js css
          .pipe(plugins.if(/\.js$/, plugins.uglify())) // 判断以js结尾的文件，执行uglify压缩文件
          .pipe(plugins.if(/\.css$/, plugins.cleanCss())) // 判断以js结尾的文件，执行uglify压缩文件
          .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
          
          }))) // 判断以js结尾的文件，执行uglify压缩文件
          
          .pipe(dest('dist'))
        }
    ```



  
  ### 3、使用Grunt完成项目的自动化构建

  

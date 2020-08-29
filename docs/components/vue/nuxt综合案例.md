
### 1 Nuxt.js 综合案例
#### 介绍
+ GitHub仓库：https://github.com/gothinkster/realworld
+ 在线示例：https://demo.realworld.io/#/
+ 接口文档：https://github.com/gothinkster/realworld/tree/master/api
+ 页面模板：https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md
#### 创建项目
```
# 创建项目目录
mkdir realworld-nuxtjs
# 进入项目目录cd
 realworld-nuxtjs
# 生成 package.json 文件
npm init -y
# 安装 nuxt 依赖
npm install nuxt
```
在package.json中添加启动脚本：
```javascript
  "scripts": {
    "dev": "nuxt"
  }
```
创建pages/index.vue：
```javascript
<template>
  <div><h1>Home Page</h1></div>
</template>
<script>
  export default {
    name: 'HomePage'
  }
</script>
<style>
</style>
```
启动服务：
```javascript
    npm run dev
```
在浏览器中访问http://localhost:3000/测试。
#### 导入样式资源

  见github、仓库文档
#### 登录注册
实现基本登录功能
封装请求方法
表单验证
错误处理
用户注册
存储用户登录状态
（1）初始化容器数据

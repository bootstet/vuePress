
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
（2）登录成功，将用户信息存入容器importaxiosfrom'axios'constrequest=axios.create({baseURL: 'https://conduit.productionready.io/'})exportdefaultrequestimportVuefrom'vue'importVuexfrom'vuex'Vue.use(Vuex)exportdefault () => {returnnewVuex.Store({state: {user: null    },mutations: {setUser (state, user) {state.user=user      }    },actions: {}  })}this.$store.commit('setUser', data.user)
（3）将登录状态持久化到 Cookie 中安装 js-cookie
（4）从 Cookie 中获取并初始化用户登录状态安装 cookieparserstore/index.js处理页面访问权限middleware/auth.jsmiddlewares/not-auth.jsnpm i js-cookieconstCookie=process.client?require('js-cookie') : undefinedCookie.set('user', data.user)npm i cookieparseractions: {nuxtServerInit ({ commit }, { req }) {letuser=nullif (req.headers.cookie) {// 将请求头中的 Cookie 字符串解析为一个对象constparsed=cookieparser.parse(req.headers.cookie)try {// 将 user 还原为 JavaScript 对象user=JSON.parse(parsed.user)      } catch (err) {// No valid cookie found      }    }commit('setUser', user)  }}exportdefaultfunction ({ store, redirect }) {// If the user is not authenticatedif (!store.state.user) {returnredirect('/login')  }}
在需要判断登录权限的页面中配置使用中间件。首页模块展示公共文章列表封装请求方法：获取数据：模板绑定：exportdefaultfunction ({ store, redirect }) {// 已登录状态不允许访问if (store.state.user) {returnredirect('/')  }}exportdefault {...middleware: ['auth']}importrequestfrom'@/utils/request'// 获取文章列表exportconstgetArticles=params=> {returnrequest({method: 'GET',url: '/api/articles',params  })}asyncasyncData () {const { data } =awaitgetArticles()returndata}<divclass="article-preview"v-for="article in articles":key="article.slug"><divclass="article-meta"><nuxt-linkclass="author":to="`/profile/${article.author.username}`"><img:src="article.author.image"/>
分页处理处理分页参数</nuxt-link><divclass="info"><nuxt-linkclass="author":to="`/profile/${article.author.username}`">        {{ article.author.username }}</nuxt-link><spanclass="date">{{ article.createdAt }}</span></div><buttonclass="btn btn-outline-primary btn-sm pull-xs-right":class="{ active: article.favorited }"><iclass="ion-heart"></i> {{ article.favoritesCount }}</button></div><nuxt-link:to="{name: 'article',params: {slug: article.slug}}"class="preview-link"><h1>{{ article.title }}</h1><p>{{ article.description }}</p><span@click="$router.push({name: 'article',params: {slug: article.slug}})">Read more...</span></nuxt-link></div>asyncasyncData ({ query }) {constpage=Number.parseInt(query.page||1)constlimit=20const { data } =awaitgetArticles({limit, // 每页大小offset: (page-1) *limit  })return {limit,page,articlesCount: data.articlesCount,articles: data.articles  }},
页码处理分页模板：1、使用计算属性计算总页码2、遍历生成页码列表<nav><ulclass="pagination"><liclass="page-item active"><nuxt-linkclass="page-link"to="/">1</nuxt-link></li><liclass="page-item"><nuxt-linkclass="page-link"to="/">2</nuxt-link></li><liclass="page-item"><nuxt-linkclass="page-link"to="/">3</nuxt-link></li></ul></nav>totalPage () {returnMath.ceil(this.articlesCount/this.limit)}<nav><ulclass="pagination"><liclass="page-item":class="{active: item === page}"v-for="item in totalPage":key="item"><nuxt-linkclass="page-link":to="{name: 'home',query: {page: item
3、设置导航链接4、响应 query 参数的变化TODO 加载中 loadingTODO 无内容提示展示关注文章列表视图处理没有登录不展示 my-feed处理 tab 切换以及高亮问题数据处理封装接口方法：处理数据获取：结合分页标签：统一添加数据 token统一处理 401展示文章标签列表（1）封装接口请求方法（2）数据过滤标签链接分页页码链接}}">{{ item }}</nuxt-link></li></ul></nav>watchQuery: ['page'],<divclass="article-preview">Loading articles...</div><divv-if="!articles.length"class="article-preview">No articles are here... yet.</div>
命令描述nuxt启动一个热加载的Web服务器（开发模式）localhost:3000。nuxt build利用webpack编译应用，压缩JS和CSS资源（发布用）。nuxt start以生产模式启动一个Web服务器 (需要先执行nuxt build)。nuxt generate编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。命令描述NODE_ENV=development nodemonserver/index.js启动一个热加载的自定义 Web 服务器（开发模式）。NODE_ENV=production nodeserver/index.js以生产模式启动一个自定义 Web 服务器 (需要先执行nuxt build)。日期格式处理文章点赞文章详情发布文章用户中心个人中心发布部署Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。如果使用了 Koa/Express 等 Node.js Web 开发框架，并使用了 Nuxt 作为中间件，可以自定义 Web 服务器的启动入口：参数您可以使用--help命令来获取详细用法。常见的命令有：--config-file或-c:指定nuxt.config.js的文件路径。--spa或-s:禁用服务器端渲染，使用SPA模式--unix-socket或-n:指定UNIX Socket的路径。你可以将这些命令添加至package.json：
这样你可以通过npm run <command>来执行相应的命令。如: npm run dev。提示:要将参数传递给npm命令，您需要一个额外的--脚本名称(例如：npm run dev --参数--spa)开发模式可通过以下命令以开发模式启动带热加载特性的 Nuxt 服务：发布部署Nuxt.js 提供了两种发布部署应用的方式：服务端渲染应用部署和静态应用部署。部署 Nuxt.js 服务端渲染的应用不能直接使用nuxt命令，而应该先进行编译构建，然后再启动 Nuxt服务，可通过以下两个命令来完成：推荐的package.json配置如下：提示：建议将.nuxt加入.npmignore和.gitignore文件中。"scripts": {  "dev": "nuxt",  "build": "nuxt build",  "start": "nuxt start",  "generate": "nuxt generate"}nuxt// 或npm run devnuxt buildnuxt start{"name": "my-app","dependencies": {"nuxt": "latest"  },"scripts": {"dev": "nuxt","build": "nuxt build","start": "nuxt start"  }}
（1）结合 Express 服务器（2）使用 pm2 运行服务器{"apps": [    {"name": "futurestudio-homepage","script": "npm","args": "start"    }  ]}const { Nuxt, Builder } =require('nuxt')constapp=require('express')()constisProd= (process.env.NODE_ENV==='production')constport=process.env.PORT||3000// 用指定的配置对象实例化 Nuxt.jsconstconfig=require('./nuxt.config.js')config.dev=!isProdconstnuxt=newNuxt(config)// 用 Nuxt.js 渲染每个路由app.use(nuxt.render)// 在开发模式下启用编译构建和热加载if (config.dev) {newBuilder(nuxt).build()    .then(listen)} else {listen()}functionlisten () {// 服务端监听app.listen(port, '0.0.0.0')console.log('Server listening on `localhost:'+port+'`.')}pm2 init

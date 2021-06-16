module.exports = [
  {
    title: 'JavaScript深度剖析',   // 必要的
    // path: '/components/page/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/page/funPro.md', '函数式编程'],
      ['/components/page/asyncPro.md', 'JavaScript异步编程'],
      ['/components/page/myPromise.md', 'JavaScript异步 - 手写promise'],
      ['/components/page/ES6.md', 'ES新特性'],
      ['/components/page/optimization.md', 'js性能优化'],
      ['/components/page/this.md', 'this'],
      ['/components/page/prototype.md', 'JavaScript基础 - 原型和原型链'],
      ['/components/page/callBindApply.md', 'JavaScript基础 - call apply new'],
    ]
  },
  {
    title: '前端学习记录',   // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/ts/', 'typeScript'],
      ['/components/question/design.md', 'JavaScript设计模式'],
    ]
  },
  {
    title: '前端工程化',   // 必要的
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/engineering/', '前端工程化'],
      ['/components/engineering/scaffold.md', '脚手架工具'],
      ['/components/engineering/yeoman.md', 'yeoman使用'],
      ['/components/engineering/gulp.md', 'gulp'],
      ['/components/engineering/esModules.md', 'esModules'],
      ['/components/engineering/webpack.md', 'webpack'],
    ]
  },
  {
    title: 'vue',
    collapsable: true, 
    sidebarDepth: 3,
    children: [
      ['./components/vue/vueBase', 'vue基础'],
      ['./components/vue/virtualDom', '虚拟dom'],
      // ['./components/vue/notes/Vue基础回顾.pdf', '老师笔记'],
      ['./components/vue/vuex.md', 'vuex'],
      ['./components/vue/nuxt基础.md', 'nuxt基础'],
      ['./components/vue/nuxt综合案例.md', 'nuxt综合案例'],
    ]
  },
  {
    title: 'react',
    collapsable: true,
    idebarDepth: 5,
    children: [
      ['./components/react/basics1.md', 'react基础回顾'],
      ['./components/react/virtualDOM.md', 'Virtual DOM 及 Diff算法'],
      ['./components/react/fiber1.md', 'fiber'],
      ['./components/react/React-code.md', 'react 源码解析'],
      ['./components/react/redux.md', 'redux'],
      ['./components/react/hooks.md', 'hooks'],
    ]
  },
  {
    title: 'node',
    collapsable: true,
    idebarDepth: 5,
    children: [
      ['./components/node/basic.md', 'node核心'],
      ['./components/node/communication.md', '网络通信'],
      ['./components/node/module.md', 'node模块化（未完）'],
    ]
  },
  {
    title: '面试题',   // 必要的
    path: '/components/question/', 
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/question/proAndAsync.md', '异步|函数编程'],
      ['/components/question/tsAndEs6.md', 'Es6|ts'],
      ['/components/question/assign.md', '理解赋值表达式'],
      ['/components/question/engineering.md', '工程化及gulp创建项目'],
      ['/components/question/webpack.md', 'webpack'],
      ['/components/question/vueVirtualdom.md', 'vue虚拟dom'],
      ['/components/question/node.md', 'nodejs高级编程'],
    ]
  },
  {
    title: '常见问题记录',
    // path: '/components/article/',
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 3,    // 可选的, 默认值是 1
    children: [
      ['/components/article/bokeinit.md', '个人博客搭建步骤记录'],
      ['/components/article/npmTool.md', 'cyzserver静态服务npm工具包'],
    ]
  },
  {
    title: '感悟',
    // path: '/components/gnosis/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 1, 
    children: [
      ['/components/gnosis/', '巴拉巴拉']
    ]
  },
  {
    title: '看心情待定...',
    // path: '/components/page2/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
    collapsable: true, // 可选的, 默认值是 true,
    sidebarDepth: 2, 
    children: [ 
      // ['/components/page2/', '占位目录的']
    ]
  }
]
const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  title: 'vae-忆南山',
  head: [
    ['link', {rel: 'icon', href: '/public/avatar.jpg'}]
  ],
  description: '用心写代码，不辜负程序员之名',  // 
  base: '/boke/',
  markdown: {
    lineNumbers: false      // 代码块显示行号
  },
  themeConfig: {
    // logo: '/avatar.jpg',  // 左上角logo
    // logo: '/avatar2.jpeg',  // 左上角logo
    logo: '/avatar3.jpeg',  // 左上角logo
    nav:[ // 导航栏配置
      {text: '首页', link: '/' },
      {text: '目录', link: '/components/page/' },
      {text: 'github', link: 'https://github.com/bootstet'},
      // {text: '技术文档', link: '/tech/interview/' },
      // {text: '这里啥都没有', link: ''}      
    ],
    sidebar:[
      {
        title: 'JavaScript深度剖析',   // 必要的
        // path: '/components/page/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
          ['/components/page/funPro.md', '函数式编程'],
          ['/components/page/asyncPro.md', 'JavaScript异步编程'],
          ['/components/page/ES6.md', 'ES新特性'],
          ['/components/page/optimization.md', 'js性能优化'],
        ]
      },
      {
        title: 'typeScript',   // 必要的
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
          ['/components/ts/', 'typeScript'],
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
        ]
      },
      {
        title: '干翻面试官',   // 必要的
        path: '/components/question/', 
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
          ['/components/question/proAndAsync.md', '异步|函数编程'],
          ['/components/question/tsAndEs6.md', 'Es6|ts'],
        ]
      },
      {
        title: '常见问题记录',
        // path: '/components/article/',
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: 3,    // 可选的, 默认值是 1
        children: [
          ['/components/article/bokeinit.md', '个人博客搭建步骤记录'],
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
          ['/components/page2/', '占位目录的']
        ]
      }
    ],
    sidebarDepth: 2,   
  },
  // theme: 'ting'
  theme: 'hope',
  comment: {
    type: "valine", // 使用 Valine
    appId: "fMKJ3bvqjtFeR7XC6iFjTDAD-gzGzoHsz", // your appId
    appKey: "fRTygayrq0HLV9zaHLQNwugg", // your appKey
  },
  plugin: ["@mr-hope/comment", {}],
})
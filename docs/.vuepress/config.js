const resolve = require("vuepress-theme-hope/resolve");
const routerPath = require('./router.js')
module.exports = resolve({
  title: 'vae-忆南山',
  head: [
    ['link', {rel: 'icon', href: '/public/avatar.jpg'}]
  ],
  description: '用心写代码，不辜负程序员之名',  // 
  // base: '/boke/',
  base: '/',
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
    sidebar: routerPath,
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
## 什么是虚拟dom，以及虚拟dom的作用
  + virtual dom（虚拟dom）是由普通的js对象来描述DOM对象，因为不是真正的DOM对象，所以叫虚拟dom。
    ```js
      {
        sel: 'div',
        data: {},
        children: undefined,
        text: 'hello, world',
        elm: undefined,
        key: undefined
      }

    ```
  + 手动操作dom比较复杂，还要考虑浏览器的兼容性
  + 为了简化 DOM 的复杂操作于是出现了各种 MVVM 框架，MVVM 框架解决了视图和状态的同步问题为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是Virtual DOM 出现了
  + Virtual DOM 的好处是当状态改变时不需要立即更新 DOM，只需要创建一个虚拟树来描述DOM， Virtual DOM 内部将弄清楚如何有效(diff)的更新 DOM
  + 虚拟dom的作用
    + 维护视图与状态之间的关系
    + 复杂视图情况下提升渲染性能
    + 除了渲染dom以外，还能实现SSR（Next.js react 与 Nuxt.js),原生应用，小程序等。

## Snabbdom的基本使用

### 创建项目
+ 创建项目
  ```
    # 创建项目目录
    md snabbdom-demo
    # 进入项目目录
    cd snabbdom-demo
    # 创建 package.json
    npm init -y
    # 本地安装 parcel
    npm install parcel-bundler
  ```

+ 配置package.json 的 script
  ```json
    "script": {
      "dev": "parcel index.html --open",
      "build": "parcel build index.html"
    }
  ``` 
+ 创建目录结构
  ```json
    index.html
    package.json
    src 
  ```
### 导入 Snabbdom
+ Snabbdom 文档
  + 看文档的意义
    + 学习任何一个库都要先看文档
    + 通过文档了解库的作用
    + 看文档中提供的示例，自己快速实现一个demo
    + 通过文档查看API的使用
  + 文档地址
    + [https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)
    + [中文翻译](https://github.com/coconilu/Blog/issues/152)
+ 导入Snabbdom
  + snabbdom的官网demo中导入使用的事commonjs模块化语法，这里使用es6的模块化语法 import
  + 关于模块化的语法[Module](https://github.com/coconilu/Blog/issues/152)
  + [es6模块与CommonJS模块的差异](https://es6.ruanyifeng.com/#docs/module-loader%23ES6-%E6%A8%A1%E5%9D%97%E4%B8%8E-CommonJS-%E6%A8%A1%E5%9D%97%E7%9A%84%E5%B7%AE%E5%BC%82)
+ Snabbdom 的核心仅提供最基本的功能，只导出了是哪个函数 init(), h(), thunk()
  - init() 是一个高阶函数，返回patch()
  - h() 返回虚拟节点VNode，这个函数我们在使用Vue.js的时候见过
  - thunk() 是一种优化策略，可以在处理不可变数据时使用

### 代码演示
  + 基本使用
    ```js
      import { init, h, thunk } from 'snabbdom'

      // 使用 init() 函数创建 patch()
      // init() 的参数是数组，将来可以传入模块，处理属性/样式/事件等
      let patch = init([])

      // 使用 h() 函数创建 vnode
      let vnode = h('div.cls', [
        h('h1', 'hello snabbdom'),
        h('p', '这是p标签')
      ])

      const app = document.querySelector('#app')
      // 把 vnode 渲染到空的 DOM 元素 （替换）
      // 会返回新的 vnode
      let oldVnode = patch(app, vnode)

      setTimeout(() => {
        vnode = h('div.cls', [
          h('h1', 'Hello World'),
          h('p', '这是段落')
        ])
        // 把老的视图更新到新的状态
        oldVnode = patch(oldVnode, vnode)
        // 卸载 DOM， 文档中 patch(oldVnode, null) 有误
        // h('!') 是创建注释
        patch(oldVnode, h('!'))
      }, 2000)
    ```
## 模块
Snabbdom 的核心库并不能处理元素的属性/样式/事件等，如果需要处理的话，可以使用模块
### 常用模块
+ 官方提供了6个模块
  + attributes  
    + 设置dom元素的属性，使用 setAttribute()
    + 处理布尔类型的属性
  + props
    + 和attributes模块相似，设置DOM元素的属性 element[attr] = value
    + 不处理布尔类型的属性
  + class
    + 切换类样式
    + 注意：给元素设置类样式是通过sel选择器
  + dataset
    + 设置data-*的自定义属性
  + eventlisteners
    + 注册和移除事件
  + style
    + 设置行内样式，支持动画
    + delayed/remove/destroy
  
### 模块使用
+ 模块使用步骤：
  - 导入需要的模块
  - init() 中注册模块
  - 使用h()函数创建Vnode的时候，可以把第二个参数设置为对象，其他参数往后移
### 代码演示
```js
  // 1 .导入模块
  import { init, h } from 'snabbdom'
  // 2 .注册模块
  import style from 'snabbdom/modules/style'
  import eventlisteners from 'snabbdom/modules/eventlisteners'

  let patch = init([
    style,
    eventlisteners
  ])
  // 3 .使用h()函数的第二个参数传入模块需要的数据（对象）

  let vnode = h('div', {
    style: {
      backgroundColor: 'red'
    },
    on: {
      click: eventHandler
    }
  }, [
    h('h1', 'hello snabbdom'),
    h('p', '这是p标签')
  ])
    
  function eventHandler () {
    console.log('点击我了')
  } 

  let app = document.querySelector('#app')

  patch(app, vnode)

```

## Snabbdom 源码解析
 
### 概述
#### 如何学习源码
+ 先宏观了解
+ 带着目标看源码
+ 看源码的过程要不求甚解
+ 调试

#### Snabbdom的核心
+ 使用 h() 函数创建JavaScript对象(VNode)描述真实DOM
+ init() 设置模块，创建 patch()
+ patch() 比较新旧两个VNode
+ 把变化的内容更新到真实 DOM 树上

#### Snabbdom源码
+ 源码地址
  + [https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)
+ src目录结构

  ```js
    │  h.ts                 h() 函数，用来创建 VNode
    │  hooks.ts             所有钩子函数的定义
    │  htmldomapi.ts        对 DOM API 的包装
    │  is.ts                判断数组和原始值的函数
    │  jsx-global.d.ts      jsx 的类型声明文件
    │  jsx.ts               处理 jsx
    │  snabbdom.bundle.ts   入口，已经注册了模块
    │  snabbdom.ts          初始化，返回 init/h/thunk
    │  thunk.ts               优化处理，对复杂视图不可变值得优化
    │  tovnode.ts             DOM 转换成 VNode
    │  vnode.ts             虚拟节点定义
    │
    ├─helpers
    │      attachto.ts      定义了 vnode.ts 中 AttachData 的数据结构
    │
    └─modules所有模块定义        
          attributes.ts        
          class.ts
          dataset.ts        
          eventlisteners.ts        
          hero.ts           example 中使用到的自定义钩子        
          module.ts         定义了模块中用到的钩子函数        
          props.ts        
          style.ts

  ```
#### h 函数
+ h() 函数介绍
  + 在使用 Vue 的时候见过 h() 函数
    ```js
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')

    ```
  + Snabbdom 中的h() 函数不是用来创建超文本，二十创建VNode
+ 函数重载
  + 概念
    - **参数个数**或**类型**不同的函数
    - JavaScript中没有重载的概念
    - TypeScript 中有重载，不过重载的四线还是通过代码调整参数
  + 重载的示意
    ```js
      function  add (a, b) {
        console.log(a + b)
      }
      function add (a, b, c) {
        console.log(a + b + c)
      }
      add(1, 2)
      add(1, 2, 3)

    ```
  + 源码位置： src/ h.ts
    ```js
      // h 函数的重载
      export function h(sel: string): VNode;
      export function h(sel: string, data: VNodeData): VNode;
      export function h(sel: string, children: VNodeChildren): VNode;
      export function h(sel: string, data: VNodeData, children: VNodeChildren): VNode;
      export function h(sel: any, b?: any, c?: any): VNode {
        var data: VNodeData = {}, children: any, text: any, i: number;
        // 处理参数， 实现重载的机制
        if (c !== undefined) {
          // 处理三个参数的情况
          // sel, data, children/text
          data = b;
          if (is.array(c)) { children = c; }
          // 如果c是字符串或数字
          else if (is.primitive(c)) { text = c; }
          // 如果 c 是 VNode
          else if (c && c.sel) { children = [c]; }
        } else if (b !== undefined) {
          // 处理两个参数的情况
          // 如果 b 是数组
          if (is.array(b)) { children = b; }
          // 如果 b 是字符串或者数字
          else if (is.primitive(b)) { text = b; }
          // 如果 b 是 VNode
          else if (b && b.sel) { children = [b]; }
          else { data = b; }
        }
        if (children !== undefined) {
          // 处理 children 中的原始值(string / number)
          for (i = 0; i < children.length; ++i) {
            // 如果 child 是 string/number,创建文本节点
            if (is.primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined);
          }
        }
        if (
          sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
          (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
        ) {
          // 如果是 svg ，添加命名空间
          addNS(data, children, sel);
        }
        return vnode(sel, data, children, text, undefined);
      };
      export default h;
    ```
#### VNode
+ 一个VNode 就是一个虚拟节点用来没描述一个DOM元素，如果这个VNode有children就是Virtual DOM
+ 源码位置： src/VNode.ts
    ```javascript
      export interface VNode {
        // 选择器
        sel: string | undefined;
        // 节点数据： 属性/样式/事件等
        data: VNodeData | undefined;
        // 子节点，和 text 只能互斥
        children: Array<VNode | string> | undefined;
        // 记录 vnode 对应的真实 DOM
        elm: Node | undefined;
        // 节点中的内容，和children只能互斥
        text: string | undefined;
        // 优化用
        key: Key | undefined;
    }
    export interface VNodeData {
        props?: Props;
        attrs?: Attrs;
        class?: Classes;
        style?: VNodeStyle;
        dataset?: Dataset;
        on?: On;
        hero?: Hero;
        attachData?: AttachData;
        hook?: Hooks;
        key?: Key;
        ns?: string;
        fn?: () => VNode;
        args?: Array<any>;
        [key: string]: any;
    }
    export declare function vnode(sel: string | undefined, data: any | undefined, children: Array<VNode | string> | undefined, text: string | undefined, elm: Element | Text | undefined): VNode;
    export default vnode;
    ```
#### snabbdom
  + patch(oldVnode, newVnode)
  + 打补丁，把新节点中变化的内容渲染到真实DOM，最后返回新节点作为下一次处理的纠结点
  + 对比新旧VNode 是否相同节点（节点的key和sel相同）
  + 如果是相同节点，在判断新的VNode是否有text，如果有并且和oldVnode的text不同，直接更新文本内容
  + 如果新的Vnode有children，判断子节点是否有变化，判断子节点的过程使用的就是diff算法
  + diff过程只进行同层级比较
  
#### init
+ 功能：init(modules, domApi), 返回patch() 函数 （高阶函数)
+ 为什么要使用高阶函数？
  - 因为 patch() 函数在外部会调用多次，每次调用依赖一些参数，比如：modules/domApi/cbs
  - 通过高阶函数让init()内部形成闭包，返回的 patch() 可以访问到modules/domApi/cbd,而不需要重新创建
  - init()在返回patch()之前， 首先手机了所有模块中的钩子函数存储到chs对象中
  - 源码位置：src/snabbdom.ts
    ```javascript
        const hooks: (keyofModule)[] = ['create', 'update', 'remove','destroy', 'pre', 'post'];
        exportfunctioninit(modules: Array<Partial<Module>>, domApi?: DOMAPI){
          let i: number, j: number, cbs= ({} asModuleHooks);// 初始化 api
          const api: DOMAPI=domApi!==undefined?domApi : htmlDomApi;// 把传入的所有模块的钩子方法，统一存储到 cbs 对象中
          // 最终构建的 cbs 对象的形式 cbs = [ create: [fn1, fn2], update: [], ...]
          for (i = 0; i < hooks.length; ++i) {
            // cbs['create'] = []
            cbs[hooks[i]] = [];
            for (j = 0; j < modules.length; ++j) {
              // const hook = modules[0]['create']
              const hook=modules[j][hooks[i]];
              if (hook!==undefined) {        
                  (cbs[hooks[i]] asArray<any>).push(hook);      
                  }    
                }  
              }
              ......
              ......
              ......
              return function patch(oldVnode: VNode|Element, vnode: VNode): VNode{}
            }

    ```
#### patch 
+ 功能：
  + 传入新旧VNode，对比差异，把差异渲染到 DOM
  + 返回新的VNode，作为下一次 patch() 的oldVnode
+ 执行过程：
  + 首先执行模块中的钩子函数 pre
  + 如果oldVnode和vnode相同（key和sel相同）
    + 调用patchVnode(), 找节点的差异并更新DOM
  + 如果 oldVnode 是 DOM 元素
    + 把 DOM 元素转换成 oldVnode
    + 调用 createElm() 把vnode转换成真实 DOM，记录到 vnode.elm
    + 把刚创建的 DOM 元素插入到parent中
    + 移除老节点
    + 触发用户设置的 creat 钩子函数
+ 源码位置： src/snabbdom.ts
  ```javascript
    return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
      let i: number, elm: Node, parent: Node;
      const insertedVnodeQueue: VNodeQueue = [];
      // 保存新插入节点的队列，为了触发钩子函数
      for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
      // 如果 oldVnode 不是 VNode，创建 VNode 并设置 elm
      if (!isVnode(oldVnode)) {
        // 把 DOM 元素转换成空的 VNode
        oldVnode = emptyNodeAt(oldVnode);
      }
      // 如果新旧节点是相同节点（key 和 sel 相同）
      if (sameVnode(oldVnode, vnode)) {
        // 找节点差异并更新dom
        patchVnode(oldVnode, vnode, insertedVnodeQueue);
      } else {
        // 如果新旧节点不同， vnode 创建对应的 DOM
        // 获取当前的 DOM 元素
        elm = oldVnode.elm as Node;
        parent = api.parentNode(elm);
        // 触发 init/create 钩子函数，创建 DOM
        createElm(vnode, insertedVnodeQueue);

        if (parent !== null) {
          // 如果父节点不为空，把 vnode 对应的 DOM 插入到文档中
          api.insertBefore(parent, vnode.elm as Node, api.nextSibling(elm));
          // 移除老节点
          removeVnodes(parent, [oldVnode], 0, 0);
        }
      }
      // 执行用户设置的 insert 钩子函数
      for (i = 0; i < insertedVnodeQueue.length; ++i) {
        (((insertedVnodeQueue[i].data as VNodeData).hook as Hooks).insert as any)(insertedVnodeQueue[i]);
      }
      // 执行模块的 post 钩子函数
      for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
      // 返回 vnode
      return vnode;
    }; 
  ```
#### createElm
+ 功能
  + createElm(vnode, insertedVnodeQueue), 返回创建的 DOM 元素
  + 创建 vnode 对应的 DOM 元素
+ 执行过程：
  + 首先触发**用户**设置的 init 钩子函数
  + 如果选择器是!, 创建评论节点
  + 如果选择器为空，创建文本节点
  + 如果选择器不为空
    - 解析选择器，设置标签的id和class属性
    - 执行模块的create钩子函数
    - 如果vnode有chuldren，创建子vnode对应的DOM，追加到DOM树
    - 如果vnode的text值是string/number，创建文本节点并追击到DOM树
    - 执行用户设置的create钩子函数
    - 如果有用户设置的insert钩子函数，把vnode添加到队列中 
+ 源码位置： src/snabbdom.ts
  ```js
    function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
    let i: any, data = vnode.data;
    if (data !== undefined) {
      // 执行用户设置的 init 钩子函数
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode);
        data = vnode.data;
      }
    }
    let children = vnode.children, sel = vnode.sel;
    if (sel === '!') {
      // 如果选择器是!, 创建评论节点
      if (isUndef(vnode.text)) {
        vnode.text = '';
      }
      vnode.elm = api.createComment(vnode.text as string);
    } else if (sel !== undefined) {
      // 如果选择器不为空
      // 解析选择器
      // Parse selector
      const hashIdx = sel.indexOf('#');
      const dotIdx = sel.indexOf('.', hashIdx);
      const hash = hashIdx > 0 ? hashIdx : sel.length;
      const dot = dotIdx > 0 ? dotIdx : sel.length;
      const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      const elm = vnode.elm = isDef(data) && isDef(i = (data as VNodeData).ns) ? api.createElementNS(i, tag)
                                                                               : api.createElement(tag);
      if (hash < dot) elm.setAttribute('id', sel.slice(hash + 1, dot));
      if (dotIdx > 0) elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
      // 执行模块的 create 钩子函数
      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
      // 如果vnode中有子节点，创建子 vnode 对应的 DOM 元素并追加到 DOM 树上
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          const ch = children[i];
          if (ch != null) {
            api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
          }
        }
      } else if (is.primitive(vnode.text)) {
        // 如果 vnode 的 text 值是 string/number，创建文本节点并追加到 DOM 树
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      i = (vnode.data as VNodeData).hook; // Reuse variable
      if (isDef(i)) {
        // 把 vnode 添加到队列中，为后续执行 insert 钩子做准备
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      // 如果选择器为空，创建文本节点
      vnode.elm = api.createTextNode(vnode.text as string);
    }
    // 返回新创建的 DOM
    return vnode.elm;
  }
  ```
#### patchVnode
+ 功能
  + patchVnode(oldVnode, vnode, insertedVnodeQueue)
  + 对比 oldVnode 和 vnode 的差异，把差异渲染到 DOM
+ 执行过程
  + 首先执行用户设置的 prepatch 钩子函数
  + 执行 create 钩子函数
    - 首先执行模块的create钩子函数
    - 然后执行用户设置的 create 钩子函数
  + 如果 vnode.text 未定义
    - 如果 oldVnode.children 和 vnode.children 都有值 
      - 调用 updateChildren()
      - 使用diff算法对比子节点，更新子节点
    - 如果 vnode.children 有值，oldVnode.children 无值
      - 清空dom元素
      - 调用addVnodes(), 批量添加子节点
    - 如果 oldVnode.children 有值，vnode.children 无值
      - 调用 removeVnodes(),批量移除子节点
    - 如果oldVnode.text 有值
      - 清空 DOM 元素的内容
  + 如果这只了 vnode.text 并且和 oldVnode.text 不等
    + 如果老节点有子节点，全部移除
    + 设置 DOM 元素的 textContent 为 vnode.text
  + 最后执行用户设置的 postpatch钩子函数
+ 源码位置： src/snabbdom.ts
  ```javascript
        function patchVnode(oldVnode: VNode, vnode: VNode, insertedVnodeQueue: VNodeQueue) {
        let i: any, hook: any;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
          i(oldVnode, vnode);
        }
        const elm = vnode.elm = (oldVnode.elm as Node);
        let oldCh = oldVnode.children;
        let ch = vnode.children;
        // 如果新老 vnode 相同返回
        if (oldVnode === vnode) return;
        if (vnode.data !== undefined) {
          // 执行模块的 update 钩子函数
          for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
          i = vnode.data.hook;
          if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
        }
        // 如果 vnode.text 未定义
        if (isUndef(vnode.text)) {
          // 如果新老节点都有 children
          if (isDef(oldCh) && isDef(ch)) {
            // 使用 diff 算法对比子节点，更新子节点
            if (oldCh !== ch) updateChildren(elm, oldCh as Array<VNode>, ch as Array<VNode>, insertedVnodeQueue);
          } else if (isDef(ch)) {
            if (isDef(oldVnode.text)) api.setTextContent(elm, '');
            addVnodes(elm, null, ch as Array<VNode>, 0, (ch as Array<VNode>).length - 1, insertedVnodeQueue);
          } else if (isDef(oldCh)) {
            // 如果老节点有chuldren，新节点没有children
            // 批量移除子节点
            removeVnodes(elm, oldCh as Array<VNode>, 0, (oldCh as Array<VNode>).length - 1);
          } else if (isDef(oldVnode.text)) {
            // 如果老节点有 text，清空 DOM 元素
            api.setTextContent(elm, '');
          }
        } else if (oldVnode.text !== vnode.text) {
          if (isDef(oldCh)) {
            removeVnodes(elm, oldCh as Array<VNode>, 0, (oldCh as Array<VNode>).length - 1);
          }
          api.setTextContent(elm, vnode.text as string);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
          i(oldVnode, vnode);
        }
      }
  ```
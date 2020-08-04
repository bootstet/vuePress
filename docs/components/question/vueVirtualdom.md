## 一、简答题
#### 1、当我们点击按钮的时候动态给data增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么？
```js
  let vm = new Vue({
    el: '#el',
    data: {
      o: 'object',
      dog: {}
    },
    method: {
      clickHandler () {
        // 该 name 属性是否是响应式的
        this.dog.name = 'Trump'
      }
    }
  })

```
答案： 点击按钮的时候动态给data增加的成员不是响应式的数据。响应式数据是在new Vue()的时候，创建observer实例的时候数据变为响应式的，通过点击按钮给data动态新增成员只是给vm data添加了一个属性而已，这个时候vue已经实例化过了，新增的属性不会是相应式的。vue中不允许动态添加根级别的相应式数据。我们可以使用 Vue.set(object, propoertyName, value)方法想嵌套对象添加响应式属性。
#### 2、请简述 Diff 算法的执行过程
答： diff算法是比较同级节点依次比较，然后在找下一级别的节点比较。
  1、首先会对新老节点数组的开始和结尾设置标记索引，遍历过程中移动索引。
  在比较新老节点的时候，会依次按照下面几种情况进行比较
  + 老节点的开始节点和新开始节点进行比较，如果el和key都相同，会执行patchVnode更新dom，索引往下移动。如果不同则会按照下面条件
  + 老节点的结束节点和新节点的结束节点进行比较，如果相同，执行patchVnode更新dom，索引移动。如果不同继续比较
  + 老节点开始节点和新结束节点进行比较，如果相同调用patchVnode更新节点，把老开始节点移动最右边，更新索引。如果不同进行下面比较
  + 老节点结束节点和新开始节点进行比较，如果相同调用patchVnode更新节点，把老节点对应dom移动到最左边
  + 如果上面都不满足，即上面的比较都不相同，那会是新开始节点的key在老节点数组中找相同节点。如果找不到，说明新开始节点是新节点，创建新节点对应dom，插入到dom树中，如果找到了。判断新节点和找到的老节点del选择器是否相同，如果不同说明节点被就该，插入到dom树中，如果相同移动到最左边。
  2、当新老节点的所有自己点遍历完，循环结束，循环结束后，然后做后续相应操作。新的有剩余，把剩余插入到右边，老的有剩余，删掉剩余节点。

## 二、编程题

#### 1、模拟VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
答： 
```javascript
    let _Vue = null
    export default class VueRouter {
      static install (Vue) {
        if (VueRouter.install.installed) {
          return
        }
        VueRouter.install.installed = true
        _Vue = Vue
        _Vue.mixin({
          beforeCreate () {
            if (this.$options.router) {
              _Vue.prototype.$router = this.$options.router
              this.$options.router.init()
            }
          }
        })
      }

      constructor (options) {
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
          current: '/'
        })
      }

      init () {
        this.createRouteMap()
        this.initComponents(_Vue)
      }

      createRouteMap () {
        this.options.routes.forEach(route => {
          this.routeMap[route.path] = route.component
        })
        console.log(this.routeMap)
      }

      initComponents (Vue) {
        Vue.component('router-link', {
          props: {
            to: String
          },
          render (h) {
            return h('a', {
              attrs: {
                href: this.to
              }
            }, [this.$slots.default])
          }
          // template: '<a :href="to"><slot></slot></a>'
        })

        const self = this
        Vue.component('router-view', {
          render (h) {
            const component = self.routeMap[self.data.current]
            console.log(component)
            return h(component)
          }
        })
      }
    }

```

#### 2、在模拟 Vue.js 相应式源码的基础上实现 v-html 指令，以及 v-on 指令。

答 ： 代码见code中 mini-vue 项目，js中compiler.js 文件
其中关键代码片段： 
```js
  class Compiler {
    constructor (vm) {
      this.el = vm.$el
      this.vm = vm
      this.compiler(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compiler (el) {
      let childNodes = el.childNodes
      Array.from(childNodes).forEach(node => {
        // 处理文本节点
        if (this.isTextNode(node)) {
          this.compileText(node)
        }else if (this.isElementNode(node)) {
          // 处理元素节点
          this.compileElement(node)
        }

        // 判断node节点是否有子节点，如果有子节点，要递归调用compile
        if (node.childNodes && node.childNodes.length) {
          this.compiler(node)
        }
      })
    }
    // 编译元素节点，处理指令
    compileElement (node) {
      // console.dir(node)
      // 遍历所有的属性节点
      Array.from(node.attributes).forEach(attr => {
        // 判断是否是指令
        let attrName = attr.name
        if (this.isDirective(attrName)) {
          // v-text --> text
          attrName = attrName.substr(2)
          let key = attr.value
          this.update(node, key, attrName)
        }
      })
    }
    update (node, key, attrName) {
      let updateFn = this[attrName + 'Updater']
      updateFn && updateFn.call(this, node, this.vm[key], key)
    }

    // 处理 v-text 指令
    textUpdater (node, value, key) {
      node.textContent = value
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue
      })
    }
    // 处理 v-html 指令
    htmlUpdater (node, value, key) {
      node.innerHTML = value
      new Watcher(this.vm, key, newValue => {
        node.innerHTML = newValue
      })
    }
    // 处理 v-on 指令
    onUpdater (node, value, key) {
      console.log(node)
      console.log(value)
      console.log(key)
      node.addEventListener('')
      debugger
    }
    // v-model
    modelUpdater (node, value, key) {
      node.value = value
      new Watcher(this.vm, key, newValue => {
        node.value = newValue
      })
      // 双向绑定
      node.addEventListener('input', () => {
        this.vm[key] = node.value
      })
    }

    // 编译文本节点，处理差值表达式
    compileText (node) {
      // {{ msg }}
      // 正则表达式
      let reg = /\{\{( .+?)\}\}/
      let value = node.textContent
      if (reg.test(value)) { 
        let key = RegExp.$1.trim() // 获取匹配正则里的值
        node.textContent = value.replace(reg, this.vm[key])

        // c创建watcher对象，当数据改变 更新视图
        new Watcher(this.vm, key, (newValue) => {
          node.textContent = newValue
        })
      }
    }
    // 判断元素属性是否是指令
    isDirective (attrName) {
      return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode (node) {
      return node.nodeType === 3
    }
    // 判断元素节点是否是元素节点
    isElementNode (node) {
      return node.nodeType === 1
    }
  }
```

#### 3、参考 Snabbdom 提供的电影列表的示例，利用 Snabbdom 实现类似的效果，如图：

答： 1、答案在code中，sanbbdom-demo下，见04-cinema.js文件
    2、也可在github中访问代码，[https://github.com/bootstet/sanbbdom-study](https://github.com/bootstet/sanbbdom-study)
 
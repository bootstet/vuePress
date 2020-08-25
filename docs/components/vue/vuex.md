### 状态管理流程
+ state，驱动应用的数据源
+ view，以声明方式将 state 映射到视图
+ actions，响应在 view 上的用户输入导致的状态变化
```js
  new Vue({
    // state
    data () {
      return {
        count: 0
      }
    },
    // view 
    template: `<div>{{count}}</div>`,
    // actions
    methods: {
      increment () {
        this.count++ 
      }
    }
  })
```

### 组件间通信方式

#### [父传子：props Down](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)
 
```javascript
<blog-post title="My journey with Vue"></blog-post> 
```

```javascript
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{title}}</h3>'
})
```

#### [子传父：Event Up](https://cn.vuejs.org/v2/guide/components.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6)
子组件：
```javascript
<button v-on:click="$emit('enlargeText', 0.1)">
  enlarge text
</button>
```
[使用事件抛出一个值](https://cn.vuejs.org/v2/guide/components.html#%E4%BD%BF%E7%94%A8%E4%BA%8B%E4%BB%B6%E6%8A%9B%E5%87%BA%E4%B8%80%E4%B8%AA%E5%80%BC)
```javascript
<blog-post v-on:enlargeText="hFontSize += $enent"></blog-post>
```

#### [非父子组件： Event Bus](https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2)

eventbus.js
```javascript
export default new Vue()
```

在需要通信的两端：
使用 $on 订阅：
```javascript
// 没有参数
bus.$on('自定义事件名称'， () => {
  // 执行操作
})

// 有参数
bus.$on('自定义事件名称', data => {
  // 执行操作
})
```

// 使用 $emit 发布：
```javascript
// 没有自定义传参
bus.$emit('自定义事件名称')

// 有自定义传参
bus.$emit('自定义事件名称', 数据)
```

#### 其他常见方式
+ $root
+ $parent
+ $children
+ $refs
  + 在普通html标签使用ref，获取dom
  + 在组件上使用ref，获取组件实例

### 简易的状态管理方案
+ 问题： 
  + 多个视图依赖同一状态
  + 来自不同视图的行为需要变更同一状态
    **store.js**
  ```javascript
    export default {
      debug: true,
      state: {
        user: {
          name: 'xiaomao',
          age: 18,
          sex: '男'
        }
      },
      setUserNameAction (name) {
        if (this.debug) {
          console.log('setUserNameAction triggered:', name)
        }
        this.state.user.name = name
      }
    }
  ```
  **componentA**
  ```vue
    <template>
      <div class="page">
        <h1>compentA</h1>
        user name: {{ sharedState.user.name}}
        <button @click="change">change info</button>
      </div>
      </template>

      <script type="text/ecmascript-6">
        import store from './store'
        export default {
          data() {
            return {
              private: {},
              sharedState: store.state
            }
          },
          methods: {
            change () {
              store.setUserNameAction('componentA')
            }
          }
        }
      </script>

  ```

    **componentB**
  ```vue
    <template>
      <div class="page">
        <h1>compentA</h1>
        user name: {{ sharedState.user.name}}
        <button @click="change">change info</button>
      </div>
      </template>

      <script type="text/ecmascript-6">
        import store from './store'
        export default {
          data() {
            return {
              private: {},
              sharedState: store.state
            }
          },
          methods: {
            change () {
              store.setUserNameAction('componentB')
            }
          }
        }
      </script>

  ```

### VueX
+ Vuex 是专门为Vue.js设计的状态管理库
+ Vuex 采用集中式的方式储存需要共享的状态 
+ Vuex 的作用是进行状态管理，解决了复杂组件通信，数据共享
+ Vuex 集成到了 devtools中，提供了time-travel时光旅行历史回滚功能
  
#### 什么情况下使用vuex
+ 非必要情况不要使用Vuex
+ 大型的单页应用程序
  + 多个视图依赖于同一状态
  + 来自不同视图的行为需要变更同一状态

#### Vuex核心概念
+ Store
+ State
+ Getter
+ Mutation
+ Action
+ Module
  ```html
    <!-- count: {{ $store.state.count }}<br>
    msg: {{ $store.state.msg }} -->
    <!-- count: {{ count }}<br>
    msg: {{ msg }} -->
      count: {{ num }}<br>
    msg: {{ message }}

    <h2>Getters</h2>
    reverseMsg: {{ $store.getters.reverseMsg }}
    reverseMsg: {{ reverseMsg }}

    <h2>Mutation</h2>
    <!-- increate mutation的事件，要通过commit提交
    第二个参数payload -->
    <button @click="$store.commit('increate', 2)">Mutation</button>
    <button @click="increate(3)">Mutation</button>
    <h2>Action</h2>
    <!-- action 调用要通过dispatch 等用于 mutation调用要通过commit一样 -->
    <!-- 调用actions中的increateAsync方法，在increateAsync中调用increate方法，去更改状态 -->
    <button @click="$store.dispatch('increateAsync', 5)">Action</button>
    <button @click="increateAsync(5)">Action</button>
    <h2>module</h2>
    <!-- products: {{ $store.state.products.products }}
    <button @click="$store.commit('setProducts', [])">Mutation</button> -->

    products: {{ products }}
    <button @click="setProducts([])">Mutation</button>
  
    <h2>strict</h2>
    <button @click="$store.state.msg = 'LaGou'">strict</button>
    </div>
  ```

  ```javascript
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import store from './store'
  export default {
    data() {
      return {
        private: {},
        sharedState: store.state 
      }
    },
    computed: {
      // 自动生成状态对应的计算属性
      // 接受数组作为一个参数 也可以是对象
      // count: state => state.count
      // ...mapState(['count', 'msg'])
      ...mapState({num: 'count', message: 'msg'}),
      // vuex中getter映射到组件中的计算属性，返回的是对象
      ...mapGetters(['reverseMsg']),
      ...mapState('products', ['products'])
    },
    methods: {
      change () {
        store.setUserNameAction('componentA')
      },
      // map函数把mutation映射到当前的methods中
      // 传入数组或者对象
      ...mapMutations(['increate']),
      // 映射的方法 返回一个对象，对象中的方法封装了dispatch的调用 
      ...mapActions(['increateAsync']),
      ...mapMutations('products', ['setProducts'])
      
    }
  }
  ```

#### Vuex 插件介绍
+ Vuex的插件就是一个函数
+ 这个函数接收一个 store 的参数
  ```js
    const myPlugin = store => {
      // 当 store 初始化后调用
      store.subscribe((mutation, state) => {
        // 每次mutation 之后调用
        // mutation 的格式为 { type, payload } type为命名空间 carts/addToCart
      })
    }

    const store = new Vuex.Store({
      // ...
      plugins: [myPlugin]
    })
  ``` 
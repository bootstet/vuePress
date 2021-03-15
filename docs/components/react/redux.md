## Redux 核心

### 1.1 Redux 介绍
  JavaScript 状态容器，提供可预测话的状态管理,保存很多元素的状态
  ```js
    const state = { 
      modolOpen: "yes",
      btnClicked: "no",
      btnActiveClass: "active",
      page: 5,
      size: 10
    }
  ```
### 1.3 Redux 核心概念及工作流程
+ store： 存储状态的容器，Javascript对象
+ Reducers： 函数，操作状态并返回新的状态，接受actions返回的的type值，判断进行什么操作，对状态进行处理，返回最新处理的那个状态。
+ View: 视图，HTML页面
+ Actions: 对象，描述对状态进行怎样的操作，固定的属性 type，触发action，返回一个type值

### 1.4 Redux 核心 api
 ```js
  // 创建 store 状态容器
  const store = Rudex.createStore(reducer);
  // 创建用于处理状态的 reducer 函数
  function redecer( state = initialState, action)
  // 获取状态
  store.getState()
  // 订阅状态
  store.subscribe(function () {})
  // 触发 Action
  store.dispatch({type: 'descrition...'})
 ```
## React + Redux
### 2.1 在 React 中不使用 Redux 时遇到的问题
 在REact组件通信的数据流是单向的，顶层组件可以通过Props属性向下层组件传递数据，而下层组件不能向上层组件传递数据，要实现下层组件修改数据，需要上层组件传递修改数据的方法到下层组件，当项目越来越大的时候，组件之间传递数据变的越来月困难 
### 2.2 在React项目中加入 Redux 的好处
 使用Redux管理数据，由于Store独立于组件，使得数据管理独立于组件，解决了组件与组件之间传递数据困难的问题
### 2.3 Redux工作流程
 + 组件通过dispatch 方法触发Action
 + Store 接受Action分发给Reducer
 + Reducer 根据 Action 类型对状态进行更改并将更改后的状态返回给Store
 + 组件订阅了Store中的装填，Store中的状态更新会同步到组件 

## Redux 中间件
### 3.1  什么是中间件
中间件允许我们扩展redux应用程序 
### 3.3 开发 Redux 中间件
### 3.4 注册中间件

```js
import { createStore, applyMiddleware } from 'redux';
import logger from './middlewares/logger'

createStore(reducer, applyMiddleware(
  logger
))
```

### 4. Redux 常用中间件
#### 4.2 redux-saga

+ 4.21 redux-saga 解决的问题
  redux-saga 可以将异步操作从 Action Creator 文件中抽离出来，放在一个单独的文件夹
+ 4.2.3 创建 redux-saga中间件
```js
  import createSagaMiddleware from 'redux-saga';
  const sagaMiddleware = createSagaMiddleware()
```
+ 4.2.4 注册 sagaMiddleware
  ```js
    createStore(reducer, applyMiddleware(sagaMiddleware))
  ```
+ 4.2.5 使用 saga 接受 action 执行异步操作
  ```js
    import { takeEvery, put } from 'redux-saga/effects'

    function* load_posts () {
      const { data } = yield axios.get('./api/posts.json');
      yield put(load_posts_success(data));
    }

    export default function* postSaga () {
      yield takeEvery(LOAD_POSTS, load_posts)
    }
  ```
#### 4.3 redux-Actions
 + 4.3.1 redux-actions 解决的问题
 redux流程中大量的样板代码读写很痛苦，使用redux-actions可以简化Action和Reducer的处理 

## 开发 Redux 中间件

## Redux 综合案例
# hooks

## 1、React Hooks 介绍
### 1.1 hooks作用
  对函数性组件进行增强，让函数型组件可以存储状态，可以拥有处理副作用的能力
  让开发者在不使用内组件的情况下，实现相同的功能
### 1.2 类组件的不足（hooks要解决的问题）
+ 缺少逻辑复用机制
  为了复用增加无实际渲染效果的组件，增加了组件层级 显示十分臃肿，增加了调试的难度以及运行效率的降级
+ 类组件经常会变的很复杂难以维护
  将一组想干的业务逻辑拆分到了多个生命周期函数中
  在一个声明周期函数类存在多个不相干的业务逻辑
+ 类成员方法不能保证this指向的正确性

## 2、React Hooks 使用
  hooks意为钩子，React Hooks就是一堆钩子函数，React通过这些钩子函数对函数型组件进行增强，不同的钩子函数提供了不同的功能
  ### 2.1 useState()
  ```js
    import React, { useState } from 'react';

    function Example() {
      // 声明一个叫 “count” 的 state 变量。 默认值为0 
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
  ```
   +  接受唯一的参数即状态初始值.初始值可以是任务数据类型
   +  返回值为数组，数组中存储状态值和更改状态值的方法，方法名称约定以set开头，后面加上状态名称
   +  方法可以被调用多次，用以保存不同状态值
   +  参数可以是一个函数，函数返回什么，初始状态就是什么，函数值会被调用一次，用在初始值是动态值的情况用于初始值

   + 设置状态值方法的参数可以是一个值也可以是一个函数
   + 设置状态值方法的方法本身是异步的
  ### 2.2 useReducer()
  是另一种让函数组件保存状态的方法
  ```js
  const initialState = {count: 0};

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      default:
        throw new Error();
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
      </>
    );
  }
  ```
  ### 2.3 useContext()
  ```js
    const themes = {
      light: {
        foreground: "#000000",
        background: "#eeeeee"
      },
      dark: {
        foreground: "#ffffff",
        background: "#222222"
      }
    };

    const ThemeContext = React.createContext(themes.light);

    function App() {
      return (
        <ThemeContext.Provider value={themes.dark}>
          <Toolbar />
        </ThemeContext.Provider>
      );
    }

    function Toolbar(props) {
      return (
        <div>
          <ThemedButton />
        </div>
      );
    }

    function ThemedButton() {
      const theme = useContext(ThemeContext);
      return (
        <button style={{ background: theme.background, color: theme.foreground }}>
          I am styled by theme context!
        </button>
      );
    }
  ```

  在跨组件层级数据时简化获取数据的代码
  ### 2.4 useEffect()
  ```js
    // 组件挂载完成之后进行 组件数据更新完成之后执行
    useEffect(() => {
      console.log(123)
    })
    // 组件挂载完成之后进行
    useEffect(() => {
      console.log(123)
    }, [])
    // 组件被卸载之前执行
    useEffect(() => {
      retrun () => {
        console.log('组件被卸载了')
      }
    })
  ```
  按照用途把代码进行分类
  简化重复代码，使组件内部代码更加清晰 

  useRef()
  
  
  ### 2.5 useMemo()
  在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可。而在使用函数的情况，需要考虑有没有函数传递给子组件使用useCallback。而在值有所依赖的项，并且是对象和数组等值的时候而使用useMemo（当返回的是原始数据类型如字符串、数字、布尔值，就不要使用useMemo了）。不要盲目使用这些hooks。

  ### 2.6 memo方法
  性能优化，如果本组件中的数据没有发生变化，组织组件更新。类似类组件中的PureComponent 和 shouldComponentUpdate
  ```js
    import React, { memo } from 'react'
    function Counter () {
      return <div></div>
    }
    export default memo(Counter)
  ```
  ### 2.7 useCallBack()
  [react Hook之useMemo、useCallback及memo](https://juejin.cn/post/6844903954539626510?searchId=202308301112398F83F2F5D178872F56E9)
  

## 3、自定义 Hooks
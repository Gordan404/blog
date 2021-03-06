---
sidebar: auto
---
# 前端进阶指北
## React基础
### 什么是 React
:::tip
* React是Facebook 开发的前端JavaScript库
* V层：react并不是完整的MVC框架，而是MVC中的C层
* 虚拟DOM：react引入虚拟DOM，每当数据变化通过reactdiff运算，将上一次的虚拟DOM与本次渲染的DOM进行对比，仅仅只渲染更新的，有效减少了DOM操作
* JSX语法：js+xml，是js的语法扩展，编译后转换成普通的js对象
* 组件化思想：将具有独立功能的UI模块封装为一个组件，而小的组件又可以通过不同的组合嵌套组成大的组件，最终完成整个项目的构建
* 单向数据流：指数据的流向只能由父级组件通过props讲数据传递给子组件，不能由子组件向父组件传递数据
* 要想实现数据的双向绑定只能由子组件接收父组件props传过来的方法去改变父组件数据，而不是直接将子组件数据传给父组件
* 生命周期：简单说一下生命周期：Mounting(挂载)、Updateing(更新)、Unmounting(卸载)
:::
### React的生命周期
![React的生命周期](../assets/images/interview/37.png)
:::tip
创建、 更新、 销毁三个阶段 `componentDidMount` => `componentDidUpdate` => `componentWillUnmount`
1. **创建阶段：** 旧版本组件构造函数调用完成之后会有`componentWillmount`方法，新版本省略，新增`getDerivedStateFromProps`方法（并不常用），且该方法在组件props,state变更时也会被调用
2. **更新阶段:** 当`shouldComponentUpdate`返回ture后，会调用rende方法重新渲染组件。在组件更新完成之前有`getSnapShotBeforeUpdate`方法
* **`componentWillMount`**(16.9废弃):在渲染之前执行，用于根组件中的 App 级配置。
* **`componentDidMount`**：在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
* **`componentWillReceiveProps`**(废弃)：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染, `getDerivedStateFromProps`可替代
* **`getDerivedStateFromProps`**：会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内
* **`shouldComponentUpdate`**：确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
* **`componentWillUpdate`**(废弃)：在shouldComponentUpdate返回 true 确定要更新组件之前件之前执行。
* **`componentDidUpdate`**：它主要用于更新DOM以响应props或state更改。
* **`componentWillUnmount`**：创建、 更新、 销毁三个阶段，它用于取消任何的网络请求，或删除与组件关联的所有事件监听
:::
### React 父子组件生命周期
```js
// 加载渲染过程
  parent-constructor
  parent-componentWillMount
  parent-render
    child-constructor
    child-componentWillMount
    child-render
    child-componentDidMount
  parent-componentDidMount
// 更新过程
  parent-shouldComponentUpdate
  parent-componentWillUpdate
  parent-render
    child-componentWillReceiveProps
    child-shouldComponentUpdate
    child-render
    child-componentDidUpdate
  parent-componentDidUpdate
// 卸载组件
  parent-componentWillUnmount
    child-componentWillUnmount
```
### 为什么React中事件绑定的函数内部this默认指向undefined
:::tip
函数的作用域是由函数调用的时候决定的，而不是函数声明的时候。第一次调用是作为对象中的函数调用，因此this指向对象本身。而第二次调用是作为普通函数调用，所以this指向全局对象，在严格模式时会指向undefined。

**解决办法：**
1. 使用es6箭头函数，箭头函数this默认指向上一层级的环境 `<input onChange={()=>this.change()}  />`
2. 使用bind绑定this写在constructor里 `this.change = this.change.bind(this)`;  
:::
```js
var name = 'Gordanlee';
var obj = {
    name: 'Wuyifan',
    getName: function() {
        return this.name;
    }
};

var getName = obj.getName;
obj.getName(); // Wuyifan
getName(); // Gordanlee

class EventDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'gordanlee',
        }
        // 修改方法的 this 指向
        this.clickHandler2 = this.clickHandler2.bind(this)
        推荐面这种写法
    }
    clickHandler1() {
      console.log('this....', this) // this 默认是 undefined
      this.setState({
          name: 'wuyifan'
      })
    }
    // 静态方法，this 指向当前实例
    clickHandler2() {
    }
    // 获取 event
    clickHandler3 = (event) => {
    }
    render() {
        // // this - 使用 bind
        return 
        <div>
          <p onClick={this.clickHandler1}>
              {this.state.name}
          </p>
          // 不建议在标签中写bind, 会导致bind多次执行，建议再头部赋值只绑一次
          <p onClick={this.clickHandler2.bind(this)}>
              {this.state.name}
          </p>
          <p onClick={this.clickHandler2(this)}>
              {this.state.name}
          </p>
          <p onClick={this.clickHandler3}>
              {this.state.name}
          </p>
        <div>
    }
}
```
### 浅谈React合成
![浅谈React合成](../assets/images/interview/38.jpg)
:::tip
`JSX`上写的事件并没有绑定在对应的真实 `DOM` 上，而是通过事件代理的方式，将所有的事件都统一绑定在了 `document`上。这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。
（在`React17`之前，`React`是把所有事件委托在`document`上的，`React17`及以后版本不再把事件委托在`document`上，而是委托在挂载的容器上了。）
* **目的:**
1. 合成事件首先抹平了浏览器之间的兼容问题(如标准事件模型、IE)，另外这是一个跨浏览器原生事件包装器，赋予了跨浏览器开发的能力；
2. 对于原生浏览器事件来说，浏览器会给监听器创建一个事件对象。如果你有很多的事件监听，那么就需要分配很多的事件对象，造成高额的内存分配问题。但是对于合成事件来说，有一个事件池专门来管理它们的创建和销毁，当事件需要被使用时，就会从池子中复用对象，事件回调结束后，就会销毁事件对象上的属性，从而便于下次复用事件对象
* **优点**
1. 兼容所有浏览器(如标准事件模型、IE)，更好的跨平台(各平台都有自己的事件名)；
2.挂载到document,将事件统一存放在一个数组,减少内存消耗,避免频繁的新增与解绑（垃圾回收）。
3. 方便 react 统一管理和事务机制
:::
```js
// 定义捕获事件
Vue: <div @click.capture="handleClick" />
React: <div onClickCapture={this.onClickOuter} />
// react 事件不能采用 return false 的方式来阻止浏览器的默认行为，而必须要地明确地调用preventDefault()来阻止默认行为。
// `Event` 是封装组合之后的 `SyntheticBaseEvent`, 模拟出来的DOM事件所有能力。
// `event.nativeEvent` 是原生事件对象
// React绑定事件，最后都会追加Eevent参数
```
### React 组件中怎么做事件代理
:::tip
React基于Virtual DOM实现了一个SyntheticEvent层（合成事件层），定义的事件处理器会接收到一个合成事件对象的实例，它符合W3C标准，且与原生的浏览器事件拥有同样的接口，支持冒泡机制，所有的事件都自动绑定在最外层上。
在React底层，主要对合成事件做了两件事：
* 事件委派： React会把所有的事件绑定到结构的最外层，使用统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部事件监听和处理函数。
* 自动绑定： React组件中，每个方法的上下文都会指向该组件的实例，即自动绑定this为当前组件。
:::
### setState
:::tip
1. 不可变值(为了性能优化,不去触发shouldComponentUpdate)
2. 可能是异步更新
* 异步： 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。
* 同步： 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。
3. 可能会被合并
* `setState()` 传递对象就会被合并（类似Object.assign），传递函数则不会被合并
* setState是否同步，看是否能命中`bacthUpdate`机制，判断`isBatchingUpdates`
:::
```js
class StateDemo extends React.Component {
    constructor(props) {
        super(props)

        // 第一，state 要在构造函数中定义
        this.state = {
            count: 0
        }
    }
    render() {
        return <div>
            <p>{this.state.count}</p>
            <button onClick={this.increase}>累加</button>
        </div>
    }
    increase = () => {
        // this.state.count++ // 错误的写法
        // setState 一定要用不可变值了
        // 只能用setState去修改值，禁止提前修改值，会导致shouldComponentUpdat中nextProps, nextState 相等
        this.setState({
            count: this.state.count + 1 // SCU
        }, ()=>{
         console.log('callback', this.state.count) // 1 异步获取
        })
        // this.setState 是异步的，如果立刻同步获取是拿不到最新修改的值，需要用setState第二个参数会调函数中获取, 联想 Vue $nextTick - DOM
        console.log('同步获取', this.state.count) // 0 
        // 操作数组、对象的的常用形式
        setTimeout(() => {
          this.setState({
            count: 100
          })
          console.log('setTimeout', this.state.count) // 100
        }, 0);
    }
    increase2 = () => { // state 异步更新前会被合并
      for (let index = 0; index < 10; index++) {
        // setState传入对象,会被合并（类似Object.assign）。执行结构只一次 + 1
        this.setState({
            count: this.state.count + 1 // 0 + 1
        })
      } // 
      setTimeout(() => {
        console.log('for', this.state.count) // 1
      }, 0);
    }
    increase3 = () => { // state 异步更新前会被合并
      for (let index = 0; index < 10; index++) {
        // setState传入函数不会被合并，结果为10，函数无法像对象一样被合并，只能被执行
        this.setState((prevState, props)=>{
          return {
            count: prevState.count + 1
          }
        })
      }
      console.log('for', this.state.count) // 0
      setTimeout(() => {
        console.log('for', this.state.count) // 10
      }, 0);
    }
    bodyClickHandler = () => {
        this.setState({
            count: this.state.count + 1
        })
        console.log('count in body event', this.state.count) // 最新的值
    }
    componentDidMount() {
        // 自己定义的 DOM 事件，setState 是同步的
        document.body.addEventListener('click', this.bodyClickHandler)
    }
    componentWillUnmount() {
        // 及时销毁自定义 DOM 事件
        document.body.removeEventListener('click', this.bodyClickHandler)
        // clearTimeout
    }
}
```
### 组件的状态(state)和属性(props)之间有何不同
:::tip
* State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果
* Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的
* 组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)
:::
## React 进阶
### 受控和非受控组
:::tip
* **受控组件：** 控制着输入的过程，`react`的`state`为唯一的数据来源，被`react.state`这样控制着的就是受控组件(相当于实现数据绑定)。
* **非受控组件：** 不设置value值(只能设置`defaultValue`、`defaultChecked`),通过ref获取dom节点然后再取value值。在html表单中，input select checkbox，来暂存输入值,如果不需要关心控制值是怎么修改更新的，只需要获取这个组件的值，那么这个就是非受控组件。
**非受控组件使用场景：**
1. 必须手动操作DOM元素，`setState`实现不了。
2. 文件上传`<input type="file">`
3. 开始或使用某些富文本编辑器、需要传入DOM 元素
:::
```js
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'gordanlee',
            flag: true,
        }
        this.nameInputRef = React.createRef() // 创建 ref
        this.fileInputRef = React.createRef()
    }
    render() {
        // // input defaultValue
        return <div>
            {/* 使用 defaultValue 而不是 value ，使用 ref */}
            <input defaultValue={this.state.name} ref={this.nameInputRef}/>
            {/* state 并不会随着改变 */}
            <span>state.name: {this.state.name}</span>
            <br/>
            <button onClick={this.alertName}>alert name</button>
        </div>
        // // checkbox defaultChecked
        // return <div>
        //     <input
        //         type="checkbox"
        //         defaultChecked={this.state.flag}
        //     />
        // </div>
        // file
        // return <div>
        //     <input type="file" ref={this.fileInputRef}/>
        //     <button onClick={this.alertFile}>alert file</button>
        // </div>
    }
    alertName = () => {
        const elem = this.nameInputRef.current // 通过 ref 获取 DOM 节点
        alert(elem.value) // 不是 this.state.name
    }
    alertFile = () => {
        const elem = this.fileInputRef.current // 通过 ref 获取 DOM 节点
        alert(elem.files[0].name)
    }
}
```
### 类组件和函数组件(无状态)之间的区别
:::tip
* 类组件: 可以使用其他特性，如状态 state 和生命周期钩子。
* 函数组件: 当组件只是接收 props 渲染到页面时，就是无状态组件，就属于函数组件，也被称为哑组件或展示组件
1. 函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可,为了提高性能，尽量使用函数组
2. 函数组件无实例、无`this`、无状态state,无生命周期不能扩展其他方法。
3. 函数组件获取的总是事件发生的时候的值，即使值在事件发生后已经更新了,而类组件获取的总是最新的值。
:::
```js
//函数组件传参
function CounterFunction(props) {
    const { count } = props;
    const showAlert = () => {
        setTimeout(() => {
            alert(count + '--from Function');
        }, 3000);
    };
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={showAlert}>Show count</button>
        </div>
    );
}
//类组件
class CounterClass extends React.Component {
    showAlert = () => {
        setTimeout(() => {
            alert(this.props.count + '--from Class');
        }, 3000);
    };

    render() {
        return (
            <div>
                <p>He clicked {this.props.count} times</p>
                <button onClick={this.showAlert.bind(this)}>
                  Show count
                </button>
            </div>
        );
    }
}


class App extends React.Component {
    state = {
        count : 123
    };
    render() {
        return (
            <div className="App" onClick={() => this.setState({count: 456})}>
                <CounterFunction count={this.state.count}/>
                <CounterClass count={this.state.count} />
            </div>
        );
    }
}
// 当你两次调用的时候，你就会发现他们的页面渲染是相同的，count值都会变成456，但是，alert出来的值可就不一样了。
// Function的是123，Class的是456。所以当showAlert事件发生的时候，Function取的是发生前的值，是触发事件前的值，就像处对象，哪怕分手后，双方立刻找到了新对象，但仍然记得当初的美好
```
### Portals(传送门)
:::tip
组件默认会按照既定层次嵌套渲染，Portal可以将React节点渲染到指定节点(如Dialog、Tooltip),vue2.x需要用`v-transfer-dom`,Vue3.0x可以用`Teleport`
1. 父组件overflow:hidden
2. 父组件z-index值太小
3. fixed 需要放在body第一层
:::
```js
  render() {
      // // 正常渲染
      // return <div className="modal">
      //     {this.props.children} {/* vue slot */}
      // </div>

      // 使用 Portals 渲染到 body 上。
      // fixed 元素要放在 body 上，有更好的浏览器兼容性。
      return ReactDOM.createPortal(
          <div className="modal">{this.props.children}</div>,
          document.body // DOM 节点
      )
  }
```
### context(上下文)
:::tip
React context的api解决的问题是祖先元素与子孙元素的通信问题。
* 用props太繁琐,层级过深不友好
* 用redux小题大做
:::
```js
import React from 'react'
// 创建 Context 填入默认值（任何一个 js 变量）
const ThemeContext = React.createContext('欧美简约')
const ThemeContext2 = React.createContext('呃玛西亚')
// 底层组件 - 函数是组件
function ThemeLink (props) {
    // const theme = this.context // 会报错。函数式组件没有实例，即没有 this
    // 函数式组件可以使用 Consumer(消费)
    // Context多了很容易导致嵌套地狱。
    return <ThemeContext.Consumer>
      { (value) => 
      <p>当前主题1-{value}
        <ThemeContext2.Consumer>
          { (value2) => <span>当前主题2-{value2}</span> }
        </ThemeContext2.Consumer>
      </p> 
      }
    </ThemeContext.Consumer>
}

// 底层组件 - class 组件
class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // static contextType = ThemeContext // 也可以用 ThemedButton.contextType = ThemeContext
    render() {
        const theme = this.context // React 会往上找到最近的 theme Provider，然后使用它的值。
        console.log('theme', theme)
        return <div>
            <p>当前主题-{theme}</p>
        </div>
    }
}
ThemedButton.contextType = ThemeContext // 指定 contextType 读取当前的 theme context。

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div style={{background: 'yellow', padding: '10px'}}>
            中间组件
            <div style={{background: 'pink'}}>
              <ThemedButton />
              <ThemeLink />
            </div>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: '欧美简约'
        }
    }
    render() {
        return <div style={{background: 'red', padding: '10px'}}>
          <ThemeContext.Provider value={this.state.theme}>
              <Toolbar />
              <button onClick={this.changeTheme}>切换主题</button>
          </ThemeContext.Provider>
        </div>
    }
    changeTheme = () => {
        this.setState({
            theme: this.state.theme === '城乡结合' ? '欧美简约' : '城乡结合'
        })
    }
}
export default App
```
### 异步组件
:::tip
* import()
* React.lazy
* React.Suspense
:::
```js
import React from 'react'
const ContextDemo = React.lazy(() => import('./ContextDemo'))
class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <p>引入一个动态组件</p>
            <hr />
            <React.Suspense fallback={<div>Loading...</div>}>
                <ContextDemo/>
            </React.Suspense>
        </div>
        // 1. 强制刷新，可看到 loading （看不到就限制一下 chrome 网速）
        // 2. 看 network 的 js 加载
    }
}
export default App
```
### 高阶组件 HOC 
:::tip
高阶组件不是一种功能，而是一种模式，类似应该是一个组件工厂、装饰器，获取低阶组件，生成高阶组件,简而言之，高阶组件就是一个函数，它接受一个组件为参数，返回一个新组件(如拉加载数据容器、播放器状态)。
1. 代码复用，代码模块化
2. 增删改props
3. 渲染劫持
:::
```js
// React-redux的connect也是一个高阶组件
import React from 'react'
// 高阶组件
const HOCFactoryMouse = (Component) => {
  class withMouseComponent extends React.Component {
      constructor(props) {
        super(props)
        this.state = { x: 0, y: 0 }
      }
      handleMouseMove = (event) => {
        this.setState({
          x: event.clientX,
          y: event.clientY
        })
      }
      render() {
          return (
            <div style={{ height: '500px', background: 'pink' }} onMouseMove={this.handleMouseMove}>
              {/* 1. 透传所有 props 2. 增加 mouse 属性 */}
              {JSON.stringify(this.props)}
              <Component {...this.props} mouse={this.state}/>
            </div>
          )
      }
  }
  return withMouseComponent
}
const App = (props) => {
    const a = props.a
    const { x, y } = props.mouse // 接收 mouse 属性
    return (
        <div style={{ height: '500px' }}>
            <h1>鼠标坐标: ({x}, {y})</h1>
            <p>{a}</p>
        </div>
    )
}
export default HOCFactoryMouse(App) // 返回高阶函数
// <HOCDemo a="100"/>
```
### Render Props
:::tip
组件接收一个函数，这个函数获取组件的state实现渲染逻辑(例如多个按钮，每个按钮点击会打开不同的Dialog,用Render Props就能写在一块)
1. 接收一个外部传递进来的 props 属性
2. 将内部的 state 作为参数传递给调用组件的 props 属性方法.
缺点: 它很容易导致嵌套地狱
:::
```js
import React from 'react'
import PropTypes from 'prop-types'

class Mouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = { x: 0, y: 0 }
    }
  
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    }
  
    render() {
      return (
        <div style={{ height: '500px' }} onMouseMove={this.handleMouseMove}>
            {/* 将当前 state 作为 props ，传递给 render （render 是一个函数组件） */}
            {this.props.render(this.state)}
        </div>
      )
    }
}
Mouse.propTypes = {
    render: PropTypes.func.isRequired // 必须接收一个 render 属性，而且是函数
}

const App = (props) => (
    <div style={{ height: '500px' }}>
        <p>{props.a}</p>
        <Mouse render={
            /* render 是一个函数组件 */
            ({ x, y }) => <h1>坐标 ({x}, {y})</h1>
        }/>
        
    </div>
)
/**
 * 即，定义了 Mouse 组件，只有获取 x y 的能力。
 * 至于 Mouse 组件如何渲染，App 说了算，通过 render prop 的方式告诉 Mouse 。
 */
export default App
```
### HOC vs Render Props 区别
:::tip
* HOC: 模式简单，但会增加组件层级(高级组件嵌套当前组件)
* Render Props: 代码简洁，学习成本较高，无法在 return 语句外访问数据，它很容易导致嵌套地狱。
* 按需使用
:::
### React性能优化
:::tip
1. 渲染列表时加Key
2. 自定义事件、DOM事件及时销毁
3. 合理使用异步组件
4. **`shouldComponentUpdate`**(简称SCU): SCU 默认返回true,即React 默认重新渲染所有子组件，必须配合`不可变值` 一起使用，可先不用SCU,有性能问题时再按需使用
5. **`PureComponent(纯组件)` 和 `React.memo`**:前者类组件，后者函数组组件，原理是，当组件更新时，如果组件的 `props` 和 `state` 都没发生改变， render 方法就不会触发，省去 `Virtual DOM` 的生成和比对过程，达到提升性能的目的。具体就是 React 自动帮我们做了一层浅比较(Object.keys只比较第一层,类似浅拷贝浅比较)
6. **函数组件**: 当一个组件只返回一个render建议使用函数组件,因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可,提高性能。
7. **`immutable.js`不可变值**：
* React遵循`不可变值`设计理念，中常要深拷贝(性能消耗大)一份数据,再`setState`,使用`immutable`可彻底拥抱`不可变值`,基于共享数据（不是深拷贝）,速度快,但有一定的学习和迁移成本，按需使用。
* `immutable`数据一种利用结构共享形成的持久化数据结构，一旦有部分被修改，那么将会返回一个全新的对象，并且原来相同的节点会直接共享
5. 公共组件抽离,提取公共逻辑，降低耦合度，如`minxin`(弃用)、高阶组件HOC、Render Props
:::
![immutable](../assets/images/interview/39.gif)
```js
class {
  shouldComponentUpdate(nextProps, nextState) {
      // _.isEqual 做对象或者数组的深度比较（一次性递归到底）
      // 1.isEqual 是个一次性深度递归到底，所以慎用
      // 2. react 提供了PureComponent、memo 做浅比较
      if (_.isEqual(nextProps.list, this.props.list)) {
          // 相等，则不重复渲染
          return false
      }
      return true // 不相等，则渲染
  },
  handleAdd = (name) => {
    // 正确的用法
    this.setState({
      list: [...this.state.list, {
        id: `id-${Date.now()}`,
        name,
      }]
    })
    /** 为了演示 SCU ，故意写的错误用法 **/
    this.state.list.push({ // 直接修改原值，而不是用的setState
        id: `id-${Date.now()}`,
        title
    })
    // 导致shouldComponentUpdate中 nextProps 和 nextState相当，
    // 如果正好做了判断，会导致不渲染
    this.setState({ 
        list: this.state.list
    })
  }
}
/**PureComponent**/
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

/**memo**/
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);

/**immutable**/
const { Map, List } = require('immutable');const map1 = Map({ a: 1, b: 2, c: 3, d: 4 });const map2 = Map({ c: 10, a: 20, t: 30 });const obj = { d: 100, o: 200, g: 300 };const map3 = map1.merge(map2, obj);// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }const list1 = List([ 1, 2, 3 ]);const list2 = List([ 4, 5, 6 ]);const list3 = list1.concat(list2, array);
```
### React组件通讯
:::tip
* `props`: [父子组件] 回调函数
* `Context`: [跨组件层级] 导入并调用`createContext`方法，从结果中解构出 `Provider`, `Consumer` 组件
* `redux`: redux、mobx等的状态管理工具
* `evnet Bus`: 事件总线
:::
## Redux 和 React-Redux
![Redux](../assets/images/interview/41.jpg)
:::tip
1. redux是的诞生是为了给 React 应用提供「可预测化的状态管理」机制。
2. Redux会将整个应用状态(其实也就是数据)存储到到一个地方，称为store
3. 这个store里面保存一棵状态树(state tree)
4. 组件改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是state完成更新
5. 组件可以派发(dispatch)行为(action)给store,而不是直接通知其它组件
6. 其它组件可以通过订阅store中的状态(state)来刷新自己的视图
:::
### React-Redux
:::tip
* **store** store就是把action和reducer联系到一起的对象，store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态
* **Action**  是把数据从应用传到 store 的有效载荷,它是 store 数据的唯一来源,一般来说你会通过 store.dispatch() 将 action 传到 store。
* **reducer** 指定了应用状态的变化如何响应 actions并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state
* **Provider** 其实就只是一个外层容器，它的作用就是通过配合 connect 来达到跨层级传递数据。使用时只需将Provider定义为整个项目最外层的组件，并设置好store。那么整个项目都可以直接获取这个store。它的原理其实是通过React中的[Context]()来实现的
* **connect** 的作用是连接React组件与 Redux store，它包在我们的容器组件的外一层，它接收上面 Provider 提供的 store 里面的 state 和 dispatch，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件
1. `mapStateToProps` 的作用是将store里的state
2. `mapDispatchToProps` 的作用是将store里的action（操作数据的方法）绑定到指定组件的props中
:::
```js
/** Redux **/
// Redux主要通过subscribe订阅事件
// constructor(){
//   this.state = store.getState();
// }
store.subscribe(listener);
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
/** react-redux **/
// App.js
import store from './reducers'
import App from './components/App'
import { Provider } from 'react-redux'
// Provider:提供器，将store提供给子组件使用
export default function () {
    return <Provider store={store}>
        <App />
    </Provider>
}
// store.js
const store = createStore(reducers)
// const defaultState = {
  name: 'gordanlee',
  list: [1,2,3,4]
}
// reducers/userInfo
const userInfo = (state = defaultState, action) => {
  // state: 上一次store中的数据 action:
  switch (action.type) {
    case 'SET_NAME':
      // 注意，返回不可变数据,reducers 可以接受state,不可以直接修改
      return {
        ...state,
        name: action.value
      }
    default:
      return state
  }
}
export default userInfo
// actions
// 设置名字
export const SET_NAME = (value) => {
  return {
    type: 'SET_NAME',
    value
  }
}
// reducers
const reducers = combineReducers({reducers})
// App.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SET_NAME } from '../actions'
class Form extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <div>
          <input value={this.props.userInfo.name} onChange={this.props.handleSetName} />
          <button>提交</button>
        </div>
        <ul>
          <li>{this.props.userInfo.name}</li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => { // 把store中的数据映射成组件的Props
  return {
    userInfo: state.userInfo
  }
}
// store.dispatch方法映射到Props中
const mapDispatchToProps = (dispatch) => {
  return {
    handleSetName(e){
      dispatch(SET_NAME(e.target.value))
    }
  }
}
// connect 让组件和store做连接
export default connect(mapStateToProps, mapDispatchToProps)(Form)
```
### Redux 中间件
![中间件](../assets/images/interview/42.jpg)
:::tip
* 中间件（英语：Middleware），又译中间件、中介层，是一类提供系统软件和应用软件之间连接、便于软件各部件之间的沟通的软件，应用软件可以借助中间件在不同的技术架构之间共享信息与资源。中间件位于客户机服务器的操作系统之上，管理着计算资源和网络通信。

* redux中间件的中间指的是action和store之间，之前在redux中action只能返回一个对象，所以action返回的一个对象会直接派发给store，现在使用redux-thunk之后action可以返回一个函数了，action通过dispatch方法被传递给store，那么action和store之间就是dispatch这个方法。实际上中间件就是对dispatch方法的一个封装或者说对dispatch方法的一个升级。
:::
:::tip
`redux` 提供了类似后端 Express 的中间件概念，本质的目的是提供第三方插件的模式，自定义拦截 `action` -> `reducer` 的过程。变为 `action` -> `middlewares` -> `reducer` 。这种机制可以让我们改变数据流，实现如异步 `action` ，`action` 过滤，日志输出，异常报告等功能。

Redux store默认仅支持同步数据流,使用 thunk中间件 可以帮助在 Redux 应用中实现 异步的reducer(redux-thunk、redux-promise、redux-saga)
1. 调动dispatch派发一个新 action 对象
2. 调用 getState 获得当前 Redux Store 上的状态
3. 调用 next 告诉 Redux 当前中间件工作完毕，让 Redux 调用下一个中间件
4. 访问 action 对象 action 上的所有数据

* view -> action -> reducer -> store
* view -> action -> middleware -> reducer -> store
:::
函数柯里化[函数柯里化](https://www.jianshu.com/p/2975c25e4d71)
```js
// 函数柯里化 多参函数->单参函数
// 在官方的示例中，有一个logger实现的示例
const logger = store => next => action =>{
    console.log('prev state',store.getState()) //获取状态数据
    console.log('dispatch',action);
    let result = next(action);
    console.log('next state',store.getState());
    return result;
}

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```
## React 原理
### 函数式编程
:::tip
函数式编程是声明式编程的一部分。javascript中的函数是第一类公民，这意味着函数是数据，你可以像保存变量一样在应用程序中保存、检索和传递这些函数。
**函数式编程有些核心的概念，如下：**
* 不可变性(Immutability)
* 纯函数(Pure Functions)
* 数据转换(Data Transformations)
* 高阶函数 (Higher-Order Functions)
* 递归
* 组合
:::
### Vdom 和 diff算法
:::tip
diff（翻译差异）：计算一棵树形结构转换成另一棵树形结构的最少操作
* 参照vue Vdom 和 diff算法, 两者实现vdom细节都不同，核心概念和实现思路一致。
1. 把树形结构按照层级分解，只比较同级元素
2. 给列表结构的每个单元添加唯一的 key 属性，方便比较
3. React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
4. 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制
5. 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能
:::
### JSX本质
:::tip
JSX等同于Vue模板,Vue模板不是html
* React.createElement 即h函数，返回vnode
* 第一个参数，可能是组件，也可能是html tag
* 组件名首字母必须大写（react规定）
:::
```js
React.createElement("h1", {className: "main", onClick: (){}}, "内容" || children);
// 和vue 不同react子组可以数组[children]、也可以单个单个传递
React.createElement('div', null, clild1, clild2, clild4) 
React.createElement('div', null, []) 
// 第一个参数是组件
React.createElement(List, null, []) 
// JSX(可以使用babel在线转换试试)
const url = "../a.png";
const list = [1,2,3]
const imgElem = <div class="container">
        		 {list.map(()=>{
          			<span>test</span>
       			 })} 
        		 <img src={url} />
        	    </div>
// 
const url = "../a.png";
const list = [1, 2, 3];
const imgElem = /*#__PURE__*/React.createElement("div", {
  class: "container"
}, list.map(() => {
  /*#__PURE__*/
  React.createElement("span", null, "test");
}), /*#__PURE__*/React.createElement("img", {
  src: url
}));
```
### setState 和 batchUpdate
![batchUpdate](../assets/images/interview/43.jpg)
:::tip
* 有时异步(普通使用),有时同步(setTimeout、原生DOM事件)
* 有时合并(对象形式),有时不合并(函数形式)
* setState是否同步，看是否能命中bacthUpdate机制，判断isBatchingUpdates
* bacthUpdate可命中 生命周期、React中注册的事件等React可以“管理”的入口
:::
```js
  componentDidMount() {
    // 开始：处于batchUpdate
    // isBatchingUpdates = true
    this.setState({
      // 异步
      count: this.state.count + 1
    }); 
    setTimeout(() => {
     // 在setTimeout执行时,isBatchingUpdates已经false
      // 同步
      this.setState({
        count: this.state.count + 1
      });
    }, 0);
    // 结束
    // isBatchingUpdates = false
  }
```
### transaction(交易)事物机制
![transaction](../assets/images/interview/45.png)
![transaction](../assets/images/interview/44.png)
### 组件渲染和更新过程
:::tip
**渲染**
* 当页面一打开，就会调用render构建一棵DOM树
* 当数据发生变化（ state | props ）时，就会再渲染出一棵DOM树
* 此时，进行diff运算，两棵DOM树进行差异化对比，找到更新的地方进行批量改动
1. props state
2. render()生成vnode
3. patch(element, vnode)
**更新过程**
1. setState(newState) ==> dirtyComponents(可能有子组件)
setState修改之后会生成dirtyComponents(可能是当前组件或者子组件)，遍历它生成newVnode
2. render()生成newVnode
3. patch(element, vnode)
:::
### React-fiber
:::tip
**更新的分为两个阶段**
1. reconciliation(协调) 阶段 - 执行diff算法，纯JS计算
2. commit阶段 - 将diff结果渲染DOM
**可能会有性能问题**
1. JS是单线程，且和DOM渲染共用一个线程
2. 当组件足够复杂，组件更新时计算和渲染都压力大
3. 当同是再有DOM操作需求(动画,鼠标拖拽等),将卡顿
**解决方案 fiber**
* 将reconciliation阶段进行任务拆分(commit阶段无法拆分)
* DOM需要渲染时暂停，空闲时恢复重启各个子任务的执行
* window.requestIdleCallback
:::
## Hooks
:::tip
**历史问题：**
* 使用函数组件(无状态组件)无法使用 `state`、生命周期 以及其他的 `React` 特性
* 大型组件很难拆分和重构，很难测试(即class不易拆分)
* 复用逻辑变复杂，providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成**嵌套地狱**<br/>
**使用Hooks**
* React 提倡函数式编程 view = fn(props),单函数组件太简单，需要增强能力 ———— `Hooks`
:::
### State Hook
:::tip
**让函数组件实现`state` 和 `setState`**
* 默认函数组件没有`state`
* 函数组件是个纯函数，执行完即销毁，无法`state`
* 需要`State Hook`,即把state功能“钩”到纯函数中<br/>
**规范:**
 * 所有的Hooks都以use开头，如useXxx，包括自定义Hook
:::
```js
import React, { useState } from 'react'
function ClickCounter() {
  // 数组的解构
  const [count, setCount] = useState(0) 
  const [name, setName] = useState('gordanlee') 
  // 传入一个初始值, 返回数组，第一个元素是这个值，第二个是修改这个值的方法
  // const arr = useState(0)
  // count = arr[0]
  // count = arr[1]
  return <div>
    <p>{name}点击次数{count}</p>
    <button onClick={()=>{
      setCount(count + 1)
    }}>点击次数</button>
  </div>
}
export default ClickCounter
```
### useEffect
:::tip
* 默认函数组件没有生命周期
* 函数组件是一个纯函数，执行完即销毁，自己无法实生命周期
* 使用`Effect Hook` 把生命周期“钩”到纯函数中<br/>
**副作用**
* `useEffect`让纯函数有了副作用，默认情况下，执行纯函数，输入参数，返回结果，无副作用
* 所谓副作用，就是对函数之外造成影响，如果设置全局定时任务,数据获取,数据订阅，以及手动更改 React 组件中的 DOM 都属于副作用,因为我们渲染出的页面都是静态的，任何在其之后的操作都会对他产生影响，所以称之为副作用.
* 副作用又分为两种：（1）无需清除的副作用(送网络请求、手动变更 DOM、记录日志) （2）需要清除的副作用（添加DOM事件、定时器）
* 而组件需要副作用，需要`useEffect` "钩" 到函数中<br/>
**使用**
* 模拟`componentDidMount` - useEffect 依赖[]
* 模拟`componentDidUpdate` - useEffect 无依赖，或则依赖[a, b]
* 模拟`componentWillUnmount` - useEffect 中返回一个函数<br/>
**注意**
* `useEffect`的第二个参数为一个空数组，初始化调用一次之后不再执行，相当于`componentDidMount`
* `useEffect` 第二个参数时或者依赖[a, b],组件的初始化和更新都会执行返回FN,所以不完全等价class中 `componentWillUnmount`
:::
```js
import React, { useState, useEffect } from 'react'
function Lifecycle() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('gordanlee')
  // 可以模拟 class 组件的 DidMount 和 DidUpdate
  // useEffect(()=>{
  //   console.log('发送一个ajax请求')
  // })
  // 只模拟 class 组件的DidMount
  // useEffect(()=>{
  //   console.log('发送一个ajax请求')
  // }, []) // 第二个参数是空数组
  // 只模拟 class 组件的DidUpdate
  useEffect((e)=>{
    console.log('更新')
  }, [count, name]) // 第二个参数是依赖的state
  // 模拟componentWillUnmount
  useEffect(()=>{
    let timerId = window.setInterval(()=>{
      console.log(Date.now())
    }, 1000)
    // 返回一个函数，模拟componentWillUnmount
    return ()=> {
      window.clearInterval(timerId)
    }
  })

  function clickHandle() {
    setCount(count + 1)
    setName(name + 'Max')
  }
  return <div>
    <p>{name}点击了{count}次</p>
    <button onClick={clickHandle}>点击</button>
  </div>
}
export default Lifecycle
```
### useEffect 中返回的函数FN
:::tip
* `useEffect` 的第二个参数一个空数组, 组件销毁是执行fn,fn等于`componentWillUnmount`
* `useEffect` 第二个参数时或者依赖[a, b],组件的初始化和更新都会执行返回FN
* 即，下一次执行`useEffect`之前，就会执行fn,无论更新或卸载,所以不完全等价class中 `componentWillUnmount`
:::
```js
import React, {useState, useEffect} from 'react'
function FriendStatus({friendId}) {
  const [status, setStatus] = useState(false)
  // DidMount 和 DidUpdate
  useEffect(()=>{
    console.log(`开始监听 ${friendId}在线状态`)
    // 【特别注意】
    // 此处并不完全等同于 WillUnMount
    // props 发生变化，即更新，也会先执行结束监听
    // 准确的说: 返回的函数，会在下一次`effect`执行之前被执行
    return ()=>{
      console.log(`结束监听 ${friendId}在线状态`)
    }
  })
  return <div>
    好友 {friendId} 在线状态： {status.toString()}
  </div>
}
export default FriendStatus
```
### useMemo 
:::tip
* 父组件改变，`React`默认会更新所有子组件
* `class`组件使用`SCU` 和 `PureComponent` 做优化
* `Hooks` 中使用useMemo,但优化的原理是相同的
:::
```js
import React, { useState, memo, useMemo } from 'react'
// 子组件
// function Child({ userInfo}) {
//   console.log('Child render...', userInfo)
//   return <div>
//       <p>这是子组件{userInfo.name} {userInfo.age}</p>
//     </div>
// }
// 类似 class PireeComponent, 对props进行浅层比较
const Child = memo(({ userInfo}) => {
  console.log('Child render...', userInfo)
  return <div>
      <p>这是子组件{userInfo.name} {userInfo.age}</p>
    </div>
})
// 父组件
function App() {
  console.log('Parent render...')
  const [count, setCount] = useState(0)
  const [name, setName] = useState('goradanlee')
  // const userInfo = { name, age: 20 }
  // userInfo传静态值，子组件只依赖name、age，按理父组件改变后子组件不会受到影响，但是也被更新了
  /******/
  // 用 useMemo 缓存数据,有依赖
  const userInfo =  useMemo(()=>{
    return { name, age: 21}
  }, [name])

  return <div>
    <p>
       count is {count}
       <button onClick={()=>{
         setCount(count + 1)
       }}>增加</button>
    </p>
    <Child userInfo={userInfo} />
  </div>
}
export default App
```
### useCallback
:::tip
* `useMemo`缓存数据
* `useCallback`缓存函数
* 两者都是 `React Hooks` 的常见缓存策略
:::
```js
import React, { useState, memo, useMemo, useCallback } from 'react'
// 子组件
// 类似 class PireeComponent, 对props进行浅层比较
const Child = memo(({ userInfo, onChange}) => {
  console.log('Child render...', userInfo)
  return <div>
      <p>这是子组件{userInfo.name} {userInfo.age}</p>
      <input onChange={onChange}></input>
    </div>
})
// 父组件
function App() {
  console.log('Parent render...')
  const [count, setCount] = useState(0)
  const [name, setName] = useState('goradanlee')
  // 用 useMemo 缓存数据,有依赖
  const userInfo =  useMemo(()=>{
    return { name, age: 21}
  }, [name])
  // function onChange(e) {
  //   console.log(e.target.value)
  // }
  // 用 useCallback 缓存数据(如果不用会导致useMemo失效)
  const onChange = useCallback((e)=>{
    console.log(e.target.value)
  }, [])
  return <div>
    <p>
       count is {count}
       <button onClick={()=>{
         setCount(count + 1)
       }}>增加</button>
    </p>
    <Child userInfo={userInfo} onChange={onChange} />
  </div>
}
export default App
```
### useRef
:::tip
* DOM元素的获取
:::
```js
import React, { useRef, useEffect } from 'react'
function App() {
  const btnRef = useRef(null) // 初始值
  useEffect(()=>{
    console.log(btnRef.current) // DOM节点
  }, [])
  return <button ref={btnRef}>按钮</button>
}
export default App
```
### useContext
:::tip
* useContext可以帮助我们跨越组件层级直接传递变量，实现共享。
:::
```js
// 父
import React, { useState , createContext } from 'react';
const CountContext = createContext()
function Example(){
    const [ count , setCount ] = useState(0);
    return (
      <div>
          <p>You clicked {count} times</p>
          <button onClick={()=>{setCount(count+1)}}>click me</button>
          <CountContext.Provider value={count}></CountContext.Provider>
      </div>
    )
}
export default Example;
// 子
import React, { useState , createContext , useContext } from 'react';  
function Counter(){
    const count = useContext(CountContext)    //一句话就可以得到count
    return (<h2>{count}</h2>)
}
```
### Vue 和 React一些区别
:::tip
**相同点**
1. 都支持组件化
2. 都是数据驱动视同
3. 都使用vdom操作dom
**不同点**
1. React 使用JSX拥抱JS, Vue使用模板拥抱html
2. React函数式编程,Vue声明式编程
3. React更多需要自力更生(手动挡)，Vue把想要的都给你
**细的**
4. `Vue` 定义了很多指令(如v-for、v-if)去实现一些展示，`React` 主要还是依赖JS方法去实现
5. `Vue` 绑定事件 `Event` 是原生的和DOM事件一样, 而 `React` 是封装组合之后的 `SyntheticBaseEvent` 需要访问`nativeEvent` 才能获取原生`Event`。
6. `Vue` 使用 `v-model` 语法糖实现双向数据绑定，而`React`则需要自己绑定`onChange` 事件
:::
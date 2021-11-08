---
sidebar: auto
---
# 前端面试指北
## React相关知识
### 什么是 React
:::tip
React是一个简单的javascript UI库，用于构建高效、快速的用户界面。它是一个轻量级库，因此很受欢迎。它遵循组件设计模式、声明式编程范式和函数式编程概念，以使前端应用程序更高效。它使用虚拟DOM来有效地操作DOM。它遵循从高阶组件到低阶组件的单向数据流。
:::
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
### Vue React一些区别
:::tip
1. `Vue` 定义了很多指令(如v-for、v-if)去实现一些展示，`React` 主要还是依赖JS方法去实现
2. `Vue` 绑定事件 `Event` 是原生的和DOM事件一样, 而 `React` 是封装组合之后的 `SyntheticBaseEvent` 需要访问`nativeEvent` 才能获取原生`Event`。
3. `Vue` 使用 `v-model` 语法糖实现双向数据绑定，而`React`则需要自己绑定`onChange` 事件
:::
### 为什么React中事件绑定的函数内部this默认指向undefined?
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
:::tip
1. `Event` 是封装组合之后的 `SyntheticBaseEvent`, 模拟出来的DOM事件所有能力
2. `event.nativeEvent` 是原生事件对象
3. 和 DOM 事件不一样, 和 Vue 事件也不一样
4. 在`React17`之前，`React`是把所有事件委托在`document`上的，`React17`及以后版本不再把事件委托在`document`上，而是委托在挂载的容器上了。
React合成事件是指将原生事件合成一个React事件，之所以要封装自己的一套事件机制，目的是为了实现全浏览器的一致性，抹平不同浏览器之间的差异性(如标准事件模型、IE)。
:::
```js
// 定义捕获事件
Vue: <div @click.capture="handleClick" />
React: <div onClickCapture={this.onClickOuter} />
// React绑定事件，最后都会追加Event参数
```
### 受控和非受控组
:::tip
* **受控组件：** 控制着输入的过程，`react`的`state`为唯一的数据来源，被`react.state`这样控制着的就是受控组件(相当于实现数据绑定)。
* **非受控组件：** 在html表单中，input select checkbox textarea等输入组件，本身就会维护一个状态，来暂存输入值。如果不需要关心控制值是怎么修改更新的，只需要获取这个组件的值，那么这个就是非受控组件，我们只需要拿到值，可以通过ref来获取。
:::
### setState
:::tip
1. 不可变值(为了性能优化,不去触发shouldComponentUpdate)
2. 可能是异步更新
3. 可能会被合并
:::
```js
 // this.state.count++ // 错误的写法
  // setState一定要用不可变值了
 // 只能用setState去修改值，禁止提前修改值，而导致触发shouldComponentUpdate
  this.setState({
    count: this.state.count + 1 // SCU
  })
```


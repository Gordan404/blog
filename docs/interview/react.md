---
sidebar: auto
---
# 前端面试指北
## React相关知识

### Vue React一些区别
:::tip
1. `Vue` 定义了很多指令(如v-for、v-if)去实现一些展示，`React` 主要还是依赖JS方法去实现
2. `Vue` 绑定事件 `Event` 是原生的和DOM事件一样, 而 `React` 是封装组合之后的 `SyntheticBaseEvent` 需要访问`nativeEvent` 才能获取原生`Event`。
:::

### 为什么React中事件绑定的函数内部this默认指向undefined?
:::tip
函数的作用域是由函数调用的时候决定的，而不是函数声明的时候。第一次调用是作为对象中的函数调用，因此this指向对象本身。而第二次调用是作为普通函数调用，所以this指向全局对象，在严格模式时会指向undefined。

**解决办法：**
1. 使用es6箭头函数，箭头函数this默认指向上一层级的环境    如   <input onChange={()=>this.change()}  />
2. 使用bind绑定this  ，写在constructor里  　如  this.change = this.change.bind(this);  
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
3. 在`React17`之前，`React`是把所有事件委托在`document`上的，`React17`及以后版本不再把事件委托在`document`上，而是委托在挂载的容器上了。
React合成事件是指将原生事件合成一个React事件，之所以要封装自己的一套事件机制，目的是为了实现全浏览器的一致性，抹平不同浏览器之间的差异性(如标准事件模型、IE)。
:::
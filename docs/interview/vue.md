---
sidebar: auto
---
# 前端面试指北

## VUE相关面试题

强烈建议阅读[Vue源码分析](/vueAnalysis/introduction/)

### 为什么 data 是一个函数
:::tip
组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的对象的独立拷贝data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果，跟JS的引用类型相关，而非Vue.
:::

### 组件中写name选项有什么作用
:::tip
1、组件keep-alive缓存用name搭配exclude过滤
2、组件递归调用
3、组件安装
4、vue-devtools调试工具name 对应组件名称
:::
### v-if 和 v-show 的区别
:::tip
v-if 在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点。

v-show 会被编译成指令，条件不满足时控制样式将对应节点隐藏 （display:none）
:::
### computed和watch的区别
:::tip
1. `computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存(data里不变还是不会重新计算的)，只有当计算值变化才会返回内容，它可以设置 `getter` 和 `setter`。
2. 从使用场景上说，`computed`适用一个数据被多个数据影响，而`watch`适用一个数据影响多个数据；
3. `computed` 是在`Dep.update()`，执行之后，数据更新之前,watch 是在set刚开始的时候添加回调用，可以监听数据变化情况
4. `watch`监听引用类型需要设置`deep:true`
:::
**运用场景：**
* 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
* 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
```js
// 先来看看computed最最核心的代码， 脏检查, 执行计算
 if (watcher.dirty) {
    watcher.evaluate()
  }
 // Dep更新依赖
 if (Dep.target) {
    watcher.depend()
 }

const vm = {
    data: {
      name: '狗蛋'
    }
    computed: {
      info:{
        get: function () {
          console.log("调用了getter属性");
          return this.name + '牛逼'
        },
        set: function (newValue) {
          console.log("调用了settter属性");
          console.log(newValue);
          this.name = '狗蛋Plus';
        },
      }  
    }
};
// 第一次访问 `this.name` 的时候, 会调用相应的 get(),记录了依赖项 `name`
1、在 computed 初始化的过程中会创建一个 watcher 并设置lazy=true,所以在初始化时会求值，在页面中调用 computed 时，开始求值，调用 watcher.evaluate()方法,并将 dirty=false。
2、当 computed依赖的属性发生改变时，会调用 watcher.update() 方法，将dirty=true。
3、当在页面中再次获取该属性时，会再次调用 如果dirty为 truewatcher.evaluate() 方法，否则返回原来计算的值。这就是computed 为什么具有缓存效果的原因。
```
### v-if 与 v-for 为什么不建议一起使用
:::tip
v-for 和 v-if 不要在同一个标签中使用,因为解析时先解析 v-for 优先级高于 v-if,这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果遇到需要同时使用时可以考虑写成计算属性的方式。
:::
### v-for 为什么要加 key
:::tip
key 是为 Vue 中 vnode 的唯一标记，当diff oldCh 和 newCh 四种比较方式没有匹配到，如果设置了key就会用key比较，如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。通过这个 key，我们的 diff 操作可以更准确、更快速
更准确：因为带 key 就不是原地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
更快速：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快
:::
```js
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```
### Vue组件通信
* 父子组件通信
* 兄弟组件通信
* 跨多层级组件通信
* 任意组件
#### 父子通信
:::tip
1. 父组件通过 `props` 传递数据给子组件，子组件通过 `emit` 发送事件传递数据给父组件
2. 父组件`v-model`(语法糖),子组件派发`this.$emit('input', 1)`
3. 通过访问 `$parent` 或者 `$children` 对象来访问组件实例中的方法和数据
4. Vue 2.3 及以上版本的话还可以使用 `$listeners`、`$attrs` 和 `.sync` 属性
:::
* $attrs：当前组件的属性，通俗的讲也就是在组件标签定义的一系列属性，如input的value，placeholder等，但是不包括在当前组件里面定义的props属性
* $listeners：当前组件监听的事件，通俗的讲也就是在使用组件的时候在标签中定义的事件，如@input，以及一些自定义事件
* 当前组件中使用`v-bind="$attrs"`、`v-bind="$props"`,`v-on="$listeners"`也就是把之前父组件那里给它的属性再全部传到它的子组件
* 多级组件传多个值时，调用目标组件绑定$attrs，可直接获取根组件所传递参数，而不用每一级组件逐层传递。例如：组件二次封装，想保留之前属性方法，并且扩展新属性方法。
```
<!--父组件中-->
<input :value.sync="value" />
<!--以上写法等同于-->
<input :value="value" @update:value="v => value = v"></comp>
<!--子组件中-->
<script>
  this.$emit('update:value', 1)
</script>
```

#### 兄弟组件通信
:::tip
对于这种情况可以通过查找父组件中的子组件实现，也就是 `this.$parent.$children`，在 `$children` 中可以通过组件 name 查询到需要的组件实例，然后进行通信。
:::
#### 跨多层次组件通信
:::tip
provide / inject，虽然文档中不推荐直接使用在业务中，但是如果用得好的话还是很有用的。
假设有父组件 A，然后有一个跨多层级的子组件 B,element表单中有使用(disabled)
:::
```
// 父组件 A
export default {
  provide: {
    data: 1
  }
}
// 子组件 B
export default {
  inject: ['data'],
  mounted() {
    // 无论跨几层都能获得父组件的 data 属性
    console.log(this.data) // => 1
  }
}
```
#### 任意组件
:::tip
这种方式可以通过 Vuex 或者 Event Bus（Vue本身就有EventBus能力，不需要再引入EventBus） 解决，另外如果你不怕麻烦的话，可以使用这种方式解决上述所有的通信情况
* Vuex: UserInfo、getUserInfo、logout
* Event Bus: $on不会自己销毁，需要我们手动给销毁，否则会重复触发,甚至造成内存泄漏，在keep-alive中尤为明显。
:::
### 组件生命周期
![VUE](../assets/images/interview/21.png)
:::tip
* beforeCreate 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问
* created 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。这里没有$el,如果非要想与 Dom 进行交互，可以通过 vm.$nextTick 来访问 Dom
* beforeMount 在挂载开始之前被调用：相关的 render 函数首次被调用。
* mounted 在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点
* beforeUpdate 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁（patch）之前。可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程
* updated 发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新，该钩子在服务器端渲染期间不被调用。
* beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。我们可以在这时进行善后收尾工作，比如清除计时器。
* destroyed Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
* activated keep-alive 专属，组件被激活时调用
* deactivated keep-alive 专属，组件被销毁时调用
* errorCaptured(错误调用)：当捕获一个来自后代组件的错误时被调用
:::
### 父子组件的渲染顺序
:::tip
* 加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
* 子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程
父beforeUpdate->父updated
* 销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
:::
### $nextTick 原理和使用场景
建议阅读有关[nextTick源码](https://juejin.cn/post/6939704519668432910#heading-4)
:::tip
1. Vue 是异步渲染,$nextTick 会在DOM渲染之后被触发回调，以获取最新的DOM节点。
2. 页面渲染时会将data的修改做整合，多次data的修改会合并成一次DOM渲染，否则渲染过于频繁太耗性能了。
* $nextTick内部实现了microtask队列
2.5 之前会使用`Mutation.Observe`, 2.5之后是用优雅降级`setImmediate`-`MessageChannel`-`Promise`-`setTimeout`
:::
```js
let callbacks = [];
let pending = false;
function flushCallbacks() {
  pending = false; //把标志还原为false
  // 依次执行回调
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }
}
let timerFunc; //定义异步方法  采用优雅降级
if (typeof Promise !== "undefined") {
  // 如果支持promise
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
} else if (typeof MutationObserver !== "undefined") {
  // MutationObserver 主要是监听dom变化 也是一个异步方法
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== "undefined") {
  // 如果前面都不支持 判断setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  // 最后降级采用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

export function nextTick(cb) {
  // 除了渲染watcher  还有用户自己手动调用的nextTick 一起被收集到数组
  callbacks.push(cb);
  if (!pending) {
    // 如果多次调用nextTick  只会执行一次异步 等异步队列清空之后再把标志变为false
    pending = true;
    timerFunc();
  }
}
```
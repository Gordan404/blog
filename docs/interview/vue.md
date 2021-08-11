---
sidebar: auto
---
# 前端面试指北

## VUE相关面试题

强烈建议阅读[Vue源码分析](/vueAnalysis/introduction/)
### v-if 和 v-show 的区别
:::tip
v-if 在编译过程中会被转化成三元表达式,条件不满足时不渲染此节点。

v-show 会被编译成指令，条件不满足时控制样式将对应节点隐藏 （display:none）
:::
### computed和watch的区别
:::tip
1. `computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容，它可以设置 `getter` 和 `setter`。
2. 从使用场景上说，`computed`适用一个数据被多个数据影响，而`watch`适用一个数据影响多个数据；
3. `computed` 是在`Dep.update()`，执行之后，数据更新之前,watch 是在set刚开始的时候添加回调用，可以监听数据变化情况
4. `watch`监听引用类型需要设置`deep:true`
:::
**运用场景：**
* 当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
* 当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
```js
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
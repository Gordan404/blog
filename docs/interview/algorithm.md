---
sidebar: auto
---
# 前端进阶指北

## 简单题
### 手写getQueryString
```js 
// document.createElement('a')​
var url = 'https://www.baidu.com/s?id=123&name=why&phone=13876769797';
// 正则
function getQueryString(name){
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)
  return unescape(r[2]);
  return null;
}
// 二
function getQueryString(name) {
  var strs = '';
  var index = url.indexOf('?');
  if (index === -1) {
    return undefined
  }
  strs = url.substring(index+1).split('&');
  for (let index = 0; index < strs.length; index++) {
    var splitItem = strs[index].split('=');
    if(splitItem[0]==name) {
      return splitItem[1];
    }
  }
};
// 测试：输出why
console.log(getQueryString('name')); 
```
### 对象组装URL地址
```js
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
```


### 根据对象路径获取值lodash._get
```js
// 简版lodash._get
var obj = {
  a: {
    b: [
      { 
        name: 'gordanlee',
        age: undefined
      }
    ]
  }
}
function _get (source, path) {
  // a[3].b -> a.3.b
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  // 匹配[],替换成.
  let res = source;
  for (const p of paths) {
    // hasOwnProperty可以区分undefiend
    if(!res.hasOwnProperty(p)) {
      throw new Error('error')
    }
    res = res[p]
  }
  return res
}
get_(obj, 'a.b[0].name')
```

### 手写call、apply和bind方法
```js
// call
Function.prototype._call = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
// apply  第二个参数是个数组
Function.prototype._apply = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  var result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return result;
}

// bind 这个方法在IE6~8下不兼容
Function.prototype._bind = function() {
  var _self = this, args = [...arguments];
  return function() {
    return _self.apply(args[0], args.slice(1));
  }
}
function foo() {
  console.log(this.age);
}
var obj = {
  age: 121
}
var newFunc = foo._bind(obj);
```
### 手写once 方法
```js
function runOnce(fn, context) { //控制让函数只触发一次
  return function () {
    try {
      fn.apply(context || this, arguments);
    }
    catch (e) {
      console.error(e);//一般可以注释掉这行
    }
    finally {
      fn = null;
    }
  }
}
var obj = {name: "狗子", age: 24};
var canOnlyFireOnce = runOnce(function () {
  console.log("你好" + this.name);
}, obj);
canOnlyFireOnce(); //你好
canOnlyFireOnce(); // nothing
```
### 手写函数防抖
:::tip
函数防抖：函数防抖的核心思路是利用setTimeout延迟执行某个方法，只有在指定的事件后才执行，中间触发的事件不执行。最常见的函数防抖就是，搜索框只有用户在输入完毕后才去服务器执行查询。
:::
```js
function debounce(fn, delay = 500) {
  var timer;
  return function () {
    var context = this;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...arguments);
    }, delay);
  }
}
window.onresize = debounce(function() {
  console.log('window onresize end');
}, 500)
```
### 手写函数节流
:::tip
函数节流：将原本1秒可能执行10次的函数，节流成1秒只执行2次-3次，有许多函数需要节流，例如：(window.onresize事件、mouseover事件、scroll事件、其他事件，避免频繁回流)
:::
```js
function throttle(func, delay = 500) {
  //上次执行时间 
  let previous = 0; 
  return function() {
      //现在的时间 
      let now = Date.now(); 
      var context = this;
      var args = arguments;
      var now = Date.now();
      if (now - previous >= delay) { // 第一次回立马执行
          func.apply(context, args);
          prev = Date.now();
          previous = now
      }
  }
}
document.body.onmousemove= throttle(function () { console.log(1) },1000) 
```
### 手写Promise
:::tip
**简易Promise：** 简易Promise并不完全符合Promise/A+规范，但面试时能写出简易Promise算是已经过关了。
:::
```js
// Promise简版 的实现不考虑任何异常情况
function Promise(fn) {
  this.cbs = [];
  const resolve = (value) => {
    setTimeout(() => {
      this.data = value;
      this.cbs.forEach((cb) => cb(value));
    });
  }
  fn(resolve);
}

Promise.prototype.then = function (onResolved) {
  return new Promise((resolve) => {
    this.cbs.push(() => {
      const res = onResolved(this.data);
      if (res instanceof Promise) {
        res.then(resolve);
      } else {
        resolve(res);
      }
    });
  });
};
// promise三个状态：pending(等待)、resolved(完成)、rejected(拒绝)
/** Promise A+ **/
const PENDING = 'PENDING'
const RESOLVE = 'RESOLVE'
const REJECT = 'REJECT'
const resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError(xxx))
    }
    let called;
    if ((typeof x === 'object' && typeof x !== 'null') || typeof x === 'function') {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => { // 根据promise的状态来决定是成功还是失败
                    // resolve(y)
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) return
                    called = true
                    reject(err)
                })
            } else {
                reject(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x) // 普通值
    }
}
class PromiseA {
    constructor(executor) {
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = []
        this.onRjectedCallBacks = []
        this.status = PENDING
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVE
                this.value = value
                this.onFulfilledCallbacks.forEach(fn => fn())

            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECT
                this.reason = reason
                this.onRjectedCallBacks.forEach(fn => fn())
            }
        }
        executor(resolve, reject)
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
        let promise2 = new PromiseA((resolve, reject) => {
            if (this.status === RESOLVE) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        // resolve(x) 普通值
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                })

            }
            if (this.status === REJECT) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)

                        // resolve(x) 普通值
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }

                })
            }
            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            // resolve(x) 普通值
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    })
                })
                this.onRjectedCallBacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            // resolve(x) 普通值
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    })
                })
            }
        })
        return promise2

    }
}
module.exports = PromiseA
```
### 手动实现promise.all
```js
function _PromiseAll(promises){
    return new Promise((resolve, reject)=>{
        // 参数判断
        if(!Array.isArray(promises)){
            throw new TypeError("promises must be an array")
        }
        let result = [] // 存放结果
        let count = 0 // 记录有几个resolved
        promises.forEach((promise, index) => {
            promise.then((res)=>{
                result[index] = res
                count++
                count === promises.length && resolve(result) // 判断是否已经完成
            }, (err)=>{
                reject(err)
            })
        })
    })
}
```
### 手动实现promise 超时
```js
function promiseTimeout(promise, delay){
  let timeout = new Promise(function (reslove, reject){
    setTimeout(function (){
      reject('超时啦~')
    }, delay)
  })
  return Promise.race([timeout, promise])
}
```
### 手写简易深拷贝
```js
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  // Object.keys()返回属性key，但不包括不可枚举的属性
  // Reflect.ownKeys()返回所有属性key
  // ownKeys 返回所有自有属性key，不管是否可枚举，但不包括继承自原型的属性
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```
### 手写数组去重方法
```js
// ES6
Array.from(new Set(arr))
// indexOf
var arr2 = [1,2,2,3,4,5,2,6]
function unique(arr){
  var newArr = []
  for (let index = 0; index < arr.length; index++) {
    if(newArr.indexOf(arr[index]) === -1){
      newArr.push(arr[index])
    }
  }
  return newArr
}
// Map + 双指针
function unique2 (arr) {
  let map = new Map();
  let newArray = [];
  let newEndIdx = arr.length - 1;
  let newStartIdx = 0;
  while (newStartIdx <= newEndIdx) {
    const sIndex = newStartIdx++;
    const eIndex = newEndIdx--;
    if(!map.has(arr[sIndex])) {
      map.set(arr[sIndex], true);
      newArray.push(arr[sIndex])
    }
    // eIndex == newEndIdx 数组长度为基数会多遍历一次
    if(eIndex !== sIndex && !map.has(arr[eIndex])) {
      map.set(arr[eIndex], true);
      newArray.push(arr[eIndex])
    }
  }
  return newArray;
}

```
### 数组平铺
```js
// 一、ES6flat
/** 原生Array.prototype.flat方法接受一个depth参数，默认值为1，depth表示要降维的维数： **/
const arr = [1, [2, 3], [4, [5, 6]]]
console.log(arr.flat(1))         // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(Infinity))  // [1, 2, 3, 4, 5, 6]
// 二、递归调用
function flat(arr){
  var newArr = [];
  for(var i= 0; i<arr.length;i++){
    if(Array.isArray(arr[i])){
      newArr = newArr.concat(flat(arr[i]))
    } else {
      newArr.push(arr[i]);
    }    
  }
  return newArr;
}
// 三、replace + split
ary = str.replace(/(\[|\])/g, '').split(',')
// 四、toString
function flatten(arr) {
    // toString '1,2,3,4,5,6'
   return arr.toString().split(',').map(function(item){
    return +item
  })
}
```
### 发布订阅模式
```js
class EventBus {
  constructor() {
    this.handleMaps = {} // 初始化一个存放订阅回调方法的执行栈
  }
  // 订阅方法，接收两个参数
  // type: 类型名称
  // handler：订阅待执行的方法
  on(type, handler) {
    if (!(handler instanceof Function)) {
      throw new Error('别闹了，给函数类型') // handler 必须是可执行的函数
    }
    // 如果类型名不存在，则新建对应类型名的数组
    if (!(type in this.handleMaps)) {
      this.handleMaps[type] = []
    }
    // 将待执行方法塞入对应类型名数组
    this.handleMaps[type].push(handler)
  }
  // 发布方法，接收两个参数
  // type：类型名称
  // params：传入待执行方法的参数
  emit(type, params) {
    if (type in this.handleMaps) {
      this.handleMaps[type].forEach(handler => {
        // 执行订阅时，塞入的待执行方法，并且带入 params 参数
      	handler(params)
      })
    }
  }
  // 销毁方法
  off(type) {
    if (type in this.handleMaps) {
      delete this.handleMap[type]
    }
  }
}
var _eventBus =  new EventBus()
_eventBus.on('say', (e) => {
  console.log('e')
})  
_eventBus.emit('say', { name: 'gordanle'} )
```
### 获取dom下的所有节点
```js
  function getDom(dom) {
    var list = []
    var domChildren = dom.childNodes
    for (var i = 0; i < domChildren.length; i++) {
      // nodeType === 1 是元素节点，2是属性节点。
      if (domChildren[i].nodeType === 1) {
        list.push(domChildren[i])
        var retArr = getDom(domChildren[i])
        list = list.concat(retArr)
      }
    }
    return list
  }
  getDom(document.querySelector('body'))
```
### 手写rem布局原理
```js
 <meta name="viewport" content="width=device-width,initial-scale=1,minimun-scale=1,maximum-scale=1,user-scalable=no">
(function(){
    var html = document.querySelector('html');
    changeRem();
    window.addEventListener('resize', changeRem);
    function changeRem() {
        var width = html.getBoundingClientRect().width;
        html.style.fontSize = width / 10 + 'px';
    }
})()
```
### 函数柯里化
```js
function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function(){
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
          return curry.call(this,fn,newArgs);
        }else{
          return fn.apply(this,newArgs);
        }
    }
}
function multiFn(a, b, c) {
    return a * b * c;
}
var multi = curry(multiFn);
console.log(multi(2)(3)(4)); //24
console.log(multi(2,3,4)); //24
console.log(multi(2)(3,4)); //24
```
### 手写原生Ajax请求
```js
// 1.创建XMLHttpRequest对象
// 2.使用open方法设置和服务器的交互信息
// 3.使用send发送数据
// 4.注册事件
#
var xhr = new XMLHttpRequest();
xhr.open('get','https://www.baidu.com/getUserInfo?name=AAA&age=18');
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState ==4 && xhr.status==200) {
    console.log('请求成功');
  }
}
```
### sleep 队列
```js
class Zeus{
  constructor(name){
    this.name = name
    this.queue = [start];
    function start(resolve) {
      console.log(`Hi! This is ${name}`);
      resolve();
    }
    setTimeout(() => {
      let start = Promise.resolve();
      for (let i = 0; i < this.queue.length; i++) {
        start = start.then(() => new Promise(this.queue[i]));
      }
    })
  }
  eat(food) {
    function eatFood(resolve) {
      console.log(`Eat ${food}~`);
      resolve();
    }
    this.queue.push(eatFood);
    return this;
  }
  sleepFn(time){
    return function fn(resolve){
      console.log(`等待${time}秒...`);
      setTimeout(()=>{
        console.log(`Wake up after ${time}`)
        return resolve();
      }, time * 1000);
    }
  }
  sleep(time) {
    this.queue.push(this.sleepFn(time));
    return this;
  }
  sleepFirst(time) {
    this.queue.splice(0, 0, this.sleepFn(time));
    return this;
  };
}
function Person(){
  return new Zeus(...arguments);
}
```
### 最大并发控制
```js
class TaskQueue {
  constructor(max = 2) {
    this.taskList = []
    this.max = max
  }
  add(task) {
    this.taskList.push(task)
  }
  run() {
    if(!this.taskList.length) {return
    }
    const min = Math.min(this.taskList.length, this.max)
    for (let index = 0; index < min; index++) {
      this.max--; // 执行最大并发递减
      const task = this.taskList.shift();
      task().finally(()=>{ // 重：当所有请求完成并返回结果后，执行finally回调，此回调将按照for循环依次执行，此时max为0.
        this.max++;  // 超过最大并发10以后的任务将按照任务顺序依次执行。此处可理解为递归操作。
        this.run()
      })
    }
  }
}
const T1 = new TaskQueue(2);
const task = () => {
  return new Promise((resolve)=>{
    setTimeout(() => {
      console.log('xxxx___11')
      resolve()
    }, 1000);
  })
}
T1.add(task)
T1.add(task)
T1.add(task)
T1.add(task)
T1.run();
```
### 大数相加
```js
console.log(sum(11111111111111111, 11111111111111111)) // 22222222222222224
console.log(sum(9007199254740992, 1))// 9007199254740992
// “~”运算符（位非）用于对一个二进制操作数逐位进行取反操作。
// 第 1 步：把运算数转换为 32 位的二进制整数。
// 第 2 步：逐位进行取反操作。
// 第 3 步：把二进制反码转换为十进制浮点数。
function sumStrings(a,b){
  var res = ''; // 结果
  var flag = 0;
  var a = a.toString().split(''); // 转换成数组
  var b = b.toString().split('');
  while (a.length || b.length || flag ){
      flag  += ~~a.pop() + ~~b.pop(); // 从末尾开始相加~~(按位非)取反并转数字
      // ~~true // 1     ~0 // -1  ~~0 // 0   ~~undefined // 0
      res = flag  % 10 + res; // 十进制取余数拼接字符串
      flag  = flag >9; // falg转为1或者0，为了表示进1或进
  }
  return res.replace(/^0+/,''); // 去掉开头的0
}
```
## LeeCode
### JS中sort函数的底层实现机制？
:::tip
js中`sort`内置多种排序算法，是根据要排序数的乱序程度来决定使用哪一种排序方法。V8 引擎 sort 函数只给出了两种排序 `InsertionSort` 和 `QuickSort`，长度小于20的使用InsertionSort(插入排序)，大于20的数组则使用 QuickSort(快速排序)
:::
### 冒泡排序
```js
// 1、比较相邻的两个元素，如果前一个比后一个大，则交换位置。  
// 2、比较完第一轮的时候，最后一个元素是最大的元素。  
// 3、这时候最后一个元素是最大的，所以最后一个元素就不需要参与比较大小。
function bSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len-1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
         // 相邻元素两两对比，元素交换，大的元素交换到后面
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
        }
    }
  }
  return arr;
}
```
### 快速排序
```js
// 1.  在数组中，找一个基准点P，然后splice出去；
// 2.  将数组中小于改基准点的数据放在一个数组，大于基准点的数据放在一个数组；
// 3.  对左边的数组进行递归操作，对右边的数组递归操作，最后concat起来，并返回
function quickSort(arr){
    if(arr.length<=1){ //如果数组中只有一位数，返回数组
        return arr;
    }
    var mNumIndex = Math.floor(arr.length/2); //取基准值的下标
    var mNum = arr.splice(mNumIndex,1)[0];  //取基准值
    var left = [];  //左边数组 
    var right = []; //右边数组
    for(var i=0;i<arr.length;i++){
        if(arr[i]<mNum){  //如果数组小于基准值，放在左边数组
            left.push(arr[i]);
        }else{            ///否则
            right.push(arr[i]);
        }
    }        
    return quickSort(left).concat([mNum],quickSort(right));
    //返回左边数组+基准值+右边数组
}
```
### 插入排序
```js
function insertSort(arr) {
  let length = arr.length;
  for(let i = 1; i < length; i++) {
    let temp = arr[i];
    for(let j = i; j > 0; j--) {
      if(arr[j] >= arr[j-1]) {
        break;      // 当前考察的数大于前一个数，证明有序，退出循环
      }
      arr[j] = arr[j-1]; // 将前一个数复制到后一个数上
    }
    arr[j] = temp;  // 找到考察的数应处于的位置
  }
  return arr;
}
```
### [同类项统计]输出出现次数最多的字母对应的前缀数字之和
```js
// 给定数组['1a','2b','13c','5a']，数组元素的格式是一个数字（可能多位）前缀与一个字母的组合，输出出现次数最多的字母对应的前缀数字之和。
  const arr = ['1a', '2b', '13c', '5a'] 
  function findMaxLetter(array) {
    var map = {}
    var max = null
    for (let index = 0; index < array.length; index++) {
      const item = array[index];
      // const key = item.match(/[a-zA-Z]/)
      // const value = item.match(/[0-9]/)*1
      // const key = item.substring(item.length - 1, item.length)
      // const value = item.substring(0, item.length - 1)*1
      const key = item.substr(item.length - 1, 1)
      const  value = item.substr(0, item.length-1)*1
      if(!map[key]){
        map[key] = {
          count: 1,
          total: value
        }
      } else {
        map[key].total += value
        map[key].count ++
      }
      if (!max) {
        max = map[key]
      } else {
        const current = map[key]
        if(current.count> max.count) {
          max = current
        }
      }
    }
    console.log(map, max)
  }
  findMaxLetter(arr)
```
### 斐波那契额数列
```js
/** 1、1、2、3、5、8、13、21
2 = 1*2-0
3 = 2*2-1
5 = 3*2-1
8 = 5*2-2
13= 8*2-3
21=13*2-5
**/
// 递归
var fn = function(n) {
  if(n<=2){
    return n;
  }
  return fn(n-1) + fn(n-2);
};
console.log(fn(3));
// for
function fn2(n) {
  var a = [];
  a[0]=0;
  a[1]=1;
  a[2]=1;
  var i;
  for(i=3;i< n;i++){
    a[i] = 2*a[i-1]-a[i-3];/*关键句*/
  }
  return a[a.length - 1] // 结果
  // return a // 每一步
}
// 动态规划

var climbStairs3 = function(n){
  let arr = [];
  arr[0] = 0;
  arr[1] = 1;
  for (let index = 2; index <= n; index++) {
   arr[index] = arr[index-1] + arr[index-2]
  }
  return arr[n];
}
```
### 最长回文子串
```js
/**
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案
**/
// 中心扩展法
var longestPalindrome = function(s) {
    let result = s[0] || "";
    for (let i = 0; i < s.length; i++) {
        for (let j = 1; j <= 2; j++) { //偶数奇数回文串
            let left = i, right = i + j;
            while(left >= 0 && right < s.length && s[left] === s[right]) {
                left--, right++; //向外扩展直到两端不相同
            };
            let length = right - left - 1; //(right - 1) - (left + 1) + 1
            if (length > result.length) {
                result = s.substr(left + 1, length);
            }
        }
    }
    return result;
};
```
### 394字符串解码
```js
/**
输入：s = "3[a]2[bc]"
输出："aaabcbc"
**/
var decodeString = function(s) {
    let reg = /(\d+)\[([a-zA-Z]+)\]/g;
    while(s.indexOf('[')>0){
        s = s.replace(reg,(_,...[num,str])=>{
            let result = "";
            for(let i=0;i<num-0;i++){
                result += str;
            }
            return result;
        });
    }
    return s;
};
var decodeString2 = function(s, t) {
    return s === (t = s.replace(/(\d+)\[(\w+)\]/g, (_, b, c) => c.repeat(b))) ? t : decodeString(t)
};
// 双栈
var decodeString3 = function(s) {
    let mulStack = [], strStack = [], num = 0, res = ''
    for (const c of s) {   
        if (!isNaN(c)) {  
            num = num * 10 + (c - '0')
        } else if (c == '[') {  
            strStack.push(res)
            mulStack.push(num) 
            res = '' 
            num = 0
        } else if (c == ']') {  
            res = strStack.pop() + res.repeat(mulStack.pop())
        } else {                   
            res += c
        }
    }
    return res;
};

```
### 无重复字符的最长子串
```js
/**
输入: s = "abcabcdb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
**/
var lengthOfLongestSubstring = function(s) {
   var str=[],maxLength=0;
   // var maxStr = []
   for(let i =0;i<s.length;i++){
       let index = str.indexOf(s[i]);
       if(index>-1){
           str.splice(0,index+1);  // 如果有重复,把首个0至缓存的第一位重复删除
       }
       str.push(s[i]);  // 当前不重复的字符串
       //  maxStr = str.length > maxStr.length ? [...str] : maxStr
       maxLength = Math.max(maxLength,str.length);
   }
   return maxLength;
};

var lengthOfLongestSubstring = function(s) {
    let map = new Map(), max = 0
    for(let i = 0, j = 0; j < s.length; j++) {
        if(map.has(s[j])) {
            i = Math.max(map.get(s[j]) + 1, i)
        }
        max = Math.max(max, j - i + 1)
        map.set(s[j], j)
    }
    return max
};
```
### 两数之和
```js
/**
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
**/
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};
```
### 洗牌算法，随机排序
```js
function randomsort2 (arr) {
  const newarr = []
  while (arr.length) {
    // parseInt取整数位
    const ran = parseInt(Math.random() * arr.length)
    newarr.push(arr[ran])
    arr.splice(ran, 1)
  }
  return newarr    
}   
function randomsort3 (arr) { 
  return arr.sort(() => Math.random() - 0.5)   
}
```
### 给定一个整数数组，判断是否存在重复元素
```js
/**
示例 1:
输入: [1,2,3,1]
输出: true
示例 2:
输入: [1,2,3,4]
输出: false
示例 3:
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
**/
function isRepeat(arr) {
  for (let index = 0; index < array.length; index++) {
    if(map.has(array[index])){
      console.log('array[index]', index, array[index])
      return true
    } else {
      map.set(array[index])
    }
  }
  return false
}
// 双指针
function isRepeat(array) {
  let map = new Map();
  let newStartIdx = 0;
  let newEndIdx = array.length - 1;
  while (newStartIdx <= newEndIdx) {
    const sIndex = newStartIdx++;
    const eIndex = newEndIdx--;
    if(!map.has(array[sIndex])){
      map.set(array[sIndex])
    } else {
      return true
    }
    // 下标相等
    if(sIndex === eIndex) { return false }
    if(!map.has(array[eIndex])){
      map.set(array[eIndex])
    } else {
      return true
    }
  }
  return false
}
```
### 最长有效括号
```js
/**
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
**/
// 在栈中预置 -1 作为“参照物”，并改变计算方式：当前索引 - 出栈后新的栈顶索引。

// 当遍历到索引 5 的右括号，此时栈顶为 2，出栈，栈顶变为 -1，有效长度为 5 - (-1)。如果照之前那样，5 找不到 -1 减。
// 现在有个问题：当遍历到索引 6 的右括号，它不是需要入栈的左括号，又没有左括号可匹配，怎么处理它？
// 它后面也可能出现这么一段有效长度，它要成为 -1 那样的“参照物”。它之前出现的有效长度都已计算，-1 的使命已经完成了，要被替代。
// 所以我们照常让 -1 出栈。重点是，此时栈空了，让索引 6 入栈取代它。
// 总结：两种索引会入栈
// 等待被匹配的左括号索引。
// 充当「参照物」的右括号索引。因为：当左括号匹配光时，栈需要留一个垫底的参照物，用于计算一段连续的有效
const longestValidParentheses = (s) => {
  let maxLen = 0;
  const stack = [];
  stack.push(-1);
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c == '(') {       // 左括号的索引，入栈
      stack.push(i);
    } else {              // 遍历到右括号
      stack.pop();        // 栈顶的左括号被匹配，出栈
      if (stack.length) { // 栈未空
        const curMaxLen = i - stack[stack.length - 1]; // 计算有效连续长度
        maxLen = Math.max(maxLen, curMaxLen);          // 挑战最大值
      } else {            // 栈空了
        stack.push(i);    // 入栈充当参照
      }
    }
  }
  return maxLen;
};

```
### 剑指 Offer II 099. 最小路径之和
```js
/**
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。

输入：grid = [[1,2,3],[4,5,6]]
输出：12
https://leetcode-cn.com/problems/0i0mDW/
**/
// 5. 动态规划：从起始点到终点
var minPathSum3 = function(grid) {
    const m = grid.length, n = grid[0].length

    // 状态定义：dp[i][j] 表示从 [0,0] 到 [i,j] 的最小路径和
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))

    // 状态初始化
    dp[0][0] = grid[0][0]

    // 状态转移
    for (let i = 0; i < m ; i++) {
        for (let j = 0; j < n ; j++) {
            if (i == 0 && j != 0) {
                dp[i][j] = grid[i][j] + dp[i][j - 1]
            } else if (i != 0 && j == 0) {
                dp[i][j] = grid[i][j] + dp[i - 1][j]
            } else if (i != 0 && j != 0) {
                dp[i][j] = grid[i][j] + Math.min(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    // 返回结果
    return dp[m - 1][n - 1]
}
```
### 快乐数
```js
/**
对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果 可以变为  1，那么这个数就是快乐数。
输入：n = 19  
输出：true
解释：
19 分为 1 和 9
1² + 9² = 82
8²+ 2²= 68
6²+ 8²= 100
1²+ 0²+ 0²= 1
**/

// 笨比解法, 大致思路就是, 一个数的每一位的最大平方和, 也就是每一位都等于9的时候, 那么你会发现这个数其实是越来越小越来越小, 从中找到规律发现最终都会变为个位, 所有数几乎都是, 而个位数里为快乐数的只有1和7。

// 递归对字符串进行处理，base case判断n<10的情况
var isHappy = function(n) {
    if(n<10){
        console.log(n)
        return (n==1||n==7)?true:false
    }
    let temp=n.toString()
    n=0
    for(let i=0;i<temp.length;i++){
        n+=temp[i]**2   
    }
    return isHappy(n)
};

// 成功的例子(19)

// 19 => 1 + 81
// 82 => 64 + 4
// 68 => 36 + 64
// 100 => 1 + 0 + 0
// 失败的例子(20)

// 20 => 4 + 0
// 4 => 16
// 16 => 1 + 36
// 37 => 9 + 49
// 58 => 25 + 64
// 89 => 64 + 81
// 145 => 1 + 16 + 25
// 42 => 16 + 4
// 20 可以看到, 20再次重复出现了, 所以永远不可能等于1
// 那思路就是利用set.has()判断重复, 就return false

const isHappy = n => {
  let set = new Set(), sum;
  n = n.toString()
  while (sum !== 1) {
    sum = 0
    for (let i = 0; i < n.length; i++) {
      sum += Math.pow(n[i], 2)
      // sum += n[i]*n[i]
    }
    n = sum + ''
    if (set.has(sum)) return false
    set.add(sum)
  }
  return true
}
```
### 剑指 Offer 09. 用两个栈实现队列
```js
/**
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
简单明了，带你直接看懂题目和例子。 输入： ["CQueue","appendTail","deleteHead","deleteHead"] 这里是要执行的方法，从左到右执行
[[],[3],[],[]]对应上面的方法，是上面方法的参数。CQueue和deleteHead方法不需要指定数字，只有添加才需要指定数字
1.创建队列，返回值为null
2.将3压入栈，返回值为null
3.将栈底的元素删除，也就是消息队列中先进来的元素，所以是deleteHead，返回该元素的数值，所以为3
4.继续删除栈底的元素，但是没有元素了，所以返回-1
所以就有了下面的输出 输出：[null,null,3,-1]
示例 2： 输入： ["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
1.创建队列，返回值为null
2.删除栈底的元素，但是没有元素，所以返回-1
3.把5压入栈，返回null
4.把2压入栈，返回null
5.删除栈底的一个元素，也就是消息队列中先进来的元素，所以是deleteHead，就是最先进来的5，返回值为5，
6.删除栈底的一个元素，就是后进来的2，返回值为2，
所以就有了下面的输出
输出：[null,-1,null,null,5,2]
有没有发现先进来的数字，首先显示出来了，但是题目中说要使用栈，栈是先进后出的，使用栈来实现先进先出，在这里使用两个栈就好了，从一个进来再到另一个栈，这样顺序就是先进先出了。题目的主旨写在第一句，就是，使用两个栈实现一个队列。
**/
var CQueue = function () {
  this.stackA = [];
  this.stackB = [];
};
/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stackA.push(value);
};
// 思路是进队列永远从a栈进入
// 出队列永远从b栈出，只有b栈没有了就从a栈中轮流倒腾到b
// 总之出队列一定是从b栈出
/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  // 两个栈都没有元素
  if (!this.stackA.length && !this.stackB.length) return -1;
  // 只有每次 (出栈)stack2 空了，才将 (入栈)stack1 中的元素加入到 stack2
  // 这样才可以保证 队列的 特性: 先进先出
  // 删除栈没元素，从插入栈拿
  if (!this.stackB.length) {
    while (this.stackA.length) {
      this.stackB.push(this.stackA.pop());
    }
  }
  // 删除栈有元素，直接删
  return this.stackB.pop();
};
//  var obj = new CQueue()
//  obj.appendTail(value)
//  var param_2 = obj.deleteHead()
```
## 链表
:::tip
1、链表是链式存储结构，数组是顺序存储结构
2、链表通过指针连接元素与元素，而数组则是把所有元素按顺序进行存储
3、链表的插入和删除元素比较简单，不需要移动元素，且较为容易实现长度的扩充，但是查询元素比较困难，数组是查询比较快，但是删除和增加会比较麻烦。
:::
### 链表和数组区别
:::tip
链表是链式存储结构，数组是顺序存储结构；链表通过指针连接元素，而数组则是把所有元素按顺序进行存储；链表插入和删除元素不需要移动元素，数组删除和增加元素需要移动元素。
:::
### 单向链表
:::tip
* 每个链表都有一个头指针，指向第一个节点，没节点则指向NULL,最后一个节点的指针指向空（NULL）
* 每个节点(node)都由数据本身和一个指向后续节点的指针组成
* 整个链表的存取必须从头指针开始，头指针指向第一个节点
:::
```js
  /**声明一个链表节点**/
  class Node {
    constructor(value) {
      this.value = value
      this.next = null // 默认null
    }
  }
  class NodeList {
    constructor(arr) {
      // 声明头部节点
      let head = new Node(arr.shift())
      let next = head
      arr.forEach(item=>{
        next.next = new Node(item)
        next = next.next
      })
       // 链表只暴露一个head
      return head
    }
  }
```
### 剑指 Offer 22. 链表中倒数第k个节点
```js
/**
 给定一个链表: 1->2->3->4->5, 和 k = 2.
 返回链表 4->5.
**/
var getKthFromEnd = function(head, k) {
    let node = head, n = 0;
    while (node) {
        node = node.next;
        n++;
    }
    node = head;
    for (let i = 0; i < n - k; i++) {
        node = node.next;
    }
    return node; 
};
var getKthFromEnd = function(head, k) {
  let next = head;
  let count = 0;
  const arr = []
  while (next !== null) {
    count++
    arr.push(next)
    next = next.next
  }
  return arr[arr.length - k]
}
```
### 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
```js
/**
示例 1:
输入: 1->1->2
输出: 1->2
示例 2:
输入: 1->1->2->3->3
输出: 1->2->3
**/
  const list = new NodeList([1, 2, 3, 3,4,4])
  function deleteDuplicates(head) {
    var cur = head
    while (cur && cur.next !== null) {
      if(cur.value === cur.next.value) {
        cur.next = cur.next.next
      }
      cur = cur.next
    }
    return head
  }
```
### 分割链表 
```js
/**
给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于或等于 x 的节点都出现在 x 的节点之前,大于位置不变。
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
输入：head = [2,1], x = 2
输出：[1,2]
**/
var partition = function(head, x) {
    let left = new Node(0); // 初始化一个空节点，初始赋值为0，指针指向为list
    const leftHead = left;
    let right = new Node(0);
    const rightHead = right;
    while (head !== null) {
        if (head.value < x) {
            left.next = head;
            left = left.next;
        } else {
            right.next = head;
            right = right.next;
        }
        head = head.next;
    }
    right.next = null;
    left.next = rightHead.next;
    return leftHead.next;
};
const list = new NodeList([1, 4, 3, 2, 5, 2])
console.log(partition(list, 3))
```
### 单链表的反转
```js
var reverseList = function(head) {    
  var pre = null
  var current = head
  while (current !== null) {
    var next = current.next
    current.next = pre
    pre = current
    current = next
  }
  return pre
}
```
###  K 个一组翻转链表
```js
/**
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
输入：head = [1,2,3,4,5], k = 1
输出：[1,2,3,4,5]
**/
var reverseKGroup = function(head, k) {
    if(k === 1) return head
    let dummy = new ListNode(-1), pre = dummy
    let cur = head
    // 反转 [first -> last) 之间的结点
    const reverseNode = (first, last) => {
        let m = k
        while(m--){
            let next = first.next
            first.next = pre.next
            pre.next = first
            first = next
        }
    }
    while(cur){
        let cnt = 0, last = cur, before
        while(last && cnt < k){
            before = last
            last = last.next
            cnt++
        }
        // 足够k个,可以反转
        if(cnt === k){
            reverseNode(cur, last)
            // 将反转后的链表结点与后续结点续上
            cur.next = last
        }else{
            // 不足k个,此时last必然是null
            // 将cur直接指向last的前一个
            cur = before
        }
        pre = cur
        cur = cur.next
    }
    return dummy.next
};
```
## 二叉树
### 翻转一棵二叉树
```js
/**
示例：
输入：
   4
  / \
 2   7
/ \ / \
1 3 6  9
输出：
   4
  / \
 7   2
/ \ / \
3 1 9  6
**/
var fn = function(node){
    if(node.left === null && node.right === null) return node
    var t = node.left
    node.left = node.right
    node.right = t
    fn(node.left)
    fn(node.right)
    return node
}
```
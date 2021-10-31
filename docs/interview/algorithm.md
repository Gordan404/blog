---
sidebar: auto
---
# 前端面试指北

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
Function.prototype._bind= function(obj){
    var _self = this, args = arguments;
    return function() {
        _self.apply(obj, Array.prototype.slice.call(args, 1));
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
canOnlyFireOnce(); //你好天涯孤雁
canOnlyFireOnce(); // nothing
```
### 手写函数防抖
:::tip
多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行(联想输入)。
:::
```js
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...arguments);
    }, delay || 500);
  }
}
window.onresize = debounce(function() {
  console.log('window onresize end');
}, 500)
```
### 手写函数节流
:::tip
节流: 触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用(window.onresize事件、mouseover事件、scroll事件、其他事件，避免频繁回流)
:::
```js
function throttle(func, delay = 500) {
  var prev = Date.now();
  return function() {
      var context = this;
      var args = arguments;
      var now = Date.now();
      if (now - prev >= delay) {
          func.apply(context, args);
          prev = Date.now();
      }
  }
}
```
### 手写Promise
:::tip
**简易Promise：** 简易Promise并不完全符合Promise/A+规范，但面试时能写出简易Promise算是已经过关了。
:::
```js
// promise三个状态：pending(等待)、resolved(完成)、rejected(拒绝)
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
// 简易Promise
function MyPromise(fn) {
  const self = this;
  self.state = PENDING;
  self.value = null;
  self.resolvedCallbacks = [];
  self.rejectedCallbacks = [];
  // 完成方法
  function resolve(value) {
    if(self.state===PENDING) {
      self.state = RESOLVED;
      self.value = value;
      self.resolvedCallbacks.map(cb => cb(self.value));
    }
  }
  // 拒绝方法
  function reject(value) {
    if(self.state === PENDING) {
      self.state = REJECTED;
      self.value = value;
      self.rejectedCallbacks.map(cb => cb(self.value));
    }
  }
  // 执行传入的方法
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
// then方法
MyPromise.prototype.then = function(success, error) {
  const self = this;
  success = typeof success === 'function' ? success : v => {
    return v;
  };
  error = typeof error === 'function' ? error : r => {
    throw r;
  };
  if(self.state === PENDING) {
    self.resolvedCallbacks.push(success);
    self.rejectedCallbacks.push(error);
  }
  if(self.state === RESOLVED) {
    success(self.value);
  }
  if(self.state === REJECTED) {
    error(self.value)
  }
}
// 执行自定义Promise
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 3000)
}).then(value => {
  console.log(value);
}, error => {
  console.log(error);
})

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
  // ownKeys 目标对象自身的属性键组成的数组
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
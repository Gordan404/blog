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

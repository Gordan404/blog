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
canOnlyFireOnce(); //你好天涯孤雁
canOnlyFireOnce(); // nothing
```
### 手写函数防抖
:::tip
多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行(联想输入)。
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
节流: 触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用(window.onresize事件、mouseover事件、scroll事件、其他事件，避免频繁回流)
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
  let result = new Array(n+1);
  result[1] = 1; //到第一阶有1种
  result[2] = 2; //到第二阶有2种
  for(let i = 3; i<n+1; i++){
    result[i] = result[i-1] + result[i-2];
  }
  return result[n];
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
    let p1 = head;
    let p2 = null;
    while(p1){
        const temp = p1.next;
        p1.next = p2;
        p2 = p1;
        p1 = temp;  
    }
    return p2;
}
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
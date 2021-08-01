---
sidebar: auto
---
# 前端面试指北

## 浏览器相关基础面试题

### 事件机制

#### 注册事件
注册事件，我们一般使用`addEventListener(name, callback, boolean)`函数，该函数支持三个参数，参数说明如下：
1. `name`：代表待注册事件的名字，例如：`click`或者`mouseover`
2. `callback`：代表注册事件的回调函数
3. `boolean`：一个`boolean`值，为`true`代表事件捕获时触发，为`false`时代表事件冒泡时触发。参数缺省时默认为`false`
```js
// 一个注册事件的案例
// 点击DOM元素时。顺序打印出：捕获时触发 冒泡时触发
var box = document.getElementById('box');
box.addEventListener('click', () => {
  console.log('捕获时触发');
}, true);
box.addEventListener('click',() => {
  console.log('冒泡时触发');
}, false);
```


#### 事件触发顺序
在浏览器中，事件的触发顺序一般而言依据：**捕获**->**目标阶段**->**冒泡**三个顺序。但事件的触发顺序并不总是按以上顺序执行，当我们给同一个DOM元素同时注册捕获和冒泡事件时，事件的触发顺序是按你注册事件的顺序来执行的。
```js
// 点击DOM元素时。顺序打印出：冒泡时触发 捕获时触发
var box = document.getElementById('box');
box.addEventListener('click',() => {
  console.log('冒泡时触发');
}, false);
box.addEventListener('click', () => {
  console.log('捕获时触发');
}, true);
```

**阻止事件冒泡：** `stopPropagation()`和`stopImmediaPropagation()`方法都能阻止事件的向上冒泡，但这两者是有区别的：`stopImmediaPropagation()`还能阻止目标执行别的注册事件。
```js
// 阻止事件冒泡
// 1. 当不阻止冒泡时，window的click会触发
// 2. 当使用stopPropagation()时，window的click不会被触发
// 3. 当使用stopImmediatePropagation()时，DOM的捕获事件不会触发，window的click不会触发
var box = document.getElementById('box');
box.addEventListener('click',(event) => {
  console.log('冒泡时触发');
  // event.stopPropagation();
  // event.stopImmediatePropagation();
}, false);
box.addEventListener('click', (event) => {
  console.log('捕获时触发');
}, true);
window.addEventListener('click', (event) => {
  console.log('子元素点击事件向上冒泡时触发');
})
```

### 跨域
::: tip 同源策略
同源策略是指，一个源的客户端脚本在没有明确授权的情况下，不能访问另一个源的客户端脚本。当一个URL和另一个URL，只要**协议**、**域名**或者**端口号**有一个不同，则就会出现跨域。
解决跨域常用方法有：
1. JSONP
2. CORS
3. document.domain
4. postMessage
:::

#### JSONP实现跨域
::: tip 原理
JSONP实现跨域的原理是利用`script`标签没有跨域限制，通过`src`指向一个`ajax`的URL，最后跟一个回调函数`callback`
:::
```js
// 一个JSONP跨域的案例
<script src="http://www.baidu.com/getUserInfo?name=张三&callback=jsonp"></script>
function jsonp() {
  console.log('JSONP实现跨域');
}
```
```js
// 实现自己的JSONP
var jsonp = function (url, data, callback) {
  var cbName = 'callback_' + new Date().getTime();
  var queryString = url.indexOf('?') == -1 ? '?' : '&';
  for (var k in data) {
    queryString += k + '=' + data[k] + '&';
  }
  queryString += 'callback=' + cbName;
  var script = document.createElement('script');
  script.src = url + queryString;
  window[cbName] = function (data) {
    callback(data);
    document.body.removeChild(script);
  };
  document.body.appendChild(script);
}
// 实测
jsonp('http://api.douban.com/v2/movie/in_theaters', {'count': 1}, function (data) {
  console.log(data)
})
```

#### CORS实现跨域
::: tip
CORS：`CORS`需要浏览器和后端同时配合才能生效，后端通过设置`Access-Control-Allow-Origin`就可以开启哪些域名可以使用`CORS`跨域，在进行`CORS`跨域请求时，会出现简单请求或者复杂请求。
:::

**CORS简单请求**：当请求方式为`get`，`head`、`post`之一并且`Content-Type`为`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`三种之一时，就是简单请求。

**CORS复杂请求：** 当不符合简单请求时，就是复杂请求，对于复杂请求来说，首先会发送一个`option`请求，用于知道服务器是否允许跨域请求。

#### document.domain实现跨域
::: tip
document.domain只能用于**二级域名相同**的情况下
```js
// 域名a.test.com 和域名b.test.com
// 设置如下代码后，二级域名为test.com的网站都能实现跨域
document.domain = 'test.com'
```
:::

#### postMessage
::: tip
`postMessage`一般用于获取嵌套在页面中的第三方页面的数据，一个页面发送请求，另外一个页面判断来源并接受请求。
:::
```html
<body>
  <iframe src="https://www.baidu.com" frameborder="0"></iframe>
</body>
```
```js
// 父页面发送请求
window.frames[0].postMessage('getcolor','*');
// 父页面接受请求
window.addEventListener('message',function(e){
  console.log(e.data); // 打印red
},false);

// 子页面发送请求
window.addEventListener('message',function(e){
  window.parent.postMessage('red','*');
},false);
```

### 浏览器存储
::: tip
浏览器存储有如下四种方法，每种方法都有不同支持，具体特性请参考表格
1. cookie
2. localStorage
3. sessionStorage
4. indexDB
:::

![浏览器存储四种方法](../assets/images/interview/4.png)

#### Cookie
**设置cookie**
```js
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
setCookie('name', 'why', 30);
```

**获取cookie**
```js
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}
setCookie('name', 'why', 30);
console.log(getCookie('name')); // 打印why
```

#### localStorage 和 sessionStorage
**设置localStorage和sessionStorage**
```js
localStorage.setItem('name','why');
sessionStorage.setItem('age',23);
```

**获取localStorage和sessionStorage**
```js
localStorage.setItem('name','why');
console.log(localStorage.getItem('name')); // 打印why
sessionStorage.setItem('age',23);
console.log(sessionStorage.getItem('age'));// 打印23
```

#### service worker
`Service Worker`是运行在浏览器背后的独立进程，一般可以用来实现缓存功能，实现`Service Worker`的话，必须使用https传输协议，一个实现`Service Worker`缓存`js`文件可以如下写
```js
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./1.js').then(success => {
    console.log('注册成功');
  }).catch(error => {
    console.log('注册失败');
  })
}
```

## 浏览器其他面试题
一个浏览器数据请求会经历三个步骤：**发起网络请求**、**后端处理**、**浏览器响应**。浏览器缓存可以让我们在第一步和第三步中优化性能。

### 缓存机制

#### 缓存位置
::: tip
缓存在不同的位置，它的优先级是不同的，缓存按优先级可以划分为：
1. Service Worker可以让我们自由控制应该缓存哪些文件(PWA实现的重要手段)
2. Memory Cache(内存缓存)内存缓存读取效率高，但一旦我们关闭了浏览器，内存缓存也就没有了。
3. Disk Cache(硬盘缓存)与内存缓存相比，硬盘缓存具有量大以及时效的两大优点。
4. Push Cache当前三者缓存都没有命中时，才会读取Push Cache中的缓存信息，但此种方式的缓存信息时间较短，只在会话`Session`中存在，一旦会话结束也就释放了。
5. 当以上缓存都没有命中时，才会发起请求。
:::

#### 缓存策略
::: tip
通常来说，浏览器缓存策略分为两种：**强缓存**和**协商缓存**，缓存策略可通过HTTP Header来实现。
:::

**强缓存：** 强缓存可以通过设置`Expires`和`Cache-Control`来实现，强缓存表示在缓存期间，不需要请求，`State Code`为200，`Cache-Control`可以组合使用多个指令，常见指令如下所示：

![缓存指令](../assets/images/interview/7.png)

**协商缓存：** 协商缓存表示如果缓存过期了，那么就需要重新发起请求验证资源是否有更新，可通过设置HTTP Header的`Last-Modified`和`ETag`来实现，如果资源没有改变，`State Code`为304

### 渲染原理

#### DOM树
浏览器在接受到服务器传递回来的字节流数据后，会经过转换，把`0`和`1`的字节流数据转换成DOM树结构，会经历如下图所示的过程：

![DOM树渲染结构过程](../assets/images/interview/8.png)
最终可能回渲染成如下的DOM树结构：

![DOM树结构](../assets/images/interview/9.png)

#### CSSDOM
与DOM树渲染过程类似，CSSOM树渲染过程会经历如下图所示的过程：

![CSSOM渲染过程](../assets/images/interview/10.png)

#### DOM和CSSOM树合并
当DOM树和CSSOM树渲染完毕后，就会合并在一起形成一个渲染树，渲染树并不是简单的将DOM树和CSSOM树简单的合并在一起，渲染树只包含需要显示的DOM节点。渲染树合并完毕后，然后会根据渲染树进行布局，随后调用GPU进行绘制，显示在屏幕上。

![渲染树](../assets/images/interview/11.png)


## 安全防范面试题

### XSS跨域脚本攻击
::: tip
XSS攻击简单来说就是攻击者想尽一切办法把可执行的代码嵌入到页面中，以达到非法窃取某些数据或者破坏的目的。
:::
依据情景的不同，XSS攻击可分为几种类型。
#### 反射性XSS
反射性XSS也叫做非持久性XSS，是指发生请求时，XSS代码会出现在请求的URL中，作为参数提交到服务器，服务器接受并响应。响应结果中包含XSS代码，最后通过浏览器进行解析并执行，一个反射性XSS可能如下所示
```js
function ajax(url) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(url.split('?')[1]);
    }, 1500)
  })
}
var url = 'https://www.baidu.com/getUserInfo?name=<script>alert(document.cookie)</script>';
ajax(url).then(data => {
  document.body.insertAdjacentHTML('beforeend', data.split('=')[1])
})
```

#### 存储型XSS
存储型XSS也叫持久性XSS，它的主要攻击方式是将代码发送到服务器，最常见的存储型XSS攻击就是评论或者浏览攻击，一个存储型XSS可能如下图所示：

![储存性XSS攻击](../assets/images/interview/12.png)

#### XSS防御
::: tip
1. 将由用户输入的内容，进行必要的标签转义，包括`<`、`>`、`/`等
2. 再服务端设置`cookit`属性`httpOnly`防止客户端通过`document.cookie`读取
3. 过滤一些危险属性或者方法，例如`onerror`方法、`href`属性、`src`属性等
:::


### CSP内容安全策略
::: tip
CSP内容安全策略本质上来说是建立白名单机制，告诉浏览器哪些外部资源可以加载和执行，我们只需要配置，拦截主要交给浏览器。
:::

通常有两种方法设置CSP：
1. 通过设置`HTTP Header`的`Content-Security-Policy`
2. 通过`meta`标签来设置，例如：`<meta http-equiv="Content-Security-Policy">`

### CSRF跨域请求伪造
::: tip
CSRF攻击原理上是攻击者伪造一个后端请求地址，诱导用户进行点击，如果用户在已登录的情况下点击了这个危险链接，则后端服务器会认为是用户在正常访问，攻击者从而可以从请求中拿到一些信息，进而进行攻击。
:::
#### CSRF防御
::: tip
CSRF防御有如下几种方式：
1. `Get`请求不对数据进行修改
2. 不让第三方网站访问用户的`Cookie`，可以通过`Cookie`的`SameSite`属性
3. 阻止第三方网站请求
4. 在进行请求时，附加`refer`验证和`token`验证
:::

### 点击劫持
::: tip
点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
:::

#### 防御手段
设置HTTP响应头`X-FRAME-OPTIONS`，它可以设置`DENY`、`SAMEORIGIN`、`ALLOW-FROM`分别表示不允许`iframe`展示、只允许永远`iframe`展示、表示页面可以在指定来源的`iframe`中展示。


### 中间人攻击
::: tip
中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。一般来说使用`HTTPS`协议可以有效防止中间人攻击，但并不是说`HTTPS`就可以高枕无忧，因为攻击者可以通过某种方式从`HTTPS`降级到`HTTP`进行访问。
:::

![中间人攻击](../assets/images/interview/13.jpg)

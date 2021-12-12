"use strict";(self.webpackChunkgordan404wiki=self.webpackChunkgordan404wiki||[]).push([[9471],{4972:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t={key:"v-6cea32af",path:"/vueAnalysis/reactive/api.html",title:"变化侦测API实现",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"Vue.set实现",slug:"vue-set实现",children:[]},{level:2,title:"Vue.delete实现",slug:"vue-delete实现",children:[]},{level:2,title:"Vue.observable实现",slug:"vue-observable实现",children:[]}],filePathRelative:"vueAnalysis/reactive/api.md",git:{updatedTime:1626972344e3,contributors:[{name:"lishuaixingNewBee",email:"vae.china@foxmail.com",commits:1}]}}},814:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});const t=(0,a(5314).uE)('<h1 id="变化侦测api实现" tabindex="-1"><a class="header-anchor" href="#变化侦测api实现" aria-hidden="true">#</a> 变化侦测API实现</h1><p>在上一节中，我们分析了变化侦测一些问题，在这一节中我们来分析一下为了解决这些问题，<code>Vue.js</code>是如何实现相关<code>API</code>的。</p><h2 id="vue-set实现" tabindex="-1"><a class="header-anchor" href="#vue-set实现" aria-hidden="true">#</a> Vue.set实现</h2><p><code>Vue.set</code>和<code>vm.$set</code>引用的是用一个<code>set</code>方法，其中<code>set</code>方法被定义在<code>observer/index.js</code>文件中：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">set</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">|</span> Object<span class="token punctuation">,</span> key<span class="token operator">:</span> any<span class="token punctuation">,</span> val<span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>\n    <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPrimitive</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Cannot set reactive property on undefined, null, or primitive value: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span>target<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isValidArrayIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    target<span class="token punctuation">.</span>length <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span>length<span class="token punctuation">,</span> key<span class="token punctuation">)</span>\n    target<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> val\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> target <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val\n    <span class="token keyword">return</span> val\n  <span class="token punctuation">}</span>\n  <span class="token keyword">const</span> ob <span class="token operator">=</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>__ob__\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>_isVue <span class="token operator">||</span> <span class="token punctuation">(</span>ob <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">.</span>vmCount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>\n      <span class="token string">&#39;Avoid adding reactive properties to a Vue instance or its root $data &#39;</span> <span class="token operator">+</span>\n      <span class="token string">&#39;at runtime - declare it upfront in the data option.&#39;</span>\n    <span class="token punctuation">)</span>\n    <span class="token keyword">return</span> val\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val\n    <span class="token keyword">return</span> val\n  <span class="token punctuation">}</span>\n  <span class="token function">defineReactive</span><span class="token punctuation">(</span>ob<span class="token punctuation">.</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>\n  ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> val\n<span class="token punctuation">}</span>\n</code></pre></div><p>在代码分析之前，我们来回顾一下<code>Vue.set</code>或者<code>vm.$set</code>的用法：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      obj<span class="token operator">:</span> <span class="token punctuation">{</span>\n        a<span class="token operator">:</span> <span class="token string">&#39;a&#39;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      arr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 添加对象新属性</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">)</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">.</span>b<span class="token punctuation">)</span> <span class="token comment">// b</span>\n\n    <span class="token comment">// 往数组中添加新元素</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;AAA&#39;</span><span class="token punctuation">)</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// AAA</span>\n\n    <span class="token comment">// 通过索引修改数组元素</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;BBB&#39;</span><span class="token punctuation">)</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// BBB</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>代码分析：</p><ul><li><code>set</code>方法首先对传入的<code>target</code>参数进行了校验，其中<code>isUndef</code>判断是否为<code>undefined</code>，<code>isPrimitive</code>判断是否为<code>JavaScript</code>原始值，如果满足其中一个条件则在开发环境下提示错误信息。</li></ul><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 提示错误</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><ul><li><p>随后通过<code>Array.isArray()</code>方法判断了<code>target</code>是否为数组，如果是再通过<code>isValidArrayIndex</code>判断是否为合法的数组索引，如果都满足则会使用变异<code>splice</code>方法往数组中指定位置设置值。其中，还重新设置了数组的<code>length</code>属性，这样做是因为我们传入的索引可能比现有数组的<code>length</code>还要大。</p></li><li><p>接着判断是否为对象，并且当前<code>key</code>是否已经在这个对象上，如果已经存在，则我们只需要进行重新复制即可。</p></li><li><p>最后，通过<code>defineReactive</code>方法在响应式对象上面新增一个属性，<code>defineReactive</code>方法已经在之前介绍过，这里不再累述。在<code>defineReactive</code>执行完毕后，马上进行派发更新，通知响应式数据的依赖立即更新，可以说以下两段代码是<code>set</code>方法核心中的核心：</p></li></ul><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token function">defineReactive</span><span class="token punctuation">(</span>ob<span class="token punctuation">.</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">)</span>\nob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="vue-delete实现" tabindex="-1"><a class="header-anchor" href="#vue-delete实现" aria-hidden="true">#</a> Vue.delete实现</h2><p>解决完新增属性的问题后，我们来解决以下删除属性的情况，<code>Vue.delete</code>和<code>vm.$delete</code>使用的是同一个<code>delete</code>方法，它被定义在<code>observer/index.js</code>文件中：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">del</span> <span class="token punctuation">(</span><span class="token parameter">target<span class="token operator">:</span> Array<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">|</span> Object<span class="token punctuation">,</span> key<span class="token operator">:</span> any</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>\n    <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPrimitive</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Cannot delete reactive property on undefined, null, or primitive value: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token punctuation">(</span>target<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isValidArrayIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    target<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">const</span> ob <span class="token operator">=</span> <span class="token punctuation">(</span>target<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>__ob__\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>_isVue <span class="token operator">||</span> <span class="token punctuation">(</span>ob <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">.</span>vmCount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>\n      <span class="token string">&#39;Avoid deleting properties on a Vue instance or its root $data &#39;</span> <span class="token operator">+</span>\n      <span class="token string">&#39;- just set it to null.&#39;</span>\n    <span class="token punctuation">)</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">delete</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>在代码分析之前，我们来回顾以下<code>Vue.delete</code>或者<code>vm.$delete</code>的用法：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      obj<span class="token operator">:</span> <span class="token punctuation">{</span>\n        a<span class="token operator">:</span> <span class="token string">&#39;a&#39;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      arr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 删除对象属性</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// undefined</span>\n    <span class="token comment">// 删除数组元素</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>arr<span class="token punctuation">)</span>   <span class="token comment">// [1, 3]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>代码分析：</p><ul><li>首先判断了待删除的<code>target</code>不能为<code>undefined</code>或者原始值，如果是则在开发环境下提示错误。</li></ul><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">created</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 提示错误</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>$<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><ul><li>随后通过<code>Array.isArray()</code>方法判断了<code>target</code>是否为数组，如果是再通过<code>isValidArrayIndex</code>判断是否为合法的数组索引，如果都满足则会使用变异<code>splice</code>方法删除指定位置的元素。</li><li>接着判断当前要删除的属性是否在<code>target</code>对象中，如果不在则直接返回，什么都不做。</li><li>最后，通过<code>delete</code>操作符删除对象上的属性，然后<code>ob.dep.notify()</code>进行派发更新，通知响应式对象上的依赖进行更新。</li></ul><h2 id="vue-observable实现" tabindex="-1"><a class="header-anchor" href="#vue-observable实现" aria-hidden="true">#</a> Vue.observable实现</h2><p><code>Vue.observable</code>是在<code>Vue2.6+</code>版本才会有的一个全局方法，它的作用是让一个对象变成响应式：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>\n  a<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  b<span class="token operator">:</span> <span class="token number">2</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">const</span> observeObj <span class="token operator">=</span> Vue<span class="token punctuation">.</span><span class="token function">observable</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>observeObj<span class="token punctuation">.</span>a<span class="token punctuation">)</span> <span class="token comment">// 触发getter</span>\n\nobserveObj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">22</span> <span class="token comment">// 触发setter</span>\n</code></pre></div><p>这个全局方法是在<code>initGlobalAPI</code>的过程中被定义的，<code>initGlobalAPI</code>我们在之前已经介绍过，这里不在累述：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  <span class="token comment">// 2.6 explicit observable API</span>\n  Vue<span class="token punctuation">.</span>observable <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token parameter"><span class="token constant">T</span></span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">observe</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> obj\n  <span class="token punctuation">}</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>我们可以看到<code>observable</code>的实现很简单，在方法内部仅仅只是调用了<code>observe</code>方法，然后返回这个<code>obj</code>。关于<code>observe</code>的代码实现，我们在之前的章节中已经介绍过了，这里不再过多的进行说明：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">observe</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token operator">:</span> any<span class="token punctuation">,</span> asRootData<span class="token operator">:</span> <span class="token operator">?</span>boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> value <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">let</span> ob<span class="token operator">:</span> Observer <span class="token operator">|</span> <span class="token keyword">void</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">&#39;__ob__&#39;</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ob <span class="token operator">=</span> value<span class="token punctuation">.</span>__ob__\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>\n    shouldObserve <span class="token operator">&amp;&amp;</span>\n    <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n    <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n    Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n    <span class="token operator">!</span>value<span class="token punctuation">.</span>_isVue\n  <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ob <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>asRootData <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    ob<span class="token punctuation">.</span>vmCount<span class="token operator">++</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> ob\n<span class="token punctuation">}</span>\n</code></pre></div>',28),p={},o=(0,a(4321).Z)(p,[["render",function(n,s){return t}]])},4321:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,t]of s)a[n]=t;return a}}}]);
"use strict";(self.webpackChunkgordan404wiki=self.webpackChunkgordan404wiki||[]).push([[4090],{3546:(n,s,a)=>{a.r(s),a.d(s,{data:()=>t});const t={key:"v-6d3bb253",path:"/vueAnalysis/entry/global.html",title:"initGlobalAPI流程",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"vueAnalysis/entry/global.md",git:{updatedTime:1626972344e3,contributors:[{name:"lishuaixingNewBee",email:"vae.china@foxmail.com",commits:1}]}}},691:(n,s,a)=>{a.r(s),a.d(s,{default:()=>i});var t=a(5314),p=a(9884),o=a(3323);const e=(0,t.uE)('<h1 id="initglobalapi流程" tabindex="-1"><a class="header-anchor" href="#initglobalapi流程" aria-hidden="true">#</a> initGlobalAPI流程</h1><p>我们会在<code>src/core/index.js</code>文件中看到如下精简代码：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./instance/index&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> initGlobalAPI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./global-api/index&#39;</span>\n<span class="token function">initGlobalAPI</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> Vue\n</code></pre></div><p>在以上代码中，我们发现它引入了<code>Vue</code>随后调用了<code>initGlobalAPI()</code>函数，此函数的作用是挂载一些全局<code>API</code>方法。</p><p><img src="'+p+'" alt="initGlobalAPI"></p><p>我们首先能在<code>src/core/global-api</code>文件夹下看到如下目录结构：</p><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token operator">|</span>-- global-api        \n<span class="token operator">|</span>   <span class="token operator">|</span>-- index.js      <span class="token comment"># 入口文件</span>\n<span class="token operator">|</span>   <span class="token operator">|</span>-- assets.js     <span class="token comment"># 挂载filter、component和directive</span>\n<span class="token operator">|</span>   <span class="token operator">|</span>-- extend.js     <span class="token comment"># 挂载extend方法</span>\n<span class="token operator">|</span>   <span class="token operator">|</span>-- mixin.js      <span class="token comment"># 挂载mixin方法</span>\n<span class="token operator">|</span>   <span class="token operator">|</span>-- use.js        <span class="token comment"># 挂载use方法</span>\n</code></pre></div><p>随后在<code>index.js</code>入口文件中，我们能看到如下精简代码：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initUse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./use&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./mixin&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> initExtend <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./extend&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> initAssetRegisters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./assets&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> set<span class="token punctuation">,</span> del <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../observer/index&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> observe <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/observer/index&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> extend<span class="token punctuation">,</span> nextTick <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Vue<span class="token punctuation">.</span>set <span class="token operator">=</span> <span class="token keyword">set</span>\n  Vue<span class="token punctuation">.</span>delete <span class="token operator">=</span> del\n  Vue<span class="token punctuation">.</span>nextTick <span class="token operator">=</span> nextTick\n\n  Vue<span class="token punctuation">.</span><span class="token function-variable function">observable</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">observe</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> obj\n  <span class="token punctuation">}</span>\n\n  <span class="token function">initUse</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>\n  <span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>\n  <span class="token function">initExtend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>\n  <span class="token function">initAssetRegisters</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>从以上代码能够很清晰的看到在<code>index.js</code>入口文件中，会在<code>Vue</code>构造函数上挂载各种全局<code>API</code>函数，其中<code>set</code>、<code>delete</code>、<code>nextTick</code>和<code>observable</code>直接赋值为一个函数，而其他几种<code>API</code>则是调用了一个以<code>init</code>开头的方法，我们以<code>initAssetRegisters()</code>方法为例，它的精简代码如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// [&#39;component&#39;,&#39;directive&#39;, &#39;filter&#39;]</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">ASSET_TYPES</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;shared/constants&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initAssetRegisters</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    Vue<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 省略了函数的参数和函数实现代码</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>其中<code>ASSET_TYPES</code>是一个定义在<code>src/shared/constants.js</code>中的一个数组，然后在<code>initAssetRegisters()</code>方法中遍历这个数组，依次在<code>Vue</code>构造函数上挂载<code>Vue.component()</code>、<code>Vue.directive()</code>和<code>Vue.filter()</code>方法，另外三种<code>init</code>开头的方法挂载对应的全局<code>API</code>是一样的道理：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// initUse</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initUse</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Vue<span class="token punctuation">.</span><span class="token function-variable function">use</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// initMixin</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initMixin</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Vue<span class="token punctuation">.</span><span class="token function-variable function">mixin</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// initExtend</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initExtend</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Vue<span class="token punctuation">.</span><span class="token function-variable function">extend</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>最后，我们发现还差一个<code>Vue.compile()</code>方法，它其实是在<code>runtime+compile</code>版本才会有的一个全局方法，因此它在<code>src/platforms/web/entry-runtime-with-compile.js</code>中被定义：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./runtime/index&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> compileToFunctions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./compiler/index&#39;</span>\nVue<span class="token punctuation">.</span>compile <span class="token operator">=</span> compileToFunctions\n<span class="token keyword">export</span> <span class="token keyword">default</span> Vue\n</code></pre></div><p>根据<code>initGlobalAPI()</code>方法的逻辑，可以得到如下流程图： <img src="'+o+'" alt="initGlobalAPI流程图"></p>',16),c={},i=(0,a(4321).Z)(c,[["render",function(n,s){return e}]])},4321:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,t]of s)a[n]=t;return a}},9884:(n,s,a)=>{n.exports=a.p+"assets/img/initGlobalAPI.db71f2c9.png"},3323:(n,s,a)=>{n.exports=a.p+"assets/img/initGlobalAPIProcess.3260b2d8.png"}}]);
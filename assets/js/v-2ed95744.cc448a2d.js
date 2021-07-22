(self.webpackChunkvuepress_starter=self.webpackChunkvuepress_starter||[]).push([[1685],{7648:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-2ed95744",path:"/vueAnalysis/component/register.html",title:"组件注册",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"vueAnalysis/component/register.md",git:{updatedTime:1626959386e3,contributors:[{name:"jun6.li",email:"jun6.li@ly.com",commits:1}]}}},2529:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const p=(0,a(4057).uE)('<h1 id="组件注册" tabindex="-1"><a class="header-anchor" href="#组件注册" aria-hidden="true">#</a> 组件注册</h1><p>在开发<code>Vue</code>应用的时候，我们通常有两种注册组件的方式：全局注册和局部注册。这两种注册组件的方式结果是不同的，全局注册的组件可以在整个应用中直接使用，局部注册的组件只能在当前组件中使用。在这一章节，我们来分析一下在<code>Vue</code>中，是如何局部注册和全局注册组件的。</p><p>注意：<code>Vue</code>中有一些组件不需要进行注册就可以直接使用，这些组件就是内置组件：<code>keep-alive</code>, <code>transition</code>、<code>transition-group</code>以及<code>component</code>。对于这些内置组件，我们在这个章节并不会去介绍，而是在后面的章节中单独划分一个章节去分析。</p><p>对于需要全局注册的组件而言，我们使用<code>Vue.component</code>方法来注册我们的组件，这个方法其实是在<code>src/core/global-api/assets.js</code>文件中的<code>initAssetRegisters</code>被定义的，其代码如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">ASSET_TYPES</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;component&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;directive&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;filter&#39;</span><span class="token punctuation">]</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initAssetRegisters</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    Vue<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>\n      <span class="token parameter">id<span class="token operator">:</span> string<span class="token punctuation">,</span>\n      definition<span class="token operator">:</span> Function <span class="token operator">|</span> Object</span>\n    <span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token operator">|</span> Object <span class="token operator">|</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>definition<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">[</span>type <span class="token operator">+</span> <span class="token string">&#39;s&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token comment">/* istanbul ignore if */</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> type <span class="token operator">===</span> <span class="token string">&#39;component&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token function">validateComponentName</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;component&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>definition<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          definition<span class="token punctuation">.</span>name <span class="token operator">=</span> definition<span class="token punctuation">.</span>name <span class="token operator">||</span> id\n          definition <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">.</span>_base<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span>definition<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;directive&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> definition <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          definition <span class="token operator">=</span> <span class="token punctuation">{</span> bind<span class="token operator">:</span> definition<span class="token punctuation">,</span> update<span class="token operator">:</span> definition <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>options<span class="token punctuation">[</span>type <span class="token operator">+</span> <span class="token string">&#39;s&#39;</span><span class="token punctuation">]</span><span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> definition\n        <span class="token keyword">return</span> definition\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>代码分析：当我们正确给<code>Vue.component</code>传递参数的时候，它会走<code>else</code>分支逻辑，在<code>else</code>分支逻辑中，对于组件而言它首先使用<code>validateComponentName</code>来校验组件名是否合法，其代码如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">validateComponentName</span> <span class="token punctuation">(</span><span class="token parameter">name<span class="token operator">:</span> string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">^[a-zA-Z][\\\\-\\\\.0-9_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>unicodeRegExp<span class="token punctuation">.</span>source<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]*$</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">warn</span><span class="token punctuation">(</span>\n      <span class="token string">&#39;Invalid component name: &quot;&#39;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&#39;&quot;. Component names &#39;</span> <span class="token operator">+</span>\n      <span class="token string">&#39;should conform to valid custom element name in html5 specification.&#39;</span>\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isBuiltInTag</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token operator">||</span> config<span class="token punctuation">.</span><span class="token function">isReservedTag</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">warn</span><span class="token punctuation">(</span>\n      <span class="token string">&#39;Do not use built-in or reserved HTML elements as component &#39;</span> <span class="token operator">+</span>\n      <span class="token string">&#39;id: &#39;</span> <span class="token operator">+</span> name\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>对于组件名而言，一方面它需要合法，另外一方面不能是内置或保留<code>html</code>标签。在校验通过后，它调用<code>this.options._base.extend</code>方法，实际上相当于调用<code>Vue.extend</code>方法来让一个组件对象转换成构造函数形式，<code>extend</code>方法的具体实现我们在之前已经详细介绍过。在转换成构造函数完毕后，又在其对应的<code>options</code>上进行了赋值。根据<code>Vue.component</code>方法的实现，我们可以使用如下案例来表示：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;@/components/HelloWorld.vue&#39;</span>\n<span class="token comment">// 注册前</span>\n<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>\n  components<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 注册</span>\nVue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;HelloWorld&#39;</span><span class="token punctuation">,</span> HelloWorld<span class="token punctuation">)</span>\n\n<span class="token comment">// 注册后</span>\n<span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token punctuation">{</span>\n  components<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function-variable function">HelloWorld</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>既然组件已经注册完毕了，那么我们现在想两个问题：<strong>全局注册的组件到哪里去了？使用全局注册的组件的时候是如何查找的？</strong></p><p>回答第一个问题的时候，我们先回顾一下<code>components</code>选项是如何合并的：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mergeAssets</span> <span class="token punctuation">(</span>\n  <span class="token parameter">parentVal<span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>\n  childVal<span class="token operator">:</span> <span class="token operator">?</span>Object<span class="token punctuation">,</span>\n  vm<span class="token operator">?</span><span class="token operator">:</span> Component<span class="token punctuation">,</span>\n  key<span class="token operator">:</span> string</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> Object <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> res <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>parentVal <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>childVal<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">assertObjectType</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> childVal<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token function">extend</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> childVal<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> res\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\nstrats<span class="token punctuation">.</span>component <span class="token operator">=</span> mergeAssets\n</code></pre></div><p>因为全局注册的组件都在<code>Vue.options.components</code>选项上，根据以上合并策略，我们发现全局注册的组件最后都会合并到子组件的<code>components</code>选项的原型上，例如：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// 全局注册后</span>\n<span class="token keyword">const</span> baseVueOptions <span class="token operator">=</span> <span class="token punctuation">{</span>\n  components<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function-variable function">HelloWorld</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 合并后</span>\n<span class="token keyword">const</span> childOptions <span class="token operator">=</span> <span class="token punctuation">{</span>\n  components<span class="token operator">:</span> <span class="token punctuation">{</span>\n    __proto__<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token function-variable function">HelloWorld</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">VueComponent</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>根据以上代码，我们就可以回答第一个问题：<strong>全局注册的组件会在子组件配置合并后反应到子组件components属性对象的原型上</strong>。</p><p>接下来，我们来分析第二个问题，我们回到之前的<code>createElement</code>，在这个章节中，我们注意到有下面这样一段代码：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> tag <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>xxx<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">!</span>data <span class="token operator">||</span> <span class="token operator">!</span>data<span class="token punctuation">.</span>pre<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isDef</span><span class="token punctuation">(</span>Ctor <span class="token operator">=</span> <span class="token function">resolveAsset</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>$options<span class="token punctuation">,</span> <span class="token string">&#39;components&#39;</span><span class="token punctuation">,</span> tag<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// component</span>\n    vnode <span class="token operator">=</span> <span class="token function">createComponent</span><span class="token punctuation">(</span>Ctor<span class="token punctuation">,</span> data<span class="token punctuation">,</span> context<span class="token punctuation">,</span> children<span class="token punctuation">,</span> tag<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>  <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  vnode <span class="token operator">=</span> <span class="token function">createComponent</span><span class="token punctuation">(</span>tag<span class="token punctuation">,</span> data<span class="token punctuation">,</span> context<span class="token punctuation">,</span> children<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>当模板编译到全局组件的时候，会在通过<code>resolveAsset</code>去尝试获取组件的构造函数，我们来看一下<code>resolveAsset</code>方法是如何实现的：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">resolveAsset</span> <span class="token punctuation">(</span>\n  <span class="token parameter">options<span class="token operator">:</span> Object<span class="token punctuation">,</span>\n  type<span class="token operator">:</span> string<span class="token punctuation">,</span>\n  id<span class="token operator">:</span> string<span class="token punctuation">,</span>\n  warnMissing<span class="token operator">?</span><span class="token operator">:</span> boolean</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> any <span class="token punctuation">{</span>\n  <span class="token comment">/* istanbul ignore if */</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> id <span class="token operator">!==</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">const</span> assets <span class="token operator">=</span> options<span class="token punctuation">[</span>type<span class="token punctuation">]</span>\n  <span class="token comment">// check local registration variations first</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>id<span class="token punctuation">]</span>\n  <span class="token keyword">const</span> camelizedId <span class="token operator">=</span> <span class="token function">camelize</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> camelizedId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>camelizedId<span class="token punctuation">]</span>\n  <span class="token keyword">const</span> PascalCaseId <span class="token operator">=</span> <span class="token function">capitalize</span><span class="token punctuation">(</span>camelizedId<span class="token punctuation">)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasOwn</span><span class="token punctuation">(</span>assets<span class="token punctuation">,</span> PascalCaseId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> assets<span class="token punctuation">[</span>PascalCaseId<span class="token punctuation">]</span>\n  <span class="token comment">// fallback to prototype chain</span>\n  <span class="token keyword">const</span> res <span class="token operator">=</span> assets<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">||</span> assets<span class="token punctuation">[</span>camelizedId<span class="token punctuation">]</span> <span class="token operator">||</span> assets<span class="token punctuation">[</span>PascalCaseId<span class="token punctuation">]</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> warnMissing <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">warn</span><span class="token punctuation">(</span>\n      <span class="token string">&#39;Failed to resolve &#39;</span> <span class="token operator">+</span> type<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;: &#39;</span> <span class="token operator">+</span> id<span class="token punctuation">,</span>\n      options\n    <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> res\n<span class="token punctuation">}</span>\n</code></pre></div><p>对于<code>components</code>选项来说，它首先会尝试使用<code>hasOwn</code>方法在自身对象上查找有没有，如果三种方式都没有，则最后在<code>components</code>的原型上去查找。对于全局注册的组件而言，它会在这个原型上找到，如果在原型上还找不到，那么最后会在<code>patch</code>的阶段去检验，然后抛出一个错误：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token string">&#39;Unknown custom element: xxx - did you register the component correctly?&#39;</span> <span class="token operator">+</span>\n<span class="token string">&#39;For recursive components, make sure to provide the &quot;name&quot; option.&#39;</span><span class="token punctuation">,</span>\n</code></pre></div><p>在了解了全局注册组件的方式后，对于局部注册组件的各种疑问相信都迎刃而解了。局部注册的组件都在<code>components</code>选项对象上，而全局注册的组件会在组件合并配置完毕后反应到子组件的<code>components</code>选项对象的原型上，这就是全局注册的组件可以在任意地方使用的根本原因了。</p>',22),t={render:function(n,s){return p}}}}]);
(self.webpackChunkgordan404wiki=self.webpackChunkgordan404wiki||[]).push([[4738],{4656:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-d9c26912",path:"/vueAnalysis/expand/plugin.html",title:"Vue.use插件机制",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"vueAnalysis/expand/plugin.md",git:{updatedTime:1626972344e3,contributors:[{name:"lishuaixingNewBee",email:"vae.china@foxmail.com",commits:1}]}}},8377:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>v});var p=a(4057);const t=(0,p.uE)('<h1 id="vue-use插件机制" tabindex="-1"><a class="header-anchor" href="#vue-use插件机制" aria-hidden="true">#</a> Vue.use插件机制</h1><p>在使用<code>Vue</code>开发应用程序的时候，我们经常使用第三方插件库来方便我们开发，例如：<code>Vue-Router</code>、<code>Vuex</code>和<code>element-ui</code>等等。</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// main.js</span>\n<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>\n<span class="token keyword">import</span> Vuex <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span>\n<span class="token keyword">import</span> ElementUI <span class="token keyword">from</span> <span class="token string">&#39;element-ui&#39;</span>\n\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Vuex<span class="token punctuation">)</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">)</span>\n\n<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>在<code>new Vue</code>之前，我们使用<code>Vue.use</code>方法来注册这些插件。其中，<code>Vue.use</code>作为一个全局方法，它是在<code>initGlobalAPI</code>方法内部通过调用<code>initUse</code>来注册这个全局方法的。</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initUse <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./use&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...省略代码</span>\n  <span class="token function">initUse</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>\n  <span class="token comment">// ...省略代码</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p><code>initUse</code>方法的代码并不复杂，如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> toArray <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initUse</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  Vue<span class="token punctuation">.</span><span class="token function-variable function">use</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">plugin<span class="token operator">:</span> Function <span class="token operator">|</span> Object</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 1.检测是否已经注册了插件</span>\n    <span class="token keyword">const</span> installedPlugins <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_installedPlugins <span class="token operator">||</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_installedPlugins <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>installedPlugins<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token keyword">this</span>\n    <span class="token punctuation">}</span>\n\n   <span class="token comment">// 2.处理参数</span>\n    <span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token function">toArray</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>\n    args<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// 3.调用install方法</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> plugin<span class="token punctuation">.</span>install <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      plugin<span class="token punctuation">.</span><span class="token function">install</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>plugin<span class="token punctuation">,</span> args<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> plugin <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">plugin</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    installedPlugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>我们可以从以上代码中看出，当调用<code>Vue.use</code>时，它只要做三件事情：<strong>检查插件是否重复注册</strong>、<strong>处理插件参数</strong>和<strong>调用插件的install方法</strong>。</p><p>代码分析：</p><ul><li><strong>检查插件是否重复注册</strong>：首先通过判断大<code>Vue</code>上的<code>_installedPlugins</code>属性是否已经存在当前插件，如果已经存在则直接返回；如果不存在才会执行后面的逻辑，假如我们有如下案例：</li></ul><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> Router <span class="token keyword">from</span> <span class="token string">&#39;vue-router&#39;</span>\n\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span>\n</code></pre></div><p>多次调用<code>Vue.use()</code>方法注册同一个组件，只有第一个生效。</p><ul><li><strong>处理插件参数</strong>：有些插件在注册的时候，可能需要我们额外的传递一些参数，例如<code>element-ui</code>。</li></ul><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> ElementUI <span class="token keyword">from</span> <span class="token string">&#39;element-ui&#39;</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementUI<span class="token punctuation">,</span> <span class="token punctuation">{</span> \n  size<span class="token operator">:</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span>\n  zIndex<span class="token operator">:</span> <span class="token number">3000</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>按照上面的例子，<code>Vue.use()</code>方法的<code>arguments</code>数组的第一项为我们传递的插件，剩下的参数才是我们需要的，因此通过<code>toArray</code>方法把<code>arguments</code>类数组转成一个真正的数组。注意，此时<code>args</code>变量不包含插件这个元素，随后再把当前<code>this</code>也就是大<code>Vue</code>也传递进数组中。</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// 演示使用，实际为大Vue的构造函数</span>\n<span class="token keyword">const</span> args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;Vue&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> size<span class="token operator">:</span> <span class="token string">&#39;small&#39;</span><span class="token punctuation">,</span> zIndex<span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">}</span><span class="token punctuation">]</span>\n</code></pre></div>',16),o=(0,p.Wm)("strong",null,"调用插件的install方法",-1),e=(0,p.Uk)("：从官网"),c={href:"https://cn.vuejs.org/v2/guide/plugins.html",target:"_blank",rel:"noopener noreferrer"},u=(0,p.Uk)("插件"),l=(0,p.Uk)("我们知道，如果我们在开发一个"),i=(0,p.Wm)("code",null,"Vue",-1),k=(0,p.Uk)("插件，必须为这个插件提供一个"),r=(0,p.Wm)("code",null,"install",-1),d=(0,p.Uk)("方法，当调用"),g=(0,p.Wm)("code",null,"Vue.use()",-1),m=(0,p.Uk)("方法的时候会自动调用此插件的"),y=(0,p.Wm)("code",null,"install",-1),f=(0,p.Uk)("方法，并把第二步处理好的参数传递进去。假如，我们有如下插件代码："),w=(0,p.uE)('<div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// plugins.js</span>\n<span class="token keyword">const</span> plugin <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token function">install</span> <span class="token punctuation">(</span><span class="token parameter">Vue<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span> <span class="token comment">// {msg: &#39;test use plugin&#39;}</span>\n\n    <span class="token comment">// 其它逻辑</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n\n<span class="token comment">// main.js</span>\n<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> MyPlugin <span class="token keyword">from</span> <span class="token string">&#39;./plugins.js&#39;</span>\nVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyPlugin<span class="token punctuation">,</span> <span class="token punctuation">{</span> msg<span class="token operator">:</span> <span class="token string">&#39;test use plugin&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>在<code>install</code>方法中，我们成功获取到了大<code>Vue</code>构造函数以及我们传递的参数，在随后我们就可以做一些其它事情，例如：注册公共组件、注册指令、添加公共方法以及全局<code>Mixin</code>混入等等。</p>',2),v={render:function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.j4)(p.HY,null,[t,(0,p.Wm)("ul",null,[(0,p.Wm)("li",null,[o,e,(0,p.Wm)("a",c,[u,(0,p.Wm)(a)]),l,i,k,r,d,g,m,y,f])]),w],64)}}}}]);
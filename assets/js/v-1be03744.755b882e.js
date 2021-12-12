"use strict";(self.webpackChunkgordan404wiki=self.webpackChunkgordan404wiki||[]).push([[7141],{9602:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-1be03744",path:"/vueAnalysis/rollup/vue.html",title:"Vue中的Rollup构建",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"alias别名",slug:"alias别名",children:[]},{level:2,title:"config.js",slug:"config-js",children:[]},{level:2,title:"build.js",slug:"build-js",children:[]}],filePathRelative:"vueAnalysis/rollup/vue.md",git:{updatedTime:1626972344e3,contributors:[{name:"lishuaixingNewBee",email:"vae.china@foxmail.com",commits:1}]}}},6434:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});const p=(0,a(5314).uE)('<h1 id="vue中的rollup构建" tabindex="-1"><a class="header-anchor" href="#vue中的rollup构建" aria-hidden="true">#</a> Vue中的Rollup构建</h1><p>在阅读<code>Vue.js</code>源码时，我们首先应该去看其<code>package.json</code>文件内容，在<code>Vue.js</code>项目中其精简掉与<code>compiler</code>、<code>weex</code>和<code>ssr</code>相关的内容以后，如下所示：</p><div class="language-json ext-json"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2.6.11&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.runtime.common.js&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;dist/vue.runtime.esm.js&quot;</span><span class="token punctuation">,</span>\n  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-full-dev&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dev:cjs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dev:esm&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dev:ssr&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-server-renderer&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node scripts/build.js&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>我们可以从上面很容易的发现，其精简后的内容和我们在<code>rollup</code>基础知识里面的配置十分相似，其构建脚本同样放置在<code>scripts</code>目录下。在<code>scripts</code>目录下，我们需要重点关注下面几个文件：</p><ul><li><code>alias.js</code>：与<code>rollup</code>构建别名相关的配置。</li><li><code>config.js</code>：与<code>rollup</code>构建不同版本相关的代码。</li><li><code>build.js</code>：<code>rollup</code>构建不同压缩版本<code>Vue.js</code>文件相关代码。</li></ul><h2 id="alias别名" tabindex="-1"><a class="header-anchor" href="#alias别名" aria-hidden="true">#</a> alias别名</h2><p>我们在开发<code>Vue</code>应用时，经常会用到<code>@</code>别名，其中<code>@</code>代表<code>src</code>目录：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// 使用别名</span>\n<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;@/components/HelloWorld.vue&#39;</span>\n\n<span class="token comment">// 相当于</span>\n<span class="token keyword">import</span> HelloWorld <span class="token keyword">from</span> <span class="token string">&#39;src/components/HelloWorld.vue&#39;</span>\n</code></pre></div><p>在<code>scripts/alias.js</code>中，我们可以发现其别名配置代码如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token parameter">p</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;../&#39;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  vue<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/platforms/web/entry-runtime-with-compiler&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  compiler<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/compiler&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  core<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/core&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  shared<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/shared&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  web<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/platforms/web&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  weex<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/platforms/weex&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  server<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/server&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  sfc<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/sfc&#39;</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>以<code>core</code>别名为例，在<code>Vue.js</code>源码中，我们通过别名进行如下引入：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// 使用core别名</span>\n<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;core/instance/index.js&#39;</span>\n\n<span class="token comment">// 相当于</span>\n<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;src/core/instance/index.js&#39;</span>\n</code></pre></div><p>其中<code>alias.js</code>文件是在<code>config.js</code>中引入并使用的：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// config.js文件</span>\n<span class="token keyword">import</span> alias <span class="token keyword">from</span> <span class="token string">&#39;rollup-plugin-alias&#39;</span>\n<span class="token keyword">import</span> aliases <span class="token keyword">from</span> <span class="token string">&#39;./alias.js&#39;</span>\n\n<span class="token keyword">function</span> <span class="token function">genConfig</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token function">alias</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> aliases<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> config\n<span class="token punctuation">}</span>\n</code></pre></div><p><strong>注意</strong>：由于<code>Vue.js</code>中使用<code>rollup</code>主版本以及其周边插件的版本较低，如果你使用了最新的<code>rollup</code>版本或者其周边的插件，需要按照最新插件的配置要求来，这里以最新的<code>@rollup/plugin-alias</code>插件为例：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token parameter">p</span> <span class="token operator">=&gt;</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;../&#39;</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">[</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/platforms/web/entry-runtime-with-compiler&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;compiler&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/compiler&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;core&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/core&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;shared&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/shared&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;web&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/platforms/web&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;weex&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/platforms/weex&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;server&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/server&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> file<span class="token operator">:</span> <span class="token string">&#39;sfc&#39;</span><span class="token punctuation">,</span> replacement<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;src/sfc&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>\n<span class="token punctuation">]</span>\n</code></pre></div><p>其在<code>config.js</code>新的使用方式同样需要做调整，如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// config.js文件</span>\n<span class="token keyword">import</span> alias <span class="token keyword">from</span> <span class="token string">&#39;@rollup/plugin-alias&#39;</span>\n<span class="token keyword">import</span> aliases <span class="token keyword">from</span> <span class="token string">&#39;./alias.js&#39;</span>\n\n<span class="token keyword">function</span> <span class="token function">genConfig</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token function">alias</span><span class="token punctuation">(</span><span class="token punctuation">{</span> entries<span class="token operator">:</span> aliases <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> config\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="config-js" tabindex="-1"><a class="header-anchor" href="#config-js" aria-hidden="true">#</a> config.js</h2><p>首先我们从<code>package.json</code>打包命令中可以看到，在<code>development</code>环境下它通过<code>-c</code>指定了<code>rollup</code>的配置文件，所以会使用到<code>scripts/config.js</code>文件，并且打包命令还提供了一个叫做<code>TARGET</code>的环境变量：</p><div class="language-json ext-json"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-full-dev&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dev:cjs&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-runtime-cjs-dev&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;dev:esm&quot;</span><span class="token operator">:</span> <span class="token string">&quot;rollup -w -c scripts/config.js --environment TARGET:web-runtime-esm&quot;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>那么在<code>scripts/config.js</code>文件下，我们可以看到它是通过<code>module.exports</code>导出的一个对象：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">genConfig</span> <span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> opts <span class="token operator">=</span> builds<span class="token punctuation">[</span>name<span class="token punctuation">]</span>\n  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n    input<span class="token operator">:</span> opts<span class="token punctuation">.</span>entry<span class="token punctuation">,</span>\n    external<span class="token operator">:</span> opts<span class="token punctuation">.</span>external<span class="token punctuation">,</span>\n    plugins<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token function">flow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token function">alias</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> aliases<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>alias<span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>opts<span class="token punctuation">.</span>plugins <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    output<span class="token operator">:</span> <span class="token punctuation">{</span>\n      file<span class="token operator">:</span> opts<span class="token punctuation">.</span>dest<span class="token punctuation">,</span>\n      format<span class="token operator">:</span> opts<span class="token punctuation">.</span>format<span class="token punctuation">,</span>\n      name<span class="token operator">:</span> opts<span class="token punctuation">.</span>moduleName <span class="token operator">||</span> <span class="token string">&#39;Vue&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">onwarn</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">msg<span class="token punctuation">,</span> warn</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Circular</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">warn</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> config\n<span class="token punctuation">}</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">TARGET</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">genConfig</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">TARGET</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  exports<span class="token punctuation">.</span>getBuild <span class="token operator">=</span> genConfig\n  exports<span class="token punctuation">.</span><span class="token function-variable function">getAllBuilds</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>builds<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>genConfig<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>在以上代码中，我们可以看到<code>module.exports</code>导出的对象，主要是通过<code>genConfig()</code>函数返回的，其中这个函数接受的参数正是我们在打包命令中提供的环境变量<code>TARGET</code>。我们再来粗略的看一下<code>genConfig()</code>函数，它的主要作用依然是生成<code>rollup</code>几大核心配置，然后返回配置完毕后的对象。</p><p>我们再来看一个叫做<code>builds</code>的对象，由于在源码中它的内容非常多，为了节省篇幅我们精简后其代码如下：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">const</span> builds <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Runtime+compiler CommonJS build (CommonJS)</span>\n  <span class="token string">&#39;web-full-cjs-dev&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    dest<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.common.dev.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">&#39;cjs&#39;</span><span class="token punctuation">,</span>\n    env<span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token string">&#39;web-full-cjs-prod&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    dest<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.common.prod.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">&#39;cjs&#39;</span><span class="token punctuation">,</span>\n    env<span class="token operator">:</span> <span class="token string">&#39;production&#39;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Runtime+compiler ES modules build (for bundlers)</span>\n  <span class="token string">&#39;web-full-esm&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    dest<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.esm.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">&#39;es&#39;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Runtime+compiler development build (Browser)</span>\n  <span class="token string">&#39;web-full-dev&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    dest<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span>\n    env<span class="token operator">:</span> <span class="token string">&#39;development&#39;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// Runtime+compiler production build  (Browser)</span>\n  <span class="token string">&#39;web-full-prod&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    dest<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.min.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span>\n    env<span class="token operator">:</span> <span class="token string">&#39;production&#39;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>我们可以发现它的键名正好是我们打包命令中提供的环境变量<code>TARGET</code>的值，这里以<code>web-full-dev</code>为例，它通过<code>web-full-dev</code>这个键可以得到一个对象：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n  entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  dest<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&#39;dist/vue.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  format<span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span>\n  env<span class="token operator">:</span> <span class="token string">&#39;development&#39;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>然后配合<code>resolve</code>函数和上面我们已经提到过的别名配置，就可以构造下面这样的<code>rollup</code>配置对象：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n  <span class="token comment">// 省略其它</span>\n  input<span class="token operator">:</span> <span class="token string">&#39;src/platforms/web/entry-runtime-with-compiler.js&#39;</span><span class="token punctuation">,</span>\n  output<span class="token operator">:</span> <span class="token punctuation">{</span>\n    dest<span class="token operator">:</span> <span class="token string">&#39;dist/vue.js&#39;</span><span class="token punctuation">,</span>\n    format<span class="token operator">:</span> <span class="token string">&#39;umd&#39;</span><span class="token punctuation">,</span>\n    name<span class="token operator">:</span> <span class="token string">&#39;Vue&#39;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="build-js" tabindex="-1"><a class="header-anchor" href="#build-js" aria-hidden="true">#</a> build.js</h2><p><code>srcipts/build.js</code>文件的作用就是通过配置然后生成不同版本的压缩文件，其中它获取配置的方式同样是在<code>scripts/config.js</code>文件中，其中关键代码为：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token comment">// config.js中导出</span>\nexports<span class="token punctuation">.</span><span class="token function-variable function">getAllBuilds</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>builds<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>genConfig<span class="token punctuation">)</span>\n\n<span class="token comment">// build.js中引入</span>\n<span class="token keyword">let</span> builds <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./config&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAllBuilds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre></div>',33),t={},o=(0,a(4321).Z)(t,[["render",function(n,s){return p}]])},4321:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);
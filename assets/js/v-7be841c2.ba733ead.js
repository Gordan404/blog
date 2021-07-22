(self.webpackChunkvuepress_starter=self.webpackChunkvuepress_starter||[]).push([[5975],{5873:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>t});const t={key:"v-7be841c2",path:"/vueAnalysis/compile/",title:"介绍",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"vueAnalysis/compile/README.md",git:{updatedTime:1626959386e3,contributors:[{name:"jun6.li",email:"jun6.li@ly.com",commits:1}]}}},1515:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>p});const t=(0,a(4057).uE)('<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p>在之前我们提到过，<code>Vue</code>根据不同的使用场景，提供了不同版本<code>Vue.js</code>打包文件，其中<code>runtime + compiler</code>版本允许我们撰写带<code>template</code>选项的组件，它能够对<code>template</code>进行编译。而<code>runtime + only</code>版本则不允许我们这样做，我们使用<code>Vue-Cli3.0</code>以上版本的脚手架默认创建的项目都是<code>runtime + only</code>版本，其中对于组件的<code>template</code>模板，它依赖于<code>vue-loader</code>来编译成<code>render</code>渲染函数，不再依赖<code>Vue.js</code>。</p><p>在编译原理这个大章节，我们为了深入了解其内部实现原理，主要分析<code>runtime + compiler</code>版本的<code>Vue.js</code>。这个版本它的入口文件在<code>src/platforms/web/entry-runtime-with-compiler.js</code>，在这个入口文件我们可以发现，它不仅重新定义了<code>$mount</code>方法，还挂载了一个<code>compile</code>全局<code>API</code>。</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> compileToFunctions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./compiler/index&#39;</span>\n<span class="token keyword">const</span> mount <span class="token operator">=</span> <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$mount\n<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>\n  <span class="token parameter">el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span>\n  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>\n  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>\n\n  <span class="token comment">/* istanbul ignore if */</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>el <span class="token operator">===</span> document<span class="token punctuation">.</span>body <span class="token operator">||</span> el <span class="token operator">===</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>\n      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Do not mount Vue to &lt;html&gt; or &lt;body&gt; - mount to normal elements instead.</span><span class="token template-punctuation string">`</span></span>\n    <span class="token punctuation">)</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options\n  <span class="token comment">// resolve template/el and convert to render function</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">let</span> template <span class="token operator">=</span> options<span class="token punctuation">.</span>template\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> template <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;#&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          template <span class="token operator">=</span> <span class="token function">idToTemplate</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>\n          <span class="token comment">/* istanbul ignore if */</span>\n          <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">warn</span><span class="token punctuation">(</span>\n              <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Template element not found or is empty: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>options<span class="token punctuation">.</span>template<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n              <span class="token keyword">this</span>\n            <span class="token punctuation">)</span>\n          <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        template <span class="token operator">=</span> template<span class="token punctuation">.</span>innerHTML\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;invalid template option:&#39;</span> <span class="token operator">+</span> template<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">return</span> <span class="token keyword">this</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      template <span class="token operator">=</span> <span class="token function">getOuterHTML</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">/* istanbul ignore if */</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">&#39;compile&#39;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> staticRenderFns <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">compileToFunctions</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        outputSourceRange<span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">,</span>\n        shouldDecodeNewlines<span class="token punctuation">,</span>\n        shouldDecodeNewlinesForHref<span class="token punctuation">,</span>\n        delimiters<span class="token operator">:</span> options<span class="token punctuation">.</span>delimiters<span class="token punctuation">,</span>\n        comments<span class="token operator">:</span> options<span class="token punctuation">.</span>comments\n      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>\n      options<span class="token punctuation">.</span>render <span class="token operator">=</span> render\n      options<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> staticRenderFns\n\n      <span class="token comment">/* istanbul ignore if */</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">&#39;compile end&#39;</span><span class="token punctuation">)</span>\n        <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>_name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> compile</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token string">&#39;compile&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;compile end&#39;</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">return</span> <span class="token function">mount</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\nVue<span class="token punctuation">.</span>compile <span class="token operator">=</span> compileToFunctions\n</code></pre></div><p>其中，<code>$mount</code>方法我们在组件化章节中已经单独介绍过了，在编译原理这一章节，我们将其分为<strong>parse模板解析</strong>、<strong>optimize优化</strong>和<strong>codegen代码生成</strong>这三个大步骤来深入学习其实现原理，也就是<code>compileToFunctions</code>方法的实现逻辑。</p>',5),p={render:function(n,s){return t}}}}]);
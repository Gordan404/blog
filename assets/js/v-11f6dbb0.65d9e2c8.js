(self.webpackChunkvuepress_starter=self.webpackChunkvuepress_starter||[]).push([[6570],{9733:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>t});const t={key:"v-11f6dbb0",path:"/vueAnalysis/reactive/",title:"介绍",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[],filePathRelative:"vueAnalysis/reactive/README.md",git:{updatedTime:1626959386e3,contributors:[{name:"jun6.li",email:"jun6.li@ly.com",commits:1}]}}},2980:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>p});const t=(0,a(4057).uE)('<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p>在上一章节，我们分析过<code>initState()</code>方法的整体流程，知道它会处理<code>props</code>、<code>methods</code>和<code>data</code>等等相关的内容：</p><div class="language-javascript ext-js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span> <span class="token punctuation">(</span><span class="token parameter">vm<span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  vm<span class="token punctuation">.</span>_watchers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token function">initProps</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span> <span class="token function">initMethods</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">initData</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token function">observe</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>watch <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>watch <span class="token operator">!==</span> nativeWatch<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">initWatch</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>watch<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>那么我们的深入响应式原理介绍会以<code>initState()</code>方法开始，逐步分析<code>Vue</code>中响应式的原理，下面这张图可以很好的展示响应式的原理。</p><div style="text-align:center;"><img src="assets/images/vueAnalysis/reactive.png" alt="响应式原理图" width="740"></div>',5),p={render:function(n,s){return t}}}}]);
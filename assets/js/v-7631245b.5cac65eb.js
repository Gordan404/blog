(self.webpackChunkvuepress_starter=self.webpackChunkvuepress_starter||[]).push([[507],{9024:(e,a,n)=>{"use strict";n.r(a),n.d(a,{data:()=>c});const c={key:"v-7631245b",path:"/webpack/webpack/install.html",title:"安装",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"全局安装",slug:"全局安装",children:[{level:3,title:"全局安装命令",slug:"全局安装命令",children:[]}]},{level:2,title:"卸载",slug:"卸载",children:[]},{level:2,title:"本地安装(推荐)",slug:"本地安装-推荐",children:[]},{level:2,title:"版本号安装",slug:"版本号安装",children:[]}],filePathRelative:"webpack/webpack/install.md",git:{updatedTime:1626959386e3,contributors:[{name:"jun6.li",email:"jun6.li@ly.com",commits:1}]}}},8539:(e,a,n)=>{"use strict";n.r(a),n.d(a,{default:()=>s});const c=(0,n(4057).uE)('<h1 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h1><h2 id="全局安装" tabindex="-1"><a class="header-anchor" href="#全局安装" aria-hidden="true">#</a> 全局安装</h2><div class="custom-container warning"><p class="custom-container-title">注意</p><p>如果你只是想做一个 Webpack 的 Demo 案例，那么全局安装方法可能会比较适合你。如果你是在实际生产开发中使用，那么推荐你使用本地安装方法。</p></div><h3 id="全局安装命令" tabindex="-1"><a class="header-anchor" href="#全局安装命令" aria-hidden="true">#</a> 全局安装命令</h3><div class="custom-container tip"><p class="custom-container-title">参数说明</p><p><code>webpack4.0+</code>的版本，必须安装<code>webpack-cli</code>，<code>-g</code>命令代表全局安装的意思</p></div><div class="language-bash ext-sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> webpack webpack-cli -g\n</code></pre></div><h2 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> 卸载</h2><div class="custom-container tip"><p class="custom-container-title">参数说明</p><p>通过<code>npm install</code>安装的模块，对应的可通过<code>npm uninstall</code>进行卸载</p></div><div class="language-bash ext-sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> uninstall webpack webpack-cli -g\n</code></pre></div><h2 id="本地安装-推荐" tabindex="-1"><a class="header-anchor" href="#本地安装-推荐" aria-hidden="true">#</a> 本地安装(推荐)</h2><div class="custom-container tip"><p class="custom-container-title">参数说明</p><p>本地安装的<code>Webpack</code>意思是，只在你当前项目下有效，而通过全局安装的<code>Webpack</code>，如果两个项目的<code>Webpack</code>主版本不一致，则可能会造成其中一个项目无法正常打包。本地安装方式也是实际开发中推荐的一种<code>Webpack</code>安装方式。</p></div><div class="language-bash ext-sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> webpack webpack-cli -D\n<span class="token comment"># 等价于</span>\n$ <span class="token function">npm</span> <span class="token function">install</span> webpack webpack-cli --save-dev\n</code></pre></div><h2 id="版本号安装" tabindex="-1"><a class="header-anchor" href="#版本号安装" aria-hidden="true">#</a> 版本号安装</h2><div class="custom-container tip"><p class="custom-container-title">参数说明</p><p>如果你对<code>Webpack</code>的具体版本有严格要求，那么可以先去Github的<code>Webpack</code>仓库查看历史版本记录或者使用<code>npm view webpack versions</code>查看<code>Webpack</code>的<code>npm</code>包历史版本记录</p></div><div class="language-bash ext-sh"><pre class="language-bash"><code><span class="token comment"># 查看webpack的历史版本记录</span>\n$ <span class="token function">npm</span> view webpack versions\n\n<span class="token comment"># 按版本号安装</span>\n$ <span class="token function">npm</span> <span class="token function">install</span> webpack@4.25.0 -D\n</code></pre></div>',15),s={render:function(e,a){return c}}}}]);
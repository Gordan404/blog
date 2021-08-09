import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const nav = require('../utils/nav.ts')
const { webpackSidebar, vueAnalysisSidebar, vueNextAnalysisSidebar } = nav;
export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  base: '/blog/', // 跟目录
  title: '知识库',
  description: '知识库强，则技术强，技术强则国强',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: 'https://gordan404.github.io/blog/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    code: {
      lineNumbers: false  // 是否启用代码块行号
    }
  },
  themeConfig: {
    logo: '/logoH.png',
    algolia: {
      apiKey: 'b573aa848fd57fb47d693b531297403c',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:cn']
      }
    },
    lastUpdatedText: '最后更新时间', // 最近更新时间戳 标签的文字
    editLinkText: '编辑此页',
    repo: 'https://github.com/Gordan404/blog',
    repoLabel: 'Github',
    docsRepo: 'https://github.com/Gordan404/blog',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/master/:path',
    navbar: [
      {
        text: '前端面试指北',
        children: [
          {
            text: 'JavaScript基础知识',
            link: '/interview/README.md'
          },
          {
            text: 'HTML和CSS相关',
            link: '/interview/h5.md'
          },
          {
            text: '浏览器和网络知识点及常考',
            link: '/interview/browser.md'
          },
          {
            text: 'JavaScript基础知识',
            link: '/interview/javascript.md'
          },
        ]
      },
      {
        text: '前端书籍',
        children: [
          {
            text: 'JavaScript书籍',
            children: [
              {
                text: '你不知道的JavaScript(上)',
                link: '/books/javascript/know-up.md'
              },
              {
                text: '你不知道的JavaScript(中下)',
                link: '/books/javascript/know-down.md'
              },
              {
                text: 'JavaScript高级程序设计',
                link: '/books/javascript/red-book.md'
              },
              {
                text: 'JavaScript数据结构和算法',
                link: '/books/javascript/algorithm.md'
              },
              {
                text: 'JavaScript设计模式与开发实践',
                link: '/designPattern/'
              },
              {
                text: '深入理解ES6',
                link: '/books/javascript/es6.md'
              }
            ]
          },
          {
            text: 'Git书籍',
            children: [
              {
                text: '精通Git',
                link: '/books/git/'
              }
            ]
          }
        ]
      },
      {
        text: 'Vue源码分析',
        link: '/vueAnalysis/introduction/'
      },
      {
        text: '自动化测试',
        children: [
          { text: 'Vue应用测试', link: '/test/vueTest.md' }
        ]
      },
      {
        text: '打包工具',
        children: [
          {
            text: 'Webpack',
            link: '/webpack/webpack/'
          },
          {
            text: 'Rollup',
            link: '/rollup'
          }
        ]
      },
      {
        text: 'TypeScript',
        children: [
          {
            text: 'TypeScript基础',
            link: '/typescript/'
          },
          {
            text: 'TypeScript类型挑战',
            link: '/typescript/challenge.md'
          }
        ]
      }
    ],
    sidebar: {
      '/webpack/webpack/': [webpackSidebar],
      '/vueAnalysis/': vueAnalysisSidebar,
      '/vueNextAnalysis/': vueNextAnalysisSidebar
    }
  },
  plugins: [
    [
      '@vuepress/plugin-docsearch',
      {
        apiKey: '3a539aab83105f01761a137c61004d85',
        indexName: 'vuepress',
        searchParameters: {
          facetFilters: ['tags:v2'],
        },
        locales: {
          '/zh/': {
            placeholder: '搜索文档',
          },
        },
      },
    ]
  ]
})

console.log('\x1B[32m', '知识库强，则技术强，技术强则国强-狗蛋404实验室·知识库')
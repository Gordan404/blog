// webpack目录结构
const webpackSidebar = {
  title: 'Webpack',
  collapsable: false,
  children: [
    '/webpack/webpack/',
    '/webpack/webpack/source.md',
    '/webpack/webpack/install.md',
    '/webpack/webpack/start.md',
    '/webpack/webpack/static.md',
    '/webpack/webpack/core.md',
    '/webpack/webpack/advanced.md',
    '/webpack/webpack/case.md',
    '/webpack/webpack/optimization.md',
    '/webpack/webpack/loader.md',
    '/webpack/webpack/plugin.md'
  ]
}

// Vue源码分析目录结构
const vueAnalysisSidebar = [
  {
    title: '介绍',
    collapsable: false,
    children: ['/vueAnalysis/introduction/']
  },
  {
    title: '源码目录设计和架构设计',
    collapsable: false,
    children: ['/vueAnalysis/design/']
  },
  {
    title: 'Rollup构建版本',
    collapsable: false,
    children: [
      '/vueAnalysis/rollup/',
      '/vueAnalysis/rollup/vue.md'
    ]
  },
  {
    title: '从入口到构造函数整体流程',
    collapsable: false,
    children: [
      '/vueAnalysis/entry/',
      '/vueAnalysis/entry/global.md',
      '/vueAnalysis/entry/init.md',
      '/vueAnalysis/entry/state.md',
      '/vueAnalysis/entry/events.md',
      '/vueAnalysis/entry/lifecycle.md',
      '/vueAnalysis/entry/render.md'
    ]
  },
  {
    title: '响应式原理',
    collapsable: false,
    children: [
      '/vueAnalysis/reactive/',
      '/vueAnalysis/reactive/prepare.md',
      '/vueAnalysis/reactive/props.md',
      '/vueAnalysis/reactive/methods.md',
      '/vueAnalysis/reactive/data.md',
      '/vueAnalysis/reactive/computed.md',
      '/vueAnalysis/reactive/watch.md',
      '/vueAnalysis/reactive/reactive.md',
      '/vueAnalysis/reactive/dep.md',
      '/vueAnalysis/reactive/notify.md',
      '/vueAnalysis/reactive/nexttick.md',
      '/vueAnalysis/reactive/problem.md',
      '/vueAnalysis/reactive/api.md'
    ]
  },
  {
    title: '虚拟DOM和VNode',
    collapsable: false,
    children: [
      '/vueAnalysis/dom/',
      '/vueAnalysis/dom/vnode.md',
      '/vueAnalysis/dom/diff.md'
    ]
  },
  {
    title: '组件化',
    collapsable: false,
    children: [
      '/vueAnalysis/component/',
      '/vueAnalysis/component/mount.md',
      '/vueAnalysis/component/render.md',
      '/vueAnalysis/component/createElement.md',
      '/vueAnalysis/component/createComponent.md',
      '/vueAnalysis/component/merge.md',
      '/vueAnalysis/component/patch.md',
      '/vueAnalysis/component/lifecycle.md',
      '/vueAnalysis/component/register.md'
    ]
  },
  {
    title: '编译原理',
    collapsable: false,
    children: [
      '/vueAnalysis/compile/',
      '/vueAnalysis/compile/compileToFunctions.md',
      '/vueAnalysis/compile/parse.md',
      '/vueAnalysis/compile/optimize.md',
      '/vueAnalysis/compile/codegen.md'
    ]
  },
  {
    title: '扩展',
    collapsable: false,
    children: [
      '/vueAnalysis/expand/',
      '/vueAnalysis/expand/directive.md',
      '/vueAnalysis/expand/filter.md',
      '/vueAnalysis/expand/event.md',
      '/vueAnalysis/expand/vmodel.md',
      '/vueAnalysis/expand/slot.md',
      '/vueAnalysis/expand/keep-alive.md',
      '/vueAnalysis/expand/transition.md',
      '/vueAnalysis/expand/transition-group.md',
      '/vueAnalysis/expand/plugin.md'
    ]
  },
  {
    title: 'Vue-Router',
    collapsable: false,
    children: [
      '/vueAnalysis/router/',
      '/vueAnalysis/router/install.md',
      '/vueAnalysis/router/matcher.md',
      '/vueAnalysis/router/change.md',
      '/vueAnalysis/router/components.md',
      '/vueAnalysis/router/hooks.md'
    ]
  },
  {
    title: 'Vuex',
    collapsable: false,
    children: [
      '/vueAnalysis/vuex/',
      '/vueAnalysis/vuex/install.md',
      '/vueAnalysis/vuex/init.md',
      '/vueAnalysis/vuex/utils.md',
      '/vueAnalysis/vuex/api.md'
    ]
  }
]

// Vue3.0源码分析目录结构
const vueNextAnalysisSidebar = [
  // {
  //   title: '介绍',
  //   collapsable: false,
  //   children: ['introduction/']
  // },
  // {
  //   title: '源码目录',
  //   collapsable: false,
  //   children: ['catalog/']
  // },
  // {
  //   title: 'Monorepo',
  //   collapsable: false,
  //   children: ['monorepo/']
  // },
  // {
  //   title: 'Rollup版本构建',
  //   collapsable: false,
  //   children: ['rollup/']
  // },
  // {
  //   title: 'Composition API',
  //   collapsable: false,
  //   children: ['composition/']
  // },
  // {
  //   title: '组件化',
  //   collapsable: false,
  //   children: ['components/']
  // },
  // {
  //   title: '编译原理',
  //   collapsable: false,
  //   children: ['compile/']
  // },
  // {
  //   title: 'Vue-Router',
  //   collapsable: false,
  //   children: ['router/']
  // },
  // {
  //   title: 'Vuex',
  //   collapsable: false,
  //   children: ['vuex/']
  // }
]

module.exports = {
  webpackSidebar,
  vueAnalysisSidebar,
  vueNextAnalysisSidebar
}
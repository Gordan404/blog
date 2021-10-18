---
sidebar: auto
---
# 前端面试指北

## webpack相关面试题

### webpack-merge
```
用webpack-merge将配置文件拆分为3个文件，一个是webpack.common.js，即不管是生产环境还是开发环境都会用到的部分，以及webpack.prod.js和webpack.dev.js, 并且使用webpack-merge来合并对象。
```
* webpack.common.js
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin') // 移动端调试vConsole
const { srcPath, distPath } = require('./paths')
module.exports = {
    entry: path.join(srcPath, 'index'),
    module: {
        rules: [
            {
                test: /\.js$/, // 文件验证规则
                loader: ['babel-loader'], // babel-loader 可以额外配置.babelrc文件
                include: srcPath, // 包含处理哪些文件夹下的文件
                exclude: /node_modules/ // 不包含，过滤的文件 
            },
            // {
            //     test: /\.vue$/,
            //     loader: ['vue-loader'],
            //     include: srcPath
            // },
            // {
            //     test: /\.css$/,
            //     // loader 的执行顺序是：从后往前（知识点）
            //     loader: ['style-loader', 'css-loader']
            // },
            {
                test: /\.css$/,
                // loader 的执行顺序是：从后往前
                loader: ['style-loader', 'css-loader', 'postcss-loader'] 
                // 加了 postcss
                // 注意:common.js 不应该用style-loader，只有在dev中存在，prod中用MiniCssExtractPlugin，后面【CSS抽离】会提到
            },
            {
                test: /\.less$/,
                // 增加 'less-loader' ，注意顺序
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new vConsolePlugin({
            filter: [],
            enable: process.env.NODE_ENV !== 'production'
        }),
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ]
}
```
* webpack.dev.js
```js
const path = require('path')
const webpack = require('webpack')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')

module.exports = smart(webpackCommonConf, {
    mode: 'development',
    module: {
        rules: [
            // 直接引入图片 url
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // window.ENV = 'development'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 8080,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩

        // 设置代理
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})

```
* webpack.prod.js
```js
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const { srcPath, distPath } = require('./paths')
module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳,内容改变hash才会变
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
        new webpack.DefinePlugin({
            // window.ENV = 'production'
            ENV: JSON.stringify('production')
        })
    ]
})

```
#### postcss-loader
```js
// 依赖autoprefixer
// 需要添加 postcss.config.js文件
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = ({ file }) => {
  let remUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 37.5 
  } else {
    remUnit = 75  // rem 换算
  }
  return {
    plugins: [
      autoprefixer(), // 自动加前缀
      pxtorem({
        rootValue: remUnit,
        propList: ['*'],
        selectorBlackList: ['van-circle__layer']
      })
    ]
  }
}

```
### 多入口配置entry
:::tip
1. 一个项目中保存了多个 HTML 模版，不同的模版有不同的入口，并且有各自的 router、store 等；
2. 不仅可以打包出不同 HTML，而且开发的时候也可以顺利进行调试；
3. 不同入口的文件可以引用同一份组件、图片等资源，也可以引用不同的资源；
:::
```js
// webpack.common.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: { // 多页面，在entry入口出需要建多个
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },
    module: {
        rules: [
          ...
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index']  // 只引用 index.js
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other']  // 只引用 other.js
        })
    ]
}
// webpack.prod.js
module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        // filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
      ...
    },
    plugins: [
      new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
      new webpack.DefinePlugin({
          // window.ENV = 'production'
          ENV: JSON.stringify('production')
      })
    ]
})

```
### CSS抽离
:::tip
原本打包过后是css-in-js,在开发环境中使用HMR,style-loader会在页面中创建很多`<style>`标签,增加js体积,配置完`MiniCssExtractPlugin后`,可以将css单独打包出来`MiniCssExtractPlugin`这个插件应该只在生产环境构建中使用，并且在loader链中不应该有style-loader,抽离之后可以相互引用
:::
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = smart(webpackCommonConf, {
  mode: 'production',
  output: {
    ...
  },
  module: {
        rules: [
            // 图片 - 考虑 base64 编码的情况
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 小于 5kb 的图片用 base64 格式产出
                        // 否则，依然延用 file-loader 的形式，产出 url 格式
                        limit: 5 * 1024,

                        // 打包到 img 目录下
                        outputPath: '/img1/',

                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
            // 抽离 css
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'postcss-loader'
                ]
            },
            // 抽离 less --> css
            {
                test: /\.less$/,
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'less-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
      new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
      new webpack.DefinePlugin({
          // window.ENV = 'production'
          ENV: JSON.stringify('production')
      }),

      // 抽离 css 文件
      new MiniCssExtractPlugin({
          filename: 'css/main.[contentHash:8].css'
      })
    ],

    optimization: {
      // 压缩 css、js
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    }
})
```
### 抽离公共代码(splitChunks)
:::tip
1. 某块业务代码被多个入口引用，抽离出来，放到一个公共模块中。这样不管这个模块被多少个入口引用，都只会在最终打包结果中出现一次解决代码冗余。
2. 第三方库一般很大，而且代码基本不会再改动,我会把一些特别大的库分别独立打包，(抽离后不会因为业务代码改变，而导致库hash值也变)，剩下的加起来如果还很大，就把它按照一定大小切割成若干模块。
:::
```js
// prod.common.js
module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
    },
    module: {
      ...
    },
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

        // 分割代码块
        splitChunks: {
            chunks: 'all',
            /**
             * initial 入口 chunk，对于异步导入的文件不处理
                async 异步 chunk，只对异步导入的文件处理
                all 全部 chunk
             */

            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: 1, // 权限更高，优先抽离，重要！！！
                    test: /node_modules/,
                    minSize: 0,  // 大小限制
                    minChunks: 1  // 最少复用过几次
                },

                // 公共的模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级
                    minSize: 0,  // 公共模块的大小限制(如果太小就没必要单独打包了)
                    minChunks: 2  // 公共模块最少复用过几次
                }
            }
        }
    }
})
// webpack.common.js
module.exports = {
    entry: {
    },
    module: {
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: path.join(srcPath, 'index.html'),
        //     filename: 'index.html'
        // })

        // 多入口 - 生成 index.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['other', 'common']  // 考虑代码分割
        })
    ]
}
```
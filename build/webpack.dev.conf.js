var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    // 多页面去除这块
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
})

var pages = utils.getEntries(config.entries + '*.html')
for (var page in pages) {
  // 配置生成的 html 文件，定义路径等
  var conf = {
    filename: page + '.html',
    template: pages[page], // 模板路径
    inject: true,
    hash: true,
    favicon: 'src/root/favicon.ico',
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true
    // },
    // chunks: ['vendors', 'manifest', page], // 每个html引用的js模块
    // chunksSortMode: 'dependency',

    // excludeChunks 允许跳过某些 chunks, 而 chunks 告诉插件要引用 entry 里面的哪几个入口
    // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
    // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
    // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
    excludeChunks: Object.keys(pages).filter(item => {
      return (item !== page)
    })
  }

  // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
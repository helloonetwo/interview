# alias
配置别名可以加快webpack查找模块的速度
* 每当引入bootstrap模块的时候，它会直接引入bootstrap,而不需要从node_modules文件夹中按模块的查找规则查找


## alias 在 vue cli  的具体实现 ：
```js
config.resolve.alias.set('@', resolve('src')) 

```


```js
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const webpack = require('webpack')

const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin({
  outputFormat:"human",
});
// gzip压缩
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const productionGzipExtensions = ['html', 'js', 'css', 'png']
// const compress = new CompressionWebpackPlugin(
//   {
//     filename: info => {
//       return `${info.path}.gz${info.query}`
//     },
//     algorithm: 'gzip',
//     threshold: 10240,
//     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
//     minRatio: 0.8,
//     deleteOriginalAssets: false
//   }
// )

module.exports = {
  publicPath: '/console/',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: 'chunk-common', // 打包后的文件名
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        moment: {
          name: 'chunk-moment',
          test: /[\\/]node_modules[\\/]moment[\\/]/,
          chunks: 'initial',
          priority: 4,
          reuseExistingChunk: true,
          enforce: true
        },
        antDesignVue: {
          name: 'chunk-ant-design-vue',
          test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
          chunks: 'initial',
          priority: 5,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })
    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // js文件最小化处理
    config.optimization.minimize(true)
    config.plugin('ContextReplacementPlugin').use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
    config.resolve.alias.set('@', resolve('src'))
    // 添加全局变量
    config.plugin('define').tap(args => {
      args[0]['process.env']['static'] = process.env.static
      return args
    })
    // config.optimization.minimize(true);
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // })
    // //压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  },
  configureWebpack: smp.wrap({
    plugins: [],
    resolve: {
       extensions: [".js",".jsx",".json",".css"]
    }

    // let myConfig = {}
    // // 修改sourceMap模式
    // myConfig.devtool = 'cheap-module-source-map'
    // return myConfig
  })
}
```
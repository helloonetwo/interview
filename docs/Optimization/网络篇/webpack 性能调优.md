# webpack 性能调优与 Gzip 原理
优化项目可以从网络层面进行，HTTP 连接这一层面的优化才是我们网络优化的核心
HTTP 优化有两个大的方向：
- 减少请求次数
- 减少单次请求所花费的时间
这两个优化点直直地指向了我们日常开发中非常常见的操作——资源的压缩与合并。没错，这就是我们每天用构建工具在做的事情。而时下最主流的构建工具无疑是 webpack，所以我们这节的主要任务就是围绕业界霸主 webpack 来做文章。

## webpack 优化方案
- webpack 的构建过程太花时间
- webpack 打包的结果体积太大

### 构建过程提速策略

#### 1. 不要让 loader 做太多事情——以 babel-loader 为例
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}

```

如果我们选择开启缓存将转译结果缓存至文件系统，则至少可以将 babel-loader 的工作效率提升两倍。要做到这点，我们只需要为 loader 增加相应的参数设定：
```js
loader: 'babel-loader?cacheDirectory=true'
```
#### 2. 不要放过第三方库
处理第三方库的姿势有很多，其中，CommonsChunkPlugin 每次构建时都会重新构建一次 vendor；出于对效率的考虑，我们更多是使用 DllPlugin。

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。
用 DllPlugin 处理文件，要分两步走：

- 基于 dll 专属的配置文件，打包 dll 库
- 基于 webpack.config.js 文件，打包业务代码

以一个基于 React 的简单项目为例，我们的 dll 的配置文件可以编写如下：
```js
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { srcPath, distPath } = require('./paths')

module.exports = {
  mode: 'development',
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: distPath,
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(distPath, '[name].manifest.json'),
    }),
  ],
}
```

编写完成之后，运行这个配置文件，我们的 dist 文件夹里会出现这样两个文件：
```js
vendor-manifest.json
vendor.js
```
vendor.js 不必解释，是我们第三方库打包的结果。这个多出来的 vendor-manifest.json，则用于描述每个第三方库对应的具体路径，我这里截取一部分给大家看下：
```js
{
  "name": "vendor_397f9e25e49947b8675d",
  "content": {
    "./node_modules/core-js/modules/_export.js": {
      "id": 0,
        "buildMeta": {
        "providedExports": true
      }
    },
    "./node_modules/prop-types/index.js": {
      "id": 1,
        "buildMeta": {
        "providedExports": true
      }
    },
    ...
  }
}  
```
随后，我们只需在 webpack.config.js 里针对 dll 稍作配置：
```js
const path = require('path');
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  // 编译入口
  entry: {
    main: './src/index.js'
  },
  // 目标文件
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
  },
  // dll相关配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest就是我们第一步中打包出来的json文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
```
一次基于 dll 的 webpack 构建过程优化，便大功告成了！
#### 3. Happypack——将 loader 由单进程转为多进程
Happypack 会充分释放 CPU 在多核并发方面的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率。

HappyPack 的使用方法也非常简单，只需要我们把对 loader 的配置转移到 HappyPack 中去就好，我们可以手动告诉 HappyPack 我们需要多少个并发的进程：
```js
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}
```
### 构建结果体积压缩

#### 1.文件结构可视化，找出导致体积过大的原因
这里为大家介绍一个非常好用的包组成可视化工具——webpack-bundle-analyzer，配置方法和普通的 plugin 无异，它会以矩形树图的形式将包内各个模块的大小和依赖关系呈现出来，格局如官方所提供这张图所示：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9e2b9389a6b41ca99ee0730914c4e33~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)
在使用时，我们只需要将其以插件的形式引入：
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```
#### 2. 拆分资源
#### 3. 删除冗余代码
 - Tree-Shaking 的针对性很强，它更适合用来处理模块级别的冗余代码。
 - ParallelUglifyPlugin 在压缩过程中对碎片化的冗余代码（如 console 语句、注释等）进行自动化删除：
 使用 ParallelUglifyPlugin 开启多进程压缩 (生产环境)

- 安装
```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
```
- 使用

```js
        // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
        new ParallelUglifyPlugin({
            // 传递给 UglifyJS 的参数
            // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
            uglifyJS: {
                output: {
                    beautify: false, // 最紧凑的输出
                    comments: false, // 删除所有的注释
                },
                compress: {
                    // 删除所有的 `console` 语句，可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }
        })
```
#### 4. 按需加载
```
import BugComponent from '../pages/BugComponent'
...
<Route path="/bug" component={BugComponent}>

```


#### 5. 图片处理
小图base 代码
```js
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
```
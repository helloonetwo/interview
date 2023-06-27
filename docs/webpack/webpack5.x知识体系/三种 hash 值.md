# 三种 hash 值
Webpack 文件指纹策略是将文件名后面加上 hash 值。特别在使用 CDN 的时候，缓存是它的特点与优势，但如果打包的文件名，没有 hash 后缀的话，你肯定会被缓存折磨的够呛 😂
例如我们在基础配置中用到的：filename: "[name][hash:8][ext]"
这里里面 [] 包起来的，就叫占位符，它们都是什么意思呢？请看下面这个表 👇🏻
| 占位符 | 解释 | 
| :--- | :----: | 
| ext | 文件后缀名 | 
| a    | b      | 
| ext |	文件后缀名 |
| name| 	文件名| 
|path	 | 文件相对路径|
| folder |	文件所在文件夹|
|hash	 |每次构建生成的唯一 hash 值|
|chunkhash	|根据 chunk 生成 hash 值|
|contenthash	|根据文件内容生成hash 值|


占位符解释ext文件后缀名name文件名path文件相对路径folder文件所在文件夹hash每次构建生成的唯一 hash 值chunkhash根据 chunk 生成 hash 值contenthash根据文件内容生成hash 值
表格里面的 hash、chunkhash、contenthash 你可能还是不清楚差别在哪

- hash ：任何一个文件改动，整个项目的构建 hash 值都会改变；
- chunkhash：文件的改动只会影响其所在 chunk 的 hash 值；
- scontenthash：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值；


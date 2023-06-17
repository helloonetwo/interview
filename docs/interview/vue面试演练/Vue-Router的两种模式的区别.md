# Vue-Router的两种模式的区别
Vue-Router 有三种模式 hash、history、abstract
- abstract模式是在不支持浏览器API环境使用，不依赖于浏览器历史
- hash模式：hash + popState/hashChange 兼容性好但是不够美观，hash服务端无法获取。不利于seo优化
- history模式: historyApi+ popState 美观，刷新会出现404 -> CLI webpack history-fallback



![细说前端路由的hash模式和 history模式](https://juejin.cn/post/6993897542970769421)

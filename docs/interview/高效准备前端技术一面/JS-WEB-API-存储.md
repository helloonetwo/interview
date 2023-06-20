# 浏览器存储
- 传递方式不同
cookie数据始终在同源 的http请求中携带(即使不需要) 即cookie在浏览器 和服务器 来回传递
- 数据大小不同
cookie受限 .....
sessionStorage 和 localStoreage 虽然 也有存储大小的限制 但比cookie大的多 5m+~
- 数据有效期不同
sessionStorage 仅在当前浏览器窗口关闭前有效 不可能持久保持
localStore     始值有效 窗口或浏览器关闭也一直在 因此作用持久数据
cookie         只在设置cookie过期的时间之前一直有效 即使窗口或浏览器关闭
- 作用域不同
sessionStorage 不在不同的浏览器窗口中共享 即使同一个页面
locaStorage && cookie 在同源窗口中 都是共享的
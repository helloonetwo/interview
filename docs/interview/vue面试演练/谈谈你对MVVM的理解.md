# 谈谈你对MVVM的理解？


为什么要有这些模式：目的：职责划分、分层 ( 将Model层、View层进行分类 ) 借鉴后端思想。对于前端而言就是如何将数据同步到页面上。

- MVC模式 : Backbone + underscore + jquery

> 对于前端而言，数据变化无法同步到视图中。需要将逻辑聚拢在controller层

- MVVM模式 : 映射关系的简化 （隐藏controller）

![MVVM](http://zhufengpeixun.com/jg-vue/assets/img/mvvm-1611744420463.1a57684c.png)

> 虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。
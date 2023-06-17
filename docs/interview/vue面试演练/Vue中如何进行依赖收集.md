#  Vue中如何进行依赖收集？
- 每个属性都拥有自己的dep属性，存放他所依赖的watcher，当属性变化后会通知自己对应的watcher去更新
- 默认在初始化时会调用render函数，此时会触发属性依赖收集 dep.depend
- 当属性发生修改时会触发watcher更新 dep.notify()

![](http://zhufengpeixun.com/jg-vue/assets/img/fow.34669a8f.png)
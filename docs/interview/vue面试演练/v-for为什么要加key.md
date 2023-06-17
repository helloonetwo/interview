# v-for为什么要加key
- Vue在patch过程中通过key可以判断两个虚拟节点是否是相同节点。 （可以复用老节点）
- 无key会导致更新的时候出问题
- 尽量不要采用索引作为key

![](http://zhufengpeixun.com/jg-vue/assets/img/key.ca1b7f53.png)
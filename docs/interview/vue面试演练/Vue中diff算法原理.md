# Vue中diff算法原理

Vue的diff算法是平级比较，不考虑跨级比较的情况。内部采用深度递归的方式 + 双指针的方式进行比较。

1.先比较是否是相同节点 key tag

2.相同节点比较属性,并复用老节点

3.比较儿子节点，考虑老节点和新节点儿子的情况

4.优化比较：头头、尾尾、头尾、尾头

5.比对查找进行复用

Vue3中采用最长递增子序列来实现diff优化

> src/core/vdom/patch.js:700

  src/core/vdom/patch.js:501 比较两个虚拟节点 patchVnode()

  src/core/vdom/patch.js:404 比较两个虚拟节点 patchChildren()

![](http://www.zhufengpeixun.com/jg-vue/assets/img/vue-diff.4c21677d.jpg)
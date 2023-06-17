# Vue为什么需要虚拟DOM

- Virtual DOM就是用js对象来描述真实DOM，是对真实DOM的抽象
- 由于直接操作DOM性能低但是js层的操作效率高，可以将DOM操作转化成对象操作，最终通过diff算法比对差异进行更新DOM（减少了对真实DOM的操作）。
- 虚拟DOM不依赖真实平台环境从而也可以实现跨平台。

> scr/core/vdom/create-element.js:28

> src/core/vdom/vnode.js 虚拟节点的实现


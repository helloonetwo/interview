# Vue组件data为什么必须是个函数？
每次使用组件时都会对组件进行实例化操作，并且调用data函数返回一个对象作为组件的数据源。这样可以保证多个组件间数据互不影响

```js
function Vue() {}
function Sub() { // 会将data存起来
    this.data = this.constructor.options.data;
}
Vue.extend = function(options) {
    Sub.options = options;
    return Sub;
}
let Child = Vue.extend({
    data: { name: 'zf' }
});
// 两个组件就是两个实例, 希望数据互不干扰
let child1 = new Child();
let child2 = new Child();

console.log(child1.data.name);
child1.data.name = 'jw';
console.log(child2.data.name);

```
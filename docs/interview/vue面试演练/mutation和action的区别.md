# mutation和action的区别
mutation: 主要在于修改状态，必须同步执行
action: 执行业务代码，方便复用，逻辑可以为异步，不能直接修改状态
```js
function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((process.env.NODE_ENV !== 'production')) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true }); // 同步watcher监控状态变化
}
```
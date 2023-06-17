# 

- 使用keep-alive包裹动态组件时, 会对组件进行缓存。避免组件的重新创建


```vue
<keep-alive :include="whiteList" :exclude="blackList" :max="count">
     <component :is="component"></component>
</keep-alive>
```


```vue
<keep-alive :include="whiteList" :exclude="blackList" :max="count">
    <router-view></router-view>
</keep-alive>
```

- 实现原理

```js
export default {
  name: 'keep-alive',
  abstract: true, // 不会放到对应的lifecycle

  props: {
    include: patternTypes, // 白名单
    exclude: patternTypes, // 黑名单
    max: [String, Number] // 缓存的最大个数
  },

  created () {
    this.cache = Object.create(null) // 缓存列表
    this.keys = []  // 缓存的key列表
  },

  destroyed () {
    for (const key in this.cache) { // keep-alive销毁时 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () { // 监控缓存列表
    this.$watch('include', val => { 
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render () {
    const slot = this.$slots.default
    const vnode: VNode = getFirstComponentChild(slot) 、// 获得第一个组件
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      if ( // 获取组件名 看是否需要缓存，不需要缓存则直接返回
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key // 生成缓存的key
      if (cache[key]) { // 如果有key 将组件实例直接复用
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key) // lru算法
      } else {
        cache[key] = vnode // 缓存组件
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode) // 超过最大限制删除第一个
        }
      }

      vnode.data.keepAlive = true // 在firstComponent的vnode中增加keep-alive属性
    }
    return vnode || (slot && slot[0])
  }
}
```

  - keep-alive第一次渲染的时候，会将其第一个子组件，缓存起来。
  - 当组件后续在次被激活时，会复用上一次缓存的实例进行渲染。


> src\core\vdom\patch.js:210
```js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
        const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
        if (isDef(i = i.hook) && isDef(i = i.init)) {
            i(vnode, false /* hydrating */)
        }
        if (isDef(vnode.componentInstance)) {
            initComponent(vnode, insertedVnodeQueue)
            insert(parentElm, vnode.elm, refElm) // 将原来的elm，插入到页面中
            if (isTrue(isReactivated)) {
                reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
            }
            return true
        }
    }
}
```
> src\core\vdom\create-component.js:36
```js
const componentVNodeHooks = {
    init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
        if ( 
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive // 有keepAlive, 不在执行组件的初始化流程
        ) {
            // kept-alive components, treat as a patch
            const mountedNode: any = vnode // work around flow
            componentVNodeHooks.prepatch(mountedNode, mountedNode)
        } else {
            const child = vnode.componentInstance = createComponentInstanceForVnode(
                vnode,
                activeInstance
            )
            //  组件挂载 当前组件实例中 包含$el属性
            child.$mount(hydrating ? vnode.elm : undefined, hydrating)
        }
    }
}
```
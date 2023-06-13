# 手写 EventBus

Bus 不是“车”，而是“总线”

## 题目

请手写 EventBus 自定义事件，实现 `no` `once` `emit` 和 `off`

## EventBus 功能

```js
const event = new EventBus()

function fn1(a, b) { console.log('fn1', a, b) }
function fn2(a, b) { console.log('fn2', a, b) }
function fn3(a, b) { console.log('fn3', a, b) }

event.on('key1', fn1)
event.on('key1', fn2)
event.once('key1', fn3)
event.on('xxxxxx', fn3)

event.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

event.off('key1', fn1)

event.emit('key1', 100, 200) // 触发 fn2
```

## 实现

- `class` 结构
- 注意区分 `on` 和 `off`

代码参考 event-bus.ts
```ts
export default class EventBus {
    /**
     * {
     *    'key1': [
     *        { fn: fn1, isOnce: false },
     *        { fn: fn2, isOnce: false },
     *        { fn: fn3, isOnce: true },
     *    ]
     *    'key2': [] // 有序
     *    'key3': []
     * }
     */
    private events: {
        [key: string]: Array<{fn: Function; isOnce: boolean}>
    }

    constructor() {
        this.events = {}
    }

    on(type: string, fn: Function, isOnce: boolean = false) {
        const events = this.events
        if (events[type] == null) {
            events[type] = [] // 初始化 key 的 fn 数组
        }
        events[type].push({ fn, isOnce })
    }

    once(type: string, fn: Function) {
        this.on(type, fn, true)
    }

    off(type: string, fn?: Function) {
        if (!fn) {
            // 解绑所有 type 的函数
            this.events[type] = []
        } else {
            // 解绑单个 fn
            const fnList = this.events[type]
            if (fnList) {
                this.events[type] = fnList.filter(item => item.fn !== fn)
            }
        }
    }

    emit(type: string, ...args: any[]) {
        const fnList = this.events[type]
        if (fnList == null) return

        // 注意
        this.events[type] = fnList.filter(item => {
            const { fn, isOnce } = item
            fn(...args)

            // once 执行一次就要被过滤掉
            if (!isOnce) return true
            return false
        })
    }
}

// const e = new EventBus()

// function fn1(a: any, b: any) { console.log('fn1', a, b) }
// function fn2(a: any, b: any) { console.log('fn2', a, b) }
// function fn3(a: any, b: any) { console.log('fn3', a, b) }

// e.on('key1', fn1)
// e.on('key1', fn2)
// e.once('key1', fn3)
// e.on('xxxxxx', fn3)

// e.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

// e.off('key1', fn1)

// e.emit('key1', 100, 200) // 触发 fn2

```

- emit 中 fnList.filter 可以看成遍历的同时触发 fn事件 并且过滤掉 isOnce 的事件、
- on 是注册事件  off 是解绑事件   emit 是触发事件  once是触发一次 
### 单元测试
```ts
import EventBus from './event-bus-split-on-once'
describe('EventBus 自定义事件', () => {
    it('绑定事件，触发事件', () => {
        const event = new EventBus()

        // 注意
        const fn1 = jest.fn() // jest mock function
        const fn2 = jest.fn()
        const fn3 = jest.fn()

        event.on('key1', fn1)
        event.on('key1', fn2)
        event.on('xxxx', fn3)

        event.emit('key1', 10, 20)

        expect(fn1).toBeCalledWith(10, 20)
        expect(fn2).toBeCalledWith(10, 20)
        expect(fn3).not.toBeCalled()
    })

    it('解绑单个事件', () => {
        const event = new EventBus()

        const fn1 = jest.fn()
        const fn2 = jest.fn()

        event.on('key1', fn1)
        event.on('key1', fn2)

        event.off('key1', fn1)

        event.emit('key1', 10, 20)

        expect(fn1).not.toBeCalled()
        expect(fn2).toBeCalledWith(10, 20)
    })

    it('解绑所有事件', () => {
        const event = new EventBus()

        const fn1 = jest.fn()
        const fn2 = jest.fn()

        event.on('key1', fn1)
        event.on('key1', fn2)

        event.off('key1') // 解绑所有事件

        event.emit('key1', 10, 20)

        expect(fn1).not.toBeCalled()
        expect(fn2).not.toBeCalled()
    })

    it('once', () => {
        const event = new EventBus()

        let n = 1

        const fn1 = jest.fn(() => n++)
        const fn2 = jest.fn(() => n++)

        event.once('key1', fn1)
        event.once('key1', fn2)

        // 无论 emit 多少次，只有一次生效
        event.emit('key1')
        event.emit('key1')
        event.emit('key1')
        event.emit('key1')
        event.emit('key1')

        expect(n).toBe(3)
    })
})

```




###  拆分保存 on 和 once 事件

```ts
export default class EventBus2 {
    private events: { [key: string]: Array<Function> } // { key1: [fn1, fn2], key2: [fn1, fn2] }
    private onceEvents: { [key: string]: Array<Function> }

    constructor() {
        this.events = {}
        this.onceEvents = {}
    }

    on(type: string, fn: Function) {
        const events = this.events
        if (events[type] == null) events[type] = []
        events[type].push(fn)
    }

    once(type: string, fn: Function) {
        const onceEvents = this.onceEvents
        if (onceEvents[type] == null) onceEvents[type] = []
        onceEvents[type].push(fn)
    }

    off(type: string, fn?: Function) {
        if (!fn) {
            // 解绑所有事件
            this.events[type] = []
            this.onceEvents[type] = []
        } else {
            // 解绑单个事件
            const fnList = this.events[type]
            const onceFnList = this.onceEvents[type]
            if (fnList) {
                this.events[type] = fnList.filter(curFn => curFn !== fn)
            }
            if (onceFnList) {
                this.onceEvents[type] = onceFnList.filter(curFn => curFn !== fn)
            }
        }
    }

    emit(type: string, ...args: any[]) {
        const fnList = this.events[type]
        const onceFnList = this.onceEvents[type]

        if (fnList) {
            fnList.forEach(f => f(...args))
        }
        if (onceFnList) {
            onceFnList.forEach(f => f(...args))

            // once 执行一次就删除
            this.onceEvents[type] = []
        }
    }
}

// const e = new EventBus2()

// function fn1(a: any, b: any) { console.log('fn1', a, b) }
// function fn2(a: any, b: any) { console.log('fn2', a, b) }
// function fn3(a: any, b: any) { console.log('fn3', a, b) }

// e.on('key1', fn1)
// e.on('key1', fn2)
// e.once('key1', fn3)
// e.on('xxxxxx', fn3)

// e.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

// e.off('key1', fn1)

// e.emit('key1', 100, 200) // 触发 fn2

```
## 连环问：EventBus 里的数组可以换成 Set 吗？

数组和 Set 比较 （除了语法 API）
- 数组，有序结构，查找、中间插入、中间删除比较慢
- Set 不可排序的，插入和删除都很快

Set 初始化或者 `add` 时是一个有序结构，但它无法再次排序，没有 `index` 也没有 `sort` 等 API 

验证
- 生成一个大数组，验证 `push` `unshift` `includes` `splice`
- 生成一个大 Set ，验证 `add` `delete` `has`

答案：不可以，Set 是不可排序的，如再增加一些“权重”之类的需求，将不好实现。

## Map 和 Object

Object 是无序的

```js
const data1 = {'1':'aaa','2':'bbb','3':'ccc','测试':'000'}
Object.keys(data1) // ["1", "2", "3", "测试"]
const data2 = {'测试':'000','1':'aaa','3':'ccc','2':'bbb'};
Object.keys(data2); // ["1", "2", "3", "测试"]
```

Map 是有序的

```js
const m1 = new Map([
    ['1', 'aaa'],
    ['2', 'bbb'],
    ['3', 'ccc'],
    ['测试', '000']
])
m1.forEach((val, key) => { console.log(key, val) })
const m2 = new Map([
    ['测试', '000'],
    ['1', 'aaa'],
    ['3', 'ccc'],
    ['2', 'bbb']
])
m2.forEach((val, key) => { console.log(key, val) })
```

另外，**Map 虽然是有序的，但它的 `get` `set` `delete` 速度非常快**，和 Object 效率一样。它是被优化过的有序结构。

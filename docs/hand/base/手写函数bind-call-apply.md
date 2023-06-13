# 手写函数 bind，call 和 apply

## 题目

请手写实现函数 bind

## bind 应用

- 返回一个新的函数（旧函数不会更改）
- 绑定 `this` 和部分参数
- 箭头函数，无法改变 `this` ，只能改变参数

```js
function fn(a, b, c) {
    console.log(this, a, b, c)
}
const fn1 = fn.bind({x: 100})
fn1(10, 20, 30) // {x: 100} 10 20 30
const fn2 = fn.bind({x: 100}, 1, 2)
fn2(10, 20, 30) // {x: 100} 1 2 10 （注意第三个参数变成了 10）

fn(10, 20, 30) // window 10 20 30 （旧函数不变）
```

## 解答

代码参考 bind.ts
```ts
// @ts-ignore
Function.prototype.customBind = function (context: any, ...bindArgs: any[]) {
    // context 是 bind 传入的 this
    // bindArgs 是 bind 传入的各个参数

    const self = this // 当前的函数本身

    return function (...args: any[]) {
        // 拼接参数
        const newArgs = bindArgs.concat(args)
        return self.apply(context, newArgs)
    }
}

// // 功能测试
// function fn(this: any, a: any, b: any, c: any) {
//     console.info(this, a, b, c)
// }
// // @ts-ignore
// const fn1 = fn.customBind({x: 100}, 10)
// fn1(20, 30)

```
要点
- 返回新函数
- 拼接参数（bind 参数 + 执行参数）
- 重新绑定 `this`

### 单元测试 
bind.test.ts
```ts
import './bind'

describe('自定义 bind', () => {
    it('绑定 this', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const fn1 = fn.customBind({x: 100})
        expect(fn1()).toEqual({x: 100})
    })
    it('绑定参数', () => {
        function fn(a: number, b: number, c: number) {
            return a + b + c
        }
        // @ts-ignore
        const fn1 = fn.customBind(null, 10, 20)
        expect(fn1(30)).toBe(60)
    })
})

```
## 连环问：手写函数 call 和 apply

`bind` 生成新函数，暂不执行。而 `call` `apply` 会直接立即执行函数
- 重新绑定 `this` （箭头函数不支持）
- 传入参数

```js
function fn(a, b, c) {
    console.log(this, a, b, c)
}
fn.call({x: 100}, 10, 20, 30)
fn.apply({x: 100}, [10, 20, 30])
```

代码参考 call-apply.ts
```ts
/**
 * @description 自定义 call apply
 * @author 
 */

// @ts-ignore
Function.prototype.customCall = function (context: any, ...args: any[]) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

    const fnKey = Symbol() // 不会出现属性名称的覆盖
    context[fnKey] = this // this 就是当前的函数

    const res = context[fnKey](...args) // 绑定了 this

    delete context[fnKey] // 清理掉 fn ，防止污染

    return res
}

// @ts-ignore
Function.prototype.customApply = function (context: any, args: any[] = []) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

    const fnKey = Symbol() // 不会出现属性名称的覆盖
    context[fnKey] = this // this 就是当前的函数

    const res = context[fnKey](...args) // 绑定了 this

    delete context[fnKey] // 清理掉 fn ，防止污染

    return res
}

function fn(this: any, a: any, b: any, c: any) {
    console.info(this, a, b, c)
}
// // @ts-ignore
// fn.customCall({x: 100}, 10, 20, 30)
// @ts-ignore
// fn.customApply({x: 200}, [100, 200, 300])
```
- 使用 `obj.fn` 执行，即可设置 `fn` 执行时的 `this`
- 考虑 `context` 各种情况
- 使用 `symbol` 类型扩展属性 
###  单元测试
call-apply.test.ts
```ts
import './call-apply'

describe('自定义 call', () => {
    it('绑定 this - 对象', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res = fn.customCall({x: 100})
        expect(res).toEqual({x: 100})
    })
    it('绑定 this - 值类型', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res1 = fn.customCall('abc')
        expect(res1.toString()).toBe('abc')

        // @ts-ignore
        const res1 = fn.customCall(null)
        expect(res1).not.toBeNull()
    })
    it('绑定参数', () => {
        function fn(a: number, b: number) {
            return a + b
        }
        // @ts-ignore
        const res = fn.customCall(null, 10, 20)
        expect(res).toBe(30)
    })
})

describe('自定义 apply', () => {
    it('绑定 this - 对象', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res = fn.customApply({x: 100})
        expect(res).toEqual({x: 100})
    })
    it('绑定 this - 值类型', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const res1 = fn.customApply('abc')
        expect(res1.toString()).toBe('abc')

        // @ts-ignore
        const res1 = fn.customApply(null)
        expect(res1).not.toBeNull()
    })
    it('绑定参数', () => {
        function fn(a: number, b: number) {
            return a + b
        }
        // @ts-ignore
        const res = fn.customApply(null, [10, 20])
        expect(res).toBe(30)
    })
})

```
注意：有些同学用 `call` 来实现 `apply` （反之亦然），这样是不符合面试官期待的。

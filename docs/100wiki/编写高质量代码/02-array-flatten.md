# Array flatten

## 题目

写一个函数，实现 Array flatten 扁平化，只减少一个嵌套层级<br>
例如输入 `[1, 2, [3, 4, [100, 200], 5], 6]` 返回 `[1, 2, 3, 4, [100, 200], 5, 6]`

## 解答

- 遍历数组
- 如果 item 是数字，则累加
- 如果 item 是数组，则 forEach 累加其元素

代码参考 array-flatten.ts

## 连环问：如果想要彻底扁平，忽略所有嵌套层级？

像 lodash [flattenDepth](https://www.lodashjs.com/docs/lodash.flattenDepth) ，例如输入 `[1, 2, [3, 4, [100, 200], 5], 6]` 返回 `[1, 2, 3, 4, 100, 200, 5, 6]`

最容易想到的解决方案就是**递归**，

```js
/**
 * 数组深度扁平化，使用 push
 * @param arr arr
 */
export function flattenDeep1(arr: any[]): any[] {
    const res: any[] = [];

    arr.forEach((item) => {
        if (Array.isArray(item)) {
            const flatItem = flattenDeep1(item); // 递归
            flatItem.forEach((n) => res.push(n));
        } else {
            res.push(item);
        }
    });

    return res;
}

/**
 * 数组深度扁平化，使用 concat
 * @param arr arr
 */
export function flattenDeep2(arr: any[]): any[] {
    let res: any[] = [];

    arr.forEach((item) => {
        if (Array.isArray(item)) {
            const flatItem = flattenDeep2(item); // 递归
            res = res.concat(flatItem);
        } else {
            res = res.concat(item);
        }
    });

    return res;
}

```

### 单元测试
```ts
import { flattenDeep1, flattenDeep2 } from './array-flatten-deep'
describe('数组深度扁平化', () => {
    it('空数组', () => {
        const res = flattenDeep2([])
        expect(res).toEqual([])
    })

    it('非嵌套数组', () => {
        const arr = [1, 2, 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 3])
    })

    it('一级嵌套', () => {
        const arr = [1, 2, [10, 20], 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 10, 20, 3])
    })

    it('二级嵌套', () => {
        const arr = [1, 2, [10, [100, 200], 20], 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 10, 100, 200, 20, 3])
    })

    it('三级嵌套', () => {
        const arr = [1, 2, [10, [100, ['a', [true],'b'], 200], 20], 3]
        const res = flattenDeep2(arr)
        expect(res).toEqual([1, 2, 10, 100, 'a', true, 'b', 200, 20, 3])
    })
})

```


还有一种 hack 的方式 `toString` —— 但遇到引用类型的 item 就不行了。

```js
const nums = [1, 2, [3, 4, [100, 200], 5], 6]
nums.toString() // '1,2,3,4,100,200,5,6'

// 但万一数组元素是 {x: 100} 等引用类型，就不可以了
```

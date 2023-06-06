# js异步进阶

##  event loop
```js
console.log('Hi')

setTimeout(function cb1() {
    console.log('cb1') // cb 即 callback
}, 5000)

console.log('Bye')
```

------

DOM 事件，也用 event loop

```html
<button id="btn1">提交</button>

<script>
console.log('Hi')

$('#btn1').click(function (e) {
    console.log('button clicked')
})

console.log('Bye')
</script>
```


## Promise

- 三种状态
- 状态和 then catch
- 常用 API

先回顾一下 Promise 的基本使用

```js
// 加载图片
function loadImg(src) {
    const p = new Promise(
        (resolve, reject) => {
            const img = document.createElement('img')
            img.onload = () => {
                resolve(img)
            }
            img.onerror = () => {
                const err = new Error(`图片加载失败 ${src}`)
                reject(err)
            }
            img.src = src
        }
    )
    return p
}
const url = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
loadImg(url).then(img => {
    console.log(img.width)
    return img
}).then(img => {
    console.log(img.height)
}).catch(ex => console.error(ex))
```

### 三种状态

三种状态 pending resolved rejected

（画图表示转换关系，以及转换不可逆）

```js
// 刚定义时，状态默认为 pending
const p1 = new Promise((resolve, reject) => {

})

// 执行 resolve() 后，状态变成 resolved
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve()
    })
})

// 执行 reject() 后，状态变成 rejected
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject()
    })
})

```

```js
// 直接返回一个 resolved 状态
Promise.resolve(100)
// 直接返回一个 rejected 状态
Promise.reject('some error')
```

### 状态和 then catch

状态变化会触发 then catch —— 这些比较好理解，就不再代码演示了

- pending 不会触发任何 then catch 回调
- 状态变为 resolved 会触发后续的 then 回调
- 状态变为 rejected 会触发后续的 catch 回调

-----

then catch 会继续返回 Promise ，**此时可能会发生状态变化！！！**

```js
// then() 一般正常返回 resolved 状态的 promise
Promise.resolve().then(() => {
    return 100
})

// then() 里抛出错误，会返回 rejected 状态的 promise
Promise.resolve().then(() => {
    throw new Error('err')
})

// catch() 不抛出错误，会返回 resolved 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
})

// catch() 抛出错误，会返回 rejected 状态的 promise
Promise.reject().catch(() => {
    console.error('catch some error')
    throw new Error('err')
})
```

看一个综合的例子，即那几个面试题

```js
// 第一题
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})

// 第二题
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
    console.log(1)
    throw new Error('erro1')
}).catch(() => { // 返回 resolved 状态的 promise
    console.log(2)
}).then(() => {
    console.log(3)
})

// 第三题
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
    console.log(1)
    throw new Error('erro1')
}).catch(() => { // 返回 resolved 状态的 promise
    console.log(2)
}).catch(() => {
    console.log(3)
})
```


## async/await

- 语法介绍
- 和 Promise 的关系
- 异步本质
- for...of

**有很多 async 的面试题，例如** 
- async 直接返回，是什么
- async 直接返回 promise
- await 后面不加 promise
- 等等，需要找出一个规律

### 语法介绍

用同步的方式，编写异步。

```js
function loadImg(src) {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            reject(new Error(`图片加载失败 ${src}`))
        }
        img.src = src
    })
    return promise
}

async function loadImg1() {
    const src1 = 'http://www.imooc.com/static/img/index/logo_new.png'
    const img1 = await loadImg(src1)
    return img1
}

async function loadImg2() {
    const src2 = 'https://avatars3.githubusercontent.com/u/9583120'
    const img2 = await loadImg(src2)
    return img2
}

(async function () {
    // 注意：await 必须放在 async 函数中，否则会报错
    try {
        // 加载第一张图片
        const img1 = await loadImg1()
        console.log(img1)
        // 加载第二张图片
        const img2 = await loadImg2()
        console.log(img2)
    } catch (ex) {
        console.error(ex)
    }
})()
```

### 和 Promise 的关系

- async 函数返回结果都是 Promise 对象（如果函数内没返回 Promise ，则自动封装一下）

```js
async function fn2() {
    return new Promise(() => {})
}
console.log( fn2() )

async function fn1() {
    return 100
}
console.log( fn1() ) // 相当于 Promise.resolve(100)
```

- await 后面跟 Promise 对象：会阻断后续代码，等待状态变为 resolved ，才获取结果并继续执行
- await 后续跟非 Promise 对象：会直接返回

```js
(async function () {
    const p1 = new Promise(() => {})
    await p1
    console.log('p1') // 不会执行
})()

(async function () {
    const p2 = Promise.resolve(100)
    const res = await p2
    console.log(res) // 100
})()

(async function () {
    const res = await 100
    console.log(res) // 100
})()

(async function () {
    const p3 = Promise.reject('some err')
    const res = await p3
    console.log(res) // 不会执行
})()
```

- try...catch 捕获 rejected 状态

```js
(async function () {
    const p4 = Promise.reject('some err')
    try {
        const res = await p4
        console.log(res)
    } catch (ex) {
        console.error(ex)
    }
})()
```

总结来看：

- async 封装 Promise
- await 处理 Promise 成功
- try...catch 处理 Promise 失败

### 异步本质

await 是同步写法，但本质还是异步调用。

```js
async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end') // 关键在这一步，它相当于放在 callback 中，最后执行
}

async function async2 () {
  console.log('async2')
}

console.log('script start')
async1()
console.log('script end')
```

即，只要遇到了 `await` ，后面的代码都相当于放在 callback 里。

### for...of

```js
// 定时算乘法
function multi(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * num)
        }, 1000)
    })
}

// // 使用 forEach ，是 1s 之后打印出所有结果，即 3 个值是一起被计算出来的
// function test1 () {
//     const nums = [1, 2, 3];
//     nums.forEach(async x => {
//         const res = await multi(x);
//         console.log(res);
//     })
// }
// test1();

// 使用 for...of ，可以让计算挨个串行执行
async function test2 () {
    const nums = [1, 2, 3];
    for (let x of nums) {
        // 在 for...of 循环体的内部，遇到 await 会挨个串行计算
        const res = await multi(x)
        console.log(res)
    }
}
test2()
```


## 宏任务和微任务

### 介绍

- 宏任务：setTimeout setInterval DOM 事件
- 微任务：Promise（对于前端来说）
- 微任务比宏任务执行的更早

```js
console.log(100)
setTimeout(() => {
    console.log(200)
})
Promise.resolve().then(() => {
    console.log(300)
})
console.log(400)
// 100 400 300 200
```

### event loop 和 DOM 渲染

再次回顾 event loop 的过程

- 每一次 call stack 结束，都会触发 DOM 渲染（不一定非得渲染，就是给一次 DOM 渲染的机会！！！）
- 然后再进行 event loop

```js
const $p1 = $('<p>一段文字</p>')
const $p2 = $('<p>一段文字</p>')
const $p3 = $('<p>一段文字</p>')
$('#container')
            .append($p1)
            .append($p2)
            .append($p3)

console.log('length',  $('#container').children().length )
alert('本次 call stack 结束，DOM 结构已更新，但尚未触发渲染')
// （alert 会阻断 js 执行，也会阻断 DOM 渲染，便于查看效果）
// 到此，即本次 call stack 结束后（同步任务都执行完了），浏览器会自动触发渲染，不用代码干预

// 另外，按照 event loop 触发 DOM 渲染时机，setTimeout 时 alert ，就能看到 DOM 渲染后的结果了
setTimeout(function () {
    alert('setTimeout 是在下一次 Call Stack ，就能看到 DOM 渲染出来的结果了')
})
```

### 宏任务和微任务的区别

- 宏任务：DOM 渲染后再触发
- 微任务：DOM 渲染前会触发

```js
// 修改 DOM
const $p1 = $('<p>一段文字</p>')
const $p2 = $('<p>一段文字</p>')
const $p3 = $('<p>一段文字</p>')
$('#container')
    .append($p1)
    .append($p2)
    .append($p3)

// // 微任务：渲染之前执行（DOM 结构已更新）
// Promise.resolve().then(() => {
//     const length = $('#container').children().length
//     alert(`micro task ${length}`)
// })

// 宏任务：渲染之后执行（DOM 结构已更新）
setTimeout(() => {
    const length = $('#container').children().length
    alert(`macro task ${length}`)
})
```

再深入思考一下：为何两者会有以上区别，一个在渲染前，一个在渲染后？

- 微任务：ES 语法标准之内，JS 引擎来统一处理。即，不用浏览器有任何关于，即可一次性处理完，更快更及时。
- 宏任务：ES 语法没有，JS 引擎不处理，浏览器（或 nodejs）干预处理。

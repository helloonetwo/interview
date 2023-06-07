# js-异步进阶

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


```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
 
console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');
```

输出结果：
```
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
```

步骤分析： [参考](https://blog.csdn.net/RedaTao/article/details/81504532)
- 首先，事件循环从宏任务（macrostack）队列开始，这个时候，宏任务(整体script、setTimeout、setInterval)队列中，只有一个 script (整体代码)任务 ()。
- 首先执行 console.log('script start')，输出 ‘script start'
- 遇到 setTimeout 把 console.log('setTimeout') 放到 macrotask 队列中
- 执行 aync1() 输出 ‘async1 start' 和 'async2' ,把 console.log('async1 end') 放到 micro 队列中
- 执行到 promise ，输出 'promise1' ，把 console.log('promise2') 放到  micro 队列中
- 执行 console.log('script end')，输出 ‘script end'
- macrotask 执行完成会执行 microtask ，把 microtask quene 里面的 microtask 全部拿出来一次性执行完，所以会输出 'async1 end' 和 ‘promise2'
开始新一轮的事件循环，去除执行一个 macrotask 执行，所以会输出 ‘setTimeout'


涉及知识点：
Promise 优先于 setTimeout 宏任务，所以 setTimeout 回调会最后执行
Promise 一旦被定义就会立即执行
Promise 的 resolve 和 reject  是异步执行的回调。所以 resolve() 会被放到回调队列中，在主函数执行完和 setTimeout 之前调用
await 执行完后，会让出线程。async 标记的函数会返回一个 Promise 对象

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


## 同步与异步执行顺序

JavaScript将任务分为同步任务和异步任务，同步任务进入主线中中，异步任务首先到Event Table进行回调函数注册。
当异步任务的触发条件满足，将回调函数从Event Table压入Event Queue中。
主线程里面的同步任务执行完毕，系统会去Event Queue中读取异步的回调函数。
只要主线程空了，就会去Event Queue读取回调函数，这个过程被称为Event Loop。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b55d3524a0dc4352a731ccc6321e1e4d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)


vent Loop执行过程
了解到宏任务与微任务过后，我们来学习宏任务与微任务的执行顺序。

代码开始执行，创建一个全局调用栈，script作为宏任务执行
执行过程过同步任务立即执行，异步任务根据异步任务类型分别注册到微任务队列和宏任务队列
同步任务执行完毕，查看微任务队列
若存在微任务，将微任务队列全部执行(包括执行微任务过程中产生的新微任务)
若无微任务，查看宏任务队列，执行第一个宏任务，宏任务执行完毕，查看微任务队列，重复上述操作，直至宏任务队列为空

更新一下Event Loop的执行顺序图：
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1a476f326234c7693debcc1d483fa41~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)


在上面学习的基础上，重新分析当前案例：
```js
setTimeout(() => {
  console.log(1);
}, 1000)
new Promise(function(resolve){
    console.log(2);
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log(3)
});
console.log(4)
```

```
2 4  3 1
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fedf8b829d8b48dbaf1e2366d7a345ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
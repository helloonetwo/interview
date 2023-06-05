# js 基础知识

## 类型
JS 数据类型分为两大类：

- 原始类型
- 对象类型
### 原始（Primitive）类型
在 JS 中，存在着 7 种原始值，分别是：
```js
boolean
null
undefined
number
string
symbol
bigint
```

### 对象（Object）类型
对象类型和原始类型不同的是，原始类型存储的是值，一般存储在栈上，对象类型存储的是地址（指针），数据存储在堆上

当创建了一个对象类型的时候，计算机会在堆内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。
```js
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```
对于以上代码，你是否能正确的写出结果呢？
![RUNOOB 图标](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ac4cf669d3a4d759a45e7b0bca3e94e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

首先，函数传参是传递对象指针的副本
到函数内部修改参数的属性这步，我相信大家都知道，当前 p1 的值也被修改了，也就是说 age 从 25 变成了 26
但是当我们重新为 person 分配了一个对象时就出现了分歧，请看下图


所以最后 person 拥有了一个新的地址（指针），也就和 p1 没有任何关系了，导致了最终两个变量的值是不相同的。

## 值类型vs引用类型

### 值类型 保存在栈中 保存与复制的是值本身

```js
let a = 100; let b= a; a=200; 
console.log(b)  --> 100
```

### 引用类型 保存在堆中 保存与复制的是指向对象的一个指针
引用数据改变 原来的数据改变
![](https://img2022.cnblogs.com/blog/319373/202202/319373-20220209104129039-185899167.jpg)

```js
var a = {name:"percy"};
var b;
b = a;
a.name = "zyj";
console.log(b.name);    // zyj
b.age = 22;
console.log(a.age);     // 22
var c = {
  name: "zyj",
  age: 22
};
```
## 类型判断
类型判断有多种方式。

### typeof
typeof 对于原始类型来说，除了 null 都可以显示正确的类型，如果你想判断 null 的话可以使用 variable === null。
```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof 1n // bigint
```
typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型。
```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

### instanceof
instanceof 通过原型链的方式来判断是否为构建函数的实例，常用于判断具体的对象类型。
```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```
对于原始类型来说，你想直接通过 instanceof 来判断类型是不行的，但是我们还是有办法实现的。
```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
你可能不知道 Symbol.hasInstance 是什么东西，其实就是一个能让我们自定义 instanceof 行为的东西，以上代码等同于 typeof 'hello world' === 'string'，所以结果自然是 true 了。
```
这其实也侧面反映了一个问题：instanceof 并不是百分之百可信的。

另外其实我们还可以直接通过构建函数来判断类型：
```js
// true
[].constructor === Array

```
### Object.prototype.toString.call

前几种方式或多或少都存在一些缺陷，Object.prototype.toString.call 综合来看是最佳选择，能判断的类型最完整，基本上是开源库选择最多的方式。

```js
Object.prototype.toString.call(obj) === `[object ${type}]`;
```

### isXXX API
同时还存在一些判断特定类型的 API，选了两个常见的：
```js
Array.isArray()
```

## this
this 是很多人会混淆的概念，但是其实它一点都不难，只是网上很多文章把简单的东西说复杂了。在这一小节中，你一定会彻底明白 this 这个概念的。

我们先来看几个函数调用的场景
```js
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo
}
obj.foo()

const c = new foo()
```
接下来我们一个个分析上面几个场景：

对于直接调用 foo 来说，不管 foo 函数被放在了什么地方，this 一定是 window
对于 obj.foo() 来说，我们只需要记住，谁调用了函数，谁就是 this，所以在这个场景下 foo 函数中的 this 就是 obj 对象
对于 new 的方式来说，this 被永远绑定在了 c 上面，不会被任何方式改变 this
以上三种规则基本覆盖大部分情况了，很多代码中的 this 应该都能理解指向，下面让我们看看箭头函数中的 this：
```js
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```
首先箭头函数其实是没有 this 的，箭头函数中的 this 只取决包裹箭头函数的第一个普通函数的 this。在这个例子中，因为包裹箭头函数的第一个普通函数是 a，所以此时的 this 是 window。另外对箭头函数使用 bind 这类函数是无效的。

最后种情况也就是 bind 这些改变上下文的 API 了，对于这些函数来说，this 取决于第一个参数，如果第一个参数为空，那么就是 window。

那么说到 bind，不知道大家是否考虑过，如果对一个函数进行多次 bind，那么上下文会是什么呢？
```js
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```
如果你认为输出结果是 a，那么你就错了，其实我们可以把上述代码转换成另一种形式：
```js
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```
可以从上述代码中发现，不管我们给函数 bind 几次，fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window。
```js
let a = { name: 'cxk' }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'cxk'
```
以上就是 this 的所有规则了。实际中可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 this 最终指向哪里。

首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。

如果你还是觉得有点绕，那么就看以下的这张流程图吧，图中的流程只针对于单个规则。
![RUNOOB 图标](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0d9e65d315749a48e256d791a710097~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)


### 常见面试题
这里一般都是考 this 的指向问题，牢记上述的几个规则就够用了，比如下面这道题：
```js
const a = {
  b: 2,
  foo: function () { console.log(this.b) }
}

function b(foo) {
  // 输出什么？
  foo()
}

b(a.foo)
```

## 手写深拷贝

- obj 是 null ，或者不是对象和数组，直接返回
- 判断obj 是数据或者现象  初始值
- 遍历数组 递归赋值
- 返回结果值
```js
/**
 * 深拷贝
 */

const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing',
  },
  arr: ['a', 'b', 'c'],
}

const obj2 = deepClone(obj1)
obj2.address.city = 'shanghai'
obj2.arr[0] = 'a1'
console.log(obj1.address.city)
console.log(obj1.arr[0])
// beijing
// a


/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 */
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用！！！
      result[key] = deepClone(obj[key])
    }
  }

  // 返回结果
  return result
}

```
## 浅拷贝
首先可以通过 Object.assign 来解决这个问题，这个函数会拷贝所有的属性值到新的对象中。如果属性值是对象的话，拷贝的是地址。
```js
let a = {
  age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```
另外我们还可以通过展开运算符 ... 来实现浅拷贝：
```js
let a = {
  age: 1
}
let b = { ...a }
a.age = 2
console.log(b.age) // 1
```
## 类型转换
首先我们要知道，在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值
- 转换为数字
- 转换为字符串
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f95e584fb4f49968527a982041d3e4e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"
```

## JS中的事件冒泡、事件捕获、事件委托

#### 事件冒泡（dubbed bubbling）：当一个元素接收到事件的时候，会把他接收到的事件传给自己的父级，一直到 window （注意这里传递的仅仅是事件，例如click、focus等等这些事件， 并不传递所绑定的事件函数。）
事件源 =>根节点（由内到外）进行事件传播。

#### 事件捕获（event capturing）： 当鼠标点击或者触发dom事件时（被触发dom事件的这个元素被叫作事件源），浏览器会从根节点 =>事件源（由外到内）进行事件传播。

事件捕获与事件冒泡是比较类似的，最大的不同在于事件传播的方向。

#### 事件委托也称为事件代理。就是利用事件冒泡，把子元素的事件都绑定到父元素上。如果子元素阻止了事件冒泡，那么委托就无法实现。

如果循环给每个按钮添加点击事件，那么会增加内存损耗，影响性能 
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/913f4518334f4525b003d61d8c410dd5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)
此时可以给button的父元素添加点击事件 
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d69430357f5d4101a7d423d42f723d22~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

原理实现：

不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点。
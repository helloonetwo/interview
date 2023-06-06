# js-基础知识

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



## 闭包
> 假如一个函数能访问外部的变量，那么就形成了一个闭包，而不是一定要返回一个函数。

```js
let a = 1
// 产生闭包
function fn() {
  console.log(a);
}

function fn1() {
  let a = 1
  // 产生闭包
  return () => {
    console.log(a);
  }
}
const fn2 = fn1()
fn2()
```

**所有的自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方！！！**

-  函数作为返回值
```JS
function create() {
    const a = 100
    return function () {
        console.log(a)
    }
}

const fn = create()
const a = 200
fn() // 100
```
- 函数作为参数被传递

```js
function print(fn) {
    const a = 200
    fn()
}
const a = 100
function fn() {
    console.log(a)
}
print(fn) // 100
```

### 闭包现实的使用场景
- 封装函数 提供api
```js
// 闭包隐藏数据，只提供 API
function createCache() {
  const data = {} // 闭包中的数据，被隐藏，不被外界访问
  return {
    set: function (key, val) {
      data[key] = val
    },
    get: function (key) {
      return data[key]
    },
  }
}

const c = createCache()
c.set('a', 100)
console.log(c.get('a'))

```
- 作用域

```js
let a
for (let i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}


let a,i;
for (i = 0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = i + '<br>'
  a.addEventListener('click', function (e) {
    e.preventDefault()
    alert(i)
  })
  document.body.appendChild(a)
}
```


## 模拟 bind
-  将参数拆解为数组
-  获取 this（数组第一项）
-  改变this 的指向 返回一个函数
```js
// 模拟 bind
Function.prototype.bind1 = function () {
    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)

    // 获取 this（数组第一项）
    const t = args.shift()

    // fn1.bind(...) 中的 fn1
    const self = this

    // 返回一个函数
    return function () {
        return self.apply(t, args)
    }
}

function fn1(a, b, c) {
    console.log('this', this)
    console.log(a, b, c)
    return 'this is fn1'
}

const fn2 = fn1.bind1({x: 100}, 10, 20, 30)
const res = fn2()
console.log(res)

```

## 作用域(scope)

JavaScript 中的作用域是一种机制，它决定代码片段对其他部分的可访问性。并且回答了以下问题: 从哪里可以访问？从哪里无法进入？谁可以访问它，谁不能？ 简单来说，作用域就是规定变量与函数可访问范围的一套规则。

### 有哪些作用域
- 全局作用域
```js
window.name
window.location
window.top
```
- 函数作用域
```js
let a = "hello";

function greet() {
    let b = "World"
    console.log(a + b);
}

greet();
console.log(a + b); // error
```
在上面的程序中，变量 a 是全局变量，变量 b 是局部变量。变量 b 只能在函数 hello 中访问。
- 块级作用域

```js
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```
块级作用域由最近的一对包含花括号{} 界定。换句话说， if 块、while 块、function块，单独的块块级作用域。

## 作用域链(scope chain)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25b87f964b28413e814b07f045387392~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
蓝色框是全局作用域，定义了a变量，以及里面的所有函数。
红色框是first函数的作用域，它定义了变量 b ，以及second函数。
绿色框是第second的作用域。log语句用于输出变量 a、 b 和 c。

当代码执行道second函数是，打印变量a，b，c，但是变量 a 和 b 没有在second函数中定义，只定义了c。这时就会往上层作用域查找，于是从first函数找到了变量 b = 'Hello'。这时还没用找到a，所有再继续往上层作用域查找，然后找到了a = 'Hey',这样一层一层往上查找的过程，就被成为作用域链。
当 JS 引擎无法在作用域链中找到变量时，它就会停止执行并抛出错误。


## 原型链 与 原型 

```js
// 父类
class People {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
}

// 子类
class Student extends People {
    constructor(name, number) {
        super(name)
        this.number = number
    }
    sayHi() {
        console.log(`姓名 ${this.name} 学号 ${this.number}`)
    }
}

// 子类
class Teacher extends People {
    constructor(name, major) {
        super(name)
        this.major = major
    }
    teach() {
        console.log(`${this.name} 教授 ${this.major}`)
    }
}

// 实例
const xialuo = new Student('夏洛', 100)
console.log(xialuo.name)
console.log(xialuo.number)
xialuo.sayHi()
xialuo.eat()

// 实例
const wanglaoshi = new Teacher('王老师', '语文')
console.log(wanglaoshi.name)
console.log(wanglaoshi.major)
wanglaoshi.teach()
wanglaoshi.eat()

```

### 一、原型
JavaScript 常被描述为一种基于原型的语言——每个对象拥有一个原型对象

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾

准确地说，这些属性和方法定义在Object的构造器函数（constructor functions）之上的prototype属性上，而非实例对象本身

下面举个例子：

函数可以有属性。 每个函数都有一个特殊的属性叫作原型prototype
```js
function doSomething(){}
console.log( doSomething.prototype );
```
控制台输出
```js
{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```
上面这个对象，就是大家常说的原型对象

可以看到，原型对象有一个自有属性constructor，这个属性指向该函数，如下图关系展示

![](https://static.vue-js.com/56d87250-725e-11eb-ab90-d9ae814b240d.png)

### 二、原型链
原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法

在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），之后通过上溯原型链，在构造器中找到这些属性和方法

下面举个例子：
```js
function Person(name) {
    this.name = name;
    this.age = 18;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 第二步 创建实例
var person = new Person('person')
```
根据代码，我们可以得到下图
![](https://static.vue-js.com/60825aa0-725e-11eb-85f6-6fac77c0c9b3.png)


下面分析一下：

构造函数Person存在原型对象Person.prototype

构造函数生成实例对象person，person的__proto__指向构造函数Person原型对象

Person.prototype.__proto__ 指向内置对象，因为 Person.prototype 是个对象，默认是由 Object函数作为类创建的，而 Object.prototype 为内置对象

Person.__proto__ 指向内置匿名函数 anonymous，因为 Person 是个函数对象，默认由 Function 作为类创建

Function.prototype 和 Function.__proto__同时指向内置匿名函数 anonymous，这样原型链的终点就是 null

### 三、总结
下面首先要看几个概念：

__proto__作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的



每个对象的__proto__都是指向它的构造函数的原型对象prototype的

person1.__proto__ === Person.prototype
构造函数是一个函数对象，是通过 Function构造器产生的

Person.__proto__ === Function.prototype
原型对象本身是一个普通对象，而普通对象的构造函数都是Object

Person.prototype.__proto__ === Object.prototype
刚刚上面说了，所有的构造器都是函数对象，函数对象都是 Function构造产生的

Object.__proto__ === Function.prototype
Object的原型对象也有__proto__属性指向null，null是原型链的顶端

Object.prototype.__proto__ === null
下面作出总结：

- 一切对象都是继承自Object对象，Object 对象直接继承根源对象null

- 一切的函数对象（包括 Object 对象），都是继承自 Function 对象

- Object 对象直接继承自 Function 对象

- Function对象的__proto__会指向自己的原型对象，最终还是继承自Object对象


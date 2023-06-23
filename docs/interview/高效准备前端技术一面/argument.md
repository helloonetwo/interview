# argument 
## 定义
> argument是一个类数组对象，代表传给一个function的参数列表。


先看一段代码：
```js
function printArgs() {
    console.log(arguments);
}
printArgs("A", "a", 0, { foo: "Hello, arguments" })；
```
执行结果是：["A", "a", 0, Object]

控制台打印出来的是一个数组，但并不是真正的数组，所以说arguments 是一个类数组的对象，我叫他伪数组。
测试在函数内部打印 console.log(arguments[2]);    //0


## arguments转数组

通常使用下面的方法来将arguments转换成数组：Array.prototype.slice.call(arguments); 还有一个更简短的写法：

```js
1.[ ].slice.call(arguments);
在这里，只是简单地调用了空数组的 slice 方法，而没有从 Array 的原型层面调用。

2.通过 call 调用数组的 splice 方法来实现转换:

Array.prototype.splice.call(arrayLike, 0);
3.通过 apply 调用数组的 concat 方法来实现转换:
Array.prototype.concat.apply([], arrayLike);

4.es6新增了Array.from()方法，可以直接将类数组转换为真正的数组:
Array.from(arrayLike);

5.循环遍历类数组对象，push到新创建的数组对象里:
var Li = document.querySelectorAll('li');
    var arr = [];
    for (var i = 0; i < Li.length; i++) {
       arr[arr.length] = Li[i];
       return arr;
     }


```


## ES6中的arguments
### 拓展操作符
```js
function func() {
    console.log(...arguments);
}
func(1, 2, 3);
```
执行结果是：1 2 3

简洁地讲，扩展操作符可以将 arguments 展开成独立的参数。
### Rest 参数
```js
function func(firstArg, ...restArgs) {
    console.log(Array.isArray(restArgs));
    console.log(firstArg, restArgs);
}

func(1, 2, 3);
```
执行结果是：true1 [2, 3]

从上面的结果可以看出，Rest 参数表示除了明确指定剩下的参数集合，类型是 Array。
### 默认参数
例子：
```
function func(firstArg = 0, secondArg = 1) {
    console.log(arguments[0], arguments[1]);
    console.log(firstArg, secondArg);
}
func(99);
```
执行结果是：99 undefined  99 1

 可见，默认参数对 arguments 没有影响，arguments 还是仅仅表示调用函数时所传入的所有参数。


## 只有函数才有arguments
- 每个函数都有一个内置好了的argument，不用手动去创建
- arguments具有length属性
- arguments按索引方式存储数据
- arguments不具有数组的push/pop等操作
- 箭头函数没有arguments


> 项目中使用es6的Rest 参数 即可 
# 手写compose

组合函数，目的是将多个函数组合成一个函数



## Array.prototype.reduce
数组的reduce方法可以实现一个累加效果，它接收两个参数，第一个是一个累加器方法，第二个是初始化值。累加器接收四个参数，第一个是上次的计算值，第二个是数组的当前值，主要用的就是这两个参数，后面两个参数不常用，他们是当前index和当前迭代的数组：
```js
const arr = [[1, 2], [3, 4], [5, 6]];
// prevRes的初始值是传入的[]，以后会是每次迭代计算后的值
const flatArr = arr.reduce((prevRes, item) => prevRes.concat(item), []);

console.log(flatArr); // [1, 2, 3, 4, 5, 6]
```
## Array.prototype.reduceRight
Array.prototype.reduce会从左往右进行迭代，如果需要从右往左迭代，用Array.prototype.reduceRight就好了
```js
const arr = [[1, 2], [3, 4], [5, 6]];
// prevRes的初始值是传入的[]，以后会是每次迭代计算后的值
const flatArr = arr.reduceRight((prevRes, item) => prevRes.concat(item), []);

console.log(flatArr); // [5, 6, 3, 4, 1, 2]
```

## 实现思路
借助Array.prototype.reduceRight 方法，从右到左执行，返回一个新函数
- 修改arguments 参数 转换为 数组
- 利用Array.prototype.reduceRight 方法，从右到左执行
- 返回新函数
```js
let compose = function(){
    let args = [].slice.call(arguments);
    return function (x){
        return args.reduceRight(function(res,cb){
            return cb(res);
        },x)
    }
}
```

### 测试
```js
let add = (a)=>{
    return a+1;
 }
 
 let multiple = (b)=>{
    return b*10;
 }
let calculate = compose(add,multiple);
console.log(calculate(1));

```

### 完整代码
```js
const compose = function () {
  // 将接收的参数存到一个数组， args == [multiply, add]
  const args = [].slice.apply(arguments)
  return function (x) {
    return args.reduceRight((res, cb) => cb(res), x)
  }
}
const add = (x) => x + 10
const multiply = (x) => x * 10
// 我们来验证下这个方法
let calculate = compose(multiply, add)
let res = calculate(10)
console.log(res) // 结果还是200
```

### Es6 写法
```js
const compose = (...args) => x => args.reduceRight((res, cb) => cb(res), x);
```


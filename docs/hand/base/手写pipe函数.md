#  pipe函数
> pipe函数跟compose函数的作用是一样的，也是将参数平铺，只不过他的顺序是从左往右。我们来实现下，只需要将reduceRight改成reduce就行了

```js
const pipe = function(){
  const args = [].slice.apply(arguments);
  return function(x) {
    return args.reduce((res, cb) => cb(res), x);
  }
}
```
// 参数顺序改为从左往右
let calculate = pipe(add, multiply);
let res = calculate(10);
console.log(res);    // 结果还是200

ES6写法：
```es6
const pipe = (...args) => x => args.reduce((res, cb) => cb(res), x)
```


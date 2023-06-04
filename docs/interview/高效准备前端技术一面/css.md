## 盒子模型

```css
    #div1 {
        width: 100px;
        padding: 10px;
        border: 1px solid #ccc;
        margin: 10px;
        box-sizing: border-box;
      }
```

## margin 纵横重叠
- 相邻元素的margin-top margin-bottom 会发生重叠
- 空内容的p标签会重叠

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>margin 纵向重叠</title>
    <style type="text/css">
        p {
            font-size: 16px;
            line-height: 1;
            margin-top: 10px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
      <p>AAA</p>
    <p></p>
    <p></p>
    <p></p>
    <p>BBB</p>

</body>
</html>
```

## css响应式
- 媒体查询
```css
        @media only screen and (max-width: 374px) {
            /* iphone5 或者更小的尺寸，以 iphone5 的宽度（320px）比例设置 font-size */
            html {
                font-size: 86px;
            }
        }
        @media only screen and (min-width: 375px) and (max-width: 413px) {
            /* iphone6/7/8 和 iphone x */
            html {
                font-size: 100px;
            }
        }
        @media only screen and (min-width: 414px) {
            /* iphone6p 或者更大的尺寸，以 iphone6p 的宽度（414px）比例设置 font-size */
            html {
                font-size: 110px;
            }
        }

        body {
            font-size: 0.16rem;
        }
        #div1 {
            width: 1rem;
            background-color: #ccc;
        }
```
- rem 相对长度单位  相对于根元素  响应式设计
> rem 设计方案
```js
/**
 * 首次加载成功时设置html跟标签的fontSize属性值；最大基准值为40px
 */
export const useRem = () => {
  const MAX_FONT_SIZE = 40
  // 当文档被解析成功时调用
  window.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')
    // 设置屏幕基准值的标准为 屏幕的宽度 / 10
    const fontSize = window.innerWidth / 10
    html.style.fontSize = Math.min(fontSize, MAX_FONT_SIZE) + 'px'
  })
}

```

- vw-wh
网页视口高度/宽度
```css
 #container {
            background-color: red;
            width: 10vw;
            height: 10vh;
        }
```

## 居中对齐

- text-align 方式
  ```css
      .container-1{
            text-align: center;
            line-height: 200px;
            height: 200px;
        }

  ```
- margin 负数 方式

```css

        .container-2 {
            position: relative;
        }
        .container-2 .item {
            width: 300px;
            height: 100px;
            position: absolute;
            left: 50%;
            margin-left: -150px;
            top: 50%;
            margin-top: -50px;
        }
```
- transform: translate(-50%, -50%) 方式

```css
     .container-3 {
            position: relative;
        }
        .container-3 .item {
            width: 200px;
            height: 80px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%)
        }
```
- margin  auto 方式 
```css
    .container-4 {
            position: relative;
        }
        .container-4 .item {
            width: 100px;
            height: 50px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
```

Bfc 的理解与应用 
> BFC（Block Formatting Context）中文译为"块级格式化上下文"，简单来说，BFC就是给盒子加一个属性，让盒子变成一块独立渲染的区域，可以理解为一个箱子，箱子里面物品的摆放是不受外界的影响的，其中外边距（margin）也是BFC区域的一部分。


触发BFC：
浮动元素：float 值为 left 、right
overflow 值不为 visible，即为 auto、scroll、hidden
display 值为 inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
绝对定位元素：position 值为 absolute、fixed

特性：
BFC 是页面上的一个独立容器，容器里面的子元素不会影响外面的元素。
BFC 内部的块级盒会在垂直方向上一个接一个排列
同一 BFC 下的相邻块级元素可能发生外边距折叠，创建新的 BFC 可以避免外边距折叠
每个元素的外边距盒（margin box）的左边与包含块边框盒（border box）的左边相接触（从右向左的格式的话，则相反），即使存在浮动
浮动盒的区域不会和 BFC 重叠
计算 BFC 的高度时，浮动元素也会参与计算

应用场景
- 解决margin叠加问题
当盒子上下排布，上方盒子margin-bottom:100px;下面的盒子margin-top:100px;那么神奇的事情就发生了，两个盒子按照叠加来算的话，距离应该是200px，但是我们发现实际上两个margin值进行了叠加，只剩下100px。
代码：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box1,
        .box2 {
            color: #f55;
            background-color: #fcc;
            width: 200px;
            line-height: 100px;
            text-align: center;
            margin: 100px;
        }
    </style>
</head>

<body>
    <div class="box1">盒子一</div>
    <div class="box2">盒子二</div>
</body>

</html>

```


- 两栏布局
元素的左外边距会触碰到包含块容器的做外边框，就算存在浮动也会如此，那么我们可以利用这种方式来一个两列布局，第一个盒子浮动，第二个盒子margin-left赋值；
代码：
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container{
            width: 100%;
            position: relative;
        }
        .aside{
            width: 100px;
            height: 150px;
            float: left;
            background-color: #f66;
        }
        .main{
            height: 200px;
            background-color: #fcc;
            overflow: hidden;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="aside"></div>
        <div class="main"></div>
    </div>
</body>

</html>

```
解决上述问题可以利用bfc 触发父元素的BFC，例如overflow:hidden;


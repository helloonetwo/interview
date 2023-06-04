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
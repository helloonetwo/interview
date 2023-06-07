#  JS-Web-API-Ajax

## 同源策略
协议 端口 域名不同，称为跨域

### 参考资料
[浏览器的同源策略](https://www.runoob.com)


## 跨源访问
同源策略控制了不同源之间的交互，这些交互通常分为三类：

- 通常允许跨域写操作(Cross-origin writes)
  - 链接(links)
  - 重定向
  - 表单提交
- 通常允许跨域资源嵌入(Cross-origin embedding)
- 通常不允许跨域读操作(Cross-origin reads)
  

可能嵌入跨源的资源的一些示例有：
```js
<script src="..."></script> 标签嵌入跨域脚本。语法错误信息只能在同源脚本中捕捉到。
<link rel="stylesheet" href="..."> 标签嵌入CSS。由于CSS的松散的语法规则，CSS的跨域需要一个设置正确的Content-Type 消息头。
<img> / <video> / <audio> 嵌入多媒体资源。
<object> <embed> 和 <applet> 的插件。
@font-face 引入的字体。一些浏览器允许跨域字体( cross-origin fonts)，一些需要同源字体(same-origin fonts)。
<frame> 和 <iframe> 载入的任何资源。站点可以使用X-Frame-Options消息头来阻止这种形式的跨域交互
```

## JSONP跨域
JSONP就是利用 script 标签的跨域能力实现跨域数据的访问，请求动态生成的JavaScript脚本同时带一个callback函数名作为参数。

服务端收到请求后，动态生成脚本产生数据，并在代码中以产生的数据为参数调用callback函数。

JSONP也存在一些安全问题，例如当对传入/传回参数没有做校验就直接执行返回的时候，会造成XSS问题。没有做Referer或Token校验就给出数据的时候，可能会造成数据泄露。

另外JSONP在没有设置callback函数的白名单情况下，可以合法的做一些设计之外的函数调用，引入问题。这种攻击也被称为SOME攻击。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>jsonp 演示</title>
    </head>
    <body>
        <p>一段文字 1</p>

        <script>
            window.abc = function (data) {
                console.log(data)
            }
        </script>
        <script src="http://localhost:8002/jsonp.js?username=xxx&callback=abc"></script>
    </body>
</html>
```

jsonp.js
```js
abc(
    { name: 'xxx' }
)
```

## 手写ajax
```js
function ajax(url) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(
                        JSON.parse(xhr.responseText)
                    )
                } else if (xhr.status === 404 || xhr.status === 500) {
                    reject(new Error('404 not found'))
                }
            }
        }
        xhr.send(null)
    })
    return p
}

const url = '/data/test.json'
ajax(url)
.then(res => console.log(res))
.catch(err => console.error(err))
```

# Others

[参考](https://zh.javascript.info/)

---

## Generator

- generator 可以按需一个接一个地返回（“yield”）多个值,可与 iterable 配合使用，从而创建数据流
  - `function* gen(){yield 1;yield 2;return 3}`
  - 调用时返回一个`Generator` 对象
  - 调用`.next()`方法时运行到下一个`yield`并返回结果`{value,done:false}`
  - 当运行到`return`时 `{value,done:true}`
- 可迭代(for...of)
  - `for(let value of gen())){...}` (不包含return值)
  - `let arr = [...gen()]` (1,2)
  - `*[Symbol.iterator](){for(let i = this.from; value <= this.to; value++)yeild i}` 创建可迭代对象
- 组合 `yield*`
- 输入值 `gen().next(arg)` 
  - 下一次`next(arg)`时 arg作为yeild的结果
  - 实现交互效果
  - 输入错误 `.throw(new Error(message))`
- `.return(arg)` 直接完成并返回arg

<br>

```js
//组合
function* genRange(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* gen() {
  yield* genRange(48, 57);// 0..9
  yield* genRange(65, 90);// A..Z
  yield* genRange(97, 122);// a..z
}

let str = '';
for(let code of gen()) {
  str += String.fromCharCode(code);
}
alert(str); // 0..9A..Za..z
```

```js
//输入
function* gen() {
  let ask1 = yield "2 + 2 = ?";
  alert(ask1); // 4
  let ask2 = yield "3 * 3 = ?"
  alert(ask2); // 9
}

let generator = gen();
alert( generator.next().value ); // "2 + 2 = ?"
alert( generator.next(4).value ); // "3 * 3 = ?"
alert( generator.next(9).done ); // true
```

```js
//抛出错误
function* gen() {
  try {
    let result = yield "2 + 2 = ?"
  } catch(e) {
    alert(e); // 显示这个 error
  }
}

gen().next().value
gen().throw(new Error("error"))
```

<br>

**异步迭代**

- 异步可迭代对象 (值是以异步的形式出现)
- 提供 iterator 的对象方法 `Symbol.asyncIterator`
- `next()` 返回 `Promise` (resolve的{value,done})
- 循环列举 `for await (let i of iter){...}`
- `[...iter]` 失效
- 构造一个异步迭代对象

```js
let range = {
  from: 1,
  to: 5,

  // 这一行等价于 [Symbol.asyncIterator]: async function*()
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {
      await new Promise(resolve => setTimeout(resolve, 1000)) //等一秒
      yield value;
    }
  }
}

(async () => {
  for await (let i of range) alert(i)
})();
```


## Module

- ES6 语言级模块系统
- 启用
  - `<script type='module'>` `this`为`undefined`
  - `{"type": "module",}` in `package.json`
- `import.meta` 对象包含关于当前模块的信息
- 使用构建工具会轻松不少
- 静态导入
  - 命名导出 和 默认导出
  - `default` 作名称
  - `export {default as name,others} from './m.js'` 重新导出
- 动态导入 (不用`type='module'`)
  - `import('./m.js')` 返回一个promise resolve为包含所有导出的对象
  - 特殊用法 并非函数
  - `let {default:name,others} = await import('./m.js')`

<br>

|  | 导出 | 导入 |
| :---: | --- | --- |
| 导入代码<br>`{code}` | `console.log('ok')` | `import './m.js'` |
| 声明前导出 | `export let i = ...` | `import { i [as ii] } from './m.js'` |
| 声明后导出 | `export {arr,func}` | `import { arr,func } from './m.js'` |
| 全部导入 | 同上 | `import * as obj from './m.js'` |
| 默认导出 | `export default anydata` | `import name from './m.js' ` |
| `default`<br>名称 | `export {f as default}` | `import {default as name} from './m.js' ` |
| 动态导入 | 同上 | `let {default:name,others} = await import('./m.js')` |

## 即时通信


### 长轮询

**用于消息很少,但发了之后要及时知道的情况**

:::: code-group
::: code-group-item client.vue
```vue
<script setup>
import { ref } from 'vue'

async function subscribe() {
  let response = await fetch(
    `http://localhost:8080/subscribe?random=${Math.random()}`
  )
  let mes = await response.text()
  console.log(mes)
  records.value.push(mes)
  await subscribe()
}

function publish(form) {
  let msg = form.inp.value
  form.inp.value = ''
  fetch(`http://localhost:8080/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `msg=${msg}`,
  })
}

let records = ref(['将在此展示发送记录：'])
subscribe()
</script>

<template>
  <div>输入消息 点击发送后能在下方显示出来</div>
  <br />
  <form @submit.prevent="publish($event.target)">
    <input name="inp" type="text" placeholder="输入消息" />
    <input type="submit" />
  </form>
  <div v-for="i in records">{{ i }}</div>
</template>
```
:::
::: code-group-item server.js
```js
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.urlencoded())
app.use(cors())

let subscribers = []
app.get('/subscribe', (req, res) => subscribers.push(res))
app.post('/publish', (req, res) => {
  let msg = req.body.msg
  for (let i of subscribers) {
    i.end(msg)
  }
  subscribers = []
  res.end(msg)
})
app.listen(8080, () => {
  console.log('服务器启动8080')
})
```
:::
::::


### WebSocket


**用于需要持久连续数据双向交换服务的情况**

- `let socket = new WebSocket("ws://...")`
- 非http协议 因此不受跨源限制
- 事件
  - `.onopen = function(){}` 连接建立
  - `.onmessage = function(){}` 收到数据
  - `.onerror = function(){}` 出错
  - `.onclose = function(){}` 连接关闭
- 方法
  - `.send(data)` 发送
  - `.close([code], [reason])` 关闭 关闭码和原因
- 属性
  - `.readyState` 0未 1通 2关 3已


:::: code-group
::: code-group-item client.vue
```vue
<script setup>
import { ref } from 'vue'

function publish(form) {
  let msg = form.inp.value
  form.inp.value = ''
  socket.send(msg)
}

let records = ref(['将在此展示收到消息：'])
let socket = new WebSocket('ws://localhost:8080')
socket.onmessage = (event) => records.value.push(event.data)
</script>

<template>
  <div>输入消息 点击发送后能在下方显示出来</div>
  <br />
  <form @submit.prevent="publish($event.target)">
    <input name="inp" type="text" placeholder="输入消息" />
    <input type="submit" />
  </form>
  <div v-for="i in records">{{ i }}</div>
</template>
```
:::
::: code-group-item server.js
```js
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })
console.log('websocket服务启动于8080')
const clients = new Set()
wss.on('connection', (ws) => {
  console.log('新设备已连接')
  clients.add(ws)
  ws.on('message', (msg) => {
    console.log('服务端收到: %s', msg)
    for (let client of clients) {
      // msg为blob对象，因此进行类型转换
      client.send(msg + '')
    }
  })
  ws.send('服务端连接成功')
})
```
:::
::::


### Server Sent Events

**用于保持单向接收服务器消息(文本)的情况**

- `let source = new EventSource(url, [credentials])`
- 属性
  - `readyState` 当前连接状态
  - `lastEventId` 最后接收到的 id
- 方法 `close()` 关闭连接
- 事件
  - `open` 建立连接
  - `message` 收到消息
  - `error` 出错
- 服务器响应格式
  - 由 \n\n 分隔
  - data 消息体
  - id 更新 lastEventId 在data后
  - retry 延迟ms
  - event 自定义事件名 在data前


:::: code-group
::: code-group-item client.vue
```vue
<script setup>
import { ref } from 'vue'

function start() {
  st.value = !st.value
  s = new EventSource('http://localhost:8080/')
  s.onopen = () => arr.value.push('建立连接')
  s.onmessage = e => arr.value.push('收到消息:' + e.data)
  s.addEventListener('bye', e => arr.value.push(`bye事件:` + e.data))
  s.onerror = () => arr.value.push('连接出错')
}

function stop() {
  st.value = !st.value
  s.close()
  arr.value.push('连接关闭')
}

let arr = ref(['收到消息:'])
let s
let st = ref(true)
</script>

<template>
  <button @click="st ? start() : stop()">
    {{ st ? '接收' : '关闭' }}
  </button>
  <div v-for="i in arr">{{ i }}</div>
</template>
```
:::
::: code-group-item server.js
```js
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.urlencoded())
app.use(cors())

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/event-stream; charset=utf-8')
  res.header('Cache-Control', 'no-cache')
  function w() {
    i++
    if (i == 4) {
      res.write('event: bye\ndata: bye-bye\n\n')
      clearInterval(timer)
      res.end()
      return
    }
    res.write('data: ' + i + '\n\n')
  }
  console.log('收到连接')
  let i = 0
  let timer = setInterval(w, 1000)
  w()
})

app.listen(8080, () => {
  console.log('服务器启动8080')
})
```
:::
::::

# 网络请求

---

## Ajax

**原生方法**

现已被fetch替代

- `const xhr = new XMLHttpRequest()` 构造
- `xhr.open('POST','url', [async=true])` 初始化(默认异步)
- `xhr.send('a=100&b=50')` 发送
- `xhr.setRequestHeader('key','value')` 设置请求头信息
- `xhr.onload = function() {}`
- `xhr.onreadystatechange=()=>{}` 阶段改变时
- `xhr.readystate` 阶段
- `xhr.status` 状态码
- `xhr.response` 响应
- `xhr.responseType = 'json'` 返回json数据自动转换
- `xhr.timeout=2000` 超时
- `xhr.ontimeout=()=>{}` 超时回调
- `xhr.onerror=()=>{}` 异常回调
- `xhr.abort()` 取消请求

**上传进度**

```html
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // 跟踪上传进度
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };

  // 跟踪完成：无论成功与否
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

<br>

**jQuery方法**

- `$.get()` & `$.post()`
  - url
  - 参数
  - 回调函数
  - json 自动转换为json
- `$.ajax({})`
  - url:'',
  - data:{},
  - type:'GET',
  - dataType:'json',
  - timeout:2000,
  - success:function(response){},
  - error:function(){},
  - headers:{} 请求头信息


## Fetch

**fetch(url,[options])**

- `let promise = fetch(url,[options])` 
- 典型的 `fetch` 请求由两个 `await` 调用组成
  - `let response = await fetch(url, options)`
    - 未连通会`reject`
    - `.status .ok .headers` 状态码 是否ok 类似于 Map的对象
  - `let result = await response.json()` 获取 response body
    - `.text() .json() .formData() .blob() .arrayBuffer()`
- fetch 选项
  - `method: 'POST',`
  - `headers: {},`
  - `body` response body 类型 
    - string(json) FormData Blob/BufferSource



**FormDate**

- `let formData = new FormDate(theIdOfForm)`
- fetch可以接受一个 FormData 对象作为body
- 方法
  - `.append(name, value)` 添加表单字段
  - `.set(name, value)` 重设表单字段
  - `.append/set(name, blob, fileName)` 添加/重设
  - `.delete(name)` 移除字段
  - `.get(name)` 获取字段值
  - `.has(name)` 有无
- 发送带文件的表单
  - `<input type="file" name="picture" accept="image/*">`
  - `body: new FormData(formElem)`
- 发送blob数据表单
  - `<canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>`
  - `let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'))`
  - `formData.append("image", imageBlob, "image.png")`


**Fetch下载进度**

仅用于下载过程 (上传可以在客户端拆解分片上传)
`response.body` 属性

```js
// 代替 response.json() 以及其他方法
const reader = response.body.getReader();
// 在 body 下载时，一直为无限循环
while(true) {
  // 当最后一块下载完成时，done 值为 true
  // value 是块字节的 Uint8Array
  const {done, value} = await reader.read();
  if (done) {
    break;
  }
  console.log(`Received ${value.length} bytes`)
}
```
<br>

**接收响应块**

```js
// Step 1：启动 fetch，并获得一个 reader
let response = await fetch('url');
const reader = response.body.getReader();
// Step 2：获得总长度（length）
const contentLength = +response.headers.get('Content-Length');
// Step 3：读取数据
let receivedLength = 0; // 当前接收到了这么多字节
let chunks = []; // 接收到的二进制块的数组（包括 body）
while(true) {
  const {done, value} = await reader.read();
  if (done) {
    break;
  }
  chunks.push(value);
  receivedLength += value.length;
  console.log(`Received ${receivedLength} of ${contentLength}`)
}
// Step 4：将块连接到单个 Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
  chunksAll.set(chunk, position); // (4.2)
  position += chunk.length;
}
// Step 5：解码成字符串
let result = new TextDecoder("utf-8").decode(chunksAll);
let commits = JSON.parse(result);
alert(commits[0].author.login);
// //二进制内容
// let blob = new Blob(chunks);
```

**中止Abort**

- `let controller = new AbortController()`
  - `.abort()` 中止方法
  - `.signal`  aborted
- `fetch(url,{signal:controller.signal})`
- `controller.abort()`
- promise 就会以一个 error AbortError reject


```js
let urls = [...]; // 要并行 fetch 的 url 列表
let controller = new AbortController();
// 一个 fetch promise 的数组
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}))
let results = await Promise.all(fetchJobs);
// controller.abort() 被从任何地方调用，
// 它都将中止所有 fetch
```

**Fetch API**

- `method` 'GET' 
- `headers` {"Content-Type": "text/plain;charset=UTF-8"}
- `body` undefined string，FormData，Blob，BufferSource URLSearchParams
- `referrer` "about:client" "" 发出请求的页面的 url
- `referrerPolicy` "no-referrer-when-downgrade" no-referrer，origin，same-origin...
- `mode` "cors" same-origin，no-cors 跨源
- `credentials` "same-origin" omit，include 发cookie
- `cache` "default" no-store，reload，no-cache，force-cache only-if-cached 缓存
- `redirect` "follow" manual，error 重定向
- `integrity` "" hash值 校验
- `keepalive` false true 请求在网页关闭后继续存在
- `signal` undefined AbortController
- `window` window null


## Axios

Axios 基于 promise 网络请求库,在node端基于http模块，在浏览器端基于 XMLHttpRequests 实现,可以实现 拦截\转换\取消 请求的功能


- `npm i axios` `const axios = require('axios')`
- `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`


**API**

- 用法
  1. `axios(config).then(res=>{})`
  2. `axios.get(url[, config])` `axios.post(url[, data[, config]])`
  3. `const instance = axios.create(config)`
- 请求配置
  - url `''`
  - method `'get'`
  - baseURL `''`
  - transformRequest `[(data,headers)=>data]` 请求转换
  - transformResponse `[data=>data]` 响应转换
  - headers `{'X-Requested-With': 'XMLHttpRequest'}` 设置请求头
  - params `{}` 参数
  - paramsSerializer `(params)=>{}`
  - data `{}` `'user=brgzz&pwd=123456'`
  - timeout `0` 请求超时的毫秒数(0永不超时)
  - withCredentials `false` 跨域请求时是否需要使用凭证
  - adapter `config=>{}` 自定义处理请求
  - auth `{}`
  - responseType `'json'`
  - responseEncoding `'utf8'`
  - xsrfCookieName xsrfHeaderName
  - onUploadProgress onDownloadProgress `progressEvent=>{}` 上传下载进度
  - maxContentLength maxBodyLength `2000` 最大字节数
  - validateStatus 有效状态码 `status=>{}`
  - maxRedirects `5` 最大定向数
  - proxy `{}` 代理
- 响应配置
  - data `{}` 响应内容
  - status `200` 状态码
  - statusText `OK` 状态信息
  - headers `{}` 响应头
  - config `{}` 配置信息
  - request `{}` 生成此响应的请求
- 全局默认值 `axios.defaults.$config=`
- 拦截器
  - `axios.interceptors.request.use(config=>config,error=>Promise.reject(error))` 请求拦截器
  - `axios.interceptors.request.use(response=>response,error=>Promise.reject(error))` 响应拦截器
  - `axios.interceptors.request.eject(myInterceptor)` 移除拦截器
- 错误处理 `.catch(err=>{})`
- 取消请求 `controller.abort()`
- 请求体编码 默认json 使用`application/x-www-form-urlencoded`格式需要转化


## 跨源请求

- 同源策略: 协议 域名 端口号皆相同
- JSONP
  - 只支持get
  - 服务端应返回js语句的字符串
  - 在前端定义函数，服务端返回带参数的函数触发
  - jQuery实现接收JSON
    - `$. getJSON('url/route?callback=?',function(){})`
    - `let str = JSON.stringify(json)`
    - `let cb = request.query.callback`
    - `response.end('${cb}(${str})')`
- CORS
  - 仅设置服务端接口
  - 设置相应头允许指定站点响应放行
  - `response.setHeader("Access-Control-Allow-Origin","*")`
- 安全请求
  - 安全方法 get post head
  - 安全的header
    - Accept Aceept-Language Content-Language
    - Content-Type
      - application/x-www-form-urlencoded
      - multipart/form-data
      - text/plain
- CORS
  - Origin (发)
  - Access-Control-Allow-Origin (收)
- 请求头的讲究
  - 对于跨源请求 js只能访问安全的请求头
  - 访问其他需要`Access-Control-Expose-Headers`
  - 比如`Content-Length`
- 非安全请求
  - 先发预检请求 `options`
    - 无body
    - Access-Control-Request-Method 请求方法
    - Access-Control-Request-Headers 请求头列表
  - 如果同意
    - Access-Control-Allow-Origin 允许请求的源
    - Access-Control-Allow-Methods 允许的方法
    - Access-Control-Allow-Headers 允许的请求头
    - Access-Control-Max-Age 此权限的秒数
  - 然后发送实际的请求

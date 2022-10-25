# 网络请求

---

## Ajax

**原生方法**

- `const xhr = new XMLHttpRequest()` 构造
- `xhr.open('POST','url')` 初始化
- `xhr.send('a=100&b=50')` 发送
- `xhr.setRequestHeader('key','value')` 设置请求头信息
- `xhr.onreadystatechange=()=>{}` 阶段改变时
- `xhr.readystate` 阶段
- `xhr.status` 状态码
- `xhr.response` 响应
- `xhr.responseType = 'json'` 返回json数据自动转换
- `xhr.timeout=2000` 超时
- `xhr.ontimeout=()=>{}` 超时回调
- `xhr.onerror=()=>{}` 异常回调
- `xhr.abort()` 取消请求

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

## Axios

- `axios.get(url,{配置})`
  - params:{},
  - headers:{},
- `axios.post(url,{请求体},{配置})`
  - params:{}, 请求行
  - headers:{}, 请求头
- `axios({})`
  - method url params headers data
- `.then(res=>{})`

## 跨域问题

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

# Promise

[Promise参考](https://zh.javascript.info/async)

---

## 回调

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src
  script.onload = () => callback(null,script) //加载成功事件
  script.onerror = () => callback(new Error(`error for ${src}`))
  document.head.append(script)
}

loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 处理 error
  } else {
    // 脚本加载成功
  }
});
```

## Promise

- `let promise = new Promise(function(resolve,reject){...})` 状态只改一次
  - `resolve(...)` state改为`fulfilled`
  - `reject(new Error(message))` state改为`rejected`
- `promise.then(result=>{...},error=>{...})`
- `.catch(f)` `.then(null,f)` 只关心错误
- `.finally(f)` ~~`.then(f,f)`~~ 不关心结果(常用于清理)
  - 无参数
  - 透明
  - 无返回
- if promise is pending,the handler will waiting for its result. if it is settled,the handler will run immediately

```js
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);
```

## Promise 链

```js
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
}).then(function(result) {
  alert(result); // 1
  return result * 2
}).then(function(result) {
  alert(result); // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) {
  alert(result); // 4
});
```


```js
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // 脚本加载完成，我们可以在这儿使用脚本中声明的函数
    one();
    two();
    three();
  });
```

**`.then(f)` 总是返回一个promise**

1. 初始时pending+undifined (跑完时fulfilled)
2. return value => fulfilled+value
3. return promise => the promise
4. throw error => reject+error


## 错误处理

- 只要在末尾加上`.catch(f)` 上述任意一个promise reject 就能捕获错误
- 在promise中`throw new Error()` == `reject(new Error())`
- 编程错误也会自动 reject
- `.catch(f)` 返回若fulfilled则继续`.then()` 出错则跳到`.catch()`(再次抛出)
- 出错未捕获就报错

## Promise 静态方法


1. `Promise.all(promises)` 并行执行 全好了才往下 返回结果数组 有错就错
2. `Promise.allSettled(promises)` es2020 全好了返回对象数组 status&value
3. `Promise.race(promises)` 等第一个settled并返回
4. `Promise.any(promises)` es2021 等第一个fulfilled
5. `Promise.resolve(value)` 使用给定 value 创建一个 resolved 的 promise
6. `Promise.reject(error)` 使用给定 error 创建一个 rejected 的 promise

```js
let names = ['iliakan', 'remy', 'jeresig']
let requests = names.map(name => fetch(`https://api.github.com/users/${name}`))
Promise.all(requests)
  .then(responses => {
    // 所有响应都被成功 resolved
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
    }
    return responses;
  })
  // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
  .then(responses => Promise.all(responses.map(r => r.json())))
  // 所有 JSON 结果都被解析："users" 是它们的数组
  .then(users => users.forEach(user => alert(user.name)));
  .catch(alert)

  //非promise
  Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

## 微任务

```js
let promise = Promise.resolve()
promise.then(() => alert("promise done!")) //异步
alert("code finished"); // 这个 alert 先显示
```

**队列**

- 先进先出
- promise就绪后 `.then`放入队列
- 运行完当前代码时 从队列中获取任务
- error未在队列末尾处理时就会出现*未处理的rejection*错误


## async/await

- **async**
  - `async function(){...}`
  - 使函数总是返回一个promise
  - 支持在 Class 中使用
- **await** (只能在async函数内使用)
  - `let value = await promise`
  - 等promise完成并返回结果
  - 本质类似`promise.then()` 处理等待
  - 现允许在modules顶层使用
    - `let user = await fetch('user.json')`
    - `(async ()=>{await...})()` 通用方法
  - 支持`thenable`对象
  - 支持和静态方法一起用
    - `let results = await Promise.all(promises)`



```js
//error处理方式
//1
async function f() {
  try {
    let response = await fetch('no-such-url');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}
f();

//2
async function f() {
  let response = await fetch('no-such-url');
}
// f() 变成了一个 rejected 的 promise
f().catch(alert);
```


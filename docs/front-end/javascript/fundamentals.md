#  基础语法

[JavaScript参考](https://zh.javascript.info/)

---

## 数据类型

- 种类
  - number bigint string boolean null undefined symbol object
  - `typeof x`
  - 原始类型的方法
    - 通过对象包装器实现
    - `null/undefined` 没有包装器也没有任何方法
    - 使用后销毁
- 转换
  - 转字符串
    - `String(value)`
    - `num+''`
  - 转数字
    - `Number(str)`
    - `+str`
    - undefined	-> NaN
    - null -> 0
    - true/false -> 1/0
    - str -> number 0 NaN
  - 转布尔
    - `Boolean()`
    - `!!value`
    - 0/null/undefined/NaN/'' -> false
- 运算
  - `+ - * / % **`
  - `+= ++i i++ ,`
  - `boolean ? true() : false()`
  - `|| && ! ??`
    - `||` 运算到第一个真值返回
    - `&&` 运算到第一个假值返回
    - `??` 返回第一个已定义值
      - 类似`||`
      - 常用于设定默认值
- 比较
  - 0 == false √
  - null==undefined √ 他们只等于对方和自己
  - null >= 0 √
  - NaN 和谁都是 false


## 流程控制

- `if(){}else if{}else{}`
- `while(){}`
- `do{}while()`
- `for(;;){}`
- `break` `continue`
- `labelNAme:while(for(){break labelNAme})` 直接跳出嵌套循环到标签处

```js
switch (arg) {
  case '0':
  case '1':
    break;
  case '2':
    break;
  default:
    func()
}
```

- `function func(a=1){}` 最初时创建
- `let func = function(){}` 执行时创建
- `() =>{}`


**计划调用**


- `setTimeout(func,delay,args...)` 延时(毫秒)
- `setInterval(func,delay,args...)` 重复
- 会返回定时器标记符
- `clearTimeout(timerId)` 清除
- 嵌套setTimeout实现重复能保证更加精确的时间
  - `setTimeout(function run(){setTimeout(run,100)},100)`
- 零延时的 setTimeout 在程序执行完后调用


## 调试和测试

1. `debugger`命令 类似断点 当然也可以手调
2. 使用 `Eslint` 规范代码风格
3. 那些[忍者代码](https://zh.javascript.info/ninja-code)
4. 使用 `Mocha` 进行自动化测试
   1. `describe('title', ()=>{})`
   2. `it('content',()=>{})`
   3. `assert.equal(func(...arg), result)`
      - (严格)(不)相等 检查NaN True false 等等
   4. `before/after(()=>{})`
   5. `beforeEach/afterEach(()=>{})`

```js
let pow = (x,y) => x**y

describe("pow", function() {

  it("2 ^ 3 is 8", function() {
    assert.equal(pow(2, 3), 8);
  });

  it("3 ^ 4 is 81", function() {
    assert.equal(pow(3, 4), 81);
  });

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} ^ 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

## 数字类型

- 数字写法
  - `7_300_000_000` `7.3e9` `1e-6`
  - `0xff` `0b1111` `0o377`
  - * `num.toString(进制2-36)` `255..toString(16)`
- 舍入
  - `Math.floor/ceil/round/trunc`
  - `Math.round(num*100)/1000` `+num.toFixed(precision)`
- 一些函数
  - `isFinite(num)` `isNaN(num)` 是否无限/错误
  - `parseInt(str[,进制])` `parseFloat(str)` 提取数字
- Math
  - `.random()` [0,1)
  - `.max/min()`
  - `.pow(n,power)`
  - 三角相关 略

## 字符类型

- `'' "" ``${}`` `
- `length` 是一个属性
- `str[n]` `for(let i of str){}`
- 不可变
- 一些方法
  - `.toUpperCase/toLowerCase()` 大小写
  - `.indexOf(substr[,pos])` `.lastIndexOf(substr[,pos])`返回位置&-1
    - `if(~str.indexOf(c)){}` ~n==-(n+1)
  - `.includes(substr[,pos])` 有无
  - `.starts/endsWith(substr)` 有无开头结尾
  - `.slice(start[,end])` 切片,支持负数
  - `.substring(start[,end])` 切片,支持start>end
  - `.substr(start[,length])` 给长度,支持负数
  - `.codePointAt(pos)` `String.fromCodePoint(pos)` 查看代码和创建字符
  - `.localeCompare(str2)` str1-str2的顺序
  - `.trim()` 删除前后空格
  - `.repeat(n)` 重复



## 链表

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;

list={value:'new',next:list} //加到开头
list.next=list.next.next //删除
list.next={value:'add',next:list.next} //加一个
```

可以加`prev` `tail`属性往前或到最后

## Rest & Spread

- `function(a,b,...args){}` 
- `arguments` 包含所有参数的类数组 箭头函数不支持
- `...arr` 数组转参数 支持可迭代对象 
- `let copy = {...obj}/[...arr]` 浅拷贝

## 闭包

> 闭包 是指一个函数可以记住其外部变量并可以访问这些变量,在js中，所有函数都是闭包的,所有函数都有名为`[[Environment]]`的隐藏属性,该属性保存了对创建该函数的词法环境的引用。

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
```

`var`只有函数作用域和全局作用域,可以重复声明,有变量提升


## 深入函数

**函数冷知识**

- 函数是对象
  - 属性 `name` `length`
  - 可以自定义属性
- `let func1 = function fun2(){}` fun2为内部函数名
- `new Function('a','b','return a+b')` 字符串转函数 只能访问全局变量

**缓存装饰器**

```js
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map()
  return function(x) { 
    if (cache.has(x)) {  //只能缓存单参数
      return cache.get(x)
    }

    //let result = func(x)
    let result = func.call(this,x)

    cache.set(x, result)
    return result
  }
}

slow = cachingDecorator(slow);

```

**call/apply**

- `func(args)`->`fun.call(obj,args)` 把里面的this指向obj
  - `[].join.call(arrLike)` 对类数组使用join
- `func.call(obj,...args)` -> `func.apply(obj,args)` args为类数组
  - `let func2 = function(){return func.apply(this,args)}` 呼叫转移

**函数绑定**

当将对象方法作为回调进行传递是会出现丢失 this 的问题

> 我常常喜欢把对象想象成一个文件夹,属性想象成数据,方法想象成exe,那么在这里可以理解成单单把exe文件拿过去了

1. `()=>obj.func()` 不足:在触发前对象发生变化时
2. 函数内建方法 `let fun2 = func.bind(obj)` 用于把this转设为obj

偏函数(绑定参数)
- `let mul = (a,b)=>a*b`
- `let double = nul.bind(null,2)`
- `double(3)` 6

<button @click="func">run them</button>

<script setup>
  function func(){
    let mul = (a,b)=>a*b
    let double = mul.bind(null,2)
    alert(double(3))
  }
</script>

**箭头函数**

- 常用于不想离开当前上下文的情况
- 没有this
- 没有arguments
- 不能new
- 没有super


## 错误处理

- 捕获错误而不是停止运行
- `try {...}catch[(err)]{...}` 可以没有 `(err)`
  1. 执行`try{...}`里面代码
  2. 没错误就忽略`catch(err){...}`
  3. 出现错误就停止执行 转向`catch` 忽略剩下的`try`
  4. 变量err为一个error对象
- 无效
  - 语法错误无效
  - `try`里面异步执行的错误无效
- Error 对象
  - name 错误名称
  - message 详细描述
  - stack 当前的调用栈
- throw 操作符
  - new Error(message)
  - new SyntaxError(message)
  - new ReferenceError(message)
  - ...
- 捕获后可以再次抛出 用 instanceof 检验
  - `if (!(err instanceof SyntaxError)) {throw err}`
- try...[catch...]finally 可以没有catch
  - finally 无论出现什么情况下都会执行
  - `function func(){try{return 1}finally{alert('ok')}}`
- 全局catch
  - `window.onerror = function(message, url, line, col, error) {}`
  - `process.on("uncaughtException")` node.js
- 自定义Error
  - 包装异常 略

```js
class ValidationError extends Error {
  constructor(message) {
    super(message)
    // this.name = "ValidationError"
    this.name = this.constructor.name
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Whoops!
  alert(err.name); // ValidationError
}
```

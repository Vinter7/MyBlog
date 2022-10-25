# 原型和类

[参考](https://zh.javascript.info/)

---

## 属性

**属性标志**

- 属性标志 默认true
  - `writable` 可读写 false只读
  - `enumerable` 可枚举
  - `configurable` 可更改和删除属性标志
- 属性标识相关方法 默认false
  - `Object.getOwnPropertyDescriptor(obj, propertyName)` 查
  - `Object.getOwnPropertyDescriptors(obj)` 查全部属性描述符
  - `Object.defineProperty(obj, propertyName, descriptor)` 改
  - `Object.defineProperties(obj, descriptors)` 设置多个属性
  - 克隆对象`let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj))`
- 全局限制访问的方法 略


**访问器属性**(与数据属性相对)

```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};
alert(user.fullName);
user.fullName = "Alice Cooper";
alert(user.name); // Alice
alert(user.surname); // Cooper
```

得到一个可读可写的虚拟属性,可以用`_prop`来存储(内部属性),有时可以用来为已废弃的属性提供兼容性(通过新属性计算产生)

- 访问器属性描述符
  - `get` 函数
  - `set` 函数
  - `enumerable` 可枚举
  - `configurable` 可配置

## 原型和继承

在 JavaScript 中，对象有一个特殊的隐藏属性 `[[Prototype]]`（如规范中所命名的），它要么为 null，要么就是对另一个对象的引用。该对象被称为“原型”, 当读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。这被称为“原型继承”,但写入时不使用原型(访问器属性除外)。设置时使用特殊的名字 `__proto__`, `__proto__` 的值可以是对象，也可以是 null。而其他的类型都会被忽略。只能有一个 `[[Prototype]]`。一个对象不能从其他两个对象获得继承。`__proto__` 是 `[[Prototype]]` 的 getter/setter。`__proto__` 属性已有些过时, 可以使用`Object.getPrototypeOf/Object.setPrototypeOf` 来取代 `__proto__` 去 get/set 原型

```js
let user = {
  name: "John",
  surname: "Smith",

  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  },

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

let admin = {
  __proto__: user,
  isAdmin: true
};

alert(admin.fullName); // John Smith

admin.fullName = "Alice Cooper"; 
// 这时方法中的this为admin,因此name和surname都存在admin对象中
alert(admin.fullName); // Alice Cooper，admin 的内容被修改了
alert(user.fullName);  // John Smith，user没有变化
//因此我们可以说方法是共享的 但对象状态不是
```

**遍历**

- `Object.keys(son)` 只有son的属性
- `for(let prop in son){}` 先son后parent
- `son.hasOwnProperty(key)` key是否为son自己的属性
- 其实用`{...}`定义的对象 默认继承自`Object.prototype` 其`[[Prototype]]` 为null,在这里面有许多方法,它们都是不可枚举的
- 除了for...in的方法 几乎所有其他键/值获取方法都忽略继承的属性


**F.prototype**

- 用构造函数创建new 对象的`[[Prototype]]`来自`Func.prototype`
- F.prototype 指的是 F 的一个名为 "prototype" 的常规属性

```js
let animal = {
  eats: true
}
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
alert( rabbit.eats ); // true
```
 
- 实际上每个函数都有`prototype`属性
- 默认为`{constrauctor: Func}`
- 属性 constructor 指向函数自身
- 最好通过添加的方式往`prototype`里面加属性 而不是覆盖
- new对象其实就类同继承了函数的`prototype`属性对应的`{...}`(也可以是null)


**原生原型**

::: tip Object.prototype
`{}`等同于`new Object()`<br>`Object()`是一个构造函数<br>其`prototype`属性是一个巨大的对象<br>因此可以理解`{}`就继承了`Object.prototype`这个大对象<br>也就是说`{...}`默认的`[[Prototype]]`为`Object.prototype`<br>而`Object.prototype`的`[[Prototype]]`为null
:::

所有的内建原型顶端都是 Object.prototype, 其他内建对象(构造函数)，像 Array、Date、Function 及其他，都在 prototype 上挂载了方法。原生原型可以修改但不要去做除非polyfilling

- [].__proto__ === Array.prototype
- [].__proto__.__proto__ === Object.prototype
- [].__proto__.__proto__.__proto__ === null


**原型方法**

- `Object.getPrototypeOf(obj)` 读
- `Object.setPrototypeOf(obj, proto)` 写
- `Object.create(proto, [descriptors])` 生(可加属性标志)
  - `let clone = Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj))` 克隆
  - `let obj = Object.create(null);` 真空对象用于纯粹的存储键/值对(无原型)

## 类

```js
class MyClass {
  prop = value; // 属性
  constructor(...) {} // 构造器
  method(...) {} // method
  get something(...) {} // getter 方法
  set something(...) {} // setter 方法
  [Symbol.iterator]() {} // 有计算名称的方法（此处为 symbol）
}

class User {
  constructor(name) { this.name = name }
  sayHi() { alert(this.name) }
}

function User(name) {
  this.name = name;
}
User.prototype.sayHi = function() {
  alert(this.name)
}
//两者类似
```

<br>

- class的构建:
  1. 创建同名函数
  2. 代码同`constructor(){}`
  3. 在`prototype`中存其他方法
- 和构造函数手动创建的差别:
  1. 通过 class 创建的函数具有特殊的内部属性标记(只能 new)
  2. 类方法不可枚举
  3. 类总是使用 use strict
- 类和函数一样也能用表达式
  - `let User = class [innerName] {}`
- 和对象一样可用get/set 以及计算属性`[]`
- 类字段
  - 之前类仅具有方法 现在可以添加属性`name = "John"`
  - 不同之处在于它并不存于`User.prototype`
  - 而是在创建每一个独立对象时被添加
  - 可以是箭头函数`click=()=>{alert(this.name)}` 
    - 此时可以避免对象方法作为回调时this丢失的问题


## 类继承

- 类继承是一个类扩展另一个类的一种方式
- 语法为`class Child extends Parent{...}`
- 新类创建的对象可以访问旧类的方法
- 原理是`Child.prototype.[[Prototype]]` 为 `Parent.prototype`
- `Child.[[Prototype]]` 为 `Parent`
- extends后面可以是返回类的函数调用
- super指代父类,因此重写方法时可以先调用父类方法再补充
- 继承类的constructor必须调用`super()`
  - 且在`this`前
  - 缺省默认生成`constructor(...arg){super(...arg)}`
  - 因为在new时 期望父类完成创建对象的工作
- ~~父类构造器总是会使用它自己字段的值，而不是被重写的那一个~~
- ~~`[[HomeObject]]` 方法通过该属性记住该对象~~

## 特别的属性和方法

**静态**

- 把一个方法作为一个整体赋值给类 这样的方法为静态
- `class User {static func(){}}` `User.staticMethod()`
- 静态方法用于实现属于整个类 但不属于该类任何特定对象的功能(函数)
- 静态方法可以在类上调用，而不是在单个对象上
- 静态属性被用于当我们想要存储类级别的数据时，而不是绑定到实例
- 静态属性/方法 可被继承

```js
class MyClass {
  static property = ...
  static method() {
    ...
  }
}
// 等同
MyClass.property = ...
MyClass.method = ...
```

**受保护**

```js
//受保护的字段是可以被继承的(非语言级实现)
class CoffeeMachine {
  //受保护的属性通常以下划线 _ 作为前缀
  _waterAmount = 0;
  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }
  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100)
alert(`Power is: ${coffeeMachine.power}W`)
coffeeMachine.waterAmount = -10; //0
```

**私有**

- JavaScript新增特性 为私有属性/方法提供语言级支持
- 私有属性和方法以 # 开头 只在类的内部可被访问
- 私有字段与公共字段不会冲突
- this['#name'] 不起作用


## 其它细节

**扩展内建类**

- 内建的类，例如 Array，Map 等也都是可以扩展(继承)的
- 内建类的`[[Prototype]]`并不指向`Object`
  - 内建类并非通过`extends`获得继承
  - 因此没有继承静态方法

**类检查**

- `obj instanceof Class` 是否隶属(对象)
- `typeof` 原始数据类型
- `{}.toString.call(obj)`原始数据类型，内建对象，包含 `Symbol.toStringTag` 属性的对象都适用

```js
function fun(){
  let a={}.toString.call(12)
  let b={}.toString.call('ok')
  let c={}.toString.call(new Date())
  console.log(a,b,c)
}
```

<button @click="fun">运行</button>
<script setup>
  function fun(){
    let a={}.toString.call(12)
    let b={}.toString.call('ok')
    let c={}.toString.call(new Date())
    console.log(a,b,c)
  }
</script>


**Minin模式**

mixin 是一个包含可被其他类使用而无需继承的方法的类

```js
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
}

let sayHiMixin = {
  __proto__: sayMixin,

  sayHi() {
    // 调用父类方法
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  }
}

class User {
  constructor(name) {
    this.name = name;
  }
}

// 拷贝方法(mixin)
Object.assign(User.prototype, sayHiMixin);
new User("Dude").sayHi(); // Hello Dude!
```


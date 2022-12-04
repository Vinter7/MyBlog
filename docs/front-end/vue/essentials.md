# 基础语法

[Vue参考](https://cn.vuejs.org/)

----


## 创建

- 创建实例 `const app = createApp(App)`
- 挂载应用 `app.mount('#app')`
- ~~应用配置 `app.config`~~


## 模板语法

- 文本插值 `{{}}`
- 原始HTML `v-html`
- 绑定 `v-bind` `:`
  - 绑定布尔值决定属性是否存在
  - 不带参数的绑定对象实现多值绑定
- 存在与否 `v-if` 显示与否 `v-show`
- 循环渲染 `v-for`
- 监听事件 `v-on` `@`
  - 修饰符 `@click.prevent="func"`


## 响应式

- `setup(){return{}}` `<script setup>`
- `import { reactive,ref } from 'vue'`
- 声明响应式状态 `const name = reactive({ key: value })`
  - 返回源对象的Proxy
  - 缺陷
    1. 对基础类型无效
    2. 不可替换对象
    3. 解构失去响应性
- 访问更新后的 DOM `nextTick(()=>{})`
- 定义响应式变量 `ref()`
  - 创造一种对任何值的 "引用" 并能够不丢失响应性地随意传递
  - 顶层 property访问自动解包
- 响应性语法糖 `let count = $ref(0)` 可免去.value


## 计算属性

- `const co = computed(()=>{...})`
- 返回 ref
- 默认不能直接修改 不然需要提供 get() & set(newValue)


## 样式绑定

- `:class="{ active: isActive }"` 对象
- `:class="[activeClass, errorClass]"` 数组(支持嵌套对象)
- `:class="$attrs.class"` 组件上使用的样式
- `:style="{ color: activeColor, fontSize: fontSize + 'px' }"`
- `:style="[baseStyles, overridingStyles]"`

## 条件渲染

- v-if="真假" v-else-if="真假" v-else
- v-show="真假" 不能用于`<template>`

## 列表渲染

- `v-for="(item, index) in items"` 数组
- `v-for="(value, key, index) in myObject"` 对象
- `v-for="n in 10"n=1-10` 数字
- 勿同时使用v-for和v-if
- 推荐使用key属性进行管理
- 数组变化侦测
  - push() pop() shift() unshift() splice() sort() reverse()
- 可使用计算属性或者函数实现过滤排序等后处理

## 事件处理

- `@click="count++` 内联
- `@click = "func"` 
- 修饰符(链式书写)(可以只有修饰符)
  - .stop 停止传递
  - .prevent 不重新加载页面
  - .self  来自本身的事件才会触发
  - .capture 先被外部处理
  - .once 最多被触发一次
  - .passive 一般用于触摸事件
  - 按键修饰符略

## 双向绑定

- v-model == v-bind + v-on
  - `<input type="text"> <textarea>`使用value属性和input事件
  - `<input type="checkbox"> <input type="radio">`使用checked属性和change事件
  - `<select>` 使用value属性change 作为事件
- `<input v-model="message">  <textarea v-model="message">` 输入内容
- `<input type="checkbox" id="checkbox" v-model="checked">`单个时是boolean 多个时是value数组
- `<input type="radio" id="two" value="Two" v-model="picked">` 选中为value
- `<select><option></></>` 为option中值(或自己加value) multiple多选时为数组
- 修饰符
  - .lazy change事件后更新
  - .number输入自动转换为数字
  - .trim 两端去空格
  - *在组件上使用


## 生命周期

`import {onMounted, onUpdated, onUnmounted} from 'vue'`

1. beforeCreate
2. created
3. beforeMount
4. mounted
5. updated
6. beforeUpdate
7. beforeUnmount
8. unmounted


## 侦听器

- `watch(a,()=>{})` 只追踪明确侦听的源,
- 第一个参数可以是属性\函数\数组等
- `watch(obj.prop,()=>{})`将不起作用,当换成`watch(()=>obj.prop,()=>{})`
- 深层侦听器`{deep:true}` 略
- `watchEffect(()=>{})` 会在副作用(函数)发生期间追踪依赖,追踪任何在回调中访问到的东西
- 避免用异步回调创建一个侦听器`setTimeout(() => {watchEffect(() => {})}, 100)`

## 模板ref

- `ref="refname"`
- `const refname = ref(null)`
- 然后就能直接操作该对象(组件挂载后)
- 当 ref 在 v-for 中使用时，`const refname = ref([])`
- 可以绑定函数`:ref="func"`
- 绑定在组件上,此时引用组件实例,意味着父组件对子组件的每一个属性和方法都有完全的访问权,但使用了 `<script setup>` 的组件是默认私有的,因此访问不到,除非子组件在其中通过 defineExpose宏显式暴露,应该首先使用标准的 props 和 emit 接口来实现父子组件交互

## 组件入门

- 可以使用自闭合
- 传递值`defineProps([])`不用导入
- 监听事件
  - `defineEmits(['func'])` 声明需要抛出的事件
  - `<button @click="$emit('func')">` 事件在这里产生
  - `<child @func="父组件操作">` 函数在这里定义
- 插槽`<slot>`
  - 占位符
  - 默认内容
  - 起名字
- 动态组件`<component :is="tabs[currentTab]">`




# 组件基础

[Vue参考](https://cn.vuejs.org/)

----


## 组件注册

- 全局注册
  - `app.component('compName',component)`
- 局部注册(仅在当前组件内可用)
  - import之后直接用 (setup)
  - 不用语法糖 `components:{compName:component}`


## Props

- `const props = defineProps(['foo'])`访问时为`props.foo`
- `defineProps({title: String,likes: Number})` 使用对象形式限定类型
- 不使用语法糖
  - `props: ['foo']` 
  - `setup(props){...}`
- 为了和 HTML attribute 对齐`thePropsMess`->`the-props-mess`
- `v-bind` 用法
  - 可以用`v-bind`动态传值
  - 不加冒号的都是字符串
  - 加冒号表示js表达式 `:porp="任何类型"`
  - `v-bind="classA"` 等于将对象中的属性和值都传进去
- 单向数据流
  - 不要在子组件中给其赋/改值
  - 而是抛出一个事件来通知父组件做出改变 `$emit`
- prop校验略
- `defineProps({disabled: Boolean})` `<MyComponent disabled />` 写了表true 不写表false


## 组件事件

- 抛出与监听事件
  - `$(emit())` 抛出事件
  - `@` 监听事件
- 事件参数
  - `$emit('func', 7)`
  - `@func="(n)=>log(n)"`
- 声明抛出的事件
  - `const emit = defineEmits(['func1', 'func2'])`
  - `emits: ['inFocus', 'submit']`
  - `setup(props,ctx){ctx.emit('submit')}`
  - 校验验证 略
- `v-model` 用法
  - 实现与组件输入的双向绑定
    - `defineProps(['modelValue']);defineEmits(['update:modelValue'])`
    - `<input :vlue="modelValue" @input="$emit('update:modelValue',$event.target.value)">`
    - `<CustomInput v-model="orientText" />`
  - 多个绑定略
  - 自定义的修饰符略


## 透传

- 当一个组件以单根节点时，透传的 attribute 会自动添加到根元素的 attribute 中
- 继承如`class style id v-on`
- 禁用略
- 多个根元素时可以使用`v-bind="$attrs"`来指定
- 使用`useAttrs()`来访问一个组件的所有透传


## 插槽

- `<slot>` 插口
  - 在里面写的作为默认内容
  - `name=""` 默认命名为`"default"`
- `<template v-slot:theName>` 插头 v-slot:->#
- `#[dynamicName]`动态插槽
- 访问子组件中的值
  - `<slot m="string" name="abc">`
    - 可以使用`v-bind="对象"`传全部值
  - `<MyComonent v-slot="newName">{{newName.m}}</>`
  - `<template #abc="newObj">{{newObj.a/b/c}} or #abc={a,b,c}`然后直接用
- 无渲染组件
  - 子组件只包括逻辑 不做渲染 将数据用`<slot>`传值
  - `<template><slot :a="a" :b="b" /></>`
  - 要渲染成什么样子全部交给插头


## 依赖注入

- 用于给过深的组件传值
- `provide('key', value)`
- `const key = inject('key'[,'默认值'])`


## 异步组件

- 从服务器加载相关组件
- `defineAsyncComponent`

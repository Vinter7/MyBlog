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

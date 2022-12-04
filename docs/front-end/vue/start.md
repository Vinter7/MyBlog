# 快速上手

[中文文档](https://cn.vuejs.org/)

----

## 创建

**cdn版本**

```html
<div id="app">{{print}}</div>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
let vm = new Vue({
  el:'#app',
  data:function(){
    return {
      print: 'hello world'
    }
  },
})
</script>
<!-- 两者都行 -->
<script>
  const {createApp} = Vue
  createApp({
    data(){
      return {
        print: 'hello world'
      }
    }
  }).mount('#app')
</script>
```

**单文本组件**

`npm init vue`

```js
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```


:::: code-group
::: code-group-item 选项式
```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```
:::
::: code-group-item 组合式
```vue
<script>
import { reactive } from 'vue'
export default {
  setup(){
    const state = reactive({ count: 0 })
    function increment() {
        state.count++
    }
    return {
      state,
      increment
    }
  }
}
</script>
<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```
:::
::: code-group-item 语法糖
```vue
<script setup>
import { reactive } from 'vue'
const state = reactive({ count: 0 })
function increment() {
  state.count++
}
</script>
<template>
  <button @click="increment">
    {{ state.count }}
  </button>
</template>
```
:::
::::

## 模板语法

:::: code-group
::: code-group-item 选项式
```vue
<script>
export default {
  data() {
    return {
      ok:true
      ck:'click'
      obj:{
        id: 'box',
        class: 'flex'
      }
    }
  },
  methods:{
    log(){
      console.log(ok)
    }
  }
}
</script>
<template>
  <div v-bind="obj">
    <button @[ck]="log" :disable=ok>{{ok ? 'true':'false'}}</button>
  <div>
</template>
```
:::
::: code-group-item 组合式
```vue
<script setup>
let obj = {
  id: 'box',
  class: 'flex'
}
const ck = 'click'
const ok = true
function log() {
  console.log(ok)
}
</script>
<template>
  <div v-bind="obj">
  <div v-bind="obj">
    <button @[ck]="log" :disable=ok>{{ok ? 'true':'false'}}</button>
  <div>
  <div>
</template>
```
:::
::::

## 响应式

选项式API中`data()`返回对象的顶层属性都具有响应性

:::: code-group
::: code-group-item reactive
```vue
<script setup>
  // 使用reactive()函数创建响应式对象
  // 返回的是原对象的Proxy
  // 缺陷在于仅对对象类型有效
  // 且替换引用时失去响应性
  import { reactive } from 'vue'
  const state = reactive({ count: 0 })
  function increment() {
    state.count++
  }
</script>
```
:::
::: code-group-item ref
```vue
<script setup>
  // 使用ref()创建任意值的响应式ref
  // 返回的是原值包装为 value 属性的 ref 对象
  // 在模板/响应式对象中会解包
  // $ref()语法糖 通过编译器省去.value
  import { ref } from 'vue'
  const count = ref(0)
  function increment() {
    count.value++
  }
</script>
```
:::
::::

## 计算属性

:::: code-group
::: code-group-item 选项式
```vue
<script>
export default {
  data() {
    return {
      first: 'tom',
      last: 'john'
    }
  },
  // 用法和方法一样
  computed: {
    func1(){
      return first+' '+last
    },
    func2:{
      get(){
        return this.first+' '+this.last
      }
      set(name){
        [first, last] = name.split(' ')
      }
    }
  },
}
</script>
```
:::
::: code-group-item 组合式
```vue
<script setup>
  import { computed } from 'vue'
  const first = 'John'
  const last = 'Doe'
  const name = computed(()=>{
    return first+' '+last
  })
</script>
```
:::
::::


## 样式绑定

```html
<!-- 类 -->
<div class="c1 c2">
<div :class="{c1:true,c2:false}">
<div :class="[c1,c2]">
<div :class="[ false ? c1 :'',c2]">
<div :class="[ {c1:false},c2]">
<!-- 样式 -->
<div style="color:pink; width:50px">
<div :style="{color: pink, width: '50px'}">
<div :style="[s1,s2]">
```

## 逻辑渲染

:::: code-group
::: code-group-item 条件渲染
```html
<!-- dom上无该元素 -->
<div v-if="is1">
<div v-else-if="is2">
<div v-else>
<!-- dom上有该元素但不显示 -->
<div v-show="is">
```
:::
::: code-group-item 列表渲染
```html
<li v-for=item in 10> 1...10 </li>
<li v-for=item in items>
<li v-for=(item,index) in items>
<li v-for=(value,key) in obj>
<li v-for=i in list :key="i.id">
<Mycomponent v-for="(item,index) in items" :item="item" :index="index" :key="item.id" />
```
:::
::::

## 双向绑定

- 修饰符
  - `.lazy` change事件后更新
  - `.number` 输入自动转换为数字
  - `.trim` 两端去空格


```html
<input v-model="text">
<!-- 输入的改动引起绑定值的变动 -->

<input type="text"> <textarea>
  使用value属性和input事件
<input type="checkbox"> <input type="radio">
  使用checked属性和change事件
  checkbox单个时是boolean 多个时是value数组
  radio选中为value
<select>
  使用value属性和change事件
  为option值 多选时为数组

```


## 侦听器

:::: code-group
::: code-group-item 选项式
```vue
<script>
export default {
  create(){
    this.$watch('watchit',(newV)=>{})
  } //方法2
  data() {
    return {
      watchit:''
    }
  },
  watch: { //方法1
    watchit(newV,oldV){
      console.log('之前是',oldV)
      console.log('现在是',newV)
    }
  },
}
</script>
```
:::
::: code-group-item 组合式
```vue
<script setup>
import { ref, watch, watchEffect } from 'vue'
const watchit = ref('')
watch(watchit,(newV,oldV)=>{}) //只追踪明确侦听的数据源
watchEffect(()=>{}) //在副作用发生期间追踪依赖
</script>
```
:::
::::


## 模板引用

- 在`v-for`中获取的是整个列表的所有元素的数组
- `:ref="elem=>{}"` 收到元素为参数 组件更新时调用
- 组件上的 ref 获得的值是组件实例 `<script setup>`默认私有因此无效

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
const input = ref(null)
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```


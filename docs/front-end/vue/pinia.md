# Pinia

[文档](https://pinia.vuejs.org/zh/)

----

## 快速上手

`yarn add pinia`

`npm install pinia`

:::: code-group
::: code-group-item 定义
```js
import { defineStore } from 'pinia'
// 选项式
export const useCounterStore = defineStore('counter', {
  state: () => { count: 0 }
  actions: {
    increment() {
      this.count++
    },
  },
})

// 组合式
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  return { count, increment }
})
```
:::
::: code-group-item 使用
```js
// 注册
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')

// 使用
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
counter.count++
counter.increment()

// 在选项式Api中使用可以使用setup()钩子
setup(){
  const counter = useCounterStore()
  return { counter }
}
// 然后在别的选项中就能使用this.counter读取到
//不想使用setup()的话需要mapState()之类的函数进行映射
```
:::
::::

## Store

`defineStore()` 接受两个参数 返回一个函数 第一个参数为名字 第二个参数可以是 setuo 函数 也可以是 option 对象

```js
// 选项式
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

//组合式
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  const double = computed((state) => state.count * 2)
  return { count, increment, double }
})
```

将Store 理解成一个组件 一个用`reactive()`包装的对象


## State

```js
// 定义
state: () => {...初始状态}

//访问
const store = useStore()
store.count++

//重置
store.$reset()

// 变更(替换)
store.$patch({...要变更的属性和值})
store.$patch(state => {
  // 对state的具体操作
  state.count+=2
})

// 订阅
store.$subscribe((mutation, state) => {...})
```


## Getter

```js
// 定义
export const useStore = defineStore('main', {
  state: () => {count: 0},
  getters: {
    double: state => state.count * 2,
    doublePlus1(){ return this.double + 1 }
    rtFunc(state){
      return (i) => i === state.count
    }
  },
})

// 使用和state类似
```

## Action

```js
// 定义
export const useStore = defineStore('main', {
  state: () => {count: 0},
  actions: {
    increment() {
      this.count++
    },
    // 支持异步
    async regist(){
      let res = await fetch(url)
      return res.body
    }
  }
})

// 使用
const store = useStore
store.increment()

// 订阅 略
store.$onAction(...)
```



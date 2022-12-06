# 深入组件

## 组件注册

**全局注册**

```js
import { createApp } from 'vue'
import App from './App.vue'
import MyComponent from './Component.vue'
const app = createApp(App)
app.component('ComponentA',MyComponent)
app.component('ComponentB',{...组件对象})
```

**局部注册**

:::: code-group
::: code-group-item 选项式
```js
import ComponentA from './ComponentA.vue'
export default {
  components: {
    ComponentA
  }
  //组合式
  //setup(){}
}
```
:::
::: code-group-item 语法糖
```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>
```
:::
::::

## 传参


:::: code-group
::: code-group-item 选项式
```js
export default {
  props: ['foo'],
  created() {
    console.log(this.foo)
  }
  //组合式
  //setup(props) { console.log(props.foo) }
  // 规定类型
  props: {
    title: String,
    likes: Number
    //构造函数
  }
}

```
:::
::: code-group-item 语法糖
```vue
<script setup>
const props = defineProps(['foo'])
console.log(props.foo)
// 规定类型
defineProps({
  title: String,
  likes: Number,
  propA:[String, Number],
  propB:{
    type: String, //类型
    required: true, // 必要
    default: 'ok' // 默认
  }
  // 详见文档
})
</script>
```
:::
::::

## 事件

:::: code-group
::: code-group-item 选项式
```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent',7)
    }
  }
}
//<button @click="$emit('someEvent',7)">click me</button>

//<MyComponent @some-event="n=>n+n" />
```
:::
::: code-group-item 语法糖
```vue
<script setup>
// 因为不能使用this
const emit = defineEmits(['someEvent'])
function func(){
  emit('someEvent',7)
}

// 关于v-model和组件的组合使用详见文档
</script>
```
:::
::::

## 透传

当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上,包括class、style 和 id. 可以通过`$attrs`或`import { useAttrs } from 'vue'+const attrs = useAttrs()`访问到

## 插槽

```html
<slot>默认插槽的默认内容</slot>
<slot name="theName">具名插槽</slot>

<Component>
  <template #default>
    加到默认的插槽
  </template>
  <template #theName>
    加到具名插槽
  </template>
  <template v-slot:[dynamicSlotName] #[dynamicSlotName]>
    动态插槽名
  </template>
</Component>
```

**作用域插槽**

:::: code-group
::: code-group-item 默认插槽
```vue
<div>
  <slot text="hello" :count="1"></slot>
</div>

<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>

<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```
:::
::: code-group-item 具名插槽
```vue
<slot name="header" message="hello"></slot>
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }} -> { message: 'hello' }
  </template>
</MyComponent>
```
:::
::::

**无渲染组件**

在script中进行计算 但在template中就丢一个传参用的插槽 父组件拿到参数 然后写出具体视图 非常有意思的思路


## 依赖

:::: code-group
::: code-group-item 选项式 提供
```js
export default {
  // 选项
  provide: {
    message: 'hello!'
  }
  // 函数形式访问this
  provide() {
    return {
      message: this.message
      // 提供响应性
      reactivity：computed(()=>this.message)
    }
  }
}
// 全局
app.provide('key','value')
```
:::
::: code-group-item 选项式 注入
```js
export default {
  inject: ['message'],
  inject: {
    newName: { // 别名
      from: 'message', // 原名
      default: '默认值' // 默认
    }
  }
}
```
:::
::: code-group-item 选项式
```vue
<script setup>
  import { provide，inject } from 'vue'
  provide('message','hello!')
  const newName = inject('message','default')
  // 响应式略
</script>
```
:::
::::



## 异步组件

:::: code-group
::: code-group-item 选项式
```js
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    NewName: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
    AsyncComp: defineAsyncComponent({
      loader:()=>import('./Comp.vue'), // 加载项
      loadingComponent: LoadingComponent, // 加载组件
      delay: 200, // 展示加载组件前的延迟时间
      errorComponent: ErrorComponent, // 加载失败组件
      timeout: 3000 //超时
    })
  }
}
```
:::
::: code-group-item 组合式
```js
import { defineAsyncComponent } from 'vue'
const AdminPage = defineAsyncComponent(() =>
  import('./components/AdminPageComponent.vue')
)
const AsyncComp = defineAsyncComponent({...})

// 全局
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```
:::
::::
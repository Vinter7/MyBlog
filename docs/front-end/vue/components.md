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

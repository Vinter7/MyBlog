# NuxtJS

[文档](https://nuxt.com/)

---

## 前言

Nuxt用于实现SSR网页的制作,因为直接用vue 加router制作的网页为单页面应用 对搜索引擎的支持不好,因此可以选择使用Nuxt3

- 安装
  - `npx nuxi init filename`
  - `cd filename`
  - `npm install`
  - `npm run dev`
- 目录结构
  - .nuxt               // 自动生成的目录，用于展示结果
  - node_modules        // 项目依赖包存放目录
  - .gitignore          // Git的配置目录
  - app.vue             // 项目入口文件，你可以在这里配置路由的出口
  - nuxt.config.ts      // nuxt项目的配置文件
  - package-lock.json   // 锁定安装时包的版本
  - package.json        // 包的配置文件和项目的启动调式命令配置
  - README.md           // 项目的说明文件
  - tsconfig.json       // TypeScript的配置文件
  - pages               // 开发的页面目录
  - components          // 组件目录
  - assets              // 静态资源目录
  - layouts             // 项目布局目录
  - composables  //方法目录
- 约定式开发
  - 正确放入上述文件夹中的文件均不需要配置便能直接使用
  - 在pages页的路由层级自动生效
  - components中的组件可以直接调用

## 约定路由

1. 需要在app.vue里面写上`<Nuxtpage>` 类似`<router-view>`
2. 然后在地址栏访问`/page1` 就会显示到page1页面
3. 在pages里面添加`index.vue`可以设置首页
4. `<NuxtLink to="/demo1">路由跳转</NuxtLink>`

## 动态路由

- 单参数传递
  - 在页面的文件名上用`[arg]`就行 `demo-[id].vue`
  - 在url上指定参数`/demo-77`
  - 使用`{{$route.params.id}}`的方式获得参数
  - 使用`const id = route.params.id`获得参数
- 多参数的获取
  - 需要使用路由的嵌套 一层路由传递一个参数的方法
  - 文件层面`pages/files-[name]/demo-[id].vue`
  - `<NuxtLink to="/files-nbnb/demo-38">链接跳转</NuxtLink>`
  - `const id = router.params.id;const name = route,params.name`

## 嵌套路由

1. 目录和文件名同名 `pages/parent.vue pages/parent/child.vue`
2. 在`parent.vue`里面写上`<Nuxtchild>`作为子页面出口
3. `<NuxtLink to="/parent/child">嵌套路由</NuxtLink>`
4. 可以有多个子页面 只要在链接的时候写明就行`/parent/two`

## 布局模板

1. 在`layouts\defalut.vue`写上布局内容和`<slot>`
2. 在`app.vue`上引用`<NuxtLayout name="defalut">写上插槽内容</>`
3. 因为app.vue是每个页面的出口,这样每个页面都会有布局模板中的效果
4. 当布局中使用了多个插槽时,就要通过`<template #slotname>`来配合插槽

## 编写组件

1. 写在`components`目录下会自动加载到页面中
2. 创建和使用时都推荐使用大驼峰命名法
3. 在布局模板中也可以使用组件
4. 多层级组件就是吧组件分开放到各个文件夹里面
5. `components/test/MyButton.vue`的组件名为`<TestMyButton />`
6. 在组件名前面加上Lazy前缀,可以按需懒加载该组件,如`LazyText.vue`

## 模块化代码

1. 在`composables`文件夹下写js函数,注意要export
2. `export const getTime=()=>{}`
3. `const time = getTime()`
4. 只有顶层文件会被引入 
5. 如果要把代码进一步拆分 在文件夹里用`index.js`作为输出

## 数据请求

useAsyncData 、useFetch 、useLazyFetch 、useLazyAsyncData

```javascript
const res = await useAsyncData(
  "getList",
  () => $fetch("http://121.36.81.61:8000/getTenArticleList"),
  {
    lazy: true,
    //other option
  }
)

const res = await useFetch("http://121.36.81.61:8000/getTenArticleList", {
  method: "get",
  id: 1,
});

const list = ref(res.data._rawValue.data)
```

useLazyAsyncData 和useLazyFetch 只是把配置选项中的Lazy 设置成了true,其他没区别

## 路由中间件

- 全局中间件
  - `/middleware/default.global.js`
  - `export default defineNuxtRouteMiddleware((to,from)=>{})`
  - `.path` 获得路径
  - 路由守卫
    - `if(to.path==='/demo1'){}`
    - `abortNavigation()`
    - `return navigateTo('/')`
- 页面中间件
  - `/middleware/name.js` 写上规则
  - `/pages/demo7.vue` 写上使用
  - `definePageMeta({middleware:['name']})`

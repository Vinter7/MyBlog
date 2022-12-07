# Vue Router

[文档](https://router.vuejs.org/zh/)

----

## 快速上手

CDN: `https://unpkg.com/vue-router@4`

npm: `npm install vue-router@4`

```html
<router-link to="/url">在不重新加载页面的情况下更改 URL</router-link>
<!-- 路由出口 -->
<router-view></router-view>
```

```js
// 组件
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
// 路由列表
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]
// 路由示例
const router = VueRouter.createRouter({
  // history模式 必选
  history: VueRouter.createWebHashHistory(),
  routes,
})

// 创建并挂载根实例
const app = Vue.createApp({})
app.use(router)
app.mount('#app')
```
```js
//选项式
this.$route.params.username //查看路由参数
this.$router.push('/login') //跳转路由
//组合式
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
route.params.username //路由参数
router.push('/login') //跳转路由
```

## 动态路由

```js
{
  path: '/users/:id',
  component: {template: '<div>User {{ $route.params.id }}</div>'}
}
```

## 路由匹配

```js
const routes = [
  // 仅匹配数字
  {path: '/:id(\\d+)'},
  // 重复参数
  // 得到的params为数组['one','two','three']
  {path: '/:chapters+'}, // /one/two/three
  {path: '/:chapters*'}, // 包括 /
  {path: '/users/:id(\\d+)?'}, //可选
  // strict and sensitive
  strict: true, // 不匹配 /url/
  {path: '/url', sensitive: true} //匹配/url/
  //路由不分大小写
]
```

## 嵌套路由


```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `,
}

const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 空的嵌套路径
      { path: '', component: UserHome },
      {
        // /user/:id/profile下 UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

## 编程式导航

- 导航方法返回Promise
- `router.push(...)` 同`<router-link :to="...">`
  - `'/user/brgzz'`
  - `{...}`
    - 路径`path: '/user/brgzz'`
    - 命名路由`name: 'user'`
    - 参数`params: {username: 'brgzz'}` 有path是忽略
    - 查询`query;{id: '0001'}` ?id=0001
    - hash`hash: '#h2'` #h2
    - replace为true时同下
- `router.replace(...)` 同`<router-link :to="..." replace>`
  - 导航时不会向 history 添加新记录
- `router.go(n)`
- `.back()` 同`go(-1)`
- `.forward()` 同`go(1)`

## 命名路由

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]

router.push({ name: 'user', params: { username: 'brgzz' } })
```

## 命名视图

有点类似插件slot

```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```
```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        default: Home,
        LeftSidebar,
        RightSidebar,
      },
    },
  ],
})
```

## 重定向和别名

```js
const routes = [
  { path: '/home', redirect: '/' },
  { path: '/home', redirect: { name: 'homepage' } },
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => 'profile',
  },
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      return { path: '/search', query: { q: to.params.searchText } }
    }
  }
]
```

> 别名和重定向的区别在于 重定向会将url替换再匹配 而别名是不替换直接匹配

- `path: '/', alias: '/home'` / /home
- `path: '/users', alias: ['/people', 'list']`
  - /users /users/list /people
- `path: '/users/:id', alias:'/:id'` 都要有参数


## props模式传参

```js
// 动态路由
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [
  { path: '/user/:id', component: User, props: true }
]

//命名视图
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]

// 无动态路由(静态)
//对象
const routes = [
  {
    path: '/userId',
    component: Promotion,
    props: { id: 0001 }
  }
]
// 函数
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: route => { query: route.query.q }
  }
]
```

## 历史模式

1. Hash模式`history: createWebHashHistory()` 路径带#号
1. HTML5模式`history: createWebHistory()` 需要服务器支持
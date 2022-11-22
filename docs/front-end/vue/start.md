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





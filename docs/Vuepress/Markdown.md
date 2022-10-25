# Markdown

## Syntax Extensions

- 表格删除线
- 链接
- Emoji
  - `:tada:` :tada:
  - [Emoji查找](https://github.com/ikatyang/emoji-cheat-sheet)
- 目录 `[[toc]]`
- 代码块
  - 行高亮 `{1,6-8}`
  - 行号 `:no-line-numbers`
  - `:v-pre / :no-v-pre`
- 导入代码块
  - `@[code{3-10} js{3}:no-line-numbers](../foo.js)`

## Vue SFC


演示{{ msg }}

<RedDiv>

当前计数为： {{ count }}

</RedDiv>

<button @click="count++">点我+1</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = '在Markdown中使用Vue'
const count = ref(0)
</script>

<style>
.red-div {
  color: #ff5f78;
}
</style>


## Custom Containers

```md
::: <type> [title]
[content]
type : tip warning danger details
:::
```


::: warning title
This is a warning
:::
# SASS 扩展语言

[SASS参考](https://www.sass.hk/guide/)

----


- 使用变量
  - 声明`$name:value;`
  - 范围类似`let`
  - 命名上不区分`- & _`
- 嵌套CSS
  - 在规则块里面嵌套子元素样式`div{p{}}`
  - 父选择器标识符`&`
    - 常用于伪类 `&:hover{}`
  - 支持`> + ~`
  - 嵌套属性 `border:{style:solid;width:1px;}`
- 导入
  - `@import "name";`
  - `$name:value!default;` 默认变量值
  - 可以在`{@import "name"}`里面导入
  - 导入原生css时,需将后缀改为`.scss`
- 静默注释
    `// /*  */`
- 混合器
  - 声明 `@minix name{-moz-border-radius: 5px;  -webkit-border-radius: 5px;border-radius: 5px;}`
  - 引用 `@include rounded-corners;`
  - 传参 `@minix func($arg1,$arg2){}`
  - 默认值 `$name: default-value`
- 选择器继承
  - 继承 `@extend selector;`



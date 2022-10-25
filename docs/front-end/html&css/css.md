# CSS 层叠样式表

[css参考](https://quickref.me/css)

----

## Selectors

- 种类
  - 元素
  - id
  - 类
  - 属性 `[attr[="value"]]`
    - `^` 开头
    - `$` 结尾
    - `*` 部分
  - `*` 全部
- 父子
  - `  ` 子子孙孙
  - `>` 直接子嗣
  - `+` 下个弟弟
  - `~` 所有弟弟
- 伪类
  - `:hover` 经过
  - `:focus` 聚焦
  - `:active` 激活
  - `:link` 未访问
  - `visited` 已访问
  - `:first-child` `:last-child`
  - `:nth-child(n/even/3n+0)`
- 伪元素
  - `::after`
  - `::before`
  - `::first-letter`
  - `::first-line`

## Flexbox

- container
  - display: flex;
  - flex-direction 主轴方向
  - justify-content 主轴排列方式
  - align-items 交叉轴排列方式
  - align-content 多行排列方式
  - flex-wrap 允许换行
  - flex-flow 方向和换行
- items
  - flex: grow shink basis
  - align-self 交叉轴排列方式
  - order 序号

## Grid

- container
  - display: grid;
  - grid-template-rows 横向格子 fr(份)
    - 可以使用`repeat(4,1fr)`来重复
  - grid-template-columns 竖向格子
  - grid-template-areas 方格命名
  - row-gap 横向间隔
  - column-gap 竖向间隔
  - grid-gap 间隔
- items
  - grid-row 
  - grid-column
  - grid-area


## Others

- 文字
  - font: style weight size / line-height family
  - text-decoration
  - text-align
  - text-transform
- 背景
  - background: color image position / size repeat attachment
  - background-clip
- 单位
  - px % em rem vh vw
- 定位
  - static 默认
  - relative 随文档流
    - top left right bottom
  - absolute 相对父元素
  - fixed 相对body
  - sticky
- 浮动
  - float
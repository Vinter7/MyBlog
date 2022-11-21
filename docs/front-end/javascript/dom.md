# 文档对象模型

-----

## 浏览器环境

1. `window` 窗口根对象 (窗口)
2. `DOM` 文档对象模型 (页面内容)
3. `CSSOM` CSS对象模型 (页面样式)
4. `BOM` 浏览器对象模型 (浏览器)

## DOM 树

标签为枝,内容为叶,皆为对象,皆为节点

- `document`
  - `.documentElement` html
  - `.head`
  - `.body`
  - `.getElementById(id)`
- 导航
  - 节点导航
    - `.childNodes` 所有子节点 集合(类数组可迭代对象)
    - `.firstChild` `.lastChild` 第一个和最后一个子节点
    - `.hasChildNodes()` 是否有子节点
    - `.nextSibling` `.previousSibling` 下一个上一个节点
    - `.parentNode` 父节点
  - 元素导航 (忽略文字节点)
    - `.children`
    - `.firstElementChild` `.lastElementChild`
    - `e1.contains(e2)` 是否父子元素
    - `.previousElementSibling` `.nextElementSibling`
    - `.parentElement`
  - 特定类型(table,form等)的导航 略
- 查找
  - `document.getElementById(id)` 或者直接使用 id
  - `.querySelectorAll('css选择器')` 匹配的全部
  - `.querySelector(css)` 第一个元素
  - `.matches(css)` 检查是否匹配 返回boolean
  - `.closest(css)` 查找与 CSS 选择器匹配的最近的祖先(包括自己)
  - `.getElementsBy*` 已被 `.querySelector(css)` 取代


## 节点属性

![节点层次结构](https://raw.githubusercontent.com/javascript-tutorial/zh.javascript.info/master/2-ui/1-document/05-basic-dom-node-properties/dom-class-hierarchy.svg)

- `.nodeType` 1元素 3文本
- `.nodeName/tagName` 节点名，标签名
- `.innerHTML` 内容 可写
- `.outerHTML` 元素完整html
- `.nodeValue/data` 非元素节点 内容
- `.textContent` 元素内文本
- `.hidden` true时同`display:none`
- 大多数标准 HTML 特性都有相应的 DOM 属性
  - input 的value type
  - a 的 href


## Attributes and properties

- 在加载页面时会将HTML**标准**特性变成DOM属性 (改变时也同步)
- 非标准特性的访问方法
  - `.attributes` 所有特性集合
  - `.hasAttribute(name)` 是否存在
  - `.getAttribute(name)` 获取这个特性值
  - `.setAttribute(name, value)` 设置这个特性值
  - `.removeAttribute(name)` 移除这个特性
- HTML 特性名字大小写不敏感 值为字符串
- 非标准特性常用于为JavaScript标记html元素,并设置状态 (建议data-开头)


## 修改文档

- 创建
  - `let div = document.createElement('div')` 元素节点
    - `div.className='css'` `div.innerHTML='<p>content</p>'`
    - `document.body.append(div)`
  - `document.createTextNode('Here I am')` 文本节点
- 插入












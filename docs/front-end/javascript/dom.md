# 文档对象

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
  - `.write('<b>Hello from JS</b>')`
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

![节点层次结构图](https://zh.javascript.info/article/basic-dom-node-properties/dom-class-hierarchy.svg)

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
  - `.setAttribute(name, value)` 设置这个特性值(string)
  - `.removeAttribute(name)` 移除这个特性
- HTML 特性名字大小写不敏感 值为字符串
- 非标准特性常用于为JavaScript标记html元素,并设置状态 (建议data-开头)


## 修改文档

- 创建
  - `let div = document.createElement('div')` 元素节点
    - `div.className='css'` `div.innerHTML='<p>content</p>'`
    - `document.body.append(div)`
  - `document.createTextNode('Here I am')` 文本节点
  - `let div2 = div.cloneNode(true)` 克隆节点 false克隆不包括子元素
- 插入节点
  - `node.append(...nodes)` 在node末尾插入
  - `.prepend(...nodes)` 在开头插入
  - `.before(...nodes)` 在之前插入
  - `.after(...nodes)` 之后
  - `.replaceWith(..nodes)` 替代
- 插入html
  - `elem.insertAdjacentHTML(where,html)`
  - `beforebegin afterbegin beforeend afterend` 之前 开头 末尾 之后
  - `insertAdjacentText/Element` 插入文本字符串和元素
- 删除节点
  - `node.remove()`
  - `second.after(first)`所有插入方法都会自动从旧位置删除该节点

## 样式和类

- 在js中使用`className`属性对应`class`特性
- 可以通过对`className`赋值来替换整个整个字符串
- 可以通过 `classList` 操作单个类
  - `.classList.add/remove(cssClass)` 增改
  - `.classList.toggle(cssClass)` 取反
  - `.classList.contains(cssClass)` 是否含
  - `classList` 可迭代
- 对于样式中的多词属性 在style对象中转化为驼峰属性
- 对于单个属性可以 `.style.prop = "20px"`=>`style="prop: 20px;"`
- 完全重写 `.style.cssText='css'`
- 获取计算后样式值 `getComputedStyle(元素, [伪元素])` 返回该元素的样式对象


## 几何属性

- 元素
  - `.offsetParent` 父元素
  - `.offsetLeft/offsetTop` 相对于父元素左上角边缘的坐标
  - `.offsetWidth/offsetHeight` 元素外尺寸 包括边框
  - `.clientLeft/clientTop` 左侧/顶部border的宽度
  - `.clientWidth/clientHeight` 内容尺寸 内容+padding
  - `.scrollWidth/scrollHeight` 内容尺寸 包括未滚出内容
  - `.scrollLeft/scrollTop` 滚了多少 可写
  - `.getBoundingClientRect()` 元素坐标
- 文档 窗口
  - 宽高
    - `document.documentElement.clientWidth/clientHeight` 文档可见部分宽高
    - `window.innerWidth/innerHeight` 宽高包括滚条
  - 获取滚动
    - `document.documentElement.scrollLeft/scrollTop`
    - `window.pageXOffset/pageYOffset`
    - `window.scrollX/Y`
  - 滚动
    - `window.scrollTo(x,y)` 绝对
    - `window.scrollBy(x,y)` 相对
    - `elem.scrollIntoView([boolean])` 滚到elem在顶部/底部(false)


# 浏览器事件

----

## 事件

事件传播三阶段

1. 捕获阶段 事件自window走入元素 出警
2. 目标阶段 事件到达元素 到查
3. 冒泡阶段 事件从元素向上传播 上报
   
**常用事件**

- 鼠标事件
  - click 点击
  - contextmenu 右击
  - mouseover / mouseout 移入/出
  - mousedown / mouseup 按下/释放
  - mousemove 移动
- 键盘事件
  - keydown / keyup 按下松开
- 表单事件
  - submit 提交
  - focus 聚焦
- Document 事件
  - DOMContentLoaded dom构建完成
- CSS 事件
  - transitionend 动画完成

## 事件处理

- HTML 特性 `on<event>="func()"`
- DOM 属性
  - `elem.onclick = function(event){}`
  - `elem.addEventListener(event, handle, ?options)` 
    - option `once capture passive` 一次 捕获 阻止默认行为
    - 可以添加多个处理程序
    - 有些事件只能以此设置处理程序
    - 若handle为对象 会调用`obj.handleEvent(event)`
  - `elem.removeEventListener(同上)` 移除
- 事件对象
  - this 指向事件元素
  - 函数接收一个事件对象 `event`
    - `.type` 事件类型
    - `.currentTarget` 事件元素 (当前)
    - `.target` 目标元素 (最初触发)
    - `.eventPhase` 当前阶段
    - `.stopPropagation()` 停止冒泡
    - `.preventDefault()` 阻止
- 阻止浏览器默认行为
  - `event.preventDefault()`
  - `on<event>="return false"` `.onclick=event=>false`
  - `event.defaultPrevented` 在阻止时为true
- 创建事件
  1. `let event = new Event(type,?options)` 也可以用具体的UI事件类
    - `bubbles: true/false` 是否冒泡
    - `cancelable: true/false` 是否阻止默认
  2. `elem.dispatchEvent(event)`
- 自定义事件 `new CustomEvent('eventName'{detail:any})`


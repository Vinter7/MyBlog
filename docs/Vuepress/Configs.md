# Configs


## config


- base
- lang
- title
- description
- head
- theme
- plugins
  
## Frontmatter


- Vuepress
  - date `yyyy-mm-dd`
  - description
  - head
  - lang
  - title
- Theme
  - pageClass
  - Home Page
    - home 是否首页
    - heroImage
    - heroText
    - tagline
    - actions
      - text link type
    - features
      - title details
    - footer
    - footerHtml
  - Normal Page
    - lastUpdated
    - sidebar
    - prev
    - next
  
  

## Theme


### Configs

- colorMode
- colorModeSwitch
- navbar
  - NavbarItem
    - text link
  - NavbarGroup
    - text children
  - String
- logo
- repo
- sidebar
  - false 'auto'
  - SidebarConfigArray[]
    - text link children[]
    - String
    - collapsible:boolean 可否折叠
  - SidebarConfigObject{} 设定不同路径下情况
    - `'/path/':SidebarConfigArray[{}]`
- sidebarDepth
- lastUpdated
- notFound

### Components

- Badge
  - type text vertical
- CodeGroup
  - CodeGroupItem
    - title

### Styles

- `.vuepress/styles/`
- Palette.scss
- index.scss
  - --c-brand
  - --c-bg
  - --c-text
  - --code-bg-color
  - --c-border


### Extending


- Layout Slots
  - navbar (before) (after)
  - sidebar (top) (bottem)
  - page (top) (bottom) (content-top/bottom)
- Components Replacement
- Developing a Child Theme



## Plugin

- back-to-top 回顶部
- container 
- external-link-icon 外链图标
- medium-zoom 图片缩放
- nprogress 加载条
- register-components 注册组件
- search
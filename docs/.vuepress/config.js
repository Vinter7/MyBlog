// import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'
import theme from './configs/theme'

export default {
  title: '高枕枕のBlog',
  description: '高枕枕的知识库兼博客站',
  lang: 'zh-CN',
  dest: './dist',
  head: [['link', { rel: 'icon', href: '/images/windmill.png' }]],
  theme,
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: 'Search...',
        },
      },
      hotKeys: ['`', '/'],
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}

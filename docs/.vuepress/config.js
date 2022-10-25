// import { defineUserConfig } from 'vuepress'
import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { path } from '@vuepress/utils'
import theme from './configs/theme'

export default {
  title: '高枕枕のBlog',
  description: '高枕枕的知识库兼博客站',
  dest: './dist',
  head: [['link', { rel: 'icon', href: '/images/风车.png' }]],
  theme,
  plugins: [
    searchPlugin({}),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}

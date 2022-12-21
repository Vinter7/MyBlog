import { defaultTheme } from 'vuepress'

export default defaultTheme({
  navbar: [
    {
      text: 'Front End',
      children: [
        '/front-end/html&css/',
        '/front-end/javascript/',
        '/front-end/vue/',
        '/front-end/node/',
        '/front-end/ml5/',
      ],
    },
    {
      text: 'Others',
      children: [
        '/others/python',
        '/others/django',
        '/others/algorithm',
        '/others/tensorflow',
        '/others/git',
        '/others/regexp',
        '/others/vim',
      ],
    },
    {
      text: 'Demo',
      children: [
        '/demo/2048',
        '/demo/mine',
        '/demo/windsong',
        '/demo/iphone',
      ],
    },
  ],
  logo: '/images/windmill.png',
  repo: 'Vinter7/MyBlog',
  sidebar: {
    '/Vuepress/': ['/Vuepress/Configs.md', '/Vuepress/Markdown.md'],

    '/diary/': [
      '/diary/the-past.md',
      '/diary/2206.md',
      '/diary/2207.md',
      '/diary/2208.md',
      '/diary/2209.md',
    ],
    '/others/': [
      '/others/git.md',
      '/others/regexp.md',
      '/others/vim.md',
    ],
    '/demo/': [
      '/demo/2048',
      '/demo/mine',
      '/demo/windsong',
      '/demo/iphone',
    ],
    '/front-end/': [
      {
        text: 'HTML & CSS',
        collapsible: true,
        children: [
          '/front-end/html&css/html',
          '/front-end/html&css/css',
          '/front-end/html&css/sass',
        ],
      },
      {
        text: 'JavaScript',
        collapsible: true,
        children: [
          '/front-end/javascript/fundamentals',
          '/front-end/javascript/object',
          '/front-end/javascript/class',
          '/front-end/javascript/promise',
          '/front-end/javascript/request',
          '/front-end/javascript/dom',
          '/front-end/javascript/events',
          '/front-end/javascript/others',
        ],
      },
      {
        text: 'Vue.js',
        collapsible: true,
        children: [
          '/front-end/vue/start',
          '/front-end/vue/components',
          '/front-end/vue/extra',
          '/front-end/vue/router',
          '/front-end/vue/pinia',
          '/front-end/vue/nuxt',
        ],
      },
      {
        text: 'Node.js',
        collapsible: true,
        children: [
          '/front-end/node/modules',
          '/front-end/node/express',
          '/front-end/node/koa',
        ],
      },
      {
        text: 'ml5.js',
        collapsible: true,
        children: [
          '/front-end/ml5/p5',
          '/front-end/ml5/machine',
          '/front-end/ml5/deep',
        ],
      },
    ],
  },
  editLink: false,
})

import { defaultTheme } from 'vuepress'

export default defaultTheme({
  navbar: [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Front End',
      children: [
        '/front-end/html&css/',
        '/front-end/javascript/',
        '/front-end/vue/',
        '/front-end/node/',
      ],
    },
    {
      text: 'Blog',
      children: [
        {
          text: 'Diary',
          children: [
            '/diary/the-past',
            '/diary/2206',
            '/diary/2207',
            '/diary/2208',
            '/diary/2209',
          ],
        },
        {
          text: 'Others',
          children: ['/others/git', '/others/regexp', '/others/vim'],
        },
      ],
    },
    {
      text: 'Demo',
      children: ['/demo/2048', '/demo/mine', '/demo/sheep'],
    },
  ],
  logo: '/images/风车.png',
  repo: 'Vinter7/vinter7.github.io',
  sidebar: {
    '/Vuepress/': ['/Vuepress/Configs.md', '/Vuepress/Markdown.md'],

    '/diary/': [
      '/diary/the-past.md',
      '/diary/2206.md',
      '/diary/2207.md',
      '/diary/2208.md',
      '/diary/2209.md',
    ],
    '/others/': ['/others/git.md', '/others/regexp.md', '/others/vim.md'],
    '/demo/': ['/demo/2048', '/demo/mine', '/demo/sheep'],
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
          '/front-end/javascript/events',
          '/front-end/javascript/others',
        ],
      },
      {
        text: 'Vue.js',
        collapsible: true,
        children: [
          '/front-end/vue/essentials',
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
    ],
  },
  editLink: false,
})

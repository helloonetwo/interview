module.exports = {
  title: '面试文档',
  base: '/interview/',
  description: '面试学习',
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3] },
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: `logo.jpg` }],
    ['meta', { name: 'theme-color', content: '#1890ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],
  themeConfig: {
    lastUpdated: '上次更新',
    nav: [
      { text: '首页', link: '/' },
      { text: '数据可视化', link: '/guide/' },
      { text: '面试体系', link: '/interview/' },
      // { text: '购买课程', link: 'https://coding.imooc.com/class/445.html' },
    ],
    navbar: true,
    sidebar: {
      collapsable: false,
      '/interview/': [
        {
          title: '指南',
          collapsable: false,
          children: [''],
        },
        {
          title: '高效准备前端技术一面',
          collapsable: false,
          children: [
            '高效准备前端技术一面/html',
            '高效准备前端技术一面/css',
            '高效准备前端技术一面/js基础知识',
            '高效准备前端技术一面/浏览器基础知识点',
          ],
        },
      ],
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [''],
        },

        {
          title: '构建阶段',
          collapsable: false,
          children: [
            'base/element',
            'base/node',
            'base/vue-element-admin',
            'base/vue',
            'base/vuex',
          ],
        },
        {
          title: '基础阶段',
          collapsable: false,
          children: [
            'guide/scene',
            'guide/tech',
            'guide/canvas',
            'guide/svg',
            'guide/webgl',
            'guide/zrender',
            'guide/d3',
            'guide/three',
            'guide/highcharts',
            'guide/antv',
            'guide/echarts',
            'guide/echarts-basic',
            'guide/compare',
            'guide/bmap',
            'guide/bmap-harder',
            'guide/bmap-datav',
            'guide/bmap-webpack',
            'guide/echarts-map',
            'guide/amap',
            'guide/amap-harder',
            'guide/amap-datav',
          ],
        },
        {
          title: '数据报表项目',
          collapsable: false,
          children: ['report/guide', 'report/qa', 'report/summary'],
        },
        // {
        //   title: '数据大屏项目',
        //   collapsable: false,
        //   children: ['screen/guide'],
        // },
        // {
        //   title: '移动报表项目',
        //   collapsable: false,
        //   children: ['mobile/guide'],
        // },
      ],
    },
  },
}

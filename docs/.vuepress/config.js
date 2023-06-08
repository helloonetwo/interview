// const nav = require('./nav')
const path = require('path')
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
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'public', 'assets'),
      },
    },
  },
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
            '高效准备前端技术一面/js-基础知识',
            '高效准备前端技术一面/js-异步进阶',
            '高效准备前端技术一面/http',
            '高效准备前端技术一面/JS-Web-API-Ajax',
            '高效准备前端技术一面/JS-WEB-API-存储',
            '高效准备前端技术一面/浏览器基础知识点',
            '高效准备前端技术一面/安全防范知识点',
            '高效准备前端技术一面/性能优化',
          ],
        },
        {
          title: '前端框架及面试 vue篇',
          collapsable: false,
          children: [
            ['vue/vue', '说说你对vue的理解?'],
            ['vue/spa', '说说你对SPA（单页应用）的理解?'],
            ['vue/show_if', 'Vue中的v-show和v-if怎么理解？'],
            ['vue/new_vue', 'Vue实例挂载的过程中发生了什么?'],
            ['vue/lifecycle', '说说你对Vue生命周期的理解?'],
            ['vue/if_for', '为什么Vue中的v-if和v-for不建议一起用?'],
            ['vue/first_page_time', 'SPA（单页应用）首屏加载速度慢怎么解决？'],
            ['vue/data', '为什么data属性是一个函数而不是一个对象？'],
            ['vue/data_object_add_attrs', 'Vue中给对象添加新属性界面不刷新?'],
            ['vue/components_plugin', 'Vue中组件和插件有什么区别？'],
            ['vue/communication', 'Vue组件间通信方式都有哪些?'],
            ['vue/bind', '说说你对双向绑定的理解?'],
            ['vue/nexttick', '说说你对nexttick的理解?'],
            ['vue/mixin', '说说你对vue的mixin的理解，有什么应用场景？'],
            ['vue/slot', '说说你对slot的理解？slot使用场景有哪些？'],
            ['vue/observable', 'Vue.observable你有了解过吗？说说看'],
            ['vue/key', '你知道vue中key的原理吗？说说你对它的理解？'],
            [
              'vue/keepalive',
              '怎么缓存当前的组件？缓存后怎么更新？说说你对keep-alive的理解是什么？',
            ],
            ['vue/modifier', 'Vue常用的修饰符有哪些？有什么应用场景？'],
            [
              'vue/directive',
              '你有写过自定义指令吗？自定义指令的应用场景有哪些？',
            ],
            ['vue/filter', 'Vue中的过滤器了解吗？过滤器的应用场景有哪些？'],
            ['vue/vnode', '什么是虚拟DOM？如何实现一个虚拟DOM？说说你的思路'],
            ['vue/diff', '你了解vue的diff算法吗？说说看'],
            ['vue/axios', 'Vue项目中有封装过axios吗？主要是封装哪方面的？'],
            ['vue/axiosCode', '你了解axios的原理吗？有看过它的源码吗？'],
            ['vue/ssr', 'SSR解决了什么问题？有做过SSR吗？你是怎么做的？'],
            [
              'vue/structure',
              '说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？',
            ],
            [
              'vue/permission',
              'vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？',
            ],
            ['vue/cors', 'Vue项目中你是如何解决跨域的呢？'],
            [
              'vue/404',
              'vue项目本地开发完成后部署到服务器后报404是什么原因呢？',
            ],
            ['vue/error', '你是怎么处理vue项目中的错误的？'],
            ['vue/vue3_vue2', 'Vue3有了解过吗？能说说跟Vue2的区别吗？'],
          ],
        },
        {
          title: '前端框架及面试 vue3篇',
          collapsable: false,
          children: [
            ['vue3/goal', 'Vue3.0的设计目标是什么？做了哪些优化?'],
            ['vue3/performance', 'Vue3.0 性能提升主要是通过哪几方面体现的？'],
            [
              'vue3/proxy',
              'Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？',
            ],
            [
              'vue3/composition',
              'Vue3.0 所采用的 Composition Api 与 Vue2.x 使用的 Options Api 有什么不同？',
            ],
            [
              'vue3/treeshaking',
              '说说Vue 3.0中Treeshaking特性？举例说明一下？',
            ],
            [
              'vue3/modal_component',
              '用Vue3.0 写过组件吗？如果想实现一个 Modal你会怎么设计？',
            ],
          ],
        },
        {
          title: '前端框架及面试 变化侦测篇',
          collapsable: false,
          children: [
            ['reactive/', '综述'],
            ['reactive/object', 'Object的变化侦测'],
            ['reactive/array', 'Array的变化侦测'],
          ],
        },
        {
          title: '前端框架及面试 虚拟DOM篇',
          collapsable: false,
          children: [
            ['virtualDOM/vue的虚拟DOM', 'Vue中的虚拟DOM'],
            ['virtualDOM/patch', 'Vue中的DOM-Diff'],
            ['virtualDOM/updataChildren', '更新子节点'],
            ['virtualDOM/optimizeUpdataChildren', '优化更新子节点'],
          ],
        },
        {
          title: '前端框架及面试 模板编译篇',
          collapsable: false,
          children: [
            ['complie/', '综述'],
            ['complie/parse', '模板解析阶段(整体运行流程)'],
            ['complie/HTMLParse', '模板解析阶段(HTML解析器)'],
            ['complie/textParse', '模板解析阶段(文本解析器)'],
            ['complie/optimize', '优化阶段'],
            ['complie/codegen', '代码生成阶段'],
            ['complie/summary', '总结'],
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
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links',
    '@vuepress/nprogress',
  ],
}

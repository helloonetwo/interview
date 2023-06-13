// const nav = require('./nav')
const path = require('path')
module.exports = {
  title: '面试文档',
  base: '/interview/',
  description: '面试学习',
  // markdown: {
  //   // markdown-it-anchor 的选项
  //   anchor: { permalink: false },
  //   // markdown-it-toc 的选项
  //   toc: { includeLevel: [1, 2, 3] },
  //   lineNumbers: true,
  // },
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
      { text: '构建工具', link: '/webpack/' },
      { text: '基础及框架', link: '/interview/' },
      { text: '面试100问', link: '/100wiki/' },
      // { text: '购买课程', link: 'https://coding.imooc.com/class/445.html' },
    ],
    navbar: true,
    sidebar: {
      collapsable: true,
      '/webpack/': [
        {
          title: '指南',
          collapsable: false,
          children: [''],
        },

        {
          title: '基础阶段',
          collapsable: false,
          children: ['base/拆分配置', 'base/alias', 'base/查看项目文件体积'],
        },
        {
          title: '高级配置',
          collapsable: false,
          children: [
            'senior/多入口',
            'senior/压缩代码',
            'senior/抽离公共代码',
            'senior/处理图片',
            'senior/webpack中hash、chunkhash、contenthash区别',
          ],
        },
        {
          title: '性能优化',
          collapsable: false,
          children: [
            'optimization/性能优化-构建速度',
            'optimization/性能优化-产出代码',
            'optimization/前端为什么要打包和构建',
          ],
        },
      ],
      '/interview/': [
        {
          title: '指南',
          collapsable: false,
          children: [''],
        },
        {
          title: '高效准备前端技术一面',
          collapsable: true,
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
            '高效准备前端技术一面/内存泄漏',
          ],
        },
        {
          title: '前端框架及面试 vue篇',
          collapsable: true,
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
          collapsable: true,
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
          collapsable: true,
          children: [
            ['reactive/', '综述'],
            ['reactive/object', 'Object的变化侦测'],
            ['reactive/array', 'Array的变化侦测'],
          ],
        },
        {
          title: '前端框架及面试 虚拟DOM篇',
          collapsable: true,
          children: [
            ['virtualDOM/vue的虚拟DOM', 'Vue中的虚拟DOM'],
            ['virtualDOM/patch', 'Vue中的DOM-Diff'],
            ['virtualDOM/updataChildren', '更新子节点'],
            ['virtualDOM/optimizeUpdataChildren', '优化更新子节点'],
          ],
        },
        {
          title: '前端框架及面试 模板编译篇',
          collapsable: true,
          children: [
            ['complie/', '综述'],
            ['complie/parse', '模板解析阶段(整体运行流程)'],
            ['complie/HTMLParse', '模板解析阶段(HTML解析器)'],
            ['complie/textParse', '模板解析阶段(文本解析器)'],
            ['complie/optimize', '优化阶段'],
            ['complie/codegen', '代码生成阶段'],
            ['complie/summary', '总结'],
            ['complie/个人总结', '个人总结'],
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
      ],
      '/100wiki/': [
        {
          title: '指南',
          collapsable: true,
          children: [''],
        },
        {
          title: '前端基础知识',
          collapsable: true,
          children: [
            '前端基础知识/01-ajax-fetch-axios-区别',
            '前端基础知识/02-节流和防抖',
            '前端基础知识/03-px-em-rem-vw-vh-区别',
            '前端基础知识/04-箭头函数的缺点',
            '前端基础知识/05-TCP三次握手四次挥手',
            '前端基础知识/06-for-in和for-of的区别',
            '前端基础知识/07-offsetHeight-scrollHeight-clientHeight-区别',
            '前端基础知识/08-HTMLCollection-NodeList-区别',
            '前端基础知识/09-vue-computed-watch-区别',
            '前端基础知识/10-vue组件通讯',
            '前端基础知识/11-vuex-action-mutation-区别',
            '前端基础知识/12-JS严格模式',
            '前端基础知识/13-options请求',
            '前端基础知识/14-总结',
            '前端基础知识/x1-文本小节-前端知识体系',
            '前端基础知识/x2-文本小节-Restful-API-method',
          ],
        },
        {
          title: '分析解决问题',
          collapsable: true,
          children: [
            '分析解决问题/01-数组转树',
            '分析解决问题/02-连环问-树转数组',
            '分析解决问题/03-map-parseInt',
            '分析解决问题/04-原型',
            '分析解决问题/05-promise调用顺序',
            '分析解决问题/06-react-setState',
            '分析解决问题/07-对象赋值',
            '分析解决问题/08-对象属性赋值',
            '分析解决问题/09-函数参数',
            '分析解决问题/10-文本小节-解决问题的常见思路',
            '分析解决问题/11-总结',
          ],
        },
        {
          title: '编写高质量代码',
          collapsable: true,
          children: [
            '编写高质量代码/01-文本小节-高质量代码的特点',
            '编写高质量代码/02-array-flatten',
            '编写高质量代码/03-类型判断',
            '编写高质量代码/04-手写new',
            '编写高质量代码/05-遍历DOM树',
            '编写高质量代码/06-手写lazyman',
            '编写高质量代码/07-curry-add',
            '编写高质量代码/08-手写instanceof',
            '编写高质量代码/09-手写函数bind',
            '编写高质量代码/10-手写event-bus',
            '编写高质量代码/11-手写LRU',
            '编写高质量代码/12-深拷贝',
            '编写高质量代码/13-文本小节-dom转vdom',
            '编写高质量代码/14-总结',
          ],
        },
        {
          title: '实际工作经验',
          collapsable: true,
          children: [
            '实际工作经验/01-首屏优化',
            '实际工作经验/02-渲染10w条数据',
            '实际工作经验/03-文本小节-用CSS实现文字超出省略',
            '实际工作经验/04-设计模式',
            '实际工作经验/05-vue优化',
            '实际工作经验/06-react优化',
            '实际工作经验/08-vue错误监听',
            '实际工作经验/09-react错误监听',
            '实际工作经验/10-排查性能问题',
            '实际工作经验/11-项目难点',
            '实际工作经验/12-文本小节-处理项目沟通冲突',
          ],
        },
        {
          title: '知识广度',
          collapsable: true,
          children: [
            '知识广度/01-移动端click-300ms-延迟',
            '知识广度/02-文本小节-Retina屏幕1px宽度',
            '知识广度/03-token和cookie区别',
            '知识广度/04-http-udp区别',
            '知识广度/05-https中间人攻击',
            '知识广度/06-defer和async',
            '知识广度/08-websocket',
            '知识广度/07-前端攻击',
            '知识广度/09-输入url到页面展示',
            '知识广度/10-网页多标签通讯',
            '知识广度/11-koa2洋葱圈模型',
            '知识广度/12-文本小节-为何需要nodejs',
          ],
        },
        {
          title: '知识深度',
          collapsable: true,
          children: [
            '知识深度/01-JS内存泄漏',
            '知识深度/02-浏览器和nodejs事件循环的区别',
            '知识深度/04-vdom真的很快吗',
            '知识深度/05-for-vs-forEach',
            '知识深度/06-nodejs多进程',
            '知识深度/07-js-bridge原理',
            '知识深度/08-requestIdleCallback',
            '知识深度/09-Vue生命周期',
            '知识深度/10-vue-react-diff',
            '知识深度/11-vue-router-模式',
            '知识深度/12-总结',
            '知识深度/知识深度很重要',
          ],
        },
        {
          title: '数据结构和算法',
          collapsable: true,
          children: [
            '数据结构和算法/01-旋转数组',
            '数据结构和算法/02-括号匹配',
            '数据结构和算法/03-用两个栈实现一个队列',
            '数据结构和算法/04-反转链表',
            '数据结构和算法/05-二分查找',
            '数据结构和算法/06-两数之和',
            '数据结构和算法/07-BST第K小值',
            '数据结构和算法/08-为何二叉树重要',
            '数据结构和算法/09-斐波那契数列',
            '数据结构和算法/10-移动0',
            '数据结构和算法/11-连续最多的字符',
            '数据结构和算法/12-快速排序',
            '数据结构和算法/13-回文数字',
            '数据结构和算法/14-字符串前缀匹配',
            '数据结构和算法/15-数字千分位',
            '数据结构和算法/16-切换字母大小写',
            '数据结构和算法/17-小数相加',
            '数据结构和算法/18-总结',
            '数据结构和算法/常见数据结构',
            '数据结构和算法/常见算法时间复杂度',
          ],
        },
        {
          title: '软技能',
          collapsable: true,
          children: [
            '软技能/01-是否看过红宝书',
            '软技能/02-如何做code-review',
            '软技能/03-如何学习一门新语言',
            '软技能/04-你目前有和不足',
            '软技能/05-总结',
          ],
        },
        {
          title: '项目设计',
          collapsable: true,
          children: [
            '项目设计/01-文本小节-项目负责人的职责',
            '项目设计/03-前端统计sdk',
            '项目设计/04-SPA-MPA',
            '项目设计/05-H5编辑器',
            '项目设计/06-文本小节-何时使用SSR',
            '项目设计/07-角色权限模型',
            '项目设计/08-hybrid更新机制',
            '项目设计/09-H5抽奖页',
            '项目设计/10-技术选型',
            '项目设计/11-图片懒加载',
            '项目设计/12-文本小节-B端-C端',
            '项目设计/13-总结',
          ],
        },
      ],
    },
  },
  plugins: [
    '@vuepress/back-to-top',
    [
      '@vuepress/active-header-links',
      {
        sidebarLinkSelector: '.sidebar-link',
        headerAnchorSelector: '.header-anchor',
      },
    ],
    '@vuepress/nprogress',
  ],
}

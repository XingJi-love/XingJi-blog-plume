import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'XINGJI',

  head: [
    // 配置站点图标
    ['link',{ rel: 'icon', href: 'https://i.p-i.vip/47/20241024-67192acae3bb8.png'}],
    // 配置网监控器
    [
      "script",
      {
        async: true,
        defer: true,
        "data-website-id": "92445f67-3d16-4d40-8122-50a4b92d6e60",
        src: "https://umami.xingji.fun/script.js",
      },
    ],
  ],

  bundler: viteBundler(),
  shouldPrefetch: false, // 站点较大，页面数量较多时，不建议启用

  theme: plumeTheme({
    /* 添加您的部署域名, 有助于 SEO, 生成 sitemap */
    // hostname: 'https://your_site_url',

    /* 文档仓库配置，用于 editLink */
    // docsRepo: '',
    // docsDir: 'docs',
    // docsBranch: '',

    /* 页内信息 */
    // editLink: true,
    // lastUpdated: true,
    contributors: {
      mode: 'block',
      info: [
        {
          username: 'XingJi-love', // github username
          alias: ['XingJi-love'], // 别名，本地 git 配置中的用户名
        }
      ]
    },
    changelog: true,

    plugins: {
      // 如果您在此处直接声明为 true，则表示开发环境和生产环境都启用该功能
      git: process.env.NODE_ENV === 'production'
    },

    /**
     * 博客
     * @see https://theme-plume.vuejs.press/config/basic/#blog
     */
    // 使用 collections 配置
    collections: [
      {
        type: 'post', // 替代原博客功能
        dir: 'blog', // 指向 docs/blog 目录
        title: '博客', // 集合显示名称
        // 原博客配置继续保留
        // postList: true, // 是否启用文章列表页
        // tags: true, // 是否启用标签页
        // archives: true, // 是否启用归档页
        // categories: true, // 是否启用分类页
        // postCover: 'right', // 文章封面位置
         pagination: 10, // 每页显示文章数量
         postCover: {
          layout: 'odd-left',
          ratio: '16:9',
          width: 400,
          compact: true
        },
        social: [
          { icon: 'github', link: 'https://github.com/XingJi-love' },
          { icon: {
            svg: '<svg t="1743246120352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2356" data-darkreader-inline-fill="" width="200" height="200"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" fill="#C71D23" p-id="2357" data-darkreader-inline-fill="" style="--darkreader-inline-fill: var(--darkreader-background-c71d23, #9f171c);"></path></svg>',name: 'gitee'
                  }, 
            link: 'https://gitee.com/giteehzb',
          },
          { icon: {
            svg: '<svg t="1728183147842" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2076" data-darkreader-inline-fill="" width="200" height="200"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#1296db" p-id="2077" data-darkreader-inline-fill="" style="--darkreader-inline-fill:#0e78af;"></path></svg>',name: 'csdn'
        },
        link: 'https://blog.csdn.net/AcsdnHZB?spm=1011.2648.3001.5343',
      },
      { icon: { 
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"/></svg>',name: 'leetcode' 
        }, 
        link: 'https://leetcode.cn/u/charming-darwinhis/',
      },
      { icon: 'bilibili', link: 'https://space.bilibili.com/1289480756?spm_id_from=333.1007.0.0' },
        ],
      },
      /**
      {
        type: 'doc', // 替代原笔记功能
        dir: 'typescript', // 指向 docs/typescript 目录
        title: 'TypeScript笔记',
        linkPrefix: '/typescript/', // 页面链接前缀、侧边栏判断依据
        sidebar: 'auto', // 自动生成侧边栏
      },*/
    ],

    /* 博客文章页面链接前缀 */
    article: '/article/',

    /**
     * 编译缓存，加快编译速度
     * @see https://theme-plume.vuejs.press/config/basic/#cache
     */
    cache: 'filesystem',

    /**
     * 为 markdown 文件自动添加 frontmatter 配置
     * @see https://theme-plume.vuejs.press/config/basic/#autofrontmatter
     */
    // autoFrontmatter: {
    //   permalink: true,  // 是否生成永久链接
    //   createTime: true, // 是否生成创建时间
    //   title: true,      // 是否生成标题
    // },

    /* 本地搜索, 默认启用 */
    search: { provider: 'local' },

    /**
     * Algolia DocSearch
     * 启用此搜索需要将 本地搜索 search 设置为 false
     * @see https://theme-plume.vuejs.press/config/plugins/search/#algolia-docsearch
     */
    // search: {
    //   provider: 'algolia',
    //   appId: '',
    //   apiKey: '',
    //   indexName: '',
    // },

    /**
     * Shiki 代码高亮
     * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
     */
    codeHighlighter: {
    //   twoslash: true, // 启用 twoslash
      whitespace: true, // 启用 空格/Tab 高亮
    //   lineNumbers: true, // 启用行号
    },

    /* 文章字数统计、阅读时间，设置为 false 则禁用 */
    // readingTime: true,

    /**
      * markdown
      * @see https://theme-plume.vuejs.press/config/markdown/
      */
    markdown: {
      abbr: true,         // 启用 abbr 语法  *[label]: content
      annotation: true,   // 启用 annotation 语法  [+label]: content
      timeline: true,     // 启用时间线语法 @[timeline](title)
      collapse: true,     // 启用折叠语法
      pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      plot: true,         // 启用隐秘文本语法 !!xxxx!!
      bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
    //   icons: true,        // 启用内置图标语法  :[icon-name]:
    //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
    //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
    //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
    //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      npmTo: true,        // 启用 npm-to 容器  ::: npm-to
    //   demo: true,         // 启用 demo 容器  ::: demo
    //   repl: {             // 启用 代码演示容器
    //     go: true,         // ::: go-repl
    //     rust: true,       // ::: rust-repl
    //     kotlin: true,     // ::: kotlin-repl
    //   },
    //   math: {             // 启用数学公式
    //     type: 'katex',
    //   },
      chartjs: true,      // 启用 chart.js
      echarts: true,      // 启用 ECharts
      mermaid: true,      // 启用 mermaid
      flowchart: true,    // 启用 flowchart
      markmap: true,      // 启用 markmap
      plantuml: true,     // 启用 plantuml
    //   image: {
    //     figure: true,     // 启用 figure
    //     lazyload: true,   // 启用图片懒加载
    //     mark: true,       // 启用图片标记
    //     size: true,       // 启用图片大小
    //   },
    //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
    //   imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
      fileTree: {
      icon: 'colored', // 'simple' | 'colored'
      }
    },

    /**
     * 水印
     * @see https://theme-plume.vuejs.press/guide/features/watermark/
     */
    // watermark: true,

    /**
     * 评论 comments
     * @see https://theme-plume.vuejs.press/guide/features/comments/
     */
    comment: {
        provider: 'Twikoo', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
          comment: true, // 是否开启评论功能
          envId: 'https://twikoohzb.netlify.app/.netlify/functions/twikoo', // 评论服务地址
    //   repo: '',
    //   repoId: '',
    //   category: '',
    //   categoryId: '',
    //   mapping: 'pathname',
    //   reactionsEnabled: true,
    //   inputPosition: 'top',
    },

    /**
     * 加密功能
     * @see https://theme-plume.vuejs.press/guide/features/encryption/
     */
    // encrypt: {},
  }),
})

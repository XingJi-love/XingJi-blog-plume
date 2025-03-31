import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'material-symbols:menu-book' },
  { text: '博客', link: '/blog/', icon: 'logos:blogger' },
  { text: '标签', link: '/blog/tags/', icon: 'gis:tags-o' },
  { text: '归档', link: '/blog/archives/', icon: 'carbon:calendar' },
  { text: '友链', link: '/friends/', icon: 'carbon:friendship' },
  { text: '关于', link: '/about/', icon: 'carbon:user' },
  {
    text: '笔记',
    items: [{ text: '示例', link: '/notes/demo/README.md' }]
  },
])

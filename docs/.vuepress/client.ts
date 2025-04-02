import { defineClientConfig } from 'vuepress/client'

import './styles/index.css'
import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue' // Repo 卡片组件
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
import Swiper from 'vuepress-theme-plume/features/Swiper.vue' // 轮播图组件

// import CustomComponent from './theme/components/Custom.vue'

import AllFriendContent from './theme/components/AllFriendContent.vue' // 友链组件

// import './theme/styles/custom.css'

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    app.component('Swiper', Swiper) // you should install `swiper`
    app.component('AllFriendContent', AllFriendContent) // 友链组件

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
})

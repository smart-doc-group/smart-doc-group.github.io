import {type DefaultTheme, defineConfig} from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'Smart-Doc 官方文档',

    themeConfig: {
        carbonAds: undefined,
        nav: nav(),

        sidebar: {
            '/zh/guide/': { base: '/zh/guide/', items: sidebarGuide() }
        },

        editLink: {
            pattern: 'https://github.com/smart-doc-group/smart-doc-group.github.io/edit/master/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            message: '基于 MIT 许可发布',
            copyright: `版权所有 © 2024-${new Date().getFullYear()} smart-doc`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: '主页', link: '/zh' },
        {
            text: '指南',
            link: '/zh/guide/what-is-smart-doc',
            activeMatch: '/zh/guide/'
        },
        {
            text: '社区案例',
            items: [
                {
                    text: 'Smart-doc赋能JMeter性能压测实践',
                    link: 'https://juejin.cn/post/7365785731702865954',
                },
            ],
        },
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '简介',
            collapsed: false,
            items: [
                { text: '什么是 Smart-Doc？', link: 'what-is-smart-doc' },
                { text: '快速开始', link: 'getting-started' },
                { text: '使用指南', link: 'guide' },
                { text: '最佳实践', link: 'bestPractice' },
                { text: '示例', link: 'example' }
            ]
        },
        {
            text: '高级',
            collapsed: false,
            items: [
                { text: '配置项', link: 'advanced/config' },
                { text: '高级特性', link: 'advanced/advancedFeatures' },
                { text: '接口调试', link: 'advanced/debug' },
                { text: '扩展', link: 'advanced/expand' },
            ]
        },
        {
            text: '集成框架',
            collapsed: false,
            items: [
                { text: 'Torna', link: 'integrated/torna' },
                { text: 'Dubbo', link: 'integrated/dubbo' },
                { text: 'JAX-RS', link: 'integrated/jax-rs' },
                { text: 'JMeter', link: '/integrated/jmeter' },
                { text: 'gRPC', link: '/integrated/grpc' },
            ]
        },
        {
            text: '插件',
            collapsed: false,
            items: [
                { text: 'Maven', link: 'plugins/maven' },
                { text: 'Gradle', link: 'plugins/gradle' }
            ]
        },
        {
            text: 'FAQ',
            collapsed: false,
            items: [
                { text: '常见问题', link: 'faq/faq' },
                { text: '反馈', link: 'faq/feedback' }
            ]
        },
        {
            text: '社区',
            collapsed: false,
            items: [
                { text: '理念', link: '/community/concept' },
                { text: '开发者', link: '/community/developer' },
                { text: '贡献指南', link: '/community/contributing' },
            ]
        },
        { text: '社区案例',  link: 'use-cases' },
    ]
}


export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '取消',
                    cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    searchByText: '搜索提供者'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}
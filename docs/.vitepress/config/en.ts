import {type DefaultTheme, defineConfig} from 'vitepress'

export const en = defineConfig({
    lang: 'en-US',
    description: 'Smart-Doc Official Documentation',

    themeConfig: {
        carbonAds: undefined,
        nav: nav(),

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
        },

        editLink: {
            pattern: 'https://github.com/smart-doc-group/smart-doc-group.github.io/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present smart-doc'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: 'Home', link: '/' },
        {
            text: 'Guide',
            link: '/guide/what-is-smart-doc',
            activeMatch: '/guide/'
        },
        {
            text: 'User Case',
            items: [
                {
                    text: 'How To Use Smart-Doc To Generate JMeter Scripts',
                    link: 'https://dzone.com/articles/how-to-use-smart-doc-to-generate-jmeter-test-scripts',
                },
            ],
        },
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            items: [
                { text: 'What is Smart-Doc?', link: 'what-is-smart-doc' },
                { text: 'Getting Started', link: 'getting-started' },
                { text: 'Guidance', link: 'guide' },
                { text: 'Best Practice', link: 'bestPractice' },
                { text: 'Example', link: 'example' }
            ]
        },
        {
            text: 'Advanced',
            collapsed: false,
            items: [
                { text: 'Configuration', link: 'advanced/config' },
                { text: 'Advanced Features', link: 'advanced/advancedFeatures' },
                { text: 'Debug', link: 'advanced/debug' },
                { text: 'Expand', link: 'advanced/expand' },
            ]
        },
        {
            text: 'Integrated framework',
            collapsed: false,
            items: [
                { text: 'Torna', link: 'integrated/torna' },
                { text: 'Dubbo', link: 'integrated/dubbo' },
                { text: 'JAX-RS', link: 'integrated/jax-rs' },
                { text: 'JMeter', link: 'integrated/jmeter' },
            ]
        },
        {
            text: 'Plugins',
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
                { text: 'FAQ', link: 'faq/faq' },
                { text: 'Feedback', link: 'faq/feedback' }
            ]
        },
        {
            text: 'Community',
            collapsed: false,
            items: [
                { text: 'Concept', link: '/community/concept' },
                { text: 'Developer', link: '/community/developer' },
                { text: 'Contributing', link: '/community/contributing' },
            ]
        },
        { text: 'Use Cases',  link: 'use-cases' },
    ]
}
import {defineConfig} from 'vitepress'
import {search as zhSearch} from './zh'

export const shared = defineConfig({
    title: 'Smart-Doc',

    rewrites: {
        'en/:rest*': ':rest*'
    },

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        math: true,
        codeTransformers: [
            // We use `[!!code` in demo to prevent transformation, here we revert it back.
            {
                postprocess(code) {
                    return code.replace(/\[\!\!code/g, '[!code')
                }
            }
        ]
    },

    sitemap: {
        hostname: 'https://smart-doc-group.github.io/',
    },

    /* prettier-ignore */
    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo/smart-doc-logo.svg' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/logo/smart-doc-logo.svg' }],
        ['meta', { name: 'theme-color', content: '#96ee5f' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'Smart-Doc Documentation' }],
        ['meta', { property: 'og:site_name', content: 'Smart-Doc' }],
        ['meta', { property: 'og:url', content: 'https://smart-doc-group.github.io/' }],
    ],

    themeConfig: {
        logo: { src: '/logo/smart-doc-logo.svg', width: 24, height: 24 },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/TongchengOpenSource/smart-doc' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: { ...zhSearch }
            }
        },
    }
})
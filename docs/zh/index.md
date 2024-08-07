---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  title: Smart-Doc
  name: Smart-Doc
  text: "无侵入式的API接口文档生成器"
  tagline: Smart-Doc是一款强大的基于Java的API文档生成工具。它通过对接口源代码进行分析来生成全面而准确的文档，完全不需要对代码进行任何注入。这种非侵入式的方法确保了无需添加特殊注解或修改代码即可生成文档，使得集成变得无缝且简单。
  actions:
    - theme: brand
      text: 什么是 Smart-Doc?
      link: /zh/guide/what-is-smart-doc
    - theme: alt
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/TongchengOpenSource/smart-doc
  image:
    src: /logo/smart-doc-logo.svg
    alt: Smart-Doc

features:
  - icon: 📝️
    title: 零侵入
    details: 完全基于注释信息生成文档，实现代码零侵入。
  - icon: 📖
    title: 接口多样性
    details: 同时支持JAVA RESTful API、JAVA WebSocket和Apache Dubbo RPC接口文档
  - icon: 🔧
    title: 框架多样性
    details: 支持 Torna、Spring Boot、JAX-RS、Solon等多种框架
  - icon: 📚
    title: 文档丰富
    details: 支持生成 HTML、Asciidoc、Markdown、OpenAPI、Swagger、Postman、Word 等多种格式的文档
  - icon: 🔌
    title: 支持拓展
    details: 支持用户使用 Java SPI 对支持框架进行扩展。
---


<style lang="scss">
.VPButton.alt {
  background-color: #033b71 !important;
  border-color: #0557a5 !important;
  color: var(--vp-button-brand-text) !important;
}
.VPButton.alt:hover {
  background-color: #033b71 !important;
  border-color: #022d56 !important;
}
.clip {
  background: -webkit-linear-gradient( 180deg, #10b981 30%, #033b71) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}
#VPContent > div > div.VPHero.VPHomeHero > div > div > h1 > span {
font-size: 5rem !important;
}
#VPContent > div > div.VPHero.VPHomeHero > div > div > p.text {
  color: var(--vp-c-text-2) !important;
  font-size: 3rem !important;
}
</style>

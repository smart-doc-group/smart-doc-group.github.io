---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  title: Smart-Doc
  name: Smart-Doc
  text: "A non-intrusive API interface document generator"
  tagline: Smart-Doc is a Java-based API documentation generation tool. It generates comprehensive and accurate documentation by analyzing the source code of your interfaces, requiring no special annotations or modifications in your code, making integration seamless and simple.
  actions:
    - theme: brand
      text: What is Smart-Doc?
      link: /guide/what-is-smart-doc
    - theme: alt
      text: Quickstart
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/TongchengOpenSource/smart-doc
  image:
    src: /logo/smart-doc-logo.svg
    alt: Smart-Doc

features:
  - icon: 📝️
    title: Zero Intrusion
    details: Generate documentation entirely based on annotations, achieving zero code intrusion.
  - icon: 🔗
    title: Interface Diversity
    details: Supports generating documentation for Java RESTful APIs, Java WebSocket interfaces, Apache Dubbo RPC, and gRPC interfaces.
  - icon: 🔧
    title: Framework Diversity
    details: Supports multiple frameworks including Spring Boot, JAX-RS, and Solon.
  - icon: 📚
    title: Rich Documentation
    details: Capable of generating documentation in various formats such as HTML, Asciidoc, Markdown, OpenAPI, Swagger, Postman, and Word
  - icon: 🔌
    title: Extendable
    details: Allows users to extend supported frameworks using Java SPI.
  - icon: 🚀
    title: Document collaboration
    details: Smart-Doc and Torna combine to form an industry-leading documentation solution. Smart-Doc non-intrusively generates API documentation from Java code and automatically synchronizes it with the Torna enterprise-level document management platform, significantly enhancing the productivity and collaboration levels of development teams.
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

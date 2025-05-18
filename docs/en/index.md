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
    details: Smart-Doc and Torna create an industry-leading documentation solution. Smart-Doc non-intrusively generates API docs and syncs them with Torna's platform, enhancing team productivity and collaboration.
---


<link rel="stylesheet" href="/css/home.css">

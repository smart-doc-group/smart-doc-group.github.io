# What is Smart-Doc?


| Badge                   | Image                                                                                                                                                                              |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Maven Version           | [![maven](https://img.shields.io/maven-central/v/com.ly.smart-doc/smart-doc)](https://img.shields.io/maven-central/v/com.ly.smart-doc/smart-doc)                                   |
| License                 | [![License](https://img.shields.io/badge/license-Apache%202-green.svg)](https://www.apache.org/licenses/LICENSE-2.0)                                                               |
| Number of Closed Issues | [![number of issues closed](https://img.shields.io/github/issues-closed-raw/smart-doc-group/smart-doc)](https://img.shields.io/github/issues-closed-raw/smart-doc-group/smart-doc) |
| Closed Pull Requests    | [![closed pull requests](https://img.shields.io/github/issues-pr-closed/smart-doc-group/smart-doc)](https://img.shields.io/github/issues-pr-closed/smart-doc-group/smart-doc)      |
| Java Version            | [![java version](https://img.shields.io/badge/JAVA-1.8+-green.svg)](https://img.shields.io/badge/JAVA-1.8+-green.svg)                                                              | |
| Gitee Star              | [![gitee star](https://gitee.com/smart-doc-team/smart-doc/badge/star.svg)](https://gitee.com/smart-doc-team/smart-doc/badge/star.svg)                                              |
| GitHub Star             | [![git star](https://img.shields.io/github/stars/smart-doc-group/smart-doc.svg)](https://img.shields.io/github/stars/smart-doc-group/smart-doc.svg)                                |


## Introduce
`smart-doc [smɑːt dɒk]` is a tool that supports automatic generation of documentation for `JAVA REST API`, `JAVA WebSocket`, `Apache Dubbo RPC`, and `gRPC` interfaces.
It generates documentation by analyzing the source code of the interfaces, achieving zero annotation intrusion.
During development, you only need to write `Javadoc` comments, and `smart-doc` will help generate documents in `Markdown` or `HTML5` format. 
Unlike Swagger, which requires annotations in the code, `smart-doc` does not require any annotations to be injected into the code.
<div class="tip custom-block" style="padding-top: 8px">

Just want to try it out? Skip to the [Quickstart](getting-started).

</div>

## Features

- Zero annotation, zero learning cost, only need to write standard `JAVA` document comments.
- Automatic derivation based on source code interface definition, powerful return structure derivation support.
- Support `Spring MVC`, `Spring Boot`, `Spring Boot Web Flux` (Not support endpoint), `Feign`,`JAX-RS`.
- Supports the derivation of asynchronous interface returns such as `Callable`, `Future`, `CompletableFuture`.
- Support `JSR-303`parameter verification specification.
- Support for automatic generation of request examples based on request parameters.
- Support for generating `JSON` return value examples.
- Support for loading source code from outside the project to generate field comments (including the sources jar
  package).
- Support for generating multiple formats of documents: `Markdown`,`HTML5`,`Word`,`Asciidoctor`,`Postman Collection 2.0+`,`OpenAPI 3.0`.
- Support the generation of `JMeter` performance testing scripts
- Support for exporting error codes and data dictionary codes to `API` documentation.
- The `debug` html5 page fully supports file upload and download testing.
- Support `Apache Dubbo RPC`.
- Support `gRPC`.
- Support `Java WebSocket`

## Best Practice

`smart-doc`, in conjunction with [Torna](http://torna.cn/), builds an industry-leading solution for documentation generation and management. By using `smart-doc`, developers can non-intrusively analyze `JAVA` source code and extract annotations to generate `API` documentation, which is then automatically uploaded to the Torna enterprise-level API documentation management platform.
![smart-doc + Torna](/assets/smart-doc-en.png)

[smart-doc+Torna Full document process automation](integrated/torna#full-document-process-automation)

> Torna is an open source API document management system, developed by the `smart-doc` official team. Torna provides convenience for enterprise API document management.

## License

`smart-doc` is under the Apache 2.0 license. See the [LICENSE](https://github.com/smart-doc-group/smart-doc/blob/master/LICENSE) file for details.

**PS:** Smart-doc source code files are all with copyright notes. Please keep the original copyright when using the key code for the second open source, otherwise you will be responsible for the consequences!

## Who is using

> These are only part of the companies using `smart-doc`, for reference only. If you are using `smart-doc`, please [add your company here](https://github.com/smart-doc-group/smart-doc/issues/12) to tell us your scenario to make smart-doc better.

<div style="display: flex; flex-wrap: wrap;">
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/iflytek.png" alt="iflytek" title="科大讯飞">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/oneplus.png" alt="oneplus" title="一加">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/xiaomi.png" alt="xiaomi" title="小米">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/shunfeng.png" alt="shunfeng" title="顺丰">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/ly.jpeg" alt="ly" title="同程旅行" style="width: 160px; height: 70px;">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/kuishou.png" alt="kuishou" title="快手">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/mafengwo.png" alt="mafengwo" title="马蜂窝">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/yunda.png" alt="yunda" title="韵达速递" style="width: 192px; height: 64px;">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/zhongtongzhiyun.png" alt="zhongtongzhiyun" title="中通智运">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/tcsklogo.jpeg" alt="tcsklogo" title="同程数科" style="width: 170px; height: 64px;">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/flipboard.png" alt="flipboard" title="红板报">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/dianxin.png" alt="dianxin" title="中国电信">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/yidong.png" alt="yidong" title="中国移动">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/neusoft.png" alt="neusoft" title="东软集团">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/zhongkezhilian.png" alt="zhongkezhilian" title="中科智链" style="width: 240px; height: 64px;">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/hand-logo.svg" alt="hand-logo" title="上海汉得信息技术股份有限公司" style="width: 240px; height: 64px;">
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/known-users/yuanmengjiankang.png" alt="yuanmengjiankang" title="远盟健康" style="width: 230px; height: 64px;">
    </div>
</div>




## Acknowledgements
Thanks to [JetBrains SoftWare](https://www.jetbrains.com) for providing free Open Source license for this open source project.
<img src="/assets/jetbrains-variant-3.png" alt="jetbrains" width="260px" height="220px"/>


## Contact

Email： opensource@ly.com
Twitter：https://x.com/shalousun

# Smart-Doc 是什么？ {#what-is-smart-doc}

| Badge                   | Image                                                                                                                                                                              |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Maven Version           | [![maven](https://img.shields.io/maven-central/v/com.ly.smart-doc/smart-doc)](https://img.shields.io/maven-central/v/com.ly.smart-doc/smart-doc)                                   |
| License                 | [![License](https://img.shields.io/badge/license-Apache%202-green.svg)](https://www.apache.org/licenses/LICENSE-2.0)                                                               |
| Number of Closed Issues | [![number of issues closed](https://img.shields.io/github/issues-closed-raw/smart-doc-group/smart-doc)](https://img.shields.io/github/issues-closed-raw/smart-doc-group/smart-doc) |
| Closed Pull Requests    | [![closed pull requests](https://img.shields.io/github/issues-pr-closed/smart-doc-group/smart-doc)](https://img.shields.io/github/issues-pr-closed/smart-doc-group/smart-doc)      |
| Java Version            | [![java version](https://img.shields.io/badge/JAVA-1.8+-green.svg)](https://img.shields.io/badge/JAVA-1.8+-green.svg)                                                              | |
| Gitee Star              | [![gitee star](https://gitee.com/smart-doc-team/smart-doc/badge/star.svg)](https://gitee.com/smart-doc-team/smart-doc/badge/star.svg)                                              |
| GitHub Star             | [![git star](https://img.shields.io/github/stars/smart-doc-group/smart-doc.svg)](https://img.shields.io/github/stars/smart-doc-group/smart-doc.svg)                                |

> smart-doc是一款同时支持JAVA REST API、JAVA WebSocket和Apache Dubbo RPC接口文档生成的工具。

## 概述
`smart-doc[smɑːt dɒk]`在业内率先提出基于`JAVA`泛型定义推导的理念， 完全基于接口源码来分析生成接口文档，不采用任何注解侵入到业务代码中。
你只需要按照`java-doc`标准编写注释， `smart-doc`就能帮你生成一个简易明了的`Markdown`、`HTML5`、`Postman Collection2.0+`、`OpenAPI 3.0+`的文档。

> 无论你是很有经验的大佬、还是刚入行的萌新。遇到使用疑惑时，我们希望你能仔细阅读smart-doc官方文档。我们将smart-doc及其插件的 每一个配置项和可能在日常中遇到的问题都整理到了文档中。仔细阅读文档就是对开源项目最大的支持。

<div class="tip custom-block" style="padding-top: 8px">

查看[快速开始](getting-started)了解详情。

</div>


## 特性

- 零注解、零学习成本、只需要写标准`JAVA`注释。
- 基于源代码接口定义自动推导，强大的返回结构推导。
- 支持`Spring MVC`、`Spring Boot`、`Spring Boot Web Flux`(`Controller`书写方式)、`Feign`。
- 支持`Callable`、`Future`、`CompletableFuture`等异步接口返回的推导。
- 支持`JavaBean`上的`JSR303`参数校验规范，包括分组验证。
- 对`JSON`请求参数的接口能够自动生成模拟`JSON`参数。
- 对一些常用字段定义能够生成有效的模拟值。
- 支持生成`JSON`返回值示例。
- 支持从项目外部加载源代码来生成字段注释(包括标准规范发布的jar包)。
- 支持生成多种格式文档：`Markdown`、`HTML5`、`Word`、`Asciidoctor`、`Postman Collection`、`OpenAPI 3.0`。 开放文档数据，可自由实现接入文档管理系统。
- 支持导出错误码和定义在代码中的各种字典码到接口文档。
- 支持生成`JMeter`性能测试脚本。
- 支持`Maven`、`Gradle`插件式轻松集成。
- 支持`Apache Dubbo RPC`接口文档生成。
- 支持普通`Java`类生成`javadoc`文档。
- 支持基于`Git`管理项目的变更增量文档生成。
- `debug`接口调试`html5`页面完全支持文件上传，下载(`@download tag`标记下载方法)测试。


## 最佳实践

`smart-doc` + [Torna](http://torna.cn/) 组成行业领先的文档生成和管理解决方案，使用`smart-doc`无侵入完成`JAVA`源代码分析和提取注释生成`API`文档，自动将文档推送到`Torna`企业级接口文档管理平台。
![smart-doc + Torna](/assets/smart-to-torna.png)

[smart-doc+Torna文档自动化](integrated/torna#文档全流程自动化)

> Torna是由smart-doc官方独家推动联合研发的企业级文档管理系统，因此smart-doc官方不会对接其它任何的外部文档管理系统，例如像showdoc、yapi 之类的对接请自定内部处理，也不要再给我们提其他文档系统对接的PR。我们核心是把smart-doc+Torna的这套方案打造好


## TODO
- `GRPC`

## Contact

愿意参与构建`smart-doc`或者是需要交流问题可以扫描微信二维码发送`smart-doc`备注信息后管理员拉进群，[常见问题答疑](faq/faq)
<div style="display: flex; flex-wrap: wrap;">
    <div style="margin-right: 10px;">
        <img src="/assets/wechat.png" title="微信群" width="200px" height="210px"/>
    </div>
    <div style="margin-right: 10px;">
        <img src="/assets/smart-doc-qq2.jpeg" title="QQ群2" width="200px" 
height="210px"/>
    </div>
</div>


> QQ1群已满，有问题请加微信群或者QQ群2。


## 谁在使用

> 排名不分先后，更多接入公司，欢迎在[此处](https://github.com/smart-doc-group/smart-doc/issues/12)登记（仅供开源用户参考）

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



## 获奖情况

- 2020 年度 OSC 中国开源项目评选”活动中获得「最积极运营项目」


## 致谢
感谢[JetBrains SoftWare](https://www.jetbrains.com) 为本开源项目提供的免费Open Source license。<br/>
<img src="/assets/jetbrains-variant-3.png" alt="jetbrains" width="260px" height="220px"/>

## License

`smart-doc` is under the Apache 2.0 license. See the [LICENSE](https://github.com/smart-doc-group/smart-doc/blob/master/LICENSE) file for details.

**注意：** `smart-doc`源代码文件全部带有版权注释，使用关键代码二次开源请保留原始版权，否则后果自负！
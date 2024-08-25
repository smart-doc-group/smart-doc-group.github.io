# Torna   <Badge type="tip" text="^2.0.9" />
## 简介
自从`2018`年开源以来，`smart-doc`不断收到用户的积极反馈，其中许多企业用户表达了对集中化`API`管理平台的需求。
尽管`Yapi`在国内开源市场中曾是一款广受欢迎的工具，但在`smart-doc`作者的长期观察下发现它存在一些不足之处。
因此，在`2020`年，我们积极在社区中寻找合适的合作伙伴，共同开发一款新的企业级`API`文档管理平台。
幸运的是，我们遇到了@tanghc，一位有着丰富开源经验的开发者，并且热衷于开源事业。经过深入交流后，我们与@tanghc达成一致意见，共同启动了`torna`项目，旨在为开源社区提供一套优秀的文档生成与管理解决方案。
## 文档全流程自动化
`smart-doc` 结合 [Torna](http://torna.cn) 联手构建了一套行业领先的文档生成与管理解决方案。通过 `smart-doc`，您可以在无需侵入性代码改动的情况下，
直接从 `Java` 源代码中分析并提取注释来生成高质量的 `API` 文档。这些文档随后会自动推送到 `Torna` 这一企业级接口文档管理平台上，
实现文档的统一管理和高效维护。


![smart-doc+torna](/assets/smart-to-torna.png)

>需要从smart-doc 2.0.9才支持推送文档到torna，当然推荐使用smart-doc同学关注新版本的发布。推荐smart-doc和torna都使用最新的版本。
## 如何把文档自动推送到torna
首先是在`Java`的`Spring`项目中集成`smart-doc`。`smart-doc`的集成看`smart-doc`官方的其他文档。其实`smart-doc`一直的理念都是让使用变的简单。因此要把文档推送到`smart-doc`也很简单，只需要在`smart-doc.json`文件中添加几行推送到`torna`的配置

```
{
  "serverUrl": "http://127.0.0.1", //服务器地址,非必须。导出postman建议设置成http://{{server}}方便直接在postman直接设置环境变量
  "isStrict": false, //是否开启严格模式
  "outPath": "", //指定文档的输出路径,maven插件不需要，gradle插件必须
  "packageFilters": "",//controller包过滤，多个包用英文逗号隔开
  "projectName": "smart-doc",//配置自己的项目名称
  "appToken": "c16931fa6590483fb7a4e85340fcbfef", //torna平台appToken,@since 2.0.9
  "appKey": "20201216788835306945118208",//torna平台对接appKey，torna 1.11.0版本后不再需要, @since 2.0.9,
  "secret": "W.ZyGMOB9Q0UqujVxnfi@.I#V&tUUYZR",//torna平台secret，torna 1.11.0版本后不再需要，@since 2.0.9
  "openUrl": "http://localhost:7700/api",//torna平台地址，填写自己的私有化部署地址@since 2.0.9
  "debugEnvName":"测试环境", //torna测试环境
  "replace": true,//推送torna时替换旧的文档
  "debugEnvUrl":"http://127.0.0.1",//torna
}
```

**注意：**  `appKey`,`appToken`,`secret`如果你不是管理员需要去问管理员了解你推送的项目具体的相关信息。

> Torna从1.11.0版本开始，使用smart-doc推送文档数据已经不再需要配置appKey和secret，
仅需要配置appToken即可，因此建议升级Torna版本。

如果你是管理员可以在`torna`的空间管理中查看。

查看空间里相关项目的`token`

![输入图片说明](/assets/224356_2bc8c3b7_144669.png "屏幕截图.png")

## 推送操作
集成`smart-doc`并完成推送配置后，就可以使用利用`smart-doc`的`Maven`或者是`Gradle`插件来直接把文档推送到`torna`中了。
![输入图片说明](/assets/224947_853e59e3_144669.png "屏幕截图.png")
> 如果你想使用命令行或者是gradle，请查看smart-doc官方maven和gradle插件使用的文档，此处不再赘述。
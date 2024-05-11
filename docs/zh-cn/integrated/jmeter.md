# 简介

`smart-doc`从`3.0.1`版本开始支持`JMeter`性能测试的生成，做到为测试赋能。

## 生成JMeter脚本
通常在开发生成文档的时候已经集成好`smart-doc`。直接使用`Maven`或者`Gradle`插件的里生成`JMeter`性能测试脚本的`Mojo`或`Task`执行即可。
运行后将生成`.jmx`文档导入`JMeter`即可。当然目前生成的脚本相对比较基础，缺乏高阶的函数支持。

maven插件操作参看

![idea-jmeter](https://github.com/smart-doc-group/smart-doc-group.github.io/raw/master/docs/_images/idea-jmeter.png)

从`3.0.4`版本开始新增了添加`Prometheus Listener`的功能，如果需要添加`Prometheus Listener`，则需要在`smart-doc.json`中添加`addPrometheusListener`配置。

```json
{
  "jmeter": {
    "addPrometheusListener": true
  }
}
```


## 导入JMeter
- 首先从`Apache`官方网站下载最新的`JMeter`，[JMeter Download](https://jmeter.apache.org/download_jmeter.cgi)
- 启动`JMeter`。根据自己的系统去启动`JMeter`，通常`Mac`或者`Linux`直接用`jmeter.sh`脚本启动即可。

将`smart-doc`生成的脚本导入`JMeter`后根据自己情况调整下即可测试。

![jmeter-example.png](https://github.com/smart-doc-group/smart-doc-group.github.io/raw/master/docs/_images/jmeter-example.png)

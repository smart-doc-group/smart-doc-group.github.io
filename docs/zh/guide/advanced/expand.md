# 扩展开发

## 自定义开发扩展

`smart-doc`将扫描后分析后的数据做了数据开放接口，开放了两种类型的`API`数据结构，一种是平铺可直接渲染的，
另外一种`API`的参数关系准换成了树状结构的方式。可以根据自己需要去选择使用不同的数据接口。

开发案例：
1. 如使用`smart-doc`的开放接口获取到数据后，开发工具生成一个`Jemeter`性能测试脚本。
2. 获取到`API`接口文档的数据后，开发工具生成自动化测试脚本
3. 开发工具将`smart-doc`的数据导入到一些`API`文档管理系统( **ps:不要过多指望`smart-doc`官方去对接市面上的开源文档管理系统，因为没有谁成为了行业技术标准而让我们可以动心去支持** )

开发集成推荐：对于使用`smart-doc`的开放数据来开发工具的同学，建议自己单独建工具项目将`smart-doc`作为开源组件依赖进入。
如果你`fork`后修改很难跟随官方升级`smart-doc`这个底层组件。
### 文档数据获取
自`1.7.0`版本开始`smart-doc`开放了扫描源代码后生成的`API`接口相关信息数据，即`smart-doc`当前用于渲染`markdown`、`html`等格式文档的数据，
获取数据 的操作很简单,如果自己团队有能力自己开发文档管理系统，那你完全从`smart-doc`获取到的接口文档数据存入到自己的文档管理系统中，
`smart-doc`对每个`Controller`的名称和每个接口方法名称都自动做了`md5`签名，基本保证了唯一性，你完全可以直接将文档数据结构化后存入到文档管理系统在做管理和展示。

```java
/**
    * 包括设置请求头，缺失注释的字段批量在文档生成期使用定义好的注释
    */
@Test
public void testBuilderControllersApi() {
    //config的配置信息请参考其他例子
    ApiConfig config = new ApiConfig();
    
    //1.7.9版本后使用如下，该接口用于获取平面式的参数列表数据，如果想自己渲染其他文档，可使用该数据来直接渲染。
    ApiAllData apiAllData = ApiDataBuilder.getApiData(config);
    // 1.9.2版本后开始新增，该接口获取的数据是将参数列表转换成了树形接口，在对接其他文档管理可以从该接口获取数据方便处理。
    ApiAllData docList = ApiDataBuilder.getApiDataTree(config);
    
}
```
字段信息如下：

Field | Type|Description|Since
---|---|---|---
projectName|string|项目名称|-
projectId|string|项目id,名称做md5生成|-
language|string|文档生语言(自定义模板可使用)|-
apiDocList|array|接口文档列表|-
└─order|int32|controller的顺序，smart-doc自动排序生成|1.7+
└─name|string|controller类名|-
└─alias|string|controller名称做md5后的别名|1.7+
└─list|array|controller中的接口列表|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─methodId|方法id，使用controller+method做md5取32位|1.7.3 +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|method name|1.7.3 +
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─order|int32|接口序号，自动排序|1.7+
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─desc|string|method description|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─detail|string|detailed introduction of the method|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─url|string|controller method url|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─author|string|接口作者名称|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|http request type|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─headers|string|string类型的header拼接，只是为了在模板渲染是减少headers的渲染次数|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─contentType|string|http contentType|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─requestHeaders|array|http request headers|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|Request header name|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|Request header type|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─desc|string|Request header description|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─required|boolean|required flag|1.7.0
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─since|string|Starting version number|1.7.0
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─requestParams|array|http request params|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─field|string|field|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|field type|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─desc|string|description|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─required|boolean|require flag|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|string|version|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─requestUsage|string|http request usage|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─responseUsage|string|http response usage|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─responseParams|array|http response params|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─field|string|field|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|field type|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─desc|string|description|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─required|boolean|require flag|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─version|string|version|-
└─desc|string|method description|-
apiDocDictList|array|枚举字典列表|-
└─order|int32|字典顺序|-
└─title|string|字典名称|-
└─dataDictList|array|枚举字典表|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─value|string|字典码|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─type|string|字典值类型|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─desc|string|字典描述|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ordinal|int32|枚举顺序|-
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─name|string|枚举顺序|-
errorCodeList|array|枚举错误列表|-
└─value|string|错误码|-
└─type|string|错误码类型|-
└─desc|string|错误码描述|-
└─ordinal|int32|枚举错误码的顺序|-
└─name|string|枚举名称|-
revisionLogs|array|文档变更记录|-
└─version|string|version|-
└─status|string|status|-
└─author|string|author|-
└─revisionTime|string|update time|-
└─remarks|string|description|-


 **注意：** `1.7.9`后获取数据接口有变更，需要自行渲染模板的，以最终数据为重。`ApiDataBuilder`。



## ~~其他框架文档解析开发~~
:::warning
`@since 3.0.6` 之后，可以不修改源码了~
:::

`smart-doc`目前支持`Spring`技术栈`Web`和`Apache Dubbo`层面的解析。由于官方开源人力有限，因此无法去满足解析其他的`web`层框架。
当然要`Web`层面的框架，一般需要框架需要满足下面的条件：
- 框架使用明确的注解路由(通俗就是说类似`Spring`的`Controller`有明确的注解申明`path`路径)，也可以是类似`Jakarta RS-API 2.x`规范的实现框架。

下面来看下实现支持编写。

### 编写框架的文档构建解析实现模板
这里拿当前`Java`比较火的一个云原生框架`Quarkus`为例。如果在`smart-doc`上支持`Quarkus`。
那么首先在`smart-doc`的`com.power.doc.template`包下新建一个`QuarkusDocBuildTemplate`, `QuarkusDocBuildTemplate`实现`IDocBuildTemplate`接口。代码如下：

```java
/**
 * @author yu 2021/6/28.
 */
public class QuarkusDocBuildTemplate implements IDocBuildTemplate<ApiDoc>{

    /**
     * 生成整个项目的文档数据
     * @param projectBuilder
     * @return
     */
    @Override
    public List<ApiDoc> getApiData(ProjectDocConfigBuilder projectBuilder) {
        return null;
    }

    /**
     * 生成单个接口类的文档(不要求实现，官方不支持)
     * @param projectBuilder
     * @param apiClassName
     * @return
     */
    @Override
    public ApiDoc getSingleApiData(ProjectDocConfigBuilder projectBuilder, String apiClassName) {
        return null;
    }

    @Override
    public boolean ignoreReturnObject(String typeName, List<String> ignoreParams) {
        return false;
    }
}
```
然后自己结合`Quarkus`的使用和参照目前的`SpringBootDocBuildTemplate`实现把`QuarkusDocBuildTemplate`生成接口数据的实现补充完整。

### 修改框架支持枚举
修改`com.power.doc.constants`中的`FrameworkEnum`, 添加`Quarkus`。

```java
/**
 * Smart-doc Supported Framework
 *
 * @author yu 2021/6/27.
 */
public enum FrameworkEnum {

    /**
     * Apache Dubbo
     */
    DUBBO("dubbo", "com.power.doc.template.RpcDocBuildTemplate"),

    /**
     * Spring Framework
     */
    SPRING("spring", "com.power.doc.template.SpringBootDocBuildTemplate"),

    /**
     * Quarkus Framework
     */
    QUARKUS("quarkus","com.power.doc.template.QuarkusDocBuildTemplate");

    // 省略多行

}
```

### 使用新添加的框架解析
然后在项目中使用`smart-doc`时配置自己使用的框架名称。`smart-doc`默认是`Spring`, 因此新加的框架使用时需要配置中指定。

```json
{
  "serverUrl": "http://127.0.0.1",
  "isStrict": false,
  "allInOne": true,
  "outPath": "D://md2",
  "framework": "quarkus"
}
```
开发流程就是这样，主要的难点在于`IDocBuildTemplate`的实现处理。


## 其他框架文档解析开发（基于`JAVA SPI`） <Badge type="tip" text="^3.0.6" />
:::tip
`@since 3.0.6` 开始，支持不修改源码的情况下，新增其他框架文档的解析🎉
:::

目前支持`Spring`技术栈`Web`、`Apache 
Dubbo`层面的解析。由于官方开源人力有限，因此无法去满足解析其他的`web`层框架。
当然要`Web`层面的框架，一般需要框架需要满足下面的条件：
- 框架使用明确的注解路由(通俗就是说类似`Spring`的`Controller`有明确的注解申明`path`路径)，也可以是类似`Jakarta RS-API 2.x`规范的实现框架。


下面来看下实现支持编写。
### 插件引入开发
新增一个`smart-doc`的解析扩展项目或模块，用于扩展解析一些自定义的框架，在扩展项目中引入`smart-doc`官方的依赖。对于企业内部框架通用解析，推荐采用独立项目来构建扩展解析能力
#### 核心代码编写
新增一个模块或项目，引入`smart-doc`依赖
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.github.test</groupId>
    <artifactId>smart-doc-extend</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>


    <dependencies>
        <dependency>
            <groupId>com.ly.smart-doc</groupId>
            <artifactId>smart-doc</artifactId>
            <version>[最新版]</version>
        </dependency>
    </dependencies>
</project>
 ```
实现`com.power.doc.spi.DocBuildTemplate`接口，如果要获取`WebSocket`文档，则实现`com.ly.doc.template.IWebSocketDocBuildTemplate`接口，并实现相关方法, 
示例代码如下：
```java
package com.github.test;

import com.ly.doc.builder.ProjectDocConfigBuilder;
import com.ly.doc.model.ApiDoc;
import com.ly.doc.model.ApiSchema;
import com.ly.doc.model.annotation.FrameworkAnnotations;
import com.ly.doc.template.IDocBuildTemplate;
import com.thoughtworks.qdox.model.JavaClass;

import java.util.Collection;

/**
 * QuarkusDocBuildTemplate.
 *
 * @author test
 * @version 1.0.0
 * @since 2024-07-02 13:43:50
 */
public class QuarkusDocBuildTemplate implements IDocBuildTemplate<ApiDoc> {

    /**
     * render api
     *
     * @param projectBuilder   ProjectDocConfigBuilder
     * @param candidateClasses candidate classes
     * @return api ApiSchema
     */
    @Override
    public ApiSchema<ApiDoc> renderApi(ProjectDocConfigBuilder projectBuilder, Collection<JavaClass> candidateClasses) {
        return null;
    }

    /**
     * support framework.
     *
     * @param framework framework
     * @return boolean
     */
    @Override
    public boolean supportsFramework(String framework) {
        // 匹配
        return "Quarkus".equalsIgnoreCase(framework);
    }

    /**
     * registered annotations.
     *
     * @return registered annotations
     */
    @Override
    public FrameworkAnnotations registeredAnnotations() {
        return null;
    }

    /**
     * is entry point.
     *
     * @param javaClass            javaClass
     * @param frameworkAnnotations frameworkAnnotations
     * @return is entry point
     */
    @Override
    public boolean isEntryPoint(JavaClass javaClass, FrameworkAnnotations frameworkAnnotations) {
        return false;
    }
}

```

然后在 `resources/META-INF/services/com.ly.doc.spi.DocBuildTemplate` 文件中添加实现类的全类名。如果是`WebSocket`文档则在`resources/META-INF/services/com.ly.doc.template.IWebSocketDocBuildTemplate` 文件中添加实现类的全类名。

如下图所示：
![project](/assets/project-screenshots.png)
#### 安装或部署
将项目打包成`jar`包，并安装到本地仓库或发布到远程仓库。

#### 使用新添加的框架解析
调整 `smart-doc-maven-plugin` 插件依赖配置，新增上述项目的依赖：
```xml
      <plugin>
        <groupId>com.ly.smart-doc</groupId>
        <artifactId>smart-doc-maven-plugin</artifactId>
        <version>[最新版]</version>
        <configuration>
          <!--指定生成文档的使用的配置文件-->
          <configFile>./src/main/resources/smart-doc.json</configFile>
          <!--指定项目名称-->
          <projectName>测试</projectName>
        </configuration>
        <dependencies>
        <dependency>
            <!--引入上一步安装或部署的新增模块-->
            <groupId>com.github.test</groupId>
            <artifactId>smart-doc-extend</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
      </plugin>
```

在项目中使用 `smart-doc` 时配置所使用的框架名称。默认情况下，`smart-doc` 使用 `Spring`，因此新加的框架需在配置文件中指定：
`smart-doc.json` 文件中修改 `framework` 配置：
```json
{
  "serverUrl": "http://127.0.0.1",
  "isStrict": false,
  "allInOne": true,
  "outPath": "D://md2",
  "framework": "quarkus"
}
```

#### 🙌保持 `smart-doc` 非侵入性特性的方法
这种方法可以很好地保持 `smart-doc` 的非侵入性特性，最终的部署产品将不会包含与 `smart-doc` 相关的依赖。这也是官方推荐的方式。
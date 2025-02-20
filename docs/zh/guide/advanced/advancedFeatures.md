# 高级特性

## 公共请求头 <Badge type="tip" text="^2.2.2" />

**requestHeaders**

在`smart-doc 2.2.2`以前的版本中，在`smart-doc.json`中设置请求头是这样的

```json
{
    "requestHeaders": [ //设置请求头，没有需求可以不设置
        {
            "name": "token", //请求头名称
            "type": "string", //请求头类型
            "desc": "desc", //请求头描述信息
            "value": "kk", //不设置默认null
            "required": false, //是否必须
            "since": "-", //什么版本添加的改请求头
            // since 2.2.2
            "pathPatterns": "/app/test/**", //只有以/app/test/开头的url才会有此请求头
            "excludePathPatterns": "/app/login" // 登录url=/app/page/将不会有该请求头
        }
    ]
}
```

很多用户在`issue`中说他们的`token`是通过拦截器拦截的，并没有显示的在接口层面去申明请求头。在`2.2.2`版本开始，我们增加了两个配置属性：

- `pathPatterns` 配置请求头的作用路径，和拦截器配置`pathPatterns`一致的，多个正则式之间用逗号隔开。
- `excludePathPatterns` 配置在那些`path`上忽略该请求头。和拦截器的`excludePathPatterns`一致的，多个正则式之间用逗号隔开。

> smart-doc 完全参考了Spring的PathMatcher进行路径匹配，因此相关的路径正则规则也与PathMatcher一致。在使用前，
请务必熟悉PathMatcher并编写正确的正则表达式，以避免配置后的效果与预期不符。


## 公共请求参数 <Badge type="tip" text="^2.2.3" />

### **requestParams**

```json
{
    "requestParams": [
        {
            "name": "configPathParam", //请求参数名称
            "type": "string", //请求参数类型
            "desc": "desc", //请求参数描述信息
            "paramIn": "path", // path 或者query
            "value": "testPath", //不设置默认null
            "required": false, //是否必须
            "since": "-", //什么版本添加的改请求参数
            "pathPatterns": "/**", //正则表达式过滤请求, 所有参数都会有此参数
            "excludePathPatterns": "/app/page/**" //参考请求头中的用法
        }
    ]
}
```

#### `paramIn`
* `path`: `path`参数, `id`为公共请求参数

```java
/**
 * 接收数组类型pathVariable
 * @return
 */
@GetMapping("/test/{id}")
public CommonResult<String[]> testPathVariable(@PathVariable("id") String[] id ) {
    return CommonResult.ok().setResult(id);
}
```

* `query`: `query`参数, `configQueryParam`为公共请求参数

```java
/**
 * post请求测试query参数
 *
 * @tag 顶顶顶到达
 * @author cqmike
 * @return
 */
@PostMapping("configQueryParamPost")
public CommonResult<Void> configQueryParamPost(String configQueryParam) {

    return CommonResult.ok();
}
```

## ~~静态常量替换~~ <Badge type="danger" text="^2.4.2" />
:::tip
**`@sice 2.4.2`版本开始，这个配置无需再手动添加，`smart-doc`可以自动识别静态常量的使用。**
:::

在`Java Web`接口开发的过程中，有些用户会在`Controller`的路径中使用静态常量。因此，
他们也希望`smart-doc`能够解析这些静态常量并获取到真实的值。下面来看一个例子：

```java
/**
 * Test Constants
 *
 * @param page 页码
 */
@GetMapping(value = "testConstants/" + ApiVersion.VERSION)
public void testConstantsRequestParams(@RequestParam(required = false,
        defaultValue = RequestValueConstant.PAGE_DEFAULT_NONE,
        value = RequestParamConstant.PAGE) int page) {

}
```

针对这种常量的使用，`smart-doc` 要求用户配置常量类。`smart-doc` 会根据设置的常量类分析并形成一个常量容器，
在进行接口分析时从该容器中查找并替换常量。 配置参考如下：

```json
{
   "allInOne":true,
   "apiConstants":[{
        "constantsClassName":"com.power.doc.constants.RequestParamConstant"
   },{
        "constantsClassName":"com.power.doc.constants.RequestValueConstant"
   },{
       "constantsClassName":"com.power.doc.constants.ApiVersion"
   }]
}
```
**注意：** 如果配置类名时使用到内部类不要写错了，子类是使用`$`符号相连，
例如：`com.power.doc.controller.UserController$ErrorCodeEnum`


如果是单元测试，配置参考如下

```java
ApiConfig config = new ApiConfig();// @Deprecated
ApiConfig config = ApiConfig.getInstance();
config.setApiConstants(
       ApiConstant.builder().setConstantsClass(RequestParamConstant.class),
       ApiConstant.builder().setConstantsClass(RequestValueConstant.class),
       ApiConstant.builder().setConstantsClass(ApiVersion.class)
);
```
> 由于存在不同常量类中常量同名的情况，因此smart-doc在加载配置的常量类创建常量池的时候，每个常量是带上类名前缀的。
例如ApiVersion类中的VERSION常量。最后的名字是`ApiVersion.VERSION`。这就要求在使用常量的时候使用`类名.常量名`的方式。
当然常量是是写在接口中还是普通的常量类中都是支持加载解析的。


## 响应字段忽略

在使用 `smart-doc` 时，有同学提问：“如何忽略响应实体中的某个字段？”例如，像密码 (`password`) 这样的敏感字段。在 `smart-doc` 的早期开发阶段，我们就考虑到了这种情况，并为此提供了支持。
因此，我们对 `Java` 中常用的 `JSON` 序列化库进行了兼容，例如 `Spring` 框架默认使用的 `Jackson` 以及在国内使用较多的 `Fastjson`。

- **为什么不使用 `@Ignore` 注解来标注忽略返回字段？** 这种做法类似于自欺欺人，仅仅是在文档中不展示该字段，但实际上数据仍然会被返回。因此，这不是 `smart-doc` 所推荐的做法。我们建议使用框架提供的注解来控制字段的展示与否。
通过这种方式，我们确保了文档的准确性和安全性，同时也保持了与现有框架的良好兼容性。


### 使用jackson注解忽略

一般`Spring`框架默认使用的是`jackson`作为`json`序列化和反序列化库。

```java
public class JacksonAnnotation {

    /**
     * 用户名
     */

    @JsonProperty("name")
    private String username;


    /**
     * 身份证号
     */
    @JsonIgnore
    private String idCard;
}
```
像这个`idCard`使用`@JsonIgnore`注解后，接口不会看到该字段，`smart-doc`发现该注解也不会把该字段显示在接口文档中。
### Fastjson忽略响应字段
`Fastjson` 也支持忽略字段的注解。在 `Fastjson` 中，可以使用 `@JSONField(serialize = false)` 注解来忽略字段的序列化。其中，
`serialize = false` 是起到关键作用的属性。

```java
public class FastJson {

    /**
     * 用户名
     */
    @JSONField(name = "name")
    private String username;


    /**
     * 身份证号
     */
    @JSONField(serialize = false)
    private String idCard;
}
```
如果你在项目中使用了`Fastjson`替代默认的`Jackson`，按照上面的`idCard`字段这样写上注解后，无论是真实的数据响应还是`smart-doc`的文档都能帮你
忽略掉相关字段。

### 使用customResponseFields实现忽略
`smart-doc`的`customResponseFields`提供了一个`ignore`的配置选项也可以忽略指定的字段，配置参考如下：
```json
{
    "customResponseFields": [
        {
            "name": "code",
            "desc": "response code",
            "ownerClassName": "org.springframework.data.domain.Pageable",
            "ignore": true,
            "value": "00000"
        }
    ]
}
```

### 忽略高级设置
`smart-doc`官方还支持`Fastjson`和`Jackson`的高级忽略配置，例子如下：
```java
/**
* 测试mybatis-plugs page字段忽略
* @author yu 2021/7/11.
*/
@JSONType(ignores ={"current", "size", "orders", "hitCount", "searchCount", "pages","optimizeCountSql"})
@JsonIgnoreProperties({"current", "size", "orders", "hitCount", "searchCount", "pages","optimizeCountSql"})
public class MybatisPlusPage<T> extends Page<T> {


}
```
## 导出数据字典
在`Swagger`中针对国内的场景，是很难做到字典导出的。但是`smart-doc`中可以很容易的把枚举字典导出到文档中。
例如代码中有一个订单状态枚举字典。
```java

public enum OrderEnum {

    WAIT_PAY("0", "已支付"),

    PAID("1", "已支付"),

    EXPIRED("2","已经失效");

    private String code;

    private String desc;

    OrderEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String getCode() {
        return this.code;
    }


    public String getDesc() {
        return this.desc;
    }
}
```
配置一下就可以导出， `@since 2.4.6`版本开始，此配置支持配置枚举所实现的接口来获取子类实现类， 如果有已经实现的枚举需要忽略的话，可以在实现枚举类上增加`@ignore`进行忽略。
```json
{
    "dataDictionaries": [
        {
            "title": "订单状态码字典", //数据字典的名称
            "enumClassName": "com.xx.OrderEnum", //数据字典枚举类名称
            "codeField": "code", //数据字典字典码对应的字段名称,smart-doc默认以getCode方法名去反射获取。如果没有get方法可以配置字段对应方法名，例如：code()。
            "descField": "message" //数据字典对象的描述信息字典，和codeField一样可以配置为方法名,例如：message()
        },
        {
            "enumClassName": "com.xx.IEnum", //数据字典接口
            "codeField": "code", //数据字典字典码对应的字段名称
            "descField": "message" //数据字典对象的描述信息字典
        }
    ]
}
```
**注意：** 如果配置类名时使用到内部类不要写错了，子类是使用`$`符号相连，
例如：`com.power.doc.controller.UserController$ErrorCodeEnum`

> 由于smart-doc为了减少用户去配置字典项，因此使用的反射原理去遍历的枚举项，反射是不能获取到注释的，
这里就要求字典的描述直接定义在编码中。当然错误字典也是同理来处理。

## 外部源码加载

### 为什么外部jar没有注释
在编译`Java`代码打包成`jar`包后，编译器会将代码中的注释去除，并且泛型也被擦除(例如定义泛型`T`,编译后`T`将变成`Object`),
`smart-doc`是依赖泛型和源码推荐出文档的，因此如果接口使用的类来自外部`jar`包或者是其他模块，
那么需要做一些处理才能让`smart-doc`能够正确分析出文档。
### 如何让smart-doc加载源码
`smart-doc` 是一款完全依赖于源码注释来生成文档的工具。如果没有源代码，生成的文档将仅包含字段名和字段类型等基本信息，而无法包括相关的注释内容。
对于所有代码都集中在一个单一项目中的情况，`smart-doc` 能够完美地生成所需的文档，无需额外配置。然而，在多模块项目或是项目依赖于独立的 JAR 包的情况下，`smart-doc` 可能无法加载并访问运行模块之外的代码。
接下来，我们将指导您如何优雅地配置 `smart-doc`，使其能够成功加载并记录运行模块外部的项目代码。


 **注意：自`smart-doc-maven-plugin 1.0.2`版本开始，使用`maven`的插件能够实现自动源码加载。** 
#### 通过`ApiConfig`类设置(不推荐)
代码示例如下：

```java
ApiConfig config = new ApiConfig();// @Deprecated
ApiConfig config = ApiConfig.getInstance();
//以前的版本为setSourcePaths，SourceCodePath为SourcePath
config.setSourceCodePaths(
        SourceCodePath.path().setDesc("本项目代码").setPath("src/main/java"),
        //smart-doc对路径自动会做处理，无论是window合适linux系统路径，直接拷贝贴入即可
        SourceCodePath.path().setDesc("加载外部项目源码").setPath("E:\\Test\\Mybatis-PageHelper-master\\src\\main\\java")
);
```
这样`smart-doc`就能将外部的源码载入。

#### 通过`maven`的`classifier`来指定源码包(不推荐)

> 我们并不推荐此类使用方式。若您的团队遵循严格的规范和领导要求，采用以下配置可能会引起不必要的误解。
建议使用 smart-doc 官方提供的插件进行集成，以保持项目 pom 配置的清爽整洁。

这里先看如何使用`classifier`来加载源码包。

```xml
<!--依赖的库-->
<dependency>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>common-util</artifactId>
    <version>2.2.2</version>
</dependency>
<!--依赖库源码，使用smart-doc的插件无需使用这种方式加载sources-->
<dependency>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>common-util</artifactId>
    <version>2.2.2</version>
    <classifier>sources</classifier>
    <!--设置为test,项目发布时source不会放入最终的产品包-->
    <scope>test</scope>
</dependency>
```
这样不需要像上面一样设置源码加载路径了。但是并不是所有的打包都能有源码包。需要在打包是做规范化处理。

 **注意：** 在加载`jar`包和`source`源码`jar`包时，如出现代码导入错误可尝试变更二者依赖顺序， 推荐使用`smart-doc`最新的`Maven`插件或者`Gradle`插件。

#### 公有jar打包规范(推荐)
当你发布公共`jar`包或者`Dubbo`应用`API`接口共有`jar`包时，在`maven`的`plugins`中加入`maven-source-plugin`,示例如下：

```xml
<!-- Source -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
    <version>3.3.0</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>jar-no-fork</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
这样发布的时候就会生成一个`[your jar name]-sources.jar`的源码包，这个包也会一起发布到私有仓库。这样就可以通过`classifier`来指定`sources`了。如果还是不清楚可以直接参考`smart-doc`源码的`pom.xml`配置。

**注意：** 经测试验证，如果只是通过`install`到本地，即便是指定了`sources`也无法读取到源码，只有将公用的模块`deploy`到`nexus`这样的私服上才能正常使用。

对于什么时候需要自己发布`jar`包，很多新手是不知道的，这里介绍主要的场景：
- `A`工程里写了一个通用的模块，例如通用工具类模块，想在`B`工程里直接依赖使用。
- `Dubbo`的`RPC API`模块这种场景，其项目业务要调用你的`Dubbo`，如果都使用`JAVA`开发直接依赖`Dubbo API`模块就可以。

### 第三方源码示例

当然，在项目开发过程中，我们经常会使用到第三方的开源工具或框架，比如 `mybatis-plus` 和 `smart-doc`。`smart-doc` 作为一款强大的文档生成工具，
其核心功能在于基于源代码进行分析，进而生成详细的接口文档。然而，如果项目中使用的某些依赖没有提供源代码，`smart-doc` 将无法正确地生成完整的接口文档。
从 `smart-doc-maven-plugin 1.0.2` 版本开始，该插件增强了对源代码的自动加载能力。这意味着当你在项目中使用了此版本的插件之后，它能够自动识别并加载相关依赖的源码，
从而无需手动配置源代码依赖。这种改进不仅简化了配置过程，也使得文档的生成更加完整准确，因此我们强烈建议使用此版本及其以上版本的 `smart-doc-maven-plugin`。
这样的做法不仅能提高文档的质量，还能保持项目的构建配置（如 `pom.xml`）更加简洁和规范，符合团队的最佳实践标准。

#### mybatis-plus分页处理
在使用`mybatis-plus`的分页时，如果使用`IPage`作为`Controller`层的返回，`smart-doc`无论如何也不能扫描出正确的文档，
因为`IPage`是一个纯接口，所以可以在`service`层正常使用`IPage`作为分页返回，然后在`Controller`层做下转换。

```java
/**
 * 分页查询订单信息
 * @param pageIndex 当前页码
 * @param pageSize 页面大小
 * @return
 */
@GetMapping(value = "page/{pageIndex}/{pageSize}")
public Page<Order> queryPage(@PathVariable int pageIndex , @PathVariable int pageSize) {
    Page<Order> page = new Page<>(pageIndex,pageSize);
    page.setRecords(orderService.selectPage(pageIndex,pageSize).getRecords());
    return page;
}
```
当然也要在项目中引入`mybatis-plus`的源码

```xml
 <dependency>
     <groupId>com.baomidou</groupId>
     <artifactId>mybatis-plus-extension</artifactId>
     <version>3.5.5</version>
     <classifier>sources</classifier>
     <scope>test</scope>
</dependency>
```
>classifier这种方式都不推荐使用，请使用maven插件或者gradle插件，插件可以实现自动加载。

## 自定义错误码解析器
当前，许多人选择使用枚举类型作为字典码。对于枚举类，`smart-doc` 可以根据配置轻松地将其扫描并整合到文档中。
然而，对于那些不使用枚举而是采用其他数据结构的情况，就需要自行编写自定义解析类。这种情况下，
自定义的解析类必须实现 `smart-doc` 中的 `com.power.doc.extension.dict.DictionaryValuesResolver` 接口。

```java
public interface DictionaryValuesResolver {
    <T extends EnumDictionary> Collection<T> resolve();
}
```
实现例子：
```java
public class EExceptionValuesResolver implements DictionaryValuesResolver {
    @Override
    public <T extends EnumDictionary> Collection<T> resolve() {
        List<EnumDictionary> list = new ArrayList<>();
        //反射处理你自己的错误码代码，填充返回
        return list;
    }
}
```
然后在`smart-doc`配置中执行自己的错误码解析器
```json
"errorCodeDictionaries": [
    {   //错误码列表，没有需求可以不设置
        "title": "title",
        "valuesResolverClass": "xx.EExceptionValuesResolver" //自定义错误码解析器，使用枚举定义错误码的忽略此项。
    }
}
```
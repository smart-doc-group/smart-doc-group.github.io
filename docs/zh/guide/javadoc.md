# javadoc tags

`smart-doc` 的初衷是通过使用 javadoc 文档注释来避免注解的侵入性。因此，smart-doc 的每一个附加功能都考虑了 javadoc 的原生标签。以下是 smart-doc 使用的一些 javadoc 标签介绍。

| 标签名       | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| @param       | 对于 Spring Boot 接口层，对于简单类型参数，在使用 @param 时必须写上注释描述；对于 Entity 类型，smart-doc 将不会检查。 |
| @deprecated  | 可以用于注释中标记接口已过时，效果与 @Deprecated 注解相同。     |
| @apiNote     | @apiNote 是 Java 的新文档标签，smart-doc 使用 @apiNote 作为方法的详细描述，您可以使用 apiNote 来编写长注释。如果方法没有写 @apiNote 注解描述，smart-doc 将直接使用方法的默认注解填充。 |

# javadoc 用法
## 1.1 @param 特殊用法
smart-doc 为 Java 原生 @param 添加了一些特殊用法。
- 为基本类型请求参数设置模拟值

```java
/**
 * 测试 @RequestParam
 *
 * @param author author|Bob
 * @param type   type
 */
@GetMapping("testRequestParam")
public void testRequestParam(@RequestParam String author, @RequestParam String type) {

}
```
上面例子中，author 的模拟值是 `Bob`，添加在 `|` 符号之后。

- 参数对象替换

例如，某些对象在框架底层已经进行了特殊处理。Smart-doc 依赖于原始参数对象。分析和处理后的文档可能不符合要求。在这种情况下，您可以定义一个参数对象来替代它，然后 smart-doc 将按照您指定的对象输出文档。

例如：当使用 jpa 的 Pageable 作为接口参数接收对象时，Spring 框架会处理它。实际属性是 PageRequest，但如果 smart-doc 使用 PageRequest，会输出一些不必要的属性。该功能从 smart-doc 1.8.5 版本开始提供。

```java
/**
 * 参数对象替换测试
 * @param pageable com.power.doc.model.PageRequestDto
 * @return
 */
@PostMapping(value = "/enum/resp")
public SimpleEnum resp(@RequestBody Pageable pageable){
    return null;
}
```
在上面的写法中，smart-doc 将使用 `com.power.doc.model.PageRequestDto` 替代 jpa 的 Pageable 进行文档渲染。注意，类名必须是完整的类名。

让我们来看看 smart-doc 支持的写法方法。

```java
@param pageable com.power.doc.model.PageRequestDto
@param pageable 您的注释|com.power.doc.model.PageRequestDto
# smart-doc 本身基于泛型派生，如果需要泛型，需要写具体对象
@param pageable com.power.doc.model.PageRequestDto<com.power.doc.model.User>
```
> 尽量少使用参数替换这种形式，编写代码非常不方便。建议直接将对象定义为输入参数。

# 自定义文档标签
Java 中原生的 Javadoc 标签比较少，不能满足某些使用场景，因此 smart-doc 自定义了一些文档标签。以下是自定义文档标签的使用描述。

| 标签名                      | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| @ignore                   | ignore 标签用于过滤请求参数对象上的某个字段。设置后，smart-doc 将不会将修改后的字段输出到请求参数列表中。请参阅 [忽略响应字段](/diy/advancedFeatures#response-field-ignored)。如果在方法上添加 ignore，则接口方法将不会输出到文档中。从 1.8.4 版本开始，增加了对控制器的忽略支持，用于忽略不希望生成文档的接口类。ignore 也可以用于忽略方法中的请求参数。 |
| @mock                     | @since smart-doc 1.8.0，mock 标签用于在基本对象类型字段中设置自定义文档显示值。设置后，smart-doc 将不再帮助您生成随机值，方便通过 smart-doc 直接输出交付文档。                                                                                                                                                                                                                                                                                                                         |
| @dubbo                    | @since smart-doc 1.8.7，dubbo 标签用于添加到 dubbo API 接口类上，使 smart-doc 能够扫描 dubbo RPC 接口以生成文档。                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| @restApi                  | @since smart-doc 1.8.8，restApi 标签用于支持 smart-doc 扫描 Spring Cloud Feign 定义的接口以生成文档。                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| @order                    | @since smart-doc 1.9.4，order 标签用于设置控制器接口或 API 入口的自定义排序序号，@order 1 表示将排序序号设置为 1。                                                                                                                                                                                                                                                                                                                                                                                                                     |
| @ignoreResponseBodyAdvice | @since 1.9.8，ignoreResponseBodyAdvice 标签用于忽略 ResponseBodyAdvice 设置的包装类。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| @download                 | @since smart-doc 2.0.1，download 标签用于标记控制器的文件下载方法，生成调试页面时可以实现文件下载测试。支持通过请求头参数测试下载文件。                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| @page                     | @since smart-doc 2.0.2，page 标签用于标记控制器方法，指示该方法用于渲染和返回静态页面。在生成调试页面时，如果启动测试，则将自动在浏览器中打开测试页面。标签显示页面。                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| @ignoreParams             | @since smart-doc 2.1.0，ignoreParams 标签用于标记控制器方法中不想在文档中显示的参数，例如：@ignoreParams id name，多个参数名之间用空格分隔。                                                                                                                                                                                                                                                                                                                                                                                                                            |
| @response                 | @since smart-doc 2.2.0，response 标签用于标记控制器方法，允许您自定义返回的 json 示例。建议仅在返回基本类型时使用，例如：`Result<String>` 这种泛型类型是一个简单基本类型的响应。                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| @tag                      | @since 2.2.5，@tag 用于分类控制器方法。您可以将不同控制器下的方法分配到多个类别中，也可以直接将控制器分配到一个或多个类别中。                                                                                                                                                                                                                                                                                                                                                                         |
| @extension                | @since 3.0.3，@extension 标记在控制器方法上，用于支持 OpenApi 的扩展功能。它将为 openapi.json 添加一个 "x-*" 属性。                                                                                                                                                                                                                                                                                                                                                                                                                               |

## 2.1 @ignore 使用（自 2.6.9 版本后废弃在字段上使用） <Badge type="danger" text="2.6.9" />
@ignore 注解只能应用于方法或类上，不能用于字段上。
建议使用 JSON 库中的 @JsonIgnore 注解代替。
因为在字段上使用 @ignore 并不能真正防止它被返回。

```java
/**
* 这是一个早期的错误示例
*/
public class SubUser {

    /**
     * 用户名
     */
    private String subUserName;

    /**
     * 身份证
     */
    private String idCard;

    /**
     * 性别
     */
    @JsonIgnore
    private int gender;

    /**
     * 创建时间
     * @ignore
     */
    private Timestamp createTime;
}
```

未来，@ignore 将只用于方法和类的注释中。

> 对于实体字段，建议使用 Json 转换框架的注解来忽略它们。
> 在字段上使用 @ignore 是 smart-doc 早期示例中的一个错误，未来版本中 @ignore 忽略字段的能力将会被取消。
> smart-doc 支持 Jackson 和 Fastjson 的注解，不建议使用这种方式，因为它不能在展示和行为上保持一致。

在 Controller 层使用 SubUser 作为接收参数时，smart-doc 输出的参数请求文档：

| 参数         | 类型   | 描述    | 必填  |
| ---         | ---    | ---    | ---  |
| subUserName | string | 用户名  | false |
| idCard      | string | 身份证  | false |
| gender      | int    | 性别    | false |

## 2.2 @mock 注解使用方法

```java
public class SimpleUser {

    /**
     * 用户名
     * @mock Bob
     * @since v1.0
     */
    @NotNull
    private String username;

    /**
     * 密码
     * @mock 12356
     * @since v1.0
     */
    private String password;
}
```

在 Controller 层使用 SimpleUser 作为接收参数时，smart-doc 不再使用随机值。smart-doc 输出的参数请求示例：

```json
{
  "username": "Bob",
  "password": "12356"
}
```

## 2.3 @download 注解使用方法

用于告诉 smart-doc 您的控制器中的某个方法是文件下载接口。当 smart-doc 生成调试页面时，它可以生成文件下载请求。参考代码如下：

```java
/**
 * BaseController
 */
public abstract class BaseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseController.class);

    /**
     * Excel 文件
     */
    public static final String EXCEL_CONTENT_TYPE = "application/vnd.ms-excel;charset=utf-8";

    /**
     * 文本文件
     */
    public static final String TEXT_CONTENT_TYPE = "application/octet-stream;charset=utf-8";

    /**
     * 导出 Excel 文件，添加文件名时需要加后缀
     *
     * @param fileName 文件名（如 userInfo.xls）
     * @param response HttpServletResponse
     * @return ServletOutputStream
     * @throws IOException 异常
     */
    protected ServletOutputStream exportExcel(String fileName, HttpServletResponse response) throws IOException {
        return baseDownload(EXCEL_CONTENT_TYPE, fileName, response);
    }

    /**
     * 基础文件下载
     *
     * @param contentType 下载文件的类型
     * @param fileName 文件名
     * @param response HttpServletResponse
     * @return ServletOutputStream
     * @throws IOException 异常
     */
    protected ServletOutputStream baseDownload(String contentType, String fileName, HttpServletResponse response)
            throws IOException {
        response.setContentType(contentType);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="
                + new String(fileName.getBytes("gbk"), "iso-8859-1"));
        return response.getOutputStream();
    }

    /**
     * 下载文件
     *
     * @param fileName 下载文件名
     * @param response HttpServletResponse
     * @return ServletOutputStream
     * @throws IOException 异常
     */
    protected ServletOutputStream downloadText(String fileName, HttpServletResponse response) throws IOException {
        return baseDownload(TEXT_CONTENT_TYPE, fileName, response);
    }

}
```

文件下载处理控制器

```java
/**
 * 文件下载测试
 */
@RestController
@RequestMapping("download")
public class DownloadController extends BaseController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DownloadController.class);
    
    /**
     * 下载普通文件
     *
     * @param response
     * @return
     * @throws IOException
     * @download
     */
    @PostMapping("text/{id}")
    public void download(HttpServletResponse response) throws IOException {
        String randomStr = RandomUtil.randomNumbers(50);
        String fileName = "test.log";
        // 使用 smart-doc 调试页面测试文件下载时，必须设置 filename 响应头，否则使用其他模拟工具测试。
        // urlEncode 用于处理文件名
        response.setHeader("filename", urlEncode(fileName)); // 自 2.0.2 版本起无需设置此项
        ServletOutputStream outputStream = this.downloadText(fileName, response);
        outputStream.write(randomStr.getBytes());
    }

    public String urlEncode(String str) {
        if (StringUtil.isEmpty(str)) {
            return null;
        } else {
            try {
                return java.net.URLEncoder.encode(str, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
                return null;
            }
        }
    }
}
```
> smart-doc 2.0.2 版本将自动从下载响应头 `Content-Disposition: attachment; filename=xx` 中读取文件名，无需在响应头文件中设置 `response.setHeader("filename", urlEncode())`。当然，对于 Content-Disposition，也要使用 urlEncode 处理文件名，否则中文文件名会出现乱码。如果直接使用浏览器打开生成的 smart-doc 测试页面，将无法在测试中获取 content-disposition，但会生成一个随机文件名。要验证正确性，请通过服务访问页面。

## 2.4 @page 注解使用方法

```java
/**
 * arthas 火焰图列表
 *
 * @return
 * @page /arthas-output.html
 * @apiNote 返回显示火焰图文件的 arthas-output.html
 */
@GetMapping("arthas-output.html")
public String render() {
    Template template = BeetlTemplateUtil.getByName("arthas-output.tpl");
    List<FileInfo> files = FileUtil.getFilesFromFolder(environment.getProperty("arthas.output.path", OUTPUT_PATH));
    template.binding("path", "arthas-output");
    template.binding("fileInfoList", files);
    return template.render();
}
```
> 在此示例中，使用 beetl 编写一个 html 模板，正常情况下访问 arthas-output.html 时，将返回渲染的界面。如果希望在调试页面中点击请求后直接访问页面，可以使用 @page 告诉 smart-doc 您渲染页面的名称。这样，在调试页面中可以直接打开一个新标签页访问页面。

## 2.5 @ignoreParams 注解使用方法

```java
/**
 * 测试时间
 * @ignoreParams id
 * @param id id
 * @param dateEntity
 */
@PostMapping("data-date")
public CommonResult<DateEntity> test(int id, @RequestBody DateEntity dateEntity){
    return null;
}
```

忽略 id 参数，不在文档中显示。主要用于传统有状态后台管理系统中的用户状态参数。

## 2.6 @response 注解使用方法

```java
/**
 * 测试 response 标签
 *
 * @return
 * @response {
 * "success": true,
 * "message": "成功",
 * "data": "hello",
 * "code": "68783",
 * "timestamp": "2021-06-15 23:05:16"
 * }
 */
@GetMapping("/test")
public CommonResult<String> create() {
    return null;
}
```

忽略 id 参数，不在文档中显示。主要用于传统有状态后台管理系统中的用户状态参数。

## 2.7 @tag 注解使用方法

```java
/**
 * json 文件配置测试
 * @tag dev
 */
@RestController
public class ConfigRequestParamController {

    /**
     * GET 请求测试查询参数
     * @tag test
     * @return
     */
    @GetMapping("configQueryParamGet")
    public void configQueryParamGet(String configQueryParam) {

    }

    /**
     * POST 请求测试查询参数
     * @tag test
     * @return
     */
    @PostMapping("configQueryParamPost")
    public void configQueryParamPost(String configQueryParam) {

    }
}
```
@tag 用于对控制器方法进行分类。您可以将不同控制器下的方法分配到多个类别，也可以直接将控制器分配到一个或多个类别。

## 2.8 @extension 注解使用方法 <Badge type="tip" text="3.0.3" />

@extension 标记在控制器方法上，用于支持 OpenApi 的扩展功能，它将为 openapi.json 添加 "x

-*" 属性。

```java
/**
 * json 文件配置测试
 * @tag dev
 */
@RestController
public class ConfigRequestParamController {

    /**
     * GET 请求测试查询参数
     * @extension group ecs
     * @extension key1 ["v1","v2"]
     * @extension key2 {"x":"v1", "y":"v2"}
     * @tag test
     * @return
     */
    @GetMapping("configQueryParamGet")
    public void configQueryParamGet(String configQueryParam) {

    }
}
```
它将在 openapi.json 中添加一个 "x-*" 属性。

```json
{
  "paths":{
    "/xxx/xxx": {
      "post": {
        "summary": "xxx",
        "tags": [
          ...
        ],
        "requestBody": {
          ...
        },
        "responses": {
        ...
        },
        "operationId": "xxx-POST",
        "x-group": "ecs",
        "x-key1": ["v1","v2"],
        "x-key2": {"x":"v1", "y":"v2"},
        "parameters": [
             ...
        ]
      }
    }
  }
}
```

# IDEA 自定义标签提示

自定义标签默认不自动提示，需要用户在 IDEA 中进行设置。设置完成后即可使用。以下是 smart-doc 自定义 mock 标签设置的示例。设置操作如下：
![idea设置自定义tag提示](/assets/idea_tag.png "idea_tag.png")

使用其他开发工具的用户应自行查找相关工具的自定义标签提示设置。
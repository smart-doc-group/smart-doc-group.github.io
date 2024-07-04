# Guide

## javadoc
The original intention of `smart-doc` is to use `javadoc` document comments to remove the intrusion of annotations. Therefore, every time `smart-doc` adds a function, it must first consider the `javadoc` native `tag`. The following is Some javadoc comments `tag` used by `smart-doc` are introduced.


| tag                             | description                                                                                                                                                                                                                                                          | since   |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| [`@param`](#_1-param)           | For the `Spring Boot` interface layer, simple type parameters must be written with comment descriptions when using `@param`, and for `Entity` type `smart-doc `will not be checked                                                                                   | -       |
| [`@deprecated`](#_3-deprecated) | can be used in comments to mark that the interface has been deprecated, and has the same effect as the `@Deprecated` annotation                                                                                                                                      | -       |
| [`@apiNote`](#_2-apinote)       | `smart-doc` uses the annotation of `@apiNote` as a detailed description of the method, so you can use `@apiNote` to write a long comment. If a method does not have an `@apiNote` annotation, `smart-doc` will directly fill it with the method's default annotation | -       |
| `@author`                       | `smart-doc` will extract the `@author` annotation in the code and add it to the document. `@author` can be written on a method or a class. For example: `@author sunyu on 2016/12/6.`                                                                                | -       |
| [`@since`](#_4-since)           | `smart-doc` will extract the annotations in `@since` in the code into the document, and also correspond to the version number in `torna`                                                                                                                             | `2.6.0` |
| [`@version`](#_5-version)       | `smart-doc` extracts `@version` comments from the code to identify interface version numbers, such as Dubbo service versions.                                                                                                                                        | `3.0.1` |
### 1. `@param`

`smart-doc` adds some special usage for `JAVA` native `@param`.

* Set `mock` value for basic type request parameters

```java
/**
 *Test @RequestParam
 * @param author Author|Haruki Murakami
 * @param type type
 */
@GetMapping("testRequestParam")
public void testRequestParam(@RequestParam String author, @RequestParam String type) {

}
```

* Parameter object replacement

For example, some objects have been specially processed at the bottom of the framework. `smart-doc` may not meet the requirements if the original parameter object relies on too powerful an analysis. In this case, you can define a parameter object to replace it, and then `smart- doc` outputs the document according to the object you specify.

For example: when using `Pageable` of `JPA` as an interface parameter to receive an object, the `Spring` framework has processed it. In fact, the real attribute is `PageRequest`. However, if `smart-doc` uses `PageRequest`, it will deduce some inconsistencies. Required attribute, this feature is available starting from `smart-doc 1.8.5`.

```java
/**
 * Parameter object replacement test
 * @param pageable com.power.doc.model.PageRequestDto
 * @return
 */
@PostMapping(value = "/enum/resp")
public SimpleEnum resp(@RequestBody Pageable pageable){
     return null;
}
```

In the above writing method, `smart-doc` will use `com.power.doc.model.PageRequestDto` instead of `Pageable` of `JPA` for document rendering. Note that the class name must be the full class name. Let’s take a look at the writing methods supported by `smart-doc`

```java
@param pageable com.power.doc.model.PageRequestDto
@param pageable your comment |com.power.doc.model.PageRequestDto
# smart-doc itself is based on generic derivation. If generics are needed, specific objects need to be written.
@param pageable com.power.doc.model.PageRequestDto<com.power.doc.model.User>
```

> Try to use this form of parameter substitution as little as possible. It is very inconvenient to write code. It is recommended to directly define the object as the input parameter.



### 2. `@apiNote`

`smart-doc` uses `@apiNote` comments as detailed descriptions of methods, so you can use `@apiNote` to write a long comment. If a method does not write an `@apiNote` annotation, `smart-doc` will directly fill it with the method's default annotation. The detailed usage reference of `@apiNote` is as follows:

```java
/**
 * Query user information
 * @param name username
 * @apiNote Query the user's detailed information through the user's name
 * @return
 */
@PostMapping(value = "/query")
public String resp(@RequestBody String name){
     return null;
}
```



### 3. `@deprecated`

It can be used in comments to mark that the interface has been deprecated. It has the same effect as the `@Deprecated` annotation.

```java
/**
 * Query user information
 * @param name username
 * @apiNote Query the user's detailed information through the user's name
 * @deprecated
 * @return
 */
@PostMapping(value = "/query")
public String resp(@RequestBody String name){
     return null;
}
```



### 4. `@since`

```java
/**
 * Query user information
 * @param name username
 * @apiNote Query the user's detailed information through the user's name
 * @since v2.1.0
 * @return
 */
@PostMapping(value = "/query")
public String resp(@RequestBody String name){
     return null;
}
```

### 5. `@version`

```java
/**
 * Dubbo Interface
 * @author yusun
 * @dubbo
 * @service test
 * @protocol dubbo
 * @version 2.0.0
 */
public interface DubboInterface {

  /**
   * Say Hello
   * @param word
   * @return
   */
  String sayHello(String word);
}
```


## smart-doc tags
For certain special scenarios, the official Java `javaFor certain special scenarios, the official Java `java limited and cannot fully meet some the official Java `javadoc` tags are somewhat limited and cannot fully meet some user requirements. Therefore, the smart-doc team has judiciously defined some custom tags.
The usage is introduced as follows:

| tag                                                         | description                                                                                                                                                                                                                                                                                                                                                 | since   |
|-------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| [`@ignore`](#_1-ignore)                                     | The `@ignore` tag, if applied to a method, prevents the interface method from being output to the documentation. Starting with version `1.8.4`, `@ignore` supports being added to `Controller` to ignore interface classes that you do not want to generate documentation for. `@ignore` can also be used on methods to ignore specific request parameters. | -       |
| [`@mock`](#_2-mock)                                         | The `@mock` tag is used to set custom document display values for object basic type fields. Once set, `smart-doc` no longer generates random values for you. This makes it convenient to directly output delivery documents through `smart-doc`.                                                                                                            | `1.8.0` |
| [`@restApi`](#_3-restApi)                                   | The `@restApi` tag is used to support `smart-doc` in scanning `Spring Cloud Feign` definition interfaces to generate documentation.                                                                                                                                                                                                                         | `1.8.8` |
| `@order`                                                    | The `@order` tag is used to set a custom sorting sequence number for `Controller` interfaces or API entry points. `@order 1` means setting the sequence number to `1`. There was a bug before version `3.0.5`, which has been fixed after that version.                                                                                                     | `1.9.4` |
| `@ignoreResponseBodyAdvice`                                 | The `@ignoreResponseBodyAdvice` tag is used to ignore wrapped classes set by `ResponseBodyAdvice`.                                                                                                                                                                                                                                                          | `1.9.8` |
| [`@download`](#_4-download)                                 | The `@download` tag is used to annotate file download methods on `Controller`, allowing for file download testing when generating the `debug` page. It also supports downloading files with request header parameters for testing.                                                                                                                          | `2.0.1` |
| [`@page`](#_5-page)                                         | The `@page` tag is used to annotate methods on `Controller` indicating that the method is meant to render a static page. When testing on the generated `debug` page, the test page will automatically open in a new browser tab to display the page.                                                                                                        | `2.0.2` |
| [`@ignoreParams`](#_6-ignoreParams)                         | The `@ignoreParams` tag is used to annotate methods on `Controller` to ignore parameters that you do not want to appear in the documentation, such as: `@ignoreParams id name`, with multiple parameter names separated by spaces.                                                                                                                          | `2.1.0` |
| [`@response`(not recommended)](#_7-responsenot-recommended) | The `@response` tag, when annotated on `Controller` methods, allows you to define your own JSON example responses. It is recommended only for responses of basic types, such as generics of simple native types like `Result<String>`.                                                                                                                      | `2.2.0` |
| [`@dubbo`](#_8-dubbo)                                       | The `@dubbo` tag is used to add to Dubbo's API interface classes to allow `smart-doc` to scan and generate documentation for Dubbo RPC interfaces.                                                                                                                                                                                                          | `1.8.7` |
| [`@service`](#_9-service)                                   | The `@service` tag is used to annotate the service name of Dubbo's API interfaces.                                                                                                                                                                                                                                                                          | `3.0.1` |
| [`@protocol`](#_10-protocol)                                | The `@protocol` tag is used to annotate the protocol type of Dubbo's API interfaces.                                                                                                                                                                                                                                                                        | `3.0.1` |
| [`@extension`](#_11-extension)                              | The `@extension` tag is used for support of OpenAPI extension capabilities.                                                                                                                                                                                                                                                                                 | `3.0.3` |
| [`@javadoc`](#_12-javadoc)                                  | The `@javadoc` tag is used for support of interface classes and static utility classes.                                                                                                                                                                                                                                                                     | `3.0.5` |

> We are a tool that respects coding standards very much. We will not add anything randomly to mislead people. We will not provide things that are not provided by the current mainstream frameworks. We will only use tags more cautiously in the future.

Here's the translation into English:

### 1. `@ignore`

**Starting from version 2.6.9, `@ignore` no longer supports marking on fields. In the future, `@ignore` can only be used to annotate methods and class comments.**

For entity fields, it is recommended to use the annotations of JSON conversion frameworks to ignore them, which was an incorrect approach used by smart-doc in the early stages. The annotations of Jackson and Fastjson are supported by smart-doc, and the official does not recommend using a method that cannot maintain consistent behavior and performance.

```java
/**
 * Invoice management
 * @ignore
 */
@RestController
@Slf4j
@RequestMapping("invoice/invoice/v1")
@RequiredArgsConstructor
public class InvoiceController {

    /**
     * Create invoice
     * @ignore
     */
    @PostMapping("/createInvoice")
    public CommonResult<DateEntity> createInvoice(@RequestBody InvoiceCreateRequest request) {
        return null;
    }
}
```

### 2. `@mock`

```java
public class SimpleUser {
    /**
     * Username
     * @mock zhangsan
     * @since v1.0
     */
    @NotNull
    private String username;
    /**
     * Password
     * @mock 12356
     * @since v1.0
     */
    private String password;
}
```

When `SimpleUser` is used as a parameter in the `Controller`, smart-doc will no longer use random values. smart-doc output parameter request example:

```json
{
    "username": "zhangsan",
    "password": "12356"
}
```

### 3. `@restApi`

```java
/**
 * @restApi
 * @author yu 2020/6/21.
 */
@FeignClient(value = "SER0", path = "/")
public interface AFeignInterface {

    /**
     * test
     * @param id id
     * @param name username
     * @return un
     */
    @GetMapping(value = "/{id}/{name}")
    String test(@PathVariable String id, @PathVariable String name);
}
```

### 4. `@download`

This tells smart-doc that one of your `Controller` methods is a file download interface, and smart-doc can generate a file download request when generating the `debug` debug page. The backend reference code is as follows:

```java
/**
 * Download plain text files
 * @apiNote The method has no return object that can be recognized for download, do mark with @download
 * @param response
 * @return
 * @throws IOException
 * @download
 */
@PostMapping("text/")
public void download(HttpServletResponse response) throws IOException {
    String randomStr = RandomUtil.randomNumbers(50);
    String fileName = "test.log";
    // urlDecode used to handle file names
    // since 2.0.2, there is no need to set filename in the response header
    response.setHeader("filename", urlEncode(fileName));
    ServletOutputStream outputStream = this.downloadText(fileName, response);
    outputStream.write(randomStr.getBytes());
}
```

Starting from smart-doc 2.0.2, the file name will automatically be read from the download response header `Content-Disposition: attachment; filename=xx`, so there is no need to set `response.setHeader("filename", urlEncode(fileName));` in the response header.

If the response type is one of the following:
- `org.springframework.core.io.Resource`
- `org.springframework.core.io.InputStreamSource`
- `org.springframework.core.io.ByteArrayResource`
- `org.noear.solon.core.handle.DownloadedFile` domestic `solon` framework

Below is an example returning `org.springframework.core.io.Resource`:

```java
/**
 * Download file
 * @apiNote smart-doc automatically recognizes the file stream object, no need to use @download for file download marking
 * @param filename file name|me
 * @return
 */
@PostMapping("download1/{filename}")
public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
    String fileName = filename + ".log";
    String randomStr = RandomUtil.randomNumbers(50);
    Resource resource = new ByteArrayResource(randomStr.getBytes());
    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
            .body(resource);
}
```

### 5. `@page`

In this example, `beetl` is used to write an HTML template. Normally, visiting `arthas-output.html` will return a rendered interface. If you want to visit this page directly in the `debug` page and click on the request, you can use `@page` to tell smart-doc your rendering page name. In this way, the `debug` page can directly open a new tab to visit the page.

```java
/**
 * arthas flamegraph list
 *
 * @return
 * @page /arthas-output.html
 * @apiNote Returns an arthas-output.html showing flamegraph files
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

### 6. `@ignoreParams`

For example, the `id` parameter is ignored and not displayed in the documentation. This is mainly for traditional backend management systems with user status parameters.

If you want to ignore a parameter of `Spring` or `JAX-RS` or any other top-level project or standardized specification parameters, please submit an issue to the official. For example, if you find that smart-doc cannot ignore the `@SessionAttribute` annotation parameter of `Spring`, you can definitely submit an issue to the official.

```java
/**
 * Test time
 * @ignoreParams id
 * @param id number
 * @param dateEntity
 */
@PostMapping("data-date")
public CommonResult<DateEntity> test(int id, @RequestBody DateEntity dateEntity){
    return null;
}
```

### 7. `@response`(not recommended)

For users using `@response`, our code is too unclear, and the best practice is to write the code in a standardized manner so that smart-doc can automatically generate the return example.

```java
/**
 * Test response tag
 *
 * @return
 * @response {
 * "success": true,
 * "message": "success",
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
### 8. `@dubbo`

```java
/**
 * Dubbo Interface
 * @author yusun
 * @dubbo
 */
public interface DubboInterface {

  /**
   * Say Hello
   * @param word
   * @return
   */
  String sayHello(String word);
}
```

### 9. `@service`

```java
/**
 * Dubbo Interface
 * @author yusun
 * @dubbo
 * @service test
 */
public interface DubboInterface {

  /**
   * Say Hello
   * @param word
   * @return
   */
  String sayHello(String word);
}
```

### 10. `@protocol`

```java
/**
 * Dubbo Interface
 * @author yusun
 * @dubbo
 * @protocol dubbo
 */
public interface DubboInterface {

  /**
   * Say Hello
   * @param word
   * @return
   */
  String sayHello(String word);
}
```
### 11. `@extension`

```java
/**
 * json file config test
 * @tag dev
 * @author cqmike 2021-07-16 14:09
 **/
@RestController
@RequestMapping("configRequestParamTest")
public class ConfigRequestParamController {

    /**
     * get request test query param
     * @extension group ecs
     * @extension key1 ["v1","v2"]
     * @extension key2 {"x":"v1", "y":"v2"}
     * @tag test
     * @author cqmike
     * @return
     */
    @GetMapping("configQueryParamGet")
    public void configQueryParamGet(String configQueryParam) {

    }
}
```
it will output extension tags in openapi.json:
```
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

### 12. `@javadoc`

`@javadoc` is used for interface classes and static utility classes to generate documents. `smart-doc` will scan this tag and generate documents.

```java
/**
 * Simple Interface
 * @author yusun
 * @javadoc
 */
public interface SimpleInterface {

  /**
   * Say Hello
   * @param word
   * @return
   */
  String sayHello(String word);
}

```

## JSR

| Function         | Annotation  |
|------------------|-------------|
| `Field required` | `@NotNull`  |
|                  | `@NotEmpty` |
|                  | `@NotBlank` |
| `Field is empty` | `@Null`     |
| `length limit`   | `@Min`      |
|                  | `@Max`      |
|                  | `@Length`   |
|                  | `@Size`     |

### Group verification

For example: For the same entity class, you do not need to pass `id` when adding a new interface, but you need to pass `id` when modifying the interface.

```java
@Data
@EqualsAndHashCode
public class User {

     /**
      * id
      */
     @Null(groups = Save.class)
     @NotNull(groups = Update.class)
     private Long id;

     /**
      * name
      */
     @Min(value = 4)
     @NotEmpty(message = "Name cannot be empty")
     private String name;

     /**
      * mail
      */
     @Length(max = 32)
     private String email;

     public interface Save extends Default {

     }

     public interface Update extends Default {

     }
}

@RestController
@RequestMapping("validator")
public class ValidatorTestController {

     /**
      * Group verification 1
      * @param collect
      * @return
      */
     @PostMapping("/save")
     public CommonResult<Void> save(@Validated({User.Save.class}) @RequestBody User user){
         return CommonResult.ok();
     }

     /**
      * Group verification 2
      * @param collect
      * @return
      */
     @PostMapping("/update")
     public CommonResult<Void> update(@Validated({User.Update.class}) @RequestBody User user){
         return CommonResult.ok();
     }
}
```
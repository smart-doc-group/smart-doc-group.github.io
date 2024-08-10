# 接口UI集成

## `smart-doc`调试页面

从`smart-doc 2.0.0`版本开始，在`html`的`allInOne`的模式下。可以添加`"createDebugPage": true`的配置。`smart-doc`会
创建一个`debug.html`的页面。 在让生成`smart-doc`生成文档时直接放入到`static/doc/`下，
这样可以直接启动程序访问页面`localhost:8080/doc/debug.html`进行开发调试。
从`smart-doc 2.0.1`开始，对`html`文档，无论是`allInOne`还是非`allInOne`模式都能够生成`debug`页面。`smart-doc`目前的`debug`页面支持文件上传和文件下载测试。

### 配置

```json
{
  "serverUrl": "http://localhost:8080",
  "isStrict": false,
  "allInOne": true,
  "outPath": "src/main/resources/static/doc",
  "coverOld": true,
  "style":"xt256",//喜欢json高亮的可以设置
  "createDebugPage": true, //启用生成debug
  "md5EncryptedHtmlName": false,
  "projectName": "SpringBoot2-Open-Api"
}
```
### 跨域配置
部分开发人员可能习惯于直接在`IntelliJ IDEA`中使用"Open In Browser" 功能来查看`smart-doc`生成的`debug`页面。
然而，这种做法可能导致前端`JavaScript`在请求后台接口时遇到跨域问题。因此，您需要在后端配置跨域访问权限。
这里我们以`Spring Boot`为例进行说明。

```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    /**
     * 跨域配置会覆盖默认的配置，
     * 因此需要实现addResourceHandlers方法，增加默认配置静态路径
     * @param registry
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/resources/")
                .addResourceLocations("classpath:/static/");
    }
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
```
> 如果采用服务器方式来访问页面，则无需配置。

### 界面效果
![mock](/assets/mock.png "mock.png")

### debug页面调试
当使用 `smart-doc` 生成的`HTML`调试页面进行接口测试时，您可能会遇到这样的情况：点击“Send Request”按钮后，按钮变为红色，
这通常意味着接口请求出现问题或是调试页面本身存在错误。此时，您可以打开浏览器的开发者工具进行进一步的调试。需要注意的是，
`smart-doc` 创建的页面使用了 `jQuery` 和原生`JavaScript`，其中 `debug.js` 用于处理接口测试请求，
而 `search.js` 则负责文档目录标题的搜索功能。这些脚本文件均未经过压缩，便于直接调试页面的`JavaScript`源码。
具体调试步骤可以参考下图所示的操作流程。

![mock](/assets/debug-console.png "debug-console.png")


> Swagger是通过侵入一个web接口模块到项目中实现了调试接口调试功能，由于smart-doc不侵入代码中，打包的代码中看不到任何smart-doc的
依赖，因此如果你想调试接口只能生成html文档到src/resources/static目录中，这样SpringBoot就能自动渲染范围这个html文档页面。
当然smart-doc的调试页面对于文件上传你只能传一个文件，这点相比Swagger UI要弱。但是smart-doc也有比Swagger UI强的地方，
例如：文档展示更清晰明了；支持测试文件下载

## `Postman` 导入调试
从`smart-doc 1.7.8`版本开始，`smart-doc`支持生成`Postman`的`json`文件，
你可以使用`smart-doc`生成整个项目的或者某个微服务所有接口的`Postman`的`json`文件，
然后通过将这个`json`文件导入`Postman`的`Collections`做测试。导出`json`.


导入`json`到`Postma`n效果如下图：
![postman](/assets/postman-import.png "postman.png")

### postman中设置环境变量

![postman_set_env](/assets/postman-add-env.png "postman_set_env.png")
**注意：** 在`Add Environment`中不要忘记给环境设置名称(例如：本地开发测试)，否则按上图不能保存成功。

> smart-doc自动生成的Json文件会贴心的给在Postman中给填充上注释，如果你自己写了mock值也会携带进入，
远比自己手动填省心多了

## `Swagger UI`集成

`smart-doc` 支持生成符合`OpenAPI 3.0+`规范的接口文档，这意味着你可以利用任何支持`OpenAPI 3.0+` 规范的文档管理系统或用户界面来展示由 
`smart-doc` 生成的文档。接下来，我们将介绍如何快速集成`Swagger UI`，以便在开发过程中对你的接口进行测试。

### 添加依赖

```
<!--swagger ui -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-ui</artifactId>
    <version>1.5.0</version>
</dependency>
```
`smart-doc`支持的`OpenAPI`规范版本比较高，因此需要集成`1.5.0`或者是更高的版本。
### 配置Swagger UI
在`application`配置文件中添加如下配置
```
# custom path for swagger-ui
springdoc:
  swagger-ui:
    path: /swagger-ui-custom.html
    operations-sorter: method
   #custom path for api docs
    url: /doc/openapi.json
```
- `url`是配置的关键，代表指向`smart-doc`生成的`openapi.json`文件。并且你需要将`OpenAPI`生成到`src/main/resources/static/doc`下。


生成`API`文件后，启动你的应用并访问 `localhost:8080/swagger-ui-custom.html` 即可查看文档。随后，在开发过程中，你就可以利用这个UI界面来进行自我测试了。

**提醒：** 关于`Swagger UI`的其他配置就自行研究官方文档。

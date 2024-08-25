# gRPC   <Badge type="tip" text="^3.0.7" />
## 简介
[gRPC](https://grpc.io/) 是一个现代的开源高性能远程过程调用（RPC）框架，可以在任何环境中运行。它可以通过可插拔的负载均衡、跟踪、健康检查和身份验证支持，高效地连接数据中心内和跨数据中心的服务。它还适用于分布式计算的最后一公里，将设备、移动应用程序和浏览器连接到后端服务。

`smart-doc`从`3.0.7`版本开始支持`gRPC API`文档的生成，下面介绍如何利用`smart-doc`工具来生成`gRPC`的接口文档。
## gRPC文档集成

`smart-doc`本着使用简单的原则开发了`maven`插件和`gradle`，通过插件来降低`smart-doc`的集成难度和去除依赖侵入性。 您可以根据自己使用的依赖构建管理工具来选择相关的插件，下面以使用`smart-doc-maven-plugin`插件集成`smart-doc`生成`gRPC`为例。 

下面来看下集成方式。
### 添加插件
在你的模块中添加`smart-doc-maven-plugin`
```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <version>[最新版本]</version>
    <configuration>
        <!--指定生成文档的使用的配置文件,配置文件放在自己的项目中-->
        <configFile>./src/main/resources/smart-doc.json</configFile>
        <!--指定项目名称-->
        <projectName>测试</projectName>
    </configuration>
    <executions>
        <execution>
            <!--如果不需要在执行编译时启动smart-doc，则将phase注释掉-->
            <phase>compile</phase>
            <goals>
                <goal>grpc-adoc</goal>
                <goal>grpc-html</goal>
                <goal>grpc-markdown</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
### 添加smart-doc所需配置文件
在模块`reources`中添加`smart-doc.json`配置文件

```json
{
  "isStrict": false, //是否开启严格模式
  "allInOne": true,  //是否将文档合并到一个文件中，一般推荐为true
  "outPath": "D://md2", //指定文档的输出路径
  "projectName": "smart-doc"//配置自己的项目名称
}
```
关于`smart-doc`如果你生成文档需要更详细的配置请常看官方其它文档 [配置项](/zh/guide/advanced/config)

## gRPC 接口扫描
扫描原理是主要通过扫描`.proto`文件来获取接口信息。

```protobuf
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloWorld;

/**
 * 消息类型枚举。
 * 定义了可以使用的不同类型的消息。
 */
enum MessageType {
  /** 未指定的消息类型。 */
  TYPE_UNSPECIFIED = 0;

  /** 普通消息类型。 */
  TYPE_NORMAL = 1;

  /** 特殊消息类型。 */
  TYPE_SPECIAL = 2;
}

/**
 * 问候服务定义。
 * 该服务提供不同的 RPC 方法来发送和接收问候。
 */
service Greeter {
  /**
   * 发送问候。
   * 该方法接收一个 HelloRequest 并返回一个 HelloReply。
   */
  rpc SayHello (HelloRequest) returns (HelloReply) {}

  /**
   * 发送一系列问候。
   * 该方法接收一个 HelloRequest 并返回一个 HelloReply 流。
   */
  rpc SayHelloServerStreaming (HelloRequest) returns (stream HelloReply) {}

  /**
   * 接收一系列名称并发送一个问候。
   * 该方法接收一个 HelloRequest 流并返回一个 HelloReply。
   */
  rpc SayHelloClientStreaming (stream HelloRequest) returns (HelloReply) {}

  /**
   * 发送和接收一系列消息。
   * 该方法接收一个 HelloRequest 流并返回一个 HelloReply 流。
   */
  rpc SayHelloBidirectionalStreaming (stream HelloRequest) returns (stream HelloReply) {}
}

/**
 * 包含用户姓名的请求消息。
 * 该消息包含多个字段，用于提供用户信息。
 */
message HelloRequest {
  /** 用户的姓名。 */
  string name = 1;

  /** 用户的年龄。 */
  optional int32 age = 2;

  /** 用户的爱好。 */
  repeated string hobbies = 3;

  /** 用户的其他属性。 */
  map<string, string> properties = 4;

  /** 包含额外信息的嵌套消息。 */
  NestedMessage nested_message = 5;

  /** 消息类型。 */
  MessageType type = 6;
}

/**
 * 嵌套消息定义。
 * 该消息提供额外的嵌套信息。
 */
message NestedMessage {
  /** 嵌套消息中的字段。 */
  string nested_field = 1;

  /** 包含数字列表的重复字段。 */
  repeated int32 numbers = 2;

  /** 包含结果的映射。 */
  map<string, Result> results_map = 3;
}

/**
 * 包含问候的响应消息。
 * 该消息包含问候服务的响应详细信息。
 */
message HelloReply {
  /** 问候消息。 */
  string message = 1;

  /** 包含结果的重复字段。 */
  repeated Result results = 2;

  /** 响应的附加元数据。 */
  map<string, string> metadata = 3;
}

/**
 * 嵌套消息定义。
 * 该消息表示一个包含名称和代码的结果。
 */
message Result {
  /** 结果的名称。 */
  string result_name = 1;

  /** 结果的代码。 */
  int32 result_code = 2;
}

```




## 生成操作
直接通过`mvn`命令运行插件的文档生成命令或者在`IDEA`中直接单击插件的可视化命令即可。

```bash
#  生成AsciiDoc文档
mvn smart-doc:grpc-adoc

#  生成HTML文档
mvn smart-doc:grpc-html

#  生成Markdown文档
mvn smart-doc:grpc-markdown
```

![maven-smart-doc](/assets/mvn-grpc-operate.png)

运行 `smart-doc:grpc-adoc` 生成 `gRPC` Asciidoc文档

运行 `smart-doc:grpc-html` 生成 `gRPC` HTML文档

运行 `smart-doc:grpc-markdown` 生成 `gRPC` MarkDown文档
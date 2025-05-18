# gRPC   <Badge type="tip" text="^3.0.7" />
## Introduction
[gRPC](https://grpc.io/) is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.


Starting from version `3.0.7`, `smart-doc` supports generating `gRPC API` documentation. Below is a guide on how to generate `gRPC` interface documentation using the `smart-doc` tool.

## gRPC Documentation Integration

In line with the principle of simplicity, `smart-doc` has developed Maven and Gradle plugins to reduce the difficulty of integrating `smart-doc` and eliminate dependency intrusiveness. You can choose the relevant plugin based on the dependency management tool you are using. Below is an example of how to integrate `smart-doc` using the `smart-doc-maven-plugin` to generate `gRPC` documentation.

Let's take a look at the integration method.

### Adding the Plugin
Add the `smart-doc-maven-plugin` to your module:

```xml
<plugin>
    <groupId>com.ly.smart-doc</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <version>[latest version]</version>
    <configuration>
        <!--Specify the configuration file for generating the documentation, the file is located in your project-->
        <configFile>./src/main/resources/smart-doc.json</configFile>
        <!--Specify the project name-->
        <projectName>Test</projectName>
    </configuration>
    <executions>
        <execution>
            <!--If you don't need to start smart-doc during the compile phase, comment out the phase-->
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

### Adding the smart-doc Configuration File
Add the `smart-doc.json` configuration file in the module `resources`.

```json
{
  "isStrict": false, // Enable strict mode or not
  "allInOne": true,  // Merge documentation into a single file, generally recommended as true
  "outPath": "D://md2", // Specify the output path for the documentation
  "projectName": "smart-doc" // Configure your project name
}
```

For more detailed configurations when generating documentation with`smart-doc`, please refer to the official documentation [Configuration items](/guide/advanced/config).

## gRPC Interface Scanning
The scanning mechanism mainly works by scanning the `.proto` files to obtain interface information.

```protobuf
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloWorld;

/**
 * Enum for message types.
 * Defines the different types of messages that can be used.
 */
enum MessageType {
  /** Unspecified message type. */
  TYPE_UNSPECIFIED = 0;

  /** Normal message type. */
  TYPE_NORMAL = 1;

  /** Special message type. */
  TYPE_SPECIAL = 2;
}

/**
 * Greeting service definition.
 * This service provides different RPC methods to send and receive greetings.
 */
service Greeter {
  /**
   * Sends a greeting.
   * This method receives a HelloRequest and returns a HelloReply.
   */
  rpc SayHello (HelloRequest) returns (HelloReply) {}

  /**
   * Sends a series of greetings.
   * This method receives a HelloRequest and returns a stream of HelloReply.
   */
  rpc SayHelloServerStreaming (HelloRequest) returns (stream HelloReply) {}

  /**
   * Receives a series of names and sends a greeting.
   * This method receives a stream of HelloRequest and returns a HelloReply.
   */
  rpc SayHelloClientStreaming (stream HelloRequest) returns (HelloReply) {}

  /**
   * Sends and receives a series of messages.
   * This method receives a stream of HelloRequest and returns a stream of HelloReply.
   */
  rpc SayHelloBidirectionalStreaming (stream HelloRequest) returns (stream HelloReply) {}
}

/**
 * Request message containing the user's name.
 * This message contains multiple fields to provide user information.
 */
message HelloRequest {
  /** User's name. */
  string name = 1;

  /** User's age. */
  optional int32 age = 2;

  /** User's hobbies. */
  repeated string hobbies = 3;

  /** User's other properties. */
  map<string, string> properties = 4;

  /** Nested message containing additional information. */
  NestedMessage nested_message = 5;

  /** Message type. */
  MessageType type = 6;
}

/**
 * Nested message definition.
 * This message provides additional nested information.
 */
message NestedMessage {
  /** Field within the nested message. */
  string nested_field = 1;

  /** Repeated field containing a list of numbers. */
  repeated int32 numbers = 2;

  /** Map containing the results. */
  map<string, Result> results_map = 3;
}

/**
 * Response message containing the greeting.
 * This message contains the response details of the greeting service.
 */
message HelloReply {
  /** Greeting message. */
  string message = 1;

  /** Repeated field containing the results. */
  repeated Result results = 2;

  /** Additional metadata of the response. */
  map<string, string> metadata = 3;
}

/**
 * Nested message definition.
 * This message represents a result containing a name and a code.
 */
message Result {
  /** Name of the result. */
  string result_name = 1;

  /** Code of the result. */
  int32 result_code = 2;
}
```

## Generating Documentation
You can generate the documentation by directly running the Maven plugin commands via the `mvn` command or by clicking the plugin's visual commands in `IDEA`.

```bash
# Generate AsciiDoc documentation
mvn smart-doc:grpc-adoc

# Generate HTML documentation
mvn smart-doc:grpc-html

# Generate Markdown documentation
mvn smart-doc:grpc-markdown
```

![maven-smart-doc](/assets/mvn-grpc-operate.png)

Run `smart-doc:grpc-adoc` to generate `gRPC` Asciidoc documentation.

Run `smart-doc:grpc-html` to generate `gRPC` HTML documentation.

Run `smart-doc:grpc-markdown` to generate `gRPC` Markdown documentation.
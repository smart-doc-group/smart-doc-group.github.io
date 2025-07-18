# Dubbo   <Badge type="tip" text="^1.8.7" />
## Introduction

`smart-doc` supports the generation of `Dubbo API` documents starting from version `1.8.7`. The following describes how to use the `smart-doc` tool to generate `RPC` internal interface documentation of `Dubbo`.
## Dubbo document integration
`smart-doc` has developed the `maven` plug-in and `gradle` based on the principle of simplicity of use. The plug-in can reduce the integration difficulty of `smart-doc` and remove the intrusiveness of dependencies.
You can choose relevant plug-ins according to the dependency build management tool you use. The following is an example of using the `smart-doc-maven-plugin` plug-in to integrate `smart-doc` to generate `dubbo`.
Of course, you have two options for integrating `smart-doc` to generate `Dubbo RPC` interface documentation:

- Use `smart-doc` to scan `dubbo api` module
- Use `smart-doc` to scan `dubbo provider` module

Let’s take a look at the integration methods.
### Add plugin
Add `smart-doc-maven-plugin` to your `dubbo api` or `dubbo provider` module. Of course you only need to select one method
```xml
<plugin>
     <groupId>com.ly.smart-doc</groupId>
     <artifactId>smart-doc-maven-plugin</artifactId>
     <version>[latest version]</version>
     <configuration>
         <!--Specify the configuration file used to generate documents, and place the configuration file in your own project-->
         <configFile>./src/main/resources/smart-doc.json</configFile>
         <!--Specify project name-->
         <projectName>Test</projectName>
     </configuration>
     <executions>
         <execution>
             <!--If you do not need to start smart-doc when compiling, comment out phase-->
             <phase>compile</phase>
             <goals>
                 <goal>rpc-html</goal>
                 <goal>rpc-adoc</goal>
                 <goal>rpc-markdown</goal>
                 <goal>rpc-word</goal>
             </goals>
         </execution>
     </executions>
</plugin>
```
### Add the configuration files required by smart-doc
Add the `smart-doc.json` configuration file in your `Dubbo API` or `dubbo provider` module `resources`

```json
{
   "isStrict": false, //Whether to enable strict mode
   "allInOne": true, //Whether to merge documents into one file, true is generally recommended
   "outPath": "D://md2", //Specify the output path of the document
   "projectName": "smart-doc",//Configure your own project name
   "rpcApiDependencies":[{ // The project's open dubbo api interface module depends on it. After configuration, it is output to the document to facilitate user integration.
       "artifactId":"SpringBoot2-Dubbo-Api",
       "groupId":"com.demo",
       "version":"1.0.0"
   }],
   "rpcConsumerConfig":"src/main/resources/consumer-example.conf"//Add dubbo consumer integration configuration in the document to facilitate the integration party to quickly integrate
}
```
Regarding `smart-doc`, if you need more detailed configuration when generating documents, please refer to other official documents. [Configuration items](/guide/advanced/config).

**rpcConsumerConfig:**

If you want `dubbo consumer` integration to be faster, you can add the integration configuration example `consumer-example.conf`,
`smart-doc` will output the example directly into the documentation.

```yaml
Dubbo:
   registry:
     protocol: zookeeper
     address: ${zookeeper.adrress}
     id:my-registry
   scan:
     base-packages: com.iflytek.demo.dubbo
   application:
     name: dubbo-consumer
```
## Dubbo interface scan
As mentioned above, `smart-doc` supports scanning `dubbo api` or `dubbo provider` separately. exist
The scanning principle is mainly by identifying `smart-doc` official custom `@dubbo` annotation `tag` or `Dubbo` official `@service` annotation.

### Scan Dubbo api
`dubbo api` is usually a very concise `Dubbo` interface definition. If you need `smart-doc` to scan the `Dubbo` interface, you need to add `@dubbo` annotation `tag`. Examples are as follows:

```java
/**
  * User operation
  *
  * @author yu 2019/4/22.
  * @author zhangsan 2019/4/22.
  * @version 1.0.0
  * @dubbo
  */
public interface UserService {

     /**
      * Query all users
      *
      * @return
      */
     List<User> listOfUser();

     /**
      * Query based on user id
      *
      * @param userId
      * @return
      */
     User getById(String userId);
}
```
For some special users, you may need to specify the version of the `For some special users, you may need to specify the version of the `Dubbo` service interface `@version`, the service name `@service`, and the protocol type of the interface `@protocol`. In `smart-doc`, it can also be conveniently specified.

Example:
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
- `@version` specifies the version of the Dubbo service interface
- `@service` specifies the name of the Dubbo service
- `@protocol` specifies the protocol type of the Dubbo service

#### Scan Dubbo provider
If you want to generate `RPC` interface documentation through `dubbo provider`, you do not need to add any other annotations `tag`, `smart-doc` will automatically scan the `@service` annotation.

```java
/**
  * @author yu 2019/4/22.
  */
@Service
public class UserServiceImpl implements UserService {

     private static Map<String,User> userMap = new HashMap<>();

     static {
         userMap.put("1",new User()
                 .setUid(UUIDUtil.getUuid32())
                 .setName("zhangsan")
                 .setAddress("Chengdu, Sichuan")
         );
     }
    
     /**
      * Get user
      * @param userId
      * @return
      */
     @Override
     public User getById(String userId) {
         return userMap.get(userId);
     }

     /**
      * Get user
      * @return
      */
     @Override
     public List<User> listOfUser() {
         return userMap.values().stream().collect(Collectors.toList());
     }
}
```
## Generate operations
Run the plug-in's document generation command directly through the `mvn`command or directly click the plug-in's visual command in `IDEA`.

![maven-smart-doc](/assets/20200705230512435.png)

Run `rpc-html` etc. to generate `Dubbo RPC` document
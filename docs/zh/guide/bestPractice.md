# 最佳实践

`smart-doc`是一款在编译阶段基于接口泛型定义加载和分析源代码的返回类型及请求参数类型，以自动生成接口文档的工具。
然而，如果接口定义包含下列几种数据类型，将无法被处理。

## 响应类(使用泛型定义)
大多数成熟的开发团队会采用类似的统一返回结构（为了简洁，这里省略了详细的注释；但在实际使用 `smart-doc` 时，请确保您的代码注释规范完整）。
当然，您也可以根据项目的具体需求来进行定制。

```java
public class CommonResult<T> implements Serializable {

    /**
     * 是否成功
     */
    private boolean success = false;
    private String message;
    private T data;
    private String code;
    private String timestamp;
}

```


## 接口请求
采用统一返回结构和明确的返回对象定义时，`smart-doc`能够根据接口定义自动推导出类的字段定义，包括嵌套的对象定义。
```java
/**
 * 添加用户信息
 * @param user
 * @return
 */
@PostMapping("/add")
public CommonResult<User> addUser(@RequestBody User user){
    return CommonResult.ok().setResult(user);
}

/**
 * 分页查询用户信息
 * @param user
 * @return
 */
@PostMapping("/page")
public CommonResult<Page<User>> addUser(@RequestBody UserQuery query){
    return CommonResult.ok().setResult(user);
}
```

## 错误示例
### 1. 接口中使用`Map`
因为无法分析代码中`Map`的`key`值，所以`smart-doc`无法生成好的文档。

```java
@GetMapping(value = "/object")
public Map<String, User> testMapUser() {
    return null;
}
```

### 2. 返回`JSONObject`

```java
/**
 * 返回用户信息
 * @return
 */
@GetMapping(value = "/user")
public JSONObject object() {
    return null;
}
```
团队中若存在此类模糊的返回数据定义，应予以明确批评。这种定义难以理解，不仅程序员看不懂，`smart-doc`也无法识别。

### 3. 返回`ModelMap`
 
```java
/**
 * 返回用户信息
 * @return
 */
@GetMapping(value = "/user")
public ModelMap object() {
    return null;
}

```
这个和`Map`是一个道理，并且`smart-doc`直接天生屏蔽`ModelMap`。

## 泛型命名规范
在`smart-doc`社区中，我们发现一些用户在定义实体时使用多字母组合作为泛型名称。
需要注意的是，`smart-doc` 不支持这种泛型命名方式。这种做法与更广泛的编程社区一致，
因为即使是在 `JDK` 的源代码中也没有采用这样的命名方式。
遵循约定和规范一直是 `smart-doc` 的核心理念之一，旨在促进代码文档的清晰性和易用性。

虽然没有强制性的命名规则，但在实际应用中已经形成了一些约定俗成的命名规范。以下是其中的一些示例：
- `T`: `Type`（`JAVA` 类）通用泛型类型，通常作为第一个泛型类型
- `S`: 通用泛型类型，如果需要使用多个泛型类型，可以将S作为第二个泛型类型
- `U`: 通用泛型类型，如果需要使用多个泛型类型，可以将U作为第三个泛型类型
- `V`: 通用泛型类型，如果需要使用多个泛型类型，可以将V作为第四个泛型类型
- `E`: 集合元素泛型类型，主要用于定义集合泛型类型
- `K`: 映射-键泛型类型，主要用于定义映射泛型类型
- `V`: 映射-值泛型类型，主要用于定义映射泛型类型
- `N`: `Number`数值泛型类型，主要用于定义数值类型的泛型类型
- `?`: 表示不确定的`JAVA`类型

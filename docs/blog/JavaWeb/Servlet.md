---
title: JavaWeb | Servlet
tags:
  - JavaWeb
createTime: 2025/08/24 16:20:04
permalink: /blog/xx3lncph/
cover: /JavaWeb.jpg
---

![](./JavaWeb.jpg)


## Servlet简介

### 动态资源和静态资源

> 静态资源

+ 无需在程序运行时通过代码运行生成的资源,在程序运行之前就写好的资源. 例如:html css js img ,音频文件和视频文件

**静态资源获取流程：**

![静态资源获取流程](./Servlet/img-1.jpg)

> 动态资源 

+ 需要在程序运行时通过代码运行生成的资源,在程序运行之前无法确定的数据,运行时动态生成,例如Servlet,Thymeleaf ... ...
+ 动态资源指的不是视图上的动画效果或者是简单的人机交互效果

**动态资源获取流程：**

![动态资源获取流程](./Servlet/img-2.jpg)

> 生活举例

+ 去蛋糕店买蛋糕
    + **直接买柜台上已经做好的  : 静态资源**
    + **和柜员说要求后现场制作  : 动态资源**

### Servlet简介

> **Servlet  (server applet) 是`运行在服务端(tomcat)的Java小程序`，是sun公司提供一套定义动态资源规范; 从代码层面上来讲`Servlet就是一个接口`**

+ 用来接收、处理客户端请求、响应给浏览器的动态资源。在整个Web应用中，Servlet主要负责接收处理请求、协同调度功能以及响应数据。我们可以把Servlet称为Web应用中的**控制器**

<img src="./images/1681544428055.png" alt="1681544428055" style="zoom:50%;" />

+ **不是所有的JAVA类都能用于处理客户端请求,`能处理客户端请求并做出响应的一套技术标准就是Servlet`**
+ Servlet是运行在服务端的,所以 Servlet必须在WEB项目中开发且在Tomcat这样的服务容器中运行
> **`请求响应`与`HttpServletRequest`和`HttpServletResponse`之间的`对应关系`**

![1681699577344](images/1681699577344.png)

> **Servlet的运行流程:**
>
> ![Servlet的运行流程](./Servlet/img-3.jpg)
>
> 1.**tomcat接收到请求后，会将请求报文的信息转换一个HttpServletRequest对象，该对象中包含了请求中的所有信息(请求行、请求头、请求体)**
>
> 2.**tomcat同时创建一个HttpServletResponse对象，该对象用于承装要响应的报文(请求行、请求头、请求体)**
>
> 3.**tomcat根据请求中的资源路径找到对应的servlet，将servlet实例化，调用service方法，同时将HttpServletRequest和HttpServletResponse对象传入**





## Servlet开发流程

### 目标

> 校验注册时,用户名是否被占用. 通过客户端向一个Servlet发送请求,携带username,如果用户名是'atguigu',则向客户端响应 NO,如果是其他,响应YES
>
> ![Servlet开发流程](./Servlet/img-4.jpg)

### 开发过程

> **步骤1: 开发一个web类型的module** 

+ 过程参照之前

> **步骤2: 开发一个UserServlet**

```java
1.servlet开发流程：
	1.创建javaweb项目，同时将tomcat添加为当前项目的依赖
	2.重写service方法
	3.在service方法中，定义业务处理代码
	4.在web.xml中，配置Servlet 对应的请求映射路径
   
2.servlet-api.jar 导入问题
    servlet-api	编码的时候，在服务器的环境中，由服务软件(Tomcat)提供，因此，我们的JAVAWEB项目中，打包/构建的时候，是无需携带servlet-api的jar包
    
3.Content-Type响应头的问题
    MIME类型响应头	媒体类型，文件类型，响应的数据类型
    MIME类型用于告诉客户端响应的数据是什么类型的数据，客户端以此类型决定用什么方式解析响应体
```

![Servlet开发流程](./Servlet/img-6.jpg)

```java title="Java"
public class UserServlet extends HttpServlet {
    // 重写service方法
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1.从request对象中获取请求中的如何信息(username参数)
        String username = request.getParameter("username");
        /*
        getParameter方法：根据参数名获取参数值 无论参数是在url?后，还是在请求体中
         */

        // 2.处理业务的代码
        String info = "<h1>YES<h1>";
        if ("atguigu".equals(username)) {
            info = "<h1>NO<h1>";
        }

        // 3.将要响应的数据放入response
        // 应该设置Content-Type响应头
        //response.setHeader("Content-Type", "text/html");
        response.setContentType("text/html");

        PrintWriter writer = response.getWriter();
        writer.write(info);
    }
}
```

> + **自定义一个类,要`继承HttpServlet类`**
> + **`重写service方法`,该方法主要就是`用于处理用户请求的服务方法`**
> + **`HttpServletRequest` 代表`请求对象`,是有请求报文经过tomcat转换而来的,通过该对象`可以获取请求中的信息`**
> + **`HttpServletResponse` 代表`响应对象`,该对象会被tomcat转换为响应的报文,通过该对象`可以设置响应中的信息`**
> + **`Servlet对象`的`生命周期(创建,初始化,处理服务,销毁)`是由tomcat管理的,无需我们自己new**
> + **`HttpServletRequest HttpServletResponse`两个对象也是有`tomcat负责转换`,在`调用service方法`时传入给我们用的**



> **步骤3: 在`web.xml`为`UseServlet`配置`请求的映射路径`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--
    1.配置Servlet类，并起一个别名
        servlet-class  告诉Tomcat对应的要实例化的Servlet类
        servlet-name 用于关联请求的映射路径
    -->
    <servlet>
        <!--给UserServlet起一个别名-->
        <servlet-name>userServlet</servlet-name>
        <servlet-class>fun.xingji.servlet.UserServlet</servlet-class>
    </servlet>

    <servlet-mapping>
        <!--关联别名和映射路径-->
        <servlet-name>userServlet</servlet-name>
        <!--可以为一个Servlet匹配多个不同的映射路径,但是不同的Servlet不能使用相同的url-pattern-->
        <url-pattern>/userServlet</url-pattern>
    </servlet-mapping>
    
    
    <!--
    一个servlet-name 可以同时对应多个url-pattern
    一个servlet标签可以同时对应多个servlet-mapping标签

    url-pattern:
            1.精准匹配
                /servlet1        表示通配所有资源,不包括jsp文件

            2.模糊匹配
                *作为通配符, *在哪里，哪里就是模糊的
                /        表示通配所有资源,不包括jsp文件
                /*       表示通配所有资源,包括jsp文件
                /a/*     匹配所有以a前缀的映射路径(匹配前缀，后缀模糊)
                *.action 匹配所有以action为后缀的映射路径
    -->
    <servlet>
        <servlet-name>servlet1</servlet-name>
        <servlet-class>fun.xingji.servlet.Servlet1</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>servlet1</servlet-name>
        <!--精准匹配-->
        <!--<url-pattern>/servlet1</url-pattern>-->
        <!--<url-pattern>/a/*</url-pattern>-->
        <url-pattern>*.action</url-pattern>
    </servlet-mapping>


    <!--<servlet-mapping>
        <servlet-name>servlet1</servlet-name>
        <url-pattern>/s1</url-pattern>
        <url-pattern>/xx1</url-pattern>
    </servlet-mapping>

    <servlet-mapping>
        <servlet-name>servlet1</servlet-name>
        <url-pattern>/a</url-pattern>
        <url-pattern>/b</url-pattern>
    </servlet-mapping>-->

</web-app>
```

> + **Servlet并不是文件系统中实际存在的文件或者目录,所以为了能够请求到该资源,我们需要为其配置映射路径**
> + **`servlet的请求映射`路径`配置在web.xml中`**
> + **`servlet-name`作为`servlet的别名`,可以自己随意定义,见名知意就好**
> + **`url-pattern`标签用于`定义Servlet的请求映射路径`**
> + **`一个servlet`可以对应`多个不同的url-pattern`**
> + **`多个servlet`不能使用`相同的url-pattern`**
> + **url-pattern中可以使用一些通配写法**
>   + **`/`       表示`通配所有资源,不包括jsp文件`**
>   + **`/*`      表示`通配所有资源,包括jsp文件`**
>   + **`/a/*`     匹配`所有以a前缀的映射路径`**
>   + **`*.action` 匹配`所有以action为后缀的映射路径`**



> **步骤4: 发一个form表单,向servlet发送一个get请求并携带username参数**    

```html title="HTML"
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!--
http://127.0.0.1:8080/demo02/userServlet

get请求格式: http://127.0.0.1:8080/demo02/userServlet?username=zhangsan

post请求格式: http://127.0.0.1:8080/demo02/userServlet

请求体：
    username=zhangsan
-->
<form method="get" action="userServlet">
    用户名:<input type="text" name="username"><br>
    <input type="submit" value="校验">
</form>
</body>
</html>
```

> **启动项目,访问index.html ,提交表单测试**

+ **运行测试**

> **当method="get"时:**

![Servlet开发流程](./Servlet/img-5.jpg)

<img src="./images/1681547333799.png" alt="1681547333799"  />


> **映射关系图**

![1681550398774](images/1681550398774.png)

![Servlet开发流程](./Servlet/img-7.jpg)



## Servlet注解方式配置

### @WebServlet注解源码

> 官方JAVAEEAPI文档下载地址

+  [Java EE - Technologies (oracle.com)](https://www.oracle.com/java/technologies/javaee/javaeetechnologies.html#javaee8) 

+ **@WebServlet注解的源码阅读**

```java title="Java"


package jakarta.servlet.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @since Servlet 3.0
 */
@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface WebServlet {

    /**
     * The name of the servlet
     * 相当于 servlet-name
     * @return the name of the servlet
     */
    String name() default "";

    /**
     * The URL patterns of the servlet
     * 如果只配置一个url-pattern ,则通过该属性即可,和urlPatterns属性互斥
     * @return the URL patterns of the servlet
     */
    String[] value() default {};

    /**
     * The URL patterns of the servlet
     * 如果要配置多个url-pattern ,需要通过该属性,和value属性互斥
     * @return the URL patterns of the servlet
     */
    String[] urlPatterns() default {};

    /**
     * The load-on-startup order of the servlet
     * 配置Servlet是否在项目加载时实例化
     * @return the load-on-startup order of the servlet
     */
    int loadOnStartup() default -1;

    /**
     * The init parameters of the servlet
     * 配置初始化参数
     * @return the init parameters of the servlet
     */
    WebInitParam[] initParams() default {};

    /**
     * Declares whether the servlet supports asynchronous operation mode.
     *
     * @return {@code true} if the servlet supports asynchronous operation mode
     * @see jakarta.servlet.ServletRequest#startAsync
     * @see jakarta.servlet.ServletRequest#startAsync( jakarta.servlet.ServletRequest,jakarta.servlet.ServletResponse)
     */
    boolean asyncSupported() default false;

    /**
     * The small-icon of the servlet
     *
     * @return the small-icon of the servlet
     */
    String smallIcon() default "";

    /**
     * The large-icon of the servlet
     *
     * @return the large-icon of the servlet
     */
    String largeIcon() default "";

    /**
     * The description of the servlet
     *
     * @return the description of the servlet
     */
    String description() default "";

    /**
     * The display name of the servlet
     *
     * @return the display name of the servlet
     */
    String displayName() default "";

}

```

### @WebServlet注解使用

> **使用`@WebServlet注解`替换`Servlet配置`**

```java title="Java"
package fun.xingji.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/s1")
public class Servlet1 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("Servlet1执行了");
    }
}
```





## Servlet生命周期

### 生命周期简介

> **什么是Servlet的生命周期**

-   **应用程序中的对象不仅在空间上有层次结构的关系，在时间上也会因为处于程序运行过程中的不同阶段而表现出不同状态和不同行为——这就是对象的生命周期。**
-   **简单的叙述生命周期，就是`对象在容器中`从`开始创建`到`销毁`的过程。**

> **Servlet容器**

+ Servlet对象是Servlet容器创建的，生命周期方法都是由容器(目前我们使用的是Tomcat)调用的。这一点和我们之前所编写的代码有很大不同。在今后的学习中我们会看到，越来越多的对象交给容器或框架来创建，越来越多的方法由容器或框架来调用，开发人员要尽可能多的将精力放在业务逻辑的实现上。

> **Servlet主要的生命周期执行特点:**

```java
已连接到服务器
[2025-11-23 06:13:48,349] 工件 demo02-servlet01:Web exploded: 正在部署工件，请稍候…
/*========================*/    
构造器
初始化
服务
服务
服务
/*========================*/  
23-Nov-2025 18:13:57.811 信息 [Catalina-utility-2] org.apache.catalina.startup.HostConfig.deployDirectory 把web 应用程序部署到目录 [D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\webapps\manager]
23-Nov-2025 18:14:22.252 信息 [main] org.apache.coyote.AbstractProtocol.stop 正在停止ProtocolHandler ["http-nio-8080"]
/*========================*/     
destroy
/*========================*/     
23-Nov-2025 18:14:22.256 信息 [main] org.apache.coyote.AbstractProtocol.destroy 正在销毁协议处理器 ["http-nio-8080"]
已与服务器断开连接
```

| 生命周期 | 对应方法                                                 | 执行时机               | 执行次数 |
| -------- | -------------------------------------------------------- | ---------------------- | -------- |
| 构造对象 | 构造器                                                   | 第一次请求或者容器启动 | 1        |
| 初始化   | init()                                                   | 构造完毕               | 1        |
| 处理服务 | service(HttpServletRequest req,HttpServletResponse resp) | 每次请求               | 多次     |
| 销毁     | destory()                                                | 关闭服务               | 1        |



### 生命周期测试

> **开发servlet代码**

```java title="Java"
package fun.xingji.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/**
 * 1.实例化                构造器         第一次请求或者容器启动
 *
 * 2.初始化                init          构造完毕
 *
 * 3.接收请求，处理请求 服务  service       每次请求
 *
 * 4.销毁                  destroy       关闭服务
 */
@WebServlet(value = "/servletLifeCycle", loadOnStartup = 6)
public class ServletLifeCycle extends HttpServlet {

    public ServletLifeCycle() {
        System.out.println("构造器");
    }

    @Override
    public void init() throws ServletException {
        System.out.println("初始化");
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("服务");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
```

> **配置Servlet**

```xml
  <servlet>
        <servlet-name>servletLifeCycle</servlet-name>
        <servlet-class>fun.xingji.servlet.ServletLifeCycle</servlet-class>
        <!--load-on-startup
            默认值是-1  含义是tomcat启动时不会实例化该servlet
            其他正整数   15    如果配置的是正整数则表示容器在启动时就要实例化Servlet,数字表示的是实例化的顺序  
        -->
        <load-on-startup>6</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>servletLifeCycle</servlet-name>
        <url-pattern>/servletLiftCycle</url-pattern>
    </servlet-mapping>
```



+ **请求Servlet测试:**

```java
/*========================*/ 
已连接到服务器
/*========================*/ 
[2025-11-24 01:09:31,030] 工件 demo02-servlet01:Web exploded: 正在部署工件，请稍候…
/*========================*/ 
构造器
初始化
/*========================*/ 
[2025-11-24 01:09:31,796] 工件 demo02-servlet01:Web exploded: 工件已成功部署
[2025-11-24 01:09:31,796] 工件 demo02-servlet01:Web exploded: 部署已花费 766 毫秒
24-Nov-2025 01:09:40.536 信息 [Catalina-utility-2] org.apache.catalina.startup.HostConfig.deployDirectory 把web 应用程序部署到目录 [D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\webapps\manager]
24-Nov-2025 01:09:40.817 信息 [Catalina-utility-2] org.apache.catalina.startup.HostConfig.deployDirectory Web应用程序目录[D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\webapps\manager]的部署已在[281]毫秒内完成
/*========================*/ 
服务
服务
服务
服务
/*========================*/ 
D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\bin\catalina.bat stop
Using CATALINA_BASE:   "C:\Users\LenovoHZB\AppData\Local\JetBrains\IntelliJIdea2025.2\tomcat\4b4c5744-54bb-4f91-a348-181859a03259"
Using CATALINA_HOME:   "D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9"
Using CATALINA_TMPDIR: "D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\temp"
Using JRE_HOME:        "D:\0-ProgrammingSoftware\Java\jdk-17"
Using CLASSPATH:       "D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\bin\bootstrap.jar;D:\0-ProgrammingSoftware\Tomcat\apache-tomcat-11.0.9\bin\tomcat-juli.jar"
Using CATALINA_OPTS:   ""
24-Nov-2025 01:10:00.354 信息 [main] org.apache.catalina.core.StandardServer.await 通过关闭端口接收到有效的关闭命令。正在停止服务器实例。
24-Nov-2025 01:10:00.354 信息 [main] org.apache.coyote.AbstractProtocol.pause 暂停ProtocolHandler["http-nio-8080"]
24-Nov-2025 01:10:01.042 信息 [main] org.apache.catalina.core.StandardService.stopInternal 正在停止服务[Catalina]
24-Nov-2025 01:10:01.056 信息 [main] org.apache.coyote.AbstractProtocol.stop 正在停止ProtocolHandler ["http-nio-8080"]
/*========================*/ 
destroy
/*========================*/ 
24-Nov-2025 01:10:01.074 信息 [main] org.apache.coyote.AbstractProtocol.destroy 正在销毁协议处理器 ["http-nio-8080"]
/*========================*/ 
已与服务器断开连接
/*========================*/ 
```





### default-servlet的作用

```java
Servlet在Tomcat中是单例的
Servlet的成员变量在多个多线程之中是共享的
不建议在service方法中修改成员变量     在并发请求时，会引发线程安全问题
    
default-servlet  用于加载静态资源的servlet,默认随服务启动，默认启动序号为1
```

![Servlet开发流程](./Servlet/img-8.jpg)

![Servlet开发流程](./Servlet/img-9.jpg)





### 生命周期总结

1. **通过生命周期测试我们发现Servlet对象在容器中是单例的**
2. **容器是可以处理并发的用户请求的,每个请求在容器中都会开启一个线程**
3. **多个线程可能会使用相同的Servlet对象,所以在Servlet中,我们不要轻易定义一些容易经常发生修改的成员变量**
4. **load-on-startup中定义的正整数表示实例化顺序,如果数字重复了,容器会自行解决实例化顺序问题,但是应该避免重复**
5. **Tomcat容器中,已经定义了一些随系统启动实例化的servlet,我们自定义的servlet的load-on-startup尽量不要占用数字1-5**





## Servlet继承结构

### Servlet 接口

> 源码及功能解释

+ 通过idea查看: 

![Servlet继承结构](./Servlet/img-10.jpg)

> 接口及方法说明

+ **Servlet 规范接口,所有的Servlet必须实现**

```java
public void init(ServletConfig config) throws ServletException;   
	初始化方法,容器在构造servlet对象后,自动调用的方法,容器负责实例化一个ServletConfig对象,并在调用该方法时传入
	ServletConfig对象可以为Servlet 提供初始化参数

public ServletConfig getServletConfig();
	获取ServletConfig对象的方法,后续可以通过该对象获取Servlet初始化参数

public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException;
	处理请求并做出响应的服务方法,每次请求产生时由容器调用容器创建一个ServletRequest对象和ServletResponse对象,容器在调用service方法时,传入这两个对象
      
public String getServletInfo();
	获取ServletInfo信息的方法
      
public void destroy();
	Servlet实例在销毁之前调用的方法
```

```java
1.Servlet继承结构：
 	 顶级的servlet接口
	 public interface Servlet {
   		// 初始化方法，构造完毕后，由Tomcat自动调用完成初始化功能的方法
   		void init(ServletConfig var1) throws ServletException;

    	// 获取ServletConfig对象的方法
    	ServletConfig getServletConfig();

  		// 接收用户请求，用于响应信息的方法
   		void service(ServletRequest var1, ServletResponse var2) throws ServletException, IOException;

   		// 返回Servlet字符串形式描述信息的方法
    	String getServletInfo();

     	// Servlet在回收前，由Tomcat调用的销毁方法，通常用于资源的释放工作
    	void destroy();
}
```





### GenericServlet 抽象类

> 源码解释

+ **`GenericServlet 抽象类`是对`Servlet接口`一些`固定功能的粗糙实现`,以及对`service方法的再次抽象声明`,并定义了一些`其他相关功能方法`**

```java
private transient ServletConfig config; 
	初始化配置对象作为属性
        
public GenericServlet() { } 
	构造器,为了满足继承而准备
        
public void destroy() { } 
	销毁方法的平庸实现
      
public String getInitParameter(String name) 
	获取初始参数的快捷方法
      
public EnumerationString getInitParameterNames() 
	返回所有初始化参数名的方法
      
public ServletConfig getServletConfig()
	获取初始Servlet初始配置对象ServletConfig的方法
      
public ServletContext getServletContext()
	获取上下文对象ServletContext的方法
      
public String getServletInfo() 
	获取Servlet信息的平庸实现
      
public void init(ServletConfig config) throws ServletException() 
	初始化方法的实现,并在此调用了init的重载方法
      
public void init() throws ServletException 
	重载init方法,为了让我们自己定义初始化功能的方法
      
public void log(String msg) 
public void log(String message, Throwable t)
	打印日志的方法及重载
      
public abstract void service(ServletRequest req, ServletResponse res) throws ServletException, IOException; 
	服务方法再次声明
      
public String getServletName() 
	获取ServletName的方法
```

```java
2.抽象的类	GenericServlet
public abstract class GenericServlet implements Servlet{
    private transient ServletConfig config;

    // 将抽象方法重写为普通方法，在方法内部没有如何实现代码
    public void destroy() {
    }
    
    // 重载的初始化方法，被调用的重写init方法
    public void init() throws ServletException {
    }

    // Tomcat在调用init方法时，会读取配置信息进入一个ServletConfig对象并将该对象传入init方法
    public void init(ServletConfig config) throws ServletException {
        // 将config对象存储为当前属性
        this.config = config;
        // 调用重载的无参的init
        this.init();
    }

    // 返回ServletConfig方法
    public ServletConfig getServletConfig() {
        return this.config;
    }

    // 再次抽象声明service方法
    public abstract void service(ServletRequest var1, ServletResponse var2) throws ServletException, IOException;
}
```





### HttpServlet 抽象类

> 解释

+ **abstract class HttpServlet extends GenericServlet  HttpServlet抽象类,除了基本的实现以外,`增加了更多的基础功能`**

```java
private static final String METHOD_DELETE = "DELETE";
private static final String METHOD_HEAD = "HEAD";
private static final String METHOD_GET = "GET";
private static final String METHOD_OPTIONS = "OPTIONS";
private static final String METHOD_POST = "POST";
private static final String METHOD_PUT = "PUT";
private static final String METHOD_TRACE = "TRACE";
	上述属性用于定义常见请求方式名常量值
    
public HttpServlet() {}
	构造器,用于处理继承
    
public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException
	对服务方法的实现
	在该方法中,将请求和响应对象转换成对应HTTP协议的HttpServletRequest 		        HttpServletResponse对象
     调用重载的service方法
    
public void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
	重载的service方法,被重写的service方法所调用
	在该方法中,通过请求方式判断,调用具体的do***方法完成请求的处理
    
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
protected void doHead(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
protected void doTrace(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	对应不同请求方式的处理方法
	除了doOptions和doTrace方法,其他的do*** 方法都在故意响应错误信息
```

```java
3.HttpServlet 抽象类	侧重service方法的处理
public abstract class HttpServlet extends GenericServlet {
    // 参数的父转子	调用重载的service方法
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
            // 参数的父转子
            request = (HttpServletRequest)req;
            response = (HttpServletResponse)res;
            // 调用重载的service方法
        	this.service(request, response);
    }
    
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取请求的方式
        switch (req.getMethod()) { // GET POST PUT DELETE OPTIONS...
                
            // 根据请求方式，调用对应的do...方法
            case "GET":
                this.doGet(req, resp);
                break;
            case "HEAD":
                this.doHead(req, resp);
                break;
            case "POST":
                this.doPost(req, resp);
                break;
            case "PUT":
                this.doPut(req, resp);
                break;
            case "DELETE":
                this.doDelete(req, resp);
                break;
            case "OPTIONS":
                this.doOptions(req, resp);
                break;
            case "TRACE":
                this.doTrace(req, resp);
                break;
            case "PATCH":
                this.doPatch(req, resp);
                break;
            default:
                resp.sendError(501, errMsg);
        }
    }
    
    // 故意响应405
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        "http.method_get_not_supported"
        // 故意响应405请求方式不允许的信息
        resp.sendError(405, msg);
    }
    
    // 故意响应405
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        "http.method_get_not_supported"
        // 故意响应405请求方式不允许的信息
        resp.sendError(405, msg);
    }
}
```





### 自定义Servlet

> 继承关系图解

![1682299663047](images/1682299663047.png)

+ **自定义Servlet中,`必须要对处理请求的方法进行重写`**
  
    + **要么`重写service方法`**
    + **要么`重写doGet/doPost方法`**
    
    > **不重写service方法的结果:**
    >
    > ![Servlet继承结构](./Servlet/img-11.jpg)
    >
    > ![Servlet继承结构](./Servlet/img-12.jpg)

```java
1.部分程序员推荐在servlet中重写do***方法处理请求， 理由:service方法中可能做了一些处理，如果我们直接重写service的话，父类中的service方法处理的功能则失效
    
2.目前直接重写service也没有什么问题
    
3.后续使用SpringMVC框架后，我们则无需继承HttpServlet,处理请求的方法也无需是 do*** service
    
4.如果doGet和doPost方法中,我们定义的代码一样，可以让一个方法直接调用另一个方法
总结:
	继承HttpServlet后，要么重写service方法，要么重写	doGet/doPost
```

```java
4.自定义的Servlet
class Servlet1 extends HttpServlet{
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        // 接收用户请求信息
        
        // 做出响应
        
    }
} 
```





## ServletConfig和ServletContext

###  ServletConfig的使用

> ServletConfig是什么

+ 为Servlet提供初始配置参数的一种对象,每个Servlet都有自己独立唯一的ServletConfig对象
+ 容器会为每个Servlet实例化一个ServletConfig对象,并通过Servlet生命周期的init方法传入给Servlet作为属性

<img src="./images/1682302307081.png" alt="1682302307081"  />

![Servlet继承结构](./Servlet/img-14.jpg)


> **ServletConfig是一个接口,定义了如下API**

```java title="Java"
package jakarta.servlet;
import java.util.Enumeration;
public interface ServletConfig {
    String getServletName();
    ServletContext getServletContext();
    String getInitParameter(String var1);
    Enumeration<String> getInitParameterNames();
}
```

![Servlet继承结构](./Servlet/img-13.jpg)

| 方法名                  | 作用                                                         |
| ----------------------- | ------------------------------------------------------------ |
| getServletName()        | 获取\<servlet-name>HelloServlet\</servlet-name>定义的Servlet名称 |
| getServletContext()     | 获取ServletContext对象                                       |
| getInitParameter()      | 获取配置Servlet时设置的『初始化参数』，根据名字获取值        |
| getInitParameterNames() | 获取所有初始化参数名组成的Enumeration对象                    |

> ServletConfig怎么用,测试代码如下

+ 定义Servlet

>  **定义servlet1:**

```java title="Java"
package fun.xingji.servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Enumeration;

@WebServlet(
        urlPatterns = "/servlet1",
        initParams = {@WebInitParam(name = "keya",value = "valuea"),@WebInitParam(name = "keyb",value = "valueb")}
)
public class Servlet1 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取初始配置信息即可
        ServletConfig servletConfig = getServletConfig();

        // 根据参数名获取参数值
        String keya = servletConfig.getInitParameter("keya");
        System.out.println("keya:" + keya);

        // 获取所有的初始参数的名字
        // hasMoreElements 判断有没有下一个参数，如果有返回true 如果没有返回false
        // nextElement  1.取出下一个元素   2.向下移动游标
        Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();

        while (initParameterNames.hasMoreElements()) {
            String pname = initParameterNames.nextElement();
            System.out.println(pname + "=" + getInitParameter(pname));
        }
    }
}
```

>  **定义servlet2:**

```java
package fun.xingji.servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Enumeration;

@WebServlet(
        urlPatterns = "/servlet2",
        initParams = {@WebInitParam(name = "keya",value = "value2a"),@WebInitParam(name = "keyb",value = "value2b")}
)
public class Servlet2 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 获取初始配置信息即可
        ServletConfig servletConfig = getServletConfig();

        // 根据参数名获取参数值
        String keya = servletConfig.getInitParameter("keya");
        System.out.println("keya:" + keya);

        // 获取所有的初始参数的名字
        // hasMoreElements 判断有没有下一个参数，如果有返回true 如果没有返回false
        // nextElement  1.取出下一个元素   2.向下移动游标
        Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();

        while (initParameterNames.hasMoreElements()) {
            String pname = initParameterNames.nextElement();
            System.out.println(pname + "=" + getInitParameter(pname));
        }
    }
}
```

+ **配置Servlet**

```xml
<servlet>
        <servlet-name>servlet1</servlet-name>
        <servlet-class>fun.xingji.servlet.Servlet1</servlet-class>
        <!--配置servlet1的初始参数-->
        <init-param>
            <param-name>keya</param-name>
            <param-value>valuea</param-value>
        </init-param>
        <init-param>
            <param-name>keyb</param-name>
            <param-value>valueb</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>servlet1</servlet-name>
        <url-pattern>/servlet1</url-pattern>
    </servlet-mapping>


    <servlet>
        <servlet-name>servlet2</servlet-name>
        <servlet-class>fun.xingji.servlet.Servlet2</servlet-class>
        <!--配置servlet2的初始参数-->
        <init-param>
            <param-name>keya</param-name>
            <param-value>value2a</param-value>
        </init-param>
        <init-param>
            <param-name>keyb</param-name>
            <param-value>value2b</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>servlet2</servlet-name>
        <url-pattern>/servlet2</url-pattern>
    </servlet-mapping>
```

+ **请求Servlet测试**

![Servlet继承结构](./Servlet/img-15.jpg)





### ServletContext的使用

> ServletContext是什么

+ **ServletContext对象有称呼为`上下文对象`,或者叫应用域对象(后面统一讲解域对象)**
+ **容器会为每个app创建一个独立的唯一的ServletContext对象**
+ **ServletContext对象为所有的Servlet所共享**
+ **ServletContext可以为所有的Servlet提供初始配置参数**

![1682303205351](images/1682303205351.png)

> **ServletContext怎么用**

+ **配置`ServletContext参数`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_5_0.xsd"
         version="5.0">

    <context-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </context-param>

    <context-param>
        <param-name>username</param-name>
        <param-value>zhangsan</param-value>
    </context-param>
    
</web-app>
```

+ 在Servlet中获取ServletContext并获取参数

>  **定义servlet1:**

```java title="Java"
package fun.xingji.servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Enumeration;

@WebServlet(
        urlPatterns = "/servlet1",
        initParams = {@WebInitParam(name = "keya",value = "valuea"),@WebInitParam(name = "keyb",value = "valueb")}
)
public class Servlet1 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("---------------ServletConfig获取参数---------------");

        // 获取初始配置信息即可
        ServletConfig servletConfig = getServletConfig();

        // 根据参数名获取参数值
        String keya = servletConfig.getInitParameter("keya");
        System.out.println("keya:" + keya);

        // 获取所有的初始参数的名字
        // hasMoreElements 判断有没有下一个参数，如果有返回true 如果没有返回false
        // nextElement  1.取出下一个元素   2.向下移动游标
        Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();

        while (initParameterNames.hasMoreElements()) {
            String pname = initParameterNames.nextElement();
            System.out.println(pname + "=" + getInitParameter(pname));
        }

        System.out.println("---------------ServletContext获取参数---------------");
        // 获取ServletContext对象
        ServletContext servletContext1 = getServletContext();
        ServletContext servletContext2 = servletConfig.getServletContext();
        ServletContext servletContext3 = req.getServletContext();
        System.out.println(servletContext1 == servletContext2);
        System.out.println(servletContext2 == servletContext3);
        
        // 根据参数名获取参数值
        String encoding = servletContext1.getInitParameter("encoding");
        System.out.println("encoding:" + encoding);

        // 获取所有的初始参数的名字
        // hasMoreElements 判断有没有下一个参数，如果有返回true 如果没有返回false
        // nextElement  1.取出下一个元素   2.向下移动游标
        Enumeration<String> parameterNames = servletContext1.getInitParameterNames();

        while (parameterNames.hasMoreElements()) {
            String pname = parameterNames.nextElement();
            System.out.println(pname + "=" + getInitParameter(pname));
        }
    }
}
```

>  **定义servlet2:**

```java
package fun.xingji.servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Enumeration;

@WebServlet(
        urlPatterns = "/servlet2",
        initParams = {@WebInitParam(name = "keya",value = "value2a"),@WebInitParam(name = "keyb",value = "value2b")}
)
public class Servlet2 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("---------------ServletConfig获取参数---------------");

        // 获取初始配置信息即可
        ServletConfig servletConfig = getServletConfig();

        // 根据参数名获取参数值
        String keya = servletConfig.getInitParameter("keya");
        System.out.println("keya:" + keya);

        // 获取所有的初始参数的名字
        // hasMoreElements 判断有没有下一个参数，如果有返回true 如果没有返回false
        // nextElement  1.取出下一个元素   2.向下移动游标
        Enumeration<String> initParameterNames = servletConfig.getInitParameterNames();

        while (initParameterNames.hasMoreElements()) {
            String pname = initParameterNames.nextElement();
            System.out.println(pname + "=" + getInitParameter(pname));
        }

        System.out.println("---------------ServletContext获取参数---------------");

        // 获取ServletContext对象
        ServletContext servletContext1 = getServletContext();
        ServletContext servletContext2 = servletConfig.getServletContext();
        ServletContext servletContext3 = req.getServletContext();
        System.out.println(servletContext1 == servletContext2);
        System.out.println(servletContext2 == servletContext3);

        // 根据参数名获取参数值
        String encoding = servletContext1.getInitParameter("encoding");
        System.out.println("encoding:" + encoding);

        // 获取所有的初始参数的名字
        // hasMoreElements 判断有没有下一个参数，如果有返回true 如果没有返回false
        // nextElement  1.取出下一个元素   2.向下移动游标
        Enumeration<String> parameterNames = servletContext1.getInitParameterNames();

        while (parameterNames.hasMoreElements()) {
            String pname = parameterNames.nextElement();
            System.out.println(pname + "=" + servletContext1.getInitParameter(pname));
        }
    }
}
```

+ **请求servlet测试**

![Servlet继承结构](./Servlet/img-16.jpg)







### ServletContext其他重要API

> **获取资源的真实路径**

```java title="Java"
String realPath = servletContext.getRealPath("资源在web目录中的路径");
```

+ 例如我们的目标是需要获取项目中某个静态资源的路径，不是工程目录中的路径，而是**部署目录中的路径**；我们如果直接拷贝其在我们电脑中的完整路径的话其实是有问题的，因为如果该项目以后部署到公司服务器上的话，路径肯定是会发生改变的，所以我们需要使用代码动态获取资源的真实路径.  只要使用了servletContext动态获取资源的真实路径，**那么无论项目的部署路径发生什么变化，都会动态获取项目运行时候的实际路径**，所以就不会发生由于写死真实路径而导致项目部署位置改变引发的路径错误问题

> **获取项目的上下文路径**

```java title="Java"
String contextPath = servletContext.getContextPath();
```

+ 项目的部署名称,也叫项目的上下文路径,在部署进入tomcat时所使用的路径,该路径是可能发生变化的,通过该API动态获取项目真实的上下文路径,可以**帮助我们解决一些后端页面渲染技术或者请求转发和响应重定向中的路径问题**

> **以上两种API的示例；**

```java
package fun.xingji.servlet;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/servlet3")
public class Servlet3 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext servletContext = getServletContext();

        // 获得一个指向项目部署路径位置下的某个文件/目录的磁盘真实路径的API
        String path = servletContext.getRealPath("upload");
        System.out.println(path); // D:\0-JavaWeb\atguigu-javaweb\web-all\out\artifacts\demo03_servletConfig_servletContext_Web_exploded\upload


        // 获的项目部署的上下文路径 项目的访问路径
        // 后续我们学习在项目中使用相对和绝对路径找目标资源
        // 获取项目上下文路径 项目的访问路径
        String contextPath = servletContext.getContextPath();
        System.out.println(contextPath); // /demo03(项目访问路径)
    }
}
```



>  域对象的相关API

>  + **域对象: 一些用于`存储数据和传递数据的对象`,传递数据`不同的范围`,我们称之为不同的域,`不同的域对象代表不同的域,共享数据的范围也不同`**
>  + **`ServletContext`代表`应用,`所以`ServletContext域`也叫作`应用域`,是webapp中`最大的域`,可以在`本应用内实现数据的共享和传递`**
>  + **webapp中的`三大域对象`,分别是`应用域,会话域,请求域`**
>
>  ![Servlet继承结构](./Servlet/img-17.jpg)

+ `后续我们会将三大域对象统一进行讲解和演示`,三大域对象都具有的API如下

| API                                              | 功能解释                |
| ------------------------------------------------ | ----------------------- |
| **void setAttribute(String key,Object value);*** | **向域中存储/修改数据** |
| **Object getAttribute(String key);**             | **获得域中的数据**      |
| **void removeAttribute(String key);**            | **移除域中的数据**      |

```java
// 作为域对象一定会有的API
// void setAttribute(String key,Object value); 向域中存储/修改数据
servletContext1.setAttribute("ka","va");
servletContext1.setAttribute("ka","vaa");

// Object getAttribute(String key); 获得域中的数据
servletContext1.getAttribute("ka");

// void removeAttribute(String key); 移除域中的数据
servletContext1.removeAttribute("keya");
```





## HttpServletRequest

### HttpServletRequest简介

> **HttpServletRequest是什么**

+ **`HttpServletRequest`是`一个接口`,其`父接口`是`ServletRequest`**
+ **`HttpServletRequest`是T`omcat将请求报文转换封装而来的对象`,在Tomcat`调用service方法时传入`**
+ **`HttpServletRequest`代表`客户端发来的请求`,`所有请求中的信息`都可以通过该对象获得**

![1681699577344](images/1681699577344.png)





### HttpServletRequest常见API

> **HttpServletRequest怎么用**

+ 获取请求行信息相关(方式,请求的url,协议及版本)

| API                           | 功能解释                       |
| ----------------------------- | ------------------------------ |
| StringBuffer getRequestURL(); | 获取客户端请求的url            |
| String getRequestURI();       | 获取客户端请求项目中的具体资源 |
| int getServerPort();          | 获取客户端发送请求时的端口     |
| int getLocalPort();           | 获取本应用在所在容器的端口     |
| int getRemotePort();          | 获取客户端程序的端口           |
| String getScheme();           | 获取请求协议                   |
| String getProtocol();         | 获取请求协议及版本号           |
| String getMethod();           | 获取请求方式                   |

+ 获得请求头信息相关
| API                                   | 功能解释               |
| ------------------------------------- | ---------------------- |
| String getHeader(String headerName);  | 根据头名称获取请求头   |
| EnumerationString getHeaderNames(); | 获取所有的请求头名字   |
| String getContentType();              | 获取content-type请求头 |

```java
package fun.xingji.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Enumeration;

@WebServlet("/servlet4")
public class Servlet4 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        // 行相关 GET/POST url http/1.1
        System.out.println(req.getMethod()); // 获取请求方式
        System.out.println(req.getScheme()); // 获取请求协议
        System.out.println(req.getProtocol()); // 获取请求协议及版本
        System.out.println(req.getRequestURI()); // 获取请求的url 项目内资源路径
        System.out.println(req.getRequestURL()); // 获取请求的url 项目内资源的完整路径
        System.out.println(req.getLocalPort()); // 本应用容器的端口号 8080
        System.out.println(req.getServletPath()); // 客户端发请求时使用的端口号
        System.out.println(req.getRemotePort()); // 客户端软件的端口号


        // 头相关 key:value key:value...
        // 根据名字单独获取某个请求头
        String accept = req.getHeader("Accept");
        System.out.println("Accept:" + accept);

        // 获取本次请求中所有的请求头的名字
        Enumeration<String> headerNames = req.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String hname = headerNames.nextElement();
            System.out.println(hname +  ":" + req.getHeader(hname));
        }
    }
}
```

```java
GET
http
HTTP/1.1
/demo03/servlet4
http://localhost:8080/demo03/servlet4
8080
/servlet4
9449
    
// 根据名字单独获取某个请求头s
Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
host:localhost:8080
connection:keep-alive
cache-control:max-age=0
sec-ch-ua:"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"
sec-ch-ua-mobile:?0
sec-ch-ua-platform:"Windows"
upgrade-insecure-requests:1
user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36

// 获取本次请求中所有的请求头的名字
accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
sec-fetch-site:none
sec-fetch-mode:navigate
sec-fetch-user:?1
sec-fetch-dest:document
accept-encoding:gzip, deflate, br, zstd
accept-language:zh-CN,zh;q=0.9,en;q=0.8
cookie:Webstorm-216ce06c=8d7c2b70-498c-4c39-9e69-76df1cd6efa2; apt.uid=AP-YFGMCGUNNIFB-2-1755958056037-34875527.0.2.6b933aba-006b-4c12-b4b5-a0ddc2adfcf4; Idea-8f5e3c25=f9b33290-e36b-4184-b5ce-05e461c18d93
```





+ 获得请求参数相关

| API                                                     | 功能解释                             |
| ------------------------------------------------------- | ------------------------------------ |
| String getParameter(String parameterName);              | 根据请求参数名获取请求单个参数值     |
| String[] getParameterValues(String parameterName);      | 根据请求参数名获取请求多个参数值数组 |
| EnumerationString getParameterNames();                | 获取所有请求参数名                   |
| Map<String, String[]> getParameterMap();                | 获取所有请求参数的键值对集合         |
| BufferedReader getReader() throws IOException;          | 获取读取请求体的字符输入流           |
| ServletInputStream getInputStream() throws IOException; | 获取读取请求体的字节输入流           |
| int getContentLength();                                 | 获得请求体长度的字节数               |

+ 其他API
| API                                          | 功能解释                    |
| -------------------------------------------- | --------------------------- |
| String getServletPath();                     | 获取请求的Servlet的映射路径 |
| ServletContext getServletContext();          | 获取ServletContext对象      |
| Cookie[] getCookies();                       | 获取请求中的所有cookie      |
| HttpSession getSession();                    | 获取Session对象             |
| void setCharacterEncoding(String encoding) ; | 设置请求体字符集            |

```java
package fun.xingji.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.Map;
import java.util.Set;

@WebServlet("/servlet5")
public class Servlet5 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // ==================== 获取HTTP请求参数的多种方式 ====================

        // 方式一：根据参数名获取单个参数值
        // getParameter(String name)方法用于获取指定名称的参数值（单个值）
        String username = req.getParameter("username");
        System.out.println(username);
        String userPwd = req.getParameter("userPwd");
        System.out.println(userPwd);

        // 方式二：根据参数名获取多个同名参数值（如复选框）
        // getParameterValues(String name)方法用于获取指定名称的参数值数组（多个值）
        String[] hobbies = req.getParameterValues("hobby");
        System.out.println(Arrays.toString(hobbies));

        // 方式三：遍历获取所有参数名和对应的值
        // getParameterNames()方法返回所有参数名的枚举对象
        System.out.println("===== 遍历所有请求参数 =====");
        Enumeration<String> pnames = req.getParameterNames();
        while (pnames.hasMoreElements()) {
            // 获取下一个参数名
            String pname = pnames.nextElement();
            // 根据参数名获取参数值数组
            String[] values = req.getParameterValues(pname);
            // 判断参数是否有多个值
            if (values.length > 1) {
                // 多个值的情况（如复选框），以数组形式输出
                System.out.println(pname + "=" + Arrays.toString(values));
            }else  {
                // 单个值的情况，直接输出第一个元素
                System.out.println(pname + "=" + values[0]);
            }
        }

        // 方式四：通过Map集合获取所有参数
        // getParameterMap()方法返回包含所有参数的Map集合，key为参数名，value为参数值数组
        System.out.println("===== 通过Map集合获取所有参数 =====");
        Map<String, String[]> parameterMap = req.getParameterMap();
        // 获取Map集合的entrySet，用于迭代
        Set<Map.Entry<String, String[]>> entries = parameterMap.entrySet();
        for (Map.Entry<String, String[]> entry : entries) {
            // 获取参数名
            String pname = entry.getKey();
            // 获取参数值数组
            String[] value = entry.getValue();
            // 判断参数值是否为多个
            if (value.length > 1) {
                // 多个值的情况（如复选框），以数组形式输出
                System.out.println(pname + "=" + Arrays.toString(value));
            }else{
                // 单个值的情况，直接输出第一个元素
                System.out.println(pname + "=" + value[0]);
            }
        }

        /*
        以上API专门用于获取key=value形式的参数，无论这些参数是在url后还是在请求体中
        // 获取一个从请求体中读取字符的字符输入流
        BufferedReader reader = req.getReader(); // JSON串
        // 获取一个从请求中获取二进制数据字节的输入流
        ServletInputStream inputStream = req.getInputStream(); // 文件
         */
        System.out.println(req.getServletPath());
    }
}
```

```java
zhangsan
123456
[1, 2]

===== 遍历所有请求参数 =====
username=zhangsan
userPwd=123456
hobby=[1, 2]

===== 通过Map集合获取所有参数 =====
username=zhangsan
userPwd=123456
hobby=[1, 2]

/servlet5
```







## HttpServletResponse

### HttpServletResponse简介

> **HttpServletResponse是什么**

+ **HttpServletResponse是`一个接口`,其`父接口`是`ServletResponse`**
+ **`HttpServletResponse`是`Tomcat预先创建的`,在Tomcat`调用service方法时传入`**
+ **`HttpServletResponse`代表`对客户端的响应`,该对象会被转换成`响应的报文发送给客户端`,通过该对象我们可以`设置响应信息`**

![1681699577344](images/1681699577344.png)





### HttpServletResponse的常见API

> **HttpServletRequest怎么用**

+ 设置响应行相关

| API                        | 功能解释                   |
| -------------------------- | -------------------------- |
| void setStatus(int  code); | 设置响应状态码             |

```java
// 设置响应行相关的API  HTTP/1.1   200/404/405/500/...
resp.setStatus(404);
```

![HttpServletResponse的常见API](./Servlet/img-18.jpg)




+ 设置响应头相关

| API                                                    | 功能解释                                         |
| ------------------------------------------------------ | ------------------------------------------------ |
| void setHeader(String headerName, String headerValue); | 设置/修改响应头键值对                            |
| void setContentType(String contentType);               | 设置content-type响应头及响应字符集(设置MIME类型) |

```java
String info = "<h1>hello</h1>";
// 设置响应头的相关的API
//resp.setHeader("aaa","valuea");
//resp.setHeader("Content-Type","text/html");
//resp.setHeader("Content-Length","1234");
resp.setContentType("text/html");
resp.setContentLength(info.getBytes().length);
```

![HttpServletResponse的常见API](./Servlet/img-19.jpg)



+ 设置响应体相关

| API                                                       | 功能解释                                                |
| --------------------------------------------------------- | ------------------------------------------------------- |
| PrintWriter getWriter() throws IOException;               | 获得向响应体放入信息的字符输出流                        |
| ServletOutputStream getOutputStream() throws IOException; | 获得向响应体放入信息的字节输出流                        |
| void setContentLength(int length);                        | 设置响应体的字节长度,其实就是在设置content-length响应头 |

```java
String info = "<h1>hello</h1>";

// 设置响应体内容API
// 获得一个向响应体中输入文本字符输出流
PrintWriter writer = resp.getWriter();
writer.write(info);

// 获得一个向响应体中输入二进制信息的字节输出流
// ServletOutputStream outputStream = resp.getOutputStream();
```

![HttpServletResponse的常见API](./Servlet/img-20.jpg)



+ 其他API

| API                                                          | 功能解释                                            |
| ------------------------------------------------------------ | --------------------------------------------------- |
| void sendError(int code, String message) throws IOException; | 向客户端响应错误信息的方法,需要指定响应码和响应信息 |
| void addCookie(Cookie cookie);                               | 向响应体中增加cookie                                |
| void setCharacterEncoding(String encoding);                  | 设置响应体字符集                                    |

> MIME类型

+ MIME类型,可以理解为文档类型,用户表示传递的数据是属于什么类型的文档
+ 浏览器可以根据MIME类型决定该用什么样的方式解析接收到的响应体数据
+ 可以这样理解: 前后端交互数据时,告诉对方发给对方的是 html/css/js/图片/声音/视频/... ...
+ tomcat/conf/web.xml中配置了常见文件的拓展名和MIMIE类型的对应关系
+ 常见的MIME类型举例如下

| 文件拓展名                  | MIME类型               |
| --------------------------- | ---------------------- |
| .html                       | text/html              |
| .css                        | text/css               |
| .js                         | application/javascript |
| .png /.jpeg/.jpg/... ...    | image/jpeg             |
| .mp3/.mpe/.mpeg/ ... ...    | audio/mpeg             |
| .mp4                        | video/mp4              |
| .m1v/.m1v/.m2v/.mpe/... ... | video/mpeg             |





## 请求转发和响应重定向

### 概述

> **什么是`请求转发`和`响应重定向`**

+ **请求转发和响应重定向是web应用中间接访问项目资源的两种手段,也是`Servlet控制页面跳转的两种手段`**

+ **`请求转发`通过`HttpServletRequest实现`,`响应重定向`通过`HttpServletResponse实现`**

+ **请求转发生活举例: 张三找李四借钱,`李四没有`,李四`找王五`,`让王五借给张三`**

```mermaid
graph TD
    subgraph "请求转发 (Request Forwarding)"
        A[用户/浏览器] -->|请求| B[Servlet A]
        B -->|转发请求| C[Servlet B]
        C -->|响应| A
        B -.->|用户不知道转发| C
    end
```



+ **响应重定向生活举例:张三找李四借钱,`李四没有`,李四`让张三去找王五`,`张三自己再去找王五借钱`**

```mermaid
graph TD
    subgraph "响应重定向 (Response Redirect)"
        D[用户/浏览器] -->|① 请求| E[Servlet A]
        E -->|② 302响应 + Location头| D
        D -->|③ 新请求| F[Servlet B]
        F -->|④ 响应| D
    end
```





### 请求转发

> **请求转发运行逻辑图**

![1682321228643](images/1682321228643.png)

![请求转发](./Servlet/img-21.jpg)

```mermaid
graph TD
    subgraph "请求转发 (Request Forwarding)"
        A[用户/浏览器] -->|请求| B[Servlet A]
        B -->|转发请求| C[Servlet B]
        C -->|响应| A
        B -.->|用户不知道转发| C
    end
```

> 请求转发特点(背诵)

+ **请求转发通过HttpServletRequest对象获取请求转发器实现**
+ **请求转发是服务器内部的行为,对客户端是屏蔽的**
+ **客户端只发送了一次请求,客户端地址栏不变**
+ **服务端只产生了一对请求和响应对象,这一对请求和响应对象会继续传递给下一个资源**
+ **因为全程只有一个HttpServletRequset对象,所以请求参数可以传递,请求域中的数据也可以传递**
+ **请求转发可以转发给其他Servlet动态资源,也可以转发给一些静态资源以实现页面跳转**
+ **请求转发可以转发给WEB-INF下受保护的资源**
+ **请求转发不能转发到本项目以外的外部资源**

> **请求转发测试代码**

![请求转发](./Servlet/img-23.jpg)

```java
1.请求转发是通过HttpServletRequest对象实现
    
2.请求转发是服务器内部行为，对客户端是屏蔽的
    
3.客户端只产生了一对request和response对象
    
4.客户端的地址栏是不变的
    
5.请求参数是可以继续传递的
    
6.目标资源可以是servlet动态资源 也可以是html静态资源
    
7.目标资源可以是WEB-INF下受保护的资源 该方式也是WEB-INF下的资源的唯一访问方式
    
8.目标资源不可以是外部的资源
```

+ **ServletA**

```java title="Java"
@WebServlet("/servletA")
public class ServletA extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servletA 执行了");

        // 获取参数
        String money = req.getParameter("money");
        System.out.println("servletA获得参数:money=" + money);
 
        // 获取请求转发器
        // 请求转发给ServletB ok
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("servletB");
        //  转发给一个视图资源 ok
        //RequestDispatcher requestDispatcher = req.getRequestDispatcher("a.html");
        //  转发给WEB-INF下的资源  ok
        //RequestDispatcher requestDispatcher = req.getRequestDispatcher("WEB-INF/b.html");
        //  转发给外部资源   no
        //RequestDispatcher requestDispatcher = req.getRequestDispatcher("http://www.atguigu.com");
        
        // 让请求转发器做出转发动作
        requestDispatcher.forward(req, resp);
    }
}
```



+ **ServletB**

```java title="Java"
@WebServlet("/servletB")
public class ServletB extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servletB 执行了");

        // 获取参数
        String money = req.getParameter("money");
        System.out.println("servletB获得参数:money=" + money);
    }
}
```



+ 打开浏览器,输入以下url测试

```http title="http"
http://localhost:8080/demo04/servletA?money=1000
```

![请求转发](./Servlet/img-22.jpg)





### 响应重定向

> **响应重定向运行逻辑图**

![1682322460011](images/1682322460011.png)

![响应重定向](./Servlet/img-24.jpg)

```mermaid
graph TD
    subgraph "响应重定向 (Response Redirect)"
        D[用户/浏览器] -->|① 请求| E[Servlet A]
        E -->|② 302响应 + Location头| D
        D -->|③ 新请求| F[Servlet B]
        F -->|④ 响应| D
    end
```

> 响应重定向特点(背诵)

+ **响应重定向通过HttpServletResponse对象的sendRedirect方法实现**
+ **响应重定向是服务端通过302响应码和路径,告诉客户端自己去找其他资源,是在服务端提示下的,客户端的行为**
+ **客户端至少发送了两次请求,客户端地址栏是要变化的**
+ **服务端产生了多对请求和响应对象,且请求和响应对象不会传递给下一个资源**
+ **因为全程产生了多个HttpServletRequset对象,所以请求参数不可以传递,请求域中的数据也不可以传递**
+ **重定向可以是其他Servlet动态资源,也可以是一些静态资源以实现页面跳转**
+ **重定向不可以到给WEB-INF下受保护的资源**
+ **重定向可以到本项目以外的外部资源**

> **响应重定向测试代码**

![响应重定向](./Servlet/img-26.jpg)

```java
1.重定向是通过HttpServletResponse对象实现
    
2.响应重定向是服务端提示下的，客户端行为
    
3.客户端的地址栏是变化的
    
4.客户端至少发送了两次请求 客户端产生了多次请求
    
5.请求产生了多次  后端就会有多个request对象 此时请求中的参数不能继续自动传递
    
6.目标资源可以是视图资源
    
7.目标资源不可以是WEB-INF下的资源
    
8.目标资源可以是外部资源

重点: 同样能够实现页面跳转，优先使用响应重定向
```



+ **ServletA**

```java title="Java"
@WebServlet("/servlet1")
public class Servlet1 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 接收用户请求
        System.out.println("servlet1 执行了");

        // 获取参数
        System.out.println("servlet1 got money:" + req.getParameter("money"));

        // 响应重定向    1.设置响应状态码为302  2.同时设置location响应头
        // 重定向到servlet动态资源 OK
        resp.sendRedirect("servlet2");
        // 重定向到视图静态资源 OK
        //resp.sendRedirect("a.html");
        // 重定向到WEB-INF下的资源 NO
        //resp.sendRedirect("WEB-INF/b.html");
        // 重定向到外部资源 ok
        //resp.sendRedirect("http://www.atguigu.com");
    }
}
```

+ **ServletB**

```java title="Java"
@WebServlet("/servlet2")
public class Servlet2 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("servlet2 执行了");

        // 获取参数
        System.out.println("servlet2 got money:" + req.getParameter("money"));
    }
}
```

+ 打开浏览器,输入以下url测试

``` url
http://localhost:8080/demo04/servlet2
```

![响应重定向](./Servlet/img-25.jpg)





## web乱码和路径问题总结

### 乱码问题
> 乱码问题产生的根本原因是什么

1. 数据的编码和解码使用的不是同一个字符集
2. 使用了不支持某个语言文字的字符集

> 各个字符集的兼容性



<img src="./images/1682326867396.png" alt="1682326867396" style="zoom:80%;" />


+ 由上图得知,上述字符集都兼容了ASCII
+ ASCII中有什么? 英文字母和一些通常使用的符号,所以这些东西无论使用什么字符集都不会乱码



#### HTML乱码问题

> 设置项目文件的字符集要使用一个支持中文的字符集

+ 查看当前文件的字符集

<img src="./images/1682325817829.png" alt="1682325817829"  />

+ 查看项目字符集 配置,将Global Encoding 全局字符集,Project Encoding 项目字符集, Properties Files 属性配置文件字符集设置为UTF-8

<img src="./images/1682326229063.png" alt="1682326229063"  />

> 当前视图文件的字符集通过<meta charset="UTF-8"> 来告知浏览器通过什么字符集来解析当前文件

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    中文
</body>
</html>
```

#### Tomcat控制台乱码

> 在tomcat10.1.7这个版本中,修改 tomcat/conf/logging.properties中,所有的UTF-8为GBK即可

+ 修改前

<img src="./images/1681443202115.png" alt="1681443202115"  />

+ 修改后

<img src="./images/1681443273573.png" alt="1681443273573"  />

+ 重启测试

<img src="./images/1681443314432.png" alt="1681443314432"  />

<img src="./images/1682325615922.png" alt="1682325615922"  />

> sout乱码问题,设置JVM加载.class文件时使用UTF-8字符集

+ 设置虚拟机加载.class文件的字符集和编译时使用的字符集一致

![1695189588009](images/1695189588009.png)



#### 请求乱码问题

##### GET请求乱码

> GET请求方式乱码分析

+ GET方式提交参数的方式是将参数放到URL后面,如果使用的不是UTF-8,那么会对参数进行URL编码处理
+ HTML中的 <meta charset='字符集'/> 影响了GET方式提交参数的URL编码
+ tomcat10.1.7的URI编码默认为 UTF-8
+ 当GET方式提交的参数URL编码和tomcat10.1.7默认的URI编码不一致时,就会出现乱码

> GET请求方式乱码演示

+ 浏览器解析的文档的<meta charset="GBK" /> 

<img src="./images/1682385870660.png" alt="1682385870660" style="zoom: 67%;" />


+ GET方式提交时,会对数据进行URL编码处理 ,是将GBK 转码为 "百分号码"

<img src="./images/1682385997927.png" alt="1682385997927" style="zoom: 80%;" />

+ tomcat10.1.7 默认使用UTF-8对URI进行解析,造成前后端使用的字符集不一致,出现乱码

<img src="./images/1682386110151.png" alt="1682386110151" style="zoom: 80%;" />

> GET请求方式乱码解决

+ 方式1  :设置GET方式提交的编码和Tomcat10.1.7的URI默认解析编码一致即可 (推荐)

<img src="./images/1682386298048.png" alt="1682386298048" style="zoom: 75%;" />



<img src="./images/1682386374464.png" alt="1682386374464" style="zoom:85%;" />



+ 方式2 : 设置Tomcat10.1.7的URI解析字符集和GET请求发送时所使用URL转码时的字符集一致即可,修改conf/server.xml中 Connecter 添加 URIEncoding="GBK"  (不推荐)

![1682386551684](images/1682386551684.png)

<img src="./images/1682386611945.png" alt="1682386611945" style="zoom: 50%;" />


##### POST方式请求乱码

> POST请求方式乱码分析

+ POST请求将参数放在请求体中进行发送
+ 请求体使用的字符集受到了<meta charset="字符集"/> 的影响
+ Tomcat10.1.7 默认使用UTF-8字符集对请求体进行解析
+ 如果请求体的URL转码和Tomcat的请求体解析编码不一致,就容易出现乱码

> POST方式乱码演示

+ POST请求请求体受到了<meta charset="字符集"/> 的影响

<img src="./images/1682387258428.png" alt="1682387258428" style="zoom:67%;" />


+ 请求体中,将GBK数据进行 URL编码

<img src="./images/1682387349916.png" alt="1682387349916" style="zoom: 85%;" />

+ 后端默认使用UTF-8解析请求体,出现字符集不一致,导致乱码

<img src="./images/1682387412704.png" alt="1682387412704" style="zoom: 67%;" />


> POST请求方式乱码解决

+ 方式1 : 请求时,使用UTF-8字符集提交请求体 (推荐)

<img src="./images/1682387836615.png" alt="1682387836615" style="zoom: 67%;" />

<img src="./images/1682387857587.png" alt="1682387857587" style="zoom:88%;" />

+ 方式2 : 后端在获取参数前,设置解析请求体使用的字符集和请求发送时使用的字符集一致 (不推荐)

<img src="./images/1682388026978.png" alt="1682388026978" style="zoom: 75%;" />





#### 响应乱码问题

> 响应乱码分析

+ 在Tomcat10.1.7中,向响应体中放入的数据默认使用了工程编码 UTF-8
+ 浏览器在接收响应信息时,使用了不同的字符集或者是不支持中文的字符集就会出现乱码

> 响应乱码演示

+ 服务端通过response对象向响应体添加数据



![1682388204239](images/1682388204239.png)

+ 浏览器接收数据解析乱码

<img src="./images/1682388599014.png" alt="1682388599014" style="zoom:80%;" />




> 响应乱码解决

+ 方式1 : 手动设定浏览器对本次响应体解析时使用的字符集(不推荐)
    + edge和 chrome浏览器没有提供直接的比较方便的入口,不方便

+ 方式2: 后端通过设置响应体的字符集和浏览器解析响应体的默认字符集一致(不推荐)

<img src="./images/1682389063225.png" alt="1682389063225" style="zoom: 75%;" />




方式3: 通过设置content-type响应头,告诉浏览器以指定的字符集解析响应体(推荐)

<img src="./images/1682389263627.png" alt="1682389263627"  />




<img src="./images/1682389317234.png" alt="1682389317234" style="zoom: 67%;" />



###  路径问题

> 相对路径和绝对路径

+ 相对路径
    + 相对路径的规则是: 以当前资源所在的路径为出发点去寻找目标资源
    + 相对路径不以 / 开头
    + 在file协议下,使用的是磁盘路径
    + 在http协议下,使用的是url路径
    + 相对路径中可以使用 ./表示当前资源所在路径,可以省略不写
    + 相对路径中可以使用../表示当前资源所在路径的上一层路径,需要时要手动添加

+ 绝对路径
    + 绝对路径的规则是: 使用以一个固定的路径做出出发点去寻找目标资源,和当前资源所在的路径没有关系
    + 绝对路径要以/ 开头
    + 绝对路径的写法中,不以当前资源的所在路径为出发点,所以不会出现  ./ 和../
    + 不同的项目和不同的协议下,绝对路径的基础位置可能不同,要通过测试确定
    + 绝对路径的好处就是:无论当前资源位置在哪,寻找目标资源路径的写法都一致
+ 应用场景
    1. 前端代码中,href src action 等属性
    2. 请求转发和重定向中的路径

#### 前端路径问题

> 前端项目结构

![1682390999417](images/1682390999417.png)

##### 相对路径情况分析

> 相对路径情况1:web/index.html中引入web/static/img/logo.png

+ 访问index.html的url为   :  http://localhost:8080/web03_war_exploded/index.html
+ 当前资源为                      :  index.html
+ 当前资源的所在路径为  : http://localhost:8080/web03_war_exploded/
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/static/img/logo.png
+ index.html中定义的了    : `<img src="static/img/logo.png"/>`
+ 寻找方式就是在当前资源所在路径(http://localhost:8080/web03_war_exploded/)后拼接src属性值(static/img/logo.png),正好是目标资源正常获取的url(http://localhost:8080/web03_war_exploded/static/img/logo.png)

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    
    <img src="static/img/logo.png">
</body>
</html>


```

> 相对路径情况2:web/a/b/c/test.html中引入web/static/img/logo.png

+ 访问test.html的url为      :  http://localhost:8080/web03_war_exploded/a/b/c/test.html
+ 当前资源为                      :  test.html
+ 当前资源的所在路径为  : http://localhost:8080/web03_war_exploded/a/b/c/
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/static/img/logo.png
+ test.html中定义的了       : `<img src="../../../static/img/logo.png"/>`
+ 寻找方式就是在当前资源所在路径(http://localhost:8080/web03_war_exploded/a/b/c/)后拼接src属性值(../../../static/img/logo.png),其中 ../可以抵消一层路径,正好是目标资源正常获取的url(http://localhost:8080/web03_war_exploded/static/img/logo.png)

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <!-- ../代表上一层路径 -->
    <img src="../../../static/img/logo.png">
</body>
</html>
```

> 相对路径情况3:web/WEB-INF/views/view1.html中引入web/static/img/logo.png

+ view1.html在WEB-INF下,需要通过Servlet请求转发获得

```java title="Java"
@WebServlet("/view1Servlet")
public class View1Servlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("WEB-INF/views/view1.html");
        requestDispatcher.forward(req,resp);
    }
}
```

+ 访问view1.html的url为   :  http://localhost:8080/web03_war_exploded/view1Servlet
+ 当前资源为                      :  view1Servlet
+ 当前资源的所在路径为  : http://localhost:8080/web03_war_exploded/
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/static/img/logo.png
+ view1.html中定义的了    : `<img src="static/img/logo.png"/>`
+ 寻找方式就是在当前资源所在路径(http://localhost:8080/web03_war_exploded/)后拼接src属性值(static/img/logo.png),正好是目标资源正常获取的url(http://localhost:8080/web03_war_exploded/static/img/logo.png)

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<img src="static/img/logo.png">
</body>
</html>
```

##### 绝对路径情况分析
> 绝对路径情况1:web/index.html中引入web/static/img/logo.png

+ 访问index.html的url为   :  http://localhost:8080/web03_war_exploded/index.html
+ 绝对路径的基准路径为  :  http://localhost:8080
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/static/img/logo.png
+ index.html中定义的了    : `<img src="/web03_war_exploded/static/img/logo.png"/>`
+ 寻找方式就是在基准路径(http://localhost:8080)后面拼接src属性值(/web03_war_exploded/static/img/logo.png),得到的正是目标资源访问的正确路径

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <!-- 绝对路径写法 -->
    <img src="/web03_war_exploded/static/img/logo.png">
</body>
</html>


```

> 绝对路径情况2:web/a/b/c/test.html中引入web/static/img/logo.png

+ 访问test.html的url为   :  http://localhost:8080/web03_war_exploded/a/b/c/test.html
+ 绝对路径的基准路径为  :  http://localhost:8080
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/static/img/logo.png
+ test.html中定义的了    : `<img src="/web03_war_exploded/static/img/logo.png"/>`
+ 寻找方式就是在基准路径(http://localhost:8080)后面拼接src属性值(/web03_war_exploded/static/img/logo.png),得到的正是目标资源访问的正确路径

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <!-- 绝对路径写法 -->
    <img src="/web03_war_exploded/static/img/logo.png">
</body>
</html>
```

> 绝对路径情况3:web/WEB-INF/views/view1.html中引入web/static/img/logo.png

+ view1.html在WEB-INF下,需要通过Servlet请求转发获得

```java title="Java"
@WebServlet("/view1Servlet")
public class View1Servlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("WEB-INF/views/view1.html");
        requestDispatcher.forward(req,resp);
    }
}
```

+ 访问view1.html的url为   :  http://localhost:8080/web03_war_exploded/view1Servlet
+ 绝对路径的基准路径为  :  http://localhost:8080
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/static/img/logo.png
+ view1.html中定义的了    : `<img src="/web03_war_exploded/static/img/logo.png"/>`
+ 寻找方式就是在基准路径(http://localhost:8080)后面拼接src属性值(/static/img/logo.png),得到的正是目标资源访问的正确路径

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<img src="/web03_war_exploded/static/img/logo.png">
</body>
</html>
```

##### base标签的使用

> base标签定义页面相对路径公共前缀

+ base 标签定义在head标签中,用于定义相对路径的公共前缀
+ base 标签定义的公共前缀只在相对路径上有效,绝对路径中无效
+ 如果相对路径开头有 ./ 或者../修饰,则base标签对该路径同样无效

> index.html 和a/b/c/test.html 以及view1Servlet 中的路径处理

```html title="HTML"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--定义相对路径的公共前缀,将相对路径转化成了绝对路径-->
    <base href="/web03_war_exploded/">
</head>
<body>
    <img src="static/img/logo.png">
</body>
</html>
```

##### 缺省项目上下文路径

> 项目上下文路径变化问题

+ 通过 base标签虽然解决了相对路径转绝对路径问题,但是base中定义的是项目的上下文路径
+ 项目的上下文路径是可以随意变化的
+ 一旦项目的上下文路径发生变化,所有base标签中的路径都需要改

> 解决方案

+ 将项目的上下文路径进行缺省设置,设置为 /,所有的绝对路径中就不必填写项目的上下文了,直接就是/开头即可

#### 重定向中的路径问题

> 目标 :由/x/y/z/servletA重定向到a/b/c/test.html

```java title="Java"
@WebServlet("/x/y/z/servletA")
public class ServletA extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
    }
}

```

##### 相对路径写法

+ 访问ServletA的url为   :  http://localhost:8080/web03_war_exploded/x/y/z/servletA
+ 当前资源为                      :  servletA
+ 当前资源的所在路径为  : http://localhost:8080/web03_war_exploded/x/x/z/
+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/a/b/c/test.html
+ ServletA重定向的路径    :  ../../../a/b/c/test/html
+ 寻找方式就是在当前资源所在路径(http://localhost:8080/web03_war_exploded/x/y/z/)后拼接(../../../a/b/c/test/html),形成(http://localhost:8080/web03_war_exploded/x/y/z/../../../a/b/c/test/html)每个../抵消一层目录,正好是目标资源正常获取的url(http://localhost:8080/web03_war_exploded/a/b/c/test/html)

```java title="Java"
@WebServlet("/x/y/z/servletA")
public class ServletA extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 相对路径重定向到test.html
        resp.sendRedirect("../../../a/b/c/test.html");
    }
}
```

##### 绝对路径写法

+ 访问ServletA的url为   :  http://localhost:8080/web03_war_exploded/x/y/z/servletA

+ 绝对路径的基准路径为  :  http://localhost:8080

+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/a/b/c/test.html

+ ServletA重定向的路径    : /web03_war_exploded/a/b/c/test.html

+ 寻找方式就是在基准路径(http://localhost:8080)后面拼接(/web03_war_exploded/a/b/c/test.html),得到( http://localhost:8080/web03_war_exploded/a/b/c/test.html)正是目标资源访问的正确路径

+ 绝对路径中需要填写项目上下文路径,但是上下文路径是变换的

    + 可以通过 ServletContext的getContextPath()获取上下文路径
    + 可以将项目上下文路径定义为 / 缺省路径,那么路径中直接以/开头即可

    ```java title="Java"
    //绝对路径中,要写项目上下文路径
    //resp.sendRedirect("/web03_war_exploded/a/b/c/test.html");
    // 通过ServletContext对象动态获取项目上下文路径
    //resp.sendRedirect(getServletContext().getContextPath()+"/a/b/c/test.html");
    // 缺省项目上下文路径时,直接以/开头即可
    resp.sendRedirect("/a/b/c/test.html");
    ```

    

#### 请求转发中的路径问题

> 目标 :由x/y/servletB请求转发到a/b/c/test.html

```java title="Java"
@WebServlet("/x/y/servletB")
public class ServletB extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }
}
```

##### 相对路径写法

+ 访问ServletB的url为       :  http://localhost:8080/web03_war_exploded/x/y/servletB

+ 当前资源为                      :  servletB

+ 当前资源的所在路径为  : http://localhost:8080/web03_war_exploded/x/x/

+ 要获取的目标资源url为 :  http://localhost:8080/web03_war_exploded/a/b/c/test.html

+ ServletA请求转发路径    :  ../../a/b/c/test/html

+ 寻找方式就是在当前资源所在路径(http://localhost:8080/web03_war_exploded/x/y/)后拼接(../../a/b/c/test/html),形成(http://localhost:8080/web03_war_exploded/x/y/../../a/b/c/test/html)每个../抵消一层目录,正好是目标资源正常获取的url(http://localhost:8080/web03_war_exploded/a/b/c/test/html)

    ```java title="Java"
    @WebServlet("/x/y/servletB")
    public class ServletB extends HttpServlet {
        @Override
        protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            RequestDispatcher requestDispatcher = req.getRequestDispatcher("../../a/b/c/test.html");
            requestDispatcher.forward(req,resp);
        }
    }
    
    
    ```

##### 绝对路径写法

+ 请求转发只能转发到项目内部的资源,其绝对路径无需添加项目上下文路径

+ 请求转发绝对路径的基准路径相当于http://localhost:8080/web03_war_exploded

+ 在项目上下文路径为缺省值时,也无需改变,直接以/开头即可

    ```java title="java"
    @WebServlet("/x/y/servletB")
    public class ServletB extends HttpServlet {
        @Override
        protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            RequestDispatcher requestDispatcher = req.getRequestDispatcher("/a/b/c/test.html");
            requestDispatcher.forward(req,resp);
        }
    }
    ```

##### 目标资源内相对路径处理

+ 此时需要注意,请求转发是服务器行为,浏览器不知道,地址栏不变化,相当于我们访问test.html的路径为http://localhost:8080/web03_war_exploded/x/y/servletB

+ 那么此时 test.html资源的所在路径就是http://localhost:8080/web03_war_exploded/x/y/所以test.html中相对路径要基于该路径编写,如果使用绝对路径则不用考虑

    ```html title="HTML"
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <!--
    		当前资源路径是     http://localhost:8080/web03_war_exploded/x/y/servletB
            当前资源所在路径是  http://localhost:8080/web03_war_exploded/x/y/
            目标资源路径=所在资源路径+src属性值 
    		http://localhost:8080/web03_war_exploded/x/y/../../static/img/logo.png
            http://localhost:8080/web03_war_exploded/static/img/logo.png
    		得到目标路径正是目标资源的访问路径	
        -->
    <img src="../../static/img/logo.png">
    </body>
    </html>
    ```







## MVC架构模式

>  MVC（Model View Controller）是软件工程中的一种**`软件架构模式`**，它把软件系统分为**`模型`**、**`视图`**和**`控制器`**三个基本部分。用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。

+ **M**：Model 模型层,具体功能如下
    1. 存放和数据库对象的实体类以及一些用于存储非数据库表完整相关的VO对象
    2. 存放一些对数据进行逻辑运算操作的的一些业务处理代码

+ **V**：View 视图层,具体功能如下
    1. 存放一些视图文件相关的代码 html css js等
    2. 在前后端分离的项目中,后端已经没有视图文件,该层次已经衍化成独立的前端项目

+ **C**：Controller 控制层,具体功能如下
    1. 接收客户端请求,获得请求数据
     2. 将准备好的数据响应给客户端

> MVC模式下,项目中的常见包

+ M:
    1. 实体类包(pojo /entity /bean) 专门存放和数据库对应的实体类和一些VO对象
    2. 数据库访问包(dao/mapper)  专门存放对数据库不同表格CURD方法封装的一些类
    3. 服务包(service)                       专门存放对数据进行业务逻辑运算的一些类

+ C:
    1. 控制层包(controller)

+ V:
    1. web目录下的视图资源 html css js img 等
    2. 前端工程化后,在后端项目中已经不存在了



+ **非前后端分离的MVC**

![1690349913931](images/1690349913931.png)

```mermaid
graph TB
    subgraph "服务器 Server"
        subgraph "应用 app"
            subgraph "V层 View"
                V1[.html文件]
                V2[.css文件]
                V3[.js文件]
                V4[img等静态资源]
            end
            
            subgraph "C层 Controller"
                C[controller包]
            end
            
            subgraph "M层 Model"
                M1[service包]
                M2[dao包]
                M3[pojo包]
            end
        end
    end
    
    User[用户/浏览器] -->|HTTP请求| C
    C -->|调用| M1
    M1 -->|调用| M2
    M2 -->|操作| Database[(数据库)]
    M2 -->|返回数据| M1
    M1 -->|返回数据| C
    C -->|选择视图| V1
    V1 -->|应用样式| V2
    V1 -->|添加交互| V3
    C -->|返回完整页面| User
    
    %% 样式
    classDef view fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef controller fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef model fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef user fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef server fill:#f5f5f5,stroke:#616161,stroke-width:2px
    
    class V1,V2,V3,V4 view
    class C controller
    class M1,M2,M3 model
    class User user
    class Server server
```





+ **前后端分离的MVC**

![1683363039636](images/1683363039636-1690349401673.png)

```mermaid
graph TB
    subgraph "前端服务器 Frontend Server"
        subgraph "前端应用 Frontend App"
            subgraph "View 视图层"
                V1[HTML/CSS/JS]
                V2[前端框架组件]
            end
            
            subgraph "Controller 控制层"
                C1[前端路由]
                C2[状态管理]
                C3[事件处理]
            end
        end
    end
    
    subgraph "后端服务器 Backend Server"
        subgraph "后端应用 Backend App"
            subgraph "C层 Controller"
                BC[controller包<br/>RESTful API]
            end
            
            subgraph "M层 Model"
                BM1[service包<br/>业务逻辑]
                BM2[dao包<br/>数据访问]
                BM3[pojo包<br/>实体类]
            end
        end
    end
    
    User[用户/浏览器] -->|访问SPA| Frontend
    Frontend -->|加载静态资源| User
    
    C1 -->|用户交互| V1
    V1 -->|数据更新| C2
    C3 -->|API调用| BC
    
    BC -->|调用| BM1
    BM1 -->|调用| BM2
    BM2 -->|操作| Database[(数据库)]
    BM2 -->|返回数据| BM1
    BM1 -->|返回数据| BC
    BC -->|JSON响应| C3
    C3 -->|更新状态| C2
    C2 -->|更新视图| V1
    V1 -->|渲染更新| User
    
    %% 样式
    classDef frontendView fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef frontendController fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef backendController fill:#fff8e1,stroke:#ff8f00,stroke-width:2px
    classDef backendModel fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef user fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef frontendServer fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef backendServer fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    class V1,V2 frontendView
    class C1,C2,C3 frontendController
    class BC backendController
    class BM1,BM2,BM3 backendModel
    class User user
    class FrontendServer frontendServer
    class BackendServer backendServer
```







## 案例开发-日程管理-第二期

### 项目搭建

#### 数据库准备

+ 创建schedule_system数据库并执行如下语句

``` sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


-- ----------------------------
-- 创建日程表
-- ----------------------------
DROP TABLE IF EXISTS `sys_schedule`;
CREATE TABLE `sys_schedule`  (
  `sid` int NOT NULL AUTO_INCREMENT,
  `uid` int NULL DEFAULT NULL,
  `title` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `completed` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- 插入日程数据
-- ----------------------------

-- ----------------------------
-- 创建用户表
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_pwd` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`uid`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- 插入用户数据
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `sys_user` VALUES (2, 'lisi', 'e10adc3949ba59abbe56e057f20f883e');

SET FOREIGN_KEY_CHECKS = 1;
```

+ 获得如下表格

![1690362496438](images/1690362496438.png)

![1690362518448](images/1690362518448.png)





#### 项目结构

![1690362672386](images/1690362672386.png)

![1690362709902](images/1690362709902.png)



#### 导入依赖

![1690362787035](images/1690362787035.png)





#### pojo包处理

>  **使用`lombok`处理`getter setter equals hashcode`构造器**
>
>  ```java
>  1.实体类的类名和表格名称应该对应  (对应不是一致)
>      
>  2.实体类的属性名和表格的列名应该对应
>      
>  3.每个属性都必须是私有的
>      
>  4.每个属性都应该具备 getter setter
>      
>  5.必须具备无参构造器
>      
>  6.应该实现序列化接口( 缓存  分布式项目数据传递 可能会将对象序列化 )
>      
>  7.应该重写类的hashcode和equals方法
>      
>  8.toString是否重写都可以
>  
>  
>  使用lombok帮助我们生成这些内容 getter setter  全参构造 无参构造 equals  hashcode
>     lombok使用步骤
>         1 检查idea是否已经安装了lombok插件
>         2 检查是否勾选了 enable  annotation processing
>         3 导入lombok的依赖
>  ```
>
>  ![响应重定向](./Servlet/img-27.jpg) 

```java title="Java"
//实体类包(pojo)SysUser接口-----------------------------------------------------
package fun.xingji.schedule.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@AllArgsConstructor // 添加了全参构造
@NoArgsConstructor  // 添加了无参构造
@Data //getter setter   equals  hashcode toString
public class SysUser implements Serializable {
    private Integer uid;
    private String username;
    private String userPwd;
}

//实体类包(pojo)SysSchedule接口------------------------------------------------------
package fun.xingji.schedule.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@AllArgsConstructor // 添加了全参构造
@NoArgsConstructor  // 添加了无参构造
@Data //getter setter   equals  hashcode toString
public class SysSchedule implements Serializable {
    private Integer sid;
    private Integer uid;
    private String title;
    private Integer completed;
}
//------------------------------------------------------
```



#### dao包处理

>  **导入`JDBCUtil连接池工具类`并准备`jdbc.properties配置文件`**

```java title="Java"
package fun.xingji.schedule.util;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class JDBCUtil {
    private static ThreadLocal<Connection> threadLocal =new ThreadLocal<>();

    private static DataSource dataSource;
    // 初始化连接池
    static{
        // 可以帮助我们读取.properties配置文件
        Properties properties =new Properties();
        InputStream resourceAsStream = JDBCUtil.class.getClassLoader().getResourceAsStream("jdbc.properties");
        try {
            properties.load(resourceAsStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            dataSource = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }
    /*1 向外提供连接池的方法*/
    public static DataSource getDataSource(){
        return dataSource;
    }

    /*2 向外提供连接的方法*/
    public static Connection getConnection(){
        Connection connection = threadLocal.get();
        if (null == connection) {
            try {
                connection = dataSource.getConnection();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
            threadLocal.set(connection);
        }

        return connection;
    }


    /*定义一个归还连接的方法 (解除和ThreadLocal之间的关联关系) */
    public static void releaseConnection(){
        Connection connection = threadLocal.get();
        if (null != connection) {
            threadLocal.remove();
            // 把连接设置回自动提交的连接
            try {
                connection.setAutoCommit(true);
                // 自动归还到连接池
                connection.close();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```

```properties title="properties"
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/schedule_system
username=root
password=1225
initialSize=5
maxActive=10
maxWait=1000
```

+ 创建BaseDao对象并复制如下代码

```java title="Java"
package fun.xingji.schedule.dao;

import fun.xingji.schedule.util.JDBCUtil;

import java.lang.reflect.Field;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class BaseDao {
    // 公共的查询方法  返回的是单个对象
    public <T> T baseQueryObject(Class<T> clazz, String sql, Object ... args) {
        T t = null;
        Connection connection = JDBCUtil.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        int rows = 0;
        try {
            // 准备语句对象
            preparedStatement = connection.prepareStatement(sql);
            // 设置语句上的参数
            for (int i = 0; i < args.length; i++) {
                preparedStatement.setObject(i + 1, args[i]);
            }

            // 执行 查询
            resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                t = (T) resultSet.getObject(1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (null != resultSet) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (null != preparedStatement) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }

            }
            JDBCUtil.releaseConnection();
        }
        return t;
    }
    // 公共的查询方法  返回的是对象的集合

    public <T> List<T> baseQuery(Class clazz, String sql, Object ... args){
        List<T> list =new ArrayList<>();
        Connection connection = JDBCUtil.getConnection();
        PreparedStatement preparedStatement=null;
        ResultSet resultSet =null;
        int rows = 0;
        try {
            // 准备语句对象
            preparedStatement = connection.prepareStatement(sql);
            // 设置语句上的参数
            for (int i = 0; i < args.length; i++) {
                preparedStatement.setObject(i+1,args[i]);
            }

            // 执行 查询
            resultSet = preparedStatement.executeQuery();

            ResultSetMetaData metaData = resultSet.getMetaData();
            int columnCount = metaData.getColumnCount();

            // 将结果集通过反射封装成实体类对象
            while (resultSet.next()) {
                // 使用反射实例化对象
                Object obj =clazz.getDeclaredConstructor().newInstance();

                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnLabel(i);
                    Object value = resultSet.getObject(columnName);
                    // 处理datetime类型字段和java.util.Data转换问题
                    if(value.getClass().equals(LocalDateTime.class)){
                        value= Timestamp.valueOf((LocalDateTime) value);
                    }
                    Field field = clazz.getDeclaredField(columnName);
                    field.setAccessible(true);
                    field.set(obj,value);
                }

                list.add((T)obj);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (null !=resultSet) {
                try {
                    resultSet.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
            if (null != preparedStatement) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
            JDBCUtil.releaseConnection();
        }
        return list;
    }

    // 通用的增删改方法
    public int baseUpdate(String sql,Object ... args) {
        // 获取连接
        Connection connection = JDBCUtil.getConnection();
        PreparedStatement preparedStatement=null;
        int rows = 0;
        try {
            // 准备语句对象
            preparedStatement = connection.prepareStatement(sql);
            // 设置语句上的参数
            for (int i = 0; i < args.length; i++) {
                preparedStatement.setObject(i+1,args[i]);
            }

            // 执行 增删改 executeUpdate
            rows = preparedStatement.executeUpdate();
            // 释放资源(可选)


        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            if (null != preparedStatement) {
                try {
                    preparedStatement.close();
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }

            }
            JDBCUtil.releaseConnection();
        }
        // 返回的是影响数据库记录数
        return rows;
    }
}
```

+ dao层所有接口

```java title="Java"
//---------------------------------------------------
package fun.xingji.schedule.dao;
public interface SysUserDao {
}
//---------------------------------------------------
package fun.xingji.schedule.dao;
public interface SysScheduleDao {
}
//---------------------------------------------------
```

+ dao层所有实现类

```java title="Java"
//------------------------------------------------------------------------------
package fun.xingji.schedule.dao.impl;
import fun.xingji.schedule.dao.BaseDao;
import fun.xingji.schedule.dao.SysUserDao;
public class SysUserDaoImpl extends BaseDao implements SysUserDao {
}

//------------------------------------------------------------------------------
package fun.xingji.schedule.dao.impl;
import fun.xingji.schedule.dao.BaseDao;
import fun.xingji.schedule.dao.SysScheduleDao;
public class SysScheduleDaoImpl extends BaseDao implements SysScheduleDao {
}
//------------------------------------------------------------------------------
```



#### service包处理

+ 接口

```java title="Java"
//------------------------------------------------------------------------------
package fun.xingji.schedule.service;
public interface SysUserService {
}
//------------------------------------------------------------------------------
package fun.xingji.schedule.service;
public interface SysScheduleService {
}
//------------------------------------------------------------------------------
```

+ 实现类

```java title="java"
//------------------------------------------------------------------------------
package fun.xingji.schedule.service.impl;
import fun.xingji.schedule.service.SysUserService;
public class SysUserServiceImpl implements SysUserService {
}
//------------------------------------------------------------------------------
package fun.xingji.schedule.service.impl;
import fun.xingji.schedule.service.SysScheduleService;
public class SysScheduleServiceImpl implements SysScheduleService {
}
//------------------------------------------------------------------------------
```



#### controller包处理

+ **BaseController处理`请求路径问题`**

```java title="Java"
package fun.xingji.schedule.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.lang.reflect.Method;

public class BaseContoller extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String requestURI = req.getRequestURI(); // /schedule/add
        String[] split = requestURI.split("/");
        String methodName = split[split.length-1];
        // 使用 反射 通过方法名获取下面的方法
        Class aClass = this.getClass();
        // 获取方法
        try {
            Method declaredMethod = aClass.getDeclaredMethod(methodName, HttpServletRequest.class, HttpServletResponse.class);

            //暴力 破解方法的访问修饰符的限制
            declaredMethod.setAccessible(true);

            // 执行方法
            declaredMethod.invoke(this,req,resp);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



+ 多个处理器继承BaseController

```  java
//----------------------------------------------------------------------------
package fun.xingji.schedule.controller;

import jakarta.servlet.annotation.WebServlet;

@WebServlet("/user/*")
public class UserController extends BaseController{
}
//----------------------------------------------------------------------------
package fun.xingji.schedule.controller;

import jakarta.servlet.annotation.WebServlet;

@WebServlet("/schedule/*")
public class SysScheduleController  extends BaseController{
}
//----------------------------------------------------------------------------
```



#### 加密工具类的使用

+ **导入MD5Util工具类**

```java title="Java"
package fun.xingji.schedule.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public final class MD5Util {
    public static String encrypt(String strSrc) {
        try {
            char hexChars[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
                    '9', 'a', 'b', 'c', 'd', 'e', 'f' };
            byte[] bytes = strSrc.getBytes();
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(bytes);
            bytes = md.digest();
            int j = bytes.length;
            char[] chars = new char[j * 2];
            int k = 0;
            for (int i = 0; i < bytes.length; i++) {
                byte b = bytes[i];
                chars[k++] = hexChars[b >>> 4 & 0xf];
                chars[k++] = hexChars[b & 0xf];
            }
            return new String(chars);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new RuntimeException("MD5加密出错");
        }
    }
}
```



#### 页面文件的导入

+ 复制资源下的日程管理中的HTML到项目的web目录下即可

![1690363965192](images/1690363965192.png)



### 业务代码

#### 注册业务处理

+ **controller**

```java title="Java" 
package fun.xingji.schedule.controller;

import fun.xingji.schedule.pojo.SysUser;
import fun.xingji.schedule.service.SysUserService;
import fun.xingji.schedule.service.impl.SysUserServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/user/*")
public class SysUserController extends BaseContoller {

    // 解决反复调用Service层的方法
    private SysUserService userService = new SysUserServiceImpl();

    /**
     * 接收用户注册请求的业务处理方法( 业务接口 不是java中的interface  )
     *
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void regist(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1.接收客户端提交的参数
        String username = req.getParameter("username");
        String userPwd = req.getParameter("userPwd");
        // 2 调用服务层方法,完成注册功能
        //将参数放入一个SysUser对象中,在调用regist方法时传入
        SysUser sysUser = new SysUser(null, username, userPwd);
        int rows = userService.regist(sysUser);
        // 3.根据注册结果(成功  失败)进行页面跳转
        if (rows > 0) {
            // 注册成功返回的页面
            resp.sendRedirect("/registSuccess.html");
        } else {
            // 注册失败返回的页面
            resp.sendRedirect("/registFail.html");
        }
    }
}
```



+ **service**

```java title="java"
package fun.xingji.schedule.service;

import fun.xingji.schedule.pojo.SysUser;

/**
 * 该接口定义了以sys_user表格为核心的业务处理功能
 */
public interface SysUserService {

    /**
     * 注册用户的方法
     * @param sysUser 要注册的用户名和明文密码以SysUser对象的形式接收
     * @return 注册成功返回1 注册失败返回0
     */
    int regist(SysUser sysUser);
}
```

```java title="Java"
package fun.xingji.schedule.service.impl;

import fun.xingji.schedule.dao.SysUserDao;
import fun.xingji.schedule.dao.impl.SysUserDaoImpl;
import fun.xingji.schedule.pojo.SysUser;
import fun.xingji.schedule.service.SysUserService;
import fun.xingji.schedule.util.MD5Util;

public class SysUserServiceImpl implements SysUserService {

    // 解决反复调用Dao层的方法
    private SysUserDao userDao =new SysUserDaoImpl();

    @Override
    public int regist(SysUser sysUser) {

        // 将用户的明文密码转换成密文密码
        // 1.拿取明文密码
        /*String userPwd = sysUser.getUserPwd();
        // 2.调用MD5加密工具类：将明文密码转换为密文密码
        String encrypt = MD5Util.encrypt(userPwd);
        // 3.密文密码替换原来的明文密码
        sysUser.setUserPwd(encrypt);*/

        // 将用户的明文密码转换为密文密码(合并三个步骤)
        sysUser.setUserPwd(MD5Util.encrypt(sysUser.getUserPwd()));

        // 调用DAO 层的方法  将sysUser信息存入数据库
        return userDao.addSysUser(sysUser);
    }
}
```



+ **dao**

```java title="Java"
package fun.xingji.schedule.dao;

import fun.xingji.schedule.pojo.SysUser;

/*
Data access Object 数据访问对象
该类用于定义针对表格的CRUD的方法
 */
public interface SysUserDao {

    /**
     * 向数据库中增加一条用户记录的方法
     * @param sysUser 要增加的记录的username和user_pwd字段以SysUser实体类对象的形式接收
     * @return 增加成功返回1 增加失败返回0
     */
    int addSysUser(SysUser sysUser);
}
```

```java title="Java"
package fun.xingji.schedule.dao.impl;

import fun.xingji.schedule.dao.BaseDao;
import fun.xingji.schedule.dao.SysUserDao;
import fun.xingji.schedule.pojo.SysUser;

/**
 * 系统用户数据访问层实现类
 * 继承BaseDao基类，实现SysUserDao接口
 * 负责SysUser实体类的数据库操作
 */
public class SysUserDaoImpl extends BaseDao implements SysUserDao {

    /**
     * 新增系统用户
     * 向sys_user表中插入一条用户记录
     * 
     * @param sysUser 系统用户对象，包含用户名和密码等信息
     * @return int 返回受影响的行数，成功插入返回1，失败返回0
     */
    @Override
    public int addSysUser(SysUser sysUser) {
        // SQL插入语句，id使用默认值(DEFAULT)，插入用户名和密码
        String sql = "insert into sys_user values(DEFAULT,?,?)";
        
        // 调用基类的更新方法执行SQL语句，参数为SQL语句和用户对象的用户名、密码
        return baseUpdate(sql, sysUser.getUsername(), sysUser.getUserPwd());
    }
}
```



##### 注册业务测试

> **注册已存在用户**

![注册业务测试](./Servlet/img-35.jpg)

![注册业务测试](./Servlet/img-36.jpg)

![注册业务测试](./Servlet/img-37.jpg)

![注册业务测试](./Servlet/img-38.jpg)



> **注册未存在用户**

![注册业务测试](./Servlet/img-35.jpg)

![注册业务测试](./Servlet/img-36.jpg)

![注册业务测试](./Servlet/img-39.jpg)

![注册业务测试](./Servlet/img-40.jpg)

![注册业务测试](./Servlet/img-41.jpg)





#### 登录业务处理

+ **controller**

```java title="Java" 
package fun.xingji.schedule.controller;

import fun.xingji.schedule.pojo.SysUser;
import fun.xingji.schedule.service.SysUserService;
import fun.xingji.schedule.service.impl.SysUserServiceImpl;
import fun.xingji.schedule.util.MD5Util;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/user/*")
public class SysUserController extends BaseContoller {

    // 解决反复调用Service层的方法
    private SysUserService userService = new SysUserServiceImpl();

    /**
     * 接收用登录请求,完成的登录业务接口
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    protected void login(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1.接收用户名和密码
        String username = req.getParameter("username");
        String userPwd = req.getParameter("userPwd");

        // 2.调用服务层方法,根据用户名查询用户信息
        SysUser loginUser = userService.findByUsername(username);

        // 3.判断用户名是否匹配
        if (loginUser == null) {
            // 跳转到用户名有误提示页
            resp.sendRedirect("/loginUsernameError.html");
        }else if (!MD5Util.encrypt(userPwd).equals(loginUser.getUserPwd())) {
            // 4.判断密码是否匹配
            // 跳转到密码有误提示页
            resp.sendRedirect("/loginUserPwdError.html");
        }else  {
            // 5.跳转到首页
            resp.sendRedirect("/showSchedule.html");
        }
    }
}
```



+ **service**

```java title="java"
package fun.xingji.schedule.service;

import fun.xingji.schedule.pojo.SysUser;

/**
 * 该接口定义了以sys_user表格为核心的业务处理功能
 */
public interface SysUserService {
    /**
     * 根据用户名获得完整用户信息的方法
     * @param username 要查询的用户名
     * @return 如果找到了返回SysUser对象,找不到返回null
     */
    SysUser findByUsername(String username);
}
```

```java title="Java"
package fun.xingji.schedule.service.impl;

import fun.xingji.schedule.dao.SysUserDao;
import fun.xingji.schedule.dao.impl.SysUserDaoImpl;
import fun.xingji.schedule.pojo.SysUser;
import fun.xingji.schedule.service.SysUserService;
import fun.xingji.schedule.util.MD5Util;

public class SysUserServiceImpl implements SysUserService {
    
    // 解决反复调用Dao层的方法
    private SysUserDao userDao =new SysUserDaoImpl();

    @Override
    public SysUser findByUsername(String username) {
        // 调用服务层方法,继续查询
        return userDao.findByUsername(username);
    }
}
```



+ **dao**

```java title="Java"
package fun.xingji.schedule.dao;

import fun.xingji.schedule.pojo.SysUser;

/*
Data access Object 数据访问对象
该类用于定义针对表格的CRUD的方法
 */
public interface SysUserDao {

    /**
     * 根据用户名获得完整用户信息的方法
     * @param username 要查询的用户名
     * @return 如果找到了返回SysUser对象,找不到返回null
     */
    SysUser findByUsername(String username);
}
```

```java title="Java" 
package fun.xingji.schedule.dao.impl;

import fun.xingji.schedule.dao.BaseDao;
import fun.xingji.schedule.dao.SysUserDao;
import fun.xingji.schedule.pojo.SysUser;

import java.util.List;

/**
 * 系统用户数据访问层实现类
 * 继承BaseDao基类，实现SysUserDao接口
 */
public class SysUserDaoImpl extends BaseDao implements SysUserDao {

    /**
     * 根据用户名查询用户信息
     * 
     * @param username 用户名
     * @return 如果找到对应用户则返回SysUser对象，否则返回null
     * 
     * 方法说明：
     * 1. 构造SQL查询语句，将数据库字段user_pwd映射为Java对象的userPwd属性
     * 2. 调用基类的baseQuery方法执行查询
     * 3. 判断查询结果集，如果非空则返回第一个用户对象
     */
    @Override
    public SysUser findByUsername(String username) {
        // 查询SQL，使用别名将数据库字段user_pwd映射到Java实体类的userPwd属性
        String sql = "select uid,username,user_pwd userPwd from sys_user where username = ?";
        
        // 调用基类方法执行查询，参数化查询防止SQL注入
        List<SysUser> sysUserList = baseQuery(SysUser.class, sql, username);
        
        // 判断查询结果：如果列表非空且有数据，返回第一个用户；否则返回null
        return sysUserList != null && sysUserList.size() > 0 ? sysUserList.get(0) : null;
    }
}
```



##### 登录业务测试

> **登录提示用户名错误**

![登录业务测试](./Servlet/img-42.jpg)

![登录业务测试](./Servlet/img-43.jpg)

![登录业务测试](./Servlet/img-44.jpg)





> **登录提示密码错误**

![登录业务测试](./Servlet/img-42.jpg)

![登录业务测试](./Servlet/img-45.jpg)

![登录业务测试](./Servlet/img-46.jpg)



> **用户名和密码都正确成功登录**

![登录业务测试](./Servlet/img-42.jpg)

![登录业务测试](./Servlet/img-47.jpg)

![登录业务测试](./Servlet/img-48.jpg)
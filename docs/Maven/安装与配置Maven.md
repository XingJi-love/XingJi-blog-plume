---
title: Maven | 安装与配置Maven
tags:
  - Maven
createTime: 2025/07/26 21:00:00
permalink: /article/vs370at9/
cover: /Maven.jpg
---

![Maven](./Maven.jpg)

Maven 是一个开源的构建工具，用于 Java 项目的构建、测试和发布。Maven 构建项目时，会自动下载项目所依赖的包，并自动构建项目。Maven 的主要功能是管理项目依赖关系，并自动下载依赖的包。Maven 的主要优点是：

- 简化项目构建过程
- 自动管理项目依赖关系
- 提供项目构建的标准化
- 提供项目构建的自动化

## Maven 安装

Maven 是一个 Java 程序，因此需要先安装 Java 运行环境（JRE）或 Java 开发工具包（JDK）。JDK 是 Java 开发工具包，包含了 Java 运行环境（JRE）和 Java 开发工具。JRE 是 Java 运行环境，包含了 Java 运行时环境和 Java 开发工具。

### 下载 Maven

Maven 的官方网站是 [Maven](https://maven.apache.org/)，可以在该网站上下载 Maven 的最新版本。Maven 的下载地址是 [Maven 下载](https://maven.apache.org/download.cgi)。

### 安装 Maven

1. 下载 Maven 压缩包，解压到指定目录，例如 `D:\maven`。

2. 配置环境变量，将 Maven 的 `bin` 目录添加到系统的 `PATH` 环境变量中。

3. 打开命令行窗口，输入 `mvn -v`，如果输出 Maven 的版本信息，则表示 Maven 安装成功。

## Maven 配置

### 配置本地仓库

Maven 的本地仓库是存储项目依赖的包的目录。Maven 默认的本地仓库是 `${user.home}/.m2/repository`，可以通过修改 `settings.xml` 文件来修改本地仓库的路径。
1. 打开 Maven 的 `conf` 目录，找到 `settings.xml` 文件。

2. 在 `settings.xml` 文件中，找到 `<localRepository>` 标签，修改其值为本地仓库的路径，例如 `D:\maven\repository`。

3. 保存 `settings.xml` 文件。

### 配置远程仓库

Maven 的远程仓库是存储项目依赖的包的仓库。Maven 默认的远程仓库是 Maven 中央仓库，可以通过修改 `settings.xml` 文件来配置远程仓库。
1. 打开 Maven 的 `conf` 目录，找到 `settings.xml` 文件。

2. 在 `settings.xml` 文件中，找到 `<mirrors>` 标签，添加一个 `<mirror>` 标签，例如：

```xml
<mirror>
    <id>aliyun</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

3. 保存 `settings.xml` 文件。

### 配置 JDK 版本
1. 打开 `conf` 目录，找到 `settings.xml` 文件。
2. 在 `settings.xml` 文件中，找到 `<profiles>` 标签，添加一个 `<profile>` 标签，例如：

```xml
<profile>
    <id>jdk-1.8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
</profile>
```

3. 保存 `settings.xml` 文件。

### 配置 Maven 插件

Maven 插件是 Maven 构建项目时使用的工具。Maven 插件是一个 Java 程序，因此需要先安装 Java 运行环境（JRE）或 Java 开发工具包（JDK）。JDK 是 Java 开发工具包，包含了 Java 运行环境（JRE）和 Java 开发工具。JRE 是 Java 运行环境，包含了 Java 运行时环境和 Java 开发工具。

1. 打开 `conf` 目录，找到 `settings.xml` 文件。

2. 在 `settings.xml` 文件中添加如下内容：

```xml
<pluginGroups>
    <pluginGroup>org.apache.maven.plugins</pluginGroup>
</pluginGroups>
```

3. 保存 `settings.xml` 文件。

## Maven 使用

### 创建 Maven 项目

1. 打开命令行窗口，进入要创建项目的目录。

2. 输入以下命令创建 Maven 项目：

```shell
mvn archetype:generate -DgroupId=com.example -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

3. 等待 Maven 下载项目模板并创建项目。
4. 进入创建的项目目录，例如 `cd my-app`。
5. 输入以下命令编译项目：

```shell
mvn compile
```

6. 输入以下命令运行项目：

```shell
mvn exec:java -Dexec.mainClass="com.example.App"
```

### 添加依赖

1. 打开 `pom.xml` 文件。

2. 在 `<dependencies>` 标签中添加依赖，例如：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.5.4</version>
</dependency>
```
3. 保存 `pom.xml` 文件。

4. 输入以下命令下载依赖：

```shell
mvn dependency:resolve
```

### 构建项目

1. 输入以下命令构建项目：

```shell
mvn package
```

2. 构建成功后，会在 `target` 目录下生成项目的可执行文件。

### 运行项目

1. 输入以下命令运行项目：

```shell
java -jar target/my-app-1.0-SNAPSHOT.jar
```
运行成功后，项目将启动并运行。
### 清理项目
1. 输入以下命令清理项目：

```shell
mvn clean
```

2. 清理成功后，`target` 目录下的所有文件将被删除。
## 添加依赖项
1. 在 `pom.xml` 文件中添加依赖项：
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>2.5.4</version>
    </dependency>
</dependencies>
```
2. 保存 `pom.xml` 文件。
3. 输入以下命令下载依赖项：

```shell
mvn dependency:resolve
```

## Maven 常用命令

- `mvn clean`：清理项目。
- `mvn compile`：编译项目。
- `mvn package`：打包项目。
- `mvn install`：安装项目。
- `mvn deploy`：部署项目。
- `mvn test`：运行测试。

## Maven 常用插件

- `maven-compiler-plugin`：编译插件。
- `maven-surefire-plugin`：测试插件。
- `maven-jar-plugin`：打包插件。
- `maven-war-plugin`：打包 war 包插件。
- `maven-deploy-plugin`：部署插件。
- `maven-clean-plugin`：清理插件。
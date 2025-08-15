---
title: JDBC | JDBC的新增修改删除
tags:
  - JDBC
createTime: 2025/08/14 15:18:36
permalink: /article/ptri869o/
cover: /JDBC.jpg
---

![JDBC | JDBC的新增修改删除](./JDBC.jpg)

# JDBC编程六步
JDBC编程的步骤是很固定的，通常包含以下六步：

- 第一步：`注册驱动`
   - 作用一：将 JDBC 驱动程序从硬盘上的文件系统中加载到内存中。
   - 作用二：使得 DriverManager 可以通过一个统一的接口来管理该驱动程序的所有连接操作。
- 第二步：`获取数据库连接`
   - 获取`java.sql.Connection对象`，该对象的创建标志着mysql进程和jvm进程之间的通道打开了。
- 第三步：`获取数据库操作对象`
   - 获取`java.sql.Statement对象`，该对象负责将SQL语句发送给数据库，数据库负责`执行该SQL语句`。
- 第四步：`执行SQL语句`
   - 执行具体的SQL语句，例如：`insert delete update select`等。
- 第五步：`处理查询结果集`
   - 如果之前的操作是`DQL查询语句`，才会有`处理查询结果集`这一步。
   - 执行DQL语句通常会返回查询结果集对象：`java.sql.ResultSet`。
   - 对于ResultSet查询结果集来说，通常的操作是针对查询结果集进行结果集的遍历。
- 第六步：`释放资源`
   - 释放资源可以避免资源的浪费。在 JDBC 编程中，每次使用完` Connection、Statement、ResultSet`**(从左往右打开，从右往左关闭)**等资源后，都需要显式地调用对应的 close() 方法来释放资源，避免资源的浪费。
   - 释放资源可以避免出现内存泄露问题。在 Java 中，当一个对象不再被引用时，会被 JVM 的垃圾回收机制进行回收。但是在 JDBC 编程中，如果不显式地释放资源，那么这些资源就不会被 JVM 的垃圾回收机制自动回收，从而导致内存泄露问题。

# 数据的准备
使用PowerDesigner设计用户表t_user。
使用Navicat for MySQL创建数据库，创建表，插入数据。
## PowerDesigner与Navicat for MySQL的区别
Navicat for MySQL 是一款常用的 MySQL 数据库管理工具，提供了丰富的数据库管理和开发工具，可以方便地进行数据库的连接、查询、管理、模型设计等操作，是 MySQL 开发和管理的效率工具。

而 PowerDesigner 工具则是一款专业的建模工具，它支持多种数据库和操作系统，可以完成数据库设计、数据建模、过程建模、企业业务建模等工作。PowerDesigner 可以帮助开发人员在数据库设计和开发过程中更好地理解和管理数据，便于协同开发和项目管理。各种数据库技术的建模形式都可以实现，有单个数据库建模到多个数据库建模和业务建模等高级功能，**非常适用于大型项目中的数据库设计和建模**。同时，PowerDesigner 还支持 UML，Java 等编程语言的建模，可以与开发语言无缝整合。

因此，Navicat for MySQL 和 PowerDesigner 的功能是不同的，可以根据实际需要来选用。如果只是针对 MySQL 的数据库连接、查询、管理等操作，可以使用 Navicat for MySQL 工具，而如果需要进行更复杂的数据库设计、建模和整合等工作，可以使用 PowerDesigner 工具来实现。**如果使用 MySQL 数据库进行开发，使用 Navicat for MySQL 和 PowerDesigner 这两个工具相互配合，可以提高开发效率和数据管理质量**。

## PowerDesigner工具的安装
来这里下载该工具：链接：[https://pan.baidu.com/s/1lRWC069K8GE-8rxr259ArQ?pwd=2009](https://pan.baidu.com/s/1lRWC069K8GE-8rxr259ArQ?pwd=2009) 提取码：2009
双击安装包：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030113007-3188761c-a3d6-43af-a7b2-b57285c5c59a.png#averageHue=%23caa664&clientId=u41c620b2-0cdd-4&from=paste&height=89&id=u4dcad848&originHeight=89&originWidth=241&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4195&status=done&style=none&taskId=u657aab7b-28bf-4a16-81ff-d15de5e203f&title=&width=241)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702029876181-f1cae0c3-56a7-4925-add3-c2cac74f64bf.png#averageHue=%239fa909&clientId=u41c620b2-0cdd-4&from=paste&height=330&id=uf0bf2c52&originHeight=330&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31259&status=done&style=none&taskId=u339e35b0-277e-4cfd-8c81-47d598a01e8&title=&width=500)

欢迎页：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702029889827-2e2c12d2-0ef0-400a-8a97-a4e094846227.png#averageHue=%23ecede1&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=uab8659b9&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23274&status=done&style=none&taskId=u78a92258-d072-4912-b0bf-89834c775bf&title=&width=696)

选择试用15天：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702029931270-dd2984c0-7154-4681-aeb7-daff6743770b.png#averageHue=%23eaebdf&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=ub0329bed&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25889&status=done&style=none&taskId=uf3020af3-ca64-4686-8f8a-4b68ad5061a&title=&width=696)

选择香港，以及接受：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702029963307-ce94dc0e-631e-4fdd-bfab-cee55e430f2c.png#averageHue=%23e4e4da&clientId=u41c620b2-0cdd-4&from=paste&height=514&id=ud1e27d6f&originHeight=514&originWidth=687&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33479&status=done&style=none&taskId=u78eac6e6-db27-4b6a-996e-ef3a76951e3&title=&width=687)

设置安装位置：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702029981376-3f82d441-4b51-4ca0-9183-cb7b8853369b.png#averageHue=%23ebebdf&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=uf22c8884&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25256&status=done&style=none&taskId=u4463e38b-dd51-4a55-8c11-7c0c937df49&title=&width=696)

选择你要安装的（默认就行）：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702029994216-fa2e7123-ebb3-4e24-8a54-f70136665809.png#averageHue=%23e8e9dc&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=uafed6552&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33295&status=done&style=none&taskId=u24f0bc15-4a74-49be-a870-85b0660f508&title=&width=696)

选择要安装的用户配置文件（默认即可）：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030015551-fb222d28-373c-4620-8cb7-119a796c73b6.png#averageHue=%23ecede0&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=ude3902f0&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27364&status=done&style=none&taskId=u8b82d675-f2b3-4bec-b214-d8b76daefb2&title=&width=696)

添加图标：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030025893-0f3ccf82-2edf-4693-b40d-cdbd9b067808.png#averageHue=%23edede1&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=u94d15691&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29416&status=done&style=none&taskId=ue484533f-1bfe-453c-9089-b6a2b29a23b&title=&width=696)

安装概览信息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030036757-b9429e96-81b1-4dcd-93d5-9eb30d61f24e.png#averageHue=%23e7e8db&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=ud58cceb3&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27404&status=done&style=none&taskId=u9c622da3-fd6a-4b6b-8c85-a44e8bc2c3d&title=&width=696)

安装中：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030046163-e5983393-f38e-4c56-93cb-8e0da0a5cb0a.png#averageHue=%23ecedde&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=u45648fd0&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22485&status=done&style=none&taskId=ufbf24086-f1b5-4244-a2a7-848863719d4&title=&width=696)

安装完成：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030092155-4ca5bf85-47ed-4398-98a5-864761106ce3.png#averageHue=%23edede1&clientId=u41c620b2-0cdd-4&from=paste&height=525&id=u0342f890&originHeight=525&originWidth=696&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22667&status=done&style=none&taskId=u008adc77-0a9c-4568-8464-0ac79055972&title=&width=696)

如何破解？看到这个文件了吗？
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030298080-4c0ab7e6-b191-4778-95ae-bd7a23bf4276.png#averageHue=%23d2b379&clientId=u41c620b2-0cdd-4&from=paste&height=80&id=u0b68889c&originHeight=80&originWidth=244&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4023&status=done&style=none&taskId=u9ba52cda-36f3-407d-9aaf-74fa31a4ff5&title=&width=244)
把这个文件拷贝到这个安装目录当中：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030371606-59034062-2a4d-46c5-80f2-9704563052b7.png#averageHue=%23fcfbf9&clientId=u41c620b2-0cdd-4&from=paste&height=164&id=ud8adf181&originHeight=164&originWidth=608&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13719&status=done&style=none&taskId=u0d3a7ce0-d257-4292-931a-4291eeb1b26&title=&width=608)
会自动提醒你替换：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702030421073-75504dc7-d035-488c-ba8d-7442f32f00d9.png#averageHue=%23f7f6f5&clientId=u41c620b2-0cdd-4&from=paste&height=294&id=u274a8627&originHeight=294&originWidth=463&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18633&status=done&style=none&taskId=uf6bd0f75-2a3c-4cdc-9999-df7f9ea092d&title=&width=463)
替换即可完成破解！！！！
## 使用PowerDesigner进行物理数据建模
打开PowerDesigner：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702352345350-1c1441c3-560f-4485-ba11-aff5522c7d42.png#averageHue=%239ec58f&clientId=u0cd9c8dc-062f-4&from=paste&height=694&id=u62d067c3&originHeight=694&originWidth=964&originalType=binary&ratio=1&rotation=0&showTitle=false&size=246317&status=done&style=shadow&taskId=u188417d2-31ad-44c7-b177-094b4303fc0&title=&width=964)

点击“Create Model...”来创建PDM（Physical Data Model，物理数据模型）：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702352495755-cdb4ac5b-cdf4-408f-b87c-6f08208eadb8.png#averageHue=%23f1f0ef&clientId=u0cd9c8dc-062f-4&from=paste&height=693&id=ud8fcd53d&originHeight=693&originWidth=963&originalType=binary&ratio=1&rotation=0&showTitle=false&size=83783&status=done&style=none&taskId=u265fe6c8-c8b6-4f39-9dbc-2ba19711344&title=&width=963)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=xyQoq&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
**什么是物理数据模型PDM？**
`物理数据模型（Physical Data Model，PDM）是数据管理领域中表示数据库逻辑设计后，通过物理设计最终转化为实际数据结构的过程，即在逻辑模型的基础上，进行数据存储结构的设计。PDM 是一个详细的数据库设计计划，它描述了如何在关系数据库中存储数据。物理数据模型包含了所有数据表，列、键和索引以及物理存储的详细信息，包括数据类型、字段宽度、默认值、统计信息等。此外，PDM 还描述了如何将数据表存储在文件或表空间中，这些信息可以帮助开发人员建立实际的数据库系统。通常，PDM 包含了完整的 ER 模型，数据表和关系的详细信息，包括数据的主键、外键、唯一键、索引、约束条件等。物理数据模型可以使用各种建模工具来手工创建或自动生成。在数据库设计阶段，生成 PDM 是非常重要的一步，是将逻辑设计转换为实际实现的重要步骤之一。它可以帮助开发人员在实现时更加清晰地了解数据的存储结构，同时也方便后续的数据库管理和维护工作。`

创建完成后是这样的：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702352840475-faf7c39e-6a3e-4d72-872b-1de849baf668.png#averageHue=%23f0f0ef&clientId=u0cd9c8dc-062f-4&from=paste&height=331&id=u2e5d668a&originHeight=331&originWidth=843&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35414&status=done&style=none&taskId=u6d34e397-b10c-4c92-8e2e-82c926f7d40&title=&width=843)
注意：右侧的小格子是可以放大和缩小的。看着像是很大的一张网。在每个格子当中可以容纳多个表。并且在这张网上可以清晰的看到表与表的关系。（一对多，一对一，多对多等。）

记得保存，ctrl+s保存时会生成一个xxx.pdm文件，以后如果要修改设计，双击这个xxx.pdm文件即可打开，进行编辑：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702353117948-32a0da6b-393c-4282-a2b0-d2e893d7d04b.png#averageHue=%23f4f3f1&clientId=u0cd9c8dc-062f-4&from=paste&height=423&id=u33b947b9&originHeight=423&originWidth=553&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29718&status=done&style=none&taskId=uc05f19a2-26bf-4720-bd21-db4d30c3125&title=&width=553)
保存后的文件：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702353151163-22027c70-a1cc-463a-835e-30b23631ddf6.png#averageHue=%23383c95&clientId=u0cd9c8dc-062f-4&from=paste&height=88&id=u81c8d25f&originHeight=88&originWidth=82&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5944&status=done&style=none&taskId=u69e2e523-6384-4974-9bd9-b39ceed8c0d&title=&width=82)

开始进行表的设计，这里不搞那么复杂，先创建一张表即可：t_user，用户表：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702353507900-d3538143-07a6-4a08-b69e-4d7c23f1d6e3.png#averageHue=%23e4ded3&clientId=u0cd9c8dc-062f-4&from=paste&height=292&id=uc0708eab&originHeight=292&originWidth=580&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21497&status=done&style=none&taskId=u37987bcd-cc58-4272-9158-47add73ca55&title=&width=580)

双击后，弹出设计窗口：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702353664176-dbbccc05-2711-4e31-b6fc-4cf6238bacea.png#averageHue=%23f6f5f5&clientId=u0cd9c8dc-062f-4&from=paste&height=593&id=ucdbe63e9&originHeight=593&originWidth=1093&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33708&status=done&style=shadow&taskId=u5d1fdc0d-9fda-4133-a7da-91b18ffb6d6&title=&width=1093)

设计表名：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702354144428-887e8efb-c136-42e4-90de-4ec26815ab6f.png#averageHue=%23f5f5f4&clientId=u0cd9c8dc-062f-4&from=paste&height=445&id=ufd3ac07c&originHeight=445&originWidth=1068&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22473&status=done&style=none&taskId=u0fd54ac3-7fba-48bf-87d0-6eb844decba&title=&width=1068)
注意：

1. Name：用来设置显示的表名
2. Code：用来设置数据库中真实创建的表名
3. Comment：对表的注释说明

设计字段：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702356255883-27bed5c1-8cb5-41ed-ac06-d2a479327a93.png#averageHue=%23eceaea&clientId=u0cd9c8dc-062f-4&from=paste&height=726&id=ud50f83d4&originHeight=726&originWidth=1171&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90439&status=done&style=shadow&taskId=u48387018-6792-4aa3-89c4-5fc6b175d4e&title=&width=1171)
把每个字段设计好，包括：字段名，数据类型，长度，约束等。

设计完成后：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702356365447-df18d670-da99-40f0-b80f-95918bdf20f6.png#averageHue=%23dee8f2&clientId=u0cd9c8dc-062f-4&from=paste&height=189&id=u223a5402&originHeight=189&originWidth=348&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10585&status=done&style=none&taskId=u6394b4c2-2385-400d-9a4a-b5ad2483556&title=&width=348)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=KAK8Q&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## 使用PowerDesigner导出建表语句
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702356449130-0ab2e139-0029-4db4-a89d-c4d46ca800e4.png#averageHue=%23f5f4f4&clientId=u0cd9c8dc-062f-4&from=paste&height=663&id=u93450af9&originHeight=663&originWidth=1088&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49050&status=done&style=shadow&taskId=u551f93ed-f4ad-4e51-b667-2fc25c38dbd&title=&width=1088)

```sql
drop table if exists t_user;

/*==============================================================*/
/* Table: t_user                                                */
/*==============================================================*/
create table t_user
(
   id                   bigint not null comment '用户的唯一标识',
   name                 varchar(255) not null,
   password             varchar(255) not null,
   realname             varchar(255),
   gender               char(2),
   tel                  char(11),
   primary key (id)
);

alter table t_user comment '用户表存储用户信息。';

```

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=TuLZs&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## 使用Navicat for MySQL初始化数据
### 建库
使用Navicat for MySQL创建一个MySQL数据库，起名：jdbc
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702356898211-79878d20-d32a-4764-b2d9-fa7de3c24053.png#averageHue=%23f0eeed&clientId=u0cd9c8dc-062f-4&from=paste&height=487&id=ub2f26cb2&originHeight=487&originWidth=293&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24944&status=done&style=none&taskId=u71f5ac6e-a9cc-4a75-b621-4f724c14131&title=&width=293)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702356942314-e5cb2d8a-3e9c-46b4-91b6-6ab59e7fbb0a.png#averageHue=%23f9f8f8&clientId=u0cd9c8dc-062f-4&from=paste&height=390&id=u4f4cc83e&originHeight=390&originWidth=438&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10115&status=done&style=none&taskId=u51c78507-6467-4fce-ae75-1c842cebf05&title=&width=438)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=rkEnP&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
### 建表
执行jdbc.sql脚本：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702357035951-94877536-4153-4399-a6ae-9672bf97e062.png#averageHue=%23f0edeb&clientId=u0cd9c8dc-062f-4&from=paste&height=374&id=u41c592a0&originHeight=374&originWidth=293&originalType=binary&ratio=1&rotation=0&showTitle=false&size=21222&status=done&style=shadow&taskId=u6da02b5b-0bc8-49b2-88a1-806cbe27063&title=&width=293)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702357083312-51eff97d-6686-4559-b15b-5069e5ed60ba.png#averageHue=%23f7f7f6&clientId=u0cd9c8dc-062f-4&from=paste&height=392&id=ued9efd1d&originHeight=392&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14995&status=done&style=shadow&taskId=u60682216-3bf0-4eda-9e71-9fb70795456&title=&width=561)

最终创建的表：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702357196196-5a9db89b-b896-4bf0-88bb-c4d5aabd411b.png#averageHue=%23f6f6f5&clientId=u0cd9c8dc-062f-4&from=paste&height=284&id=ua74bad36&originHeight=284&originWidth=863&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22932&status=done&style=shadow&taskId=u14f0bfdf-c432-4493-a95c-d82bea257b9&title=&width=863)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=hmdt2&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
### 插入数据
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702357446508-4d4cdf35-d996-4fa2-b823-afe81b1e9c50.png#averageHue=%23f3f2f0&clientId=u0cd9c8dc-062f-4&from=paste&height=190&id=uf0f4611c&originHeight=190&originWidth=579&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18948&status=done&style=shadow&taskId=u4c353718-bc1f-4e17-ae48-47401a0371d&title=&width=579)
注意：这里我将主键设置为了自增：auto_increment。其实这个也可以在PowerDesigner中设计时指定自增：勾选上它即可。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702357560943-84503c36-4205-42bc-b488-6cca2f4dd16c.png#averageHue=%23f3f2f1&clientId=u0cd9c8dc-062f-4&from=paste&height=444&id=ude5a2110&originHeight=444&originWidth=540&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23459&status=done&style=shadow&taskId=u795b2b6b-d5a5-40bc-a0a4-7672112dd8a&title=&width=540)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=jb3Sy&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# JDBC完成新增操作
新增操作就是让数据库执行insert语句。通过这个操作来学习一下JDBC编程的每一步。刚开始编写JDBC代码的时候，建议使用文本编辑器，先不借助任何IDE。
## JDBC编程第一步：注册驱动
注册驱动有两个作用：

1. 将 JDBC 驱动程序从硬盘上的文件系统中加载到内存。
2. 让 DriverManager 可以通过一个统一的接口来管理该驱动程序的所有连接操作。

API帮助文档：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702375429683-7a25727f-4615-45f1-a56c-fd02eea60dd2.png#averageHue=%23fcfafa&clientId=u0cd9c8dc-062f-4&from=paste&height=276&id=uef30ca2c&originHeight=276&originWidth=606&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23402&status=done&style=none&taskId=u9c2d9a52-6ae6-4a6e-abbf-d7c70b7909d&title=&width=606)

代码如下：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCTest01 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
            DriverManager.registerDriver(driver); // 完成驱动注册
        } catch(SQLException e){
            e.printStackTrace();
        }
    }
}
```
**注意：注册驱动调用的是java.sql.DriverManager的registerDriver()方法。这些方法的使用要参阅JDK的API帮助文档。**
**思考1：为什么以上代码中new的时候，后面类名要带上包名呢？**
**思考2：以上代码中哪些是JDBC接口，哪些是JDBC接口的实现？**
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=OJfIb&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## JDBC编程第二步：获取连接
获取java.sql.Connection对象，该对象的创建标志着mysql进程和jvm进程之间的通道打开了。
### 代码实现
API帮助文档：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702375535525-fad3b7e2-b7f5-4079-a2e1-31c597ae8165.png#averageHue=%23fcfbfb&clientId=u0cd9c8dc-062f-4&from=paste&height=449&id=u2c3fe33b&originHeight=449&originWidth=1601&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53968&status=done&style=shadow&taskId=uc413cfe1-b449-46ca-9a38-3d0558c326b&title=&width=1601)

代码如下：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;

public class JDBCTest01 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
            DriverManager.registerDriver(driver); // 完成驱动注册

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc";
            String user = "root";
            String password = "123456";
            Connection conn = DriverManager.getConnection(url, user, password);

            System.out.println("连接对象：" + conn);
        } catch(SQLException e){
            e.printStackTrace();
        }
    }
}
```

执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702372789612-ac3b38a8-6f6d-44f2-8024-ccab0bac9380.png#averageHue=%23131110&clientId=u0cd9c8dc-062f-4&from=paste&height=71&id=u0eeaddfb&originHeight=71&originWidth=655&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8565&status=done&style=none&taskId=u2a5da5f4-1a21-4311-b1bd-7dd3561d11b&title=&width=655)
看到以上的输出结果，表示数据库已经连接成功了。

通过以上程序的输出结果得知：com.mysql.cj.jdbc.ConnectionImpl是java.sql.Connection接口的实现类，大家可以想象一下，如果换成Oracle数据库的话，这个实现类的类名是不是就会换一个呢？答案是肯定的。不过对于我们来说是不需要关心具体实现类的，因为后续的代码都是直接面向java.sql.Connection接口来调用方法的。面向接口编程在这里体现的淋漓尽致。确实降低了耦合度。

以上程序中演示了连接数据库需要提供三个信息：url，用户名，密码。其中用户名和密码容易理解。url是什么？
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=s9plF&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
### 什么是URL
URL 是统一资源定位符 (Uniform Resource Locator) 的缩写，是互联网上标识、定位、访问资源的字符串。它可以用来指定互联网上各种类型的资源的位置，如网页、图片、视频等。

URL 通常由协议、服务器名、服务器端口、路径和查询字符串组成。其中：

- 协议是规定了访问资源所采用的通信协议，例如 HTTP、HTTPS、FTP 等；
- 服务器名是资源所在的服务器主机名或 IP 地址，可以是域名或 IP 地址；
- 服务器端口是资源所在的服务器的端口号；
- 路径是资源所在的服务器上的路径、文件名等信息；
- 查询字符串是向服务器提交的参数信息，用来定位更具体的资源。

URL 在互联网中广泛应用，比如在浏览器中输入 URL 来访问网页或下载文件，在网站开发中使用 URL 来访问 API 接口或文件，在移动应用和桌面应用中使用 URL 来访问应用内部的页面或功能，在搜索引擎中使用 URL 来爬取网页内容等等。

总之，URL 是互联网上所有资源的唯一识别标识，是互联网通信的基础和核心技术之一。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=Uy1MQ&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
### JDBC连接MySQL时的URL格式
JDBC URL 是在使用 JDBC 连接数据库时的一个 URL 字符串，它用来标识要连接的数据库的位置、认证信息和其他配置参数等。JDBC URL 的格式可以因数据库类型而异，但通常包括以下几个部分：

- 协议：表示要使用的数据库管理系统（DBMS）的类型，如 `jdbc:mysql` 表示要使用 MySQL 数据库，`jdbc:postgresql` 表示要使用 PostgreSQL 数据库。
- 主机地址和端口号：表示要连接的数据库所在的服务器的 IP 地址或域名，以及数据库所在服务器监听的端口号。
- 数据库名称：表示要连接的数据库的名称。
- 其他可选参数：这些参数包括连接的超时时间、使用的字符集、连接池相关配置等。

例如，连接 MySQL 数据库的 JDBC URL 的格式一般如下：

```
jdbc:mysql://<host>:<port>/<database_name>?<connection_parameters>
```

其中：

- `<host>` 是 MySQL 数据库服务器的主机名或 IP 地址；
- `<port>` 是 MySQL 服务器的端口号（默认为 3306）；
- `<database_name>` 是要连接的数据库名称；
- `<connection_parameters>` 包括连接的额外参数，例如用户名、密码、字符集等。

JDBC URL 是连接数据库的关键，通过 JDBC URL，应用程序可以通过特定的 JDBC 驱动程序与数据库服务器进行通信，从而实现与数据库的交互。在开发 Web 应用和桌面应用时，使用 JDBC URL 可以轻松地连接和操作各种类型的数据库，例如 MySQL、PostgreSQL、Oracle 等。

以下是一个常见的JDBC MySQL URL：
```
jdbc:mysql://localhost:3306/jdbc
```
`jdbc:mysql://`是协议
`localhost`表示连接本地主机的MySQL数据库，也可以写作`127.0.0.1`
`3306`是MySQL数据库的端口号
`jdbc`是数据库实例名
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=LELJD&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
### MySQL URL中的其它常用配置
在 JDBC MySQL URL 中，常用的配置参数有：

- `serverTimezone`：MySQL 服务器时区，默认为 UTC，可以通过该参数来指定客户端和服务器的时区；

在 JDBC URL 中设置 `serverTimezone` 的作用是指定数据库服务器的时区。这个时区信息会影响 JDBC 驱动在处理日期时间相关数据类型时如何将其映射到服务器上的日期时间值。
如果不设置 `serverTimezone`，则 JDBC 驱动程序默认将使用本地时区，也就是客户端机器上的系统时区，来处理日期时间数据。在这种情况下，如果服务器的时区和客户端机器的时区不同，那么处理日期时间数据时可能会出现问题，从而导致数据错误或不一致。
例如，假设服务器位于美国加州，而客户端位于中国上海，如果不设置 `serverTimezone` 参数，在客户端执行类似下面的查询：
```sql
SELECT * FROM orders WHERE order_date = '2022-11-11';
```
由于客户端和服务器使用了不同的时区，默认使用的是客户端本地的时区，那么实际查询的时间就是客户端本地时间对应的时间，而不是服务器的时间。这可能会导致查询结果不正确，因为服务器上的时间可能是比客户端慢或者快了多个小时。
通过在 JDBC URL 中设置 `serverTimezone` 参数，可以明确告诉 JDBC 驱动程序使用哪个时区来处理日期时间值，从而避免这种问题。在上述例子中，如果把时区设置为 `America/Los_Angeles`（即加州的时区）：
```
jdbc:mysql://localhost:3306/mydatabase?user=myusername&password=mypassword&serverTimezone=America/Los_Angeles
```
那么上面的查询就会在数据库服务器上以加州的时间来执行，结果更加准确。

- `useSSL`：是否使用 SSL 进行连接，默认为 true；

`useSSL` 参数用于配置是否使用 SSL（Secure Sockets Layer）安全传输协议来加密 JDBC 和 MySQL 数据库服务器之间的通信。其设置为 `true` 表示使用 SSL 连接，设置为 `false` 表示不使用 SSL 连接。其区别如下：
当设置为 `true` 时，JDBC 驱动程序将使用 SSL 加密协议来保障客户端和服务器之间的通信安全。这种方式下，所有数据都会使用 SSL 加密后再传输，可以有效防止数据在传输过程中被窃听、篡改等安全问题出现。当然，也要求服务器端必须支持 SSL，否则会连接失败。
当设置为 `false` 时，JDBC 驱动程序会以明文方式传输数据，这种方式下，虽然数据传输的速度会更快，但也会存在被恶意攻击者截获和窃听数据的风险。因此，在不安全的网络环境下，或是要求数据传输安全性较高的情况下，建议使用 SSL 加密连接。
需要注意的是，使用 SSL 连接会对系统资源和性能消耗有一定的影响，特别是当连接数较多时，对 CPU 和内存压力都比较大。因此，在性能和安全之间需要权衡，根据实际应用场景合理设置 `useSSL` 参数。

- useUnicode：是否使用Unicode编码进行数据传输，默认是true启用

`useUnicode`是 JDBC 驱动程序连接数据库时的一个参数，用于告诉驱动程序在传输数据时是否使用 Unicode 编码。Unicode 是计算机科学中的一种字符编码方案，可以用于表示全球各种语言中的字符，包括 ASCII 码、中文、日文、韩文等。因此，使用 Unicode 编码可以确保数据在传输过程中能够正确、完整地呈现各种语言的字符。
具体地说，如果设置 `useUnicode=true`，JDBC 驱动程序会在传输数据时使用 Unicode 编码。这意味着，无论数据源中使用的是什么编码方案，都会先将数据转换为 Unicode 编码进行传输，确保数据能够跨平台、跨数据库正确传输。当从数据库中获取数据时，驱动程序会根据 `characterEncoding` 参数指定的字符集编码将数据转换为指定编码格式，以便应用程序正确处理数据。
需要注意的是，如果设置 `useUnicode=false`，则表示使用当前平台默认的字符集进行数据传输。这可能会导致在跨平台或跨数据库时出现字符编码不一致的问题，因此通常建议在进行数据传输时启用 Unicode 编码。
综上所述，设置 `useUnicode` 参数可以确保数据在传输过程中正确呈现各种字符集编码。对于应用程序处理多语言环境数据的场景，启用 `useUnicode` 参数尤为重要。

- `characterEncoding`：连接使用的字符编码，默认为 UTF-8；

`characterEncoding` 参数用于设置 MySQL 服务器和 JDBC 驱动程序之间进行字符集转换时使用的字符集编码。其设置为 `UTF-8` 表示使用 UTF-8 编码进行字符集转换，设置为 `GBK` 表示使用 GBK 编码进行字符集转换。其区别如下：
UTF-8 编码是一种可变长度的编码方式，可以表示世界上的所有字符，包括 ASCII、Unicode 和不间断空格等字符，是一种通用的编码方式。UTF-8 编码在国际化应用中被广泛使用，并且其使用的字节数较少，有利于提高数据传输的效率和节约存储空间。
GBK 编码是一种固定长度的编码方式，只能表示汉字和部分符号，不能表示世界上的所有字符。GBK 编码通常只用于中文环境中，因为在英文和数字等字符中会出现乱码情况。
因此，在 MySQL 中使用 `UTF-8` 编码作为字符集编码的优势在于能够支持世界上的所有字符，而且在国际化应用中使用广泛，对于不同语言和地区的用户都能够提供良好的支持。而使用 `GBK` 编码则主要在于适用于中文环境中的数据存储和传输。
需要注意的是，在选择编码方式时需要考虑到应用本身的实际需要和数据的特性，根据具体情况进行选择，避免出现字符集编码错误的问题。同时，还要确保 MySQL 服务器、JDBC 驱动程序和应用程序之间的字符集编码一致，避免出现字符集转换错误的问题。

**注意：useUnicode和characterEncoding有什么区别？**

- **useUnicode设置的是数据在传输过程中是否使用Unicode编码方式。**
- **characterEncoding设置的是数据被传输到服务器之后，服务器采用哪一种字符集进行编码。**

例如，连接 MySQL 数据库的 JDBC URL 可以如下所示：
```
jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8
```
这里演示的是使用本地 MySQL 数据库，使用Unicode编码进行数据传输，服务器时区为 Asia/Shanghai，启用 SSL 连接，服务器接收到数据后使用 UTF-8 编码。

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=QZO2x&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## JDBC编程第三步：获取数据库操作对象
数据库操作对象是这个接口：java.sql.Statement。这个对象负责将SQL语句发送给数据库服务器，服务器接收到SQL后进行编译，然后执行SQL。

API帮助文档如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702441460073-15a0cb32-b979-442c-900b-ec3109722750.png#averageHue=%23fafafa&clientId=u250ab531-c195-4&from=paste&height=303&id=u1963efbb&originHeight=303&originWidth=730&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26208&status=done&style=shadow&taskId=u5bd04c45-816c-4f5c-97c7-13e4ad184d2&title=&width=730)

获取数据库操作对象代码如下：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;

public class JDBCTest01 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
            DriverManager.registerDriver(driver); // 完成驱动注册

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
            String user = "root";
            String password = "123456";
            Connection conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            Statement stmt = conn.createStatement();
            System.out.println("数据库操作对象stmt = " + stmt);
        } catch(SQLException e){
            e.printStackTrace();
        }
    }
}
```

执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702440942574-861f279e-3244-4834-98a3-491d913949f6.png#averageHue=%23141210&clientId=u6d14a91a-446b-4&from=paste&height=68&id=u227c2993&originHeight=68&originWidth=744&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10201&status=done&style=none&taskId=u970ba921-b119-4d28-b865-7b7331b642d&title=&width=744)

同样可以看到：java.sql.Statement接口在MySQL驱动中的实现类是：com.mysql.cj.jdbc.StatementImpl。不过我们同样是不需要关心这个具体的实现类。因为后续的代码仍然是面向Statement接口写代码的。

另外，要知道的是通过一个Connection对象是可以创建多个Statement对象的：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;

public class JDBCTest01 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
            DriverManager.registerDriver(driver); // 完成驱动注册

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
            String user = "root";
            String password = "123456";
            Connection conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            Statement stmt = conn.createStatement();
            System.out.println("数据库操作对象stmt = " + stmt);

            Statement stmt2 = conn.createStatement();
            System.out.println("数据库操作对象stmt2 = " + stmt2);
            
        } catch(SQLException e){
            e.printStackTrace();
        }
    }
}
```

执行结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702441181097-76775506-0d8a-4c6b-a077-4feaf637c82a.png#averageHue=%23191613&clientId=u6d14a91a-446b-4&from=paste&height=91&id=u8eec20a7&originHeight=91&originWidth=776&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17888&status=done&style=none&taskId=u89073331-77cd-46a5-a1d9-2f49f793eb3&title=&width=776)

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=wTCPN&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## JDBC编程第四步：执行SQL
当获取到Statement对象后，调用这个接口中的相关方法即可执行SQL语句。

API帮助文档如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702441577751-223506b2-73c9-47ee-a614-4b95fe555df3.png#averageHue=%23fcfaf8&clientId=u250ab531-c195-4&from=paste&height=365&id=ub3a2fe5e&originHeight=365&originWidth=732&originalType=binary&ratio=1&rotation=0&showTitle=false&size=32783&status=done&style=shadow&taskId=u3f69ebe3-b598-441e-b8c2-cee4d4bd33b&title=&width=732)

**该方法的参数是一个SQL语句，只要将insert语句传递过来即可。当执行executeUpdate(sql)方法时，JDBC会将sql语句发送给数据库服务器，数据库服务器对SQL语句进行编译，然后执行SQL。**
**该方法的返回值是int类型，返回值的含义是：影响了数据库表当中几条记录。例如：返回1表示1条数据插入成功，返回2表示2条数据插入成功，以此类推。如果一条也没有插入，则返回0。**
**该方法适合执行的SQL语句是DML，包括：insert delete update。**

代码实现如下：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;

public class JDBCTest01 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
            DriverManager.registerDriver(driver); // 完成驱动注册

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
            String user = "root";
            String password = "123456";
            Connection conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            Statement stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
            int count = stmt.executeUpdate(sql);
            System.out.println("插入了" + count + "条记录");
            
        } catch(SQLException e){
            e.printStackTrace();
        }
    }
}
```

执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702441948716-d8c4638f-5d7a-4d26-b3d0-a2ed4872e6a4.png#averageHue=%23151311&clientId=u250ab531-c195-4&from=paste&height=73&id=uaeff0e6c&originHeight=73&originWidth=276&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4955&status=done&style=shadow&taskId=u9c765ac6-0b5e-4f70-8035-34afb8d658c&title=&width=276)
数据库表变化了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702441971625-ba842802-4881-48ab-a4f3-17acc229d9c2.png#averageHue=%23dbb26c&clientId=u250ab531-c195-4&from=paste&height=142&id=ud112604e&originHeight=142&originWidth=569&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11666&status=done&style=shadow&taskId=u47d5cce9-0e5d-426e-a707-2a0a1bc20b8&title=&width=569)
![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=EwOpD&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## JDBC编程第六步：释放资源
第五步去哪里了？第五步是处理查询结果集，以上操作不是select语句，所以第五步直接跳过，直接先看一下第六步释放资源。【后面学习查询语句的时候，再详细看第五步】
### 为什么要释放资源
在 JDBC 编程中，建立数据库连接、创建 Statement 对象等操作都需要申请系统资源，例如打开网络端口、申请内存等。为了避免占用过多的系统资源和避免出现内存泄漏等问题，我们需要在使用完资源后及时释放它们。
### 释放资源的原则
原则1：在finally语句块中释放

- 建议在finally语句块中释放，因为程序执行过程中如果出现了异常，finally语句块中的代码是一定会执行的。也就是说：我们需要保证程序在执行过程中，不管是否出现了异常，最后的关闭是一定要执行的。当然了，也可以使用Java7的新特性：Try-with-resources。Try-with-resources 是 Java 7 引入的新特性。它简化了资源管理的代码实现，可以自动释放资源，减少了代码出错的可能性，同时也可以提供更好的代码可读性和可维护性。

原则2：释放有顺序

- 从小到大依次释放，创建的时候，先创建Connection，再创建Statement。那么关闭的时候，先关闭Statement，再关闭Connection。

原则3：分别进行try...catch...

- 关闭的时候调用close()方法，该方法有异常需要处理，建议分别对齐try...catch...进行异常捕获。如果只编写一个try...catch...进行一块捕获，在关闭过程中，如果某个关闭失败，会影响下一个资源的关闭。

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=e1WGj&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
### 代码如何实现
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;

public class JDBCTest01 {
    public static void main(String[] args){
        Connection conn = null;
        Statement stmt = null;
        try {
            // 1. 注册驱动
            Driver driver = new com.mysql.cj.jdbc.Driver(); // 创建MySQL驱动对象
            DriverManager.registerDriver(driver); // 完成驱动注册

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
            String user = "root";
            String password = "123456";
            conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
            int count = stmt.executeUpdate(sql);
            System.out.println("插入了" + count + "条记录");
            
        } catch(SQLException e){
            e.printStackTrace();
        } finally {
            // 6. 释放资源
            if(stmt != null){
                try{
                    stmt.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
            if(conn != null){
                try{
                    conn.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=F5fNP&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# 注册驱动的常用方式
上面在注册驱动的时候，执行了这样的代码：
```java
java.sql.Driver driver = new com.mysql.cj.jdbc.Driver();
java.sql.DriverManager.registerDriver(driver);
```

这种方式是自己new驱动对象，然后调用DriverManager的registerDriver()方法来完成驱动注册，还有另一种方式，并且这种方式是常用的：
```java
Class.forName("com.mysql.cj.jdbc.Driver");
```

为什么这种方式常用？

- 第一：代码少了很多。
- 第二：这种方式可以很方便的将`com.mysql.cj.jdbc.Driver`类名配置到属性文件当中。

实现原理是什么？找一下`com.mysql.cj.jdbc.Driver`的源码：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702447203245-d68ebbe5-7d00-486c-be09-77ffa75c3407.png#averageHue=%23fbf9f8&clientId=u7c1aac3c-b9a1-4&from=paste&height=297&id=uccfd25eb&originHeight=297&originWidth=360&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12179&status=done&style=shadow&taskId=ud704ee4b-1b9b-4069-9173-110ec243516&title=&width=360)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702447277996-c1526d49-f502-4925-8042-0d4edff0370d.png#averageHue=%23faf7f6&clientId=u7c1aac3c-b9a1-4&from=paste&height=633&id=u1781014f&originHeight=633&originWidth=675&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82510&status=done&style=shadow&taskId=u584847eb-e7ea-45a6-bac9-aa7ad04fe44&title=&width=675)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702447333885-23189b4e-5767-4dba-ae21-bdc543241db6.png#averageHue=%23fdfaf9&clientId=u7c1aac3c-b9a1-4&from=paste&height=680&id=uf6d27369&originHeight=680&originWidth=830&originalType=binary&ratio=1&rotation=0&showTitle=false&size=46959&status=done&style=shadow&taskId=u3d931415-f78b-48b4-bd14-348658e6392&title=&width=830)

通过源码不难发现，在`com.mysql.cj.jdbc.Driver`类中有一个静态代码块，在这个静态代码块中调用了`java.sql.DriverManager.registerDriver(new Driver());`完成了驱动的注册。而`Class.forName("com.mysql.cj.jdbc.Driver");`代码的作用就是让`com.mysql.cj.jdbc.Driver`类完成加载，执行它的静态代码块。

编写代码测试一下：
```java
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;

public class JDBCTest02 {
    public static void main(String[] args){
        Connection conn = null;
        Statement stmt = null;
        try {
            // 1. 注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
            String user = "root";
            String password = "123456";
            conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
            int count = stmt.executeUpdate(sql);
            System.out.println("插入了" + count + "条记录");
            
        } catch(SQLException | ClassNotFoundException e){
            e.printStackTrace();
        } finally {
            // 6. 释放资源
            if(stmt != null){
                try{
                    stmt.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
            if(conn != null){
                try{
                    conn.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```

执行结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702448305879-6a1fe86a-6da8-4127-8e6d-5dafeeffa94f.png#averageHue=%23191714&clientId=u7c1aac3c-b9a1-4&from=paste&height=63&id=u996e8b7d&originHeight=63&originWidth=253&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4977&status=done&style=shadow&taskId=u23ee8a99-53ce-438e-9119-bdf0a890e7d&title=&width=253)

数据库表中数据也新增了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702448335558-06ceaaf7-6b10-4fca-a9c1-0d9f81281f48.png#averageHue=%23dcb26c&clientId=u7c1aac3c-b9a1-4&from=paste&height=166&id=ud397ca1f&originHeight=166&originWidth=555&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13301&status=done&style=shadow&taskId=u93e0efd9-e2cc-41a6-8824-e8989bb718e&title=&width=555)

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=acQ6d&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# JDBC 4.0后不用手动注册驱动（了解）
从JDBC 4.0（**也就是Java6**）版本开始，驱动的注册不需要再手动完成，由系统自动完成。
```java
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;

public class JDBCTest03 {
    public static void main(String[] args){
        Connection conn = null;
        Statement stmt = null;
        try {
            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8";
            String user = "root";
            String password = "123456";
            conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
            int count = stmt.executeUpdate(sql);
            System.out.println("插入了" + count + "条记录");
            
        } catch(SQLException e){
            e.printStackTrace();
        } finally {
            // 6. 释放资源
            if(stmt != null){
                try{
                    stmt.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
            if(conn != null){
                try{
                    conn.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```

执行结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702448395728-8b99a1d5-eb2d-4541-b140-dbaf03d12e4c.png#averageHue=%23151211&clientId=u7c1aac3c-b9a1-4&from=paste&height=73&id=A3QO6&originHeight=73&originWidth=251&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4938&status=done&style=shadow&taskId=ufddd9ae9-54ec-4d51-a12a-e0276c72b5c&title=&width=251)

数据库表中数据也添加了一条：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702448423567-a2526811-994b-496a-bd61-7ba47dfda8cb.png#averageHue=%23e4c17b&clientId=u7c1aac3c-b9a1-4&from=paste&height=181&id=u42d8e45b&originHeight=181&originWidth=556&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15314&status=done&style=shadow&taskId=ubebfbfc2-ee04-42b2-a495-f1c6ed41091&title=&width=556)
**注意：虽然大部分情况下不需要进行手动注册驱动了，但在实际的开发中有些数据库驱动程序不支持自动发现功能，仍然需要手动注册。所以建议大家还是别省略了。**

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=tO7GD&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# 动态配置连接数据库的信息
为了程序的通用性，为了切换数据库的时候不需要修改Java程序，为了符合OCP开闭原则，建议将连接数据库的信息配置到属性文件中，例如：
```properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/jdbc?useUnicode=true&serverTimezone=Asia/Shanghai&useSSL=true&characterEncoding=utf-8
user=root
password=123456
```

然后使用IO流读取属性文件，动态获取连接数据库的信息：
```java
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ResourceBundle;

public class JDBCTest04 {
    public static void main(String[] args){
        
    	// 通过以下代码获取属性文件中的配置信息
		ResourceBundle bundle = ResourceBundle.getBundle("jdbc");
		String driver = bundle.getString("driver");
		String url = bundle.getString("url");
		String user = bundle.getString("user");
		String password = bundle.getString("password");

        Connection conn = null;
        Statement stmt = null;
        try {
            // 1. 注册驱动
            Class.forName(driver);

            // 2. 获取连接
            conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "insert into t_user(name,password,realname,gender,tel) values('tangsanzang','123','唐三藏','男','12566568956')"; // sql语句最后的分号';'可以不写。
            int count = stmt.executeUpdate(sql);
            System.out.println("插入了" + count + "条记录");
            
        } catch(SQLException | ClassNotFoundException e){
            e.printStackTrace();
        } finally {
            // 6. 释放资源
            if(stmt != null){
                try{
                    stmt.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
            if(conn != null){
                try{
                    conn.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```

执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702448811161-f8f9d0fc-025b-48a9-b9fa-a38d96b7b168.png#averageHue=%23171513&clientId=u7c1aac3c-b9a1-4&from=paste&height=73&id=uc696c982&originHeight=73&originWidth=260&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5011&status=done&style=shadow&taskId=ub6b01b11-82ea-452b-9e6d-e128953b256&title=&width=260)

数据库表中也会新增一条记录：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702448831135-374bee91-f770-40aa-ba3b-eb35ded23435.png#averageHue=%23dcb36e&clientId=u7c1aac3c-b9a1-4&from=paste&height=205&id=uf0b9de72&originHeight=205&originWidth=548&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17026&status=done&style=shadow&taskId=u81fcb1f5-df4c-41fb-8ad0-157052f6a32&title=&width=548)

以后要连接其他数据库，只要修改属性文件中的配置即可。

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=P19kA&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# 获取连接的其他方式（了解）
上面我们讲到了第一种获取连接的方式：
```java
Connection conn = DriverManager.getConnection(url, user, password);
```

除了以上的这种方式之外，还有两种方式，通过API帮助文档可以看到：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702453145756-8174de75-a789-4030-b496-8b7fd700afb6.png#averageHue=%23848683&clientId=uad1d7c4b-3ad5-4&from=paste&height=114&id=u57e0b4f0&originHeight=114&originWidth=486&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9318&status=done&style=shadow&taskId=u146edfbb-7091-4908-9205-66871e8b703&title=&width=486)

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=wmT9v&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## getConnection(String url)
这种方式参数只有一个url，那用户名和密码放在哪里呢？可以放到url当中，代码如下：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;

public class JDBCTest05 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc?user=root&password=123456";
            Connection conn = DriverManager.getConnection(url);

            System.out.println("连接对象：" + conn);
        } catch(SQLException|ClassNotFoundException e){
            e.printStackTrace();
        }
    }
}
```

执行结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702455014436-0f8654ab-8919-444f-a5b3-03b8c11736ae.png#averageHue=%2313110f&clientId=uad1d7c4b-3ad5-4&from=paste&height=76&id=u583c9f06&originHeight=76&originWidth=632&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8658&status=done&style=shadow&taskId=u5cc7dddf-c500-4258-97a9-55f93a03d6a&title=&width=632)

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=jg0kF&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
## getConnection(String url, Properties info)
这种方式有两个参数，一个是url，一个是Properties对象。

- url：可以单纯提供一个url地址
- info：可以将url的参数存放到该对象中

代码如下：
```java
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.util.Properties;

public class JDBCTest06 {
    public static void main(String[] args){
        try {
            // 1. 注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 获取连接
            String url = "jdbc:mysql://localhost:3306/jdbc";
            
            Properties info = new Properties();
            info.setProperty("user", "root");
            info.setProperty("password", "123456");
            info.setProperty("useUnicode", "true");
            info.setProperty("serverTimezone", "Asia/Shanghai");
            info.setProperty("useSSL", "true");
            info.setProperty("characterEncoding", "utf-8");
            
            Connection conn = DriverManager.getConnection(url, info);

            System.out.println("连接对象：" + conn);
        } catch(SQLException|ClassNotFoundException e){
            e.printStackTrace();
        }
    }
}
```

执行结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702455362524-bc4e9ffa-ca7d-433a-af73-01cf76d556a0.png#averageHue=%23141210&clientId=uad1d7c4b-3ad5-4&from=paste&height=70&id=u8e5e09e5&originHeight=70&originWidth=651&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8686&status=done&style=shadow&taskId=u5fc59869-8791-4891-9bf0-46233ec61a2&title=&width=651)

以上这两种方式作为了解，不是重点。

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=gGqrD&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# JDBC完成修改操作
修改操作就是执行update语句。仍然调用Statement接口的executeUpdate(sql)方法即可。
业务要求：将name是tangsanzang的真实姓名修改为唐僧。
修改前的数据：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702456282356-5938ff92-a0ea-46d6-96f1-684c3fb29364.png#averageHue=%23f6f4f2&clientId=uad1d7c4b-3ad5-4&from=paste&height=229&id=u643b9072&originHeight=229&originWidth=564&originalType=binary&ratio=1&rotation=0&showTitle=false&size=17418&status=done&style=shadow&taskId=u8293e081-039b-4407-84b4-7e8446f739d&title=&width=564)

代码如下：
```java
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ResourceBundle;

public class JDBCTest07 {
    public static void main(String[] args){
        
    	// 通过以下代码获取属性文件中的配置信息
		ResourceBundle bundle = ResourceBundle.getBundle("jdbc");
		String driver = bundle.getString("driver");
		String url = bundle.getString("url");
		String user = bundle.getString("user");
		String password = bundle.getString("password");

        Connection conn = null;
        Statement stmt = null;
        try {
            // 1. 注册驱动
            Class.forName(driver);

            // 2. 获取连接
            conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "update t_user set realname='唐僧' where name='tangsanzang'";
            int count = stmt.executeUpdate(sql);
            System.out.println("更新了" + count + "条记录");
            
        } catch(SQLException | ClassNotFoundException e){
            e.printStackTrace();
        } finally {
            // 6. 释放资源
            if(stmt != null){
                try{
                    stmt.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
            if(conn != null){
                try{
                    conn.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```

执行结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702456438297-48fcead2-99e0-4bd8-9e65-8cc911eb529b.png#averageHue=%23191613&clientId=uad1d7c4b-3ad5-4&from=paste&height=65&id=uf1056966&originHeight=65&originWidth=245&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5013&status=done&style=shadow&taskId=u2027d896-51af-4d88-bcd0-545fddd147b&title=&width=245)

更新后的数据：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702456454268-27e23605-5b36-4bb5-80b1-deb74ef1d5ac.png#averageHue=%23dbb069&clientId=uad1d7c4b-3ad5-4&from=paste&height=203&id=ud238080d&originHeight=203&originWidth=556&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16844&status=done&style=shadow&taskId=u3daedd8f-84ea-4b95-a8b4-1a6f8add32f&title=&width=556)

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=G92un&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)
# JDBC完成删除操作
删除操作就是执行delete语句。仍然调用Statement接口的executeUpdate(sql)方法即可。
业务要求：将id是15，16，17的数据删除。
删除前的数据：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702456454268-27e23605-5b36-4bb5-80b1-deb74ef1d5ac.png#averageHue=%23dbb069&clientId=uad1d7c4b-3ad5-4&from=paste&height=203&id=kdnEV&originHeight=203&originWidth=556&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16844&status=done&style=shadow&taskId=u3daedd8f-84ea-4b95-a8b4-1a6f8add32f&title=&width=556)

代码如下：
```java
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ResourceBundle;

public class JDBCTest08 {
    public static void main(String[] args){
        
    	// 通过以下代码获取属性文件中的配置信息
		ResourceBundle bundle = ResourceBundle.getBundle("jdbc");
		String driver = bundle.getString("driver");
		String url = bundle.getString("url");
		String user = bundle.getString("user");
		String password = bundle.getString("password");

        Connection conn = null;
        Statement stmt = null;
        try {
            // 1. 注册驱动
            Class.forName(driver);

            // 2. 获取连接
            conn = DriverManager.getConnection(url, user, password);

            // 3. 获取数据库操作对象
            stmt = conn.createStatement();

            // 4. 执行SQL语句
            String sql = "delete from t_user where id in(15, 16, 17)";
            int count = stmt.executeUpdate(sql);
            System.out.println("删除了" + count + "条记录");
            
        } catch(SQLException | ClassNotFoundException e){
            e.printStackTrace();
        } finally {
            // 6. 释放资源
            if(stmt != null){
                try{
                    stmt.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
            if(conn != null){
                try{
                    conn.close();
                }catch(SQLException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
```
执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702456658043-1b44cb18-1150-4768-8296-737c4181f4d4.png#averageHue=%23181512&clientId=uad1d7c4b-3ad5-4&from=paste&height=71&id=u4ffdfcc1&originHeight=71&originWidth=238&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5258&status=done&style=shadow&taskId=u38d245b6-4707-484d-afc1-5d4ee82865b&title=&width=238)

删除后的数据：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/21376908/1702456673845-d64ca45a-a540-4813-a223-5be1db975764.png#averageHue=%23f6f4f2&clientId=uad1d7c4b-3ad5-4&from=paste&height=145&id=u3a2ae7c9&originHeight=145&originWidth=551&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11614&status=done&style=shadow&taskId=uf46afae2-dae6-4d3d-ab33-b6d0105d553&title=&width=551)

![](https://cdn.nlark.com/yuque/0/2023/jpeg/21376908/1692002570088-3338946f-42b3-4174-8910-7e749c31e950.jpeg#averageHue=%23f9f8f8&from=url&id=HO91y&originHeight=78&originWidth=1400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=shadow&title=)

---
title: Git | 使用及上传代码到仓库
tags:
  - Git
  - Github
createTime: 2025/04/01 22:45:57
permalink: /article/vtlaqapc/
cover: /Git.jpg
copyright:
  creation: reprint
  license: CC-BY-4.0
  source: https://yiov.top/website/pages/git.html
  author:
    name: yiov
    url: https://github.com/Yiov
---

![Git.webp](./Git使用及上传代码到仓库/Git.webp)

## 简介

一个开源的分布式版本控制系统，常用于 [Github](https://github.com/) 、[Gitee](https://gitee.com/) 等仓库的上传

网上教程对我这种小白，越看越头疼，于是自己边摸索边写了这篇教程

官网：https://git-scm.com/


![](./Git使用及上传代码到仓库/git-01.png)



## 下载安装


根据自己的系统下载git，本次仅演示windows

下载：https://git-scm.com/downloads

![](./Git使用及上传代码到仓库/git-02.png)


安装的时候，这里要勾选

![](./Git使用及上传代码到仓库/git-03.png)


下载安装完成后 选择Launch Git Bash启动


![](./Git使用及上传代码到仓库/git-04.png)






## 设置账户

::: tip 说明
首次使用，必须配置，以后就不用了
:::

打开git后是这样的界面

![](./Git使用及上传代码到仓库/git-05.png)


设置名字，修改一下，再粘贴

```sh title="sh"
#"DzPian"更改成你github/gitee用户名
git config --global user.name "DzPian"
```


鼠标右键 - Paste 粘贴(不要用ctrl+v) - 回车

![](./Git使用及上传代码到仓库/git-06.png)


![](./Git使用及上传代码到仓库/git-07.png)


然后设置邮箱

```sh title="sh"
#"49****@qq.com"这里填你的邮箱
git config --global user.email "49****@qq.com"
```

![](./Git使用及上传代码到仓库/git-08.png)


设置的用处就是，为了知道远程仓库是谁上传的

也可以通过命令查看

```sh title="sh"
#查看身份
git config user.name
git config user.email
```



## 开始准备

我以上传 GitHub 为例，其他的步骤差不多的

### 新建本地仓库


在任意盘符创建一个文件夹，自己命名

::: tip 说明
例：我在F盘新建了一个文件夹，命名为Github，然后再创建子文件夹copydog
:::

![](./Git使用及上传代码到仓库/git-09.png)

`copydog` 就是我的仓库项目名，我们cd进文件夹

::: tip 说明
斜杠不能掉，大小写无所谓
:::

```sh title="sh"
#f是F盘，自己根据自己的盘符和文件夹改
cd /f/github/copydog
```

或者简单粗暴git bash文件夹，空白处，鼠标右键- `Git Bash Here` ，一样也能进入页面

![](./Git使用及上传代码到仓库/git-10.png)



### 初始化

初始化项目 `git init` 就可以远程上传了

```sh title="sh"
git init
```
![](./Git使用及上传代码到仓库/git-11.png)


创建完成后会在本地生成一个 `.git` 的隐藏文件

![](./Git使用及上传代码到仓库/git-12.png)


::: details 为什么我看不到？
看不到的是因为系统默认隐藏了文件，查看 - 勾选隐藏项目

不打开也没有关系，以免你误删

![](./Git使用及上传代码到仓库/git-13.png)
:::


通过 ls -al 来查看一下，到这里本地仓库就建立完成了

```
ls -al
```

![](./Git使用及上传代码到仓库/git-14.png)



### 切换分支（可选）

git默认使用 `master` 分支（蓝色），也可以切换成 `main`

::: details 为什么github是main
以前的github默认也是 master 分支，后来为了避免这个词产生歧义，改成了main
:::

```sh title="sh"
#切换main分支
git checkout main
```
![](./Git使用及上传代码到仓库/git-15.png)





### SSH Key（重要）

用 `~/.ssh` 检查一下是否有SSH Key

只需要配置一次即可

```sh title="sh"
#显示ssh: Is a directory，表示有
#显示ssh: No such file or directory，表示没有
~/.ssh
```

![](./Git使用及上传代码到仓库/git-16.png)


没有就输入命令创建SSH Key

```sh title="sh"
#"49****@qq.com"填你自己的邮箱
ssh-keygen -t rsa -C "49****@qq.com"
```

直接3次回车即可

::: tip 说明
第1次问你保存在哪，默认就行，回车

第2次问你密码，默认空白，回车

第3次要你确认密码，默认空白，回车
:::


![](./Git使用及上传代码到仓库/git-17.png)


在  `C:\Users\Administrator\.ssh` 目录，生成了 `id_rsa` 和 `id_rsa.pub` 两个秘钥文件

找到 `id_rsa.pub` ，鼠标右键 - 用记事本打开

![](./Git使用及上传代码到仓库/git-18.png)


打开Github，右上角-头像-设置

![](./Git使用及上传代码到仓库/git-19.png)


点击 SSH与GPG公钥，创建New SSH key

![](./Git使用及上传代码到仓库/git-20.png)

标题随便起，key是刚刚生成的SSH key，全选了，复制粘贴进去

![](./Git使用及上传代码到仓库/git-21.png)


授权，输入你github的登录密码

![](./Git使用及上传代码到仓库/git-22.png)

SSH key就创建好了，邮箱也会收到通知

![](./Git使用及上传代码到仓库/git-23.png)

![](./Git使用及上传代码到仓库/git-24.png)




### 连接验证

在 git Bash 中输入以下代码，测试一下


```sh title="sh"
#默认git@github.com不要改
ssh -T git@github.com
```

这里问你是否继续连接，输入 `yes` ，回车

::: tip 提示
You’ve successfully authenticated, but GitHub does not provide shell access.

已经验证，但还不能shell访问
:::


![](./Git使用及上传代码到仓库/git-25.png)








## 远程仓库


进入自己的仓库，点击SSH连接并复制

![](./Git使用及上传代码到仓库/git-26.png)



然后，更改下方代码

```sh title="sh"
#如：git remote add origin git@github.com:DzPian/copydog.git
git remote add origin 这里是你的SSH连接地址
```


![](./Git使用及上传代码到仓库/git-27.png)


输入 `git remote -v` 查看是否成功

```sh title="sh"
git remote -v

#push是推送，fetch是获取，有就是正常

#断开仓库连接，慎用
#git remote remove origin
```


![](./Git使用及上传代码到仓库/git-28.png)






## 上传代码





当你新建或修改文件后，`git add .` 提交上传即可

::: warning 注意
add后面的 `.` 不能漏掉
:::

```sh title="sh"
git add .

#git add 只将修改的文件添加缓存区
#git add +文件名.文件类型 ，将某个文件加到缓存区
#git add +文件名.文件类型 ... 文件名.文件类型 ，将n个文件添加到缓存区
#git add xx文件夹/*.html 将xx文件夹下的所有的html文件添加到缓存区。
#git add *hhh  将以hhh结尾的文件的所有修改添加到暂存区
#git add Hello*  将所有以Hello开头的文件的修改添加到暂存区
#git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)
#git add . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件

#git add -A 提交所有变化。git add前几条都可以记不住，这个必须记住！！！
```

![](./Git使用及上传代码到仓库/git-29.png)


添加描述

```bash
#如：git commit -m “描述文件README”
git commit -m “这里描述上传了什么”
```



![](./Git使用及上传代码到仓库/git-30.png)



推送到远程仓库，去网页版刷新一下，就能看到了

::: tip 说明
这里默认分支是main，除非你想创建其他分支
:::

```sh title="sh"
#第1次推送使用-u，之后就不用了
git push -u origin main

#常用推送命令
git push origin main

#强制推送，报错懒得处理，建议少用
#git push origin main -f
```

![](./Git使用及上传代码到仓库/git-31.png)



## 常见问题



::: details 分支错误

原来的master变成了 `master rebase 1/2` 之类的，用abort回退即可

```sh title="sh"
git rebase --abort
```

出现 `main|MERGING` ，回退

```sh title="sh"
git reset --hard head
```
:::




::: details 删除分支
如果你上传错了分支，不是main而是传到了分支，在网页仓库点分支删除
:::




::: details 修改注释

修改后，别忘了push

```sh title="sh"
#修改内容
git commit --amend -m "你要修改的内容"

#更新推送
git push origin main
```
:::



::: details 修改文件名

```sh title="sh"
#修改内容
git commit -m "你要修改的文件名"

#更新推送
git push origin main
```
:::




::: details 查看历史提交

```sh title="sh"
git log
```
:::



::: details 远程删除文件

```sh title="sh"
#删除文件
git rm -r 你要删除的文件名

#删除说明
git commit -m "注释一下你删除了什么"

#更新推送
git push origin main
```
:::




::: details 创建分支

```sh title="sh"
#用英文
git branch 这里写分支的名字

#比如：git branch master
```
:::




::: details 仓库克隆

```sh title="sh"
git clone 你的SSH仓库地址
```
:::


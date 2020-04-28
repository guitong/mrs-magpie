---
title: Git Commit Message 编写约定
date: '2018-04-12'
category: Tools
description: 如果想要参与开源项目，最好还是规范下提交 commit message 的格式。
---

目前普遍使用的是[Angular规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit?usp=sharing)。如下图：

![bg2016010602](https://user-images.githubusercontent.com/30484000/36943790-544b9e3e-1fca-11e8-9794-e7661d170af7.png)

## Commit Message 格式

提交信息包括三个部分：**Header**,  **Body** 和 **Footer**。

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

其中，Header为必需项。任何一行不得超过72（或100）个字符。

### Header

Header部分包括三个字段：`type`（必需）、 `scope`（可选）、`subject`（必需）。

#### (1) type

标明类别，只允许使用如下7个：

```
feat: 新功能(feature)
fix: 修补big
docs: 文档(documentation)
style: 格式(不影响代码运行的变动)
refactor: 重构(既不是新增功能，也不是修改bug的代码改动)
test: 增加测试
chore: maintain
```

#### (2) scope

用于说明commit影响的范围，比如数据层、控制层、视图层等。

#### (3) subject

是commit的简短描述，不超过50个字符。

* 动词开头，使用第一人称现在时
* 第一个字母小写
* 结尾不加句号

### Body & Footer

暂略。详见参考。


# Reference

* [Commit message 和 Change log 编写指南 - 阮一峰](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

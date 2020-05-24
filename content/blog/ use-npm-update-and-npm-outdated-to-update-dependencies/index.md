---
title: 使用 npm update 和 npm outdated 更新项目依赖包
date: "2018-06-26"
description: 本文介绍了使用 npm 从命令行更新项目依赖的几种方法。
translation: true
category: Tools
---

更新一个库的版本并不容易。语义化的版本控制(Semantic versioning)足以解决问题，所以手动修改`package.json`文件的方式要比尝试花哨的`npm`更安全一些。这篇文章将介绍如何仅使用`npm`命令行工具去更新项目依赖。

注：“语义化的版本控制”是一套被普遍认可的约定，具体可参考文档 https://semver.org/

## 使用 `npm update` 更新至最接近(close-by)版本

当你在一个新项目上运行`npm install` ，`npm` 将安装满足`package.json`文件中语义化版本控制定义范围内的最新版本。初次安装后，再次运行`npm install`将不会更新已存在的包，这是因为`npm`已经在文件系统中找到了满足要求的版本。

你可以使用`npm update`来更新已安装的包，而不是`npm install`。当你运行`npm update`时，`npm`将检查是否有满足语义化版本控制要求的更新版本（newer versions）并安装它们。

假设我们依赖lodash的版本为`^3.9.3`，且该版本安装在`node_modules/lodash`目录下。

```json
"dependencies": {
    "lodash": "^3.9.2"
}
```

然后运行`npm update`将安装版本`3.10.1`至`node_modules/lodash`目录下，并更新`package.json`文件中相应的版本号。

```shell
$ npm update
└── lodash@3.10.1
```

```json
"dependencies": {
    "lodash": "^3.10.1"
}
```

## 使用`@latest`标签进行更大的更新

要更新超出语义版本控制范围的版本需要两个部分。

首先，使用`npm outdated`要求`npm`列出有可更新版本的包。

```shell
$ npm outdated
Package  Current  Wanted  Latest  Location
lodash    3.10.1  3.10.1  4.16.4  backend
```

然后，让`npm`安装最新版本的包。你可以使用`@latest`标签索取最新版本。

```shell
$ npm install lodash@latest
```

现在`npm`将安装`4.16.4`版本至`node_modules`目录下。同时，`package.json`也被更新。

```json
"dependencies": {
	"lodash": "^4.16.4"
}
```

<div class="callout">

原文：[Using npm update and npm outdated to update dependencies](https://bytearcher.com/articles/using-npm-update-and-npm-outdated-to-update-dependencies/) By [PANU PITKÄMÄKI](https://bytearcher.com/contact/)

</div>


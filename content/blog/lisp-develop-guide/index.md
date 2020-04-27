---
title: 'Lisp环境配置指南'
date: '2018-09-22'
---

## 安装 SBCL

我采用的Lisp环境为`SBCL + Quicklisp + Emacs + SLIME` 。首先让我们来安装[SBCL(Steel Bank Common Lisp)](http://www.sbcl.org/)，它是Common Lisp的一种实现，是一个高性能的Common Lisp编译器。

在OS X系统上，我们可以很方便的使用Homebrew来安装：

```shell
$ brew install sbcl
```

## 安装 Quicklisp

接下来安装[Quicklisp](https://www.quicklisp.org/beta/)，它是包管理器。安装过程也同样简单：

```shell
$ curl -o /tmp/ql.lisp http://beta.quicklisp.org/quicklisp.lisp
$ sbcl --no-sysinit --no-userinit --load /tmp/ql.lisp \
       --eval '(quicklisp-quickstart:install :path ".quicklisp")' \
       --quit
```

Quicklisp将安装至`~/.quicklisp/`目录下。

## 安装 Emacs 和 SLIME

首先确保你安装了 [Emacs](https://www.gnu.org/software/emacs/)，如果没有同样可以使用Homebrew快速安装（推荐安装最新版本）：

```shell
$ brew install emacs --with-cocoa
# or use MacPorts
# sudo port install emacs-app
```

[SLIME](https://common-lisp.net/project/slime/) 是基于Emacs构建的Common Lisp IDE。它的安装方式大概有两种：

* 从MELPA获取SLIME，通过Emacs内置的包管理器进行安装
* 直接从git仓库安装

这里我们采用第一种方式（*其他方式请参考：https://common-lisp.net/project/slime/doc/html/Installation.html）。

为了能够让 Emacs 从 [MELPA](https://github.com/melpa/melpa) 仓库获取安装包，我们需要添加一些配置到`~/.emacs`文件中（如果没有则创建一个）：

```commonlisp
(require 'package)
(let* ((no-ssl (and (memq system-type '(windows-nt ms-dos))
                    (not (gnutls-available-p))))
       (proto (if no-ssl "http" "https")))
  ;; Comment/uncomment these two lines to enable/disable MELPA and MELPA Stable as desired
  (add-to-list 'package-archives (cons "melpa" (concat proto "://melpa.org/packages/")) t)
  ;;(add-to-list 'package-archives (cons "melpa-stable" (concat proto "://stable.melpa.org/packages/")) t)
  (when (< emacs-major-version 24)
    ;; For important compatibility libraries like cl-lib
    (add-to-list 'package-archives '("gnu" . (concat proto "://elpa.gnu.org/packages/")))))
(package-initialize)
```

配置好MELPA之后，我们就可以开始安装 [SLIME](https://github.com/slime/slime) 了。使用如下指令：

```
M-x package-install RET slime RET
```

*注：对应到键盘就是 Alt + x  package-install 回车 （等待完成）slime 回车 （等待完成）。

安装完成后，再添加一些配置到`~/.emacs`文件中。

```commonlisp
;; Set your lisp system and, optionally, some contribs
(setq inferior-lisp-program "/usr/local/bin/sbcl")
(setq slime-contribs '(slime-fancy))
```

注意第二行的`/usr/local/bin/sbcl`，这里应该写你本机上 sbcl 二进制文件的路径，所以可能视个人情况不同修改。

## 启动 SLIME !!!

现在所有的环境就配置完成，打开Emacs，输入`M-x`，然后在底部的buffer区输入 `slime`，SLIME将会启动并连接至你的Lisp编译器。

让我们先来演示一个Hello World吧~输入下面的代码：

```commonlisp
(format t "Hello, world!")
```

你将会看到下图的效果。

<img width="591" alt="lisphelloworld" src="https://user-images.githubusercontent.com/30484000/45913959-ebb5af00-be6f-11e8-9ee3-cc2cce731bb6.png">

开始你的Lisp之路吧！

## Reference

> http://lisp-lang.org/learn/getting-started/
>
> https://github.com/slime/slime
>
> https://github.com/melpa/melpa
>
> https://common-lisp.net/project/slime/doc/html/Installation.html


（完）


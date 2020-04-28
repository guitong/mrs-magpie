---
title: Fetch API 简介
date: '2018-03-25'
description: Fetch 提供了关于请求和响应对象（以及与网络请求相关的其他事项）的通用定义。这将允许它们在未来任何需要的地方被使用，无论是 service workers, Cache API 和处理或修改请求和响应的其他类似的东西，还是任何可能要求您以编程方式生成你的响应的用例。
translation: true
category: JavaScript
---

Fetch API 提供了一个用于获取资源的接口（包括跨网络）。如果您使用过`XMLHttpRequest`的话将会对此比较熟悉，但是新的API提供了更强大和灵活的功能集。

## 概念与用法

Fetch提供了关于请求和响应对象（以及与网络请求相关的其他事项）的通用定义。这将允许它们在未来任何需要的地方被使用，无论是service workers, Cache API和处理或修改请求和响应的其他类似的东西，还是任何可能要求您以编程方式生成你的响应的用例。

它还提供了对相关概念（例如：CORS and the HTTP origin header semantics）的定义，以取代它们在其他地方的独立定义。

若要创建请求并获取资源，使用`GlobalFetch.fetch`方法。它在多个接口中实现，特别是`Window`和`WorkerGlobalScope`。这使得它可以在几乎任何可能要获取资源的上下文中使用。

`Fetch()`方法有一个必需参数，就是你想获取的资源的路径。它返回一个Promise对象以解析该请求的响应，无论它是成功还是失败。您也可以传入一个`init`选项对象作为可选的第二参数（see [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)）。

一旦检索到响应，就可以使用多种方法定义 body 内容和如何去处理它。（see [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body)）。

你可以使用`Request()`和`Response()`构造函数直接创建一个请求和响应，但是你不太可能直接这样做。相反，这些更可能被创建为其他API操作的结果（for example, [FetchEvent.respondWith](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) from service workers）。

*Note: 查看更多Fetch API的用法见 [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)，概念学习请查看 [Fetch basic concepts](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts)。*

## Fetch 接口

### GlobalFetch

包含`fetch()`方法，用于获取资源。

### Headers

表示响应/请求头，允许您查询它们并根据结果执行不同操作。

### Request

表示资源请求。

### Response

表示一个请求的响应。

### 实验性的 fetch controller/signal/observer interface

也被叫做“可取消fetch（cancellabel fetch）”，  下面的接口包含允许在生命周期中观察和控制fetch请求操作。

#### FetchController

表示一个控制器对象，该对象允许你控制一个或多个fetch请求。

#### FetchSignal

表示一个信号对象， 该对象允许你与一个fetch请求通信并通过`FetchController`控制它。

#### FetchObserver

表示一个观察者对象，该对象允许你检索有关fetch请求状态的信息。

#### ObserverCallback

Provides a callback function that runs when the fetch request it is assocated with runs. 它提供了一个`FetchObserver`对象，可以用于检索有关fetch请求状态的信息。

## Fetch mixin

### Body

提供与响应/请求体有关的方法，允许你声明其内容类型及处理方法。

## 规范

| 规范                                      | 状态              | Comment            |
| :-------------------------------------- | :-------------- | :----------------- |
| [Fetch](https://fetch.spec.whatwg.org/) | Living Standard | Initial definition |

## 浏览器兼容性

<img width="1175" alt="fetch-api" src="https://user-images.githubusercontent.com/30484000/36837080-4a0047fa-1d76-11e8-943c-1f83127ad12d.png">

[1] This API is implemented behind a preference.

[2] Prior to Firefox 52, `get()` only returned the first value in the specified header, with `getAll()` returning all values. From 52 onwards, `get()` now returns all values and `getAll()` has been removed.

[3] Hidden behind a preference in 55+ Nightly. In about:config, you need to create two new boolean prefs — `dom.fetchObserver.enabled` and `dom.fetchController.enabled` — and set the values of both to `true`.

## See also

- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [ServiceWorker API](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker_API)
- [HTTP access control (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
- [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Fetch polyfill](https://github.com/github/fetch)
- [Fetch basic concepts](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts)

<div class="callout">

原文：[MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

</div>
---
title: Angular 组件共享数据的四种方法
date: '2018-05-25'
translation: true
category: JavaScript
description: 在深入您的第一个 ng 项目前，需要理解一个重要的概念 — 数据共享。在这节课程里将提供四种用于 ng 组件之间共享数据的方法。
---

在深入您的第一个Anguar项目前，需要理解一个重要的概念 — 数据共享。在这节课程里，我将提供四种用于Angular组件之间共享数据的方法。

![parent-child-sibling-angular-components-1024x598](https://user-images.githubusercontent.com/30484000/40373721-193a9e7e-5e1a-11e8-8033-67563c98ebbc.png)

我们Angular app的*父-子-同胞*结构。

## 父组件至子组件：通过`Input()`共享数据

这可能是共享数据的方法中最常见和最直接的。它通过使用`Input()`装饰器（decorator）以使数据能够通过模版（template）传递。

\# parent.component.ts

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-parent',
    template: `
    	<app-child [childMessage]="parentMessage"></app-child>
    `,
    styleUrls: ['./parent.component.css']
})
export class ParentComponent {
    parentMessage = 'message from parent';
    constructor() {}
}
```



\# child.component.ts

```javascript
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-child',
    template: `
    	Say {{message}}
    `,
    StyleUrls: ['./child.component.css']
})
export class ChildComponent {
    @Input() childMessage: string;
    
    constructor() {}
}
```

## 子组件至父组件：通过`ViewChild()`共享数据

`ViewChild`允许一个组件注入到另外一个组件中，父组件可以访问子组件的属性和功能。但是需要注意⚠️，子组件在视图初始化之后才可用。这意味着我们需要实现`AfterViewInit`生命周期钩子以接收子组件的数据。

\# parent.component.ts

```javascript
import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-parent',
    template: `
    	Message: {{message}}
    	<app-child></app-child>
    `,
    styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {
    @ViewChild(ChildComponent) child;
    
    constructor() {}
    
    message: string;
    
    ngAfterViewInit() {
        this.message = this.child.message;
    }
}
```



\# child.component.ts

```javascript
import { Component } from '@angular/core';

@Component({
    
    message: string = 'Hola Mundo';
    
    constructor() {}
})
```

## 子组件至父组件： 通过`Output()`和`EventEmitter`共享数据

另外一个共享数据的方法是从子组件发出（emit）数据，which can be listed to by the parent.当您想要分享如按钮点击、表单事件和其他用户事件等发生的数据更改时，此方法非常理想。

在父组件中，我们创建一个方法去接收信息并将其设置与`message`变量相等。

在子组件中，我们使用`Output`修饰符声明一个`messageEvent`变量并将其设置为一个新的事件发生器（event emitter）。然后我们创建一个名为`sendMessage`的函数，该函数调用在此事件上的emit方法发送我们想要传递的信息。最后，我们创建一个按钮用来触发这个函数。

此时父组件可以订阅这个由子组件发出的`messageEvent`事件，然后在该事件发生时运行消息接收函数。

\# parent.component.ts

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'app-parent',
    tempate: `
    	Message: {{message}}
    	<app-child (messageEvent)="receiveMessage($event)"></app-child>
    `,
    styleUrls: ['./parent.component.css']
})
export class ParentComponent {
    constructor() {}
    
    message: string;
    
    receiveMessage($event) {
        this.message = $event;
    }
}
```

\# child.component.ts

```javascript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-child',
    template: `
    	<button (click)="sendMessage()"Send Message</button>
    `,
    styleUrls: ['./child.component.css']
})
export class ChildComponent {
    message: string = 'Hola Mundo';
    
    @Output() messageEvent = new EventEmitter<string>();
    
    constructor() {}
    
    sendMessage() {
        this.messageEvent.emit(this.message);
    }
}
```

## 不相关组件：通过Service共享数据

当需要在两个没有直接联系的组件（如同胞组件，孙辈组件等）间传递数据时，您应该提供一个共享服务。当您的数据需要时刻保持同步时，我发现 [RxJS BehaviorSubject](https://xgrommx.github.io/rx-book/content/subjects/behavior_subject/index.html) 在这种场景非常好用。

你也可以使用一般的RxJS Subject提供服务共享数据，但我更倾向于使用BehaviorSubject的原因是：

* 它将时刻返回订阅的当前值 - 所以没必要去调用`onnext`
* 它有一个`getValue()`方法用来提取最新值作为原始数据（raw data）
* 它能确保组件时刻接收最新的数据

在服务中，我们创建一个私有BehaviorSubject来保存消息的当前值。我们定义一个`currentMessage`变量来处理这个数据流，作为一个被组件使用的可观察对象。最后，我们在BehaviorSubject上创建一个函数调用next方法来改变它的值。

父组件、子组件和同胞组件都会有相同的接收。我们在constructor中注入DataService，然后订阅`currentMessage`可观察对象并将其值设置为与`message`变量相等。

现在，我们在这些组件中的任一组件中创建一个函数用来改变`message`的值，当这个函数执行时，新的数据会自动传播到其他所有的组件中。

\# data.service.ts

```javascript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
    
    private messageSource = new BehaviorSubject<string>('default message');
    currentMessage = this.messageSource.asObservable();
    
    constructor() {}
    
    changeMessage(message: string) {
        this.messageSource.next(message);
    }
}
```

\# parent.component.ts

```javascript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-parent',
    tempate: `
		{{message}}
	`,
	styleUrls: ['./siblings.component.css']
})
export class ParentComponent implements OnInit {
    message: string;
    
    constructor(private data: DataService) {}
    
    ngOnInit() {
        this.data.currentMessage.subscribe(message => this.message = message);
    }
}
```

\# sibling.component.ts

```javascript
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
    selector: 'app-sibling',
    template: `
    	{{message}}
    	<button (click)="newMessage()">New Message</button>
    `,
    styleUrls: ['./sibling.component.css']
})
export class SiblingComponent implements OnInit {
	message: string;
	
	constructor(private data: DataService) {}
	
	ngOnInit() {
        this.data.currentMessage.subscribe(message => this.message = message);
	}
	
	newMessage() {
        this.data.changeMessage('Hello from Sibling');
	}
}
```

<div class="callout">

原文： [Sharing Data Between Angular Components - Four Methods](https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/) by Jeff Delaney

</div>

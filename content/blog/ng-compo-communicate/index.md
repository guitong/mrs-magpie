---
title: "Angualr 组件之间如何通讯？"
date: "2018-04-30"
description: "@TODO: description"
---

场景一：通过输入型绑定把数据从父组件传到子组件

使用`@Input`装饰器。

例如：

```ts
// 一个子组件 hero-child.component.ts
import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
    selector: 'app-hero-child',
    template: `
    	<h3>{{hero.name}} says:</h3>
    	<p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
    `
})
export class HeroChildCompoent {
    @Input() hero: Hero;
    @Input('master') masterName: string; // 指定别名
}
```

再看下父组件（部分省略）：

```ts
import ...
@Component({
    ...
    template: `
    	<h2>{{master}} controls {{heroes.length}} heroes</h2>
    	<app-hero-child *ngFor="let hero of heroes"
    		[hero]="hero"
    		[master]="master"
    	</app-hero-child>
    `
})
```

效果如下：

![parent-to-child](https://user-images.githubusercontent.com/30484000/37081541-b5fc6aa8-2224-11e8-87bf-2170d6fadbd0.png)

---

场景二：通过setter截听输入属性值的变化

使用输入属性的setter，以拦截父组件中值的变化，并作出响应。

例如：

```ts
// 一个子组件，输入属性`name`的setter会trim掉名字中的空格，并把空格替换为默认字符串
import ...
@Component({
    selector: 'app-name-child',
    template: '<h3>"{{name}}"</h3>'
})
export class NameChildComponent {
    private _name = '';
    
    @Input()
    set name(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    
    get name(): string { return this._name; }
}
```

---

场景三：通过`ngOnChanges()`来截听输入属性值的变化

当需要监听多个、交互式输入属性的时候，此方法比setter更合适。

```ts
import ...
@Component({
    selector: 'app-version-child',
    template: `
        <h3>Version {{major}}.{{minor}}</h3>
    	<h4>Change log:</h4>
	    <ul>
			<li *ngFor="let change of changeLog">{{change}}</li>
	    </ul>
    `
})
export class VersionChildComponent implements OnChanges {
    @Input() major: number;
    @Input() minor: number;
    changeLog: string[] = [];
    
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        let log: string[] = [];
        for (let propName in changes) {
            let changedProp = changes[propName];
            let to = JSON.stirngify(changedProp.currentValue);
            if (changedProp.isFirstChange()) {
                log.push(`Initial value of ${propName} set to ${to}`);
            } else {
                let from = JSON.stringify(changedProp.previousValue);
                log.ush(`${propName}` change from ${from} to ${to});
            }
        }
        this.changeLog.push(log.join(', '));
    }
}
```

---

场景四：父组件监听子组件的事件

也就是子 -> 父传递数据。

需要子组件暴露一个`EventEmitter`属性，当事件发生时，子组件利用该属性`emits`（向上弹射）事件。父组件绑定这个事件属性，并在事件发生时作出响应。

NEW: 使用`@Output`装饰器。

```ts
import ...
@Component({
    selector: 'app-voter',
    template: `
    	<h4>{{name}}</h4>
    	<button (click)="vote(true)" [disabled]="voted">Agress</button>
		<button (click)="vote(false)" [disabled]="voted">Disagree</button>
    `
})
export class VoterComponent {
	@Input() name: string;
	@Output() onVoted = new EventEmitter<boolean>();
	
	voted = false;
	vote(agreed: boolean) {
        this.onVoted.emit(agreed);
        this.voted = true;
	}
}
```

父组件绑定一个事件处理器：

```ts
...
@Component({
    template: `
    	<app-voter
    		[name]="voter"
    		(onVoted)="onVoted($event)"
    	></app-voter>
    `
})
export class VotedTakerComponent {
    ...
    onVoted(agreed: boolean) {
        agreed ? this.agreed++ : this.disagreed++;
    }
}
```

---

场景五： 父子组件通过本地变量互动

父组件可以在模版里新建一个本地变量代表子组件，然后利用这个变量来读取子组件的属性和调用子组件的方法。

```ts
// parent
...
@Component({
    template: `
    	<h3>Countdown to Liftoff (via local variable)</h3>
    	<button (click)="timer.start()">Start</button>
    	<button (click)="timer.stop()">Stop</button>
    	<div> class="seconds">{{timer.seconds}}</div>
    	<app-countdown-timer #timer></app-countdown-timer>
    `
})
export class CountdownLocalVarParentComponent { }
```

本地变量 —> `#timer`

---

场景六： 父组件调用`@ViewChild()`

本地变量的方法有个局限性：父组件本身的代码对子组件没有访问权。

当父组件类需要访问子组件数据时，可以把子组件作为_ViewChild_，注入到父组件里面。

父组件：

```ts
import { CountdownTimerComponent } from '@angualr/core';

@Component({})
export class CountdownViewChildParentComponent implements AfterViewInit {
    @ViewChild(CountdownTimerComponent)
    private timerComponent: CountdownTimerComponent;
    
    seconds() { return 0; }
    
    ngAfterViewInit() {
        // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
        // but wait a tick first to avoid one-time devMode
        // unidirectional-data-flow-violation error
        setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
    }
    
    start() { this.timerComponent.start(); }
    stop() { this.timerComponent.stop(); }
}
```

_注意：Angular的单向数据流规则会阻止在同一个周期内更新父组件视图。_

---

场景七： 父子组件通过服务来通讯

...
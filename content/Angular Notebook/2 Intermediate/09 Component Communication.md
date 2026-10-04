---
title: 9. Component Communication
tags:
  - Angular
---

Property [[04 Decorators|decorators]] are used on a class property to define behaviour and enable communication between components.

Parent–child relationship: the child is nested in the parent by placing the child's selector in the parent's template (see [[03 Components|Components]]).

![[component-hierarchy.jpg]]

| From → to | How |
| --- | --- |
| Parent → child | `@Input` / `input()` |
| Child → parent | `@Output` + `EventEmitter` / `output()` |
| Parent reads child directly | `@ViewChild` (see [[20 ViewChild and Content Projection\|ViewChild]]) |
| Siblings / unrelated | shared service (with a Subject or signal) |
| Via the URL | route params (see [[12 Routing\|Routing]]) |

## `@Input` – parent → child

![[input-decorator.jpg]]

1. Create an `@Input()` variable in the child component that accepts incoming data
2. Import `Input` from Angular core
3. In the parent component, use the child selector and assign the data to that variable with property binding

```ts
// child.ts
export class Child {
  @Input() message = '';
  @Input({ required: true }) id!: number;      // must be passed
}
```

```html
<!-- child.html -->
<p>Message from Parent: {{ message }}</p>

<!-- parent.html  (parent.ts: parentMessage = 'Hello Child!') -->
<app-child [message]="parentMessage" [id]="1"></app-child>
```

React to input changes with `ngOnChanges` ([[11 Lifecycle Hooks|Lifecycle Hooks]]) or an input setter.

(Siblings/unrelated components: shared services. See [[10 Services and Dependency Injection|Services and Dependency Injection]].)

## `@Output` – child → parent

`@Output` is a property decorator used in the child component to emit events so the parent can listen and respond.

![[output-decorator.jpg]]

**`EventEmitter`** is a built-in Angular class used to emit these custom events.

- Step 1: import `EventEmitter`; in the child component: `notify = new EventEmitter();`
- Step 2: create a Send button with event binding `(click)="sendMessage()"`

```ts
sendMessage() {
  this.notify.emit("Hello parent");   // sending part
}
```

- Receiving part: in the parent component, on the child tag use that exact name `(notify)="handler($event)"`, assign it to a function, and in the TS file use the parameter to assign a local variable.

Full example:

```ts
// child.ts
export class ChildOutput {
  @Output() notify = new EventEmitter<string>();
  message = 'Hello Parent';
  send() { this.notify.emit(this.message); }
}

// parent.ts
export class ParentOutput {
  message = '';
  receive(data: string) { this.message = data; }
}
```

```html
<!-- child.html -->
<button (click)="send()">Send to Parent</button>

<!-- parent.html -->
<app-child (notify)="receive($event)"></app-child>
<p>Message from child: {{ message }}</p>
```

## Signal-based version (modern)

```ts
export class Child {
  message = input('');                 // read with message()
  id = input.required<number>();
  notify = output<string>();           // this.notify.emit('hi')
  value = model(0);                    // two-way: parent uses [(value)]
}
```

Details: [[22 Signals#Signal inputs, outputs and model|Signals]].

## Sibling communication with a shared service

```ts
@Injectable({ providedIn: 'root' })
export class MessageService {
  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();
  send(msg: string) { this.messageSource.next(msg); }
}
```

Component A calls `send()`, component B subscribes to `message$` (or use a `signal` in the service). See [[13 Observables and RxJS#Subjects|Subjects]].

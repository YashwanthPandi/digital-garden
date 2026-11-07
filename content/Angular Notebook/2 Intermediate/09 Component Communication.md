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
| Parent template uses child | template reference variable `#child` |
| Parent class reads child directly | `@ViewChild` (see [[20 ViewChild and Content Projection\|ViewChild]]) |
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

### Intercepting an input with a setter

A setter runs every time the parent passes a new value, so you can clean it up on the way in:

```ts
export class NameChild {
  private _name = '';
  @Input() set name(value: string) {
    this._name = value?.trim() || '<no name set>';
  }
  get name() { return this._name; }
}
```

```html
<!-- names = ['Mr. IQ', '   ', ' Bombasto '] → shows "Mr. IQ", "<no name set>", "Bombasto" -->
@for (n of names; track $index) { <app-name-child [name]="n" /> }
```

With signal inputs, use `computed()` instead: `clean = computed(() => this.name().trim() || '<no name set>')`. Or use the `transform` option: `input('', { transform: (v: string) => v.trim() })`.

### Inputs that arrive later (async data)

When the parent loads data over HTTP, the child first gets `undefined`, then the real value. Don't assume it's there:

- In the template: `@if (data) { … }` or `data?.name`.
- In the class: act in `ngOnChanges` only when the value exists, or use a signal input with `computed`.

```ts
@Input() data?: Report;
ngOnChanges() {
  if (this.data) this.buildChart(this.data);
}
```

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

### Example: button with a click limit

An input, an output and content projection together. The child disables itself after `clickLimit` clicks and tells the parent:

```ts
@Component({
  selector: 'app-limited-button',
  template: `<button (click)="onClick()" [disabled]="disabled"><ng-content /></button>`,
})
export class LimitedButton {
  @Input() clickLimit = 1;
  @Output() limitReached = new EventEmitter<number>();
  disabled = false;
  private count = 0;

  onClick() {
    if (++this.count === this.clickLimit) {
      this.disabled = true;
      this.limitReached.emit(this.count);
    }
  }
}
```

```html
<app-limited-button [clickLimit]="2" (limitReached)="onLimit($event)">
  You can only click me twice
</app-limited-button>
```

The text between the tags lands where `<ng-content />` is (see [[20 ViewChild and Content Projection|Content Projection]]).

## Parent calls the child through a template variable

A parent can't bind to a child's methods, but it can put a **template reference variable** on the child tag and use it anywhere in its own template:

```html
<button (click)="timer.start()">Start</button>
<button (click)="timer.stop()">Stop</button>
<p>{{ timer.seconds }} seconds left</p>
<app-countdown-timer #timer />
```

`#timer` refers to the child **component instance**, so you get all its public methods and properties. The limit: it only works inside the template. If the parent's **class** needs the child, use `@ViewChild(CountdownTimer)` / `viewChild(CountdownTimer)` instead, available from `ngAfterViewInit` (see [[20 ViewChild and Content Projection|ViewChild]]).

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

### Scoping the service to one family of components

`providedIn: 'root'` shares one instance with the whole app. To make a private channel between a parent and its children only, provide the service **on the parent component**:

```ts
@Injectable()                                   // no providedIn
export class MissionService {
  private announced = new Subject<string>();
  private confirmed = new Subject<string>();
  announced$ = this.announced.asObservable();
  confirmed$ = this.confirmed.asObservable();
  announce(mission: string) { this.announced.next(mission); }
  confirm(astronaut: string) { this.confirmed.next(astronaut); }
}

@Component({ selector: 'app-mission-control', providers: [MissionService], … })
export class MissionControl { /* injects it, calls announce(), listens to confirmed$ */ }

@Component({ selector: 'app-astronaut', … })
export class Astronaut { /* injects the SAME instance, listens to announced$, calls confirm() */ }
```

Messages now flow both ways, but only inside this `<app-mission-control>` subtree. Each `<app-mission-control>` on the page gets its own service instance (see [[10 Services and Dependency Injection#Where a service is provided (scope)|provider scope]]). Children must unsubscribe when destroyed (`takeUntilDestroyed()`).

> [!tip] `Subject` in services, `EventEmitter` in components
> `EventEmitter` is just a `Subject` subclass meant for `@Output`. Older code uses it in services too; it works, but a plain `Subject` (or a signal) is the intended tool there.

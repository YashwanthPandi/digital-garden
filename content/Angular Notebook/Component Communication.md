---
title: Component Communication
tags:
  - Angular
---

Property [[Decorators|decorators]] are used on a class property to define behaviour and enable communication between components.

## `@Input` – parent → child

1. Create an `@Input()` variable in the child component that accepts incoming data
2. Import `Input` from Angular core
3. In the parent component, use the child selector and assign the data to that variable with property binding

(Siblings/unrelated components: shared services. See [[Services and Dependency Injection]].)

## `@Output` – child → parent

`@Output` is a property decorator used in the child component to emit events so the parent can listen and respond.

- Step 1: import `EventEmitter`; in the child component: `notify = new EventEmitter();`
- Step 2: create a Send button with event binding `(click)="sendMessage()"`

```ts
sendMessage() {
  this.notify.emit("Hello parent");   // sending part
}
```

- Receiving part: in the parent component, on the child tag use that exact name `(notify)="handler($event)"`, assign it to a function, and in the TS file use the parameter to assign a local variable.

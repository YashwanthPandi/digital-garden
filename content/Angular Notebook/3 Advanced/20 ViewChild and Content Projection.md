---
title: 20. ViewChild and Content Projection
tags:
  - Angular
---

![[property-decorators.jpg]]

Two pairs of property decorators for getting references to elements:

| | One | Many (QueryList) | Searches | Ready in |
| --- | --- | --- | --- | --- |
| View | `@ViewChild` | `@ViewChildren` | the component's **own template** | `ngAfterViewInit` |
| Content | `@ContentChild` | `@ContentChildren` | content **projected from the parent** via `<ng-content>` | `ngAfterContentInit` |

## `@ViewChild`

Accesses an element, directive or child component from the component's own template, usually by a **template reference variable** (`#name`).

![[viewchild.jpg]]

```html
<input #nameInput type="text" />
<button (click)="focusInput()">Focus Input</button>
```

```ts
export class ViewChildEx {
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  focusInput() {
    this.nameInput.nativeElement.focus();
  }
}
```

- **`!` (definite assignment assertion):** tells TypeScript "this will be assigned later" so it doesn't complain the property isn't initialized.
- **`ElementRef`:** Angular wrapper holding a reference to a DOM element. **`nativeElement`** is the actual browser element.
- It's `undefined` in the constructor; access it in `ngAfterViewInit` or later (see [[11 Lifecycle Hooks|Lifecycle Hooks]]).
- `{ static: true }` makes it available in `ngOnInit` if the element is **not** inside `@if`/`@for`.
- You can query a child **component** by class to call its methods: `@ViewChild(TimerComponent) timer!: TimerComponent; this.timer.start();`

## `@ViewChildren` and `QueryList`

Gets **all** matching elements. They're stored in a **`QueryList`**, an iterable collection that updates when the DOM changes (`.changes` is an Observable).

![[viewchildren.jpg]]

```html
<input #nameInput placeholder="First name" />
<input #nameInput placeholder="Last name" />
<button (click)="clearAll()">Clear All</button>
```

```ts
@ViewChildren('nameInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

clearAll() {
  this.inputs.forEach((input) => (input.nativeElement.value = ''));
}
```

## Content projection and `<ng-content>`

Lets a parent pass **HTML content** into a child component. `<ng-content>` is the placeholder in the child's template where that content appears.

![[content-projection.jpg]]

```html
<!-- parent -->
<app-card>
  <h3>Interview Happy</h3>
  <p>Learn Angular</p>
</app-card>

<!-- card.html (child) -->
<div class="card">
  <h2>Child Component</h2>
  <ng-content></ng-content>
</div>
```

### Multi-slot projection

Use `select` to route content into named slots:

```html
<!-- card.html -->
<header><ng-content select="[card-title]"></ng-content></header>
<main><ng-content></ng-content></main>               <!-- everything else -->
<footer><ng-content select="app-card-footer"></ng-content></footer>

<!-- parent -->
<app-card>
  <h3 card-title>Title</h3>
  <p>Body text</p>
  <app-card-footer>Footer</app-card-footer>
</app-card>
```

## `@ContentChild` and `@ContentChildren`

Used **in the child** to access projected elements.

![[contentchild.jpg]]

```html
<!-- parent -->
<app-card>
  <h3 #title>Interview Happy</h3>
</app-card>
```

```ts
export class Card implements AfterContentInit {
  @ContentChild('title') title!: ElementRef<HTMLHeadingElement>;

  ngAfterContentInit() {
    console.log(this.title.nativeElement.textContent);   // Interview Happy
  }
}
```

`@ContentChildren` returns a `QueryList` of all matches:

![[contentchildren.jpg]]

```html
<app-courses>
  <p #course>Angular</p>
  <p #course>React</p>
  <p #course>JavaScript</p>
</app-courses>
```

```ts
@ContentChildren('course') courses!: QueryList<ElementRef<HTMLParagraphElement>>;
showCount() { this.courseCount = this.courses.length; }   // 3
```

## Signal-based queries (modern)

```ts
nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');      // Signal, read with nameInput()
inputs = viewChildren<ElementRef>('nameInput');
title = contentChild<ElementRef>('title');
courses = contentChildren<ElementRef>('course');
form = viewChild.required(NgForm);
```

No `!`, no lifecycle-hook timing worries: they're signals, so `computed`/`effect` re-run when the result changes.

## Dynamic components

Create components from code instead of the template:

```ts
private vcr = inject(ViewContainerRef);
open() {
  const ref = this.vcr.createComponent(AlertComponent);
  ref.setInput('message', 'Saved!');
}
```

Or declaratively: `<ng-container *ngComponentOutlet="currentWidget" />`.

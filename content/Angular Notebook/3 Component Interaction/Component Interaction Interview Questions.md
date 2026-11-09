---
title: Component Interaction Interview Questions
tags:
  - Angular
  - Interview
---

8 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What are lifecycle hooks available?

Angular application goes through an entire set of processes or has a lifecycle right from its initiation to the end of the application.
The representation of lifecycle in pictorial representation as follows,

![[aiq-lifecycle.png]]

The description of each lifecycle method is as below,
1. **ngOnChanges:** When the value of a data bound property changes, then this method is called.
2. **ngOnInit:** This is called whenever the initialization of the directive/component after Angular first displays the data-bound properties happens.
3. **ngDoCheck:** This is for the detection and to act on changes that Angular can't or won't detect on its own.
4. **ngAfterContentInit:** This is called in response after Angular projects external content into the component's view.
5. **ngAfterContentChecked:** This is called in response after Angular checks the content projected into the component.
6. **ngAfterViewInit:** This is called in response after Angular initializes the component's views and child views.
7. **ngAfterViewChecked:** This is called in response after Angular checks the component's views and child views.
8. **ngOnDestroy:** This is the cleanup phase just before Angular destroys the directive/component.

### 2. What is the difference between constructor and ngOnInit?

The **Constructor** is a default method of the class that is executed when the class is instantiated and ensures proper initialisation of fields in the class and its subclasses. Angular, or better Dependency Injector (DI), analyses the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them and passes them to the constructor.
**ngOnInit** is a life cycle hook called by Angular to indicate that Angular is done creating the component.
Mostly we use ngOnInit for all the initialization/declaration and avoid stuff to work in the constructor. The constructor should only be used to initialize class members but shouldn't do actual "work".
So you should use constructor() to setup Dependency Injection and not much else. ngOnInit() is better place to "start" - it's where/when components' bindings are resolved.

```typescript
export class App implements OnInit{
  constructor(private myService: MyService){
     //called first time before the ngOnInit()
  }

  ngOnInit(){
     //called after the constructor and called  after the first ngOnChanges()
     //e.g. http call...
  }
}
```

### 3. How do you select an element with in a component template?

You can use `@ViewChild` directive to access elements in the view directly. Let's take input element with a reference,

```html
<input #uname>
```
and define view child directive and access it in ngAfterViewInit lifecycle hook

```javascript
@ViewChild('uname') input;

ngAfterViewInit() {
  console.log(this.input.nativeElement.value);
}
```

### 4. How do you select an element in component template?

You can control any DOM element via ElementRef by injecting it into your component's constructor. i.e, The component should have constructor with ElementRef parameter,
```javascript
constructor(myElement: ElementRef) {
   el.nativeElement.style.backgroundColor = 'yellow';
}
```

### 5. Is it possible to do aliasing for inputs and outputs?

Yes, it is possible to do aliasing for inputs and outputs in two ways.
1. **Aliasing in metadata:** The inputs and outputs in the metadata aliased using a colon-delimited (:) string with the directive property name on the left and the public alias on the right. i.e. It will be in the format of propertyName:alias.
    ```javascript
    inputs: ['input1: buyItem'],
    outputs: ['outputEvent1: completedEvent']
    ```
2. **Aliasing with @Input()/@Output() decorator:** The alias can be specified for the property name by passing the alias name to the @Input()/@Output() decorator.i.e. It will be in the form of @Input(alias) or @Output(alias).
    ```javascript
    @Input('buyItem') input1: string;
    @Output('completedEvent') outputEvent1 = new EventEmitter<string>();
    ```

### 6. Is mandatory to pass static flag for ViewChild?

In Angular 8, the static flag is required for ViewChild. Whereas in Angular9, you no longer need to pass this property. Once you updated to Angular9 using `ng update`, the migration will remove { static: false } script everywhere.
```javascript
@ViewChild(ChildDirective) child: ChildDirective; // Angular9 usage
@ViewChild(ChildDirective, { static: false }) child: ChildDirective; //Angular8 usage
```

### 7. What is content projection?

Content projection is a pattern in which you insert, or project, the content you want to use inside another component.

### 8. What is ng-content and its purpose?

The ng-content is used to insert the content dynamically inside the component that helps to increase component reusability.

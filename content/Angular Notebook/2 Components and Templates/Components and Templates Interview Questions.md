---
title: Components and Templates Interview Questions
tags:
  - Angular
  - Interview
---

42 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What are directives?

Directives add behaviour to an existing DOM element or an existing component instance.
```typescript
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
```

Now this directive extends HTML element behavior with a yellow background as below
```html
<p myHighlight>Highlight me!</p>
```

### 2. What are components?

Components are the most basic UI building block of an Angular app, which form a tree of Angular components. These components are a subset of directives. Unlike directives, components always have a template, and only one component can be instantiated per element in a template.
Let's see a simple example of Angular component
```typescript
import { Component } from '@angular/core';

@Component ({
   selector: 'my-app',
   template: ` <div>
      <h1>{{title}}</h1>
      <div>Learn Angular6 with examples</div>
   </div> `,
})

export class AppComponent {
   title: string = 'Welcome to Angular world';
}
```

### 3. What are the differences between Component and Directive?

In a short note, A component(@component) is a directive-with-a-template.

Some of the major differences are mentioned in a tabular form

| Component | Directive |
|---- | ---------
| To register a component we use @Component meta-data annotation  | To register a directive we use @Directive meta-data annotation |
| Components are typically used to create UI widgets| Directives are used to add behavior to an existing DOM element |
| Component is used to break down the application into smaller components| Directive is used to design re-usable components|
| Only one component can be present per DOM element | Many directives can be used per DOM element |
| @View decorator or templateurl/template are mandatory | Directive doesn't use View|

### 4. What is a template?

A template is a HTML view where you can display data by binding controls to properties of an Angular component. You can store your component's template in one of two places. You can define it inline using the template property, or you can define the template in a separate HTML file and link to it in the component metadata using the @Component decorator's templateUrl property.

**Using inline template with template syntax,**
```typescript
import { Component } from '@angular/core';

@Component ({
   selector: 'my-app',
   template: '
      <div>
         <h1>{{title}}</h1>
         <div>Learn Angular</div>
      </div>
   '
})

export class AppComponent {
   title: string = 'Hello World';
}
```
**Using separate template file such as app.component.html**
```typescript
import { Component } from '@angular/core';

@Component ({
   selector: 'my-app',
   templateUrl: 'app/app.component.html'
})

export class AppComponent {
   title: string = 'Hello World';
}
```

### 5. What is a data binding?

Data binding is a core concept in Angular and allows to define communication between a component and the DOM, making it very easy to define interactive applications without worrying about pushing and pulling data. There are four forms of data binding(divided as 3 categories) which differ in the way the data is flowing.
1. **From the Component to the DOM:**

    **Interpolation:** {{ value }}: Adds the value of a property from the component
    ```html
    <li>Name: {{ user.name }}</li>
    <li>Address: {{ user.address }}</li>
    ```
    **Property binding:** [property]=”value”: The value is passed from the component to the specified property or simple HTML attribute
    ```html
    <input type="email" [value]="user.email">
    ```
2. **From the DOM to the Component:**
    **Event binding: (event)=”function”:** When a specific DOM event happens (eg.: click, change, keyup), call the specified method in the component
    ```html
    <button (click)="logout()"></button>
    ```
3. **Two-way binding:**
    **Two-way data binding:** [(ngModel)]=”value”: Two-way data binding allows to have the data flow both ways. For example, in the below code snippet, both the email DOM input and component email property are in sync
    ```html
    <input type="email" [(ngModel)]="user.email">
    ```

### 6. What is the purpose of async pipe?

The AsyncPipe subscribes to an observable or promise and returns the latest value it has emitted. When a new value is emitted, the pipe marks the component to be checked for changes.

Let's take a time observable which continuously updates the view for every 2 seconds with the current time.
```typescript
@Component({
  selector: 'async-observable-pipe',
  template: `<div><code>observable|async</code>:
       Time: {{ time | async }}</div>`
})
export class AsyncObservablePipeComponent {
  time: Observable<string>;
  constructor() {
    this.time = new Observable((observer) => {
      setInterval(() => {
        observer.next(new Date().toString());
      }, 2000);
    });
  }
}
```

### 7. What is the option to choose between inline and external template file?

You can store your component's template in one of two places. You can define it inline using the **template** property, or you can define the template in a separate HTML file and link to it in the component metadata using the **@Component** decorator's **templateUrl** property.

The choice between inline and separate HTML is a matter of taste, circumstances, and organization policy. But normally we use inline template for small portion of code and external template file for bigger views. By default, the Angular CLI generates components with a template file. But you can override that with the below command,
```
ng generate component hero -it
```

### 8. What is the purpose of `*ngFor` directive?

We use Angular `*ngFor` directive in the template to display each item in the list. For example, here we can iterate over a list of users:
```html
<li *ngFor="let user of users">
  {{ user }}
</li>
```
The user variable in the `*ngFor` double-quoted instruction is a **template input variable**.

### 9. What is the purpose of `*ngIf` directive?

Sometimes an app needs to display a view or a portion of a view only under specific circumstances. The Angular `*ngIf` directive inserts or removes an element based on a truthy/falsy condition. Let's take an example to display a message if the user age is more than 18:
```html
<p *ngIf="user.age > 18">You are not eligible for student pass!</p>
```
**Note:** Angular isn't showing and hiding the message. It is adding and removing the paragraph element from the DOM. That improves performance, especially in the larger projects with many data bindings.

### 10. What happens if you use script tag inside template?

Angular recognizes the value as unsafe and automatically sanitizes it, which removes the `script` tag but keeps safe content such as the text content of the `script` tag. This way it eliminates the risk of script injection attacks. If you still use it then it will be ignored and a warning appears in the browser console.

Let's take an example of innerHtml property binding which causes XSS vulnerability,
```typescript
export class InnerHtmlBindingComponent {
  // For example, a user/attacker-controlled value from a URL.
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}
```

### 11. What is interpolation?

Interpolation is a special syntax that Angular converts into property binding. It’s a convenient alternative to property binding. It is represented by double curly braces({{}}). The text between the braces is often the name of a component property. Angular replaces that name with the string value of the corresponding component property.

Let's take an example,
```html
<h3>
  {{title}}
  <img src="{{url}}" style="height:30px">
</h3>
```
In the example above, Angular evaluates the title and url properties and fills in the blanks, first displaying a bold application title and then a URL.

### 12. What are template expressions?

A template expression produces a value similar to any Javascript expression. Angular executes the expression and assigns it to a property of a binding target; the target might be an HTML element, a component, or a directive. In the property binding, a template expression appears in quotes to the right of the = symbol as in `[property]="expression"`.
In interpolation syntax, the template expression is surrounded by double curly braces. For example, in the below interpolation, the template expression is `{{username}}`,

```html
<h3>{{username}}, welcome to Angular</h3>
```

The below javascript expressions are prohibited in template expression
1. assignments (=, +=, -=, ...)
2. new
3. chaining expressions with ; or ,
4. increment and decrement operators (++ and --)
----------------------------------

### 13. What are template statements?

A template statement responds to an event raised by a binding target such as an element, component, or directive. The template statements appear in quotes to the right of the = symbol like `(event)="statement"`.

Let's take an example of button click event's statement

```html
<button (click)="editProfile()">Edit Profile</button>
```
In the above expression, editProfile is a template statement. The below JavaScript syntax expressions are not allowed.
1. new
2. increment and decrement operators, ++ and --
3. operator assignment, such as += and -=
4. the bitwise operators | and &
5. the template expression operators
--------------------------------------

### 14. How do you categorize data binding types?

Binding types can be grouped into three categories distinguished by the direction of data flow. They are listed as below,
1. From the source-to-view
2. From view-to-source
3. View-to-source-to-view

The possible binding syntax can be tabularized as below,

 | Data direction | Syntax | Type |
 |---- | --------- | ---- |
 | From the source-to-view(One-way)  | 1. {{expression}} 2. [target]="expression" 3. bind-target="expression" | Interpolation, Property, Attribute, Class, Style|
 | From view-to-source(One-way) | 1. (target)="statement" 2. on-target="statement" | Event |
 | View-to-source-to-view(Two-way)| 1. [(target)]="expression" 2. bindon-target="expression"| Two-way |

### 15. What are pipes?

Pipes are simple functions that use [template expressions](#what-are-template-expressions) to accept data as input and transform it into a desired output. For example, let us take a pipe to transform a component's birthday property into a human-friendly date using **date** pipe.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-birthday',
  template: `<p>Birthday is {{ birthday | date }}</p>`
})
export class BirthdayComponent {
  birthday = new Date(1987, 6, 18); // June 18, 1987
}
```

### 16. What is a parameterized pipe?

A pipe can accept any number of optional parameters to fine-tune its output. The parameterized pipe can be created by declaring the pipe name with a colon ( : ) and then the parameter value. If the pipe accepts multiple parameters, separate the values with colons. Let's take a birthday example with a particular format(dd/MM/yyyy):

```javascript
import { Component } from '@angular/core';

    @Component({
      selector: 'app-birthday',
      template: `<p>Birthday is {{ birthday | date:'dd/MM/yyyy'}}</p>` // 18/06/1987
    })
    export class BirthdayComponent {
      birthday = new Date(1987, 6, 18);
    }
```
**Note:** The parameter value can be any valid template expression, such as a string literal or a component property.

### 17. How do you chain pipes?

You can chain pipes together in potentially useful combinations as per the needs. Let's take a birthday property which uses date pipe(along with parameter) and uppercase pipes as below

```javascript
import { Component } from '@angular/core';

        @Component({
          selector: 'app-birthday',
          template: `<p>Birthday is {{  birthday | date:'fullDate' | uppercase}} </p>` // THURSDAY, JUNE 18, 1987
        })
        export class BirthdayComponent {
          birthday = new Date(1987, 6, 18);
        }

```

### 18. What is a custom pipe?

Apart from built-in pipes, you can write your own custom pipe with the below key characteristics:
1. A pipe is a class decorated with pipe metadata `@Pipe` decorator, which you import from the core Angular library
   For example,
    ```javascript
        @Pipe({name: 'myCustomPipe'})
    ```
2. The pipe class implements the **PipeTransform** interface's transform method that accepts an input value followed by optional parameters and returns the transformed value.
   The structure of `PipeTransform` would be as below,
    ```javascript
    interface PipeTransform {
      transform(value: any, ...args: any[]): any
    }
    ```
3. The `@Pipe` decorator allows you to define the pipe name that you'll use within template expressions. It must be a valid JavaScript identifier.
    ```javascript
    template: `{{someInputValue | myCustomPipe: someOtherValue}}`
    ```

### 19. Give an example of custom pipe?

You can create custom reusable pipes for the transformation of existing value. For example, let us create a custom pipe for finding file size based on an extension,
  ```javascript
    import { Pipe, PipeTransform } from '@angular/core';

    @Pipe({name: 'customFileSizePipe'})
    export class FileSizePipe implements PipeTransform {
      transform(size: number, extension: string = 'MB'): string {
        return (size / (1024 * 1024)).toFixed(2) + extension;
      }
    }
  ```
Now you can use the above pipe in template expression as below,
  ```javascript
     template: `
        <h2>Find the size of a file</h2>
        <p>Size: {{288966 | customFileSizePipe: 'GB'}}</p>
      `
  ```

### 20. What is the difference between pure and impure pipe?

A pure pipe is only called when Angular detects a change in the value or the parameters passed to a pipe. For example, any changes to a primitive input value (String, Number, Boolean, Symbol) or a changed object reference (Date, Array, Function, Object). An impure pipe is called for every change detection cycle no matter whether the value or parameters changes. i.e, An impure pipe is called often, as often as every keystroke or mouse-move.

### 21. What are dynamic components?

Dynamic components are the components in which the component's location in the application is not defined at build time i.e. they are not used in any angular template. Instead, the component is instantiated and placed in the application at runtime.

### 22. What are the various kinds of directives?

There are mainly three kinds of directives:
1. **Components** — These are directives with a template.
2. **Structural directives** — These directives change the DOM layout by adding and removing DOM elements.
3. **Attribute directives** — These directives change the appearance or behavior of an element, component, or another directive.

### 23. How do you create directives using CLI?

You can use CLI command `ng generate directive` to create the directive class file. It creates the source file(`src/app/components/directivename.directive.ts`), the respective test file `.spec.ts` and declare the directive class file in root module.

### 24. Give an example for attribute directives?

Let's take simple highlighter behavior as a example directive for DOM element. You can create and apply the attribute directive using below step:

1. Create HighlightDirective class with the file name `src/app/highlight.directive.ts`. In this file, we need to import **Directive** from core library to apply the metadata and **ElementRef** in the directive's constructor to inject a reference to the host DOM element ,
    ```javascript
    import { Directive, ElementRef } from '@angular/core';

    @Directive({
      selector: '[appHighlight]'
    })
    export class HighlightDirective {
        constructor(el: ElementRef) {
           el.nativeElement.style.backgroundColor = 'red';
        }
    }
    ```
2. Apply the attribute directive as an attribute to the host element(for example, <p>)
    ```javascript
    <p appHighlight>Highlight me!</p>
    ```
3. Run the application to see the highlight behavior on paragraph element
    ```javascript
    ng serve
    ```

### 25. How do you enable binding expression validation?

You can enable binding expression validation explicitly by adding the compiler option **fullTemplateTypeCheck** in the "angularCompilerOptions" of the project's tsconfig.json. It produces error messages when a type error is detected in a template binding expression.

For example, consider the following component:
```javascript
@Component({
  selector: 'my-component',
  template: '{{user.contacts.email}}'
})
class MyComponent {
  user?: User;
}
```
This will produce the following error:
```javascript
my.component.ts.MyComponent.html(1,1): : Property 'contacts' does not exist on type 'User'. Did you mean 'contact'?
```

### 26. What is the purpose of any type cast function?

You can disable binding expression type checking using $any() type cast function(by surrounding the expression). In the following example, the error Property contacts does not exist is suppressed by casting user to the any type.
```javascript
  template:
  '{{ $any(user).contacts.email }}'
```
The $any() cast function also works with this to allow access to undeclared members of the component.
```javascript
   template:
   '{{ $any(this).contacts.email }}'
```

### 27. What is Non null type assertion operator?

You can use the non-null type assertion operator to suppress the Object is possibly 'undefined' error. In the following example, the user and contact properties are always set together, implying that contact is always non-null if user is non-null. The error is suppressed in the example by using contact!.email.
```javascript
@Component({
  selector: 'my-component',
  template: '<span *ngIf="user"> {{user.name}} contacted through {{contact!.email}} </span>'
})
class MyComponent {
  user?: User;
  contact?: Contact;

  setData(user: User, contact: Contact) {
    this.user = user;
    this.contact = contact;
  }
}
```

### 28. What is type narrowing?

The expression used in an ngIf directive is used to narrow type unions in the Angular template compiler similar to if expression in typescript. So *ngIf allows the typeScript compiler to infer that the data used in the binding expression will never be undefined.
```javascript
@Component({
  selector: 'my-component',
  template: '<span *ngIf="user"> {{user.contact.email}} </span>'
})
class MyComponent {
  user?: User;
}
```

### 29. What are the class decorators in Angular?

A class decorator is a decorator that appears immediately before a class definition, which declares the class to be of the given type, and provides metadata suitable to the type

The following list of decorators comes under class decorators,

1. @Component()
2. @Directive()
3. @Pipe()
4. @Injectable()
5. @NgModule()

### 30. What are class field decorators?

The class field decorators are the statements declared immediately before a field in a class definition that defines the type of that field. Some of the examples are: @input and @output,

```javascript
@Input() myProperty;
@Output() myEvent = new EventEmitter();
```

### 31. What is the purpose of hidden property?

The hidden property is used  to show or hide the associated DOM element, based on an expression. It can be compared close to `ng-show` directive in AngularJS. Let's say you want to show user name based on the availability of user using `hidden` property.
```javascript
<div [hidden]="!user.name">
  My name is: {{user.name}}
</div>
```

---

### 32. What is the difference between ngIf and hidden property?

The main difference is that *ngIf will remove the element from the DOM, while [hidden] actually plays with the CSS style by setting `display:none`. Generally it is expensive to add and remove stuff from the DOM for frequent actions.

### 33. What is slice pipe?

The slice pipe is used to create a new Array or String containing a subset (slice) of the elements. The syntax looks like as below,
```javascript
{{ value_expression | slice : start [ : end ] }}
```
For example, you can provide 'hello' list based on a greeting array,
```javascript
@Component({
  selector: 'list-pipe',
  template: `<ul>
    <li *ngFor="let i of greeting | slice:0:5">{{i}}</li>
  </ul>`
})
export class PipeListComponent {
  greeting: string[] = ['h', 'e', 'l', 'l', 'o', 'm','o', 'r', 'n', 'i', 'n', 'g'];
}
```

### 34. What is index property in ngFor directive?

The index property of the NgFor directive is used to return the zero-based index of the item in each iteration. You can capture the index in a template input variable and use it in the template.

For example, you can capture the index in a variable named indexVar and displays it with the todo's name using ngFor directive as below.
```javascript
<div *ngFor="let todo of todos; let i=index">{{i + 1}} - {{todo.name}}</div>
```

### 35. What is the purpose of ngFor trackBy?

The main purpose of using *ngFor with trackBy option is performance optimization. Normally if you use NgFor with large data sets, a small change to one item by removing or adding an item, can trigger a cascade of DOM manipulations. In this case, Angular sees only a fresh list of new object references and to replace the old DOM elements with all new DOM elements. You can help Angular to track which items added or removed by providing a `trackBy` function which takes the index and the current item as arguments and needs to return the unique identifier for this item.

For example, lets set trackBy to the trackByTodos() method
```javascript
<div *ngFor="let todo of todos; trackBy: trackByTodos">
  ({{todo.id}}) {{todo.name}}
</div>
```
and define the trackByTodos method,
```javascript
trackByTodos(index: number, item: Todo): number { return todo.id; }
```

### 36. What is the purpose of ngSwitch directive?

**NgSwitch** directive is similar to JavaScript switch statement which displays one element from among several possible elements, based on a switch condition. In this case only the selected element placed into the DOM. It has been used along with `NgSwitch`, `NgSwitchCase` and `NgSwitchDefault` directives.

For example, let's display the browser details based on selected browser using ngSwitch directive.
```javascript
<div [ngSwitch]="currentBrowser.name">
  <chrome-browser    *ngSwitchCase="'chrome'"    [item]="currentBrowser"></chrome-browser>
  <firefox-browser   *ngSwitchCase="'firefox'"     [item]="currentBrowser"></firefox-browser>
  <opera-browser     *ngSwitchCase="'opera'"  [item]="currentBrowser"></opera-browser>
  <safari-browser     *ngSwitchCase="'safari'"   [item]="currentBrowser"></safari-browser>
  <ie-browser  *ngSwitchDefault           [item]="currentItem"></ie-browser>
</div>
```

### 37. What is safe navigation operator?

The safe navigation operator(?)(or known as Elvis Operator) is used to guard against `null` and `undefined` values in property paths when you are not aware whether a path exists or not. i.e. It returns value of the object path if it exists, else it returns the null value.

For example, you can access nested properties of a user profile easily without null reference errors as below,
```javascript
<p>The user firstName is: {{user?.fullName.firstName}}</p>
```
Using this safe navigation operator, Angular framework stops evaluating the expression when it hits the first null value and renders the view without any errors.

### 38. What are the list of template expression operators?

The Angular template expression language supports three special template expression operators.
1. Pipe operator
2. Safe navigation operator
3. Non-null assertion operator

### 39. What is the precedence between pipe and ternary operators?

The pipe operator has a higher precedence than the ternary operator (?:). For example, the expression `first ? second : third | fourth` is parsed as `first ? second : (third | fourth)`.

### 40. How do you create displayBlock components?

By default, Angular CLI creates components in an inline displayed mode(i.e, display:inline). But it is possible to create components with display: block style using `displayBlock` option,
```js
ng generate component my-component --displayBlock
```
(OR) the option can be turned on by default in Angular.json with `schematics.@schematics/angular:component.displayBlock` key value as true.

### 41. How to set ngFor and ngIf on the same element?

Sometimes you may need to both ngFor and ngIf on the same element but unfortunately you are going to encounter below template error.
```cmd
 Template parse errors: Can't have multiple template bindings on one element.
```
 In this case, You need to use either ng-container or ng-template.
 Let's say if you try to loop over the items only when the items are available, the below code throws an error in the browser
 ```html
 <ul *ngIf="items" *ngFor="let item of items">
   <li></li>
 </ul>
 ```
 and it can be fixed by
 ```html
 <ng-container *ngIf="items">
   <ul *ngFor="let item of items">
     <li></li>
   </ul>
 </ng-container>
 ```

### 42. What is host property in css?

The `:host` pseudo-class selector is used to target styles in the element that hosts the component. Since the host element is in a parent component's template, you can't reach the host element from inside the component by other means.
For example, you can create a border for parent element as below,
```js
//Other styles for app.component.css
//...
:host {
  display: block;
  border: 1px solid black;
  padding: 20px;
}
```

---
title: Interview Questions 51–100
tags:
  - Angular
  - Interview
---

Part of [[Angular Notebook/4 Interview Questions/index|Angular interview questions]]. Source: [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

Previous: [[Interview Questions 001-050|Questions 1–50]] · Next: [[Interview Questions 101-150|Questions 101–150]]

### 51. What are Angular elements?

Angular elements are Angular components packaged as **custom elements** (a web standard for defining new HTML elements in a framework-agnostic way). Angular Elements host an Angular component, providing a bridge between the data and the logic defined in the component and the standard DOM APIs, thus, providing a way to use Angular components in `non-Angular environments`.

### 52. What is the browser support of Angular Elements?

Since Angular elements are packaged as custom elements the browser support of angular elements is same as custom elements support.

This feature is is currently supported natively in a number of browsers and pending for other browsers.

| Browser | Angular Element Support |
|---- | --------- |
| Chrome | Natively supported|
| Opera | Natively supported |
| Safari| Natively supported |
| Firefox | Natively supported from 63 version onwards. You need to enable dom.webcomponents.enabled and dom.webcomponents.customelements.enabled in older browsers |
| Edge| Currently it is in progress|

### 53. What are custom elements?

Custom elements (or Web Components) are a Web Platform feature which extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. The browser maintains a `CustomElementRegistry` of defined custom elements, which maps an instantiable JavaScript class to an HTML tag. Currently this feature is supported by Chrome, Firefox, Opera, and Safari, and available in other browsers through polyfills.

### 54. Do I need to bootstrap custom elements?

No, custom elements bootstrap (or start) automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM. Once a custom element is added to the DOM for any page, it looks and behaves like any other HTML element, and does not require any special knowledge of Angular.

### 55. Explain how custom elements works internally?

Below are the steps in an order about custom elements functionality,
1. **App registers custom element with browser:** Use the `createCustomElement()` function to convert a component into a class that can be registered with the browser as a custom element.
2. **App adds custom element to DOM:**  Add custom element just like a built-in HTML element directly into the DOM.
3. **Browser instantiate component based class:** Browser creates an instance of the registered class and adds it to the DOM.
4. **Instance provides content with data binding and change detection:** The content with in template is rendered using the component and DOM data.
The flow chart of the custom elements functionality would be as follows,

![[aiq-customElement.png]]

### 56. How to transfer components to custom elements?

Transforming components to custom elements involves **two** major steps,
1. **Build custom element class:** Angular provides the `createCustomElement()` function for converting an Angular component (along with its dependencies) to a custom element. The conversion process implements `NgElementConstructor` interface, and creates a constructor class which is used to produce a self-bootstrapping instance of Angular component.
2. **Register element class with browser:** It uses `customElements.define()` JS function, to register the configured constructor and its associated custom-element tag with the browser's `CustomElementRegistry`. When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.

The detailed structure would be as follows,
![[aiq-createElement.png]]

### 57. What are the mapping rules between Angular component and custom element?

The Component properties and logic maps directly into HTML attributes and the browser's event system. Let us describe them in two steps,
1. The createCustomElement() API parses the component input properties with corresponding attributes for the custom element. For example, component @Input('myInputProp') converted as custom element attribute `my-input-prop`.
2. The Component outputs are dispatched as HTML Custom Events, with the name of the custom event matching the output name. For example, component @Output() valueChanged = new EventEmitter() converted as custom element with dispatch event as "valueChanged".

### 58. How do you define typings for custom elements?

You can use the `NgElement` and `WithProperties` types exported from @angular/elements.

Let's see how it can be applied by comparing with Angular component.
1. The simple container with input property would be as below,
    ```javascript
    @Component(...)
    class MyContainer {
      @Input() message: string;
    }
    ```
2. After applying types typescript validates input value and their types,
    ```javascirpt
    const container = document.createElement('my-container') as NgElement & WithProperties<{message: string}>;
    container.message = 'Welcome to Angular elements!';
    container.message = true;  // <-- ERROR: TypeScript knows this should be a string.
    container.greet = 'News';  // <-- ERROR: TypeScript knows there is no `greet` property on `container`.
    ```

### 59. What are dynamic components?

Dynamic components are the components in which the component's location in the application is not defined at build time i.e. they are not used in any angular template. Instead, the component is instantiated and placed in the application at runtime.

### 60. What are the various kinds of directives?

There are mainly three kinds of directives:
1. **Components** — These are directives with a template.
2. **Structural directives** — These directives change the DOM layout by adding and removing DOM elements.
3. **Attribute directives** — These directives change the appearance or behavior of an element, component, or another directive.

### 61. How do you create directives using CLI?

You can use CLI command `ng generate directive` to create the directive class file. It creates the source file(`src/app/components/directivename.directive.ts`), the respective test file `.spec.ts` and declare the directive class file in root module.

### 62. Give an example for attribute directives?

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

### 63. What is Angular Router?

Angular Router is a mechanism in which navigation happens from one view to the next as users perform application tasks. It borrows the concepts or model of browser's application navigation. It enables developers to build Single Page Applications with multiple views and allow navigation between these views.

### 64. What is the purpose of base href tag?

The routing application should add <base> element to the index.html as the first child in the <head> tag in order to indicate how to compose navigation URLs. If app folder is the application root then you can set the href value as below

```html
<base href="/">
```

### 65. What are the router imports?

The Angular Router which represents a particular component view for a given URL is not part of Angular Core. It is available in library named `@angular/router` to import required router components. For example, we import them in app module as below,

```javascript
import { RouterModule, Routes } from '@angular/router';
```

### 66. What is router outlet?

The RouterOutlet is a directive from the router library and it  acts as a placeholder that marks the spot in the template where the router should display the components for that outlet. Router outlet is used like a component,

```html
<router-outlet></router-outlet>
<!-- Routed components go here -->
```

### 67. What are router links?

The RouterLink is a directive on the anchor tags give the router control over those elements. Since the navigation paths are fixed, you can assign string values to router-link directive as below,

```html
<h1>Angular Router</h1>
<nav>
  <a routerLink="/todosList" >List of todos</a>
  <a routerLink="/completed" >Completed todos</a>
</nav>
<router-outlet></router-outlet>
```

### 68. What are active router links?

RouterLinkActive is a directive that toggles css classes for active RouterLink bindings based on the current RouterState. i.e, The Router will add CSS classes when this link is active and remove when the link is inactive. For example, you can add them to RouterLinks as below.

```html
<h1>Angular Router</h1>
<nav>
  <a routerLink="/todosList" routerLinkActive="active">List of todos</a>
  <a routerLink="/completed" routerLinkActive="active">Completed todos</a>
</nav>
<router-outlet></router-outlet>
```

### 69. What is router state?

RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL segments, the extracted parameters, and the resolved data. You can access the current RouterState from anywhere in the application using the `Router service` and the `routerState` property.

```javascript
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    //...
  }
}
```

### 70. What are router events?

During each navigation, the Router emits navigation events through the Router.events property allowing you to track the lifecycle of the route.

The sequence of router events is as below,

1. NavigationStart,
2. RouteConfigLoadStart,
3. RouteConfigLoadEnd,
4. RoutesRecognized,
5. GuardsCheckStart,
6. ChildActivationStart,
7. ActivationStart,
8. GuardsCheckEnd,
9. ResolveStart,
10. ResolveEnd,
11. ActivationEnd
12. ChildActivationEnd
13. NavigationEnd,
14. NavigationCancel,
15. NavigationError
16. Scroll

### 71. What is activated route?

ActivatedRoute contains the information about a route associated with a component loaded in an outlet. It can also be used to traverse the router state tree. The ActivatedRoute will be injected as a router service to access the information. In the below example, you can access route path and parameters,

```javascript
@Component({...})
class MyComponent {
  constructor(route: ActivatedRoute) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    const url: Observable<string> = route.url.pipe(map(segments => segments.join('')));
    // route.data includes both `data` and `resolve`
    const user = route.data.pipe(map(d => d.user));
  }
}
```

### 72. How do you define routes?

 A router must be configured with a list of route definitions. You configures the router with routes via the `RouterModule.forRoot()` method, and adds the result to the AppModule's `imports` array.

```javascript
 const appRoutes: Routes = [
  { path: 'todo/:id',      component: TodoDetailComponent },
  {
    path: 'todos',
    component: TodosListComponent,
    data: { title: 'Todos List' }
  },
  { path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
    // other imports here
  ],
  ...
})
export class AppModule { }
```

### 73. What is the purpose of Wildcard route?

If the URL doesn't match any predefined routes then it causes the router to throw an error and crash the app. In this case, you can use wildcard route. A wildcard route has a path consisting of two asterisks to match every URL.

For example, you can define PageNotFoundComponent for wildcard route as below
```javascript
{ path: '**', component: PageNotFoundComponent }
```

### 74. Do I need a Routing Module always?

No, the Routing Module is a design choice. You can skip routing Module (for example, AppRoutingModule) when the configuration is simple and merge the routing configuration directly into the companion module (for example, AppModule). But it is recommended when the configuration is complex and includes specialized guard and resolver services.

### 75. What is Angular Universal?

Angular Universal is a server-side rendering module for Angular applications in various scenarios. This is a community driven project and available under @angular/platform-server package. Recently Angular Universal is integrated with Angular CLI.

### 76. What are different types of compilation in Angular?

Angular offers two ways to compile your application,
1. Just-in-Time (JIT)
2. Ahead-of-Time (AOT)

### 77. What is JIT?

Just-in-Time (JIT) is a type of compilation that compiles your app in the browser at runtime. JIT compilation was the default until Angular 8, now default is AOT. When you run the ng build (build only) or ng serve (build and serve locally) CLI commands, the type of compilation (JIT or AOT) depends on the value of the aot property in your build configuration specified in angular.json. By default, aot is set to true.

### 78. What is AOT?

Ahead-of-Time (AOT) is a type of compilation that compiles your app at build time. This is the default starting in Angular 9. When you run the ng build (build only) or ng serve (build and serve locally) CLI commands, the type of compilation (JIT or AOT) depends on the value of the aot property in your build configuration specified in angular.json. By default, aot is set to true.

```cmd
ng build
ng serve
```

### 79. Why do we need compilation process?

The Angular components and templates cannot be understood by the browser directly. Due to that Angular applications require a compilation process before they can run in a browser. For example, In AOT compilation, both Angular HTML and TypeScript code converted into efficient JavaScript code during the build phase before browser runs it.

### 80. What are the advantages with AOT?

Below are the list of AOT benefits,

1. **Faster rendering:** The browser downloads a pre-compiled version of the application. So it can render the application immediately without compiling the app.
2. **Fewer asynchronous requests:** It inlines external HTML templates and CSS style sheets within the application javascript which eliminates separate ajax requests.
3. **Smaller Angular framework download size:** Doesn't require downloading the Angular compiler. Hence it dramatically reduces the application payload.
4. **Detect template errors earlier:** Detects and reports template binding errors during the build step itself
5. **Better security:** It compiles HTML templates and components into JavaScript.  So there won't be any injection attacks.

### 81. What are the ways to control AOT compilation?

You can control your app compilation in two ways,
1. By providing template compiler options in the `tsconfig.json` file
2. By configuring Angular metadata with decorators

### 82. What are the restrictions of metadata?

In Angular, You must write metadata with the following general constraints,
1. Write expression syntax with in the supported range of javascript features
2. The compiler can only reference symbols which are exported
3. Only call the functions supported by the compiler
4. Decorated and data-bound class members must be public.

### 83. What are the three phases of AOT?

The AOT compiler works in three phases,
1. **Code Analysis:** The compiler records a representation of the source
2. **Code generation:** It handles the interpretation as well as places restrictions on what it interprets.
3. **Validation:** In this phase, the Angular template compiler uses the TypeScript compiler to validate the binding expressions in templates.

### 84. Can I use arrow functions in AOT?

No, Arrow functions or lambda functions can’t be used to assign values to the decorator properties. For example, the following snippet is invalid:

```javascript
@Component({
  providers: [{
    provide: MyService, useFactory: () => getService()
  }]
})
```

To fix this, it has to be changed as following exported function:

```javascript
function getService(){
  return new MyService();
}

@Component({
  providers: [{
    provide: MyService, useFactory: getService
  }]
})
```

If you still use arrow function, it generates an error node in place of the function. When the compiler later interprets this node, it reports an error to turn the arrow function into an exported function.
**Note:** From Angular5 onwards, the compiler automatically performs this rewriting while emitting the .js file.

### 85. What is the purpose of metadata json files?

The metadata.json file can be treated as a diagram of the overall structure of a decorator's metadata, represented as an abstract syntax tree(AST). During the analysis phase, the AOT collector scan the metadata recorded in the Angular decorators and outputs metadata information in .metadata.json files, one per .d.ts file.

### 86. Can I use any javascript feature for expression syntax in AOT?

No, the AOT collector understands a subset  of (or limited) JavaScript features. If an expression uses unsupported syntax, the collector writes an error node to the .metadata.json file. Later point of time, the compiler reports an error if it needs that piece of metadata to generate the application code.

### 87. What is folding?

The compiler can only resolve references to exported symbols in the metadata. Where as some of the non-exported members are folded while generating the code. i.e Folding is a process in which the collector evaluate an expression during collection and record the result in the .metadata.json instead of the original expression.
For example, the compiler couldn't refer selector reference because it is not exported

```javascript
let selector = 'app-root';
@Component({
  selector: selector
})
```
Will be folded into inline selector

```javascript
@Component({
      selector: 'app-root'
    })
```
Remember that the compiler can’t fold everything. For example, spread operator on arrays, objects created using new keywords and function calls.

### 88. What are macros?

The AOT compiler supports macros in the form of functions or static methods that return an expression in a `single return expression`.
For example, let us take a below macro function,

```javascript
export function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

You can use it inside metadata as an expression,

```javascript
@NgModule({
  declarations: wrapInArray(TypicalComponent)
})
export class TypicalModule {}
```

The compiler treats the macro expression as it written directly

```javascript
@NgModule({
  declarations: [TypicalComponent]
})
export class TypicalModule {}
```

### 89. Give an example of few metadata errors?

Below are some of the errors encountered in metadata,

1. **Expression form not supported:** Some of the language features outside of the compiler's restricted expression syntax used in angular metadata can produce this error.
    Let's see some of these examples,
    ```javascript
    1. export class User { ... }
       const prop = typeof User; // typeof is not valid in metadata
    2. { provide: 'token', useValue: { [prop]: 'value' } }; // bracket notation is not valid in metadata
    ```
2. **Reference to a local (non-exported) symbol:** The compiler encountered a referenced to a locally defined symbol that either wasn't exported or wasn't initialized.
    Let's take example of this error,
    ```javascript
    // ERROR
    let username: string; // neither exported nor initialized

    @Component({
      selector: 'my-component',
      template: ... ,
      providers: [
        { provide: User, useValue: username }
      ]
    })
    export class MyComponent {}
    ```
    You can fix this by either exporting or initializing the value,
    ```javascript
    export let username: string; // exported
    (or)
    let username = 'John'; // initialized
    ```
 3. **Function calls are not supported:** The compiler does not currently support function expressions or lambda functions. For example, you cannot set a provider's useFactory to an anonymous function or arrow function as below.
    ```javascript
     providers: [
        { provide: MyStrategy, useFactory: function() { ... } },
        { provide: OtherStrategy, useFactory: () => { ... } }
      ]
    ```
    You can fix this with exported function
    ```javascript
    export function myStrategy() { ... }
    export function otherStrategy() { ... }
    ... // metadata
    providers: [
        { provide: MyStrategy, useFactory: myStrategy },
        { provide: OtherStrategy, useFactory: otherStrategy },
    ```
 4. **Destructured variable or constant not supported:** The compiler does not support references to variables assigned by destructuring.
    For example, you cannot write something like this:
    ```javascript
    import { user } from './user';

    // destructured assignment to name and age
    const {name, age} = user;
    ... //metadata
    providers: [
        {provide: Name, useValue: name},
        {provide: Age, useValue: age},
      ]
    ```
    You can fix this by non-destructured values
    ```javascript
    import { user } from './user';
    ... //metadata
    providers: [
        {provide: Name, useValue: user.name},
        {provide: Age, useValue: user.age},
      ]
    ```

### 90. What is metadata rewriting?

Metadata rewriting is the process in which the compiler converts the expression initializing the fields such as useClass, useValue, useFactory, and data into an exported variable, which replaces the expression. Remember that the compiler does this rewriting during the emit of the .js file but not in definition files( .d.ts file).

### 91. How do you provide configuration inheritance?

Angular Compiler supports configuration inheritance through extends in the tsconfig.json on angularCompilerOptions. i.e, The configuration from the base file(for example, tsconfig.base.json) are loaded first, then overridden by those in the inheriting config file.

```javascript
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    ...
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "preserveWhitespaces": true,
    ...
  }
}
```

### 92. How do you specify angular template compiler options?

The angular template compiler options are specified as members of the **angularCompilerOptions** object in the tsconfig.json file. These options will be specified adjacent to typescript compiler options.

```javascript
{
  "compilerOptions": {
    "experimentalDecorators": true,
              ...
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "preserveWhitespaces": true,
              ...
  }
}
```

### 93. How do you enable binding expression validation?

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

### 94. What is the purpose of any type cast function?

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

### 95. What is Non null type assertion operator?

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

### 96. What is type narrowing?

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

### 97. How do you describe various dependencies in angular application?

The dependencies section of package.json with in an angular application can be divided as follow,

1. **Angular packages:** Angular core and optional modules; their package names begin @angular/.
2. **Support packages:** Third-party libraries that must be present for Angular apps to run.
3. **Polyfill packages:** Polyfills plug gaps in a browser's JavaScript implementation.

### 98. What is zone?

A Zone is an execution context that persists across async tasks. Angular relies on zone.js to run Angular's change detection processes when native JavaScript operations raise events

### 99. What is the purpose of common module?

The commonly-needed services, pipes, and directives provided by @angular/common module. Apart from these HttpClientModule is available under @angular/common/http.

### 100. What is codelyzer?

Codelyzer provides set of tslint rules for static code analysis of Angular TypeScript projects. You can run the static code analyzer over web apps, NativeScript, Ionic etc. Angular CLI has support for this and it can be use as below,
```bash
ng new codelyzer
ng lint
```

---

Previous: [[Interview Questions 001-050|Questions 1–50]] · Next: [[Interview Questions 101-150|Questions 101–150]]

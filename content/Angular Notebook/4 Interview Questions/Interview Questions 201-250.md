---
title: Interview Questions 201–250
tags:
  - Angular
  - Interview
---

Part of [[Angular Notebook/4 Interview Questions/index|Angular interview questions]]. Source: [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

Previous: [[Interview Questions 151-200|Questions 151–200]] · Next: [[Interview Questions 251-283|Questions 251–283]]

### 201. What is the difference between ngIf and hidden property?

The main difference is that *ngIf will remove the element from the DOM, while [hidden] actually plays with the CSS style by setting `display:none`. Generally it is expensive to add and remove stuff from the DOM for frequent actions.

### 202. What is slice pipe?

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

### 203. What is index property in ngFor directive?

The index property of the NgFor directive is used to return the zero-based index of the item in each iteration. You can capture the index in a template input variable and use it in the template.

For example, you can capture the index in a variable named indexVar and displays it with the todo's name using ngFor directive as below.
```javascript
<div *ngFor="let todo of todos; let i=index">{{i + 1}} - {{todo.name}}</div>
```

### 204. What is the purpose of ngFor trackBy?

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

### 205. What is the purpose of ngSwitch directive?

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

### 206. Is it possible to do aliasing for inputs and outputs?

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

### 207. What is safe navigation operator?

The safe navigation operator(?)(or known as Elvis Operator) is used to guard against `null` and `undefined` values in property paths when you are not aware whether a path exists or not. i.e. It returns value of the object path if it exists, else it returns the null value.

For example, you can access nested properties of a user profile easily without null reference errors as below,
```javascript
<p>The user firstName is: {{user?.fullName.firstName}}</p>
```
Using this safe navigation operator, Angular framework stops evaluating the expression when it hits the first null value and renders the view without any errors.

### 208. Is any special configuration required for Angular9?

You don't need any special configuration. In Angular9, the Ivy renderer is the default Angular compiler. Even though Ivy is available Angular8 itself, you had to configure it in tsconfig.json file as below,
```javascript
"angularCompilerOptions": {    "enableIvy": true  }
```

### 209. What are type safe TestBed API changes in Angular9?

Angular 9 provides type safe changes in TestBed API changes by replacing the old get function with the new inject method. Because TestBed.get method is not type-safe. The usage would be as below,
```javascript
TestBed.get(ChangeDetectorRef) // returns any. It is deprecated now.

TestBed.inject(ChangeDetectorRef) // returns ChangeDetectorRef
```

### 210. Is mandatory to pass static flag for ViewChild?

In Angular 8, the static flag is required for ViewChild. Whereas in Angular9, you no longer need to pass this property. Once you updated to Angular9 using `ng update`, the migration will remove { static: false } script everywhere.
```javascript
@ViewChild(ChildDirective) child: ChildDirective; // Angular9 usage
@ViewChild(ChildDirective, { static: false }) child: ChildDirective; //Angular8 usage
```

### 211. What are the list of template expression operators?

The Angular template expression language supports three special template expression operators.
1. Pipe operator
2. Safe navigation operator
3. Non-null assertion operator

### 212. What is the precedence between pipe and ternary operators?

The pipe operator has a higher precedence than the ternary operator (?:). For example, the expression `first ? second : third | fourth` is parsed as `first ? second : (third | fourth)`.

### 213. What is an entry component?

An entry component is any component that Angular loads imperatively(i.e, not referencing it in the template) by type. Due to this behavior, they can’t be found by the Angular compiler during compilation. These components created dynamically with `ComponentFactoryResolver`.

Basically, there are two main kinds of entry components which are following -
1. The bootstrapped root component
2. A component you specify in a route

### 214. What is a bootstrapped component?

A bootstrapped component is an entry component that Angular loads into the DOM during the bootstrap process or application launch time. Generally, this bootstrapped or root component is named as `AppComponent` in your root module using `bootstrap` property as below.
```js
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent] // bootstrapped entry component need to be declared here
})
```

### 215. How do you manually bootstrap an application?

You can use `ngDoBootstrap` hook for a manual bootstrapping of the application instead of using bootstrap array in `@NgModule` annotation. This hook is part of `DoBootstrap` interface.
```js
interface DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void
}
```
The module needs to be implement the above interface to use the hook for bootstrapping.
```js
class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent); // bootstrapped entry component need to be passed
  }
}
```

### 216. Is it necessary for bootstrapped component to be entry component?

Yes, the bootstrapped component needs to be an entry component. This is because the bootstrapping process is an imperative process.

### 217. What is a routed entry component?

The components referenced in router configuration are called as routed entry components. This routed entry component defined in a route definition as below,
```js
const routes: Routes = [
  {
    path: '',
    component: TodoListComponent // router entry component
  }
];
```
Since router definition requires you to add the component in two places (router and entryComponents), these components are always entry components.

**Note:** The compilers are smart enough to recognize a router definition and automatically add the router component into `entryComponents`.

### 218. Why is not necessary to use entryComponents array every time?

Most of the time, you don't need to explicitly to set entry components in entryComponents array of ngModule decorator. Because angular adds components from both @NgModule.bootstrap and route definitions to entry components automatically.

### 219. Do I still need to use entryComponents array in Angular9?

No. In previous angular releases, the entryComponents array of ngModule decorator is used to tell the compiler which components would be created and inserted dynamically in the view. In Angular9, this is not required anymore with Ivy.

### 220. Is it all components generated in production build?

No, only the entry components and template components appears in production builds. If a component isn't an entry component and isn't found in a template, the tree shaker will throw it away. Due to this reason, make sure to add only true entry components to reduce the bundle size.

### 221. What is Angular compiler?

The Angular compiler is used to convert the application code into JavaScript code. It reads the template markup, combines it with the corresponding component class code, and emits component factories which creates JavaScript representation of the component along with elements of @Component metadata.

### 222. What is the role of ngModule metadata in compilation process?

The `@NgModule` metadata is used to tell the Angular compiler what components to be compiled for this module and how to link this module with other modules.

### 223. How does angular finds components, directives and pipes?

The Angular compiler finds a component or directive in a template when it can match the selector of that component or directive in that template. Whereas it finds a pipe if the pipe's name appears within the pipe syntax of the template HTML.

### 224. Give few examples for NgModules?

The Angular core libraries and third-party libraries are available as NgModules.
1. Angular libraries such as FormsModule, HttpClientModule, and RouterModule are NgModules.
2. Many third-party libraries such as Material Design, Ionic, and AngularFire2 are NgModules.

### 225. What are feature modules?

Feature modules are NgModules, which are used for the purpose of organizing code. The feature module can be created with Angular CLI using the below command in the root directory,
```javascript
ng generate module MyCustomFeature //
```
Angular CLI creates a folder called `my-custom-feature` with a file inside called `my-custom-feature.module.ts` with the following contents
```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class MyCustomFeature { }
```

**Note:**  The "Module" suffix shouldn't present in the name because the CLI appends it.

### 226. What are the imported modules in CLI generated feature modules?

In the CLI generated feature module, there are two JavaScript import statements at the top of the file
1. **NgModule:** InOrder to use the `@NgModule` decorator
2. **CommonModule:** It provides many common directives such as `ngIf` and `ngFor`.

### 227. What are the differences between ngmodule and javascript module?

Below are the main differences between Angular NgModule and javascript module,

| NgModule | JavaScript module |
|---- | --------- |
| NgModule bounds declarable classes only | There is no restriction classes |
| List the module's classes in declarations array only | Can define all member classes in one giant file |
| It only export the declarable classes it owns or imports from other modules| It can export any classes |
| Extend the entire application with services by adding providers to provides array | Can't extend the application with services |

### 228. What are the possible errors with declarations?

There are two common possible errors with declarations array,
1. If you use a component without declaring it, Angular returns an error message.
2. If you try to declare the same class in more than one module then compiler emits an error.

### 229. What are the steps to use declaration elements?

Below are the steps to be followed to use declaration elements.
1. Create the element(component, directive and pipes) and export it from the file where you wrote it
2. Import it into the appropriate module.
3. Declare it in the @NgModule declarations array.

### 230. What happens if browserModule used in feature module?

If you do import `BrowserModule` into a lazy loaded feature module, Angular returns an error telling you to use `CommonModule` instead. Because BrowserModule’s providers are for the entire app so it should only be in the root module, not in feature module. Whereas Feature modules only need the common directives in CommonModule.

![[aiq-browser-module-error.gif]]

### 231. What are the types of feature modules?

Below are the five categories of feature modules,
1. **Domain:** Deliver a user experience dedicated to a particular application domain(For example, place an order, registration etc)
2. **Routed:** These are domain feature modules whose top components are the targets of router navigation routes.
3. **Routing:** It provides routing configuration for another module.
4. **Service:** It provides utility services such as data access and messaging(For example, HttpClientModule)
5. **Widget:** It makes components, directives, and pipes available to external modules(For example, third-party libraries such as Material UI)

### 232. What is a provider?

A provider is an instruction to the Dependency Injection system on how to obtain a value for a dependency(aka services created). The service can be provided using Angular CLI as below,
```javascript
ng generate service my-service
```
The created service by CLI would be as below,
```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', //Angular provide the service in root injector
})
export class MyService {
}
```

### 233. What is the recommendation for provider scope?

You should always provide your service in the root injector unless there is a case where you want the service to be available only if you import a particular @NgModule.

### 234. How do you restrict provider scope to a module?

It is possible to restrict service provider scope to a specific module instead making available to entire application. There are two possible ways to do it.
1. **Using providedIn in service:**
    ```js
    import { Injectable } from '@angular/core';
    import { SomeModule } from './some.module';

    @Injectable({
      providedIn: SomeModule,
    })
    export class SomeService {
    }
    ```
2. **Declare provider for the service in module:**
    ```js
    import { NgModule } from '@angular/core';

    import { SomeService } from './some.service';

    @NgModule({
      providers: [SomeService],
    })
    export class SomeModule {
    }
    ```

### 235. How do you provide a singleton service?

There are two possible ways to provide a singleton service.
1. Set the providedIn property of the @Injectable() to "root". This is the preferred way(starting from Angular 6.0) of creating a singleton service since it makes your services tree-shakable.

    ```js
    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root',
    })
    export class MyService {
    }
    ```
2. Include the service in root module or in a module that is only imported by root module. It has been used to register services before Angular 6.0.

    ```js
    @NgModule({
      ...
      providers: [MyService],
      ...
    })
    ```

### 236. What are the different ways to remove duplicate service registration?

If a module defines provides and declarations then loading the module in multiple feature modules will duplicate the registration of the service. Below are the different ways to prevent this duplicate behavior.
1. Use the providedIn syntax instead of registering the service in the module.
2. Separate your services into their own module.
3. Define forRoot() and forChild() methods in the module.

### 237. How does forRoot method helpful to avoid duplicate router instances?

If the `RouterModule` module didn’t have forRoot() static method then each feature module would instantiate a new Router instance, which leads to broken application due to duplicate instances. After using forRoot() method, the root application module imports `RouterModule.forRoot(...)` and gets a Router, and all feature modules import `RouterModule.forChild(...)` which does not instantiate another Router.

### 238. What is a shared module?

The Shared Module is the module in which you put commonly used directives, pipes, and components into one module that is shared(import it) throughout the application.

For example, the below shared module imports CommonModule, FormsModule for common directives and components, pipes and directives based on the need,
```js
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { NewUserDirective } from './new-user.directive';
import { OrdersPipe } from './orders.pipe';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ UserComponent, NewUserDirective, OrdersPipe ],
 exports:      [ UserComponent, NewUserDirective, OrdersPipe,
                 CommonModule, FormsModule ]
})
export class SharedModule { }
```

### 239. Can I share services using modules?

No, it is not recommended to share services by importing module. i.e Import modules when you want to use directives, pipes, and components only. The best approach to get a hold of shared services is through 'Angular dependency injection' because importing a module will result in a new service instance.

### 240. How do you get current direction for locales?

In Angular 9.1, the API method `getLocaleDirection` can be used to get the current direction in your app. This method is useful to support Right to Left locales for your Internationalization based applications.
```js
import { getLocaleDirection, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeAr from '@angular/common/locales/ar';

  ...

  constructor(@Inject(LOCALE_ID) locale) {

    const directionForLocale = getLocaleDirection(locale); // Returns 'rtl' or 'ltr' based on the current locale
    registerLocaleData(localeAr, 'ar-ae');
    const direction = getLocaleDirection('ar-ae'); // Returns 'rtl'

    // Current direction is used to provide conditional logic here
  }
```

### 241. What is ngcc?

The ngcc(Angular Compatibility Compiler) is a tool which upgrades node_module compiled with non-ivy ngc into ivy compliant format. The `postinstall` script from package.json will make sure your node_modules will be compatible with the Ivy renderer.
```js
"scripts": {
   "postinstall": "ngcc"
}
```

Whereas, Ivy compiler (ngtsc), which compiles Ivy-compatible code.

### 242. What classes should not be added to declarations?

The below class types shouldn't be added to declarations
1. A class which is already declared in any another module.
2. Directives imported from another module.
3. Module classes.
4. Service classes.
5. Non-Angular classes and objects, such as strings, numbers, functions, entity models, configurations, business logic, and helper classes.

### 243. What is NgZone?

Angular provides a service called NgZone which creates a zone named `angular` to automatically trigger change detection when the following conditions are satisfied.
1. When a sync or async function is executed.
2. When there is no microTask scheduled.

### 244. What is NoopZone?

Zone is loaded/required by default in Angular applications and it helps Angular to know when to trigger the change detection. This way, it make sures developers focus on application development rather core part of Angular. You can also use Angular without Zone but the change detection need to be implemented on your own and `noop zone` need to be configured in bootstrap process.
Let's follow the below two steps to remove zone.js,
1. Remove the zone.js import from polyfills.ts.
    ```js
    /***************************************************************************************************
     * Zone JS is required by default for Angular itself.
     */
    // import 'zone.js/dist/zone';  // Included with Angular CLI.
    ```
2. Bootstrap Angular with noop zone in src/main.ts.
    ```js
    platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: 'noop'})
      .catch(err => console.error(err));
    ```

### 245. How do you create displayBlock components?

By default, Angular CLI creates components in an inline displayed mode(i.e, display:inline). But it is possible to create components with display: block style using `displayBlock` option,
```js
ng generate component my-component --displayBlock
```
(OR) the option can be turned on by default in Angular.json with `schematics.@schematics/angular:component.displayBlock` key value as true.

### 246. What are the possible data update scenarios for change detection?

The change detection works in the following scenarios where the data changes needs to update the application HTML.
1. **Component initialization:** While bootstrapping the Angular application, Angular triggers the `ApplicationRef.tick()` to call change detection and View Rendering.
2. **Event listener:**  The DOM event listener can update the data in an Angular component and trigger the change detection too.
    ```js
    @Component({
      selector: 'app-event-listener',
      template: `
        <button (click)="onClick()">Click</button>
        {{message}}`
    })
    export class EventListenerComponent {
      message = '';

      onClick() {
        this.message = 'data updated';
      }
    }
    ```
3. **HTTP Data Request:** You can get data from a server through an HTTP request
    ```js
    data = 'default value';
    constructor(private httpClient: HttpClient) {}

      ngOnInit() {
        this.httpClient.get(this.serverUrl).subscribe(response => {
          this.data = response.data; // change detection will happen automatically
        });
      }
    ```
4. **Macro tasks setTimeout() or setInterval():** You can update the data in the callback function of setTimeout or setInterval
    ```js
    data = 'default value';

      ngOnInit() {
        setTimeout(() => {
          this.data = 'data updated'; // Change detection will happen automatically
        });
      }
    ```
5. **Micro tasks Promises:** You can update the data in the callback function of promise
    ```js
    data = 'initial value';

      ngOnInit() {
        Promise.resolve(1).then(v => {
          this.data = v; // Change detection will happen automatically
        });
      }
    ```
6. **Async operations like Web sockets and Canvas:** The data can be updated asynchronously using WebSocket.onmessage() and Canvas.toBlob().

### 247. What is a zone context?

Execution Context is an abstract concept that holds information about the environment within the current code being executed. A zone provides an execution context that persists across asynchronous operations is called as zone context. For example, the zone context will be same in both outside and inside setTimeout callback function,
```js
zone.run(() => {
  // outside zone
  expect(zoneThis).toBe(zone);
  setTimeout(function() {
    // the same outside zone exist here
    expect(zoneThis).toBe(zone);
  });
});
```
The current zone is retrieved through `Zone.current`.

### 248. What are the lifecycle hooks of a zone?

There are four lifecycle hooks for asynchronous operations from zone.js.
1. **onScheduleTask:** This hook triggers when a new asynchronous task is scheduled. For example, when you call setTimeout()
    ```js
    onScheduleTask: function(delegate, curr, target, task) {
        console.log('new task is scheduled:', task.type, task.source);
        return delegate.scheduleTask(target, task);
      }
    ```
2. **onInvokeTask:** This hook triggers when an asynchronous task is about to execute. For example, when the callback of setTimeout() is about to execute.
    ```js
    onInvokeTask: function(delegate, curr, target, task, applyThis, applyArgs) {
        console.log('task will be invoked:', task.type, task.source);
        return delegate.invokeTask(target, task, applyThis, applyArgs);
      }
    ```
3. **onHasTask:** This hook triggers when the status of one kind of task inside a zone changes from stable(no tasks in the zone) to unstable(a new task is scheduled in the zone) or from unstable to stable.
    ```js
      onHasTask: function(delegate, curr, target, hasTaskState) {
        console.log('task state changed in the zone:', hasTaskState);
        return delegate.hasTask(target, hasTaskState);
      }
    ```
4. **onInvoke:** This hook triggers when a synchronous function is going to execute in the zone.
    ```js
    onInvoke: function(delegate, curr, target, callback, applyThis, applyArgs) {
        console.log('the callback will be invoked:', callback);
        return delegate.invoke(target, callback, applyThis, applyArgs);
      }
    ```

### 249. What are the methods of NgZone used to control change detection?

NgZone service provides a `run()` method that allows you to execute a function inside the angular zone. This function is used to execute third party APIs which are not handled by Zone and trigger change detection automatically at the correct time.
```js
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    // use ngZone.run() to make the asynchronous operation in the angular zone
    this.ngZone.run(() => {
      someNewAsyncAPI(() => {
        // update the data of the component
      });
    });
  }
}
```
Whereas `runOutsideAngular()` method is used when you don't want to trigger change detection.
```js
export class AppComponent implements OnInit {
  constructor(private ngZone: NgZone) {}
  ngOnInit() {
    // Use this method when you know no data will be updated
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // update component data and don't trigger change detection
      });
    });
  }
}
```

### 250. How do you change the settings of zonejs?

You can change the settings of zone by configuring them in a separate file and import it just after zonejs import.
For example, you can disable the requestAnimationFrame() monkey patch to prevent change detection for no data update as one setting and prevent DOM events(a mousemove or scroll event) to trigger change detection. Let's say the new file named zone-flags.js,
```js
// disable patching requestAnimationFrame
(window as any).__Zone_disable_requestAnimationFrame = true;

// disable patching specified eventNames
(window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove'];
```
The above configuration file can be imported in a polyfill.ts file as below,
```js
/***************************************************************************************************
 * Zone JS is required by default for Angular.
 */
import `./zone-flags`;
import 'zone.js/dist/zone';  // Included with Angular CLI.
```

---

Previous: [[Interview Questions 151-200|Questions 151–200]] · Next: [[Interview Questions 251-283|Questions 251–283]]

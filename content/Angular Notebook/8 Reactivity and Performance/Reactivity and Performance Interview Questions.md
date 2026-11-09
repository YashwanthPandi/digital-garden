---
title: Reactivity and Performance Interview Questions
tags:
  - Angular
  - Interview
---

21 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What is Angular Universal?

Angular Universal is a server-side rendering module for Angular applications in various scenarios. This is a community driven project and available under @angular/platform-server package. Recently Angular Universal is integrated with Angular CLI.

### 2. What is zone?

A Zone is an execution context that persists across async tasks. Angular relies on zone.js to run Angular's change detection processes when native JavaScript operations raise events

### 3. What is a service worker and its role in Angular?

A service worker is a script that runs in the web browser and manages caching for an application. Starting from 5.0.0 version, Angular ships with a service worker implementation. Angular service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.

### 4. What are the design goals of service workers?

Below are the list of design goals of Angular's service workers,

1. It caches an application just like installing a native application
2. A running application continues to run with the same version of all files without any incompatible files
3. When you refresh the application, it loads the latest fully cached version
4. When changes are published then it immediately updates in the background
5. Service workers saves the bandwidth by downloading the resources only when they changed.

### 5. How do you add web workers in your application?

You can add web worker anywhere in your application. For example, If the file that contains your expensive computation is `src/app/app.component.ts`, you can add a Web Worker using `ng generate web-worker app` command which will create `src/app/app.worker.ts` web worker file. This command will perform below actions,

1. Configure your project to use Web Workers
2. Adds app.worker.ts to receive messages
    ```javascript
    addEventListener('message', ({ data }) => {
      const response = `worker response to ${data}`;
      postMessage(response);
    });
    ```
3. The component `app.component.ts` file updated with web worker file
    ```javascript
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log('page got message: $\{data\}');
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
    }
    ```

**Note:** You may need to refactor your initial scaffolding web worker code for sending messages to and from.

### 6. What are the limitations with web workers?

You need to remember two important things when using Web Workers in Angular projects,

1. Some environments or platforms(like @angular/platform-server) used in Server-side Rendering, don't support Web Workers. In this case you need to provide a fallback mechanism to perform the computations to work in this environments.
2. Running Angular in web worker using `@angular/platform-webworker` is not yet supported in Angular CLI.

### 7. How do you create app shell in Angular?

An App shell is a way to render a portion of your application via a route at build time. This is useful to first paint of your application that appears quickly because the browser can render static HTML and CSS without the need to initialize JavaScript. You can achieve this using Angular CLI which generates an app shell for running server-side of your app.

```javascript
ng generate appShell [options] (or)
ng g appShell [options]
```

### 8. What is the purpose of differential loading in CLI?

From Angular8 release onwards, the applications are built using differential loading strategy from CLI to build two separate bundles as part of your deployed application.

1. The first build contains ES2015 syntax which takes the advantage of built-in support in modern browsers, ships less polyfills, and results in a smaller bundle size.
2. The second build contains old ES5 syntax to support older browsers with all necessary polyfills. But this results in a larger bundle size.

**Note:** This strategy is used to support multiple browsers but it only load the code that the browser needs.

### 9. What are the ways to trigger change detection in Angular?

You can inject either ApplicationRef or NgZone, or ChangeDetectorRef into your component and apply below specific methods to trigger change detection in Angular. i.e, There are 3 possible ways,

1. **ApplicationRef.tick():** Invoke this method to explicitly process change detection and its side-effects. It check the full component tree.
2. **NgZone.run(callback):** It evaluate the callback function inside the Angular zone.
3. **ChangeDetectorRef.detectChanges():** It detects only the components and it's children.

### 10. What is NgZone?

Angular provides a service called NgZone which creates a zone named `angular` to automatically trigger change detection when the following conditions are satisfied.
1. When a sync or async function is executed.
2. When there is no microTask scheduled.

### 11. What is NoopZone?

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

### 12. What are the possible data update scenarios for change detection?

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

### 13. What is a zone context?

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

### 14. What are the lifecycle hooks of a zone?

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

### 15. What are the methods of NgZone used to control change detection?

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

### 16. How do you change the settings of zonejs?

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

### 17. What is the benefit of Automatic Inlining of Fonts?

During compile time, Angular CLI will download and inline the fonts that your application is using. This performance update speed up the first contentful paint(FCP) and this feature is enabled by default in apps built with version 11.

### 18. What is hydration?

Hydration is the process that restores the server side rendered application on the client. This includes things like reusing the server rendered DOM structures, persisting the application state, transferring application data that was retrieved already by the server, and other processes.

To enable hydration, we have to enable server side rendering or Angular Universal. Once enabled, we can add the following piece of code in the root component.

```typescript
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';

bootstrapApplication(RootCmp, {
  providers: [provideClientHydration()]
});
```
Alternatively we can add `providers: [provideClientHydration()]` in the App Module
```typescript
import {provideClientHydration} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
​
@NgModule({
  declarations: [RootCmp],
  exports: [RootCmp],
  bootstrap: [RootCmp],
  providers: [provideClientHydration()],
})
export class AppModule {}
```

### 19. What are Angular Signals?

A signal is a wrapper around a value that can notify interested consumers when that value changes. Signals can contain any value, from simple primitives to complex data structures.

### 20. Explain Angular Signals with an example.

In this example, we create a signal named `count` and initialize it with a value of 0. We then connect to the signal, allowing us to be notified whenever its value changes. Finally, we add a button that increments the count when clicked.

When the button is clicked, the `incrementCount()` method is called. This method sets the new value of the `count` signal to 1. Objects connected to the signal (subscribers) are then notified of the change, and the updated value is displayed in the UI.

In TypeScript file

```typescript
import { Component, OnInit } from '@angular/core';
import { signal, computed } from '@angular/core'; // Import from '@angular/core'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  constructor() {}

  ngOnInit() {
    // Optional logging for debugging displayedCount changes
    // console.log('Displayed count changed to:', this.displayedCount());
  }

  incrementCount() {
    this.count.set(this.count() + 1);
  }

  decrementCount() {
    this.count.update((value) => Math.max(0, value - 1));
  }
}
```
In HTML file
```html
<h1>Angular Signals Example</h1>

<button (click)="incrementCount()" style="margin-right: 10px;">Increment Count</button>
<button (click)="decrementCount()">Decrement Count</button>

<p>Count: {{ count() }}</p>
<p>Double Count: {{ doubleCount() }}</p>
```

### 21. What is NgRx?

NgRx is a framework for building reactive applications in Angular. It is a state management library that provides a Redux-inspired architecture for managing and centralizing application state. NgRx is built on top of RxJS and follows the principles of reactive programming.

The main components of NgRx include:

1. **Store:** A single, immutable data structure that holds the entire application state.
2. **Actions:** Plain objects that describe events or user interactions that can change the state.
3. **Reducers:** Pure functions that take the current state and an action, and return a new state.
4. **Effects:** Side effect handlers that listen to actions and can perform asynchronous operations like API calls.
5. **Selectors:** Functions used to query and derive data from the store.

NgRx helps manage complex state in large Angular applications by providing predictable state management, improved debugging capabilities, and better separation of concerns. It's particularly useful for applications with:
- Complex data flows
- Multiple components sharing the same data
- Need for time-travel debugging
- Requirements for state persistence

Here's a simple example of NgRx usage:

```typescript
// Action
export const loadUsers = createAction('[User List] Load Users');

// Reducer
export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true }))
);

// Selector
export const selectUsers = (state: AppState) => state.users;

// Component
export class UserComponent {
  users$ = this.store.select(selectUsers);

  constructor(private store: Store<AppState>) {}

  loadUsers() {
    this.store.dispatch(loadUsers());
  }
}
```

---

---
title: Interview Questions 101–150
tags:
  - Angular
  - Interview
---

Part of [[Angular Notebook/4 Interview Questions/index|Angular interview questions]]. Source: [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

Previous: [[Interview Questions 051-100|Questions 51–100]] · Next: [[Interview Questions 151-200|Questions 151–200]]

### 101. What is angular animation?

Angular's animation system is built on CSS functionality in order to animate any property that the browser considers animatable. These properties includes positions, sizes, transforms, colors, borders etc. The Angular modules for animations are **@angular/animations** and **@angular/platform-browser** and these dependencies are automatically added to your project when you create a project using Angular CLI.

### 102. What are the steps to use animation module?

You need to follow below steps to implement animation in your angular project,

1. **Enabling the animations module:** Import BrowserAnimationsModule to add animation capabilities into your Angular root application module(for example, src/app/app.module.ts).
    ```javascript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

    @NgModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule
      ],
      declarations: [ ],
      bootstrap: [ ]
    })
    export class AppModule { }
    ```
2. **Importing animation functions into component files:** Import required animation functions from @angular/animations in component files(for example, src/app/app.component.ts).
    ```javascript
    import {
      trigger,
      state,
      style,
      animate,
      transition,
      // ...
    } from '@angular/animations';
    ```
3. **Adding the animation metadata property:** add a metadata property called animations: within the @Component() decorator in component files(for example, src/app/app.component.ts)
    ```javascript
    @Component({
      selector: 'app-root',
      templateUrl: 'app.component.html',
      styleUrls: ['app.component.css'],
      animations: [
        // animation triggers go here
      ]
    })
    ```

### 103. What is State function?

Angular's state() function is used to define different states to call at the end of each transition. This function takes two arguments: a unique name like open or closed and a style() function.

For example, you can write a open state function

```javascript
state('open', style({
  height: '300px',
  opacity: 0.5,
  backgroundColor: 'blue'
})),
```

### 104. What is Style function?

The style function is used to define a set of styles to associate with a given state name. You need to use it along with state() function to set CSS style attributes. For example, in the close state, the button has a height of 100 pixels, an opacity of 0.8, and a background color of green.

```javascript
state('close', style({
  height: '100px',
  opacity: 0.8,
  backgroundColor: 'green'
})),
```
**Note:** The style attributes must be in camelCase.

### 105. What is the purpose of animate function?

Angular Animations are a powerful way to implement sophisticated and compelling animations for your Angular single page web application.

   ```javascript
   import { Component, OnInit, Input } from '@angular/core';
   import { trigger, state, style, animate, transition } from '@angular/animations';

   @Component({
   selector: 'app-animate',
   templateUrl: `<div [@changeState]="currentState" class="myblock mx-auto"></div>`,
   styleUrls: `.myblock {
       background-color: green;
       width: 300px;
       height: 250px;
       border-radius: 5px;
       margin: 5rem;
       }`,
   animations: [
       trigger('changeState', [
       state('state1', style({
           backgroundColor: 'green',
           transform: 'scale(1)'
       })),
       state('state2', style({
           backgroundColor: 'red',
           transform: 'scale(1.5)'
       })),
       transition('*=>state1', animate('300ms')),
       transition('*=>state2', animate('2000ms'))
       ])
   ]
   })
   export class AnimateComponent implements OnInit {

       @Input() currentState;

       constructor() { }

       ngOnInit() {
       }
   }
   ```

### 106. What is transition function?

The animation transition function is used to specify the changes that occur between one state and another over a period of time. It accepts two arguments: the first argument accepts an expression that defines the direction between two transition states, and the second argument accepts an animate() function.

Let's take an example state transition from open to closed with an half second transition between states.

```javascript
transition('open => closed', [
  animate('500ms')
]),
```

### 107. How to inject the dynamic script in angular?

Using DomSanitizer we can inject the dynamic Html,Style,Script,Url.

```
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
   selector: 'my-app',
   template: `
       <div [innerHtml]="htmlSnippet"></div>
   `,
})
export class App {
       constructor(protected sanitizer: DomSanitizer) {}
       htmlSnippet: string = this.sanitizer.bypassSecurityTrustScript("<script>safeCode()</script>");
   }
```

### 108. What is a service worker and its role in Angular?

A service worker is a script that runs in the web browser and manages caching for an application. Starting from 5.0.0 version, Angular ships with a service worker implementation. Angular service worker is designed to optimize the end user experience of using an application over a slow or unreliable network connection, while also minimizing the risks of serving outdated content.

### 109. What are the design goals of service workers?

Below are the list of design goals of Angular's service workers,

1. It caches an application just like installing a native application
2. A running application continues to run with the same version of all files without any incompatible files
3. When you refresh the application, it loads the latest fully cached version
4. When changes are published then it immediately updates in the background
5. Service workers saves the bandwidth by downloading the resources only when they changed.

### 110. What are the differences between AngularJS and Angular with respect to dependency injection?

Dependency injection is a common component in both AngularJS and Angular, but there are some key differences between the two frameworks in how it actually works.

  | AngularJS | Angular |
  |---- | ---------
  | Dependency injection tokens are always strings  | Tokens can have different types. They are often classes and sometimes can be strings. |
  | There is exactly one injector even though it is a multi-module applications | There is a tree hierarchy of injectors, with a root injector and an additional injector for each component. |

### 111. What is Angular Ivy?

Angular Ivy is a new rendering engine for Angular. You can choose to opt in a preview version of Ivy from Angular version 8.

1. You can enable ivy in a new project by using the --enable-ivy flag with the ng new command

    ```bash
    ng new ivy-demo-app --enable-ivy
    ```
2. You can add it to an existing project by adding `enableIvy` option in the `angularCompilerOptions` in your project's `tsconfig.app.json`.

    ```javascript
    {
      "compilerOptions": { ... },
      "angularCompilerOptions": {
        "enableIvy": true
      }
    }
    ```

### 112. What are the features included in ivy preview?

You can expect below features with Ivy preview,

1. Generated code that is easier to read and debug at runtime
2. Faster re-build time
3. Improved payload size
4. Improved template type checking

### 113. Can I use AOT compilation with Ivy?

Yes, it is a recommended configuration. Also, AOT compilation with Ivy is faster. So you need set the default build options(with in angular.json) for your project to always use AOT compilation.

```javascript
{
  "projects": {
    "my-project": {
      "architect": {
        "build": {
          "options": {
            ...
            "aot": true,
          }
        }
      }
    }
  }
}
```

### 114. What is Angular Language Service?

The Angular Language Service is a way to get completions, errors, hints, and navigation inside your Angular templates whether they are external in an HTML file or embedded in annotations/decorators in a string. It has the ability to autodetect that you are opening an Angular file, reads your `tsconfig.json` file, finds all the templates you have in your application, and then provides all the language services.

### 115. How do you install angular language service in the project?

You can install Angular Language Service in your project with the following npm command,

```javascript
npm install --save-dev @angular/language-service
```
After that add the following to the "compilerOptions" section of your project's tsconfig.json

```javascript
"plugins": [
    {"name": "@angular/language-service"}
]
```
**Note:** The completion and diagnostic services works for .ts files only. You need to use custom plugins for supporting HTML files.

### 116. Is there any editor support for Angular Language Service?

Yes, Angular Language Service is currently available for Visual Studio Code and WebStorm IDEs. You need to install angular language service using an extension and devDependency respectively. In sublime editor, you need to install typescript which has has a language service plugin model.

### 117. Explain the features provided by Angular Language Service?

Basically there are 3 main features provided by Angular Language Service,

1. **Autocompletion:** Autocompletion can speed up your development time by providing you with contextual possibilities and hints as you type with in an interpolation and elements.

     ![[aiq-language-completion.gif]]

2. **Error checking:** It can also warn you of mistakes in your code.

     ![[aiq-language-error.gif]]

3. **Navigation:** Navigation allows you to hover a component, directive, module and then click and press F12 to go directly to its definition.

     ![[aiq-language-navigation.gif]]

### 118. How do you add web workers in your application?

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

### 119. What are the limitations with web workers?

You need to remember two important things when using Web Workers in Angular projects,

1. Some environments or platforms(like @angular/platform-server) used in Server-side Rendering, don't support Web Workers. In this case you need to provide a fallback mechanism to perform the computations to work in this environments.
2. Running Angular in web worker using `@angular/platform-webworker` is not yet supported in Angular CLI.

### 120. What is Angular CLI Builder?

In Angular8, the CLI Builder API is stable and available to developers who want to customize the `Angular CLI` by adding or modifying commands. For example, you could supply a builder to perform an entirely new task, or to change which third-party tool is used by an existing command.

### 121. What is a builder?

A builder function is a function that uses the `Architect API` to perform a complex process such as "build" or "test". The builder code is defined in an npm package. For example, BrowserBuilder runs a webpack build for a browser target and KarmaBuilder starts the Karma server and runs a webpack build for unit tests.

### 122. How do you invoke a builder?

The Angular CLI command `ng run` is used to invoke a builder with a specific target configuration. The workspace configuration file, `angular.json`, contains default configurations for built-in builders.

### 123. How do you create app shell in Angular?

An App shell is a way to render a portion of your application via a route at build time. This is useful to first paint of your application that appears quickly because the browser can render static HTML and CSS without the need to initialize JavaScript. You can achieve this using Angular CLI which generates an app shell for running server-side of your app.

```javascript
ng generate appShell [options] (or)
ng g appShell [options]
```

### 124. What are the case types in Angular?

Angular uses capitalization conventions to distinguish the names of various types. Angular follows the list of the below case types.

1. **camelCase :** Symbols, properties, methods, pipe names, non-component directive selectors, constants uses lowercase on the first letter of the item. For example, "selectedUser"
2. **UpperCamelCase (or PascalCase):** Class names, including classes that define components, interfaces, NgModules, directives, and pipes uses uppercase on the first letter of the item.
3. **dash-case (or "kebab-case"):** The descriptive part of file names, component selectors uses dashes between the words. For example, "app-user-list".
4. **UPPER_UNDERSCORE_CASE:** All constants uses capital letters connected with underscores. For example, "NUMBER_OF_USERS".

### 125. What are the class decorators in Angular?

A class decorator is a decorator that appears immediately before a class definition, which declares the class to be of the given type, and provides metadata suitable to the type

The following list of decorators comes under class decorators,

1. @Component()
2. @Directive()
3. @Pipe()
4. @Injectable()
5. @NgModule()

### 126. What are class field decorators?

The class field decorators are the statements declared immediately before a field in a class definition that defines the type of that field. Some of the examples are: @input and @output,

```javascript
@Input() myProperty;
@Output() myEvent = new EventEmitter();
```

### 127. What is declarable in Angular?

Declarable is a class type that you can add to the declarations list of an NgModule. The class types such as components, directives, and pipes comes can be declared in the module. The structure of declarations would be,

```javascript
declarations: [
  YourComponent,
  YourPipe,
  YourDirective
],
```

### 128. What are the restrictions on declarable classes?

Below classes shouldn't be declared,

1. A class that's already declared in another NgModule
2. Ngmodule classes
3. Service classes
4. Helper classes

### 129. What is a DI token?

A DI token is a lookup token associated with a dependency provider in dependency injection system. The injector maintains an internal token-provider map that it references when asked for a dependency and the DI token is the key to the map. Let's take example of DI Token usage,

```javascript
const BASE_URL = new InjectionToken<string>('BaseUrl');
const injector =
   Injector.create({providers: [{provide: BASE_URL, useValue: 'http://some-domain.com'}]});
const url = injector.get(BASE_URL);
```

### 130. What is Angular DSL?

A domain-specific language (DSL) is a computer language specialized to a particular application domain. Angular has its own Domain Specific Language (DSL) which allows us to write Angular specific html-like syntax on top of normal html. It has its own compiler that compiles this syntax to html that the browser can understand. This DSL is defined in NgModules such as animations, forms, and routing and navigation.

Basically you will see 3 main syntax in Angular DSL.

1. `()`: Used for Output and DOM events.
2. `[]`: Used for Input and specific DOM element attributes.
3. `*`: Structural directives(*ngFor or *ngIf) will affect/change the DOM structure.

### 131. What is an RxJS Subject in Angular?

An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

``` typescript
 import { Subject } from 'rxjs';

   const subject = new Subject<number>();

   subject.subscribe({
     next: (v) => console.log(`observerA: ${v}`)
   });
   subject.subscribe({
     next: (v) => console.log(`observerB: ${v}`)
   });

   subject.next(1);
   subject.next(2);
```

### 132. What is Bazel tool?

Bazel is a powerful build tool developed and massively used by Google and it can keep track of the dependencies between different packages and build targets. In Angular8, you can build your CLI application with Bazel.
**Note:** The Angular framework itself is built with Bazel.

### 133. What are the advantages of Bazel tool?

Below are the list of key advantages of Bazel tool,

1. It creates the possibility of building your back-ends and front-ends with the same tool
2. The incremental build and tests
3. It creates the possibility to have remote builds and cache on a build farm.

### 134. How do you use Bazel with Angular CLI?

The @angular/bazel package provides a builder that allows Angular CLI to use Bazel as the build tool.
1. **Use in an existing application:** Add @angular/bazel using CLI
    ```javascript
    ng add @angular/bazel
    ```
2. **Use in a new application:** Install the package and create the application with collection option
    ```javascript
    npm install -g @angular/bazel
    ng new --collection=@angular/bazel
    ```
When you use ng build and ng serve commands, Bazel is used behind the scenes and outputs the results in dist/bin folder.

### 135. How do you run Bazel directly?

Sometimes you may want to bypass the Angular CLI builder and run Bazel directly using Bazel CLI. You can install it globally using @bazel/bazel npm package. i.e, Bazel CLI is available under @bazel/bazel package. After you can apply the below common commands,

```javascrippt
bazel build [targets] // Compile the default output artifacts of the given targets.
bazel test [targets] // Run the tests with *_test targets found in the pattern.
bazel run [target]: Compile the program represented by target and then run it.
```

### 136. What is platform in Angular?

A platform is the context in which an Angular application runs. The most common platform for Angular applications is a web browser, but it can also be an operating system for a mobile device, or a web server. The runtime-platform is provided by the @angular/platform-* packages and these packages allow applications that make use of `@angular/core` and `@angular/common` to execute in different environments.
i.e, Angular can be used as platform-independent framework in different environments, For example,

1. While running in the browser, it uses `platform-browser` package.
2. When SSR(server-side rendering ) is used, it uses `platform-server` package for providing web server implementation.

### 137. What happens if I import the same module twice?

If multiple modules imports the same module then angular evaluates it only once (When it encounters the module first time). It follows this condition even the module appears at any level in a hierarchy of imported NgModules.

### 138. How do you select an element with in a component template?

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

### 139. How do you detect route change in Angular?

In Angular7, you can subscribe to router to detect the changes. The subscription for router events would be as below,

```javascript
this.router.events.subscribe((event: Event) => {})
```
Let's take a simple component to detect router changes

```javascript
import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {

    constructor(private router: Router) {

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                // Show loading indicator and perform an action
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator and perform an action
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator and perform an action
                console.log(event.error); // It logs an error for debugging
            }
        });
   }
}
```

### 140. How do you pass headers for HTTP client?

You can directly pass object map for http client or create HttpHeaders class to supply the headers.

```javascript
constructor(private _http: HttpClient) {}
this._http.get('someUrl',{
   headers: {'header1':'value1','header2':'value2'}
});

(or)
let headers = new HttpHeaders().set('header1', headerValue1); // create header object
headers = headers.append('header2', headerValue2); // add a new header, creating a new object
headers = headers.append('header3', headerValue3); // add another header

let params = new HttpParams().set('param1', value1); // create params object
params = params.append('param2', value2); // add a new param, creating a new object
params = params.append('param3', value3); // add another param

return this._http.get<any[]>('someUrl', { headers: headers, params: params })
```

### 141. What is the purpose of differential loading in CLI?

From Angular8 release onwards, the applications are built using differential loading strategy from CLI to build two separate bundles as part of your deployed application.

1. The first build contains ES2015 syntax which takes the advantage of built-in support in modern browsers, ships less polyfills, and results in a smaller bundle size.
2. The second build contains old ES5 syntax to support older browsers with all necessary polyfills. But this results in a larger bundle size.

**Note:** This strategy is used to support multiple browsers but it only load the code that the browser needs.

### 142. Does Angular support dynamic imports?

Yes, Angular 8 supports dynamic imports in router configuration. i.e, You can use the import statement for lazy loading the module using `loadChildren` method and it will be understood by the IDEs(VSCode and WebStorm), webpack, etc.
Previously, you have been written as below to lazily load the feature module. By mistake, if you have typo in the module name it still accepts the string and throws an error during build time.
```javascript
{path: ‘user’, loadChildren: ‘./users/user.module#UserModulee’},
```
This problem is resolved by using dynamic imports and IDEs are able to find it during compile time itself.
```javascript
{path: ‘user’, loadChildren: () => import(‘./users/user.module’).then(m => m.UserModule)};
```

### 143. What is lazy loading?

Lazy loading is one of the most useful concepts of Angular Routing. It helps us to download the web pages in chunks instead of downloading everything in a big bundle. It is used for lazy loading by asynchronously loading the feature module for routing whenever required using the property `loadChildren`. Let's load both `Customer` and `Order` feature modules lazily as below,
```javascript
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(module => module.CustomersModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(module => module.OrdersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
```

### 144. What are workspace APIs?

Angular 8.0 release introduces Workspace APIs to make it easier for developers to read and modify the angular.json file instead of manually modifying it. Currently, the only supported storage3 format is the JSON-based format used by the Angular CLI. You can enable or add optimization option for build target as below,
```javascript
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { workspaces } from '@angular-devkit/core';

async function addBuildTargetOption() {
    const host = workspaces.createWorkspaceHost(new NodeJsSyncHost());
    const workspace = await workspaces.readWorkspace('path/to/workspace/directory/', host);

    const project = workspace.projects.get('my-app');
    if (!project) {
      throw new Error('my-app does not exist');
    }

    const buildTarget = project.targets.get('build');
    if (!buildTarget) {
      throw new Error('build target does not exist');
    }

    buildTarget.options.optimization = true;

    await workspaces.writeWorkspace(workspace, host);
}

addBuildTargetOption();
```

### 145. How do you upgrade angular version?

The Angular upgrade is quite easier using Angular CLI `ng update` command as mentioned below. For example, if you upgrade from Angular 7 to 8 then your lazy loaded route imports will be migrated to the new import syntax automatically.
```bash
$ ng update @angular/cli @angular/core
```

### 146. What is Angular Material?

Angular Material is a collection of Material Design components for Angular framework following the Material Design spec. You can apply Material Design very easily using Angular Material. The installation can be done through npm or yarn,
```bash
npm install --save @angular/material @angular/cdk @angular/animations
(OR)
yarn add @angular/material @angular/cdk @angular/animations
```
It supports the most recent two versions of all major browsers. The latest version of Angular material is 8.1.1

### 147. How do you upgrade location service of angularjs?

If you are using `$location` service in your old AngularJS application, now you can use `LocationUpgradeModule`(unified location service) which puts the responsibilities of `$location` service to `Location` service in Angular. Let's add this module to `AppModule` as below,
```javascript
// Other imports ...
import { LocationUpgradeModule } from '@angular/common/upgrade';

@NgModule({
  imports: [
    // Other NgModule imports...
    LocationUpgradeModule.config()
  ]
})
export class AppModule {}
```

### 148. What is NgUpgrade?

NgUpgrade is a library put together by the Angular team, which you can use in your applications to mix and match AngularJS and Angular components and bridge the AngularJS and Angular dependency injection systems.

### 149. How do you test Angular application using CLI?

Angular CLI downloads and install everything needed with the Jasmine Test framework. You just need to run `ng test` to see the test results. By default this command builds the app in watch mode, and launches the `Karma test runner`. The output of test results would be as below,
```bash
10% building modules 1/1 modules 0 active
...INFO [karma]: Karma v1.7.1 server started at http://0.0.0.0:9876/
...INFO [launcher]: Launching browser Chrome ...
...INFO [launcher]: Starting browser Chrome
...INFO [Chrome ...]: Connected on socket ...
Chrome ...: Executed 3 of 3 SUCCESS (0.135 secs / 0.205 secs)
```
**Note:** A chrome browser also opens and displays the test output in the "Jasmine HTML Reporter".

### 150. How to use polyfills in Angular application?

The Angular CLI provides support for polyfills officially. When you create a new project with the ng new command, a `src/polyfills.ts` configuration file is created as part of your project folder. This file includes the mandatory and many of the optional polyfills as JavaScript import statements. Let's categorize the polyfills,

1. **Mandatory polyfills:** These are installed automatically when you create your project with ng new command and the respective import statements enabled in 'src/polyfills.ts' file.
2. **Optional polyfills:** You need to install its npm package and then create import statement in 'src/polyfills.ts' file.
   For example, first you need to install below npm package for adding web animations (optional) polyfill.
       ```bash
        npm install --save web-animations-js
       ```
   and create import statement in polyfill file.
       ```javascript
       import 'web-animations-js';
       ```

---

Previous: [[Interview Questions 051-100|Questions 51–100]] · Next: [[Interview Questions 151-200|Questions 151–200]]

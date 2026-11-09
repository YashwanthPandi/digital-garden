---
title: Getting Started Interview Questions
tags:
  - Angular
  - Interview
---

16 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What is Angular Framework?

Angular is a **TypeScript-based open-source** front-end platform that makes it easy to build web, mobile and desktop applications. The major features of this framework include declarative templates, dependency injection, end to end tooling which ease application development.

### 2. What is the difference between AngularJS and Angular?

AngularJS (version 1.x) is a JavaScript framework, whereas Angular (version 2+) is a complete rewrite of AngularJS using TypeScript, providing better performance, mobile support, modularity, and a more modern architecture.

 Here are some of the major differences in tabular format:-

 | AngularJS | Angular |
 |---- | ---------
 | It is based on MVC architecture| This is based on Service/Controller|
 | It uses JavaScript to build the application| Uses TypeScript to build the application|
 | Based on controllers concept| This is a component based UI approach|
 | No support for mobile platforms| Fully supports mobile platforms|
 | Difficult to build SEO friendly application| Ease to build SEO friendly applications|

### 3. What is TypeScript?

TypeScript is a strongly typed superset of JavaScript created by Microsoft that adds optional types, classes, async/await and many other features, and compiles to plain JavaScript. Angular is written entirely in TypeScript as a primary language.
You can install TypeScript globally as
```cmd
npm install -g typescript
```
Let's see a simple example of TypeScript usage:-
```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Sudheer";

document.body.innerHTML = greeter(user);
```
The greeter method allows only string type as argument.

### 4. Write a pictorial diagram of Angular architecture?

The main building blocks of an Angular application are shown in the diagram below:-
![[aiq-architecture.png]]

### 5. What are the key components of Angular?

Angular has the key components below,
1. **Component:** These are the basic building blocks of an Angular application to control HTML views.
2. **Modules:** An Angular module is a set of angular basic building blocks like components, directives, services etc. An application is divided into logical pieces and each piece of code is called as "module" which perform a single task.
3. **Templates:** These represent the views of an Angular application.
4. **Services:** Are used to create components which can be shared across the entire application.
5. **Metadata:** This can be used to add more data to an Angular class.

### 6. What is metadata?

Metadata is used to decorate a class so that it can configure the expected behavior of the class. The metadata is represented by decorators
1. **Class decorators**, e.g. @Component and @NgModule
    ```typescript
    import { NgModule, Component } from '@angular/core';

    @Component({
      selector: 'my-component',
      template: '<div>Class decorator</div>',
    })
    export class MyComponent {
      constructor() {
        console.log('Hey I am a component!');
      }
    }

    @NgModule({
      imports: [],
      declarations: [],
    })
    export class MyModule {
      constructor() {
        console.log('Hey I am a module!');
      }
    }
    ```
2. **Property decorators** Used for properties inside classes, e.g. @Input and @Output
    ```typescript
    import { Component, Input } from '@angular/core';

    @Component({
        selector: 'my-component',
        template: '<div>Property decorator</div>'
    })

    export class MyComponent {
        @Input()
        title: string;
    }
    ```
3. **Method decorators** Used for methods inside classes, e.g. @HostListener
    ```typescript
    import { Component, HostListener } from '@angular/core';

    @Component({
        selector: 'my-component',
        template: '<div>Method decorator</div>'
    })
    export class MyComponent {
        @HostListener('click', ['$event'])
        onHostClick(event: Event) {
            // clicked, `event` available
        }
    }
    ```
4. **Parameter decorators** Used for parameters inside class constructors, e.g. @Inject, @Optional
    ```typescript
    import { Component, Inject } from '@angular/core';
    import { MyService } from './my-service';

    @Component({
        selector: 'my-component',
        template: '<div>Parameter decorator</div>'
    })
    export class MyComponent {
        constructor(@Inject(MyService) myService) {
            console.log(myService); // MyService
        }
    }

    // Angular v18 and above

    import { Component, inject } from '@angular/core';
    import { MyService } from './my-service';

    @Component({
        selector: 'my-component',
        template: '<div>Parameter decorator</div>'
    })
    export class MyComponent {
    myService: MyService = inject(MyService)
        constructor() {
            console.log(myService); // MyService
        }
    }
    ```

### 7. What is angular CLI?

Angular CLI(**Command Line Interface**) is a command line interface to scaffold and build angular apps using nodejs style (commonJs) modules.
You need to install using below npm command,
```
npm install @angular/cli@latest
```
Below are the list of few commands, which will come handy while creating angular projects
1. **Creating New Project:** ng new <project-name>

2. **Generating Components, Directives & Services:** ng generate/g <feature-name>
    The different types of commands would be,
    * ng generate class my-new-class: add a class to your application
    * ng generate component my-new-component: add a component to your application
    * ng generate directive my-new-directive: add a directive to your application
    * ng generate enum my-new-enum: add an enum to your application
    * ng generate module my-new-module: add a module to your application
    * ng generate pipe my-new-pipe: add a pipe to your application
    * ng generate service my-new-service: add a service to your application

3. **Running the Project:** ng serve

### 8. How do you describe various dependencies in angular application?

The dependencies section of package.json with in an angular application can be divided as follow,

1. **Angular packages:** Angular core and optional modules; their package names begin @angular/.
2. **Support packages:** Third-party libraries that must be present for Angular apps to run.
3. **Polyfill packages:** Polyfills plug gaps in a browser's JavaScript implementation.

### 9. What are the case types in Angular?

Angular uses capitalization conventions to distinguish the names of various types. Angular follows the list of the below case types.

1. **camelCase :** Symbols, properties, methods, pipe names, non-component directive selectors, constants uses lowercase on the first letter of the item. For example, "selectedUser"
2. **UpperCamelCase (or PascalCase):** Class names, including classes that define components, interfaces, NgModules, directives, and pipes uses uppercase on the first letter of the item.
3. **dash-case (or "kebab-case"):** The descriptive part of file names, component selectors uses dashes between the words. For example, "app-user-list".
4. **UPPER_UNDERSCORE_CASE:** All constants uses capital letters connected with underscores. For example, "NUMBER_OF_USERS".

### 10. What is Angular DSL?

A domain-specific language (DSL) is a computer language specialized to a particular application domain. Angular has its own Domain Specific Language (DSL) which allows us to write Angular specific html-like syntax on top of normal html. It has its own compiler that compiles this syntax to html that the browser can understand. This DSL is defined in NgModules such as animations, forms, and routing and navigation.

Basically you will see 3 main syntax in Angular DSL.

1. `()`: Used for Output and DOM events.
2. `[]`: Used for Input and specific DOM element attributes.
3. `*`: Structural directives(*ngFor or *ngIf) will affect/change the DOM structure.

### 11. What is platform in Angular?

A platform is the context in which an Angular application runs. The most common platform for Angular applications is a web browser, but it can also be an operating system for a mobile device, or a web server. The runtime-platform is provided by the @angular/platform-* packages and these packages allow applications that make use of `@angular/core` and `@angular/common` to execute in different environments.
i.e, Angular can be used as platform-independent framework in different environments, For example,

1. While running in the browser, it uses `platform-browser` package.
2. When SSR(server-side rendering ) is used, it uses `platform-server` package for providing web server implementation.

### 12. What are the differences of various versions of Angular?

There are different versions of Angular framework. Let's see the features of all the various versions,

1. **Angular 1:**
   * Angular 1 (AngularJS) is the first angular framework released in the year 2010.
   * AngularJS is not built for mobile devices.
   * It is based on controllers with MVC architecture.
2. **Angular 2:**
   * Angular 2 was released in the year 2016. Angular 2 is a complete rewrite of Angular1 version.
   * The performance issues that Angular 1 version had has been addressed in Angular 2 version.
   * Angular 2 is built from scratch for mobile devices unlike Angular 1 version.
   * Angular 2 is components based.
3. **Angular 3:**
   * The following are the different package versions in Angular 2:
     * @angular/core v2.3.0
     * @angular/compiler v2.3.0
     * @angular/http v2.3.0
     * @angular/router v3.3.0
   * The router package is already versioned 3 so to avoid confusion switched to Angular 4 version and skipped 3 version.
4. **Angular 4:**
   * The compiler generated code file size in AOT mode is very much reduced.
   * With Angular 4 the production bundles size is reduced by hundreds of KB’s.
   * Animation features are removed from angular/core and formed as a separate package.
   * Supports Typescript 2.1 and 2.2.
   * Angular Universal
   * New HttpClient
5. **Angular 5:**
   * Angular 5 makes angular faster. It improved the loading time and execution time.
   * Shipped with new build optimizer.
   * Supports Typescript 2.5.
   * Service Worker
6. **Angular 6:**
   * It is released in May 2018.
   * Includes Angular Command Line Interface (CLI), Component Development KIT (CDK), Angular Material Package, Angular Elements.
   * Service Worker bug fixes.
   * i18n
   * Experimental mode for Ivy.
   * RxJS 6.0
   * Tree Shaking
7. **Angular 7:**
   * It is released in October 2018.
   * TypeScript 3.1
   * RxJS 6.3
   * New Angular CLI
   * CLI Prompts capability provide an ability to ask questions to the user before they run. It is like interactive dialog between the user and the CLI
   * With the improved CLI Prompts capability, it helps developers to make the decision. New ng commands ask users for routing and CSS styles types(SCSS) and ng add @angular/material asks for themes and gestures or animations.
 8. **Angular 8:**
    * It is released in May 2019.
    * TypeScript 3.4
 9. **Angular 9:**
    * It is released in February 2020.
    * TypeScript 3.7
    * Ivy enabled by default
 10. **Angular 10:**
       * It is released in June 2020.
       * TypeScript 3.9
       * TSlib 2.0

### 13. What is the browser support for Angular?

Angular supports most recent browsers which includes both desktop and mobile browsers. As of Angular 13+, IE is no longer supported.

| Browser | Version |
|---- | --------- |
| Chrome | 2 most recent major versions |
| Firefox | 2 most recent major versions |
| Edge | 2 most recent major versions |
| Safari | 2 most recent major versions |
| iOS | 2 most recent major versions |
| Android | 2 most recent major versions |

### 14. What is standalone component?

A standalone component is a type of component which is not part of any Angular module. It provides a simplified way to build Angular applications.

### 15. How to create a standalone component using CLI command?

Generate a standalone component using the CLI command as shown below:
```bash
ng generate component component-name --standalone
```
On running the command standalone component is created.
Here is the list of file created.

1. `component-name.component.ts`
2. `component-name.component.css`
3. `component-name.component.spec`
4. `component-name.component.html`

Next need to update `app.module.ts` as shown below.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentNameComponent } from './component-name/component-name.component';

@NgModule({
  imports: [
    BrowserModule,
    ComponentNameComponent
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 16. How to create a standalone component manually?

To make existing component to standalone, then add `standalone: true` in `component-name.component.ts`
as shown below

```typescript
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-standalone-component',
  templateUrl: './standalone-component.component.html',
  styleUrls: ['./standalone-component.component.css'],
})
export class ComponentNameComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
```
Next need to update `app.module.ts` as shown below.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentNameComponent } from './component-name/component-name.component';

@NgModule({
  imports: [
    BrowserModule,
    ComponentNameComponent
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

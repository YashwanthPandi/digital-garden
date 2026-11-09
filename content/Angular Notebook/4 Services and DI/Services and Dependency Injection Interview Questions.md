---
title: Services and Dependency Injection Interview Questions
tags:
  - Angular
  - Interview
---

14 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What is a service?

A service is used when a common functionality needs to be provided to various modules. Services allow for greater separation of concerns for your application and better modularity by allowing you to extract common functionality out of components.

Let's create a repoService which can be used across components,

```typescript
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({ // The Injectable decorator is required for dependency injection to work
  // providedIn option registers the service with a specific NgModule
  providedIn: 'root',  // This declares the service with the root app (AppModule)
})
export class RepoService{
  constructor(private http: Http){
  }

  fetchAll(){
    return this.http.get('https://api.github.com/repositories');
  }
}
```
The above service uses Http service as a dependency.

### 2. What is dependency injection in Angular?

Dependency injection (DI), is an important application design pattern in which a class asks for dependencies from external sources rather than creating them itself. Angular comes with its own dependency injection framework for resolving dependencies( services or objects that a class needs to perform its function).So you can have your services depend on other services throughout your application.

### 3. How is Dependency Hierarchy formed?

Injectors in Angular have rules that can be leveraged to achieve the desired visibility of injectables in your applications. By understanding these rules, you can determine in which NgModule, Component, or Directive you should declare a provider.

#### Angular has two injector hierarchies:
![[aiq-injector-hierarchies.png]]

#### Module injector
When angular starts, it creates a root injector where the services will be registered, these are provided via injectable annotation. All services provided in the `ng-model` property are called providers (if those modules are not lazy-loaded).

Angular recursively goes through all models which are being used in the application and creates instances for provided services in the root injector. If you provide some service in an eagerly-loaded model, the service will be added to the root injector, which makes it available across the whole application.

#### Platform Module
During application bootstrapping angular creates a few more injectors, above the root injector goes the platform injector, this one is created by the platform browser dynamic function inside the `main.ts` file, and it provides some platform-specific features like `DomSanitizer`.

#### NullInjector()
At the very top, the next parent injector in the hierarchy is the `NullInjector()`.The responsibility of this injector is to throw the error if something tries to find dependencies there, unless you've used `@Optional()` because ultimately, everything ends at the `NullInjector()` and it returns an error or, in the case of `@Optional()`, `null`.

![[aiq-hierarchy-diagram.png]]

#### ElementInjector
Angular creates `ElementInjector` hierarchies implicitly for each DOM element. `ElementInjector` injector is being created for any tag that matches the angular component, or any tag on which directive is applied, and you can configure it in component and directive annotations inside the provider's property, thus, it creates its own hierarchy likewise the upper one.

![[aiq-element-injector-hieracrhy.png]]

### 4. What are the differences between AngularJS and Angular with respect to dependency injection?

Dependency injection is a common component in both AngularJS and Angular, but there are some key differences between the two frameworks in how it actually works.

  | AngularJS | Angular |
  |---- | ---------
  | Dependency injection tokens are always strings  | Tokens can have different types. They are often classes and sometimes can be strings. |
  | There is exactly one injector even though it is a multi-module applications | There is a tree hierarchy of injectors, with a root injector and an additional injector for each component. |

### 5. What is a DI token?

A DI token is a lookup token associated with a dependency provider in dependency injection system. The injector maintains an internal token-provider map that it references when asked for a dependency and the DI token is the key to the map. Let's take example of DI Token usage,

```javascript
const BASE_URL = new InjectionToken<string>('BaseUrl');
const injector =
   Injector.create({providers: [{provide: BASE_URL, useValue: 'http://some-domain.com'}]});
const url = injector.get(BASE_URL);
```

### 6. What is a provider?

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

### 7. What is the recommendation for provider scope?

You should always provide your service in the root injector unless there is a case where you want the service to be available only if you import a particular @NgModule.

### 8. How do you restrict provider scope to a module?

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

### 9. How do you provide a singleton service?

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

### 10. What are the different ways to remove duplicate service registration?

If a module defines provides and declarations then loading the module in multiple feature modules will duplicate the registration of the service. Below are the different ways to prevent this duplicate behavior.
1. Use the providedIn syntax instead of registering the service in the module.
2. Separate your services into their own module.
3. Define forRoot() and forChild() methods in the module.

### 11. How do you configure injectors with providers at different levels?

You can configure injectors with providers at different levels of your application by setting a metadata value. The configuration can happen in one of three places,
1. In the `@Injectable()` decorator for the service itself
2. In the `@NgModule()` decorator for an NgModule
3. In the `@Component()` decorator for a component

### 12. Is it mandatory to use injectable on every service class?

No. The `@Injectable()` decorator is not strictly required if the class has other Angular decorators on it or does not have any dependencies. But the important thing here is any class that is going to be injected with Angular is decorated.
i.e, If we add the decorator, the metadata `design:paramtypes` is added, and the dependency injection can do it's job. That is the exact reason to add the @Injectable() decorator on a service if this service has some dependencies itself.
For example, Let's see the different variations of AppService in a root component,
1. The below AppService can be injected in AppComponent without any problems. This is because there are no dependency services inside AppService.
    ```js
    export class AppService {
      constructor() {
        console.log('A new app service');
      }
    }
    ```
2. The below AppService with dummy decorator and httpService can be injected in AppComponent without any problems. This is because meta information is generated with dummy decorator.
    ```js
    function SomeDummyDecorator() {
      return (constructor: Function) => console.log(constructor);
    }

    @SomeDummyDecorator()
    export class AppService {
      constructor(http: HttpService) {
        console.log(http);
      }
    }
    ```
and the generated javascript code of above service has meta information about HttpService,
    ```js
    var AppService = (function () {
        function AppService(http) {
            console.log(http);
        }
        AppService = __decorate([
            core_1.Injectable(),
            __metadata('design:paramtypes', [http_service_1.HttpService])
        ], AppService);
        return AppService;
    }());
    exports.AppService = AppService;
    ```
3. The below AppService with @injectable decorator and httpService can be injected in AppComponent without any problems. This is because meta information is generated with Injectable decorator.
    ```js
    @Injectable({
      providedIn: 'root',
    })
    export class AppService {
      constructor(http: HttpService) {
        console.log(http);
      }
    }
    ```

### 13. What is an optional dependency?

The optional dependency is a parameter decorator to be used on constructor parameters, which marks the parameter as being an optional dependency. Due to this, the DI framework provides null if the dependency is not found.
For example, If you don't register a logger provider anywhere, the injector sets the value of logger(or logger service) to null in the below class.
```js
import { Optional } from '@angular/core';

constructor(@Optional() private logger?: Logger) {
  if (this.logger) {
    this.logger.log('This is an optional dependency message');
  } else {
    console.log('The logger is not registered');
  }
}
```

### 14. What are the types of injector hierarchies?

There are two types of injector hierarchies in Angular

1. **ModuleInjector hierarchy:** It configure on a module level using an @NgModule() or @Injectable() annotation.
2. **ElementInjector hierarchy:** It created implicitly at each DOM element. Also it is empty by default unless you configure it in the providers property on @Directive() or @Component().

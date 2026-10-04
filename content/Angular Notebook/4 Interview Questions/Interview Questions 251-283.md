---
title: Interview Questions 251–283
tags:
  - Angular
  - Interview
---

Part of [[Angular Notebook/4 Interview Questions/index|Angular interview questions]]. Source: [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

Previous: [[Interview Questions 201-250|Questions 201–250]]

### 251. How do you trigger an animation?

Angular provides a `trigger()` function for animation in order to collect the states and transitions with a specific animation name, so that you can attach it to the triggering element in the HTML template. This function watch for changes and trigger initiates the actions when a change occurs.
For example, let's create trigger named `upDown`, and attach it to the button element.
```js
content_copy
@Component({
  selector: 'app-up-down',
  animations: [
    trigger('upDown', [
      state('up', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('down', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('up => down', [
        animate('1s')
      ]),
      transition('down => up', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: 'up-down.component.html',
  styleUrls: ['up-down.component.css']
})
export class UpDownComponent {
  isUp = true;

  toggle() {
    this.isUp = !this.isUp;
  }

```

### 252. How do you configure injectors with providers at different levels?

You can configure injectors with providers at different levels of your application by setting a metadata value. The configuration can happen in one of three places,
1. In the `@Injectable()` decorator for the service itself
2. In the `@NgModule()` decorator for an NgModule
3. In the `@Component()` decorator for a component

### 253. Is it mandatory to use injectable on every service class?

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

### 254. What is an optional dependency?

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

### 255. What are the types of injector hierarchies?

There are two types of injector hierarchies in Angular

1. **ModuleInjector hierarchy:** It configure on a module level using an @NgModule() or @Injectable() annotation.
2. **ElementInjector hierarchy:** It created implicitly at each DOM element. Also it is empty by default unless you configure it in the providers property on @Directive() or @Component().

### 256. What are reactive forms?

Reactive forms is a model-driven approach for creating forms in a reactive style(form inputs changes over time). These are built around observable streams, where form inputs and values are provided as streams of input values. Let's follow the below steps to create reactive forms,
1. Register the reactive forms module which declares reactive-form directives in your app
    ```js
    import { ReactiveFormsModule } from '@angular/forms';

    @NgModule({
      imports: [
        // other imports ...
        ReactiveFormsModule
      ],
    })
    export class AppModule { }
    ```
2. Create a new FormControl instance and save it in the component.
    ```js
    import { Component } from '@angular/core';
    import { FormControl } from '@angular/forms';

    @Component({
      selector: 'user-profile',
      styleUrls: ['./user-profile.component.css']
    })
    export class UserProfileComponent {
      userName = new FormControl('');
    }
    ```
3. Register the FormControl in the template.
    ```js
    <label>
      User name:
      <input type="text" [formControl]="userName">
    </label>
    ```
Finally, the component with reactive form control appears as below,
```js
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'user-profile',
  styleUrls: ['./user-profile.component.css'],
  template: `
    <label>
      User name:
      <input type="text" [formControl]="userName">
    </label>
  `
})
export class UserProfileComponent {
  userName = new FormControl('');
}
```

### 257. What are dynamic forms?

Dynamic forms is a pattern in which we build a form dynamically based on metadata that describes a business object model. You can create them based on reactive form API.

### 258. What are template driven forms?

Template driven forms are model-driven forms where you write the logic, validations, controls etc, in the template part of the code using directives. They are suitable for simple scenarios and uses two-way binding with [(ngModel)] syntax.
For example, you can create register form easily by following the below simple steps,

1. Import the FormsModule into the Application module's imports array
    ```js
       import { BrowserModule } from '@angular/platform-browser';
       import { NgModule } from '@angular/core';
       import {FormsModule} from '@angular/forms'
       import { RegisterComponent } from './app.component';
       @NgModule({
         declarations: [
           RegisterComponent,
         ],
         imports: [
           BrowserModule,
           FormsModule
         ],
         providers: [],
         bootstrap: [RegisterComponent]
       })
       export class AppModule { }
    ```
2. Bind the form from template to the component using ngModel syntax
    ```html
    <input type="text" class="form-control" id="name"
      required
      [(ngModel)]="model.name" name="name">
    ```
3.  Attach NgForm directive to the <form> tag in order to create FormControl instances and register them
    ```js
    <form #registerForm="ngForm">
    ```
4. Apply the validation message for form controls
    ```html
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name"
           required
           [(ngModel)]="model.name" name="name"
           #name="ngModel">
    <div [hidden]="name.valid || name.pristine"
         class="alert alert-danger">
      Please enter your name
    </div>
    ```
5. Let's submit the form with ngSubmit directive and add type="submit" button at the bottom of the form to trigger form submit.
    ```html
    <form (ngSubmit)="onSubmit()" #heroForm="ngForm">
    // Form goes here
    <button type="submit" class="btn btn-success" [disabled]="!registerForm.form.valid">Submit</button>
    ```
Finally, the completed template-driven registration form will be appeared as follow.
```html
<div class="container">
  <h1>Registration Form</h1>
  <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
    <div class="form-group">
      <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel">
        <div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Please enter your name
        </div>
    </div>
    <button type="submit" class="btn btn-success" [disabled]="!registerForm.form.valid">Submit</button>
    </form>
</div>
```

### 259. What are the differences between reactive forms and template driven forms?

Below are the main differences between reactive forms and template driven forms

| Feature | Reactive | Template-Driven |
|---- |---- | --------- |
| Form model setup | Created(FormControl instance) in component explicitly | Created by directives  |
| Data updates | Synchronous | Asynchronous |
| Form custom validation | Defined as Functions | Defined as Directives |
| Testing | No interaction with change detection cycle | Need knowledge of the change detection process |
| Mutability | Immutable(by always returning new value for FormControl instance) | Mutable(Property always modified to new value) |
| Scalability | More scalable using low-level APIs | Less scalable using due to abstraction on APIs|

### 260. What are the different ways to group form controls?

Reactive forms provide two ways of grouping multiple related controls.
1. **FormGroup**: It defines a form with a fixed set of controls those can be managed together in an one object. It has same properties and methods similar to a FormControl instance.
   This FormGroup can be nested to create complex forms as below.
   ```js
   import { Component } from '@angular/core';
   import { FormGroup, FormControl } from '@angular/forms';

   @Component({
     selector: 'user-profile',
     templateUrl: './user-profile.component.html',
     styleUrls: ['./user-profile.component.css']
   })
   export class UserProfileComponent {
     userProfile = new FormGroup({
       firstName: new FormControl(''),
       lastName: new FormControl(''),
       address: new FormGroup({
             street: new FormControl(''),
             city: new FormControl(''),
             state: new FormControl(''),
             zip: new FormControl('')
           })
     });

     onSubmit() {
       // Store this.userProfile.value in DB
     }
   }
   ```
   ```html
   <form [formGroup]="userProfile" (ngSubmit)="onSubmit()">

     <label>
       First Name:
       <input type="text" formControlName="firstName">
     </label>

     <label>
       Last Name:
       <input type="text" formControlName="lastName">
     </label>

     <div formGroupName="address">
       <h3>Address</h3>

       <label>
         Street:
         <input type="text" formControlName="street">
       </label>

       <label>
         City:
         <input type="text" formControlName="city">
       </label>

       <label>
         State:
         <input type="text" formControlName="state">
       </label>

       <label>
         Zip Code:
         <input type="text" formControlName="zip">
       </label>
      </div>
       <button type="submit" [disabled]="!userProfile.valid">Submit</button>

   </form>
   ```
2. **FormArray:** It defines a dynamic form in an array format, where you can add and remove controls at run time. This is useful for dynamic forms when you don’t know how many controls will be present within the group.
      ```js
       import { Component } from '@angular/core';
       import { FormArray, FormControl } from '@angular/forms';

       @Component({
         selector: 'order-form',
         templateUrl: './order-form.component.html',
         styleUrls: ['./order-form.component.css']
       })
       export class OrderFormComponent {
         constructor () {
           this.orderForm = new FormGroup({
             firstName: new FormControl('John', Validators.minLength(3)),
             lastName: new FormControl('Rodson'),
             items: new FormArray([
               new FormControl(null)
             ])
           });
         }

         onSubmitForm () {
           // Save the items this.orderForm.value in DB
         }

         onAddItem () {
           this.orderForm.controls
           .items.push(new FormControl(null));
         }

         onRemoveItem (index) {
           this.orderForm.controls['items'].removeAt(index);
         }
       }
      ```
      ```html
      <form [formGroup]="orderForm" (ngSubmit)="onSubmit()">

        <label>
          First Name:
          <input type="text" formControlName="firstName">
        </label>

        <label>
          Last Name:
          <input type="text" formControlName="lastName">
        </label>

        <div>
        <p>Add items</p>
        <ul formArrayName="items">
          <li *ngFor="let item of orderForm.controls.items.controls; let i = index">
            <input type="text" formControlName="{{i}}">
            <button type="button" title="Remove Item" (click)="onRemoveItem(i)">Remove</button>
          </li>
        </ul>
        <button type="button" (click)="onAddItem">
          Add an item
        </button>
       </div>
      ```

### 261. How do you update specific properties of a form model?

You can use `patchValue()` method to update specific properties defined in the form model. For example,you can update the name and street of certain profile on click of the update button as shown below.
```js
updateProfile() {
  this.userProfile.patchValue({
    firstName: 'John',
    address: {
      street: '98 Crescent Street'
    }
  });
}
```
```html
  <button (click)="updateProfile()">Update Profile</button>
```

You can also use `setValue` method to update properties.

**Note:** Remember to update the properties against the exact model structure.

### 262. What is the purpose of FormBuilder?

FormBuilder is used as syntactic sugar for easily creating instances of a FormControl, FormGroup, or FormArray. This is helpful to reduce the amount of boilerplate needed to build complex reactive forms. It is available as an injectable helper class of the `@angular/forms` package.

For example, the user profile component creation becomes easier as shown here.
```js
export class UserProfileComponent {
  profileForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });
  constructor(private formBuilder: FormBuilder) { }
  }
```

### 263. How do you verify the model changes in forms?

You can add a getter property(let's say, diagnostic) inside component to return a JSON representation of the model during the development. This is useful to verify whether the values are really flowing from the input box to the model and vice versa or not.
```js
export class UserProfileComponent {

  model = new User('John', 29, 'Writer');

  // TODO: Remove after the verification
  get diagnostic() { return JSON.stringify(this.model); }
}
```
and add `diagnostic` binding near the top of the form
```html
{{diagnostic}}
<div class="form-group">
  // FormControls goes here
</div>
```

### 264. What are the state CSS classes provided by ngModel?

The ngModel directive updates the form control with special Angular CSS classes to reflect it's state. Let's find the list of classes in a tabular format,

| Form control state | If true | If false |
|---- | --------- | --- |
| Visited | ng-touched | ng-untouched |
| Value has changed | ng-dirty  | ng-pristine |
| Value is valid|  ng-valid | ng-invalid |

### 265. How do you reset the form?

In a model-driven form, you can reset the form just by calling the function `reset()` on our form model.
For example, you can reset the form model on submission as follows,
```js
onSubmit() {
  if (this.myform.valid) {
    console.log("Form is submitted");
    // Perform business logic here
    this.myform.reset();
  }
}
```
Now, your form model resets the form back to its original pristine state.

### 266. What are the types of validator functions?

In reactive forms, the validators can be either synchronous or asynchronous functions,
1. **Sync validators:** These are the synchronous functions which take a control instance and immediately return either a set of validation errors or null. Also, these functions passed as second argument while instantiating the form control. The main use cases are simple checks like whether a field is empty, whether it exceeds a maximum length etc.
2. **Async validators:** These are the asynchronous functions which take a control instance and return a Promise or Observable that later emits a set of validation errors or null. Also, these functions passed as second argument while instantiating the form control. The main use cases are complex validations like hitting a server to check the availability of a username or email.

The representation of these validators looks like below
```js
this.myForm = formBuilder.group({
    firstName: ['value'],
    lastName: ['value', *Some Sync validation function*],
    email: ['value', *Some validation function*, *Some asynchronous validation function*]
});
```

### 267. Can you give an example of built-in validators?

In reactive forms, you can use built-in validator like `required` and `minlength` on your input form controls. For example, the registration form can have these validators on name input field
```js
this.registrationForm = new FormGroup({
    'name': new FormControl(this.hero.name, [
      Validators.required,
      Validators.minLength(4),
    ])
  });
```
Whereas in template-driven forms, both `required` and `minlength` validators available as attributes.

### 268. How do you optimize the performance of async validators?

Since all validators run after every form value change, it creates a major impact on performance with async validators by hitting the external API on each keystroke. This situation can be avoided by delaying the form validity by changing the updateOn property from change (default) to submit or blur.
The usage would be different based on form types,
1. **Template-driven forms:** Set the property on `ngModelOptions` directive
    ```html
    <input [(ngModel)]="name" [ngModelOptions]="{updateOn: 'blur'}">
    ```
2. **Reactive-forms:** Set the property on FormControl instance
    ```js
    name = new FormControl('', {updateOn: 'blur'});
    ```

### 269. How to set ngFor and ngIf on the same element?

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

### 270. What is host property in css?

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

### 271. How do you get the current route?

In Angular, there is an `url` property of router package to get the current route. You need to follow the below few steps,

1. Import Router from @angular/router
 ```js
   import { Router } from '@angular/router';
 ```
2. Inject router inside constructor
 ```js
 constructor(private router: Router ) {

 }
 ```
3. Access url parameter
 ```js
   console.log(this.router.url); //  /routename
 ```

### 272. What is Component Test Harnesses?

A component harness is a testing API around an Angular directive or component to make tests simpler by hiding implementation details from test suites. This can be shared between unit tests, integration tests, and end-to-end tests. The idea for component harnesses comes from the **PageObject** pattern commonly used for integration testing.

### 273. What is the benefit of Automatic Inlining of Fonts?

During compile time, Angular CLI will download and inline the fonts that your application is using. This performance update speed up the first contentful paint(FCP) and this feature is enabled by default in apps built with version 11.

### 274. What is content projection?

Content projection is a pattern in which you insert, or project, the content you want to use inside another component.

### 275. What is ng-content and its purpose?

The ng-content is used to insert the content dynamically inside the component that helps to increase component reusability.

### 276. What is standalone component?

A standalone component is a type of component which is not part of any Angular module. It provides a simplified way to build Angular applications.

### 277. How to create a standalone component using CLI command?

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

### 278. How to create a standalone component manually?

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

### 279. What is hydration?

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

### 280. What are Angular Signals?

A signal is a wrapper around a value that can notify interested consumers when that value changes. Signals can contain any value, from simple primitives to complex data structures.

### 281. Explain Angular Signals with an example.

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

### 282. What are the Route Parameters? Could you explain each of them?.

Route parameters are used to pass dynamic values in the URL of a route. They allow you to define variable segments in the route path, which can be accessed and used by components and services. Path parameters are represented by a colon (":") followed by the parameter name.

There are three types of route parameters in Angular:

**Path parameters:** Path parameters are used to define dynamic segments in the URL path. They are specified as part of the route's path and are extracted from the actual URL when navigating to that route. Path parameters are represented by a colon (":") followed by the parameter name. For example:

```typescript
{ path: 'users/:id', component: UserComponent }
```

In this example, ":id" is the path parameter. When navigating to a URL like "/users/123", the value "123" will be extracted and can be accessed in the UserComponent.

**Query parameters:** Query parameters are used to pass additional information in the URL as key-value pairs. They are appended to the URL after a question mark ("?") and can be accessed by components and services. Query parameters are not part of the route path, but they provide additional data to the route. For example:

```typescript
{ path: 'search', component: SearchComponent }
```

In this example, a URL like "/search?query=angular" contains a query parameter "query" with the value "angular". The SearchComponent can retrieve the value of the query parameter and use it for searching.

**Optional parameters:** Optional parameters are used when you want to make a route parameter optional. They are represented by placing a question mark ("?") after the parameter name. Optional parameters can be useful when you have routes with varying parameters. For example:

```typescript
{ path: 'products/:id/:category?', component: ProductComponent }
```

In this example, the ":category" parameter is optional. The ProductComponent can be accessed with URLs like "/products/123" or "/products/123/electronics". If the ":category" parameter is present in the URL, it will be available in the component, otherwise, it will be undefined.

Route parameters provide a flexible way to handle dynamic data in your Angular application. They allow you to create routes that can be easily customized and provide a seamless user experience by reflecting the current state of the application in the URL.

### 283. What is NgRx?

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

Previous: [[Interview Questions 201-250|Questions 201–250]]

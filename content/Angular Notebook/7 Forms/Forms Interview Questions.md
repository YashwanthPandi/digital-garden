---
title: Forms Interview Questions
tags:
  - Angular
  - Interview
---

13 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What are reactive forms?

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

### 2. What are dynamic forms?

Dynamic forms is a pattern in which we build a form dynamically based on metadata that describes a business object model. You can create them based on reactive form API.

### 3. What are template driven forms?

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

### 4. What are the differences between reactive forms and template driven forms?

Below are the main differences between reactive forms and template driven forms

| Feature | Reactive | Template-Driven |
|---- |---- | --------- |
| Form model setup | Created(FormControl instance) in component explicitly | Created by directives  |
| Data updates | Synchronous | Asynchronous |
| Form custom validation | Defined as Functions | Defined as Directives |
| Testing | No interaction with change detection cycle | Need knowledge of the change detection process |
| Mutability | Immutable(by always returning new value for FormControl instance) | Mutable(Property always modified to new value) |
| Scalability | More scalable using low-level APIs | Less scalable using due to abstraction on APIs|

### 5. What are the different ways to group form controls?

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

### 6. How do you update specific properties of a form model?

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

### 7. What is the purpose of FormBuilder?

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

### 8. How do you verify the model changes in forms?

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

### 9. What are the state CSS classes provided by ngModel?

The ngModel directive updates the form control with special Angular CSS classes to reflect it's state. Let's find the list of classes in a tabular format,

| Form control state | If true | If false |
|---- | --------- | --- |
| Visited | ng-touched | ng-untouched |
| Value has changed | ng-dirty  | ng-pristine |
| Value is valid|  ng-valid | ng-invalid |

### 10. How do you reset the form?

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

### 11. What are the types of validator functions?

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

### 12. Can you give an example of built-in validators?

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

### 13. How do you optimize the performance of async validators?

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

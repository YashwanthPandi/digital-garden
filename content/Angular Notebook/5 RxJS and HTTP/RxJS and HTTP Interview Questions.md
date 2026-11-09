---
title: RxJS and HTTP Interview Questions
tags:
  - Angular
  - Interview
---

23 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What are observables?

Observables are declarative which provide support for passing messages between publishers and subscribers in your application. They are mainly used for event handling, asynchronous programming, and handling multiple values. In this case, you define a function for publishing values, but it is not executed until a consumer subscribes to it. The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.

### 2. What is HttpClient and its benefits?

Most of the Front-end applications communicate with backend services over `HTTP` protocol using either `XMLHttpRequest` interface or the `fetch()` API. Angular provides a simplified client HTTP API known as `HttpClient` which is based on top of `XMLHttpRequest` interface. This client is available from `@angular/common/http` package.
You can import in your root module as below:

```javascript
import { HttpClientModule } from '@angular/common/http';
```

The major advantages of HttpClient can be listed as below,
1. Contains testability features
2. Provides typed request and response objects
3. Intercept request and response
4. Supports Observable APIs
5. Supports streamlined error handling

### 3. Explain on how to use `HttpClient` with an example?

Below are the steps need to be followed for the usage of `HttpClient`.
1. Import `HttpClient` into root module:
    ```javascript
    import { HttpClientModule } from '@angular/common/http';
    @NgModule({
      imports: [
        BrowserModule,
        // import HttpClientModule after BrowserModule.
        HttpClientModule,
      ],
      ......
      })
     export class AppModule {}
    ```
2. Inject the `HttpClient` into the application:
    Let's create a userProfileService(`userprofile.service.ts`) as an example. It also defines get method of `HttpClient`:
    ```javascript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    const userProfileUrl: string = 'assets/data/profile.json';

    @Injectable()
    export class UserProfileService {
      constructor(private http: HttpClient) { }

      getUserProfile() {
        return this.http.get(this.userProfileUrl);
      }
    }
    ```
3. Create a component for subscribing service:
    Let's create a component called UserProfileComponent(`userprofile.component.ts`), which injects `UserProfileService` and invokes the service method:
    ```javascript
    fetchUserProfile() {
      this.userProfileService.getUserProfile()
        .subscribe((data: User) => this.user = {
            id: data['userId'],
            name: data['firstName'],
            city:  data['city']
        });
    }
    ```
Since the above service method returns an Observable which needs to be subscribed in the component.

### 4. How can you read full response?

The response body doesn't or may not return full response data because sometimes servers also return special headers or status code, which are important for the application workflow. In order to get the full response, you should use `observe` option from `HttpClient`:

```javascript
getUserResponse(): Observable<HttpResponse<User>> {
  return this.http.get<User>(
    this.userUrl, { observe: 'response' });
}
```
Now `HttpClient.get()` method returns an Observable of typed `HttpResponse` rather than just the `JSON` data.

### 5. How do you perform Error handling?

If the request fails on the server or fails to reach the server due to network issues, then `HttpClient` will return an error object instead of a successful response. In this case, you need to handle in the component by passing `error` object as a second callback to `subscribe()` method.

Let's see how it can be handled in the component with an example,
```javascript
fetchUser() {
  this.userService.getProfile()
    .subscribe(
      (data: User) => this.userProfile = { ...data }, // success path
      error => this.error = error // error path
    );
}
```
It is always a good idea to give the user some meaningful feedback instead of displaying the raw error object returned from `HttpClient`.

### 6. What is RxJS?

RxJS is a library for composing asynchronous and callback-based code in a functional, reactive style using Observables. Many APIs such as  HttpClient produce and consume RxJS Observables and also uses operators for processing observables.

For example, you can import observables and operators for using HttpClient as below,
```javascript
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
```

### 7. What is subscribing?

An Observable instance begins publishing values only when someone subscribes to it. So you need to subscribe by calling the `subscribe()` method of the instance, passing an observer object to receive the notifications.

Let's take an example of creating and subscribing to a simple observable, with an observer that logs the received message to the console.
```javascript
// Creates an observable sequence of 5 integers, starting from 1
const source = range(1, 5);

// Create observer object
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// Execute with the observer object and Prints out each item
source.subscribe(myObserver);
// => Observer got a next value: 1
// => Observer got a next value: 2
// => Observer got a next value: 3
// => Observer got a next value: 4
// => Observer got a next value: 5
// => Observer got a complete notification
```

### 8. What is an observable?

An Observable is a unique Object similar to a Promise that can help manage async code. Observables are not part of the JavaScript language so we need to rely on a popular Observable library called RxJS.
The observables are created using new keyword.

Let see the simple example of observable,
```javascript
import { Observable } from 'rxjs';

const observable = new Observable(observer => {
  setTimeout(() => {
    observer.next('Hello from a Observable!');
  }, 2000);
});
```

### 9. What is an observer?

Observer is an interface for a consumer of push-based notifications delivered by an Observable. It has below structure,

```javascript
interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}
```
A handler that implements the Observer interface for receiving observable notifications will be passed as a parameter for observable as below,

```javascript
myObservable.subscribe(myObserver);
```
**Note:** If you don't supply a handler for a notification type, the observer ignores notifications of that type.

### 10. What is the difference between promise and observable?

Below are the list of differences between promise and observable:

   | Observable | Promise |
   |---- | --------- |
   | Declarative: Computation does not start until subscription, so they can run whenever you need the result | Executes immediately on creation|
   | Provides multiple values over time | Provides only one |
   | Subscribe method is used for error handling that facilitates centralized and predictable error handling | Push errors to the child promises |
   | Provides chaining and subscription to handle complex applications | Uses only `.then()` clause |

### 11. What is multicasting?

Multi-casting is the practice of broadcasting to a list of multiple subscribers in a single execution.

Let's demonstrate the multi-casting feature:
```javascript
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// These are, under the hood, `subject.subscribe({...})`:
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

// This is, under the hood, `s
```

### 12. How do you perform error handling in observables?

You can handle errors by specifying an **error callback** on the observer instead of relying on `try`/`catch`, which are ineffective in asynchronous environment.

For example, you can define error callback as below,
```javascript
myObservable.subscribe({
  next(num) { console.log('Next num: ' + num)},
  error(err) { console.log('Received an error: ' + err)}
});
```

### 13. What is the shorthand notation for subscribe method?

The `subscribe()` method can accept callback function definitions in line, for `next`, `error`, and `complete` handlers. It is known as shorthand notation or Subscribe method with positional arguments.

For example, you can define subscribe method as below,
```javascript
myObservable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```

### 14. What are the utility functions provided by RxJS?

The RxJS library also provides below utility functions for creating and working with observables.

1. Converting existing code for async operations into observables
2. Iterating through the values in a stream
3. Mapping values to different types
4. Filtering streams
5. Composing multiple streams

### 15. What are observable creation functions?

RxJS provides creation functions for the process of creating observables from promises, events, timers and Ajax requests. Let us explain each of them with an example:
1. Create an observable from a promise
    ```javascript
    import { from } from 'rxjs'; // from function
    const data = from(fetch('/api/endpoint')); //Created from Promise
    data.subscribe({
     next(response) { console.log(response); },
     error(err) { console.error('Error: ' + err); },
     complete() { console.log('Completed'); }
    });
    ```
2. Create an observable that creates an AJAX request
    ```javascript
    import { ajax } from 'rxjs/ajax'; // ajax function
    const apiData = ajax('/api/data'); // Created from AJAX request
    // Subscribe to create the request
    apiData.subscribe(res => console.log(res.status, res.response));
    ```
3. Create an observable from a counter
    ```javascript
    import { interval } from 'rxjs'; // interval function
    const secondsCounter = interval(1000); // Created from Counter value
    secondsCounter.subscribe(n =>
      console.log(`Counter value: ${n}`));
    ```
4. Create an observable from an event
    ```javascript
    import { fromEvent } from 'rxjs';
    const el = document.getElementById('custom-element');
    const mouseMoves = fromEvent(el, 'mousemove');
    const subscription = mouseMoves.subscribe((e: MouseEvent) => {
      console.log(`Coordnitaes of mouse pointer: ${e.clientX} * ${e.clientY}`);
      });
    ```

### 16. What will happen if you do not supply handler for the observer?

Usually, an observer object can define any combination of `next`, `error`, and `complete` notification type handlers. If you don't supply a handler for a notification type, the observer just ignores notifications of that type.

---

### 17. What is an RxJS Subject in Angular?

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

### 18. How do you pass headers for HTTP client?

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

### 19. What are Http Interceptors?

Http Interceptors are part of @angular/common/http, which inspect and transform HTTP requests from your application to the server and vice-versa on HTTP responses. These interceptors can perform a variety of implicit tasks, from authentication to logging.

The syntax of HttpInterceptor interface looks like as below,

```javascript
interface HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
}
```
You can use interceptors by declaring a service class that implements the intercept() method of the HttpInterceptor interface.

```javascript
@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        ...
    }
}
```
After that you can use it in your module,

```javascript
@NgModule({
    ...
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyInterceptor,
            multi: true
        }
    ]
    ...
})
export class AppModule {}
```

### 20. What are the applications of HTTP interceptors?

The HTTP Interceptors can be used for different variety of tasks,

1. Authentication
2. Logging
3. Caching
4. Fake backend
5. URL transformation
6. Modifying headers

### 21. Are multiple interceptors supported in Angular?

Yes, Angular supports multiple interceptors at a time. You could define multiple interceptors in providers property:
```javascript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: MyFirstInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MySecondInterceptor, multi: true }
],
```
The interceptors will be called in the order in which they were provided. i.e, MyFirstInterceptor will be called first in the above interceptors configuration.

### 22. How can I use interceptor for an entire application?

You can use same instance of `HttpInterceptors` for the entire app by importing the `HttpClientModule` only in your AppModule, and add the interceptors to the root application injector.
For example, let's define a class that is injectable in root application.
 ```javascript
 @Injectable()
 export class MyInterceptor implements HttpInterceptor {
   intercept(
     req: HttpRequest<any>,
     next: HttpHandler
   ): Observable<HttpEvent<any>> {

     return next.handle(req).do(event => {
       if (event instanceof HttpResponse) {
            // Code goes here
       }
     });

   }
 }
 ```
After that import HttpClientModule in AppModule
```javascript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 23. What is the reason for No provider for HTTP exception?

This exception is due to missing HttpClientModule in your module. You just need to import in module as below,
```javascript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

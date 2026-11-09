---
title: Security and Testing Interview Questions
tags:
  - Angular
  - Interview
---

19 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. How to inject the dynamic script in angular?

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

### 2. How do you test Angular application using CLI?

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

### 3. What are the security principles in angular?

Below are the list of security principles in angular,

   1.  You should avoid direct use of the DOM APIs.
   2.  You should enable Content Security Policy (CSP) and configure your web server to return appropriate CSP HTTP headers.
   3.  You should Use the offline template compiler.
   4.  You should Use Server Side XSS protection.
   5.  You should Use DOM Sanitizer.
   6.  You should Preventing CSRF or XSRF attacks.

### 4. What are the best practices for security in angular?

Below are the best practices of security in angular,

1. Use the latest Angular library releases
2. Don't modify your copy of Angular
3. Avoid Angular APIs marked in the documentation as “Security Risk.”

### 5. What is Angular security model for preventing XSS attacks?

Angular treats all values as untrusted by default. i.e, Angular sanitizes and escapes untrusted values When a value is inserted into the DOM from a template, via property, attribute, style, class binding, or interpolation.

### 6. What is the role of template compiler for prevention of XSS attacks?

The offline template compiler prevents vulnerabilities caused by template injection, and greatly improves application performance. So it is recommended to use offline template compiler in production deployments without dynamically generating any template.

### 7. What are the various security contexts in Angular?

Angular defines the following security contexts for sanitization,

1. **HTML:** It is used when interpreting a value as HTML such as binding to innerHtml.
2. **Style:** It is used when binding CSS into the style property.
3. **URL:** It is used for URL properties such as `<a href>`.
4. **Resource URL:** It is a URL that will be loaded and executed as code such as `<script src>`.

### 8. What is Sanitization? Does Angular support it?

**Sanitization** is the inspection of an untrusted value, turning it into a value that's safe to insert into the DOM. Yes, Angular supports sanitization. It sanitizes untrusted values for HTML, styles, and URLs but sanitizing resource URLs isn't possible because they contain arbitrary code.

### 9. What is the purpose of innerHTML?

The innerHtml is a property of HTML-Elements, which allows you to set it's html-content programmatically. Let's display the below html code snippet in a `<div>` tag as below using innerHTML binding,

```html
<div [innerHTML]="htmlSnippet"></div>
```
and define the htmlSnippet property from any component
```javascript
export class myComponent {
  htmlSnippet: string = '<b>Hello World</b>, Angular';
}
```
Unfortunately this property could cause Cross Site Scripting (XSS) security bugs when improperly handled.

### 10. What is the difference between interpolated content and innerHTML?

The main difference between interpolated and innerHTML code is the behavior of code interpreted. Interpolated content is always escaped i.e,  HTML isn't interpreted and the browser displays angle brackets in the element's text content. Where as in innerHTML binding, the content is interpreted i.e, the browser will convert < and > characters as HTMLEntities. For example, the usage in template would be as below,

```html
<p>Interpolated value:</p>
<div >{{htmlSnippet}}</div>
<p>Binding of innerHTML:</p>
<div [innerHTML]="htmlSnippet"></div>
```
and the property defined in a component.

```javascript
export class InnerHtmlBindingComponent {
  htmlSnippet = 'Template <script>alert("XSS Attack")</script> <b>Code attached</b>';
}
```
Even though innerHTML binding create a chance of XSS attack, Angular recognizes the value as unsafe and automatically sanitizes it.

### 11. How do you prevent automatic sanitization?

Sometimes the applications genuinely need to include executable code such as displaying `<iframe>` from an URL. In this case, you need to prevent automatic sanitization in Angular by saying that you inspected a value, checked how it was generated, and made sure it will always be secure. Basically it involves 2 steps,

1. Inject DomSanitizer: You can inject DomSanitizer in component as parameter in constructor
2. Mark the trusted value by calling some of the below methods

    1. bypassSecurityTrustHtml
    2. bypassSecurityTrustScript
    3. bypassSecurityTrustStyle
    4. bypassSecurityTrustUrl
    5. bypassSecurityTrustResourceUrl

For example,The  usage of dangerous url to trusted url would be as below,

```javascript
constructor(private sanitizer: DomSanitizer) {
  this.dangerousUrl = 'javascript:alert("XSS attack")';
  this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
```

### 12. Is it safe to use direct DOM API methods in terms of security?

No,the built-in browser DOM APIs or methods don't automatically protect you from security vulnerabilities. In this case it is recommended to use Angular templates instead of directly interacting with DOM. If it is unavoidable then use the built-in Angular sanitization functions.

### 13. What is DOM sanitizer?

`DomSanitizer` is used to help preventing Cross Site Scripting Security bugs (XSS) by sanitizing values to be safe to use in the different DOM contexts.

### 14. How do you support server side XSS protection in Angular application?

The server-side XSS protection is supported in an angular application by using a templating language that automatically escapes values to prevent XSS vulnerabilities on the server. But don't use a templating language to generate Angular templates on the server side which creates a high risk of introducing template-injection vulnerabilities.

### 15. Does Angular prevent HTTP level vulnerabilities?

Angular has built-in support for preventing http level vulnerabilities such as as cross-site request forgery (CSRF or XSRF) and cross-site script inclusion (XSSI). Even though these vulnerabilities need to be mitigated on server-side, Angular provides helpers to make the integration easier on the client side.
1. HttpClient supports a token mechanism used to prevent XSRF attacks
2. HttpClient library recognizes the convention of prefixed JSON responses(which non-executable js code with ")]}',\\n" characters) and automatically strips the string ")]}',\\n" from all responses before further parsing

### 16. What is TestBed?

TestBed is an api for writing unit tests for Angular applications and it's libraries. Even though We still write our tests in Jasmine and run using Karma, this API provides an easier way to create components, handle injection, test asynchronous behaviour and interact with our application.

### 17. What is protractor?

Protractor is an end-to-end test framework for Angular and AngularJS applications. It runs tests against your application running in a real browser, interacting with it as a user would.
```javascript
npm install -g protractor
```

### 18. What are type safe TestBed API changes in Angular9?

Angular 9 provides type safe changes in TestBed API changes by replacing the old get function with the new inject method. Because TestBed.get method is not type-safe. The usage would be as below,
```javascript
TestBed.get(ChangeDetectorRef) // returns any. It is deprecated now.

TestBed.inject(ChangeDetectorRef) // returns ChangeDetectorRef
```

### 19. What is Component Test Harnesses?

A component harness is a testing API around an Angular directive or component to make tests simpler by hiding implementation details from test suites. This can be shared between unit tests, integration tests, and end-to-end tests. The idea for component harnesses comes from the **PageObject** pattern commonly used for integration testing.

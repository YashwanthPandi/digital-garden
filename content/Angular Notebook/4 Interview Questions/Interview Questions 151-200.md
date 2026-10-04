---
title: Interview Questions 151–200
tags:
  - Angular
  - Interview
---

Part of [[Angular Notebook/4 Interview Questions/index|Angular interview questions]]. Source: [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

Previous: [[Interview Questions 101-150|Questions 101–150]] · Next: [[Interview Questions 201-250|Questions 201–250]]

### 151. What are the ways to trigger change detection in Angular?

You can inject either ApplicationRef or NgZone, or ChangeDetectorRef into your component and apply below specific methods to trigger change detection in Angular. i.e, There are 3 possible ways,

1. **ApplicationRef.tick():** Invoke this method to explicitly process change detection and its side-effects. It check the full component tree.
2. **NgZone.run(callback):** It evaluate the callback function inside the Angular zone.
3. **ChangeDetectorRef.detectChanges():** It detects only the components and it's children.

### 152. What are the differences of various versions of Angular?

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

### 153. What are the security principles in angular?

Below are the list of security principles in angular,

   1.  You should avoid direct use of the DOM APIs.
   2.  You should enable Content Security Policy (CSP) and configure your web server to return appropriate CSP HTTP headers.
   3.  You should Use the offline template compiler.
   4.  You should Use Server Side XSS protection.
   5.  You should Use DOM Sanitizer.
   6.  You should Preventing CSRF or XSRF attacks.

### 154. What is the reason to deprecate Web Tracing Framework?

Angular has supported the integration with the Web Tracing Framework (WTF) for the purpose of performance testing. Since it is not well maintained and failed in majority of the applications, the support is deprecated in latest releases.

### 155. What is the reason to deprecate web worker packages?

Both `@angular/platform-webworker` and `@angular/platform-webworker-dynamic` are officially deprecated, the Angular team realized it's not good practice to run the Angular application on Web worker

### 156. How do you find angular CLI version?

Angular CLI provides it's installed version using below different ways using ng command,

```bash
ng v
ng version
ng -v
ng --version
```
and the output would be as below,

```bash
Angular CLI: 1.6.3
Node: 8.11.3
OS: darwin x64
Angular:
...
```

### 157. What is the browser support for Angular?

Angular supports most recent browsers which includes both desktop and mobile browsers. As of Angular 13+, IE is no longer supported.

| Browser | Version |
|---- | --------- |
| Chrome | 2 most recent major versions |
| Firefox | 2 most recent major versions |
| Edge | 2 most recent major versions |
| Safari | 2 most recent major versions |
| iOS | 2 most recent major versions |
| Android | 2 most recent major versions |

### 158. What is schematic?

It's a scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code. It defines rules that operate on a virtual file system called a tree.

### 159. What is rule in Schematics?

In schematics world, it's a function that operates on a file tree to create, delete, or modify files in a specific manner.

### 160. What is Schematics CLI?

Schematics come with their own command-line tool known as Schematics CLI. It is used to install the schematics executable, which you can use to create a new schematics collection with an initial named schematic. The collection folder is a workspace for schematics. You can also use the schematics command to add a new schematic to an existing collection, or extend an existing schematic. You can install Schematic CLI globally as below,
```bash
npm install -g @angular-devkit/schematics-cli
```

### 161. What are the best practices for security in angular?

Below are the best practices of security in angular,

1. Use the latest Angular library releases
2. Don't modify your copy of Angular
3. Avoid Angular APIs marked in the documentation as “Security Risk.”

### 162. What is Angular security model for preventing XSS attacks?

Angular treats all values as untrusted by default. i.e, Angular sanitizes and escapes untrusted values When a value is inserted into the DOM from a template, via property, attribute, style, class binding, or interpolation.

### 163. What is the role of template compiler for prevention of XSS attacks?

The offline template compiler prevents vulnerabilities caused by template injection, and greatly improves application performance. So it is recommended to use offline template compiler in production deployments without dynamically generating any template.

### 164. What are the various security contexts in Angular?

Angular defines the following security contexts for sanitization,

1. **HTML:** It is used when interpreting a value as HTML such as binding to innerHtml.
2. **Style:** It is used when binding CSS into the style property.
3. **URL:** It is used for URL properties such as `<a href>`.
4. **Resource URL:** It is a URL that will be loaded and executed as code such as `<script src>`.

### 165. What is Sanitization? Does Angular support it?

**Sanitization** is the inspection of an untrusted value, turning it into a value that's safe to insert into the DOM. Yes, Angular supports sanitization. It sanitizes untrusted values for HTML, styles, and URLs but sanitizing resource URLs isn't possible because they contain arbitrary code.

### 166. What is the purpose of innerHTML?

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

### 167. What is the difference between interpolated content and innerHTML?

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

### 168. How do you prevent automatic sanitization?

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

### 169. Is it safe to use direct DOM API methods in terms of security?

No,the built-in browser DOM APIs or methods don't automatically protect you from security vulnerabilities. In this case it is recommended to use Angular templates instead of directly interacting with DOM. If it is unavoidable then use the built-in Angular sanitization functions.

### 170. What is DOM sanitizer?

`DomSanitizer` is used to help preventing Cross Site Scripting Security bugs (XSS) by sanitizing values to be safe to use in the different DOM contexts.

### 171. How do you support server side XSS protection in Angular application?

The server-side XSS protection is supported in an angular application by using a templating language that automatically escapes values to prevent XSS vulnerabilities on the server. But don't use a templating language to generate Angular templates on the server side which creates a high risk of introducing template-injection vulnerabilities.

### 172. Does Angular prevent HTTP level vulnerabilities?

Angular has built-in support for preventing http level vulnerabilities such as as cross-site request forgery (CSRF or XSRF) and cross-site script inclusion (XSSI). Even though these vulnerabilities need to be mitigated on server-side, Angular provides helpers to make the integration easier on the client side.
1. HttpClient supports a token mechanism used to prevent XSRF attacks
2. HttpClient library recognizes the convention of prefixed JSON responses(which non-executable js code with ")]}',\\n" characters) and automatically strips the string ")]}',\\n" from all responses before further parsing

### 173. What are Http Interceptors?

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

### 174. What are the applications of HTTP interceptors?

The HTTP Interceptors can be used for different variety of tasks,

1. Authentication
2. Logging
3. Caching
4. Fake backend
5. URL transformation
6. Modifying headers

### 175. Are multiple interceptors supported in Angular?

Yes, Angular supports multiple interceptors at a time. You could define multiple interceptors in providers property:
```javascript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: MyFirstInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MySecondInterceptor, multi: true }
],
```
The interceptors will be called in the order in which they were provided. i.e, MyFirstInterceptor will be called first in the above interceptors configuration.

### 176. How can I use interceptor for an entire application?

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

### 177. How does Angular simplify Internationalization?

Angular simplifies the below areas of internationalization,
1. Displaying dates, number, percentages, and currencies in a local format.
2. Preparing text in component templates for translation.
3. Handling plural forms of words.
4. Handling alternative text.

### 178. How do you manually register locale data?

By default, Angular only contains locale data for en-US which is English as spoken in the United States of America . But if you want to set to another locale, you must import locale data for that new locale. After that you can register using `registerLocaleData` method and the syntax of this method looks like below,
```javascript
registerLocaleData(data: any, localeId?: any, extraData?: any): void
```
For example, let us import German locale and register it in the application
```javascript
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de');
```

### 179. What are the four phases of template translation?

The i18n template translation process has four phases:

1. **Mark static text messages in your component templates for translation:** You can place i18n on every element tag whose fixed text is to be translated. For example, you need i18n attribute for heading as below,
    ```javascript
    <h1 i18n>Hello i18n!</h1>
    ```

2. **Create a translation file:** Use the Angular CLI xi18n command to extract the marked text into an industry-standard translation source file. i.e, Open terminal window at the root of the app project and run the CLI command xi18n.
    ```bash
    ng xi18n
    ```
   The above command creates a file named `messages.xlf` in your project's root directory.

   **Note:** You can supply command options to change the format, the name, the location, and the source locale of the extracted file.

3. **Edit the generated translation file:** Translate the extracted text into the target language. In this step, create a localization folder (such as `locale`)under root directory(src) and then create target language translation file by copying and renaming the default messages.xlf file. You need to copy source text node and provide the translation under target tag.
    For example, create the translation file(messages.de.xlf) for German language
    ```javascript
    <trans-unit id="greetingHeader" datatype="html">
      <source>Hello i18n!</source>
      <target>Hallo i18n !</target>
      <note priority="1" from="description">A welcome header for this sample</note>
      <note priority="1" from="meaning">welcome message</note>
    </trans-unit>
    ```

4. **Merge the completed translation file into the app:** You need to use Angular CLI build command to compile the app, choosing a locale-specific configuration, or specifying the following command options.

      1. --i18nFile=path to the translation file
      2. --i18nFormat=format of the translation file
      3. --i18nLocale= locale id

### 180. What is the purpose of i18n attribute?

The Angular i18n attribute marks translatable content. It is a custom attribute, recognized by Angular tools and compilers. The compiler removes it after translation.

**Note:** Remember that i18n is not an Angular directive.

### 181. What is the purpose of custom id?

When you change the translatable text, the Angular extractor tool generates a new id for that translation unit. Because of this behavior, you must then update the translation file with the new id every time.

For example, the translation file `messages.de.xlf.html` has generated trans-unit for some text message as below
```html
<trans-unit id="827wwe104d3d69bf669f823jjde888" datatype="html">
```
You can avoid this manual update of `id` attribute by specifying a custom id in the i18n attribute by using the prefix @@.
```javascript
<h1 i18n="@@welcomeHeader">Hello i18n!</h1>
```

### 182. What happens if the custom id is not unique?

You need to define custom ids as unique. If you use the same id for two different text messages then only the first one is extracted. But its translation is used in place of both original text messages.

For example, let's define same custom id `myCustomId` for two messages,
```html
<h2 i18n="@@myCustomId">Good morning</h3>
<!-- ... -->
<h2 i18n="@@myCustomId">Good night</p>
```
and the translation unit generated for first text in for German language as
```html
<trans-unit id="myId" datatype="html">
  <source>Good morning</source>
  <target state="new">Guten Morgen</target>
</trans-unit>
```
Since custom id is the same, both of the elements in the translation contain the same text as below
```html
<h2>Guten Morgen</h2>
<h2>Guten Morgen</h2>
```

### 183. Can I translate text without creating an element?

Yes, you can achieve using `<ng-container>` attribute. Normally you need to wrap a text content with i18n attribute for the translation. But if you don't want to create a new DOM element just for the sake of translation, you can wrap the text in an <ng-container> element.
```html
<ng-container i18n>I'm not using any DOM element for translation</ng-container>
```
Remember that `<ng-container>` is transformed into an html comment

### 184. How can I translate attribute?

You can translate attributes by attaching `i18n-x` attribute  where x is the name of the attribute to translate. For example, you can translate image title attribute as below,
```html
<img [src]="example" i18n-title title="Internationlization" />
```
By the way, you can also assign meaning, description and id with the i18n-x="<meaning>|<description>@@<id>" syntax.

### 185. List down the pluralization categories?

Pluralization has below categories depending on the language.
1. =0 (or any other number)
2. zero
3. one
4. two
5. few
6. many
7. other

### 186. What is select ICU expression?

ICU expression is is similar to the plural expressions except that you choose among alternative translations based on a string value instead of a number. Here you define those string values.

Let's take component binding with `residenceStatus` property which has "citizen", "permanent resident" and "foreigner" possible values and the message maps those values to the appropriate translations.
```javascript
<span i18n>The person is {residenceStatus, select, citizen {citizen} permanent resident {permanentResident} foreigner {foreigner}}</span>
```

### 187. How do you report missing translations?

By default, When translation is missing, it generates a warning message such as "Missing translation for message 'somekey'". But you can configure with a different level of message in Angular compiler as below,
1. **Error:** It throws an error. If you are using AOT compilation, the build will fail. But if you are using JIT compilation, the app will fail to load.
2. **Warning (default):** It shows a 'Missing translation' warning in the console or shell.
3. **Ignore:** It doesn't do anything.

If you use AOT compiler then you need to perform changes in `configurations` section of your Angular CLI configuration file, angular.json.
```javascript
"configurations": {
  ...
  "de": {
    ...
    "i18nMissingTranslation": "error"
  }
}
```
If you use the JIT compiler, specify the warning level in the compiler config at bootstrap by adding the 'MissingTranslationStrategy' property as below,
```javascript
import { MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    // ...
  ]
});
```

### 188. How do you provide build configuration for multiple locales?

You can provide build configuration such as translation file path, name, format and application url in `configuration` settings of Angular.json file. For example, the German version of your application configured the build as follows,
```javascript
"configurations": {
  "de": {
    "aot": true,
    "outputPath": "dist/my-project-de/",
    "baseHref": "/fr/",
    "i18nFile": "src/locale/messages.de.xlf",
    "i18nFormat": "xlf",
    "i18nLocale": "de",
    "i18nMissingTranslation": "error",
  }
```

### 189. What is an angular library?

An Angular library is an Angular project that differs from an app in that it cannot run on its own. It must be imported and used in an app. For example,  you can import or add `service worker` library to an Angular application which turns an application into a Progressive Web App (PWA).

**Note:** You can create own third party library and publish it as npm package to be used in an Application.

### 190. What is AOT compiler?

The AOT compiler is part of a build process that produces a small, fast, ready-to-run application package, typically for production. It converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase before the browser downloads and runs that code.

### 191. How do you select an element in component template?

You can control any DOM element via ElementRef by injecting it into your component's constructor. i.e, The component should have constructor with ElementRef parameter,
```javascript
constructor(myElement: ElementRef) {
   el.nativeElement.style.backgroundColor = 'yellow';
}
```

### 192. What is TestBed?

TestBed is an api for writing unit tests for Angular applications and it's libraries. Even though We still write our tests in Jasmine and run using Karma, this API provides an easier way to create components, handle injection, test asynchronous behaviour and interact with our application.

### 193. What is protractor?

Protractor is an end-to-end test framework for Angular and AngularJS applications. It runs tests against your application running in a real browser, interacting with it as a user would.
```javascript
npm install -g protractor
```

### 194. What is collection?

Collection is a set of related schematics collected in an npm package. For example, `@schematics/angular` collection is used in Angular CLI to apply transforms to a web-app project. You can create your own schematic collection for customizing angular projects.

### 195. How do you create schematics for libraries?

You can create your own schematic collections to integrate your library with the Angular CLI. These collections are classified as 3 main schematics,
1. **Add schematics:** These schematics are used to install library in an Angular workspace using `ng add` command.
   For example, @angular/material schematic tells the add command to install and set up Angular Material and theming.
2. **Generate schematics**: These schematics are used to modify projects, add configurations and scripts, and scaffold artifacts in library using `ng generate` command.
   For example, @angular/material generation schematic supplies generation schematics for the UI components. Let's say the table component is generated using `ng generate @angular/material:table `.
3. **Update schematics:** These schematics are used to update library's dependencies and adjust for breaking changes in a new library release using `ng update` command.
   For example, @angular/material update schematic updates material and cdk dependencies using `ng update @angular/material` command.

### 196. How do you use jquery in Angular?

You can use jquery in Angular using 3 simple steps,
1. **Install the dependency:** At first, install the jquery dependency using npm
    ```cmd
       npm install --save jquery
    ```
2. **Add the jquery script:** In Angular-CLI project, add the relative path to jquery in the angular.json file.
    ```javascript
    "scripts": [
       "node_modules/jquery/dist/jquery.min.js"
    ]
    ```
3. **Start using jquery:** Define the element in template. Whereas declare the jquery variable and apply CSS classes on the element.
    ```html
    <div id="elementId">
      <h1>JQuery integration</h1>
    </div>
    ```
    ```javascript
    import {Component, OnInit} from '@angular/core';

    declare var $: any; // (or) import * as $ from 'jquery';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
      ngOnInit(): void {
        $(document).ready(() => {
          $('#elementId').css({'text-color': 'blue', 'font-size': '150%'});
        });
      }
    }
    ```

### 197. What is the reason for No provider for HTTP exception?

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

### 198. What is router state?

The RouteState is an interface which represents the state of the router as a tree of activated routes.
```javascript
interface RouterState extends Tree {
  snapshot: RouterStateSnapshot
  toString(): string
}
```
You can access the current RouterState from anywhere in the Angular app using the Router service and the routerState property.

### 199. How can I use SASS in angular project?

When you are creating your project with angular cli, you can use `ng new`command. It generates all your components with predefined sass files.
```javascript
ng new My_New_Project --style=sass
```
But if you are changing your existing style in your project then use `ng set` command,
```javascript
ng set defaults.styleExt scss
```

### 200. What is the purpose of hidden property?

The hidden property is used  to show or hide the associated DOM element, based on an expression. It can be compared close to `ng-show` directive in AngularJS. Let's say you want to show user name based on the availability of user using `hidden` property.
```javascript
<div [hidden]="!user.name">
  My name is: {{user.name}}
</div>
```

---

Previous: [[Interview Questions 101-150|Questions 101–150]] · Next: [[Interview Questions 201-250|Questions 201–250]]

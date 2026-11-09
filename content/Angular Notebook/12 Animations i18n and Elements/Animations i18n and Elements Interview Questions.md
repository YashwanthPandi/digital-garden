---
title: Animations, i18n and Elements Interview Questions
tags:
  - Angular
  - Interview
---

28 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What are Angular elements?

Angular elements are Angular components packaged as **custom elements** (a web standard for defining new HTML elements in a framework-agnostic way). Angular Elements host an Angular component, providing a bridge between the data and the logic defined in the component and the standard DOM APIs, thus, providing a way to use Angular components in `non-Angular environments`.

### 2. What is the browser support of Angular Elements?

Since Angular elements are packaged as custom elements the browser support of angular elements is same as custom elements support.

This feature is is currently supported natively in a number of browsers and pending for other browsers.

| Browser | Angular Element Support |
|---- | --------- |
| Chrome | Natively supported|
| Opera | Natively supported |
| Safari| Natively supported |
| Firefox | Natively supported from 63 version onwards. You need to enable dom.webcomponents.enabled and dom.webcomponents.customelements.enabled in older browsers |
| Edge| Currently it is in progress|

### 3. What are custom elements?

Custom elements (or Web Components) are a Web Platform feature which extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. The browser maintains a `CustomElementRegistry` of defined custom elements, which maps an instantiable JavaScript class to an HTML tag. Currently this feature is supported by Chrome, Firefox, Opera, and Safari, and available in other browsers through polyfills.

### 4. Do I need to bootstrap custom elements?

No, custom elements bootstrap (or start) automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM. Once a custom element is added to the DOM for any page, it looks and behaves like any other HTML element, and does not require any special knowledge of Angular.

### 5. Explain how custom elements works internally?

Below are the steps in an order about custom elements functionality,
1. **App registers custom element with browser:** Use the `createCustomElement()` function to convert a component into a class that can be registered with the browser as a custom element.
2. **App adds custom element to DOM:**  Add custom element just like a built-in HTML element directly into the DOM.
3. **Browser instantiate component based class:** Browser creates an instance of the registered class and adds it to the DOM.
4. **Instance provides content with data binding and change detection:** The content with in template is rendered using the component and DOM data.
The flow chart of the custom elements functionality would be as follows,

![[aiq-customElement.png]]

### 6. How to transfer components to custom elements?

Transforming components to custom elements involves **two** major steps,
1. **Build custom element class:** Angular provides the `createCustomElement()` function for converting an Angular component (along with its dependencies) to a custom element. The conversion process implements `NgElementConstructor` interface, and creates a constructor class which is used to produce a self-bootstrapping instance of Angular component.
2. **Register element class with browser:** It uses `customElements.define()` JS function, to register the configured constructor and its associated custom-element tag with the browser's `CustomElementRegistry`. When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.

The detailed structure would be as follows,
![[aiq-createElement.png]]

### 7. What are the mapping rules between Angular component and custom element?

The Component properties and logic maps directly into HTML attributes and the browser's event system. Let us describe them in two steps,
1. The createCustomElement() API parses the component input properties with corresponding attributes for the custom element. For example, component @Input('myInputProp') converted as custom element attribute `my-input-prop`.
2. The Component outputs are dispatched as HTML Custom Events, with the name of the custom event matching the output name. For example, component @Output() valueChanged = new EventEmitter() converted as custom element with dispatch event as "valueChanged".

### 8. How do you define typings for custom elements?

You can use the `NgElement` and `WithProperties` types exported from @angular/elements.

Let's see how it can be applied by comparing with Angular component.
1. The simple container with input property would be as below,
    ```javascript
    @Component(...)
    class MyContainer {
      @Input() message: string;
    }
    ```
2. After applying types typescript validates input value and their types,
    ```javascirpt
    const container = document.createElement('my-container') as NgElement & WithProperties<{message: string}>;
    container.message = 'Welcome to Angular elements!';
    container.message = true;  // <-- ERROR: TypeScript knows this should be a string.
    container.greet = 'News';  // <-- ERROR: TypeScript knows there is no `greet` property on `container`.
    ```

### 9. What is angular animation?

Angular's animation system is built on CSS functionality in order to animate any property that the browser considers animatable. These properties includes positions, sizes, transforms, colors, borders etc. The Angular modules for animations are **@angular/animations** and **@angular/platform-browser** and these dependencies are automatically added to your project when you create a project using Angular CLI.

### 10. What are the steps to use animation module?

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

### 11. What is State function?

Angular's state() function is used to define different states to call at the end of each transition. This function takes two arguments: a unique name like open or closed and a style() function.

For example, you can write a open state function

```javascript
state('open', style({
  height: '300px',
  opacity: 0.5,
  backgroundColor: 'blue'
})),
```

### 12. What is Style function?

The style function is used to define a set of styles to associate with a given state name. You need to use it along with state() function to set CSS style attributes. For example, in the close state, the button has a height of 100 pixels, an opacity of 0.8, and a background color of green.

```javascript
state('close', style({
  height: '100px',
  opacity: 0.8,
  backgroundColor: 'green'
})),
```
**Note:** The style attributes must be in camelCase.

### 13. What is the purpose of animate function?

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

### 14. What is transition function?

The animation transition function is used to specify the changes that occur between one state and another over a period of time. It accepts two arguments: the first argument accepts an expression that defines the direction between two transition states, and the second argument accepts an animate() function.

Let's take an example state transition from open to closed with an half second transition between states.

```javascript
transition('open => closed', [
  animate('500ms')
]),
```

### 15. How does Angular simplify Internationalization?

Angular simplifies the below areas of internationalization,
1. Displaying dates, number, percentages, and currencies in a local format.
2. Preparing text in component templates for translation.
3. Handling plural forms of words.
4. Handling alternative text.

### 16. How do you manually register locale data?

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

### 17. What are the four phases of template translation?

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

### 18. What is the purpose of i18n attribute?

The Angular i18n attribute marks translatable content. It is a custom attribute, recognized by Angular tools and compilers. The compiler removes it after translation.

**Note:** Remember that i18n is not an Angular directive.

### 19. What is the purpose of custom id?

When you change the translatable text, the Angular extractor tool generates a new id for that translation unit. Because of this behavior, you must then update the translation file with the new id every time.

For example, the translation file `messages.de.xlf.html` has generated trans-unit for some text message as below
```html
<trans-unit id="827wwe104d3d69bf669f823jjde888" datatype="html">
```
You can avoid this manual update of `id` attribute by specifying a custom id in the i18n attribute by using the prefix @@.
```javascript
<h1 i18n="@@welcomeHeader">Hello i18n!</h1>
```

### 20. What happens if the custom id is not unique?

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

### 21. Can I translate text without creating an element?

Yes, you can achieve using `<ng-container>` attribute. Normally you need to wrap a text content with i18n attribute for the translation. But if you don't want to create a new DOM element just for the sake of translation, you can wrap the text in an <ng-container> element.
```html
<ng-container i18n>I'm not using any DOM element for translation</ng-container>
```
Remember that `<ng-container>` is transformed into an html comment

### 22. How can I translate attribute?

You can translate attributes by attaching `i18n-x` attribute  where x is the name of the attribute to translate. For example, you can translate image title attribute as below,
```html
<img [src]="example" i18n-title title="Internationlization" />
```
By the way, you can also assign meaning, description and id with the i18n-x="<meaning>|<description>@@<id>" syntax.

### 23. List down the pluralization categories?

Pluralization has below categories depending on the language.
1. =0 (or any other number)
2. zero
3. one
4. two
5. few
6. many
7. other

### 24. What is select ICU expression?

ICU expression is is similar to the plural expressions except that you choose among alternative translations based on a string value instead of a number. Here you define those string values.

Let's take component binding with `residenceStatus` property which has "citizen", "permanent resident" and "foreigner" possible values and the message maps those values to the appropriate translations.
```javascript
<span i18n>The person is {residenceStatus, select, citizen {citizen} permanent resident {permanentResident} foreigner {foreigner}}</span>
```

### 25. How do you report missing translations?

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

### 26. How do you provide build configuration for multiple locales?

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

### 27. How do you get current direction for locales?

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

### 28. How do you trigger an animation?

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

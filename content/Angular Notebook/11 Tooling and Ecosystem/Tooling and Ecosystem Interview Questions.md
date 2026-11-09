---
title: Tooling and Ecosystem Interview Questions
tags:
  - Angular
  - Interview
---

30 interview questions on this topic, from [sudheerj/angular-interview-questions](https://github.com/sudheerj/angular-interview-questions).

> [!warning] Some answers are dated
> The source covers Angular from v2 onwards, so some answers use NgModules, `*ngIf`/`*ngFor`, ViewEngine and Zone.js. For current practice (standalone, `@if`/`@for`, signals, zoneless) prefer the chapters in this notebook.

### 1. What is codelyzer?

Codelyzer provides set of tslint rules for static code analysis of Angular TypeScript projects. You can run the static code analyzer over web apps, NativeScript, Ionic etc. Angular CLI has support for this and it can be use as below,
```bash
ng new codelyzer
ng lint
```

---

### 2. What is Angular Language Service?

The Angular Language Service is a way to get completions, errors, hints, and navigation inside your Angular templates whether they are external in an HTML file or embedded in annotations/decorators in a string. It has the ability to autodetect that you are opening an Angular file, reads your `tsconfig.json` file, finds all the templates you have in your application, and then provides all the language services.

### 3. How do you install angular language service in the project?

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

### 4. Is there any editor support for Angular Language Service?

Yes, Angular Language Service is currently available for Visual Studio Code and WebStorm IDEs. You need to install angular language service using an extension and devDependency respectively. In sublime editor, you need to install typescript which has has a language service plugin model.

### 5. Explain the features provided by Angular Language Service?

Basically there are 3 main features provided by Angular Language Service,

1. **Autocompletion:** Autocompletion can speed up your development time by providing you with contextual possibilities and hints as you type with in an interpolation and elements.

     ![[aiq-language-completion.gif]]

2. **Error checking:** It can also warn you of mistakes in your code.

     ![[aiq-language-error.gif]]

3. **Navigation:** Navigation allows you to hover a component, directive, module and then click and press F12 to go directly to its definition.

     ![[aiq-language-navigation.gif]]

### 6. What is Angular CLI Builder?

In Angular8, the CLI Builder API is stable and available to developers who want to customize the `Angular CLI` by adding or modifying commands. For example, you could supply a builder to perform an entirely new task, or to change which third-party tool is used by an existing command.

### 7. What is a builder?

A builder function is a function that uses the `Architect API` to perform a complex process such as "build" or "test". The builder code is defined in an npm package. For example, BrowserBuilder runs a webpack build for a browser target and KarmaBuilder starts the Karma server and runs a webpack build for unit tests.

### 8. How do you invoke a builder?

The Angular CLI command `ng run` is used to invoke a builder with a specific target configuration. The workspace configuration file, `angular.json`, contains default configurations for built-in builders.

### 9. What is Bazel tool?

Bazel is a powerful build tool developed and massively used by Google and it can keep track of the dependencies between different packages and build targets. In Angular8, you can build your CLI application with Bazel.
**Note:** The Angular framework itself is built with Bazel.

### 10. What are the advantages of Bazel tool?

Below are the list of key advantages of Bazel tool,

1. It creates the possibility of building your back-ends and front-ends with the same tool
2. The incremental build and tests
3. It creates the possibility to have remote builds and cache on a build farm.

### 11. How do you use Bazel with Angular CLI?

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

### 12. How do you run Bazel directly?

Sometimes you may want to bypass the Angular CLI builder and run Bazel directly using Bazel CLI. You can install it globally using @bazel/bazel npm package. i.e, Bazel CLI is available under @bazel/bazel package. After you can apply the below common commands,

```javascrippt
bazel build [targets] // Compile the default output artifacts of the given targets.
bazel test [targets] // Run the tests with *_test targets found in the pattern.
bazel run [target]: Compile the program represented by target and then run it.
```

### 13. What are workspace APIs?

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

### 14. How do you upgrade angular version?

The Angular upgrade is quite easier using Angular CLI `ng update` command as mentioned below. For example, if you upgrade from Angular 7 to 8 then your lazy loaded route imports will be migrated to the new import syntax automatically.
```bash
$ ng update @angular/cli @angular/core
```

### 15. What is Angular Material?

Angular Material is a collection of Material Design components for Angular framework following the Material Design spec. You can apply Material Design very easily using Angular Material. The installation can be done through npm or yarn,
```bash
npm install --save @angular/material @angular/cdk @angular/animations
(OR)
yarn add @angular/material @angular/cdk @angular/animations
```
It supports the most recent two versions of all major browsers. The latest version of Angular material is 8.1.1

### 16. How do you upgrade location service of angularjs?

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

### 17. What is NgUpgrade?

NgUpgrade is a library put together by the Angular team, which you can use in your applications to mix and match AngularJS and Angular components and bridge the AngularJS and Angular dependency injection systems.

### 18. How to use polyfills in Angular application?

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

### 19. What is the reason to deprecate Web Tracing Framework?

Angular has supported the integration with the Web Tracing Framework (WTF) for the purpose of performance testing. Since it is not well maintained and failed in majority of the applications, the support is deprecated in latest releases.

### 20. What is the reason to deprecate web worker packages?

Both `@angular/platform-webworker` and `@angular/platform-webworker-dynamic` are officially deprecated, the Angular team realized it's not good practice to run the Angular application on Web worker

### 21. How do you find angular CLI version?

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

### 22. What is schematic?

It's a scaffolding library that defines how to generate or transform a programming project by creating, modifying, refactoring, or moving files and code. It defines rules that operate on a virtual file system called a tree.

### 23. What is rule in Schematics?

In schematics world, it's a function that operates on a file tree to create, delete, or modify files in a specific manner.

### 24. What is Schematics CLI?

Schematics come with their own command-line tool known as Schematics CLI. It is used to install the schematics executable, which you can use to create a new schematics collection with an initial named schematic. The collection folder is a workspace for schematics. You can also use the schematics command to add a new schematic to an existing collection, or extend an existing schematic. You can install Schematic CLI globally as below,
```bash
npm install -g @angular-devkit/schematics-cli
```

### 25. What is an angular library?

An Angular library is an Angular project that differs from an app in that it cannot run on its own. It must be imported and used in an app. For example,  you can import or add `service worker` library to an Angular application which turns an application into a Progressive Web App (PWA).

**Note:** You can create own third party library and publish it as npm package to be used in an Application.

### 26. What is collection?

Collection is a set of related schematics collected in an npm package. For example, `@schematics/angular` collection is used in Angular CLI to apply transforms to a web-app project. You can create your own schematic collection for customizing angular projects.

### 27. How do you create schematics for libraries?

You can create your own schematic collections to integrate your library with the Angular CLI. These collections are classified as 3 main schematics,
1. **Add schematics:** These schematics are used to install library in an Angular workspace using `ng add` command.
   For example, @angular/material schematic tells the add command to install and set up Angular Material and theming.
2. **Generate schematics**: These schematics are used to modify projects, add configurations and scripts, and scaffold artifacts in library using `ng generate` command.
   For example, @angular/material generation schematic supplies generation schematics for the UI components. Let's say the table component is generated using `ng generate @angular/material:table `.
3. **Update schematics:** These schematics are used to update library's dependencies and adjust for breaking changes in a new library release using `ng update` command.
   For example, @angular/material update schematic updates material and cdk dependencies using `ng update @angular/material` command.

### 28. How do you use jquery in Angular?

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

### 29. How can I use SASS in angular project?

When you are creating your project with angular cli, you can use `ng new`command. It generates all your components with predefined sass files.
```javascript
ng new My_New_Project --style=sass
```
But if you are changing your existing style in your project then use `ng set` command,
```javascript
ng set defaults.styleExt scss
```

### 30. Is any special configuration required for Angular9?

You don't need any special configuration. In Angular9, the Ivy renderer is the default Angular compiler. Even though Ivy is available Angular8 itself, you had to configure it in tsconfig.json file as below,
```javascript
"angularCompilerOptions": {    "enableIvy": true  }
```

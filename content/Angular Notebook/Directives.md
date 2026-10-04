---
title: Directives
tags:
  - Angular
---

_(Don't get confused.)_

Directives are special Angular classes used to modify the behaviour, appearance & structure of HTML DOM elements (hide/unhide, change colour, move position).

- **Components**
- **Structural:** `*ngIf`, `*ngFor`, `*ngSwitch` (`*ngSwitchCase`, `*ngSwitchDefault`)
- **Attribute:** `[ngClass]`, `[ngStyle]`

_Sticky:_ for `*ngFor`, `*ngIf`, `*ngSwitch` we need `CommonModule` imported into the component.

```html
<p *ngFor="let item of items">{{ item }}</p>
```

`[ngClass]` → for CSS classes (mostly used) · `[ngStyle]` → inline CSS

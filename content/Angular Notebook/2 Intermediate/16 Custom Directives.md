---
title: 16. Custom Directives
tags:
  - Angular
---

Built-in directives are covered in [[06 Directives|Directives]]. You can write your own when you want to reuse a behaviour across many elements.

```bash
ng g directive highlight
```

## Custom attribute directive

Highlight an element on hover:

```ts
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  color = input('yellow', { alias: 'appHighlight' });
  private el = inject(ElementRef);

  @HostListener('mouseenter') onEnter() { this.el.nativeElement.style.backgroundColor = this.color(); }
  @HostListener('mouseleave') onLeave() { this.el.nativeElement.style.backgroundColor = ''; }
}
```

```html
<p appHighlight="lightblue">Hover me</p>
```

(Add `HighlightDirective` to the component's `imports`.)

## `@HostListener` and `@HostBinding`

- **`@HostListener('event')`**: method decorator; listens to an event on the host element (or `window:resize`, `document:click`).
- **`@HostBinding('prop')`**: property decorator; binds a host element property/class/style to a field.

```ts
@HostBinding('class.active') isActive = false;
@HostListener('click') toggle() { this.isActive = !this.isActive; }
```

Another example: a "pressed" effect for anything that should act like a button. One binding is static, one changes:

```ts
@Directive({ selector: '[appButtonPress]' })
export class ButtonPressDirective {
  @HostBinding('attr.role') role = 'button';          // always role="button" (accessibility)
  @HostBinding('class.pressed') isPressed = false;    // class only while the mouse is down

  @HostListener('mousedown') onDown() { this.isPressed = true; }
  @HostListener('mouseup') onUp() { this.isPressed = false; }
}
```

If you don't give `@HostBinding` a name, the property name is used. Host bindings are re-checked on every change detection, so they can change at any time.

Modern recommended form: the `host` property in the decorator.

```ts
@Directive({
  selector: '[appToggle]',
  host: { '[class.active]': 'isActive()', '(click)': 'toggle()' },
})
export class ToggleDirective {
  isActive = signal(false);
  toggle() { this.isActive.update((v) => !v); }
}
```

## Example: copy to clipboard

Click any element with `[appCopy]` to copy a value:

```ts
@Directive({ selector: '[appCopy]' })
export class CopyDirective {
  text = input.required<string>({ alias: 'appCopy' });
  copied = output<boolean>();

  @HostListener('click') async copy() {
    try {
      await navigator.clipboard.writeText(this.text());
      this.copied.emit(true);
    } catch {
      this.copied.emit(false);   // no permission / insecure page: show the text instead
    }
  }
}
```

```html
<button [appCopy]="shareUrl" (copied)="toast($event)">Copy link</button>
<button appCopy="https://angular.dev">Copy docs URL</button>
```

> [!note] Old examples create a hidden `<textarea>`, select it and call `document.execCommand('copy')`. That API is deprecated; `navigator.clipboard` replaced it (it needs HTTPS or localhost).

## Renderer2

Safer than touching `nativeElement` directly (works with SSR, no direct DOM assumptions):

```ts
private renderer = inject(Renderer2);
this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
this.renderer.addClass(this.el.nativeElement, 'active');
```

## Custom structural directive

Uses `TemplateRef` (the template to render) and `ViewContainerRef` (where to render it). An "unless" directive, the opposite of `*ngIf`:

```ts
@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);

  @Input() set appUnless(condition: boolean) {
    this.vcr.clear();
    if (!condition) this.vcr.createEmbeddedView(this.tpl);
  }
}
```

```html
<p *appUnless="isLoggedIn">Please log in</p>
```

## Host directives (directive composition)

Attach existing directives to a component without the user adding them in the template:

```ts
@Component({ selector: 'app-button', hostDirectives: [HighlightDirective], … })
```

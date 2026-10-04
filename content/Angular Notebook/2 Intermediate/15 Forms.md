---
title: 15. Forms
tags:
  - Angular
---

Angular Forms create and manage forms (values, validation, state). Two classic types: **template-driven** and **reactive**. (Newest: **Signal Forms**, see the end.)

Under both: each input is a **FormControl**; the whole form is a **FormGroup**.

![[formcontrol-properties.jpg]]

FormControl properties: `value`, `valid` / `invalid`, `touched` / `untouched` (focused then blurred), `dirty` (value changed) / `pristine` (unchanged), `errors`, `status` (`VALID`, `INVALID`, `PENDING`, `DISABLED`).

Angular also adds CSS classes automatically: `ng-valid`, `ng-invalid`, `ng-touched`, `ng-dirty`, `ng-pristine`, handy for styling errors.

## Template-driven forms

Logic and validation live **in the HTML**, using directives. Needs `FormsModule`.

![[template-driven-form.jpg]]

- **`ngModel`**: turns an input into a FormControl and tracks its value + validation state. Needs a `name` attribute.
- **`ngForm`**: manages the whole form (a FormGroup) and tracks all its fields. Applied automatically to `<form>`.
- **Template reference variable `#`**: names an element or directive in the template so you can use it there (see [[08 Templates|Templates]]).

```html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
  <input type="text" name="username" ngModel required minlength="3" #username="ngModel" />

  @if (username.invalid && username.touched) {
    <p style="color: red">Username must be at least 3 characters</p>
  }
  <button [disabled]="f.invalid">Submit</button>
</form>
```

## Reactive forms

Structure and logic are **defined in the component class** with `FormGroup`, `FormControl`, `Validators`. Needs `ReactiveFormsModule`. Synchronous, explicit, easier to test.

![[reactive-form.jpg]]

```ts
export class ReactiveForm {
  usernameForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get username() {                       // getter = shorter access in template
    return this.usernameForm.get('username');
  }

  onSubmit() {
    if (this.usernameForm.invalid) return this.usernameForm.markAllAsTouched();
    console.log(this.usernameForm.value);
  }
}
```

```html
<form [formGroup]="usernameForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="username" />
  @if (username?.hasError('minlength')) { <p>Username must be at least 3 characters</p> }
  <input formControlName="email" />
  <button type="submit">Save</button>
</form>
```

- **`[formGroup]`**: binds a FormGroup object to the `<form>`.
- **`formControlName`**: binds an input to a FormControl inside that group by its string key.
- **`Validators`**: built-in rules: `required`, `minLength`, `maxLength`, `min`, `max`, `email`, `pattern`.

### Useful API

| Method | Does |
| --- | --- |
| `setValue({...})` | set **all** fields (throws if one missing) |
| `patchValue({...})` | set **some** fields |
| `reset()` | clear values and state |
| `valueChanges` | Observable of value changes (e.g. live search) |
| `disable()` / `enable()` | toggle a control (disabled values are excluded from `.value`; use `getRawValue()`) |

### FormBuilder

Shorter syntax for the same thing:

```ts
private fb = inject(FormBuilder);
form = this.fb.nonNullable.group({
  name: ['', Validators.required],
  address: this.fb.group({ city: [''], zip: [''] }),   // nested group → formGroupName="address"
});
```

### FormArray: dynamic fields

```ts
form = this.fb.group({ phones: this.fb.array([this.fb.control('')]) });
get phones() { return this.form.get('phones') as FormArray; }
addPhone() { this.phones.push(this.fb.control('')); }
removePhone(i: number) { this.phones.removeAt(i); }
```

```html
<div formArrayName="phones">
  @for (p of phones.controls; track $index) {
    <input [formControlName]="$index" /> <button (click)="removePhone($index)">x</button>
  }
</div>
```

### Custom validators

```ts
export function noSpaces(control: AbstractControl): ValidationErrors | null {
  return control.value?.includes(' ') ? { noSpaces: true } : null;
}

// cross-field validator on the group
export const passwordsMatch: ValidatorFn = (group) =>
  group.get('password')?.value === group.get('confirm')?.value ? null : { mismatch: true };

form = new FormGroup({ password: new FormControl(''), confirm: new FormControl('') },
                     { validators: passwordsMatch });
```

**Async validators** return an Observable/Promise (e.g. "is this username taken?" via an API) and set `status` to `PENDING` while running.

### Typed forms (v14+)

Reactive forms are strongly typed: `form.value.name` is `string | undefined`. Use `nonNullable` (or `new FormControl('', { nonNullable: true })`) so `reset()` goes back to the initial value instead of `null`.

## Which one to use?

![[template-vs-reactive.jpg]]

| Template-driven | Reactive |
| --- | --- |
| logic in the template | logic in the class |
| asynchronous, `ngModel` two-way | synchronous, explicit model |
| small, simple, not dynamic | big, complex, dynamic |
| login, contact, feedback, 2–5 fields | multi-step signup, add/remove fields (FormArray) |
| harder to unit test | easy to unit test |

## Signal Forms (new)

Introduced experimentally in Angular 21 and built on signals instead of RxJS: you define the model as a `signal`, create the form with `form(model, schema)`, and bind with `[field]`. Worth knowing exists; reactive forms are still the most common in existing codebases.

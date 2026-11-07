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

```ts
export function uniqueUsername(api: UserApi): AsyncValidatorFn {
  return (control) =>
    api.exists(control.value).pipe(
      map((taken) => (taken ? { usernameTaken: true } : null)),
      catchError(() => of(null)),          // API down: don't block the form
    );
}

username = new FormControl('', {
  validators: [Validators.required, noSpaces],     // sync: run first, on every change
  asyncValidators: [uniqueUsername(inject(UserApi))],  // async: only when sync ones pass
  updateOn: 'blur',                                // validate when leaving the field, not per key
});
```

```html
@if (username.pending) { <small>Checking…</small> }
@if (username.hasError('usernameTaken')) { <small>That name is taken</small> }
```

Validator rules to remember: return `null` when valid, an error object (`{ errorName: true }` or with details) when invalid.

### FormBuilder's array syntax

Each control in `fb.group()` can be a small array: **`[initial value, sync validators, async validators]`**.

```ts
form = this.fb.group({
  firstInput: ['', [Validators.required, noSpaces], [uniqueUsername(this.api)]],
  secondInput: ['', Validators.required],
  name: [{ value: 'default name', disabled: true }],   // start disabled
});
```

`Validators.compose([a, b])` merges several validators into one; you'll see it in older code, but passing an array does the same.

Reading and writing a single control: `form.controls.name.value`, `form.controls.name.setValue('x')` (or `form.get('name')`).

### Showing a group error on one field

A cross-field validator on the group puts its error on the **group**: `form.hasError('mismatch')`. To show it next to the "confirm password" input instead, the validator can also mark that control:

```ts
export const newMatchesConfirm: ValidatorFn = (group) => {
  const confirm = group.get('confirm')!;
  const mismatch = group.get('newPW')!.value !== confirm.value;
  const { mismatch: _old, ...otherErrors } = confirm.errors ?? {};   // keep e.g. "required"
  const errors = mismatch ? { ...otherErrors, mismatch: true } : otherErrors;
  confirm.setErrors(Object.keys(errors).length ? errors : null);
  return mismatch ? { mismatch: true } : null;
};
```

Simpler option: keep the error on the group and show the message under the confirm field with `@if (form.hasError('mismatch') && form.controls.confirm.touched)`.

### Typed forms (v14+)

Reactive forms are strongly typed: `form.value.name` is `string | undefined`. Use `nonNullable` (or `new FormControl('', { nonNullable: true })`) so `reset()` goes back to the initial value instead of `null`.

### Live filtering with `valueChanges`

A standalone `FormControl` (no `<form>` needed) is handy for a search box:

```ts
search = new FormControl('', { nonNullable: true });
private all = [{ id: 1, name: 'abc' }, { id: 2, name: 'abce' }, { id: 3, name: 'ced' }];
results = toSignal(
  this.search.valueChanges.pipe(map((term) => this.all.filter((i) => i.name.startsWith(term)))),
  { initialValue: this.all },
);
```

```html
<input [formControl]="search" />
@for (item of results(); track item.id) { <div>{{ item.id }} - {{ item.name }}</div> }
```

`toSignal` unsubscribes automatically. For server-side search add `debounceTime` + `switchMap` (see [[13 Observables and RxJS#Higher-order mapping (interview favourite)|RxJS]]).

> [!note] Old forms API
> Angular 2 release candidates used `Control`, `ControlGroup`, `[ngFormModel]` and `[ngFormControl]` from `@angular/common`. They became `FormControl`, `FormGroup`, `[formGroup]` and `formControlName` in `@angular/forms` (2.0 final). Old answers online still show the RC names.

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

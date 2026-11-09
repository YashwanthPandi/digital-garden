---
title: 25. Advanced Forms
tags:
  - Angular
---

> [!summary] In one line
> Beyond basic reactive forms: **custom validators** (sync, async, cross-field), **dynamic forms** built from data, and **ControlValueAccessor**, which lets your own components work with `formControlName` and `ngModel` like a native input.

Basics: [[Angular Notebook/7 Forms/24 Forms|Forms]] (template-driven, reactive, typed forms, Signal Forms).

## Custom validators

```ts
// Sync validator: returns null (valid) or an error object
export function forbiddenName(name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>
    control.value?.toLowerCase() === name ? { forbiddenName: { value: control.value } } : null;
}

// Cross-field validator: put it on the FormGroup
export const passwordsMatch: ValidatorFn = (group: AbstractControl) => {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pw === confirm ? null : { passwordsMismatch: true };
};

// Async validator: returns an Observable or Promise
export function usernameAvailable(api: UserApi): AsyncValidatorFn {
  return control => api.isTaken(control.value).pipe(
    map(taken => (taken ? { usernameTaken: true } : null)),
  );
}

form = inject(FormBuilder).nonNullable.group({
  username: ['', [Validators.required, forbiddenName('admin')], [usernameAvailable(inject(UserApi))]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  confirm: [''],
}, { validators: passwordsMatch });
```

```html
@if (form.controls.username.hasError('usernameTaken')) { <p>That name is taken.</p> }
@if (form.hasError('passwordsMismatch')) { <p>Passwords don't match.</p> }
@if (form.controls.username.pending) { <p>Checking…</p> }
```

Async validators only run after all sync validators pass. Use `updateOn: 'blur'` to avoid an API call on every key press.

## Dynamic forms

Build the form from **data** (an API response or config), so you can add fields without changing the template:

```ts
interface FieldConfig { key: string; label: string; type: 'text' | 'email' | 'number'; required?: boolean }

export class DynamicFormComponent {
  fields = input.required<FieldConfig[]>();
  form = computed(() => {
    const group: Record<string, FormControl> = {};
    for (const f of this.fields()) {
      group[f.key] = new FormControl('', f.required ? Validators.required : null);
    }
    return new FormGroup(group);
  });
}
```

```html
<form [formGroup]="form()">
  @for (f of fields(); track f.key) {
    <label [for]="f.key">{{ f.label }}</label>
    <input [id]="f.key" [type]="f.type" [formControlName]="f.key">
  }
</form>
```

Use `FormArray` when the user adds and removes rows (phone numbers, order lines). Use a library like Formly when forms become very large.

## ControlValueAccessor

The bridge between Angular forms and a component. Implement it so your custom component (star rating, date picker, toggle) works with `formControlName`, `[formControl]` and `[(ngModel)]`:

```ts
@Component({
  selector: 'app-star-rating',
  template: `
    @for (star of [1, 2, 3, 4, 5]; track star) {
      <button type="button" [disabled]="disabled" (click)="pick(star)"
              [attr.aria-pressed]="star <= value">★</button>
    }`,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StarRatingComponent), multi: true }],
})
export class StarRatingComponent implements ControlValueAccessor {
  value = 0;
  disabled = false;
  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: number): void { this.value = v ?? 0; }            // form → component
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }   // component → form
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }

  pick(star: number) {
    this.value = star;
    this.onChange(star);
    this.onTouched();
  }
}
```

```html
<app-star-rating formControlName="rating" />
```

| Method | Called when |
| --- | --- |
| `writeValue` | the form sets the value (initial value, `setValue`, `reset`) |
| `registerOnChange` | once: gives you the function to call when the user changes the value |
| `registerOnTouched` | once: gives you the function to call when the control is "touched" (blur) |
| `setDisabledState` | the form disables or enables the control |

> [!tip] Remember it
> **CVA is a translator:** `writeValue` = the form talking to you, `onChange` = you talking back to the form.

> [!question] Recall
> 1. What does a sync validator return? Where do you put a cross-field validator?
> 2. When does an async validator run? How do you stop it calling the API on every key press?
> 3. How would you build a form from a JSON list of fields?
> 4. Name the four `ControlValueAccessor` methods and what calls each. What provider must you add?

Prev: [[24 Forms|24. Forms]] · Next: [[26 Signals|26. Signals]]

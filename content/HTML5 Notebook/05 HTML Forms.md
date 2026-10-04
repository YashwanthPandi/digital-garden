---
title: 5. Forms
tags:
  - HTML
---

> [!summary] In one line
> Forms collect user input and send it somewhere. Every input needs a **`<label>`** and a **`name`**.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required placeholder="you@example.com">

  <label for="pw">Password</label>
  <input id="pw" name="password" type="password" minlength="8" required>

  <button type="submit">Sign up</button>
</form>
```

> [!tip] 🧠 Remember it
> **`for` on the label = `id` on the input** (they're a matched pair, like a key and lock). Clicking the label then focuses the input.
> **`name` is the key the server receives;** no `name` → the value isn't sent.

`action` = where to send. `method`: **GET** puts data in the URL (searches), **POST** puts it in the body (passwords, sign-ups).

## Input types (HTML5 gave us most of these)

| Type | Gives you |
| --- | --- |
| `text`, `password`, `email`, `tel`, `url`, `search` | text boxes (mobile shows the right keyboard) |
| `number`, `range` | number box, slider |
| `date`, `time`, `datetime-local`, `month`, `week` | pickers |
| `color` | colour picker |
| `checkbox` | many choices ☑ |
| `radio` | one choice ◉ (same `name` groups them) |
| `file` | upload (form needs `enctype="multipart/form-data"`) |
| `hidden` | sent but not shown |

🧠 **Checkbox = pick many, Radio = pick one** (like old car radios: pressing one button pops the others out).

## Other controls

```html
<select name="country">
  <option value="in" selected>India</option>
  <option value="us">USA</option>
</select>

<textarea name="bio" rows="4"></textarea>

<input list="langs" name="lang">       <!-- autocomplete suggestions -->
<datalist id="langs"><option value="JavaScript"><option value="Java"></datalist>

<fieldset>
  <legend>Plan</legend>
  <label><input type="radio" name="plan" value="free" checked> Free</label>
  <label><input type="radio" name="plan" value="pro"> Pro</label>
</fieldset>
```

## Built-in validation

| Attribute | Rule |
| --- | --- |
| `required` | can't be empty |
| `minlength` / `maxlength` | text length |
| `min` / `max` / `step` | number/date range |
| `pattern="[0-9]{6}"` | regex (e.g. 6-digit PIN) |
| `type="email"` / `url` | format check |

Style with CSS `:valid`, `:invalid`, `:user-invalid`. Always validate on the **server** too; users can bypass browser checks.

## Buttons

`<button>` defaults to `type="submit"` inside a form. Use `type="button"` for buttons that only run JS, `type="reset"` to clear.

Other useful attributes: `disabled`, `readonly`, `autofocus`, `autocomplete="email"`, `placeholder` (a hint, **not** a replacement for a label).

> [!question] Recall
> 1. Why does every input need a `name`? And a `label`?
> 2. GET vs POST?
> 3. Checkbox vs radio? How do radios know they're in one group?

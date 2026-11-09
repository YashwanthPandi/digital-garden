---
title: 9. Forms
aliases:
  - html5-notebook/05-html-forms
tags:
  - HTML
---

> [!summary] In one line
> Forms collect user input and send it somewhere. Every input needs a **`<label>`**, a **`name`**, and the right **`type`** and **`autocomplete`** so phones and password managers can help.

```html
<form action="/signup" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <label for="pw">Password</label>
  <input id="pw" name="password" type="password" autocomplete="new-password" minlength="8" required>

  <button>Sign up</button>
</form>
```

> [!tip] Remember it
> **`for` on the label = `id` on the input** (they're a matched pair, like a key and lock). Clicking the label then focuses the input.
> **`name` is the key the server receives;** no `name` → the value isn't sent.

You can also wrap the input in the label: `<label>Email <input name="email" type="email"></label>`. No `for`/`id` needed.

`action` = where to send. `method`: **GET** puts data in the URL (searches, filters), **POST** puts it in the request body (passwords, sign-ups, anything that changes data).

## Input types

| Type | Gives you |
| --- | --- |
| `text`, `search` | text box (search may show a clear button) |
| `email`, `tel`, `url` | text box with the matching phone keyboard; `email` and `url` also check the format |
| `password` | hidden text; password managers recognise it |
| `number`, `range` | number box, slider |
| `date`, `time`, `datetime-local`, `month`, `week` | native pickers |
| `color` | colour picker |
| `checkbox` | many choices |
| `radio` | one choice (same `name` groups them) |
| `file` | upload; add `accept="image/*"`, `multiple`; the form needs `enctype="multipart/form-data"` |
| `hidden` | sent but not shown |

> [!tip] Remember it
> **Checkbox = pick many, Radio = pick one** (like old car radios: pressing one button pops the others out).

**`type="number"` is for quantities** you could add up. For PIN codes, card numbers or phone numbers, use `type="text"` with `inputmode="numeric"`: you get the number keyboard without spinner arrows or stripped leading zeros.

## Help the browser fill and type

```html
<input name="otp" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}">
<input name="city" autocomplete="address-level2" enterkeyhint="next">
<input name="q" type="search" enterkeyhint="search">
```

| Attribute | Does |
| --- | --- |
| `autocomplete` | says which saved value fits: `name`, `email`, `tel`, `street-address`, `postal-code`, `cc-number`, `current-password`, `new-password`, `one-time-code` (SMS codes) |
| `inputmode` | which on-screen keyboard to show: `numeric`, `decimal`, `tel`, `email`, `url`, `search` |
| `enterkeyhint` | label on the phone's Enter key: `next`, `go`, `search`, `send`, `done` |

`autocomplete` is also an accessibility requirement (WCAG 2.2, "Identify Input Purpose"): it saves typing for people with motor or memory difficulties.

## Other controls

```html
<select name="country" autocomplete="country">
  <option value="">Choose a country</option>
  <option value="in">India</option>
  <option value="us">USA</option>
</select>

<textarea name="bio" rows="4" maxlength="300"></textarea>

<input list="langs" name="lang">       <!-- free text with suggestions -->
<datalist id="langs"><option value="JavaScript"><option value="Java"></datalist>

<fieldset>
  <legend>Plan</legend>
  <label><input type="radio" name="plan" value="free" checked> Free</label>
  <label><input type="radio" name="plan" value="pro"> Pro</label>
</fieldset>

<label for="upload">Upload progress</label>
<progress id="upload" max="100" value="70">70%</progress>   <!-- task progress -->
<meter min="0" max="100" low="30" high="80" value="20">20%</meter>   <!-- a measurement: disk space, password strength -->
<output name="total" for="qty price">0</output>             <!-- result of a calculation -->
```

**`<fieldset>` + `<legend>`** groups related controls. Screen readers announce the legend with each option ("Plan, Free, radio button").

## Built-in validation

| Attribute | Rule |
| --- | --- |
| `required` | can't be empty |
| `minlength` / `maxlength` | text length |
| `min` / `max` / `step` | number/date range |
| `pattern="[0-9]{6}"` | must match the whole value (e.g. a 6-digit PIN) |
| `type="email"` / `url` | format check |

- Style errors with **`:user-invalid`**, which only applies after the user has touched the field. `:invalid` matches on page load too, so empty required fields look wrong before the user has typed anything.
- Show a hint with `aria-describedby` so screen readers read it with the field.
- Add `novalidate` on the `<form>` when JavaScript handles validation itself.
- **Always validate on the server too.** Anyone can bypass browser checks.

```css
input:user-invalid { border-color: crimson; }
```

## File uploads

```html
<form action="/profile/photo" method="post" enctype="multipart/form-data">
  <label for="photo">Profile photo</label>
  <input id="photo" name="photo" type="file" accept="image/png, image/jpeg, image/webp">

  <label for="docs">Documents</label>
  <input id="docs" name="docs" type="file" accept=".pdf,.docx" multiple>

  <button>Upload</button>
</form>
```

- The form must use `method="post"` and `enctype="multipart/form-data"`, or only the file **name** is sent.
- `accept` filters the file picker by type or extension. It's a hint: check the type and size on the server.
- `multiple` allows several files; `capture="environment"` opens the phone's back camera.
- For progress bars, drag-and-drop zones or resizing before upload, JavaScript reads the files with `input.files` and sends them with `fetch` + `FormData`.

## Limitations of HTML forms

| Limitation | What to do |
| --- | --- |
| Browser validation can be turned off or bypassed (DevTools, `curl`) | validate everything on the server |
| Only GET and POST methods (no PUT, PATCH, DELETE) | use JavaScript `fetch`, or a hidden `_method` field the server understands |
| Built-in error messages look different in each browser and are hard to style | use `setCustomValidity()` or your own messages with `novalidate` |
| Some controls are hard to style (`<select>`, date pickers, file inputs) | use the newer customizable `<select>` where supported, or accessible custom components |
| No cross-field rules ("passwords must match", "end date after start date") | JavaScript validation |
| Submitting reloads the page | `fetch` + `event.preventDefault()` for single-page apps |

## Buttons

A `<button>` inside a form defaults to `type="submit"`. Use `type="button"` for buttons that only run JavaScript, otherwise they submit the form by accident. `type="reset"` clears the form (rarely a good idea).

```html
<button>Save</button>                                         <!-- submits -->
<button type="button" onclick="preview()">Preview</button>    <!-- doesn't submit -->
<button formaction="/drafts" formnovalidate>Save draft</button>  <!-- different URL, skip validation -->
```

Other useful attributes: `disabled` (not sent, can't be focused), `readonly` (sent, can't be edited), `autofocus` (use sparingly), `placeholder` (an example value, **not** a replacement for a label: it disappears as you type).

> [!question] Recall
> 1. Why does every input need a `name`? And a `label`?
> 2. GET vs POST?
> 3. Why use `inputmode="numeric"` instead of `type="number"` for a PIN?
> 4. Name four `autocomplete` values. Why does `autocomplete` matter for accessibility?
> 5. `:invalid` vs `:user-invalid`?
> 6. What's the default `type` of a `<button>` inside a form, and why does it matter?
> 7. What does a form need to upload files? Name three things HTML forms can't do on their own.

Prev: [[08 HTML Accessibility|8. Accessibility]] · Next: [[10 HTML Modern Features|10. Modern HTML Features]]

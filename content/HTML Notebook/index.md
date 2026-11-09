---
title: HTML Notebook
aliases:
  - html5-notebook/index
tags:
  - HTML
  - Notes
  - Revision
  - Skills
---

My HTML notes, written for a **complete beginner** and based on the current **HTML Living Standard**, the version every modern browser follows. HTML is the first thing to learn for the web, so start here, then [[CSS3 Notebook/index|CSS3]], then [[JavaScript Notebook/index|JavaScript]].

Every page has a one-line summary, a memory trick, examples you can copy, and recall questions.

> [!tip] How to study
> Open VS Code, create `index.html`, type `!` + Tab, and **build the examples yourself**. Use the **Live Server** extension to see changes instantly. Then answer each page's Recall questions without looking.

> [!note] "HTML5" vs the Living Standard
> "HTML5" was the 2014 version. Since 2019 there is one HTML specification, the [HTML Living Standard](https://html.spec.whatwg.org/), maintained by WHATWG (the browser makers) and updated continuously. There are no more version numbers: a feature is "in HTML" once browsers ship it. People still say "HTML5" in job ads and interviews, and they mean modern HTML.

## Learning roadmap

### 1. Document and Content → [[HTML Notebook/1 Content/index|overview]]

1. [[01 HTML Introduction and Document Structure|Introduction and Document Structure]]: tags, elements, attributes, boilerplate
2. [[02 HTML Meta Tags and SEO|Meta Tags and SEO]]: social previews, structured data, Core Web Vitals
3. [[03 HTML Text Elements|Text Elements]]: headings, paragraphs, text-level meaning, block vs inline
4. [[04 HTML Links and Images|Links and Images]]: URLs, `alt`, responsive images, loading priority
5. [[05 HTML Lists and Tables|Lists and Tables]]
6. [[06 HTML Media and Graphics|Media and Graphics]]: audio, video, iframe, canvas, SVG

### 2. Structure and Meaning → [[HTML Notebook/2 Structure and Meaning/index|overview]]

7. [[07 HTML Semantic HTML|Semantic HTML]]: `header`, `nav`, `main`, `article`, `search`…
8. [[08 HTML Accessibility|Accessibility]]: WCAG 2.2 checklist, ARIA

### 3. Forms and Interactivity → [[HTML Notebook/3 Forms and Interactivity/index|overview]]

9. [[09 HTML Forms|Forms]]: inputs, labels, autocomplete, validation
10. [[10 HTML Modern Features|Modern HTML Features]]: `<dialog>`, popover, exclusive accordions, `inert`, web components
11. [[11 HTML Web APIs|Web APIs]]: storage, workers, observers, drag and drop

### 4. Interview Prep → [[HTML Notebook/4 Interview Prep/index|overview]]

12. [[12 HTML Interview Cheat Sheet|Interview Cheat Sheet]]

## roadmap.sh coverage

Every topic on the [roadmap.sh HTML roadmap](https://roadmap.sh/html) (88 items), and where it's covered.

| Roadmap section | Topics | Notes |
| --- | --- | --- |
| Introduction | Introduction, What are markup languages?, Frontend Development | [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|01]] |
| How the web works | How the web works, What is HTTP?, Domain names, Hosting, DNS, Browsers, HTML, CSS, JavaScript, What is SEO? | [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|01]], [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO\|02]] |
| Basic tags and syntax | Tags and Attributes, Case Insensitivity, Basic Tags, !DOCTYPE, html, head, body, meta, title, HTML Comments, Whitespaces, HTML Entities | [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|01]], [[HTML Notebook/1 Content/03 HTML Text Elements\|03]] |
| Textual tags | Textual Tags, h1 to h6, p, hr, br, b / strong, i / em, pre, mark, sub, sup, del, s, ins | [[HTML Notebook/1 Content/03 HTML Text Elements\|03]] |
| Grouping text | Grouping text, div, span | [[HTML Notebook/1 Content/03 HTML Text Elements\|03]] |
| Standard attributes | Standard attributes, id, class, style, Data Attributes | [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|01]] |
| Links and images | Links, Images, img vs figure, Priority Hints | [[HTML Notebook/1 Content/04 HTML Links and Images\|04]] |
| Lists and tables | Lists and Types, Ordered lists, Unordered lists, Definition lists, Nested lists, Table Tag | [[HTML Notebook/1 Content/05 HTML Lists and Tables\|05]] |
| Embedding media | Embedding Media, Audio, Video, iframe, CSP | [[HTML Notebook/1 Content/06 HTML Media and Graphics\|06]], [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO\|02]] |
| Forms | Using Forms, Labels and Inputs, File Uploads, Form Validation, Limitations | [[HTML Notebook/3 Forms and Interactivity/09 HTML Forms\|09]] |
| Semantic markup | Semantic Markup, header, nav, main, section, article, aside, footer, address, abbr, cite, dfn, blockquote, q | [[HTML Notebook/1 Content/03 HTML Text Elements\|03]], [[HTML Notebook/2 Structure and Meaning/07 HTML Semantic HTML\|07]] |
| Styling basics | Styling Basics, Inline CSS, Internal CSS, External CSS | [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|01]] |
| Including JavaScript | Including JavaScript | [[HTML Notebook/1 Content/01 HTML Introduction and Document Structure\|01]], [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO\|02]] |
| Accessibility | Accessibility | [[HTML Notebook/2 Structure and Meaning/08 HTML Accessibility\|08]] |
| Basics of SEO | Basics of SEO | [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO\|02]] |

## Practice projects

- [ ] Personal profile page (text, links, images)
- [ ] Recipe page (lists, figure, semantic layout)
- [ ] Timetable (table with `colspan`/`rowspan`)
- [ ] Sign-up form with validation and autocomplete (forms, labels)
- [ ] FAQ page with an exclusive accordion and a `<dialog>` contact form (modern features)
- [ ] Portfolio site skeleton (semantic layout, meta tags) → then style it with CSS

## Quick revision sheet

| Concept | One-liner |
| --- | --- |
| HTML | skeleton of the page |
| `<head>` / `<body>` | brain (unseen info) / body (visible content) |
| Block / inline | brick on its own row / word in a sentence |
| `strong` / `b` | importance / draw attention without extra importance |
| `href` | where the link goes |
| `alt` | describe the image over the phone |
| `ul` / `ol` / `dl` | shopping list / recipe steps / dictionary |
| `tr` `th` `td` | row, header cell, data cell |
| `label for` = `input id` | key and lock |
| `name` | the key the server receives |
| `autocomplete` | tells the browser which saved value to fill |
| Checkbox / radio | pick many / pick one |
| Semantic tags | say what a section *is* |
| `article` | could be re-published alone |
| Canvas / SVG | painting / paper cut-outs |
| ARIA | last resort, right element first |
| `defer` / `async` | wait your turn / whoever's first |
| `<dialog>` / popover | modal that blocks the page / light overlay that closes on outside click |

## Resources compared

| Resource | Best for | Notes |
| --- | --- | --- |
| [MDN: Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development) | **learning + reference** | Accurate, modern, covers accessibility properly. Start here. |
| [web.dev Learn HTML](https://web.dev/learn/html) | modern best practices | Short course by the Chrome team. |
| [HTML Living Standard](https://html.spec.whatwg.org/) | the official spec | The final word on what's valid; dense, use it to settle arguments. |
| [Can I use](https://caniuse.com) / [Baseline](https://web.dev/baseline) | browser support | Check before using a new feature in production. |
| [W3Schools](https://www.w3schools.com/html/) | quick "try it" examples | Fast lookup; less depth. |
| [GeeksforGeeks](https://www.geeksforgeeks.org/html/) | interview question lists | Lots of Q&A; check against MDN. |

_These notes are written in my own words, using the resources above as references._

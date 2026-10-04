---
title: 10. Meta Tags and SEO
tags:
  - HTML
---

> [!summary] In one line
> `<head>` tags tell browsers, search engines and social apps **about** your page: title, description, preview image, character set.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Learn HTML in 10 Days | My Site</title>                 <!-- ~50–60 chars -->
  <meta name="description" content="Beginner-friendly HTML notes with examples."> <!-- ~150 chars, shown in Google -->
  <link rel="canonical" href="https://example.com/html">        <!-- the "official" URL -->
  <link rel="icon" href="/favicon.svg">

  <!-- Open Graph: preview cards on WhatsApp, LinkedIn, Facebook -->
  <meta property="og:title" content="Learn HTML in 10 Days">
  <meta property="og:description" content="Beginner-friendly HTML notes.">
  <meta property="og:image" content="https://example.com/cover.png">

  <meta name="robots" content="index, follow">                  <!-- or noindex -->
</head>
```

> [!tip] 🧠 Remember it
> **title = the shop sign, description = the window display, og:image = the poster when someone shares your link.**

## Loading resources

| Tag | Use |
| --- | --- |
| `<link rel="stylesheet" href>` | CSS |
| `<script src defer>` | JS after HTML parsed, in order |
| `<script src async>` | JS as soon as downloaded, any order (analytics) |
| `<script type="module">` | ES modules (deferred by default) |
| `<link rel="preload">` | fetch a critical file early (fonts, hero image) |
| `<link rel="preconnect">` | warm up a connection to another domain |

🧠 **defer = "wait your turn" (in order, after parsing). async = "whoever's first" (no order).**

## SEO basics

1. Unique, descriptive `<title>` and `description` on every page
2. One `<h1>`, logical headings
3. Semantic HTML and meaningful link text
4. `alt` on images
5. Fast, mobile-friendly pages (viewport, compressed images)
6. Clean URLs: `/html-forms` not `/page?id=7`

> [!question] Recall
> 1. What do Open Graph tags do?
> 2. `defer` vs `async`?
> 3. Name 4 on-page SEO basics.

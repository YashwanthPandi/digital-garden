---
title: 2. Meta Tags and SEO
aliases:
  - html5-notebook/10-html-meta-tags-and-seo
tags:
  - HTML
---

> [!summary] In one line
> `<head>` tells browsers, search engines and social apps **about** your page: character set, title, description, preview image, icons and the official URL.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Learn HTML in 10 Days | My Site</title>                  <!-- ~50–60 characters -->
  <meta name="description" content="Beginner-friendly HTML notes with examples.">  <!-- ~150 characters -->
  <link rel="canonical" href="https://example.com/html">         <!-- the official URL -->

  <!-- Icons and app install -->
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">     <!-- 180 × 180 -->
  <link rel="manifest" href="/manifest.webmanifest">

  <!-- Light and dark mode -->
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#284b63">

  <!-- Open Graph: preview cards on WhatsApp, LinkedIn, Slack, Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://example.com/html">
  <meta property="og:title" content="Learn HTML in 10 Days">
  <meta property="og:description" content="Beginner-friendly HTML notes.">
  <meta property="og:image" content="https://example.com/cover.png">   <!-- 1200 × 630 -->
  <meta name="twitter:card" content="summary_large_image">
</head>
```

> [!tip] Remember it
> **title = the shop sign, description = the window display, og:image = the poster when someone shares your link.**

| Tag | Notes |
| --- | --- |
| `<title>` | the most important on-page SEO tag; unique on every page |
| `description` | shown under the title in search results (Google may rewrite it) |
| `canonical` | which URL counts when the same page has several (`?utm=…`, `www`, trailing slash) |
| `robots` | only add it to **block**: `<meta name="robots" content="noindex">`. "index, follow" is the default, so leave it out |
| `keywords` | **outdated:** search engines ignore it |
| `color-scheme` | the page supports light and dark: form controls and scrollbars follow |
| `theme-color` | colours the browser bar on phones |

## Structured data (JSON-LD)

Tells search engines exactly what the page is (an article, product, recipe, event, FAQ) so results can show extras like ratings, prices or dates.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Learn HTML in 10 Days",
  "author": { "@type": "Person", "name": "Yashwanth" },
  "datePublished": "2026-10-03"
}
</script>
```

Vocabulary: [schema.org](https://schema.org). Test it with Google's Rich Results Test.

## Pages in other languages

```html
<html lang="hi">
<link rel="alternate" hreflang="en" href="https://example.com/en/html">
<link rel="alternate" hreflang="hi" href="https://example.com/hi/html">
```

## Content Security Policy (CSP)

A CSP tells the browser which sources of scripts, styles, images and frames it may load. If an attacker injects a `<script>` (XSS), the browser refuses to run it.

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; img-src 'self' https://images.example.com; script-src 'self'">
```

| Directive | Controls |
| --- | --- |
| `default-src` | the fallback for everything |
| `script-src` / `style-src` | where scripts / styles may come from |
| `img-src`, `font-src`, `connect-src` | images, fonts, `fetch` and WebSocket targets |
| `frame-src` / `frame-ancestors` | what you can embed / who may embed **you** (stops clickjacking) |

- `'self'` = your own origin. Avoid `'unsafe-inline'` and `'unsafe-eval'`: they switch off most of the protection.
- Prefer sending CSP as an HTTP **response header** set by your server or host. The `<meta>` version can't use some directives (`frame-ancestors`, `report-to`).
- Start with `Content-Security-Policy-Report-Only` to see what would break before enforcing it.

## Loading resources

| Tag | Use |
| --- | --- |
| `<link rel="stylesheet" href>` | CSS (blocks rendering until loaded: keep it small) |
| `<script src defer>` | JS after HTML is parsed, in order |
| `<script src async>` | JS as soon as downloaded, any order (analytics) |
| `<script type="module">` | ES modules (deferred by default) |
| `<link rel="modulepreload">` | fetch a module and its imports early |
| `<link rel="preload" as="font" crossorigin>` | fetch a critical file early (fonts, hero image) |
| `<link rel="preconnect">` | open a connection to another domain early (fonts, CDN) |
| `fetchpriority="high"` | raise the priority of one image or script → [[HTML Notebook/1 Content/04 HTML Links and Images\|Images]] |

> [!tip] Remember it
> **defer = "wait your turn" (in order, after parsing). async = "whoever's first" (no order).**

## Core Web Vitals

Google measures real users' experience with three numbers and uses them in ranking:

| Metric | Measures | Good | HTML that helps |
| --- | --- | --- | --- |
| **LCP** (Largest Contentful Paint) | loading: when the main content appears | ≤ 2.5 s | `fetchpriority="high"` on the hero, no lazy hero, `preload` |
| **INP** (Interaction to Next Paint) | responsiveness: delay after a click or key press | ≤ 200 ms | less JavaScript, `defer`, native elements |
| **CLS** (Cumulative Layout Shift) | visual stability: how much content jumps | ≤ 0.1 | `width`/`height` on images, videos and iframes |

INP replaced the older FID metric in March 2024.

## SEO basics

1. Unique, descriptive `<title>` and `description` on every page
2. One `<h1>`, logical headings
3. Semantic HTML and meaningful link text
4. `alt` on images
5. Fast, mobile-friendly pages (good Core Web Vitals)
6. Clean URLs: `/html-forms` not `/page?id=7`
7. A `sitemap.xml` and a `robots.txt` at the site root
8. Content in the HTML itself: text that only appears after JavaScript runs is indexed later or not at all

> [!question] Recall
> 1. What do Open Graph tags do? Which size should `og:image` be?
> 2. When do you add a robots meta tag? Why is `keywords` useless?
> 3. `defer` vs `async`?
> 4. Name the three Core Web Vitals and one HTML fix for each.
> 5. What is JSON-LD for?
> 6. What does a Content Security Policy protect against? Why send it as a header rather than a meta tag?

Prev: [[01 HTML Introduction and Document Structure|1. Introduction and Document Structure]] · Next: [[03 HTML Text Elements|3. Text Elements]]

---
title: 6. Media and Graphics
aliases:
  - html5-notebook/07-html-media-and-graphics
tags:
  - HTML
---

> [!summary] In one line
> HTML plays audio and video natively, embeds other pages with **`<iframe>`**, and draws graphics with **`<canvas>`** (pixels, via JavaScript) or **`<svg>`** (shapes that scale).

## Video and audio

```html
<video controls width="1280" height="720" poster="thumb.jpg" preload="metadata">
  <source src="movie.webm" type="video/webm">   <!-- AV1 or VP9: smaller files -->
  <source src="movie.mp4" type="video/mp4">     <!-- H.264: plays everywhere -->
  <track src="captions.vtt" kind="captions" srclang="en" label="English" default>
  <p>Your browser can't play this video. <a href="movie.mp4">Download it</a>.</p>
</video>

<audio controls preload="none">
  <source src="episode.opus" type="audio/ogg; codecs=opus">
  <source src="episode.mp3" type="audio/mpeg">
</audio>
```

| Attribute | Does |
| --- | --- |
| `controls` | show play/pause/volume |
| `autoplay` | start automatically (browsers only allow it with `muted`) |
| `muted`, `loop` | silent, repeat |
| `playsinline` | play inside the page on iPhone instead of going fullscreen |
| `poster` | image shown before playing |
| `preload` | `none` (load nothing), `metadata` (length and size only), `auto` |
| `width` / `height` | reserve space to avoid layout shift |

> [!tip] Remember it
> **Multiple `<source>`s = backup plans:** the browser uses the first format it understands.

**Captions vs subtitles:** `kind="captions"` includes sounds and speaker names for deaf and hard-of-hearing viewers. `kind="subtitles"` only translates speech. Captions are required for accessibility. Both use the **WebVTT** (`.vtt`) format.

**Animated GIF replacement:** a short muted loop is much smaller than a GIF:

```html
<video autoplay muted loop playsinline width="480" height="270">
  <source src="demo.webm" type="video/webm">
  <source src="demo.mp4" type="video/mp4">
</video>
```

For long or popular videos, use a video host (YouTube, Vimeo, Mux, Cloudflare Stream). They handle adaptive streaming (HLS/DASH), which plain `<video src>` doesn't.

## iframe: a page inside your page

```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
        width="560" height="315" title="Intro to HTML (video)"
        loading="lazy"
        allow="fullscreen; picture-in-picture; encrypted-media"
        referrerpolicy="strict-origin-when-cross-origin"></iframe>
```

| Attribute | Does |
| --- | --- |
| `title` | names the frame for screen readers (required for accessibility) |
| `loading="lazy"` | load only when near the screen |
| `allow` | which powerful features the embedded page may use (`fullscreen`, `camera`, `geolocation`, …) |
| `sandbox` | lock down untrusted content: blocks scripts, forms, pop-ups unless you allow them, e.g. `sandbox="allow-scripts"` |
| `referrerpolicy` | how much of your URL the embedded site sees |

`allowfullscreen` is the older way to write `allow="fullscreen"`. Which sites you may embed, and who may embed your pages, is controlled by the Content Security Policy → [[HTML Notebook/1 Content/02 HTML Meta Tags and SEO|Meta Tags and SEO]].

## Canvas vs SVG

```html
<canvas id="chart" width="200" height="100">Bar chart of monthly sales</canvas>
<script>
  const ctx = document.getElementById('chart').getContext('2d');
  ctx.fillStyle = 'tomato';
  ctx.fillRect(10, 10, 80, 50);
</script>

<svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-labelledby="logo-title">
  <title id="logo-title">Teal circle logo</title>
  <circle cx="50" cy="50" r="40" fill="teal" />
</svg>
```

| | Canvas | SVG |
| --- | --- | --- |
| Type | **pixels** (raster) | **shapes** (vector) |
| Drawn with | JavaScript | markup |
| Scaling | blurry when zoomed | always sharp |
| Each shape in DOM? | no (one bitmap) | yes (style with CSS, click events) |
| Accessibility | add fallback text inside `<canvas>` | `<title>` + `role="img"` |
| Best for | games, heavy animation, image editing | icons, logos, charts, diagrams |

> [!tip] Remember it
> **Canvas = painting** (once painted, you can't move the brushstroke, you repaint).
> **SVG = paper cut-outs** (each shape is an object you can move and restyle).

**Beyond 2D:** `canvas.getContext('webgl2')` and the newer **WebGPU** API (`navigator.gpu`) draw 3D graphics on the GPU. Libraries like Three.js wrap them. `OffscreenCanvas` lets a web worker draw without blocking the page.

> [!question] Recall
> 1. Why list several `<source>` elements?
> 2. What do you need for `autoplay` to work?
> 3. Captions vs subtitles? Which file format do they use?
> 4. What do the `title`, `allow` and `sandbox` attributes do on an `<iframe>`?
> 5. When would you pick canvas over SVG? How do you make each accessible?

Prev: [[05 HTML Lists and Tables|5. Lists and Tables]] · Next: [[07 HTML Semantic HTML|7. Semantic HTML]]

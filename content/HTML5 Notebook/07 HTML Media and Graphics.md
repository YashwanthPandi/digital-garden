---
title: 7. Media and Graphics
tags:
  - HTML
---

> [!summary] In one line
> HTML5 plays audio and video natively and draws graphics with **`<canvas>`** (pixels, via JS) or **`<svg>`** (shapes, scalable).

## Video and audio

```html
<video controls width="640" poster="thumb.jpg" preload="metadata">
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
  <track src="subs.vtt" kind="subtitles" srclang="en" label="English">
  Your browser doesn't support video.   <!-- fallback -->
</video>

<audio controls>
  <source src="song.mp3" type="audio/mpeg">
</audio>
```

| Attribute | Does |
| --- | --- |
| `controls` | show play/pause/volume |
| `autoplay` | start automatically (browsers require `muted` too) |
| `muted`, `loop` | silent, repeat |
| `poster` | image before playing |
| `playsinline` | don't go fullscreen on iPhone |

🧠 **Multiple `<source>`s = backup plans:** the browser uses the first format it understands.

## iframe: a page inside your page

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
        width="560" height="315" title="Intro video"
        loading="lazy" allowfullscreen></iframe>
```

Use `sandbox` to restrict untrusted content. Always add a `title`.

## Canvas vs SVG

```html
<canvas id="c" width="200" height="100"></canvas>
<script>
  const ctx = document.getElementById('c').getContext('2d');
  ctx.fillStyle = 'tomato';
  ctx.fillRect(10, 10, 80, 50);
</script>

<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="teal" />
</svg>
```

| | Canvas | SVG |
| --- | --- | --- |
| Type | **pixels** (raster) | **shapes** (vector) |
| Drawn with | JavaScript | markup (XML) |
| Scaling | blurry when zoomed | always sharp |
| Each shape in DOM? | no (one bitmap) | yes (style with CSS, click events) |
| Best for | games, heavy animation, image editing | icons, logos, charts, diagrams |

> [!tip] 🧠 Remember it
> **Canvas = painting 🎨** (once painted, you can't move the brushstroke, you repaint).
> **SVG = paper cut-outs ✂️** (each shape is an object you can move and restyle).

> [!question] Recall
> 1. Why list several `<source>` elements?
> 2. What do you need for `autoplay` to work?
> 3. When would you pick canvas over SVG?

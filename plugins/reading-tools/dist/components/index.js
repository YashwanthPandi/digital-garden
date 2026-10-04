// Reading tools: toolbar buttons to hide the left/right sidebars, plus a
// Kindle-style reader mode (distraction-free column, reading themes, font,
// size, spacing and width settings, progress and time left).
//
// State lives on <html> as data attributes so it survives SPA navigation:
//   data-hide-left, data-hide-right, data-reader, data-reader-theme,
//   data-reader-font, data-reader-spacing, data-reader-width, data-reader-justify
// and --reader-size. Preferences are saved in localStorage under "reading-tools".
//
// Quartz wraps component CSS in @layer, which loses to the theme's unlayered
// rules, so the stylesheet is injected as a plain <style id="rt-style"> instead.
import { jsx } from "preact/jsx-runtime"

const svg = (paths, label) =>
  jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    width: 20,
    height: 20,
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 1.8,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "aria-hidden": "true",
    children: [jsx("title", { children: label }), ...paths],
  })

const ICONS = {
  left: (label) =>
    svg(
      [
        jsx("rect", { x: 3, y: 4, width: 18, height: 16, rx: 2 }),
        jsx("line", { x1: 9, y1: 4, x2: 9, y2: 20 }),
      ],
      label,
    ),
  right: (label) =>
    svg(
      [
        jsx("rect", { x: 3, y: 4, width: 18, height: 16, rx: 2 }),
        jsx("line", { x1: 15, y1: 4, x2: 15, y2: 20 }),
      ],
      label,
    ),
  reader: (label) =>
    svg(
      [
        jsx("path", { d: "M2 5.5C4.5 4 8 4 12 6c4-2 7.5-2 10-.5V19c-2.5-1.5-6-1.5-10 .5-4-2-7.5-2-10-.5Z" }),
        jsx("line", { x1: 12, y1: 6, x2: 12, y2: 19.5 }),
      ],
      label,
    ),
}

const button = (action, label, icon) =>
  jsx("button", {
    type: "button",
    class: `rt-btn rt-${action}`,
    "data-rt-action": action,
    "aria-label": label,
    title: label,
    children: icon(label),
  })

// ---------------------------------------------------------------------------
// Runs before the DOM is ready: apply saved state early to avoid a flash.
function ensureStyle(css) {
  if (document.getElementById("rt-style")) return
  var st = document.createElement("style")
  st.id = "rt-style"
  st.textContent = css
  document.head.appendChild(st)
}

function beforeDOM(css) {
  ensureStyle(css)
  // The Explorer calls scrollIntoView() on the active file on every load, which
  // also scrolls the window so notes opened half-way down. Keep it to the sidebar.
  if (!Element.prototype.__rtScrollPatched) {
    var orig = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function (arg) {
      if (this.closest && this.closest(".explorer")) {
        var opts = typeof arg === "object" && arg ? Object.assign({}, arg) : {}
        opts.block = "nearest"
        opts.inline = "nearest"
        return orig.call(this, opts)
      }
      return orig.apply(this, arguments)
    }
    Element.prototype.__rtScrollPatched = true
  }
  try {
    var s = JSON.parse(localStorage.getItem("reading-tools") || "{}")
    var h = document.documentElement
    if (s.hideLeft) h.setAttribute("data-hide-left", "")
    if (s.hideRight) h.setAttribute("data-hide-right", "")
    if (s.reader) h.setAttribute("data-reader", "on")
    h.setAttribute("data-reader-theme", s.theme || "sepia")
    h.setAttribute("data-reader-font", s.font || "serif")
    h.setAttribute("data-reader-spacing", s.spacing || "normal")
    h.setAttribute("data-reader-width", s.width || "medium")
    if (s.justify === true) h.setAttribute("data-reader-justify", "")
    h.style.setProperty("--reader-size", (s.size || 19) + "px")
  } catch (e) {}
}

// ---------------------------------------------------------------------------
function afterDOM(css) {
  ensureStyle(css)
  var KEY = "reading-tools"
  var h = document.documentElement
  var WPM = 230
  var hideTimer = null

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}")
    } catch (e) {
      return {}
    }
  }
  function save(patch) {
    var s = Object.assign(load(), patch)
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch (e) {}
    return s
  }
  function flag(name, on) {
    on ? h.setAttribute(name, "") : h.removeAttribute(name)
  }
  function state() {
    var s = load()
    return {
      theme: s.theme || "sepia",
      font: s.font || "serif",
      spacing: s.spacing || "normal",
      width: s.width || "medium",
      justify: s.justify === true,
      size: s.size || 19,
    }
  }

  // ---- sidebars ----------------------------------------------------------
  function toggleSide(side) {
    var attr = "data-hide-" + side
    var on = !h.hasAttribute(attr)
    flag(attr, on)
    var patch = {}
    patch[side === "left" ? "hideLeft" : "hideRight"] = on
    save(patch)
    syncButtons()
  }

  // ---- reader ------------------------------------------------------------
  var fontLoaded = false
  function loadFont() {
    if (fontLoaded) return
    fontLoaded = true
    var l = document.createElement("link")
    l.rel = "stylesheet"
    l.href =
      "https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap"
    document.head.appendChild(l)
  }
  function setReader(on) {
    if (on) {
      loadFont()
      h.setAttribute("data-reader", "on")
    } else {
      h.removeAttribute("data-reader")
      closePanel()
    }
    save({ reader: on })
    syncButtons()
    buildReaderUI()
    if (on) {
      showBars()
      updateProgress()
    }
  }
  function applySettings() {
    var s = state()
    h.setAttribute("data-reader-theme", s.theme)
    h.setAttribute("data-reader-font", s.font)
    h.setAttribute("data-reader-spacing", s.spacing)
    h.setAttribute("data-reader-width", s.width)
    flag("data-reader-justify", s.justify)
    h.style.setProperty("--reader-size", s.size + "px")
    var panel = document.getElementById("rt-panel")
    if (!panel) return
    panel.querySelectorAll("[data-rt-set]").forEach(function (b) {
      var k = b.getAttribute("data-rt-set")
      var v = b.getAttribute("data-rt-value")
      var cur = k === "justify" ? String(s.justify) : String(s[k])
      b.setAttribute("aria-pressed", cur === v ? "true" : "false")
    })
    var sz = panel.querySelector(".rt-size-value")
    if (sz) sz.textContent = s.size + "px"
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag)
    for (var k in attrs) e.setAttribute(k, attrs[k])
    if (html != null) e.innerHTML = html
    return e
  }
  function choice(key, value, label, extraClass) {
    return (
      '<button type="button" class="rt-choice ' +
      (extraClass || "") +
      '" data-rt-set="' +
      key +
      '" data-rt-value="' +
      value +
      '">' +
      label +
      "</button>"
    )
  }

  // Bars and panel live directly under <body>, outside the sidebars.
  function buildReaderUI() {
    if (!document.getElementById("rt-topbar")) {
      var top = el("div", { id: "rt-topbar", role: "toolbar", "aria-label": "Reader controls" })
      top.innerHTML =
        '<button type="button" class="rt-bar-btn" data-rt-action="exit" title="Exit reader (Esc)">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>' +
        "<span>Exit</span></button>" +
        '<div class="rt-title"></div>' +
        '<button type="button" class="rt-bar-btn rt-aa" data-rt-action="panel" title="Display settings" aria-expanded="false">Aa</button>'
      document.body.appendChild(top)
    }
    if (!document.getElementById("rt-panel")) {
      var p = el("div", { id: "rt-panel", role: "dialog", "aria-label": "Display settings" })
      p.innerHTML =
        '<div class="rt-row"><span class="rt-label">Font size</span><div class="rt-group">' +
        '<button type="button" class="rt-choice" data-rt-action="smaller" aria-label="Smaller text"><span style="font-size:0.8em">A</span></button>' +
        '<span class="rt-size-value"></span>' +
        '<button type="button" class="rt-choice" data-rt-action="larger" aria-label="Larger text"><span style="font-size:1.2em">A</span></button>' +
        "</div></div>" +
        '<div class="rt-row"><span class="rt-label">Font</span><div class="rt-group">' +
        choice("font", "serif", '<span style="font-family:Literata,Georgia,serif">Serif</span>') +
        choice("font", "sans", '<span style="font-family:system-ui,sans-serif">Sans</span>') +
        "</div></div>" +
        '<div class="rt-row"><span class="rt-label">Spacing</span><div class="rt-group">' +
        choice("spacing", "compact", "Compact") +
        choice("spacing", "normal", "Normal") +
        choice("spacing", "relaxed", "Relaxed") +
        "</div></div>" +
        '<div class="rt-row"><span class="rt-label">Margins</span><div class="rt-group">' +
        choice("width", "small", "Small") +
        choice("width", "medium", "Medium") +
        choice("width", "large", "Large") +
        "</div></div>" +
        '<div class="rt-row"><span class="rt-label">Alignment</span><div class="rt-group">' +
        choice("justify", "false", "Left") +
        choice("justify", "true", "Justified") +
        "</div></div>" +
        '<div class="rt-row"><span class="rt-label">Theme</span><div class="rt-group rt-themes">' +
        choice("theme", "white", "White", "rt-swatch rt-sw-white") +
        choice("theme", "sepia", "Sepia", "rt-swatch rt-sw-sepia") +
        choice("theme", "green", "Green", "rt-swatch rt-sw-green") +
        choice("theme", "dark", "Dark", "rt-swatch rt-sw-dark") +
        "</div></div>"
      document.body.appendChild(p)
    }
    if (!document.getElementById("rt-bottombar")) {
      var b = el("div", { id: "rt-bottombar" })
      b.innerHTML =
        '<div class="rt-progress"><div class="rt-progress-fill"></div></div><div class="rt-progress-text"></div>'
      document.body.appendChild(b)
    }
    if (!document.getElementById("rt-float")) {
      // Shown when a sidebar is hidden, so it can be brought back.
      var f = el("div", { id: "rt-float" })
      f.innerHTML =
        '<button type="button" class="rt-float-btn rt-float-left" data-rt-action="left" title="Show left sidebar ([)" aria-label="Show left sidebar">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="9" y1="4" x2="9" y2="20"></line></svg></button>' +
        '<button type="button" class="rt-float-btn rt-float-right" data-rt-action="right" title="Show right sidebar (])" aria-label="Show right sidebar">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="15" y1="4" x2="15" y2="20"></line></svg></button>'
      document.body.appendChild(f)
    }
    var t = document.querySelector("#rt-topbar .rt-title")
    var titleEl = document.querySelector(".center .article-title, .center h1")
    if (t) t.textContent = titleEl ? titleEl.textContent : document.title
    applySettings()
  }

  function openPanel() {
    var p = document.getElementById("rt-panel")
    if (!p) return
    p.classList.add("open")
    var aa = document.querySelector("#rt-topbar .rt-aa")
    if (aa) aa.setAttribute("aria-expanded", "true")
    showBars()
  }
  function closePanel() {
    var p = document.getElementById("rt-panel")
    if (p) p.classList.remove("open")
    var aa = document.querySelector("#rt-topbar .rt-aa")
    if (aa) aa.setAttribute("aria-expanded", "false")
  }
  function panelOpen() {
    var p = document.getElementById("rt-panel")
    return !!(p && p.classList.contains("open"))
  }

  function showBars() {
    h.setAttribute("data-reader-bars", "")
    clearTimeout(hideTimer)
    hideTimer = setTimeout(function () {
      if (!panelOpen() && !document.querySelector("#rt-topbar:hover")) {
        h.removeAttribute("data-reader-bars")
      }
    }, 2500)
  }

  var words = 0
  function countWords() {
    var a = document.querySelector(".center article")
    words = a ? (a.innerText || "").split(/\s+/).filter(Boolean).length : 0
  }
  function updateProgress() {
    if (!h.hasAttribute("data-reader")) return
    var max = document.documentElement.scrollHeight - window.innerHeight
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 1
    var fill = document.querySelector("#rt-bottombar .rt-progress-fill")
    var txt = document.querySelector("#rt-bottombar .rt-progress-text")
    if (fill) fill.style.width = (p * 100).toFixed(1) + "%"
    if (txt) {
      var left = Math.ceil((words * (1 - p)) / WPM)
      txt.textContent =
        Math.round(p * 100) + "%" + (left > 0 ? " · " + left + " min left in page" : " · end of page")
    }
  }

  function syncButtons() {
    document.querySelectorAll(".rt-btn").forEach(function (b) {
      var a = b.getAttribute("data-rt-action")
      var on =
        a === "reader"
          ? h.hasAttribute("data-reader")
          : h.hasAttribute("data-hide-" + a)
      b.setAttribute("aria-pressed", on ? "true" : "false")
    })
  }

  // ---- events (bound once; delegated so they survive SPA re-renders) --------
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-rt-action], [data-rt-set]")
    if (!t) {
      if (h.hasAttribute("data-reader")) {
        if (panelOpen() && !e.target.closest("#rt-panel")) closePanel()
        else if (!e.target.closest("a, button, input, summary, pre, code")) {
          // tap the page to toggle the bars, like an e-reader
          h.hasAttribute("data-reader-bars") ? h.removeAttribute("data-reader-bars") : showBars()
        }
      }
      return
    }
    var s = state()
    if (t.hasAttribute("data-rt-set")) {
      var k = t.getAttribute("data-rt-set")
      var v = t.getAttribute("data-rt-value")
      var patch = {}
      patch[k] = k === "justify" ? v === "true" : v
      save(patch)
      applySettings()
      return
    }
    switch (t.getAttribute("data-rt-action")) {
      case "left":
        return toggleSide("left")
      case "right":
        return toggleSide("right")
      case "reader":
        return setReader(!h.hasAttribute("data-reader"))
      case "exit":
        return setReader(false)
      case "panel":
        return panelOpen() ? closePanel() : openPanel()
      case "smaller":
        save({ size: Math.max(14, s.size - 1) })
        return applySettings()
      case "larger":
        save({ size: Math.min(30, s.size + 1) })
        return applySettings()
    }
  })

  document.addEventListener("keydown", function (e) {
    var tag = (e.target && e.target.tagName) || ""
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable)) return
    if (e.metaKey || e.ctrlKey || e.altKey) return
    var reading = h.hasAttribute("data-reader")
    if (e.key === "Escape" && reading) {
      if (panelOpen()) closePanel()
      else setReader(false)
    } else if (e.key === "r" || e.key === "R") {
      setReader(!reading)
    } else if (e.key === "[" && !reading) {
      toggleSide("left")
    } else if (e.key === "]" && !reading) {
      toggleSide("right")
    } else if (reading && (e.key === "+" || e.key === "=")) {
      save({ size: Math.min(30, state().size + 1) })
      applySettings()
    } else if (reading && e.key === "-") {
      save({ size: Math.max(14, state().size - 1) })
      applySettings()
    }
  })

  document.addEventListener("mousemove", function (e) {
    if (!h.hasAttribute("data-reader")) return
    if (e.clientY < 90 || window.innerHeight - e.clientY < 70) showBars()
  })
  window.addEventListener(
    "scroll",
    function () {
      updateProgress()
    },
    { passive: true },
  )
  window.addEventListener("resize", updateProgress)

  function setup() {
    ensureStyle(css)
    buildReaderUI()
    syncButtons()
    countWords()
    if (h.hasAttribute("data-reader")) {
      loadFont()
      showBars()
    }
    updateProgress()
  }
  document.addEventListener("nav", setup)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup)
  else setup()
}

// ---------------------------------------------------------------------------
const CSS = `
/* ---------- toolbar buttons ---------- */
.reading-tools { display: flex; align-items: center; gap: 0.15rem; flex-shrink: 0; }
.rt-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 32px; padding: 0; margin: 0;
  border: none; background: none; border-radius: 6px;
  color: var(--darkgray); cursor: pointer; opacity: 0.85;
}
.rt-btn:hover { background: var(--highlight); opacity: 1; }
.rt-btn[aria-pressed="true"] { color: var(--secondary); opacity: 1; }
@media (max-width: 800px) { .rt-btn.rt-left, .rt-btn.rt-right { display: none; } }

/* ---------- hide sidebars (desktop and tablet only) ---------- */
@media (min-width: 800px) {
  html[data-hide-left] .page > #quartz-body .sidebar.left { display: none; }
  html[data-hide-right] .page > #quartz-body .sidebar.right { display: none; }
}
@media (min-width: 1200px) {
  html[data-hide-left] .page > #quartz-body { grid-template-columns: 0 minmax(0, 1fr) 320px !important; }
  html[data-hide-right] .page > #quartz-body { grid-template-columns: 320px minmax(0, 1fr) 0 !important; }
  html[data-hide-left][data-hide-right] .page > #quartz-body { grid-template-columns: 0 minmax(0, 1fr) 0 !important; }
}
@media (min-width: 800px) and (max-width: 1200px) {
  html[data-hide-left] .page > #quartz-body { grid-template-columns: 0 minmax(0, 1fr) !important; }
}
@media (min-width: 800px) {
  /* .center is auto-placed; with the left sidebar gone it would drop into the 0px column */
  html[data-hide-left] .page > #quartz-body > .center { grid-column: 2; }
  html[data-hide-left] .page > #quartz-body :is(.center, .page-header, footer),
  html[data-hide-right] .page > #quartz-body :is(.center, .page-header, footer) {
    width: auto !important; min-width: 0 !important; max-width: 900px !important;
    margin-left: auto !important; margin-right: auto !important; box-sizing: border-box;
    padding-left: 2rem; padding-right: 2rem;
  }
}

/* floating restore buttons */
#rt-float { display: none; }
@media (min-width: 800px) {
  #rt-float { display: block; }
  .rt-float-btn {
    position: fixed; top: 1rem; z-index: 120; display: none;
    align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 8px;
    border: 1px solid var(--lightgray); background: var(--light);
    color: var(--darkgray); cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }
  .rt-float-btn:hover { color: var(--secondary); }
  .rt-float-left { left: 1rem; }
  .rt-float-right { right: 1rem; }
  html[data-hide-left]:not([data-reader]) .rt-float-left { display: inline-flex; }
  html[data-hide-right]:not([data-reader]) .rt-float-right { display: inline-flex; }
  body.has-binder-left .rt-float-left { left: calc(40px + 1rem); }
}

/* ---------- reader: hide everything except the text ---------- */
#rt-topbar, #rt-bottombar, #rt-panel { display: none; }
html[data-reader] .page > #quartz-body .sidebar,
html[data-reader] .page-footer,
html[data-reader] footer,
html[data-reader] #stacked-pages-container,
html[data-reader] .breadcrumb-container,
html[data-reader] .note-properties,
html[data-reader] .tags { display: none !important; }
html[data-reader] body .page { padding: 0 !important; }
html[data-reader] .page > #quartz-body {
  display: block !important; width: auto !important; max-width: none !important; padding: 0 !important;
}
html[data-reader] .page > #quartz-body .center {
  width: auto !important; min-width: 0 !important; max-width: var(--rt-measure) !important;
  margin: 0 auto !important; padding: 5.5rem 1.5rem 6rem !important; box-sizing: content-box !important;
}
/* margins: small margins = wide text column */
html[data-reader][data-reader-width="small"]  { --rt-measure: 900px; }
html[data-reader][data-reader-width="medium"] { --rt-measure: 700px; }
html[data-reader][data-reader-width="large"]  { --rt-measure: 560px; }

/* typography */
html[data-reader] .center article,
html[data-reader] .center .page-header {
  font-size: var(--reader-size, 19px);
}
html[data-reader] .center article { line-height: var(--rt-leading); }
html[data-reader][data-reader-spacing="compact"] { --rt-leading: 1.45; }
html[data-reader][data-reader-spacing="normal"]  { --rt-leading: 1.7; }
html[data-reader][data-reader-spacing="relaxed"] { --rt-leading: 2; }
html[data-reader][data-reader-font="serif"] .center article,
html[data-reader][data-reader-font="serif"] .center .page-header,
html[data-reader][data-reader-font="serif"] .center article :is(h1,h2,h3,h4,h5,h6) {
  font-family: "Literata", "Bookerly", Georgia, "Iowan Old Style", "Palatino Linotype", serif;
}
html[data-reader][data-reader-font="sans"] .center article,
html[data-reader][data-reader-font="sans"] .center .page-header {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
html[data-reader] .center article :is(p, li, td, th, blockquote, dd, dt, figcaption) {
  font-family: inherit !important; font-size: inherit !important; line-height: inherit !important;
}
html[data-reader] .center article :is(strong, em, b, i, a, span):not(pre *) { font-family: inherit !important; }
html[data-reader] .center article :is(h1, h2, h3, h4, h5, h6) { line-height: 1.3; }
html[data-reader] .center article :is(pre, code, kbd, pre *) { font-family: var(--codeFont), ui-monospace, monospace !important; }
html[data-reader] .center article :not(pre) > code { font-size: 0.85em !important; }
html[data-reader][data-reader-justify] .center article :is(p, li) {
  text-align: justify; hyphens: auto; -webkit-hyphens: auto;
}
html[data-reader] .center article img { border-radius: 4px; }
html[data-reader] .center .article-title { font-size: 2em; line-height: 1.2; margin-top: 0; }

/* reading themes: override Quartz and Obsidian-theme variables */
html[data-reader][data-reader-theme="white"], html[data-reader][data-reader-theme="white"] body {
  --light: #ffffff; --lightgray: #e8e8e8; --gray: #8a8a8a; --darkgray: #222222; --dark: #111111;
  --secondary: #1f5f99; --tertiary: #3f86c4; --highlight: rgba(31,95,153,0.08);
  --background-primary: #ffffff; --background-secondary: #f3f3f3;
  --text-normal: #222222; --text-muted: #6a6a6a; --text-faint: #8a8a8a; --text-accent: #1f5f99;
}
html[data-reader][data-reader-theme="sepia"], html[data-reader][data-reader-theme="sepia"] body {
  --light: #f4ecd8; --lightgray: #e4d8bc; --gray: #9b8b72; --darkgray: #4b3b2a; --dark: #3a2c1e;
  --secondary: #8a4b1f; --tertiary: #a8693a; --highlight: rgba(138,75,31,0.09);
  --background-primary: #f4ecd8; --background-secondary: #ebe1c8;
  --text-normal: #4b3b2a; --text-muted: #7a6650; --text-faint: #9b8b72; --text-accent: #8a4b1f;
}
html[data-reader][data-reader-theme="green"], html[data-reader][data-reader-theme="green"] body {
  --light: #dcebd9; --lightgray: #c5dbc1; --gray: #7f977b; --darkgray: #263826; --dark: #1b2b1b;
  --secondary: #2f6b3a; --tertiary: #4c8a57; --highlight: rgba(47,107,58,0.09);
  --background-primary: #dcebd9; --background-secondary: #cfe2cb;
  --text-normal: #263826; --text-muted: #4f6a4d; --text-faint: #7f977b; --text-accent: #2f6b3a;
}
html[data-reader][data-reader-theme="dark"], html[data-reader][data-reader-theme="dark"] body {
  --light: #121212; --lightgray: #2a2a2a; --gray: #7a7a7a; --darkgray: #d9d4cc; --dark: #ece7df;
  --secondary: #e0a56b; --tertiary: #c98d55; --highlight: rgba(224,165,107,0.12);
  --background-primary: #121212; --background-secondary: #1c1c1c;
  --text-normal: #d9d4cc; --text-muted: #a39e96; --text-faint: #7a7a7a; --text-accent: #e0a56b;
}
html[data-reader][data-reader-theme="white"], html[data-reader][data-reader-theme="white"] body { --code-background: #f4f4f4; --code-normal: #222222; }
html[data-reader][data-reader-theme="sepia"], html[data-reader][data-reader-theme="sepia"] body { --code-background: #ebe1c8; --code-normal: #4b3b2a; }
html[data-reader][data-reader-theme="green"], html[data-reader][data-reader-theme="green"] body { --code-background: #cfe2cb; --code-normal: #263826; }
html[data-reader][data-reader-theme="dark"], html[data-reader][data-reader-theme="dark"] body { --code-background: #1e1e1e; --code-normal: #d9d4cc; }
html[data-reader] body code { background-color: var(--code-background) !important; color: var(--code-normal) !important; }
html[data-reader] body pre, html[data-reader] body pre > code,
html[data-reader] body figure[data-rehype-pretty-code-figure] { background-color: var(--code-background) !important; }
html[data-reader] body pre > code > [data-line] { background-color: transparent !important; }
/* syntax colours: pick the matching Shiki palette for the reading theme */
html[data-reader]:not([data-reader-theme="dark"]) body code[data-theme*=" "] span { color: var(--shiki-light) !important; }
html[data-reader][data-reader-theme="dark"] body code[data-theme*=" "] span { color: var(--shiki-dark) !important; }
html[data-reader] .center, html[data-reader] .page > #quartz-body,
html[data-reader] #quartz-root.page { background-color: var(--light) !important; color: var(--darkgray) !important; }
html[data-reader] body { background: var(--light); color: var(--darkgray); transition: background 0.2s, color 0.2s; }
html[data-reader][data-reader-theme="dark"] .center article img { filter: brightness(0.88); }

/* top bar */
html[data-reader] #rt-topbar {
  display: flex; align-items: center; gap: 0.75rem;
  position: fixed; top: 0; left: 0; right: 0; height: 52px; padding: 0 1rem;
  z-index: 200; background: var(--light); color: var(--darkgray);
  border-bottom: 1px solid var(--lightgray);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 0.95rem;
  transform: translateY(-100%); transition: transform 0.25s ease;
}
html[data-reader][data-reader-bars] #rt-topbar { transform: none; }
.rt-title { flex: 1; text-align: center; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rt-bar-btn {
  display: inline-flex; align-items: center; gap: 0.25rem;
  border: none; background: none; color: inherit; font: inherit; cursor: pointer;
  padding: 0.4rem 0.6rem; border-radius: 6px;
}
.rt-bar-btn:hover { background: var(--highlight); }
.rt-aa { font-family: Georgia, serif; font-size: 1.15rem; font-weight: 600; min-width: 44px; justify-content: center; }
.rt-aa[aria-expanded="true"] { background: var(--highlight); color: var(--secondary); }

/* settings panel */
html[data-reader] #rt-panel {
  display: block; position: fixed; top: 60px; right: 1rem; z-index: 210;
  width: min(340px, calc(100vw - 2rem)); box-sizing: border-box; padding: 1rem;
  background: var(--light); color: var(--darkgray);
  border: 1px solid var(--lightgray); border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 0.9rem;
  opacity: 0; visibility: hidden; transform: translateY(-6px);
  transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
}
html[data-reader] #rt-panel.open { opacity: 1; visibility: visible; transform: none; }
.rt-row { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.45rem 0; }
.rt-row + .rt-row { border-top: 1px solid var(--lightgray); }
.rt-label { color: var(--gray); white-space: nowrap; }
.rt-group { display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; justify-content: flex-end; }
.rt-choice {
  border: 1px solid var(--lightgray); background: none; color: inherit; font: inherit;
  padding: 0.3rem 0.6rem; border-radius: 6px; cursor: pointer; line-height: 1.2;
}
.rt-choice:hover { border-color: var(--gray); }
.rt-choice[aria-pressed="true"] { border-color: var(--secondary); color: var(--secondary); box-shadow: inset 0 0 0 1px var(--secondary); }
.rt-size-value { min-width: 3.2em; text-align: center; font-variant-numeric: tabular-nums; }
.rt-swatch { width: 52px; padding: 0.35rem 0; font-size: 0.75rem; }
.rt-sw-white { background: #ffffff; color: #222; }
.rt-sw-sepia { background: #f4ecd8; color: #4b3b2a; }
.rt-sw-green { background: #dcebd9; color: #263826; }
.rt-sw-dark  { background: #121212; color: #d9d4cc; }

/* bottom progress */
html[data-reader] #rt-bottombar {
  display: block; position: fixed; left: 0; right: 0; bottom: 0; z-index: 200;
  background: var(--light); color: var(--gray);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 0.8rem;
}
.rt-progress { height: 3px; background: var(--lightgray); }
.rt-progress-fill { height: 100%; width: 0; background: var(--secondary); transition: width 0.1s linear; }
.rt-progress-text { text-align: center; padding: 0.35rem 0 0.5rem; }

@media (max-width: 800px) {
  html[data-reader] .page > #quartz-body .center { padding: 4.5rem 1.1rem 5rem; }
  html[data-reader] .center .article-title { font-size: 1.6em; }
}
@media print {
  #rt-topbar, #rt-bottombar, #rt-panel, #rt-float { display: none !important; }
}
`

export const ReadingTools = () => {
  const Component = ({ displayClass }) =>
    jsx("div", {
      class: ["reading-tools", displayClass].filter(Boolean).join(" "),
      children: [
        button("left", "Toggle left sidebar ([)", ICONS.left),
        button("right", "Toggle right sidebar (])", ICONS.right),
        button("reader", "Reader mode (R)", ICONS.reader),
      ],
    })
  const css = JSON.stringify(CSS)
  Component.beforeDOMLoaded = `${ensureStyle.toString()};(${beforeDOM.toString()})(${css});`
  Component.afterDOMLoaded = `${ensureStyle.toString()};(${afterDOM.toString()})(${css});`
  return Component
}

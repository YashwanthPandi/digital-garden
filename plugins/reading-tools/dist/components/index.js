// Reading tools: toolbar buttons to hide the left/right sidebars, a
// Kindle-style reader mode (distraction-free column, reading themes, font,
// size, spacing and width settings, progress and time left), a site settings
// panel saved in the browser (appearance, text, code blocks, layout), and
// GitHub-style code block styling.
//
// State lives on <html> as data attributes so it survives SPA navigation:
//   data-hide-left, data-hide-right, data-reader, data-reader-theme,
//   data-reader-font, data-reader-spacing, data-reader-width, data-reader-justify
// and --reader-size. Site settings add data-site-size, data-site-font,
// data-site-spacing, data-code-wrap, data-code-lines and data-code-size.
// Preferences are saved in localStorage under "reading-tools"; light/dark uses
// the darkmode plugin's own "theme" key (no key = follow the system).
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
  settings: (label) =>
    svg(
      [
        jsx("circle", { cx: 12, cy: 12, r: 3 }),
        jsx("path", {
          d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z",
        }),
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
    if (s.siteSize && s.siteSize !== "m") h.setAttribute("data-site-size", s.siteSize)
    if (s.siteFont === "serif") h.setAttribute("data-site-font", "serif")
    if (s.siteSpacing && s.siteSpacing !== "normal") h.setAttribute("data-site-spacing", s.siteSpacing)
    if (s.codeWrap) h.setAttribute("data-code-wrap", "")
    if (s.codeLines === false) h.setAttribute("data-code-lines", "off")
    if (s.codeSize && s.codeSize !== "m") h.setAttribute("data-code-size", s.codeSize)
    if (s.appearance === "system") {
      // follow the OS: clear the darkmode plugin's explicit choice
      localStorage.removeItem("theme")
      h.setAttribute(
        "saved-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
      )
    }
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
    if (typeof applySite === "function") applySite()
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
    closeSettings()
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
        // the toolbar gear lives in the left sidebar, so keep settings reachable when it is hidden
        '<button type="button" class="rt-float-btn rt-float-settings" data-rt-action="settings" title="Settings (,)" aria-label="Settings">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"></path></svg></button>' +
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
          : a === "settings"
            ? settingsOpen()
            : h.hasAttribute("data-hide-" + a)
      b.setAttribute("aria-pressed", on ? "true" : "false")
    })
  }

  // ---- site settings ------------------------------------------------------
  function siteState() {
    var s = load()
    var theme = null
    try {
      theme = localStorage.getItem("theme")
    } catch (e) {}
    var graphCollapsed = false
    try {
      graphCollapsed = localStorage.getItem("graph-collapsed") === "true"
    } catch (e) {}
    return {
      appearance: s.appearance === "system" || !theme ? "system" : theme,
      siteSize: s.siteSize || "m",
      siteFont: s.siteFont || "sans",
      siteSpacing: s.siteSpacing || "normal",
      codeWrap: s.codeWrap ? "on" : "off",
      codeLines: s.codeLines === false ? "off" : "on",
      codeSize: s.codeSize || "m",
      left: h.hasAttribute("data-hide-left") ? "hide" : "show",
      right: h.hasAttribute("data-hide-right") ? "hide" : "show",
      graph: graphCollapsed ? "collapsed" : "expanded",
    }
  }
  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  function setTheme(t) {
    h.setAttribute("saved-theme", t)
    if (document.body) {
      document.body.classList.remove("theme-dark", "theme-light")
      document.body.classList.add("theme-" + t)
    }
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: t } }))
  }
  function setAppearance(v) {
    try {
      if (v === "system") localStorage.removeItem("theme")
      else localStorage.setItem("theme", v)
    } catch (e) {}
    save({ appearance: v === "system" ? "system" : undefined })
    setTheme(v === "system" ? systemTheme() : v)
  }
  function setGraph(collapsed) {
    try {
      localStorage.setItem("graph-collapsed", String(collapsed))
    } catch (e) {}
    document.querySelectorAll(".graph").forEach(function (g) {
      g.classList.toggle("collapsed", collapsed)
      var b = g.querySelector(".graph-header")
      if (b) b.setAttribute("aria-expanded", collapsed ? "false" : "true")
    })
  }
  function applySite() {
    var s = load()
    s.siteSize && s.siteSize !== "m"
      ? h.setAttribute("data-site-size", s.siteSize)
      : h.removeAttribute("data-site-size")
    if (s.siteFont === "serif") {
      loadFont()
      h.setAttribute("data-site-font", "serif")
    } else h.removeAttribute("data-site-font")
    s.siteSpacing && s.siteSpacing !== "normal"
      ? h.setAttribute("data-site-spacing", s.siteSpacing)
      : h.removeAttribute("data-site-spacing")
    flag("data-code-wrap", !!s.codeWrap)
    s.codeLines === false ? h.setAttribute("data-code-lines", "off") : h.removeAttribute("data-code-lines")
    s.codeSize && s.codeSize !== "m"
      ? h.setAttribute("data-code-size", s.codeSize)
      : h.removeAttribute("data-code-size")
    var panel = document.getElementById("rt-settings")
    if (!panel) return
    var st = siteState()
    panel.querySelectorAll("[data-rt-site]").forEach(function (b) {
      var k = b.getAttribute("data-rt-site")
      b.setAttribute("aria-pressed", st[k] === b.getAttribute("data-rt-value") ? "true" : "false")
    })
  }
  function setSite(k, v) {
    switch (k) {
      case "appearance":
        setAppearance(v)
        break
      case "left":
      case "right":
        if ((v === "hide") !== h.hasAttribute("data-hide-" + k)) toggleSide(k)
        break
      case "graph":
        setGraph(v === "collapsed")
        break
      case "codeWrap":
        save({ codeWrap: v === "on" })
        break
      case "codeLines":
        save({ codeLines: v === "on" })
        break
      default:
        var patch = {}
        patch[k] = v
        save(patch)
    }
    applySite()
  }
  function siteChoice(key, value, label) {
    return (
      '<button type="button" class="rt-choice" data-rt-site="' +
      key +
      '" data-rt-value="' +
      value +
      '">' +
      label +
      "</button>"
    )
  }
  function siteRow(label, key, options) {
    return (
      '<div class="rt-row"><span class="rt-label">' +
      label +
      '</span><div class="rt-group">' +
      options
        .map(function (o) {
          return siteChoice(key, o[0], o[1])
        })
        .join("") +
      "</div></div>"
    )
  }
  // Modal: #rt-settings is the backdrop, .rt-modal the dialog box inside it.
  function buildSettingsUI() {
    if (document.getElementById("rt-settings")) return
    var p = el("div", { id: "rt-settings" })
    p.innerHTML =
      '<div class="rt-modal" role="dialog" aria-modal="true" aria-labelledby="rt-settings-title" tabindex="-1">' +
      '<div class="rt-settings-head"><strong id="rt-settings-title">Settings</strong>' +
      '<button type="button" class="rt-bar-btn rt-close" data-rt-action="settings-close" aria-label="Close settings (Esc)" title="Close (Esc)">✕</button></div>' +
      '<div class="rt-modal-body">' +
      '<div class="rt-section">Appearance</div>' +
      siteRow("Theme", "appearance", [["light", "Light"], ["dark", "Dark"], ["system", "System"]]) +
      siteRow("Text size", "siteSize", [["s", "S"], ["m", "M"], ["l", "L"], ["xl", "XL"]]) +
      siteRow("Font", "siteFont", [["sans", "Sans"], ["serif", '<span style="font-family:Literata,Georgia,serif">Serif</span>']]) +
      siteRow("Line spacing", "siteSpacing", [["compact", "Compact"], ["normal", "Normal"], ["relaxed", "Relaxed"]]) +
      '<div class="rt-section">Code</div>' +
      siteRow("Wrap long lines", "codeWrap", [["off", "Off"], ["on", "On"]]) +
      siteRow("Line numbers", "codeLines", [["off", "Off"], ["on", "On"]]) +
      siteRow("Code size", "codeSize", [["s", "S"], ["m", "M"], ["l", "L"]]) +
      '<div class="rt-section">Layout</div>' +
      siteRow("Left sidebar", "left", [["show", "Show"], ["hide", "Hide"]]) +
      siteRow("Right sidebar", "right", [["show", "Show"], ["hide", "Hide"]]) +
      siteRow("Graph view", "graph", [["expanded", "Open"], ["collapsed", "Collapsed"]]) +
      '<div class="rt-settings-foot">' +
      '<button type="button" class="rt-choice" data-rt-action="reader">Open reader mode</button>' +
      '<button type="button" class="rt-choice rt-reset" data-rt-action="reset">Reset all</button></div>' +
      '<p class="rt-note">Saved in this browser only.</p>' +
      "</div></div>"
    document.body.appendChild(p)
    applySite()
  }
  function settingsOpen() {
    var p = document.getElementById("rt-settings")
    return !!(p && p.classList.contains("open"))
  }
  var lastFocus = null
  function openSettings() {
    buildSettingsUI()
    var p = document.getElementById("rt-settings")
    applySite()
    lastFocus = document.activeElement
    p.classList.add("open")
    h.setAttribute("data-rt-modal", "")
    var m = p.querySelector(".rt-modal")
    if (m) m.focus({ preventScroll: true })
    syncButtons()
  }
  function closeSettings() {
    var p = document.getElementById("rt-settings")
    var wasOpen = !!(p && p.classList.contains("open"))
    if (p) p.classList.remove("open")
    h.removeAttribute("data-rt-modal")
    syncButtons()
    if (wasOpen && lastFocus && document.contains(lastFocus) && lastFocus.offsetParent) {
      lastFocus.focus({ preventScroll: true })
    }
    lastFocus = null
  }
  // keep Tab inside the modal while it is open
  function trapFocus(e) {
    var m = document.querySelector("#rt-settings .rt-modal")
    if (!m) return
    var items = Array.prototype.filter.call(m.querySelectorAll("button"), function (b) {
      return b.offsetParent !== null
    })
    if (!items.length) return
    var first = items[0]
    var last = items[items.length - 1]
    if (e.shiftKey && (document.activeElement === first || document.activeElement === m)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
  function resetAll() {
    try {
      localStorage.removeItem(KEY)
      localStorage.removeItem("theme")
      localStorage.removeItem("graph-collapsed")
    } catch (e) {}
    location.reload()
  }
  // keep "System" sticky when the OS theme changes (darkmode plugin would save it)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (load().appearance === "system") {
      setTimeout(function () {
        try {
          localStorage.removeItem("theme")
        } catch (e) {}
        applySite()
      }, 0)
    }
  })

  // ---- events (bound once; delegated so they survive SPA re-renders) --------
  document.addEventListener("click", function (e) {
    // the darkmode toggle sets an explicit theme, so leave "System"
    if (e.target.closest(".darkmode")) {
      save({ appearance: undefined })
      setTimeout(applySite, 0)
    }
    var site = e.target.closest("[data-rt-site]")
    if (site) {
      setSite(site.getAttribute("data-rt-site"), site.getAttribute("data-rt-value"))
      return
    }
    var act = e.target.closest("[data-rt-action]")
    var a = act && act.getAttribute("data-rt-action")
    if (a === "settings") return settingsOpen() ? closeSettings() : openSettings()
    if (a === "settings-close") return closeSettings()
    if (a === "reset") return resetAll()
    // click on the backdrop closes the modal and goes no further
    if (settingsOpen() && !e.target.closest("#rt-settings .rt-modal")) return closeSettings()
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
    if (settingsOpen()) {
      // the modal owns the keyboard: only Esc, "," and Tab do anything
      if (e.key === "Escape" || (e.key === "," && !e.metaKey && !e.ctrlKey && !e.altKey)) {
        e.preventDefault()
        closeSettings()
      } else if (e.key === "Tab") trapFocus(e)
      return
    }
    var tag = (e.target && e.target.tagName) || ""
    if (/INPUT|TEXTAREA|SELECT/.test(tag) || (e.target && e.target.isContentEditable)) return
    if (e.metaKey || e.ctrlKey || e.altKey) return
    var reading = h.hasAttribute("data-reader")
    if (e.key === "," && !reading) {
      openSettings()
    } else if (e.key === "Escape" && reading) {
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
    closeSettings()
    applySite()
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
  .rt-float-settings { left: calc(1rem + 42px); }
  .rt-float-right { right: 1rem; }
  html[data-hide-left]:not([data-reader]) :is(.rt-float-left, .rt-float-settings) { display: inline-flex; }
  body.has-binder-left .rt-float-settings { left: calc(40px + 1rem + 42px); }
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
/* ---------- settings modal ---------- */
/* #rt-settings is the full-screen backdrop; .rt-modal is the centred dialog */
#rt-settings {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; align-items: center; justify-content: center; padding: 1rem;
  box-sizing: border-box; background: rgba(0,0,0,0.45);
  -webkit-backdrop-filter: blur(2px); backdrop-filter: blur(2px);
  opacity: 0; visibility: hidden; transition: opacity 0.18s, visibility 0.18s;
}
#rt-settings.open { opacity: 1; visibility: visible; }
html[data-rt-modal], html[data-rt-modal] body { overflow: hidden !important; }
#rt-settings .rt-modal {
  display: flex; flex-direction: column;
  width: min(460px, 100%); max-height: min(720px, calc(100vh - 2rem)); max-height: min(720px, calc(100dvh - 2rem));
  box-sizing: border-box; overflow: hidden;
  background: var(--light); color: var(--darkgray);
  border: 1px solid var(--lightgray); border-radius: 14px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.3);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 0.9rem; line-height: 1.3;
  text-align: left; transform: translateY(8px) scale(0.98); transition: transform 0.18s ease;
}
#rt-settings.open .rt-modal { transform: none; }
#rt-settings .rt-modal:focus { outline: none; }
html[saved-theme="dark"] #rt-settings { background: rgba(0,0,0,0.6); }
html[saved-theme="dark"] #rt-settings .rt-modal { box-shadow: 0 24px 60px rgba(0,0,0,0.7); }
.rt-settings-head {
  display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
  padding: 0.75rem 0.75rem 0.75rem 1.25rem; border-bottom: 1px solid var(--lightgray); font-size: 1.05rem;
}
.rt-settings-head strong { color: var(--dark); }
#rt-settings .rt-close { width: 32px; height: 32px; padding: 0; justify-content: center; font-size: 1rem; }
.rt-modal-body { overflow-y: auto; overscroll-behavior: contain; padding: 0.25rem 1.25rem 1rem; }
.rt-section {
  margin-top: 1rem; padding-bottom: 0.2rem; font-size: 0.7rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--secondary);
}
#rt-settings .rt-row { padding: 0.45rem 0; margin: 0; }
#rt-settings .rt-row + .rt-row { border-top: 1px solid var(--lightgray); }
#rt-settings .rt-label { color: var(--darkgray); }
#rt-settings .rt-choice {
  margin: 0; padding: 0.3rem 0.65rem; font-size: 0.84rem; min-height: 30px;
  background: transparent; color: var(--darkgray);
}
#rt-settings .rt-choice[aria-pressed="true"] {
  color: var(--secondary); background: color-mix(in srgb, var(--secondary) 14%, transparent);
}
#rt-settings button:focus-visible { outline: 2px solid var(--secondary); outline-offset: 2px; }
.rt-settings-foot {
  display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 1rem;
  padding-top: 0.85rem; border-top: 1px solid var(--lightgray);
}
.rt-settings-foot .rt-reset:hover { border-color: #d64545 !important; color: #d64545 !important; }
.rt-note { margin: 0.6rem 0 0; color: var(--gray); font-size: 0.75rem; text-align: center; }
@media (max-width: 600px) {
  /* bottom sheet on phones */
  #rt-settings { align-items: flex-end; padding: 0; }
  #rt-settings .rt-modal {
    width: 100%; max-height: 85vh; max-height: 85dvh;
    border-radius: 16px 16px 0 0; border-bottom: 0; transform: translateY(24px);
  }
  #rt-settings .rt-row { flex-wrap: wrap; }
  .rt-modal-body { padding-bottom: calc(1rem + env(safe-area-inset-bottom)); }
}
@media (max-width: 800px) {
  /* sidebar toggles only apply on tablet/desktop */
  #rt-settings .rt-row:has([data-rt-site="left"]),
  #rt-settings .rt-row:has([data-rt-site="right"]) { display: none; }
}

/* ---------- site text settings (normal view, not reader) ---------- */
html[data-site-size="s"]  { --rt-site-size: 15px; }
html[data-site-size="l"]  { --rt-site-size: 18.5px; }
html[data-site-size="xl"] { --rt-site-size: 20.5px; }
html[data-site-size]:not([data-reader]) .center article { font-size: var(--rt-site-size) !important; }
html[data-site-size]:not([data-reader]) .center article :is(p, li, td, th, blockquote, dd, dt) { font-size: inherit !important; }
html[data-site-font="serif"]:not([data-reader]) .center :is(article, .article-title),
html[data-site-font="serif"]:not([data-reader]) .center article :is(p, li, td, th, blockquote, dd, dt, h1, h2, h3, h4, h5, h6, strong, em, a) {
  font-family: "Literata", Georgia, "Iowan Old Style", "Palatino Linotype", serif !important;
}
html[data-site-spacing="compact"]:not([data-reader]) .center article :is(p, li) { line-height: 1.45 !important; }
html[data-site-spacing="relaxed"]:not([data-reader]) .center article :is(p, li) { line-height: 1.95 !important; }

/* ---------- code blocks (GitHub-style, both themes) ---------- */
:root { --rt-code-bg: #f6f8fa; --rt-code-border: #d0d7de; --rt-code-muted: #8c959f; }
html[saved-theme="dark"] { --rt-code-bg: #161b22; --rt-code-border: #30363d; --rt-code-muted: #6e7681; }
html[data-code-size="s"] { --rt-code-size: 0.78rem; }
html[data-code-size="l"] { --rt-code-size: 0.95rem; }
.center article figure[data-rehype-pretty-code-figure] { margin: 1.1rem 0 !important; }
.center article pre {
  position: relative !important;
  background: var(--rt-code-bg) !important;
  border: 1px solid var(--rt-code-border) !important;
  border-radius: 8px !important;
  padding: 0 !important; margin: 0 !important; overflow: hidden !important;
}
.center article pre > code {
  padding: 0.85rem 0 !important; margin: 0 !important;
  background: transparent !important; border: 0 !important; border-radius: 0 !important;
  font-size: var(--rt-code-size, 0.85rem) !important; line-height: 1.65 !important;
  overflow-x: auto !important;
}
.center article pre > code > [data-line] {
  padding: 0 1rem !important; background: transparent !important; border-left: 0 !important;
}
.center article pre > code > [data-line]::before { color: var(--rt-code-muted) !important; }
.center article pre > code > [data-line][data-highlighted-line] {
  background: var(--highlight) !important; box-shadow: inset 3px 0 0 var(--secondary);
}
html[data-code-lines="off"] .center article pre > code > [data-line]::before { display: none !important; }
html[data-code-wrap] .center article pre > code {
  grid-template-columns: minmax(0, 1fr); white-space: pre-wrap !important;
  overflow-wrap: anywhere; overflow-x: hidden !important;
}
html[data-code-wrap] .center article pre > code > [data-line] { white-space: pre-wrap !important; }
/* language label, hidden while the copy button shows */
.center article pre[data-language]::before {
  content: attr(data-language); position: absolute; top: 0.5rem; right: 0.8rem; z-index: 1;
  font: 600 0.66rem/1 system-ui, -apple-system, sans-serif; letter-spacing: 0.07em;
  text-transform: uppercase; color: var(--rt-code-muted); pointer-events: none;
  transition: opacity 0.15s;
}
.center article pre[data-language="plaintext"]::before,
.center article pre[data-language="text"]::before { content: none; }
.center article pre:hover::before, .center article pre:focus-within::before { opacity: 0; }
.center article pre > .clipboard-button {
  top: 0.35rem !important; right: 0.35rem !important; margin: 0 !important; z-index: 2;
  background: var(--rt-code-bg) !important; border: 1px solid var(--rt-code-border) !important;
  border-radius: 6px !important; color: var(--rt-code-muted);
}
.center article pre > .clipboard-button svg { fill: currentColor; }
.center article pre > .clipboard-button:hover { color: var(--secondary); }
@media (hover: none) {
  /* touch screens can't hover: always show copy, drop the label */
  .center article pre > .clipboard-button { opacity: 1 !important; }
  .center article pre[data-language]::before { content: none; }
}
/* inline code */
.center article :not(pre) > code {
  background: var(--rt-code-bg) !important; border: 1px solid var(--rt-code-border) !important;
  border-radius: 5px !important; padding: 0.08em 0.36em !important;
  font-size: 0.86em !important; overflow-wrap: anywhere;
}
/* reader themes use their own palette */
html[data-reader] { --rt-code-bg: var(--code-background); --rt-code-border: var(--lightgray); --rt-code-muted: var(--gray); }

@media print {
  #rt-topbar, #rt-bottombar, #rt-panel, #rt-float, #rt-settings { display: none !important; }
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
        button("settings", "Settings (,)", ICONS.settings),
      ],
    })
  const css = JSON.stringify(CSS)
  Component.beforeDOMLoaded = `${ensureStyle.toString()};(${beforeDOM.toString()})(${css});`
  Component.afterDOMLoaded = `${ensureStyle.toString()};(${afterDOM.toString()})(${css});`
  return Component
}

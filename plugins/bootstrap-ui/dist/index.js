// Bootstrap UI: loads Bootstrap 5.3 on every page and turns Quartz's own UI into
// Bootstrap components.
//
// - Bootstrap's colour, font and border variables are pointed at the Quartz theme
//   variables (--light, --darkgray, --secondary, ...), so the light/dark palette from
//   quartz.config.yaml still applies.
// - <html data-bs-theme> follows Quartz's dark-mode toggle (the `saved-theme` attribute).
// - After every page load (the SPA "nav" event) Quartz markup gets Bootstrap classes:
//   breadcrumbs, tables, tags, search box, images, folder/tag listings, notebook
//   chapter lists, and "Prev: ... · Next: ..." lines (turned into buttons).
//
// Bootstrap loads after Quartz's stylesheet, so its base styles win; BRIDGE below
// restores the few Quartz rules the notes depend on (heading spacing, link and code
// colours) and resets Bootstrap's `.popover`, which Quartz uses for link previews.

const BOOTSTRAP_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"

const BRIDGE = `
:root[data-bs-theme], :root {
  --bs-body-bg: var(--light);
  --bs-body-color: var(--darkgray);
  --bs-body-font-family: var(--bodyFont), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --bs-font-monospace: var(--codeFont), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --bs-heading-color: var(--dark);
  --bs-emphasis-color: var(--dark);
  --bs-border-color: var(--lightgray);
  --bs-secondary-color: var(--gray);
  --bs-tertiary-bg: var(--highlight);
  --bs-code-color: var(--dark);
  --bs-link-color: var(--secondary);
  --bs-link-hover-color: var(--tertiary);
  --bs-primary: #3f6b4a;
  --bs-primary-rgb: 63, 107, 74;
  --bs-success: #3f6b4a;
  --bs-success-rgb: 63, 107, 74;
  --bs-focus-ring-color: rgba(63, 107, 74, 0.25);
}
:root[data-bs-theme="dark"] {
  --bs-primary: #8fb38f;
  --bs-primary-rgb: 143, 179, 143;
  --bs-success: #8fb38f;
  --bs-success-rgb: 143, 179, 143;
}
body { background-color: var(--light); color: var(--darkgray); }

/* Quartz typography the notes rely on */
a { color: var(--secondary); text-decoration: none; }
a:hover { color: var(--tertiary); }
h1, h2, h3, h4, h5, h6 { font-family: var(--headerFont), system-ui, -apple-system, "Segoe UI", sans-serif; font-weight: 700; line-height: 1.25; }
.center article h1 { font-size: 1.75rem; margin: 2.25rem 0 1rem; }
.center article h2 { font-size: 1.4rem; margin: 1.9rem 0 1rem; }
.center article h3 { font-size: 1.12rem; margin: 1.62rem 0 1rem; }
.center article :is(h4, h5, h6) { font-size: 1rem; margin: 1.5rem 0 1rem; }
code { color: var(--dark); font-size: 0.9em; }

/* Bootstrap primary/success buttons and bars use the notebook green */
.btn-primary {
  --bs-btn-bg: #3f6b4a; --bs-btn-border-color: #3f6b4a;
  --bs-btn-hover-bg: #34593d; --bs-btn-hover-border-color: #34593d;
  --bs-btn-active-bg: #2c4b34; --bs-btn-active-border-color: #2c4b34;
}
.btn-outline-primary {
  --bs-btn-color: var(--bs-primary); --bs-btn-border-color: var(--bs-primary);
  --bs-btn-hover-bg: var(--bs-primary); --bs-btn-hover-border-color: var(--bs-primary);
  --bs-btn-hover-color: var(--light); --bs-btn-active-bg: var(--bs-primary);
  --bs-btn-active-border-color: var(--bs-primary); --bs-btn-active-color: var(--light);
}
.progress { --bs-progress-bg: var(--lightgray); }
.progress-bar { --bs-progress-bar-bg: var(--bs-primary); }
.card { --bs-card-bg: var(--light); --bs-card-border-color: var(--lightgray); }
.list-group {
  --bs-list-group-bg: var(--light); --bs-list-group-color: var(--darkgray);
  --bs-list-group-border-color: var(--lightgray);
}

/* Quartz styles every internal link as a highlighted chip; not inside Bootstrap components */
a.internal.btn { background-color: var(--bs-btn-bg); padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x); border-radius: var(--bs-btn-border-radius); line-height: var(--bs-btn-line-height); }
a.internal.btn:hover { background-color: var(--bs-btn-hover-bg); color: var(--bs-btn-hover-color); }
.breadcrumb a.internal, .card a.internal.stretched-link { background: none; padding: 0; }

/* Quartz link previews use .popover too: undo Bootstrap's tooltip-style popover box */
.popover:not([class*="bs-popover"]) {
  max-width: none; background: transparent; border: 0; border-radius: 0;
  font: inherit; line-height: inherit; text-align: inherit; box-shadow: none;
}

/* breadcrumbs: Bootstrap draws the separators */
.breadcrumb { margin: 0 0 0.5rem; padding: 0; background: none; font-size: 0.9rem; }
.breadcrumb .breadcrumb-element > p { display: none; }
.breadcrumb-item + .breadcrumb-item::before { content: "›"; color: var(--gray); }
.breadcrumb-item.active { color: var(--gray); }

/* tables */
.center article .table { --bs-table-bg: transparent; --bs-table-color: var(--darkgray); --bs-table-striped-bg: var(--highlight); --bs-table-hover-bg: var(--highlight); margin: 1rem 0; width: auto; }
.center article .table > :not(caption) > * > * { padding: 0.45rem 0.75rem; }
.center article .table th { border-bottom: 2px solid var(--gray); }

/* chapter lists on notebook and folder index pages */
.center article .list-group { padding-left: 0; margin: 1rem 0 1.5rem; }
.center article .list-group-item { line-height: 1.5; }
.center article .list-group-item::marker { content: none; }
.center article .list-group-item:has(> a.np-done-link) { border-left: 4px solid var(--bs-success); }

/* Prev / Next buttons */
.bs-pager { display: flex; justify-content: space-between; gap: 0.75rem; margin: 2rem 0 1rem; flex-wrap: wrap; }
.bs-pager .btn { max-width: 48%; white-space: normal; text-align: left; }
.bs-pager .btn.next { margin-left: auto; text-align: right; }
@media (max-width: 600px) { .bs-pager .btn { max-width: 100%; flex: 1 1 100%; } }

/* Quartz restyles every checkbox (task lists); give Bootstrap's checks and switches their own look */
.form-check .form-check-input[type="checkbox"] {
  border: 1px solid var(--gray); transform: none; position: static; cursor: pointer;
}
.form-check .form-check-input[type="checkbox"]:checked { background-color: var(--bs-primary); border-color: var(--bs-primary); }
.form-check .form-check-input[type="checkbox"]::after { content: none; }
.form-check-label { cursor: pointer; }

/* tags */
a.tag-link.badge { background-color: var(--bs-secondary-bg) !important; color: var(--darkgray); font-weight: 600; padding: 0.35em 0.7em; }
a.tag-link.badge:hover { color: var(--secondary); }
`

// Runs in <head> before the body exists: set data-bs-theme before first paint.
const THEME_EARLY = `(function () {
  var t = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-bs-theme", t);
})();`

function enhance() {
  var root = document.documentElement

  function syncTheme() {
    var t = root.getAttribute("saved-theme")
    if (t && root.getAttribute("data-bs-theme") !== t) root.setAttribute("data-bs-theme", t)
  }
  new MutationObserver(syncTheme).observe(root, { attributes: true, attributeFilter: ["saved-theme"] })
  document.addEventListener("themechange", syncTheme)

  function add(sel, classes) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add.apply(el.classList, classes.split(" "))
    })
  }

  function pager() {
    document.querySelectorAll(".center article p").forEach(function (p) {
      var text = p.textContent.trim()
      if (!/^(Prev|Previous|Next):/.test(text)) return
      var links = p.querySelectorAll("a")
      if (!links.length || links.length > 2) return
      var nav = document.createElement("nav")
      nav.className = "bs-pager"
      nav.setAttribute("aria-label", "Chapter navigation")
      var parts = p.innerHTML.split(/\s*·\s*/)
      parts.forEach(function (part) {
        var m = part.match(/^\s*(Prev|Previous|Next):\s*/)
        if (!m) return
        var holder = document.createElement("div")
        holder.innerHTML = part.slice(m[0].length)
        var a = holder.querySelector("a")
        if (!a) return
        var isNext = m[1] === "Next"
        a.classList.add("btn", "btn-outline-primary", isNext ? "next" : "prev")
        a.innerHTML = isNext ? a.innerHTML + " →" : "← " + a.innerHTML
        nav.appendChild(a)
      })
      if (nav.children.length) p.replaceWith(nav)
    })
  }

  function breadcrumbs() {
    document.querySelectorAll(".breadcrumb-container").forEach(function (c) {
      c.classList.add("breadcrumb")
      var items = c.querySelectorAll(":scope > .breadcrumb-element")
      items.forEach(function (it, i) {
        it.classList.add("breadcrumb-item")
        if (i === items.length - 1) it.classList.add("active")
      })
    })
  }

  function chapterLists() {
    var slug = document.body.dataset.slug || ""
    if (!/-notebook\/(.*\/)?index$/.test(slug)) return
    document.querySelectorAll(".center article ol, .center article ul").forEach(function (list) {
      if (list.closest("li, .callout, .np")) return
      var items = list.querySelectorAll(":scope > li")
      if (!items.length) return
      var chapterish = Array.prototype.every.call(items, function (li) {
        return li.firstElementChild && li.firstElementChild.matches("a.internal")
      })
      if (!chapterish) return
      list.classList.add("list-group")
      if (list.tagName === "OL") list.classList.add("list-group-numbered")
      items.forEach(function (li) {
        li.classList.add("list-group-item")
      })
    })
  }

  function run() {
    syncTheme()
    breadcrumbs()
    pager()
    chapterLists()
    add(".center article table", "table table-hover")
    add(".center article img:not(.no-bs)", "img-fluid rounded")
    add("a.tag-link", "badge rounded-pill")
    add(".search-bar", "form-control")
    add(".search-button", "btn btn-outline-secondary")
    add("ul.section-ul", "list-group")
    add("li.section-li", "list-group-item")
  }

  document.addEventListener("nav", run)
  run()
}

export default function BootstrapUI() {
  return {
    name: "BootstrapUI",
    // Quartz only accepts a transformer that defines one of its hooks; this one adds no
    // rehype plugins, it exists for externalResources.
    htmlPlugins() {
      return []
    },
    externalResources() {
      return {
        css: [{ content: BOOTSTRAP_CSS }, { content: BRIDGE, inline: true }],
        js: [
          { loadTime: "beforeDOMReady", contentType: "inline", script: THEME_EARLY },
          { loadTime: "afterDOMReady", contentType: "inline", script: `(${enhance.toString()})();` },
        ],
      }
    },
  }
}

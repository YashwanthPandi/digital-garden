// Notebook progress, drawn with Bootstrap components (loaded by plugins/bootstrap-ui):
// a "Mark as complete" switch on every notebook chapter, a progress card on notebook
// and folder index pages, and the home page's per-notebook and overall progress bars.
//
// A chapter is any page under a "*-notebook/" folder that isn't an index page. The
// ordered list of chapter slugs is embedded in each page as JSON (.np-data), so the
// browser script can compute percentages without another request.
//
// Progress is stored twice:
//   - on the server, keyed by the visitor's IP address (functions/api/progress.js,
//     a Cloudflare Pages Function backed by KV), so it follows the IP across browsers
//   - in localStorage ("notebook-progress"), so a changed IP doesn't lose it
// Each copy carries an `updated` timestamp; the newer copy wins on sync.
//
// Home page hooks (plain HTML in content/index.md):
//   [data-np-overall]                   overall card
//   [data-np-notebook="html-notebook/"] one notebook card
//   inside either: .np-pct, .np-count, .np-done, .progress-bar, a[data-np-continue]
//   [data-np-reset-all]                 "Reset all progress" button
//
// Folder pages under a notebook also hide Quartz's "N items under this folder"
// listing, since each folder's index.md already lists its chapters in order.
import { jsx } from "preact/jsx-runtime"

let cachedFor = null
let cachedSlugs = []

const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true })

function chapterSlugs(allFiles) {
  if (cachedFor === allFiles) return cachedSlugs
  cachedSlugs = allFiles
    .map((f) => f.slug)
    .filter((s) => s && /^[^/]+-notebook\//.test(s) && !/(^|\/)index$/.test(s))
    .sort(natural)
  cachedFor = allFiles
  return cachedSlugs
}

// ---------------------------------------------------------------------------
// Browser script. Runs once; re-renders on every SPA "nav" event.
function afterDOM(css) {
  var KEY = "notebook-progress"
  var API = "/api/progress"

  if (!document.getElementById("np-style")) {
    var st = document.createElement("style")
    st.id = "np-style"
    st.textContent = css
    document.head.appendChild(st)
  }

  function load() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || "null")
      if (v && Array.isArray(v.done)) return { done: v.done, updated: +v.updated || 0 }
    } catch (e) {}
    return { done: [], updated: 0 }
  }
  function saveLocal(s) {
    try {
      localStorage.setItem(KEY, JSON.stringify(s))
    } catch (e) {}
  }

  var state = load()
  var serverOk = false
  var pushTimer = null

  function push() {
    if (!serverOk) return
    clearTimeout(pushTimer)
    pushTimer = setTimeout(function () {
      fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      }).catch(function () {})
    }, 400)
  }

  function commit(done) {
    state = { done: done, updated: Date.now() }
    saveLocal(state)
    push()
    render()
  }

  // Pull the server copy once per page load and keep whichever copy is newer.
  fetch(API, { headers: { Accept: "application/json" }, cache: "no-store" })
    .then(function (r) {
      if (!r.ok) throw new Error(r.status)
      return r.json()
    })
    .then(function (remote) {
      serverOk = true
      if (remote && Array.isArray(remote.done) && (+remote.updated || 0) > state.updated) {
        state = { done: remote.done, updated: +remote.updated }
        saveLocal(state)
        render()
      } else if (state.updated > (+remote.updated || 0)) {
        push()
      }
    })
    .catch(function () {
      serverOk = false // local preview or KV not set up: browser copy only
    })

  function chapters() {
    var el = document.querySelector(".np-data")
    try {
      return el ? JSON.parse(el.textContent) : []
    } catch (e) {
      return []
    }
  }

  function slugOfLink(a) {
    try {
      var u = new URL(a.getAttribute("href"), location.href)
      if (u.origin !== location.origin) return null
      var p = decodeURIComponent(u.pathname).replace(/^\//, "").replace(/\.html$/, "")
      return p.replace(/\/$/, "/index").toLowerCase()
    } catch (e) {
      return null
    }
  }

  function stats(all, prefix, doneSet) {
    var list = all.filter(function (s) {
      return s.indexOf(prefix) === 0
    })
    var n = list.filter(function (s) {
      return doneSet[s]
    }).length
    var next = list.filter(function (s) {
      return !doneSet[s]
    })[0]
    return {
      total: list.length,
      done: n,
      pct: list.length ? Math.round((n / list.length) * 100) : 0,
      next: next || list[0] || null,
    }
  }

  function progress(st, label) {
    return (
      '<div class="progress" role="progressbar" aria-label="' +
      label +
      '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      st.pct +
      '" style="height: 10px"><div class="progress-bar" style="width:' +
      st.pct +
      '%"></div></div>'
    )
  }

  function el(html) {
    var d = document.createElement("div")
    d.innerHTML = html
    return d.firstElementChild
  }

  function notebookName(prefix) {
    return prefix
      .split("/")[0]
      .replace(/-notebook$/, "")
      .replace(/(^|-)([a-z])/g, function (_, d, c) {
        return (d ? " " : "") + c.toUpperCase()
      })
      .replace("Javascript", "JavaScript")
      .replace("Typescript", "TypeScript")
      .replace("Html", "HTML")
      .replace("Css3", "CSS3")
  }

  function label(st) {
    return st.done === 0 ? "Start reading" : st.done === st.total ? "Review" : "Continue"
  }

  // Fill a home-page card ([data-np-overall] or [data-np-notebook]).
  function fill(card, st) {
    card.querySelectorAll(".np-pct").forEach(function (e) {
      e.textContent = st.pct + "%"
    })
    card.querySelectorAll(".np-count").forEach(function (e) {
      e.textContent = st.total
    })
    card.querySelectorAll(".np-done").forEach(function (e) {
      e.textContent = st.done
    })
    card.querySelectorAll(".progress").forEach(function (e) {
      e.setAttribute("aria-valuenow", st.pct)
    })
    card.querySelectorAll(".progress-bar").forEach(function (e) {
      e.style.width = st.pct + "%"
    })
    card.querySelectorAll("a[data-np-continue]").forEach(function (a) {
      if (!st.next) return
      a.setAttribute("href", "/" + st.next)
      a.textContent = label(st)
    })
  }

  // ---- last read (Kindle-style "Continue reading") -----------------------
  // { slug, title, pos (0..1 scroll position), at } of the last chapter opened.
  var LAST = "notebook-last"
  function loadLast() {
    try {
      var v = JSON.parse(localStorage.getItem(LAST) || "null")
      if (v && v.slug) return v
    } catch (e) {}
    return null
  }
  function saveLast(v) {
    try {
      localStorage.setItem(LAST, JSON.stringify(v))
    } catch (e) {}
  }
  function chapterTitle() {
    var t = document.querySelector(".center .article-title, .center h1")
    return ((t ? t.textContent : document.title) || "").replace(/^\s*\d+[\s.\-]+/, "").trim()
  }
  var posTimer = null
  window.addEventListener(
    "scroll",
    function () {
      var last = loadLast()
      var slug = document.body.dataset.slug || ""
      if (!last || last.slug !== slug) return
      clearTimeout(posTimer)
      posTimer = setTimeout(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight
        last.pos = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
        last.at = Date.now()
        saveLast(last)
      }, 300)
    },
    { passive: true },
  )
  function rememberChapter(slug) {
    var last = loadLast()
    var resume = null
    try {
      resume = sessionStorage.getItem("np-resume")
      sessionStorage.removeItem("np-resume")
    } catch (e) {}
    if (resume === slug && last && last.slug === slug && last.pos > 0.02) {
      // came from "Continue reading": go back to where the reader stopped
      var pos = last.pos
      setTimeout(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight
        window.scrollTo(0, pos * max)
      }, 60)
    }
    if (!last || last.slug !== slug) last = { slug: slug, pos: 0 }
    last.title = chapterTitle()
    last.at = Date.now()
    saveLast(last)
  }

  function cover(name) {
    return (
      '<span class="nb-cover nb-cover-static" aria-hidden="true"><span class="nb-rings"></span>' +
      '<span class="nb-title' +
      (name.length > 7 ? " nb-long" : "") +
      '">' +
      name +
      '</span><span class="nb-sub">Notebook</span><span class="nb-strip">Property of Yashwanth Pandi</span></span>'
    )
  }

  function fillResume(all, doneSet) {
    var box = document.querySelector("[data-np-resume]")
    if (!box) return
    var last = loadLast()
    if (!last || all.indexOf(last.slug) < 0) {
      box.classList.add("d-none")
      return
    }
    var nb = (last.slug.match(/^[^/]+-notebook\//) || [""])[0]
    var ns = stats(all, nb, doneSet)
    var list = all.filter(function (s) {
      return s.indexOf(nb) === 0
    })
    var at = list.indexOf(last.slug) + 1
    var pct = Math.round((last.pos || 0) * 100)
    box.querySelector("[data-np-resume-cover]").innerHTML = cover(notebookName(nb))
    box.querySelector(".np-resume-title").textContent = last.title || last.slug
    box.querySelector(".np-resume-meta").textContent =
      notebookName(nb) + " · chapter " + at + " of " + list.length + " · " + pct + "% through"
    var bar = box.querySelector(".progress-bar")
    bar.style.width = pct + "%"
    box.querySelector(".progress").setAttribute("aria-valuenow", pct)
    var link = box.querySelector("a[data-np-resume-link]")
    link.setAttribute("href", "/" + last.slug)
    if (!link.__npBound) {
      link.__npBound = true
      link.addEventListener("click", function () {
        try {
          sessionStorage.setItem("np-resume", (loadLast() || {}).slug || "")
        } catch (e) {}
      })
    }
    box.querySelector(".np-resume-nb").textContent = ns.pct + "% of the notebook done"
    box.classList.remove("d-none")
  }

  // Bookshelf tabs on the home page: All / Reading / Not started / Finished.
  // The chosen tab is remembered in this browser only.
  function shelfFilter(choice) {
    var tabs = document.querySelectorAll("[data-np-filter]")
    if (!tabs.length) return
    var f = choice
    if (!f) {
      try {
        f = localStorage.getItem("np-shelf") || "all"
      } catch (e) {
        f = "all"
      }
    } else {
      try {
        localStorage.setItem("np-shelf", f)
      } catch (e) {}
    }
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-np-filter") === f
      t.classList.toggle("active", on)
      t.setAttribute("aria-pressed", on ? "true" : "false")
      if (!t.__npBound) {
        t.__npBound = true
        t.addEventListener("click", function () {
          shelfFilter(t.getAttribute("data-np-filter"))
        })
      }
    })
    var shown = 0
    document.querySelectorAll(".lib-slot[data-np-state]").forEach(function (slot) {
      var show = f === "all" || slot.getAttribute("data-np-state") === f
      slot.classList.toggle("d-none", !show)
      if (show) shown++
    })
    document.querySelectorAll(".lib-slot-ghost").forEach(function (g) {
      g.classList.toggle("d-none", f !== "all")
    })
    var empty = document.querySelector(".lib-empty")
    if (!empty) {
      var shelf = document.querySelector(".lib-shelf")
      if (shelf) {
        empty = document.createElement("p")
        empty.className = "lib-empty text-body-secondary small d-none"
        shelf.parentNode.insertBefore(empty, shelf.nextSibling)
      }
    }
    if (empty) {
      empty.textContent =
        f === "done" ? "No finished notebooks yet." : f === "reading" ? "Nothing in progress yet. Open a notebook to start." : "Every notebook has been started."
      empty.classList.toggle("d-none", shown > 0)
    }
  }

  function render() {
    var host = document.querySelector(".np")
    if (!host) return
    var root = host.querySelector(".np-ui")
    if (!root) {
      root = document.createElement("div")
      root.className = "np-ui"
      host.appendChild(root)
    }
    var all = chapters()
    var slug = document.body.dataset.slug || ""
    var doneSet = {}
    state.done.forEach(function (s) {
      doneSet[s] = true
    })
    root.innerHTML = ""

    // Tick links to finished chapters anywhere in the page body.
    document.querySelectorAll(".center article a.internal").forEach(function (a) {
      var s = slugOfLink(a)
      a.classList.toggle("np-done-link", !!(s && doneSet[s]))
    })

    var nb = (slug.match(/^[^/]+-notebook\//) || [""])[0]
    var isIndex = /(^|\/)index$/.test(slug)

    if (nb && !isIndex) {
      // Chapter page: completion switch + notebook progress.
      rememberChapter(slug)
      var ns = stats(all, nb, doneSet)
      var done = !!doneSet[slug]
      var card = el(
        '<div class="card shadow-sm my-4"><div class="card-body">' +
          '<div class="form-check form-switch fs-5 mb-3">' +
          '<input class="form-check-input" type="checkbox" role="switch" id="np-switch"' +
          (done ? " checked" : "") +
          '><label class="form-check-label fw-semibold" for="np-switch">' +
          (done ? "Completed" : "Mark as complete") +
          "</label></div>" +
          '<div class="d-flex justify-content-between small text-body-secondary mb-1"><span>' +
          notebookName(nb) +
          " notebook</span><span>" +
          ns.done +
          "/" +
          ns.total +
          " chapters · " +
          ns.pct +
          "%</span></div>" +
          progress(ns, "Notebook progress") +
          "</div></div>",
      )
      card.querySelector("input").addEventListener("change", function (e) {
        var next = state.done.filter(function (s) {
          return s !== slug
        })
        if (e.target.checked) next.push(slug)
        commit(next)
      })
      root.appendChild(card)
    } else if (nb && isIndex) {
      // Notebook or folder index: progress for everything below it.
      var prefix = slug.replace(/index$/, "")
      var isNotebook = prefix === nb
      var fs = stats(all, prefix, doneSet)
      var box = el(
        '<div class="card shadow-sm my-4">' +
          '<div class="card-header fw-semibold">' +
          (isNotebook ? "Your progress in this notebook" : "Your progress in this section") +
          '</div><div class="card-body">' +
          '<div class="d-flex justify-content-between small text-body-secondary mb-1"><span>' +
          fs.done +
          "/" +
          fs.total +
          " chapters completed</span><span>" +
          fs.pct +
          "%</span></div>" +
          progress(fs, "Progress") +
          '<div class="d-flex gap-2 mt-3">' +
          (fs.next
            ? '<a class="btn btn-primary btn-sm internal" href="/' + fs.next + '">' + label(fs) + "</a>"
            : "") +
          '<button type="button" class="btn btn-outline-danger btn-sm np-reset"' +
          (fs.done ? "" : " disabled") +
          ">Reset " +
          (isNotebook ? "notebook" : "section") +
          "</button></div></div></div>",
      )
      box.querySelector(".np-reset").addEventListener("click", function () {
        if (!confirm("Clear your completed chapters " + (isNotebook ? "for this notebook?" : "in this section?")))
          return
        commit(
          state.done.filter(function (s) {
            return s.indexOf(prefix) !== 0
          }),
        )
      })
      root.appendChild(box)
    } else if (slug === "index") {
      // Home page: fill the notebook cards and the overall card.
      var finished = 0
      document.querySelectorAll("[data-np-notebook]").forEach(function (card) {
        var st = stats(all, card.getAttribute("data-np-notebook"), doneSet)
        fill(card, st)
        var shelfState = st.done === 0 ? "new" : st.done === st.total ? "done" : "reading"
        if (shelfState === "done") finished++
        var slot = card.closest(".lib-slot") || card
        slot.setAttribute("data-np-state", shelfState)
      })
      document.querySelectorAll(".np-books-done").forEach(function (e) {
        e.textContent = finished
      })
      shelfFilter()
      fillResume(all, doneSet)
      document.querySelectorAll("[data-np-overall]").forEach(function (card) {
        fill(card, stats(all, "", doneSet))
      })
      document.querySelectorAll("[data-np-reset-all]").forEach(function (btn) {
        btn.disabled = state.done.length === 0
        if (btn.__npBound) return
        btn.__npBound = true
        btn.addEventListener("click", function () {
          if (confirm("Clear your completed chapters in every notebook?")) commit([])
        })
      })
    }
  }

  document.addEventListener("nav", render)
  render()
}

const CSS = `
/* notebook folder pages: the index.md already lists chapters, so hide Quartz's listing */
body[data-slug*="-notebook/"] .page-listing { display: none !important; }
.np-ui:empty { display: none; }

/* ticks next to links to finished chapters */
.center article a.internal.np-done-link::after { content: " ✓"; color: var(--bs-success); font-weight: 700; }
.center article a.btn.np-done-link::after { color: inherit; }
.center article a.np-go.np-done-link::after,
.center article a[data-np-resume-link].np-done-link::after { content: none; }
`

export const NotebookProgress = () => {
  const Component = ({ allFiles, displayClass }) =>
    jsx("div", {
      class: ["np", displayClass].filter(Boolean).join(" "),
      children: jsx("script", {
        type: "application/json",
        class: "np-data",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(chapterSlugs(allFiles)).replace(/</g, "\\u003c"),
        },
      }),
    })
  Component.afterDOMLoaded = `(${afterDOM.toString()})(${JSON.stringify(CSS)});`
  return Component
}

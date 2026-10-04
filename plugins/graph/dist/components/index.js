// Local wrapper around @quartz-community/graph@1.0.0.
//
// Fixes on top of the published component:
// - Edges were drawn with --lightgray, which the theme maps to the sidebar
//   background, so they were invisible. They now use --gray, and hovered
//   edges use --secondary.
// - Hovering a node never raised its label's opacity, so labels stayed hidden.
// - On small local graphs (<= 25 nodes) labels are shown without zooming.
// - Folder index pages showed a lone node because their slug lacked the trailing "/".
//
// Adds a collapsible "Graph View" header (state remembered in localStorage).
import { Graph as BaseGraph } from "@quartz-community/graph/components"
import { jsx } from "preact/jsx-runtime"

const SCRIPT_PATCHES = [
  // Visible edge colour
  [
    'ee=h(Z.getPropertyValue("--lightgray").trim(),"#d4d4d4")',
    'ee=h(Z.getPropertyValue("--gray").trim(),"#b8b8b8")',
  ],
  // Highlight edges of the hovered node with the accent colour
  ["l.color=l.active?ue:ee", "l.color=l.active?Ie:ee"],
  // Base label opacity: visible on small graphs
  [
    "var Z=getComputedStyle(document.documentElement),",
    "var __LB=ru.length<=25?1:0,Z=getComputedStyle(document.documentElement),",
  ],
  ["Du.alpha=0,", "Du.alpha=__LB,"],
  ["v.indexOf(T)===-1&&(T.alpha=F)", "v.indexOf(T)===-1&&(T.alpha=Math.max(F,__LB))"],
  // Folder index pages: URL slug "a/b" but content index key "a/b/"
  ["var O=_.offsetWidth,", "!uu.has(g)&&uu.has(g+\"/\")&&(g=g+\"/\");var O=_.offsetWidth,"],
  // Show the label of the hovered node
  ["T=C.alpha,Eu||Au()", "T=C.alpha,C.alpha=1,Eu||Au()"],
]

const COLLAPSE_SCRIPT = `
(function(){
  var KEY = "graph-collapsed"
  function apply(collapsed){
    document.querySelectorAll(".graph").forEach(function(g){
      g.classList.toggle("collapsed", collapsed)
      var b = g.querySelector(".graph-header")
      if (b) b.setAttribute("aria-expanded", collapsed ? "false" : "true")
    })
  }
  function read(){ try { return localStorage.getItem(KEY) === "true" } catch(e) { return false } }
  function setup(){
    apply(read())
    document.querySelectorAll(".graph .graph-header").forEach(function(b){
      if (b.dataset.bound) return
      b.dataset.bound = "true"
      b.addEventListener("click", function(){
        var next = !b.closest(".graph").classList.contains("collapsed")
        try { localStorage.setItem(KEY, String(next)) } catch(e) {}
        apply(next)
      })
    })
  }
  document.addEventListener("nav", setup)
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup)
  else setup()
})();
`

const CSS = `
.graph > h3 > .graph-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.graph > h3 > .graph-header .fold {
  margin-left: 0.5rem;
  opacity: 0.8;
  transition: transform 0.3s ease;
}
.graph.collapsed > h3 > .graph-header .fold {
  transform: rotate(-90deg);
}
.graph > .graph-outer {
  transition: height 0.2s ease;
}
/* height:0 instead of display:none keeps the canvas width valid while collapsed */
.graph.collapsed > .graph-outer {
  height: 0;
  margin: 0;
  border-width: 0;
}
`

function patchScript(script) {
  let out = script
  for (const [from, to] of SCRIPT_PATCHES) {
    if (!out.includes(from)) {
      console.warn(`[graph (local)] patch target not found, skipping: ${from}`)
      continue
    }
    out = out.replace(from, to)
  }
  return out
}

const chevron = jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "fold",
  children: jsx("polyline", { points: "6 9 12 15 18 9" }),
})

export const Graph = (userOpts) => {
  const Base = BaseGraph(userOpts)

  const Graph = (props) => {
    const root = Base(props)
    const [title, ...rest] = root.props.children
    const header = jsx("h3", {
      children: jsx("button", {
        type: "button",
        class: "graph-header",
        "aria-expanded": "true",
        children: [title.props.children, chevron],
      }),
    })
    return jsx("div", { ...root.props, children: [header, ...rest] })
  }

  Graph.css = Base.css + CSS
  Graph.afterDOMLoaded = patchScript(Base.afterDOMLoaded) + COLLAPSE_SCRIPT
  return Graph
}

// Local wrapper around @quartz-community/explorer@1.0.0.
//
// When the current page is inside a notebook (a top-level content folder),
// the tree shows only that notebook's contents and the "Explorer" heading
// becomes the notebook's name. On the home page and other top-level pages,
// every notebook is listed under "Notebooks".
//
// The explorer serialises mapFn with .toString() and runs it in the browser
// on every navigation, so the function must be self-contained.
import { Explorer as BaseExplorer } from "@quartz-community/explorer/components"

const scopeToCurrentNotebook = (node) => {
  // mapFn is called on every node; only the root (no segments) needs work.
  if (node.slugSegments.length !== 0) return

  const slug = (document.body && document.body.dataset.slug) || ""
  const top = slug.split("/")[0]
  const book =
    slug.includes("/") &&
    node.children.find((child) => child.isFolder && child.slugSegment === top)

  let heading = "Notebooks"
  if (book) {
    node.children = book.children
    heading = book.displayName || "Explorer"
  }
  document.querySelectorAll(".explorer .title-button h2").forEach((h2) => {
    h2.textContent = heading
  })
}

export const Explorer = (userOpts = {}) =>
  BaseExplorer({
    title: "Notebooks",
    mapFn: scopeToCurrentNotebook,
    ...userOpts,
  })

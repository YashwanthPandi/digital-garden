---
title: 25. SSR and Hydration
tags:
  - Angular
  - performance
---

## Rendering options

| Mode | HTML is produced | Good for |
| --- | --- | --- |
| **CSR** (client-side, default SPA) | in the browser by JS | dashboards, apps behind login |
| **SSR** (server-side rendering) | on the server, per request | SEO, fast first paint, link previews |
| **SSG / prerendering** | at build time | static pages (blog, marketing, docs) |

With plain CSR the browser first gets an almost empty `index.html` (`<app-root></app-root>`) and shows nothing until the JS bundle downloads and runs. SSR sends fully rendered HTML immediately.

## Setup

```bash
ng new my-app --ssr        # new project
ng add @angular/ssr        # existing project
```

Adds `server.ts` (Express server), `main.server.ts`, `app.config.server.ts`, and `app.routes.server.ts` where you choose the mode per route:

```ts
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },     // SSG
  { path: 'products/:id', renderMode: RenderMode.Server },
  { path: 'dashboard/**', renderMode: RenderMode.Client },
];
```

## Hydration

After the server HTML arrives, Angular **hydrates** it: it reuses the existing DOM and attaches event listeners instead of throwing it away and re-rendering (which caused a visible flicker in the old approach).

```ts
providers: [provideClientHydration(withEventReplay(), withIncrementalHydration())]
```

- **Event replay:** clicks made before the JS loaded are recorded and replayed after hydration.
- **Incremental hydration:** combined with `@defer (hydrate on viewport)`, parts of the page stay as static HTML and only hydrate when needed.
- **HTTP transfer cache:** HTTP calls made on the server are cached into the page, so the browser doesn't repeat them.

## Gotchas

- No `window`, `document`, `localStorage` on the server. Guard browser-only code:
  ```ts
  if (isPlatformBrowser(inject(PLATFORM_ID))) { … }
  // or run it in afterNextRender(() => …), which never runs on the server
  ```
- Prefer `Renderer2` / Angular APIs over direct DOM manipulation.
- The server-rendered DOM must match what the client would render, or hydration fails (`NG0500` errors).

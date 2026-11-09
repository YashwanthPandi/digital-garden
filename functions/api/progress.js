// Cloudflare Pages Function: notebook progress, one record per visitor IP.
//
//   GET    /api/progress  -> { done: [slug, ...], updated: <ms timestamp> }
//   PUT    /api/progress  <- same shape; replaces the record
//   DELETE /api/progress  -> clears the record
//
// Setup (Cloudflare dashboard → Workers & Pages → this Pages project → Settings):
//   - Bindings: add a KV namespace binding named PROGRESS
//   - Variables and secrets: add a secret PROGRESS_SALT (any long random string)
//
// The KV key is a salted SHA-256 hash of the IP, so raw IP addresses are never
// stored. Everyone behind the same IP (home Wi-Fi, office) shares one record.

const MAX_BODY = 64 * 1024
const MAX_SLUGS = 3000
const SLUG_RE = /^[a-z0-9][a-z0-9\-/._]{0,199}$/
const TTL = 60 * 60 * 24 * 365 // keep a record for a year after its last update

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  })

async function keyFor(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown"
  const bytes = new TextEncoder().encode(`${env.PROGRESS_SALT || ""}:${ip}`)
  const hash = await crypto.subtle.digest("SHA-256", bytes)
  return "ip:" + [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, "0")).join("")
}

// Writes must come from the site itself, so another site can't reset a visitor's progress.
function sameOrigin(request) {
  const origin = request.headers.get("Origin")
  return !origin || origin === new URL(request.url).origin
}

export async function onRequest({ request, env }) {
  if (!env.PROGRESS) return json({ error: "PROGRESS KV namespace is not bound" }, 503)
  const key = await keyFor(request, env)

  switch (request.method) {
    case "GET": {
      const record = await env.PROGRESS.get(key, "json")
      return json(record || { done: [], updated: 0 })
    }
    case "PUT": {
      if (!sameOrigin(request)) return json({ error: "forbidden" }, 403)
      const text = await request.text()
      if (text.length > MAX_BODY) return json({ error: "too large" }, 413)
      let body
      try {
        body = JSON.parse(text)
      } catch {
        return json({ error: "invalid JSON" }, 400)
      }
      const done = Array.isArray(body?.done) ? body.done : null
      const updated = Number(body?.updated)
      if (
        !done ||
        done.length > MAX_SLUGS ||
        !done.every((s) => typeof s === "string" && SLUG_RE.test(s)) ||
        !Number.isFinite(updated)
      ) {
        return json({ error: "invalid progress record" }, 400)
      }
      const record = { done: [...new Set(done)], updated }
      await env.PROGRESS.put(key, JSON.stringify(record), { expirationTtl: TTL })
      return json(record)
    }
    case "DELETE": {
      if (!sameOrigin(request)) return json({ error: "forbidden" }, 403)
      await env.PROGRESS.delete(key)
      return json({ done: [], updated: Date.now() })
    }
    default:
      return json({ error: "method not allowed" }, 405)
  }
}

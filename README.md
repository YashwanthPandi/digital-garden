# Digital Garden

My notes, published at https://notes.yashwanth.co.in — built with [Quartz v5](https://quartz.jzhao.xyz/).

## Where things live

| Path                         | What it is                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| `content/`                   | **Your notes.** Every Markdown file here becomes a page. `content/index.md` is the home page. |
| `quartz.config.yaml`         | **Your site settings** — title, base URL, theme colors, fonts, and which plugins are on.      |
| `quartz.config.default.yaml` | Quartz's defaults (used as a fallback; don't edit).                                           |
| `quartz/`                    | The Quartz engine itself. You normally don't touch this.                                      |
| `quartz/styles/custom.scss`  | Your own CSS tweaks.                                                                          |
| `package.json`               | Node dependencies and scripts.                                                                |

## Commands

```bash
npm ci                         # install dependencies
npx quartz build --serve       # preview locally at http://localhost:8080
npx quartz build               # build the site into public/
```

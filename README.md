# BeatBook — explainer site

**Cover the beat, collect the dues.**

A standalone marketing/explainer page for **BeatBook**, a beat-planning and dues
tracker for distributor salesmen and route-sales reps. This is *not* the app — it's
the one-page site that makes the product idea instantly clear to a non-technical
Indian SMB owner and to an investor skimming for 30 seconds.

## The product, in one line

A salesman's day is a route (beat) of retailers, and outstanding dues slip through.
BeatBook plans today's beat, captures orders per visit, and keeps a running
outstanding per retailer.

- **Daily beat plan** — today's route is every retailer whose `beat_day` is today.
- **Order capture per visit** — each order adds to that retailer's outstanding.
- **Collections** — logging a collection reduces the retailer's outstanding.
- **Coverage report** — planned vs visited.
- **Collection summary** — day/route totals of money collected.
- **Dashboard** — today's beat list, coverage %, total outstanding, today's collection.

Pricing: **on discovery — a simple monthly subscription, sized to your route.**

## Files

| File          | Purpose                                                            |
|---------------|-------------------------------------------------------------------|
| `index.html`  | All page content, structured as a "beat" of stops (sections).     |
| `styles.css`  | All styling. Palette built around the accent `#0891B2`.           |
| `app.js`      | Sticky-nav shadow, smooth scroll, and a live dashboard demo.      |
| `favicon.svg` | Route/beat mark.                                                   |

## Design notes

- Palette: cyan accent `#0891B2` + deep teal-black ink, warm paper off-white,
  and a cool muted tint. Green (`#1A7A5A`) is used *only* for money collected;
  a warm rust (`#B4531B`) *only* for amounts owed — colour carries meaning.
- Monospace is reserved for numbers (rupees, %, dues) — money in a ledger is tabular.
- Signature element: the **beat strip** — a walked route of numbered stops that
  reappears as the section numbering ("Stop 01 … Stop 06"), because the page
  itself is structured as a route.
- The dashboard preview is a live loop: tapping **Collect & visit** ticks coverage
  up and pulls total outstanding down — the real product in miniature.

## Running

Fully self-contained. No build step, no dependencies, no CDNs.

```bash
open index.html          # macOS — just open the file
# or serve statically:
python3 -m http.server 8080
```

Deploys to any static host (Netlify, Cloudflare Pages, GitHub Pages) unchanged.

---

A KARYA studio build · sreeni.nintendo@gmail.com

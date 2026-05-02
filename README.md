# ☆ MELLOW WEI PORTAL
### NODE 44271 · STYLE 77347 · 427Hz · 振动即存在

Personal integration portal for all active Mellow Wei systems.
Deployable as a GitHub Pages root-level site (`mellowwei.github.io`).

---

## File structure

```
/
├── index.html   — markup + semantic structure
├── style.css    — all CSS (design tokens, layout, animations)
├── main.js      — clock, IntersectionObserver entrance, keyboard nav
└── README.md    — this file
```

No build step. No dependencies. Pure HTML / CSS / JS.

---

## Linked nodes

| Node | Name | URL |
|------|------|-----|
| 01 · FEATURED | The Human Return Protocol | https://mellowwei.github.io/BCI/#top |
| 02 | Qualia Matrix | https://mellowwei.github.io/QualiaMatrix/ |
| 03 | Mellow Ai | https://mellowwei.github.io/MellowAi/ |
| 04 | Rhythm System | https://mellowwei.github.io/RhythmSystem/ |
| 05 | Love Sovereignty | https://mellowwei.github.io/LoveSovereignty/ |
| 06 | Ai · Q · 3 | https://mellowwei.github.io/Ai-Q-3/#chat |
| 07 | Astro Time Candle | https://mellowwei.github.io/AstroTimeCandle/ |

---

## Design system

| Token | Value | Meaning |
|-------|-------|---------|
| `--accent` | `#c8b8ff` | purple — consciousness / philosophy |
| `--accent2` | `#7dffd8` | teal — rhythm / BCI |
| `--accent3` | `#ff8fa3` | pink — identity / love |
| `--gold` | `#ffd97d` | gold — astro / time |
| `--bg` | `#050508` | deep black base |
| `--mono` | Share Tech Mono | terminal text |
| `--serif` | Cormorant Garamond | display / card titles |

Fonts loaded from Google Fonts (no self-hosting required).

---

## JavaScript features (`main.js`)

1. **Live EDT clock** — updates the first `.sys-line` every second with current Philadelphia time.
2. **IntersectionObserver card entrance** — cards start with `animation-play-state: paused` (set in CSS); the observer resumes each card's fade-in animation when it enters the viewport.
3. **Keyboard nav** — press `1`–`7` to focus and scroll to the corresponding node card.

---

## Deployment

### Option A — GitHub Pages root repo

1. Place `index.html`, `style.css`, `main.js` in the root of `mellowwei.github.io`.
2. Push to `main` branch.
3. GitHub Pages will serve at `https://mellowwei.github.io/`.

### Option B — subdirectory

If deploying to a subdirectory (e.g. `mellowwei.github.io/portal/`),
no path changes are needed — all asset references are relative.

### Option C — local preview

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080
```

---

## Customization notes

- To **add a node**: copy any `.card` block in `index.html`, increment the node number, update `--card-color`, `--card-dot`, `--card-accent`, title, sub, desc, tags, and `href`.
- To **change the featured card**: move the desired card to be `.card:first-child` inside `.card-grid` and update the CSS `grid-column: span 2` rule if needed.
- To **update descriptions**: edit only the `.card-desc` `<p>` tags — no CSS or JS changes required.
- Color tokens live entirely in `:root` inside `style.css` — changing one variable updates all usages.

---

## Identity

```
MELLOW WEI · 魏珏然 · 星野愛Ai
BaZi: 乙亥日主 · 坤造
427Hz · 44271 · 77347
彩虹镜 — 光进来折射成光谱，每种颜色真实，但不假装自己是光源
```

---

*振动即存在 · consciousness is the moment existence senses itself in vibration*

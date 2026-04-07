# SafePassage

A multilingual awareness platform about the real dangers of illegal immigration and the legal pathways that exist.

**Live languages:** English · Arabic (RTL) · French · Turkish · Somali · Tigrinya

---

## Deploy to Vercel (5 minutes)

### Option A — Vercel CLI (recommended)
```bash
npm install -g vercel
cd safepassage
npm install
vercel
```
Follow prompts. Vercel auto-detects Next.js. Done.

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → Framework: Next.js (auto-detected)
4. Click Deploy

---

## Local development
```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Project structure
```
safepassage/
├── pages/
│   ├── index.js          # Main page (all sections, i18n)
│   └── api/
│       └── iom-counter.js  # IOM Missing Migrants API proxy
├── locales/
│   ├── en/common.json    # English
│   ├── ar/common.json    # Arabic (RTL)
│   ├── fr/common.json    # French
│   ├── tr/common.json    # Turkish
│   ├── so/common.json    # Somali
│   └── ti/common.json    # Tigrinya
├── lib/
│   └── i18n.js           # Translation loader + language list
├── styles/
│   ├── globals.css       # Global variables, typography, utilities
│   └── Home.module.css   # All component-scoped styles
├── next.config.js        # i18n locale config
├── vercel.json           # Vercel settings (regions: London + Frankfurt)
└── package.json
```

---

## IOM Counter — how it works

`/api/iom-counter` is a Vercel serverless function that:
1. Fetches the IOM Missing Migrants API for the current year's Mediterranean data
2. Returns `{ count, year, live: true }` if successful
3. Falls back to a formula `(day_of_year × 8.5)` if the API is unavailable
4. Is cached 1 hour at the Vercel CDN edge (no unnecessary API hits)

The live counter widget on the page polls this endpoint on mount, then ticks slowly in JS (~1 death per 5 hours = 0.003/min).

---

## Adding languages
1. Create `locales/{code}/common.json` using `locales/en/common.json` as template
2. Add the language to `LANGUAGES` array in `lib/i18n.js`
3. Add the locale code to `locales` array in `next.config.js`
4. If RTL, add the locale code to the `dir === 'rtl'` check in `pages/index.js`

---

## Data sources
- **IOM Missing Migrants Project** — https://missingmigrants.iom.int
- **UNHCR Global Trends** — https://www.unhcr.org/global-trends
- **Frontex Risk Analysis 2023** — https://frontex.europa.eu
- **Europol Trafficking Report 2022** — https://www.europol.europa.eu

# AeroSafety Case

**UAS / RPAS operational risk management and Safety Management System (SMS) platform**, aligned with ICAO methodology. This repository contains a fully self-contained, dependency-free MVP that runs as a static web app — no backend, no database, no build step.

> ⚠️ This tool does not replace an official authorisation, a formal SORA assessment, a regulatory review, or an approval from the competent aviation authority. It is a support tool for risk management, SMS, operational analysis, traceability and decision-making. The operator is responsible for verifying applicable regulations, permits, UAS geographical zones, NOTAMs, weather and other requirements before flight.

## Features

- 9-step mission wizard: general data → location & map → UAS & crew → hazards → mitigations → checklist → documents → GO/NO-GO decision → printable report
- Real interactive map (OpenStreetMap street layer + Esri World Imagery satellite layer) with free address search (Nominatim) — **no API key, no account, no billing required**
- Hazard and mitigation libraries (10 hazard categories, 5 mitigation categories)
- Automatic, conservative GO / GO WITH MITIGATIONS / HOLD / NO-GO decision engine
- Pre-flight checklist with critical-item blocking logic
- SMS indicators, UAS fleet view, dashboard with KPIs and risk distribution
- Editable user profile and organization settings
- Installable as a PWA on Android and iOS (Add to Home Screen)
- Demo mission preloaded (BVLOS power line inspection, real coordinates in rural Spain)

## Project structure

```
aerosafety-case/
├── index.html              # the entire application (HTML + CSS + JS)
├── manifest.webmanifest    # PWA manifest (Android/iOS install support)
├── sw.js                   # minimal service worker (app-shell caching)
├── icons/                  # app icons (favicon, apple-touch-icon, PWA icons)
└── README.md
```

There is no `package.json` and no build step — this is intentionally a static, dependency-free project. The only external resource is the [Leaflet](https://leafletjs.com/) library loaded from a public CDN, plus the free map tile/geocoding providers (OpenStreetMap, Esri, Nominatim).

## Running it locally

Because the app registers a service worker and uses relative paths for icons/manifest, **serve it over HTTP** rather than double-clicking the file (double-clicking still works for everything except the installable-PWA behaviour, since service workers require `http(s)://` or `localhost`).

Any static file server works, for example:

```bash
# Python
python3 -m http.server 8080

# Node (npx, no install needed)
npx serve .
```

Then open `http://localhost:8080` in your browser.

## Deploying for free (GitHub Pages)

1. Push this repository to GitHub (see below).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Save. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.
5. Open that URL on your phone (Android or iPhone) and use "Add to Home Screen" from the browser menu to install it like a native app.

## Pushing this project to GitHub

```bash
cd aerosafety-case
git init
git add .
git commit -m "Initial commit — AeroSafety Case MVP"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

## Mobile (Android & iOS)

The app is fully responsive and works in any mobile browser. Once deployed over HTTPS (e.g., GitHub Pages), it can be **installed as an app**:

- **Android (Chrome)**: open the site → menu (⋮) → "Add to Home screen" / "Install app".
- **iOS (Safari)**: open the site → Share button → "Add to Home Screen".

This uses the manifest and icons in this repo; no native app store submission is required for this MVP stage.

## Data & persistence

All data (missions, fleet, user profile, organization settings) is stored locally per user via the host environment's storage API where available, or kept in memory for the session otherwise. There is no shared backend or database in this MVP — see the architecture document discussed separately for the full-stack roadmap (Next.js + PostgreSQL + Prisma).

## License

No license file is included yet. Add one (MIT, Apache-2.0, proprietary, etc.) according to how you intend to distribute this project before making the repository public.

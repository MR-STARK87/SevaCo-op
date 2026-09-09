# SevaCoop — SIH PS ID 26089 Coverage (mockup, no backend)

Cooperative Gig Services Platform for Household & Community Services.
Ministry of Cooperation / NCCT. All data synthetic, payments simulated.

## Feature coverage matrix

| # | Expected feature | Status | Where (file) |
|---|---|---|---|
| 1 | Service provider registration & verification | DONE (mock) | `register.html` + `register.js` → pending queue in `admin/index.html`; docs checklist in `worker/credentials.html` |
| 2 | Worker skill profiling & certification | DONE | `worker/credentials.html` (checklist + upload), `profile.html` (public record) |
| 3 | Customer booking & scheduling | DONE | `booking.html` + `booking.js` (slots, summary, invoice auto-create) |
| 4 | Geo-location based matching | DONE (mock) | `search.html` + `search.js` (mock GPS, distance sort, zone map, ETA) — distances synthetic |
| 5 | Digital payments & invoicing | DONE (mock) | `payments.html` + `payments.js` (UPI/card/NEFT demo, 85/10/5 receipts, print) |
| 6 | Rating & feedback | DONE (mock) | `profile.html` reviews list + submit (localStorage), avg shown |
| 7 | Worker welfare & insurance | DONE | `worker/welfare.html` (health 5L, pension, stipend, credit) |
| 8 | Emergency & on-demand booking | DONE (mock) | `emergency.html` + `emergency.js` (nearest-worker assign, live status steps) |
| 9 | Federation admin dashboard | DONE (mock) | `admin/index.html` + `admin.js` (KPIs, societies, approvals, bookings) |
| 10 | Multilingual mobile app | DONE (mock) | `assets/js/i18n.js` EN/ಕನ್ನಡ toggle in header; responsive + `manifest.json` installable mock |
| 11 | AI demand forecasting & allocation | DONE (mock) | `admin/forecast.html` (canvas 14-day chart, allocation table, methodology note) |

Tech components: Mobile (responsive+PWA manifest) • AI (mock forecast page) • Geo-spatial (mock GPS matching) • Digital payments (mock checkout) • Cloud (stateless static; API-ready notes on forecast page).

## Structure

```
index.html  search.html  profile.html  booking.html
emergency.html  payments.html  register.html
worker/index.html jobs.html earnings.html welfare.html credentials.html
admin/index.html admin/forecast.html
assets/css/main.css  assets/js/{data,i18n,layout,search,booking,payments,register,emergency,worker,admin}.js
```

## Run / demo (2 min)

`python -m http.server 8000` in `sevacoop-app/`, open `/index.html`.
1. Search → filter trade + distance → profile → reviews → Book → Payments (pay invoice).
2. Emergency → dispatch nearest → status steps.
3. Register as worker → Admin → approve → Forecast chart.
4. Toggle English/ಕನ್ನಡ in top bar.

## Notes

- Synthetic dataset: 12 workers across all 10 PS trades, 5 societies, 6 bookings (household + school + RWA), 5 invoices, seeded reviews, 14-day forecast.
- Your bookings/registrations/reviews persist in browser localStorage only.
- Old single-file Tailwind build kept at `legacy-single-file.html` (reference).

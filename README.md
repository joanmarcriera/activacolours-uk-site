# ActivaColours UK — website (static, draft v1)

A static, B2B lead-generation site. No build step, no dependencies — open
`index.html` in a browser, or drop the whole `site/` folder onto any static host
(Netlify, Cloudflare Pages, GitHub Pages, S3).

## Pages
- `index.html` — home (value props, lead products, trade CTA)
- `science.html` — how photocatalysis works + the standards behind the claims
- `products.html` — full range (hero products first), with spec snippets
- `trade.html` — become a stockist / pallet supply
- `contact.html` — quote / stockist enquiry form
- `css/styles.css` — shared styling; brand tokens match the PDF skill (blue #1F6FB2, navy #13344A)
- `assets/` — logo + case/proof images

## Before launch (to-do)
- [ ] Wire the contact form to a backend (Formspree/Basin or a CRM endpoint) — it's
      currently `action="#"`.
- [ ] Replace placeholder email `hello@activacolours.uk` and add real company details.
- [ ] Swap in the hi-res/vector logo when available.
- [ ] Add privacy policy, cookie notice and T&Cs pages.
- [ ] Add real case-study photos with permission; confirm the demo images can be used.
- [ ] Final compliance pass on copy (no biocidal/health claims) before publishing.

## Compliance
Copy is deliberately limited to self-cleaning, pollutant/NOx-reduction and low-VOC.
No anti-mould / antibacterial / antiviral / disinfectant / air-purifying claims — keep
it that way. See `04-Market-Research/Parent-Company-Positioning.md`.

_Draft — not for publication. June 2026._

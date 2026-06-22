# ActivaColours UK website

Static B2B lead-generation site for ActivaColours UK trade and pallet supply.
There is no build step and no runtime dependency; the site is ready for GitHub
Pages, Cloudflare Pages, Netlify, S3, or any static host.

## Pages

- `index.html` - home, value proposition, launch products and trade CTA.
- `science.html` - photocatalysis explanation, claim standards and claim boundary.
- `products.html` - product range and specification snippets.
- `trade.html` - stockist and pallet-supply proposition.
- `contact.html` - static email-based enquiry form.
- `privacy.html` - privacy and cookie information.
- `404.html` - GitHub Pages fallback page.
- `css/styles.css` - shared responsive styling and brand tokens.
- `assets/` - logos, favicon and case/proof imagery.

## Local checks

```bash
npm test
```

The validator checks required pages, metadata, local links, image alt/dimensions,
core CSS tokens, GitHub workflow files and public claim boundaries. It is also
run in GitHub Actions.

## GitHub Pages

The repository contains:

- `.github/workflows/ci.yml` - validates pushes and pull requests.
- `.github/workflows/pages.yml` - validates, uploads the static site artifact and
  deploys it to GitHub Pages.
- `.nojekyll` - prevents Jekyll processing.

After pushing the repo, set GitHub Pages to use **GitHub Actions** as the source.
The deployment workflow publishes the repository root as the static site.

## Launch checklist

- [ ] Confirm whether `hello@activacolours.uk` is the final enquiry address.
- [ ] Replace the email fallback in `contact.html` with a CRM/form endpoint if a
      server-side lead capture flow is preferred.
- [ ] Add real company registration, privacy-controller details and terms if
      required before public launch.
- [ ] Add the production domain and confirm HTTPS.
- [ ] Run a final compliance read before publishing new marketing copy.

## Compliance position

Public copy is deliberately limited to self-cleaning, pollutant/NOx-reduction
and low-VOC claims. Do not add regulated surface-treatment, indoor-air or
human-health claims outside that scope without a separate GB regulatory review
and evidence package.

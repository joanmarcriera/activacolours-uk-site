# Publishing the ActivaColours UK site

This folder is a self-contained static site and an initialised git repo (first commit
made). It's ready to push to GitHub and host. Pushing needs **your** GitHub account —
do it from this folder:

## 1. Create the GitHub repo & push
```bash
cd "ActivaColours-Project/05-Website/site"
# create an empty repo on github.com first (e.g. activacolours-uk-site), then:
git remote add origin https://github.com/<your-username>/activacolours-uk-site.git
git branch -M main
git push -u origin main
```

## 2. Host it (pick one — all free for static sites)
- **GitHub Pages:** repo → Settings → Pages → Source: `Deploy from a branch` → `main` / `/ (root)`.
  Live at `https://<username>.github.io/activacolours-uk-site/`.
- **Cloudflare Pages / Netlify:** “Add site → import from Git”, build command: *none*,
  publish directory: `/` (root). Gives a free subdomain; add a custom domain later.

## 3. Before it's public — checklist
- [ ] Point the contact form (`contact.html`, `action="#"`) at a backend (Formspree/Basin) or CRM.
- [ ] Replace `hello@activacolours.uk` placeholder + add real company details and domain.
- [ ] Swap in a hi-res / vector logo (and a proper 1200×630 OG share image).
- [ ] Add Privacy, Cookie and T&Cs pages; cookie banner if you add analytics.
- [ ] Final compliance read (no biocidal/health claims).
- [ ] Custom domain (e.g. activacolours.uk) + HTTPS.

> Tip: keep this as its own repo (just the `site/` contents) so the rest of the
> business project stays private.

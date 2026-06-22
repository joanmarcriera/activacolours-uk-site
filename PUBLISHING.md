# Publishing the ActivaColours UK site

This folder is a self-contained static site and Git repository. It is designed to
be pushed as its own GitHub repository so the wider business project can remain
private.

## 1. Create the GitHub repository

From this folder:

```bash
cd "/Users/marc/Documents/ActivaColours-Project/05-Website/site"
git branch -M main
gh repo create <owner-or-username>/activacolours-uk-site --private --source=. --push
```

Use `--public` instead of `--private` only when the site source is ready to be
public.

If the GitHub repository already exists:

```bash
git remote add origin https://github.com/<owner-or-username>/activacolours-uk-site.git
git branch -M main
git push -u origin main
```

## 2. Enable GitHub Pages

In GitHub:

1. Open the repository.
2. Go to Settings -> Pages.
3. Set Source to **GitHub Actions**.
4. Push to `main`, or run the `Deploy GitHub Pages` workflow manually.

The workflow in `.github/workflows/pages.yml` validates the static site, uploads
the repository root as the Pages artifact and deploys it.

## 3. Keep releases clean

Before each push:

```bash
npm test
git status --short
```

Before public launch, confirm the final enquiry email or replace the mailto form
with a real CRM/form endpoint, add any required legal company details, configure
the production domain and run the claim-compliance checker from the project root.

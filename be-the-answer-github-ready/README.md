# Be The Answer: Website

Full-scale brand building agency website. Static HTML (fast, no build step) plus two Vercel serverless functions:

- `api/lead.js`: emails the contact form (via Resend). Falls back to WhatsApp if not configured.
- `api/audit.js`: instant website, design and SEO audit (fetches the page, runs checks, optional AI summary).

## Pages

`index`, `services`, `portfolio`, `case-studies`, `reviews`, `packages`, `audit`, `about`, `contact`, `privacy`, `404`.

## Deploy on Vercel (5 minutes)

1. Create a new repository on GitHub and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/be-the-answer-site.git
   git push -u origin main
   ```
2. Go to vercel.com, click **Add New, Project**, import the GitHub repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Click **Deploy**.
4. Add environment variables (Project, Settings, Environment Variables), then redeploy:
   - `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` for the contact form
   - `ANTHROPIC_API_KEY` (optional) for AI summaries in audits
5. Add your domain (Project, Settings, Domains).

## Before going live

1. **Set your domain** (canonical links, sitemap, robots):
   ```bash
   node scripts/set-domain.mjs https://yourdomain.com
   ```
2. Replace the concept portfolio images in `assets/img/` with real project screenshots (keep the file names, or update `portfolio.html`).
3. Reviews: open `reviews.html`, replace the sample-layout cards with real, approved client reviews.
4. Confirm the case-study details with the client before publishing.
5. Have the Privacy page reviewed for your situation and country.
6. Verify the email: in Resend, verify your sending domain and set `LEAD_FROM_EMAIL`.

## Local preview

```bash
npx serve .
```
(The `/api` functions run only on Vercel. Use `npx vercel dev` to test them locally.)

## Notes

- Design tokens: black `#000`, Signal Red `#D92B45`, Spark Yellow `#FFC93C`, Violet `#7C4DFF`, Mint `#2ED47A`; font Poppins.
- The audit function blocks private/internal addresses and rate-limits requests.

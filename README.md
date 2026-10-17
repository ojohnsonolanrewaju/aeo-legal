# AEO Legal — Website

Website for AEO Legal, Barristers & Solicitors, Lagos.
Plain HTML, CSS and JavaScript. No build step, no frameworks.

**Status:** first draft. Text in `[square brackets]` is placeholder content waiting for the firm's answers in `CLIENT_QUESTIONNAIRE.md`.

## Files

- `index.html` — home page (about, practice areas, process, team, FAQs, contact)
- `privacy.html` — privacy notice (Nigeria Data Protection Act 2023), draft
- `css/style.css` — all styles (navy + gold palette; Cormorant Garamond + Manrope)
- `js/main.js` — menu, contact links, contact form
- `assets/` — favicon, images
- `CLIENT_QUESTIONNAIRE.md` — questions for the firm

## Updating contact details

Open `js/main.js` and fill in the `FIRM` object at the top:

```js
const FIRM = {
  phoneDisplay: '+234 801 234 5678',
  whatsapp:     '2348012345678',   // digits only
  email:        'info@aeolegal.com'
};
```

Every WhatsApp/email link and the contact form pick these up automatically.
The contact form opens WhatsApp (or email, if no WhatsApp number is set) with the enquiry pre-filled. No backend needed.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying on GitHub Pages

1. Settings → Pages
2. Source: Deploy from a branch → `main` → `/ (root)`
3. Save. The site goes live at `https://<username>.github.io/aeo-legal/`

A custom domain (e.g. `aeolegal.com` or `aeolegal.com.ng`) can be added later under the same settings page.

## Professional conduct

Content is kept factual in view of the NBA Rules of Professional Conduct on advertising and soliciting: no superlative claims, no guaranteed outcomes, and no testimonials or client names unless the firm confirms they're permitted.

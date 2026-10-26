# AEO Legal Services — Website

Website for AEO Legal Services, Barristers & Solicitors, Lagos.
*Prompt. Professional. Proactive.*

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About the firm, values, process, languages |
| `practice-areas.html` | All practice areas with detail |
| `team.html` | Principal Partner and associates |
| `insights.html` | Articles (first article to be added) |
| `faq.html` | Frequently asked questions |
| `contact.html` | Contact details, enquiry and consultation booking form (`contact.html#book` opens booking mode) |
| `privacy.html` | Privacy notice (Nigeria Data Protection Act 2023) |

Header and footer are repeated on every page. If you change a menu link, change it in all eight files.

Text in `[square brackets]` is still waiting for details from the firm.

## Contact details and form

All contact details are set in one place, at the top of `js/main.js`:

```js
const FIRM = {
  phoneDisplay: '+234 706 682 3673',
  phone:        '+2347066823673',
  email:        'aezekiel@aeolegalservices.com',
  formEndpoint: ''   // e.g. 'https://formspree.io/f/abcd1234'
};
```

- **Without `formEndpoint`**, the form opens the visitor's email app with the message pre-filled.
- **With a Formspree endpoint**, messages go straight to the firm's inbox. To set it up, create a free account at formspree.io using the firm email, create a form, then paste its URL into `formEndpoint`.

## Photos

Each photo area shows a plain brown panel until an image file with the matching name is added to `assets/images/`:

| File name | Where it appears | Suggested image |
|---|---|---|
| `hero.jpg` | Home page, top right (portrait 4:5) | Lagos skyline or a modern office interior |
| `about.jpg` | About page (5:4) | Law books, documents or a meeting room |
| `team-ayomide.jpg` | Team page (portrait 4:5) | Professional headshot |
| `team-tomisin.jpg` | Team page (portrait 4:5) | Professional headshot |
| `team-lydia.jpg` | Team page (portrait 4:5) | Professional headshot |

Use JPGs about 1600px on the long side and under 400 KB each. Unsplash and Pexels photos are free to use. Avoid gavels, which Nigerian courts don't use.

## Brand assets

- `assets/logo/aeo-logo.png` — wordmark on a light background
- `assets/logo/aeo-logo-dark.png` — wordmark on a dark background
- `assets/logo/aeo-mark-512.png` — square mark for social media profile pictures
- `assets/images/og-image.png` — preview image shown when the link is shared on WhatsApp or LinkedIn
- Colours: espresso `#2B1D14`, bronze `#8B5E3C`, tan `#C9A27E`, paper `#FBF8F3`
- Fonts: Cormorant Garamond for headings, Manrope for body text (Google Fonts)

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Hosting

**GitHub Pages:** Settings → Pages → Deploy from a branch → `main` / `(root)`.
The site is published at `https://ojohnsonolanrewaju.github.io/aeo-legal/`.

**Custom domain (`aeolegalservices.com`):**
1. Buy the domain from a registrar such as Namecheap or Whogohost.
2. In the registrar's DNS settings, add these records:
   - Four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - A `CNAME` record for `www` pointing to `ojohnsonolanrewaju.github.io`
3. In GitHub, go to Settings → Pages → Custom domain, enter `www.aeolegalservices.com` and tick **Enforce HTTPS**.
4. Replace `https://ojohnsonolanrewaju.github.io/aeo-legal/` with `https://www.aeolegalservices.com/` in each page's `<head>`. Search for `github.io` to find every instance.

**Email (`aezekiel@aeolegalservices.com`):** once the domain is bought, set up Zoho Mail (the free plan supports a custom domain, up to 5 users) or Google Workspace (paid), then add the MX records it gives you at the registrar.

## Professional conduct

Content is kept factual in view of the NBA Rules of Professional Conduct on advertising and soliciting. The site makes no superlative claims, promises no outcomes and names no clients. The firm should review all text before launch.

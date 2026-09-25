# Raw Performance Training

**Live site: https://charles-lazcano.github.io/raw-performance/**

Marketing site for Raw Performance Training, a small-group training and 1-on-1 athletic coaching gym in San Antonio, TX, coached by Sean Garner. Built from the "Raw Performance Training – Site Mockup" PDF.

A static site with no build step and no dependencies:

- `index.html`: homepage with hero, program pillars, memberships, class schedule, coach, results, the Hustle & Stride run club, and contact
- `join.html`: the two-step join flow (choose a plan, then enter your info)
- `styles.css`, `script.js`, `favicon.svg`

## Placeholders to fill in

The mockup left these blank, so the site still has them:

- **Prices**: every `[$PRICE]` in `index.html` and `join.html` (including the `data-price` attributes on the join page's plan radios)
- **Class times**: the `[TIME]` entries in `#schedule`
- **Address, phone and email**: in `#contact`. Swap the map placeholder for a Google Maps `<iframe>`.
- **Photos**: the hero and coach blocks are `.placeholder` divs. Replace them with `<img>` tags, or use a muted `<video>` loop for the hero.
- **Contact email**: `CONTACT_EMAIL` in `script.js`

## Payments

The join form does **not** collect card numbers. Create a Stripe Payment Link for each plan and paste the URLs into `CHECKOUT_LINKS` in `script.js`. The form then sends the member to Stripe's hosted checkout with their email already filled in. Until you add those links, submitting the form opens a pre-written sign-up email to `CONTACT_EMAIL`.

## Deploying

GitHub Pages serves the site from the `master` branch root. It redeploys on every push.

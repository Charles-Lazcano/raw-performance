# Raw Performance Training

**Live site: https://charles-lazcano.github.io/raw-performance/**

Marketing site for Raw Performance Training, a small-group training and 1-on-1 athletic coaching gym in San Antonio, TX, coached by Sean Garner. Built from the "Raw Performance Training – Site Mockup" PDF.

A static site with no build step and no dependencies:

- `index.html`: homepage with hero, program pillars, Start Your Training (how it works, training options, and the Get Started form), class schedule, coach, results, the Hustle & Stride run club, and contact
- `join.html`: the old online sign-up page, now a redirect to the Get Started form so old links keep working
- `styles.css`, `script.js`
- `images/logo.png`, `favicon.png`, `apple-touch-icon.png`: the RP logo, cropped from the original photo

## Placeholders to fill in

The mockup left these blank, so the site still has them:

- **Class times**: the `[TIME]` entries in `#schedule`
- **Phone and email**: in `#contact`. The address (10665 Shaenfield Rd, Unit 111) and Google Map are already filled in.
- **Photos**: the hero crossfades between `images/hero-1.jpg` and `images/hero-2.jpg`, the coach photo is `images/coach-sean.jpg`, and the run club video is `images/run-club.mp4` (with `images/run-club-poster.jpg` as its still frame). Save over any of these files to change them.
- **Form access key**: `WEB3FORMS_ACCESS_KEY` in `script.js` (see below)

## Get Started form

There is no online checkout. Every new member fills out the Get Started form, and Sean follows up personally to set up their first session and pick a plan. The site shows no prices on purpose.

The form posts to [Web3Forms](https://web3forms.com), which emails each submission to Sean. To connect it:

1. Go to web3forms.com, enter Sean's email address, and click "Create Access Key". The key arrives in that inbox.
2. In `script.js`, replace `YOUR_ACCESS_KEY` in `WEB3FORMS_ACCESS_KEY` with that key, then commit and push.
3. Submit a test entry on the live site and check that it lands in Sean's inbox (and not spam).

The access key is meant to be public: it can only send email to the address it was created for. Replying to a submission email goes straight to the person who filled out the form.

Spam protection comes from the hidden `botcheck` honeypot field. Each "Get Started" button with a `data-option` attribute pre-selects that training option in the form.

## Deploying

GitHub Pages serves the site from the `master` branch root. It redeploys on every push.

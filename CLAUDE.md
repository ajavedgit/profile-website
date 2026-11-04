# CLAUDE.md — Profile Website Project

Reference file for project context and progress. **Update the Status checklist and Progress log whenever work is done.**

## Project goal
A personal profile website for **Aamir Javed** (Cyber Security Professional, Riyadh, KSA) to showcase his career, experience, skills and contact details to the world.
Content now comes from his CV (`AAMIR JAVED CV_cs.docx`, kept in this folder and linked from the site as "Download CV").

## Tech constraints
- Plain **HTML + vanilla JavaScript** only. No frameworks, no build step, no Tailwind.
- One shared stylesheet (`styles.css`) holds all styling (plain CSS, design tokens as CSS variables).
- Google Fonts (Cormorant Garamond + Inter) are the only external resource.
- To view: open `index.html` in a browser (no server needed).

## Design source of truth
`aventura_luxury_editorial_design_system.md` — luxury editorial look:
- Alternating **light** (Alabaster `#EAE8E8` / Bone `#F4F2EF`) and **dark** (Obsidian `#14151D` / Charcoal `#1C1E29`) sections.
- Serif display headlines (Cormorant Garamond) + clean sans body (Inter), small uppercase letter-spaced eyebrows.
- Asymmetric 40/60 splits, 1px hairline dividers, pill-shaped buttons, cinematic/portrait image crops.
- Accent: Champagne `#C8B8A6`.

Other file: `LANDINGPAGE_GENERATOR.md` — prompt for a guided Q&A that produces a `masterplan.md` (not run).

## File map
| File | Purpose |
| :--- | :--- |
| `index.html` | Home: hero + stats, About, Skills (dark, tag-based), Experience preview, CTA, footer |
| `experience.html` | 6 roles (accordion), Education & certifications (dark), Training/credentials/community accordion, CTA, footer |
| `contact.html` | Page header + banner placeholder, contact details + validated form (dark), footer |
| `styles.css` | All styles and design tokens (`:root` variables). `.bar*` skill-bar styles are currently unused |
| `script.js` | Mobile menu, nav shadow/active link, scroll reveal, count-up numbers, accordions, form validation, footer year |
| `AAMIR JAVED CV_cs.docx` | Source CV; also served as the "Download CV" file |

Nav, mobile menu and footer markup are **duplicated in each HTML page** — change all three when editing them.

## Content taken from the CV
- **Headline:** Cyber Security Professional; summary says 15 years in IT/telecom across UK and KSA.
- **Roles:** Cyber Security Professional (Dec 2022–now) · Freelance VAPT Expert (Dec 2022–now) · Telecom Engineer, Nokia–STC (Jul 2014–now) · IT Technical Support, Alawwal Bank (Jan 2013–Jun 2014) · Network Design Engineer, Alcatel-Lucent (Sep 2011–Dec 2012) · IT Technical Support, Domino's London (2006–Feb 2011).
- **Education:** MSc Computer Systems Engineering, University of East London (2006–08); BSc Computer Science (Hons), University of Central Punjab (2000–04).
- **Certs:** CompTIA Security+ (2024); six DG Cyber Defense certified professional credentials (Dec 2022); ITIL Foundation and Lean Six Sigma Green Belt (2014).
- **Community:** bug bounty hunter (DGACADEMY alumni), content reviewer (DGMAGAZINE).
- **LinkedIn:** linkedin.com/in/aamir-javed-289a09279
- Home stats are derived from the CV: 15+ years, 9 certifications (6 + Security+ + ITIL + Lean Six Sigma), 2 countries (UK, KSA), 2 degrees.
- Skills show as tags only. The CV gives no skill levels, so the earlier invented percentage bars were removed. Do not add invented metrics.

## Status checklist
- [x] Design tokens, shared styles, shared JavaScript
- [x] Home, Experience and Contact pages built
- [x] Dummy content replaced with CV content (name, roles, education, certs, skills, LinkedIn, CV download)
- [x] Browser check (no console errors, no horizontal overflow, accordion/menu/form tested)
- [ ] **Real email address** (contact page currently shows `your-email@example.com`; search for it in `contact.html`; the footers show LinkedIn and CV only)
- [ ] Phone number — not in CV, intentionally not shown; add only if wanted
- [ ] Replace the 3 image placeholders with real photos
- [ ] Decide whether 15 years is the figure to show (see Open questions)
- [ ] Decide whether to publish the .docx CV publicly (it is linked as a download)
- [ ] Connect contact form to a real service (currently demo only — nothing is sent)
- [ ] Optional extras: GitHub / bug bounty profile links, availability line, testimonials
- [ ] Final review, then publish (hosting not yet decided)

## Image placeholders to replace
Placeholders are `.ph` blocks. To use a real image, replace the block with an `<img>` that has `alt` text and the same aspect-ratio class (`ar-45`, `ar-34`, `ar-219`).
| Page | Placeholder | Ratio |
| :--- | :--- | :--- |
| Home hero | Portrait photo | 4:5 |
| Home About | Workspace / casual photo | 3:4 |
| Contact header | Wide banner | 21:9 |

## Open questions for the owner
- Email address to show publicly (the CV has none).
- CV summary says "15 years" but the first listed job starts in 2006 (about 20 years). Site uses 15+ as in the CV.
- Alcatel-Lucent entry in the CV says ALU/STC project work; site keeps CV wording.
- Is the Nokia–STC role still current (CV says "Present")? It is shown as current.

## Notes / decisions
- Contact form only validates and shows a success message; sending needs a backend or form service later.
- Fonts load from Google Fonts, so the first view needs internet access.
- Scroll animations are disabled automatically for visitors who prefer reduced motion.
- Previewing: the in-app browser shows `file://` pages without CSS/JS, so a tiny local server was used for checks. Opening `index.html` directly in Chrome/Edge works fine.

## Progress log
- **2026-11-04** — Reviewed the two reference documents. Built the first dummy version: 3 pages, shared CSS and JS, image placeholders. Created this CLAUDE.md.
- **2026-11-04** — Read the CV and replaced all dummy content with Aamir's real details: 6 roles, education, certifications, skills as tags, community work, LinkedIn, CV download. Removed invented numbers and skill percentages. Email left as a placeholder. Re-checked in a browser. **Next:** owner supplies email and photos.

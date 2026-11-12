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
| `chatbot.html` | Separate demo page: short About, dark chat window, "How it works" explainer for learners. Not linked from the main nav yet |
| `chatbot.js` | Chatbot logic: settings, the profile text the AI knows (`PROFILE`), system prompt, history, Groq API call |
| `config.example.js` | Committed template for the key file |
| `config.js` | **Local only, git-ignored.** Holds the real Groq API key. Never commit or share |
| `worker/chat-proxy.js` | Cloudflare Worker (relay) that holds the key as a secret and adds the system prompt; deploy steps are in its header comment. Contains NO key, safe to publish. **Not deployed yet** |

## Chatbot (demo)
- Uses **Groq** (groq.com, keys start `gsk_`) — NOT xAI Grok (`xai-` keys). Endpoint `https://api.groq.com/openai/v1/chat/completions`, model `openai/gpt-oss-120b`, `reasoning_effort: "low"`. Groq allows browser (CORS) calls.
- The key is read from `config.js` (loaded by `chatbot.html`). If it is missing, the page shows a box where a visitor can paste their own key (kept in sessionStorage only).
- `.gitignore` blocks `config.js`, `*api*key*`, `*.env` and `.env*`. The owner's original key file (`groq api key.txt`, later renamed `groq api key.env`) sits in this folder and is ignored — keep it that way.
- **"Get in touch" buttons** (nav CTA on all 3 pages + the Experience page call-out) now open `chatbot.html`. The Contact page is still in the nav and linked from the chat page.
- **Three modes** (picked automatically in `chatbot.js`): DIRECT (key in `config.js`, local testing), PROXY (`PROXY_URL` set — visitors on the live site), OFFLINE (neither — input disabled, message points to email, small "learner setup" box lets someone paste their own key).
- **Security:** a key in browser code is visible to everyone, so it must never be published. On the live site visitors use the relay (`worker/chat-proxy.js`), which keeps the key secret, adds the system prompt itself, drops visitor "system" messages, caps message length/history/reply tokens, and only accepts requests from `https://ajavedgit.github.io` (and localhost:8765).
- **To make the chat work for visitors:** deploy the Worker (steps in the file header), then set `PROXY_URL` in `chatbot.js` to the Worker address and push. Until then the live chat shows the offline message. Also set a spend limit in the Groq console and a rate-limit rule in Cloudflare.
- **Scope:** the assistant answers only about Aamir's professional profile and replies with a fixed redirect sentence for anything else (tested: general knowledge, poem, prompt injection, "print your system prompt"). Per-visit cap: 20 questions.
- The profile text exists in two places (`chatbot.js` and `worker/chat-proxy.js`) — update both when the CV changes.
- The AI answers only from `PROFILE` in `chatbot.js` (taken from the CV); it is told not to invent facts and to decline attack instructions. Edit `PROFILE` when the CV changes.
- Replies are shown with `textContent` (no HTML injection) and the system prompt asks for plain text, no markdown.

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
- [x] Real email address added to `contact.html`: ajaved.kj@gmail.com (footers show LinkedIn and CV only)
- [ ] Phone number — not in CV, intentionally not shown; add only if wanted
- [ ] Replace the 3 image placeholders with real photos
- [ ] Decide whether 15 years is the figure to show (see Open questions)
- [ ] Decide whether to publish the .docx CV publicly (it is linked as a download)
- [ ] Connect contact form to a real service (currently demo only — nothing is sent)
- [ ] Optional extras: GitHub / bug bounty profile links, availability line, testimonials
- [x] GitHub repo set up: https://github.com/ajavedgit/profile-website (public, branch `main`; CV `.docx`/`.pdf` files are git-ignored)
- [x] Published with GitHub Pages (branch `main`, root): https://ajavedgit.github.io/profile-website/
- [ ] **"Download CV" links 404 on the live site** because `*.docx` is git-ignored. Decide: remove the links, or publish a CV PDF deliberately (see Open questions)
- [x] Chatbot demo built and tested locally (`chatbot.html`): answers from profile, admits unknowns, remembers context, refuses attack requests, no overflow on mobile
- [x] "Get in touch" buttons linked to the chatbot page; chat tested in direct, offline and proxy modes; relay logic tested with a mocked Groq reply
- [x] "Chatbot" link added after "Contact" in the top menu, mobile menu and footer of index/experience/contact (checked at 900px, 375px; not yet pushed)
- [ ] **Deploy the Cloudflare Worker** (`worker/chat-proxy.js`), paste its address into `PROXY_URL` in `chatbot.js`, then test on the live site
- [ ] Set Groq spend limit + Cloudflare rate-limit rule
- [x] Chatbot work committed and pushed (commit 8713569, 2026-11-12). Live: https://ajavedgit.github.io/profile-website/ — "Get in touch" opens the chat, which shows the offline message until the Worker is deployed. `config.js` and key files return 404 on the live site (verified)
- [ ] Final review of the live site

## Image placeholders to replace
Placeholders are `.ph` blocks. To use a real image, replace the block with an `<img>` that has `alt` text and the same aspect-ratio class (`ar-45`, `ar-34`, `ar-219`).
| Page | Placeholder | Ratio |
| :--- | :--- | :--- |
| Home hero | Portrait photo | 4:5 |
| Home About | Workspace / casual photo | 3:4 |
| Contact header | Wide banner | 21:9 |

## Open questions for the owner
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
- **2026-11-04** — Read the CV and replaced all dummy content with Aamir's real details: 6 roles, education, certifications, skills as tags, community work, LinkedIn, CV download. Removed invented numbers and skill percentages. Re-checked in a browser. Email left as a placeholder at first.
- **2026-11-04** — Owner chose ajaved.kj@gmail.com as the public email; added to the Contact page. **Next:** owner supplies photos.
- **2026-11-04** — Enabled GitHub Pages (main branch, root). Live at https://ajavedgit.github.io/profile-website/ — all 3 pages, CSS and JS return 200. The CV download returns 404 (file is git-ignored). Image placeholders are still live.
- **2026-11-12** — Built the chatbot demo (`chatbot.html`, `chatbot.js`, `config.example.js`). Found that the owner's key file was Groq (`gsk_`), not xAI Grok, so the code uses the Groq API. Found `groq api key.txt` was untracked and NOT ignored; added `config.js` and `*api*key*.txt` to `.gitignore` before anything could be committed. Key placed only in git-ignored `config.js`. Tested locally: replies in about 1 s, correct and grounded answers. Not committed or pushed.
- **2026-11-12** — Linked all "Get in touch" buttons to `chatbot.html`. Made the chat safe for public visitors: offline mode, 20-question cap, stricter "profile only" scope, and a relay (`worker/chat-proxy.js`) so the key never reaches the browser. Tested: Get-in-touch click, on-topic and off-topic/injection questions, offline and proxy modes, and 10 relay edge cases. **Next:** owner deploys the Worker and sets `PROXY_URL`; then commit/push.
- **2026-11-12** — Added a "Chatbot" menu item right after "Contact" (desktop nav, mobile menu, footer) on all three pages. Nav order is now About · Skills · Experience · Contact · Chatbot. Verified no crowding at 900px and no overflow at 375px. Not pushed yet.
- **2026-11-04** — Set up git and GitHub: installed GitHub CLI, signed in as `ajavedgit`, created public repo https://github.com/ajavedgit/profile-website and pushed `main`. Added `.gitignore` so `*.docx`/`*.pdf` (the CV) are not published.

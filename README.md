# red2-motion-test

Internal test landing for **Red2 Auto Gallery** and **RED2 auto space** (Marbella). Not for the client. Not indexed.

- Preview: https://networxua.github.io/red2-motion-test/
- Scroll demo: https://networxua.github.io/red2-motion-test/scroll/
- Static HTML, CSS, and vanilla JS. No build step. GitHub Pages serves the repository root.
- `robots.txt` is `Disallow: /`. Every page has `<meta name="robots" content="noindex, nofollow">`.

## Pages

| Path | What it is |
|---|---|
| `/` | Five scenes. Signature effect: showroom frames scrubbed by scroll on a canvas. |
| `/scroll/` | Full-viewport canvas. Scroll drives five frame sequences with a crossfade. Text is HTML. |

With `prefers-reduced-motion: reduce`, or with JavaScript off, both pages stay readable: posters, all the copy, `tel:` and `https://wa.me/34699589358`. Nothing is submitted anywhere. No analytics.

## Libraries

| File | Version | License |
|---|---|---|
| `vendor/gsap.min.js` | GSAP 3.15.0 | [Standard “no charge” license](https://gsap.com/standard-license) |
| `vendor/ScrollTrigger.min.js` | 3.15.0 | same |
| `fonts/onest-latin.woff2` | Onest (latin, variable) | SIL OFL 1.1 — `fonts/OFL-Onest.txt` |
| `fonts/unbounded-latin.woff2` | Unbounded (latin, variable) | SIL OFL 1.1 — `fonts/OFL-Unbounded.txt` |

Anime.js and Motion are not loaded. SplitText is not shipped: the words are the HTML text. Fonts are self-hosted, so the page does not call Google Fonts at runtime. The copyright lines inside the GSAP files are intact.

## Media

Clips and frames are re-encoded from `networxua/red2-demo` (`media/red2-hero.mp4`, `red2-salon.mp4`, `red2-servis.mp4`). They are stored in this repo. Nothing is hotlinked.

People show up inside the ranges named in the brief, so those stretches are not used:

| Scene | Used | Left out |
|---|---|---|
| Facade | `red2-hero.mp4` 0:00–0:02.05 | after ~0:02.3 the shot leaves the sign |
| Showroom | `red2-salon.mp4` 0:00–0:05.40 and 0:08.00–0:15.40 | ~0:05.4–0:08 a person is in a car and at a desk; from ~0:18.9 two people are on camera |
| Badges | `red2-salon.mp4` 0:15.90–0:18.70 | the people at ~0:18.9 |
| Workshop | `red2-servis.mp4` 0:02.00–0:03.40 and 0:06.90–0:09.00 | a person is in frame around 0:03.6–0:06.6 |
| Still | `red2-servis.mp4` 0:08.20 | `red2-hero.mp4` ~0:32 has a person, so it is not the closing still |

Scroll scrub is an **image sequence** on `<canvas>` (mobile 720 px WebP q≈60, desktop 1280 px q≈58, same frame count). Seeking `<video>.currentTime` from scroll drops frames on iOS, so the sequence is the whole scrub, not only scene 2. Landing scene 2 uses the shared showroom sequence (90 frames, about 7 fps). Neighbouring frames are crossfaded on the canvas. Only a few decoded images stay in memory. `devicePixelRatio` is capped at 1.5.

`tools/extract_frames.py` is the encoder. It expects the three source files under `/tmp/red2-src/`.

## Placeholders

- `[ЗАГЛУШКА: звірити з брендбуком клієнта]` — comment at the top of `css/site.css` and `css/scroll.css`. Colours are `--red:#c1272d`, `--tar:#15120f`, `--bone:#ece6dc` from the earlier demo.
- `ES · [ЗАГЛУШКА: RU/EN]` — language switch, both pages.
- `[ЗАГЛУШКА: сток з Dealcar API — у тесті не підключаємо]`
- `[ЗАГЛУШКА: відгуки — тільки з посиланням на Google-профіль і згодою клієнта]`

No reviews, prices, awards, guarantees, or photos of people were added. Contact sheets of the frames actually used are in `qa/`.

## Measured (Chrome headless, mobile 390 px, local server)

Emulation, not a physical phone.

| | First screen | Full mobile scroll | Lighthouse Performance | CLS |
|---|---|---|---|---|
| `/` | ~0.62 MB | ~2.6 MB | 97 | 0.001 |
| `/scroll/` | ~0.57 MB | ~4.3 MB | 94 | 0 |

JS gzip: landing ~48 KB, scroll page ~49 KB, including GSAP and ScrollTrigger. Both are under the 60 KB cap. LCP was 2.6 s on `/` and 3.1 s on `/scroll/`.

## Briefs

`BRIEF.md` is the landing brief. `BRIEF-SCROLL.md` is the scroll-demo brief.

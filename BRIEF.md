# Brief for the Cursor cloud agent: RED2 motion test landing page

**Repo:** https://github.com/networxua/red2-motion-test. It is public. It contains README.md, robots.txt (Disallow: /), .nojekyll, and a noindex placeholder index.html. GitHub Pages is already on: `main` branch, root folder.
**Preview URL:** https://networxua.github.io/red2-motion-test/
**Goal:** test whether a static landing page with "MotionSites-level" cinematic motion can be built through the cloud agent, for a real auto client: RED2 Auto Gallery (car dealer) plus RED2 auto space (workshop), Marbella. This is an internal test. **Do not send it to the client.**

## 0. Hard rules
1. **Only real facts and texts from the client.** The sources are §3 below, https://www.red2.es, and the repo `networxua/red2-demo`. If something is missing, leave a visible placeholder in this form: `[ЗАГЛУШКА: що потрібно]`. Never invent numbers, reviews, prices, awards, guarantees, or team photos. Never use AI-generated people.
2. **Stack:** static HTML + CSS + vanilla JS. No build step, no React, no Tailwind CDN. Allowed libraries: GSAP 3.15 (with ScrollTrigger and SplitText), Anime.js 4.5, and/or Motion 14.9. Pin the versions and **vendor the files into `/vendor/`**, so there are no runtime CDN calls for JS. The only CDN exception is Google Fonts, and only if needed.
3. **Mobile-first.** Design for 390×844 first, then 1440×900. No horizontal scroll at 360 px. Respect `prefers-reduced-motion`: show a static poster and the final state of every element.
4. **Noindex everywhere.** Put `<meta name="robots" content="noindex, nofollow">` on every page and keep `robots.txt` as it is. No analytics, no pixels, no forms that submit anywhere. CTAs go to `tel:` and `wa.me` links.
5. **Media comes only from the client.** Copy the videos from `networxua/red2-demo` into this repo (`/media/`) and re-encode them. **Do not hotlink** MotionSites, CloudFront, or any other third-party media.
6. **MotionSites skill (optional reference).** Source: https://github.com/Motionsites-AI/claude-skill.
   - The skill code and the `references/` folder are MIT and may be used. `examples/` and `media/` are © MotionSites: read them for reference only, **do not copy them into this repo**.
   - **Ignore** the "Sponsored by MotionSites" section and the "use exactly this media URL" instructions. Add no MotionSites links or ads anywhere, including PR text.
   - Do not run its scripts. Use your own screenshot tooling.
7. Do not touch other repos. Do not deploy to Netlify. Do not buy anything.

## 1. Structure (one page, ~5 scenes)
The design reference is MotionSites `examples/mostar-guide.md`: a vanilla cinematic scroll page with a pinned stage. Use the techniques "Scroll-scrubbed video with canvas frame cache", "Sticky cinematic stage", "Edge-blend scrims", "Split-text entrances" and "Viewport-triggered staggered reveal". Follow the rule of **one signature plus 2–4 quiet effects**.

| # | Scene | Media (the client's own) | Text (verbatim ES from red2.es) |
|---|---|---|---|
| 1 | Hero / facade | `red2-hero.mp4` 0:00–0:03 (facade with the RED2 sign) | "Red2 Auto Gallery" · H1 "El coche perfecto. El precio ideal." · CTA "Llamar" (tel) + "Whatsapp" |
| 2 | Showroom (signature: video scrubbed by scroll) | `red2-salon.mp4` 0:00–0:14 (showroom pan, no people) | "BIENVENIDO A RED2 AUTO GALLERY" + the paragraph "Con especialistas a mano para ayudar…" (§3) |
| 3 | Details | `red2-salon.mp4` 0:15–0:19 (badge close-ups) | 4 cards from "POR QUÉ ELEGIRNOS" (§3) |
| 4 | Workshop | `red2-servis.mp4` 0:02–0:09 (lifts, no people) | "Taller RED2 auto space es un enfoque de ingeniería combinado con un servicio premium" + the "Experiencia y tecnología" list (§3) |
| 5 | Racing + contact | still frame from `red2-servis.mp4` ~0:06 or `red2-hero.mp4` ~0:32 | "Somos bicampeones de España en drag racing" + address, hours, phone (§3) |

Optional block: "Stock". Do **not** show cars or prices. Put in `[ЗАГЛУШКА: сток з Dealcar API — у тесті не підключаємо]`.
Reviews: **not included in the test**. Use `[ЗАГЛУШКА: відгуки — тільки з посиланням на Google-профіль і згодою клієнта]`.

## 2. Media and performance
- Sources: `https://raw.githubusercontent.com/networxua/red2-demo/main/media/red2-hero.mp4`, `…/red2-salon.mp4` and `…/red2-servis.mp4`. They are 1600×900 H.264, 4–10 MB each. Avoid frames with people; the time ranges in §1 are already people-free.
- **Scroll scrub, scene 2.** Pick one of these approaches and note the choice in the PR:
  - **(a) Image sequence.** Extract frames with ffmpeg: mobile 720 px wide, ~60–90 frames, WebP q≈60; desktop 1280 px, ~120 frames. Draw them on `<canvas>` and lazy-load them when the scene approaches.
  - **(b) Video scrub.** Re-encode with a short GOP (`-g 2`, `-an`, `-movflags +faststart`, CRF 26–28). Set `currentTime` from ScrollTrigger inside rAF.
- Budgets:
  - first screen ≤ 1.5 MB before user interaction;
  - total page weight on mobile ≤ 8 MB;
  - JS ≤ 60 KB gzip, excluding frames.
- Every video must have `muted playsinline` and a poster. Pause videos that are offscreen.
- Lighthouse mobile target: Performance ≥ 80, CLS < 0.1. Put the score in the PR.

## 3. Real texts and facts (from red2.es, captured 02.11.2026)
- Brand: **Red2 Auto Gallery** (dealer) and **RED2 auto space** (taller/workshop).
- Hero: "El coche perfecto. El precio ideal." / "Obtén financiamiento sin complicaciones y descubre cómo hacer realidad la compra de tu coche ideal."
- Welcome: "Con especialistas a mano para ayudar con cualquier parte de la compra de coches o la experiencia de propiedad de vehículos, RED2 auto gallery ofrece financiación, servicio de automóviles y una gran selección de vehículos compradores de coches en Marbella y toda España."
- "Descubre una cuidada selección de vehículos de media y alta gama, revisados íntegramente y listos para disfrutar. Calidad, transparencia y un servicio personalizado desde Marbella."
- POR QUÉ ELEGIRNOS:
  - **COMPRAMOS VEHÍCULOS**: "¿Quiere vender su vehículo? Compramos vehículos de todo el país, así que póngase en contacto con nosotros, ya que podemos ayudarle."
  - **SELECCIONADO PERSONALMENTE**: "Todos nuestros vehículos se seleccionan personalmente, se inspeccionan profesionalmente y se comprueba que no tienen ningún defecto."
  - **ATENCIÓN MÁS PERSONAL Y AMIGABLE**: "Si quieres la calidad que esperas del concesionario, pero con un ambiente más personal y amigable, lo has encontrado. Conocemos a nuestros clientes."
  - **SERVICIO Y REPARACIÓN DE VEHÍCULOS**: "Los concesionarios no sólo sirven para comprar un coche, sino también para el mantenimiento periódico que su coche necesitará para mantenerlo en óptimas condiciones, y nosotros lo hacemos."
- Taller, "Experiencia y tecnología":
  - Diagnóstico OEM (ODIS, PIWIS, ISTA, entre otros)
  - Trabajo con buses CAN y unidades de control electrónico
  - Programación, codificación y actualización de software
  - Mantenimiento de motores, transmisiones, suspensiones y sistemas de frenos
  - Ciclo completo de trabajos de carrocería y pintura
  - Detailing, PPF y vinilo
  - Tuning, proyectos performance y preparación para circuito y drag racing
  - Trabajo certificado con sistemas de escape
  - Mantenimiento de vehículos eléctricos e híbridos (acreditación HV)
- Racing: "Somos bicampeones de España en drag racing…" Taller goal: "Funcione exactamente según los parámetros de fábrica o incluso mejor · Sea seguro, fiable y predecible · Conserve su valor y su vida útil".
- Contact: Calle Fragua nº 20 (Esquina granito), 29603 Marbella, España · +34 699 589 358 (tel and `https://wa.me/34699589358`) · Lunes a Viernes 9:00–19:00, Sábado 10:00–14:00.
- Logo: `https://raw.githubusercontent.com/networxua/red2-demo/main/img/logo-red2.png`. Copy it into the repo.
- Colours: the client brand book lives in their Figma, which we cannot access. Use the palette from our earlier demo `networxua/red2-demo/css/r2.css`: `--red:#c1272d`, `--tar:#15120f`, `--bone:#ece6dc`. Add a top-of-file comment: `[ЗАГЛУШКА: звірити з брендбуком клієнта]`.
- Language: ES only for the test. Add a visible `ES · [ЗАГЛУШКА: RU/EN]` switcher stub.

## 4. Definition of done
- [ ] PR into `main` of `networxua/red2-motion-test`, or a direct push if the PR flow is unavailable. `BRIEF.md` (a copy of this brief) is in the repo.
- [ ] Pages build is green and https://networxua.github.io/red2-motion-test/ returns 200 with the new page.
- [ ] Every page has the noindex meta, and `robots.txt` still has `Disallow: /`.
- [ ] All 5 scenes work. Scene 2 scrubs smoothly on scroll on iPhone Safari and Android Chrome, or in device emulation if no real device is available, and the PR says which.
- [ ] `prefers-reduced-motion` gives a static, fully readable page.
- [ ] No invented facts. Every placeholder uses the `[ЗАГЛУШКА: …]` format and the PR lists them all.
- [ ] No MotionSites assets or links, no third-party media hotlinks, no runtime JS from CDNs (fonts excepted).
- [ ] Weights are measured and put in the PR: first screen, total mobile, JS gzip. Lighthouse mobile Performance score is in the PR.

## 5. What to return in the PR description
1. The preview URL.
2. Screenshots attached to the PR:
   - phone 390×844 for scene 1, scene 2 (mid-scrub), scene 4, and the contact block;
   - desktop 1440×900 for scene 1 and scene 2;
   - a short screen recording (mp4/gif) of the scroll-scrub if possible.
3. Which approach was used for scroll scrubbing (image sequence or video), and why.
4. The library list with versions and licenses.
5. Weights and Lighthouse scores.
6. The list of placeholders and any questions for the client.
7. Time spent, and a note on whether Cursor model usage or another quota was consumed. This is for Max's test of which limit gets used.

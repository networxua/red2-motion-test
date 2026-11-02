# Brief for the Cursor cloud agent: RED2 scroll-video demo

**What:** a single demo page where **scroll drives the video** and **the text appears scene by scene**, like the @kutuzova_alesya reel. It is an internal NetWorX demo for the auto niche. **Do not send it to the client.**
**Where:**
- Repo: https://github.com/networxua/red2-motion-test (already created, Pages enabled, noindex).
- Put the page in the `/scroll/` folder. Preview URL: https://networxua.github.io/red2-motion-test/scroll/
- If the landing page from `cloud_agent_brief.md` is being built in the same repo at the same time, keep the two pages independent. Shared `/vendor/` is OK.

## Hard rules
These are the same as in `cloud_agent_brief.md` §0:
- real facts only, otherwise `[ЗАГЛУШКА: …]`;
- static HTML/CSS/vanilla JS, with GSAP 3.15 + ScrollTrigger vendored into `/vendor/`;
- noindex;
- no AI-generated people;
- no third-party media hotlinks;
- no MotionSites ads or assets;
- no deploys other than GitHub Pages.

## Video source
**Primary: RED2's real footage.** It fits well: a showroom pan, badge close-ups, and the workshop with red lifts. It is already in our public repo:
- `https://raw.githubusercontent.com/networxua/red2-demo/main/media/red2-hero.mp4` (52 s, 1600×900)
- `https://raw.githubusercontent.com/networxua/red2-demo/main/media/red2-salon.mp4` (24 s)
- `https://raw.githubusercontent.com/networxua/red2-demo/main/media/red2-servis.mp4` (20.7 s)

Use **only these people-free segments**:

| Scene | Clip and time range | What is in the frame |
|---|---|---|
| 1 Facade | `red2-hero.mp4` 0:00–0:03 | Building with the RED2 sign |
| 2 Showroom | `red2-salon.mp4` 0:00–0:14 | Slow pan along the cars in the showroom |
| 3 Details | `red2-salon.mp4` 0:15–0:19 | Badge close-ups (Porsche, BMW) |
| 4 Workshop | `red2-servis.mp4` 0:02–0:09 | Bays with red lifts, cars raised |
| 5 Final | still frame `red2-servis.mp4` ~0:04 or `red2-salon.mp4` 0:22 | Background for the contacts |

Check every extracted frame for people. If someone appears, trim the range. Generated replacement scenes (Option B below) will be supplied by Max **only if** the real footage does not work out.

## How the page works
1. A `<canvas>` is pinned for the full screen height. ScrollTrigger maps scroll progress onto frame sequences, one per scene, joined with a 10 % crossfade between scenes.
2. Frames are extracted with ffmpeg:
   - mobile: 720 px wide, ~15 fps, WebP q≈60;
   - desktop: 1280 px wide, ~24 fps.
   - Scene lengths in scroll: 1 → 120vh, 2 → 250vh, 3 → 120vh, 4 → 200vh, 5 → 100vh.
   - Lazy-load the next scene's frames when it is one screen away.
3. Text overlays, all ES verbatim from red2.es. Each line enters word by word (blur→0, y 20→0) between 10 % and 30 % of its scene and exits between 75 % and 90 %:
   - **1:** kicker "Red2 Auto Gallery · Marbella" / H1 "El coche perfecto. El precio ideal." / CTA buttons "Llamar" (tel:+34699589358) and "Whatsapp" (https://wa.me/34699589358). The CTAs stay visible in a sticky bottom bar on mobile.
   - **2:** "Descubre una cuidada selección de vehículos de media y alta gama, revisados íntegramente y listos para disfrutar."
   - **3:** "SELECCIONADO PERSONALMENTE" / "Todos nuestros vehículos se seleccionan personalmente, se inspeccionan profesionalmente y se comprueba que no tienen ningún defecto."
   - **4:** "Taller RED2 auto space" / "Diagnóstico OEM (ODIS, PIWIS, ISTA, entre otros) · Detailing, PPF y vinilo · Mantenimiento de vehículos eléctricos e híbridos (acreditación HV)"
   - **5:** "Somos bicampeones de España en drag racing" / Calle Fragua nº 20 (Esquina granito), 29603 Marbella · Lunes a Viernes 9:00–19:00, Sábado 10:00–14:00 · +34 699 589 358
4. A scene progress indicator: 5 dots on the right that can be clicked to jump to a scene.
5. Legibility: a gradient scrim at the bottom and left. Colours `--red:#c1272d`, `--tar:#15120f`, `--bone:#ece6dc` from `networxua/red2-demo/css/r2.css`, with the comment `[ЗАГЛУШКА: звірити з брендбуком клієнта]`. Logo: `red2-demo/img/logo-red2.png`.
6. With `prefers-reduced-motion` or no JS, show a normal vertical page: 5 still posters with the text underneath, no scrubbing.
7. All text lives in the HTML, not baked into frames. The H1 is real HTML.

## Budgets
- First screen (scene 1 poster + JS) ≤ 1.5 MB.
- Full mobile scroll ≤ 10 MB.
- JS ≤ 60 KB gzip.
- devicePixelRatio capped at 1.5 on mobile.
- Lighthouse mobile Performance ≥ 75 (canvas pages are heavier, so the bar is a little lower than for the landing page).

## Definition of done and what to return
- [ ] https://networxua.github.io/red2-motion-test/scroll/ returns 200, noindex is in place, and `robots.txt` is unchanged.
- [ ] Scrubbing is smooth when scrolling forwards and backwards on iPhone Safari and Android Chrome, or in emulation, and the PR says which.
- [ ] No people in any frame. The PR includes a contact sheet of the frames used, one image per scene.
- [ ] The reduced-motion and no-JS fallback works.
- [ ] The PR description contains:
  - the preview URL;
  - a phone 390×844 screenshot for each scene, taken mid-scene;
  - desktop 1440×900 screenshots of scenes 1, 2 and 4;
  - a short screen recording of the scroll (mp4/gif);
  - page weight (first screen, total) and Lighthouse;
  - the library list with versions and licenses;
  - every `[ЗАГЛУШКА]`;
  - time spent and which usage quota was consumed.

---

## Option B: generated scenes (only if the real footage does not work)
Max generates these himself: frames in Nano Banana (Gemini), video in Kling image-to-video with start and end frames.

Shared style, added to every frame prompt:
> Cinematic automotive photography, dark charcoal studio with subtle red accent lighting (#c1272d), glossy polished concrete floor with soft reflections, 35mm lens, shallow depth of field, high contrast, photorealistic, no people, no text, no logos, no license plates, no watermark.

Produce 16:9 frames (1600×900+) for desktop and separate 9:16 frames for mobile, with the subject composed for a vertical frame.

**Scene B1. Car approach (hero)**
- Start frame: `A dark modern premium sedan, generic design without any brand badges, seen from the front three-quarter view far in the background of a dark studio, headlights on, thin red light strip on the back wall, mist near the floor. [shared style]`
- End frame: `The same dark premium sedan, now close to camera, front three-quarter view filling 70% of the frame, headlights on, reflections on the hood, same studio and lighting. [shared style]`
- Kling (5–10 s, image-to-video with start and end frames): `Slow smooth dolly-in, the car glides forward toward the camera at walking pace, steady camera, no camera shake, headlights glowing, light mist moving across the floor, cinematic, realistic physics, no people, no text.`

**Scene B2. Wheel and brake macro**
- Start frame: `Extreme close-up of a large alloy wheel with a red brake caliper and drilled brake disc, generic design without brand marks, dark studio, rim light from the left. [shared style]`
- End frame: `Same wheel, camera moved 30 degrees around to the side, caliper in sharp focus, tire tread texture visible. [shared style]`
- Kling: `Slow orbit around the wheel from front to side, 30 degrees, smooth and steady, shallow depth of field rack focus onto the red caliper, subtle dust particles in the light beam, no people, no text.`

**Scene B3. Service bay**
- Start frame: `Clean modern car workshop bay, a dark sedan raised on a red two-post lift, polished grey epoxy floor, diagnostic cart with a screen standing nearby, tools neatly on the wall, cool white ceiling light strips, empty, no people. [shared style without "dark studio": use "bright clean workshop"]`
- End frame: `Same workshop, camera lower and closer under the raised car, view of the underbody and wheels, red lift arms in the foreground. [same]`
- Kling: `Slow push-in and slight tilt up under the raised car on the red lift, steady gimbal movement, ceiling lights reflecting on the floor, no people, no text, realistic.`

Rules for Option B:
- 3–6 attempts per scene; keep the take with no warping or artefacts.
- **No people, no brand logos, no plates.**
- Hand over the MP4s (≥1080p, no audio) and the start/end frames in a folder. The agent then builds the page exactly as described above, with Option B frames in place of the real footage.
- Mark on the page that this is generated material: `[ДЕМО: згенеровані кадри]`.

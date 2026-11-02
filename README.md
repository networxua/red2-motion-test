# red2-motion-test

Internal motion test for RED2 Auto Gallery / RED2 auto space (Marbella). Not for the client. Not indexed (`robots.txt` + `noindex`).

- Preview: https://networxua.github.io/red2-motion-test/
- Scroll demo: https://networxua.github.io/red2-motion-test/scroll/
- Motion catalog: https://networxua.github.io/red2-motion-test/lab/
- Static HTML/CSS/vanilla JS. GitHub Pages from `main`, root folder.

The landing keeps the structure, copy and palette of the Angelina preview (`red2-preview-networx.netlify.app`). Four effects sit on top of it: Anime.js word blur and a drawn stroke on the hero, a border beam and a pointer spotlight (vanilla, from 21st.dev / Kokonut ideas), and Motion springs on buttons, loaded at the first pointer. `/lab/` shows each source on its own. `/scroll/` scrubs RED2 footage with GSAP ScrollTrigger.

## Libraries

| Library | Version | License | Where |
|---|---|---|---|
| GSAP + ScrollTrigger + SplitText | 3.15.0 | Standard no-charge (Webflow) | Landing (already the preview's engine), `/scroll/` |
| Anime.js | 4.5.0 | MIT | Landing hero, `/lab/` |
| Motion | 14.9.0 | MIT | Landing CTAs (deferred), `/lab/` |

Files live in `/vendor/`. No runtime JS from a CDN. Copyright notices in the minified files are intact.

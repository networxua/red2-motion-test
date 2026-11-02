/* RED2 landing motion. Libraries are vendored; Motion loads on the first pointer. */
import { animate, stagger, splitText, createDrawable } from '../vendor/anime.esm.min.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduce) document.documentElement.classList.add('fx-on');

let heroPlayed = false;
function hero() {
  if (reduce || heroPlayed) return;
  const h1 = document.querySelector('[data-hero-title]');
  if (!h1) return;
  heroPlayed = true;
  try {
    const split = splitText(h1, { words: { class: 'fx-w' } });
    const words = split.words || [];
    if (words.length) {
      animate(words, {
        opacity: [0, 1],
        y: [14, 0],
        filter: ['blur(8px)', 'blur(0px)'],
        delay: stagger(70),
        duration: 900,
        ease: 'outExpo'
      });
    }
    const side = document.querySelector('.hero__side');
    if (side && !side.querySelector('.fx-line')) {
      side.insertAdjacentHTML('afterbegin', '<svg class="fx-line" viewBox="0 0 280 16" aria-hidden="true"><path d="M2 10 C 34 10 46 3 78 7 S 150 15 200 6 246 3 278 8" fill="none" stroke="#c1272d" stroke-width="1.6" stroke-linecap="round"/></svg>');
      animate(createDrawable('.fx-line path'), {
        draw: ['0 0', '0 1'],
        duration: 1200,
        ease: 'inOutQuad'
      });
    }
  } catch (err) {
    heroPlayed = false;
  }
}
window.R2FX = { hero };

if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.tr').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      card.classList.add('is-hot');
    });
    card.addEventListener('pointerleave', () => card.classList.remove('is-hot'));
  });
}

let motionPromise;
function loadMotion() {
  if (window.Motion) return Promise.resolve(window.Motion);
  if (!motionPromise) {
    motionPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'vendor/motion.js';
      s.onload = () => resolve(window.Motion);
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return motionPromise;
}

if (!reduce) {
  document.querySelectorAll('.btn, .hdr__wa, .dock a').forEach((el) => {
    const to = (scale) => {
      loadMotion().then((M) => {
        M.animate(el, { scale }, { type: 'spring', stiffness: 480, damping: 18, mass: 0.55 });
      }).catch(() => {});
    };
    el.addEventListener('pointerenter', () => to(1.045));
    el.addEventListener('pointerdown', () => to(0.96));
    el.addEventListener('pointerup', () => to(1.045));
    el.addEventListener('pointerleave', () => to(1));
  });
}

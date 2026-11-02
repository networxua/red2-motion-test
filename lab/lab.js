(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A = window.anime;
  var M = window.Motion;

  function playText() {
    var el = document.querySelector('[data-split]');
    if (!el || reduce || !A) return;
    if (el._split) el._split.revert();
    var split = A.splitText(el, { words: { class: 'w' } });
    el._split = split;
    A.animate(split.words, {
      opacity: [0, 1],
      y: [16, 0],
      filter: ['blur(8px)', 'blur(0px)'],
      delay: A.stagger(55),
      duration: 800,
      ease: 'outExpo'
    });
  }

  function playDraw() {
    if (reduce || !A) return;
    A.animate(A.createDrawable('#lane'), {
      draw: ['0 0', '0 1'],
      duration: 1400,
      ease: 'inOutQuad'
    });
  }

  var pathAnim;
  function playPath() {
    if (reduce || !A) return;
    if (pathAnim && pathAnim.revert) pathAnim.revert();
    var mp = A.createMotionPath('#orbit');
    pathAnim = A.animate('.dot', {
      translateX: mp.translateX,
      translateY: mp.translateY,
      rotate: mp.rotate,
      duration: 2800,
      ease: 'linear',
      loop: true
    });
  }

  function armSpring() {
    var btn = document.querySelector('#motion-spring .btn');
    if (!btn || reduce || !M) return;
    function to(scale) {
      M.animate(btn, { scale: scale }, { type: 'spring', stiffness: 460, damping: 16, mass: 0.6 });
    }
    btn.addEventListener('pointerenter', function () { to(1.06); });
    btn.addEventListener('pointerdown', function () { to(0.94); });
    btn.addEventListener('pointerup', function () { to(1.06); });
    btn.addEventListener('pointerleave', function () { to(1); });
  }

  function shuffleList() {
    var ul = document.getElementById('slist');
    if (!ul) return;
    var items = [].slice.call(ul.children);
    if (reduce || !M) {
      ul.appendChild(items[0]);
      return;
    }
    var first = new Map(items.map(function (el) { return [el, el.getBoundingClientRect()]; }));
    ul.appendChild(items[0]);
    items.forEach(function (el) {
      var a = first.get(el);
      var b = el.getBoundingClientRect();
      var dx = a.left - b.left;
      var dy = a.top - b.top;
      if (!dx && !dy) return;
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      M.animate(el, { transform: 'translate(0px, 0px)' }, { type: 'spring', stiffness: 320, damping: 28 });
    });
  }

  var spot = document.querySelector('.spot');
  if (spot && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    spot.addEventListener('pointermove', function (e) {
      var r = spot.getBoundingClientRect();
      spot.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      spot.style.setProperty('--my', (e.clientY - r.top) + 'px');
      spot.classList.add('is-hot');
    });
    spot.addEventListener('pointerleave', function () { spot.classList.remove('is-hot'); });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-replay]');
    if (!b) return;
    var name = b.getAttribute('data-replay');
    if (name === 'text') playText();
    if (name === 'draw') playDraw();
    if (name === 'path') playPath();
    if (name === 'list') shuffleList();
  });

  if (!reduce) {
    playText();
    playDraw();
    playPath();
  }
  armSpring();
})();

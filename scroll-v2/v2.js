(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var phone = matchMedia('(max-width: 800px)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('scrub');

  var SCENES = phone
    ? [
        { dir: 'frames/p/1/', n: 85, fit: 'cover' },
        { dir: 'frames/p/2/', wide: 'frames/d/2/', n: 85, fit: 'orbit' },
        { dir: 'frames/p/3/', n: 73, fit: 'cover' }
      ]
    : [
        { dir: 'frames/d/1/', n: 85, fit: 'cover' },
        { dir: 'frames/d/2/', n: 85, fit: 'cover' },
        { dir: 'frames/d/3/', n: 73, fit: 'cover' }
      ];
  var total = SCENES.reduce(function (a, s) { return a + s.n; }, 0);
  SCENES.forEach(function (s) {
    s.imgs = new Array(s.n);
    s.asked = new Array(s.n);
    if (s.wide) { s.wimgs = new Array(s.n); s.wasked = new Array(s.n); }
  });

  var canvas = document.getElementById('view');
  var ctx = canvas.getContext('2d', { alpha: false });
  var poster = document.getElementById('poster');
  var bar = document.getElementById('bar');
  var beats = [].slice.call(document.querySelectorAll('.beat'));
  var queue = [];
  var active = 0;
  var target = 0;
  var shown = 0;
  var posterOff = false;

  function pad(n) { return (n < 10 ? '00' : n < 100 ? '0' : '') + n; }

  function ask(si, i, wide) {
    var s = SCENES[si];
    if (!s || i < 0 || i >= s.n) return;
    var asked = wide ? s.wasked : s.asked;
    if (!asked || asked[i]) return;
    asked[i] = 1;
    queue.push([si, i, wide ? 1 : 0]);
    pump();
  }
  function pump() {
    var cap = phone ? 3 : 6;
    while (active < cap && queue.length) {
      var job = queue.shift();
      active++;
      var img = new Image();
      img.decoding = 'async';
      img.onload = function () {
        var sc = SCENES[job[0]];
        (job[2] ? sc.wimgs : sc.imgs)[job[1]] = img;
        active--;
        if (job[0] === 0 && job[1] === 0 && !job[2]) posterOff = true;
        pump();
      };
      img.onerror = function () { active--; pump(); };
      var sc0 = SCENES[job[0]];
      img.src = (job[2] ? sc0.wide : sc0.dir) + pad(job[1] + 1) + '.webp';
    }
  }
  function preloadScene(si) {
    var s = SCENES[si];
    if (!s) return;
    for (var i = 0; i < s.n; i++) {
      ask(si, i, 0);
      if (s.wide) ask(si, i, 1);
    }
  }
  /* First frames first, then the rest of scene 1, then the next scenes. */
  for (var k = 0; k < 10; k++) ask(0, k);
  preloadScene(0);

  function locate(p) {
    var x = Math.min(0.9999, Math.max(0, p)) * total;
    for (var i = 0; i < SCENES.length; i++) {
      if (x < SCENES[i].n || i === SCENES.length - 1) {
        return { i: i, f: Math.min(SCENES[i].n - 1.001, x) };
      }
      x -= SCENES[i].n;
    }
    return { i: 0, f: 0 };
  }
  function nearestFrom(list, n, idx) {
    idx = Math.max(0, Math.min(n - 1, idx));
    var img = list[idx];
    if (img && img.naturalWidth) return img;
    for (var d = 1; d < n; d++) {
      if (list[idx - d] && list[idx - d].naturalWidth) return list[idx - d];
      if (list[idx + d] && list[idx + d].naturalWidth) return list[idx + d];
    }
    return null;
  }
  function nearest(s, idx) { return nearestFrom(s.imgs, s.n, idx); }
  function nearestWide(s, idx) { return s.wimgs ? nearestFrom(s.wimgs, s.n, idx) : null; }
  function drawCover(img, cw, ch) {
    var ir = img.naturalWidth / img.naturalHeight;
    var cr = cw / ch;
    var dw, dh, dx, dy;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0; }
    else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);
  }
  /* Phone scene 2: 16:9 fitted so the side profile is not cropped off.
     Zoom eases from a tighter 3/4 to the full silhouette. */
  function drawStage(img, cw, ch, zoom) {
    var ir = img.naturalWidth / img.naturalHeight;
    var cr = cw / ch;
    var dw, dh;
    if (ir > cr) { dw = cw; dh = cw / ir; }
    else { dh = ch; dw = ch * ir; }
    dw *= zoom; dh *= zoom;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }
  function paint(img, scene, local) {
    var cw = canvas.width, ch = canvas.height;
    if (scene.fit !== 'orbit') { drawCover(img, cw, ch); return; }
    /* Vertical orbit until the crop would cut the nose, then the wide frame
       eases out until the whole profile is in frame. */
    var wide = nearestWide(scene, Math.round(local * (scene.n - 1)));
    if (local < 0.32) {
      drawCover(img, cw, ch);
      return;
    }
    var zoom = local < 0.55 ? 2.15 - ((local - 0.32) / 0.23) * 0.7 : 1.45 - ((local - 0.55) / 0.45) * 0.45;
    if (local < 0.55 && img) {
      var t = (local - 0.32) / 0.23;
      ctx.globalAlpha = 1 - t;
      drawCover(img, cw, ch);
      ctx.globalAlpha = t;
      if (wide) drawStage(wide, cw, ch, zoom);
      ctx.globalAlpha = 1;
      return;
    }
    if (wide) drawStage(wide, cw, ch, Math.max(1, zoom));
    else if (img) drawCover(img, cw, ch);
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    var dpr = Math.min(phone ? 1.5 : 2, window.devicePixelRatio || 1);
    var w = Math.max(1, Math.round(r.width * dpr));
    var h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h;
    }
  }

  var WINDOWS = [
    { a: -0.2, b: 0.0, c: 0.16, d: 0.26 },
    { a: 0.24, b: 0.32, c: 0.46, d: 0.54 },
    { a: 0.54, b: 0.62, c: 0.72, d: 0.78 },
    { a: 0.76, b: 0.84, c: 1.2, d: 1.3 }
  ];
  function env(p, w) {
    if (p <= w.a || p >= w.d) return 0;
    if (p < w.b) return (p - w.a) / (w.b - w.a);
    if (p <= w.c) return 1;
    return 1 - (p - w.c) / (w.d - w.c);
  }

  function render(p) {
    resize();
    var cw = canvas.width, ch = canvas.height;
    ctx.fillStyle = '#070605';
    ctx.fillRect(0, 0, cw, ch);
    var loc = locate(p);
    var s = SCENES[loc.i];
    var f0 = Math.floor(loc.f);
    var f1 = Math.min(s.n - 1, f0 + 1);
    var mix = loc.f - f0;
    var local = loc.f / Math.max(1, s.n - 1);
    var a = nearest(s, f0);
    var b = nearest(s, f1);
    if (a) {
      paint(a, s, local);
      if (s.fit !== 'orbit' && b && b !== a && mix > 0.02) {
        ctx.globalAlpha = mix;
        paint(b, s, local);
        ctx.globalAlpha = 1;
      }
      if (posterOff && poster && !poster.classList.contains('is-off')) poster.classList.add('is-off');
    }
    /* Keep the next scene's frames coming before we reach them. */
    if (local > 0.45) preloadScene(loc.i + 1);
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    for (var i = 0; i < beats.length; i++) {
      var o = env(p, WINDOWS[i]);
      var y = o >= 1 ? 0 : (p < WINDOWS[i].b ? (1 - o) * 26 : (1 - o) * -18);
      beats[i].style.opacity = String(o);
      beats[i].style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
    }
  }

  ScrollTrigger.create({
    trigger: '#story',
    start: 'top top',
    end: '+=520%',
    pin: '.stage',
    anticipatePin: 1,
    onUpdate: function (self) { target = self.progress; }
  });

  function tick() {
    var d = target - shown;
    var k = phone ? 0.28 : 0.18;
    if (Math.abs(d) < 0.0004) shown = target;
    else shown += d * k;
    render(shown);
    requestAnimationFrame(tick);
  }
  render(0);
  requestAnimationFrame(tick);

  addEventListener('resize', function () { resize(); render(shown); });
})();

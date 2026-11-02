(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = matchMedia('(min-width: 900px)');
  var SCENES = [
    { src: 'media/s1.mp4', dur: 3, vh: 120 },
    { src: 'media/s2.mp4', dur: 4.5, vh: 250 },
    { src: 'media/s3.mp4', dur: 3, vh: 120 },
    { src: 'media/s4.mp4', dur: 1.8, vh: 200 },
    { src: null, dur: 0, vh: 100, poster: 'media/s5.webp' }
  ];
  var total = SCENES.reduce(function (a, s) { return a + s.vh; }, 0);
  var dots = [].slice.call(document.querySelectorAll('.dots button'));
  var copies = [].slice.call(document.querySelectorAll('.flow .copy'));
  var stage = document.getElementById('stage');
  var st;

  function at(p) {
    var x = Math.min(0.9999, Math.max(0, p)) * total;
    for (var i = 0; i < SCENES.length; i++) {
      if (x <= SCENES[i].vh || i === SCENES.length - 1) {
        return { i: i, local: Math.min(1, x / SCENES[i].vh) };
      }
      x -= SCENES[i].vh;
    }
    return { i: 0, local: 0 };
  }

  function go(i) {
    var sec = document.getElementById('scene-' + (i + 1));
    if (!document.documentElement.classList.contains('scrub')) {
      if (sec) sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    if (!st) return;
    var before = 0;
    for (var k = 0; k < i; k++) before += SCENES[k].vh;
    var dist = st.end - st.start;
    window.scrollTo({ top: st.start + (before / total) * dist + 2, behavior: reduce ? 'auto' : 'smooth' });
  }

  dots.forEach(function (b) {
    b.addEventListener('click', function () { go(+b.dataset.i); });
  });

  function mark(i) {
    dots.forEach(function (b, n) {
      if (n === i) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  if (!wide.matches || reduce || !window.gsap || !window.ScrollTrigger) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id.replace('scene-', '');
        mark(+id - 1);
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    document.querySelectorAll('.shot').forEach(function (s) { obs.observe(s); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('scrub');
  stage.removeAttribute('aria-hidden');

  var layers = SCENES.map(function (sc) {
    var el;
    if (sc.src) {
      el = document.createElement('video');
      el.muted = true;
      el.playsInline = true;
      el.preload = 'auto';
      el.setAttribute('playsinline', '');
      el.poster = '';
      el.src = sc.src;
    } else {
      el = document.createElement('img');
      el.className = 'still';
      el.alt = '';
      el.src = sc.poster;
    }
    el.style.opacity = '0';
    stage.appendChild(el);
    return el;
  });
  var scrim = document.createElement('div');
  scrim.className = 'scrim';
  stage.appendChild(scrim);

  var blocks = copies.map(function (copy) {
    var node = copy.cloneNode(true);
    node.classList.add('stage-copy');
    var words = [];
    node.querySelectorAll('h1,h2,p').forEach(function (el) {
      if (el.querySelector('a')) return;
      var text = el.textContent.trim();
      if (!text) return;
      el.textContent = '';
      text.split(/\s+/).forEach(function (w, idx, arr) {
        var s = document.createElement('span');
        s.textContent = w;
        s.style.display = 'inline-block';
        s.style.willChange = 'transform,opacity';
        el.appendChild(s);
        if (idx < arr.length - 1) el.appendChild(document.createTextNode(' '));
        words.push(s);
      });
    });
    stage.appendChild(node);
    return { node: node, words: words };
  });

  function styleWord(el, local) {
    var o, y, blur;
    if (local < 0.1) { o = 0; y = 20; blur = 8; }
    else if (local < 0.3) {
      var k = (local - 0.1) / 0.2;
      o = k; y = 20 * (1 - k); blur = 8 * (1 - k);
    } else if (local < 0.75) { o = 1; y = 0; blur = 0; }
    else if (local < 0.9) {
      var e = (local - 0.75) / 0.15;
      o = 1 - e; y = -14 * e; blur = 6 * e;
    } else { o = 0; y = -14; blur = 6; }
    el.style.opacity = String(o);
    el.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
    el.style.filter = blur > 0.4 ? 'blur(' + blur.toFixed(1) + 'px)' : 'none';
  }

  function seek(video, t) {
    if (!video || video.tagName !== 'VIDEO') return;
    video.dataset.want = String(t);
    if (!video.dataset.bound) {
      video.dataset.bound = '1';
      var applyLater = function () { seek(video, parseFloat(video.dataset.want)); };
      video.addEventListener('loadedmetadata', applyLater);
      video.addEventListener('loadeddata', applyLater);
    }
    if (video.readyState < 1) return;
    if (Math.abs(video.currentTime - t) < 0.025) return;
    try { video.currentTime = t; } catch (err) {}
  }

  function render(p) {
    var cur = at(p);
    mark(cur.i);
    layers.forEach(function (el, i) {
      var sc = SCENES[i];
      var local;
      if (i === cur.i) local = cur.local;
      else if (i === cur.i - 1) local = 1;
      else if (i === cur.i + 1) local = 0;
      else { el.style.opacity = '0'; return; }
      var o = 1;
      if (i === cur.i) {
        if (cur.local < 0.1 && i > 0) o = cur.local / 0.1;
        else if (cur.local > 0.9 && i < SCENES.length - 1) o = 1 - (cur.local - 0.9) / 0.1;
      } else if (i === cur.i - 1) o = cur.local < 0.1 ? 1 - cur.local / 0.1 : 0;
      else o = cur.local > 0.9 ? (cur.local - 0.9) / 0.1 : 0;
      el.style.opacity = String(Math.max(0, Math.min(1, o)));
      if (sc.dur) seek(el, Math.min(sc.dur - 0.04, Math.max(0, (i === cur.i ? cur.local : local) * sc.dur)));
    });
    blocks.forEach(function (b, i) {
      var local = i === cur.i ? cur.local : (i < cur.i ? 1 : 0);
      if (i === 0) local = Math.max(local, 0.42);
      var env = local < 0.08 ? 0 : local < 0.16 ? (local - 0.08) / 0.08 : local < 0.78 ? 1 : local < 0.92 ? 1 - (local - 0.78) / 0.14 : 0;
      b.node.style.opacity = String(env);
      b.node.style.pointerEvents = env > 0.4 ? 'auto' : 'none';
      b.words.forEach(function (w, n) { styleWord(w, local - n * 0.012); });
    });
  }

  st = ScrollTrigger.create({
    id: 'scrub',
    trigger: '#pin',
    start: 'top top',
    end: function () { return '+=' + (total / 100) * window.innerHeight; },
    pin: true,
    scrub: true,
    onUpdate: function (self) { render(self.progress); }
  });
  render(0);

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) layers.forEach(function (el) { if (el.pause) el.pause(); });
  });
})();

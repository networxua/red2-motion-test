/* Scroll drives five frame sequences with a 10% crossfade at each join.
   Words enter between 10% and 30% of a scene and leave between 75% and 90%.
   Scene 1 keeps the title on screen from the first frame (a short word rise
   on load) so the H1 is not blank when the film replaces the static page;
   it still leaves between 75% and 90%. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var root = document.documentElement.getAttribute("data-root") || "";
  var counts = window.RED2_MEDIA || {};
  var order = ["s1", "s2", "s3", "s4", "s5"];
  var weights = [120, 250, 120, 200, 100];
  var total = weights.reduce(function (a, b) { return a + b; }, 0);
  var starts = [];
  var acc = 0;
  weights.forEach(function (w) {
    starts.push(acc / total);
    acc += w;
  });

  var film = document.getElementById("film");
  var reel = document.getElementById("reel");
  var canvas = document.getElementById("stage");
  var beats = Array.prototype.slice.call(document.querySelectorAll(".beat"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".dots button"));
  if (!film || !reel || !canvas || typeof gsap === "undefined") return;
  if (!counts.s1) return;

  var allowBlur = !(navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  var born = performance.now();

  function split(el) {
    var text = el.textContent.replace(/\s+/g, " ").trim();
    var words = text.split(" ");
    el.textContent = "";
    words.forEach(function (word, i) {
      var s = document.createElement("span");
      s.className = "w";
      s.textContent = word;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }
  beats.forEach(function (beat) {
    beat.querySelectorAll(".line").forEach(split);
  });

  function ramp(p, a, b) {
    if (p <= a) return 0;
    if (p >= b) return 1;
    return (p - a) / (b - a);
  }

  function wordState(sceneIndex, local, index, n) {
    var exitLead = 0.15 * 0.55;
    var startX = 0.75 + exitLead * (index / Math.max(1, n - 1));
    var endX = Math.min(0.9, startX + 0.15 * 0.5);
    var out = ramp(local, startX, endX);
    if (sceneIndex === 0) {
      var intro = Math.min(1, (performance.now() - born) / 800);
      var start = (index / Math.max(1, n)) * 0.55;
      var t = ramp(Math.max(intro, 0.001), start, start + 0.4);
      return { vis: 1 - out, y: (1 - t) * 18, blur: (1 - t) * 5 };
    }
    var lead = 0.2 * 0.55;
    var startE = 0.1 + lead * (index / Math.max(1, n - 1));
    var endE = Math.min(0.3, startE + 0.1);
    var vis = ramp(local, startE, endE) * (1 - out);
    return { vis: vis, y: (1 - vis) * 20, blur: (1 - vis) * 6 };
  }

  function paintWords(progress) {
    for (var i = 0; i < beats.length; i++) {
      var local = (progress - starts[i]) / (weights[i] / total);
      var any = 0;
      beats[i].querySelectorAll(".line").forEach(function (line) {
        var words = line.querySelectorAll(".w");
        words.forEach(function (word, index) {
          var st = wordState(i, local, index, words.length);
          if (st.vis > any) any = st.vis;
          word.style.opacity = st.vis.toFixed(3);
          word.style.transform = "translate3d(0," + st.y.toFixed(2) + "px,0)";
          if (allowBlur && st.blur > 0.4 && st.vis > 0.05) {
            word.style.filter = "blur(" + Math.min(6, st.blur).toFixed(1) + "px)";
          } else {
            word.style.filter = "";
          }
        });
      });
      var actions = beats[i].querySelector(".actions");
      if (actions) {
        var sceneIn = i === 0 ? 1 : ramp(local, 0.1, 0.25);
        var sceneOut = 1 - ramp(local, 0.75, 0.9);
        actions.style.opacity = String(sceneIn * sceneOut);
      }
      if (any < 0.04 && !(i === 0 && local < 0.7)) beats[i].setAttribute("hidden", "");
      else beats[i].removeAttribute("hidden");
    }
  }

  film.classList.add("is-ready");
  var lastProgress = 0;
  var seqs = order.map(function (id) {
    return RED2.createSequence(root, id, counts[id], function () {
      render(lastProgress);
    });
  });
  var armed = [];
  function arm(i) {
    if (armed[i] || !seqs[i]) return;
    armed[i] = true;
    seqs[i].prime();
  }
  arm(0);

  function activeIndex(progress) {
    var i = 0;
    for (var k = 0; k < starts.length; k++) if (progress >= starts[k]) i = k;
    return i;
  }

  function render(progress) {
    lastProgress = progress;
    var fit = RED2.fitCanvas(canvas);
    if (fit.w < 8 || fit.h < 8) return;
    var i = activeIndex(progress);
    var span = weights[i] / total;
    var local = Math.min(1, Math.max(0, (progress - starts[i]) / span));
    var seq = seqs[i];
    var exact = local * (seq.count - 1);
    var fade = i < seqs.length - 1 && local > 0.9;
    if (fade) {
      var f = (local - 0.9) / 0.1;
      var next = seqs[i + 1];
      arm(i + 1);
      RED2.paint(fit.ctx, fit.w, fit.h, seq, exact, 1, true);
      RED2.paint(fit.ctx, fit.w, fit.h, next, f * Math.min(6, next.count - 1), f, false);
    } else {
      RED2.paint(fit.ctx, fit.w, fit.h, seq, exact, 1, true);
    }
    if (fit.ctx) canvas.previousElementSibling && canvas.classList.add("is-live");
    paintWords(progress);
    dots.forEach(function (dot, n) {
      if (n === i) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    var scrollable = Math.max(1, reel.offsetHeight - window.innerHeight);
    var vhFrac = window.innerHeight / scrollable;
    for (var n = 0; n < seqs.length; n++) {
      if (progress >= starts[n] - vhFrac) arm(n);
    }
  }

  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    var st = ScrollTrigger.create({
      trigger: reel,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: function (self) {
        render(self.progress);
      }
    });
    function tick() {
      render(st.progress || 0);
      if (performance.now() - born < 1200) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var i = Number(dot.getAttribute("data-jump"));
        var local = i === 0 ? 0.02 : 0.2;
        var progress = starts[i] + (weights[i] / total) * local;
        var top = reel.offsetTop + progress * (reel.offsetHeight - window.innerHeight);
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
    return function () {
      st.kill();
    };
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) ScrollTrigger.refresh();
  });
})();

/* Landing: one signature (scroll-scrubbed showroom frames) and quiet
   effects (edge scrims in CSS, staggered reveal, button press). */
(function () {
  var root = document.documentElement.getAttribute("data-root") || "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var counts = window.RED2_MEDIA || {};

  function upgrade(video) {
    if (!video) return;
    var hd = video.getAttribute("data-hd");
    if (!hd || !window.matchMedia("(min-width: 1000px)").matches) return;
    var source = video.querySelector("source");
    if (!source) return;
    source.setAttribute("src", hd);
    video.load();
  }

  function bindVideo(video) {
    if (!video || reduce) return;
    upgrade(video);
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !document.hidden) {
            if (video.preload === "none") video.preload = "auto";
            var p = video.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: "180px 0px", threshold: 0.2 }
    );
    io.observe(video);
  }

  document.querySelectorAll("video").forEach(bindVideo);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.querySelectorAll("video").forEach(function (v) {
        v.pause();
      });
    }
  });

  if (!reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add("is-pending");
      }
      io.observe(el);
    });
  }

  if (reduce || typeof gsap === "undefined" || !counts.s2) return;

  var section = document.querySelector("[data-scrub]");
  var canvas = section && section.querySelector("canvas");
  if (!section || !canvas) return;
  var progressOf = function () { return 0; };
  function draw() {
    var fit = RED2.fitCanvas(canvas);
    if (fit.w < 8 || fit.h < 8) return;
    RED2.paint(fit.ctx, fit.w, fit.h, seq, progressOf() * (seq.count - 1), 1, true);
  }
  var seq = RED2.createSequence(root, "s2", counts.s2, draw);
  seq.prime();

  gsap.registerPlugin(ScrollTrigger);
  var mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", function () {
    var st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.45,
      onUpdate: function (self) {
        progressOf = function () { return self.progress; };
        draw();
      }
    });
    progressOf = function () { return st.progress; };
    requestAnimationFrame(function () {
      st.update();
      draw();
    });
    return function () {
      st.kill();
    };
  });

  window.addEventListener("resize", function () {
    ScrollTrigger.refresh();
  });
})();

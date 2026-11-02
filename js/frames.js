/* Shared canvas helper for the landing scrub and the /scroll/ reel.
   Image sequence (not <video>.currentTime): iOS Safari drops frames when
   seeking a video from scroll. WebP frames are drawn on a canvas, blended
   between neighbours, and only a small window stays decoded. */
(function () {
  var RED2 = (window.RED2 = window.RED2 || {});

  RED2.tier = function () {
    return window.matchMedia("(min-width: 1000px)").matches ? "d" : "m";
  };

  function cover(ctx, w, h, img) {
    var ir = img.naturalWidth / img.naturalHeight;
    var cr = w / h;
    var dw, dh, dx, dy;
    if (ir > cr) {
      dh = h;
      dw = h * ir;
      dx = (w - dw) / 2;
      dy = 0;
    } else {
      dw = w;
      dh = w / ir;
      dx = 0;
      dy = (h - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  RED2.fitCanvas = function (canvas) {
    var rect = canvas.getBoundingClientRect();
    var cssW = Math.max(1, rect.width);
    var cssH = Math.max(1, rect.height);
    var tierCap = RED2.tier() === "d" ? 1280 : 720;
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5, tierCap / cssW);
    dpr = Math.max(0.5, dpr);
    var w = Math.round(cssW * dpr);
    var h = Math.round(cssH * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    return { w: w, h: h, ctx: canvas.getContext("2d", { alpha: true }) };
  };

  RED2.createSequence = function (root, scene, count, onFrame) {
    var images = new Array(count);
    var state = new Array(count);
    var tier = RED2.tier();
    var failedOver = false;
    var WINDOW = 7;

    function url(i) {
      return root + "media/frames/" + tier + "/" + scene + "/" + String(i + 1).padStart(4, "0") + ".webp";
    }

    function request(i) {
      if (i < 0 || i >= count || state[i]) return;
      state[i] = 1;
      var img = new Image();
      img.decoding = "async";
      img.onload = function () {
        state[i] = 2;
        if (onFrame) onFrame();
      };
      img.onerror = function () {
        if (!failedOver && tier !== "m") {
          failedOver = true;
          tier = "m";
          state[i] = 0;
          images[i] = null;
          request(i);
          return;
        }
        state[i] = 3;
      };
      img.src = url(i);
      images[i] = img;
    }

    function ready(i) {
      return !!(images[i] && state[i] === 2 && images[i].naturalWidth);
    }

    function nearest(i) {
      if (ready(i)) return images[i];
      for (var d = 1; d < count; d++) {
        if (ready(i - d)) return images[i - d];
        if (ready(i + d)) return images[i + d];
      }
      return null;
    }

    function focus(index) {
      var from = Math.max(0, index - 2);
      var to = Math.min(count - 1, index + WINDOW);
      var i;
      for (i = from; i <= to; i++) request(i);
      for (i = 0; i < count; i++) {
        if ((i < from - 3 || i > to + 3) && images[i]) {
          images[i].onload = null;
          images[i].onerror = null;
          images[i].src = "";
          images[i] = null;
          state[i] = 0;
        }
      }
    }

    return {
      count: count,
      focus: focus,
      nearest: nearest,
      prime: function () {
        focus(0);
      }
    };
  };

  /* Paint one sequence. alpha multiplies the whole draw. clear=false keeps
     what is already on the canvas so two scenes can crossfade. */
  RED2.paint = function (ctx, w, h, seq, exact, alpha, clear) {
    var max = seq.count - 1;
    var x = Math.min(max, Math.max(0, exact));
    var i0 = Math.floor(x);
    var i1 = Math.min(max, i0 + 1);
    var f = x - i0;
    seq.focus(i0);
    var a = seq.nearest(i0);
    var b = i1 !== i0 ? seq.nearest(i1) : null;
    if (!a && !b) return false;
    var base = alpha == null ? 1 : alpha;
    if (clear) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#15120f";
      ctx.fillRect(0, 0, w, h);
    }
    /* Draw the base frame opaque, then the next frame on top.
       Splitting alpha across both frames leaves the canvas translucent
       and the poster ghosts through. */
    ctx.globalAlpha = base;
    cover(ctx, w, h, a || b);
    if (a && b && b !== a && f > 0.02) {
      ctx.globalAlpha = f * base;
      cover(ctx, w, h, b);
    }
    ctx.globalAlpha = 1;
    return true;
  };
})();

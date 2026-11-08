/* Música continua entre páginas: guarda el segundo actual y lo retoma en la siguiente */
(function () {
  var a = new Audio("audio/1.mp3");
  a.loop = true;
  var t = parseFloat(sessionStorage.getItem("musicaT") || "0");
  a.addEventListener("loadedmetadata", function () {
    if (t > 0 && t < a.duration) a.currentTime = t;
  });
  function guardar() { try { sessionStorage.setItem("musicaT", a.currentTime); } catch (e) {} }
  function iniciar() { var p = a.play(); if (p && p.catch) p.catch(function () {}); }
  addEventListener("pagehide", guardar);
  setInterval(guardar, 1000);
  iniciar();
  ["click", "touchend", "keydown"].forEach(function (ev) {
    document.addEventListener(ev, function () { if (a.paused) iniciar(); }, { passive: true });
  });
})();

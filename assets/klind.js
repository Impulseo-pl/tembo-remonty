// Skórka premium: menu pod pigułką, chowanie logo/telefonu przy przewijaniu, strzałki karuzeli.
(function () {
  var b = document.body, pill = document.querySelector('.k-pill');
  if (pill) {
    pill.addEventListener('click', function () {
      var open = b.classList.toggle('k-open');
      pill.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.k-menu a').forEach(function (a) {
      a.addEventListener('click', function () { b.classList.remove('k-open'); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') b.classList.remove('k-open'); });
  }
  var t = false;
  function upd() { b.classList.toggle('k-scrolled', window.scrollY > 120); t = false; }
  window.addEventListener('scroll', function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
  document.querySelectorAll('.k-carousel').forEach(function (c) {
    var tr = c.querySelector('.k-track');
    c.querySelectorAll('[data-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var it = tr.querySelector('.k-item');
        var step = it ? it.getBoundingClientRect().width + 70 : 400;
        tr.scrollBy({ left: step * +btn.getAttribute('data-dir'), behavior: 'smooth' });
      });
    });
  });
  var stk = document.querySelectorAll('.k-stk');
  if (!('IntersectionObserver' in window)) stk.forEach(function (e) { e.classList.add('k-vis'); });
  else {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { x.target.classList.toggle('k-vis', x.isIntersecting); });
    }, { rootMargin: '300px 0px' });
    stk.forEach(function (e) { io.observe(e); });
  }
})();

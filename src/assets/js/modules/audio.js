
// audio.js - NetEase player via Meting+ APlayer; load after page load; persist using swup (player outside #swup)
(() => {
  window.addEventListener('load', () => {
    const el = document.querySelector('#music');
    if(!el) return;
    // Meting config example (NetEase playlist id). Replace with your id.
    el.innerHTML = `<meting-js
      server="netease"
      type="playlist"
      id="7452421335"
      fixed="true"
      autoplay="true">
    </meting-js>`;
  });
})();


// toc.js - show TOC after hero passes using IntersectionObserver
(() => {
  const toc = document.querySelector('.toc');
  const sentinel = document.querySelector('#article-sentinel');
  if(!toc || !sentinel) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) toc.classList.add('show');
      else toc.classList.remove('show');
    });
  }, {threshold: 0.05});
  io.observe(sentinel);
})();


// backtop.js - back-to-top button
(() => {
  const btn = document.querySelector('#backTop');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 600 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
})();

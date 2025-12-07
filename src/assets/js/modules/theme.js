
// theme.js - dark/light toggle with localStorage
(() => {
  const qs = s => document.querySelector(s);
  const toggle = qs('#theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved) root.setAttribute('data-theme', saved);
  toggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

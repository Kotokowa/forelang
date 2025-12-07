
// counter.js - site run days + visitors via CountAPI (increments on pagehide)
(() => {
  const runEl = document.querySelector('#site-run-days');
  const totalEl = document.querySelector('#site-total');
  const todayEl = document.querySelector('#site-today');
  const keyBase = 'kotokowa-forelang';
  const countApi = 'https://api.countapi.xyz';

  // Run days - set your launch date here
  const launch = new Date('2025-12-05T00:00:00+08:00'); // change to actual start date
  if(runEl){
    const diff = Math.floor((Date.now() - launch.getTime()) / 86400000) + 1;
    runEl.textContent = `本站已运行${diff}天`;
  }

  function fmt(val){
    if(val <= 0) return null;
    return `${val}人`;
  }

  async function getTodayKey(){
    const d = new Date();
    const pad = n => String(n).padStart(2,'0');
    return `${keyBase}-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
  }

  async function getCount(key){
    try{
      const r = await fetch(`${countApi}/get/kotokowa/${key}`);
      const j = await r.json();
      return j.value || 0;
    }catch(e){return 0;}
  }

  async function show(){
    const total = await getCount(`${keyBase}-total`);
    const todayKey = await getTodayKey();
    const today = await getCount(todayKey);
    if(totalEl) totalEl.textContent = total ? `历史总访客：${fmt(total)}` : '您是发现这个网站的第一人！';
    if(todayEl) todayEl.textContent = today ? `今日访客：${fmt(today)}` : '今天还没有访客呢喵';
  }

  show();

  // Count when page is hidden (session finished)
  async function inc(){
    try{
      await fetch(`${countApi}/hit/kotokowa/${keyBase}-total`);
      const todayKey = await getTodayKey();
      await fetch(`${countApi}/hit/kotokowa/${todayKey}`);
    }catch(e){}
  }
  window.addEventListener('pagehide', inc, {once:true});
})();

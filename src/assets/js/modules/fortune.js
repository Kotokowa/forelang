
// fortune.js - draw fortune and suggestions
(() => {
  const btn = document.querySelector('#fortune-btn');
  const out = document.querySelector('#fortune-out');
  if(!btn || !out) return;
  const fortunes = [
    {text:'大吉', adv:'宜：刷题、赶deadline、追番；忌：谈恋爱'},
    {text:'中吉', adv:'宜：背单词、整理笔记；忌：熬夜'},
    {text:'小吉', adv:'宜：多喝水、散步；忌：拖延'},
    {text:'凶', adv:'宜：复盘；忌：冲动消费'},
    {text:'大凶', adv:'宜：休息；忌：内耗'}
  ];
  btn.addEventListener('click', () => {
    const pick = fortunes[Math.floor(Math.random()*fortunes.length)];
    out.innerHTML = `今日运势：<b>${pick.text}</b><br>${pick.adv}`;
  });
})();

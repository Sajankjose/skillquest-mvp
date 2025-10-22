// Simple dashboard demo + CSV export
const data = [
  { name:'Asha Menon', role:'RM', progress:82, accuracy:91, lastActive:'2025-10-20' },
  { name:'Rahul Nair', role:'RM', progress:67, accuracy:84, lastActive:'2025-10-22' },
  { name:'Deepa K', role:'OPS', progress:51, accuracy:79, lastActive:'2025-10-14' },
];

(function updateKPIs(){
  const avg = (k)=> Math.round(data.reduce((a,b)=>a+b[k],0)/data.length);
  document.getElementById('kpiProgress').textContent = avg('progress') + '%';
  document.getElementById('kpiAccuracy').textContent = avg('accuracy') + '%';
  document.getElementById('kpiActive').textContent = data.filter(x => (Date.now()-new Date(x.lastActive).getTime())/86400000 <= 7).length;
})();

(function drawBar(){
  const c = document.getElementById('skillBar'); if(!c) return;
  const ctx = c.getContext('2d');
  const labels = data.map(d=>d.name);
  const values = data.map(d=>d.progress);
  const W=c.width, H=c.height, barW = Math.floor((W-60)/values.length);
  ctx.clearRect(0,0,W,H);
  ctx.font = '12px Inter, sans-serif';
  values.forEach((v,i)=>{
    const x = 40 + i*barW + 6, h = Math.round((H-60) * v/100);
    ctx.fillStyle = '#3bd1a8'; ctx.fillRect(x, H-40-h, barW-18, h);
    ctx.fillStyle = '#222'; ctx.fillText(labels[i], x, H-20);
    ctx.fillText(v+'%', x, H-45-h);
  });
})();

document.getElementById('exportCsv')?.addEventListener('click', ()=>{
  const headers = ['Name','Role','Progress','Accuracy','Last Active'];
  const rows = data.map(d => [d.name,d.role,d.progress,d.accuracy,d.lastActive].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='team.csv'; a.click();
  URL.revokeObjectURL(url);
});

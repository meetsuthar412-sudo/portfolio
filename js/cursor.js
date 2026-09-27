/* ═══════════ CUSTOM CURSOR ═══════════ */
(function(){
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if(!dot || !ring) return;
  if(matchMedia('(hover:none)').matches) return;

  let mx=0,my=0,rx=0,ry=0;
  addEventListener('mousemove', e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
  });
  function loop(){
    rx += (mx-rx)*.15; ry += (my-ry)*.15;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a,button,.card,.project,.skill,.exp-card,.train-card,[data-hover]').forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
  });
})();
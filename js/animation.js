/* ═══════════ GSAP + SCROLLTRIGGER + SPLITTING ═══════════ */
(function(){
  if(!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if(window.Splitting) Splitting();

  // Reveal on scroll
  document.querySelectorAll('.reveal').forEach(el=>{
    gsap.fromTo(el, {y:40, opacity:0}, {
      y:0, opacity:1, duration:1, ease:'power3.out',
      scrollTrigger:{trigger:el, start:'top 85%'}
    });
  });

  // Stagger children
  document.querySelectorAll('.stagger').forEach(group=>{
    gsap.fromTo(group.children, {y:30, opacity:0}, {
      y:0, opacity:1, duration:.8, stagger:.08, ease:'power3.out',
      scrollTrigger:{trigger:group, start:'top 80%'}
    });
  });

  // Hero intro
  const hero = document.querySelector('.hero');
  if(hero){
    const tl = gsap.timeline({defaults:{ease:'power3.out'}});
    tl.from('.hero-badge', {y:20, opacity:0, duration:.8})
      .from('.hero h1', {y:60, opacity:0, duration:1}, '-=.5')
      .from('.hero-role, .hero-desc', {y:30, opacity:0, duration:.8, stagger:.15}, '-=.6')
      .from('.hero-cta', {y:30, opacity:0, duration:.8}, '-=.5')
      .from('.hero-socials', {y:20, opacity:0, duration:.6}, '-=.4')
      .from('.hero-visual', {scale:.8, opacity:0, duration:1.2}, '-=1')
      .from('.hero-float', {scale:0, opacity:0, duration:.8, stagger:.2}, '-=.8');
  }

  // Section titles
  document.querySelectorAll('.section-title').forEach(t=>{
    gsap.from(t, {
      y:60, opacity:0, duration:1, ease:'power3.out',
      scrollTrigger:{trigger:t, start:'top 85%'}
    });
  });

  // Skill bars
  document.querySelectorAll('.skill-bar span').forEach(bar=>{
    const pct = bar.dataset.pct;
    ScrollTrigger.create({
      trigger:bar, start:'top 90%',
      onEnter:()=>{ bar.style.width = pct + '%'; }
    });
  });

  // Stats counter
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target = +el.dataset.count;
    ScrollTrigger.create({
      trigger:el, start:'top 90%', once:true,
      onEnter:()=>{
        gsap.to({v:0},{v:target, duration:2, ease:'power2.out',
          onUpdate:function(){ el.textContent = Math.round(this.targets()[0].v) + (el.dataset.suffix||''); }
        });
      }
    });
  });

  // Card mouse glow
  document.querySelectorAll('.card, .project, .exp-card, .train-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX-r.left)+'px');
      card.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove', e=>{
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      btn.style.transform = `translate(${x*.25}px,${y*.35}px)`;
    });
    btn.addEventListener('mouseleave', ()=>btn.style.transform='');
  });

  // Tilt on project cards
  if(window.VanillaTilt){
    VanillaTilt.init(document.querySelectorAll('.project, .exp-card, .train-card'), {
      max:6, speed:400, glare:true, 'max-glare':.15, scale:1.02
    });
  }

  // Navbar scroll
  const nav = document.querySelector('.navbar');
  if(nav){
    ScrollTrigger.create({
      start:'top -60', end:99999, toggleClass:{className:'scrolled', targets:nav}
    });
  }
})();
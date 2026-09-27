
/* ═══════════ MAIN — NAV + LOADER + TYPED + LENIS ═══════════ */
(function(){
  const PROFILE = {
    name: 'Meet Suthar',
    shortName: 'Meet',
    title: 'Full Stack Engineer',
    email: 'meetsuthar412@gmail.com',
    phone: '9316588687',
    location: 'Mehsana, Gujarat'
  };
  const GITHUB_PROFILE_URL = 'https://github.com/meetsuthar412-sudo';

  document.title = document.title.replace(/Dhruv|Swapnil/gi, PROFILE.name);
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while(textWalker.nextNode()){
    textWalker.currentNode.nodeValue = textWalker.currentNode.nodeValue
      .replace(/Dhruv/g, PROFILE.name)
      .replace(/Swapnil/g, PROFILE.name)
      .replace(/dhruvsuthar188@gmail.com/g, PROFILE.email)
      .replace(/\+91 \(931\)658-8687/g, PROFILE.phone);
  }

  document.querySelectorAll('a[href="./resume/resume.pdf"], a[href="resume/resume.pdf"], a[href="assets/resume/Swapnil_Resume.pdf"]').forEach(link=>{
    link.href = 'resume/Meet_CV.pdf';
  });

  if(GITHUB_PROFILE_URL){
    document.querySelectorAll('a[aria-label="GitHub"], a[href="#"]').forEach(link=>{
      if(link.querySelector('.fa-github') || link.textContent.trim() === 'GitHub'){
        link.href = GITHUB_PROFILE_URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  document.querySelectorAll('.navbar').forEach(nav=>{
    if(!nav.querySelector('.github-nav-link')){
      const link = document.createElement('a');
      link.className = 'github-nav-link social-btn';
      link.href = GITHUB_PROFILE_URL || '#';
      link.setAttribute('aria-label', 'GitHub profile');
      link.innerHTML = '<i class="fa-brands fa-github"></i>';
      if(GITHUB_PROFILE_URL){ link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      nav.insertBefore(link, nav.querySelector('.nav-cta'));
    }
  });
  document.querySelectorAll('.footer').forEach(footer=>{
    if(!footer.querySelector('.github-footer-link')){
      const link = document.createElement('a');
      link.className = 'github-footer-link social-btn';
      link.href = GITHUB_PROFILE_URL || '#';
      link.setAttribute('aria-label', 'GitHub profile');
      link.innerHTML = '<i class="fa-brands fa-github"></i>';
      if(GITHUB_PROFILE_URL){ link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      footer.querySelector('.footer-bottom')?.appendChild(link);
    }
  });

  // Loader
  addEventListener('load', ()=>{
    setTimeout(()=>document.querySelector('.loader')?.classList.add('done'), 600);
  });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', ()=>links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>links.classList.remove('open')));
  }

  // Active page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === page || (page==='' && href==='index.html')) a.classList.add('active');
  });

  // Typed.js
  if(window.Typed){
    const el = document.getElementById('typed');
    if(el){
      new Typed('#typed', {
        strings:[
          'Full Stack Freelancer',
          'Web Development Specialist',
          'Freelance Graphic Designer',
          'UI/UX Designer',
          'Creative Technologist'
        ],
        typeSpeed:60, backSpeed:40, backDelay:1800, loop:true
      });
    }
  }

  // Lenis smooth scroll
  if(window.Lenis){
    const lenis = new Lenis({duration:1.2, easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)), smoothWheel:true});
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time=>lenis.raf(time*1000));
    gsap.ticker.lagSmoothing(0);
  }
})();
/* ═══════════════════════════════════════════════════════════════
   TRAINING PAGE ANIMATIONS
   Premium GSAP animations for training cards and elements
   ══════════════════════════════════════════════════════════════ */

(function(){
  // Wait for DOM and GSAP to load
  if(!window.gsap || !window.ScrollTrigger){
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ─── PAGE LOAD ANIMATIONS ───
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Animate section header
  tl.from('.section-tag', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2
  })
  .from('.section-title', {
    y: 40,
    opacity: 0,
    duration: 1
  }, '-=0.4')
  .from('.section-sub', {
    y: 30,
    opacity: 0,
    duration: 0.8
  }, '-=0.5');

  // ─── TRAINING CARDS ANIMATIONS ───
  const trainCards = document.querySelectorAll('.train-card');
  
  trainCards.forEach((card, index) => {
    // Initial state
    gsap.set(card, {
      y: 60,
      opacity: 0,
      scale: 0.95
    });

    // Animate in on scroll
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out'
        });
      }
    });

    // Hover animation - lift and glow
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        boxShadow: '0 20px 60px rgba(0, 240, 255, 0.15), 0 0 1px rgba(0, 240, 255, 0.3)',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      // Pulse icon
      gsap.to(card.querySelector('.train-ic'), {
        scale: 1.1,
        boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)',
        duration: 0.4,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: 'none',
        duration: 0.4,
        ease: 'power2.out'
      });
      
      gsap.to(card.querySelector('.train-ic'), {
        scale: 1,
        boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)',
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  });

  // ─── ICON ANIMATIONS ───
  const icons = document.querySelectorAll('.train-ic');
  
  icons.forEach((icon, index) => {
    // Continuous subtle pulse
    gsap.to(icon, {
      boxShadow: '0 0 50px rgba(0, 240, 255, 0.5)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.5
    });

    // Floating animation
    gsap.to(icon, {
      y: '+=5',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.3
    });
  });

  // ─── BADGE ANIMATIONS ───
  const badges = document.querySelectorAll('.train-type');
  
  badges.forEach((badge, index) => {
    gsap.from(badge, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      delay: 0.8 + (index * 0.2),
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: badge,
        start: 'top 85%'
      }
    });
  });

  // ─── TAGS ANIMATION ───
  const allTags = document.querySelectorAll('.exp-tags');
  
  allTags.forEach((tagContainer, index) => {
    const tags = tagContainer.querySelectorAll('span');
    
    gsap.from(tags, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      delay: index * 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: tagContainer,
        start: 'top 90%'
      }
    });
  });

  // ─── BOTTOM CARD ANIMATION ───
  const bottomCard = document.querySelector('.card.reveal');
  if(bottomCard){
    gsap.from(bottomCard, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: bottomCard,
        start: 'top 85%'
      }
    });
  }

  // ─── PARALLAX EFFECT ON SCROLL ───
  gsap.to('.section-head', {
    yPercent: 50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.section-head',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // ─── MOUSE MOVE PARALLAX (Subtle) ───
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  });

  function smoothParallax(){
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    trainCards.forEach((card, index) => {
      const speed = (index + 1) * 0.5;
      gsap.to(card, {
        x: currentX * speed,
        y: currentY * speed + (card.matches(':hover') ? -8 : 0),
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    requestAnimationFrame(smoothParallax);
  }

  smoothParallax();

  // ─── REFRESH SCROLLTRIGGER ON LOAD ───
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });

  // ─── CLEANUP ON PAGE UNLOAD ───
  window.addEventListener('beforeunload', () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  });

})();
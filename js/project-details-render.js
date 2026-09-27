(function(){
  const id = new URLSearchParams(window.location.search).get('project');
  const project = window.portfolioProjects?.find(item => item.id === id);
  if(!project) return;

  const banner = document.getElementById('projectBanner');
  const gallery = document.getElementById('projectGallery');
  const categoryEl = document.getElementById('projectCategory');
  const titleEl = document.getElementById('projectTitle');
  const subtitleEl = document.getElementById('projectSubtitle');
  const overviewEl = document.getElementById('projectOverview');
  const featuresEl = document.getElementById('projectFeatures');
  const techEl = document.getElementById('projectTech');
  const highlightsEl = document.getElementById('projectHighlights');
  const solutionEl = document.getElementById('projectSolution');
  const resultsEl = document.getElementById('projectResults');
  const liveButton = document.getElementById('livePreviewBtn');

  document.title = `${project.title} - Meet Suthar`;
  categoryEl.innerHTML = `<i class="fa-solid fa-layer-group" style="color:var(--neon-cyan)"></i> ${project.category || 'Project'}`;
  titleEl.textContent = project.title;
  subtitleEl.textContent = project.description || 'Professional project showcase.';

  const safeImage = project.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=85';
  if (banner) {
    banner.src = safeImage;
    banner.alt = `${project.title} preview`;
  }

  overviewEl.textContent = project.description || 'Project overview details are available in the repository reference.';
  highlightsEl.textContent = project.highlights || 'Built for real-world business impact with a professional, production-focused implementation.';
  solutionEl.textContent = project.solution || 'The implementation follows a clean architecture, modern tooling, and scalable design decisions tailored to the product requirements.';
  resultsEl.textContent = project.results || 'The project demonstrates practical engineering execution and a polished product experience.';
  featuresEl.innerHTML = (project.features || []).map(feature => `<li>✓ ${feature}</li>`).join('');
  techEl.innerHTML = (project.tech || []).map(tech => `<span>${tech}</span>`).join('');

  const galleryImages = Array.isArray(project.gallery) && project.gallery.length ? project.gallery : [safeImage, safeImage, safeImage];
  if (gallery) {
    gallery.innerHTML = galleryImages.map((image, index) => `<div><img src="${image}" alt="${project.title} preview ${index + 1}" loading="lazy"></div>`).join('');
  }

  if (project.liveUrl) {
    liveButton.href = project.liveUrl;
    liveButton.target = '_blank';
    liveButton.rel = 'noopener noreferrer';
  } else {
    liveButton.remove();
  }
})();

(function(){
  const grid = document.querySelector('[data-project-grid]');
  if(!grid || !window.portfolioProjects) return;

  grid.innerHTML = window.portfolioProjects.map(project => {
    const actions = [];

    if (project.liveUrl) {
      actions.push(`<a class="project-link project-link-live" href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} live project"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Project</a>`);
    }

    if (project.githubUrl) {
      actions.push(`<a class="project-link" href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} GitHub repository"><i class="fa-brands fa-github"></i> GitHub</a>`);
    }

    return `
      <article class="project">
        <div class="project-img">
          <span class="project-tag">${project.category || 'Project'}</span>
          <img src="${project.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=85'}" alt="${project.title} project preview" loading="lazy">
        </div>
        <div class="project-body">
          <h3>${project.title}</h3>
          <p>${project.description || 'Professional project built for real-world business impact.'}</p>
          <div class="project-tech">
            ${(project.tech || []).slice(0, 4).map(tech => `<span>${tech}</span>`).join('')}
          </div>
          ${actions.length ? `<div class="project-actions">${actions.join('')}</div>` : ''}
        </div>
      </article>
    `;
  }).join('');
})();

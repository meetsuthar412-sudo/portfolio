/* ═══════════ EXPERIENCE — DYNAMIC DURATION CALCULATOR ═══════════ */
(function(){
  // Current date: July 26, 2026
  const now = new Date(2026, 6, 26);

  function calcDuration(startYear, startMonth){
    const start = new Date(startYear, startMonth - 1, 1);
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if(months < 0){ years--; months += 12; }
    if(years > 0 && months > 0) return `${years} Year${years>1?'s':''} ${months} Month${months>1?'s':''}`;
    if(years > 0) return `${years} Year${years>1?'s':''}`;
    return `${months} Month${months>1?'s':''}`;
  }

  // Apply to all experience cards
  document.querySelectorAll('.exp-duration[data-start]').forEach(el=>{
    const [y, m] = el.dataset.start.split('-').map(Number);
    el.textContent = '⏱ Duration: ' + calcDuration(y, m);
  });

  // Update total experience counter
  const totalEl = document.getElementById('totalExperience');
  if(totalEl){
    // From Jan 2024 to Jul 2026 = 2 years 6 months
    const total = calcDuration(2024, 1);
    totalEl.textContent = total + '+';
  }
})();
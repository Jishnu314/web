// Load skills.html into the placeholder
fetch('subfiles/skills.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('skills-section-placeholder').innerHTML = html;
  });
// Animate .skill elements on scroll


  // Load Experience section
fetch('subfiles/experience.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('experience-section-placeholder').innerHTML = html;
  });

// sidebar for phone 
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');

  let hideTimeout;

  // Show/hide sidebar on toggle
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    resetHideTimer();
  });

  // Hide if clicked outside sidebar
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && e.target !== toggleBtn) {
      sidebar.classList.remove('active');
    } else {
      resetHideTimer();
    }
  });

  // Hide if no interaction for 2 sec
  function resetHideTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      sidebar.classList.remove('active');
    }, 2000);
  }



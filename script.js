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


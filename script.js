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


    const grid = document.querySelector('.dot-grid');
    const cols = 25;
    const totalDots = 800; // Lower total for performance
    const dots = [];

    function getRC(index) {
      return [Math.floor(index / cols), index % cols];
    }

    function createDots() {
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        const opacity = Math.random().toFixed(2);
        dot.style.setProperty('--i', opacity);
        dot.dataset.originalOpacity = opacity;
        grid.appendChild(dot);
        dots.push({ el: dot, index: i });
      }

      dots.forEach(({ el, index }) => {
        el.addEventListener('mouseenter', () => {
          const [r1, c1] = getRC(index);
          dots.forEach(({ el: otherEl, index: idx }) => {
            const [r2, c2] = getRC(idx);
            const dist = Math.hypot(r2 - r1, c2 - c1);
            if (dist <= 4) {
              const baseOpacity = parseFloat(otherEl.dataset.originalOpacity);
              const fade = Math.max(baseOpacity, 1 - dist * 0.1);
              otherEl.classList.add('hovered');
              otherEl.style.setProperty('--i', fade.toFixed(3));
              const intensity = Math.max(0, 255 - dist * 50);
              otherEl.style.backgroundColor = `rgb(${intensity}, ${intensity}, ${intensity})`;

              setTimeout(() => {
                otherEl.classList.remove('hovered');
                if (!otherEl.classList.contains('shimmering')) {
                  otherEl.style.setProperty('--i', baseOpacity);
                  otherEl.style.backgroundColor = 'rgb(0, 0, 0)';
                }
              }, 400); // Shorter hover reset
            }
          });
        });
      });
    }

    function shimmerDot(dot) {
      if (dot.classList.contains('hovered') || dot.classList.contains('shimmering') || dot.style.backgroundColor === 'rgb(255, 255, 255)') return;
      dot.classList.add('shimmering');
      dot.style.setProperty('--i', 1);
      dot.style.backgroundColor = 'rgb(255, 255, 255)';
      // Do NOT reset color or opacity
    
      setTimeout(() => {
        dot.classList.remove('shimmering');
        if (!dot.classList.contains('hovered')) {
          dot.style.setProperty('--i', originalOpacity);
          dot.style.backgroundColor = 'rgb(0, 0, 0)';
        }
      }, 2000); // Shorter shimmer life
    }

    function startSlowShimmer() {
      setInterval(() => {
        const count = Math.floor(Math.random() * 3) + 1; // Fewer shimmer dots
        for (let i = 0; i < count; i++) {
          const randomDot = dots[Math.floor(Math.random() * dots.length)];
          shimmerDot(randomDot.el);
        }
      }, 3000); // Less frequent shimmer
    }

    createDots();
    startSlowShimmer();
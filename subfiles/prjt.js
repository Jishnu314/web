fetch('project.html')
  .then(response => response.text())
  .then(html => {
    const container = document.getElementById('project-section-placeholder');
    container.innerHTML = html;

    // Now run the JS that controls the project section
    initializeProjects();
  });

function initializeProjects() {
  const projects = [
    {
      img: "subfiles/img1.jpg",
      title: "Portfolio",
      desc: "This is my personal portfolio website designed to showcase my identity as a developer and designer. It features a modern, minimal UI with a sidebar for navigation, a bold introduction section with my image, and easy access to view projects.",
      links: []
    },
    //{
      //img: "subfiles/img2.jpg",
      //title: "Project Demo",
      //desc: "This is a description of Project Demo. It uses different technologies and has unique features. Discuss its impact.  this is a mode for checking the project section about how they see and how it will be by see in all scales and how it will be in the mobile view.",
      //links: [
        //{ text: "GitHub", url: "https://github.com/Jishnu314.git" },
        //{ text: "PDF", url: "#" }
      
      //]
    //}
    
  ];

  let current = 0;
  let thumbnails = [];

  // Add a parameter to control scrolling
  function renderProject(idx, scrollThumb = false) {
    const p = projects[idx];
    document.getElementById('project-img').src = p.img;
    document.getElementById('project-title').textContent = p.title;
    document.getElementById('project-desc').textContent = p.desc;

    const linksDiv = document.getElementById('project-links');
    linksDiv.innerHTML = '';
    p.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.text;
      a.className = 'project-btn1';
      a.target = '_blank';
      linksDiv.appendChild(a);
    });

    // Highlight the active thumbnail
    thumbnails.forEach((thumb, i) => {
      if (i === idx) {
        thumb.classList.add('active');
        // Only scroll if requested (on user interaction)
        if (scrollThumb) {
          thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  let autoMoveInterval;
  let autoMoveTimeout;

  function startAutoMove() {
    clearInterval(autoMoveInterval);
    autoMoveInterval = setInterval(() => {
      current = (current + 1) % projects.length;
      renderProject(current, false); // Do NOT scroll on auto-move
    }, 5000);
  }

  function pauseAutoMove() {
    clearInterval(autoMoveInterval);
    clearTimeout(autoMoveTimeout);
    autoMoveTimeout = setTimeout(() => {
      startAutoMove();
    }, 12000); // Wait 12 seconds before resuming auto-move
  }

  function userInteracted(action) {
    action();
    pauseAutoMove();
  }

  document.getElementById('back-btn').onclick = () => {
    userInteracted(() => {
      current = (current - 1 + projects.length) % projects.length;
      renderProject(current, true); // Scroll on user interaction
    });
  };

  document.getElementById('next-btn').onclick = () => {
    userInteracted(() => {
      current = (current + 1) % projects.length;
      renderProject(current, true); // Scroll on user interaction
    });
  };

  const thumbStrip = document.getElementById('project-thumbnails');
  if (thumbStrip) {
    thumbStrip.innerHTML = '';
    thumbnails = [];
    projects.forEach((p, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'thumbnail-preview';
      thumb.onclick = () => {
        userInteracted(() => {
          current = i;
          renderProject(i, true); // Scroll on user interaction
        });
      };
      const img = document.createElement('img');
      img.src = p.img;
      img.alt = `Project ${i + 1}`;
      thumb.appendChild(img);
      thumbStrip.appendChild(thumb);
      thumbnails.push(thumb);
    });
  }

  renderProject(current, false); // Do NOT scroll on initial load
  startAutoMove();
}



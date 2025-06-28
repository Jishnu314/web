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
      desc: "This is a description of Project One. Highlight features, tech stack, and what makes it special.",
      links: [
        { text: "View", url: "https://youtu.be/5Am4GRVmeko?si=jPR3E-ahA_crM9Qa" },
        { text: "PDF", url: "#" },
        
      ]
    },
    {
      img: "subfiles/img2.jpg",
      title: "Project Two",
      desc: "This is a description of Project Two. It uses different technologies and has unique features. Discuss its impact.  this is a mode for checking the project section about how they see and how it will be by see in all scales and how it will be in the mobile view.",
      links: [
        { text: "GitHub", url: "https://github.com/Jishnukolarkunnath/resume.git" },
        { text: "PDF", url: "#" },
        
      ]
    },
    {
      img: "subfiles/img3.jpg",
      title: "Project Three",
      desc: "This is a description of Project Three. Explain what makes it stand out.Nature is the natural world around us, including living things like plants, animals, birds, and insects, as well as non-living things such as mountains, rivers, oceans, sky, soil, and air. It is a gift from Earth that supports all life forms. Nature maintains a perfect balance in ecosystems, helping to purify air and water, provide food, regulate climate, and support biodiversity Humans depend on nature for their survival—whether it’s the oxygen we breathe, the water we drink, or the crops we grow. Forests act as the lungs of the Earth, while oceans help regulate temperature and weather patterns. Animals and insects help in pollination and maintaining the food chain. However, human activities like deforestation, pollution, and overuse of resources are harming nature. To live sustainably, we must protect and preserve nature through actions like planting trees, conserving water, reducing plastic use, and respecting wildlife.Nature is not just important for survival—it also gives peace, beauty, and inspiration. Protecting nature means protecting our future.",
      links: [
        { text: "GitHub", url: "#" },
        { text: "PDF", url: "#" },
        
      ]
    },
    {
      img: "subfiles/img4.jpg",
      title: "Project Four",
      desc: "This is a description of Project Four. Discuss the technologies used and the problem it solves.",
      links: [
        { text: "GitHub", url: "#" },
        { text: "PDF", url: "#" },

      ]
    },
    {
      img: "subfiles/img5.jpg",
      title: "Project Five",
      desc: "This is a description of Project Five. Highlight its main features and technologies.",
      links: [
        { text: "GitHub", url: "#" },
        { text: "PDF", url: "#" },

      ]
    }
    
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
    }, 3000);
  }

  function pauseAutoMove() {
    clearInterval(autoMoveInterval);
    clearTimeout(autoMoveTimeout);
    autoMoveTimeout = setTimeout(() => {
      startAutoMove();
    }, 5000); // Wait 5 seconds before resuming auto-move
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



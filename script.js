// ==============================================================================
// Silas Kwabla Gah — Portfolio Scripts
// Interactive 3D Pipeline Sandbox, Theme Controller, Smooth Nav
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ─── Theme Controller ───
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return prefersDark.matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ─── Mobile Navigation Toggle ───
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // ─── Interactive 3D Vision Pipeline Explorer ───
  const stagesData = [
    {
      id: 0,
      name: "1. 2D Cues (SAM3 + CLIP)",
      badge: "2D Feature Extraction",
      title: "Dense Promptable Cues & Open-Vocabulary Embeddings",
      desc: "Extract zero-shot promptable masks using frozen SAM 3 alongside text-aligned semantic embeddings from OpenCLIP/DINOv2. No learned fine-tuning is performed on image backbones.",
      tech: "SAM 3 · OpenCLIP · DINOv2 · ViT-H",
      metric: "Zero-Shot Proposals",
      gain: "Multi-View Dense Priors"
    },
    {
      id: 1,
      name: "2. Geometric Lifting",
      badge: "Ray-Casting Frustums",
      title: "Calibrated 2D-to-3D Frustum Back-Projection",
      desc: "Project dense 2D pixel coordinates into world 3D space using calibrated camera intrinsics K and extrinsics [R|t]. Point clouds from ScanNet/ScanNet++ are mapped to viewing frustums.",
      tech: "Camera Ray-Casting · Pose Geometry · Open3D",
      metric: "50M+ 3D Points",
      gain: "Unbounded LiDAR/RGB-D"
    },
    {
      id: 2,
      name: "3. Consensus (Δθ=0)",
      badge: "Hypothesis Retention",
      title: "Inference-Time Multi-Modal Arbitration",
      desc: "Eliminates premature semantic collapse caused by argmax decisions. Preserves compact Top-k hypothesis distributions across multiple camera viewpoints without parameter fine-tuning.",
      tech: "Non-Parametric Consensus · Top-k Simplex",
      metric: "Paired Bootstrap 95% CIs",
      gain: "Recovers Overlooked Classes"
    },
    {
      id: 3,
      name: "4. 3D Scene Graphs",
      badge: "SOTA Open-Vocabulary",
      title: "Generalized Few-Shot 3D Semantic Grounding",
      desc: "Produces high-fidelity semantic point labels and open-world scene graphs across hundreds of novel indoor object categories on ScanNet200 and ScanNet++ benchmarks.",
      tech: "ScanNet200 · ScanNet++ · PointCept",
      metric: "+9.62 pts Harmonic Mean",
      gain: "33.68% ScanNet200 SOTA"
    }
  ];

  const pTabs = document.querySelectorAll('.p-tab');
  const stageTitle = document.getElementById('stageTitle');
  const stageDesc = document.getElementById('stageDesc');
  const stageTech = document.getElementById('stageTech');
  const stageGain = document.getElementById('stageGain');

  function renderStage(index) {
    const data = stagesData[index];
    if (!data) return;

    pTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
      tab.setAttribute('aria-selected', i === index);
    });

    if (stageTitle) stageTitle.textContent = data.title;
    if (stageDesc) stageDesc.textContent = data.desc;
    if (stageTech) stageTech.textContent = data.tech;
    if (stageGain) stageGain.textContent = data.gain;
  }

  pTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => renderStage(idx));
  });

  // ─── Active Navigation Spy ───
  const sections = document.querySelectorAll('section[id], main[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  });
});

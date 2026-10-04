/* ═══════════════════════════════════════════════════
   MAIN JS — Mohammed Ajmal N Portfolio
   ═══════════════════════════════════════════════════ */

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [];
        const i = siblings.indexOf(entry.target);
        const delay = i >= 0 ? i * 80 : 0;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ── Active nav link ──
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
);

sections.forEach((sec) => activeObserver.observe(sec));

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinksEl.classList.remove('open');
  });
});

// ── Typewriter ──
const roles = [
  'AI Engineer',
  'Machine Learning Developer',
  'Computer Vision Specialist',
  'Full-Stack Developer',
  'Healthcare AI Builder',
];
const heroRoleEl = document.getElementById('heroRole');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewrite() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    heroRoleEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    heroRoleEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typewrite, speed);
}

typewrite();

// ── Counter animation ──
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach((el) => {
  counterObserver.observe(el);
});

function animateCounter(el, target) {
  let current = 0;
  const duration = 1500;
  const step = target / (duration / 16);

  function update() {
    current += step;
    if (current >= target) {
      el.textContent = target;
    } else {
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ── Hero particles ──
const particlesContainer = document.getElementById('heroParticles');

function createParticles() {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${60 + Math.random() * 40}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;

    const colors = ['#6c5ce7', '#a855f7', '#00cec9'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.width = `${2 + Math.random() * 3}px`;
    particle.style.height = particle.style.width;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── Project Modal Logic ──
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const projectData = {
  av: {
    title: 'Automatic vehicle using Raspberry pi',
    tags: ['Raspberry Pi', 'Python', 'OpenCV'],
    desc: 'Built a self-navigating vehicle using Raspberry Pi, integrating computer vision and sensor fusion. Implemented obstacle detection, lane following, and path planning algorithms for autonomous navigation in controlled environments.',
    images: ['./images/ai1.jpg', './images/ai2.jpg', './images/ai3.jpg'],
    process: [
      { t: 'Problem Analysis', d: 'Identified the need for autonomous navigation system.' },
      { t: 'System Architecture', d: 'Designed hardware & software architecture.' },
      { t: 'Hardware Integration', d: 'Assembled robotic platform components.' },
      { t: 'Algorithm Development', d: 'Developed core navigation algorithms.' },
      { t: 'Testing & Optimization', d: 'Iterative improvements to performance.' }
    ],
    tools: ['Raspberry Pi 4', 'Camera Module', 'Ultrasonic Sensors', 'Python', 'OpenCV', 'TensorFlow', 'NumPy'],
    link: 'https://github.com/Ajmal-6/Automatic-vehicle-using-Raspberry-pi-'
  },
  bw: {
    title: 'Black and White Image colorization',
    tags: ['Deep Learning', 'CNN', 'Python'],
    desc: 'Developed a deep learning model to automatically colorize black and white images using CNN architecture. Achieved realistic and context-aware color restoration through transfer learning.',
    images: ['./images/bw1.jpg', './images/bw2.jpg', './images/bw3.jpeg'],
    process: [
      { t: 'Dataset Collection', d: 'Gathered historical B&W images and color counterparts.' },
      { t: 'Preprocessing', d: 'LAB color space conversion for better predictions.' },
      { t: 'Model Architecture', d: 'Designed CNN with transfer learning approach.' },
      { t: 'Training', d: 'Trained to predict AB channels from L channel.' },
      { t: 'Testing', d: 'Evaluated accuracy and colorization realism.' }
    ],
    tools: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Google Colab'],
    link: '#' // Add the actual GitHub link if available
  }
};

window.openProjectModal = (projectId) => {
  const data = projectData[projectId];
  if (!data) return;

  modalBody.innerHTML = `
    <h2>${data.title}</h2>
    <div class="modal-tags">
      ${data.tags.map(t => `<span class="tag tag--sm">${t}</span>`).join('')}
    </div>
    <p>${data.desc}</p>
    
    <div class="modal-gallery">
      ${data.images.map(img => `<img src="${img}" alt="Project screenshot" loading="lazy">`).join('')}
    </div>

    <div class="modal-process">
      <h3>Design Process</h3>
      ${data.process.map((step, i) => `
        <div class="modal-step">
          <div class="modal-step__number">${i + 1}</div>
          <div class="modal-step__content">
            <h4>${step.t}</h4>
            <p>${step.d}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="modal-tools">
      <h3>Tools & Technologies</h3>
      <div class="modal-tool-list">
        ${data.tools.map(tool => `<span class="skill-pill">${tool}</span>`).join('')}
      </div>
    </div>

    ${data.link !== '#' ? `<a href="${data.link}" target="_blank" class="btn btn--primary">View Source Code</a>` : ''}
  `;

  document.body.style.overflow = 'hidden';
  projectModal.classList.add('active');
};

const closeModal = () => {
  projectModal.classList.remove('active');
  setTimeout(() => {
    document.body.style.overflow = '';
    modalBody.innerHTML = '';
  }, 300);
};

modalClose.addEventListener('click', closeModal);
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) closeModal();
});

// ── Scroll to Top Button ──
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

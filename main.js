// ── Scroll reveal (Intersection Observer) ──────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

// Immediately reveal anything already in the viewport on load
function revealInView() {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 20) {
      el.classList.add('visible');
    }
  });
}
revealInView();
window.addEventListener('load', revealInView);

// ── Active nav highlight on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[data-section]');
const nav       = document.getElementById('nav');

// Map each nav link data-section to a section id
const sectionMap = {
  home:     'home',
  how:      'how',
  demo:     'demo',
  signup:   'signup',
  why:      'why',
  features: 'features',
  roi:      'roi',
  pricing:  'pricing',
  team:     'team',
  story:    'story',
};

function setActiveNav(id) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === id);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  },
  { threshold: 0.35 }
);
sections.forEach(sec => sectionObserver.observe(sec));

// ── Nav shadow on scroll ────────────────────────────────────────────
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ── Smooth-scroll for all anchor links ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 66; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Interactive Demo ────────────────────────────────────────────────
(function () {
  const TOTAL = 5;
  let cur = 0;
  let timer = null;

  const screens   = document.querySelectorAll('.dscreen');
  const stepEls   = document.querySelectorAll('.demo-step');
  const dotEls    = document.querySelectorAll('.demo-dot');
  const prevBtn   = document.querySelector('.demo-prev');
  const nextBtn   = document.querySelector('.demo-next');
  const demoWrap  = document.querySelector('.demo-layout');

  if (!screens.length) return;

  function show(n) {
    if (n < 0) n = TOTAL - 1;
    if (n >= TOTAL) n = 0;

    screens[cur].classList.remove('dscreen-active');
    stepEls[cur].classList.remove('active');
    dotEls[cur].classList.remove('active');

    cur = n;

    screens[cur].classList.add('dscreen-active');
    stepEls[cur].classList.add('active');
    dotEls[cur].classList.add('active');
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => show(cur + 1), 4000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { show(cur - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { show(cur + 1); startAuto(); });

  dotEls.forEach(d => d.addEventListener('click', () => { show(+d.dataset.step); startAuto(); }));
  stepEls.forEach(s => s.addEventListener('click', () => { show(+s.dataset.step); startAuto(); }));

  document.querySelectorAll('.dcard-tap').forEach(el => {
    el.addEventListener('click', () => { show(+el.dataset.goto); startAuto(); });
  });

  if (demoWrap) {
    demoWrap.addEventListener('mouseenter', () => clearInterval(timer));
    demoWrap.addEventListener('mouseleave', startAuto);
  }

  startAuto();
})();

// ── Student form submit ─────────────────────────────────────────────
const form = document.querySelector('.student-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = "You're on the list 🎉";
    btn.style.background = '#22C55E';
    btn.disabled = true;
  });
}

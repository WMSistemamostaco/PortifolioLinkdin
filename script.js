// ===== Partículas de fundo =====
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 70 },
      color: { value: '#3B82F6' },
      shape: { type: 'circle' },
      opacity: { value: .5 },
      size: { value: 3 },
      move: { enable: true, speed: 2 }
    },
    interactivity: {
      events: { onhover: { enable: true, mode: 'repulse' } },
      modes: { repulse: { distance: 120 } }
    }
  });
}

// ===== Header ao rolar =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 60
    ? (document.documentElement.getAttribute('data-theme') === 'light'
        ? 'rgba(255,255,255,.92)' : 'rgba(2,6,23,.95)')
    : '';
});

// ===== Menu mobile =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Tema claro/escuro (persistido) =====
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  } else {
    root.removeAttribute('data-theme');
    iconSun.style.display = 'block';
    iconMoon.style.display = 'none';
  }
}

try {
  const saved = localStorage.getItem('wm-theme');
  if (saved) applyTheme(saved);
} catch (e) { /* localStorage indisponível */ }

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('wm-theme', next); } catch (e) { /* ignora */ }
  });
}

// ===== Estatísticas reais do GitHub =====
// TODO: troque "SEU-USUARIO" pelo seu usuário real do GitHub
const GITHUB_USER = 'SEU-USUARIO';

async function loadGithubStats() {
  const reposEl = document.getElementById('ghRepos');
  const followersEl = document.getElementById('ghFollowers');
  const gistsEl = document.getElementById('ghGists');
  if (!reposEl) return;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
    if (!res.ok) throw new Error('GitHub API indisponível');
    const data = await res.json();
    reposEl.textContent = data.public_repos ?? '—';
    followersEl.textContent = data.followers ?? '—';
    gistsEl.textContent = data.public_gists ?? '—';
  } catch (err) {
    reposEl.textContent = '—';
    followersEl.textContent = '—';
    gistsEl.textContent = '—';
  }
}

loadGithubStats();

// ===== Animações on-scroll =====
if (window.AOS) {
  AOS.init({ duration: 900, once: true, offset: 60 });
}

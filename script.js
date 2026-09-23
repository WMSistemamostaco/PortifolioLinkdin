// Inicializar Animações de Scroll
AOS.init({
  duration: 800,
  once: true
});

// Efeito de Digitação Dinâmica no Hero
new Typed('#typed-text', {
  strings: [
    'Software Engineer em Formação',
    'Desenvolvedor Full Stack',
    'Criador do Sistema WM (SaaS)',
    'Especialista em Python & JavaScript'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true
});

// Cursor Neon em Movimento
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// Contador Animado dos Status
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const speed = 200;
    const inc = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + inc);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Configuração das Partículas de Fundo
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#00d2ff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.4, "random": false },
    "size": { "value": 3, "random": true },
    "line_linked": {
      "enable": true,
      "distance": 140,
      "color": "#00d2ff",
      "opacity": 0.25,
      "width": 1
    },
    "move": { "enable": true, "speed": 1.8 }
  },
  "interactivity": {
    "events": {
      "onhover": { "enable": true, "mode": "repulse" }
    }
  },
  "retina_detect": true
});

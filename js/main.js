function navigate(page) {
  // For multi-page setup, navigate to the appropriate HTML file
  const pageMap = {
    'home': '../index.html',
    'sobre': 'sobre.html',
    'sistemas': 'sistemas.html',
    'como-funciona': 'como-funciona.html',
    'servicos': 'servicos.html',
    'contato': 'contato.html'
  };

  const currentPage = getCurrentPage();

  if (page === currentPage) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (pageMap[page]) {
    // If we're on index.html (home), pages are in /pages/
    // If we're already in /pages/, navigate relatively
    const isHome = currentPage === 'home';
    if (isHome && page !== 'home') {
      window.location.href = 'pages/' + pageMap[page].replace('../', '');
    } else {
      window.location.href = pageMap[page];
    }
  }
}

function getCurrentPage() {
  const path = window.location.pathname;
  if (path.endsWith('index.html') || path.endsWith('/') || !path.includes('/pages/')) return 'home';
  if (path.includes('sobre')) return 'sobre';
  if (path.includes('sistemas')) return 'sistemas';
  if (path.includes('como-funciona')) return 'como-funciona';
  if (path.includes('servicos')) return 'servicos';
  if (path.includes('contato')) return 'contato';
  return 'home';
}

function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('successMsg').classList.add('show');
    btn.textContent = 'Enviar solicitação';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => document.getElementById('successMsg').classList.remove('show'), 6000);
  }, 1500);
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.style.background = window.scrollY > 20 ? 'rgba(10,12,15,0.96)' : 'rgba(10,12,15,0.85)';
  }
});

// Highlight active nav link
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = getCurrentPage();
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === currentPage);
  });

  // Animate chart bars on hover
  document.querySelectorAll('.chart-bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => { bar.style.opacity = '0.7'; });
    bar.addEventListener('mouseleave', () => { bar.style.opacity = '1'; });
  });
});

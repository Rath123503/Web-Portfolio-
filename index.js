/* ── THEME TOGGLE ── */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.dataset.theme === 'dark';
  html.dataset.theme = isDark ? 'light' : 'dark';
  document.getElementById('tog-label').textContent = isDark ? 'light' : 'dark';
}
document.querySelector('.theme-toggle').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
});
 
/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));
 
/* ── SKILL BARS ── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => barObserver.observe(g));
 
/* ── CONTACT FORM ── */
function handleSend(btn) {
  const orig = btn.textContent;
  btn.textContent = 'sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'message_sent ✓';
    btn.style.background = '#00aa66';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1200);
}
 
/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
}, { passive: true });
 
/* ── SMOOTH TYPING EFFECT ON HERO ── */
const heroPrompt = document.querySelector('.hero-prompt');
const text = heroPrompt.textContent;
heroPrompt.textContent = '';
let i = 0;
function type() {
  if (i < text.length) {
    heroPrompt.textContent += text[i++];
    setTimeout(type, 38);
  }
}
setTimeout(type, 300);
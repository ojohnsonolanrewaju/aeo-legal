/* ─────────────────────────────────────────────
   AEO Legal — site behaviour
   ───────────────────────────────────────────── */

// Firm contact details. Update here and every link on the site follows.
// whatsapp: international format, digits only (e.g. '2348012345678').
const FIRM = {
  phoneDisplay: '[Phone number]',
  whatsapp:     '',
  email:        ''
};

// ── Contact links ──
const waBase = FIRM.whatsapp ? `https://wa.me/${FIRM.whatsapp}` : '#contact';

document.querySelectorAll('[data-link="whatsapp"]').forEach(a => {
  a.href = waBase;
  if (!FIRM.whatsapp) a.removeAttribute('target');
});
document.querySelectorAll('[data-link="email"]').forEach(a => {
  a.href = FIRM.email ? `mailto:${FIRM.email}` : '#contact';
});
document.querySelectorAll('[data-text="phone"]').forEach(el => { el.textContent = FIRM.phoneDisplay; });
document.querySelectorAll('[data-text="email"]').forEach(el => {
  if (FIRM.email) el.textContent = FIRM.email;
});

// ── Nav: scrolled state + mobile menu ──
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ── Contact form → WhatsApp (no backend needed) ──
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

function showNote(msg, type) {
  note.textContent = msg;
  note.className = `form-note ${type}`;
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const name = (data.name || '').trim();
    const phone = (data.phone || '').trim();
    const message = (data.message || '').trim();

    if (!name || !phone || !message) {
      showNote('Please fill in your name, phone number and a brief description.', 'error');
      return;
    }
    if (!data.consent) {
      showNote('Please tick the consent box so we can respond to you.', 'error');
      return;
    }

    const lines = [`Hello AEO Legal, my name is ${name}.`, `Area: ${data.area}`, `Phone: ${phone}`];
    if (data.email && data.email.trim()) lines.push(`Email: ${data.email.trim()}`);
    lines.push('', message);
    const text = lines.join('\n');

    if (FIRM.whatsapp) {
      window.open(`https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      showNote('WhatsApp has opened with your message. Just press send.', 'ok');
    } else if (FIRM.email) {
      window.location.href = `mailto:${FIRM.email}?subject=${encodeURIComponent('Website enquiry: ' + data.area)}&body=${encodeURIComponent(text)}`;
      showNote('Your email app has opened with your message.', 'ok');
    } else {
      showNote('Draft site: contact details have not been added yet.', 'error');
    }
  });
}

// ── Footer year ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

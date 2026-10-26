/* ─────────────────────────────────────────────
   AEO Legal Services — site behaviour
   ───────────────────────────────────────────── */

// Firm contact details. Update here and every link on the site follows.
// formEndpoint: a Formspree URL (https://formspree.io/f/XXXXXXXX) once the
// form is set up. Until then the form opens the visitor's email app instead.
const FIRM = {
  phoneDisplay: '+234 706 682 3673',
  phone:        '+2347066823673',
  whatsapp:     '2347066823673',   // digits only, used for wa.me links
  email:        'aezekiel@aeolegalservices.com',
  formEndpoint: '',
  // LinkedIn profile URLs. A team member's link appears once filled in.
  linkedin: {
    ayomide: '',
    tomisin: '',
    lydia:   ''
  }
};

// ── Contact links ──
document.querySelectorAll('[data-link="phone"]').forEach(a => { a.href = `tel:${FIRM.phone}`; });
document.querySelectorAll('[data-link="whatsapp"]').forEach(a => {
  a.href = `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent('Hello AEO Legal Services, I would like to make an enquiry.')}`;
});
document.querySelectorAll('[data-linkedin]').forEach(a => {
  const url = FIRM.linkedin[a.dataset.linkedin];
  if (url) { a.href = url; a.hidden = false; }
});
document.querySelectorAll('[data-link="email"]').forEach(a => { a.href = `mailto:${FIRM.email}`; });
document.querySelectorAll('[data-text="phone"]').forEach(el => { el.textContent = FIRM.phoneDisplay; });
document.querySelectorAll('[data-text="email"]').forEach(el => { el.textContent = FIRM.email; });

// ── Nav: scrolled state + mobile menu ──
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setMenu(open) {
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
navToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));

// ── Contact / booking form ──
const form = document.getElementById('contact-form');

if (form) {
  const note = document.getElementById('form-note');
  const submitBtn = form.querySelector('button[type="submit"]');
  const dateInput = document.getElementById('f-date');

  // Earliest bookable date is tomorrow
  if (dateInput) {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    dateInput.min = t.toISOString().split('T')[0];
  }

  function isBooking() {
    return form.querySelector('input[name="request"]:checked').value === 'booking';
  }

  function syncMode() {
    const booking = isBooking();
    form.classList.toggle('is-booking', booking);
    form.querySelectorAll('.booking-only [data-required]').forEach(el => { el.required = booking; });
    submitBtn.textContent = booking ? 'Request consultation' : 'Send enquiry';
  }
  form.querySelectorAll('input[name="request"]').forEach(r => r.addEventListener('change', syncMode));

  // Links like contact.html#book open the form in booking mode
  if (location.hash === '#book') {
    form.querySelector('input[value="booking"]').checked = true;
  }
  syncMode();

  function showNote(msg, type) {
    note.textContent = msg;
    note.className = `form-note ${type}`;
  }

  function buildMessage(d) {
    const lines = [];
    if (isBooking()) {
      lines.push('CONSULTATION REQUEST', `Format: ${d.format}`, `Preferred date: ${d.date}`, `Preferred time: ${d.time}`, '');
    }
    lines.push(`Name: ${d.name}`, `Phone: ${d.phone}`, `Email: ${d.email}`, `Area of law: ${d.area}`, '', d.message);
    return lines.join('\n');
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.elements.company && form.elements.company.value) return; // spam honeypot

    if (!form.checkValidity()) {
      form.reportValidity();
      showNote('Please complete the required fields.', 'error');
      return;
    }

    const d = Object.fromEntries(new FormData(form));
    Object.keys(d).forEach(k => { d[k] = String(d[k]).trim(); });
    const subject = `${isBooking() ? 'Consultation request' : 'Website enquiry'}: ${d.area} (${d.name})`;

    if (!FIRM.formEndpoint) {
      window.location.href = `mailto:${FIRM.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(d))}`;
      showNote('Your email app has opened with your message. Please press send.', 'ok');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      const res = await fetch(FIRM.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: subject, _replyto: d.email, ...d, request: isBooking() ? 'Consultation' : 'Enquiry' })
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      syncMode();
      showNote('Thank you. Your message has been received and we will respond within one working day.', 'ok');
    } catch (err) {
      showNote(`Sorry, your message could not be sent. Please email us at ${FIRM.email} or call ${FIRM.phoneDisplay}.`, 'error');
    } finally {
      submitBtn.disabled = false;
      if (submitBtn.textContent === 'Sending…') syncMode();
    }
  });
}

// ── Footer year ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

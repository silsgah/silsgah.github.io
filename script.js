// ═══ Scroll-based nav styling ═══
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ═══ Mobile nav toggle ═══
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ═══ Scroll reveal animations ═══
const revealElements = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-text, .info-card, ' +
    '.research-card, .theory-card, .pub-item, .course-card, ' +
    '.skill-group, .timeline-item, .contact-card, .subsection-title'
);
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ═══ Active nav link highlighting ═══
const sections = document.querySelectorAll('.section, .hero');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current ? '#fff' : '';
    });
});

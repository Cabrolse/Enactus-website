// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const contactForm_inputs = document.querySelectorAll('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea[name="message"]');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function scrollTrigger(selector, options = {}) {
    const els = document.querySelectorAll(selector);
    els.forEach(el => addObserver(el, options));
}

function addObserver(el, options) {
    if (!('IntersectionObserver' in window)) {
        el.classList.add('active'); // Fallback for old browsers
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, options);
    observer.observe(el);
}

// Change size of navbar on scroll
scrollTrigger('.animate-on-scroll', {
    rootMargin: '-20% 0px'
});

function makeBlue(contactForm_inputs) {
    contactForm_inputs.style.borderColor = 'var(--social-blue)';
    contactForm_inputs.style.boxShadow = '0 0 15px rgba(25, 0, 255, 0.5)';
}

function resetBorder(contactForm_inputs) {
    contactForm_inputs.style.borderColor = '';
    contactForm_inputs.style.boxShadow = '';
}


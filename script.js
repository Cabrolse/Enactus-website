// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const contactForm_inputs = document.querySelectorAll('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea[name="message"]');

if (hamburger && navLinks) {
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('tabindex', '0');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    navLinks.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            navLinks.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    window.matchMedia('(max-width: 900px)').addEventListener('change', (event) => {
        if (!event.matches) {
            navLinks.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header && scrollY > 80) {
        header.classList.add('scrolled');
    } else if (header) {
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


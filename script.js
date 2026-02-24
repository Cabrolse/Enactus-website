// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');


hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});


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

scrollTrigger('.animate-on-scroll', {
    rootMargin: '-20% 0px'
});
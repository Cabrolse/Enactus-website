//vars
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const contactForm_inputs = document.querySelectorAll('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea[name="message"]');
const progress = document.getElementById('progress');
const bar = document.getElementById('bar');

    // Mobile menu toggle
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

// Team section scroll bar
const track = document.getElementById('track');

if (track && progress && bar) {
    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

    function render() {
        const max = maxScroll();
        const ratio = track.scrollWidth ? track.clientWidth / track.scrollWidth : 1;
        const barWidth = progress.clientWidth * Math.min(1, ratio);
        const travel = progress.clientWidth - barWidth;
        const scrollPercentage = max > 0 ? track.scrollLeft / max : 0;

        bar.style.width = `${barWidth}px`;
        bar.style.transform = `translateY(-50%) translateX(${scrollPercentage * travel}px)`;
        progress.setAttribute('aria-valuenow', String(Math.round(scrollPercentage * 100)));
    }

    function scrollFromPointer(event) {
        const rect = progress.getBoundingClientRect();
        const barWidth = bar.offsetWidth;
        const travel = rect.width - barWidth;
        const position = Math.min(
            Math.max(event.clientX - rect.left - barWidth / 2, 0),
            travel
        );

        track.scrollLeft = travel > 0 ? (position / travel) * maxScroll() : 0;
    }

    let dragging = false;

    progress.addEventListener('pointerdown', (event) => {
        dragging = true;
        progress.setPointerCapture(event.pointerId);
        scrollFromPointer(event);
    });

    progress.addEventListener('pointermove', (event) => {
        if (dragging) {
            scrollFromPointer(event);
        }
    });

    const stopDragging = () => {
        dragging = false;
    };

    progress.addEventListener('pointerup', stopDragging);
    progress.addEventListener('pointercancel', stopDragging);
    progress.addEventListener('keydown', (event) => {
        const step = track.clientWidth * 0.2;
        let nextScroll;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            nextScroll = track.scrollLeft + step;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            nextScroll = track.scrollLeft - step;
        } else if (event.key === 'Home') {
            nextScroll = 0;
        } else if (event.key === 'End') {
            nextScroll = maxScroll();
        } else {
            return;
        }

        event.preventDefault();
        track.scrollTo({ left: nextScroll, behavior: 'smooth' });
    });

    track.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', render);
    render();
}

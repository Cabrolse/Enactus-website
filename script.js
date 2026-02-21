// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});


const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Advanced Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .scale-reveal');
    fadeElements.forEach(el => observer.observe(el));

    // Mobile Navigation Logic
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
        // Toggle Menu
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent background scrolling

            // Staggered Link Animation
            if (isOpen) {
                navLinks.forEach((link, index) => {
                    link.style.transitionDelay = `${0.1 + index * 0.1}s`;
                });
            } else {
                navLinks.forEach(link => {
                    link.style.transitionDelay = '0s';
                });
            }
        });

        // Close Menu on Link Click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // Parallax Effect (Optimized with requestAnimationFrame)
    let scrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                document.querySelectorAll('.parallax-bg').forEach(el => {
                    const speed = el.dataset.speed || 0.5;
                    el.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});

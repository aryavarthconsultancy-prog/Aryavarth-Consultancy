document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check and scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    // Statistics Counter Animation
    const statsCounter = document.querySelector('.exp-number');
    if (statsCounter) {
        const animateCount = () => {
            const target = +statsCounter.getAttribute('data-target');
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const update = () => {
                count += increment;
                if (count < target) {
                    statsCounter.innerText = Math.floor(count) + '+';
                    requestAnimationFrame(update);
                } else {
                    statsCounter.innerText = target + '+';
                }
            };
            requestAnimationFrame(update);
        };

        // Trigger when the about image is revealed
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.about-image'));
    }

    // Services Tab Switcher Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');

                // Update Button States
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update Panel Visibility
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === target) {
                        panel.classList.add('active');
                    }
                });

                // Scroll to top of categories if outside view
                const container = document.querySelector('.services-tabs-container');
                const rect = container.getBoundingClientRect();
                if (rect.top < 0) {
                    window.scrollTo({
                        top: window.pageYOffset + rect.top - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});

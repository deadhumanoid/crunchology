document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.page-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the item is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // You can add different animation classes for different sections here
                // For example: if (entry.target.id === 'hero') entry.target.classList.add('animate-hero');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('hidden'); // Initially hide sections
        sectionObserver.observe(section);
    });

    // Animate individual sauce bottles only if their parent section is visible
    const sauceBottles = document.querySelectorAll('.sauce-bottle');
    const bottleObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const bottleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, bottleObserverOptions);

    sauceBottles.forEach(bottle => {
        bottle.style.animationPlayState = 'paused'; // Pause animation initially
        bottleObserver.observe(bottle);
    });
});

// ===========================
// Navbar Scroll Behavior & Active States
// ===========================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar-menu a');

// Sticky navbar with scroll behavior
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
}, { passive: true });

// Active section highlighting
const sections = document.querySelectorAll('section[id], .hero[id]');

const observeSections = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            // Remove active from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add active to current link
            const activeLink = document.querySelector(`.navbar-menu a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-80px 0px -80% 0px'
});

sections.forEach(section => observeSections.observe(section));

// ===========================
// Video auto-play on scroll
// ===========================
const video = document.getElementById('carnavalVideo');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            video.volume = 0.3;
            video.play().catch(e => {
                video.muted = true;
                video.play();
            });
        } else {
            video.pause();
        }
    });
}, observerOptions);

if (video) {
    videoObserver.observe(video);
}

// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const wasActive = faqItem.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    if (!wasActive) {
        faqItem.classList.add('active');
    }
}

// ===========================
// Menu Toggle - Enhanced with ARIA
// ===========================
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    const toggle = document.querySelector('.navbar-toggle');
    const isOpen = menu.classList.contains('active');

    menu.classList.toggle('active');
    toggle.classList.toggle('active');

    // Update ARIA attributes
    toggle.setAttribute('aria-expanded', !isOpen);
    toggle.setAttribute('aria-label', !isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');

    // Prevent body scroll when menu is open on mobile
    if (!isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    const menu = document.getElementById('navbarMenu');
    const toggle = document.querySelector('.navbar-toggle');

    menu.classList.remove('active');
    toggle.classList.remove('active');

    // Update ARIA attributes
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');

    // Restore body scroll
    document.body.style.overflow = '';
}

// Modal Functions
function openModal(type) {
    const modalId = type === 'domino' ? 'modalDomino' : 'modalBolas';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modalId = type === 'domino' ? 'modalDomino' : 'modalBolas';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Scroll to next section function
function scrollToNextSection() {
    const nextSection = document.querySelector('#evento');
    if (nextSection) {
        const offset = 80;
        const targetPosition = nextSection.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Infinite Slider - Duplicate slides for seamless loop
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        const slides = sliderTrack.innerHTML;
        sliderTrack.innerHTML = slides + slides; // Duplica las imágenes para el efecto infinito
    }
});

// ===========================
// Lazy Loading Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // For regular images
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }

                // Add loaded class for fade-in effect
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Observe slider images
    document.querySelectorAll('.slider-slide img').forEach(img => {
        imageObserver.observe(img);
    });
} else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// ===========================
// Keyboard Navigation Enhancement
// ===========================
document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close mobile menu
        const menu = document.getElementById('navbarMenu');
        const toggle = document.querySelector('.navbar-toggle');
        if (menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
});

// Trap focus in modal when open
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && modal.classList.contains('active')) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
});

// ===========================
// Performance: Debounce Scroll Events
// ===========================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Video auto-play on scroll
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

// Menu Toggle - mejorado para navbar derecho con cruz
function toggleMenu() {
    const menu = document.getElementById('navbarMenu');
    const toggle = document.querySelector('.navbar-toggle');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('navbarMenu');
    const toggle = document.querySelector('.navbar-toggle');
    menu.classList.remove('active');
    toggle.classList.remove('active');
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

// Infinite Slider - Duplicate slides for seamless loop
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.getElementById('sliderTrack');
    if (sliderTrack) {
        const slides = sliderTrack.innerHTML;
        sliderTrack.innerHTML = slides + slides; // Duplica las imágenes para el efecto infinito
    }
});

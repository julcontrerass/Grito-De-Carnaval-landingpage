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
// Carousel Carnaval 2025 - Auto Change
// ===========================
let carouselInterval;

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carnavalCarousel');
    const nextBtn = document.getElementById('carouselNextBtn');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-carnaval-slide');
    if (slides.length === 0) return;

    let currentIndex = 0;
    let isVideoPaused = false;

    function updateCarousel() {
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));

        // Agregar clase active al actual
        slides[currentIndex].classList.add('active');

        // Calcular desplazamiento para centrar el slide activo
        const slideWidth = slides[0].offsetWidth;
        // Usar el gap real definido en CSS (cambia por breakpoint)
        const cs = window.getComputedStyle(carousel);
        let gap = parseInt(cs.gap || cs.columnGap || '0', 10);
        if (Number.isNaN(gap)) gap = 30;
        const containerWidth = carousel.parentElement.offsetWidth;
        const offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * (slideWidth + gap));

        carousel.style.transform = `translateX(${offset}px)`;

        // Verificar si el slide actual tiene un video
        const currentSlide = slides[currentIndex];
        const hasVideo = currentSlide.querySelector('video') !== null;

        // Manejar videos y botón
        slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (video) {
                if (index === currentIndex) {
                    video.muted = true;
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            }
        });

        // Mostrar/ocultar botón y pausar/reanudar autoplay
        if (hasVideo) {
            // Pausar autoplay y mostrar botón
            clearInterval(carouselInterval);
            isVideoPaused = true;
            if (nextBtn) {
                nextBtn.style.display = 'block';
            }
        } else {
            // Ocultar botón y reanudar autoplay si estaba pausado
            if (nextBtn) {
                nextBtn.style.display = 'none';
            }
            if (isVideoPaused) {
                startAutoplay();
                isVideoPaused = false;
            }
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function startAutoplay() {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(nextSlide, 3000);
    }

    // Event listener para el botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Iniciar - asegurarse que la primera tenga la clase active
    setTimeout(() => {
        updateCarousel();
    }, 100);

    // Auto avanzar cada 3 segundos
    startAutoplay();

    // Actualizar en resize
    window.addEventListener('resize', debounce(() => {
        updateCarousel();
    }, 250));
});

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

// ===========================
// Copy Alias to Clipboard
// ===========================
function copyAlias(alias) {
    // Copiar al portapapeles
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(alias).then(() => {
            showCopyTooltip();
        }).catch(() => {
            // Fallback para navegadores antiguos
            fallbackCopyText(alias);
        });
    } else {
        fallbackCopyText(alias);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showCopyTooltip();
    } catch (err) {
        console.error('Error al copiar:', err);
    }
    document.body.removeChild(textArea);
}

function showCopyTooltip() {
    // Mostrar tooltip en la sección de paquetes
    const tooltip = document.getElementById('copyTooltip');
    if (tooltip) {
        tooltip.classList.add('show');
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }

    // Mostrar tooltips en los modales (puede haber múltiples)
    const modalTooltips = document.querySelectorAll('.copy-tooltip-modal');
    modalTooltips.forEach(tooltip => {
        tooltip.style.opacity = '1';
        setTimeout(() => {
            tooltip.style.opacity = '0';
        }, 2000);
    });
}

// ===========================
// Carousel Artistas - Auto Change
// ===========================
let artistasCarouselInterval;

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('artistasCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-artistas-slide');
    if (slides.length === 0) return;

    let currentIndex = 0;

    function updateArtistasCarousel() {
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));

        // Agregar clase active al actual
        slides[currentIndex].classList.add('active');

        // Calcular desplazamiento para centrar el slide activo
        const slideWidth = slides[0].offsetWidth;
        // Usar el gap real definido en CSS (cambia por breakpoint)
        const cs = window.getComputedStyle(carousel);
        let gap = parseInt(cs.gap || cs.columnGap || '0', 10);
        if (Number.isNaN(gap)) gap = 30;
        const containerWidth = carousel.parentElement.offsetWidth;
        const offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * (slideWidth + gap));

        carousel.style.transform = `translateX(${offset}px)`;
    }

    function nextArtistSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateArtistasCarousel();
    }

    function startArtistasAutoplay() {
        clearInterval(artistasCarouselInterval);
        artistasCarouselInterval = setInterval(nextArtistSlide, 3000);
    }

    // Iniciar - asegurarse que la primera tenga la clase active
    setTimeout(() => {
        updateArtistasCarousel();
    }, 100);

    // Auto avanzar cada 3 segundos
    startArtistasAutoplay();

    // Actualizar en resize
    window.addEventListener('resize', debounce(() => {
        updateArtistasCarousel();
    }, 250));
});

// ===========================
// Background Music Control
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    const volumeBtn = document.getElementById('volumeControl');
    const volumeIcon = document.getElementById('volumeIcon');
    let musicStarted = false;

    // SVG paths for volume icons
    const volumeOnPath = 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z';
    const volumeOffPath = 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z';

    // Set initial volume to 0.3 (soft)
    audio.volume = 0.3;

    // Function to start music
    function startMusic() {
        if (!musicStarted) {
            audio.play().then(() => {
                musicStarted = true;
                volumeBtn.classList.remove('muted');
                volumeIcon.querySelector('path').setAttribute('d', volumeOnPath);
            }).catch(error => {
                console.log('Autoplay prevented, waiting for user interaction');
            });
        }
    }

    // Try to autoplay immediately
    startMusic();

    // Also try on first user interaction (click, scroll, touch)
    const userInteractionEvents = ['click', 'scroll', 'touchstart', 'keydown'];
    const startOnInteraction = function() {
        if (!musicStarted) {
            startMusic();
            // Remove listeners after first interaction
            userInteractionEvents.forEach(event => {
                document.removeEventListener(event, startOnInteraction);
            });
        }
    };

    userInteractionEvents.forEach(event => {
        document.addEventListener(event, startOnInteraction, { once: true, passive: true });
    });

    // Toggle mute/unmute
    volumeBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            musicStarted = true;
            volumeBtn.classList.remove('muted');
            volumeIcon.querySelector('path').setAttribute('d', volumeOnPath);
        } else if (audio.muted) {
            audio.muted = false;
            volumeBtn.classList.remove('muted');
            volumeIcon.querySelector('path').setAttribute('d', volumeOnPath);
        } else {
            audio.muted = true;
            volumeBtn.classList.add('muted');
            volumeIcon.querySelector('path').setAttribute('d', volumeOffPath);
        }
    });
});

// ==================== ENHANCED FUNCTIONALITY ====================

document.addEventListener("DOMContentLoaded", function () {
    console.log("✨ Dr. Frikha Mouna - Website loaded successfully!");

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.action-card, .phone-card, .social-link').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Parallax effect for hero section
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const hero = document.querySelector('.hero');
        
        if (hero && scrollTop < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrollTop * 0.5}px)`;
            hero.style.opacity = 1 - (scrollTop / hero.offsetHeight);
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Phone number click tracking (for analytics)
    document.querySelectorAll('.phone-number').forEach(phone => {
        phone.addEventListener('click', function() {
            console.log('📞 Phone number clicked:', this.textContent);
        });
    });

    // WhatsApp button tracking
    document.querySelector('.btn-whatsapp')?.addEventListener('click', function() {
        console.log('💬 WhatsApp button clicked');
    });

    // Google Maps button tracking
    document.querySelector('.btn-location')?.addEventListener('click', function() {
        console.log('📍 Location button clicked');
    });

    // Social media tracking
    document.querySelectorAll('.social-link').forEach(social => {
        social.addEventListener('click', function() {
            console.log('📱 Social media clicked:', this.href);
        });
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

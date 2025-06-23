// Halal Certification Process Interactive Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for each card
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Initialize cards
    const processCards = document.querySelectorAll('.process-card');
    processCards.forEach((card, index) => {
        // Initially hide cards
        card.style.opacity = '0';
        card.style.transform = 'translateY(60px)';
        
        // Observe each card
        observer.observe(card);
        
        // Add hover sound effect simulation
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Progressive number animation
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.process-number');
        
        numberElements.forEach((element, index) => {
            const targetNumber = index + 1;
            let currentNumber = 0;
            
            const increment = () => {
                if (currentNumber < targetNumber) {
                    currentNumber++;
                    element.textContent = currentNumber;
                    setTimeout(increment, 100);
                }
            };
            
            // Start animation when card becomes visible
            setTimeout(() => {
                if (element.closest('.process-card').classList.contains('animate-in')) {
                    increment();
                }
            }, (index * 150) + 300);
        });
    }
    
    // Floating animation for background elements
    function createFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.absolute.opacity-5 > div');
        
        floatingElements.forEach((element, index) => {
            const duration = 3000 + (index * 1000); // Different duration for each element
            const amplitude = 20 + (index * 10); // Different amplitude
            
            function float() {
                element.style.transition = `transform ${duration}ms ease-in-out`;
                element.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * amplitude}px)`;
                
                requestAnimationFrame(float);
            }
            
            float();
        });
    }
    
    // Parallax effect for background
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const section = document.querySelector('.bg-gradient-teal');
            const parallax = scrolled * 0.1;
            
            if (section) {
                section.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // Progress indicator animation
    function createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'fixed top-0 left-0 w-full h-1 bg-white/20 z-50';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300';
        progressBar.style.width = '0%';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Card interaction effects
    function initCardInteractions() {
        processCards.forEach((card, index) => {
            const numberElement = card.querySelector('.process-number');
            
            card.addEventListener('mouseenter', function() {
                // Add glow effect
                this.style.boxShadow = '0 25px 80px rgba(15, 118, 110, 0.2), 0 10px 40px rgba(15, 118, 110, 0.15)';
                
                // Animate number
                if (numberElement) {
                    numberElement.style.transform = 'rotate(5deg) scale(1.1)';
                    numberElement.style.background = 'linear-gradient(135deg, #0d9488, #14b8a6)';
                }
                
                // Add ripple effect
                createRippleEffect(this, event);
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 10px 40px rgba(15, 118, 110, 0.1), 0 4px 20px rgba(15, 118, 110, 0.06)';
                
                if (numberElement) {
                    numberElement.style.transform = 'rotate(0deg) scale(1)';
                    numberElement.style.background = 'linear-gradient(135deg, #0f766e, #0d9488)';
                }
            });
        });
    }
    
    // Ripple effect function
    function createRippleEffect(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'absolute rounded-full bg-white opacity-20 pointer-events-none';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Trigger animation
        setTimeout(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
        }, 10);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Smooth scroll for internal links
    function initSmoothScroll() {
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
    }
    
    // Initialize all animations and interactions
    function initialize() {
        setTimeout(animateNumbers, 1000);
        createFloatingAnimation();
        initParallax();
        createProgressIndicator();
        initCardInteractions();
        initSmoothScroll();
        
        // Add loading animation complete
        document.body.classList.add('loaded');
    }
    
    // Start initialization
    initialize();
    
    // Performance optimization - throttle scroll events
    function throttle(func, wait) {
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
    
    // Optimize scroll event listeners
    const throttledScroll = throttle(() => {
        // Handle scroll-based animations here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
    
    // Accessibility improvements
    function initAccessibility() {
        // Add focus indicators
        processCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            
            card.addEventListener('focus', function() {
                this.style.outline = '3px solid #14b8a6';
                this.style.outlineOffset = '2px';
            });
            
            card.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
    }
    
    initAccessibility();
    
    // Resize handler for responsive adjustments
    window.addEventListener('resize', throttle(() => {
        // Handle responsive adjustments
        const cards = document.querySelectorAll('.process-card');
        cards.forEach(card => {
            card.style.transform = 'none';
            card.style.transition = 'none';
            
            setTimeout(() => {
                card.style.transition = '';
            }, 100);
        });
    }, 250));
});
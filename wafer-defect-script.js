// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollProgress();
    initSmoothScrolling();
    initImageModal();
    initTypewriterEffect();
    initIntersectionObserver();
    initParallaxEffect();
    
    // Add loading class removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
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

// Image Modal Functionality
function initImageModal() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            createImageModal(this);
        });
    });
}

function createImageModal(img) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: zoom-out;
    `;
    
    // Create modal image
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        z-index: 10001;
        transition: opacity 0.3s ease;
    `;
    
    // Add elements to modal
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    function closeModal() {
        modal.style.opacity = '0';
        modalImg.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Prevent image click from closing modal
    modalImg.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Typewriter Effect for Header
function initTypewriterEffect() {
    const header = document.querySelector('header h1');
    if (header) {
        const text = header.textContent;
        header.textContent = '';
        header.style.borderRight = '2px solid #667eea';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    header.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Intersection Observer for Advanced Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for specific elements
                if (entry.target.querySelector('ul')) {
                    animateListItems(entry.target.querySelector('ul'));
                }
                
                if (entry.target.querySelector('ol')) {
                    animateListItems(entry.target.querySelector('ol'));
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Animate List Items with Stagger
function animateListItems(list) {
    const items = list.querySelectorAll('li');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Parallax Effect for Background
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.body.style.backgroundPosition = `center ${rate}px`;
    });
}

// Add hover effects for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced link hover effects
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Section hover effects
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance metrics animation
function animatePerformanceMetrics() {
    const metricsSection = document.querySelector('section:nth-of-type(5)');
    if (!metricsSection) return;
    
    const metrics = [
        { element: 'li:nth-child(1)', value: 92, suffix: '%' },
        { element: 'li:nth-child(2)', value: 0.90, suffix: '', isDecimal: true },
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                metrics.forEach(metric => {
                    const element = entry.target.querySelector(metric.element);
                    if (element) {
                        animateValue(element, metric.value, metric.suffix, metric.isDecimal);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(metricsSection);
}

function animateValue(element, endValue, suffix, isDecimal = false) {
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut;
        
        if (isDecimal) {
            element.textContent = `F1-Score: ${currentValue.toFixed(2)}${suffix}`;
        } else {
            element.textContent = `Accuracy: ${Math.floor(currentValue)}${suffix}`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Initialize performance metrics animation
document.addEventListener('DOMContentLoaded', animatePerformanceMetrics);

// Add CSS animation classes via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Enhanced hover states */
    section {
        transform-origin: center;
        will-change: transform;
    }
    
    img {
        will-change: transform;
    }
    
    /* Loading state */
    .loading * {
        animation-play-state: paused;
    }
`;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // J/K keys for section navigation
    if (e.key === 'j' || e.key === 'J') {
        scrollToNextSection();
    } else if (e.key === 'k' || e.key === 'K') {
        scrollToPrevSection();
    }
});

function scrollToNextSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const nextIndex = Math.min(currentSection + 1, sections.length - 1);
    
    sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
}

function scrollToPrevSection() {
    const sections = document.querySelectorAll('section');
    const currentSection = getCurrentSection();
    const prevIndex = Math.max(currentSection - 1, 0);
    
    sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPosition) {
            return i;
        }
    }
    return 0;
}
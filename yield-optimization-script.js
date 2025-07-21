// Yield Optimization Project Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeTabs();
    initializeScrollAnimations();
    initializeStatAnimations();
    initializeTooltips();
    
    console.log('Yield Optimization project page loaded successfully');
});

// Tab functionality for Technical Implementation section
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Animate tab transition
            animateTabTransition(targetPane);
        });
    });
}

// Animate tab transitions
function animateTabTransition(targetPane) {
    if (targetPane) {
        targetPane.style.opacity = '0';
        targetPane.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetPane.style.transition = 'all 0.3s ease';
            targetPane.style.opacity = '1';
            targetPane.style.transform = 'translateY(0)';
        }, 50);
    }
}

// Scroll animations for sections
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                } else if (entry.target.classList.contains('result-card')) {
                    animateResultCard(entry.target);
                } else if (entry.target.classList.contains('enhancement-card')) {
                    animateEnhancementCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const elementsToAnimate = document.querySelectorAll(`
        .content-section,
        .timeline-item,
        .result-card,
        .enhancement-card,
        .tech-category
    `);
    
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Animate timeline items
function animateTimelineItem(item) {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    setTimeout(() => {
        if (marker) {
            marker.style.animation = 'pulse 0.6s ease';
        }
    }, 200);
    
    setTimeout(() => {
        if (content) {
            content.style.animation = 'slideInRight 0.6s ease forwards';
        }
    }, 400);
}

// Animate result cards
function animateResultCard(card) {
    card.style.transform = 'translateY(30px)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
    }, Math.random() * 200 + 100);
}

// Animate enhancement cards
function animateEnhancementCard(card) {
    const icon = card.querySelector('i');
    
    card.style.transform = 'scale(0.8)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'bounce 1s ease';
            }, 200);
        }
    }, Math.random() * 300);
}

// Animated counter for statistics
function initializeStatAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateStatNumber(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Animate stat numbers
function animateStatNumber(element) {
    const finalValue = element.textContent;
    const isPercentage = finalValue.includes('%');
    const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    element.textContent = '0' + (isPercentage ? '%' : '');
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '');
    }, stepTime);
}

// Initialize tooltips for technical terms
function initializeTooltips() {
    const tooltipData = {
        'DOE': 'Design of Experiments - A systematic method to determine the relationship between factors affecting a process',
        'XGBoost': 'Extreme Gradient Boosting - An optimized distributed gradient boosting framework',
        'SHAP': 'SHapley Additive exPlanations - A method to explain individual predictions',
        'SECOM': 'SEmiCOnductor Manufacturing dataset used for process optimization',
        'SPC': 'Statistical Process Control - A method of quality control using statistical methods'
    };
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.style.cssText = `
        position: absolute;
        background: #1a202c;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.9rem;
        max-width: 250px;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(tooltip);
    
    // Add hover events to elements containing technical terms
    Object.keys(tooltipData).forEach(term => {
        const elements = document.querySelectorAll(`*:not(script):not(style)`);
        elements.forEach(element => {
            if (element.textContent && element.textContent.includes(term) && !element.querySelector('*')) {
                element.style.cursor = 'help';
                element.addEventListener('mouseenter', (e) => showTooltip(e, tooltipData[term], tooltip));
                element.addEventListener('mouseleave', () => hideTooltip(tooltip));
                element.addEventListener('mousemove', (e) => moveTooltip(e, tooltip));
            }
        });
    });
}

// Show tooltip
function showTooltip(event, text, tooltip) {
    tooltip.textContent = text;
    tooltip.style.opacity = '1';
    moveTooltip(event, tooltip);
}

// Hide tooltip
function hideTooltip(tooltip) {
    tooltip.style.opacity = '0';
}

// Move tooltip with cursor
function moveTooltip(event, tooltip) {
    const x = event.clientX + 10;
    const y = event.clientY - tooltip.offsetHeight - 10;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

// Smooth scrolling for anchor links
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

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
        }
        40%, 43% {
            transform: translateY(-10px);
        }
        70% {
            transform: translateY(-5px);
        }
        90% {
            transform: translateY(-2px);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .code-block pre code {
        background: linear-gradient(90deg, transparent 0%, rgba(102, 126, 234, 0.1) 50%, transparent 100%);
        animation: codeHighlight 3s ease-in-out infinite;
    }
    
    @keyframes codeHighlight {
        0%, 100% { background-position: -100% 0; }
        50% { background-position: 100% 0; }
    }
`;
document.head.appendChild(style);

// Copy code functionality
document.querySelectorAll('.code-block').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
    copyBtn.className = 'copy-btn';
    copyBtn.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255,255,255,0.1);
        border: none;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    `;
    
    copyBtn.addEventListener('mouseover', () => copyBtn.style.opacity = '1');
    copyBtn.addEventListener('mouseout', () => copyBtn.style.opacity = '0.7');
    
    copyBtn.addEventListener('click', () => {
        const code = block.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
    
    const pre = block.querySelector('pre');
    if (pre) {
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
    }
});

// Performance metrics animation
function animateMetrics() {
    const metrics = [
        { element: '.stat-number', duration: 2000 },
        { selector: '.result-list strong', duration: 1500 }
    ];
    
    metrics.forEach(metric => {
        const elements = document.querySelectorAll(metric.selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `glow 0.5s ease`;
            }, index * 200);
        });
    });
}

// Add glow animation
const glowStyle = `
    @keyframes glow {
        0%, 100% { text-shadow: none; }
        50% { text-shadow: 0 0 10px rgba(102, 126, 234, 0.8); }
    }
`;
style.textContent += glowStyle;

// Initialize performance metrics animation after page load
setTimeout(animateMetrics, 1000);

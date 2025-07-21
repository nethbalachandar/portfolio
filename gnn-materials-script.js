// GNN Materials Project Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeTabs();
    initializeScrollAnimations();
    initializeStatAnimations();
    initializeMockupInteractions();
    initializeArchitectureAnimations();
    initializeFeatureCardAnimations();
    
    console.log('GNN Materials project page loaded successfully');
});

// Tab functionality for Implementation Details section
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
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                } else if (entry.target.classList.contains('result-card')) {
                    animateResultCard(entry.target);
                } else if (entry.target.classList.contains('enhancement-card')) {
                    animateEnhancementCard(entry.target);
                } else if (entry.target.classList.contains('architecture-layer')) {
                    animateArchitectureLayer(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const elementsToAnimate = document.querySelectorAll(`
        .content-section,
        .feature-card,
        .result-card,
        .enhancement-card,
        .architecture-layer,
        .tech-category
    `);
    
    elementsToAnimate.forEach(el => observer.observe(el));
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
    const isK = finalValue.includes('K');
    let numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    element.textContent = '0' + (isPercentage ? '%' : isK ? 'K+' : '');
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        const displayValue = Math.floor(currentValue);
        if (isK) {
            element.textContent = displayValue + 'K+';
        } else if (isPercentage) {
            element.textContent = displayValue + '%';
        } else {
            element.textContent = displayValue;
        }
    }, stepTime);
}

// Animate feature cards
function animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    const highlights = card.querySelectorAll('.highlight');
    
    card.style.transform = 'translateY(30px)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'pulse 1s ease-in-out';
            }, 300);
        }
        
        highlights.forEach((highlight, index) => {
            setTimeout(() => {
                highlight.style.animation = 'slideInUp 0.4s ease forwards';
            }, 500 + (index * 100));
        });
    }, Math.random() * 200);
}

// Animate result cards
function animateResultCard(card) {
    card.style.transform = 'translateX(-30px)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.transform = 'translateX(0)';
        card.style.opacity = '1';
    }, Math.random() * 300);
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

// Animate architecture layers
function animateArchitectureLayer(layer) {
    const components = layer.querySelectorAll('.component');
    
    layer.style.transform = 'translateY(20px)';
    layer.style.opacity = '0';
    
    setTimeout(() => {
        layer.style.transition = 'all 0.5s ease';
        layer.style.transform = 'translateY(0)';
        layer.style.opacity = '1';
        
        components.forEach((component, index) => {
            setTimeout(() => {
                component.style.animation = 'fadeInLeft 0.4s ease forwards';
            }, index * 100);
        });
    }, 200);
}

// Initialize feature card animations
function initializeFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
    });
}

// Initialize architecture animations
function initializeArchitectureAnimations() {
    const components = document.querySelectorAll('.component');
    
    components.forEach(component => {
        component.addEventListener('mouseenter', () => {
            component.style.transform = 'translateX(5px)';
            component.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
        });
        
        component.addEventListener('mouseleave', () => {
            component.style.transform = 'translateX(0)';
            component.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        });
    });
}

// Initialize mockup interactions
function initializeMockupInteractions() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const crystalViewer = document.querySelector('.crystal-viewer');
    const propertyItems = document.querySelectorAll('.property-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Simulate different views based on selection
            updateMockupView(item.textContent.trim());
        });
    });
    
    // Add crystal rotation animation
    if (crystalViewer) {
        const icon = crystalViewer.querySelector('i');
        if (icon) {
            setInterval(() => {
                icon.style.transform = 'rotateY(' + (Date.now() / 20) % 360 + 'deg)';
            }, 50);
        }
    }
    
    // Animate property values periodically
    setInterval(() => {
        propertyItems.forEach(item => {
            const strong = item.querySelector('strong');
            if (strong && Math.random() < 0.3) {
                strong.style.animation = 'pulse 0.5s ease';
                setTimeout(() => {
                    strong.style.animation = '';
                }, 500);
            }
        });
    }, 3000);
}

// Update mockup view based on sidebar selection
function updateMockupView(selection) {
    const crystalViewer = document.querySelector('.crystal-viewer');
    const propertyDisplay = document.querySelector('.property-display');
    
    if (!crystalViewer || !propertyDisplay) return;
    
    switch(selection) {
        case 'Structure Input':
            crystalViewer.innerHTML = '<i class="fas fa-cube fa-3x"></i><p>3D Crystal Viewer</p>';
            break;
        case 'Property Prediction':
            crystalViewer.innerHTML = '<i class="fas fa-chart-line fa-3x"></i><p>Prediction Dashboard</p>';
            break;
        case 'Feature Analysis':
            crystalViewer.innerHTML = '<i class="fas fa-microscope fa-3x"></i><p>Feature Importance</p>';
            break;
        case 'Model Settings':
            crystalViewer.innerHTML = '<i class="fas fa-cogs fa-3x"></i><p>Model Configuration</p>';
            break;
    }
    
    // Add entrance animation
    crystalViewer.style.animation = 'fadeIn 0.5s ease';
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
        50% { transform: scale(1.05); }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
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
    
    .feature-icon {
        transition: transform 0.3s ease;
    }
    
    .component {
        transition: all 0.3s ease;
    }
    
    .crystal-viewer i {
        transition: transform 0.1s linear;
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

// Tech item hover effects
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });
});

// Interactive crystal structure simulation
function simulateCrystalStructure() {
    const crystalViewer = document.querySelector('.crystal-viewer i');
    if (crystalViewer) {
        let rotation = 0;
        setInterval(() => {
            rotation += 2;
            crystalViewer.style.transform = `rotateY(${rotation}deg) rotateX(${Math.sin(rotation * Math.PI / 180) * 10}deg)`;
        }, 100);
    }
}

// Initialize crystal structure simulation
setTimeout(simulateCrystalStructure, 2000);

// Performance metrics highlighting
function highlightMetrics() {
    const strongElements = document.querySelectorAll('.result-list strong');
    strongElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'glow 0.8s ease';
        }, index * 300);
    });
}

// Add glow animation
const glowStyle = `
    @keyframes glow {
        0%, 100% { 
            text-shadow: none; 
            color: #10b981;
        }
        50% { 
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.8); 
            color: #059669;
        }
    }
`;
style.textContent += glowStyle;

// Initialize performance highlighting after page load
setTimeout(highlightMetrics, 3000);

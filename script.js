/**
 * Yield Optimization Portfolio - Interactive JavaScript
 * A comprehensive data science portfolio showcasing semiconductor manufacturing yield optimization
 */

// =============================================================================
// INITIALIZATION & SETUP
// =============================================================================

// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    setupThemeSystem();
    setupNavigation();
    setupInteractiveElements();
    setupCharts();
    setupAnimations();
    setupScrollEffects();
    logWelcomeMessage();
}

// =============================================================================
// THEME SYSTEM
// =============================================================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.charts = [];
        
        this.init();
    }
    
    init() {
        // Set initial theme
        if (this.currentTheme === 'dark') {
            this.html.classList.add('dark');
        }
        
        // Add event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Setup theme observer for charts
        this.setupThemeObserver();
    }
    
    toggleTheme() {
        this.html.classList.toggle('dark');
        const theme = this.html.classList.contains('dark') ? 'dark' : 'light';
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Trigger custom event for theme change
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    setupThemeObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    this.updateChartsTheme();
                }
            });
        });
        
        observer.observe(this.html, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    updateChartsTheme() {
        const isDark = this.html.classList.contains('dark');
        const textColor = isDark ? '#F9FAFB' : '#1F2937';
        const gridColor = isDark ? '#374151' : '#E5E7EB';
        
        this.charts.forEach(chart => {
            if (chart && chart.options) {
                // Update scales colors
                if (chart.options.scales) {
                    Object.keys(chart.options.scales).forEach(scaleKey => {
                        const scale = chart.options.scales[scaleKey];
                        if (scale.title) scale.title.color = textColor;
                        if (scale.ticks) scale.ticks.color = textColor;
                        if (scale.grid) scale.grid.color = gridColor;
                    });
                }
                
                // Update plugins colors
                if (chart.options.plugins && chart.options.plugins.title) {
                    chart.options.plugins.title.color = textColor;
                }
                
                chart.update('none'); // Update without animation
            }
        });
    }
    
    registerChart(chart) {
        this.charts.push(chart);
    }
    
    isDark() {
        return this.html.classList.contains('dark');
    }
}

// Global theme manager instance
let themeManager;

function setupThemeSystem() {
    themeManager = new ThemeManager();
}

// =============================================================================
// NAVIGATION SYSTEM
// =============================================================================

class NavigationManager {
    constructor() {
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavTracking();
    }
    
    setupMobileMenu() {
        this.mobileMenuButton.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const icon = this.mobileMenuButton.querySelector('[data-lucide]');
            if (this.mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-lucide', 'menu');
            } else {
                icon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
        
        // Close mobile menu when clicking on a link
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.add('hidden');
                const icon = this.mobileMenuButton.querySelector('[data-lucide]');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.contains(e.target) && !this.mobileMenuButton.contains(e.target)) {
                this.mobileMenu.classList.add('hidden');
                const icon = this.mobileMenuButton.querySelector('[data-lucide]');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveNavTracking() {
        window.addEventListener('scroll', () => this.updateActiveNavLink());
        // Initial call
        this.updateActiveNavLink();
    }
    
    updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200;
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update both desktop and mobile nav links
        [...this.navLinks, ...this.mobileNavLinks].forEach(link => {
            link.classList.remove('text-blue-600', 'dark:text-blue-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-600', 'dark:text-blue-400');
            }
        });
    }
}

function setupNavigation() {
    new NavigationManager();
}

// =============================================================================
// INTERACTIVE ELEMENTS
// =============================================================================

class InteractiveElementsManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCodeToggles();
        this.setupModelTabs();
        this.setupSimulationButton();
        this.setupTooltips();
        this.setupDownloadButtons();
    }
    
    setupCodeToggles() {
        const codeToggles = [
            {
                button: 'preprocessing-code-toggle',
                content: 'preprocessing-code',
                showText: 'Show Code',
                hideText: 'Hide Code'
            },
            {
                button: 'feature-code-toggle',
                content: 'feature-code',
                showText: 'Show MI Calculation Code',
                hideText: 'Hide MI Code'
            }
        ];
        
        codeToggles.forEach(({ button, content, showText, hideText }) => {
            const buttonEl = document.getElementById(button);
            const contentEl = document.getElementById(content);
            
            if (buttonEl && contentEl) {
                buttonEl.addEventListener('click', () => {
                    const isHidden = contentEl.classList.contains('hidden');
                    
                    if (isHidden) {
                        contentEl.classList.remove('hidden');
                        contentEl.classList.add('fade-in-up');
                        buttonEl.innerHTML = `<i data-lucide="code" class="w-4 h-4 inline mr-2"></i>${hideText}`;
                    } else {
                        contentEl.classList.add('hidden');
                        contentEl.classList.remove('fade-in-up');
                        buttonEl.innerHTML = `<i data-lucide="code" class="w-4 h-4 inline mr-2"></i>${showText}`;
                    }
                    
                    lucide.createIcons();
                });
            }
        });
    }
    
    setupModelTabs() {
        const tabs = document.querySelectorAll('.model-tab');
        const contents = document.querySelectorAll('.model-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active state from all tabs
                tabs.forEach(t => {
                    t.classList.remove('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
                    t.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'dark:text-gray-400', 'dark:hover:text-gray-300');
                });
                
                // Add active state to clicked tab
                tab.classList.add('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
                tab.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'dark:text-gray-400', 'dark:hover:text-gray-300');
                
                // Hide all content
                contents.forEach(content => {
                    content.classList.add('hidden');
                    content.classList.remove('tab-content');
                });
                
                // Show target content with animation
                const target = tab.getAttribute('data-target');
                const targetContent = document.getElementById(target);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                    targetContent.classList.add('tab-content');
                }
            });
        });
    }
    
    setupSimulationButton() {
        const simulateButton = document.getElementById('simulate-trigger');
        if (simulateButton) {
            simulateButton.addEventListener('click', () => {
                this.showSensorAlert();
            });
        }
    }
    
    showSensorAlert() {
        // Create custom modal instead of browser alert
        const modal = this.createAlertModal();
        document.body.appendChild(modal);
        
        // Animate modal appearance
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Auto close after 8 seconds
        setTimeout(() => {
            this.closeModal(modal);
        }, 8000);
    }
    
    createAlertModal() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
        modal.style.backdropFilter = 'blur(4px)';
        
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 m-4 max-w-md w-full transform scale-95 transition-transform duration-300">
                <div class="flex items-center mb-4">
                    <div class="bg-red-100 dark:bg-red-900/20 rounded-full p-2 mr-3">
                        <i data-lucide="alert-triangle" class="w-6 h-6 text-red-600 dark:text-red-400"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-red-600 dark:text-red-400">SENSOR ALERT</h3>
                </div>
                
                <div class="mb-4">
                    <p class="text-gray-700 dark:text-gray-300 mb-3">Anomaly detected in manufacturing process:</p>
                    
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium text-gray-900 dark:text-white">Sensor_131:</span>
                            <span class="text-red-600 dark:text-red-400 font-mono">0.45</span>
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Target: 0.287 ± 0.1</div>
                    </div>
                    
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium text-gray-900 dark:text-white">Sensor_34:</span>
                            <span class="text-red-600 dark:text-red-400 font-mono">-0.15</span>
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">Target: 0.304 ± 0.1</div>
                    </div>
                    
                    <div class="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-3">
                        <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Recommended Actions:</h4>
                        <ul class="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                            <li>• Check process chamber temperature</li>
                            <li>• Verify gas flow rates</li>
                            <li>• Inspect equipment calibration</li>
                        </ul>
                    </div>
                </div>
                
                <div class="flex justify-end space-x-3">
                    <button class="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors" onclick="this.closest('.fixed').remove()">
                        Dismiss
                    </button>
                    <button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors" onclick="this.closest('.fixed').remove()">
                        Acknowledge
                    </button>
                </div>
            </div>
        `;
        
        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
        
        return modal;
    }
    
    closeModal(modal) {
        modal.classList.remove('show');
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    setupTooltips() {
        // Add tooltips to sensor names in charts
        document.addEventListener('mouseover', (e) => {
            if (e.target.textContent && e.target.textContent.includes('Sensor_')) {
                const sensorInfo = this.getSensorInfo(e.target.textContent);
                if (sensorInfo) {
                    this.showTooltip(e.target, sensorInfo);
                }
            }
        });
    }
    
    getSensorInfo(sensorName) {
        const sensorData = {
            'Sensor_131': 'Primary temperature sensor - Critical for yield optimization',
            'Sensor_34': 'Pressure monitoring sensor - Key process parameter',
            'Sensor_578': 'Chemical composition sensor - Affects material quality',
            'Sensor_574': 'Flow rate sensor - Controls material deposition',
            'Sensor_542': 'Voltage sensor - Electrical process monitoring'
        };
        
        return sensorData[sensorName.trim()];
    }
    
    showTooltip(element, text) {
        // Simple tooltip implementation
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-gray-800 text-white px-2 py-1 rounded text-sm z-50 pointer-events-none';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
    }
    
    setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('button[class*="download"], button[class*="Download"]');
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.simulateDownload(button.textContent);
            });
        });
    }
    
    simulateDownload(buttonText) {
        const originalText = buttonText;
        const button = event.target;
        
        button.innerHTML = '<i data-lucide="download" class="w-4 h-4 inline mr-2 animate-spin"></i>Preparing...';
        lucide.createIcons();
        
        setTimeout(() => {
            button.innerHTML = '<i data-lucide="check" class="w-4 h-4 inline mr-2"></i>Ready!';
            lucide.createIcons();
            
            setTimeout(() => {
                button.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        }, 1500);
    }
}

function setupInteractiveElements() {
    new InteractiveElementsManager();
}

// =============================================================================
// CHARTS SYSTEM
// =============================================================================

class ChartManager {
    constructor() {
        this.charts = {};
        this.init();
    }
    
    init() {
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        
        this.createFeatureChart();
        this.createImportanceChart();
        this.createConfusionMatrix();
        
        // Register charts with theme manager
        Object.values(this.charts).forEach(chart => {
            if (themeManager) {
                themeManager.registerChart(chart);
            }
        });
    }
    
    createFeatureChart() {
        const ctx = document.getElementById('featureChart');
        if (!ctx) return;
        
        const data = {
            labels: ['Sensor_574', 'Sensor_542', 'Sensor_478', 'Sensor_578', 'Sensor_42', 
                    'Sensor_41', 'Sensor_571', 'Sensor_572', 'Sensor_128', 'Sensor_129'],
            datasets: [{
                label: 'Mutual Information Score',
                data: [0.028076, 0.026715, 0.026543, 0.026017, 0.025307, 
                       0.023929, 0.022689, 0.022443, 0.022040, 0.021949],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        };
        
        const options = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Top 10 Features by Mutual Information',
                    font: { size: 16, weight: 'bold' },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `MI Score: ${context.parsed.x.toFixed(6)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Mutual Information Score',
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { drawBorder: false }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Sensor Features',
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { display: false }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        };
        
        this.charts.feature = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    
    createImportanceChart() {
        const ctx = document.getElementById('importanceChart');
        if (!ctx) return;
        
        const colors = [
            '#ef4444', '#10b981', '#8b5cf6', '#3b82f6', '#f59e0b',
            '#ec4899', '#14b8a6', '#6366f1', '#84cc16', '#f97316'
        ];
        
        const data = {
            labels: ['Sensor_131', 'Sensor_34', 'Sensor_540', 'Sensor_578', 'Sensor_332', 
                    'Sensor_478', 'Sensor_123', 'Sensor_511', 'Sensor_128', 'Sensor_408'],
            datasets: [{
                label: 'Feature Importance',
                data: [0.061248, 0.044135, 0.032341, 0.032050, 0.030480, 
                       0.029926, 0.029446, 0.028826, 0.027127, 0.026718],
                backgroundColor: colors.map(color => color + '99'), // Add transparency
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        };
        
        const options = {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'XGBoost Feature Importance',
                    font: { size: 16, weight: 'bold' },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Importance: ${context.parsed.x.toFixed(6)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Importance Score',
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { drawBorder: false }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Features',
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { display: false }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart',
                delay: 500
            }
        };
        
        this.charts.importance = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    
    createConfusionMatrix() {
        const ctx = document.getElementById('confusionMatrix');
        if (!ctx) return;
        
        const data = {
            labels: ['True Negative', 'False Positive', 'False Negative', 'True Positive'],
            datasets: [{
                label: 'Count',
                data: [284, 9, 16, 5],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.7)',   // TN - Green
                    'rgba(239, 68, 68, 0.7)',   // FP - Red
                    'rgba(245, 158, 11, 0.7)',  // FN - Orange
                    'rgba(59, 130, 246, 0.7)'   // TP - Blue
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(59, 130, 246, 1)'
                ],
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            }]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'SMOTE Model Confusion Matrix',
                    font: { size: 16, weight: 'bold' },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed.y / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed.y} (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Count',
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { drawBorder: false }
                },
                x: {
                    grid: { display: false }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce',
                delay: 1000
            }
        };
        
        this.charts.confusion = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
}

function setupCharts() {
    new ChartManager();
}

// =============================================================================
// ANIMATIONS & VISUAL EFFECTS
// =============================================================================

class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupLoadingAnimations();
    }
    
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, this.observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            observer.observe(section);
        });
        
        // Observe cards
        document.querySelectorAll('.bg-white, .bg-gray-50').forEach(card => {
            if (card.classList.contains('shadow-lg')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(card);
            }
        });
    }
    
    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.bg-white, .bg-gray-50').forEach(card => {
            if (card.classList.contains('shadow-lg')) {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px) scale(1.02)';
                    this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
            }
        });
        
        // Button hover effects
        document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    setupLoadingAnimations() {
        // Add loading states to interactive elements
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('no-loading')) {
                this.addLoadingState(e.target);
            }
        });
    }
    
    addLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<div class="loading-dots">Processing</div>';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            lucide.createIcons();
        }, 1000);
    }
}

function setupAnimations() {
    new AnimationManager();
}

// =============================================================================
// SCROLL EFFECTS
// =============================================================================

class ScrollEffectsManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupParallaxEffects();
        this.setupScrollProgress();
        this.setupStickyElements();
    }
    
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Apply parallax to hero background elements
            const heroElements = document.querySelectorAll('.hero-bg');
            heroElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    setupScrollProgress() {
        // Create scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transform scale-x-0 origin-left transition-transform duration-300';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.pageYOffset;
            const progress = scrolled / scrollHeight;
            
            progressBar.style.transform = `scaleX(${progress})`;
        });
    }
    
    setupStickyElements() {
        // Enhanced navigation sticky behavior
        const nav = document.querySelector('nav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.classList.add('backdrop-blur-md', 'bg-opacity-90');
            } else {
                nav.classList.remove('backdrop-blur-md', 'bg-opacity-90');
            }
            
            // Hide/show nav on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

function setupScrollEffects() {
    new ScrollEffectsManager();
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function logWelcomeMessage() {
    const styles = [
        'color: #3b82f6',
        'font-size: 16px',
        'font-weight: bold',
        'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
    ].join(';');
    
    console.log('%c🚀 Yield Optimization Portfolio Loaded Successfully!', styles);
    console.log('📊 Interactive charts initialized');
    console.log('🌓 Dark/Light theme system active');
    console.log('📱 Responsive navigation ready');
    console.log('✨ Animations and effects enabled');
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
        });
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Performance optimization
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}

// Export for external use
window.YieldOptimizationPortfolio = {
    themeManager,
    version: '1.0.0',
    init: initializePortfolio
};

// Enhanced CSS modal styles
const modalStyles = `
    .fixed.show {
        opacity: 1;
    }
    .fixed.show > div {
        transform: scale(1);
    }
    @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.5); }
        50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
    }
    .pulse-glow {
        animation: pulse-glow 2s infinite;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

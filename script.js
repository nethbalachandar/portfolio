// Initialize Lucide icons
lucide.createIcons();

// Dark mode functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
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

// Code toggle functionality
document.getElementById('preprocessing-code-toggle').addEventListener('click', function() {
    const codeBlock = document.getElementById('preprocessing-code');
    const isHidden = codeBlock.classList.contains('hidden');
    
    if (isHidden) {
        codeBlock.classList.remove('hidden');
        this.innerHTML = '<i data-lucide="code" class="w-4 h-4 inline mr-2"></i>Hide Code';
    } else {
        codeBlock.classList.add('hidden');
        this.innerHTML = '<i data-lucide="code" class="w-4 h-4 inline mr-2"></i>Show Code';
    }
    lucide.createIcons();
});

document.getElementById('feature-code-toggle').addEventListener('click', function() {
    const codeBlock = document.getElementById('feature-code');
    const isHidden = codeBlock.classList.contains('hidden');
    
    if (isHidden) {
        codeBlock.classList.remove('hidden');
        this.innerHTML = '<i data-lucide="code" class="w-4 h-4 inline mr-2"></i>Hide MI Code';
    } else {
        codeBlock.classList.add('hidden');
        this.innerHTML = '<i data-lucide="code" class="w-4 h-4 inline mr-2"></i>Show MI Calculation Code';
    }
    lucide.createIcons();
});

// Model tabs functionality
document.querySelectorAll('.model-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.model-tab').forEach(t => {
            t.classList.remove('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
            t.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'dark:text-gray-400', 'dark:hover:text-gray-300');
        });
        
        // Add active class to clicked tab
        this.classList.add('active', 'border-blue-500', 'text-blue-600', 'dark:text-blue-400');
        this.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'dark:text-gray-400', 'dark:hover:text-gray-300');
        
        // Hide all content
        document.querySelectorAll('.model-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show target content
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.remove('hidden');
    });
});

// Simulate sensor trigger functionality
document.getElementById('simulate-trigger').addEventListener('click', function() {
    // Create a more sophisticated alert
    const alertMessage = `🚨 ALERT: Sensor anomaly detected!
    
Sensor_131: Current value 0.45 (Target: 0.287 ± 0.1)
Sensor_34: Current value -0.15 (Target: 0.304 ± 0.1)
    
Recommended Actions:
• Check process chamber temperature
• Verify gas flow rates
• Inspect equipment calibration
    
Alert Priority: HIGH`;
    
    alert(alertMessage);
});

// Chart.js configurations
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;

// Feature Selection Chart
const featureCtx = document.getElementById('featureChart').getContext('2d');
const featureChart = new Chart(featureCtx, {
    type: 'bar',
    data: {
        labels: ['Sensor_574', 'Sensor_542', 'Sensor_478', 'Sensor_578', 'Sensor_42', 
                'Sensor_41', 'Sensor_571', 'Sensor_572', 'Sensor_128', 'Sensor_129'],
        datasets: [{
            label: 'Mutual Information Score',
            data: [0.028076, 0.026715, 0.026543, 0.026017, 0.025307, 
                   0.023929, 0.022689, 0.022443, 0.022040, 0.021949],
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Mutual Information Score'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sensor Features'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Top 10 Features by Mutual Information'
            }
        }
    }
});

// Feature Importance Chart
const importanceCtx = document.getElementById('importanceChart').getContext('2d');
const importanceChart = new Chart(importanceCtx, {
    type: 'bar',
    data: {
        labels: ['Sensor_131', 'Sensor_34', 'Sensor_540', 'Sensor_578', 'Sensor_332', 
                'Sensor_478', 'Sensor_123', 'Sensor_511', 'Sensor_128', 'Sensor_408'],
        datasets: [{
            label: 'Feature Importance',
            data: [0.061248, 0.044135, 0.032341, 0.032050, 0.030480, 
                   0.029926, 0.029446, 0.028826, 0.027127, 0.026718],
            backgroundColor: [
                'rgba(239, 68, 68, 0.6)',
                'rgba(34, 197, 94, 0.6)',
                'rgba(168, 85, 247, 0.6)',
                'rgba(59, 130, 246, 0.6)',
                'rgba(245, 158, 11, 0.6)',
                'rgba(236, 72, 153, 0.6)',
                'rgba(14, 165, 233, 0.6)',
                'rgba(99, 102, 241, 0.6)',
                'rgba(16, 185, 129, 0.6)',
                'rgba(251, 146, 60, 0.6)'
            ],
            borderColor: [
                'rgba(239, 68, 68, 1)',
                'rgba(34, 197, 94, 1)',
                'rgba(168, 85, 247, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(236, 72, 153, 1)',
                'rgba(14, 165, 233, 1)',
                'rgba(99, 102, 241, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(251, 146, 60, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Importance Score'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Features'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'XGBoost Feature Importance'
            }
        }
    }
});

// Confusion Matrix Chart (for SMOTE model)
const confusionCtx = document.getElementById('confusionMatrix').getContext('2d');
const confusionMatrix = new Chart(confusionCtx, {
    type: 'bar',
    data: {
        labels: ['True Negative', 'False Positive', 'False Negative', 'True Positive'],
        datasets: [{
            label: 'Count',
            data: [284, 9, 16, 5], // Approximated from SMOTE results
            backgroundColor: [
                'rgba(34, 197, 94, 0.6)',  // TN - Green
                'rgba(239, 68, 68, 0.6)',  // FP - Red
                'rgba(245, 158, 11, 0.6)', // FN - Orange
                'rgba(59, 130, 246, 0.6)'  // TP - Blue
            ],
            borderColor: [
                'rgba(34, 197, 94, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(59, 130, 246, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'SMOTE Model Confusion Matrix'
            }
        }
    }
});

// Update charts when theme changes
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isDark = html.classList.contains('dark');
            const textColor = isDark ? '#F9FAFB' : '#1F2937';
            const gridColor = isDark ? '#374151' : '#E5E7EB';
            
            // Update all charts
            [featureChart, importanceChart, confusionMatrix].forEach(chart => {
                chart.options.scales.x.title.color = textColor;
                chart.options.scales.y.title.color = textColor;
                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.y.ticks.color = textColor;
                chart.options.scales.x.grid.color = gridColor;
                chart.options.scales.y.grid.color = gridColor;
                chart.options.plugins.title.color = textColor;
                chart.update();
            });
        }
    });
});

observer.observe(html, {
    attributes: true,
    attributeFilter: ['class']
});

// Initialize with correct theme colors
document.addEventListener('DOMContentLoaded', function() {
    const isDark = html.classList.contains('dark');
    const textColor = isDark ? '#F9FAFB' : '#1F2937';
    const gridColor = isDark ? '#374151' : '#E5E7EB';
    
    [featureChart, importanceChart, confusionMatrix].forEach(chart => {
        chart.options.scales.x.title.color = textColor;
        chart.options.scales.y.title.color = textColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.y.grid.color = gridColor;
        chart.options.plugins.title.color = textColor;
        chart.update();
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-600', 'dark:text-blue-400');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Tooltip functionality for charts
Chart.register({
    id: 'customTooltips',
    afterInit: function(chart) {
        chart.canvas.addEventListener('mouseover', function(e) {
            chart.canvas.style.cursor = 'pointer';
        });
        chart.canvas.addEventListener('mouseout', function(e) {
            chart.canvas.style.cursor = 'default';
        });
    }
});

// Add hover effects to cards
document.querySelectorAll('.bg-white, .bg-gray-50').forEach(card => {
    if (card.classList.contains('shadow-lg')) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
});

console.log('Yield Optimization Portfolio loaded successfully! 🚀');

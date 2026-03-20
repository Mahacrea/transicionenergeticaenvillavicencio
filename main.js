// Initialize Icons
lucide.createIcons();

// Chart.js initialization & GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Chart
    const canvas = document.getElementById('financeChart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Gradient for chart fill
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(46, 125, 50, 0.4)'); // Emerald Green light
        gradient.addColorStop(1, 'rgba(46, 125, 50, 0.0)');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Año 1', 'Año 5', 'Año 10', 'Año 20'],
                datasets: [{
                    label: 'Ahorro Acumulado (Millones COP)',
                    data: [3.5, 21, 240, 890],
                    borderColor: '#2E7D32', // Emerald Green
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: '#FBC02D', // Solar Yellow
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(21, 101, 192, 0.95)', // Deep Blue
                        titleFont: { family: 'Outfit', size: 14 },
                        bodyFont: { family: 'Outfit', size: 16, weight: 'bold' },
                        padding: 15,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return ' $' + context.parsed.y + ' Millones COP';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            font: { family: 'Outfit', size: 13 },
                            color: '#64748b',
                            callback: function(value) {
                                return '$' + value + 'M';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { family: 'Outfit', weight: 'bold', size: 14 },
                            color: '#1e293b'
                        }
                    }
                }
            }
        });
    }

    // 2. Setup GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Simple reveal animation for blocks
        gsap.utils.toArray('.gs-reveal').forEach(function(elem) {
            gsap.fromTo(elem, 
                { autoAlpha: 0, y: 50 }, 
                { 
                    duration: 1, 
                    autoAlpha: 1, 
                    y: 0, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // Stagger animation for grids and lists
        gsap.utils.toArray('.gs-stagger').forEach(function(elem) {
            gsap.fromTo(elem.children, 
                { autoAlpha: 0, y: 30 },
                {
                    duration: 0.8,
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                    }
                }
            );
        });

        // Parallax effect for the hero background
        gsap.to('.hero-bg', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            } 
        });
    }
});

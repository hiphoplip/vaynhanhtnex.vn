/**
 * Main JavaScript Module
 * General utilities and interactions
 */

(function() {
    'use strict';
    
    // ========== Smooth Scroll ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Navbar height offset
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ========== Back to Top Button ==========
    function initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
        
        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    toggleBackToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Click event
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========== Scroll Reveal Animation ==========
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // ========== Lazy Load Images ==========
    function initLazyLoad() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports lazy loading natively
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback to Intersection Observer
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // ========== Mobile Menu Toggle (if needed) ==========
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navbar = document.querySelector('.navbar');
        
        if (menuToggle && navbar) {
            menuToggle.addEventListener('click', function() {
                navbar.classList.toggle('active');
            });
        }
    }
    
    // ========== Navbar Scroll Effect ==========
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(102, 126, 234, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.background = 'transparent';
                navbar.style.backdropFilter = 'none';
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // ========== Debounce Function ==========
    function debounce(func, wait = 250) {
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
    
    // ========== Handle Window Resize ==========
    function initResizeHandler() {
        const handleResize = debounce(() => {
            // Update viewport height for mobile browsers
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 250);
        
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }
    
    // ========== Track Outbound Links ==========
    function initLinkTracking() {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.addEventListener('click', function() {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'click', {
                            'event_category': 'outbound',
                            'event_label': this.href
                        });
                    }
                });
            }
        });
    }
    
    // ========== Phone Call Tracking ==========
    function initPhoneTracking() {
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'send_to': 'AW-XXXXXXXXX/XXXXXXXXXXXXXX',
                        'event_category': 'phone_call',
                        'event_label': this.href
                    });
                }
                
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Contact');
                }
            });
        });
    }
    
    // ========== Copy Phone Number on Click ==========
    function initPhoneCopy() {
        document.querySelectorAll('.nav-cta, .phone-button').forEach(element => {
            element.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                const phone = this.textContent.replace(/\D/g, '');
                
                // Copy to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(phone).then(() => {
                        // Show tooltip
                        const tooltip = document.createElement('div');
                        tooltip.textContent = 'Đã sao chép: ' + phone;
                        tooltip.style.cssText = `
                            position: fixed;
                            bottom: 20px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: var(--gray-900);
                            color: white;
                            padding: 0.75rem 1.5rem;
                            border-radius: var(--radius-lg);
                            z-index: 10000;
                            animation: slideUp 0.3s ease-out;
                        `;
                        
                        document.body.appendChild(tooltip);
                        
                        setTimeout(() => {
                            tooltip.style.animation = 'fadeOut 0.3s ease-out';
                            setTimeout(() => tooltip.remove(), 300);
                        }, 2000);
                    });
                }
            });
        });
    }
    
    // ========== Performance Monitoring ==========
    function logPerformance() {
        if ('PerformanceObserver' in window) {
            // Log Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Log First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
        
        // Log page load time
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('Page Load Time:', pageLoadTime + 'ms');
                
                // Send to analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        'name': 'load',
                        'value': pageLoadTime,
                        'event_category': 'performance'
                    });
                }
            }, 0);
        });
    }
    
    // ========== Initialize All ==========
    function init() {
        initSmoothScroll();
        initBackToTop();
        initScrollReveal();
        initLazyLoad();
        initMobileMenu();
        initNavbarScroll();
        initResizeHandler();
        initLinkTracking();
        initPhoneTracking();
        initPhoneCopy();
        
        // Performance monitoring in development only
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logPerformance();
        }
        
        console.log('✅ TNEX Finance website loaded successfully');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
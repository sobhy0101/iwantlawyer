// Main JavaScript for I Want Lawyer Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    // Set dynamic footer year
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Initialize all functionality
function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupContactForm();
    setupScrollEffects();
    setupPageRouting();
    setupLogoColorChange();
    
    // Set initial page based on URL hash or default to home
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            updateURL(page);
            closeMobileMenu();
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Page routing and display
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update navigation active state
        updateNavigationState(pageId);
        
        // Trigger page-specific functionality
        handlePageSpecificActions(pageId);
    }
}

// Update navigation active state
function updateNavigationState(pageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Update URL without page reload
function updateURL(pageId) {
    const newURL = pageId === 'home' ? '#' : `#${pageId}`;
    history.pushState(null, null, newURL);
}

// Handle browser back/forward buttons
function setupPageRouting() {
    window.addEventListener('popstate', function() {
        const page = window.location.hash.substring(1) || 'home';
        showPage(page);
    });
}

// Page-specific actions
function handlePageSpecificActions(pageId) {
    switch(pageId) {
        case 'contact':
            focusContactForm();
            break;
        case 'home':
            animateStats();
            break;
        default:
            // Add any default actions
            break;
    }
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }
    
    // Setup accordion functionality
    setupAccordion();
}

// Accordion functionality
function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If this item wasn't active, open it
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // Open the first accordion item by default
    const firstAccordionItem = document.querySelector('.accordion-item');
    if (firstAccordionItem) {
        firstAccordionItem.classList.add('active');
    }

    // Setup country flag icons
    setupCountryFlags();
}

// Logo color management
function setupLogoColorChange() {
    const logo = document.querySelector('.nav-logo .logo-image');
    
    if (logo) {
        // Change logo color based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                // Darker color when navbar background changes
                logo.style.filter = 'brightness(0) saturate(100%) invert(15%) sepia(85%) saturate(1500%) hue-rotate(218deg) brightness(85%) contrast(100%)';
            } else {
                // Original color
                logo.style.filter = 'brightness(0) saturate(100%) invert(22%) sepia(87%) saturate(1352%) hue-rotate(218deg) brightness(92%) contrast(97%)';
            }
        });
    }
}

// Setup country flag icons based on location names
function setupCountryFlags() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const locationName = item.querySelector('.location-name');
        const flagElement = item.querySelector('.location-flag');
        
        if (locationName && flagElement) {
            const location = locationName.textContent.toLowerCase().trim();
            
            // Map locations to flag images or keep emoji fallback
            switch(location) {
                case 'dearborn, michigan':
                case 'sterling heights, michigan':
                case 'houston, texas':
                    // For US locations, you can add a flag image
                    flagElement.innerHTML = `<img src="assets/images/usa-flag.svg" alt="USA Flag" style="width: 24px; height: 18px; border-radius: 2px;" onerror="this.style.display='none'; this.parentElement.textContent='🇺🇸';">`;
                    break;
                case 'cairo, egypt':
                    // For Egypt, you can add a flag image  
                    flagElement.innerHTML = `<img src="assets/images/egypt-flag.svg" alt="Egypt Flag" style="width: 24px; height: 18px; border-radius: 2px;" onerror="this.style.display='none'; this.parentElement.textContent='🇪🇬';">`;
                    break;
                case 'emergency contact':
                    // Keep emergency emoji
                    flagElement.textContent = '🚨';
                    break;
                default:
                    // Fallback to existing emoji flags
                    break;
            }
        }
    });
}

// Handle contact form submission
function handleContactSubmission(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Log form data (for development)
        console.log('Form submitted with data:', Object.fromEntries(formData));
        
    }, 2000);
}

// Focus on contact form when contact page is shown
function focusContactForm() {
    setTimeout(() => {
        const nameField = document.getElementById('name');
        if (nameField) {
            nameField.focus();
        }
    }, 300);
}

// Animate statistics on home page
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item h3');
    
    statItems.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (numericValue) {
            animateNumber(stat, 0, numericValue, finalValue, 3000);
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, finalText, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (finalText.includes('+')) {
            element.textContent = current + '+';
        } else if (finalText.includes('%')) {
            element.textContent = current + '%';
        } else {
            element.textContent = current;
        }
        
        if (current === end) {
            clearInterval(timer);
            element.textContent = finalText;
        }
    }, stepTime);
}

// Scroll effects
function setupScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Fade in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .practice-area-card, .attorney-card, .office-card, .counselor-card, .advice-card, .step'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Utility functions
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

// Smooth scroll for anchor links
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation
function validateForm(form) {
    const errors = [];
    const formData = new FormData(form);
    
    // Required fields validation
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(field => {
        const value = formData.get(field);
        if (!value || value.trim() === '') {
            errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
    });
    
    // Email validation
    const email = formData.get('email');
    if (email && !validateEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation (if provided)
    const phone = formData.get('phone');
    if (phone && !validatePhone(phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Enter key on navigation links
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
        e.target.click();
    }
});

// Accessibility improvements
function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #1e40af;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1002;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(announcer);
    
    // Store reference for page announcements
    window.pageAnnouncer = announcer;
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Global function to show pages (accessible from HTML onclick handlers)
window.showPage = showPage;

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showPage,
        validateEmail,
        validatePhone,
        validateForm
    };
}


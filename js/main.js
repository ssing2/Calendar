// Main JavaScript for Calendar2026.com

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize affiliate tracking
    initAffiliateTracking();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Add loading states to buttons
    initLoadingStates();
});

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle mobile menu - implementation depends on final design
            console.log('Mobile menu clicked');
        });
    }
}

// Affiliate link tracking
function initAffiliateTracking() {
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const productId = this.getAttribute('data-product');
            const position = Array.from(affiliateLinks).indexOf(this) + 1;
            
            // Track affiliate click
            trackAffiliateClick(productId, position);
            
            // Small delay to ensure tracking completes
            e.preventDefault();
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 100);
        });
    });
}

// Track affiliate clicks
function trackAffiliateClick(productId, position) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            'product_id': productId,
            'position': position,
            'page_location': window.location.href
        });
    }
    
    // Console log for debugging
    console.log(`Affiliate click tracked: ${productId} at position ${position}`);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states to CTA buttons
function initLoadingStates() {
    const ctaButtons = document.querySelectorAll('a[href="create/"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.textContent;
            this.innerHTML = '<span class="loading-spinner"></span> Loading...';
            this.style.pointerEvents = 'none';
            
            // Reset after a short delay (in real app, this would be handled by navigation)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
}

// Utility functions
const CalendarUtils = {
    // Get current date
    getCurrentDate: function() {
        return new Date();
    },
    
    // Format date for display
    formatDate: function(date, format = 'YYYY-MM-DD') {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        switch(format) {
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            default:
                return `${year}-${month}-${day}`;
        }
    },
    
    // Get days in month
    getDaysInMonth: function(year, month) {
        return new Date(year, month, 0).getDate();
    },
    
    // Get first day of month (0 = Sunday, 1 = Monday, etc.)
    getFirstDayOfMonth: function(year, month) {
        return new Date(year, month - 1, 1).getDay();
    },
    
    // Check if year is leap year
    isLeapYear: function(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },
    
    // Get week number
    getWeekNumber: function(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }
};

// Theme management
const ThemeManager = {
    themes: {
        'classic-blue': {
            name: 'Classic Blue',
            primary: '#3b82f6',
            secondary: '#60a5fa',
            accent: '#dbeafe'
        },
        'modern-gray': {
            name: 'Modern Gray',
            primary: '#374151',
            secondary: '#6b7280',
            accent: '#f3f4f6'
        },
        'spring-green': {
            name: 'Spring Green',
            primary: '#10b981',
            secondary: '#34d399',
            accent: '#d1fae5'
        },
        'autumn-orange': {
            name: 'Autumn Orange',
            primary: '#f59e0b',
            secondary: '#fbbf24',
            accent: '#fef3c7'
        },
        'professional-black': {
            name: 'Professional Black',
            primary: '#111827',
            secondary: '#374151',
            accent: '#f9fafb'
        }
    },
    
    currentTheme: 'classic-blue',
    
    setTheme: function(themeName) {
        if (this.themes[themeName]) {
            this.currentTheme = themeName;
            this.applyTheme(themeName);
            localStorage.setItem('calendar-theme', themeName);
        }
    },
    
    applyTheme: function(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        root.style.setProperty('--theme-primary', theme.primary);
        root.style.setProperty('--theme-secondary', theme.secondary);
        root.style.setProperty('--theme-accent', theme.accent);
        
        // Update theme class on body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${themeName}`);
    },
    
    loadSavedTheme: function() {
        const savedTheme = localStorage.getItem('calendar-theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        }
    }
};

// Event management for custom events
const EventManager = {
    events: [],
    maxEvents: 20,
    
    addEvent: function(event) {
        if (this.events.length >= this.maxEvents) {
            alert(`Maximum ${this.maxEvents} events allowed`);
            return false;
        }
        
        // Validate event object
        if (!event.title || !event.date) {
            alert('Event title and date are required');
            return false;
        }
        
        // Add unique ID
        event.id = this.generateId();
        
        this.events.push(event);
        this.saveEvents();
        return true;
    },
    
    removeEvent: function(eventId) {
        this.events = this.events.filter(event => event.id !== eventId);
        this.saveEvents();
    },
    
    getEvents: function(date = null) {
        if (date) {
            const dateStr = CalendarUtils.formatDate(date);
            return this.events.filter(event => event.date === dateStr);
        }
        return this.events;
    },
    
    generateId: function() {
        return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    saveEvents: function() {
        localStorage.setItem('calendar-events', JSON.stringify(this.events));
    },
    
    loadEvents: function() {
        const saved = localStorage.getItem('calendar-events');
        if (saved) {
            try {
                this.events = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading saved events:', e);
                this.events = [];
            }
        }
    },
    
    getEventsByType: function(type) {
        return this.events.filter(event => event.type === type);
    },
    
    // Get birthday reminders (7 days before)
    getBirthdayReminders: function(date) {
        const reminderDate = new Date(date);
        reminderDate.setDate(reminderDate.getDate() + 7);
        const reminderDateStr = CalendarUtils.formatDate(reminderDate);
        
        return this.events.filter(event => 
            event.type === 'birthday' && event.date === reminderDateStr
        ).map(event => ({
            ...event,
            isReminder: true,
            reminderText: `${event.title} birthday in 7 days`
        }));
    }
};

// Analytics tracking
const Analytics = {
    track: function(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Console log for debugging
        console.log('Analytics tracked:', eventName, parameters);
    },
    
    trackPageView: function(path = null) {
        const page = path || window.location.pathname;
        this.track('page_view', {
            page_location: window.location.href,
            page_path: page
        });
    },
    
    trackCalendarGeneration: function(type, theme, country) {
        this.track('calendar_generated', {
            calendar_type: type,
            theme: theme,
            country: country
        });
    },
    
    trackDownload: function(format, filename) {
        this.track('file_download', {
            file_format: format,
            file_name: filename
        });
    }
};

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Track errors for debugging
    Analytics.track('javascript_error', {
        error_message: e.message,
        error_filename: e.filename,
        error_lineno: e.lineno
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme and events
    ThemeManager.loadSavedTheme();
    EventManager.loadEvents();
    
    // Track page view
    Analytics.trackPageView();
});

// Export utilities for other scripts
window.CalendarApp = {
    Utils: CalendarUtils,
    ThemeManager: ThemeManager,
    EventManager: EventManager,
    Analytics: Analytics
};

// Affiliate Tracker for Calendar2026.com

class AffiliateTracker {
    constructor() {
        this.products = {
            'academic-planner': {
                title: '2026 Academic Planner',
                description: 'Perfect for students planning their 2025-2026 school year',
                amazonUrl: 'https://amzn.to/academic-planner-2026',
                image: 'images/academic-planner.jpg',
                price: '$24.99',
                category: 'student'
            },
            'family-organizer': {
                title: 'Family Organizer Planner',
                description: 'Keep track of everyone\'s schedules and important dates',
                amazonUrl: 'https://amzn.to/family-organizer-2026',
                image: 'images/family-organizer.jpg',
                price: '$32.99',
                category: 'family'
            },
            'business-planner': {
                title: 'Professional Business Planner',
                description: 'Boost productivity with goal-setting and time management',
                amazonUrl: 'https://amzn.to/business-planner-2026',
                image: 'images/business-planner.jpg',
                price: '$28.99',
                category: 'business'
            },
            'wall-calendar': {
                title: '2026 Large Wall Calendar',
                description: 'Beautiful wall calendar for office or home',
                amazonUrl: 'https://amzn.to/wall-calendar-2026',
                image: 'images/wall-calendar.jpg',
                price: '$19.99',
                category: 'home'
            },
            'desk-calendar': {
                title: '2026 Desk Calendar Stand',
                description: 'Compact desk calendar with monthly views',
                amazonUrl: 'https://amzn.to/desk-calendar-2026',
                image: 'images/desk-calendar.jpg',
                price: '$15.99',
                category: 'office'
            }
        };
        
        this.userProfile = this.detectUserProfile();
        this.init();
    }
    
    init() {
        this.loadAffiliateProducts();
        this.setupClickTracking();
        this.setupRecommendationEngine();
    }
    
    // Detect user profile based on behavior and selections
    detectUserProfile() {
        const profile = {
            type: 'general',
            interests: [],
            calendarTypes: []
        };
        
        // Check URL and page content for clues
        const url = window.location.href.toLowerCase();
        const content = document.body.textContent.toLowerCase();
        
        if (url.includes('school') || content.includes('academic') || content.includes('student')) {
            profile.type = 'student';
            profile.interests.push('education', 'academic');
        } else if (content.includes('business') || content.includes('professional')) {
            profile.type = 'business';
            profile.interests.push('productivity', 'professional');
        } else if (content.includes('family') || content.includes('kids')) {
            profile.type = 'family';
            profile.interests.push('family', 'organization');
        }
        
        // Store in localStorage for future visits
        const savedProfile = localStorage.getItem('user-profile');
        if (savedProfile) {
            try {
                const parsed = JSON.parse(savedProfile);
                return { ...profile, ...parsed };
            } catch (e) {
                console.error('Error parsing saved profile:', e);
            }
        }
        
        return profile;
    }
    
    // Get product recommendations based on user profile
    getRecommendations(limit = 3) {
        let recommendations = [];
        
        // Primary recommendations based on user type
        switch (this.userProfile.type) {
            case 'student':
                recommendations = ['academic-planner', 'desk-calendar', 'wall-calendar'];
                break;
            case 'business':
                recommendations = ['business-planner', 'desk-calendar', 'wall-calendar'];
                break;
            case 'family':
                recommendations = ['family-organizer', 'wall-calendar', 'academic-planner'];
                break;
            default:
                recommendations = ['family-organizer', 'business-planner', 'wall-calendar'];
        }
        
        // Ensure we have enough recommendations
        const allProducts = Object.keys(this.products);
        recommendations = [...new Set([...recommendations, ...allProducts])];
        
        return recommendations.slice(0, limit).map(id => ({
            id,
            ...this.products[id]
        }));
    }
    
    // Load affiliate products into the page
    loadAffiliateProducts() {
        const containers = document.querySelectorAll('#affiliate-products, .affiliate-section');
        
        containers.forEach(container => {
            if (container) {
                const recommendations = this.getRecommendations(3);
                container.innerHTML = this.renderProductGrid(recommendations);
            }
        });
    }
    
    // Render product grid HTML
    renderProductGrid(products) {
        return products.map(product => `
            <div class="bg-white rounded-xl shadow-sm border p-6 text-center affiliate-product" data-product="${product.id}">
                <div class="mb-4">
                    <img src="${product.image}" alt="${product.title}" 
                         class="w-32 h-32 mx-auto rounded-lg object-cover"
                         onerror="this.src='https://via.placeholder.com/200x200?text=${encodeURIComponent(product.title)}'">
                </div>
                <h3 class="font-semibold text-lg mb-2">${product.title}</h3>
                <p class="text-gray-600 text-sm mb-2">${product.description}</p>
                <div class="text-primary-600 font-bold text-lg mb-4">${product.price}</div>
                <a href="${product.amazonUrl}" 
                   class="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors affiliate-link" 
                   data-product="${product.id}"
                   target="_blank"
                   rel="noopener nofollow">
                    View on Amazon
                </a>
            </div>
        `).join('');
    }
    
    // Setup click tracking for affiliate links
    setupClickTracking() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('affiliate-link')) {
                e.preventDefault();
                
                const productId = e.target.getAttribute('data-product');
                const position = this.getElementPosition(e.target);
                
                this.trackClick(productId, position, e.target.href);
            }
        });
    }
    
    // Track affiliate click
    trackClick(productId, position, url) {
        const product = this.products[productId];
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', {
                'product_id': productId,
                'product_name': product?.title || 'Unknown Product',
                'position': position,
                'page_location': window.location.href,
                'link_url': url
            });
        }
        
        // Track user behavior
        this.updateUserProfile(productId);
        
        // Add click delay for tracking
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
        }, 100);
        
        console.log(`Affiliate click: ${productId} at position ${position}`);
    }
    
    // Get position of element in affiliate grid
    getElementPosition(element) {
        const container = element.closest('#affiliate-products, .affiliate-section');
        if (container) {
            const allLinks = container.querySelectorAll('.affiliate-link');
            return Array.from(allLinks).indexOf(element) + 1;
        }
        return 1;
    }
    
    // Update user profile based on clicks
    updateUserProfile(productId) {
        const product = this.products[productId];
        if (product && product.category) {
            if (!this.userProfile.interests.includes(product.category)) {
                this.userProfile.interests.push(product.category);
            }
            
            // Update profile type based on repeated interests
            const categoryCount = this.userProfile.interests.reduce((acc, interest) => {
                acc[interest] = (acc[interest] || 0) + 1;
                return acc;
            }, {});
            
            const topCategory = Object.keys(categoryCount).reduce((a, b) => 
                categoryCount[a] > categoryCount[b] ? a : b
            );
            
            if (topCategory === 'education' || topCategory === 'academic') {
                this.userProfile.type = 'student';
            } else if (topCategory === 'productivity' || topCategory === 'professional') {
                this.userProfile.type = 'business';
            } else if (topCategory === 'family') {
                this.userProfile.type = 'family';
            }
            
            // Save updated profile
            localStorage.setItem('user-profile', JSON.stringify(this.userProfile));
        }
    }
    
    // Setup recommendation engine for dynamic content
    setupRecommendationEngine() {
        // Listen for calendar selections to update recommendations
        document.addEventListener('calendar-selection', (e) => {
            const { type, theme, country } = e.detail;
            this.updateRecommendationsBasedOnSelection(type, theme, country);
        });
        
        // Update recommendations on download completion
        document.addEventListener('download-complete', (e) => {
            this.showPostDownloadRecommendations();
        });
    }
    
    // Update recommendations based on calendar selection
    updateRecommendationsBasedOnSelection(type, theme, country) {
        let newRecommendations = [];
        
        if (type === 'academic' || type === 'school') {
            newRecommendations = ['academic-planner', 'desk-calendar'];
        } else if (type === 'business' || type === 'professional') {
            newRecommendations = ['business-planner', 'desk-calendar'];
        } else if (type === 'family' || type === 'monthly') {
            newRecommendations = ['family-organizer', 'wall-calendar'];
        }
        
        // Add country-specific recommendations
        if (country === 'US' || country === 'CA') {
            newRecommendations.push('wall-calendar');
        }
        
        this.refreshRecommendations(newRecommendations);
    }
    
    // Show recommendations after download
    showPostDownloadRecommendations() {
        const recommendations = this.getRecommendations(2);
        
        // Create post-download recommendation modal or section
        const modal = this.createPostDownloadModal(recommendations);
        document.body.appendChild(modal);
        
        // Show modal
        setTimeout(() => modal.classList.add('show'), 100);
    }
    
    // Create post-download modal
    createPostDownloadModal(recommendations) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300';
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-8 max-w-md mx-4 transform scale-95 transition-transform duration-300">
                <div class="text-center mb-6">
                    <div class="text-4xl mb-2">🎉</div>
                    <h3 class="text-2xl font-bold text-gray-900">Download Complete!</h3>
                    <p class="text-gray-600 mt-2">Continue your planning journey with these recommended planners:</p>
                </div>
                
                <div class="space-y-4">
                    ${recommendations.map(product => `
                        <div class="flex items-center space-x-4 p-4 border rounded-lg">
                            <img src="${product.image}" alt="${product.title}" class="w-16 h-16 rounded object-cover"
                                 onerror="this.src='https://via.placeholder.com/64x64'">
                            <div class="flex-1">
                                <h4 class="font-semibold">${product.title}</h4>
                                <p class="text-sm text-gray-600">${product.price}</p>
                            </div>
                            <a href="${product.amazonUrl}" 
                               class="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 affiliate-link"
                               data-product="${product.id}"
                               target="_blank">
                                View
                            </a>
                        </div>
                    `).join('')}
                </div>
                
                <button class="w-full mt-6 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300" 
                        onclick="this.closest('.fixed').remove()">
                    Close
                </button>
            </div>
        `;
        
        // Add show class for animation
        modal.classList.add = function(className) {
            HTMLElement.prototype.classList.add.call(this, className);
            if (className === 'show') {
                this.style.opacity = '1';
                this.querySelector('.bg-white').style.transform = 'scale(1)';
            }
        };
        
        return modal;
    }
    
    // Refresh recommendations in existing containers
    refreshRecommendations(productIds) {
        const products = productIds.map(id => ({
            id,
            ...this.products[id]
        })).filter(p => p.title); // Filter out undefined products
        
        const containers = document.querySelectorAll('#affiliate-products, .affiliate-section');
        containers.forEach(container => {
            if (products.length > 0) {
                container.innerHTML = this.renderProductGrid(products);
            }
        });
    }
    
    // A/B testing for affiliate placement
    testAffiliatePerformance() {
        const testGroup = Math.random() < 0.5 ? 'A' : 'B';
        
        if (testGroup === 'B') {
            // Variation B: Different product order or presentation
            this.userProfile.testGroup = 'B';
        }
        
        // Track test group
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_test_group', {
                'test_group': testGroup
            });
        }
    }
}

// Initialize affiliate tracker when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.affiliateTracker = new AffiliateTracker();
});

// Export for use in other modules
window.AffiliateTracker = AffiliateTracker;

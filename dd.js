// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle for Option 1
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileClose = document.querySelector('.mobile-menu-close');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Mobile menu toggle for Option 2
    const navToggle = document.querySelector('.nav-toggle');
    const navMain = document.querySelector('.nav-main');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMain.classList.toggle('mobile-active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
        
        if (navMain && navToggle && !navMain.contains(event.target) && !navToggle.contains(event.target)) {
            navMain.classList.remove('mobile-active');
        }
    });
    
    // Set active navigation item based on current page
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a, .nav-item, .mobile-menu-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNav();
});
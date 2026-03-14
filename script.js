document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-xmark');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-xmark');
            });
        });
    }

    // 2. Sticky Navbar & Glow Effect on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Typing Effect
    const typingText = document.querySelector('.typing-text');
    const roles = [
        "Data Analyst", 
        "Web Developer", 
        "Python Developer", 
        "AI/ML Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete characters
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting
        } else {
            // Add characters
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Slower typing
        }

        // Logic for complete word
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typingText) {
        // Start typing effect shortly after load
        setTimeout(typeEffect, 1000);
    }

    // 4. Scroll Animation with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars inside this element when it becomes visible
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth + '%';
                });
            }
        });
    }, observerOptions);

    // Get all elements with fade-in animation class
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // 5. Project Category Switching Logic
    window.showProjectCategory = function(category) {
        const categoriesView = document.getElementById('project-categories-view');
        const listingView = document.getElementById('projects-listing-view');
        const titleElement = document.getElementById('category-title');
        const grids = document.querySelectorAll('.category-grid');
        
        // Hide all grids first
        grids.forEach(grid => grid.style.display = 'none');
        
        // Show selected grid
        const targetGrid = document.getElementById(`${category}-projects-grid`);
        if (targetGrid) {
            // FYP is a single full card, others are grids
            targetGrid.style.display = (category === 'fyp') ? 'block' : 'grid';
        }

        // Set category title
        const titles = {
            'data': 'Data Analyst Projects',
            'web': 'Web Development Projects',
            'fyp': 'Final Year Project (FYP)'
        };
        titleElement.textContent = titles[category] || 'Projects';
        
        // Fade out categories, Fade in projects
        categoriesView.classList.add('fade-out');
        
        setTimeout(() => {
            categoriesView.style.display = 'none';
            listingView.style.display = 'block';
            listingView.classList.remove('fade-in');
            listingView.classList.add('fade-out');
            
            setTimeout(() => {
                listingView.classList.remove('fade-out');
                listingView.classList.add('fade-in');
                
                // Show cards immediately since they are in a sub-view
                listingView.querySelectorAll('.project-card').forEach(card => {
                    card.classList.add('visible');
                });
            }, 50);
        }, 400);

        // Scroll to projects section top
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    };

    window.showCategories = function() {
        const categoriesView = document.getElementById('project-categories-view');
        const listingView = document.getElementById('projects-listing-view');
        
        listingView.classList.remove('fade-in');
        listingView.classList.add('fade-out');
        
        setTimeout(() => {
            listingView.style.display = 'none';
            categoriesView.style.display = 'grid';
            categoriesView.classList.remove('fade-in');
            categoriesView.classList.add('fade-out');
            
            setTimeout(() => {
                categoriesView.classList.remove('fade-out');
                categoriesView.classList.add('fade-in');
            }, 50);
        }, 400);

        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    };

    // 6. Contact Info Toggle
    window.toggleContactInfo = function() {
        const infoContainer = document.getElementById('hidden-contact-info');
        const btn = document.getElementById('contact-me-btn');
        
        if (infoContainer.classList.contains('visible')) {
            infoContainer.classList.remove('visible');
            btn.innerHTML = '<i class="fas fa-id-card"></i> Contact Me';
        } else {
            infoContainer.classList.add('visible');
            btn.innerHTML = '<i class="fas fa-times"></i> Close Info';
        }
    };

});

/**
 * Wenbo Zhao Portfolio - Main JavaScript
 * Handles navigation, project modals, and animations
 */

// Project Data
const projectData = {
    'guyu': {
        category: 'Ecommerce & Growth',
        title: 'GUYU — Front-End & Growth',
        timeline: 'June 2025 — January 2026',
        overview: 'Supported GUYU’s North America expansion (US & Canada) by building the Shopify storefront foundation, shaping go-to-market positioning, and setting up the early growth system to increase awareness and social credibility.',
        role: 'Business Builder / Growth + Front-End Execution (North America Launch)',
        tools: [
            'Shopify',
            'Google Ads',
            'Meta Ads',
            'Adobe Photoshop',
            'Adobe Premiere Pro',
            'Adobe After Effects',
            'GA4',
            'Google Tag Manager',
            'Creative Testing',
            'Influencer Outreach',
            'Liquid'
        ],
        problem: 'GUYU is a well-established skincare brand in China, but its North American presence (US & Canada) was still early. The challenge wasn’t creating a brand from zero—it was translating a proven product line into a North America-ready storefront and growth system, while building awareness and social credibility in a market where GUYU had limited visibility.',
        solution: [
            'Conducted North America-focused market and competitor research to refine positioning, messaging, and offer strategy',
            'Built and structured a Shopify storefront for US/Canada customers (collection hierarchy, PDP clarity, and conversion-focused layout)',
            'Supported paid acquisition setup and planning across Google Ads and Meta Ads with measurement readiness in mind',
            'Implemented analytics foundations (GA4 + GTM) to track core funnel actions and inform iteration',
            'Developed social content direction and UGC guidelines to improve hooks, clarity, and scroll-stopping creative',
            'Identified and shortlisted influencer partners aligned with GUYU’s product positioning and supported outreach coordination'
        ],
        outcomes: [
            'Launched a North America-ready Shopify storefront and established a clear go-to-market foundation',
            'Created a repeatable creative + testing workflow to iterate faster and reduce guesswork',
            'Improved tracking readiness to support smarter budget allocation and performance analysis',
            'Built an influencer pipeline to increase social proof and brand visibility for US/Canada audiences'
        ],
        mediaPath: 'assets/work/guyu'
    },
    'refined-concept': {
        category: 'Ecommerce Brand Build',
        title: 'Refined Concept — Ecommerce Brand Build',
        overview: 'Co-founded an ecommerce brand with Edison (University of Western Ontario) selling modern furniture and home decor with IKEA-level affordability but a more premium, prestige feel.',
        role: 'Co-Founder / Brand & Growth Lead',
        tools: ['Shopify', 'Adobe Photoshop', 'Figma', 'Google Ads', 'Meta Ads'],
        problem: 'The modern furniture market is dominated by either expensive designer brands or cheap, generic options. We saw an opportunity to create a brand that offers quality modern furniture at accessible prices while maintaining a premium aesthetic.',
        solution: [
            'Defined brand positioning: affordable prestige — IKEA pricing with elevated design',
            'Developed product direction focused on modern couches, furniture, and home decor',
            'Built premium Shopify storefront with sophisticated UI and clear brand identity',
            'Created collection structure and merchandising logic for intuitive browsing',
            'Established visual language and brand guidelines for consistent presentation'
        ],
        outcomes: [
            'Launched cohesive brand with clear market differentiation',
            'Built storefront that communicates premium value at accessible prices',
            'Created scalable collection framework for product expansion',
            'Established partnership workflow for ongoing collaboration'
        ],
        mediaPath: 'assets/work/refined-concept'
    },
    'ads-growth-engine': {
        category: 'Performance Marketing / Creative Strategy',
        title: 'Ads + Growth Engine',
        overview: 'Creative strategy + production and Google/Meta execution with tracking foundations and a repeatable testing loop to drive higher CTR and scalable acquisition.',
        role: 'Creative Strategist / Performance Marketer',
        tools: ['Meta Ads', 'Google Ads', 'Creative Strategy', 'Creative Production', 'Adobe Photoshop', 'Adobe Premiere Pro', 'Adobe After Effects', 'GA4', 'Google Tag Manager', 'Creative Testing', 'Attribution Setup'],
        problem: 'Performance stalls when creative is inconsistent and measurement is unclear—teams burn budget without learning what actually drives attention, clicks, and conversions.',
        solution: [
            'Developed creative strategy and test plans (hooks, angles, formats, CTAs) to generate consistent iterations',
            'Produced UGC-style creatives with strong first 2 seconds using Photoshop / Premiere Pro / After Effects to improve scroll-stop and CTR',
            'Ran and optimized campaigns across Meta Ads + Google Ads to test, learn, and scale winners',
            'Set up GA4 + GTM foundations to track key funnel actions and turn results into next tests',
            'Built a repeatable loop: test → analyze → iterate in short cycles to reduce guesswork'
        ],
        outcomes: [
            'Faster creative iteration with clearer learnings per test cycle',
            'More consistent ad performance workflow across channels',
            'Tracking-ready foundation for smarter optimization and scaling'
        ],
        mediaPath: 'assets/work/ads-growth-engine'
    },
    'frontend-conversion-ui': {
        category: 'Development / Conversion UI',
        title: 'Front-End + Conversion UI Builds',
        overview: 'Cost-efficient, high-conversion websites and storefront UIs designed for speed, clarity, and fast decision-making.',
        role: 'Front-End Builder / Conversion-Focused UI',
        tools: ['Next.js', 'React', 'HTML/CSS/JavaScript', 'Shopify', 'Liquid', 'UI Systems', 'Performance Optimization'],
        problem: 'Most sites lose users because pages are slow, cluttered, or confusing—people won\'t spend time figuring things out.',
        solution: [
            'Built modern front-end pages with clear hierarchy, strong typography, and minimal friction',
            'Designed conversion-first layouts (above-the-fold clarity, strong CTAs, trust cues, clean navigation)',
            'Implemented Shopify storefront structure when applicable (collections, PDP clarity, merchandising flow)',
            'Optimized for speed and maintainability (reusable sections/components, lightweight assets)'
        ],
        outcomes: [
            'Faster browsing and clearer paths to purchase/contact',
            'More premium perception through consistent spacing and UI polish',
            'Easier iteration because the structure is modular and reusable'
        ],
        mediaPath: 'assets/work/frontend-conversion-ui'
    }
};

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const currentYearSpan = document.getElementById('current-year');

/**
 * Initialize the application
 */
function init() {
    setupNavigation();
    setupScrollEffects();
    setupProjectModals();
    setupRevealAnimations();
    setupVideoHover();
    setCurrentYear();
}

/**
 * Navigation functionality
 */
function setupNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

/**
 * Scroll effects for navbar
 */
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Video hover functionality
 */
function setupVideoHover() {
    const projectCardsWithVideo = document.querySelectorAll('.project-card');

    projectCardsWithVideo.forEach(card => {
        const video = card.querySelector('.hover-video');
        if (!video) return;

        // Play on hover
        card.addEventListener('mouseenter', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Video play prevented:", error);
                });
            }
        });

        // Pause and reset on mouse leave
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        // Handle focus for accessibility
        card.addEventListener('focus', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Video play prevented:", error);
                });
            }
        });

        card.addEventListener('blur', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

/**
 * Video hover functionality
 */
function setupVideoHover() {
    const projectCardsWithVideo = document.querySelectorAll('.project-card');

    projectCardsWithVideo.forEach(card => {
        const video = card.querySelector('.hover-video');
        if (!video) return;

        // Play on hover
        card.addEventListener('mouseenter', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Video play prevented:", error);
                });
            }
        });

        // Pause and reset on mouse leave
        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });

        // Handle focus for accessibility
        card.addEventListener('focus', () => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Video play prevented:", error);
                });
            }
        });

        card.addEventListener('blur', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}
/**
 * Project modal functionality
 */
function setupProjectModals() {
    // Open modal on project card click
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking social links or other interactive elements that might be added later
            if (e.target.closest('a') || e.target.closest('button')) return;

            const projectId = card.dataset.project;
            openProjectModal(projectId);
        });

        // Keyboard accessibility
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = card.dataset.project;
                openProjectModal(projectId);
            }
        });
    });

    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
}

/**
 * Check if a video file exists (attempts to load it)
 */
function checkVideoExists(src) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.onloadedmetadata = () => resolve(true);
        video.onerror = () => resolve(false);
        video.src = src;
    });
}

/**
 * Open project modal with data
 */
async function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Build modal content
    const toolsHTML = project.tools.map(tool =>
        `<span class="modal-tool">${tool}</span>`
    ).join('');

    const solutionHTML = project.solution.map(item =>
        `<li>${item}</li>`
    ).join('');

    const outcomesHTML = project.outcomes.map(item =>
        `<li>${item}</li>`
    ).join('');

    const timelineHTML = project.timeline
        ? `<div class="modal-section">
            <h3 class="modal-section-title">Timeline</h3>
            <p class="modal-section-content modal-timeline">${project.timeline}</p>
        </div>`
        : '';

    // Check for hero video
    let mediaHTML = '';
    if (project.mediaPath) {
        const heroVideoPath = `${project.mediaPath}/hero.mp4`;
        const videoExists = await checkVideoExists(heroVideoPath);

        if (videoExists) {
            mediaHTML = `
                <div class="modal-media">
                    <video
                        class="modal-video"
                        muted
                        playsinline
                        loop
                        controls
                        aria-label="Project demo video"
                    >
                        <source src="${heroVideoPath}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        }
    }

    modalContent.innerHTML = `
        ${mediaHTML}
        <div class="modal-header">
            <span class="modal-category">${project.category}</span>
            <h2 class="modal-title" id="modal-title">${project.title}</h2>
            <p class="modal-overview">${project.overview}</p>
        </div>

        ${timelineHTML}

        <div class="modal-section">
            <h3 class="modal-section-title">My Role</h3>
            <p class="modal-section-content">${project.role}</p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Tools & Skills</h3>
            <div class="modal-tools">${toolsHTML}</div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">The Problem</h3>
            <p class="modal-section-content">${project.problem}</p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">The Solution</h3>
            <div class="modal-section-content">
                <ul>${solutionHTML}</ul>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Outcomes</h3>
            <div class="modal-section-content">
                <ul>${outcomesHTML}</ul>
            </div>
        </div>
    `;

    // Show modal
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Focus management
    modalClose.focus();

    // Trap focus within modal
    trapFocus(modal);
}

/**
 * Close modal
 */
function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';

    // Pause any playing videos
    const video = modalContent.querySelector('video');
    if (video) {
        video.pause();
    }

    // Return focus to the trigger element
    const activeCard = document.querySelector('.project-card:focus');
    if (activeCard) {
        activeCard.focus();
    }
}

/**
 * Trap focus within modal for accessibility
 */
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), video[controls]'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

/**
 * Setup reveal animations on scroll
 */
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.bento-card, .project-card, .skill-group, .education-card'
    );

    // Add reveal class to elements
    revealElements.forEach(el => el.classList.add('reveal'));

    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Set current year in footer
 */
function setCurrentYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Smooth scroll for anchor links
 */
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

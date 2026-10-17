/**
 * DULANGA.DEV — Modern Minimalist Web Developer Portfolio
 * Vanilla JavaScript Logic & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initSpotlightEffect();
    initCursorGlow();
    initTerminalTyping();
    initProjectFiltering();
    initCaseStudyModal();
    initClipboardCopy();
    initContactForm();
    initScrollSpy();
    initBackToTop();
});

/* ===================================================================
   1. HEADER SCROLL EFFECT
   =================================================================== */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ===================================================================
   2. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initMobileNav() {
    const toggle = document.getElementById('mobileToggle');
    const drawer = document.getElementById('mobileDrawer');
    const links = document.querySelectorAll('.mobile-link, .mobile-cta');

    if (!toggle || !drawer) return;

    toggle.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!drawer.contains(e.target) && !toggle.contains(e.target) && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ===================================================================
   3. SPOTLIGHT CARD EFFECT (MOUSE TRACKING GLOW)
   =================================================================== */
function initSpotlightEffect() {
    const cards = document.querySelectorAll('.spotlight-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ===================================================================
   4. CURSOR GLOW (DESKTOP)
   =================================================================== */
function initCursorGlow() {
    const cursor = document.getElementById('cursorGlow');
    if (!cursor) return;

    // Check if device supports fine hover pointer
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        }, { passive: true });
    } else {
        cursor.style.display = 'none';
    }
}

/* ===================================================================
   5. TERMINAL TYPING EFFECT
   =================================================================== */
function initTerminalTyping() {
    const typingElement = document.getElementById('terminalTypingText');
    if (!typingElement) return;

    const phrases = [
        'php artisan serve --port=8000',
        'composer require laravel/framework',
        'git commit -m "feat: optimize database query cache"',
        'npm run build && php artisan optimize',
        'docker compose up -d --build'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeLoop() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 35;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 75;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1800; // Pause at full phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before typing next phrase
        }

        setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
}

/* ===================================================================
   6. PROJECT CATEGORY FILTERING
   =================================================================== */
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* ===================================================================
   7. CASE STUDY MODAL DETAILS & HANDLING
   =================================================================== */
const caseStudyData = {
    arcade: {
        title: "ArcadeWeb Gaming & Community Hub",
        category: "Full-Stack Web Application • Laravel 11 / Blade / MySQL",
        image: "assets/img/arcade-platform.jpg",
        description: "ArcadeWeb is an end-to-end gaming ecosystem designed for real-time player telemetry, game statistics, and interactive community interactions.",
        problem: "Traditional gaming forums suffer from sluggish navigation, unoptimized database queries across hundreds of concurrent user sessions, and poor mobile accessibility.",
        solution: "Engineered a modular Laravel architecture using decoupled Blade components, eager-loaded Eloquent relationships, and Redis caching. Implemented real-time status updates and customized player statistics graphs with minimal overhead.",
        metrics: [
            { val: "< 85ms", label: "Average Server Response" },
            { val: "40%", label: "Reduction in SQL Queries" },
            { val: "99.8%", label: "Clean Lighthouse Score" }
        ],
        github: "https://github.com/iamdulanga/arcade-web"
    },
    nexus: {
        title: "Nexus Analytics & Revenue Engine",
        category: "Enterprise Cloud SaaS • Laravel / PostgreSQL / Redis",
        image: "assets/img/saas-dashboard.jpg",
        description: "A financial telemetry and recurring billing analytics system capable of ingesting high volumes of transactional events while providing instant visual forecasting.",
        problem: "Managing subscription reconciliations and churn forecasts in SaaS applications often causes heavy database bottlenecks during peak business reporting hours.",
        solution: "Architected a dedicated queue worker pipeline using Laravel Queues with Redis, partitioned PostgreSQL historical tables, and built responsive data visualization widgets.",
        metrics: [
            { val: "89 TB/day", label: "Telemetry Throughput" },
            { val: "0.04%", label: "Reported Error Rate" },
            { val: "$2.4M+", label: "Monthly Tracked ARR" }
        ],
        github: "https://github.com/iamdulanga"
    },
    aether: {
        title: "Aether Microservice API Gateway",
        category: "Backend Engine • Node.js / Express / Docker / REST",
        image: "assets/img/api-gateway.jpg",
        description: "A centralized API gateway and monitoring suite that validates requests, handles JWT rotation, and measures microservice response latencies in real time.",
        problem: "Dispersed microservices lacked centralized rate-limiting, unified error telemetry, and a developer-friendly test console.",
        solution: "Developed an asynchronous Node.js gateway with token-bucket rate limiting, structured logging, and an interactive browser-based testing console with response inspector.",
        metrics: [
            { val: "11.2ms", label: "Gateway Proxy Overhead" },
            { val: "99.98%", label: "Uptime Availability" },
            { val: "10k+", label: "Concurrent Req/Sec" }
        ],
        github: "https://github.com/iamdulanga"
    }
};

function initCaseStudyModal() {
    const modal = document.getElementById('caseStudyModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('modalCloseBtn');
    const openBtns = document.querySelectorAll('.view-case-study');

    if (!modal || !modalContent) return;

    function openModal(projectId) {
        const data = caseStudyData[projectId];
        if (!data) return;

        modalContent.innerHTML = `
            <img src="${data.image}" alt="${data.title}" class="modal-hero-img">
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-meta">
                <span>${data.category}</span>
            </div>
            
            <h3 class="modal-section-title">Overview</h3>
            <p class="modal-paragraph">${data.description}</p>

            <h3 class="modal-section-title">The Engineering Challenge</h3>
            <p class="modal-paragraph">${data.problem}</p>

            <h3 class="modal-section-title">The Architecture & Solution</h3>
            <p class="modal-paragraph">${data.solution}</p>

            <div class="modal-metrics-grid">
                ${data.metrics.map(m => `
                    <div class="modal-metric-box">
                        <div class="modal-metric-val">${m.val}</div>
                        <div class="modal-metric-lbl">${m.label}</div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                    <span>View GitHub Repository</span>
                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                    </svg>
                </a>
            </div>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ===================================================================
   8. CLIPBOARD COPY WITH TOAST NOTIFICATION
   =================================================================== */
function showToast(title, message, isSuccess = true) {
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast || !toastTitle || !toastMessage) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toastIcon.textContent = isSuccess ? '✓' : 'ℹ';
    toastIcon.style.color = isSuccess ? 'var(--cyan-primary)' : 'var(--text-primary)';

    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 3800);
}

function initClipboardCopy() {
    const quickCopyBtn = document.getElementById('quickCopyEmailBtn');
    const copyEmailMini = document.getElementById('copyEmailMini');
    const emailToCopy = 'iamdulanga.dev@gmail.com';

    function copyEmail() {
        navigator.clipboard.writeText(emailToCopy).then(() => {
            showToast('Email Copied!', `${emailToCopy} is copied to your clipboard.`);
            const copyBtnText = document.getElementById('copyBtnText');
            if (copyBtnText) {
                const original = copyBtnText.textContent;
                copyBtnText.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtnText.textContent = original;
                }, 2000);
            }
        }).catch(() => {
            showToast('Copy Failed', 'Please manually copy: ' + emailToCopy, false);
        });
    }

    if (quickCopyBtn) quickCopyBtn.addEventListener('click', copyEmail);
    if (copyEmailMini) copyEmailMini.addEventListener('click', copyEmail);
}

/* ===================================================================
   9. CONTACT FORM INTERACTION
   =================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        let isValid = true;

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        if (nameError) nameError.textContent = '';
        if (emailError) emailError.textContent = '';
        if (messageError) messageError.textContent = '';

        if (!nameInput.value.trim()) {
            if (nameError) nameError.textContent = 'Please provide your name.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            if (emailError) emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            if (messageError) messageError.textContent = 'Please enter at least 10 characters.';
            isValid = false;
        }

        if (!isValid) return;

        // Button state
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending Transmission...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();
            showToast('Message Received!', 'Thank you! Dulanga will respond to your transmission shortly.');
        }, 1200);
    });
}

/* ===================================================================
   10. SCROLL SPY ACTIVE NAV LINK
   =================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ===================================================================
   11. BACK TO TOP BUTTON
   =================================================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

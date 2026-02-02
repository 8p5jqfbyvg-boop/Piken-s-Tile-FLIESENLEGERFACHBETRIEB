document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    const brandLogo = document.querySelector('.brand-logo'); // Select the logo

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Hide logo when menu is open
        if (brandLogo) {
            brandLogo.classList.toggle('hidden');
        }

        // Animate hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active'); // Reset button state

            if (brandLogo) {
                brandLogo.classList.remove('hidden'); // Show logo again
            }

            document.body.style.overflow = ''; // Ensure scrolling is enabled

            // Reset hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    // --- Staggered Grid Animations ---
    const staggerGrids = document.querySelectorAll('.services-grid, .stats-grid, .nav-links');
    staggerGrids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            child.classList.add('animate-on-scroll', 'fade-up');
            child.style.transitionDelay = `${index * 100}ms`; // 100ms stagger
        });
    });

    // --- About Section Image Slider ---
    const aboutImages = document.querySelectorAll('.image-slider img');
    let currentAboutImage = 0;

    if (aboutImages.length > 0) {
        setInterval(() => {
            aboutImages[currentAboutImage].classList.remove('active');
            currentAboutImage = (currentAboutImage + 1) % aboutImages.length;
            aboutImages[currentAboutImage].classList.add('active');
        }, 3000);
    }

    // --- Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // --- 3D Tilt Effect for Cards ---
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on center of card
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Parallax Effect ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.003);
        }
    });

    // --- Particle System (Hero) ---
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.size > 0.2) this.size -= 0.005; // Twinkle effect (shrink)
                if (this.size <= 0.2) this.size = Math.random() * 2 + 0.5; // Reset size

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(200, 164, 126, ${this.opacity})`; // Gold color
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // --- Typing Effect ---
    const headline = document.querySelector('.hero h1');
    if (headline) {
        const text = headline.innerText;
        headline.innerText = ''; // Clear initial text
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                headline.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Speed of typing
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // --- Number Counter Animation ---
    const stats = document.querySelectorAll('.stat-number');

    // Helper to animate numbers
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Check if it's a percentage or just a number
            if (obj.innerText.includes('%')) {
                obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
            } else {
                // For "Profi", we don't count, but we can animate opacity/transform via CSS
                // If it was a number like 500, we'd count it.
                // Assuming 'Profi' stays text, no counting needed. Use case check:
                if (!isNaN(end)) {
                    obj.innerHTML = Math.floor(progress * (end - start) + start);
                }
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target')); // Need to add data-target in HTML

                // If counting 100%
                if (target.innerText.includes('%')) {
                    animateValue(target, 0, 100, 2000);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // --- Smooth Scroll for Anchor Links ---
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

    // --- Simple Image Slider ---
    const slides = document.querySelectorAll('.image-slider img');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Change image every 4 seconds
    }

    // --- Service Modals ---
    const modal = document.getElementById('service-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = {
        icon: modal.querySelector('.modal-icon'),
        title: modal.querySelector('.modal-title'),
        desc: modal.querySelector('.modal-description'),
        grid: modal.querySelector('.modal-details-grid')
    };

    // Detailed Content Data
    const serviceData = {
        'fliesen': {
            icon: '🧱',
            title: 'Fliesen & Naturstein',
            description: 'Wir verarbeiten eine Vielzahl hochwertiger Materialien. Ob Naturstein für eine luxuriöse Optik oder robustes Feinsteinzeug für maximale Langlebigkeit – wir beraten Sie gerne zur perfekten Wahl für Ihr Zuhause. Hier eine Auswahl unserer Materialien:',
            details: [
                'Marmor (Carrara, Emperador)',
                'Granit (Hartgestein)',
                'Schiefer (Naturspalt)',
                'Travertin (Offenporig/Gespachtelt)',
                'Sandstein',
                'Quarzit',
                'Feinsteinzeug (Großformat)',
                'Mosaik & Glasfliesen',
                'Kalkstein',
                'Und vieles mehr...'
            ]
        },
        'sanierung': {
            icon: '🏗️',
            title: 'Komplett-Sanierung',
            description: 'Von der Entkernung bis zur Übergabe: Wir sanieren Ihr Bad oder Ihren Wohnraum komplett aus einer Hand. Sparen Sie sich die Koordination verschiedener Handwerker.',
            details: [
                'Abriss & Entsorgung',
                'Estrich- & Putzarbeiten',
                'Abdichtung (DIN 18534)',
                'Barrierefreie Duschen',
                'Strom- & Wasserinstallation (Partner)',
                'Endreinigung',
                'Und vieles mehr...'
            ]
        },
        'planung': {
            icon: '✏️',
            title: 'Design & Planung',
            description: 'Jedes Projekt beginnt mit einer guten Planung. Wir visualisieren Ihre Ideen und helfen Ihnen bei der Auswahl der richtigen Formate, Farben und Verlegemuster.',
            details: [
                '3D-Visualisierung',
                'Materialberatung vor Ort',
                'Verlegepläne',
                'Farbkonzepte',
                'Lichtgestaltung',
                'Aufmaß & Angebot',
                'Und vieles mehr...'
            ]
        },
        'kueche': {
            icon: '🍳',
            title: 'Küche',
            description: 'Die Küche ist das Herz des Hauses. Wir gestalten sie mit hochwertigen Fliesen, Mosaiken oder Rückwänden pflegeleicht und stilvoll.',
            details: [
                'Küchenspiegel / Rückwände',
                'Großformat-Fliesen für Böden',
                'Mosaik-Akzente',
                'Arbeitsplatten aus Naturstein',
                'Pflegeleichte Oberflächen',
                'Und vieles mehr...'
            ]
        },
        'reparatur': {
            icon: '🔧',
            title: 'Reparatur & Service',
            description: 'Kleine Schäden, große Wirkung. Wir reparieren defekte Fliesen, erneuern Silikonfugen oder sanieren Balkone fachgerecht und sauber.',
            details: [
                'Austausch einzelner Fliesen',
                'Silikonfugen-Erneuerung',
                'Treppenbeläge innen & außen',
                'Balkon- & Terrassensanierung',
                'Reparatur nach Wasserschaden',
                'Schimmelbeseitigung',
                'Und vieles mehr...'
            ]
        }
    };

    // Open Modal
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const data = serviceData[serviceKey];

            if (data) {
                // Populate Content
                modalBody.icon.innerText = data.icon;
                modalBody.title.innerText = data.title;
                modalBody.desc.innerText = data.description;

                // Build Grid
                modalBody.grid.innerHTML = ''; // Clear old
                data.details.forEach(item => {
                    const pill = document.createElement('div');
                    pill.className = 'detail-pill';
                    pill.innerText = item;
                    modalBody.grid.appendChild(pill);
                });

                // Show
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    // --- Impressum & AGB Modals ---
    const impressumBtn = document.getElementById('open-impressum');
    const agbBtn = document.getElementById('open-agb');
    const impressumModal = document.getElementById('modal-impressum');
    const agbModal = document.getElementById('modal-agb');
    const allModals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAllModals() {
        allModals.forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }

    if (impressumBtn) impressumBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(impressumModal); });
    if (agbBtn) agbBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(agbModal); });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close on click outside (for all modals)
    allModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

});

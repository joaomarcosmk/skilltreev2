/**
 * SkillTree Cursos - Main JavaScript
 * Modern, Fast, and Interactive
 */

(function () {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('section[id]');
    const cartBtn = document.getElementById('cart-btn');
    const miniCart = document.getElementById('mini-cart');
    const miniCartClose = document.getElementById('mini-cart-close');

    // ============================================
    // Mobile Navigation
    // ============================================
    function openMenu() {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // ============================================
    // Mini Cart Toggle
    // ============================================
    if (cartBtn && miniCart) {
        cartBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            miniCart.classList.toggle('show');
            renderMiniCart();
        });

        if (miniCartClose) {
            miniCartClose.addEventListener('click', () => {
                miniCart.classList.remove('show');
            });
        }

        // Close mini cart when clicking outside
        document.addEventListener('click', (e) => {
            if (miniCart.classList.contains('show') &&
                !miniCart.contains(e.target) &&
                !cartBtn.contains(e.target)) {
                miniCart.classList.remove('show');
            }
        });
    }

    function renderMiniCart() {
        const miniCartBody = document.getElementById('mini-cart-body');
        if (!miniCartBody || typeof SkillTreeCart === 'undefined') return;

        const cartData = SkillTreeCart.getCartData();
        
        if (cartData.items.length === 0) {
            miniCartBody.innerHTML = `
                <div class="mini-cart__empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <a href="#courses" class="btn btn--primary btn--sm" onclick="document.getElementById('mini-cart').classList.remove('show')">Ver Cursos</a>
                </div>
            `;
            return;
        }

        let html = '<div class="mini-cart__items">';
        cartData.items.forEach(item => {
            html += `
                <div class="mini-cart__item">
                    <div class="mini-cart__item-info">
                        <span class="mini-cart__item-name">${item.name}</span>
                        <span class="mini-cart__item-price">${SkillTreeCart.formatCurrency(item.price)}</span>
                    </div>
                    <button class="mini-cart__item-remove" onclick="SkillTreeCart.removeFromCart('${item.id}'); renderMiniCart();">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });

        if (cartData.orderBump) {
            html += `
                <div class="mini-cart__item mini-cart__item--bump">
                    <div class="mini-cart__item-info">
                        <span class="mini-cart__item-name"><i class="fas fa-gift"></i> ${cartData.orderBump.name}</span>
                        <span class="mini-cart__item-price">${SkillTreeCart.formatCurrency(cartData.orderBump.price)}</span>
                    </div>
                    <button class="mini-cart__item-remove" onclick="SkillTreeCart.removeOrderBump(); renderMiniCart();">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }

        html += '</div>';
        html += `
            <div class="mini-cart__footer">
                <div class="mini-cart__total">
                    <span>Total:</span>
                    <strong>${SkillTreeCart.formatCurrency(cartData.total)}</strong>
                </div>
                <a href="checkout/" class="btn btn--primary btn--block">Finalizar Compra</a>
            </div>
        `;

        miniCartBody.innerHTML = html;
    }

    // Listen for cart updates
    window.addEventListener('cartUpdated', () => {
        if (miniCart && miniCart.classList.contains('show')) {
            renderMiniCart();
        }
    });

    // Make renderMiniCart globally available
    window.renderMiniCart = renderMiniCart;

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    function setActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Scroll to Top Button
    // ============================================
    function createScrollTopButton() {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo');
        document.body.appendChild(scrollTopBtn);

        function toggleScrollTopButton() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }

        window.addEventListener('scroll', toggleScrollTopButton);

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createScrollTopButton();

    // ============================================
    // Contact Form Handling
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success message
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.reset();
            } catch (error) {
                // Error message
                showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================
    // Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification__close"><i class="fas fa-times"></i></button>
        `;

        document.body.appendChild(notification);

        // Close button
        const closeBtn = notification.querySelector('.notification__close');

        function removeNotification() {
            notification.classList.add('slide-out');
            setTimeout(() => notification.remove(), 300);
        }

        closeBtn.addEventListener('click', removeNotification);

        // Auto remove after 5 seconds
        setTimeout(removeNotification, 5000);
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    function animateOnScroll() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Initialize animations after DOM is loaded
    animateOnScroll();

    // ============================================
    // Counter Animation for Stats
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat__number');
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.innerText.replace(/\D/g, ''));
                    const suffix = counter.innerText.replace(/[\d]/g, '');

                    animateValue(counter, 0, target, 2000, suffix);
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.innerText = current + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    animateCounters();

    // ============================================
    // Keyboard Navigation
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            closeMenu();
        }
    });

    // ============================================
    // Performance: Lazy Load Images
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c🌳 SkillTree Cursos', 'font-size: 24px; font-weight: bold; color: #22c55e;');
    console.log('%cDesenvolvendo habilidades, transformando carreiras!', 'font-size: 14px; color: #64748b;');

})();

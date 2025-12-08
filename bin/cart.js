/**
 * Skilltree E-commerce Cart System
 * Modern Shopping Cart with LocalStorage persistence
 */

const SkillTreeCart = (function() {
    'use strict';

    // ============================================
    // Products Database
    // ============================================
    const products = {
        'fundamentos-da-arte': {
            id: 'fundamentos-da-arte',
            name: 'Fundamentos da Arte',
            description: 'Aprenda os princípios fundamentais da arte: luz, sombra, cor, composição e perspectiva.',
            price: 497.00,
            originalPrice: 697.00,
            image: 'fas fa-shapes',
            category: 'Arte Digital',
            level: 'Iniciante',
            modules: 12,
            hours: 40
        },
        'concept-art-cenarios': {
            id: 'concept-art-cenarios',
            name: 'Concept Art de Cenários',
            description: 'Crie cenários incríveis para games e filmes com técnicas profissionais de concept art.',
            price: 697.00,
            originalPrice: 997.00,
            image: 'fas fa-mountain-sun',
            category: 'Concept Art',
            level: 'Intermediário',
            modules: 15,
            hours: 60
        },
        'anatomia-artistas': {
            id: 'anatomia-artistas',
            name: 'Anatomia Para Artistas',
            description: 'Domine a anatomia humana para criar personagens com proporções e movimentos realistas.',
            price: 597.00,
            originalPrice: 897.00,
            image: 'fas fa-person',
            category: 'Anatomia',
            level: 'Intermediário',
            modules: 14,
            hours: 50
        },
        'design-personagens': {
            id: 'design-personagens',
            name: 'Design de Personagens e Worldbuilding',
            description: 'Crie personagens únicos e mundos imaginários com técnicas de worldbuilding.',
            price: 797.00,
            originalPrice: 1197.00,
            image: 'fas fa-user-astronaut',
            category: 'Character Design',
            level: 'Avançado',
            modules: 18,
            hours: 70
        },
        'pintura-digital': {
            id: 'pintura-digital',
            name: 'Pintura Digital',
            description: 'Aprenda técnicas avançadas de pintura digital para criar ilustrações profissionais.',
            price: 647.00,
            originalPrice: 947.00,
            image: 'fas fa-brush',
            category: 'Pintura',
            level: 'Intermediário',
            modules: 16,
            hours: 55
        },
        'yucca-club': {
            id: 'yucca-club',
            name: 'Yucca Club',
            description: 'Comunidade exclusiva de artistas com acesso a conteúdos especiais e mentorias.',
            price: 97.00,
            originalPrice: 197.00,
            image: 'fas fa-star',
            category: 'Comunidade',
            level: 'Todos',
            isSubscription: true,
            period: 'mensal'
        }
    };

    // Order Bumps (produtos complementares)
    const orderBumps = {
        'fundamentos-da-arte': {
            id: 'pack-brushes-premium',
            name: 'Pack de Brushes Premium',
            description: 'Mais de 500 brushes profissionais para Photoshop e Procreate',
            price: 47.00,
            originalPrice: 97.00
        },
        'concept-art-cenarios': {
            id: 'referencias-cenarios',
            name: 'Banco de Referências de Cenários',
            description: 'Mais de 2000 referências de cenários organizadas por categoria',
            price: 67.00,
            originalPrice: 127.00
        },
        'anatomia-artistas': {
            id: 'modelo-3d-anatomia',
            name: 'Modelo 3D de Anatomia',
            description: 'Modelo 3D interativo para referência de anatomia',
            price: 57.00,
            originalPrice: 117.00
        },
        'design-personagens': {
            id: 'templates-personagens',
            name: 'Templates de Character Design',
            description: 'Templates profissionais para design de personagens',
            price: 77.00,
            originalPrice: 147.00
        },
        'pintura-digital': {
            id: 'pack-texturas',
            name: 'Pack de Texturas HD',
            description: 'Mais de 300 texturas em alta resolução',
            price: 57.00,
            originalPrice: 107.00
        }
    };

    // Upsells (ofertas após checkout)
    const upsells = {
        'fundamentos-da-arte': {
            id: 'mentoria-fundamentos',
            name: 'Mentoria Individual - Fundamentos',
            description: '3 sessões de mentoria individual de 1 hora cada com instrutor especialista',
            price: 297.00,
            originalPrice: 597.00,
            benefits: [
                'Feedback personalizado em seus trabalhos',
                'Plano de estudos customizado',
                'Acesso direto ao instrutor por WhatsApp',
                'Certificado de mentoria'
            ]
        },
        'concept-art-cenarios': {
            id: 'combo-concept-art',
            name: 'Combo Concept Art Completo',
            description: 'Adicione o curso de Design de Personagens com 50% OFF',
            price: 397.00,
            originalPrice: 797.00,
            benefits: [
                'Curso Design de Personagens completo',
                'Integração perfeita com Concept Art',
                'Portfolio profissional',
                'Comunidade exclusiva'
            ]
        },
        'default': {
            id: 'acesso-vitalicio',
            name: 'Upgrade para Acesso Vitalício Premium',
            description: 'Tenha acesso a TODOS os cursos da Skilltree para sempre',
            price: 1497.00,
            originalPrice: 2997.00,
            benefits: [
                'Todos os 6 cursos inclusos',
                'Atualizações gratuitas para sempre',
                'Comunidade premium',
                'Mentorias em grupo mensais',
                'Certificados de todos os cursos'
            ]
        }
    };

    // Cart state
    let cart = {
        items: [],
        orderBump: null,
        coupon: null
    };

    // ============================================
    // LocalStorage Operations
    // ============================================
    function saveCart() {
        localStorage.setItem('skilltree_cart', JSON.stringify(cart));
        updateCartUI();
        dispatchCartEvent();
    }

    function loadCart() {
        const saved = localStorage.getItem('skilltree_cart');
        if (saved) {
            cart = JSON.parse(saved);
        }
        updateCartUI();
    }

    function dispatchCartEvent() {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    }

    // ============================================
    // Cart Operations
    // ============================================
    function addToCart(productId) {
        const product = products[productId];
        if (!product) return false;

        // Check if already in cart
        const existingIndex = cart.items.findIndex(item => item.id === productId);
        if (existingIndex >= 0) {
            showNotification('Este curso já está no seu carrinho!', 'info');
            return false;
        }

        cart.items.push({
            id: productId,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity: 1
        });

        saveCart();
        showNotification(`${product.name} adicionado ao carrinho!`, 'success');
        return true;
    }

    function removeFromCart(productId) {
        const index = cart.items.findIndex(item => item.id === productId);
        if (index >= 0) {
            const removed = cart.items.splice(index, 1)[0];
            saveCart();
            showNotification(`${removed.name} removido do carrinho.`, 'info');
        }
    }

    function clearCart() {
        cart = { items: [], orderBump: null, coupon: null };
        saveCart();
    }

    function addOrderBump(productId) {
        const bump = orderBumps[productId];
        if (bump) {
            cart.orderBump = bump;
            saveCart();
            showNotification('Oferta especial adicionada!', 'success');
        }
    }

    function removeOrderBump() {
        cart.orderBump = null;
        saveCart();
    }

    function applyCoupon(code) {
        const coupons = {
            'ARTE10': { discount: 10, type: 'percent' },
            'SKILLTREE50': { discount: 50, type: 'fixed' },
            'BEMVINDO': { discount: 15, type: 'percent' }
        };

        const coupon = coupons[code.toUpperCase()];
        if (coupon) {
            cart.coupon = { code: code.toUpperCase(), ...coupon };
            saveCart();
            showNotification(`Cupom ${code.toUpperCase()} aplicado com sucesso!`, 'success');
            return true;
        }
        showNotification('Cupom inválido ou expirado.', 'error');
        return false;
    }

    function removeCoupon() {
        cart.coupon = null;
        saveCart();
    }

    // ============================================
    // Price Calculations
    // ============================================
    function getSubtotal() {
        let subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cart.orderBump) {
            subtotal += cart.orderBump.price;
        }
        return subtotal;
    }

    function getDiscount() {
        if (!cart.coupon) return 0;
        const subtotal = getSubtotal();
        if (cart.coupon.type === 'percent') {
            return subtotal * (cart.coupon.discount / 100);
        }
        return Math.min(cart.coupon.discount, subtotal);
    }

    function getTotal() {
        return Math.max(0, getSubtotal() - getDiscount());
    }

    function getSavings() {
        let savings = cart.items.reduce((sum, item) => {
            return sum + ((item.originalPrice - item.price) * item.quantity);
        }, 0);
        if (cart.orderBump) {
            savings += cart.orderBump.originalPrice - cart.orderBump.price;
        }
        savings += getDiscount();
        return savings;
    }

    // ============================================
    // UI Updates
    // ============================================
    function updateCartUI() {
        // Update cart count in header
        const cartCount = document.querySelectorAll('.cart-count');
        const totalItems = cart.items.length + (cart.orderBump ? 1 : 0);
        cartCount.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'flex' : 'none';
        });

        // Update mini cart if exists
        const miniCart = document.getElementById('mini-cart');
        if (miniCart) {
            renderMiniCart(miniCart);
        }
    }

    function renderMiniCart(container) {
        if (cart.items.length === 0) {
            container.innerHTML = `
                <div class="mini-cart__empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <a href="/#courses" class="btn btn--primary btn--sm">Ver Cursos</a>
                </div>
            `;
            return;
        }

        let html = '<div class="mini-cart__items">';
        cart.items.forEach(item => {
            html += `
                <div class="mini-cart__item">
                    <div class="mini-cart__item-info">
                        <span class="mini-cart__item-name">${item.name}</span>
                        <span class="mini-cart__item-price">${formatCurrency(item.price)}</span>
                    </div>
                    <button class="mini-cart__item-remove" onclick="SkillTreeCart.removeFromCart('${item.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        });

        if (cart.orderBump) {
            html += `
                <div class="mini-cart__item mini-cart__item--bump">
                    <div class="mini-cart__item-info">
                        <span class="mini-cart__item-name">${cart.orderBump.name}</span>
                        <span class="mini-cart__item-price">${formatCurrency(cart.orderBump.price)}</span>
                    </div>
                    <button class="mini-cart__item-remove" onclick="SkillTreeCart.removeOrderBump()">
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
                    <strong>${formatCurrency(getTotal())}</strong>
                </div>
                <a href="checkout/" class="btn btn--primary btn--block">Finalizar Compra</a>
            </div>
        `;

        container.innerHTML = html;
    }

    // ============================================
    // Utility Functions
    // ============================================
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification__close"><i class="fas fa-times"></i></button>
        `;

        document.body.appendChild(notification);

        const closeBtn = notification.querySelector('.notification__close');
        const removeNotification = () => {
            notification.classList.add('slide-out');
            setTimeout(() => notification.remove(), 300);
        };

        closeBtn.addEventListener('click', removeNotification);
        setTimeout(removeNotification, 4000);
    }

    function getProduct(productId) {
        return products[productId];
    }

    function getOrderBump(productId) {
        return orderBumps[productId];
    }

    function getUpsell(productId) {
        return upsells[productId] || upsells['default'];
    }

    function getCartItems() {
        return cart.items;
    }

    function getCartData() {
        return {
            items: cart.items,
            orderBump: cart.orderBump,
            coupon: cart.coupon,
            subtotal: getSubtotal(),
            discount: getDiscount(),
            total: getTotal(),
            savings: getSavings()
        };
    }

    // ============================================
    // Initialize
    // ============================================
    function init() {
        loadCart();

        // Add click handlers for add-to-cart buttons
        document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = btn.dataset.addToCart;
                if (addToCart(productId)) {
                    // Redirect to checkout or show mini cart
                    if (btn.dataset.directCheckout) {
                        window.location.href = 'checkout/';
                    }
                }
            });
        });
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // Public API
    // ============================================
    return {
        addToCart,
        removeFromCart,
        clearCart,
        addOrderBump,
        removeOrderBump,
        applyCoupon,
        removeCoupon,
        getSubtotal,
        getDiscount,
        getTotal,
        getSavings,
        getProduct,
        getOrderBump,
        getUpsell,
        getCartItems,
        getCartData,
        formatCurrency,
        products
    };

})();

// Make cart globally available
window.SkillTreeCart = SkillTreeCart;

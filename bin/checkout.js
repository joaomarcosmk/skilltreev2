/**
 * Skilltree Checkout Page JavaScript
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const cartItemsContainer = document.getElementById('cart-items');
    const summaryItemsContainer = document.getElementById('summary-items');
    const orderBumpSection = document.getElementById('order-bump-section');
    const orderBumpCheck = document.getElementById('order-bump-check');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutSubmit = document.getElementById('checkout-submit');

    // Payment elements
    const paymentMethods = document.querySelectorAll('.payment-method input');
    const creditCardForm = document.getElementById('credit-card-form');
    const pixInfo = document.getElementById('pix-info');
    const boletoInfo = document.getElementById('boleto-info');

    // Coupon elements
    const couponToggle = document.getElementById('coupon-toggle');
    const couponForm = document.getElementById('coupon-form');
    const couponCodeInput = document.getElementById('coupon-code');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const couponApplied = document.getElementById('coupon-applied');
    const removeCouponBtn = document.getElementById('remove-coupon');

    // Summary elements
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryDiscountRow = document.getElementById('summary-discount-row');
    const summaryDiscount = document.getElementById('summary-discount');
    const summaryTotal = document.getElementById('summary-total');
    const summaryInstallments = document.getElementById('summary-installments');
    const installmentValue = document.getElementById('installment-value');
    const summarySavings = document.getElementById('summary-savings');
    const savingsAmount = document.getElementById('savings-amount');

    let currentPaymentMethod = 'credit';
    let pixDiscount = 0;

    // ============================================
    // Initialize
    // ============================================
    function init() {
        // Check if cart is empty
        const cartData = SkillTreeCart.getCartData();
        if (cartData.items.length === 0) {
            // Add a default product for demo purposes
            SkillTreeCart.addToCart('fundamentos-da-arte');
        }

        renderCartItems();
        renderSummary();
        setupOrderBump();
        setupPaymentMethods();
        setupCoupon();
        setupFormValidation();
        setupInputMasks();
    }

    // ============================================
    // Render Cart Items
    // ============================================
    function renderCartItems() {
        const cartData = SkillTreeCart.getCartData();
        
        if (cartData.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <a href="../#courses" class="btn btn--primary">Ver Cursos</a>
                </div>
            `;
            return;
        }

        let html = '';
        cartData.items.forEach(item => {
            const product = SkillTreeCart.getProduct(item.id);
            html += `
                <div class="cart-item">
                    <div class="cart-item__icon">
                        <i class="${product ? product.image : 'fas fa-book'}"></i>
                    </div>
                    <div class="cart-item__info">
                        <h4>${item.name}</h4>
                        <p>${product ? product.description : ''}</p>
                        <div class="cart-item__meta">
                            ${product ? `<span><i class="fas fa-video"></i> ${product.modules || 12} módulos</span>` : ''}
                            ${product ? `<span><i class="fas fa-clock"></i> ${product.hours || 40}h de conteúdo</span>` : ''}
                        </div>
                    </div>
                    <div class="cart-item__price">
                        <span class="cart-item__original-price">${SkillTreeCart.formatCurrency(item.originalPrice)}</span>
                        <span class="cart-item__current-price">${SkillTreeCart.formatCurrency(item.price)}</span>
                    </div>
                    <button class="cart-item__remove" onclick="removeItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = html;
    }

    // ============================================
    // Setup Order Bump
    // ============================================
    function setupOrderBump() {
        const cartData = SkillTreeCart.getCartData();
        
        if (cartData.items.length === 0) {
            orderBumpSection.style.display = 'none';
            return;
        }

        // Get order bump for the first item in cart
        const firstItem = cartData.items[0];
        const orderBump = SkillTreeCart.getOrderBump(firstItem.id);

        if (!orderBump) {
            orderBumpSection.style.display = 'none';
            return;
        }

        orderBumpSection.style.display = 'block';
        document.getElementById('order-bump-name').textContent = orderBump.name;
        document.getElementById('order-bump-description').textContent = orderBump.description;
        document.getElementById('order-bump-price').textContent = SkillTreeCart.formatCurrency(orderBump.price);
        document.getElementById('order-bump-original').textContent = SkillTreeCart.formatCurrency(orderBump.originalPrice);

        // Check if already added
        if (cartData.orderBump && cartData.orderBump.id === orderBump.id) {
            orderBumpCheck.checked = true;
        }

        orderBumpCheck.addEventListener('change', function() {
            if (this.checked) {
                SkillTreeCart.addOrderBump(firstItem.id);
            } else {
                SkillTreeCart.removeOrderBump();
            }
            renderSummary();
        });
    }

    // ============================================
    // Render Summary
    // ============================================
    function renderSummary() {
        const cartData = SkillTreeCart.getCartData();
        
        // Render summary items
        let itemsHtml = '';
        cartData.items.forEach(item => {
            itemsHtml += `
                <div class="checkout-summary__item">
                    <span>${item.name}</span>
                    <span>${SkillTreeCart.formatCurrency(item.price)}</span>
                </div>
            `;
        });

        if (cartData.orderBump) {
            itemsHtml += `
                <div class="checkout-summary__item checkout-summary__item--bump">
                    <span><i class="fas fa-gift"></i> ${cartData.orderBump.name}</span>
                    <span>${SkillTreeCart.formatCurrency(cartData.orderBump.price)}</span>
                </div>
            `;
        }

        summaryItemsContainer.innerHTML = itemsHtml;

        // Calculate totals
        let subtotal = cartData.subtotal;
        let discount = cartData.discount;
        
        // Apply PIX discount if selected
        if (currentPaymentMethod === 'pix') {
            pixDiscount = subtotal * 0.05;
            discount += pixDiscount;
        } else {
            pixDiscount = 0;
        }

        const total = Math.max(0, subtotal - discount);

        // Update summary values
        summarySubtotal.textContent = SkillTreeCart.formatCurrency(subtotal);
        
        if (discount > 0) {
            summaryDiscountRow.style.display = 'flex';
            summaryDiscount.textContent = `- ${SkillTreeCart.formatCurrency(discount)}`;
        } else {
            summaryDiscountRow.style.display = 'none';
        }

        summaryTotal.textContent = SkillTreeCart.formatCurrency(total);
        installmentValue.textContent = SkillTreeCart.formatCurrency(total / 12);

        // Savings
        const savings = cartData.savings + pixDiscount;
        if (savings > 0) {
            summarySavings.style.display = 'flex';
            savingsAmount.textContent = SkillTreeCart.formatCurrency(savings);
        } else {
            summarySavings.style.display = 'none';
        }

        // Update coupon display
        if (cartData.coupon) {
            couponForm.style.display = 'none';
            couponApplied.style.display = 'flex';
            document.getElementById('applied-coupon-code').textContent = cartData.coupon.code;
        } else {
            couponApplied.style.display = 'none';
        }
    }

    // ============================================
    // Payment Methods
    // ============================================
    function setupPaymentMethods() {
        paymentMethods.forEach(method => {
            method.addEventListener('change', function() {
                // Update active state
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
                this.closest('.payment-method').classList.add('active');

                currentPaymentMethod = this.value;

                // Show/hide payment forms
                creditCardForm.style.display = this.value === 'credit' ? 'block' : 'none';
                pixInfo.style.display = this.value === 'pix' ? 'block' : 'none';
                boletoInfo.style.display = this.value === 'boleto' ? 'block' : 'none';

                // Update installments visibility
                summaryInstallments.style.display = this.value === 'credit' ? 'block' : 'none';

                // Recalculate with PIX discount if applicable
                renderSummary();
            });
        });
    }

    // ============================================
    // Coupon
    // ============================================
    function setupCoupon() {
        couponToggle.addEventListener('click', function() {
            couponForm.style.display = couponForm.style.display === 'none' ? 'flex' : 'none';
        });

        applyCouponBtn.addEventListener('click', function() {
            const code = couponCodeInput.value.trim();
            if (code && SkillTreeCart.applyCoupon(code)) {
                renderSummary();
            }
        });

        couponCodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyCouponBtn.click();
            }
        });

        removeCouponBtn.addEventListener('click', function() {
            SkillTreeCart.removeCoupon();
            couponApplied.style.display = 'none';
            couponForm.style.display = 'flex';
            couponCodeInput.value = '';
            renderSummary();
        });
    }

    // ============================================
    // Form Validation & Submission
    // ============================================
    function setupFormValidation() {
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate terms
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                showNotification('Por favor, aceite os termos de uso para continuar.', 'error');
                return;
            }

            // Validate credit card if selected
            if (currentPaymentMethod === 'credit') {
                const cardNumber = document.getElementById('cardNumber').value;
                const cardName = document.getElementById('cardName').value;
                const cardExpiry = document.getElementById('cardExpiry').value;
                const cardCvv = document.getElementById('cardCvv').value;

                if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                    showNotification('Por favor, preencha todos os dados do cartão.', 'error');
                    return;
                }
            }

            // Show loading
            checkoutSubmit.disabled = true;
            checkoutSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';

            // Simulate payment processing
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Store order data for thank you page
                const cartData = SkillTreeCart.getCartData();
                const orderData = {
                    ...cartData,
                    customer: {
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        email: document.getElementById('email').value
                    },
                    paymentMethod: currentPaymentMethod,
                    pixDiscount: pixDiscount,
                    finalTotal: cartData.total - pixDiscount
                };
                
                localStorage.setItem('skilltree_last_order', JSON.stringify(orderData));

                // Redirect to upsell page
                window.location.href = '../upsell/';
                
            } catch (error) {
                showNotification('Erro ao processar pagamento. Tente novamente.', 'error');
                checkoutSubmit.disabled = false;
                checkoutSubmit.innerHTML = '<i class="fas fa-lock"></i> Finalizar Compra';
            }
        });
    }

    // ============================================
    // Input Masks
    // ============================================
    function setupInputMasks() {
        // CPF mask
        const cpfInput = document.getElementById('cpf');
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });

        // Phone mask
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        });

        // Card number mask
        const cardInput = document.getElementById('cardNumber');
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            e.target.value = value;
        });

        // Card expiry mask
        const expiryInput = document.getElementById('cardExpiry');
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '$1/$2');
            e.target.value = value;
        });
    }

    // ============================================
    // Helper Functions
    // ============================================
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

    // Global function to remove items
    window.removeItem = function(productId) {
        SkillTreeCart.removeFromCart(productId);
        renderCartItems();
        renderSummary();
        setupOrderBump();
    };

    // ============================================
    // Initialize on DOM ready
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

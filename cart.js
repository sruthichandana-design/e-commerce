// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartBadge();
    renderCart();
    showNotification('Item removed from cart');
}

// Update item quantity
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
            renderCart();
            updateCartBadge();
        }
    }
}

// Render cart items
function renderCart() {
    const content = document.getElementById('cartContent');
    const cart = getCart();
    
    if (cart.length === 0) {
        content.innerHTML = `
            <div class="cart-empty">
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <a href="index.html" class="btn">Browse Products</a>
            </div>
        `;
        return;
    }

    const { subtotal, tax, total } = calculateTotals(cart);

    content.innerHTML = `
        <div class="cart-layout">
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">${item.emoji}</div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="btn btn-danger remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (10%):</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <a href="checkout.html" class="btn btn-success">Proceed to Checkout</a>
            </div>
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});

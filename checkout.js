// Render order summary
function renderOrderSummary() {
    const summary = document.getElementById('orderSummary');
    const cart = getCart();
    const { subtotal, tax, total } = calculateTotals(cart);

    summary.innerHTML = `
        <h3>Order Summary</h3>
        ${cart.map(item => `
            <div class="order-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Tax:</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const cart = getCart();
    
    // Redirect to cart if empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    renderOrderSummary();
    
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Generate order number
        const orderNumber = 'ORD-' + Date.now();
        
        // Store order number in localStorage
        localStorage.setItem('orderNumber', orderNumber);
        
        // Clear cart
        saveCart([]);
        
        // Redirect to success page
        window.location.href = 'success.html';
    });
});

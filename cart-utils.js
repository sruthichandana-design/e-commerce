// Product data
const products = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, emoji: '🎧', description: 'Premium noise-cancelling headphones' },
    { id: 2, name: 'Smart Watch', price: 199.99, emoji: '⌚', description: 'Fitness tracker with heart monitor' },
    { id: 3, name: 'Laptop Stand', price: 49.99, emoji: '💻', description: 'Ergonomic aluminum laptop stand' },
    { id: 4, name: 'Bluetooth Speaker', price: 59.99, emoji: '🔊', description: 'Portable wireless speaker' },
    { id: 5, name: 'Webcam HD', price: 89.99, emoji: '📷', description: '1080p HD streaming webcam' },
    { id: 6, name: 'Mechanical Keyboard', price: 129.99, emoji: '⌨️', description: 'RGB backlit gaming keyboard' },
    { id: 7, name: 'USB-C Hub', price: 39.99, emoji: '🔌', description: '7-in-1 multiport adapter' },
    { id: 8, name: 'Phone Case', price: 19.99, emoji: '📱', description: 'Shockproof protective case' }
];

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
    }
}

// Calculate cart totals
function calculateTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize cart badge on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
});

// Display order number on success page
document.addEventListener('DOMContentLoaded', function() {
    const orderNumber = localStorage.getItem('orderNumber');
    const orderNumberElement = document.getElementById('orderNumber');
    
    if (orderNumber) {
        orderNumberElement.textContent = 'Order #' + orderNumber;
        // Clear order number from storage after displaying
        localStorage.removeItem('orderNumber');
    } else {
        // If no order number, redirect to home
        window.location.href = 'index.html';
    }
});

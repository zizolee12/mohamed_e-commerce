function searchProducts() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const categories = document.querySelectorAll('.product-category');

    categories.forEach(category => {
        let hasVisible = false;
        const products = category.querySelectorAll('.product1');
        products.forEach(product => {
            const name = product.getAttribute('data-name') ? product.getAttribute('data-name').toLowerCase() : '';
            if (name.includes(input)) {
                product.style.display = 'block';
                hasVisible = true;
            } else {
                product.style.display = 'none';
            }
        });
        category.style.display = hasVisible ? 'block' : 'none';
    });
}

let cart = [];

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function getCartTotal() {
    return cart.reduce((sum, item) => {
        const match = item.price.match(/(\d+)/);
        return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    cart.forEach((item, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.price} <button class='removeBtn' data-index='${i}'>Remove</button>`;
        cartItems.appendChild(li);
    });
    document.getElementById('cartTotal').textContent = `Total Amount: ${getCartTotal()} Nle`;
}

// Add to cart functionality
const addCartButtons = document.querySelectorAll('.cartAdd');
addCartButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const productDiv = btn.closest('.product1');
        const name = productDiv.getAttribute('data-name');
        const priceElem = productDiv.querySelector('p:nth-of-type(2)');
        const price = priceElem ? priceElem.textContent : '';
        cart.push({ name, price });
        updateCartCount();
    });
});

// Cart button click (optional: show cart items)
document.getElementById('cartBtn').onclick = function() {
    document.getElementById('cartModal').style.display = 'block';
    renderCart();
};

document.getElementById('closeCart').onclick = function() {
    document.getElementById('cartModal').style.display = 'none';
};

// Remove item from cart
window.addEventListener('click', function(e) {
    if(e.target.classList.contains('removeBtn')) {
        const idx = e.target.getAttribute('data-index');
        cart.splice(idx, 1);
        updateCartCount();
        renderCart();
    }
});

// Optional: close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
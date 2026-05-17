const API_URL = 'http://localhost:5000/api/products';

async function fetchProducts() {
    const res = await fetch(API_URL);
    const products = await res.json();
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${p.name}</h3>
            <img src="${p.image_url}" alt="${p.name}" width="150" />
            <p>${p.description}</p>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(div);
    });
}

async function fetchCart() {
    const res = await fetch(`${API_URL}/cart`);
    const cartItems = await res.json();
    const container = document.getElementById('cart');
    container.innerHTML = '';
    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${item.name} x <input type="number" value="${item.quantity}" onchange="updateCart(${item.cart_id}, this.value)"></p>
            <button onclick="deleteCart(${item.cart_id})">Remove</button>
        `;
        container.appendChild(div);
    });
}

async function addToCart(productId) {
    await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity: 1 })
    });
    fetchCart();
}

async function updateCart(cartId, quantity) {
    await fetch(`${API_URL}/cart/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
    });
    fetchCart();
}

async function deleteCart(cartId) {
    await fetch(`${API_URL}/cart/${cartId}`, { method: 'DELETE' });
    fetchCart();
}

fetchProducts();
fetchCart();
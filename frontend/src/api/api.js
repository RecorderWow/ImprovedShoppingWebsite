const API_URL = "http://localhost:5000/api";

export async function getProducts(search = "") {
    const res = await fetch(`${API_URL}/products?search=${search}`);
    return res.json();
}

export async function getCart() {
    const res = await fetch(`${API_URL}/products/cart`);
    return res.json();
}

export async function addToCart(productId) {
    await fetch(`${API_URL}/products/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });
}
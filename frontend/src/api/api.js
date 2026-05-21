const API_URL = "http://localhost:5000/api";

// GET PRODUCTS
export async function getProducts(search = "") {
    const res = await fetch(
        `${API_URL}/products?search=${search}`
    );

    return res.json();
}

// ADD TO CART
export async function addToCart(productId) {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/products/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            product_id: productId,
            quantity: 1,
        }),
    });
}

// GET CART
export async function getCart() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/products/cart`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.json();
}

// UPDATE CART ITEM
export async function updateCart(cartId, quantity) {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/products/cart/${cartId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
    });
}

// DELETE CART ITEM
export async function deleteCart(cartId) {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/products/cart/${cartId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
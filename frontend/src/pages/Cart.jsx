import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/products";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    async function loadCart() {
        try {
            setError("");

            const res = await fetch(`${API}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!Array.isArray(data)) {
                setError(data.error || "Failed to load cart");
                setCart([]);
                return;
            }

            setCart(data);

        } catch (err) {
            setError("Server error");
            setCart([]);
        }
    }

    useEffect(() => {
        // BLOCK UNAUTHENTICATED USERS
        if (!token) {
            setCart([]);
            setError("");
            return;
        }

        loadCart();
    }, [token]);

    async function updateQuantity(id, quantity) {
        const token = localStorage.getItem("token");

        await fetch(`${API}/cart/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity }),
        });

        loadCart();
    }

    async function removeItem(id) {
        const token = localStorage.getItem("token");

        await fetch(`${API}/cart/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        loadCart();
    }

    // NOT LOGGED IN VIEW
    if (!token) {
        return (
            <div style={{ padding: 20 }}>
                <h2>You must be logged in to view your cart</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Your Cart</h1>

            {error && (
                <div style={{ color: "red", marginBottom: 10 }}>
                    {error}
                </div>
            )}

            {cart.length === 0 && !error && (
                <p>Your cart is empty.</p>
            )}

            {cart.map((item) => (
                <div key={item.cart_id} style={styles.item}>
                    <div>
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>
                    </div>

                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                            updateQuantity(item.cart_id, e.target.value)
                        }
                    />

                    <button onClick={() => removeItem(item.cart_id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}

const styles = {
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        marginBottom: 10,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
};
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/products";

export default function Cart() {
    const [cart, setCart] = useState([]);

    async function loadCart() {
        const res = await fetch(`${API}/cart`);
        const data = await res.json();
        setCart(data);
    }

    useEffect(() => {
        loadCart();
    }, []);

    async function updateQuantity(id, quantity) {
        await fetch(`${API}/cart/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
        });

        loadCart();
    }

    async function removeItem(id) {
        await fetch(`${API}/cart/${id}`, { method: "DELETE" });
        loadCart();
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>Your Cart</h1>

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
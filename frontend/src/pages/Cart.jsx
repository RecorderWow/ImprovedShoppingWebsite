import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/products";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));

    // LOAD CART
    async function loadCart(currentToken) {
        try {
            setError("");

            const res = await fetch(`${API}/cart`, {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to load cart");
                setCart([]);
                return;
            }

            setCart(data);

        } catch (err) {
            console.error(err);
            setError("Server error");
            setCart([]);
        }
    }

    // INIT + TOKEN WATCHER
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        setToken(storedToken);

        if (!storedToken) {
            setCart([]);
            setError("");
            return;
        }

        loadCart(storedToken);

    }, []);

    // UPDATE QUANTITY
    async function updateQuantity(id, quantity) {
        const currentToken = localStorage.getItem("token");

        if (!currentToken) return;

        const res = await fetch(`${API}/cart/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken}`,
            },
            body: JSON.stringify({
                quantity: Number(quantity),
            }),
        });

        if (!res.ok) {
            console.error("Failed to update cart");
            return;
        }

        loadCart(currentToken);
    }

    // REMOVE ITEM
    async function removeItem(id) {
        const currentToken = localStorage.getItem("token");

        if (!currentToken) return;

        const res = await fetch(`${API}/cart/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${currentToken}`,
            },
        });

        if (!res.ok) {
            console.error("Failed to delete item");
            return;
        }

        loadCart(currentToken);
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

            {/* ERROR */}
            {error && (
                <div style={{ color: "red", marginBottom: 10 }}>
                    {error}
                </div>
            )}

            {/* EMPTY STATE */}
            {cart.length === 0 && !error && (
                <p>Your cart is empty.</p>
            )}

            {/* CART ITEMS */}
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
                            updateQuantity(
                                item.cart_id,
                                Number(e.target.value)
                            )
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
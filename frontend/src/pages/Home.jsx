import { useEffect, useState } from "react";
import { addToCart } from "../api/api";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState("");

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "40px",
        padding: "60px",
    };

    const styles = {
        toast: {
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#111",
            color: "white",
            padding: "12px 18px",
            borderRadius: "6px",
            fontSize: "14px",
            letterSpacing: "1px",
            zIndex: 9999,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        },
    };

    useEffect(() => {
        loadProducts();
    }, [search]);

    async function loadProducts() {
        try {
            const res = await fetch(
                `http://localhost:5000/api/products?search=${search}`
            );
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("ERROR FETCHING PRODUCTS:", err);
        }
    }

    async function handleAdd(id) {
        const token = localStorage.getItem("token");

        try {
            // NOT LOGGED IN
            if (!token) {
                setToast("Please log in to add items to cart");

                setTimeout(() => {
                    setToast("");
                }, 2000);

                return;
            }

            // LOGGED IN
            await addToCart(id);

            setToast("Added to cart ");

            setTimeout(() => {
                setToast("");
            }, 2000);

        } catch (err) {
            setToast("Failed to add item");

            setTimeout(() => {
                setToast("");
            }, 2000);
        }
    }

    return (
        <>
            <Hero />

            {/* TOAST NOTIFICATION */}
            {toast && <div style={styles.toast}>{toast}</div>}

            <div style={{ padding: "40px 60px 0" }}>
                <h1>VOUGHT Favorites</h1>

                {/* LIVE SEARCH */}
                <input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: "12px",
                        width: "100%",
                        marginTop: "20px",
                        marginBottom: "40px",
                        border: "1px solid #ccc",
                        background: "transparent",
                        fontSize: "16px",
                    }}
                />
            </div>

            {/* PRODUCT GRID */}
            <div style={grid}>
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onAdd={handleAdd}
                    />
                ))}
            </div>
        </>
    );
}
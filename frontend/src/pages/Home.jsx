import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/api";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const grid = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "40px",
        padding: "60px",
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
        await addToCart(id);
        alert("Added to cart");
    }

    return (
        <>
            <Hero />

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
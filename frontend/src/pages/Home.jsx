import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

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
        <div style={{ padding: 20 }}>
            <h1>Products</h1>

            {/* LIVE SEARCH */}
            <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: 10, width: "100%", marginBottom: 20 }}
            />

            {/* PRODUCT GRID */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 20,
                }}
            >
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={handleAdd} />
                ))}
            </div>
        </div>
    );
}
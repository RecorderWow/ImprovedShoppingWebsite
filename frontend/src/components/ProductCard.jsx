export default function ProductCard({ product, onAdd }) {
    return (
        <div style={styles.card}>
            <img src={product.image_url} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p style={styles.desc}>{product.description}</p>
            <p style={styles.price}>${product.price}</p>

            <button onClick={() => onAdd(product.id)} style={styles.button}>
                Add to Cart
            </button>
        </div>
    );
}

const styles = {
    card: {
        background: "#fff",
        padding: 15,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    image: {
        width: "100%",
        height: 180,
        objectFit: "cover",
        borderRadius: 10,
    },
    desc: {
        fontSize: 12,
        color: "#666",
    },
    price: {
        fontWeight: "bold",
        marginTop: 5,
    },
    button: {
        marginTop: 10,
        padding: "8px 12px",
        background: "#111",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
    },
};
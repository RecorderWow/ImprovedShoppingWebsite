export default function ProductCard({ product, onAdd }) {
    return (
        <div style={styles.card}>
            <img src={product.image_url} style={styles.img} />

            <div style={styles.info}>
                <h3>{product.name}</h3>
                <p>${product.price}</p>

                <button onClick={() => onAdd(product.id)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

const styles = {
    card: {
        cursor: "pointer",
    },
    img: {
        width: "100%",
        height: "400px",
        objectFit: "cover",
        marginBottom: "10px",
    },
    info: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
};
export default function Navbar({ setPage }) {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>ClothingStore</h2>

            <div style={styles.links}>
                <button onClick={() => setPage("home")}>Home</button>
                <button onClick={() => setPage("cart")}>Cart</button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        background: "#111",
        color: "white",
        alignItems: "center",
    },
    logo: {
        margin: 0,
        letterSpacing: "2px",
    },
    links: {
        display: "flex",
        gap: "20px",
    },
};
export default function Navbar({ setPage }) {
    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>THE VOUGHT STORE</h2>

            <div style={styles.links}>
                <span onClick={() => setPage("home")}>Shop</span>
                <span onClick={() => setPage("cart")}>Cart</span>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "30px 60px",
        alignItems: "center",
    },
    logo: {
        fontSize: "22px",
        letterSpacing: "3px",
    },
    links: {
        display: "flex",
        gap: "40px",
        fontSize: "14px",
        textTransform: "uppercase",
        cursor: "pointer",
    },
};
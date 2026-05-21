import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ setPage }) {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={styles.nav}>
            {/* LOGO */}
            <h2
                style={styles.logo}
                onClick={() => setPage("home")}
            >
                THE VOUGHT STORE
            </h2>

            {/* NAV LINKS */}
            <div style={styles.links}>

                <span onClick={() => setPage("home")}>
                    Shop
                </span>

                <span onClick={() => setPage("cart")}>
                    Cart
                </span>

                {/* ADMIN ONLY */}
                {user?.is_admin && (
                    <span onClick={() => setPage("admin")}>
                        Admin
                    </span>
                )}

                {/* AUTH SECTION */}
                {user ? (
                    <>
                        <span style={styles.user}>
                            {user.username}
                        </span>

                        <span
                            onClick={() => {
                                logout();
                                setPage("login");
                            }}
                            style={styles.authBtn}
                        >
                            Logout
                        </span>
                    </>
                ) : (
                    <>
                        <span
                            onClick={() => setPage("login")}
                            style={styles.authBtn}
                        >
                            Login
                        </span>

                        <span
                            onClick={() => setPage("register")}
                            style={styles.authBtn}
                        >
                            Register
                        </span>
                    </>
                )}
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
        borderBottom: "1px solid #eee",
        background: "#f6f3ef",
    },

    logo: {
        fontSize: "22px",
        letterSpacing: "3px",
        fontFamily: "serif",
        cursor: "pointer",
    },

    links: {
        display: "flex",
        gap: "35px",
        fontSize: "13px",
        textTransform: "uppercase",
        cursor: "pointer",
        alignItems: "center",
    },

    user: {
        fontSize: "13px",
        opacity: 0.7,
        marginLeft: "10px",
    },

    authBtn: {
        fontSize: "13px",
        cursor: "pointer",
        borderBottom: "1px solid transparent",
        transition: "0.2s",
    },
};
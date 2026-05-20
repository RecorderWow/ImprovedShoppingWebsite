import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login({ setPage }) {
    const { login: authLogin } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError(""); // clear previous errors

        const data = await login(username, password);

        if (data.token) {
            authLogin(data);
            setPage("home"); // optional: redirect after login
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome Back</h1>
                <p style={styles.subtitle}>
                    Sign in to continue your experience
                </p>

                <input
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    style={styles.input}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={styles.button} onClick={handleLogin}>
                    Sign In
                </button>

                {/* ERROR MESSAGE */}
                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <p style={styles.footer}>
                    New here?{" "}
                    <span
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => setPage("register")}
                    >
                        Create an account
                    </span>
                </p>
            </div>
        </div>
    );
}

const styles = {
    page: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f3ef",
        fontFamily: "serif",
    },

    card: {
        width: "350px",
        padding: "40px",
        background: "white",
        border: "1px solid #eee",
        textAlign: "center",
    },

    title: {
        fontSize: "32px",
        marginBottom: "10px",
        letterSpacing: "1px",
    },

    subtitle: {
        fontSize: "14px",
        marginBottom: "30px",
        opacity: 0.6,
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ddd",
        background: "transparent",
        fontSize: "14px",
        outline: "none",
    },

    button: {
        width: "100%",
        padding: "12px",
        background: "#111",
        color: "white",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
        letterSpacing: "1px",
    },

    error: {
        marginTop: "15px",
        padding: "10px",
        fontSize: "13px",
        color: "#b00020",
        background: "#ffe6e6",
        border: "1px solid #ffb3b3",
    },

    footer: {
        marginTop: "20px",
        fontSize: "12px",
        opacity: 0.6,
        cursor: "pointer",
    },
};
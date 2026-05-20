import { useState } from "react";
import { register } from "../api/auth";

export default function Register({ setPage }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setError("");
        setSuccess("");

        // FRONTEND VALIDATION
        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (username.trim().length < 3) {
            setError("Username must be at least 3 characters");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            const data = await register(username, password);

            if (data.id) {
                setSuccess("Account created successfully!");

                // clear inputs
                setUsername("");
                setPassword("");

                // redirect to login after short delay
                setTimeout(() => {
                    setPage("login");
                }, 1000);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Create Account</h1>

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

            <button
                style={{
                    ...styles.button,
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                }}
                onClick={handleRegister}
                disabled={loading}
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            {error && <div style={styles.error}>{error}</div>}
            {success && <div style={styles.success}>{success}</div>}
        </div>
    );
}

const styles = {
    container: {
        padding: "60px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "serif",
    },

    title: {
        marginBottom: "30px",
        fontSize: "32px",
        letterSpacing: "1px",
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
        fontSize: "14px",
        letterSpacing: "1px",
        marginTop: "10px",
    },

    error: {
        marginTop: "15px",
        padding: "10px",
        fontSize: "13px",
        color: "#b00020",
        background: "#ffe6e6",
        border: "1px solid #ffb3b3",
    },

    success: {
        marginTop: "15px",
        padding: "10px",
        fontSize: "13px",
        color: "#1b5e20",
        background: "#e8f5e9",
        border: "1px solid #a5d6a7",
    },
};
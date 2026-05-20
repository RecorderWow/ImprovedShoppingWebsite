import { useState } from "react";
import { register } from "../api/auth";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        const data = await register(username, password);

        if (data.id) {
            alert("Account created successfully!");
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Create Account</h1>

            <input
                style={styles.input}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                style={styles.input}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button} onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}

const styles = {
    container: {
        padding: "60px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
    },
    title: {
        marginBottom: "30px",
        fontFamily: "serif",
        fontSize: "32px",
    },
    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        background: "transparent",
        fontSize: "16px",
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#111",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
    },
};
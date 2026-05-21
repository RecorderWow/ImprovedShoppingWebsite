import { useEffect, useState } from "react";

export default function Admin() {
    const [data, setData] = useState({});

    async function loadData() {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await res.json();

        // GROUP BY USERNAME
        const grouped = {};

        json.forEach((item) => {
            if (!grouped[item.username]) {
                grouped[item.username] = [];
            }

            grouped[item.username].push({
                name: item.name,
                quantity: item.quantity,
            });
        });

        setData(grouped);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ padding: 40 }}>
            <h1>Admin Dashboard</h1>

            {Object.keys(data).map((username) => (
                <div key={username} style={styles.card}>
                    <h2 style={styles.userTitle}>
                        {username}
                    </h2>

                    {data[username].length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        data[username].map((item, i) => (
                            <div key={i} style={styles.item}>
                                <p>{item.name}</p>
                                <span>Qty: {item.quantity}</span>
                            </div>
                        ))
                    )}
                </div>
            ))}
        </div>
    );
}

const styles = {
    card: {
        padding: 20,
        marginBottom: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        background: "#fff",
    },

    userTitle: {
        marginBottom: 10,
        fontSize: "18px",
        borderBottom: "1px solid #eee",
        paddingBottom: 5,
    },

    item: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        fontSize: "14px",
    },
};
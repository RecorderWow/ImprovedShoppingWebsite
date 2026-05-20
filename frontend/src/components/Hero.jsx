export default function Hero() {
    return (
        <section style={styles.hero}>
            <div style={styles.overlay}>
                <h1 style={styles.title}>The Seven Classics</h1>

                <p style={styles.subtitle}>
                    Pieces Choosen by Our Heroes from The Seven
                </p>

                <button style={styles.button}>
                    Explore Collection
                </button>
            </div>
        </section>
    );
}

const styles = {
    hero: {
        height: "80vh",
        backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/048/990/786/large_2x/trendy-male-model-in-an-istt-suit-with-a-slate-blue-background-stylish-portrait-showcasing-modern-and-sophisticated-males-fashion-choices-free-photo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    overlay: {
        textAlign: "center",
        color: "white",
        background: "rgba(0,0,0,0.25)",
        padding: "40px",
        borderRadius: "12px",
    },

    title: {
        fontSize: "72px",
        marginBottom: "10px",
        letterSpacing: "2px",
    },

    subtitle: {
        fontSize: "18px",
        marginBottom: "20px",
    },

    button: {
        padding: "12px 24px",
        fontSize: "16px",
        background: "white",
        color: "black",
        border: "none",
        cursor: "pointer",
    },
};
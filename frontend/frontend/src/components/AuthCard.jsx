const AuthCard = ({ title, children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
  },
  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  }
};

export default AuthCard;

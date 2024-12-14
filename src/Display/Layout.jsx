import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };
  const handleDashboard = () => navigate('/admin-dashboard');
  const handleEnrollment = () => navigate('/enrollment'); 
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin</h2>
        <div style={styles.navLinks}>
        <a style={styles.link} onClick={handleDashboard}>Dashboard</a>
          <a href="/subject-details" style={styles.link}>
            Subject
          </a>
          <a href="/student-details" style={styles.link}>
            Student
          </a>
          <a href="/staff-details" style={styles.link}>
            Staff
          </a>
          <a href="/assign" style={styles.link}>
            Assign Staffs
          </a>
          <a style={styles.link} onClick={handleEnrollment}>Enrollment</a>
        </div>

        <button onClick={goToHome} style={styles.goHomeButton}>
          Home
        </button>
      </div>

      <div style={styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f4f7fc",
  },
  sidebar: {
    width: "150px",
    backgroundColor: "#ffffff",
    padding: "20px 30px",
    boxShadow: "2px 0 6px rgba(0, 0, 0, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "95%",
  },
  sidebarTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
  },
  navLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  link: {
    fontSize: "16px",
    color: "#333",
    textDecoration: "none",
    transition: "color 0.3s ease, transform 0.3s ease",
    fontWeight: "500",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  linkHover: {
    color: "#007bff",
    transform: "scale(1.05)",
  },
  goHomeButton: {
    marginTop: "auto",
    padding: "12px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
    zIndex: 1,
  },
  goHomeButtonHover: {
    backgroundColor: "#0056b3",
  },
  contentArea: {
    flex: 1,
    marginLeft: "215px", 
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginTop: "6px",
    overflowY: "auto",
    marginBottom: "6px",
    marginRight: "6px"
  },
};

export default Layout;

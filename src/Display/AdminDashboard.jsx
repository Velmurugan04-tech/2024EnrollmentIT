import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function I1() {
  const navigate = useNavigate();
  const [enrollmentStatus, setEnrollmentStatus] = useState("inactive");

  const handleDashboard = () => navigate('/admin-dashboard');
  const handleSubject = () => navigate('/subject-details');
  const handleStudent = () => navigate('/student-details');
  const handleStaff = () => navigate('/staff-details');
  const handleAssign = () => navigate('/assign');
  const handleEnrollment = () => navigate('/enrollment');

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin</h2>
        <div style={styles.navLinks}>
        <a style={styles.link} onClick={handleDashboard}>Dashboard</a>
          <a style={styles.link} onClick={handleSubject}>Subject</a>
          <a style={styles.link} onClick={handleStudent}>Student</a>
          <a style={styles.link} onClick={handleStaff}>Staff</a>
          <a style={styles.link} onClick={handleAssign}>Assign Staffs</a>
          <a style={styles.link} onClick={handleEnrollment}>Enrollment</a>
        </div>
        <button
          style={styles.goHomeButton}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = styles.goHomeButtonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = styles.goHomeButton.backgroundColor)
          }
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
      <div style={styles.contentArea}>
        <h3 style={styles.head}>Welcome to the Admin Panel</h3>
        <p style={styles.text}>Select a section from the menu to view its details.</p>
      </div>
    </div>
  );
}

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

export default I1;

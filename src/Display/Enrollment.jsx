import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Enrollment() {
  const navigate = useNavigate();
  const [enrollmentStatus, setEnrollmentStatus] = useState("inactive");
  const [semester, setSemester] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = 'http://localhost:8080';

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/enrollment/status`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== undefined) {
          setEnrollmentStatus(data.status === 1 ? "active" : "inactive");
          setCurrentSemester(data.status === 1 ? data.semester : "");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        
      });
  }, []);

  const handleStartEnrollment = () => {
    if (!semester) {
      alert("Please enter a semester.");
      return;
    }
  
    console.log("Starting enrollment for semester:", semester);
  
    setLoading(true);
  
    fetch(`${baseUrl}/enrollment/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status:semester }),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setEnrollmentStatus("active");
          setCurrentSemester(semester);
          setError(`Enrollment for semester ${semester} has been started.`);
        } else {
          setError("Failed to start enrollment.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Error starting enrollment. Please try again.");
        console.error("Error:", error);
      });
  };
  
  const handleStopEnrollment = () => {
    if (!semester) {
      alert("No semester is currently active.");
      return;
    }
  
    console.log("Stopping enrollment for semester:", semester);
  
    setLoading(true);
  
    fetch(`${baseUrl}/enrollment/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ semester: semester }), 
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setEnrollmentStatus("inactive");
          setCurrentSemester("");
          setError(`Enrollment for semester ${semester} has been stopped.`);
        } else {
          setError("Failed to stop enrollment.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Error stopping enrollment. Please try again.");
        console.error("Error:", error);
      });
  };

  const handleDashboard = () => navigate('/admin-dashboard');
  const handleStudents = () => navigate('/student-details');
  const handleSubjects = () => navigate('/subject-details');
  const handleStaffs = () => navigate('/staff-details');
  const handleAssign = () => navigate('/assign');
  const handleEnrollment = () => navigate('/enrollment');

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Admin</h2>
        <div style={styles.navLinks}>
          <a style={styles.link} onClick={handleDashboard}>Dashboard</a>
          <a style={styles.link} onClick={handleSubjects}>Subject</a>
          <a style={styles.link} onClick={handleStudents}>Student</a>
          <a style={styles.link} onClick={handleStaffs}>Staff</a>
          <a style={styles.link} onClick={handleAssign}>Assign Staffs</a>
          <a style={styles.link} onClick={handleEnrollment}>Enrollment</a>
        </div>
        <button
          style={styles.goHomeButton}
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>

      <div style={styles.contentArea}>
        <h3 style={{ color: "black" }}><b>Enrollment Management</b></h3>
        <p>Current Enrollment Status: {enrollmentStatus === "active" ? `Active (Semester: ${currentSemester})` : "Inactive"}</p>

        <div style={styles.formContainer}>
          <label>
            Enter Semester:
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>

        <div style={styles.buttonContainer}>
          <button onClick={handleStartEnrollment} style={styles.button}>
            Start Enrollment
          </button>
          <button onClick={handleStopEnrollment} style={styles.button}>
            Stop Enrollment
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {error && (
          <div style={styles.alertOverlay}>
            <div style={styles.alertBox}>
              <p>{error}</p>
              <button
                style={styles.cancelBtn}
                onClick={() => setError("")}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff9800")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff9800")}
              >
                Close
              </button>
            </div>
          </div>
        )}
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
    fontWeight: "500",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  goHomeButton: {
    marginTop: "auto",
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  contentArea: {
    flex: 1,
    marginLeft: "215px",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    marginTop: "6px",
    marginBottom: "6px",
    marginRight: "6px",
  },
  formContainer: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    width: "200px",
    marginLeft: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  alertOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  cancelBtn: {
    padding: "10px 15px",
    fontSize: "14px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    
  },
};

export default Enrollment;

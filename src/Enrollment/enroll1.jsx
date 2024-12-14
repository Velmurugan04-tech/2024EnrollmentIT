import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EnrollmentPage = () => {
  const { rollNumber } = useParams();
  const [studentDetails, setStudentDetails] = useState({});
  const [subjectStaffDetails, setSubjectStaffDetails] = useState([]);
  const [enrolledSubjects, setEnrolledSubjects] = useState(new Set());
  const [studentId, setStudentId] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/students/get-student/${rollNumber}`
        );
        setStudentDetails(response.data);
        setStudentId(response.data.id);
        const subjectsResponse = await axios.get(
          `http://localhost:8080/admin/get-sub?year=${response.data.yearOfStudy}&semester=${response.data.semester}`
        );
        setSubjectStaffDetails(subjectsResponse.data);

        const enrolledResponse = await axios.get(
          `http://localhost:8080/enroll/get-enrolled-subjects1/${response.data.id}`
        );
        const enrolledIds = new Set(enrolledResponse.data);
        setEnrolledSubjects(enrolledIds);
      } catch (error) {
        console.error('Error fetching details:', error);
        alert('Error fetching data. Please try again.');
      }
    };

    fetchStudentDetails();
  }, [rollNumber]);

  const SuccessAlert = ({ message, onClose }) => {
    return (
      <div style={styles.alertOverlay}>
        <div style={styles.alertBox}>
          <p>{message}</p>
          <button
            style={styles.cancelBtn}
            onClick={onClose}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.cancelBtnHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.cancelBtn.backgroundColor)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleShowAlert = (message) => {
    setMessage(message || 'Enrollment completed successfully!');
    setShowAlert(true);
  };

  const handleEnroll = async (subjectId, staffId) => {
    if (!studentId) {
      console.error('Student ID is not available');
      alert('Student ID is missing. Please try again.');
      return;
    }

    if (enrolledSubjects.has(subjectId)) {
      alert('You have already enrolled in this subject.');
      return;
    }

    try {
      const enrollmentData = { studentId, subjectId, staffId };
      const response = await axios.post(`http://localhost:8080/enroll/subjects`, enrollmentData);

      setEnrolledSubjects(new Set(enrolledSubjects.add(subjectId)));
      handleShowAlert(response.data);
     // alert(response.data.message || 'Enrolled successfully!');
    } catch (error) {
      console.error('Enrollment failed:', error);
      //alert('Failed to enroll. Please try again.');
      handleShowAlert('Failed to enroll. Please try again.');
    }
  };

  
  
  const handleUnenroll = async (subjectId) => {
    if (!studentId) {
      console.error('Student ID is not available');
      handleShowAlert('Student ID is missing. Please try again.');
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/enroll/remove-subject/${studentId}/${subjectId}`
      );

      setEnrolledSubjects((prev) => {
        const updated = new Set(prev);
        updated.delete(subjectId);
        return updated;
      });

      handleShowAlert(response.data.message || 'Unenrolled successfully!');
    } catch (error) {
      console.error('Unenrollment failed:', error);
      handleShowAlert('Failed to unenroll. Please try again.');
    }
  };

  const navigateToEnrolledSubjects = () => {
    navigate(`/enrolled-subjects/${studentId}`);
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f7f7f7',
      minHeight: '100vh',
      boxSizing: 'border-box',
    },
    header: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#f17960',
      marginBottom: '20px',
      textAlign: 'center',
    },
    info: {
      fontSize: '1.2rem',
      color: '#333',
      marginBottom: '20px',
    },
    table: {
      width: '100%',
      maxWidth: '900px',
      borderCollapse: 'collapse',
      marginTop: '30px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
      backgroundColor: '#e15132',
      color: 'white',
      fontSize: '1.1rem',
      textAlign: 'left',
      padding: '15px',
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: '12px 20px',
      textAlign: 'left',
      fontSize: '1rem',
      color: '#333',
    },
    enrollButton: {
      backgroundColor: '#e15132',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    enrollButtonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
    },
    unenrollButton: {
      backgroundColor: '#ff4d4d',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    alertOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    alertBox: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
    },
    cancelBtn: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '15px',
    },
    cancelBtnHover: {
      backgroundColor: '#d32f2f',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Enrollment Page</h1>
      <div style={styles.info}>
        <p>Year: {studentDetails.yearOfStudy}</p>
        <p>Semester: {studentDetails.semester}</p>
      </div>

      <button onClick={navigateToEnrolledSubjects} style={styles.enrollButton}>
        View Enrolled Subjects
      </button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Subject</th>
            <th style={styles.tableHeader}>Staff</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjectStaffDetails.length === 0 ? (
            <tr>
              <td colSpan="3" style={styles.tableCell}>
                No subjects available
              </td>
            </tr>
          ) : (
            subjectStaffDetails.map((subject) =>
              subject.staff.map((staff, staffIndex) => (
                <tr key={`${subject.subjectId}-${staff.staffId}`} style={styles.tableRow}>
                  {staffIndex === 0 && (
                    <td rowSpan={subject.staff.length} style={styles.tableCell}>
                      {subject.name}
                    </td>
                  )}
                  <td style={styles.tableCell}>{staff.name}</td>
                  <td style={styles.tableCell}>
                    {enrolledSubjects.has(subject.id) ? (
                      <button
                        onClick={() => handleUnenroll(subject.id)}
                        style={styles.unenrollButton}
                      >
                        Unenroll
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEnroll(subject.id, staff.id)}
                        style={styles.enrollButton}
                      >
                        Enroll
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>

      {showAlert && <SuccessAlert message={message} onClose={handleClose} />}
    </div>
  );
};

export default EnrollmentPage;

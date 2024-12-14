import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function EnrollmentNotStarted() {
  const location = useLocation();
  const [semester, setSemester] = useState(null);
  const [rollNumber, setRollNumber] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roll = queryParams.get('rollNumber');
    const sem = queryParams.get('semester');
    
    if (roll && sem) {
      setRollNumber(roll);
      setSemester(sem);
    }
  }, [location]);

  useEffect(() => {
    console.log('Location:', location);
    console.log('Roll Number:', rollNumber);
    console.log('Semester:', semester);
  }, [location, rollNumber, semester]);

  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <h1 style={styles.title}>Enrollment Not Started</h1>
        <p style={styles.message}>
          The enrollment process has not started yet. Please check back later or contact the administrator for more details.
        </p>
        
        {semester && rollNumber ? (
          <div>
            <p style={styles.semesterMessage}>
              Your Semester: <strong>{semester}</strong>
            </p>
            <p style={styles.rollNumberMessage}>
              Your Roll Number: <strong>{rollNumber}</strong>
            </p>
          </div>
        ) : (
          <p style={styles.message}>No enrollment details available.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    fontFamily: "'Poppins', sans-serif",
  },
  messageBox: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
    padding: '40px 60px',
    borderRadius: '12px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.6',
  },
  semesterMessage: {
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
  },
  rollNumberMessage: {
    fontSize: '18px',
    color: '#333',
    marginTop: '10px',
  },
};

export default EnrollmentNotStarted;

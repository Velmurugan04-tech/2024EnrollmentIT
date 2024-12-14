import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignSubjectStaff = () => {
  const [subjects, setSubjects] = useState([]);
  const [staff, setStaff] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStaff, setSelectedStaff] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectResponse = await axios.get('http://localhost:8080/admin/sub'); // URL to fetch subjects
        setSubjects(subjectResponse.data);

        const staffResponse = await axios.get('http://localhost:8080/staff/disp-staff'); // URL to fetch staff
        setStaff(staffResponse.data);

      } catch (error) {
        setError('Failed to fetch data. Check console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedSubject || selectedStaff.length === 0) {
      alert('Please select both subject and at least one staff.');
      return;
    }

    const assignmentData = {
      subjectId: selectedSubject,
      staffIds: selectedStaff,
    };
    try {
      await axios.post('http://localhost:8080/admin/assign-subject', assignmentData);
      alert('Subject assigned to staff successfully!');
      setSelectedSubject('');
      setSelectedStaff([]);
    } catch (error) {
      console.error('Error assigning subject:', error);
      if (error.response && error.response.data) {
        alert(`Failed to assign subject: ${error.response.data.message}`);
      } else {
        alert('Failed to assign subject. Check console for details.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleCheckboxChange = (e, staffId) => {
    if (e.target.checked) {
      setSelectedStaff([...selectedStaff, staffId]);
    } else {
      setSelectedStaff(selectedStaff.filter((id) => id !== staffId));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Assign Subject to Staff</h2>

      <div style={styles.formGroup}>
        <label htmlFor="subject">Select Subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={styles.select}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.formGroup}>
        <label>Select Staff:</label>
        <div style={styles.checkboxContainer}>
          {staff.map((staffMember) => (
            <div key={staffMember.id} style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id={`staff-${staffMember.id}`}
                value={staffMember.id}
                onChange={(e) => handleCheckboxChange(e, staffMember.id)}
                style={styles.checkbox}
              />
              <label htmlFor={`staff-${staffMember.id}`} style={styles.checkboxLabel}>
                {staffMember.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleAssign} style={styles.button}>
        Assign
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
    border: 'black',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
  },
  formGroup: {
    marginBottom: '20px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ffcc00',
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxGroup: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '10px',
    accentColor: '#ffcc00',
  },
  checkboxLabel: {
    fontSize: '16px',
    color: '#333',
  },
  button: {
    padding: '12px 25px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#ff9800',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    width: '20%',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#ff5722',
  },
};



export default AssignSubjectStaff;

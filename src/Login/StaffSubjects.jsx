import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';

const StaffSubjects = () => {
  const { staffId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [subject, setSubject] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/staff/${staffId}/subjects`);
        console.log('Subjects Response:', response.data);

        if (response.data && Array.isArray(response.data)) {
          setSubjects(response.data);
        } else {
          setError('No subjects found for this staff.');
        }
      } catch (error) {
        setError('Error fetching subjects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [staffId]);

  useEffect(() => {
    if (selectedSubjectId) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/enroll/${staffId}/subject/${selectedSubjectId}/students`
          );
          console.log('Students Response:', response.data);

          if (response.data && Array.isArray(response.data)) {
            setStudents(response.data);
          } else {
            setError('No students found for this subject.');
          }
        } catch (error) {
          setError('Error fetching students. Please try again later.');
        }
      };

      fetchStudents();
    }
  }, [selectedSubjectId, staffId]);

  const downloadCSV = () => {
    const csvData = students.map((student) => ({
      'Student Name': student.name,
      'Register Number': student.rollNumber,
    }));

    const csvFileName = `${subject} (${subjectCode}) - Student List.csv`;

    const csv = Papa.unparse({
      fields: ['Student Name', 'Register Number'],
      data: csvData,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', csvFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="subjects-container">
      <h2>Student Details</h2>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="subjects-list">
        {subjects.length > 0 ? (
          subjects.map((subjectItem) => (
            <div key={subjectItem.id || subjectItem.name} className="subject-card">
              <h3>{subjectItem.name} ({subjectItem.subjectCode})</h3>
              <button
                className="view-btn"
                onClick={() => {
                  setSelectedSubjectId(subjectItem.id);
                  setSubject(subjectItem.name);
                  setSubjectCode(subjectItem.subjectCode);
                }}
              >
                View Students Enrolled
              </button>
            </div>
          ))
        ) : (
          <p>No subjects found for this staff.</p>
        )}
      </div>

      {selectedSubjectId && (
        <div className="students-list">
          <h4>Students Enrolled in {subject} ({subjectCode}):</h4>
          {students.length > 0 ? (
            students.map((student) => (
              <div key={student.id || student.rollNumber} className="student-card">
                <h5>{student.name} ({student.rollNumber})</h5>
              </div>
            ))
          ) : (
            <p>No students enrolled in this subject.</p>
          )}

          <button className="download-btn" onClick={downloadCSV}>
            Download Student List
          </button>
        </div>
      )}
      <style>{`
        /* Container Styles */
        .subjects-container {
          width: 70%;
          margin: 20px auto;
          padding: 20px;
          font-family: 'Arial', sans-serif;
          background-color: #e1dfdf;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }

        .error-message {
          color: red;
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .loading {
          text-align: center;
          font-size: 1.2rem;
          color: #555;
        }

        /* Subject List Styles */
        .subjects-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }

        .subject-card {
          background: #fff;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 250px;
        }

        .subject-card h3 {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }

        .view-btn {
          padding: 8px 12px;
          background-color:orangered;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .view-btn:hover {
          background-color: #ff9700;
        }

        /* Students List Styles */
        .students-list {
          margin-top: 20px;
        }

        .student-card {
          background: #fff;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .student-card h5 {
          margin: 0;
          font-size: 1rem;
          color: #555;
        }

        .download-btn {
          display: block;
          margin: 20px auto;
          padding: 10px 15px;
          background-color: #ff9750;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
        }

        .download-btn:hover {
          background-color: #ff6750;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .subjects-container {
            width: 95%;
          }

          .subject-card {
            width: 100%;
          }

          .download-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default StaffSubjects;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EnrolledSubjects = () => {
  const { studentId } = useParams();
  const [subjectsData, setSubjectsData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!studentId) {
      console.log('No student ID provided.');
      return;
    }

    const fetchEnrolledSubjects = async () => {
      try {
        const enrolledResponse = await axios.get('http://localhost:8080/enroll/get-id', {
          params: { studentId },
        });

        if (enrolledResponse.data.length === 0) {
          setError('No subjects found for this student.');
          return;
        }

        const subjectStaffPromises = enrolledResponse.data.map(async (enrollment) => {
          const { subjectId, staffId } = enrollment;
          try {
            const subjectStaffResponse = await axios.get('http://localhost:8080/enroll/get-subject-staff', {
              params: { subjectId, staffId },
            });
            return subjectStaffResponse.data;
          } catch (err) {
            console.error('Error fetching subject-staff data:', err);
            return null;
          }
        });

        const subjectStaffDetails = await Promise.all(subjectStaffPromises);
        setSubjectsData(subjectStaffDetails.filter((item) => item !== null));
      } catch (err) {
        console.error('Error fetching enrolled subjects:', err);
        setError('Error fetching enrolled subjects');
      }
    };

    fetchEnrolledSubjects();
  }, [studentId]);

  const handleDownloadCSV = () => {
    if (subjectsData.length === 0) {
      alert('No data available to download.');
      return;
    }

    const csvHeaders = ['Subject Name', 'Subject Code', 'Staff Name'];
    const csvRows = subjectsData.map(({ subjectName, subjectCode, staffName }) => {
      return `${subjectName},${subjectCode},${staffName}`;
    });

    const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'enrolled_subjects.csv';
    link.click();
  };

  const renderSubjectDetails = () => {
    if (subjectsData.length === 0) {
      return <p>No subjects found.</p>;
    }

    return (
      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Staff Name</th>
          </tr>
        </thead>
        <tbody>
          {subjectsData.map(({ subjectName, subjectCode, staffName }, index) => (
            <tr key={index}>
              <td>{subjectName}</td>
              <td>{subjectCode}</td>
              <td>{staffName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2><center>Enrolled Subjects</center></h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {renderSubjectDetails()}
      <button onClick={handleDownloadCSV} className="download-btn">
        Download as CSV
      </button>
      <style>{`
        .subject-table {
          margin: 20px auto;
          border-collapse: collapse;
          width: 60%;
          font-family: Arial, sans-serif;
        }

        .subject-table th, .subject-table td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        .subject-table th {
          background-color: #f4f4f4;
          font-weight: bold;
        }

        .subject-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .subject-table tr:hover {
          background-color: #e9e9e9;
        }

        .download-btn {
          margin-top: 20px;
          padding: 10px 15px;
          background-color: #e15132;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          margin-left:725px;
        }

        .download-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default EnrolledSubjects;

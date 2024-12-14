import React, { useState } from 'react';
import axios from 'axios';

const AddSubject = () => {
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddSubject = async (event) => {
    event.preventDefault();

    const subjectData = {
      name,
      semester,
      subjectCode,
      year
    };

    try {
      const response = await axios.post('http://localhost:8080/admin/add-subject', subjectData, {
        headers: {
            'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setSuccess('Subject added successfully');
        setError('');
        console.log('Subject Added:', response.data);
      }
    } catch (error) {
      if (error.response) {
        setError('Failed to add subject');
        setSuccess('');
      } else {
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    }
  };

  return (
    <div className="add-subject-container">
      <form onSubmit={handleAddSubject}>
        <div className="form-group">
          <label htmlFor="name">Subject Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="255"
          />
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <input
            type="number"
            id="semester"
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            min="1"
            max="10"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subjectCode">Subject Code:</label>
          <input
            type="text"
            id="subjectCode"
            name="subjectCode"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
            maxLength="255"
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            min="2020"
          />
        </div>

        <button type="submit">Add Subject</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default AddSubject;

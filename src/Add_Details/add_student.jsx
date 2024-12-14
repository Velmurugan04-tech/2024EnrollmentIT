import React, { useState } from 'react';
import axios from 'axios';

const UpdateStudentDetails = () => {
  const [id, setId] = useState('');
  const [branch, setBranch] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (event) => {
    event.preventDefault();

    const studentData = {
      id,
      branch,
      department,
      email,
      name,
      password,
      rollNumber,
      yearOfStudy
    };

    try {
      const response = await axios.post('http://localhost:8080/admin/add-student', studentData);

      if (response.status === 200) {
        setSuccess('Student details updated successfully');
        setError('');
        console.log('Update Successful:', response.data);
      }
    } catch (error) {
      if (error.response) {
        setError('Failed to update student details');
        setSuccess('');
      } else {
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    }
  };

  return (
    <div className="update-student-container">
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="id">Student ID:</label>
          <input
            type="number"
            id="id"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearOfStudy">Year of Study:</label>
          <input
            type="number"
            id="yearOfStudy"
            name="yearOfStudy"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Student Details</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default UpdateStudentDetails;

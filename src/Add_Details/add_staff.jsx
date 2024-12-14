import React, { useState } from 'react';
import axios from 'axios';

const UpdateStaffDetails = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [max_enrollment, setMaxEnrollment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdate = async (event) => {
    event.preventDefault();

    const staffData = {
      email,
      max_enrollment,
      name,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/admin/add-staff', staffData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

      if (response.status === 200) {
        setSuccess('Staff details updated successfully');
        setError('');
        console.log('Update Successful:', response.data);
      }
    } catch (error) {
      if (error.response) {
        setError('Failed to update staff details');
        setSuccess('');
      } else {
        setError('An error occurred. Please try again later.');
        setSuccess('');
      }
    }
  };

  return (
    <div className="update-staff-container">
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="id">Staff ID:</label>
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
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxEnrollment">Max Enrollment:</label>
          <input
            type="number"
            id="maxEnrollment"
            name="maxEnrollment"
            value={max_enrollment}
            onChange={(e) => setMaxEnrollment(e.target.value)}
            required
          />
        </div>

        <button type="submit">Update Staff Details</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default UpdateStaffDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    maxEnrollment: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const modalBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '500px',
    width: '100%',
  };

  const tableHeaderStyle = {
    backgroundColor: '#ff9800',
    color: 'white',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const tableCellStyle = {
    padding: '8px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  };

  const inputStyle = {
    marginTop: '5px',
    padding: '8px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const messageContainerStyle = {
    position: 'absolute',
    top: '350px',
    left: '58%',
    transform: 'translateX(-50%)',
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    display: error ? 'block' : successMessage ? 'block' : 'none',
  };

  const successMessageStyle = {
    backgroundColor: '#ff9800',
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/staff/disp-staff');
      setStaff(response.data);
    } catch (error) {
      console.error('Error fetching staff:', error);
      setError('Failed to load staff. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/add-staff', formData);
      setSuccessMessage('Staff added successfully');
      setError('');
      setShowForm(false);
      fetchStaff();
    } catch (error) {
      console.error('Error submitting staff form:', error);
      setError('Failed to add staff. Please try again later.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(`Are you sure you want to delete the staff with ID: ${id}?`);
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/admin/remove-staff/${id}`);
        setStaff((prevStaff) => prevStaff.filter((staffMember) => staffMember.id !== id));
        setSuccessMessage('Staff deleted successfully');
      } catch (error) {
        console.error('Error deleting staff:', error);
        setSuccessMessage('Failed to delete staff. Check console for details.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', email: '', maxEnrollment: '', password: '' });
    setError('');
    setSuccessMessage('');
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2><center>Staff List</center></h2>

      {(error || successMessage) && (
        <div
          style={{
            ...messageContainerStyle,
            ...(successMessage ? successMessageStyle : {}),
          }}
        >
          {error || successMessage}
        </div>
      )}

      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Max Enrollment</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.length > 0 ? (
            staff.map((staffMember, index) => (
              <tr key={staffMember.id}> {/* Use staffMember.id as the key */}
                <td style={tableCellStyle}>{staffMember.name}</td>
                <td style={tableCellStyle}>{staffMember.email}</td>
                <td style={tableCellStyle}>{staffMember.maxEnrollment}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => handleDelete(staffMember.id)} // Ensure the correct staff ID is passed
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'red',
                      fontSize: '18px',
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No staff found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <FaPlusCircle />
          Add Staff
        </button>
      </div>

      {showForm && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h3 style={{color:"black"}}>Add Staff</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>Max Enrollment:</label>
                <input
                  type="number"
                  name="maxEnrollment"
                  value={formData.maxEnrollment}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block' }}>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Add Staff
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'orange',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;

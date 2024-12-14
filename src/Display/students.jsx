import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaPlusCircle, FaTimes, FaUpload } from "react-icons/fa";

const StudentsManagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    branch: "",
    email: "",
    password: "",
    yearOfStudy: "",
    semester: "",
  });
  const [filters, setFilters] = useState({
    yearOfStudy: "",
    semester: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [file, setFile] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/display-students"
      );
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load students. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const { yearOfStudy, semester } = filters;

    const filtered = students.filter((student) => {
      const matchesYear = yearOfStudy
        ? student.yearOfStudy.toString() === yearOfStudy
        : true;
      const matchesSemester = semester
        ? student.semester.toString() === semester
        : true;

      return matchesYear && matchesSemester;
    });

    setFilteredStudents(filtered);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/admin/add-student", formData);
      setSuccessMessage("Student added successfully");
      setError("");
      setShowForm(false);
      fetchStudents();
      setFormData({
        name: "",
        rollNumber: "",
        department: "",
        branch: "",
        email: "",
        password: "",
        yearOfStudy: "",
        semester: "",
      });
    } catch (error) {
      console.error("Error submitting student form:", error);
      setError("Failed to add student. Please try again later.");
      setSuccessMessage("");
    }
  };

  const handleDelete = async (rollNumber) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete student with roll number: ${rollNumber}?`
    );
    if (confirmed) {
      try {
        await axios.delete(
          `http://localhost:8080/admin/delete-student/${rollNumber}`
        );
        setStudents(students.filter((student) => student.rollNumber !== rollNumber));
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student. Check console for details.");
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post("http://localhost:8080/admin/upload-excel", formData);
        fetchStudents();
        setSuccessMessage("File uploaded successfully");
        setError("");
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload file. Please try again later.");
        setSuccessMessage("");
      }
    } else {
      setError("Please select a file to upload.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{fontSize:"25px"}}><center>Student Management</center></h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Year of Study:
          <input
            type="text"
            name="yearOfStudy"
            value={filters.yearOfStudy}
            onChange={handleFilterChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          Semester:
          <input
            type="text"
            name="semester"
            value={filters.semester}
            onChange={handleFilterChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </label>
        <button
          onClick={applyFilters}
          style={{
            marginLeft: "20px",
            padding: "5px 10px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
        <button
          onClick={() => setFilters({ yearOfStudy: "", semester: "" })}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear Filters
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="fileUpload" style={{ marginRight: "10px" }}>
          Upload CSV:
        </label>
        <input
          type="file"
          id="fileUpload"
          accept=".csv"
          onChange={handleFileChange}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
        <button
          onClick={handleFileUpload}
          style={{
            padding: "5px 10px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          <FaUpload style={{ marginRight: "5px" }} />
          Upload File
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#ffe0b2" }}>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Roll Number</th>
            <th style={tableHeaderStyle}>Department</th>
            <th style={tableHeaderStyle}>Branch</th>
            <th style={tableHeaderStyle}>Year</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Semester</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.rollNumber} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tableCellStyle}>{student.name}</td>
                <td style={tableCellStyle}>{student.rollNumber}</td>
                <td style={tableCellStyle}>{student.department}</td>
                <td style={tableCellStyle}>{student.branch}</td>
                <td style={tableCellStyle}>{student.yearOfStudy}</td>
                <td style={tableCellStyle}>{student.email}</td>
                <td style={tableCellStyle}>{student.semester}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => handleDelete(student.rollNumber)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showForm && (
  <div style={modalBackdropStyle}>
    <div style={modalContentStyle}>
      <h3 style={{ color: "black", textAlign: "center", marginTop: "10px" }}>Add Student</h3>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {successMessage && <div style={{ color: "green", marginBottom: "10px" }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Year of Study:</label>
          <input
            type="number"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "5px" }}>
          <label style={{ display: "block", marginBottom: "0px" }}>Semester:</label>
          <input
            type="number"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "5px",
              cursor: "pointer",
              width: "40%",
            }}
          >
            Add Student
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "10px",
              width: "30%",
            }}
          >
            <FaTimes />
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <FaPlusCircle />
          Add Student
        </button>
      )}
    </div>
  );
};

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
  backgroundColor: "#ff9800",
  color: "white",
  padding: "8px",
  textAlign: "center",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "8px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

const inputStyle = {
  marginTop: '5px',
    padding: '8px',
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

export default StudentsManagement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";

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
  height:"35px" 
};

const tableCellStyle = {
  padding: "12px", 
  textAlign: "center",
  borderBottom: "1px solid #ddd",
  fontSize: "16px",
};

const inputStyle = {
  marginTop: '5px',
  padding: '8px',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  width: "48%",
};

const addButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ff9800",
  color: "white",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336",
  color: "white",
};

const SubjectsTableAndAddForm = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [semester, setSemester] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/sub");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      alert("Failed to load subjects. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSubject = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/delete-subject/${id}`
      );
      if (response.status === 200) {
        setSubjects(subjects.filter((subject) => subject.id !== id));
        alert("Subject deleted successfully.");
      } else {
        alert(`Failed to delete subject. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Failed to delete subject.");
    }
  };

  const handleAddSubject = async (event) => {
    event.preventDefault();

    const subjectData = {
      name,
      semester,
      subjectCode,
      year,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/add-subject",
        subjectData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Subject added successfully");
        setError("");
        fetchSubjects(); 
        setShowAddForm(false);
      }
    } catch (error) {
      setError("Failed to add subject");
      setSuccess("");
    }
  };
  useEffect(() => {
    fetchSubjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "'Poppins', sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold", color: "#333" }}>Subject List</h2>

            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th>ID</th>
            <th>Name</th>
            <th>Subject Code</th>
            <th>Year</th>
            <th>Semester</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <tr key={subject.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tableCellStyle}>{subject.id}</td>
                <td style={tableCellStyle}>{subject.name}</td>
                <td style={tableCellStyle}>{subject.subjectCode}</td>
                <td style={tableCellStyle}>{subject.year}</td>
                <td style={tableCellStyle}>{subject.semester}</td>
                <td style={tableCellStyle}>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete subject "${subject.name}"?`
                        )
                      ) {
                        deleteSubject(subject.id);
                      }
                    }}
                    style={{ background: "none", border: "none", color: "red", cursor: "pointer", fontSize: "18px" }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", fontStyle: "italic", color: "#777" }}>No subjects found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <button
          onClick={() => setShowAddForm(true)}
          style={{ padding: "10px 20px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center" }}
        >
          <FaPlusCircle />
          Add Subject
        </button>
      </div>
      {showAddForm && (
        <div style={modalBackdropStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ textAlign: "center", color: "#333" }}>Add Subject</h3>
            <form onSubmit={handleAddSubject} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label htmlFor="name">Subject Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="semester">Semester:</label>
                <input
                  type="number"
                  id="semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="subjectCode">Subject Code:</label>
                <input
                  type="text"
                  id="subjectCode"
                  name="subjectCode"
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="year">Year:</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <button type="submit" style={addButtonStyle}>
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  style={cancelButtonStyle}
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectsTableAndAddForm;

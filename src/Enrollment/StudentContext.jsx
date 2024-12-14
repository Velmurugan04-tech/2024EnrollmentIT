import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudent = () => {
  return useContext(StudentContext);
};

export const StudentProvider = ({ children }) => {
  const [studentId1, setStudentId1] = useState(null);

  return (
    <StudentContext.Provider value={{ studentId1, setStudentId1 }}>
      {children}
    </StudentContext.Provider>
  );
};

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Enrollment from './Display/Enrollment';
import I1 from './integerate/i1';
import Admin from './Login/admin_login';
import AdminDashboard from './Display/AdminDashboard';
import Staff from './Login/staff_login';
import Student from './Login/student_login';
import EnrollmentPage from './Enrollment/enroll';
import Layout from './Display/Layout';
import Students from './Display/students';
import Subject from './Display/subjects';
import Staffs from './Display/staff';
import AddStaff from './Add_Details/add_staff';
import AddSubject from './Add_Details/add_subject';
import AddStudent from './Add_Details/add_student';
import Assign from './Display/stafftosubject';
import StaffSubjects from './Login/StaffSubjects';
import { StudentProvider } from './Enrollment/StudentContext';
import EnrolledSubjects from './Enrollment/Enrolled_details';
import EnrollmentNotStarted from './Display/NotStarted';

const App = () => {
  return (
    <StudentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<I1 />} />
          <Route path="/admin-login" element={<Admin />} />
          <Route path="/staff-login" element={<Staff />} />
          <Route path="/student-login" element={<Student />} />
          <Route path="/enrollment-not-started" element={<EnrollmentNotStarted />}/>
          <Route path="/enrollment" element={<Enrollment />} />

          <Route path="/staff/:staffId/subjects" element={<StaffSubjects />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route element={<Layout />}>
            <Route path="/student-details" element={<Students />} />
            <Route path="/subject-details" element={<Subject />} />
            <Route path="/staff-details" element={<Staffs />} />
            <Route path="/add-staff" element={<AddStaff />} />
            <Route path="/add-subject" element={<AddSubject />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/assign" element={<Assign />} />
          </Route>

          <Route path="/enrollment/subjects/:rollNumber" element={<EnrollmentPage />} />
          <Route path="/enrolled-subjects/:studentId" element={<EnrolledSubjects />} />
        </Routes>
      </Router>
    </StudentProvider>
  );
};

export default App;

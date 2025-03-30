
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import HowItWorks from '@/pages/HowItWorks';
import OnlineTraining from '@/pages/OnlineTraining';
import ParentPortal from '@/pages/ParentPortal';
import Curriculum from '@/pages/Curriculum';
import NotFound from '@/pages/NotFound';

// Management pages
import SchoolManagement from '@/pages/SchoolManagement';
import SchoolStudents from '@/pages/SchoolStudents';
import StudentManagement from '@/pages/StudentManagement';
import StudentDetails from '@/pages/StudentDetails';
import StudentAttendance from '@/pages/StudentAttendance';
import StudentPerformance from '@/pages/StudentPerformance';
import StudentReportCard from '@/pages/StudentReportCard';
import StaffManagement from '@/pages/StaffManagement';
import StaffDashboard from '@/pages/StaffDashboard';
import StaffList from '@/pages/StaffList';

// Director pages
import DirectorDashboard from '@/pages/DirectorDashboard';
import DirectorStaffManagement from '@/pages/director/StaffManagement';
import ClassStudents from '@/pages/director/ClassStudents';
import StudentReports from '@/pages/director/StudentReports';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/online-training" element={<OnlineTraining />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/curriculum" element={<Curriculum />} />
          
          {/* Management routes */}
          <Route path="/school-management" element={<SchoolManagement />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/school/:id/students" element={<SchoolStudents />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/student/:id/attendance" element={<StudentAttendance />} />
          <Route path="/student/:id/performance" element={<StudentPerformance />} />
          <Route path="/student/:id/report-card" element={<StudentReportCard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/staff-list" element={<StaffList />} />
          <Route path="/school-students" element={<SchoolStudents />} />
          
          {/* Director routes */}
          <Route path="/director-dashboard" element={<DirectorDashboard />} />
          <Route path="/director/staff" element={<DirectorStaffManagement />} />
          <Route path="/director/classes" element={<ClassStudents />} />
          <Route path="/director/reports" element={<StudentReports />} />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

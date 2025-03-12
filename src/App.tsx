
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages publiques
import Index from '@/pages/Index';
import About from '@/pages/About';
import HowItWorks from '@/pages/HowItWorks';
import OnlineTraining from '@/pages/OnlineTraining';
import Auth from '@/pages/Auth';
import ParentPortal from '@/pages/ParentPortal';
import Curriculum from '@/pages/Curriculum';
import NotFound from '@/pages/NotFound';
import Unauthorized from '@/pages/Unauthorized';

// Pages protégées
import SchoolManagement from '@/pages/SchoolManagement';
import SchoolStudents from '@/pages/SchoolStudents';
import StudentManagement from '@/pages/StudentManagement';
import StudentDetails from '@/pages/StudentDetails';
import StudentAttendance from '@/pages/StudentAttendance';
import StudentPerformance from '@/pages/StudentPerformance';
import StaffManagement from '@/pages/StaffManagement';
import StaffDashboard from '@/pages/StaffDashboard';
import StaffList from '@/pages/StaffList';
import BulkPerformance from './pages/BulkPerformance';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/online-training" element={<OnlineTraining />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Admin-only routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/school-management" element={<SchoolManagement />} />
              <Route path="/staff-management" element={<StaffManagement />} />
            </Route>
            
            {/* Teacher and Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "teacher"]} />}>
              <Route path="/school/:id/students" element={<SchoolStudents />} />
              <Route path="/student-management" element={<StudentManagement />} />
              <Route path="/student/:id" element={<StudentDetails />} />
              <Route path="/student/:id/attendance" element={<StudentAttendance />} />
              <Route path="/student/:id/performance" element={<StudentPerformance />} />
              <Route path="/bulk-performance" element={<BulkPerformance />} />
              <Route path="/staff-dashboard" element={<StaffDashboard />} />
              <Route path="/staff-list" element={<StaffList />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

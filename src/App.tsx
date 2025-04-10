
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import HowItWorks from '@/pages/HowItWorks';
import OnlineTraining from '@/pages/OnlineTraining';
import ParentPortal from '@/pages/ParentPortal';
import Curriculum from '@/pages/Curriculum';
import NotFound from '@/pages/NotFound';
import Auth from '@/pages/Auth';
import Unauthorized from '@/pages/Unauthorized';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teranga-blue"></div>
            </div>
          }>
            <Toaster />
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/online-training" element={<OnlineTraining />} />
                <Route path="/parent-portal" element={<ParentPortal />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Management routes - now accessible to everyone */}
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
                
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </Suspense>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;

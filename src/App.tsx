
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Auth from "./pages/Auth";
import SchoolManagement from "./pages/SchoolManagement";
import SchoolStudents from "./pages/SchoolStudents";
import StudentManagement from "./pages/StudentManagement";
import StaffManagement from "./pages/StaffManagement";
import StaffDashboard from "./pages/StaffDashboard";
import StaffList from "./pages/StaffList";
import OnlineTraining from "./pages/OnlineTraining";
import Curriculum from "./pages/Curriculum";
import ParentPortal from "./pages/ParentPortal";
import HowItWorks from "./pages/HowItWorks";
import StudentDetails from "./pages/StudentDetails";
import StudentAttendance from "./pages/StudentAttendance";
import StudentPerformance from "./pages/StudentPerformance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/school-management" element={
              <ProtectedRoute>
                <SchoolManagement />
              </ProtectedRoute>
            } />
            <Route path="/school-students" element={
              <ProtectedRoute>
                <SchoolStudents />
              </ProtectedRoute>
            } />
            <Route path="/student-management" element={
              <ProtectedRoute>
                <StudentManagement />
              </ProtectedRoute>
            } />
            <Route path="/student-management/details/:id" element={
              <ProtectedRoute>
                <StudentDetails />
              </ProtectedRoute>
            } />
            <Route path="/student-management/attendance/:id" element={
              <ProtectedRoute>
                <StudentAttendance />
              </ProtectedRoute>
            } />
            <Route path="/student-management/performance/:id" element={
              <ProtectedRoute>
                <StudentPerformance />
              </ProtectedRoute>
            } />
            <Route path="/staff-management" element={
              <ProtectedRoute>
                <StaffManagement />
              </ProtectedRoute>
            } />
            <Route path="/staff-dashboard" element={
              <ProtectedRoute>
                <StaffDashboard />
              </ProtectedRoute>
            } />
            <Route path="/staff-list" element={
              <ProtectedRoute>
                <StaffList />
              </ProtectedRoute>
            } />
            <Route path="/online-training" element={
              <ProtectedRoute>
                <OnlineTraining />
              </ProtectedRoute>
            } />
            <Route path="/curriculum" element={
              <ProtectedRoute>
                <Curriculum />
              </ProtectedRoute>
            } />
            <Route path="/parent-portal" element={
              <ProtectedRoute>
                <ParentPortal />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

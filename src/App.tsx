
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import SchoolManagement from "./pages/SchoolManagement";
import StudentManagement from "./pages/StudentManagement";
import StaffManagement from "./pages/StaffManagement";
import OnlineTraining from "./pages/OnlineTraining";
import Curriculum from "./pages/Curriculum";
import ParentPortal from "./pages/ParentPortal";
import HowItWorks from "./pages/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/school-management" element={<SchoolManagement />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/online-training" element={<OnlineTraining />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

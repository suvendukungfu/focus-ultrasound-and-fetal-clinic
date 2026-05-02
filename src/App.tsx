import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { WhatsAppProvider } from "@/contexts/WhatsAppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import AdminLayout from "./components/admin/AdminLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Culture = lazy(() => import("./pages/Culture"));
const Services = lazy(() => import("./pages/Services"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminReviews = lazy(() => import("./pages/admin/Reviews"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminLeads = lazy(() => import("./pages/admin/Leads"));
const AdminAuditLog = lazy(() => import("./pages/admin/AuditLog"));
const AdminProfile = lazy(() => import("./pages/admin/Profile"));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <WhatsAppProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <WhatsAppButton />
              <div className="relative min-h-screen overflow-hidden selection:bg-primary/20 selection:text-primary">
                <div className="bg-mesh" />
                <div className="noise-overlay" />
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/culture" element={<Culture />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                    <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                    <Route path="/admin/appointments" element={<AdminLayout><AdminAppointments /></AdminLayout>} />
                    <Route path="/admin/reviews" element={<AdminLayout><AdminReviews /></AdminLayout>} />
                    <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
                    <Route path="/admin/leads" element={<AdminLayout><AdminLeads /></AdminLayout>} />
                    <Route path="/admin/audit" element={<AdminLayout><AdminAuditLog /></AdminLayout>} />
                    <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
            </TooltipProvider>
          </WhatsAppProvider>
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  </QueryClientProvider>
);

export default App;

// System optimization: 2026-05-09

// Contribution optimization: 2026-05-09

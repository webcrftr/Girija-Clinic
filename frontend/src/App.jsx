import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global contexts
import { UIProvider } from './context/UIContext';
import { AuthProvider } from './context/AuthContext';

// Helper components
import ScrollToTop from './components/ScrollToTop';

// Layout wrappers
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Doctors from './pages/public/Doctors';
import Testimonials from './pages/public/Testimonials';
import Contact from './pages/public/Contact';
import Booking from './pages/public/Booking';
import NotFound from './pages/public/NotFound';

// Admin pages (UNTOUCHED AND PRESERVED)
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Patients from './pages/admin/Patients';
import PatientDetail from './pages/admin/PatientDetail';
import Appointments from './pages/admin/Appointments';
import Prescriptions from './pages/admin/Prescriptions';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

import { auth } from './firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function App() {
  useEffect(() => {
    createUserWithEmailAndPassword(auth, 'admin@girijaclinic.com', 'adminpassword123')
      .then((cred) => console.log('User seed successful:', cred.user.email))
      .catch((err) => console.log('User seed error (might already exist):', err.message));
  }, []);

  return (
    <UIProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Layout Pages */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="contact" element={<Contact />} />
              <Route path="book" element={<Booking />} />
            </Route>

            {/* Admin Authentication (UNTOUCHED) */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Dashboard Protected Space (UNTOUCHED) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientDetail />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 Global Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </UIProvider>
  );
}
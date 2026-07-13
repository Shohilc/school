import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Contexts
import { ModalProvider, useModal } from "./context/ModalContext";

// Layout & Core
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import FloatingCTA from "./components/ui/FloatingCTA";
import Modal from "./components/ui/Modal";
import AdmissionForm from "./components/forms/AdmissionForm";
import ConfettiBurst from "./components/ui/ConfettiBurst";
import MascotCharacter from "./components/ui/MascotCharacter";

// Pages
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import AdmissionEnquiry from "./pages/AdmissionEnquiry";
import Events from "./pages/Events";
import Achievements from "./pages/Achievements";
import Academics from "./pages/Academics";
import AcademicCalendar from "./pages/AcademicCalendar";
import BookAVisit from "./pages/BookAVisit";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

import "./App.css";

// Separate AnimatedRoutes to leverage useLocation inside BrowserRouter
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<AdmissionEnquiry />} />
        <Route path="/events" element={<Events />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/calendar" element={<AcademicCalendar />} />
        <Route path="/visit" element={<BookAVisit />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

// Global modal wrapper listening to context
function GlobalModal() {
  const { isEnquiryOpen, closeEnquiry } = useModal();
  return (
    <Modal isOpen={isEnquiryOpen} onClose={closeEnquiry} title="Admissions Enquiry Form">
      <AdmissionForm />
    </Modal>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />
          <div className="pt-24 flex-grow flex flex-col">
            <main className="flex-grow flex flex-col">
              <AnimatedRoutes />
            </main>
          </div>
          <Footer />
          <FloatingCTA />
          <GlobalModal />
          <ConfettiBurst />
          <MascotCharacter />
        </div>
      </ModalProvider>
    </BrowserRouter>
  );
}

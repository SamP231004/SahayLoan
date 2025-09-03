import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ApplicationFlow from './pages/ApplicationFlow';
import Dashboard from './pages/Dashboard';
import LoanStatus from './pages/LoanStatus';
import './styles/animations.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apply" element={<ApplicationFlow />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/status/:loanId" element={<LoanStatus />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
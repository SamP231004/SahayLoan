import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import LandingPage from './src/pages/LandingPage';
import ApplicationFlow from './src/pages/ApplicationFlow';
import Dashboard from './src/pages/Dashboard';
import LoanStatus from './src/pages/LoanStatus';
import './styles/animations.css';

function App() {
  // Define the language state and the function to update it
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const handleLangSwitch = () => {
    setLang(prevLang => (prevLang === 'en' ? 'hi' : 'en'));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Pass the state and handler function as props to the Header */}
        <Header lang={lang} onLangSwitch={handleLangSwitch} />

        <AnimatePresence mode="wait">
          <Routes>
            {/* (Recommended) Pass the lang prop to your pages so they can also be translated */}
            <Route path="/" element={<LandingPage lang={lang} />} />
            <Route path="/apply" element={<ApplicationFlow lang={lang} />} />
            <Route path="/dashboard" element={<Dashboard lang={lang} />} />
            <Route path="/status/:loanId" element={<LoanStatus lang={lang} />} />
          </Routes>
        </AnimatePresence>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ApplicationFlow from './pages/ApplicationFlow';
import LoanStatus from './pages/LoanStatus';

const Main = () => {
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');

  return (
    <BrowserRouter>
      <Header lang={language} onLangSwitch={setLanguage} />
      <Routes>
        <Route path="/" element={<LandingPage language={language} setLanguage={setLanguage} />} />
        <Route path="/dashboard" element={<Dashboard language={language} setLanguage={setLanguage} />} />
        <Route path="/apply" element={<ApplicationFlow language={language} setLanguage={setLanguage} />} />
        <Route path="/status/:loanId" element={<LoanStatus language={language} setLanguage={setLanguage} />} />
        {/* ...other routes... */}
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

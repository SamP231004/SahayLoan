import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Bell, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  lang: 'en' | 'hi';
  onLangSwitch: (lang: 'en' | 'hi') => void;
}

const Header: React.FC<HeaderProps> = ({ lang, onLangSwitch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg"
            >
              <CreditCard className="h-6 w-6 text-white" />
            </motion.div>
            <span className="font-bold text-xl text-gray-900">
              {lang === 'en' ? 'Sahay Loan' : 'सहाय लोन'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {lang === 'en' ? 'Home' : 'होम'}
            </Link>
            <Link
              to="/apply"
              className={`text-sm font-medium transition-colors ${
                isActive('/apply') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {lang === 'en' ? 'Apply Loan' : 'लोन अप्लाई करें'}
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              {lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Toggle */}
            <LanguageToggle language={lang} setLanguage={onLangSwitch} />

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-500 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
            </motion.button>

            {/* Profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <User className="h-4 w-4" />
              <span>{lang === 'en' ? 'Profile' : 'प्रोफाइल'}</span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            <Link
              to="/"
              className="block text-gray-700 hover:text-green-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {lang === 'en' ? 'Home' : 'होम'}
            </Link>
            <Link
              to="/apply"
              className="block text-gray-700 hover:text-green-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {lang === 'en' ? 'Apply Loan' : 'लोन अप्लाई करें'}
            </Link>
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-green-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}
            </Link>

            {/* Profile */}
            <button className="flex items-center space-x-2 text-green-600 font-medium">
              <User className="h-4 w-4" />
              <span>{lang === 'en' ? 'Profile' : 'प्रोफाइल'}</span>
            </button>
          </div>
        </motion.div>

        {/* Add Language Toggle for mobile */}
        <div className="md:hidden flex justify-end py-2">
          <LanguageToggle language={lang} setLanguage={onLangSwitch} />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
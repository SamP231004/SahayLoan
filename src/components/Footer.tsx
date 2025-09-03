import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Shield, Lock, Award } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold mb-4">SahayLoan</h3>
            <p className="text-gray-300 mb-4">
              भारत के गांवों के लिए बनाया गया विश्वसनीय लेंडिंग प्लेटफॉर्म।
              आपकी आर्थिक जरूरतों का सबसे तेज़ और सुरक्षित समाधान।
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">RBI मान्यता प्राप्त</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-green-400" />
                <span className="text-sm">SSL सुरक्षित</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">संपर्क करें</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span>support@sahayloan.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span>मुंबई, महाराष्ट्र</span>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">विश्वास के साथ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-green-400" />
                <span>10 लाख+ खुश ग्राहक</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-green-400" />
                <span>99% अप्रूवल रेट</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-green-400" />
                <span>24/7 कस्टमर सपोर्ट</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 SahayLoan. सभी अधिकार सुरक्षित।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
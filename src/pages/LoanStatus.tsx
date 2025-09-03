import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, ArrowRight, Phone, Download } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

const LoanStatus: React.FC = () => {
  const { loanId } = useParams();
  const [loanStatus, setLoanStatus] = useState({
    id: loanId,
    amount: 50000,
    status: 'processing',
    currentStep: 3,
    steps: [
      { title: 'आवेदन प्राप्त', status: 'completed', date: '10 फरवरी 2024' },
      { title: 'दस्तावेज़ वेरिफिकेशन', status: 'completed', date: '10 फरवरी 2024' },
      { title: 'AI अंडरराइटिंग', status: 'completed', date: '11 फरवरी 2024' },
      { title: 'अप्रूवल प्रोसेसिंग', status: 'processing', date: '' },
      { title: 'लोन डिस्बर्सल', status: 'pending', date: '' }
    ],
    estimatedTime: '2-4 घंटे',
    contactInfo: {
      phone: '+91 1800-XXX-XXXX',
      email: 'support@sahayloan.com'
    }
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (loanStatus.currentStep < 4) {
        setLoanStatus(prev => ({
          ...prev,
          currentStep: prev.currentStep + 1,
          steps: prev.steps.map((step, index) => ({
            ...step,
            status: index <= prev.currentStep ? 'completed' : 
                   index === prev.currentStep + 1 ? 'processing' : 'pending',
            date: index <= prev.currentStep ? new Date().toLocaleDateString('hi-IN') : step.date
          }))
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [loanStatus.currentStep]);

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'processing':
        return <Clock className="h-6 w-6 text-yellow-600 animate-pulse" />;
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-300"></div>;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-600 bg-green-50';
      case 'processing':
        return 'border-yellow-600 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">लोन स्टेटस</h1>
          <p className="text-lg text-gray-600">आवेदन ID: #{loanId}</p>
        </motion.div>

        {/* Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">₹</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">लोन राशि</h3>
              <p className="text-2xl font-bold text-blue-600">₹{loanStatus.amount.toLocaleString()}</p>
            </div>
            
            <div>
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">अनुमानित समय</h3>
              <p className="text-xl font-bold text-yellow-600">{loanStatus.estimatedTime}</p>
            </div>
            
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((loanStatus.currentStep / (loanStatus.steps.length - 1)) * 100)}%
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">पूर्ण</h3>
              <p className="text-xl font-bold text-green-600">प्रोसेसिंग</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">आवेदन की प्रगति</h2>
          <div className="space-y-4">
            {loanStatus.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center p-4 border-2 rounded-lg ${getStepColor(step.status)}`}
              >
                <div className="flex-shrink-0 mr-4">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  {step.date && (
                    <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                  )}
                </div>
                {index < loanStatus.steps.length - 1 && step.status === 'completed' && (
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Status Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl p-8 mb-8"
        >
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">वर्तमान स्थिति</h3>
            {loanStatus.currentStep === 3 ? (
              <p className="text-lg">
                आपका आवेदन अप्रूवल के लिए भेज दिया गया है। 
                हमारी टीम इसकी समीक्षा कर रही है।
              </p>
            ) : loanStatus.currentStep === 4 ? (
              <p className="text-lg">
                बधाई हो! आपका लोन अप्रूव हो गया है। 
                पैसा आपके अकाउंट में ट्रांसफर होने वाला है।
              </p>
            ) : (
              <p className="text-lg">
                आपका आवेदन प्रोसेसिंग में है। कृपया धैर्य रखें।
              </p>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">क्या आपकी कोई मदद चाहिए?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>कॉल करें</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>दस्तावेज़ डाउनलोड करें</span>
            </motion.button>
            
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                <span>डैशबोर्ड पर जाएं</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanStatus;
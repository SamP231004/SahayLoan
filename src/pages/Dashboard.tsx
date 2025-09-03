import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Clock, CheckCircle, AlertTriangle, Phone, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const loanData = {
    activeLoan: {
      amount: 50000,
      remaining: 32000,
      emi: 4247,
      nextDue: '15 फरवरी 2024',
      status: 'active'
    },
    creditScore: 85,
    applications: [
      { id: 1, amount: 50000, status: 'approved', date: '10 जनवरी 2024' },
      { id: 2, amount: 30000, status: 'processing', date: '5 फरवरी 2024' },
      { id: 3, amount: 75000, status: 'rejected', date: '20 दिसंबर 2023' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">डैशबोर्ड</h1>
          <p className="text-gray-600">आपकी सभी लोन जानकारी एक जगह</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">सक्रिय लोन</h3>
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{loanData.activeLoan.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">कुल राशि</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">बकाया राशि</h3>
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{loanData.activeLoan.remaining.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">शेष राशि</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">अगली EMI</h3>
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">₹{loanData.activeLoan.emi.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">{loanData.activeLoan.nextDue}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">क्रेडिट स्कोर</h3>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">{loanData.creditScore}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${loanData.creditScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">बेहतरीन स्कोर</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'ओवरव्यू' },
                { id: 'applications', label: 'आवेदन' },
                { id: 'payments', label: 'भुगतान' },
                { id: 'documents', label: 'दस्तावेज़' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Loan Details */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-xl text-white">
                    <h3 className="text-lg font-semibold mb-4">वर्तमान लोन विवरण</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>कुल राशि:</span>
                        <span className="font-semibold">₹{loanData.activeLoan.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>बकाया राशि:</span>
                        <span className="font-semibold">₹{loanData.activeLoan.remaining.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>मासिक EMI:</span>
                        <span className="font-semibold">₹{loanData.activeLoan.emi.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>अगली देय तारीख:</span>
                        <span className="font-semibold">{loanData.activeLoan.nextDue}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold mt-6 hover:bg-gray-50 transition-colors"
                    >
                      EMI भुगतान करें
                    </motion.button>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">त्वरित कार्य</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Phone className="h-5 w-5 text-green-600" />
                        <span>कस्टमर सपोर्ट से संपर्क करें</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="h-5 w-5 text-blue-600" />
                        <span>लोन एग्रीमेंट डाउनलोड करें</span>
                      </motion.button>
                      <Link to="/apply">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <CreditCard className="h-5 w-5 text-purple-600" />
                          <span>नया लोन आवेदन करें</span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">आपके आवेदन</h3>
                <div className="space-y-4">
                  {loanData.applications.map((app) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">₹{app.amount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{app.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {app.status === 'approved' ? 'अप्रूवड' : 
                           app.status === 'processing' ? 'प्रोसेसिंग' : 'रिजेक्टेड'}
                        </span>
                        <Link to={`/status/${app.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <Eye className="h-4 w-4" />
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">भुगतान इतिहास</h3>
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">भुगतान की जानकारी लोड हो रही है...</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'documents' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">दस्तावेज़</h3>
                <div className="text-center py-12">
                  <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">दस्तावेज़ लोड हो रहे हैं...</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
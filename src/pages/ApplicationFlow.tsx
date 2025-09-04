import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Upload, Camera, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DocumentUpload from '../components/DocumentUpload';
import ConversationalAssistant from '../components/ConversationalAssistant';
import LoanCalculator from '../components/LoanCalculator';
import ProgressBar from '../components/ProgressBar';

interface ApplicationFlowProps {
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
}

const ApplicationFlow: React.FC<ApplicationFlowProps> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [applicationData, setApplicationData] = React.useState({
    personalInfo: {},
    documents: {},
    loanDetails: {},
    verification: {}
  });

  const steps = [
    { title: 'व्यक्तिगत जानकारी', component: PersonalInfoStep },
    { title: 'दस्तावेज़ अपलोड', component: DocumentUploadStep },
    { title: 'लोन विवरण', component: LoanDetailsStep },
    { title: 'AI वेरिफिकेशन', component: AIVerificationStep },
    { title: 'अंतिम समीक्षा', component: FinalReviewStep }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            लोन आवेदन
          </h1>
          <p className="text-lg text-gray-600">
            सिर्फ कुछ आसान स्टेप्स में अपना लोन अप्रूव करवाएं
          </p>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={steps.length}
          steps={steps.map(step => step.title)}
        />

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <StepComponent
              data={applicationData}
              setData={setApplicationData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>पिछला</span>
          </motion.button>

          {currentStep === steps.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/status/new')}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              <span>आवेदन जमा करें</span>
              <CheckCircle className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              <span>अगला</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

// Step Components
const PersonalInfoStep: React.FC<any> = ({ data, setData }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
    occupation: '',
    monthlyIncome: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData({ ...data, personalInfo: formData });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">व्यक्तिगत जानकारी भरें</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              पूरा नाम *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="आपका पूरा नाम"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              मोबाइल नंबर *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="10 अंकों का नंबर"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ईमेल आईडी
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              पिनकोड *
            </label>
            <input
              type="text"
              required
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="6 अंकों का पिनकोड"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            पूरा पता *
          </label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            placeholder="आपका पूरा पता"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              पेशा *
            </label>
            <select
              required
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            >
              <option value="">पेशा चुनें</option>
              <option value="farmer">किसान</option>
              <option value="business">व्यापारी</option>
              <option value="employee">नौकरीपेशा</option>
              <option value="self-employed">स्वरोजगार</option>
              <option value="other">अन्य</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              मासिक आय *
            </label>
            <input
              type="number"
              required
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="रुपये में"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const DocumentUploadStep: React.FC<any> = ({ data, setData }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">दस्तावेज़ अपलोड करें</h2>
      <DocumentUpload onUpload={(docs) => setData({ ...data, documents: docs })} />
    </div>
  );
};

const LoanDetailsStep: React.FC<any> = ({ data, setData }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">लोन की जानकारी</h2>
      <LoanCalculator onCalculate={(details) => setData({ ...data, loanDetails: details })} />
    </div>
  );
};

const AIVerificationStep: React.FC<any> = ({ data, setData }) => {
  const [verificationStatus, setVerificationStatus] = React.useState('processing');

  React.useEffect(() => {
    // Simulate AI verification process
    setTimeout(() => {
      setVerificationStatus('success');
      setData({ ...data, verification: { status: 'approved', score: 85 } });
    }, 3000);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI वेरिफिकेशन</h2>
      <div className="text-center">
        {verificationStatus === 'processing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto"></div>
            <p className="text-lg">आपके दस्तावेज़ों की AI जांच हो रही है...</p>
          </motion.div>
        )}
        
        {verificationStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-semibold text-green-600">वेरिफिकेशन सफल!</h3>
            <p className="text-lg text-gray-600">आपके सभी दस्तावेज़ सही पाए गए हैं</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">क्रेडिट स्कोर: <span className="font-bold">85/100</span></p>
            </div>
          </motion.div>
        )}
      </div>
      
      <ConversationalAssistant />
    </div>
  );
};

const FinalReviewStep: React.FC<any> = ({ data }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">अंतिम समीक्षा</h2>
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">आवेदन सारांश</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">आवेदक का नाम</p>
              <p className="font-medium">{data.personalInfo?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">लोन राशि</p>
              <p className="font-medium">₹{data.loanDetails?.amount || '0'}</p>
            </div>
            <div>
              <p className="text-gray-600">मासिक EMI</p>
              <p className="font-medium">₹{data.loanDetails?.emi || '0'}</p>
            </div>
            <div>
              <p className="text-gray-600">क्रेडिट स्कोर</p>
              <p className="font-medium">{data.verification?.score || 0}/100</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-4">नियम और शर्तें</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>मैं सभी नियम और शर्तों से सहमत हूं</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>मैंने सभी जानकारी सही-सही भरी है</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span>मैं EMI का समय पर भुगतान करूंगा</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFlow;
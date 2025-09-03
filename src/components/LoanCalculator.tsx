import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock } from 'lucide-react';

interface LoanCalculatorProps {
  onCalculate: (details: any) => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onCalculate }) => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(10.5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / (12 * 100);
    const months = tenure;

    if (monthlyRate === 0) {
      const calculatedEMI = principal / months;
      setEmi(calculatedEMI);
      setTotalInterest(0);
      setTotalAmount(principal);
    } else {
      const calculatedEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const calculatedTotalAmount = calculatedEMI * months;
      const calculatedTotalInterest = calculatedTotalAmount - principal;

      setEmi(calculatedEMI);
      setTotalInterest(calculatedTotalInterest);
      setTotalAmount(calculatedTotalAmount);
    }
  };

  useEffect(() => {
    calculateEMI();
    onCalculate({
      amount: loanAmount,
      tenure,
      interestRate,
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });
  }, [loanAmount, tenure, interestRate, emi, totalInterest, totalAmount]);

  const loanAmountOptions = [
    { value: 10000, label: '₹10,000' },
    { value: 25000, label: '₹25,000' },
    { value: 50000, label: '₹50,000' },
    { value: 75000, label: '₹75,000' },
    { value: 100000, label: '₹1,00,000' },
    { value: 200000, label: '₹2,00,000' }
  ];

  const tenureOptions = [
    { value: 6, label: '6 महीने' },
    { value: 12, label: '12 महीने' },
    { value: 18, label: '18 महीने' },
    { value: 24, label: '24 महीने' },
    { value: 36, label: '36 महीने' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">लोन कैलकुलेटर</h2>
        <p className="text-gray-600 mt-2">अपनी जरूरत के हिसाब से लोन की राशि तय करें</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              लोन की राशि
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {loanAmountOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLoanAmount(option.value)}
                  className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                    loanAmount === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
            <input
              type="range"
              min="10000"
              max="500000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>₹10,000</span>
              <span className="font-medium text-green-600">₹{loanAmount.toLocaleString()}</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              लोन की अवधि
            </label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {tenureOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTenure(option.value)}
                  className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                    tenure === option.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ब्याज दर (सालाना)
            </label>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-green-800">आपकी ब्याज दर:</span>
                <span className="text-2xl font-bold text-green-600">{interestRate}%</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                ⭐ बेहतरीन क्रेडिट स्कोर के कारण विशेष दर मिली है
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-2xl text-white">
            <h3 className="text-lg font-semibold mb-4">EMI विवरण</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>मासिक EMI:</span>
                <span className="text-2xl font-bold">₹{Math.round(emi).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>कुल ब्याज:</span>
                <span className="font-semibold">₹{Math.round(totalInterest).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>कुल भुगतान:</span>
                <span className="font-semibold">₹{Math.round(totalAmount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">भुगतान का विभाजन</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">मूल राशि</span>
                <span className="font-medium">{((loanAmount / totalAmount) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ब्याज</span>
                <span className="font-medium">{((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">आपको मिलने वाले फायदे</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>कोई प्री-पेमेंट चार्ज नहीं</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>2 मिनट में अप्रूवल</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>फ्लेक्सिबल रीपेमेंट</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
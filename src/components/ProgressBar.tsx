import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0">
          <motion.div
            className="h-full bg-green-600"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Circles */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: index <= currentStep ? 1.1 : 1,
                backgroundColor: index <= currentStep ? '#16A34A' : '#E5E7EB'
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${
                index <= currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="h-6 w-6 text-white" />
              ) : index === currentStep ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Circle className="h-6 w-6 text-gray-500" />
              )}
            </motion.div>
            <motion.p
              className={`text-sm font-medium mt-2 text-center max-w-20 ${
                index <= currentStep ? 'text-green-600' : 'text-gray-500'
              }`}
              animate={{ 
                color: index <= currentStep ? '#16A34A' : '#6B7280'
              }}
            >
              {step}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
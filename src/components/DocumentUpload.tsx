import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, File, CheckCircle, AlertCircle, X } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (documents: any) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredDocs = [
    { id: 'aadhar', title: 'आधार कार्ड', required: true },
    { id: 'pan', title: 'पैन कार्ड', required: true },
    { id: 'income', title: 'इनकम प्रूफ', required: true },
    { id: 'bank', title: 'बैंक स्टेटमेंट', required: false }
  ];

  const handleFiles = async (files: FileList) => {
    const newDocs = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        // Simulate AI processing
        const processed = await simulateAIProcessing(file);
        newDocs.push(processed);
      }
    }
    
    setUploadedDocs([...uploadedDocs, ...newDocs]);
    onUpload([...uploadedDocs, ...newDocs]);
  };

  const simulateAIProcessing = (file: File): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          status: Math.random() > 0.2 ? 'verified' : 'needs_review',
          extractedData: {
            name: 'राम कुमार शर्मा',
            number: '1234 5678 9012',
            validity: 'Valid'
          },
          confidence: Math.floor(Math.random() * 20) + 80
        });
      }, 2000);
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeDoc = (docId: string) => {
    const filtered = uploadedDocs.filter(doc => doc.id !== docId);
    setUploadedDocs(filtered);
    onUpload(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {requiredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center"
          >
            <File className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">{doc.title}</h3>
            <p className="text-sm text-gray-500">
              {doc.required ? 'आवश्यक' : 'वैकल्पिक'}
            </p>
          </div>
        ))}
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          दस्तावेज़ अपलोड करें
        </h3>
        <p className="text-gray-500 mb-4">
          फाइल को यहाँ खींचें या क्लिक करके चुनें
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            <Upload className="h-4 w-4" />
            <span>फाइल चुनें</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            <Camera className="h-4 w-4" />
            <span>फोटो लें</span>
          </motion.button>
        </div>
      </div>

      {/* Uploaded Documents */}
      <AnimatePresence>
        {uploadedDocs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-gray-900">अपलोड किए गए दस्तावेज़</h3>
            {uploadedDocs.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      doc.status === 'verified' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {doc.status === 'verified' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.status === 'verified' ? 'वेरिफाइड' : 'रिव्यू पेंडिंग'}
                        {doc.confidence && ` • ${doc.confidence}% कॉन्फिडेंस`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDoc(doc.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {doc.extractedData && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">AI द्वारा निकाली गई जानकारी:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">नाम:</span>
                        <span className="ml-2 font-medium">{doc.extractedData.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">नंबर:</span>
                        <span className="ml-2 font-medium">{doc.extractedData.number}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DocumentUpload;
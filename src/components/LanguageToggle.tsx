import React from 'react';

interface LanguageToggleProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm font-medium ${language === 'hi' ? 'text-green-600' : 'text-gray-400'}`}>हिंदी</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={language === 'en'}
          onChange={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 transition-colors"></div>
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transition-transform ${
            language === 'en' ? 'translate-x-5' : ''
          }`}
        ></div>
      </label>
      <span className={`text-sm font-medium ${language === 'en' ? 'text-green-600' : 'text-gray-400'}`}>EN</span>
    </div>
  );
};

export default LanguageToggle;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Volume2 } from 'lucide-react';

const ConversationalAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'नमस्ते! मैं आपका AI सहायक हूं। लोन प्रक्रिया में कोई भी सवाल हो तो पूछिए।',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'EMI कितनी होगी?',
    'कागजी कार्रवाई क्या चाहिए?',
    'कब तक मिल जाएगा लोन?',
    'ब्याज दर क्या है?'
  ];

  const botResponses: { [key: string]: string } = {
    'emi': 'आपकी EMI लोन अमाउंट और टेन्योर के हिसाब से तय होती है। 50,000 रुपये के लिए 12 महीने में लगभग 4,500 रुपये मासिक EMI होगी।',
    'documents': 'आपको चाहिए होगा: आधार कार्ड, पैन कार्ड, बैंक स्टेटमेंट (3 महीने का), और सैलरी स्लिप या इनकम प्रूफ।',
    'time': 'AI तकनीक की मदद से आपका लोन सिर्फ 2 मिनट में अप्रूव हो जाता है! पैसा भी तुरंत आपके खाते में आ जाता है।',
    'interest': 'हमारी ब्याज दरें बहुत कम हैं - सिर्फ 10.5% से शुरू! आपकी क्रेडिट हिस्ट्री के आधार पर और भी कम हो सकती है।',
    'default': 'मैं समझ नहीं पाया। क्या आप फिर से पूछ सकते हैं? या नीचे दिए गए विकल्पों में से चुन सकते हैं।'
  };

  const getResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('emi') || lowercaseMessage.includes('किश्त')) {
      return botResponses.emi;
    }
    if (lowercaseMessage.includes('कागज') || lowercaseMessage.includes('document')) {
      return botResponses.documents;
    }
    if (lowercaseMessage.includes('कब') || lowercaseMessage.includes('time') || lowercaseMessage.includes('समय')) {
      return botResponses.time;
    }
    if (lowercaseMessage.includes('ब्याज') || lowercaseMessage.includes('interest') || lowercaseMessage.includes('दर')) {
      return botResponses.interest;
    }
    
    return botResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user' as const,
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot' as const,
        text: getResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-green-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI सहायक</h3>
                  <p className="text-sm text-green-100">ऑनलाइन</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.type === 'user' ? 'bg-green-600' : 'bg-gray-200'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`p-3 rounded-xl ${
                      message.type === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.type === 'bot' && (
                        <button
                          onClick={() => speakText(message.text)}
                          className="mt-2 p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">त्वरित सवाल:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 rounded-b-2xl">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="अपना सवाल लिखें..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConversationalAssistant;
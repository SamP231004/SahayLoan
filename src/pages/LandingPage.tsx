import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Smartphone, CheckCircle, Star, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "2 मिनट में अप्रूवल",
      description: "AI तकनीक से तुरंत लोन अप्रूवल मिलता है"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% सुरक्षित",
      description: "आपकी जानकारी बिल्कुल सुरक्षित रहती है"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "आसान प्रक्रिया",
      description: "कम डिजिटल नॉलेज वालों के लिए भी आसान"
    }
  ];

  const benefits = [
    "कोई छुपी हुई फीस नहीं",
    "कम ब्याज दर",
    "फ्लेक्सिबल EMI",
    "तुरंत पैसा ट्रांसफर"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-blue-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                गांव से शहर तक,
                <br />
                <span className="text-yellow-300">आपका लोन पार्टनर</span>
              </h1>
              <p className="text-xl text-green-100 mb-8 max-w-lg">
                AI की मदद से सिर्फ 2 मिनट में लोन अप्रूवल पाएं। 
                कोई कागजी कार्रवाई नहीं, कोई लंबी प्रक्रिया नहीं।
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/apply">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center space-x-2 w-full sm:w-auto"
                  >
                    <span>अभी अप्लाई करें</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-colors w-full sm:w-auto"
                >
                  वीडियो देखें
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">लोन कैलकुलेटर</h3>
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-white/80 text-sm">लोन अमाउंट</p>
                      <p className="text-2xl font-bold text-white">₹50,000</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-white/80 text-sm">मंथली EMI</p>
                      <p className="text-2xl font-bold text-yellow-300">₹4,247</p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-green-700 text-white px-6 py-3 rounded-lg cursor-pointer"
                  >
                    <CheckCircle className="h-5 w-5 mx-auto mb-1" />
                    <p className="font-medium">पूरी तरह अप्रूवल योग्य</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={1000000} suffix="+" duration={2} />
                </div>
                <p className="text-gray-600">खुश ग्राहक</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={99} suffix="%" duration={2} />
                </div>
                <p className="text-gray-600">अप्रूवल रेट</p>
              </div>
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={4.8} suffix="/5" duration={2} decimals={1} />
                </div>
                <p className="text-gray-600">कस्टमर रेटिंग</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                क्यों चुनें SahayLoan?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                आधुनिक तकनीक के साथ पारंपरिक विश्वास को मिलाकर बनाया गया है
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Benefits Section */}
      <ScrollReveal>
        <section className="py-20 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  आपको मिलते हैं ये सभी फायदे
                </h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="h-6 w-6 text-green-300" />
                      <span className="text-white text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    आज ही शुरू करें
                  </h3>
                  <div className="space-y-4 mb-8">
                    <p className="text-green-100">✓ केवल 2 मिनट में अप्रूवल</p>
                    <p className="text-green-100">✓ कोई हिडन चार्ज नहीं</p>
                    <p className="text-green-100">✓ तुरंत पैसा अकाउंट में</p>
                  </div>
                  <Link to="/apply">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl w-full"
                    >
                      अभी अप्लाई करें
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                क्या आप तैयार हैं अपने सपनों को पूरा करने के लिए?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                लाखों लोग पहले से ही SahayLoan का भरोसा कर रहे हैं। 
                अब आपकी बारी है।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/apply">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl flex items-center justify-center space-x-2 w-full sm:w-auto"
                  >
                    <span>लोन के लिए अप्लाई करें</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.button>
                </Link>
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors w-full sm:w-auto"
                  >
                    लोन स्टेटस चेक करें
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default LandingPage;
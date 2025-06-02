import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiX, FiArrowRight, FiUserPlus } from 'react-icons/fi';
import { usePatel } from './patelContext';
import { useRouter } from 'next/navigation';

const VillageAmbassadorSignupHindi = (userId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter()

  const {path, setUser} = usePatel()

    const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log('profileData',profileData);
    setIsSubmitting(true);
    const token = localStorage.getItem('token');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('ambassadorWill', agreed);
      
  
      const response = await fetch(path + '/api/users/ambessador-request', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type manually for FormData
        },
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create update user Details');
      }
      setIsSuccess(true);

      const result = await response.json();
      console.log('updated successfully:', result);
      setUser(result);
      router.push('/')
    } catch (error) {
      console.error('अनुरोध सबमिट करने में त्रुटि:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
/*   const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // अपने वास्तविक API एंडपॉइंट के साथ बदलें
      const response = await fetch(path + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          message,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('अनुरोध सबमिट करने में त्रुटि:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
 */
 
  return (
    <section 
      aria-label="गाँव राजदूत बनें"
      className="max-w-4xl mx-auto my-12 p-6 rounded-2xl bg-white shadow-lg border border-emerald-100"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <AnimatePresence>
          {!isSuccess ? (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-emerald-50 text-emerald-600">
                  <FiUserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                  अपने गाँव के अम्बेसडर बनें
                  </h2>
                  <p className="text-gray-600 mt-2">
                    हमारे नायता पटेल समाज को मजबूत करने में मदद करने वाले उत्साही व्यक्तियों में शामिल हों।
                  </p>
                </div>
              </div>

              {!isOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(true)}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-md"
                    >
                      मेरी रुचि है
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      अभी नहीं
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 space-y-6">
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <h3 className="font-semibold text-emerald-800 mb-2">गाँव अम्बेसडर नियम और शर्तें</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        <li> मैं ईमानदारी से अपने गाँव की बात लोगों तक पहुँचाने का काम करूँगा।</li>
                        <li>मैं सुधार के लिए अपनी सच्ची राय और सुझाव दूँगा।</li>
                        <li>मैं अपने समाज की अच्छी बातों को लोगों तक पहुँचाने में मदद करूँगा।</li>
                        <li>मैं गाँव से जुड़ी जानकारियों को सही और अपडेटेड रखूँगा।</li>
                        <li>मैं अपने गाँव से जुड़ी खबरें पोस्ट करूँगा, और मुझे ही यह विशेष अधिकार मिलेगा।</li>
                        <li>यह एक सेवा का पद है — इसमें कोई पैसे या इनाम नहीं मिलेगा, लेकिन सम्मान ज़रूर मिलेगा।</li>
                      </ol>
                    </div>

                    <div className="flex items-start">
                      <input
                        id="agree-terms"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                       मैं इन सभी नियमों और शर्तों से पूरी तरह सहमत हूँ और गाँव अम्बेसडर बनने के लिए तैयार हूँ।
                      </label>
                    </div>

              
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        disabled={!agreed || isSubmitting}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors shadow-md flex items-center gap-2 ${
                          agreed
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          'सबमिट किया जा रहा है...'
                        ) : (
                          <>
                            अनुरोध सबमिट करें <FiArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                      >
                        रद्द करें
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100">
                <FiCheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">अनुरोध सबमिट हो गया!</h3>
              <p className="mt-2 text-sm text-gray-500">
                गाँव अम्बेसडर बनने में रुचि दिखाने के लिए धन्यवाद। हमारी टीम आपके अनुरोध का जल्द ही समीक्षा करेगी।
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setIsOpen(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  बंद करें
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default VillageAmbassadorSignupHindi;
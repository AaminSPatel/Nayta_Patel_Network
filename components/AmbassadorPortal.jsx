'use client'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { usePatel } from './patelContext';
import { FaCrown, FaMosque, FaSchool, FaStar, FaUserPlus, FaShareAlt } from 'react-icons/fa';
import { FiEdit, FiSave, FiDownload } from 'react-icons/fi';

const AmbassadorPortal = ({ ambassador }) => {
  const { formatDate, villages, user, siteUrl, siteBrand } = usePatel();
  const cardRef = useRef(null);
  
  // Village details state
  const [villageDetails, setVillageDetails] = useState({
    population: '',
    intro: '',
    landmarks: '',
    mosque: [],
    schools: [],
    headOfVillage: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (villages && (user.role === 'admin' || user.role === 'ambassador')) {
      const filteredVillage = villages.find(item => 
        item.ambassador?._id === user._id || 
        item.name.toLowerCase().includes(user?.village?.toLowerCase())
      );
      
      if (filteredVillage) {
        setVillageDetails({
          population: filteredVillage.population || 'जानकारी उपलब्ध नहीं',
          intro: filteredVillage.intro || 'हमारे गाँव के बारे में जानकारी',
          landmarks: filteredVillage.landmarks || filteredVillage.name,
          mosque: filteredVillage.mosque || [],
          schools: filteredVillage.schools || [],
          headOfVillage: filteredVillage.headOfVillage || 'जानकारी उपलब्ध नहीं',
          contactNumber: filteredVillage.contactNumber || '+91 XXXXX XXXXX'
        });
      }
    }
  }, [villages, user]);

  const [isEditing, setIsEditing] = useState(false);

  const handleVillageChange = (e) => {
    const { name, value } = e.target;
    setVillageDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Submit to backend here
  };

  const captureCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${user.village}-ambassador-card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const shareToSocial = () => {
    if (navigator.share) {
      navigator.share({
        title: `${user.fullname} - ${user.village} के राजदूत`,
        text: `नायता पटेल नेटवर्क के माध्यम से हमारे गाँव को जोड़ें`,
        url: window.location.href,
      });
    } else {
      alert('सोशल मीडिया पर शेयर करने के लिए डाउनलोड बटन का उपयोग करें');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 ">
      <div className="max-w-4xl mx-auto">
        {/* Ambassador Pride Card */}
       <motion.div 
  ref={cardRef}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-xl overflow-hidden mb-8 text-white"
>
  <div className="p-4 text-center">
    <div className="flex justify-center mb-4">
      <div className="relative">
        <img 
          className="h-24 w-24 rounded-full border-4 border-yellow-400 object-cover shadow-lg"
          src={user?.profilepic?.url || '/default-avatar.jpg'} 
          alt={user.fullname}
        />
        <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1">
          <FaCrown className="text-emerald-700 text-xl" />
        </div>
      </div>
    </div>
    
    <h1 className="text-2xl font-bold mb-1">{user.fullname}</h1>
    
    
    <div className="flex flex-col justify-center items-center gap-1 mb-3">
         <h2 className="text-3xl roboto font-bold mb-1 text-yellow-300 text-shadow-amber-300 text-shadow-xs">{user.village}</h2>
      <span className="bg-yellow-400 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
        गाँव के एंबेसडर
      </span>
    </div>
    
  

    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4">
      <p className="text-sm font-semibold text-start">
        {/* 🙏 {user.fullname} जी, आपके नेतृत्व और समर्पण के लिए हम आपका दिल से सम्मान करते हैं। 
        आप {user.village} गांव के गौरव हैं। आप जैसे प्रेरणादायक राजदूत के कारण ही हमारा समाज आगे बढ़ रहा है। 
        कृपया इस नेटवर्क को और भी लोगों तक पहुँचाएं। */}
      🔥 {user.fullname} जी, 🌟 आपको {user.village} गाँव का आधिकारिक एंबेसडर नियुक्त किया गया है! 🌟 <br />

 <h3 className='mt-3'>अधिकार:</h3>
 <ul className='flex flex-col gap-1 mb-2 text-start opacity-90 font-medium'>
  <li>✅ गाँव की जानकारी अपडेट कर सकते हैं (जनसंख्या, स्कूल, मस्जिद, सरपंच का नाम, जिला, पिन कोड)।</li>
  <li>
    ✅ गाँव की समस्याओं के समाधान के लिए अपील कर सकते हैं।
  </li>
  <li>
    ✅ प्लेटफॉर्म पर आपको गाँव का राजदूत दिखाया जाएगा—सभी आपको सम्मान से देखेंगे!
  </li>
 </ul>



<h3>🎖 विशेष पुरस्कार: </h3>
<p className='opacity-95 font-medium'>अपने गाँव से 10+ नए सदस्य जोड़कर सम्मान और इनाम पाएं!</p> <br />

✊ हम साथ मिलकर एक मजबूत समाज बनाएंगे।
कृपया अपने गाँव की सही जानकारी भरें और अधिक लोगों को जोड़ने में मदद करें। <br />

धन्यवाद! 🙏 <br />

- नायता पटेल नेटवर्क
      </p>
    </div>
    

  </div>
  
  {/* Call to Action */}
  <div className="bg-black/20 p-4 text-center">
    <h3 className="font-bold mb-2">अधिक लोगों को जोड़ें!</h3>
    <p className="text-sm mb-3">
      अपने गाँव के और सदस्यों को नायता पटेल नेटवर्क से जोड़कर समाज को मजबूत बनाएं।
    </p>
        <div className="flex justify-center gap-4 mt-6">
      <button 
        onClick={shareToSocial}
        className="flex items-center gap-2 bg-white text-emerald-700 px-3 py-1 rounded-xl font-medium"
      >
        <FaShareAlt /> शेयर करें
      </button>
      <button 
        onClick={captureCard}
        className="flex items-center gap-2 bg-yellow-400 text-emerald-800 px-3 py-1 rounded-xl font-medium"
      >
        <FiDownload /> डाउनलोड
      </button>

    <button className="flex items-center gap-2 bg-white text-emerald-700 px-3 py-1 rounded-xl font-medium">
      <FaUserPlus /> नया सदस्य जोड़ें
    </button>
    </div>
  </div>

  {/* Footer Branding */}
  <div className="bg-emerald-900/40 text-center text-xs py-2 tracking-widest font-semibold text-yellow-100">
    🌐 Powered by <span className="text-yellow-300">Nayta Patel Network</span>
  </div>
</motion.div>

        {/* Village Details Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">{user.village} गाँव की जानकारी</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
              >
                {isEditing ? <><FiSave /> सेव करें</> : <><FiEdit /> एडिट करें</>}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">जनसंख्या</label>
                    <input
                      type="text"
                      name="population"
                      value={villageDetails.population}
                      onChange={handleVillageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">मस्जिद</label>
                    <input
                      type="text"
                      name="mosque"
                      value={villageDetails.mosque}
                      onChange={handleVillageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">विद्यालय</label>
                    <input
                      type="text"
                      name="schools"
                      value={villageDetails.schools}
                      onChange={handleVillageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">सरपंच</label>
                    <input
                      type="text"
                      name="headOfVillage"
                      value={villageDetails.headOfVillage}
                      onChange={handleVillageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">गाँव की विशेषताएँ</label>
                  <textarea
                    name="landmarks"
                    value={villageDetails.landmarks}
                    onChange={handleVillageChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
                >
                  जानकारी अपडेट करें
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">जनसंख्या</p>
                    <p className="font-medium">{villageDetails.population}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">मस्जिद</p>
                    <p className="font-medium flex items-center gap-1">
                      <FaMosque /> {villageDetails.mosque.length || '1'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">विद्यालय</p>
                    <p className="font-medium flex items-center gap-1">
                      <FaSchool /> {villageDetails.schools.length || '2'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">सरपंच</p>
                    <p className="font-medium">{villageDetails.headOfVillage}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">गाँव की विशेषताएँ</h3>
                  <p className="text-gray-700">{villageDetails.landmarks}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Community Call */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl p-6 text-center border border-amber-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">समुदाय को मजबूत बनाएं</h2>
          <p className="text-gray-700 mb-4">
            अपने गाँव के और सदस्यों को जोड़कर नायता पटेल नेटवर्क को और मजबूत बनाएं।
          </p>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto">
            <FaUserPlus /> नए सदस्य जोड़ें
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AmbassadorPortal;
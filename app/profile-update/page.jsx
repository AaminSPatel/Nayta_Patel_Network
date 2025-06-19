"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiUser, FiMapPin, FiPhone, FiArrowRight, FiCheck, FiMap } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { usePatel } from "../../components/patelContext"

export default function ProfileSetup() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [profileData, setProfileData] = useState({
    profilePic: null,
    village: "",
    ambassadorWill:false
  })
  const [previewUrl, setPreviewUrl] = useState(null)
const [manualVillage, setManualVillage] = useState(false);

  const {path,setUser , villages} = usePatel()
  const [allVillages,setAllVillages] = useState([])
  const [selectedVIllage,setSelectedVillage] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showVillageWarning, setShowVillageWarning] = useState(false);
  const [showImageWarning, setShowImageWarning] = useState(false);

 
  useEffect(()=>{
    if(villages){
      let villageByName = villages.map((village,i) =>village.name)
      setAllVillages(villageByName);
    }
  },[villages]) 
  
useEffect(() => {
  if (manualVillage && allVillages.includes(profileData.village)) {
    setManualVillage(false);
    // Optionally auto-select from list
  }
}, [profileData.village]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileData({
        ...profileData,
        profilePic: file,
      })

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  const nextStep = () => {
 
    setStep(step + 1)
  }

  const prevStep = () => {
     if(step === 3){
      setStep(step - 2)
    }
    setStep(step - 1)
  }

  const skipStep = () => {
    if (step < 3) {
         if(step === 2){
      setStep(step + 2)
    }
   // console.log( (!profileData.village), step === 2);
    
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  useEffect(()=>{
    if(profileData.village){
      let findVillage = villages.find((item)=>item.name === profileData.village)
     // console.log(findVillage);
      
setSelectedVillage(findVillage)
    }
  },[profileData.village])

   const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (isSubmitting) return; // Prevent multiple submissions
  
  setIsSubmitting(true);
  
  const token = localStorage.getItem('token');
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('village', profileData.village);
    formDataToSend.append('ambassadorWill', profileData.ambassadorWill);

    if (profileData.profilePic) {
      formDataToSend.append('image', profileData.profilePic);
    }

    const response = await fetch(path + '/api/users', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error('Failed to update user details');
    }

    const result = await response.json();
    console.log('Updated successfully:', result);
    setUser(result);
    router.push('/');
  } catch (error) {
    console.error('Error submitting user details:', error);
    // Optional: show error to user
  } finally {
    setIsSubmitting(false);
  }
};
  const stepVariants = {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col  p-2 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's set up your profile so others can get to know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <div className="flex justify-between items-center px-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step === i
                      ? "bg-emerald-600 text-white"
                      : step > i
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > i ? <FiCheck /> : i}
                </div>
              ))}
            </div>
            <div className="relative mt-2  mb-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                <span className="bg-white px-2 text-xs text-gray-500">Profile Picture</span>
                <span className="bg-white px-2 mr-12 text-xs text-gray-500">Village</span>
                <span className="bg-white px-2 text-xs -ml-8 text-gray-500">Ambassador</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
        {step === 1 && (
  <motion.div
    key="step1"
    variants={stepVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-6 min-h-96 relative"
  >
    <div className="text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">प्रोफाइल फोटो जोड़ें</h3>
      <p className="text-sm text-gray-500">अपने अकाउंट को व्यक्तिगत बनाने के लिए एक प्रोफाइल फोटो चुनें</p>
    </div>

    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-4">
        {previewUrl ? (
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="प्रोफाइल प्रिव्यू"
            className="w-full h-full rounded-full object-cover border-4 border-emerald-100"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center">
            <FiUser className="text-emerald-500 text-4xl" />
          </div>
        )}
        <label
          htmlFor="profile-pic"
          className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full cursor-pointer hover:bg-emerald-700 transition-colors"
        >
          <FiUser size={16} />
        </label>
        <input
          id="profile-pic"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">फोटो अपलोड करने के लिए बटन पर क्लिक करें</p>
    </div>

    <div className="flex justify-end absolute bottom-0 w-full">
      <button
        onClick={skipStep}
        className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hidden"
      >
        अभी छोड़ें
      </button>
      <button
        onClick={() => {
    if (!profileData.profilePic) {
      setShowImageWarning(true);
      setTimeout(() => setShowImageWarning(false), 2500); // Auto-hide after 2.5s
    } else {
      nextStep();
    }
  }}
        className={`flex items-center px-4 py-2  rounded-md  transition-colors
          ${!profileData.profilePic ?'cursor-not-allowed bg-emerald-800 text-gray-300 hover:bg-emerald-900':'bg-emerald-600 text-white hover:bg-emerald-700'}
          `}
      >
        आगे <FiArrowRight className="ml-2" />
      </button>
    </div>
    {showImageWarning && (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: -20, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow-lg z-50 text-sm"
  >
    कृपया पहले अपना प्रोफाइल फोटो जोड़ें!
  </motion.div>
)}
  </motion.div>
)}

 {step === 2 && (
  <motion.div
    key="step2"
    variants={stepVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-6 min-h-96 h-auto relative"
  >
    <div className="text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">अपना गाँव चुनें</h3>
      <p className="text-sm text-gray-500">लिस्ट से चुनें या मैन्युअली अपना गाँव डालें</p>
    </div>

    {/* District Filter */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">जिला</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMap className="text-gray-400" />
        </div>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="">सभी जिले</option>
          {Array.from(new Set(villages.map(v => v.district))).map((district, i) => (
            <option key={i} value={district}>{district}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Village Selection or Input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">गाँव</label>

      {!manualVillage ? (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <select
              id="village"
              name="village"
              value={profileData.village}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">गाँव चुनें</option>
              {villages
                .filter(v => !selectedDistrict || v.district === selectedDistrict)
                .map((village, i) => (
                  <option key={i} value={village.name}>{village.name}</option>
                ))}
            </select>
          </div>

          <p className="text-sm mt-2 text-gray-500">
            अपना गाँव नहीं मिल रहा है?{" "}
            <button
              type="button"
              onClick={() => {
                setManualVillage(true);
                setProfileData(prev => ({ ...prev, village: "" }));
              }}
              className="text-emerald-600 hover:underline"
            >
              खुद जोड़ें!
            </button>
          </p>
        </>
      ) : (
        <>
          <input
            type="text"
            name="village"
            value={profileData.village}
            onChange={handleInputChange}
            placeholder="अपने गाँव का नाम डालें"
            className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />

          <p className="text-sm mt-2 text-gray-500">
            लिस्ट से चुनना चाहते हैं?{" "}
            <button
              type="button"
              onClick={() => {
                setManualVillage(false);
                setProfileData(prev => ({ ...prev, village: "" }));
              }}
              className="text-emerald-600 hover:underline"
            >
              लिस्ट पर वापस जाएं!
            </button>
          </p>
        </>
      )}
    </div>

    {/* Show village info only if selected from list */}
    {!manualVillage && selectedVIllage && (
      <div className="bg-emerald-50 p-4 rounded-md">
        <h4 className="font-medium text-emerald-800 mb-2">{selectedVIllage.name}  के बारे में</h4>
        <p className="text-sm text-emerald-700 mb-2 line-clamp-3">
          {selectedVIllage.info || 'यह एक कृषि प्रधान समुदाय है...'}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
            जिला: {selectedVIllage.district}
          </span>
          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">
            आबादी: {selectedVIllage.population || '540'}
          </span>
          
        </div>
      </div>
    )}

    {/* Navigation Buttons */}
    <div className="flex justify-between absolut bottom-0 w-full">
      <button
        onClick={prevStep}
        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
      >
        पीछे
      </button>
      <button
        onClick={skipStep}
        className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hidden"
      >
        अभी छोड़ें
      </button>
      <button
  type="button"
  onClick={() => {
    if (!profileData.village) {
      setShowVillageWarning(true);
      setTimeout(() => setShowVillageWarning(false), 2500); // Auto-hide after 2.5s
    } else {
      nextStep();
    }
  }}
  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
    !profileData.village
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
      : 'bg-emerald-600 text-white hover:bg-emerald-700'
  }`}
>
  आगे <FiArrowRight className="ml-2" />
</button>

    </div>
    {showVillageWarning && (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: -20, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded shadow-lg z-50 text-sm"
  >
    कृपया पहले अपना गाँव चुनें!
  </motion.div>
)}
  </motion.div>
)}
{step === 3 && (
  <motion.div
    key="step3"
    variants={stepVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="space-y-6 min-h-96 relative"
  >
    <div className="text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">अपने गाँव {profileData?.village} के अम्बेसडर बनें</h3>
      <p className="text-sm text-gray-500">
        हमारे नायता पटेल समाज को मजबूत करने में मदद करने वाले उत्साही व्यक्तियों में शामिल हों।
      </p>
    </div>

    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
      <h3 className="font-semibold text-emerald-800 mb-2">गाँव अम्बेसडर नियम और शर्तें</h3>
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
        <li>मैं ईमानदारी से अपने गाँव की बात लोगों तक पहुँचाने का काम करूँगा।</li>
        <li>मैं सुधार के लिए अपनी सच्ची राय और सुझाव दूँगा।</li>
        <li>मैं अपने समाज की अच्छी बातों को लोगों तक पहुँचाने में मदद करूँगा।</li>
        <li>मैं गाँव से जुड़ी जानकारियों को सही और अपडेटेड रखूँगा।</li>
        <li>मैं अपने गाँव से जुड़ी खबरें पोस्ट करूँगा, और मुझे ही यह विशेष अधिकार मिलेगा।</li>
        <li>यह एक सेवा का पद है — इसमें कोई पैसे या इनाम नहीं मिलेगा, लेकिन सम्मान ज़रूर मिलेगा।</li>
      </ol>
    </div>

    <div className="flex items-start">
      <input
        id="ambassador-agree"
        type="checkbox"
        checked={profileData.ambassadorWill}
        onChange={(e) => setProfileData({
          ...profileData,
          ambassadorWill: e.target.checked
        })}
        className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
      />
      <label htmlFor="ambassador-agree" className="ml-2 block text-sm text-gray-700">
        मैं इन सभी नियमों और शर्तों से पूरी तरह सहमत हूँ और गाँव अम्बेसडर बनने के लिए तैयार हूँ।
      </label>
    </div>

    
                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
                  >
                    पीछे
                  </button>
                  
                 <motion.button
  onClick={handleSubmit}
  disabled={isSubmitting}
  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
    isSubmitting 
      ? 'bg-emerald-400 cursor-not-allowed' 
      : 'bg-emerald-600 hover:bg-emerald-700'
  } text-white`}
  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
>
  {isSubmitting ? (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
    />
  ) : (
    <>
      Submit <FiCheck className="ml-2" />
    </>
  )}
</motion.button>
                </div>
  </motion.div>
)}
     
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import { 
  FaDownload, 
  FaShare, 
  FaFacebook, 
  FaWhatsapp,
  FaTwitter,
  FaUsers,
  FaMedal,
  FaHome,
  FaChartLine,
  FaHandsHelping
} from 'react-icons/fa'
import { usePatel } from './patelContext'

const ResponsiveCommunityCards = () => {
  const cardRef = useRef(null)
  const [currentCardType, setCurrentCardType] = useState('welcome')
  const [showSocialIcons, setShowSocialIcons] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const {user} = usePatel();
  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])
const [userData,setUserData] = useState({
    name:  "नयता पटेल सदस्य",
    village: "",
    profilePic: "",
    mobile:"",
    memberSince:  "",
    contributions:  0,
    achievements:  ["समाज सेवा", "शिक्षा प्रेरक"]
  
})
  // User data with fallbacks

  useEffect(()=>{
if(user){
  setUserData({
    name: user?.fullname || "नायता पटेल सदस्य",
    village: user?.village || "इंदौर",
    mobile: user?.mobile || "0000000000",
    profilePic: user?.profilepic.url || "/default-user.png",
    memberSince: user?.createdAt || "2023",
    contributions: user?.posts?.length || 0,
    achievements: user?.achievements || ["समाज सेवा", "शिक्षा प्रेरक"]
  })
}
  }, [user])
  // Card content data
  const cardTypes = {
    welcome: {
      title: "नायता पटेल नेटवर्क में आपका स्वागत है!",
      subtitle: "हमारे समाज का गौरवशाली सदस्य",
      icon: <FaHome className="text-3xl lg:text-4xl text-indigo-600" />,
      content: (
        <div className="text-sm lg:text-base">
          <p className="mb-2 lg:mb-3">प्रिय {userData.name},</p>
          <p>आपका हमारे नायता पटेल नेटवर्क में स्वागत है! हमारा यह डिजिटल परिवार मध्य प्रदेश के नायता पटेल समाज को जोड़ने और समृद्ध करने के लिए समर्पित है।</p>
          <p className="mt-2 lg:mt-3 font-medium">आपकी सदस्यता हमारे लिए मूल्यवान है!</p>
        </div>
      ),
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-800"
    },
    ambassador: {
      title: `${userData.village} गाँव के राजदूत`,
      subtitle: "नायता पटेल नेटवर्क प्रतिनिधि",
      icon: <FaUsers className="text-3xl lg:text-4xl text-amber-600" />,
      content: (
        <div className="text-sm lg:text-base">
          <div className="flex items-center mb-3">
            <img 
              src={userData.profilePic} 
              alt={userData.name}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-md mr-3"
            />
            <div>
              <p className="font-medium">{userData.name}</p>
              <p className="text-xs lg:text-sm text-gray-600">{userData.village}</p>
            </div>
          </div>
          <p className="mb-2 lg:mb-3">आपको {userData.village} गाँव का आधिकारिक राजदूत नियुक्त किया गया है!</p>
          <div className="p-2 lg:p-3 bg-amber-100 rounded-lg">
            <p className="text-xs lg:text-sm font-medium">अपने गाँव से 10+ नए सदस्य जोड़कर विशेष पुरस्कार प्राप्त करें!</p>
          </div>
        </div>
      ),
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800"
    },
    achievement: {
      title: "समाज रत्न पुरस्कार",
      subtitle: "उत्कृष्ट सेवा के लिए",
      icon: <FaMedal className="text-3xl lg:text-4xl text-yellow-600" />,
      content: (
        <div className="text-sm lg:text-base">
          <div className="flex items-center mb-3">
            <img 
              src={userData.profilePic} 
              alt={userData.name}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white shadow-md mr-3"
            />
            <div>
              <p className="font-medium">{userData.name}</p>
              <p className="text-xs lg:text-sm text-gray-600">{userData.village}</p>
            </div>
          </div>
          <p className="mb-1 lg:mb-2">को उनकी उत्कृष्ट सेवाओं के लिए</p>
          <ul className="text-xs lg:text-sm list-disc pl-4 space-y-1">
            {userData.achievements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-2 lg:mt-3 text-xs lg:text-sm italic">प्रस्तुत: नायता पटेल नेटवर्क</p>
        </div>
      ),
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800"
    }
  }

  const captureCard = async () => {
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: null,
        logging: false
      })
      
      const link = document.createElement('a')
      link.download = `nayta-patel-${currentCardType}-${userData.name.replace(/\s+/g, '-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error capturing card:', error)
    }
  }

  const shareOnSocial = (platform) => {
    const card = cardTypes[currentCardType]
    const shareText = `मैं ${card.title} हूँ - ${card.subtitle} | नयता पटेल नेटवर्क #NaytaPatelPride`
    const shareUrl = "https://naytapatelnetwork.vercel.app/"
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank')
        break
      default:
        break
    }
    
    setShowSocialIcons(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Card Type Selector - Responsive */}
      <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide">
        {Object.keys(cardTypes).map((type) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentCardType(type)}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${
              currentCardType === type 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {type === 'welcome' && 'स्वागत कार्ड'}
            {type === 'ambassador' && 'राजदूत कार्ड'}
            {type === 'achievement' && 'पुरस्कार कार्ड'}
          </motion.button>
        ))}
      </div>

      {/* Responsive Card Container */}
      <div className="flex justify-center">
        <motion.div
          key={currentCardType}
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`w-full max-w-md md:max-w-lg lg:max-w-2xl ${
            cardTypes[currentCardType].bgColor
          } ${
            cardTypes[currentCardType].borderColor
          } border-2 rounded-xl shadow-lg p-4 md:p-6 flex flex-col`}
        >
          {/* Card Header */}
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <div className={`${cardTypes[currentCardType].textColor}`}>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">{cardTypes[currentCardType].title}</h2>
              <p className="text-xs md:text-sm">{cardTypes[currentCardType].subtitle}</p>
            </div>
            <div className="p-2 bg-white rounded-full shadow-sm">
              {cardTypes[currentCardType].icon}
            </div>
          </div>

          {/* Card Content - Responsive sizing */}
          <div className={`flex-grow ${cardTypes[currentCardType].textColor} overflow-visible`}>
            {cardTypes[currentCardType].content}
          </div>

          {/* Footer with Branding */}
          <div className="mt-3 md:mt-4 text-center">
            <p className="text-xs md:text-sm font-medium text-gray-600">नायता पटेल नेटवर्क - मध्य प्रदेश</p>
            <p className="text-[10px] md:text-xs text-gray-500">naytapatelnetwork.vercel.app</p>
          </div>
        </motion.div>
      </div>

      {/* Responsive Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={captureCard}
          className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 bg-indigo-600 text-white rounded-lg shadow-md text-xs md:text-sm"
        >
          <FaDownload className="text-xs md:text-sm" /> डाउनलोड
        </motion.button>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSocialIcons(!showSocialIcons)}
            className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 bg-green-600 text-white rounded-lg shadow-md text-xs md:text-sm"
          >
            <FaShare className="text-xs md:text-sm" /> शेयर
          </motion.button>
          
          {showSocialIcons && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full left-0 mb-2 flex gap-2 bg-white p-2 rounded-lg shadow-lg"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => shareOnSocial('facebook')}
                className="p-1 md:p-2 text-blue-600 bg-blue-50 rounded-full"
              >
                <FaFacebook size={isMobile ? 16 : 20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => shareOnSocial('twitter')}
                className="p-1 md:p-2 text-blue-400 bg-blue-50 rounded-full"
              >
                <FaTwitter size={isMobile ? 16 : 20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => shareOnSocial('whatsapp')}
                className="p-1 md:p-2 text-green-500 bg-green-50 rounded-full"
              >
                <FaWhatsapp size={isMobile ? 16 : 20} />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Additional CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 bg-amber-600 text-white rounded-lg shadow-md text-xs md:text-sm"
        >
          <FaUsers className="text-xs md:text-sm" /> नया सदस्य
        </motion.button>
      </div>

      {/* Responsive Promotion Banner */}
      <div className="mt-6 p-3 md:p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
        <h3 className="text-base md:text-lg lg:text-xl font-bold mb-1 md:mb-2">अपने गाँव का राजदूत बनें!</h3>
        <p className="text-xs md:text-sm mb-2 md:mb-3">10+ सदस्य जोड़कर विशेष "ग्राम रत्न" बैज प्राप्त करें</p>
        <button className="px-3 py-1 md:px-4 md:py-2 bg-white text-indigo-600 rounded-lg font-medium text-xs md:text-sm">
          अभी रजिस्टर करें
        </button>
      </div>
    </div>
  )
}

export default ResponsiveCommunityCards
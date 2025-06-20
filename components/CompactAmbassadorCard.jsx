'use client'

import { useEffect, useRef, useState } from 'react';
import { motion,AnimatePresence  } from 'framer-motion';
import html2canvas from 'html2canvas';
import { usePatel } from './patelContext';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  
  FaDownload,
  FaShare,
  FaEnvelope,
  FaMapPin,
  FaPhone,
  FaInstagram
} from 'react-icons/fa';
//import './AmbassadorCard.css';

const ResponsiveAmbassadorCard = (ambassador) => {
  const cardRef = useRef(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [showIcons, setShowIcons] = useState(false);  const { siteUrl, siteBrand, user } = usePatel();
  const icons = [
    { id: "facebook", icon: <FaFacebook />, color: "text-blue-600" },
    { id: "twitter", icon: <FaTwitter />, color: "text-sky-500" },
    { id: "whatsapp", icon: <FaWhatsapp />, color: "text-green-500" },
    { id: "instagram", icon: <FaInstagram />, color: "text-red-600" },
  ];
  // Default ambassador data
  const [defaultAmbassador, setDefaultAmbassador] = useState({
    name: 'John Doe',
    village: 'Green Valley',
    image: '/placeholder-ambassador.jpg',
    role: 'Community Ambassador',
    contact: 'contact@example.com',
    achievements: 'Organized community events, Environmental initiatives'
  });

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    
      setDefaultAmbassador({
        name: ambassador?.user?.fullname,
        village: ambassador?.user?.village,
        image: ambassador?.user?.profilepic?.url || '/user.avif',
        role: 'Village Ambassador',
        contact: ambassador?.user?.mobile,
        achievements:ambassador?.user?.achievement || 'गांव के लिए एम्बेसडर बनकर इन्होंने समाज में सकारात्मक बदलाव लाने की दिशा में एक कदम बढ़ाया है। हम इनसे अनुरोध करते हैं कि आगे भी हमारे नेटवर्क को मजबूत बनाने में सहयोग करें।'
      });
    
  }, []);
const iconVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
  exit: { opacity: 0, x: -10 },
};
  // Merge with passed data
  const data = { ...defaultAmbassador, ...ambassador };

  const captureCard = async () => {
    if (!cardRef.current) return;
    document.getElementById('village').classList.remove=`village-info-card`;

    try {

      const canvas = await html2canvas(cardRef.current, {
        scale: 4,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#000'
      });
      
      const link = document.createElement('a');
      link.download = `${data.village}-ambassador-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      document.getElementById('village').classList.add=`village-info-card`;
    } catch (error) {
      console.error('Error capturing card:', error);
    }
  };

  const shareOnSocial = (platform) => {
    const shareText = ` ${data.village} के ${data.name}   को सलाम! इन्होंने हमारे नेटवर्क पर सक्रिय रहते हुए गांव की जानकारी अपडेट कर बहुत ही सराहनीय कार्य किया है। आपका योगदान काबिल-ए-तारीफ़ है! Nayta Patel Network उनकी इस पहल का हार्दिक अभिनंदन करता है और आभार व्यक्त करता है।`;
    const shareUrl = `${siteUrl}/village/${ambassador.villageId}`;
    //console.log(data);
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        break;
      case 'instagram':
  navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    .then(() => {
     // alert("Copied! Paste it in your Instagram story/status.");
      window.open('https://www.instagram.com/', '_blank');
    })
    .catch((err) => {
      console.error("Clipboard error:", err);
      //alert("Failed to copy. Please copy manually.");
    });
  break;

      default:
        break;
    }
    
    setShowSocialIcons(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Responsive Card Container */}
      <div 
        ref={cardRef}
        className={`ambassador-card relative ${isLandscape ? 'landscape' : 'portrait'}`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981] opacity-10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#10b981] opacity-10 rounded-tr-full"></div>
        
        {/* Card Content - changes layout based on orientation */}
        <div className={`h-full flex ${isLandscape ? 'flex-row' : 'flex-col'} items-center w-full`}>
          {/* Profile Image Section */}
          <div className={`${isLandscape ? 'w-1/3 h-full' : 'w-full mx-2 h-1/3'} flex items-center justify-center p-4`}>
            <div className={`${isLandscape ? 'w-32 h-32' : 'w-24 h-24'} rounded-full border-4 border-[#10b981] overflow-hidden shadow-md bg-white`}>
              <img 
                className="w-full h-full object-cover" 
                src={data.image} 
                alt={data.name}
              />
            </div>
          </div>
          
          {/* Info Section */}
          <div className={`${isLandscape ? 'w-full h-full' : 'w-full h-auto'} p-4 flex flex-col justify-between`}>
            <div>
              <h3 className="text-xl font-bold text-[#1f2937] text-center mb-0.5 capitalize">{data.name}</h3>
              <p className="text-xs text-[#059669] font-medium text-center">{data.role}</p>
              
              <div id='village' className="mt-3 bg-[#fff] .village-info-card rounded-lg p-2 ">
                <p className="text-xs  text-gray-800 flex gap-2 items-center "><span className='text-emerald-500'><FaMapPin/> </span>{data.village}</p>
                <p className="text-xs text-gray-800 mt-1 flex gap-2 items-center"><span className='text-emerald-500'><FaPhone/> </span> {data.contact}</p>
              </div>
              
              { (
                <p className="text-xs text-gray-700 text-center laila my-3 mb-6">{data.achievements}</p>
              )}
            </div>
            
            {/* Website and Watermark */}
            <div>
              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-[#a7f3d0]"></div>
                <div className="px-2 text-[#10b981]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 border-t border-[#a7f3d0]"></div>
              </div>
              
              <p className="text-xs text-[#047857] font-medium text-center">
                <a href={siteUrl}>{siteBrand}</a>
              </p>
              <p className="text-[8px] text-[#9ca3af] opacity-70 text-center mt-1">
                Official Village Ambassador
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Sharing and Download Buttons */}
      <div className="flex items-center gap-2 relative my-4">
      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowIcons(!showIcons)}
        className="text-xl text-gray-700 hover:text-black"
      >
        <FaShare />
      </motion.button>

      {/* Social Icons */}
      <AnimatePresence>
        {showIcons && (
          <>
            {icons.map((item, index) => (
              <motion.div
                key={item.id}
                className={`cursor-pointer ${item.color} text-xl`}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={iconVariants}
                onClick={() => shareOnSocial(item.id)}
              >
                {item.icon}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
};

export default ResponsiveAmbassadorCard;


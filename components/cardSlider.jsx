'use client'
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { 
  FaDownload, 
  FaShare, 
  FaFacebook, 
  FaWhatsapp, 
  FaTwitter,
  FaTractor,
  FaGraduationCap,
  FaBuilding,
  FaSeedling,
  FaHardHat
} from 'react-icons/fa';

const ComplimentCardsSlider = () => {
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [currentCard, setCurrentCard] = useState(0);
  const [showSocialIcons, setShowSocialIcons] = useState(false);
  
  // Card data in Hindi with English translations (for reference)
  const cards = [
    {
      title: "किसान सम्मान",
      subtitle: "हमारे समाज का गौरव",
      icon: <FaSeedling className="text-4xl text-green-600" />,
      compliment: "आपकी मेहनत से हमारे समाज की पहचान बनती है। अन्नदाता होने का गौरव आपको मिला है!",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800"
    },
    {
      title: "शिक्षा प्रेरक",
      subtitle: "समाज का भविष्य",
      icon: <FaGraduationCap className="text-4xl text-blue-600" />,
      compliment: "आपके बच्चों की शिक्षा हमारे समाज के उज्ज्वल भविष्य की नींव है।",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800"
    },
    {
      title: "निर्माण विशेषज्ञ",
      subtitle: "समाज की मजबूती",
      icon: <FaBuilding className="text-4xl text-amber-600" />,
      compliment: "आपके हाथों से बनते हैं हमारे समाज के सपनों के घर!",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-800"
    },
    {
      title: "ट्रैक्टर राजा",
      subtitle: "आधुनिक किसान",
      icon: <FaTractor className="text-4xl text-red-600" />,
      compliment: "आपकी ट्रैक्टर की आवाज हमारे समाज की प्रगति का संगीत है!",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800"
    },
    {
      title: "ठेकेदार सम्मान",
      subtitle: "रोजगार दाता",
      icon: <FaHardHat className="text-4xl text-purple-600" />,
      compliment: "आपके प्रयासों से सैकड़ों परिवारों को रोजगार मिलता है!",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-800"
    }
  ];

  const captureCard = async () => {
    try {
      const canvas = await html2canvas(cardRefs[currentCard].current, {
        scale: 3,
        backgroundColor: null,
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = `nayta-patel-samaj-${cards[currentCard].title.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error capturing card:', error);
    }
  };

  const shareOnSocial = (platform) => {
    const shareText = `मैं ${cards[currentCard].title} हूँ - ${cards[currentCard].compliment} #NaytaPatelNetwork`;
    const shareUrl = "https://naytapatelnetwork.vercel.app/";
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        break;
      default:
        break;
    }
    
    setShowSocialIcons(false);
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Slider Controls */}
      <div className="flex justify-between items-center mb-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={prevCard}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          &larr;
        </motion.button>
        
        <span className="text-sm font-medium">
          {currentCard + 1} / {cards.length}
        </span>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={nextCard}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          &rarr;
        </motion.button>
      </div>

      {/* Card Container */}
      <div className="relative h-96">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            ref={cardRefs[index]}
            initial={{ opacity: 0, x: index > currentCard ? 100 : -100 }}
            animate={{ 
              opacity: index === currentCard ? 1 : 0,
              x: index === currentCard ? 0 : (index > currentCard ? 100 : -100),
              zIndex: index === currentCard ? 10 : 1
            }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${card.bgColor} ${card.borderColor} border-2 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center`}
          >
            <div className={`${card.textColor} text-center`}>
              {card.icon}
              <h2 className="text-2xl font-bold mt-2">{card.title}</h2>
              <p className="text-sm mb-4">{card.subtitle}</p>
              <p className="text-lg leading-relaxed">{card.compliment}</p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">Nayta Patel Network</p>
              <p className="text-xs text-gray-400">naytapatelnetwork.vercel.app</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={captureCard}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md"
        >
          <FaDownload /> डाउनलोड करें
        </motion.button>
        
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSocialIcons(!showSocialIcons)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md"
          >
            <FaShare /> शेयर करें
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
                className="p-2 text-blue-600 bg-blue-50 rounded-full"
              >
                <FaFacebook size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => shareOnSocial('twitter')}
                className="p-2 text-blue-400 bg-blue-50 rounded-full"
              >
                <FaTwitter size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => shareOnSocial('whatsapp')}
                className="p-2 text-green-500 bg-green-50 rounded-full"
              >
                <FaWhatsapp size={20} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplimentCardsSlider;
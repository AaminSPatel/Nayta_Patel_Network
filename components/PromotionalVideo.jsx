"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  FaUsers,
  FaLeaf,
  FaHandshake,
  FaGlobe,
  FaRocket,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaLightbulb,
  FaConnectdevelop,
  FaUserFriends,
  FaSeedling,
  FaAward,
  FaComments,
  FaBullhorn,
  FaPlay,
} from "react-icons/fa"

// Typewriter Animation Hook
function useTypewriter(text, speed = 40) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return displayText
}

// Extended Advertisement Video Component (35+ seconds)
function AdvertisementVideo() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // All the text content from your card
  const cardContent = {
    title: "नायता पटेल नेटवर्क",
    subtitle: "समाज को जोड़ने का डिजिटल मंच",
    features: ["मंडी भाव", "सफलता की कहानियाँ", "ब्लॉग्स", "गाँव की जानकारी"],
    ctaText1: "सामाजिक मुद्दे पर चर्चा करें",
    ctaText2: "अपने गाँव के एम्बेसडर बनें",
    bannerText: "आज ही जुड़ें और पंजीकरण करें",
    websiteUrl: "https://naytapatelnetwork.vercel.app/",
  }

  const typewriterText = `${cardContent.title} - ${cardContent.subtitle}। ${cardContent.features.join(", ")} जैसी सुविधाएं। ${cardContent.ctaText1} ${cardContent.ctaText2} ${cardContent.bannerText}`
  const displayedText = useTypewriter(currentStep === 3 ? typewriterText : "", 80)

  useEffect(() => {
    if (!isPlaying) return

    const timeouts = [
      setTimeout(() => setCurrentStep(1), 3000), // Logo for 4s
      setTimeout(() => setCurrentStep(2), 10000), // Card slide for 4s
      setTimeout(() => setCurrentStep(3), 15000), // Features showcase for 6s
      setTimeout(() => setCurrentStep(4), 21000), // Typewriter text for 8s
      setTimeout(() => setCurrentStep(5), 29000), // Final CTA for 8s
      setTimeout(() => {
        setCurrentStep(0)
        setIsPlaying(false)
      }, 29000), // Total 38 seconds
    ]

    return () => timeouts.forEach(clearTimeout)
  }, [isPlaying])

  const startVideo = () => {
    setCurrentStep(0)
    setIsPlaying(true)
  }

  return (
    <div className="relative w-full h-[530px] bg-gradient-to-br from-orange-400 to-orange-600  overflow-hidden shadow-2xl">
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={startVideo}
            className="bg-white text-black p-8 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPlay className="text-6xl" />
          </motion.button>
          <div className="absolute bottom-8 text-white text-center">
            <p className="text-xl font-bold">35+ सेकंड का प्रमोशनल वीडियो</p>
            <p className="text-lg">प्ले बटन दबाएं</p>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Logo Introduction (4s) */}
        {currentStep === 0 &&  isPlaying && (
          <motion.div
            key="logo-intro"
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #ff9a56 0%, #ff7b39 50%, #ff6b2b 100%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-center"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="w-40 h-40 bg-white rounded-full overflow-hidden flex items-center justify-center mb-6 mx-auto shadow-2xl"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(255, 255, 255, 0.4)", "0 0 0 30px rgba(255, 255, 255, 0)"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <img src={'/tactor.png'} alt="logo" className=" h-40 w-40 scale-90" />
              </motion.div>
              <motion.h1
                className="text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {cardContent.title}
              </motion.h1>
              <motion.p
                className="text-2xl text-white opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1 }}
              >
                {cardContent.subtitle}
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Your Original Card Sliding In (4s) */}
        {currentStep === 1 && (
          <motion.div
            key="card-slide"
            className="absolute inset-0 flex items-center justify-center p-8"
            style={{
              background: "linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative"
              initial={{ x: "-100%", rotate: -15 }}
              animate={{ x: 0, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Your Original Card Design */}
              <motion.div
                className="w-96 rounded-lg scale-90 p-8 shadow-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #ff9a56 0%, #ff7b39 50%, #ff6b2b 100%)",
                  color: "#4a2c2a",
                }}
                animate={{
                  y: [0, -10, 0],
                  boxShadow: [
                    "0 10px 30px rgba(0, 0, 0, 0.2)",
                    "0 20px 50px rgba(0, 0, 0, 0.3)",
                    "0 10px 30px rgba(0, 0, 0, 0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.h1
                  className="text-3xl font-bold text-center mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  {cardContent.title}
                </motion.h1>

                <motion.p
                  className="text-lg text-center mb-6 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  {cardContent.subtitle}
                </motion.p>

                <motion.div className="space-y-3 mb-6 ml-12">
                  {cardContent.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 + index * 0.2 }}
                    >
                      <span className="w-6 h-6 border-2 border-current flex items-center justify-center mr-4 text-sm font-bold rounded">
                        ✓
                      </span>
                      <span className="font-semibold text-lg">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <p className="text-lg font-bold mb-2">{cardContent.ctaText1}</p>
                  <p className="text-lg font-bold">{cardContent.ctaText2}</p>
                </motion.div>

                <motion.div
                  className="bg-black text-orange-400 text-center py-3 -mx-8 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                >
                  <p className="font-bold text-lg">{cardContent.bannerText}</p>
                </motion.div>

                <motion.div
                  className="bg-white bg-opacity-90 rounded-full p-3 text-center -mx-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.3 }}
                >
                  <p className="font-bold">Nayta Patel Network</p>
                  <p className="text-sm">🌐 {cardContent.websiteUrl}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Features Showcase (6s) */}
        {currentStep === 2 && (
          <motion.div
            key="features"
            className="absolute inset-0 bg-center  bg-gradient-to-br from-emerald-500 to-emerald-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{backgroundImage:`url('/kisan2.png')`,backgroundSize:'170%'}}
          >
            <div className="flex items-center justify-center h-full p-8 gap-5">
               {/*  <div className="h-auto w-1/2">
<img src="/kisan1.png" alt="Logo Image" className="h-[400px] rounded w-full"/>
                    </div> */}        
                        <div className="flex flex-col  gap-5 max-w-4xl ml-56">
                {cardContent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl px-4 py-2 text-center shadow-2xl flex items-center"
                    initial={{ opacity: 0, scale: 0, x: 500 }}
                    animate={currentStep === 2 && isPlaying?{ opacity: 1, scale: 1, x: 0 }:''}
                    transition={{
                      delay: index * 0.5,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 30 }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                      className="text-3xl text-amber-500 "
                    >
                      {index === 0 && <FaLeaf className="mx-auto mr-4" />}
                      {index === 1 && <FaStar className="mx-auto mr-4" />}
                      {index === 2 && <FaLightbulb className="mx-auto mr-4" />}
                      {index === 3 && <FaGlobe className="mx-auto mr-4" />}
                    </motion.div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 min-w-26">{feature}</h3>

                         <motion.div
                      className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: index * 0.5 + 1, duration: 1 }}
                    >
                      <motion.div
                        className="h-full bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.5 + 1.5, duration: 1 }}
                      />
                    </motion.div>

                    </div>
                   
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Typewriter Text with Card Background (8s) */}
        {currentStep === 3 && (
          <motion.div
            key="typewriter"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #ff9a56 0%, #ff7b39 50%, #ff6b2b 100%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white scale-75 rounded-3xl p-12 max-w-4xl mx-8 shadow-2xl relative overflow-hidden"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 8 }}
              />

              <div className="text-center mb-8">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                  className="inline-block"
                >
                  <FaRocket className="text-6xl text-orange-500" />
                </motion.div>
              </div>

              <div className="text-gray-800 text-2xl leading-relaxed min-h-[300px] text-center">
                {displayedText}
                <motion.span
                  className="inline-block w-1 h-8 bg-orange-500 ml-2"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>

              <motion.div
                className="mt-8 flex justify-center space-x-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6 }}
              >
                {[FaUsers, FaHandshake, FaHeart].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      delay: index * 0.2,
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Icon className="text-2xl" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 5: Final Call to Action with Website (8s) */}
        {currentStep === 4 &&  (
          <motion.div
            key="final-cta"
            className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-center scale-75 text-white max-w-4xl px-8">
              <motion.div
                className="mb-12"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
              {/*   <motion.div
                  className="w-20 h-20 hidden bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8"
                  animate={{
                    boxShadow: ["0 0 0 0 rgba(255, 154, 86, 0.4)", "0 0 0 40px rgba(255, 154, 86, 0)"],
                    rotate: [0, 360],
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                    rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                >
                  <FaStar className="text-4xl text-white" />
                </motion.div>
 */}
                <motion.h1
                  className="text-6xl font-bold mb-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {cardContent.title}
                </motion.h1>

                <motion.p
                  className="text-3xl mb-8 text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  {cardContent.subtitle}
                </motion.p>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <motion.div
                  className="bg-orange-500 p-6 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <h3 className="text-2xl font-bold mb-2">{cardContent.ctaText1}</h3>
                </motion.div>
                <motion.div
                  className="bg-orange-500 p-6 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{cardContent.ctaText2}</h3>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-white text-black p-8 rounded-3xl inline-block"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 4, duration: 1, type: "spring" }}
              >
                <motion.p
                  className="text-3xl font-bold mb-4"
                  animate={{ color: ["#000", "#ff6b2b", "#000"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {cardContent.bannerText}
                </motion.p>
                <motion.p
                  className="text-xl font-bold text-orange-600"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  🌐 {cardContent.websiteUrl}
                </motion.p>
              </motion.div>

              {/* <motion.div
                className="mt-8 hidden justify-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6 }}
              >
                {[FaBullhorn, FaRocket, FaUsers].map((Icon, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      y: { duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 },
                      rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 },
                    }}
                  >
                    <Icon className="text-6xl text-orange-400" />
                  </motion.div>
                ))}
              </motion.div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 h-2 bg-white bg-opacity-30"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 30, ease: "linear" }}
        />
      )}
    </div>
  )
}

// Animated Promotional Posters
export default function AnimatedPromotionalContent() {
  const [selectedPoster, setSelectedPoster] = useState(null)

  const posterVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div className="max-w-7xl mx-auto" initial="hidden" animate="visible" variants={staggerContainer}>
        <motion.h1 className="text-4xl font-bold text-center mb-8 text-gray-800" variants={posterVariants}>
          नायता पटेल नेटवर्क - प्रमोशनल कंटेंट
        </motion.h1>

        {/* Advertisement Video Section */}
        <motion.div className="mb-12" variants={posterVariants}>
          <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600">विज्ञापन वीडियो</h2>
          <AdvertisementVideo />
        </motion.div>

        <motion.h2 className="text-3xl font-bold text-center mb-8 text-emerald-600" variants={posterVariants}>
          प्रमोशनल पोस्टर्स
        </motion.h2>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
          {/* Poster 1 - Community Focus */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-emerald-500 cursor-pointer"
            variants={posterVariants}
            whileHover="hover"
            onClick={() => setSelectedPoster(1)}
          >
            <motion.div
              className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-white"
              whileHover={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            >
              <motion.div
                className="flex items-center justify-center mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <FaUsers className="text-6xl" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                समुदाय से जुड़ें
              </motion.h2>
              <motion.p
                className="text-center text-lg opacity-90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.5 }}
              >
                अपने गाँव के विकास में भागीदार बनें
              </motion.p>
            </motion.div>
            <div className="p-6 bg-white">
              <div className="space-y-4">
                {[
                  { icon: FaHeart, text: "सामुदायिक सेवा" },
                  { icon: FaHandshake, text: "सहयोग और मदद" },
                  { icon: FaGlobe, text: "डिजिटल कनेक्शन" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <item.icon className="text-emerald-500 text-xl" />
                    <span className="text-gray-800 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mt-6 bg-black text-white text-center py-3 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-bold">nayatapatalnetwork.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Poster 2 - Success Stories */}
          <motion.div
            className="bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
            variants={posterVariants}
            whileHover="hover"
            onClick={() => setSelectedPoster(2)}
          >
            <div className="p-8">
              <div className="text-center mb-6">
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <FaStar className="text-6xl text-emerald-400 mx-auto mb-4" />
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  सफलता की कहानियाँ
                </motion.h2>
                <motion.p
                  className="text-emerald-400 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  प्रेरणादायक अनुभव साझा करें
                </motion.p>
              </div>

              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="bg-emerald-500 p-4 rounded-lg text-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <FaAward className="text-3xl text-white mx-auto mb-2" />
                  <span className="text-white font-bold">उपलब्धियाँ</span>
                </motion.div>
                <motion.div
                  className="bg-emerald-500 p-4 rounded-lg text-center"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <FaLightbulb className="text-3xl text-white mx-auto mb-2" />
                  <span className="text-white font-bold">नवाचार</span>
                </motion.div>
              </motion.div>

              <div className="text-center">
                <motion.p
                  className="text-white text-xl font-bold mb-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  आज ही अपनी कहानी साझा करें!
                </motion.p>
                <motion.div
                  className="bg-white text-black py-3 px-6 rounded-full inline-block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="font-bold">nayatapatalnetwork.com</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Poster 3 - Digital Platform */}
          <motion.div
            className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-emerald-600 cursor-pointer"
            variants={posterVariants}
            whileHover="hover"
            onClick={() => setSelectedPoster(3)}
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <motion.div
                  className="bg-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: [
                      "0 5px 15px rgba(16, 185, 129, 0.3)",
                      "0 15px 30px rgba(16, 185, 129, 0.5)",
                      "0 5px 15px rgba(16, 185, 129, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FaRocket className="text-4xl text-white" />
                </motion.div>
                <motion.h2
                  className="text-4xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  डिजिटल क्रांति
                </motion.h2>
                <motion.p
                  className="text-emerald-600 text-xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  नायता पटेल नेटवर्क
                </motion.p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: FaConnectdevelop,
                    title: "तकनीकी समाधान",
                    desc: "आधुनिक डिजिटल प्लेटफॉर्म",
                    bg: "bg-black",
                    textColor: "text-white",
                    iconColor: "text-emerald-400",
                  },
                  {
                    icon: FaUserFriends,
                    title: "सामुदायिक नेटवर्क",
                    desc: "सभी को जोड़ने का माध्यम",
                    bg: "bg-emerald-500",
                    textColor: "text-white",
                    iconColor: "text-white",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`${item.bg} ${item.textColor} p-4 rounded-lg flex items-center space-x-4`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.2 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <item.icon className={`text-3xl ${item.iconColor}`} />
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm opacity-80">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 text-center bg-black text-emerald-400 py-4 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl font-bold">nayatapatalnetwork.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Poster 4 - Agriculture Focus */}
          <motion.div
            className="bg-emerald-600 rounded-2xl shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
            variants={posterVariants}
            whileHover="hover"
            onClick={() => setSelectedPoster(4)}
          >
            <div className="p-8 text-white">
              <div className="text-center mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FaSeedling className="text-6xl mx-auto mb-4" />
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  कृषि विकास
                </motion.h2>
                <motion.p
                  className="text-xl opacity-90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 0.5 }}
                >
                  किसानों के लिए डिजिटल प्लेटफॉर्म
                </motion.p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                {[
                  { icon: FaLeaf, text: "मंडी भाव की जानकारी", bg: "bg-white", textColor: "text-emerald-600" },
                  {
                    icon: FaShieldAlt,
                    text: "फसल सुरक्षा सलाह",
                    bg: "bg-black",
                    textColor: "text-white",
                    iconColor: "text-emerald-400",
                  },
                  { icon: FaComments, text: "किसान चर्चा मंच", bg: "bg-white", textColor: "text-emerald-600" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`${item.bg} ${item.textColor} p-4 rounded-lg flex items-center space-x-3`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                  >
                    <item.icon className={`text-2xl ${item.iconColor || item.textColor}`} />
                    <span className="font-bold">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <motion.p
                  className="text-2xl font-bold mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  आज ही जुड़ें!
                </motion.p>
                <motion.div
                  className="bg-black text-emerald-400 py-3 px-6 rounded-full inline-block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="font-bold text-lg">nayatapatalnetwork.com</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Poster 5 - Call to Action */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-black cursor-pointer"
            variants={posterVariants}
            whileHover="hover"
            onClick={() => setSelectedPoster(5)}
          >
            <motion.div className="bg-black p-6" whileHover={{ backgroundColor: "#1f2937" }}>
              <div className="text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FaBullhorn className="text-5xl text-emerald-400 mx-auto mb-4" />
                </motion.div>
                <motion.h2
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  अभी रजिस्टर करें!
                </motion.h2>
              </div>
            </motion.div>

            <div className="p-8">
              <div className="text-center mb-6">
                <motion.h3
                  className="text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  नायता पटेल नेटवर्क
                </motion.h3>
                <motion.p
                  className="text-emerald-600 text-xl font-semibold mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  समाज को जोड़ने का डिजिटल मंच
                </motion.p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { icon: FaHeart, text: "निःशुल्क सदस्यता" },
                  { icon: FaConnectdevelop, text: "तुरंत कनेक्शन" },
                  { icon: FaUsers, text: "सामुदायिक लाभ" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#d1fae5" }}
                  >
                    <span className="text-gray-800 font-medium">✓ {item.text}</span>
                    <item.icon className="text-emerald-500" />
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-4 px-8 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xl font-bold">nayatapatalnetwork.com</span>
                </motion.div>
                <motion.p
                  className="text-black font-bold text-lg mt-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  आज ही जुड़ें और पंजीकरण करें!
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal for enlarged poster view */}
      <AnimatePresence>
        {selectedPoster && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPoster(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-4 max-w-2xl w-full"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-emerald-600 mb-4">पोस्टर {selectedPoster} - विस्तृत दृश्य</h3>
                <p className="text-gray-600 mb-4">यह पोस्टर सोशल मीडिया पर साझा करने के लिए तैयार है।</p>
                <motion.button
                  className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPoster(null)}
                >
                  बंद करें
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

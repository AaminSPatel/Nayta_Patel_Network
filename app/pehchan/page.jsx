"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiHeart,
  FiShare2,
  FiEye,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiRotateCcw,
} from "react-icons/fi"
import Link from "next/link"
import Image from "next/image"
import html2canvas from "html2canvas"
import { usePatel } from "../../components/patelContext"
import BusinessCard4 from "../../components/BusinessCard4.jsx";

import { 
  BiPhone,
  BiLogoWhatsapp,
  BiLogoFacebook,
  BiLogoTelegram,
  BiLogoInstagram
} from 'react-icons/bi';
import { FaIdCard } from "react-icons/fa"


const categories = ["सभी", "कृषि", "व्यवसाय", "तकनीकी", "शिक्षा", "स्वास्थ्य"]
const villages = ["सभी", "सरसावा", "रामपुर", "गोकुलपुर"]
const professions = ["सभी", "किसान", "दर्जी", "मैकेनिक", "शिक्षिका", "दुकानदार", "नर्स"]

function ImageCarousel({ image, autoPlay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || image.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % image.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [image.length, autoPlay])

  if (image.length === 1) {
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <Image
          src={image[0] || "/placeholder.svg"}
          alt="Story image"
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image src={image[currentIndex] || "/placeholder.svg"} alt="Story image" fill className="object-cover" />
        </motion.div>
      </AnimatePresence>

      {image.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {image.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function BusinessCard({ story }) {
  return (
    <div className="business-card" id={`business-card-${story._id}`}>
      <div className="business-card-header relative">
        <div className="w-2/3">
            <h3 className="business-card-name">{story.name}</h3>
        <p className="business-card-profession">{story.profession}</p>
      
        </div>
        <div className="flex flex-col gap-1.5 mt-2 absolute -right-24">
          <span className="w-32 h-1 line-colors ml-16"></span>
          <span className="w-32 h-1 line-colors ml-20"></span>
          <span className="w-32 h-1 line-colors ml-24"></span>
        </div>
      </div>

      <div className="business-card-body">
        <div className="business-card-left">
          <div className="business-card-info">
            <p className="business-card-label glegoo">पिता का नाम</p>
            <p className="business-card-value ">{story.father}</p>
          </div>

          <div className="business-card-info">
            <p className="business-card-label glegoo">गांव</p>
            <p className="business-card-value ">{story.village}</p>
          </div>

          <div className="business-card-contact">
            <div className="business-card-phone">
              <BiPhone />
              <span className="pickup glegoo">{story.mobile}</span>
            </div>
            <BiLogoWhatsapp className="business-card-whatsapp  hidden" />
          </div>
        </div>

        <div className="business-card-right ">
          <img src={story.image.url || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
        </div>
      </div>

      <div className="business-card-footer ">
        <p className="hidden">मेरा काम मेरी पहचान</p>
        <div>
          <img src="/tactor.png" alt="Nayta Patel Network" />
        <h2  className="pickup1">Nayta Patel Network</h2>
        </div>
      </div>
    </div>
  )
}


function StoryCard({ story, index }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(story.likes?.length || 0)
  const [viewCount, setViewCount] = useState(story.views || 0)
  const [shareCount, setShareCount] = useState(story.shareCount || 0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const cardRef = useRef(null)
  const [currentUserId, setCurrentUserId] = useState(null)
   const {path,user,fetchPehchan} = usePatel()
  // Get current user ID when component mounts
  useEffect(() => {
    //const token = localStorage.getItem('token')
    if (user) {
      // You'll need to implement this function to decode the token and get user ID
      setCurrentUserId(user._id)
    }
  }, [user])

  // Initialize like state based on whether user has liked this story
  useEffect(() => {
    if (story && currentUserId) {
      setLiked(story.likes?.includes(currentUserId))
    }
  }, [story, currentUserId])

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Authentication required')
      }

      const response = await fetch(path+`/api/pehchan/${story._id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update like')
      }

      const result = await response.json()
      setLiked(!liked)
      setLikeCount(result.likes.length)
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }


  // Share on specific platform
  const shareOnPlatform = async (platform) => {
    const message = `${story.name} की प्रेरणादायक कहानी देखें: ${story.story.slice(0,150)} ${window.location.href}/pehchan/${story._id}`
    let url = ''
    
    switch(platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(message)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
        break
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`
        break
      case 'instagram':
        url = `instagram://`
        break
      default:
        if (navigator.share) {
          await navigator.share({
            title: `${story.name} की कहानी`,
            text: message,
            url: window.location.href,
          })
        }
    }
    
    if (url) {
      window.open(url, '_blank')
    }
    
    // Update share count
    try {
      const response = await fetch(path+`/api/pehchan/${story._id}/share`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const result = await response.json()
        setShareCount(result.shareCount)
        fetchPehchan()
      }
    } catch (error) {
      console.error('Error updating share count:', error)
    }
    
    setShowShareOptions(false)
  }

 // Helper function to get user ID from token


  // Business card download function (same as before)

const downloadBusinessCard = async () => {
  const businessCardElement = document.getElementById(`business-card-${story._id}`);
  if (businessCardElement) {
    try {
      // Get all elements with these classes
      const pickupElements = document.getElementsByClassName('pickup');
      const businessCard = document.getElementsByClassName('business-card');
      const pickup1Elements = document.getElementsByClassName('pickup1');
      
      // Apply negative margins before capture
      Array.from(pickupElements).forEach(el => {
        el.style.marginTop = '-12px';
      });
      Array.from(pickup1Elements).forEach(el => {
        el.style.marginTop = '-1px';
      });
Array.from(businessCard).forEach(el => {
        el.style.boderRadius = '0px';
      });

      const canvas = await html2canvas(businessCardElement, {
        backgroundColor: "#ffffff",
        scale: 4,
        useCORS: true,
      });

      // Reset margins after capture
      Array.from(pickupElements).forEach(el => {
        el.style.marginTop = '';
      });
      Array.from(pickup1Elements).forEach(el => {
        el.style.marginTop = '';
      });

      const link = document.createElement("a");
      link.download = `${story.name}-business-card.png`;
      link.href = canvas.toDataURL();
      link.click();
      
    } catch (error) {
      console.error("Error downloading business card:", error);
      
      // Ensure margins are reset even if error occurs
      const pickupElements = document.getElementsByClassName('pickup');
      const pickup1Elements = document.getElementsByClassName('pickup1');
            const businessCard = document.getElementsByClassName('business-card');

      Array.from(pickupElements).forEach(el => {
        el.style.marginTop = '';
      });
      Array.from(pickup1Elements).forEach(el => {
        el.style.marginTop = '';
      });Array.from(businessCard).forEach(el => {
        el.style.boderRadius = '15px';
      });
    }
  }
}
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full max-w-md mx-auto mb-6"
    >
      <div className={`relative ${isFlipped ? "h-auto" : "h-full"}`}>
        {/* Front Side - Story Card */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 transition-all duration-300 ${isFlipped ? "hidden" : "block"}`}>
          <img 
            src={story.image.url} 
            alt={story.name} 
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />
          
          <div className="p-4 sm:p-5">
            {/* Header with name and profession */}
            <div className="flex  justify-between mb-3 sm:mb-4">
              <div className="flex-1 mb-2 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-bold text-emerald-800">{story.name}</h3>
                <p className="text-emerald-600 font-semibold text-sm sm:text-base">{story.profession}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFlipped(true)}
                className="self-start flex items-center justify-center gap-1 sm:self-auto px-3 py-1 my-auto bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium hover:bg-emerald-200 transition-colors"
              >
               <FaIdCard/> कार्ड देखें
              </motion.button>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-600 font-medium">पिता:</span>
                <p className="text-gray-800 font-semibold">{story.father}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">गांव:</span>
                <p className="text-gray-800 font-semibold">{story.village}</p>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 p-2 sm:p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <BiPhone className="text-emerald-600 text-sm sm:text-base" />
                <span className="text-emerald-800 font-semibold text-sm sm:text-base">{story.mobile}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => shareOnPlatform('whatsapp')}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <BiLogoWhatsapp size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
            </div>

            {/* Story Preview */}
            <p className="text-gray-700 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-xs sm:text-sm">
              {story.story}
            </p>

            {/* Stats - Now shows views, likes, and shares */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="flex items-center">
                  <FiEye className="mr-1" size={14} />
                  {viewCount}
                </span>
                <span className="flex items-center">
                  <FiHeart className="mr-1" size={14} />
                  {likeCount}
                </span>
                <span className="flex items-center">
                  <FiShare2 className="mr-1" size={14} />
                  {shareCount}
                </span>
              </div>
              <span className="text-emerald-600 font-medium">{story.category}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    liked
                      ? "bg-red-100 text-red-600 border border-red-200"
                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                  }`}
                >
                  <FiHeart size={14} className={liked ? "fill-current" : ""} />
                  <span>{likeCount}</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-600 border border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
                  >
                    <FiShare2 size={14} />
                    <span>शेयर</span>
                  </motion.button>

                  {/* Share Options Dropdown */}
                  {showShareOptions && (
                    <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="p-2">
                        <button
                          onClick={() => shareOnPlatform('whatsapp')}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <BiLogoWhatsapp className="mr-2 text-green-500" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => shareOnPlatform('facebook')}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <BiLogoFacebook className="mr-2 text-blue-600" />
                          Facebook
                        </button>
                        <button
                          onClick={() => shareOnPlatform('telegram')}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <BiLogoTelegram className="mr-2 text-blue-400" />
                          Telegram
                        </button>
                        <button
                          onClick={() => shareOnPlatform('instagram')}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <BiLogoInstagram className="mr-2 text-pink-500" />
                          Instagram
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Link href={`/pehchan/${story._id}`} className="block sm:inline-block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full text-xs sm:text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  पूरी कहानी
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back Side - Business Card */}
        <div className={`${isFlipped ? "block" : "hidden"}`}>
          <div className="w-full mx-auto">
           
            <BusinessCard4 story={story} />
            

            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadBusinessCard}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-emerald-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-emerald-700 transition-colors shadow-md"
              >
                <FiDownload size={14} className="sm:w-4 sm:h-4" />
                <span>डाउनलोड करें</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFlipped(false)}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-gray-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors shadow-md"
              >
                <FiRotateCcw size={14} className="sm:w-4 sm:h-4" />
                <span>वापस जाएं</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}



function FilterSection({ filters, setFilters }) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 mb-8 border border-emerald-100"
    >
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 text-emerald-700 font-semibold md:hidden"
      >
        <FiFilter />
        <span>फिल्टर</span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: showFilters ? "auto" : 0 }}
        className={`overflow-hidden md:!h-auto`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          <div>
            <label className="block text-sm font-semibold text-emerald-800 mb-2">श्रेणी</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-800 mb-2">पेशा</label>
            <select
              value={filters.profession}
              onChange={(e) => setFilters((prev) => ({ ...prev, profession: e.target.value }))}
              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              {professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-emerald-800 mb-2">गांव</label>
            <select
              value={filters.village}
              onChange={(e) => setFilters((prev) => ({ ...prev, village: e.target.value }))}
              className="w-full p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              {villages.map((village) => (
                <option key={village} value={village}>
                  {village}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center space-x-2 mt-8"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors border border-emerald-100"
      >
        <FiChevronLeft className="text-emerald-600" />
      </motion.button>

      {pages.map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPageChange(page)}
          className={`w-12 h-12 rounded-full font-semibold transition-all ${
            currentPage === page
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
              : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-100"
          } shadow-md`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 transition-colors border border-emerald-100"
      >
        <FiChevronRight className="text-emerald-600" />
      </motion.button>
    </motion.div>
  )
}

export default function HomePage() {
   const {pehchans} = usePatel()
  const [filters, setFilters] = useState({
    category: "सभी",
    profession: "सभी",
    village: "सभी",
  })
  const [currentPage, setCurrentPage] = useState(1)
  const storiesPerPage = 6

  const filteredStories = pehchans.filter((story) => {
    return (
      (filters.category === "सभी" || story.category === filters.category) &&
      (filters.profession === "सभी" || story.profession === filters.profession) &&
      (filters.village === "सभी" || story.village === filters.village)
    )
  })

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage)
  const startIndex = (currentPage - 1) * storiesPerPage
  const currentStories = filteredStories.slice(startIndex, startIndex + storiesPerPage)

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent mb-6 pt-2">
            मेरा काम मेरी पहचान
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            हर व्यक्ति की अपनी एक कहानी है, अपना एक सपना है। यहाँ हम उन सभी मेहनतकश लोगों की कहानियाँ साझा करते हैं जो अपने काम से
            अपनी पहचान बनाते हैं। आइए, मिलते हैं उन प्रेरणादायक व्यक्तित्वों से जो हमारे समाज की असली ताकत हैं।
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        <FilterSection filters={filters} setFilters={setFilters} />

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentStories.map((story, index) => (
            <StoryCard key={story._id} story={story} index={index} />
          ))}
        </div>

        {/* No Results */}
        {currentStories.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-xl text-gray-600">कोई कहानी नहीं मिली। कृपया फिल्टर बदलकर देखें।</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>
    </div>
  )
}
